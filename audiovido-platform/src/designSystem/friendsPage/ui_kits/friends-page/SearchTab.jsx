import { useState, useMemo } from 'react'
import { Search, Users } from 'lucide-react'
import { Input } from '../../components/Input'
import { Card } from '../../components/Card'
import { GlowAvatar } from '../../components/GlowAvatar'

export function SearchTab({ allUsers, onFriendClick }) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return (allUsers || []).filter(
      u => u.name.toLowerCase().includes(q) || (u.email && u.email.toLowerCase().includes(q))
    )
  }, [query, allUsers])

  return (
    <div className="fnd-search-tab" style={{ padding: 16 }}>
      <Input
        placeholder="Search by username or email"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        icon={Search}
      />

      {!query.trim() ? (
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
          <Search size={48} style={{ opacity: 0.3 }} />
          <div style={{ fontSize: 'var(--fnd-fs-16)', fontWeight: 500 }}>Search by username or email</div>
        </div>
      ) : results.length === 0 ? (
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
          <div style={{ fontSize: 'var(--fnd-fs-16)', fontWeight: 500 }}>No friends found</div>
        </div>
      ) : (
        <div className="fnd-avatar-grid" style={{ marginTop: 16 }}>
          {results.map(user => (
            <Card key={user.id} hoverable onClick={() => onFriendClick(user)}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                  padding: 16,
                }}
              >
                <GlowAvatar src={user.avatar} name={user.name} isOnline={user.isOnline} size="lg" />
                <div
                  style={{
                    fontSize: 'var(--fnd-fs-14)',
                    fontWeight: 600,
                    color: 'var(--fnd-text-hi)',
                    textAlign: 'center',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: 120,
                  }}
                >
                  {user.name}
                </div>
                {user.isOnline !== undefined && (
                  <div
                    style={{
                      fontSize: 'var(--fnd-fs-12)',
                      color: user.isOnline ? 'var(--fnd-online)' : 'var(--fnd-text-muted)',
                    }}
                  >
                    {user.isOnline ? 'Online' : 'Offline'}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
