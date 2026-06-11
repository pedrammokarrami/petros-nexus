export default function Badge({ children, variant = 'default', style }) {
  const colors = {
    live: { bg: 'var(--accent-live)', color: '#fff' },
    new: { bg: 'var(--accent-gold)', color: '#000' },
    hd: { bg: 'var(--accent-vision)', color: '#fff' },
    hq: { bg: 'var(--accent-sound)', color: '#fff' },
    default: { bg: 'rgba(255,255,255,0.1)', color: 'var(--text-muted)' }
  }

  const c = colors[variant] || colors.default

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '4px 10px',
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.05em',
        background: c.bg,
        color: c.color,
        ...style
      }}
    >
      {variant === 'live' && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#fff',
            animation: 'pulse 1.5s ease-in-out infinite'
          }}
        />
      )}
      {children}
    </span>
  )
}
