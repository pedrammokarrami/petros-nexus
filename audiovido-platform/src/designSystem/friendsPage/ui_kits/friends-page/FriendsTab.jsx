import { Users, Filter } from 'lucide-react'
import { GlowAvatar } from '../../components/GlowAvatar'
import { Badge } from '../../components/Badge'
import { Card } from '../../components/Card'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'online', label: 'Online Now' },
  { id: 'music-lovers', label: 'Music Lovers' },
  { id: 'cinema-fans', label: 'Cinema Fans' },
]

function FriendCard({ friend, onClick }) {
  return (
    <Card hoverable onClick={() => onClick(friend)}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          padding: 16,
        }}
      >
        <GlowAvatar src={friend.avatar} name={friend.name} isOnline={friend.isOnline} size="lg" />
        <div style={{ textAlign: 'center', minWidth: 0 }}>
          <div
            style={{
              fontSize: 'var(--fnd-fs-14)',
              fontWeight: 600,
              color: 'var(--fnd-text-hi)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: 120,
            }}
          >
            {friend.name}
          </div>
          {friend.sharedInterest && (
            <div style={{ marginTop: 4 }}>
              <Badge text={friend.sharedInterest} variant="ghost" />
            </div>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 'var(--fnd-fs-12)',
            color: friend.isOnline ? 'var(--fnd-online)' : 'var(--fnd-text-muted)',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: friend.isOnline ? 'var(--fnd-online)' : 'var(--fnd-offline)',
              display: 'inline-block',
            }}
          />
          {friend.isOnline ? 'Online' : (friend.lastSeen || 'Offline')}
        </div>
      </div>
    </Card>
  )
}

export function FriendsTab({ friends, filter, onFilterChange, onFriendClick, loading }) {
  const filtered = filter === 'all'
    ? friends
    : filter === 'online'
      ? friends.filter(f => f.isOnline)
      : friends.filter(f => f.sharedInterest === filter || !filter)

  return (
    <div className="fnd-friends-tab">
      <div
        className="fnd-filter-bar"
        style={{
          display: 'flex',
          gap: 8,
          padding: '12px 16px',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
        }}
      >
        {FILTERS.map(f => {
          const isActive = filter === f.id
          return (
            <button
              key={f.id}
              onClick={() => onFilterChange(f.id)}
              style={{
                flexShrink: 0,
                padding: '6px 14px',
                borderRadius: 'var(--fnd-radius-pill)',
                border: `1px solid ${isActive ? 'var(--fnd-accent)' : 'var(--fnd-border-soft)'}`,
                background: isActive
                  ? 'color-mix(in oklab, var(--fnd-accent) 15%, transparent)'
                  : 'transparent',
                color: isActive ? 'var(--fnd-accent)' : 'var(--fnd-text-dim)',
                fontSize: 'var(--fnd-fs-13)',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all var(--fnd-dur-fast) var(--fnd-ease-out)',
              }}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      {loading ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 12,
            padding: 16,
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                aspectRatio: '1',
                borderRadius: 'var(--fnd-radius-lg)',
                background: 'var(--fnd-void-500)',
                animation: 'shimmer 1.5s infinite',
              }}
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            padding: '60px 24px',
            color: 'var(--fnd-text-dim)',
          }}
        >
          <Users size={48} style={{ opacity: 0.3 }} />
          <div style={{ fontSize: 'var(--fnd-fs-16)', fontWeight: 500 }}>No friends yet</div>
          <div style={{ fontSize: 'var(--fnd-fs-14)', color: 'var(--fnd-text-muted)' }}>Start discovering!</div>
        </div>
      ) : (
        <div className="fnd-avatar-grid">
          {filtered.map(friend => (
            <FriendCard key={friend.id} friend={friend} onClick={onFriendClick} />
          ))}
        </div>
      )}
    </div>
  )
}
