import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pencil, LogOut, Settings, Wallet, Play } from 'lucide-react'
import './ProfilePage.css'

const MOCK_USER = {
  name: 'Amir Karimi',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amir&backgroundColor=b6e3f4',
  bio: 'Music producer & vinyl collector. Love Persian jazz and electronic.',
  followerCount: 1240,
  followingCount: 452,
  listeningHours: 287,
  playlistCount: 24,
}

const MOCK_MUSIC = [
  { id: 'm1', title: 'Gole Yakh', artist: 'Googoosh', image: 'https://picsum.photos/seed/gole/200/200' },
  { id: 'm2', title: 'Havaye Gerye', artist: 'Hayedeh', image: 'https://picsum.photos/seed/havaye/200/200' },
  { id: 'm3', title: 'Leila', artist: 'Dariush', image: 'https://picsum.photos/seed/leila2/200/200' },
  { id: 'm4', title: 'Mastaneh', artist: 'Homayoun Shajarian', image: 'https://picsum.photos/seed/mastaneh/200/200' },
  { id: 'm5', title: 'Kavir', artist: 'Mohsen Namjoo', image: 'https://picsum.photos/seed/kavir2/200/200' },
  { id: 'm6', title: 'Sultan of Hearts', artist: 'Ebi', image: 'https://picsum.photos/seed/ebi/200/200' },
  { id: 'm7', title: 'Delam Tange', artist: 'Shadmehr Aghili', image: 'https://picsum.photos/seed/delam/200/200' },
]

const MOCK_VIDEOS = [
  { id: 'v1', title: 'Live at Dolby Theatre', artist: 'Googoosh', image: 'https://picsum.photos/seed/live1/200/200' },
  { id: 'v2', title: 'Acoustic Sessions', artist: 'Mohsen Yeganeh', image: 'https://picsum.photos/seed/acoustic/200/200' },
  { id: 'v3', title: 'Tehran Concert 2024', artist: 'Various Artists', image: 'https://picsum.photos/seed/concert/200/200' },
  { id: 'v4', title: 'Behind the Scenes', artist: 'Studio Session', image: 'https://picsum.photos/seed/studio/200/200' },
  { id: 'v5', title: 'Music Video: Baroon', artist: 'Mohsen Namjoo', image: 'https://picsum.photos/seed/baroon/200/200' },
]

function AnimatedStat({ target, label, icon }) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [target])

  return (
    <div className="stat-pill">
      <span className="stat-icon">{icon}</span>
      <span className="stat-number">{count.toLocaleString()}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export default function ProfilePage() {
  const navigate = useNavigate()
  const [editModal, setEditModal] = useState(false)
  const [confirmLogout, setConfirmLogout] = useState(false)

  const [editName, setEditName] = useState(MOCK_USER.name)
  const [editBio, setEditBio] = useState(MOCK_USER.bio)
  const [editAvatar, setEditAvatar] = useState(MOCK_USER.avatar)
  const fileInputRef = useRef(null)

  const handleLogout = useCallback(() => {
    localStorage.removeItem('nexus_auth')
    navigate('/login')
  }, [navigate])

  const handleSaveProfile = useCallback(() => {
    MOCK_USER.name = editName
    MOCK_USER.bio = editBio
    MOCK_USER.avatar = editAvatar
    setEditModal(false)
  }, [editName, editBio, editAvatar])

  const handleAvatarUpload = useCallback((e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setEditAvatar(ev.target.result)
    reader.readAsDataURL(file)
  }, [])

  return (
    <div className="profile-page">
      {/* ─── HEADER ─── */}
      <div className="profile-header">
        <div className="profile-avatar-wrap">
          <img src={MOCK_USER.avatar} alt={MOCK_USER.name} className="profile-avatar" />
          <button className="profile-avatar-edit" onClick={() => setEditModal(true)}>
            <Pencil size={16} />
          </button>
        </div>
        <h1 className="profile-name">{MOCK_USER.name}</h1>
        <p className="profile-bio">{MOCK_USER.bio}</p>
        <button className="profile-edit-link" onClick={() => setEditModal(true)}>
          Edit Profile
        </button>
      </div>

      {/* ─── STATS ─── */}
      <div className="profile-stats">
        <AnimatedStat target={MOCK_USER.followerCount} label="Followers" icon="👥" />
        <AnimatedStat target={MOCK_USER.followingCount} label="Following" icon="📱" />
        <AnimatedStat target={MOCK_USER.listeningHours} label="Hours Listened" icon="⏱️" />
        <AnimatedStat target={MOCK_USER.playlistCount} label="Playlists" icon="🎵" />
      </div>

      {/* ─── RECENTLY PLAYED MUSIC ─── */}
      <section className="profile-section">
        <div className="section-header">
          <h2>Recently Played Music</h2>
          <button className="section-link">See all</button>
        </div>
        <div className="scroll-row">
          {MOCK_MUSIC.map((item) => (
            <div key={item.id} className="scroll-card">
              <div className="scroll-card-image-wrap">
                <img src={item.image} alt={item.title} className="scroll-card-image" loading="lazy" />
                <div className="scroll-card-overlay">
                  <div className="scroll-card-play">
                    <Play size={22} fill="#00f5d4" color="#00f5d4" />
                  </div>
                </div>
              </div>
              <div className="scroll-card-info">
                <span className="scroll-card-title">{item.title}</span>
                <span className="scroll-card-sub">{item.artist}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── RECENTLY PLAYED VIDEOS ─── */}
      <section className="profile-section">
        <div className="section-header">
          <h2>Recently Played Videos</h2>
          <button className="section-link">See all</button>
        </div>
        <div className="scroll-row">
          {MOCK_VIDEOS.map((item) => (
            <div key={item.id} className="scroll-card">
              <div className="scroll-card-image-wrap">
                <img src={item.image} alt={item.title} className="scroll-card-image" loading="lazy" />
                <div className="scroll-card-overlay">
                  <div className="scroll-card-play">
                    <Play size={22} fill="#00f5d4" color="#00f5d4" />
                  </div>
                </div>
              </div>
              <div className="scroll-card-info">
                <span className="scroll-card-title">{item.title}</span>
                <span className="scroll-card-sub">{item.artist}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BOTTOM BAR ─── */}
      <div className="profile-bottom-bar">
        <button
          className="profile-bottom-btn profile-bottom-btn--primary"
          onClick={() => navigate('/settings')}
        >
          <Wallet size={16} /> Wallet
        </button>
        <button
          className="profile-bottom-btn profile-bottom-btn--secondary"
          onClick={() => navigate('/settings')}
        >
          <Settings size={16} /> Settings
        </button>
        <button
          className="profile-bottom-btn profile-bottom-btn--danger"
          onClick={() => setConfirmLogout(true)}
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* ─── EDIT PROFILE MODAL ─── */}
      {editModal && (
        <div className="modal-overlay" onClick={() => setEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Edit Profile</h3>

            <div className="modal-avatar-section">
              <img src={editAvatar} alt="Preview" className="modal-avatar-preview" />
              <div className="modal-upload-zone" onClick={() => fileInputRef.current?.click()}>
                Drag image or click to upload
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleAvatarUpload}
              />
            </div>

            <div className="modal-field">
              <label>Name</label>
              <input
                value={editName}
                onChange={(e) => editName.length < 50 && setEditName(e.target.value)}
                placeholder="Your name"
              />
              <span className="char-hint">{editName.length}/50</span>
            </div>

            <div className="modal-field">
              <label>Bio</label>
              <textarea
                value={editBio}
                onChange={(e) => editBio.length < 150 && setEditBio(e.target.value)}
                placeholder="Tell us about yourself..."
              />
              <span className="char-hint">{editBio.length}/150</span>
            </div>

            <div className="modal-btn-row">
              <button className="modal-btn modal-btn--cancel" onClick={() => setEditModal(false)}>
                Cancel
              </button>
              <button className="modal-btn modal-btn--save" onClick={handleSaveProfile}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── LOGOUT CONFIRM ─── */}
      {confirmLogout && (
        <div className="confirm-overlay" onClick={() => setConfirmLogout(false)}>
          <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Sign Out</h3>
            <p>Are you sure you want to sign out? You'll need to log back in to access your content.</p>
            <div className="confirm-actions">
              <button className="modal-btn modal-btn--cancel" onClick={() => setConfirmLogout(false)}>
                Cancel
              </button>
              <button className="modal-btn modal-btn--save modal-btn--danger" onClick={handleLogout}>
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
