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
  const mountedRef = useRef(true)

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
        <img
          src={biomeData.image}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1
          }}
        />
      )}

      <ParticleLayer type={particleType} />

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
        <img
          src={config.avatar.image}
          alt=""
          style={{
            position: 'absolute',
            bottom: '8%',
            right: '5%',
            zIndex: 5,
            width: 120,
            height: 120,
            objectFit: 'contain',
            animation: 'petrosFloat 3s ease-in-out infinite',
            pointerEvents: 'none'
          }}
        />
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
