import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Bell, Settings, X } from 'lucide-react'
import usePlayerStore from '../../store/usePlayerStore'

const pageTitleKeys = {
  '/': 'header.home',
  '/home': 'header.home',
  '/sound': 'header.sound',
  '/vision': 'header.vision',
  '/search': 'header.search',
  '/hub': 'header.hub',
  '/settings': 'header.settings'
}

const notifications = [
  { id: 1, text: 'آلبوم جدید از علیرضا قربانی منتشر شد', time: '۲ ساعت پیش' },
  { id: 2, text: 'اپیزود جدید پادکست چنل بی در دسترس است', time: '۵ ساعت پیش' },
  { id: 3, text: 'فیلم Interstellar به کتابخانه اضافه شد', time: '۱ روز پیش' }
]

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const mode = usePlayerStore((s) => s.mode)
  const [showNotifications, setShowNotifications] = useState(false)

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
          AudioVido
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
            / {t(pageTitleKeys[location.pathname] || '', '')}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          style={{ width: 40, height: 40, display: 'grid', placeItems: 'center', borderRadius: 12 }}
        >
          <Bell size={20} color={showNotifications ? 'var(--accent-primary)' : 'var(--text-muted)'} />
        </button>
        <button
          onClick={() => navigate('/settings')}
          style={{ width: 40, height: 40, display: 'grid', placeItems: 'center', borderRadius: 12 }}
        >
          <Settings size={20} color="var(--text-muted)" />
        </button>

        {showNotifications && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: 320,
              background: 'var(--bg-primary)',
              border: '1px solid var(--glass-border)',
              borderRadius: 16,
              padding: 16,
              marginTop: 8,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              zIndex: 200,
              backdropFilter: 'blur(30px)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>{t('header.notifications')}</span>
              <button onClick={() => setShowNotifications(false)} style={{ width: 32, height: 32, display: 'grid', placeItems: 'center' }}>
                <X size={16} color="var(--text-muted)" />
              </button>
            </div>
            {notifications.map((n) => (
              <div
                key={n.id}
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--glass-border)',
                  fontSize: 13,
                  lineHeight: 1.5
                }}
              >
                <div style={{ color: 'var(--text-primary)', marginBottom: 2 }}>{n.text}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{n.time}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
