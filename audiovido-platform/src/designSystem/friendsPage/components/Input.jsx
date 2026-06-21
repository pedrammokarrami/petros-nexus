export function Input({ placeholder, value, onChange, icon: Icon, className = '', style: extraStyle }) {
  return (
    <div
      className={`fnd-input-wrapper ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 16px',
        background: 'var(--fnd-bg-surface)',
        border: '1px solid var(--fnd-border-soft)',
        borderRadius: 'var(--fnd-radius-xl)',
        backdropFilter: 'blur(20px) saturate(150%)',
        WebkitBackdropFilter: 'blur(20px) saturate(150%)',
        transition: 'border-color var(--fnd-dur-fast) var(--fnd-ease-out)',
        ...extraStyle,
      }}
    >
      {Icon && <Icon size={18} style={{ color: 'var(--fnd-text-dim)', flexShrink: 0 }} />}
      <input
        className="fnd-input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: 'var(--fnd-text-hi)',
          fontSize: 'var(--fnd-fs-15)',
          fontWeight: 400,
          fontFamily: 'var(--fnd-font-body)',
        }}
      />
    </div>
  )
}
