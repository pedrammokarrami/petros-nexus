import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Music, Film, Plus, Disc3, Users, Sparkles, Clock, Play, X, Loader2, Send, Trash2, Video, LogIn } from 'lucide-react'
import usePlayerStore from '../store/usePlayerStore'
import * as supabaseService from '../services/supabaseService'

const USER_ID = localStorage.getItem('nexus_user_id') || 'demo-user'

const tabs = [
  { id: 'music', labelKey: 'Music', icon: Music },
  { id: 'video', labelKey: 'Video', icon: Film },
]

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export default function PlaylistsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('music')

  const [playlists, setPlaylists] = useState([])
  const [mixers, setMixers] = useState([])
  const [videoPlaylists, setVideoPlaylists] = useState([])
  const [cinemaSessions, setCinemaSessions] = useState([])

  const [showAiChat, setShowAiChat] = useState(false)
  const [showCinemaModal, setShowCinemaModal] = useState(false)
  const [cinemaJoinCode, setCinemaJoinCode] = useState('')

  useEffect(() => {
    if (activeTab === 'music') {
      supabaseService.getPlaylists(USER_ID).then(setPlaylists).catch(() => {})
      supabaseService.getMixers(USER_ID).then(setMixers).catch(() => {})
    } else {
      supabaseService.getPlaylists(USER_ID).then(setVideoPlaylists).catch(() => {})
      supabaseService.getActiveCinemaSessions().then(setCinemaSessions).catch(() => {})
    }
  }, [activeTab])

  const SectionRow = ({ title, items, renderItem, emptyMsg }) => (
    <div style={{ marginBottom: 28 }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>
        {title}
      </h3>
      {items.length === 0 ? (
        <p style={{ fontSize: 13, color: 'var(--text-muted)', padding: '20px 0' }}>{emptyMsg}</p>
      ) : (
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, WebkitOverflowScrolling: 'touch' }}>
          {items.map(renderItem)}
        </div>
      )}
    </div>
  )

  const renderPlaylistCard = (pl) => (
    <div
      key={pl.id}
      style={{
        minWidth: 160, maxWidth: 180,
        padding: 14, borderRadius: 16,
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      <div style={{
        width: '100%', height: 100, borderRadius: 10,
        background: 'var(--accent-gradient)',
        display: 'grid', placeItems: 'center', marginBottom: 10,
        fontSize: 32,
      }}>
        🎵
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {pl.name}
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
        {pl.description || `${pl.playlist_tracks?.count || 0} tracks`}
      </div>
    </div>
  )

  const renderMixerCard = (mx) => (
    <div
      key={mx.id}
      onClick={() => navigate(`/dj?mixerId=${mx.id}`)}
      style={{
        minWidth: 160, maxWidth: 180,
        padding: 14, borderRadius: 16,
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      <div style={{
        width: '100%', height: 100, borderRadius: 10,
        background: 'linear-gradient(135deg, #A78BFA, #7C3AED)',
        display: 'grid', placeItems: 'center', marginBottom: 10,
        fontSize: 32,
      }}>
        🎛️
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {mx.name}
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
        {new Date(mx.updated_at || mx.created_at).toLocaleDateString()}
      </div>
    </div>
  )

  const renderCinemaCard = (cs) => (
    <div
      key={cs.id}
      onClick={() => navigate(`/cinema/${cs.invite_code}`)}
      style={{
        minWidth: 200, maxWidth: 220,
        padding: 14, borderRadius: 16,
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        cursor: 'pointer',
        flexShrink: 0,
        position: 'relative',
      }}
    >
      {cs.status === 'active' && (
        <div style={{
          position: 'absolute', top: 8, right: 8,
          display: 'flex', alignItems: 'center', gap: 4,
          background: '#F43F5E', color: '#fff', fontSize: 10, fontWeight: 700,
          padding: '3px 8px', borderRadius: 10,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', animation: 'pulse 1.5s infinite' }} />
          LIVE
        </div>
      )}
      <div style={{
        width: '100%', height: 100, borderRadius: 10,
        background: cs.video_thumbnail_url ? `url(${cs.video_thumbnail_url}) center/cover` : 'var(--accent-gradient)',
        display: 'grid', placeItems: 'center', marginBottom: 10,
      }}>
        {!cs.video_thumbnail_url && <span style={{ fontSize: 32 }}>🎬</span>}
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {cs.title}
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
        {cs.video_title}
      </div>
    </div>
  )

  const ActionButton = ({ icon: Icon, label, onClick, color }) => (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        flex: 1, padding: '14px 0', borderRadius: 14,
        background: `linear-gradient(135deg, ${color || 'var(--accent-primary)'}, ${color || 'var(--accent-primary)'})`,
        color: '#fff', fontWeight: 700, fontSize: 13,
        border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}
    >
      <Icon size={18} />
      {label}
    </motion.button>
  )

  return (
    <motion.div className="page" initial="initial" animate="animate" variants={pageVariants}>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 20, WebkitOverflowScrolling: 'touch' }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const accentColor = tab.id === 'music' ? 'var(--accent-sound)' : 'var(--accent-live)'
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '10px 18px', borderRadius: 20,
                background: isActive ? accentColor : 'var(--glass-bg)',
                backdropFilter: isActive ? 'none' : 'var(--glass-blur)',
                border: isActive ? 'none' : '1px solid var(--glass-border)',
                color: isActive ? '#fff' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 400,
                fontSize: 13, whiteSpace: 'nowrap',
              }}
            >
              <tab.icon size={16} />
              {tab.labelKey}
            </button>
          )
        })}
      </div>

      {activeTab === 'music' && (
        <div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            <ActionButton icon={Sparkles} label="Create Playlist" onClick={() => setShowAiChat(true)} color="#A78BFA" />
            <ActionButton icon={Disc3} label="Enter DJ Mixer" onClick={() => navigate('/dj')} color="#7C3AED" />
          </div>

          <SectionRow
            title="Playlists"
            items={playlists}
            renderItem={renderPlaylistCard}
            emptyMsg="No playlists yet. Create one with AI!"
          />

          <SectionRow
            title="Mixers"
            items={mixers}
            renderItem={renderMixerCard}
            emptyMsg="No saved mixers. Try the DJ Mixer!"
          />
        </div>
      )}

      {activeTab === 'video' && (
        <div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            <ActionButton icon={Video} label="Create Video Playlist" onClick={() => setShowAiChat(true)} color="#38BDF8" />
            <ActionButton icon={Users} label="Create / Join Cinema" onClick={() => setShowCinemaModal(true)} color="#F43F5E" />
          </div>

          <SectionRow
            title="Video Playlists"
            items={videoPlaylists}
            renderItem={(pl) => renderPlaylistCard({ ...pl, icon: '🎬' })}
            emptyMsg="No video playlists yet."
          />

          <SectionRow
            title="Cinema Sessions"
            items={cinemaSessions}
            renderItem={renderCinemaCard}
            emptyMsg="No active cinema sessions."
          />
        </div>
      )}

      {/* AI Chat Modal for creating playlists */}
      <AnimatePresence>
        {showAiChat && (
          <AiChatModal
            onClose={() => setShowAiChat(false)}
            onCreated={() => {
              setShowAiChat(false)
              supabaseService.getPlaylists(USER_ID).then(setPlaylists).catch(() => {})
            }}
          />
        )}
      </AnimatePresence>

      {/* Cinema Create/Join Modal */}
      <AnimatePresence>
        {showCinemaModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowCinemaModal(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 300,
              background: 'rgba(0,0,0,0.6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%', maxWidth: 360,
                background: 'var(--bg-primary)',
                borderRadius: 24, padding: 24,
                border: '1px solid var(--glass-border)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontSize: 18, fontWeight: 700 }}>Cinema Session</span>
                <button onClick={() => setShowCinemaModal(false)} style={{ width: 36, height: 36, display: 'grid', placeItems: 'center' }}>
                  <X size={20} color="var(--text-muted)" />
                </button>
              </div>
              <button
                onClick={() => {
                  setShowCinemaModal(false)
                  navigate('/cinema/create')
                }}
                style={{
                  width: '100%', padding: '14px', borderRadius: 14,
                  background: 'var(--accent-gradient)', color: '#fff',
                  fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  marginBottom: 12,
                }}
              >
                <Plus size={18} />
                Create New Session
              </button>
              <div style={{
                display: 'flex', gap: 8, alignItems: 'center',
                padding: 12, borderRadius: 14,
                background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
                marginBottom: 12,
              }}>
                <LogIn size={18} color="var(--text-muted)" />
                <input
                  placeholder="Enter invite code"
                  value={cinemaJoinCode}
                  onChange={(e) => setCinemaJoinCode(e.target.value.toUpperCase())}
                  style={{
                    flex: 1, background: 'none', border: 'none', outline: 'none',
                    color: 'var(--text-primary)', fontSize: 14,
                  }}
                />
                <button
                  onClick={() => {
                    if (cinemaJoinCode.trim()) {
                      setShowCinemaModal(false)
                      navigate(`/cinema/${cinemaJoinCode.trim()}`)
                    }
                  }}
                  style={{
                    padding: '8px 16px', borderRadius: 10,
                    background: cinemaJoinCode.trim() ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.1)',
                    color: cinemaJoinCode.trim() ? '#fff' : 'var(--text-muted)',
                    fontWeight: 600, fontSize: 12, border: 'none', cursor: cinemaJoinCode.trim() ? 'pointer' : 'default',
                  }}
                >
                  Join
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function AiChatModal({ onClose, onCreated }) {
  const { t } = useTranslation()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [suggestedTracks, setSuggestedTracks] = useState([])
  const [playlistName, setPlaylistName] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)
    try {
      const { getCompletion } = await import('../services/ai')
      const systemPrompt = `You are a playlist curator. Given a user request, suggest 5-8 tracks as a JSON array. Each track: {title, artist, duration (seconds)}. Return ONLY the JSON array, no other text.`
      const content = await getCompletion([{ role: 'user', content: userMsg }], systemPrompt)
      if (content) {
        const clean = content.replace(/```json|```/g, '').trim()
        const tracks = JSON.parse(clean)
        if (Array.isArray(tracks)) {
          setSuggestedTracks(tracks)
          setMessages((prev) => [...prev, {
            role: 'assistant',
            text: `Here are some tracks I found:\n${tracks.map((t, i) => `${i + 1}. ${t.title} — ${t.artist}`).join('\n')}\n\nYou can remove any you don't want, then give it a name and save!`,
          }])
          if (!playlistName) setPlaylistName(`${userMsg.substring(0, 30)} Playlist`)
          return
        }
      }
      setSuggestedTracks([
        { title: 'Neon Sunset', artist: 'Luna Eclipse', duration: 234 },
        { title: 'Ocean Breeze', artist: 'Coral Reef', duration: 312 },
        { title: 'Midnight Jazz', artist: 'Blue Note', duration: 287 },
        { title: 'Electric Storm', artist: 'Voltage', duration: 198 },
        { title: 'Cosmic Drift', artist: 'Cosmic Drift', duration: 345 },
      ])
      setMessages((prev) => [...prev, {
        role: 'assistant',
        text: 'Here are some tracks I suggest. Remove any you don\'t like, name it, and save!',
      }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Sorry, something went wrong. Please try again.' }])
    }
    setLoading(false)
  }

  const removeTrack = (idx) => {
    setSuggestedTracks((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleSave = async () => {
    if (!playlistName.trim() || suggestedTracks.length === 0 || saving) return
    setSaving(true)
    try {
      const pl = await supabaseService.createPlaylist(USER_ID, playlistName.trim(), 'Created with AI')
      for (const track of suggestedTracks) {
        await supabaseService.addTrackToPlaylist(pl.id, track.title)
      }
      onCreated()
    } catch (e) {
      console.error('Failed to save playlist:', e)
    }
    setSaving(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'var(--bg-primary)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px', borderBottom: '1px solid var(--glass-border)',
      }}>
        <button onClick={onClose} style={{ width: 36, height: 36, display: 'grid', placeItems: 'center', border: 'none', background: 'none', cursor: 'pointer' }}>
          <X size={20} />
        </button>
        <span style={{ fontSize: 16, fontWeight: 700 }}>Create Playlist</span>
        {suggestedTracks.length > 0 && (
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: '8px 16px', borderRadius: 20,
              background: saving ? 'rgba(255,255,255,0.1)' : 'var(--accent-gradient)',
              color: '#fff', fontWeight: 700, fontSize: 12, border: 'none', cursor: saving ? 'default' : 'pointer',
            }}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        )}
      </div>

      <div className="scroll-content" style={{ flex: 1, padding: 20 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            marginBottom: 12, padding: 12, borderRadius: 14,
            background: msg.role === 'assistant' ? 'var(--glass-bg)' : 'var(--accent-gradient)',
            color: msg.role === 'assistant' ? 'var(--text-primary)' : '#fff',
            fontSize: 14, lineHeight: 1.5, whiteSpace: 'pre-wrap',
          }}>
            {msg.text}
          </div>
        ))}

        {suggestedTracks.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <input
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="Playlist name..."
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 14,
                background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)', fontSize: 14, outline: 'none',
                marginBottom: 12,
              }}
            />
            {suggestedTracks.map((track, idx) => (
              <div key={idx} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 12,
                background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
                marginBottom: 6,
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {track.title}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {track.artist}
                  </div>
                </div>
                <button onClick={() => removeTrack(idx)} style={{ width: 28, height: 28, display: 'grid', placeItems: 'center', border: 'none', background: 'rgba(255,255,255,0.1)', borderRadius: 8, cursor: 'pointer' }}>
                  <Trash2 size={14} color="var(--text-muted)" />
                </button>
              </div>
            ))}
          </div>
        )}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 12 }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
              <Loader2 size={16} />
            </motion.div>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Thinking...</span>
          </div>
        )}
      </div>

      <div style={{
        padding: '12px 16px', borderTop: '1px solid var(--glass-border)',
        display: 'flex', gap: 8,
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
          placeholder="e.g. make me a happy playlist..."
          style={{
            flex: 1, padding: '12px 14px', borderRadius: 14,
            background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
            color: 'var(--text-primary)', fontSize: 14, outline: 'none',
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          style={{
            width: 44, height: 44, borderRadius: 14,
            background: input.trim() && !loading ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.1)',
            border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'default',
            display: 'grid', placeItems: 'center',
          }}
        >
          <Send size={18} color={input.trim() && !loading ? '#fff' : 'var(--text-muted)'} />
        </button>
      </div>
    </motion.div>
  )
}
