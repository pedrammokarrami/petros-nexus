import { useState, useCallback } from 'react'
import { Users, Check } from 'lucide-react'
import { mockClubs } from '../../data/mockClubs'

const ACCENT = '#FB923C'

function formatCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  return String(n)
}

export default function FanClubsPanel() {
  const [clubs, setClubs] = useState(mockClubs)

  const toggleFollow = useCallback((id) => {
    setClubs((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFollowing: !c.isFollowing } : c))
    )
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {clubs.map((club) => (
        <div
          key={club.id}
          style={{
            display: 'flex',
            borderRadius: 16,
            background: 'var(--glass-bg)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            border: '1px solid var(--glass-border)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: 100,
              flexShrink: 0,
              background: `linear-gradient(135deg, ${ACCENT}22, ${ACCENT}08)`,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <Users size={28} color={`${ACCENT}66`} />
          </div>

          <div
            style={{
              flex: 1,
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>
              {club.name}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>
              {club.description}
            </div>
            <div style={{ fontSize: 11, color: ACCENT, marginTop: 2 }}>
              {formatCount(club.memberCount)} members
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 14px 12px 0',
            }}
          >
            <button
              onClick={() => toggleFollow(club.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                background: club.isFollowing
                  ? 'rgba(255,255,255,0.08)'
                  : ACCENT,
                color: club.isFollowing
                  ? 'rgba(255,255,255,0.7)'
                  : '#0a0a0f',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {club.isFollowing ? (
                <>
                  <Check size={14} />
                  Following
                </>
              ) : (
                '+ Follow'
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
