import { useState, useMemo } from 'react'
import './LanguageSearchPopup.css'

export default function LanguageSearchPopup({
  languages,
  currentLanguage,
  onSelect,
  onClose,
  t,
}) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredLanguages = useMemo(() => {
    if (!searchQuery) return languages
    const q = searchQuery.toLowerCase()
    return languages.filter(lang =>
      lang.name.toLowerCase().includes(q)
    )
  }, [searchQuery, languages])

  return (
    <div className="language-popup-overlay" onClick={onClose}>
      <div className="language-popup" onClick={e => e.stopPropagation()}>
        <div className="popup-header">
          <h2>{t('settings.selectLanguage')}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <input
          type="text"
          className="language-search-input"
          placeholder={t('settings.searchLanguage')}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          autoFocus
        />

        <div className="languages-list">
          {filteredLanguages.length > 0 ? (
            filteredLanguages.map(lang => (
              <button
                key={lang.code}
                className={`language-option ${
                  currentLanguage === lang.code ? 'active' : ''
                }`}
                onClick={() => onSelect(lang.code)}
              >
                <span className="lang-name">{lang.name}</span>
                {currentLanguage === lang.code && (
                  <span className="checkmark">✓</span>
                )}
              </button>
            ))
          ) : (
            <div className="no-results">{t('settings.noResults')}</div>
          )}
        </div>
      </div>
    </div>
  )
}
