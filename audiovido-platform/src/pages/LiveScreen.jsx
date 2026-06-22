import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Maximize2, Minimize2, ArrowLeft, Play, Pause } from 'lucide-react'
import LiveChat from '../components/live/LiveChat'
import VisualFX from '../components/live/VisualFX'
import AudioEngine from '../components/live/AudioEngine'
const modeConfig = {
  'cinema-modern': {
    bg: '/images/live/cinema-modern.png',
    theme: 'modern',
    type: 'cinema',
    accent: '#60a5fa',
    frame: { top: '28%', left: '8%', width: '84%', height: '37%' },
    inputStyle: {
      background: 'rgba(96, 165, 250, 0.15)',
      borderColor: 'rgba(96, 165, 250, 0.3)',
    },
  },
  'cinema-negative': {
    bg: '/images/live/cinema-negative.png',
    theme: 'negative',
    type: 'cinema',
    accent: '#a78b5a',
    frame: { top: '32%', left: '9%', width: '83%', height: '32%' },
    inputStyle: {
      background: 'rgba(167, 139, 90, 0.15)',
      borderColor: 'rgba(167, 139, 90, 0.3)',
    },
  },
  'cinema-tv': {
    bg: '/images/live/cinema-tv.png',
    theme: 'tv',
    type: 'cinema',
    accent: '#38bdf8',
    frame: { top: '21%', left: '16%', width: '68%', height: '45%' },
    inputStyle: {
      background: 'rgba(56, 189, 248, 0.1)',
      borderColor: 'rgba(56, 189, 248, 0.25)',
    },
  },
  'music-bar': {
    bg: '/images/live/music-bar.png',
    theme: 'bar',
    type: 'music',
    accent: '#f59e0b',
    inputStyle: {
      background: 'rgba(245, 158, 11, 0.12)',
      borderColor: 'rgba(245, 158, 11, 0.3)',
    },
  },
  'music-club': {
    bg: '/images/live/music-club.png',
    theme: 'club',
    type: 'music',
    accent: '#a855f7',
    inputStyle: {
      background: 'rgba(168, 85, 247, 0.15)',
      borderColor: 'rgba(168, 85, 247, 0.3)',
    },
  },
  'music-concert': {
    bg: '/images/live/music-concert.png',
    theme: 'concert',
    type: 'music',
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
  const isCinema = config?.type === 'cinema'
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [audioContext, setAudioContext] = useState(null)
  const [beatData, setBeatData] = useState({ beat: false, amplitude: 0 })
  const [isMediaPlaying, setIsMediaPlaying] = useState(false)
  const screenRef = useRef(null)
  const videoRef = useRef(null)
  const audioRef = useRef(null)
  const mediaRef = useRef(null)

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

      {isCinema && (
        <div style={{
          position: 'fixed',
          top: config.frame.top,
          left: config.frame.left,
          width: config.frame.width,
          height: config.frame.height,
          zIndex: 5,
          borderRadius: isCinema && config.theme === 'tv' ? '8px' : '2px',
          overflow: 'hidden',
        }}>
          <video
            ref={videoRef}
            src="/videos/sample.mp4"
            muted
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onClick={toggleMedia}
          />
          {!isFullscreen && !isMediaPlaying && (
            <div
              onClick={toggleMedia}
              style={{
                position: 'absolute', inset: 0,
                display: 'grid', placeItems: 'center',
                background: 'rgba(0,0,0,0.4)',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                display: 'grid', placeItems: 'center',
              }}>
                <Play size={22} fill="#fff" color="#fff" />
              </div>
            </div>
          )}
        </div>
      )}

      <audio
        ref={audioRef}
        src="/audio/sample.mp3"
        loop
        playsInline
        style={{ display: 'none' }}
      />

      {!isFullscreen && <VisualFX theme={config.theme} beatData={beatData} />}

      {!isFullscreen && audioContext && audioRef.current && (
        <AudioEngine
          key={fullMode}
          audioContext={audioContext}
          theme={config.theme}
          onBeat={handleBeat}
          mediaElement={audioRef.current}
        />
      )}

      {!isFullscreen && !isCinema && !isMediaPlaying && (
        <div
          onClick={toggleMedia}
          style={{
            position: 'fixed', inset: 0, zIndex: 12,
            display: 'grid', placeItems: 'center',
            cursor: 'pointer',
            background: 'rgba(0,0,0,0.1)',
          }}
        >
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

      {!isFullscreen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
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
              cursor: 'pointer', color: '#fff',
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
              cursor: 'pointer', color: '#fff',
            }}
          >
            <Maximize2 size={20} />
          </button>
        </div>
      )}

      {!isFullscreen && (
        <div style={{
          position: 'fixed',
          top: 0, right: 0, bottom: 0,
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
      )}
    </div>
  )
}
