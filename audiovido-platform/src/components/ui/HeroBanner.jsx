import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Play, Plus, Check, Star } from 'lucide-react'
import Badge from './Badge'
import usePlayerStore from '../../store/usePlayerStore'
import { searchTracks } from '../../services/jamendo'

export default function HeroBanner({ items = [] }) {
  const { t } = useTranslation()
  const [current, setCurrent] = useState(0)
  const [savedItems, setSavedItems] = useState(new Set())
  const storePlay = usePlayerStore((s) => s.play)

  const play = async (item) => {
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
  const item = items[current]
  const isSaved = savedItems.has(item?.id)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % items.length)
  }, [items.length])

  useEffect(() => {
    if (items.length < 2) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [items.length, next])

  if (!item) return null

  return (
    <div style={{ marginBottom: 28 }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 280,
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={item.id}
            src={item.thumbnail}
            alt=""
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </AnimatePresence>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(8,8,16,0.95) 0%, rgba(8,8,16,0.3) 50%, transparent 80%)'
          }}
        />

        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 20,
            background: 'var(--glass-bg)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            borderTop: '1px solid var(--glass-border)',
            borderBottomLeftRadius: 'var(--radius-xl)',
            borderBottomRightRadius: 'var(--radius-xl)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Badge variant={item.quality ? 'hd' : 'new'}>
              {item.quality || t('mediaCard.new')}
            </Badge>
            <Badge variant="default" style={{ background: 'rgba(0,0,0,0.4)' }}>
              {item.genre}
            </Badge>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Star size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
              <span style={{ fontSize: 13, fontWeight: 600 }}>{item.rating}</span>
            </div>
          </div>

          <h1
            style={{
              fontSize: 26,
              fontWeight: 800,
              marginBottom: 4,
              lineHeight: 1.2
            }}
          >
            {item.title_fa || item.title}
          </h1>

          <p
            style={{
              fontSize: 13,
              color: 'var(--text-muted)',
              marginBottom: 14,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {item.description_fa || ''}
          </p>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => play(item)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                borderRadius: 30,
                background: 'var(--accent-gradient)',
                color: '#fff',
                fontWeight: 600,
                fontSize: 14,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Play size={18} fill="#fff" />
              {t('hero.play')}
            </button>
            <button
              onClick={() => {
                const next = new Set(savedItems)
                if (isSaved) next.delete(item.id)
                else next.add(item.id)
                setSavedItems(next)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '12px 20px',
                borderRadius: 30,
                background: isSaved ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.1)',
                color: '#fff',
                fontWeight: 500,
                fontSize: 14,
                border: isSaved ? 'none' : '1px solid var(--glass-border)',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)'
              }}
            >
              {isSaved ? <Check size={18} /> : <Plus size={18} />}
              {isSaved ? t('hero.added') : t('hero.add')}
            </button>
          </div>
        </motion.div>

        {items.length > 1 && (
          <div
            style={{
              position: 'absolute',
              top: 16,
              left: 16,
              display: 'flex',
              gap: 6
            }}
          >
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === current ? 'var(--accent-primary)' : 'rgba(255,255,255,0.3)',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
