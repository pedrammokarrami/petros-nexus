import { useEffect, useRef } from 'react'

export default function VisualFX({ theme, beatData }) {
  const canvasRef = useRef(null)
  const frameRef = useRef(null)
  const resizeRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    resizeRef.current = resize

    const particles = particlesRef.current

    let smokeTimer = null
    if (theme === 'negative') {
      const spawnSmoke = () => {
        particles.push({
          x: 200 + Math.random() * (canvas.width - 400),
          y: canvas.height * 0.75,
          size: 20 + Math.random() * 80,
          opacity: 0.06 + Math.random() * 0.08,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: -(0.15 + Math.random() * 0.5),
        })
        if (particles.length > 25) particles.splice(0, particles.length - 25)
        smokeTimer = setTimeout(spawnSmoke, 3000 + Math.random() * 5000)
      }
      spawnSmoke()
    }

    const draw = (time) => {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      if (theme === 'negative') {
        const imageData = ctx.createImageData(Math.min(w, 200), Math.min(h, 200))
        for (let i = 0; i < imageData.data.length; i += 4) {
          const value = Math.random() * 25
          imageData.data[i] = value
          imageData.data[i + 1] = value * 0.8
          imageData.data[i + 2] = value * 0.5
          imageData.data[i + 3] = 35
        }
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = imageData.width
        tempCanvas.height = imageData.height
        const tempCtx = tempCanvas.getContext('2d')
        tempCtx.putImageData(imageData, 0, 0)
        ctx.drawImage(tempCanvas, 0, 0, w, h)

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i]
          p.x += p.speedX
          p.y += p.speedY
          p.opacity -= 0.0005
          if (p.opacity <= 0 || p.y < -50) {
            particles.splice(i, 1)
            continue
          }
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
          grad.addColorStop(0, `rgba(200,190,170,${p.opacity})`)
          grad.addColorStop(0.5, `rgba(180,170,150,${p.opacity * 0.5})`)
          grad.addColorStop(1, 'rgba(180,170,150,0)')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      if (theme === 'tv') {
        const t = time * 0.001
        for (let y = 0; y < h; y += 3) {
          const alpha = 0.06 + Math.sin(y * 0.08 + t * 2) * 0.04
          ctx.fillStyle = `rgba(0,0,0,${alpha})`
          ctx.fillRect(0, y, w, 1)
        }

        const cx = w / 2, cy = h * 0.35
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, h * 0.55)
        const shift = Math.sin(t * 0.5) * 3
        grad.addColorStop(0, `rgba(0,255,0,0.01)`)
        grad.addColorStop(0.4, `rgba(0,200,255,0.008)`)
        grad.addColorStop(0.7, `rgba(255,0,100,0.006)`)
        grad.addColorStop(1, `rgba(0,0,0,0)`)
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)

        ctx.fillStyle = `rgba(0,255,100,0.015)`
        for (let x = 0; x < w; x += 2) {
          const noise = Math.sin(x * 0.1 + t * 0.5) > 0.8 ? 1 : 0
          if (noise) ctx.fillRect(x, Math.sin(x * 0.05 + t) * 2 + cy, 1, 1)
        }
      }

      if (theme === 'club' && beatData) {
        const flashAlpha = beatData.beat
          ? 0.15 + beatData.amplitude * 0.35
          : Math.max(0, 0.1 - (time - (beatData.timestamp || 0)) * 0.001)
        if (flashAlpha > 0.01) {
          ctx.fillStyle = `rgba(255,255,255,${Math.min(0.5, flashAlpha)})`
          ctx.fillRect(0, 0, w, h)
        }
      }

      if (theme === 'concert') {
        const t = time * 0.001
        const intensity = beatData?.amplitude || 0.3

        for (let i = 0; i < 3; i++) {
          const offset = i * 2.1
          const beamX = w * (0.25 + i * 0.25) + Math.sin(t * 0.6 + offset) * w * 0.15
          const spread = 30 + intensity * 80
          const angle = Math.sin(t * 0.4 + offset) * 0.3 + 0.6

          const grad = ctx.createLinearGradient(beamX, 0, beamX + Math.sin(angle) * h * 0.3, h * 0.5)
          const colors = [
            `rgba(255,220,150,${0.06 + intensity * 0.1})`,
            `rgba(255,180,80,${0.04 + intensity * 0.06})`,
            `rgba(200,100,255,0)`,
          ]
          grad.addColorStop(0, colors[0])
          grad.addColorStop(0.5, colors[1])
          grad.addColorStop(1, colors[2])
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.moveTo(beamX - spread, 0)
          ctx.lineTo(beamX + spread, 0)
          ctx.lineTo(beamX + spread + h * 0.3 * Math.sin(t * 0.3 + offset), h * 0.5)
          ctx.lineTo(beamX - spread - h * 0.3 * Math.sin(t * 0.3 + offset), h * 0.5)
          ctx.closePath()
          ctx.fill()

          if (Math.random() < 0.01) {
            ctx.fillStyle = `rgba(255,255,255,${0.02 + intensity * 0.03})`
            ctx.beginPath()
            ctx.arc(beamX + (Math.random() - 0.5) * 100, Math.random() * h * 0.2, 2 + Math.random() * 4, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frameRef.current)
      clearTimeout(smokeTimer)
      window.removeEventListener('resize', resize)
      particles.length = 0
    }
  }, [theme, beatData])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    />
  )
}
