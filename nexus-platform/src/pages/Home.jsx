import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Star, Music, Play } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import HeroCarousel from '../components/ui/HeroCarousel'
import SectionRow from '../components/ui/SectionRow'
import MediaCard from '../components/ui/MediaCard'
import GlassCard from '../components/ui/GlassCard'
import Badge from '../components/ui/Badge'
import usePlayerStore from '../store/usePlayerStore'
import { searchTracks, getNewReleases, getTrending } from '../services/jamendo'
import {
  mockMusic, mockMovies, mockPodcasts,
  heroFeatured, mockTrending,
  mockContinueWatching, mockNewReleases
} from '../data/mockData'

const moods = [
  { emoji: '😌', labelKey: 'home.moods.aramesh', tag: 'chill' },
  { emoji: '🔥', labelKey: 'home.moods.pranergi', tag: 'energetic' },
  { emoji: '🧠', labelKey: 'home.moods.tamarkoz', tag: 'focus' },
  { emoji: '😢', labelKey: 'home.moods.ghamgin', tag: 'sad' },
  { emoji: '🎉', labelKey: 'home.moods.shad', tag: 'happy' }
]

function SkeletonCard({ size = 'sm' }) {
  const w = size === 'sm' ? 140 : 180
  const h = size === 'sm' ? 140 : 180
  return (
    <div className="skeleton" style={{ width: w, height: h, borderRadius: 'var(--card-radius)', flexShrink: 0 }} />
  )
}

function SectionRowSkeleton({ count = 5, size = 'sm' }) {
  return (
    <section style={{ marginBottom: 'var(--section-gap)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, paddingLeft: 16, paddingRight: 16 }}>
        <div className="skeleton" style={{ width: 4, height: 22, borderRadius: 2 }} />
        <div className="skeleton" style={{ width: 140, height: 22, borderRadius: 6 }} />
      </div>
      <div className="scroll-row" style={{ paddingLeft: 16, paddingRight: 16 }}>
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} size={size} />
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const mode = usePlayerStore((s) => s.mode)
  const storePlay = usePlayerStore((s) => s.play)

  const [newReleases, setNewReleases] = useState([])
  const [newReleasesLoading, setNewReleasesLoading] = useState(true)
  const [trending, setTrending] = useState([])
  const [trendingLoading, setTrendingLoading] = useState(true)
  const [forYou, setForYou] = useState([])
  const [forYouLoading, setForYouLoading] = useState(true)
  const [localPopular, setLocalPopular] = useState([])
  const [localPopularLoading, setLocalPopularLoading] = useState(true)

  const [moodResults, setMoodResults] = useState(null)
  const [activeMood, setActiveMood] = useState(null)
  const [moodLoading, setMoodLoading] = useState(false)

  useEffect(() => {
    getNewReleases(8).then(setNewReleases).catch(() => {}).finally(() => setNewReleasesLoading(false))
    getTrending(8).then(setTrending).catch(() => {}).finally(() => setTrendingLoading(false))

    Promise.all([
      searchTracks('pop', 3),
      searchTracks('electronic', 3),
      searchTracks('rock', 2)
    ]).then(([pop, electronic, rock]) => {
      const mixed = [...pop, ...electronic, ...rock].sort(() => Math.random() - 0.5).slice(0, 8)
      setForYou(mixed)
    }).catch(() => {}).finally(() => setForYouLoading(false))

    searchTracks('persian', 8).then((tracks) => {
      if (tracks.length === 0) return getTrending(8)
      return tracks
    }).then(setLocalPopular).catch(() => {}).finally(() => setLocalPopularLoading(false))
  }, [])

  const handleMoodClick = async (mood) => {
    if (activeMood === mood.labelKey) {
      setActiveMood(null)
      setMoodResults(null)
      return
    }
    setActiveMood(mood.labelKey)
    setMoodLoading(true)
    try {
      const tracks = await searchTracks(mood.tag, 15)
      setMoodResults(tracks)
    } catch {
      setMoodResults([])
    } finally {
      setMoodLoading(false)
    }
  }

  const play = async (item) => {
    if (item.source === 'jamendo' || item.source === 'pexels' || item.type === 'movie' || item.type === 'series') {
      storePlay(item)
      return
    }
    const nameQuery = `${item.title || item.show || ''} ${item.artist || item.host || ''}`.trim()
    const genreQuery = item.genre || 'pop'
    const queries = [nameQuery, genreQuery, 'pop instrumental']
    for (let i = 0; i < queries.length; i++) {
      try {
        const tracks = await searchTracks(queries[i], 1)
        if (tracks.length > 0) {
          storePlay(tracks[0])
          return
        }
      } catch {}
    }
    storePlay(item)
  }

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }

  const popularItems = mockTrending.slice(0, 10)

  return (
    <motion.div
      className="page"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <HeroCarousel items={heroFeatured} />

      <div className="page-padded">
        <SectionRow title={t('home.continueWatching')}>
          {mockContinueWatching.map((item) => (
            <MediaCard key={item.id} item={item} size="sm" showProgress />
          ))}
        </SectionRow>
      </div>

      {newReleasesLoading ? (
        <SectionRowSkeleton count={6} />
      ) : newReleases.length > 0 ? (
        <div className="page-padded">
          <SectionRow title={t('home.newReleases')}>
            {newReleases.slice(0, 8).map((item) => (
              <MediaCard key={item.id} item={item} size="sm" />
            ))}
          </SectionRow>
        </div>
      ) : null}

      {trendingLoading ? (
        <SectionRowSkeleton count={6} />
      ) : trending.length > 0 ? (
        <div className="page-padded">
          <SectionRow title={t('home.trending')}>
            {trending.slice(0, 8).map((item) => (
              <MediaCard key={item.id} item={item} size="md" />
            ))}
          </SectionRow>
        </div>
      ) : null}

      <div className="page-padded">
        <section style={{ marginBottom: 'var(--section-gap)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 4, height: 22, borderRadius: 2, background: 'var(--accent-gradient)', flexShrink: 0 }} />
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.01em' }}>
              {t('home.byMood')}
            </h2>
          </div>
          <div className="scroll-row">
            {moods.map((mood) => (
              <motion.button
                key={mood.labelKey}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleMoodClick(mood)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '10px 20px', borderRadius: 20,
                  background: activeMood === mood.labelKey ? 'var(--accent-gradient)' : 'var(--glass-bg)',
                  backdropFilter: activeMood === mood.labelKey ? 'none' : 'var(--glass-blur)',
                  WebkitBackdropFilter: activeMood === mood.labelKey ? 'none' : 'var(--glass-blur)',
                  border: activeMood === mood.labelKey ? 'none' : '1px solid var(--glass-border)',
                  fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap',
                  color: activeMood === mood.labelKey ? '#fff' : 'var(--text-muted)',
                  cursor: 'pointer', flexShrink: 0
                }}
              >
                <span style={{ fontSize: 18 }}>{mood.emoji}</span>
                {t(mood.labelKey)}
              </motion.button>
            ))}
          </div>
          {moodLoading && (
            <div className="scroll-row" style={{ marginTop: 14 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonCard key={i} size="sm" />
              ))}
            </div>
          )}
          {!moodLoading && moodResults !== null && moodResults.length > 0 && (
            <div className="scroll-row" style={{ marginTop: 14 }}>
              {moodResults.slice(0, 10).map((item) => (
                <MediaCard key={item.id} item={item} size="sm" />
              ))}
            </div>
          )}
          {!moodLoading && moodResults !== null && moodResults.length === 0 && (
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 14, textAlign: 'center' }}>
              {t('home.noMoodResults')}
            </p>
          )}
        </section>
      </div>

      {forYouLoading ? (
        <SectionRowSkeleton count={6} />
      ) : forYou.length > 0 ? (
        <div className="page-padded">
          <SectionRow title={t('home.speciallyForYou')}>
            {forYou.slice(0, 8).map((item) => (
              <MediaCard key={item.id} item={item} size="sm" />
            ))}
          </SectionRow>
        </div>
      ) : null}

      {localPopularLoading ? (
        <SectionRowSkeleton count={6} />
      ) : localPopular.length > 0 ? (
        <div className="page-padded">
          <SectionRow title={t('home.popularInYourArea')}>
            {localPopular.slice(0, 8).map((item) => (
              <MediaCard key={item.id} item={item} size="sm" />
            ))}
          </SectionRow>
        </div>
      ) : null}

      <div className="page-padded">
        <SectionRow title={t('home.new')} viewAll={() => navigate(mode === 'sound' ? '/sound' : '/vision')}>
          {mockNewReleases.slice(0, 8).map((item) => (
            <MediaCard key={item.id} item={item} size="md" />
          ))}
        </SectionRow>
      </div>

      <div className="page-padded">
        <SectionRow title={t('home.aiSuggestion')}>
          {[...mockMusic, ...mockMovies].slice(0, 6).map((item, i) => (
            <MediaCard key={`ai-${i}`} item={item} size="sm" />
          ))}
        </SectionRow>
      </div>

      <div className="page-padded">
        <section style={{ marginBottom: 'var(--section-gap)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 4, height: 22, borderRadius: 2, background: 'var(--accent-gradient)', flexShrink: 0 }} />
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.01em' }}>
              {t('home.popular')}
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {popularItems.map((item, i) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.01, x: 4 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => play(item)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '10px 14px',
                  borderRadius: 14, background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)',
                  WebkitBackdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent-primary)', width: 32, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <img src={item.cover || item.thumbnail} alt="" style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title || item.show}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.artist || item.genre || item.host}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Star size={12} fill="var(--accent-gold)" color="var(--accent-gold)" />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{item.rating}</span>
                </div>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent-gradient)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <Play size={16} fill="#fff" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  )
}
