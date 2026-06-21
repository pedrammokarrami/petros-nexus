import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import LanguageSearchPopup from '../components/LanguageSearchPopup'
import './SettingsPage.css'

export default function SettingsPage() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [showLanguagePopup, setShowLanguagePopup] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fa', name: 'فارسی' },
    { code: 'ar', name: 'العربية' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' },
  ]

  const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0]

  const handleLanguageSelect = (languageCode) => {
    i18n.changeLanguage(languageCode)
    setShowLanguagePopup(false)
    localStorage.setItem('preferredLanguage', languageCode)

    const dir = languageCode === 'fa' || languageCode === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.dir = dir
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <button className="settings-back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>{t('settings.title')}</h1>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h2 className="section-title">{t('settings.general')}</h2>

          <div
            className="settings-item language-item"
            onClick={() => setShowLanguagePopup(true)}
          >
            <div className="language-left">
              <div className="globe-icon-container">
                <svg
                  className="globe-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div className="language-info">
                <p className="language-label">{t('settings.language')}</p>
                <p className="language-current">{currentLanguage.name}</p>
              </div>
            </div>
            <button className="settings-chevron">&gt;</button>
          </div>

          <div className="settings-item">
            <div className="settings-info">
              <p className="setting-label">{t('settings.theme')}</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="settings-item">
            <div className="settings-info">
              <p className="setting-label">{t('settings.notificationsEnabled')}</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">{t('settings.account')}</h2>

          <div className="settings-item">
            <p className="setting-label">{t('settings.changePassword')}</p>
            <button className="settings-action-btn">&gt;</button>
          </div>

          <div className="settings-item">
            <p className="setting-label">{t('settings.privacy')}</p>
            <button className="settings-action-btn">&gt;</button>
          </div>
        </div>

        <div className="settings-section danger-section">
          <h2 className="section-title" style={{ color: '#ff6b6b' }}>
            {t('settings.deleteAccount')}
          </h2>
          <button className="delete-account-btn">
            {t('settings.deleteAccount')}
          </button>
        </div>
      </div>

      {showLanguagePopup && (
        <LanguageSearchPopup
          languages={languages}
          currentLanguage={i18n.language}
          onSelect={handleLanguageSelect}
          onClose={() => setShowLanguagePopup(false)}
          t={t}
        />
      )}
    </div>
  )
}
