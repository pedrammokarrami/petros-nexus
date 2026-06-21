import { useRef, useEffect } from 'react'

const particleConfigs = {
  none: { count: 0 },
  snow: {
    count: 55,
    init: (p, w, h) => {
      p.x = Math.random() * w
      p.y = Math.random() * h
      p.r = Math.random() * 3 + 1
      p.speed = Math.random() * 0.8 + 0.3
      p.wind = Math.random() * 0.3 - 0.15
      p.opacity = Math.random() * 0.6 + 0.2
    },
    draw: (ctx, p) => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,255,255,${p.opacity})`
      ctx.fill()
    },
    update: (p, w, h) => {
      p.y += p.speed
      p.x += p.wind + Math.sin(p.y * 0.01) * 0.2
      if (p.y > h + 5) { p.y = -5; p.x = Math.random() * w }
      if (p.x > w + 5) p.x = -5
      if (p.x < -5) p.x = w + 5
    }
  },
  rain: {
    count: 70,
    init: (p, w, h) => {
      p.x = Math.random() * w
      p.y = Math.random() * h
      p.length = Math.random() * 12 + 8
      p.speed = Math.random() * 6 + 4
      p.opacity = Math.random() * 0.3 + 0.1
    },
    draw: (ctx, p) => {
      ctx.beginPath()
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(p.x - 0.5, p.y + p.length)
      ctx.strokeStyle = `rgba(180,210,255,${p.opacity})`
      ctx.lineWidth = 1
      ctx.stroke()
    },
    update: (p, w, h) => {
      p.y += p.speed
      p.x -= 0.5
      if (p.y > h + 10) { p.y = -10; p.x = Math.random() * w }
      if (p.x < -10) p.x = w + 10
    }
  },
  fireflies: {
    count: 22,
    init: (p, w, h) => {
      p.x = Math.random() * w
      p.y = Math.random() * h
      p.r = Math.random() * 1.5 + 0.5
      p.phase = Math.random() * Math.PI * 2
      p.speedX = (Math.random() - 0.5) * 0.3
      p.speedY = (Math.random() - 0.5) * 0.3
      p.opacity = Math.random() * 0.5 + 0.3
    },
    draw: (ctx, p, time) => {
      const glow = 0.5 + 0.5 * Math.sin(time * 0.002 + p.phase)
      const r = p.r + p.r * glow * 0.5
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4)
      gradient.addColorStop(0, `rgba(255,220,100,${p.opacity * glow})`)
      gradient.addColorStop(1, 'rgba(255,220,100,0)')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2)
      ctx.fill()
    },
    update: (p, w, h) => {
      p.x += p.speedX + Math.sin(p.y * 0.01) * 0.1
      p.y += p.speedY + Math.cos(p.x * 0.01) * 0.1
      if (p.x < 0 || p.x > w) p.speedX *= -1
      if (p.y < 0 || p.y > h) p.speedY *= -1
      p.x = Math.max(0, Math.min(w, p.x))
      p.y = Math.max(0, Math.min(h, p.y))
    }
  },
  leaves: {
    count: 16,
    init: (p, w, h) => {
      p.x = Math.random() * w
      p.y = Math.random() * h - h
      p.size = Math.random() * 6 + 4
      p.speed = Math.random() * 0.5 + 0.3
      p.wobble = Math.random() * 2
      p.rotation = Math.random() * Math.PI * 2
      p.rotSpeed = (Math.random() - 0.5) * 0.02
      p.opacity = Math.random() * 0.4 + 0.3
      p.color = ['#5a8f3c', '#7ab648', '#4a7a2e', '#8fbc6a'][Math.floor(Math.random() * 4)]
    },
    draw: (ctx, p) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.fillStyle = p.color
      ctx.globalAlpha = p.opacity
      ctx.beginPath()
      ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    },
    update: (p, w, h) => {
      p.y += p.speed
      p.x += Math.sin(p.y * 0.02) * p.wobble
      p.rotation += p.rotSpeed
      if (p.y > h + 10) { p.y = -10; p.x = Math.random() * w }
    }
  }
}

export default function ParticleLayer({ type = 'none' }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const config = particleConfigs[type] || particleConfigs.none
    if (config.count === 0) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let particles = []
    let running = true

    function initParticles() {
      particles = []
      for (let i = 0; i < config.count; i++) {
        const p = {}
        config.init(p, w, h)
        particles.push(p)
      }
    }

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const newW = Math.round(entry.contentRect.width * dpr)
      const newH = Math.round(entry.contentRect.height * dpr)
      if (newW === 0 || newH === 0) return
      canvas.width = w = newW
      canvas.height = h = newH
      canvas.style.width = entry.contentRect.width + 'px'
      canvas.style.height = entry.contentRect.height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (particles.length === 0) initParticles()
    })
    ro.observe(canvas.parentElement)

    function frame(time) {
      if (!running) return
      ctx.clearRect(0, 0, w, h)

      if (particles.length !== config.count) {
        initParticles()
      }

      for (const p of particles) {
        config.update(p, w, h)
        config.draw(ctx, p, time)
      }

      animRef.current = requestAnimationFrame(frame)
    }
    animRef.current = requestAnimationFrame(frame)

    return () => {
      running = false
      if (animRef.current) cancelAnimationFrame(animRef.current)
      ro.disconnect()
    }
  }, [type])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 3
      }}
    />
  )
}
