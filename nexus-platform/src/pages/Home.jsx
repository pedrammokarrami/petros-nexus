import { motion } from 'framer-motion'
import { Star, Music, Play } from 'lucide-react'
import HeroBanner from '../components/ui/HeroBanner'
import SectionRow from '../components/ui/SectionRow'
import MediaCard from '../components/ui/MediaCard'
import GlassCard from '../components/ui/GlassCard'
import Badge from '../components/ui/Badge'
import usePlayerStore from '../store/usePlayerStore'
import {
  mockMusic, mockMovies, mockPodcasts,
  heroFeatured, mockTrending,
  mockContinueWatching, mockNewReleases
} from '../data/mockData'

export default function Home() {
  const mode = usePlayerStore((s) => s.mode)
  const play = usePlayerStore((s) => s.play)

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }

  return (
    <motion.div
      className="page"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <HeroBanner items={heroFeatured} />

      <SectionRow title="ادامه پخش">
        {mockContinueWatching.map((item) => (
          <MediaCard key={item.id} item={item} size="sm" showProgress />
        ))}
      </SectionRow>

      <SectionRow title="تازه‌ها" viewAll={() => {}}>
        {mockNewReleases.slice(0, 8).map((item) => (
          <MediaCard key={item.id} item={item} size="md" />
        ))}
      </SectionRow>

      <SectionRow title="پیشنهاد AI">
        {[...mockMusic, ...mockMovies].slice(0, 6).map((item, i) => (
          <MediaCard
            key={`ai-${i}`}
            item={item}
            size="sm"
          />
        ))}
      </SectionRow>

      <section style={{ marginBottom: 28 }}>
        <h2
          style={{
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 14,
            paddingLeft: 4,
            paddingRight: 4
          }}
        >
          پرطرفدار
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {mockTrending.slice(0, 10).map((item, i) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => play(item)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '12px 16px',
                borderRadius: 16,
                background: 'var(--glass-bg)',
                backdropFilter: 'var(--glass-blur)',
                WebkitBackdropFilter: 'var(--glass-blur)',
                border: '1px solid var(--glass-border)',
                cursor: 'pointer'
              }}
            >
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: 'var(--accent-primary)',
                  width: 32,
                  textAlign: 'center',
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <img
                src={item.cover || item.thumbnail}
                alt=""
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  objectFit: 'cover'
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {item.title || item.show}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {item.artist || item.genre || item.host}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Star size={12} fill="var(--accent-gold)" color="var(--accent-gold)" />
                <span style={{ fontSize: 13, fontWeight: 600 }}>{item.rating}</span>
              </div>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'var(--accent-gradient)',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0
                }}
              >
                <Play size={16} fill="#fff" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
