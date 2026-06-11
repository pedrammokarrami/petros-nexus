import { motion } from 'framer-motion'
import { Play, Music, Star } from 'lucide-react'
import Badge from './Badge'
import usePlayerStore from '../../store/usePlayerStore'

export default function MediaCard({ item, size = 'md', showProgress = false }) {
  const play = usePlayerStore((s) => s.play)

  const isSound = item.type === 'music' || item.type === 'podcast'
  const dimensions = {
    sm: { width: 120, height: isSound ? 120 : 68 },
    md: { width: 160, height: isSound ? 160 : 90 },
    lg: { width: 200, height: isSound ? 200 : 113 }
  }

  const dim = dimensions[size]
  const thumb = item.cover || item.thumbnail

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => play(item)}
      style={{
        width: dim.width,
        flexShrink: 0,
        cursor: 'pointer',
        borderRadius: 16,
        overflow: 'hidden',
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        willChange: 'transform'
      }}
    >
      <div style={{ position: 'relative', width: dim.width, height: dim.height }}>
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
            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            gap: 4
          }}
        >
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
              background: 'rgba(255,255,255,0.1)'
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
            bottom: 8,
            left: 8,
            right: 8
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              marginBottom: 2
            }}
          >
            {isSound && <Music size={10} color="var(--accent-sound)" />}
            <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>
              {item.genre}
            </span>
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {item.title || item.show}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
