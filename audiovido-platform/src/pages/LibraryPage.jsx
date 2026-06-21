import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import AuroraBackground from '../components/AuroraBackground'
import LiquidCard from '../components/LiquidCard'
import './LibraryPage.css'

export default function LibraryPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const cards = [
    {
      id: 'business',
      icon: '\uD83D\uDCBC',
      label: t('nav.business', 'Business'),
      color: 'business',
      path: '/hub/business',
    },
    {
      id: 'playlists',
      icon: '\uD83C\uDFB5',
      label: t('nav.playlists', 'Playlists'),
      color: 'playlists',
      path: '/hub/playlists',
    },
    {
      id: 'friends',
      icon: '\uD83D\uDC9A',
      label: t('nav.friends', 'Friends'),
      color: 'friends',
      path: '/hub/friends',
    },
    {
      id: 'fanclubs',
      icon: '\uD83D\uDC65',
      label: t('nav.fanclubs', 'Fan Clubs'),
      color: 'fanclubs',
      path: '/hub/fan-club',
    },
  ]

  return (
    <div className="library-page">
      <AuroraBackground />

      <header className="library-header">
        <h1 className="library-title">
          <span className="nexus-logo">AudioVido</span>
          <span className="library-slash">/</span>
          <span className="library-label">{t('nav.hub', 'Hub')}</span>
        </h1>

        <div className="header-actions">
          <button className="header-btn" aria-label="Notifications">
            {'\uD83D\uDD14'}
          </button>
          <button className="header-btn" aria-label="Settings">
            {'\u2699\uFE0F'}
          </button>
        </div>
      </header>

      <main className="library-content">
        <div className="cards-grid circular-grid">
          {cards.map((card, index) => (
            <div key={card.id} className="card-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <LiquidCard
                icon={card.icon}
                label={card.label}
                color={card.color}
                onClick={() => navigate(card.path)}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
