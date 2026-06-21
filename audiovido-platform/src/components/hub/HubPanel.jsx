import { motion } from 'framer-motion'
import { ArrowLeft, ListMusic, Briefcase, Users, Heart } from 'lucide-react'

const PANEL_META = {
  playlists: { title: 'Playlists', icon: ListMusic, color: '#A78BFA' },
  business: { title: 'Business', icon: Briefcase, color: '#FBBF24' },
  clubs: { title: 'Fan Clubs', icon: Users, color: '#FB923C' },
  friends: { title: 'Friends', icon: Heart, color: '#4ADE80' },
}

export default function HubPanel({ panelId, onClose, children }) {
  const meta = PANEL_META[panelId]
  const Icon = meta.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 'var(--header-height)',
        left: 0,
        right: 0,
        bottom: 'calc(var(--miniplayer-height) + var(--bottomnav-height) + var(--safe-bottom))',
        zIndex: 50,
        background: '#0a0a0f',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}
      >
        <button
          onClick={onClose}
          style={{
            width: 36,
            height: 36,
            display: 'grid',
            placeItems: 'center',
            borderRadius: 10,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={18} color="rgba(255,255,255,0.7)" />
        </button>
        <Icon size={20} color={meta.color} />
        <span style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>
          {meta.title}
        </span>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div
          style={{
            maxWidth: 430,
            margin: '0 auto',
            padding: 16,
          }}
        >
          {children}
        </div>
      </div>
    </motion.div>
  )
}
