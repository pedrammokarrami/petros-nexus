import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat,
  ChevronDown, Heart, ListMusic, Mic2, Music
} from 'lucide-react'
import usePlayerStore from '../../store/usePlayerStore'
import { mockMusic } from '../../data/mockData'

export default function AudioPlayer() {
  const { t } = useTranslation()
  const {
    currentMedia, isPlaying, progress, closePlayer,
    togglePlay, prevTrack, nextTrack, setProgress, queue
  } = usePlayerStore()

  const spinControls = useAnimation()

  const [showLyrics, setShowLyrics] = useState(false)
  const [showQueue, setShowQueue] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [isRepeating, setIsRepeating] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.load()
    if (isPlaying) {
      audio.play().catch(() => {})
    }
  }, [currentMedia])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (isPlaying) {
      spinControls.start({
        rotate: 360,
        transition: { duration: 8, repeat: Infinity, ease: 'linear' }
      })
    } else {
      spinControls.stop()
    }
  }, [isPlaying, spinControls])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = audioRef.current.currentTime / audioRef.current.duration
      setProgress(isNaN(p) ? 0 : p)
    }
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const pct = x / rect.width
    if (audioRef.current) {
      audioRef.current.currentTime = pct * audioRef.current.duration
    }
    setProgress(pct)
  }

  const formatTime = (s) => {
    if (!s) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const duration = audioRef.current?.duration || currentMedia?.duration || 0

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'var(--bg-primary)',
        overflow: 'hidden'
      }}
    >
      {currentMedia?.cover && (
        <img
          src={currentMedia.cover}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(60px) saturate(150%)',
            opacity: 0.4
          }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
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
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            {t('player.nowPlaying')}
          </span>
          <button onClick={() => setIsLiked(!isLiked)} style={{ width: 44, height: 44, display: 'grid', placeItems: 'center' }}>
            <Heart size={20} color={isLiked ? 'var(--accent-primary)' : 'var(--text-muted)'} fill={isLiked ? 'var(--accent-primary)' : 'transparent'} />
          </button>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px' }}>
          <motion.div
            animate={spinControls}
            style={{
              width: 260,
              height: 260,
              borderRadius: 20,
              overflow: 'hidden',
              marginBottom: 40,
              border: '1px solid var(--glass-border)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              willChange: 'transform'
            }}
          >
            <img
              src={currentMedia?.cover}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </motion.div>

          <div style={{ textAlign: 'center', marginBottom: 32, width: '100%' }}>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 6,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {currentMedia?.title || currentMedia?.show}
            </h1>
            <p style={{ fontSize: 15, color: 'var(--text-muted)' }}>
              {currentMedia?.artist || currentMedia?.host}
            </p>
          </div>

          <div style={{ width: '100%', marginBottom: 24 }}>
            <div
              onClick={handleSeek}
              style={{
                width: '100%',
                height: 4,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 2,
                cursor: 'pointer',
                position: 'relative',
                marginBottom: 8
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress * 100}%`,
                  background: 'var(--accent-gradient)',
                  borderRadius: 2,
                  transition: 'width 0.3s linear',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    right: -6,
                    top: -4,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: 'var(--accent-primary)'
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {formatTime(progress * duration)}
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {formatTime(duration * (1 - progress))}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <button onClick={() => setIsShuffled(!isShuffled)} style={{ width: 44, height: 44, display: 'grid', placeItems: 'center' }}>
              <Shuffle size={18} color={isShuffled ? 'var(--accent-primary)' : 'var(--text-muted)'} />
            </button>
            <button onClick={prevTrack} style={{ width: 44, height: 44, display: 'grid', placeItems: 'center' }}>
              <SkipBack size={22} />
            </button>
            <button
              onClick={togglePlay}
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'var(--accent-gradient)',
                display: 'grid',
                placeItems: 'center',
                boxShadow: '0 8px 32px rgba(167, 139, 250, 0.3)'
              }}
            >
              {isPlaying ? <Pause size={28} fill="#fff" /> : <Play size={28} fill="#fff" />}
            </button>
            <button onClick={nextTrack} style={{ width: 44, height: 44, display: 'grid', placeItems: 'center' }}>
              <SkipForward size={22} />
            </button>
            <button onClick={() => setIsRepeating(!isRepeating)} style={{ width: 44, height: 44, display: 'grid', placeItems: 'center' }}>
              <Repeat size={18} color={isRepeating ? 'var(--accent-primary)' : 'var(--text-muted)'} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {(showLyrics || showQueue) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                overflow: 'hidden',
                borderTop: '1px solid var(--glass-border)',
                background: 'rgba(0,0,0,0.3)'
              }}
            >
              {showQueue && (
                <div style={{ maxHeight: 240, overflowY: 'auto', padding: '12px 16px' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 10 }}>
                    {t('player.queueCount', { count: queue.length + mockMusic.length })}
                  </div>
                  {[...queue, ...mockMusic].slice(0, 20).map((item, i) => {
                    const isCurrent = i === 0 && queue.length === 0
                    return (
                      <div
                        key={item.id || i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '8px 8px',
                          borderRadius: 10,
                          background: isCurrent ? 'rgba(167,139,250,0.15)' : 'transparent',
                          marginBottom: 4
                        }}
                      >
                        <div style={{ width: 36, height: 36, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                          <img src={item.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: isCurrent ? 600 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {isCurrent && '▶ '}{item.title || item.show}
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.artist || item.host}
                          </div>
                        </div>
                        <Music size={14} color="var(--text-muted)" />
                      </div>
                    )
                  })}
                </div>
              )}
              {showLyrics && !showQueue && (
                <div style={{ maxHeight: 240, overflowY: 'auto', padding: '16px 20px', direction: 'rtl', textAlign: 'center' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 10, textAlign: 'center' }}>
                    {t('player.lyrics')}
                  </div>
                  {[
                    'دلم گرفته از این شب‌های بی‌پایان',
                    'دلم هوای تو را کرده هوای باران',
                    'کجایی ای که صدایت',
                    'همیشه با من باشد',
                    'در این شب‌های سرد و بی‌کسی',
                    'تو تنها دلخوشی منی',
                    '',
                    'دلم گرفته از این شب‌های بی‌پایان',
                    'دلم هوای تو را کرده هوای باران',
                    'بیا که بی‌تو هوایم',
                    'گرفته است و دلم تنگ',
                    'برای لحظه‌های با تو بودن',
                    'در این شب‌های بی‌پایان'
                  ].map((line, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: 14,
                        lineHeight: 2,
                        color: line ? 'var(--text-primary)' : 'transparent',
                        opacity: 0.85
                      }}
                    >
                      {line || '‌'}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '16px 20px',
            paddingBottom: 'calc(16px + var(--safe-bottom))',
            borderTop: '1px solid var(--glass-border)',
            background: 'var(--glass-bg)'
          }}
        >
          <button
            onClick={() => setShowLyrics(!showLyrics)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px 16px' }}
          >
            <Mic2 size={18} color={showLyrics ? 'var(--accent-primary)' : 'var(--text-muted)'} />
            <span style={{ fontSize: 10, color: showLyrics ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
              {t('player.tabLyrics')}
            </span>
          </button>
          <button
            onClick={() => setShowQueue(!showQueue)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px 16px' }}
          >
            <ListMusic size={18} color={showQueue ? 'var(--accent-primary)' : 'var(--text-muted)'} />
            <span style={{ fontSize: 10, color: showQueue ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
              {t('player.tabQueue')}
            </span>
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentMedia?.file_url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
        preload="metadata"
      />
    </motion.div>
  )
}
