import { useMemo } from 'react'

const PARTICLES = 8

export default function BubbleBurst({ x, y }) {
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLES }, (_, i) => {
      const angle = (i / PARTICLES) * Math.PI * 2
      const dist = 40 + Math.random() * 30
      const tx = Math.cos(angle) * dist
      const ty = Math.sin(angle) * dist
      const size = 4 + Math.random() * 4
      const hue = i < 4 ? 180 : 360
      const sat = 100
      const lit = 50 + Math.random() * 20
      return { tx, ty, size, color: `hsl(${hue - i * 22}, ${sat}%, ${lit}%)` }
    })
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 0,
        height: 0,
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
            animation: 'particleOut 500ms ease-out forwards',
          }}
        />
      ))}
    </div>
  )
}
