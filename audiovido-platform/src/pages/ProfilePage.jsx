import { useState, useRef, useCallback, useMemo } from 'react'
import { Pencil, Sparkles, Check, X, ChevronDown } from 'lucide-react'
import './ProfilePage.css'

const ALL_MUSIC_GENRES = [
  'Pop', 'Rock', 'Jazz', 'Classical', 'Electronic', 'Hip-Hop', 'R&B', 'Soul',
  'Funk', 'Blues', 'Country', 'Reggae', 'Metal', 'Punk', 'Folk', 'Indie',
  'Alternative', 'Techno', 'House', 'Lo-Fi', 'Ambient', 'World', 'Persian Pop',
  'Persian Classical', 'Persian Folk',
]

const ALL_CINEMA_GENRES = [
  'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance',
  'Documentary', 'Animation', 'Fantasy', 'Mystery', 'Adventure', 'Musical',
  'War', 'Western', 'Biography', 'Crime', 'Film Noir', 'Indie', 'Persian Cinema',
]

const FRIEND_OPTIONS = [
  'Music Soulmate', 'Nearby Friends', 'Energy Match', 'Random', 'Cinema Twin',
]

const MOCK_USER = {
  name: 'Amir Karimi',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amir&backgroundColor=b6e3f4',
  bio: 'Music producer & vinyl collector. Love Persian jazz and electronic.',
}

function calcScore(name, bio, avatar, musicG, cinemaG, friendD, revenue) {
  let s = 0
  if (name.trim()) s += 15
  if (bio.trim()) s += 15
  if (avatar) s += 10
  if (musicG.length > 0) s += 15
  if (cinemaG.length > 0) s += 15
  if (friendD.length > 0) s += 15
  if (revenue) s += 15
  return s
}

function getLevel(score) {
  if (score < 20) return { label: 'Stranger', cls: 'stranger' }
  if (score < 40) return { label: 'Acquaintance', cls: 'acquaintance' }
  if (score < 60) return { label: 'Friend', cls: 'friend' }
  if (score < 80) return { label: 'Close Friend', cls: 'close-friend' }
  return { label: 'Soulmate', cls: 'soulmate' }
}

function TabPane({ active, children }) {
  if (!active) return null
  return <div className="tab-pane">{children}</div>
}

export default function ProfilePage() {
  const fileInputRef = useRef(null)

  const [activeTab, setActiveTab] = useState('basic')

  const [name, setName] = useState(MOCK_USER.name)
  const [bio, setBio] = useState(MOCK_USER.bio)
  const [avatar, setAvatar] = useState(MOCK_USER.avatar)
  const [musicGenres, setMusicGenres] = useState([])
  const [cinemaGenres, setCinemaGenres] = useState([])
  const [friendDiscovery, setFriendDiscovery] = useState([])
  const [revenueModel, setRevenueModel] = useState(null)

  const [collapsible, setCollapsible] = useState({ music: false, cinema: false, friend: false })
  const [showEditModal, setShowEditModal] = useState(false)
  const [editModalAvatar, setEditModalAvatar] = useState(avatar)
  const [genreModal, setGenreModal] = useState(null)
  const [genreModalSelection, setGenreModalSelection] = useState([])
  const [aiGenerating, setAiGenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const [errors, setErrors] = useState({})
  const [showPopTooltip, setShowPopTooltip] = useState(false)

  const score = useMemo(
    () => calcScore(name, bio, avatar, musicGenres, cinemaGenres, friendDiscovery, revenueModel),
    [name, bio, avatar, musicGenres, cinemaGenres, friendDiscovery, revenueModel]
  )
  const level = useMemo(() => getLevel(score), [score])

  const showToast = useCallback((msg, type) => {
    setToast({ message: msg, type: type || 'success' })
    setTimeout(() => setToast(null), 3000)
  }, [])

  const validate = useCallback(() => {
    const e = {}
    if (!name.trim()) e.name = 'Name is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }, [name])

  const handleSave = useCallback(async () => {
    if (!validate()) return
    setSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSaving(false)
    showToast('Profile updated ✓')
  }, [validate, showToast])

  const handleAIGenerate = useCallback(async () => {
    setAiGenerating(true)
    await new Promise((r) => setTimeout(r, 1200))
    const genres = musicGenres.length > 0 ? musicGenres.slice(0, 3).join(', ') : 'music'
    const rev = revenueModel || 'content'
    setBio(`A passionate ${genres} enthusiast and ${rev === 'both' ? 'creator & listener' : rev === 'creator' ? 'content creator' : 'music lover'}. Always exploring new sounds and connecting with like-minded people.`)
    setAiGenerating(false)
  }, [musicGenres, revenueModel])

  const handleAvatarUpload = useCallback((e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setEditModalAvatar(ev.target.result)
    }
    reader.readAsDataURL(file)
  }, [])

  const confirmAvatar = useCallback(() => {
    setAvatar(editModalAvatar)
    setShowEditModal(false)
  }, [editModalAvatar])

  const openGenreModal = useCallback((type) => {
    const current = type === 'music' ? musicGenres : cinemaGenres
    setGenreModalSelection([...current])
    setGenreModal(type)
  }, [musicGenres, cinemaGenres])

  const confirmGenreModal = useCallback(() => {
    if (genreModal === 'music') setMusicGenres([...genreModalSelection])
    else setCinemaGenres([...genreModalSelection])
    setGenreModal(null)
  }, [genreModal, genreModalSelection])

  const toggleGenreSelection = useCallback((g) => {
    setGenreModalSelection((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : prev.length < 10 ? [...prev, g] : prev
    )
  }, [])

  const toggleCollapsible = useCallback((key) => {
    setCollapsible((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const toggleFriendOption = useCallback((opt) => {
    setFriendDiscovery((prev) =>
      prev.includes(opt) ? prev.filter((x) => x !== opt) : prev.length < 5 ? [...prev, opt] : prev
    )
  }, [])

  const tabs = [
    { key: 'basic', label: '📋 Basic' },
    { key: 'preferences', label: '💎 Preferences' },
    { key: 'monetization', label: '💰 Monetization' },
  ]

  return (
    <div className="profile-edit-page">
      {toast && (
        <div className={`toast${toast.type === 'error' ? ' error' : ''}`} onClick={() => setToast(null)}>
          <Check size={16} /> {toast.message}
        </div>
      )}

      <div className="profile-edit-inner">
        {/* HEADER */}
        <div className="profile-edit-header">
          <span className="logo">AudioVido</span>
          <h1>Profile Edit</h1>
          <span style={{ width: 50 }} />
        </div>

        {/* SCORE BAR */}
        <div className={`score-bar level-${level.cls}`}>
          <span className="score-value">{score}%</span>
          <div className="score-track">
            <div className="score-fill" style={{ width: `${score}%` }} />
          </div>
          <span className={`score-level-badge ${level.cls}`}>{level.label}</span>
        </div>

        {/* TABS */}
        <div className="tab-bar">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`tab-btn${activeTab === t.key ? ' active' : ''}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="tab-content">
          {/* ─── TAB 1: BASIC ─── */}
          <TabPane active={activeTab === 'basic'}>
            <div className="avatar-section">
              <div className="avatar-wrap" onClick={() => { setEditModalAvatar(avatar); setShowEditModal(true) }}>
                <img src={avatar} alt="Avatar" />
                <button className="avatar-edit-btn" onClick={(e) => { e.stopPropagation(); setEditModalAvatar(avatar); setShowEditModal(true) }}>
                  <Pencil size={14} />
                </button>
              </div>
            </div>

            <div className="field-group">
              <label>Name</label>
              <input
                value={name}
                onChange={(e) => name.length < 50 && setName(e.target.value)}
                placeholder="Your name"
                className={errors.name ? 'error' : ''}
              />
              <span className="char-hint">{name.length}/50</span>
              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>

            <div className="field-group">
              <label>Bio</label>
              <textarea
                value={bio}
                onChange={(e) => bio.length < 150 && setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                className={errors.bio ? 'error' : ''}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="char-hint">{bio.length}/150</span>
                <button className="ai-btn" onClick={handleAIGenerate} disabled={aiGenerating}>
                  {aiGenerating ? (
                    <><div className="spinner" /> Generating...</>
                  ) : (
                    <><Sparkles size={14} /> Generate with AI</>
                  )}
                </button>
              </div>
              {errors.bio && <p className="field-error">{errors.bio}</p>}
            </div>
          </TabPane>

          {/* ─── TAB 2: PREFERENCES ─── */}
          <TabPane active={activeTab === 'preferences'}>
            {/* Music Taste */}
            <div className="collapsible">
              <div className="collapsible-header" onClick={() => toggleCollapsible('music')}>
                <span className="icon">🎵</span>
                <span className="title">Music Taste</span>
                <span className="count">({musicGenres.length} selected)</span>
                <ChevronDown size={16} className={`arrow${collapsible.music ? ' open' : ''}`} />
              </div>
              <div className={`collapsible-body${collapsible.music ? ' open' : ''}`}>
                <div className="bubble-grid">
                  {musicGenres.map((g) => (
                    <span key={g} className="bubble">
                      {g}
                      <button className="bubble-remove" onClick={() => setMusicGenres((prev) => prev.filter((x) => x !== g))}>
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                  <button className="add-more-btn" onClick={() => openGenreModal('music')}>
                    + Add More
                  </button>
                </div>
              </div>
            </div>

            {/* Cinema Taste */}
            <div className="collapsible">
              <div className="collapsible-header" onClick={() => toggleCollapsible('cinema')}>
                <span className="icon">🎬</span>
                <span className="title">Cinema Taste</span>
                <span className="count">({cinemaGenres.length} selected)</span>
                <ChevronDown size={16} className={`arrow${collapsible.cinema ? ' open' : ''}`} />
              </div>
              <div className={`collapsible-body${collapsible.cinema ? ' open' : ''}`}>
                <div className="bubble-grid">
                  {cinemaGenres.map((g) => (
                    <span key={g} className="bubble">
                      {g}
                      <button className="bubble-remove" onClick={() => setCinemaGenres((prev) => prev.filter((x) => x !== g))}>
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                  <button className="add-more-btn" onClick={() => openGenreModal('cinema')}>
                    + Add More
                  </button>
                </div>
              </div>
            </div>

            {/* Friend Discovery */}
            <div className="collapsible">
              <div className="collapsible-header" onClick={() => toggleCollapsible('friend')}>
                <span className="icon">🤝</span>
                <span className="title">Friend Discovery</span>
                <span className="count">({friendDiscovery.length} selected)</span>
                <ChevronDown size={16} className={`arrow${collapsible.friend ? ' open' : ''}`} />
              </div>
              <div className={`collapsible-body${collapsible.friend ? ' open' : ''}`}>
                <div className="bubble-grid">
                  {friendDiscovery.map((o) => (
                    <span key={o} className="bubble">
                      {o}
                      <button className="bubble-remove" onClick={() => setFriendDiscovery((prev) => prev.filter((x) => x !== o))}>
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                  {FRIEND_OPTIONS.filter((o) => !friendDiscovery.includes(o)).map((o) => (
                    <button key={o} className="add-more-btn" onClick={() => toggleFriendOption(o)}>
                      + {o}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </TabPane>

          {/* ─── TAB 3: MONETIZATION ─── */}
          <TabPane active={activeTab === 'monetization'}>
            <div className="field-group">
              <label>How do you want to earn?</label>
              <div className="radio-group">
                {[
                  { value: 'creator', title: 'Creator', desc: 'Upload content, earn from plays' },
                  { value: 'listener', title: 'Listener', desc: 'Listen, earn badges & rewards' },
                  { value: 'both', title: 'Both', desc: 'Do both, maximize earning' },
                ].map((opt) => (
                  <div
                    key={opt.value}
                    className={`radio-option${revenueModel === opt.value ? ' selected' : ''}`}
                    onClick={() => setRevenueModel(opt.value)}
                  >
                    <div className="radio-circle">
                      <div className="radio-circle-inner" />
                    </div>
                    <div className="radio-text">
                      <span className="radio-title">{opt.title}</span>
                      <span className="radio-desc">{opt.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="field-group" style={{ marginTop: 24 }}>
              <label>Your Popularity</label>
              <div className="popularity-card">
                <span className="popularity-star">⭐</span>
                <div className="popularity-info">
                  <div className="popularity-pct">87%</div>
                  <div className="popularity-text">More popular than 73% of users</div>
                </div>
                <button
                  className="popularity-info-btn"
                  onClick={() => setShowPopTooltip((v) => !v)}
                  onBlur={() => setTimeout(() => setShowPopTooltip(false), 200)}
                >
                  ?
                  {showPopTooltip && (
                    <div className="popularity-tooltip">
                      Based on follower count and community engagement
                    </div>
                  )}
                </button>
              </div>
            </div>
          </TabPane>
        </div>
      </div>

      {/* SAVE BAR */}
      <div className="save-bar">
        <div className="save-bar-inner">
          <button className="save-btn" onClick={handleSave} disabled={saving}>
            {saving ? <div className="spinner" /> : 'SAVE PROFILE'}
          </button>
        </div>
      </div>

      {/* ─── AVATAR UPLOAD MODAL ─── */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-glass" style={{ position: 'relative', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowEditModal(false)}><X size={16} /></button>
            <h3>Upload Profile Picture</h3>
            <img src={editModalAvatar} alt="Preview" className="modal-avatar-preview" />
            <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
              Drag image or click to upload
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarUpload} />
            <div className="modal-btn-row">
              <button className="modal-btn modal-btn--cancel" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className="modal-btn modal-btn--save" onClick={confirmAvatar}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── GENRE SELECTOR MODAL ─── */}
      {genreModal && (
        <div className="modal-overlay" onClick={() => setGenreModal(null)}>
          <div className="modal-glass" style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setGenreModal(null)}><X size={16} /></button>
            <h3>Select {genreModal === 'music' ? 'Music' : 'Cinema'} Genres</h3>
            <p className="genre-limit-hint">{genreModalSelection.length}/10 selected</p>
            <div className="genre-checklist">
              {(genreModal === 'music' ? ALL_MUSIC_GENRES : ALL_CINEMA_GENRES).map((g) => (
                <div
                  key={g}
                  className={`genre-check-item${genreModalSelection.includes(g) ? ' checked' : ''}`}
                  onClick={() => toggleGenreSelection(g)}
                >
                  <div className="check-box" />
                  {g}
                </div>
              ))}
            </div>
            <div className="modal-btn-row">
              <button className="modal-btn modal-btn--cancel" onClick={() => setGenreModal(null)}>Cancel</button>
              <button className="modal-btn modal-btn--save" onClick={confirmGenreModal}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
