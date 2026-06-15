import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Moon, Bell, Shield, Info, Globe, ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import i18n from '../i18n'

const settingsSections = [
  {
    titleKey: 'settings.general',
    items: [
      { id: 'darkMode', labelKey: 'settings.darkMode', icon: Moon, type: 'toggle' },
      { id: 'notifications', labelKey: 'settings.notifications', icon: Bell, type: 'toggle' }
    ]
  },
  {
    titleKey: 'settings.account',
    items: [
      { id: 'privacy', labelKey: 'settings.privacy', icon: Shield, type: 'link' },
      { id: 'about', labelKey: 'settings.about', icon: Info, type: 'link' }
    ]
  }
]

export default function Settings() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [toggles, setToggles] = useState({ darkMode: true, notifications: true })

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
      <button
        onClick={() => navigate(-1)}
        style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, fontSize: 14, color: 'var(--text-muted)' }}
      >
        <ChevronLeft size={18} />
        {t('settings.back')}
      </button>

      <div style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 12, paddingLeft: 4 }}>
          {t('settings.language')}
        </h3>
        <div style={{
          display: 'flex', gap: 10,
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-lg)',
          padding: 12
        }}>
          {['fa', 'en'].map((lang) => (
            <button
              key={lang}
              onClick={() => i18n.changeLanguage(lang)}
              style={{
                flex: 1, padding: '10px', borderRadius: 12, cursor: 'pointer',
                fontSize: 14, fontWeight: 600,
                background: i18n.language === lang ? 'var(--accent-gradient)' : 'transparent',
                color: i18n.language === lang ? '#fff' : 'var(--text-muted)',
                border: i18n.language === lang ? 'none' : '1px solid var(--glass-border)'
              }}
            >
              {lang === 'fa' ? 'فارسی' : 'English'}
            </button>
          ))}
        </div>
      </div>

      {settingsSections.map((section) => (
        <div key={section.titleKey} style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 12, paddingLeft: 4 }}>
            {t(section.titleKey)}
          </h3>
          <div
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden'
            }}
          >
            {section.items.map((item, i) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 16px',
                  borderBottom: i < section.items.length - 1 ? '1px solid var(--glass-border)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <item.icon size={18} color="var(--text-muted)" />
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{t(item.labelKey)}</span>
                </div>
                {item.type === 'toggle' && (
                  <button
                    onClick={() => setToggles({ ...toggles, [item.id]: !toggles[item.id] })}
                    style={{
                      width: 44,
                      height: 26,
                      borderRadius: 13,
                      background: toggles[item.id] ? 'var(--accent-primary)' : 'rgba(255,255,255,0.15)',
                      border: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'background 0.2s'
                    }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: '#fff',
                        position: 'absolute',
                        top: 3,
                        left: toggles[item.id] ? 22 : 2,
                        transition: 'left 0.2s'
                      }}
                    />
                  </button>
                )}
                {item.type === 'link' && (
                  <ChevronLeft size={16} color="var(--text-muted)" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  )
}
