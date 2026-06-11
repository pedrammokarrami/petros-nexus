import { useState } from 'react'
import { motion } from 'framer-motion'
import { Film, Tv, Clapperboard, Radio } from 'lucide-react'
import HeroBanner from '../components/ui/HeroBanner'
import SectionRow from '../components/ui/SectionRow'
import MediaCard from '../components/ui/MediaCard'
import GlassCard from '../components/ui/GlassCard'
import Badge from '../components/ui/Badge'
import usePlayerStore from '../store/usePlayerStore'
import { mockMovies, mockSeries, heroFeatured } from '../data/mockData'

const tabs = [
  { id: 'movie', label: 'فیلم', icon: Film },
  { id: 'series', label: 'سریال', icon: Tv },
  { id: 'doc', label: 'مستند', icon: Clapperboard },
  { id: 'live', label: 'زنده', icon: Radio }
]

export default function Vision() {
  const [activeTab, setActiveTab] = useState('movie')
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
      <div
        style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          paddingBottom: 4,
          marginBottom: 16,
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 18px',
                borderRadius: 20,
                background: isActive ? 'var(--accent-gradient)' : 'var(--glass-bg)',
                backdropFilter: isActive ? 'none' : 'var(--glass-blur)',
                WebkitBackdropFilter: isActive ? 'none' : 'var(--glass-blur)',
                border: isActive ? 'none' : '1px solid var(--glass-border)',
                color: isActive ? '#fff' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 400,
                fontSize: 13,
                whiteSpace: 'nowrap'
              }}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          )
        })}
      </div>

      <HeroBanner items={heroFeatured.filter((h) => h.type !== 'music')} />

      {activeTab === 'movie' && (
        <>
          <SectionRow title="داغ‌ترین فیلم‌ها">
            {mockMovies.slice(0, 5).map((item) => (
              <MediaCard key={item.id} item={{ ...item, type: 'movie' }} size="md" />
            ))}
          </SectionRow>

          <SectionRow title="جدیدترین">
            {mockMovies.slice(3, 8).map((item) => (
              <MediaCard key={item.id} item={{ ...item, type: 'movie' }} size="lg" />
            ))}
          </SectionRow>

          <SectionRow title="بر اساس ژانر">
            {['Sci-Fi', 'Drama', 'Action', 'Thriller'].map((genre, i) => (
              <GlassCard
                key={genre}
                padding={16}
                onClick={() => {}}
                style={{
                  width: 140,
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  minHeight: 100,
                  cursor: 'pointer'
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--accent-primary)'
                  }}
                >
                  {genre}
                </span>
              </GlassCard>
            ))}
          </SectionRow>
        </>
      )}

      {activeTab === 'series' && (
        <>
          <SectionRow title="پرطرفدارترین سریال‌ها">
            {mockSeries.map((item) => (
              <MediaCard key={item.id} item={{ ...item, type: 'series' }} size="lg" />
            ))}
          </SectionRow>

          <SectionRow title="ادامه دار">
            {mockSeries.slice(2).map((item) => (
              <MediaCard key={item.id} item={{ ...item, type: 'series' }} size="md" />
            ))}
          </SectionRow>
        </>
      )}

      {(activeTab === 'doc' || activeTab === 'live') && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 20px',
            gap: 16
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'var(--glass-bg)',
              backdropFilter: 'var(--glass-blur)',
              border: '1px solid var(--glass-border)',
              display: 'grid',
              placeItems: 'center'
            }}
          >
            {activeTab === 'doc' ? (
              <Clapperboard size={32} color="var(--accent-vision)" />
            ) : (
              <Badge variant="live">زنده</Badge>
            )}
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
            {activeTab === 'doc' ? 'مستندها به زودی...' : 'پخش زنده به زودی...'}
          </p>
        </div>
      )}
    </motion.div>
  )
}
