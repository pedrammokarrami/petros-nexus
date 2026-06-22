import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Maximize2, Minimize2, ArrowLeft } from 'lucide-react'
import LiveChat from '../components/live/LiveChat'
import VisualFX from '../components/live/VisualFX'
import AudioEngine from '../components/live/AudioEngine'
import usePlayerStore from '../store/usePlayerStore'

const modeConfig = {
  'cinema-modern': {
    bg: '/images/live/cinema-modern.png',
    theme: 'modern',
    accent: '#60a5fa',
    inputStyle: {
      background: 'rgba(96, 165, 250, 0.15)',
      borderColor: 'rgba(96, 165, 250, 0.3)',
    },
  },
  'cinema-negative': {
    bg: '/images/live/cinema-negative.png',
    theme: 'negative',
    accent: '#a78b5a',
    inputStyle: {
      background: 'rgba(167, 139, 90, 0.15)',
      borderColor: 'rgba(167, 139, 90, 0.3)',
    },
  },
  'cinema-tv': {
    bg: '/images/live/cinema-tv.png',
    theme: 'tv',
    accent: '#38bdf8',
    inputStyle: {
      background: 'rgba(56, 189, 248, 0.1)',
      borderColor: 'rgba(56, 189, 248, 0.25)',
    },
  },
  'music-bar': {
    bg: '/images/live/music-bar.png',
    theme: 'bar',
    accent: '#f59e0b',
    inputStyle: {
      background: 'rgba(245, 158, 11, 0.12)',
      borderColor: 'rgba(245, 158, 11, 0.3)',
    },
  },
  'music-club': {
    bg: '/images/live/music-club.png',
    theme: 'club',
    accent: '#a855f7',
    inputStyle: {
      background: 'rgba(168, 85, 247, 0.15)',
      borderColor: 'rgba(168, 85, 247, 0.3)',
    },
  },
  'music-concert': {
    bg: '/images/live/music-concert.png',
    theme: 'concert',
    accent: '#f43f5e',
    inputStyle: {
      background: 'rgba(244, 63, 94, 0.15)',
      borderColor: 'rgba(244, 63, 94, 0.3)',
    },
  },
}

export default function LiveScreen() {
  const { category, mode } = useParams()
  const fullMode = `${category}-${mode}`
  const navigate = useNavigate()
  const config = modeConfig[fullMode]
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [audioContext, setAudioContext] = useState(null)
  const [beatData, setBeatData] = useState({ beat: false, amplitude: 0 })
  const screenRef = useRef(null)

  const { currentMedia } = usePlayerStore()

  useEffect(() => {
    if (!modeConfig[fullMode]) {
      navigate('/live', { replace: true })
    }
  }, [fullMode, navigate])

  useEffect(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    setAudioContext(ctx)
    return () => { ctx.close() }
  }, [])

  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      screenRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  const handleBeat = useCallback((data) => {
    setBeatData(data)
  }, [])

  if (!config) return null

  return (
    <div
      ref={screenRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: '#000',
        overflow: 'hidden',
      }}
    >
      <img
        src={config.bg}
        alt=""
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />

      {!isFullscreen && <VisualFX theme={config.theme} beatData={beatData} />}

      {!isFullscreen && audioContext && currentMedia && (
        <AudioEngine
          audioContext={audioContext}
          theme={config.theme}
          onBeat={handleBeat}
        />
      )}

      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        paddingTop: 'calc(12px + env(safe-area-inset-top, 0px))',
      }}>
        <button
          onClick={() => navigate('/live')}
          style={{
            width: 44, height: 44, borderRadius: 14,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'grid', placeItems: 'center',
            cursor: 'pointer',
            color: '#fff',
          }}
        >
          <ArrowLeft size={20} />
        </button>

        <button
          onClick={handleFullscreen}
          style={{
            width: 44, height: 44, borderRadius: 14,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'grid', placeItems: 'center',
            cursor: 'pointer',
            color: '#fff',
          }}
        >
          {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>
      </div>

      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: 280,
        zIndex: 25,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '80px 12px 20px',
        pointerEvents: 'none',
      }}>
        <div style={{ pointerEvents: 'auto', flex: 1 }} />
        <LiveChat
          mode={fullMode}
          accent={config.accent}
          inputStyle={config.inputStyle}
        />
      </div>
    </div>
  )
}
