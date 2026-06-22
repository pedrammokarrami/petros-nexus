import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Maximize2, ArrowLeft, Play } from 'lucide-react'
import LiveChat from '../components/live/LiveChat'
import VisualFX from '../components/live/VisualFX'
import AudioEngine from '../components/live/AudioEngine'

const modeConfig = {
  'cinema-modern': {
    theme: 'modern', type: 'cinema', accent: '#ff6b6b',
    bg: '/images/live/cinema-modern.png',
    inputStyle: { background: 'rgba(255,107,107,0.15)', borderColor: 'rgba(255,107,107,0.3)' },
  },
  'cinema-negative': {
    theme: 'negative', type: 'cinema', accent: '#a78b5a',
    bg: '/images/live/cinema-negative.png',
    inputStyle: { background: 'rgba(167,139,90,0.15)', borderColor: 'rgba(167,139,90,0.3)' },
  },
  'cinema-tv': {
    theme: 'tv', type: 'cinema', accent: '#38bdf8',
    bg: '/images/live/cinema-tv.png',
    inputStyle: { background: 'rgba(56,189,248,0.1)', borderColor: 'rgba(56,189,248,0.25)' },
  },
  'music-bar': {
    theme: 'bar', type: 'music', accent: '#f59e0b',
    bg: '#1a0e06',
    inputStyle: { background: 'rgba(245,158,11,0.12)', borderColor: 'rgba(245,158,11,0.3)' },
  },
  'music-club': {
    theme: 'club', type: 'music', accent: '#a855f7',
    bg: '#0a0010',
    inputStyle: { background: 'rgba(168,85,247,0.15)', borderColor: 'rgba(168,85,247,0.3)' },
  },
  'music-concert': {
    theme: 'concert', type: 'music', accent: '#f43f5e',
    bg: '#0e0818',
    inputStyle: { background: 'rgba(244,63,94,0.15)', borderColor: 'rgba(244,63,94,0.3)' },
  },
}

const greenCache = new Map()

function detectGreenRegion(img) {
  const key = img.src
  if (greenCache.has(key)) return greenCache.get(key)

  const c = document.createElement('canvas')
  c.width = img.naturalWidth
  c.height = img.naturalHeight
  const ctx = c.getContext('2d')
  ctx.drawImage(img, 0, 0)
  const data = ctx.getImageData(0, 0, c.width, c.height).data

  let minX = Infinity, minY = Infinity, maxX = -1, maxY = -1

  for (let y = 0; y < c.height; y++) {
    for (let x = 0; x < c.width; x++) {
      const i = (y * c.width + x) * 4
      const R = data[i], G = data[i + 1], B = data[i + 2]
      if (G > R * 1.4 && G > B * 1.4 && G > 100) {
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }

  const rect = {
    top: (minY / c.height) * 100,
    left: (minX / c.width) * 100,
    width: ((maxX - minX) / c.width) * 100,
    height: ((maxY - minY) / c.height) * 100,
  }
  greenCache.set(key, rect)
  return rect
}

function useGreenFrame(imageSrc) {
  const [rect, setRect] = useState(null)
  const [imgLoaded, setImgLoaded] = useState(false)
  const mountedRef = useRef(true)
  const frameIdRef = useRef(null)

  const detect = useCallback(() => {
    if (!imageSrc) return
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const r = detectGreenRegion(img)
      if (mountedRef.current) {
        setRect(r)
        setImgLoaded(true)
      }
    }
    img.src = imageSrc
  }, [imageSrc])

  useEffect(() => {
    mountedRef.current = true
    detect()

    const onResize = () => {
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current)
      frameIdRef.current = requestAnimationFrame(detect)
    }
    window.addEventListener('resize', onResize)
    return () => {
      mountedRef.current = false
      cancelAnimationFrame(frameIdRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [detect])

  return [rect, imgLoaded]
}

const styles = {
  wrap: {
    position: 'fixed', inset: 0, zIndex: 200,
    overflow: 'hidden', color: '#fff',
  },
  bgImg: {
    position: 'fixed', inset: 0,
    width: '100%', height: '100%',
    objectFit: 'cover',
    pointerEvents: 'none',
  },
  playOverlay: {
    position: 'absolute', inset: 0,
    display: 'grid', placeItems: 'center',
    background: 'rgba(0,0,0,0.4)',
    cursor: 'pointer', zIndex: 20,
  },
  playBtn: {
    width: 52, height: 52, borderRadius: '50%',
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(8px)',
    display: 'grid', placeItems: 'center',
  },
  header: {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 30,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    paddingTop: 'calc(12px + env(safe-area-inset-top, 0px))',
  },
  iconBtn: {
    width: 44, height: 44, borderRadius: 14,
    background: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.1)',
    display: 'grid', placeItems: 'center',
    cursor: 'pointer', color: '#fff',
  },
  chatWrap: {
    position: 'fixed',
    top: 0, right: 0, bottom: 0,
    width: 280, zIndex: 25,
    display: 'flex', flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '80px 12px 20px',
    pointerEvents: 'none',
  },
}

function GreenFrameCanvas({ theme, beatData, videoBoxRef }) {
  const ref = useRef(null)
  const frameRef = useRef(null)
  const particlesRef = useRef([])
  const dprRef = useRef(1)

  useEffect(() => {
    dprRef.current = window.devicePixelRatio || 1
  }, [])

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      const pw = parent.offsetWidth
      const ph = parent.offsetHeight
      const dpr = dprRef.current
      canvas.width = pw * dpr
      canvas.height = ph * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = pw + 'px'
      canvas.style.height = ph + 'px'
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(parent)

    const particles = particlesRef.current
    let smokeTimer

    if (theme === 'negative') {
      const spawnSmoke = () => {
        const pw = parent.offsetWidth
        const ph = parent.offsetHeight
        particles.push({
          x: pw * 0.2 + Math.random() * pw * 0.6,
          y: ph * 0.7,
          size: 20 + Math.random() * 60,
          opacity: 0.04 + Math.random() * 0.06,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: -(0.1 + Math.random() * 0.3),
        })
        if (particles.length > 20) particles.splice(0, particles.length - 20)
        smokeTimer = setTimeout(spawnSmoke, 2500 + Math.random() * 4000)
      }
      spawnSmoke()
    }

    const draw = (time) => {
      const pw = parent.offsetWidth
      const ph = parent.offsetHeight
      const dpr = dprRef.current
      if (canvas.width !== pw * dpr || canvas.height !== ph * dpr) {
        canvas.width = pw * dpr
        canvas.height = ph * dpr
        ctx.scale(dpr, dpr)
        canvas.style.width = pw + 'px'
        canvas.style.height = ph + 'px'
      }
      ctx.clearRect(0, 0, pw, ph)

      if (theme === 'negative') {
        const grainW = Math.min(pw, 200)
        const grainH = Math.min(ph, 200)
        const imgData = ctx.createImageData(grainW, grainH)
        for (let i = 0; i < imgData.data.length; i += 4) {
          const v = Math.random() * 30
          imgData.data[i] = v + 10
          imgData.data[i + 1] = v * 0.7 + 5
          imgData.data[i + 2] = v * 0.4
          imgData.data[i + 3] = 40
        }
        const tc = document.createElement('canvas')
        tc.width = grainW; tc.height = grainH
        const tctx = tc.getContext('2d')
        tctx.putImageData(imgData, 0, 0)
        ctx.drawImage(tc, 0, 0, pw, ph)

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i]
          p.x += p.speedX; p.y += p.speedY
          p.opacity -= 0.0005
          if (p.opacity <= 0 || p.y < -50) { particles.splice(i, 1); continue }
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
          g.addColorStop(0, `rgba(180,160,140,${p.opacity})`)
          g.addColorStop(0.5, `rgba(160,140,120,${p.opacity * 0.5})`)
          g.addColorStop(1, 'rgba(160,140,120,0)')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      if (theme === 'tv') {
        const t = time * 0.001
        ctx.clearRect(0, 0, pw, ph)

        ctx.fillStyle = `rgba(0,0,0,${0.04 + Math.sin(t * 1.5) * 0.02})`
        ctx.fillRect(0, 0, pw, ph)
        for (let y = 0; y < ph; y += 3) {
          const a = 0.04 + Math.sin(y * 0.06 + t * 1.5) * 0.03
          ctx.fillStyle = `rgba(0,0,0,${a})`
          ctx.fillRect(0, y, pw, 1)
        }
        const cx = pw / 2, cy = ph * 0.45
        const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, ph * 0.55)
        rg.addColorStop(0, `rgba(0,255,0,0.008)`)
        rg.addColorStop(0.4, `rgba(0,200,255,0.006)`)
        rg.addColorStop(0.7, `rgba(255,0,100,0.004)`)
        rg.addColorStop(1, `rgba(0,0,0,0)`)
        ctx.fillStyle = rg
        ctx.fillRect(0, 0, pw, ph)

        ctx.fillStyle = `rgba(0,255,100,0.01)`
        for (let x = 0; x < pw; x += 3) {
          if (Math.sin(x * 0.08 + t * 0.3) > 0.85) {
            ctx.fillRect(x, Math.sin(x * 0.04 + t) * 3 + cy, 2, 1)
          }
        }
      }

      frameRef.current = requestAnimationFrame(draw)
    }
    frameRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frameRef.current)
      clearTimeout(smokeTimer)
      ro.disconnect()
      particles.length = 0
    }
  }, [theme, beatData])

  return (
    <canvas ref={ref} style={{
      position: 'absolute', top: 0, left: 0,
      pointerEvents: 'none', zIndex: 10,
    }} />
  )
}

function GreenVideo({ videoRef, toggleMedia, isMediaPlaying, isFullscreen, theme, beatData, gRect }) {
  return (
    <div style={{
      position: 'absolute',
      top: `${gRect.top}%`,
      left: `${gRect.left}%`,
      width: `${gRect.width}%`,
      height: `${gRect.height}%`,
      zIndex: 5,
      overflow: 'hidden',
    }}>
      <video
        ref={videoRef}
        src="/videos/sample.mp4"
        muted
        loop
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'fill',
          cursor: 'pointer',
          filter: theme === 'negative'
            ? 'sepia(0.6) saturate(0.7) brightness(0.85) contrast(1.1)'
            : 'none',
        }}
        onClick={toggleMedia}
      />
      {!isFullscreen && !isMediaPlaying && (
        <div onClick={toggleMedia} style={styles.playOverlay}>
          <div style={styles.playBtn}>
            <Play size={22} fill="#fff" color="#fff" />
          </div>
        </div>
      )}
      {!isFullscreen && (theme === 'negative' || theme === 'tv') && (
        <GreenFrameCanvas theme={theme} beatData={beatData} />
      )}
    </div>
  )
}

function CinemaSeats() {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      height: '22%', zIndex: 8,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      <div style={{
        height: '60%',
        background: `
          repeating-linear-gradient(
            90deg,
            transparent 0px, transparent 12px,
            rgba(40,20,10,0.6) 12px, rgba(60,30,15,0.7) 16px,
            rgba(40,20,10,0.6) 20px, transparent 20px, transparent 28px
          ),
          repeating-linear-gradient(
            0deg,
            transparent 0px, transparent 4px,
            rgba(20,10,5,0.5) 4px, rgba(30,15,8,0.6) 8px,
            rgba(20,10,5,0.5) 12px, transparent 12px, transparent 16px
          )
        `,
      }} />
    </div>
  )
}

function ConcertStage() {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      height: '18%', zIndex: 8,
      pointerEvents: 'none',
      background: `repeating-linear-gradient(
        90deg,
        transparent 0px, transparent 4px,
        rgba(10,5,15,0.8) 4px, rgba(15,8,20,0.6) 5px,
        transparent 5px, transparent 9px
      )`,
      maskImage: 'linear-gradient(to top, black 40%, transparent)',
      WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent)',
    }}>
      <div style={{
        position: 'absolute', bottom: 5, left: '5%', right: '5%',
        height: '40%',
        background: [
          'radial-gradient(ellipse 3px 4px at 10% 100%, rgba(255,255,255,0.35) 0%, transparent 100%)',
          'radial-gradient(ellipse 3px 4px at 20% 100%, rgba(255,255,255,0.25) 0%, transparent 100%)',
          'radial-gradient(ellipse 3px 4px at 30% 100%, rgba(255,255,255,0.30) 0%, transparent 100%)',
          'radial-gradient(ellipse 3px 4px at 40% 100%, rgba(255,255,255,0.20) 0%, transparent 100%)',
          'radial-gradient(ellipse 3px 4px at 50% 100%, rgba(255,255,255,0.35) 0%, transparent 100%)',
          'radial-gradient(ellipse 3px 4px at 60% 100%, rgba(255,255,255,0.25) 0%, transparent 100%)',
          'radial-gradient(ellipse 3px 4px at 70% 100%, rgba(255,255,255,0.30) 0%, transparent 100%)',
          'radial-gradient(ellipse 3px 4px at 80% 100%, rgba(255,255,255,0.20) 0%, transparent 100%)',
          'radial-gradient(ellipse 3px 4px at 90% 100%, rgba(255,255,255,0.35) 0%, transparent 100%)',
        ].join(', '),
      }} />
    </div>
  )
}

function MusicCore({ theme, beatData }) {
  const amplitude = beatData?.amplitude || 0
  const isBeat = beatData?.beat || false
  const [tick, setTick] = useState(0)
  const frameRef = useRef()

  useEffect(() => {
    let running = true
    const loop = () => {
      if (running) setTick((t) => t + 1)
      frameRef.current = requestAnimationFrame(loop)
    }
    frameRef.current = requestAnimationFrame(loop)
    return () => { running = false; cancelAnimationFrame(frameRef.current) }
  }, [])

  return (
    <div style={{
      position: 'relative', zIndex: 5,
      width: '80%', maxWidth: 500,
      aspectRatio: '1 / 1',
      borderRadius: theme === 'bar' ? 24 : 20,
      overflow: 'hidden',
      background: theme === 'bar'
        ? 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.15), rgba(20,10,5,0.9))'
        : theme === 'club'
          ? 'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.1), rgba(10,0,16,0.9))'
          : 'radial-gradient(circle at 50% 50%, rgba(244,63,94,0.08), rgba(14,8,24,0.9))',
      boxShadow: isBeat && (theme === 'club' || theme === 'concert')
        ? `0 0 60px ${theme === 'club' ? 'rgba(168,85,247,0.4)' : 'rgba(244,63,94,0.3)'}`
        : theme === 'bar'
          ? '0 0 40px rgba(245,158,11,0.2)'
          : 'none',
      transition: 'box-shadow 0.1s ease',
    }}>
      <div style={{
        position: 'absolute', inset: '15%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: '4%',
      }}>
        {[0,1,2,3,4,5,6,7].map((i) => {
          const t = tick * 0.05
          const h = 0.15 + Math.sin(t * 2 + i * 1.2) * 0.15 + amplitude * 0.3
          return (
            <div key={i} style={{
              width: '8%',
              height: `${h * 100}%`,
              borderRadius: '4px 4px 0 0',
              background: theme === 'bar'
                ? `rgba(245,158,11,${0.3 + h * 0.5})`
                : theme === 'club'
                  ? `rgba(168,85,247,${0.3 + h * 0.5})`
                  : `rgba(244,63,94,${0.3 + h * 0.5})`,
              boxShadow: isBeat ? `0 0 8px ${theme === 'bar' ? '#f59e0b' : theme === 'club' ? '#a855f7' : '#f43f5e'}44` : 'none',
            }} />
          )
        })}
      </div>
    </div>
  )
}

function ClubCanvas({ beatData }) {
  const ref = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let lastFlash = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = (time) => {
      const w = canvas.width, h = canvas.height
      ctx.clearRect(0, 0, w, h)
      if (beatData?.beat) lastFlash = time
      const elapsed = time - lastFlash
      if (elapsed < 120) {
        const a = Math.max(0, 0.18 + (beatData?.amplitude || 0) * 0.3) * (1 - elapsed / 120)
        ctx.fillStyle = `rgba(255,255,255,${Math.min(0.5, a)})`
        ctx.fillRect(0, 0, w, h)
      }
      frameRef.current = requestAnimationFrame(draw)
    }
    frameRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [beatData])

  return (
    <canvas ref={ref} style={{
      position: 'fixed', inset: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 10,
    }} />
  )
}

function ConcertCanvas({ beatData }) {
  const ref = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = (time) => {
      const w = canvas.width, h = canvas.height, t = time * 0.001
      const intensity = beatData?.amplitude || 0.3
      const isBeat = beatData?.beat || false
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < 3; i++) {
        const offset = i * 2.1
        const beamX = w * (0.2 + i * 0.3) + Math.sin(t * 0.5 + offset) * w * 0.1
        const spread = 20 + intensity * 60 + (isBeat ? 40 : 0)
        const angle = Math.sin(t * 0.3 + offset) * 0.25 + 0.55
        const g = ctx.createLinearGradient(beamX, 0, beamX + Math.sin(angle) * h * 0.25, h * 0.45)
        const baseA = 0.04 + intensity * 0.08 + (isBeat ? 0.06 : 0)
        g.addColorStop(0, `rgba(255,220,150,${baseA})`)
        g.addColorStop(0.5, `rgba(255,180,80,${baseA * 0.6})`)
        g.addColorStop(1, `rgba(200,100,255,0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.moveTo(beamX - spread, 0)
        ctx.lineTo(beamX + spread, 0)
        ctx.lineTo(beamX + spread + h * 0.25 * Math.sin(t * 0.25 + offset), h * 0.45)
        ctx.lineTo(beamX - spread - h * 0.25 * Math.sin(t * 0.25 + offset), h * 0.45)
        ctx.closePath()
        ctx.fill()
        if (Math.random() < 0.008 + intensity * 0.01) {
          ctx.fillStyle = `rgba(255,255,255,${0.01 + intensity * 0.02})`
          ctx.beginPath()
          ctx.arc(beamX + (Math.random() - 0.5) * 80, Math.random() * h * 0.15, 1 + Math.random() * 3, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      frameRef.current = requestAnimationFrame(draw)
    }
    frameRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [beatData])

  return (
    <canvas ref={ref} style={{
      position: 'fixed', inset: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 10,
    }} />
  )
}

function LaserAccents({ beatData }) {
  const isBeat = beatData?.beat || false
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 6,
      pointerEvents: 'none', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '20%', left: '5%',
        width: 3, height: '30%',
        background: `linear-gradient(to bottom, rgba(168,85,247,${isBeat ? 0.6 : 0.2}), transparent)`,
        transform: 'rotate(-10deg)',
        boxShadow: isBeat ? '0 0 12px rgba(168,85,247,0.4)' : 'none',
        transition: 'opacity 0.1s ease, box-shadow 0.1s ease',
        opacity: isBeat ? 1 : 0.5,
      }} />
      <div style={{
        position: 'absolute', top: '15%', right: '8%',
        width: 3, height: '25%',
        background: `linear-gradient(to bottom, rgba(236,72,153,${isBeat ? 0.5 : 0.15}), transparent)`,
        transform: 'rotate(8deg)',
        boxShadow: isBeat ? '0 0 12px rgba(236,72,153,0.3)' : 'none',
        transition: 'opacity 0.1s ease, box-shadow 0.1s ease',
        opacity: isBeat ? 1 : 0.5,
      }} />
    </div>
  )
}

function ConcertBeams({ beatData }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 6,
      pointerEvents: 'none', overflow: 'hidden',
    }}>
      {[0,1,2].map((i) => {
        const isBeat = beatData?.beat || false
        const intensity = beatData?.amplitude || 0.3
        const opacity = 0.08 + intensity * 0.12 + (isBeat ? 0.08 : 0)
        return (
          <div key={i} style={{
            position: 'absolute', top: 0,
            left: `${15 + i * 35}%`,
            width: '8%', height: '55%',
            background: `linear-gradient(to bottom,
              rgba(255,220,150,${opacity}) 0%,
              rgba(255,180,80,${opacity * 0.3}) 50%,
              transparent 100%)`,
            transform: `skewX(${(i - 1) * 12}deg)`,
            transformOrigin: 'top center',
            transition: 'opacity 0.08s ease',
          }} />
        )
      })}
    </div>
  )
}

export default function LiveScreen() {
  const { category, mode } = useParams()
  const fullMode = `${category}-${mode}`
  const navigate = useNavigate()
  const config = modeConfig[fullMode]
  const isCinema = config?.type === 'cinema'
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [audioContext, setAudioContext] = useState(null)
  const [beatData, setBeatData] = useState({ beat: false, amplitude: 0 })
  const [isMediaPlaying, setIsMediaPlaying] = useState(false)
  const screenRef = useRef(null)
  const videoRef = useRef(null)
  const audioRef = useRef(null)

  const [greenRect, bgLoaded] = useGreenFrame(isCinema ? config?.bg : null)

  useEffect(() => {
    if (!modeConfig[fullMode]) navigate('/live', { replace: true })
  }, [fullMode, navigate])

  useEffect(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    setAudioContext(ctx)
    return () => { ctx.close() }
  }, [])

  const toggleMedia = useCallback(() => {
    const promises = []
    if (audioRef.current) {
      if (audioRef.current.paused) {
        promises.push(audioRef.current.play().catch(() => {}))
      } else {
        audioRef.current.pause()
      }
    }
    if (isCinema && videoRef.current) {
      if (videoRef.current.paused) {
        promises.push(videoRef.current.play().catch(() => {}))
      } else {
        videoRef.current.pause()
      }
    }
    if (promises.length) {
      Promise.all(promises).then(() => setIsMediaPlaying(true)).catch(() => {})
    } else {
      setIsMediaPlaying(false)
    }
  }, [isCinema])

  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      if (isCinema && videoRef.current) {
        videoRef.current.requestFullscreen()
      } else {
        screenRef.current?.requestFullscreen()
      }
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [isCinema])

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  const handleBeat = useCallback((data) => {
    setBeatData(data)
  }, [])

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    const onPlay = () => setIsMediaPlaying(true)
    const onPause = () => setIsMediaPlaying(false)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)
    return () => {
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
    }
  }, [mode])

  if (!config) return null

  return (
    <div ref={screenRef} style={styles.wrap}>

      {isFullscreen ? (
        <>
          {isCinema && (
            <video ref={videoRef} src="/videos/sample.mp4" muted loop playsInline
              autoPlay style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          )}
          <audio ref={audioRef} src="/audio/sample.mp3" loop autoPlay playsInline
            style={{ display: 'none' }} />
        </>
      ) : (
        <>
          {/* Background image for cinema modes */}
          {isCinema && config.bg && (
            <img src={config.bg} alt="" style={styles.bgImg} />
          )}

          {/* Cinema modes — video positioned on green region */}
          {isCinema && greenRect && (
            <GreenVideo
              videoRef={videoRef}
              toggleMedia={toggleMedia}
              isMediaPlaying={isMediaPlaying}
              isFullscreen={isFullscreen}
              theme={config.theme}
              beatData={beatData}
              gRect={greenRect}
            />
          )}

          {/* Negative cinema seat overlay */}
          {isCinema && config.theme === 'negative' && <CinemaSeats />}

          {/* Music modes */}
          {!isCinema && (
            <>
              <MusicCore theme={config.theme} beatData={beatData} />
              {config.theme === 'bar' && (
                <div style={{
                  position: 'fixed', inset: 0, zIndex: 3,
                  background: 'radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.06), transparent 60%)',
                  pointerEvents: 'none',
                }} />
              )}
              {config.theme === 'club' && (
                <>
                  <ClubCanvas beatData={beatData} />
                  <LaserAccents beatData={beatData} />
                </>
              )}
              {config.theme === 'concert' && (
                <>
                  <ConcertCanvas beatData={beatData} />
                  <ConcertBeams beatData={beatData} />
                  <ConcertStage />
                </>
              )}
            </>
          )}

          {/* Audio */}
          <audio ref={audioRef} src="/audio/sample.mp3" loop playsInline
            style={{ display: 'none' }} />

          {/* Visual FX */}
          {!isFullscreen && <VisualFX theme={config.theme} beatData={beatData} />}

          {/* Audio Engine */}
          {!isFullscreen && audioContext && audioRef.current && (
            <AudioEngine
              key={fullMode}
              audioContext={audioContext}
              theme={config.theme}
              onBeat={handleBeat}
              mediaElement={audioRef.current}
            />
          )}

          {/* Music play overlay */}
          {!isCinema && !isMediaPlaying && (
            <div onClick={toggleMedia} style={{
              position: 'fixed', inset: 0, zIndex: 12,
              display: 'grid', placeItems: 'center',
              cursor: 'pointer', background: 'rgba(0,0,0,0.1)',
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
                display: 'grid', placeItems: 'center',
                border: '1px solid rgba(255,255,255,0.15)',
              }}>
                <Play size={28} fill="#fff" color="#fff" />
              </div>
            </div>
          )}

          {/* Header */}
          <div style={styles.header}>
            <button onClick={() => navigate('/live')} style={styles.iconBtn}>
              <ArrowLeft size={20} />
            </button>
            <button onClick={handleFullscreen} style={styles.iconBtn}>
              <Maximize2 size={20} />
            </button>
          </div>

          {/* Chat */}
          <div style={styles.chatWrap}>
            <div style={{ pointerEvents: 'auto', flex: 1 }} />
            <LiveChat
              mode={fullMode}
              accent={config.accent}
              inputStyle={config.inputStyle}
            />
          </div>
        </>
      )}
    </div>
  )
}
