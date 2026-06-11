import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Search, Library, User, Music, Film } from 'lucide-react'
import usePlayerStore from '../../store/usePlayerStore'

const tabs = [
  { path: '/home', icon: Home, label: 'خانه' },
  { path: '/search', icon: Search, label: 'جستجو' },
  { path: null, icon: null, label: null, isModeSwitch: true },
  { path: '/library', icon: Library, label: 'کتابخانه' },
  { path: '/library', icon: User, label: 'من' }
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { mode, toggleMode } = usePlayerStore()

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: `calc(var(--bottomnav-height) + var(--safe-bottom))`,
        paddingBottom: 'var(--safe-bottom)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 100,
        background: 'rgba(8, 8, 16, 0.9)',
        backdropFilter: 'blur(40px) saturate(200%)',
        WebkitBackdropFilter: 'blur(40px) saturate(200%)',
        borderTop: '1px solid var(--glass-border)'
      }}
    >
      {tabs.map((tab) => {
        if (tab.isModeSwitch) {
          return (
            <button
              key="mode-switch"
              onClick={toggleMode}
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                position: 'relative',
                background: 'var(--accent-gradient)',
                color: '#fff',
                marginTop: -20,
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                border: '2px solid var(--bg-primary)'
              }}
            >
              <motion.div
                key={mode}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                {mode === 'sound' ? <Music size={22} /> : <Film size={22} />}
              </motion.div>
              <span style={{ fontSize: 9, fontWeight: 600, opacity: 0.8 }}>
                {mode === 'sound' ? 'صدا' : 'تصویر'}
              </span>
            </button>
          )
        }

        const isActive = location.pathname === tab.path

        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              width: 64,
              height: 48,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              position: 'relative'
            }}
          >
            {isActive && (
              <motion.div
                layoutId="nav-bubble"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                style={{
                  position: 'absolute',
                  top: -2,
                  width: 24,
                  height: 3,
                  borderRadius: 2,
                  background: 'var(--accent-gradient)'
                }}
              />
            )}
            <tab.icon
              size={22}
              color={isActive ? 'var(--accent-primary)' : 'var(--text-muted)'}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)'
              }}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
