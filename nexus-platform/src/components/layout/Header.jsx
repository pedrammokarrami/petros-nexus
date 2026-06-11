import { useLocation } from 'react-router-dom'
import { Bell, Settings } from 'lucide-react'
import usePlayerStore from '../../store/usePlayerStore'

const pageTitles = {
  '/': 'خانه',
  '/home': 'خانه',
  '/sound': 'صدا',
  '/vision': 'تصویر',
  '/search': 'جستجو',
  '/library': 'کتابخانه'
}

export default function Header() {
  const location = useLocation()
  const mode = usePlayerStore((s) => s.mode)

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--header-height)',
        paddingTop: 'var(--safe-top)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        zIndex: 100,
        background: 'rgba(8, 8, 16, 0.85)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        borderBottom: '1px solid var(--glass-border)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span
          style={{
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: '0.15em',
            background: 'var(--accent-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          NEXUS
        </span>
        {location.pathname !== '/' && (
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--text-muted)',
              marginRight: 8
            }}
          >
            / {pageTitles[location.pathname] || ''}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button style={{ width: 40, height: 40, display: 'grid', placeItems: 'center', borderRadius: 12 }}>
          <Bell size={20} color="var(--text-muted)" />
        </button>
        <button style={{ width: 40, height: 40, display: 'grid', placeItems: 'center', borderRadius: 12 }}>
          <Settings size={20} color="var(--text-muted)" />
        </button>
      </div>
    </header>
  )
}
