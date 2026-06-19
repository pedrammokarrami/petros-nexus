import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronDown, ChevronUp, Send, Users } from 'lucide-react'
import { TVScreen } from '../designSystem/fanClub/components/club/TVScreen'
import { MoodMeter } from '../designSystem/fanClub/components/club/MoodMeter'
import { FloatingMessage } from '../designSystem/fanClub/components/club/FloatingMessage'
import { PhysicalButton } from '../designSystem/fanClub/components/club/PhysicalButton'
import { CLUB_CONFIGS } from '../designSystem/fanClub/config/clubConfigs'
import { calculateSentiment } from '../designSystem/fanClub/utils/sentimentAnalysis'
import './fanClubPage.css'

let nextId = 100

function moodLabel(m) {
  const v = (m + 50) / 100
  if (v < 0.2) return 'Melancholic'
  if (v < 0.4) return 'Mellow'
  if (v < 0.6) return 'Engaged'
  if (v < 0.85) return 'Hype'
  return 'Euphoric'
}

export default function FanClubPage() {
  const navigate = useNavigate()
  const { clubId } = useParams()
  const [currentClub] = useState(clubId || 'night-shift')
  const [mood, setMood] = useState(0)
  const [chatMessages, setChatMessages] = useState([])
  const [messageText, setMessageText] = useState('')
  const [showDrinkMenu, setShowDrinkMenu] = useState(false)
  const [showEmojiSelector, setShowEmojiSelector] = useState(false)
  const [showVoteMenu, setShowVoteMenu] = useState(false)
  const [bursts, setBursts] = useState([])
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const club = CLUB_CONFIGS[currentClub]

  useEffect(() => {
    setChatMessages([...club.seedMessages])
    setMood(0)
  }, [currentClub])

  const sendMessage = useCallback(() => {
    const t = messageText.trim()
    if (!t) return
    const sentiment = calculateSentiment(t)
    const id = nextId++
    const msg = { id, author: 'You', persona: 'member', text: t, intensity: 0.7, timestamp: Date.now() }
    setChatMessages(prev => [...prev, msg])
    setMessageText('')
    setMood(prev => Math.max(-50, Math.min(50, prev + sentiment * 0.3)))
    if (sentiment > 15) {
      const burstId = Date.now()
      setBursts(prev => [...prev, { id: burstId, emoji: '🔥' }])
      setTimeout(() => setBursts(prev => prev.filter(b => b.id !== burstId)), 1400)
    }
  }, [messageText])

  const handleDrinkOrder = useCallback((drink) => {
    setShowDrinkMenu(false)
    const burstId = Date.now()
    setBursts(prev => [...prev, { id: burstId, emoji: drink.emoji || '🍻' }])
    setTimeout(() => setBursts(prev => prev.filter(b => b.id !== burstId)), 1400)
  }, [])

  const handleReactionSelect = useCallback((emoji) => {
    setShowEmojiSelector(false)
    const burstId = Date.now()
    setBursts(prev => [...prev, { id: burstId, emoji }])
    setTimeout(() => setBursts(prev => prev.filter(b => b.id !== burstId)), 1400)
    setMood(prev => Math.min(50, prev + 5))
  }, [])

  const handleVote = useCallback(() => {
    setShowVoteMenu(false)
  }, [])

  const handleChallenge = useCallback(() => {
    const burstId = Date.now()
    setBursts(prev => [...prev, { id: burstId, emoji: '⚡' }])
    setTimeout(() => setBursts(prev => prev.filter(b => b.id !== burstId)), 1400)
  }, [])

  const visibleMessages = chatMessages.slice(-8)
  const moodVal = Math.max(0, Math.min(1, (mood + 50) / 100))

  return (
    <div className="fan-club-page">
      <button
        onClick={() => navigate(-1)}
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.7)',
          cursor: 'pointer',
          width: 36,
          height: 36,
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 10,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
          e.currentTarget.style.color = '#fff'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
          e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
        }}
      >
        <ArrowLeft size={18} />
      </button>
      <div className="fan-club-layout">
        <div className="fan-club-main">
          <div className="fan-club-stage">
            <TVScreen caption={club.caption}>
              <div className="tv-content" style={{ flexDirection: 'column', gap: 6 }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#00f5d4' }}>
                  ▶ NOW PLAYING
                </div>
                <h2>{club.marqueeContent}</h2>
              </div>
            </TVScreen>
            <MoodMeter value={moodVal} sampleCount={chatMessages.length} />
          </div>

          <div className="fan-club-chat">
            {visibleMessages.map((m) => (
              <FloatingMessage key={m.id} author={m.author} persona={m.persona} intensity={m.intensity || 0.5}>
                {m.text}
              </FloatingMessage>
            ))}
          </div>

          <div className="fan-club-actions">
            <PhysicalButton variant="drink" label="Order" onClick={() => setShowDrinkMenu(true)} />
            <PhysicalButton variant="arcade" label="React" icon="😍" onClick={() => setShowEmojiSelector(true)} />
            <PhysicalButton variant="neon" label="Challenge" icon="⚡" onClick={handleChallenge} />
            <PhysicalButton variant="jukebox" label="Vote" icon="VOTE" onClick={() => setShowVoteMenu(true)} />
          </div>

          <div className="fan-club-composer">
            <input
              className="message-input"
              placeholder="Say something to the room..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="btn-send" onClick={sendMessage}>
              <Send size={16} />
            </button>
          </div>
        </div>

        <div className={`fan-club-sidebar${sidebarCollapsed ? ' collapsed' : ''}`}>
          <button
            className="fan-club-sidebar-toggle"
            onClick={() => setSidebarCollapsed(v => !v)}
          >
            <Users size={14} />
            {sidebarCollapsed ? 'Show' : 'Hide'} club stats
            {sidebarCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>

          <div className="member-stat-card">
            <span className="member-stat-label">VIBING NOW</span>
            <span className="member-stat-value">{club.members.length + 41}</span>
          </div>
          <div className="member-stat-card">
            <span className="member-stat-label">MOOD</span>
            <span className="member-stat-value mood">{moodLabel(mood)}</span>
          </div>
          <div className="member-stat-card">
            <span className="member-stat-label">IN CLUB</span>
            <span className="member-stat-value name">{club.name}</span>
          </div>
        </div>
      </div>

      {showDrinkMenu && (
        <div className="modal-overlay" onClick={() => setShowDrinkMenu(false)}>
          <div className="drink-menu" onClick={e => e.stopPropagation()}>
            <div className="drink-menu-title">The Menu</div>
            <div className="drink-menu-sub">▸ pick your poison ◂</div>
            <div className="drink-list">
              {club.drinks.map((d) => (
                <button key={d.id} className="drink-item" onClick={() => handleDrinkOrder(d)}>
                  <span className="drink-emoji">{d.emoji}</span>
                  <span className="drink-name">{d.name}</span>
                  <span className="drink-order">order →</span>
                </button>
              ))}
            </div>
            <button className="drink-close" onClick={() => setShowDrinkMenu(false)}>✕</button>
          </div>
        </div>
      )}

      {showEmojiSelector && (
        <div className="modal-overlay" onClick={() => setShowEmojiSelector(false)}>
          <div className="emoji-picker" onClick={e => e.stopPropagation()}>
            {['🔥', '😍', '🤯', '💯', '🥲', '🎧', '👁', '✨'].map(e => (
              <button key={e} className="emoji-btn" onClick={() => handleReactionSelect(e)}>{e}</button>
            ))}
          </div>
        </div>
      )}

      {showVoteMenu && (
        <div className="modal-overlay" onClick={() => setShowVoteMenu(false)}>
          <div className="drink-menu" onClick={e => e.stopPropagation()}>
            <div className="drink-menu-title">Vote for Next Track</div>
            <div className="drink-list">
              {[
                { id: 't1', name: 'Night Drive', artist: 'Synthwave Kings' },
                { id: 't2', name: 'Midnight Rain', artist: 'Lo-Fi Beats' },
                { id: 't3', name: 'Electric Pulse', artist: 'Neon Waves' },
              ].map(t => (
                <button key={t.id} className="drink-item" onClick={handleVote}>
                  <span className="drink-name" style={{ flex: 1 }}>{t.name}</span>
                  <span className="drink-order">vote →</span>
                </button>
              ))}
            </div>
            <button className="drink-close" onClick={() => setShowVoteMenu(false)}>✕</button>
          </div>
        </div>
      )}

      {bursts.map(b => (
        <div key={b.id} className="burst-container">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="burst-particle" style={{
              left: '50%',
              top: '50%',
              '--dx': `${(Math.random() - 0.5) * 200}px`,
              '--dy': `${-100 - Math.random() * 160}px`,
              '--rot': `${(Math.random() - 0.5) * 720}deg`,
              '--delay': `${Math.random() * 80}ms`,
            }}>
              {b.emoji}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
