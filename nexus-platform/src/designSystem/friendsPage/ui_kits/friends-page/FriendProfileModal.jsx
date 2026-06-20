import { useEffect, useCallback } from 'react'
import { X, MessageCircle, UserPlus, ShieldOff } from 'lucide-react'
import { GlowAvatar } from '../../components/GlowAvatar'
import { Badge } from '../../components/Badge'
import { Pill } from '../../components/Pill'
import { Button } from '../../components/Button'

export function FriendProfileModal({ friend, onClose, onMessage, onAddFriend }) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  if (!friend) return null

  return (
    <div
      className="fnd-modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--fnd-z-modal)',
        background: 'var(--fnd-bg-overlay)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        animation: 'fnd-fade-up 0.2s ease',
      }}
    >
      <div
        className="fnd-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 380,
          borderRadius: 'var(--fnd-radius-xl)',
          background: 'var(--fnd-bg-surface)',
          border: '1px solid var(--fnd-border-strong)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          overflow: 'hidden',
          animation: 'fnd-slide-up 0.25s ease',
        }}
      >
        <div
          style={{
            position: 'relative',
            padding: '32px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            textAlign: 'center',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: 'none',
              background: 'var(--fnd-bg-surface-raised)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={16} color="var(--fnd-text-dim)" />
          </button>

          <GlowAvatar src={friend.avatar} name={friend.name} isOnline={friend.isOnline} size="xl" />
          <div>
            <div style={{ fontSize: 'var(--fnd-fs-20)', fontWeight: 700, color: 'var(--fnd-text-hi)' }}>
              {friend.name}
            </div>
            <div
              style={{
                fontSize: 'var(--fnd-fs-13)',
                color: friend.isOnline ? 'var(--fnd-online)' : 'var(--fnd-text-muted)',
                marginTop: 4,
              }}
            >
              {friend.isOnline ? 'Online Now' : (friend.lastSeen || 'Offline')}
            </div>
          </div>

          {friend.sharedInterest && (
            <Badge text={friend.sharedInterest} variant="default" />
          )}

          {friend.stats && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 4 }}>
              {friend.stats.music != null && <Pill label="Music" value={`${friend.stats.music}%`} color="var(--fnd-purple-400)" />}
              {friend.stats.cinema != null && <Pill label="Cinema" value={`${friend.stats.cinema}%`} color="var(--fnd-coral-400)" />}
              {friend.stats.activity != null && <Pill label="Activity" value={`${friend.stats.activity}%`} color="var(--fnd-amber-400)" />}
            </div>
          )}

          {friend.compatibility != null && (
            <div
              style={{
                fontSize: 'var(--fnd-fs-32)',
                fontWeight: 800,
                fontFamily: 'var(--fnd-font-mono)',
                color: friend.compatibility >= 80 ? 'var(--fnd-accent)' : 'var(--fnd-cyan-400)',
              }}
            >
              {friend.compatibility}% Match
            </div>
          )}

          {friend.bio && (
            <div style={{ fontSize: 'var(--fnd-fs-14)', color: 'var(--fnd-text-dim)', maxWidth: 300, lineHeight: 1.5 }}>
              {friend.bio}
            </div>
          )}

          <div
            style={{
              display: 'flex',
              gap: 12,
              marginTop: 8,
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <Button variant="secondary" onClick={onMessage} icon={MessageCircle}>
              Message
            </Button>
            <Button variant="primary" onClick={onAddFriend} icon={UserPlus}>
              Add Friend
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
