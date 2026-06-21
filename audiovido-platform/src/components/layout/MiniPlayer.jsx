import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import usePlayerStore from '../../store/usePlayerStore'

export default function MiniPlayer() {
  const { currentMedia, isPlaying, togglePlay, openPlayer, prevTrack, nextTrack } = usePlayerStore()

  return (
    <AnimatePresence>
      {currentMedia && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={openPlayer}
          style={{
            position: 'fixed',
            bottom: 'calc(var(--bottomnav-height) + var(--safe-bottom))',
            left: 12,
            right: 12,
            height: 72,
            zIndex: 99,
            cursor: 'pointer',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            border: '1px solid var(--glass-border)',
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: 12
          }}
        >
          <img
            src={currentMedia.cover || currentMedia.thumbnail}
            alt=""
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              objectFit: 'cover',
              flexShrink: 0
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {currentMedia.title || currentMedia.show}
            </div>
            <div
              style={{
                fontSize: 12,
                color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {currentMedia.artist || currentMedia.host || ''}
            </div>
          </div>

          <div
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => { e.stopPropagation(); prevTrack() }}
              style={{ width: 40, height: 40, display: 'grid', placeItems: 'center' }}
            >
              <SkipBack size={18} color="var(--text-muted)" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); togglePlay() }}
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'var(--accent-gradient)',
                display: 'grid',
                placeItems: 'center'
              }}
            >
              {isPlaying ? <Pause size={20} fill="#fff" /> : <Play size={20} fill="#fff" />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextTrack() }}
              style={{ width: 40, height: 40, display: 'grid', placeItems: 'center' }}
            >
              <SkipForward size={18} color="var(--text-muted)" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
