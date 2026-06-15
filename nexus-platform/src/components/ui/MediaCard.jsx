import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Play, Music, Star, Film } from 'lucide-react'
import Badge from './Badge'
import usePlayerStore from '../../store/usePlayerStore'
import { searchTracks } from '../../services/jamendo'

export default function MediaCard({ item, size = 'md', showProgress = false, onClick }) {
  const { t } = useTranslation()
  const storePlay = usePlayerStore((s) => s.play)

  const handlePlay = async () => {
    if (onClick) {
      onClick()
      return
    }
    if (item.source === 'jamendo' || item.source === 'pexels' || item.type === 'movie' || item.type === 'series') {
      storePlay(item)
      return
    }
    const nameQuery = `${item.title || item.show || ''} ${item.artist || item.host || ''}`.trim()
    const genreQuery = item.genre || 'pop'
    const queries = [nameQuery, genreQuery, 'pop instrumental']
    for (let i = 0; i < queries.length; i++) {
      try {
        const tracks = await searchTracks(queries[i], 1)
        if (tracks.length > 0) {
          storePlay(tracks[0])
          return
        }
      } catch {}
    }
    storePlay(item)
  }

  const isSound = item.type === 'music' || item.type === 'podcast'
  const isVision = item.type === 'movie' || item.type === 'series' || item.type === 'anime'

  const sizeMap = {
    sm: { w: 140, h: isSound ? 160 : 200 },
    md: { w: 180, h: isSound ? 200 : 260 },
    lg: { w: 220, h: isSound ? 240 : 320 }
  }

  const dim = sizeMap[size]
  const thumb = item.cover || item.thumbnail

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.06,
        transition: { type: 'spring', stiffness: 350, damping: 18 }
      }}
      whileTap={{ scale: 0.96 }}
      onClick={handlePlay}
      style={{
        width: dim.w,
        flexShrink: 0,
        cursor: 'pointer',
        borderRadius: 'var(--card-radius)',
        overflow: 'hidden',
        position: 'relative',
        background: 'var(--glass-bg)',
        willChange: 'transform'
      }}
    >
      <motion.div
        whileHover={{
          boxShadow: '0 12px 40px rgba(0,0,0,0.6), 0 0 20px rgba(56, 189, 248, 0.15)',
          transition: { duration: 0.25 }
        }}
        style={{
          width: dim.w,
          height: dim.h,
          borderRadius: 'var(--card-radius)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <img
          src={thumb}
          alt={item.title || item.show}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 35%, transparent 60%)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            gap: 4,
            zIndex: 2
          }}
        >
          {item.source === 'pexels' && <Badge variant="default" style={{ background: 'rgba(0,0,0,0.6)' }}>{t('mediaCard.sample')}</Badge>}
          {item.quality && <Badge variant="hd">{item.quality}</Badge>}
          {item.rating && (
            <Badge variant="default" style={{ background: 'rgba(0,0,0,0.6)' }}>
              <Star size={10} fill="var(--accent-gold)" color="var(--accent-gold)" />
              {item.rating}
            </Badge>
          )}
        </div>
        {item.progress !== undefined && showProgress && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              background: 'rgba(255,255,255,0.1)',
              zIndex: 2
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${item.progress * 100}%`,
                background: 'var(--accent-gradient)',
                borderRadius: '0 2px 2px 0'
              }}
            />
          </div>
        )}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '10px 10px 12px',
            zIndex: 2
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              marginBottom: 3
            }}
          >
            {isSound && <Music size={10} color="var(--accent-sound)" />}
            {isVision && <Film size={10} color="var(--accent-vision)" />}
            <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>
              {item.genre}
            </span>
          </div>
          <div
            style={{
              fontSize: isVision ? 13 : 12,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {item.title || item.show}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
