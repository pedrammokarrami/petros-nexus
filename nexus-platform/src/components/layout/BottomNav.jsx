import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Home, Search, Library, User, Music, Film } from 'lucide-react'
import usePlayerStore from '../../store/usePlayerStore'
import './BottomNav.css'

const tabs = [
  { path: '/home', icon: Home, labelKey: 'nav.home' },
  { path: '/search', icon: Search, labelKey: 'nav.search' },
  { path: null, icon: null, label: null, isModeSwitch: true },
  { path: '/hub', icon: Library, labelKey: 'nav.hub' },
  { path: '/profile', icon: User, labelKey: 'nav.profile' },
]

const tabColors = {
  '/home': '#00f5d4',
  '/search': '#a0a0b0',
  '/hub': '#00f5d4',
  '/profile': '#f72585',
}

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const { mode, toggleMode } = usePlayerStore()

  return (
    <nav className="bottom-nav">
      {tabs.map((tab, index) => {
        if (tab.isModeSwitch) {
          const isSoundMode = mode === 'sound'
          return (
            <button
              key={`mode-switch-${index}`}
              className={`mode-switch-btn ${isSoundMode ? 'sound-mode' : 'vision-mode'}`}
              onClick={() => {
                const newMode = mode === 'sound' ? 'vision' : 'sound'
                toggleMode()
                navigate(newMode === 'sound' ? '/sound' : '/vision')
              }}
            >
              <motion.div
                key={mode}
                className="mode-switch-icon"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                {isSoundMode ? <Music size={20} /> : <Film size={20} />}
              </motion.div>
              <span className="mode-switch-label">
                {isSoundMode ? t('nav.sound') : t('nav.vision')}
              </span>
            </button>
          )
        }

        const isActive = location.pathname === tab.path
        const color = tabColors[tab.path]

        return (
          <button
            key={`tab-${index}`}
            className="bottom-nav-tab"
            onClick={() => navigate(tab.path)}
          >
            <div className={`tab-icon-wrapper ${isActive ? 'active' : ''}`}>
              <div
                className="tab-icon-glow"
                style={{
                  background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                  boxShadow: isActive ? `0 0 12px ${color}` : 'none',
                }}
              />
              <tab.icon
                size={22}
                className="tab-icon"
                style={{
                  color: isActive ? color : 'rgba(255, 255, 255, 0.4)',
                }}
              />
            </div>
            <span
              className="tab-label"
              style={{
                color: isActive ? color : 'rgba(255, 255, 255, 0.35)',
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {t(tab.labelKey)}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
