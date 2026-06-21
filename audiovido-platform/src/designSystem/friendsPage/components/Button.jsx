const VARIANTS = {
  primary: {
    background: 'var(--fnd-accent)',
    color: '#050509',
    border: 'none',
  },
  secondary: {
    background: 'var(--fnd-bg-surface-raised)',
    color: 'var(--fnd-text-hi)',
    border: '1px solid var(--fnd-border-soft)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--fnd-text-dim)',
    border: 'none',
  },
  icon: {
    background: 'var(--fnd-bg-surface-raised)',
    color: 'var(--fnd-text-hi)',
    border: '1px solid var(--fnd-border-soft)',
    borderRadius: '50%',
    width: 48,
    height: 48,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

export function Button({ variant = 'secondary', children, onClick, icon: Icon, disabled, style: extraStyle, className = '' }) {
  const base = VARIANTS[variant] || VARIANTS.secondary
  return (
    <button
      className={`fnd-btn fnd-btn--${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: variant === 'icon' ? 0 : '10px 20px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        borderRadius: 'var(--fnd-radius-lg)',
        fontSize: 'var(--fnd-fs-14)',
        fontWeight: 600,
        transition: 'transform var(--fnd-dur-fast) var(--fnd-ease-out), box-shadow var(--fnd-dur-fast) var(--fnd-ease-out), background var(--fnd-dur-fast) var(--fnd-ease-out)',
        minHeight: 44,
        ...base,
        ...extraStyle,
      }}
      onMouseEnter={e => {
        if (!disabled) {
          e.currentTarget.style.transform = 'scale(1.04)'
          if (variant !== 'ghost') e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)'
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  )
}
