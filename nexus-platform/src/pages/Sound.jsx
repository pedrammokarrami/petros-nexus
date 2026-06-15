import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Music, Mic2, Radio, BookOpen } from 'lucide-react'
import SectionRow from '../components/ui/SectionRow'
import MediaCard from '../components/ui/MediaCard'
import GlassCard from '../components/ui/GlassCard'
import Badge from '../components/ui/Badge'
import HeroCarousel from '../components/ui/HeroCarousel'
import usePlayerStore from '../store/usePlayerStore'
import { mockMusic, mockPodcasts, mockRadioStations, mockAudiobooks } from '../data/mockData'

const tabs = [
  { id: 'music', labelKey: 'sound.music', icon: Music },
  { id: 'podcast', labelKey: 'sound.podcast', icon: Mic2 },
  { id: 'radio', labelKey: 'sound.radio', icon: Radio },
  { id: 'audiobook', labelKey: 'sound.audiobook', icon: BookOpen }
]

const soundHeroSlides = [
  { id: 'sh1', title: 'Shab-e Yalda', title_fa: 'شب یلدا', artist: 'Mohsen Yeganeh', genre: 'Pop', rating: 9.0, thumbnail: 'https://picsum.photos/seed/sound-hero1/1600/900', year: 2024, quality: 'HQ', type: 'audio', description_fa: 'آلبوم جدید محسن یگانه با ۱۰ قطعه فوق‌العاده.', file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'sh2', title: 'Gol-e Yakh', title_fa: 'گل یخ', artist: 'Hayedeh', genre: 'Classic', rating: 9.2, thumbnail: 'https://picsum.photos/seed/sound-hero2/1600/900', year: 1970, quality: 'HQ', type: 'audio', description_fa: 'تصنیف جاودانه گل یخ با صدای هایده.' },
  { id: 'sh3', title: 'Delam', title_fa: 'دلم', artist: 'Sasy', genre: 'Pop', rating: 8.7, thumbnail: 'https://picsum.photos/seed/sound-hero3/1600/900', year: 2024, quality: 'HQ', type: 'audio', description_fa: 'جدیدترین تک‌آهنگ ساسی با سبک پاپ.' },
  { id: 'sh4', title: 'Alameh', title_fa: 'علامه', artist: 'Reza Bahram', genre: 'Hip-Hop', rating: 8.5, thumbnail: 'https://picsum.photos/seed/sound-hero4/1600/900', year: 2024, quality: 'HQ', type: 'audio', description_fa: 'آلبوم جدید رضا بهرام با تلفیقی از هیپ‌هاپ و سنتی.' },
  { id: 'sh5', title: 'Havaye Bi To', title_fa: 'هوای بی تو', artist: 'Evan Band', genre: 'Pop', rating: 8.8, thumbnail: 'https://picsum.photos/seed/sound-hero5/1600/900', year: 2023, quality: 'HQ', type: 'audio', description_fa: 'قطعه محبوب هوای بی تو از ایوان بند.' }
]

export default function Sound() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('music')
  const play = usePlayerStore((s) => s.play)
  const tabBarRef = useRef(null)
  const [tabIndicator, setTabIndicator] = useState({ left: 0, width: 0 })

  useEffect(() => {
    if (!tabBarRef.current) return
    const activeEl = tabBarRef.current.querySelector(`[data-tab="${activeTab}"]`)
    if (activeEl) {
      const { offsetLeft, offsetWidth } = activeEl
      setTabIndicator({ left: offsetLeft, width: offsetWidth })
    }
  }, [activeTab])

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }

  const featuredPlaylist = mockMusic.slice(0, 5)

  return (
    <motion.div
      className="page"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <HeroCarousel items={soundHeroSlides} />

      <div ref={tabBarRef} style={{
        display: 'flex', gap: 4,
        padding: '4px',
        margin: '0 16px 24px',
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        borderRadius: 14,
        border: '1px solid var(--glass-border)',
        position: 'relative'
      }}>
        <motion.div
          animate={{ left: tabIndicator.left, width: tabIndicator.width }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{
            position: 'absolute',
            top: 4, bottom: 4,
            background: 'var(--accent-gradient)',
            borderRadius: 10,
            zIndex: 0
          }}
        />
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              data-tab={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '10px 12px',
                borderRadius: 10,
                fontSize: 13, fontWeight: 600,
                color: isActive ? '#fff' : 'var(--text-muted)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 1,
                transition: 'color 0.2s'
              }}
            >
              <tab.icon size={16} />
              {t(tab.labelKey)}
            </button>
          )
        })}
      </div>

      <div className="page-padded">
        {activeTab === 'music' && (
          <>
            <GlassCard
              glow
              padding={20}
              style={{ marginBottom: 24 }}
              onClick={() => play(featuredPlaylist[0])}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 16,
                    overflow: 'hidden',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={featuredPlaylist[0].cover}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <Music size={14} color="var(--accent-sound)" />
                    <Badge variant="hq">{t('sound.featured')}</Badge>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>
                    {t('sound.topOfTheWeek')}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    {t('sound.tracksCount', { count: featuredPlaylist.length })}
                  </p>
                </div>
              </div>
            </GlassCard>

            <SectionRow title={t('sound.mostPopular')}>
              {mockMusic.slice(0, 6).map((item) => (
                <MediaCard key={item.id} item={{ ...item, type: 'music' }} size="sm" />
              ))}
            </SectionRow>

            <SectionRow title={t('sound.newest')}>
              {mockMusic.slice(3, 9).map((item) => (
                <MediaCard key={item.id} item={{ ...item, type: 'music' }} size="md" />
              ))}
            </SectionRow>

            <SectionRow title={t('sound.weeklySuggestion')}>
              {mockMusic.slice(2, 7).map((item) => (
                <MediaCard key={item.id} item={{ ...item, type: 'music' }} size="sm" />
              ))}
            </SectionRow>
          </>
        )}

        {activeTab === 'podcast' && (
          <>
            <SectionRow title={t('sound.hotPodcasts')}>
              {mockPodcasts.map((item) => (
                <MediaCard key={item.id} item={{ ...item, type: 'podcast' }} size="md" />
              ))}
            </SectionRow>

            <SectionRow title={t('sound.suggested')}>
              {[...mockPodcasts].reverse().map((item) => (
                <MediaCard key={item.id} item={{ ...item, type: 'podcast' }} size="sm" />
              ))}
            </SectionRow>
          </>
        )}

        {activeTab === 'radio' && (
          <>
            <SectionRow title={t('sound.popularStations')}>
              {mockRadioStations.slice(0, 4).map((item) => (
                <MediaCard key={item.id} item={{ ...item, type: 'music' }} size="md" />
              ))}
            </SectionRow>
            <SectionRow title={t('sound.suggested')}>
              {mockRadioStations.slice(4).map((item) => (
                <MediaCard key={item.id} item={{ ...item, type: 'music' }} size="sm" />
              ))}
            </SectionRow>
          </>
        )}

        {activeTab === 'audiobook' && (
          <>
            <SectionRow title={t('sound.popularBooks')}>
              {mockAudiobooks.slice(0, 4).map((item) => (
                <MediaCard key={item.id} item={{ ...item, type: 'music' }} size="md" />
              ))}
            </SectionRow>
            <SectionRow title={t('sound.newest')}>
              {mockAudiobooks.slice(4).map((item) => (
                <MediaCard key={item.id} item={{ ...item, type: 'music' }} size="sm" />
              ))}
            </SectionRow>
          </>
        )}
      </div>
    </motion.div>
  )
}
