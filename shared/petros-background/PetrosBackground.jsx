import { useState, useEffect, useRef, useCallback } from 'react'
import ParticleLayer from './ParticleLayer'
import { detectBiome } from './biomeDetection'

export { detectBiome }

function darknessFactor(hour) {
  const rad = (hour / 24) * Math.PI * 2 - Math.PI
  return (1 - Math.cos(rad)) / 2
}

function goldenBump(hour, center, width, peak) {
  const d = hour - center
  return peak * Math.exp(-(d * d) / (2 * width * width))
}

function getTimeOfDay(hour) {
  const dark = darknessFactor(hour)
  const golden = Math.min(
    goldenBump(hour, 6, 1.4, 0.32) + goldenBump(hour, 18, 1.4, 0.32),
    0.4
  )
  return { dark, golden }
}

export default function PetrosBackground({ enabled = true, config }) {
  const [biome, setBiome] = useState('urban')
  const [hour, setHour] = useState(new Date().getHours() + new Date().getMinutes() / 60)
  const [loaded, setLoaded] = useState(false)
  const [showTiltBtn, setShowTiltBtn] = useState(false)
  const mountedRef = useRef(true)
  const biomeRef = useRef(null)
  const particleRef = useRef(null)
  const avatarRef = useRef(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const tiltListenerRef = useRef(null)

  function onOrientation(e) {
    if (e.gamma == null || e.beta == null) return
    const nx = Math.max(-1, Math.min(1, e.gamma / 30))
    const ny = Math.max(-1, Math.min(1, (e.beta - 45) / 30))
    pointerRef.current = { x: nx, y: ny }
  }

  async function enableTilt() {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const result = await DeviceOrientationEvent.requestPermission()
        if (result === 'granted') {
          tiltListenerRef.current = onOrientation
          window.addEventListener('deviceorientation', onOrientation)
          localStorage.setItem('petros_tilt_granted', '1')
          setShowTiltBtn(false)
        }
      } catch (e) {}
    } else {
      tiltListenerRef.current = onOrientation
      window.addEventListener('deviceorientation', onOrientation)
      localStorage.setItem('petros_tilt_granted', '1')
      setShowTiltBtn(false)
    }
  }

  const updateHour = useCallback(() => {
    const now = new Date()
    setHour(now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600)
  }, [])

  useEffect(() => {
    mountedRef.current = true
    updateHour()
    const interval = setInterval(updateHour, 30000)
    return () => {
      mountedRef.current = false
      clearInterval(interval)
    }
  }, [updateHour])

  useEffect(() => {
    if (!config) return
    detectBiome(config).then((b) => {
      if (mountedRef.current) {
        setBiome(b)
        setLoaded(true)
      }
    })
  }, [config])

  useEffect(() => {
    if (!loaded) return

    const isTouch = 'ontouchstart' in window
    const tiltGranted = localStorage.getItem('petros_tilt_granted') === '1'

    if (isTouch && !tiltGranted) {
      setShowTiltBtn(true)
    }

    function onMouseMove(e) {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      pointerRef.current = { x: nx, y: ny }
    }

    if (tiltGranted) {
      enableTilt()
    }

    let raf
    function tick() {
      const ease = 0.08
      currentRef.current.x += (pointerRef.current.x - currentRef.current.x) * ease
      currentRef.current.y += (pointerRef.current.y - currentRef.current.y) * ease
      const { x, y } = currentRef.current

      if (biomeRef.current) {
        biomeRef.current.style.transform = `translate3d(${x * 4}px, ${y * 4}px, 0)`
      }
      if (particleRef.current) {
        particleRef.current.style.transform = `translate3d(${x * 9}px, ${y * 9}px, 0)`
      }
      if (avatarRef.current) {
        avatarRef.current.style.transform = `translate3d(${x * 16}px, ${y * 16}px, 0)`
      }

      raf = requestAnimationFrame(tick)
    }

    tick()

    if (!isTouch) {
      window.addEventListener('mousemove', onMouseMove)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      if (tiltListenerRef.current) {
        window.removeEventListener('deviceorientation', tiltListenerRef.current)
      }
    }
  }, [loaded])

  if (!config || config.live !== true) return null
  if (!enabled || !loaded) return null

  const { dark, golden } = getTimeOfDay(hour)
  const biomeData = config.biomes[biome] || config.biomes.urban
  const particleType = biomeData.particle || 'none'

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: '#060912'
      }}
    >
      {biomeData.image && (
        <div
          ref={biomeRef}
          style={{
            position: 'absolute',
            left: '-5%',
            top: '-5%',
            width: '110%',
            height: '110%',
            zIndex: 1,
            willChange: 'transform'
          }}
        >
          <img
            src={biomeData.image}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      )}

      <div
        ref={particleRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          willChange: 'transform'
        }}
      >
        <ParticleLayer type={particleType} />
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 4,
          background: 'linear-gradient(180deg, rgba(255,150,60,0.9) 0%, rgba(255,90,60,0.5) 100%)',
          mixBlendMode: 'screen',
          opacity: golden,
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 4,
          backgroundColor: '#060912',
          mixBlendMode: 'multiply',
          opacity: dark * 0.68,
          pointerEvents: 'none'
        }}
      />

      {config.avatar && config.avatar.image && (
        <div
          ref={avatarRef}
          style={{
            position: 'absolute',
            bottom: '8%',
            right: '5%',
            zIndex: 5,
            willChange: 'transform'
          }}
        >
          <img
            src={config.avatar.image}
            alt=""
            style={{
              width: 120,
              height: 120,
              objectFit: 'contain',
              animation: 'petrosFloat 3s ease-in-out infinite',
              pointerEvents: 'none'
            }}
          />
        </div>
      )}

      {showTiltBtn && (
        <button
          onClick={enableTilt}
          style={{
            position: 'fixed',
            bottom: 20,
            left: 20,
            zIndex: 9999,
            padding: '8px 16px',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 8,
            background: 'rgba(0,0,0,0.6)',
            color: '#ccc',
            fontSize: 13,
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
        >
          فعال کردن جلوه‌ی عمق
        </button>
      )}

      <style>{`
        @keyframes petrosFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  )
}
