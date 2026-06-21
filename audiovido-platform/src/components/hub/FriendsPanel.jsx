import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { mockFriends } from '../../data/mockFriends'

const ACCENT = '#4ADE80'

export default function FriendsPanel() {
  const [friends] = useState(mockFriends)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div
        style={{
          display: 'flex',
          gap: 8,
          paddingBottom: 8,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          marginBottom: 4,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Online — {friends.filter((f) => f.isOnline).length}
        </span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          All — {friends.length}
        </span>
      </div>

      {friends.map((friend, i) => (
        <div
          key={friend.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 14px',
            borderRadius: 14,
            background: 'var(--glass-bg)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${ACCENT}22, ${ACCENT}08)`,
                display: 'grid',
                placeItems: 'center',
                overflow: 'hidden',
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>
                {friend.name.charAt(0)}
              </span>
            </div>
            {friend.isOnline && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: ACCENT,
                  border: '2px solid #0a0a0f',
                }}
              />
            )}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#fff',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {friend.name}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {friend.isOnline ? (
                <span style={{ color: ACCENT }}>Online</span>
              ) : (
                friend.lastSeen
              )}
            </div>
          </div>

          <button
            onClick={() => {
              // TODO: navigate to existing chat screen
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              borderRadius: 10,
              background: `${ACCENT}18`,
              border: `1px solid ${ACCENT}33`,
              color: ACCENT,
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <MessageCircle size={14} />
            Chat
          </button>
        </div>
      ))}
    </div>
  )
}
