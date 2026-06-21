const VARIANTS = {
  default: {
    background: 'color-mix(in oklab, var(--fnd-accent) 20%, transparent)',
    color: 'var(--fnd-accent)',
    border: '1px solid color-mix(in oklab, var(--fnd-accent) 30%, transparent)',
  },
  success: {
    background: 'color-mix(in oklab, var(--fnd-success) 20%, transparent)',
    color: 'var(--fnd-success)',
    border: '1px solid color-mix(in oklab, var(--fnd-success) 30%, transparent)',
  },
  warning: {
    background: 'color-mix(in oklab, var(--fnd-warning) 20%, transparent)',
    color: 'var(--fnd-warning)',
    border: '1px solid color-mix(in oklab, var(--fnd-warning) 30%, transparent)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--fnd-text-dim)',
    border: '1px solid var(--fnd-border-soft)',
  },
}

export function Badge({ text, variant = 'default', icon: Icon, className = '' }) {
  const style = VARIANTS[variant] || VARIANTS.default
  return (
    <span
      className={`fnd-badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '2px 10px',
        borderRadius: 'var(--fnd-radius-pill)',
        fontSize: 'var(--fnd-fs-12)',
        fontWeight: 600,
        letterSpacing: '0.03em',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {Icon && <Icon size={12} />}
      {text}
    </span>
  )
}
