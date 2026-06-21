export function TabBar({ tabs, activeTab, onChange, className = '' }) {
  return (
    <div
      className={`fnd-tab-bar ${className}`}
      style={{
        display: 'flex',
        gap: 4,
        padding: 4,
        background: 'var(--fnd-bg-surface)',
        borderRadius: 'var(--fnd-radius-xl)',
        border: '1px solid var(--fnd-border-soft)',
        overflow: 'hidden',
      }}
    >
      {tabs.map(tab => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            className={`fnd-tab ${isActive ? 'fnd-tab--active' : ''}`}
            onClick={() => onChange(tab.id)}
            style={{
              flex: 1,
              padding: '8px 16px',
              border: 'none',
              borderRadius: 'var(--fnd-radius-lg)',
              cursor: 'pointer',
              fontSize: 'var(--fnd-fs-13)',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? 'var(--fnd-accent)' : 'var(--fnd-text-dim)',
              background: isActive
                ? 'color-mix(in oklab, var(--fnd-accent) 15%, transparent)'
                : 'transparent',
              transition: 'all var(--fnd-dur-fast) var(--fnd-ease-out)',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
