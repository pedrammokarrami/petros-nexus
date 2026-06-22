import { useEffect, useRef } from 'react'

export default function TestPatternVideo({ videoRef, isCinema }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !videoRef?.current || !isCinema) return

    const ctx = canvas.getContext('2d')
    let animId
    let startTime = Date.now()

    try {
      const stream = canvas.captureStream(30)
      videoRef.current.srcObject = stream
      videoRef.current.play().catch(() => {})
    } catch {
      return
    }

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      const t = (Date.now() - startTime) * 0.001

      ctx.fillStyle = '#0a0a1a'
      ctx.fillRect(0, 0, w, h)

      const barCount = 6
      const barW = w / barCount
      for (let i = 0; i < barCount; i++) {
        const hue = (i * 40 + t * 20) % 360
        ctx.fillStyle = `hsl(${hue}, 80%, ${50 + Math.sin(t * 2 + i) * 20}%)`
        ctx.fillRect(i * barW + 4, Math.sin(t + i) * h * 0.1 + h * 0.2, barW - 8, h * 0.3)
      }

      const rate = 0.5 + Math.sin(t * 0.5) * 0.3
      ctx.fillStyle = `rgba(255,255,255,${0.05 + Math.abs(Math.sin(t * 4)) * 0.05})`
      for (let y = 0; y < h; y += 4) {
        ctx.fillRect(Math.sin(y * 0.02 + t * 2) * 20 + w / 2 - 1, y, 2, 2)
      }

      ctx.fillStyle = `rgba(100,200,255,0.15)`
      ctx.font = `${w * 0.04}px monospace`
      ctx.textAlign = 'center'
      ctx.fillText('▶ TEST PATTERN', w / 2, h / 2)

      const x = w / 2 + Math.cos(t * 0.7) * w * 0.3
      const y = h * 0.65 + Math.sin(t * 0.5) * h * 0.1
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.fillStyle = `hsl(${t * 50 % 360}, 100%, 60%)`
      ctx.fill()

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      try {
        if (videoRef.current) {
          videoRef.current.pause()
          videoRef.current.srcObject = null
        }
      } catch {}
    }
  }, [videoRef, isCinema])

  if (!isCinema) return null

  return (
    <canvas
      ref={canvasRef}
      width={640}
      height={360}
      style={{ display: 'none' }}
    />
  )
}
