import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Film, Tv, Clapperboard, SearchIcon, Loader2 } from 'lucide-react'
import SectionRow from '../components/ui/SectionRow'
import MediaCard from '../components/ui/MediaCard'
import MediaModal from '../components/ui/MediaModal'
import HeroCarousel from '../components/ui/HeroCarousel'
import { searchTitles, getTopMovies, getNewestMovies, getTopRated, getMostVoted, getByGenre, getByCountry } from '../services/imdbapi'
import { searchSeries, getPopularSeries } from '../services/tvmaze'
import { searchAnime, getTopAnime, getAiringAnime } from '../services/jikan'
import { mockMovies, mockSeries } from '../data/mockData'

const tabs = [
  { key: 'movie', labelKey: 'vision.movie', icon: Film },
  { key: 'series', labelKey: 'vision.series', icon: Tv },
  { key: 'anime', labelKey: 'vision.anime', icon: Clapperboard }
]

function SkeletonRow({ count = 5 }) {
  return (
    <div className="scroll-row" style={{ padding: '0 16px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton" style={{ width: 180, height: 260, borderRadius: 'var(--card-radius)', flexShrink: 0 }} />
      ))}
    </div>
  )
}

function mapMockToModal(item) {
  return {
    title: item.title || item.show,
    overview: item.description_fa || '',
    poster: item.thumbnail || item.cover,
    rating: item.rating || null,
    year: item.year || null,
    genres: item.genre ? [item.genre] : [],
    type: item.type || 'movie'
  }
}

const backdropSeeds = [
  'https://picsum.photos/seed/vision-hero1/1600/900',
  'https://picsum.photos/seed/vision-hero2/1600/900',
  'https://picsum.photos/seed/vision-hero3/1600/900',
  'https://picsum.photos/seed/vision-hero4/1600/900',
  'https://picsum.photos/seed/vision-hero5/1600/900'
]

const heroSlides = [
  { id: 'vh1', title: 'Neon Dreams', title_fa: 'رویاهای نئونی', genre: 'Thriller', rating: 8.9, backdrop: backdropSeeds[0], year: 2024, quality: '4K', type: 'movie', description_fa: 'یک هکر جوان وارد دنیای تاریک جرایم سایبری می‌شود.', file_url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4' },
  { id: 'vh2', title: 'Midnight Protocol', title_fa: 'پروتکل نیمه‌شب', genre: 'Sci-Fi', rating: 8.7, backdrop: backdropSeeds[1], year: 2024, quality: '4K', type: 'movie', description_fa: 'در دنیای پساآخرالزمانی، یک مأمور مخفی برای نجات بشریت تلاش می‌کند.' },
  { id: 'vh3', title: 'The Last Empire', title_fa: 'آخرین امپراتوری', genre: 'Historical', rating: 9.2, backdrop: backdropSeeds[2], year: 2024, quality: '4K', type: 'series', description_fa: 'مستند تاریخی درباره امپراتوری هخامنشیان و تمدن بزرگ پارس.' },
  { id: 'vh4', title: 'Crimson Tide', title_fa: 'موج سرخ', genre: 'Action', rating: 8.5, backdrop: backdropSeeds[3], year: 2024, quality: '4K', type: 'movie', description_fa: 'یک تیم نخبه برای جلوگیری از یک فاجعه جهانی وارد عمل می‌شوند.' },
  { id: 'vh5', title: 'Echoes of Tomorrow', title_fa: 'پژواک‌های فردا', genre: 'Drama', rating: 8.8, backdrop: backdropSeeds[4], year: 2023, quality: 'HD', type: 'series', description_fa: 'داستانی احساسی درباره خانواده، عشق و امید در روزگار مدرن.' }
]

const movieSectionConfig = [
  { key: 'popular', titleKey: 'vision.popular' },
  { key: 'newest', titleKey: 'vision.newest' },
  { key: 'topRated', titleKey: 'vision.topRated' },
  { key: 'mostVoted', titleKey: 'vision.mostVoted' },
  { key: 'action', titleKey: 'vision.action' },
  { key: 'comedy', titleKey: 'vision.comedy' },
  { key: 'worldCinema', titleKey: 'vision.worldCinema' }
]

export default function Vision() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('movie')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchFocused, setSearchFocused] = useState(false)
  const searchRef = useRef(null)
  const tabBarRef = useRef(null)
  const [tabIndicator, setTabIndicator] = useState({ left: 0, width: 0 })

  const [movieSections, setMovieSections] = useState({})
  const [movieLoading, setMovieLoading] = useState(true)
  const [movieError, setMovieError] = useState(null)

  const [seriesSections, setSeriesSections] = useState({})
  const [seriesLoading, setSeriesLoading] = useState(true)

  const [animeSections, setAnimeSections] = useState({})
  const [animeLoading, setAnimeLoading] = useState(true)

  useEffect(() => {
    if (activeTab !== 'movie') return
    setMovieLoading(true); setMovieError(null)
    const fetches = [
      getTopMovies(10).then((d) => ({ key: 'popular', data: d })),
      getNewestMovies(10).then((d) => ({ key: 'newest', data: d })),
      getTopRated(10).then((d) => ({ key: 'topRated', data: d })),
      getMostVoted(10).then((d) => ({ key: 'mostVoted', data: d })),
      getByGenre('ACTION', 10).then((d) => ({ key: 'action', data: d })),
      getByGenre('COMEDY', 10).then((d) => ({ key: 'comedy', data: d })),
      getByCountry('KR,JP,IN,FR', 10).then((d) => ({ key: 'worldCinema', data: d }))
    ]
    Promise.allSettled(fetches).then((results) => {
      const sections = {}
      results.forEach((r) => {
        if (r.status === 'fulfilled') sections[r.value.key] = r.value.data
      })
      setMovieSections(sections)
      setMovieLoading(false)
    }).catch((err) => { setMovieError(err.message); setMovieLoading(false) })
  }, [activeTab])

  useEffect(() => {
    if (activeTab !== 'series') return
    setSeriesLoading(true)
    Promise.allSettled([
      getPopularSeries(1, 10).then((d) => ({ key: 'popular', data: d }))
    ]).then((results) => {
      const sections = {}
      results.forEach((r) => {
        if (r.status === 'fulfilled') sections[r.value.key] = r.value.data
      })
      setSeriesSections(sections)
      setSeriesLoading(false)
    })
  }, [activeTab])

  useEffect(() => {
    if (activeTab !== 'anime') return
    setAnimeLoading(true)
    Promise.allSettled([
      getTopAnime(10).then((d) => ({ key: 'top', data: d })),
      getAiringAnime(10).then((d) => ({ key: 'airing', data: d }))
    ]).then((results) => {
      const sections = {}
      results.forEach((r) => {
        if (r.status === 'fulfilled') sections[r.value.key] = r.value.data
      })
      setAnimeSections(sections)
      setAnimeLoading(false)
    })
  }, [activeTab])

  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return }
    setSearching(true)
    const timer = setTimeout(async () => {
      try {
        let results = []
        if (activeTab === 'movie') results = await searchTitles(searchQuery, 10)
        else if (activeTab === 'series') results = await searchSeries(searchQuery, 10)
        else if (activeTab === 'anime') results = await searchAnime(searchQuery, 10)
        setSearchResults(results)
      } catch { setSearchResults([]) }
      finally { setSearching(false) }
    }, 400)
    return () => clearTimeout(timer)
  }, [searchQuery, activeTab])

  useEffect(() => {
    if (!tabBarRef.current) return
    const activeEl = tabBarRef.current.querySelector(`[data-tab="${activeTab}"]`)
    if (activeEl) { const { offsetLeft, offsetWidth } = activeEl; setTabIndicator({ left: offsetLeft, width: offsetWidth }) }
  }, [activeTab])

  const seriesFallback = mockSeries.map((s) => ({ ...s, type: 'series', source: 'mock' }))
  const animeFallback = mockMovies.slice(0, 8).map((m) => ({ ...m, type: 'anime', source: 'mock' }))

  const searchPlaceholder = activeTab === 'movie' ? t('vision.searchPlaceholder')
    : activeTab === 'series' ? t('vision.searchSeries') : t('vision.searchAnime')

  return (
    <>
      <HeroCarousel items={heroSlides} />

      <div style={{ padding: '0 16px', marginBottom: 24 }}>
        <motion.div
          onFocus={() => setSearchFocused(true)}
          onBlur={(e) => { if (!searchRef.current?.contains(e.relatedTarget)) setSearchFocused(false) }}
          ref={searchRef}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: searchFocused ? 'rgba(255,255,255,0.1)' : 'var(--glass-bg)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            border: searchFocused ? '1.5px solid var(--accent-primary)' : '1px solid var(--glass-border)',
            borderRadius: 16, padding: '10px 16px', transition: 'all 0.25s ease',
            boxShadow: searchFocused ? '0 0 24px rgba(56,189,248,0.12)' : 'none'
          }}
        >
          <SearchIcon size={18} color={searchFocused ? 'var(--accent-primary)' : 'var(--text-muted)'} />
          <input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 15, color: 'var(--text-primary)', direction: 'rtl' }}
          />
          {searching && <Loader2 size={16} className="spin" color="var(--text-muted)" />}
        </motion.div>
      </div>

      <div ref={tabBarRef} style={{ display: 'flex', gap: 4, padding: '4px', margin: '0 16px 24px', background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', borderRadius: 14, border: '1px solid var(--glass-border)', position: 'relative' }}>
        <motion.div animate={{ left: tabIndicator.left, width: tabIndicator.width }} transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{ position: 'absolute', top: 4, bottom: 4, background: 'var(--accent-gradient)', borderRadius: 10, zIndex: 0 }} />
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key
          return (
            <button key={tab.key} data-tab={tab.key} onClick={() => setActiveTab(tab.key)}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 12px', borderRadius: 10, fontSize: 13, fontWeight: 600, color: isActive ? '#fff' : 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', position: 'relative', zIndex: 1, transition: 'color 0.2s' }}>
              <tab.icon size={16} /> {t(tab.labelKey)}
            </button>
          )
        })}
      </div>

      {activeTab === 'movie' && (
        <div className="section-bg">
          {searchQuery.trim() ? (
            searchResults.length > 0 ? (
              <SectionRow title={t('vision.searchResults')}>
                {searchResults.map((item) => (
                  <MediaCard key={item.id} item={{ ...item, source: 'imdbapi' }} size="md" onClick={() => setSelectedItem(item)} />
                ))}
              </SectionRow>
            ) : searching ? null : (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, padding: 40 }}>{t('vision.noResults')}</p>
            )
          ) : null}

          {movieLoading ? (
            <div style={{ padding: '0 16px' }}>
              {movieSectionConfig.map((s) => (
                <div key={s.key} style={{ marginBottom: 24 }}>
                  <div className="skeleton" style={{ height: 24, width: 120, borderRadius: 6, marginBottom: 16 }} />
                  <SkeletonRow />
                </div>
              ))}
            </div>
          ) : movieError ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 14, padding: 40 }}>{movieError}</p>
          ) : (
            movieSectionConfig.map((section) => {
              const items = movieSections[section.key]
              if (!items || items.length === 0) return null
              return (
                <SectionRow key={section.key} title={t(section.titleKey)}>
                  {items.map((item) => (
                    <MediaCard key={item.id} item={{ ...item, source: 'imdbapi' }} size="md" onClick={() => setSelectedItem(item)} />
                  ))}
                </SectionRow>
              )
            })
          )}
        </div>
      )}

      {activeTab === 'series' && (
        <div className="section-bg">
          {searchQuery.trim() ? (
            searchResults.length > 0 ? (
              <SectionRow title={t('vision.searchResults')}>
                {searchResults.map((item) => (
                  <MediaCard key={item.id} item={{ ...item, source: 'tvmaze' }} size="md" onClick={() => setSelectedItem(item)} />
                ))}
              </SectionRow>
            ) : searching ? null : (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, padding: 40 }}>{t('vision.noResults')}</p>
            )
          ) : null}

          {seriesLoading ? (
            <div style={{ padding: '0 16px' }}>
              <div className="skeleton" style={{ height: 24, width: 120, borderRadius: 6, marginBottom: 16 }} />
              <SkeletonRow />
            </div>
          ) : seriesSections.popular && seriesSections.popular.length > 0 ? (
            <SectionRow title={t('vision.seriesTitle')}>
              {seriesSections.popular.map((item) => (
                <MediaCard key={item.id} item={item} size="md" onClick={() => setSelectedItem(item)} />
              ))}
            </SectionRow>
          ) : seriesFallback.length > 0 ? (
            <SectionRow title={t('vision.seriesTitle')}>
              {seriesFallback.map((item) => (
                <MediaCard key={item.id} item={item} size="md" onClick={() => setSelectedItem(mapMockToModal(item))} />
              ))}
            </SectionRow>
          ) : null}
        </div>
      )}

      {activeTab === 'anime' && (
        <div className="section-bg">
          {searchQuery.trim() ? (
            searchResults.length > 0 ? (
              <SectionRow title={t('vision.searchResults')}>
                {searchResults.map((item) => (
                  <MediaCard key={item.id} item={{ ...item, source: 'jikan' }} size="md" onClick={() => setSelectedItem(item)} />
                ))}
              </SectionRow>
            ) : searching ? null : (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, padding: 40 }}>{t('vision.noResults')}</p>
            )
          ) : null}

          {animeLoading ? (
            <div style={{ padding: '0 16px' }}>
              <div className="skeleton" style={{ height: 24, width: 120, borderRadius: 6, marginBottom: 16 }} />
              <SkeletonRow />
            </div>
          ) : (
            <>
              {animeSections.top && animeSections.top.length > 0 && (
                <SectionRow title={t('vision.animeTitle')}>
                  {animeSections.top.map((item) => (
                    <MediaCard key={item.id} item={item} size="md" onClick={() => setSelectedItem(item)} />
                  ))}
                </SectionRow>
              )}
              {animeSections.airing && animeSections.airing.length > 0 && (
                <SectionRow title={t('vision.animeAiring')}>
                  {animeSections.airing.map((item) => (
                    <MediaCard key={item.id} item={item} size="md" onClick={() => setSelectedItem(item)} />
                  ))}
                </SectionRow>
              )}
              {(!animeSections.top || animeSections.top.length === 0) && animeFallback.length > 0 && (
                <SectionRow title={t('vision.animeTitle')}>
                  {animeFallback.map((item) => (
                    <MediaCard key={item.id} item={item} size="md" onClick={() => setSelectedItem(mapMockToModal(item))} />
                  ))}
                </SectionRow>
              )}
            </>
          )}
        </div>
      )}

      <MediaModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  )
}
