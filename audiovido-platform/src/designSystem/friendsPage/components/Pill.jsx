export function Pill({ label, value, color, className = '' }) {
  return (
    <div
      className={`fnd-pill ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 12px',
        borderRadius: 'var(--fnd-radius-pill)',
        background: 'var(--fnd-bg-surface-raised)',
        border: '1px solid var(--fnd-border-faint)',
        fontSize: 'var(--fnd-fs-12)',
      }}
    >
      <span style={{ color: 'var(--fnd-text-dim)', fontWeight: 500 }}>{label}</span>
      <span style={{ color: color || 'var(--fnd-accent)', fontWeight: 700, fontFamily: 'var(--fnd-font-mono)' }}>
        {value}
      </span>
    </div>
  )
}
