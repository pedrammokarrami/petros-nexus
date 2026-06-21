import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Play, Pause, Send } from 'lucide-react'
import * as supabaseService from '../services/supabaseService'

const USER_ID = localStorage.getItem('audiovido_user_id') || 'demo-user'

export default function CinemaSessionPage() {
  const { inviteCode } = useParams()
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [reactions, setReactions] = useState([])
  const [isHost, setIsHost] = useState(false)
  const [syncing, setSyncing] = useState(false)

  const emojiReactions = ['😂', '🔥', '😱', '❤️', '🍿', '👏']

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const sess = await supabaseService.getCinemaSessionByInviteCode(inviteCode)
        if (cancelled) return
        if (!sess) { setError('Session not found'); setLoading(false); return }
        setSession(sess)
        setIsHost(sess.host_user_id === USER_ID)

        // Join as participant
        await supabaseService.joinCinemaSession(sess.id, USER_ID)

        setLoading(false)
      } catch (e) {
        if (!cancelled) { setError('Failed to load session'); setLoading(false) }
      }
    })()
    return () => { cancelled = true }
  }, [inviteCode])

  // Subscribe to session updates (playback sync)
  useEffect(() => {
    if (!session) return
    const unsub = supabaseService.subscribeToCinemaSession(session.id, (updated) => {
      setSession((prev) => ({ ...prev, ...updated }))
    })
    return () => unsub?.unsubscribe()
  }, [session?.id])

  // Subscribe to chat messages
  useEffect(() => {
    if (!session) return
    const unsub = supabaseService.subscribeToCinemaMessages(session.id, (msg) => {
      if (msg.type === 'reaction') {
        setReactions((prev) => [...prev, { ...msg, id: Date.now() }])
        setTimeout(() => setReactions((prev) => prev.filter((r) => r.id !== msg.id || Date.now() - r.id > 2000)), 2000)
      } else {
        setMessages((prev) => [...prev, msg])
      }
    })
    return () => unsub?.unsubscribe()
  }, [session?.id])

  // Sync video to session state
  useEffect(() => {
    if (!session || !videoRef.current) return
    const video = videoRef.current
    setSyncing(true)
    if (session.is_playing) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
    const targetTime = Number(session.current_position_seconds) || 0
    if (Math.abs(video.currentTime - targetTime) > 2) {
      video.currentTime = targetTime
    }
    setSyncing(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.is_playing, session?.current_position_seconds])

  const handleHostPlayPause = async () => {
    if (!isHost || !videoRef.current || syncing) return
    const video = videoRef.current
    const newPlaying = video.paused
    if (newPlaying) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
    await supabaseService.updateCinemaPlaybackState(session.id, video.currentTime, newPlaying)
  }

  const handleHostSeek = async () => {
    if (!isHost || !videoRef.current) return
    const video = videoRef.current
    await supabaseService.updateCinemaPlaybackState(session.id, video.currentTime, !video.paused)
  }

  const handleSendMessage = async () => {
    if (!input.trim() || !session) return
    await supabaseService.sendCinemaMessage(session.id, USER_ID, input.trim(), 'chat')
    setInput('')
  }

  const handleReaction = async (emoji) => {
    if (!session) return
    await supabaseService.sendCinemaMessage(session.id, USER_ID, emoji, 'reaction')
  }

  if (loading) {
    return (
      <div className="page" style={{ display: 'grid', placeItems: 'center', minHeight: '60vh' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading session...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 16 }}>
        <p style={{ color: 'var(--text-muted)', fontSize: 16 }}>{error}</p>
        <button onClick={() => navigate('/hub/playlists')} style={{ padding: '12px 24px', borderRadius: 14, background: 'var(--accent-gradient)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
          Back to Hub
        </button>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100dvh', overflow: 'hidden', background: '#000' }}>
      {/* Video Player */}
      <video
        ref={videoRef}
        src={session?.video_ref?.startsWith('http') ? session.video_ref : undefined}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        onClick={isHost ? handleHostPlayPause : undefined}
        onSeeked={handleHostSeek}
        onTimeUpdate={() => {
          if (!isHost || syncing || !videoRef.current) return
        }}
        controls={false}
        playsInline
      />

      {!session?.video_ref?.startsWith('http') && (
        <div style={{
          position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
          background: '#0a0a0f',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎬</div>
            <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{session?.title}</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
              Video player available once a valid URL is configured
            </p>
          </div>
        </div>
      )}

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'fixed', top: 20, left: 20, zIndex: 50,
          width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer',
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
          display: 'grid', placeItems: 'center', color: '#fff',
        }}
      >
        <ArrowLeft size={18} />
      </button>

      {/* Session info */}
      <div style={{
        position: 'fixed', top: 20, left: 72, zIndex: 50,
        color: '#fff', fontSize: 13, fontWeight: 600,
        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
        padding: '6px 14px', borderRadius: 20,
      }}>
        {session?.title} · {isHost ? 'Host' : 'Viewer'}
      </div>

      {isHost && videoRef.current && (
        <button
          onClick={handleHostPlayPause}
          style={{
            position: 'fixed', bottom: 180, left: '50%', transform: 'translateX(-50%)', zIndex: 50,
            width: 56, height: 56, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
            display: 'grid', placeItems: 'center', color: '#fff',
          }}
        >
          {videoRef.current?.paused ? <Play size={24} fill="#fff" /> : <Pause size={24} />}
        </button>
      )}

      {/* Reactions overlay */}
      <div style={{ position: 'fixed', bottom: 120, left: 0, right: 0, zIndex: 40, pointerEvents: 'none', height: 100 }}>
        {reactions.slice(-5).map((r) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 1, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, y: -80, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            style={{
              position: 'absolute', bottom: 0, left: `${20 + Math.random() * 60}%`,
              fontSize: 32, pointerEvents: 'none',
            }}
          >
            {r.body}
          </motion.div>
        ))}
      </div>

      {/* Chat area */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
        padding: '40px 12px 12px',
      }}>
        <div style={{ maxHeight: 120, overflowY: 'auto', marginBottom: 8, display: 'flex', flexDirection: 'column-reverse' }}>
          {messages.slice(-15).map((msg) => (
            <div key={msg.id || msg.created_at} style={{
              marginBottom: 4, padding: '6px 10px', borderRadius: 10,
              background: msg.user_id === USER_ID ? 'rgba(167,139,250,0.3)' : 'rgba(255,255,255,0.1)',
              fontSize: 12, color: '#fff', wordBreak: 'break-word',
            }}>
              <strong style={{ opacity: 0.7 }}>{msg.user_id === USER_ID ? 'You' : msg.user_id?.substring(0, 6)}:</strong>
              {' '}{msg.body}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
          {emojiReactions.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleReaction(emoji)}
              style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer',
                fontSize: 16, display: 'grid', placeItems: 'center',
              }}
            >
              {emoji}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage() }}
            placeholder="Send a message..."
            style={{
              flex: 1, padding: '10px 14px', borderRadius: 14,
              background: 'rgba(255,255,255,0.1)', border: 'none',
              color: '#fff', fontSize: 13, outline: 'none',
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            style={{
              width: 40, height: 40, borderRadius: 12,
              background: input.trim() ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.1)',
              border: 'none', cursor: input.trim() ? 'pointer' : 'default',
              display: 'grid', placeItems: 'center',
            }}
          >
            <Send size={16} color={input.trim() ? '#fff' : 'var(--text-muted)'} />
          </button>
        </div>
      </div>
    </div>
  )
}
