import { useState } from 'react'

const SIZES = {
  sm: 36,
  md: 48,
  lg: 72,
  xl: 96,
}

export function GlowAvatar({ src, name, isOnline, size = 'md', className = '' }) {
  const [imgError, setImgError] = useState(false)
  const px = SIZES[size] || SIZES.md
  const initial = (name || '?').charAt(0).toUpperCase()

  return (
    <div
      className={`fnd-avatar-wrapper ${className}`}
      style={{
        width: px,
        height: px,
        borderRadius: '50%',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--fnd-void-500)',
        border: `2px solid ${isOnline ? 'var(--fnd-online)' : 'var(--fnd-offline)'}`,
        boxShadow: isOnline
          ? '0 0 12px color-mix(in oklab, var(--fnd-online) 50%, transparent)'
          : 'none',
        transition: 'transform var(--fnd-dur-fast) var(--fnd-ease-out), box-shadow var(--fnd-dur-fast) var(--fnd-ease-out)',
      }}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={name || 'avatar'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--fnd-text-hi)',
            fontSize: px * 0.42,
            fontWeight: 700,
          }}
        >
          {initial}
        </div>
      )}
    </div>
  )
}
