export function Card({ children, onClick, hoverable, className = '', style: extraStyle }) {
  return (
    <div
      className={`fnd-card ${hoverable ? 'fnd-card--hoverable' : ''} ${className}`}
      onClick={onClick}
      style={{
        background: 'var(--fnd-bg-surface)',
        border: '1px solid var(--fnd-border-soft)',
        borderRadius: 'var(--fnd-radius-lg)',
        backdropFilter: 'blur(20px) saturate(150%)',
        WebkitBackdropFilter: 'blur(20px) saturate(150%)',
        transition: 'transform var(--fnd-dur-fast) var(--fnd-ease-out), box-shadow var(--fnd-dur-fast) var(--fnd-ease-out)',
        cursor: onClick ? 'pointer' : 'default',
        ...extraStyle,
      }}
      onMouseEnter={e => {
        if (hoverable) {
          e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5)'
        }
      }}
      onMouseLeave={e => {
        if (hoverable) {
          e.currentTarget.style.transform = 'translateY(0) scale(1)'
          e.currentTarget.style.boxShadow = 'none'
        }
      }}
    >
      {children}
    </div>
  )
}
