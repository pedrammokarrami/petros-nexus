import { useState } from 'react'
import { motion } from 'framer-motion'
import { Music, Mic2, Radio, BookOpen } from 'lucide-react'
import SectionRow from '../components/ui/SectionRow'
import MediaCard from '../components/ui/MediaCard'
import GlassCard from '../components/ui/GlassCard'
import Badge from '../components/ui/Badge'
import usePlayerStore from '../store/usePlayerStore'
import { mockMusic, mockPodcasts } from '../data/mockData'

const tabs = [
  { id: 'music', label: 'موسیقی', icon: Music },
  { id: 'podcast', label: 'پادکست', icon: Mic2 },
  { id: 'radio', label: 'رادیو', icon: Radio },
  { id: 'audiobook', label: 'کتاب صوتی', icon: BookOpen }
]

export default function Sound() {
  const [activeTab, setActiveTab] = useState('music')
  const play = usePlayerStore((s) => s.play)

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
      <div
        style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          paddingBottom: 4,
          marginBottom: 20,
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
                  <Badge variant="hq">ویژه</Badge>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>
                  برترین‌های هفته
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  {featuredPlaylist.length} قطعه • منتخب ویراستاران
                </p>
              </div>
            </div>
          </GlassCard>

          <SectionRow title="محبوب‌ترین">
            {mockMusic.slice(0, 6).map((item) => (
              <MediaCard key={item.id} item={{ ...item, type: 'music' }} size="sm" />
            ))}
          </SectionRow>

          <SectionRow title="جدیدترین">
            {mockMusic.slice(3, 9).map((item) => (
              <MediaCard key={item.id} item={{ ...item, type: 'music' }} size="md" />
            ))}
          </SectionRow>

          <SectionRow title="پیشنهاد هفته">
            {mockMusic.slice(2, 7).map((item) => (
              <MediaCard key={item.id} item={{ ...item, type: 'music' }} size="sm" />
            ))}
          </SectionRow>
        </>
      )}

      {activeTab === 'podcast' && (
        <>
          <SectionRow title="پادکست‌های داغ">
            {mockPodcasts.map((item) => (
              <MediaCard key={item.id} item={{ ...item, type: 'podcast' }} size="md" />
            ))}
          </SectionRow>

          <SectionRow title="پیشنهادی">
            {[...mockPodcasts].reverse().map((item) => (
              <MediaCard key={item.id} item={{ ...item, type: 'podcast' }} size="sm" />
            ))}
          </SectionRow>
        </>
      )}

      {(activeTab === 'radio' || activeTab === 'audiobook') && (
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
            {activeTab === 'radio' ? <Radio size={32} color="var(--accent-sound)" /> : <BookOpen size={32} color="var(--accent-sound)" />}
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
            {activeTab === 'radio' ? 'ایستگاه‌های رادیویی به زودی...' : 'کتاب‌های صوتی به زودی...'}
          </p>
        </div>
      )}
    </motion.div>
  )
}
