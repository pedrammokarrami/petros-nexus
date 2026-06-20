import { GlowAvatar } from '../../components/GlowAvatar'

export function SuggestionRail({ suggestions, onSelect }) {
  return (
    <div className="fnd-suggestion-rail">
      <div
        style={{
          padding: '0 16px 8px',
          fontSize: 'var(--fnd-fs-14)',
          fontWeight: 600,
          color: 'var(--fnd-text-dim)',
        }}
      >
        AI Recommendations For You
      </div>
      <div
        style={{
          display: 'flex',
          gap: 12,
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
          padding: '0 16px 8px',
          scrollbarWidth: 'none',
        }}
      >
        {suggestions.map((s, i) => (
          <button
            key={s.id || i}
            onClick={() => onSelect(i)}
            style={{
              flexShrink: 0,
              scrollSnapAlign: 'start',
              width: 120,
              padding: 12,
              borderRadius: 'var(--fnd-radius-lg)',
              background: 'var(--fnd-bg-surface)',
              border: '1px solid var(--fnd-border-soft)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              transition: 'all var(--fnd-dur-fast) var(--fnd-ease-out)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--fnd-bg-surface-raised)'
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--fnd-bg-surface)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <GlowAvatar src={s.avatar} name={s.name} isOnline={s.isOnline} size="md" />
            <div style={{ fontSize: 'var(--fnd-fs-12)', fontWeight: 600, color: 'var(--fnd-text-hi)', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
              {s.name}
            </div>
            {s.compatibility != null && (
              <div style={{ fontSize: 'var(--fnd-fs-11)', fontFamily: 'var(--fnd-font-mono)', fontWeight: 700, color: s.compatibility >= 80 ? 'var(--fnd-accent)' : 'var(--fnd-cyan-400)' }}>
                {s.compatibility}%
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
