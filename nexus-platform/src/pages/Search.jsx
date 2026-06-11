import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Search as SearchIcon, X, Music, Film } from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import MediaCard from '../components/ui/MediaCard'
import Badge from '../components/ui/Badge'
import usePlayerStore from '../store/usePlayerStore'
import { searchMedia } from '../data/mockData'

const moods = [
  { emoji: '😴', label: 'آرامش' },
  { emoji: '🔥', label: 'انرژی' },
  { emoji: '😢', label: 'احساسی' },
  { emoji: '🎉', label: 'شاد' },
  { emoji: '🤔', label: 'تمرکز' }
]

const genreGrid = [
  { label: 'پاپ', gradient: 'linear-gradient(135deg, #A78BFA, #7C3AED)' },
  { label: 'راک', gradient: 'linear-gradient(135deg, #F43F5E, #E11D48)' },
  { label: 'هیپ‌هاپ', gradient: 'linear-gradient(135deg, #FBBF24, #F59E0B)' },
  { label: 'الکترونیک', gradient: 'linear-gradient(135deg, #38BDF8, #0EA5E9)' },
  { label: 'کلاسیک', gradient: 'linear-gradient(135deg, #10B981, #059669)' },
  { label: 'جاز', gradient: 'linear-gradient(135deg, #F97316, #EA580C)' },
  { label: 'پادکست', gradient: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' },
  { label: 'کتاب صوتی', gradient: 'linear-gradient(135deg, #EC4899, #DB2777)' }
]

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const play = usePlayerStore((s) => s.play)

  const handleSearch = useCallback((q) => {
    setQuery(q)
    if (q.trim().length > 0) {
      const res = searchMedia(q)
      setResults(res)
    } else {
      setResults([])
    }
  }, [])

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }

  return (
    <motion.div
      className="page"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 20,
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          border: '1px solid var(--glass-border)',
          borderRadius: 20,
          padding: '4px 16px',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}
      >
        <SearchIcon size={20} color="var(--text-muted)" />
        <input
          placeholder="جستجوی موسیقی، فیلم، پادکست..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          style={{
            flex: 1,
            padding: '14px 8px',
            fontSize: 15,
            background: 'transparent',
            color: 'var(--text-primary)',
            border: 'none',
            outline: 'none',
            direction: 'rtl'
          }}
        />
        {query && (
          <button onClick={() => handleSearch('')} style={{ width: 36, height: 36, display: 'grid', placeItems: 'center' }}>
            <X size={18} color="var(--text-muted)" />
          </button>
        )}
      </div>

      {!query && (
        <>
          <div
            style={{
              display: 'flex',
              gap: 10,
              overflowX: 'auto',
              marginBottom: 24,
              paddingBottom: 4,
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {moods.map((mood) => (
              <button
                key={mood.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '10px 18px',
                  borderRadius: 20,
                  background: 'var(--glass-bg)',
                  backdropFilter: 'var(--glass-blur)',
                  WebkitBackdropFilter: 'var(--glass-blur)',
                  border: '1px solid var(--glass-border)',
                  fontSize: 14,
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  color: 'var(--text-muted)'
                }}
              >
                <span style={{ fontSize: 18 }}>{mood.emoji}</span>
                {mood.label}
              </button>
            ))}
          </div>

          <h2
            style={{
              fontSize: 16,
              fontWeight: 600,
              marginBottom: 14,
              color: 'var(--text-muted)'
            }}
          >
            مرور بر اساس ژانر
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
              marginBottom: 24
            }}
          >
            {genreGrid.map((genre) => (
              <GlassCard
                key={genre.label}
                padding={0}
                style={{
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none'
                }}
              >
                <div
                  style={{
                    padding: '28px 16px',
                    background: genre.gradient,
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>
                    {genre.label}
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>
        </>
      )}

      {query && results.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {results.slice(0, 20).map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => play(item)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: 12,
                borderRadius: 16,
                background: 'var(--glass-bg)',
                backdropFilter: 'var(--glass-blur)',
                WebkitBackdropFilter: 'var(--glass-blur)',
                border: '1px solid var(--glass-border)',
                cursor: 'pointer'
              }}
            >
              <img
                src={item.cover || item.thumbnail}
                alt=""
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
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
                  {item.title || item.show}
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
                  {item.artist || item.host || item.genre}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {item.type === 'music' ? (
                  <Music size={14} color="var(--accent-sound)" />
                ) : (
                  <Film size={14} color="var(--accent-vision)" />
                )}
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                  {item.type === 'music' ? 'موسیقی' :
                   item.type === 'movie' ? 'فیلم' :
                   item.type === 'podcast' ? 'پادکست' : 'سریال'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 20px',
            gap: 12
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              display: 'grid',
              placeItems: 'center'
            }}
          >
            <SearchIcon size={28} color="var(--text-muted)" />
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
            نتیجه‌ای برای "{query}" یافت نشد
          </p>
        </div>
      )}
    </motion.div>
  )
}
