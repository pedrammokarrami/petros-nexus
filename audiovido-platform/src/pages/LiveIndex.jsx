import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Monitor, Film, Tv, Wine, Music, Mic2 } from 'lucide-react'

const modes = [
  {
    id: 'cinema-modern',
    path: '/live/cinema/modern',
    icon: Monitor,
    labelKey: 'live.mode.modern',
    descKey: 'live.mode.modernDesc',
    gradient: 'linear-gradient(135deg, #0a0a2e, #1a1a4e)',
    color: '#60a5fa',
  },
  {
    id: 'cinema-negative',
    path: '/live/cinema/negative',
    icon: Film,
    labelKey: 'live.mode.negative',
    descKey: 'live.mode.negativeDesc',
    gradient: 'linear-gradient(135deg, #1a1a0a, #3a2a18)',
    color: '#a78b5a',
  },
  {
    id: 'cinema-tv',
    path: '/live/cinema/tv',
    icon: Tv,
    labelKey: 'live.mode.tv',
    descKey: 'live.mode.tvDesc',
    gradient: 'linear-gradient(135deg, #0a0a14, #1a1a2e)',
    color: '#38bdf8',
  },
  {
    id: 'music-bar',
    path: '/live/music/bar',
    icon: Wine,
    labelKey: 'live.mode.bar',
    descKey: 'live.mode.barDesc',
    gradient: 'linear-gradient(135deg, #1a0e06, #3a2010)',
    color: '#f59e0b',
  },
  {
    id: 'music-club',
    path: '/live/music/club',
    icon: Music,
    labelKey: 'live.mode.club',
    descKey: 'live.mode.clubDesc',
    gradient: 'linear-gradient(135deg, #1a0520, #2a1050)',
    color: '#a855f7',
  },
  {
    id: 'music-concert',
    path: '/live/music/concert',
    icon: Mic2,
    labelKey: 'live.mode.concert',
    descKey: 'live.mode.concertDesc',
    gradient: 'linear-gradient(135deg, #0e0818, #1a1030)',
    color: '#f43f5e',
  },
]

export default function LiveIndex() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="page" style={{ padding: '20px 16px 100px' }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>
        {t('live.title')}
      </h1>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>
        {t('live.subtitle')}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {modes.map((mode, i) => (
          <motion.button
            key={mode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => navigate(mode.path)}
            style={{
              position: 'relative',
              height: 140,
              borderRadius: 20,
              overflow: 'hidden',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              textAlign: 'left',
            }}
          >
            <div style={{
              position: 'absolute', inset: 0,
              background: mode.gradient,
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
            }} />
            <div style={{
              position: 'relative', zIndex: 2,
              height: '100%',
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              gap: 6,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: `${mode.color}22`,
                  display: 'grid', placeItems: 'center',
                }}>
                  <mode.icon size={20} color={mode.color} />
                </div>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>
                  {t(mode.labelKey)}
                </span>
              </div>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
                {t(mode.descKey)}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
