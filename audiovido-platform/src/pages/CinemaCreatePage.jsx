import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, Play, Copy, Check } from 'lucide-react'
import { searchMedia } from '../services/api'
import * as supabaseService from '../services/supabaseService'

const USER_ID = localStorage.getItem('audiovido_user_id') || 'demo-user'

export default function CinemaCreatePage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selected, setSelected] = useState(null)
  const [sessionTitle, setSessionTitle] = useState('')
  const [createdSession, setCreatedSession] = useState(null)
  const [copied, setCopied] = useState(false)
  const [searching, setSearching] = useState(false)

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return
    setSearching(true)
    let items = await searchMedia(query)
    if (items?.items) items = items.items
    if (!Array.isArray(items)) items = []
    setResults(items.filter((i) => i.file_url?.includes('.mp4') || i.type === 'movie' || i.type === 'series'))
    setSearching(false)
  }, [query])

  const handleCreate = async () => {
    if (!selected) return
    const title = sessionTitle.trim() || selected.title
    try {
      const session = await supabaseService.createCinemaSession(
        USER_ID,
        selected.id,
        selected.title,
        selected.thumbnail,
        title
      )
      setCreatedSession(session)
    } catch (e) {
      console.error('Failed to create cinema session:', e)
    }
  }

  const inviteUrl = createdSession ? `${window.location.origin}/cinema/${createdSession.invite_code}` : ''

  if (createdSession) {
    return (
      <motion.div
        className="page"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', gap: 16 }}
      >
        <div style={{ fontSize: 48 }}>🎬</div>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>Session Created!</h2>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Share this invite code:</p>
        <div style={{
          fontSize: 36, fontWeight: 900, letterSpacing: 8,
          background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          {createdSession.invite_code}
        </div>
        <div style={{
          display: 'flex', gap: 8, alignItems: 'center',
          padding: '10px 14px', borderRadius: 14,
          background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
          fontSize: 13, color: 'var(--text-muted)', maxWidth: '90%', wordBreak: 'break-all',
        }}>
          <span style={{ flex: 1, minWidth: 0 }}>{inviteUrl}</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(inviteUrl)
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', flexShrink: 0 }}
          >
            {copied ? <Check size={18} color="#22c55e" /> : <Copy size={18} />}
          </button>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button
            onClick={() => navigate(`/cinema/${createdSession.invite_code}`)}
            style={{
              padding: '12px 28px', borderRadius: 14,
              background: 'var(--accent-gradient)', color: '#fff',
              fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer',
            }}
          >
            Join Session
          </button>
          <button
            onClick={() => navigate('/hub/playlists')}
            style={{
              padding: '12px 28px', borderRadius: 14,
              background: 'var(--glass-bg)', color: 'var(--text-primary)',
              fontWeight: 600, fontSize: 14, border: '1px solid var(--glass-border)', cursor: 'pointer',
            }}
          >
            Back to Hub
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button onClick={() => navigate(-1)} style={{ width: 36, height: 36, display: 'grid', placeItems: 'center', border: 'none', background: 'var(--glass-bg)', borderRadius: 12, cursor: 'pointer' }}>
          <ArrowLeft size={18} />
        </button>
        <h1 style={{ fontSize: 18, fontWeight: 700 }}>Create Cinema Session</h1>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSearch() }}
          placeholder="Search for a video..."
          style={{
            flex: 1, padding: '12px 14px', borderRadius: 14,
            background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
            color: 'var(--text-primary)', fontSize: 14, outline: 'none',
          }}
        />
        <button
          onClick={handleSearch}
          disabled={searching}
          style={{
            width: 44, height: 44, borderRadius: 14,
            background: query.trim() ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.1)',
            border: 'none', cursor: query.trim() ? 'pointer' : 'default',
            display: 'grid', placeItems: 'center',
          }}
        >
          <Search size={18} color={query.trim() ? '#fff' : 'var(--text-muted)'} />
        </button>
      </div>

      {searching && <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Searching...</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {results.map((item) => (
          <div
            key={item.id}
            onClick={() => { setSelected(item); setSessionTitle(item.title) }}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: 10, borderRadius: 14,
              background: selected?.id === item.id ? 'var(--accent-gradient)' : 'var(--glass-bg)',
              border: selected?.id === item.id ? 'none' : '1px solid var(--glass-border)',
              cursor: 'pointer',
            }}
          >
            <div style={{ width: 52, height: 52, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
              <img src={item.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.title}
              </div>
              <div style={{ fontSize: 12, color: selected?.id === item.id ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)' }}>
                {item.genre || item.type} · {item.year || ''}
              </div>
            </div>
            {selected?.id === item.id && <Play size={16} color="#fff" />}
          </div>
        ))}
      </div>

      {selected && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            value={sessionTitle}
            onChange={(e) => setSessionTitle(e.target.value)}
            placeholder="Session title (optional)"
            style={{
              width: '100%', padding: '12px 14px', borderRadius: 14,
              background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
              color: 'var(--text-primary)', fontSize: 14, outline: 'none',
            }}
          />
          <button
            onClick={handleCreate}
            style={{
              width: '100%', padding: '14px', borderRadius: 14,
              background: 'var(--accent-gradient)', color: '#fff',
              fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer',
            }}
          >
            Create Session
          </button>
        </div>
      )}
    </motion.div>
  )
}
