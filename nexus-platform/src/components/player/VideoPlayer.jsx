import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, Pause, Maximize, Minimize, Volume2, VolumeX,
  ChevronDown, Subtitles, Settings, PictureInPicture2
} from 'lucide-react'
import usePlayerStore from '../../store/usePlayerStore'

export default function VideoPlayer() {
  const { currentMedia, isPlaying, progress, closePlayer, togglePlay, setProgress } = usePlayerStore()
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [quality, setQuality] = useState('Auto')
  const [showQuality, setShowQuality] = useState(false)
  const controlsTimer = useRef(null)
  const videoRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying, currentMedia])

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = videoRef.current.currentTime / (videoRef.current.duration || 1)
      setProgress(isNaN(p) ? 0 : p)
    }
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const pct = x / rect.width
    if (videoRef.current) {
      videoRef.current.currentTime = pct * (videoRef.current.duration || 1)
    }
    setProgress(pct)
  }

  const startControlsTimer = useCallback(() => {
    setShowControls(true)
    if (controlsTimer.current) clearTimeout(controlsTimer.current)
    controlsTimer.current = setTimeout(() => setShowControls(false), 3000)
  }, [])

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      await document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const formatTime = (s) => {
    if (!s || !isFinite(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const duration = videoRef.current?.duration || 0
  const currentTime = videoRef.current?.currentTime || 0

  const qualities = ['Auto', '4K', '1080p', '720p', '480p']

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      ref={containerRef}
      onClick={startControlsTimer}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: '#000',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div
        style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000'
        }}
      >
        <video
          ref={videoRef}
          src={currentMedia?.file_url}
          onTimeUpdate={handleTimeUpdate}
          onEnded={closePlayer}
          onError={(e) => console.log('Video error:', e)}
          preload="metadata"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
          playsInline
        />

        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.4) 100%)'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  paddingTop: 'calc(16px + var(--safe-top))'
                }}
              >
                <button onClick={closePlayer} style={{ width: 44, height: 44, display: 'grid', placeItems: 'center' }}>
                  <ChevronDown size={24} />
                </button>
                <span style={{ fontSize: 14, fontWeight: 600 }}>
                  {currentMedia?.title || ''}
                </span>
                <div style={{ width: 44 }} />
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '20px',
                  paddingBottom: 'calc(20px + var(--safe-bottom))'
                }}
              >
                <div
                  onClick={handleSeek}
                  style={{
                    width: '100%',
                    height: 4,
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: 2,
                    cursor: 'pointer',
                    marginBottom: 12,
                    position: 'relative'
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${progress * 100}%`,
                      background: 'var(--accent-primary)',
                      borderRadius: 2,
                      position: 'relative'
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        right: -5,
                        top: -3,
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: 'var(--accent-primary)'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 16 }}>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    style={{ width: 44, height: 44, display: 'grid', placeItems: 'center' }}
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>

                  <button style={{ width: 48, height: 48, display: 'grid', placeItems: 'center' }}>
                    <SkipBack size={24} />
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); togglePlay() }}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.2)',
                      display: 'grid',
                      placeItems: 'center',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    {isPlaying ? <Pause size={28} fill="#fff" /> : <Play size={28} fill="#fff" />}
                  </button>

                  <button style={{ width: 48, height: 48, display: 'grid', placeItems: 'center' }}>
                    <SkipForward size={24} />
                  </button>

                  <button style={{ width: 44, height: 44, display: 'grid', placeItems: 'center' }}>
                    <Subtitles size={20} />
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                  <button
                    onClick={() => setShowQuality(!showQuality)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 20,
                      background: 'rgba(255,255,255,0.1)',
                      fontSize: 12,
                      fontWeight: 500,
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <Settings size={14} />
                    {quality}
                  </button>
                  <button
                    onClick={toggleFullscreen}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 20,
                      background: 'rgba(255,255,255,0.1)',
                      fontSize: 12,
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
                  </button>
                  <button
                    style={{
                      padding: '8px 16px',
                      borderRadius: 20,
                      background: 'rgba(255,255,255,0.1)',
                      fontSize: 12,
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <PictureInPicture2 size={14} />
                  </button>
                </div>

                <AnimatePresence>
                  {showQuality && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 8,
                        marginTop: 12
                      }}
                    >
                      {qualities.map((q) => (
                        <button
                          key={q}
                          onClick={() => { setQuality(q); setShowQuality(false) }}
                          style={{
                            padding: '6px 14px',
                            borderRadius: 14,
                            background: q === quality ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)',
                            fontSize: 11,
                            fontWeight: 600
                          }}
                        >
                          {q}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          onClick={(e) => { e.stopPropagation(); togglePlay() }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'all',
            opacity: isPlaying ? 0 : 1,
            transition: 'opacity 0.2s'
          }}
        >
          {!isPlaying && (
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.6)',
                display: 'grid',
                placeItems: 'center',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Play size={36} fill="#fff" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
