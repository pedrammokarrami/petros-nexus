import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Play, Plus, Check, Star, ChevronRight } from 'lucide-react'
import Badge from './Badge'
import usePlayerStore from '../../store/usePlayerStore'
import { searchTracks } from '../../services/jamendo'

export default function HeroCarousel({ items = [] }) {
  const { t } = useTranslation()
  const storePlay = usePlayerStore((s) => s.play)
  const [current, setCurrent] = useState(0)
  const [savedItems, setSavedItems] = useState(new Set())
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)

  const filtered = items.filter((i) => i.type !== 'music')

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % filtered.length)
  }, [filtered.length])

  useEffect(() => {
    if (filtered.length < 2 || paused) return
    timerRef.current = setInterval(next, 6000)
    return () => clearInterval(timerRef.current)
  }, [filtered.length, paused, next])

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

  if (filtered.length === 0) return null

  const item = filtered[current]
  const isSaved = savedItems.has(item.id)

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: 'var(--hero-height)',
        minHeight: 'var(--hero-min-height)',
        overflow: 'hidden',
        marginBottom: 'var(--section-gap)'
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${item.backdrop || item.thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%'
          }}
        />
      </AnimatePresence>

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(8,8,16,0.92) 0%, rgba(8,8,16,0.6) 35%, transparent 60%)'
      }} />

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(8,8,16,1) 0%, transparent 50%)'
      }} />

      <AnimatePresence mode="wait">
        <motion.div
          key={item.id + '-content'}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            position: 'absolute',
            bottom: '18%',
            left: 40,
            right: '40%',
            zIndex: 2
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
            {item.quality && <Badge variant="hd">{item.quality}</Badge>}
            <Badge variant="default" style={{ background: 'rgba(255,255,255,0.1)' }}>{item.genre}</Badge>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Star size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
              <span style={{ fontSize: 14, fontWeight: 700 }}>{item.rating}</span>
            </div>
          </div>

          <h1 style={{
            fontSize: 42, fontWeight: 900,
            lineHeight: 1.1, marginBottom: 10,
            letterSpacing: '-0.02em',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)'
          }}>
            {item.title_fa || item.title}
          </h1>

          <p style={{
            fontSize: 14, lineHeight: 1.5,
            color: 'var(--text-muted)',
            marginBottom: 20,
            maxWidth: 520,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {item.description_fa || ''}
          </p>

          <div style={{ display: 'flex', gap: 12 }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => play(item)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '14px 32px', borderRadius: 30,
                background: 'var(--accent-gradient)',
                color: '#fff', fontWeight: 700, fontSize: 15,
                border: 'none', cursor: 'pointer',
                boxShadow: '0 6px 24px rgba(0,0,0,0.4)'
              }}
            >
              <Play size={20} fill="#fff" />
              {t('hero.play')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                const next = new Set(savedItems)
                if (isSaved) next.delete(item.id)
                else next.add(item.id)
                setSavedItems(next)
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '14px 24px', borderRadius: 30,
                background: isSaved ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.08)',
                color: '#fff', fontWeight: 600, fontSize: 14,
                border: isSaved ? 'none' : '1px solid rgba(255,255,255,0.15)',
                cursor: 'pointer', backdropFilter: 'blur(10px)'
              }}
            >
              {isSaved ? <Check size={18} /> : <Plus size={18} />}
              {isSaved ? t('hero.added') : t('hero.add')}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      <div style={{
        position: 'absolute', bottom: 20, left: 40, right: 0,
        display: 'flex', alignItems: 'center', gap: 6, zIndex: 2
      }}>
        {filtered.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              height: 3,
              width: i === current ? 32 : 16,
              borderRadius: 2,
              background: i === current ? 'var(--accent-primary)' : 'rgba(255,255,255,0.25)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              padding: 0
            }}
          />
        ))}
      </div>

      {filtered.length > 1 && (
        <motion.button
          whileHover={{ x: 3 }}
          onClick={next}
          style={{
            position: 'absolute', right: 20, top: '50%',
            transform: 'translateY(-50%)',
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'grid', placeItems: 'center',
            cursor: 'pointer', backdropFilter: 'blur(10px)',
            zIndex: 3
          }}
        >
          <ChevronRight size={22} color="#fff" />
        </motion.button>
      )}
    </div>
  )
}
