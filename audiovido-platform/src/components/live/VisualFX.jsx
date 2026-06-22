import { useEffect, useRef, useState } from 'react'

export default function VisualFX({ theme, beatData }) {
  const canvasRef = useRef(null)
  const [smokeParticles, setSmokeParticles] = useState([])
  const smokeInterval = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    if (theme !== 'negative') {
      setSmokeParticles([])
      clearInterval(smokeInterval.current)
      return
    }
    smokeInterval.current = setInterval(() => {
      setSmokeParticles((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: 200 + Math.random() * 680,
          y: 700,
          size: 20 + Math.random() * 60,
          opacity: 0.08 + Math.random() * 0.08,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: -(0.2 + Math.random() * 0.4),
        },
      ])
    }, 4000 + Math.random() * 6000)
    return () => clearInterval(smokeInterval.current)
  }, [theme])

  useEffect(() => {
    if (smokeParticles.length > 20) {
      setSmokeParticles((prev) => prev.slice(-15))
    }
  }, [smokeParticles])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      if (theme === 'negative') {
        const grainSize = 1.5
        const imageData = ctx.createImageData(w, h)
        for (let i = 0; i < imageData.data.length; i += 4) {
          const value = Math.random() * 20
          imageData.data[i] = value
          imageData.data[i + 1] = value * 0.8
          imageData.data[i + 2] = value * 0.5
          imageData.data[i + 3] = 30
        }
        ctx.putImageData(imageData, 0, 0)

        smokeParticles.forEach((p) => {
          ctx.beginPath()
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
          gradient.addColorStop(0, `rgba(180,170,150,${p.opacity})`)
          gradient.addColorStop(1, 'rgba(180,170,150,0)')
          ctx.fillStyle = gradient
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        })
      }

      if (theme === 'tv') {
        const spacing = 3
        for (let y = 0; y < h; y += spacing) {
          ctx.fillStyle = `rgba(0,0,0,${0.08 + Math.sin(y * 0.1 + Date.now() * 0.001) * 0.04})`
          ctx.fillRect(0, y, w, 1)
        }
        const grad = ctx.createRadialGradient(w / 2, h * 0.35, h * 0.2, w / 2, h * 0.35, h * 0.6)
        grad.addColorStop(0, 'rgba(0,255,0,0.01)')
        grad.addColorStop(0.5, 'rgba(0,0,255,0.01)')
        grad.addColorStop(1, 'rgba(255,0,0,0.005)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)
      }

      if (theme === 'club' && beatData?.beat) {
        ctx.fillStyle = `rgba(255,255,255,${0.1 + beatData.amplitude * 0.3})`
        ctx.fillRect(0, 0, w, h)
      }

      if (theme === 'concert') {
        const time = Date.now() * 0.001
        const intensity = beatData?.amplitude || 0.3

        const beamWidth = 60 + intensity * 100
        const beamX1 = w * 0.5 + Math.sin(time * 0.7) * w * 0.15
        const beamX2 = w * 0.5 + Math.sin(time * 0.7 + 2) * w * 0.15

        const beamGrad1 = ctx.createLinearGradient(beamX1, 0, beamX1 - beamWidth, h * 0.5)
        beamGrad1.addColorStop(0, `rgba(255,220,150,${0.08 + intensity * 0.1})`)
        beamGrad1.addColorStop(1, 'rgba(255,220,150,0)')
        ctx.fillStyle = beamGrad1
        ctx.beginPath()
        ctx.moveTo(beamX1 - beamWidth, 0)
        ctx.lineTo(beamX1 + beamWidth, 0)
        ctx.lineTo(beamX1 + beamWidth + h * 0.3 * Math.sin(time * 0.5), h * 0.5)
        ctx.lineTo(beamX1 - beamWidth - h * 0.3 * Math.sin(time * 0.5), h * 0.5)
        ctx.closePath()
        ctx.fill()

        const beamGrad2 = ctx.createLinearGradient(beamX2, 0, beamX2 - beamWidth, h * 0.5)
        beamGrad2.addColorStop(0, `rgba(150,200,255,${0.06 + intensity * 0.08})`)
        beamGrad2.addColorStop(1, 'rgba(150,200,255,0)')
        ctx.fillStyle = beamGrad2
        ctx.beginPath()
        ctx.moveTo(beamX2 - beamWidth, 0)
        ctx.lineTo(beamX2 + beamWidth, 0)
        ctx.lineTo(beamX2 + beamWidth + h * 0.2 * Math.sin(time * 0.3 + 1), h * 0.5)
        ctx.lineTo(beamX2 - beamWidth - h * 0.2 * Math.sin(time * 0.3 + 1), h * 0.5)
        ctx.closePath()
        ctx.fill()

        if (beatData?.beat) {
          const flashGrad = ctx.createRadialGradient(w / 2, 0, 0, w / 2, 0, h * 0.4)
          flashGrad.addColorStop(0, `rgba(255,255,255,${0.06 + intensity * 0.1})`)
          flashGrad.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.fillStyle = flashGrad
          ctx.fillRect(0, 0, w, h)
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animId)
  }, [theme, beatData, smokeParticles])

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
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
