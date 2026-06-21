import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { X, Star, Play, Clock, User, ExternalLink, Download, Monitor, Volume2, VolumeX } from 'lucide-react'
import { getTitleDetail } from '../../services/imdbapi'

const backdropVar = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const modalVar = {
  hidden: { opacity: 0, scale: 0.85, y: 60 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 250, damping: 26 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.15 } }
}

const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
}

function formatRuntime(sec) {
  if (!sec) return null
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

function ActionButtons({ title, year, t }) {
  const trailerQuery = encodeURIComponent(`${title} ${year || ''} official trailer`)
  const trailerHref = `https://www.youtube.com/results?search_query=${trailerQuery}`

  const [tooltipVisible, setTooltipVisible] = useState(null)

  const DisabledButton = ({ icon: Icon, label, tooltip }) => (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        disabled
        onMouseEnter={() => setTooltipVisible(label)}
        onMouseLeave={() => setTooltipVisible(null)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '10px 22px', borderRadius: 28,
          background: 'rgba(255,255,255,0.05)',
          color: 'rgba(255,255,255,0.35)',
          fontSize: 13, fontWeight: 600,
          border: '1px solid rgba(255,255,255,0.06)',
          cursor: 'not-allowed',
          opacity: 0.4
        }}
      >
        <Icon size={16} />
        {label}
      </button>
      {tooltipVisible === label && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.9)', color: '#fff',
          padding: '6px 14px', borderRadius: 8,
          fontSize: 12, fontWeight: 500,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 30
        }}>
          {t('modal.notAvailable')}
          <div style={{
            position: 'absolute', top: '100%', left: '50%',
            transform: 'translateX(-50%)',
            border: '6px solid transparent',
            borderTopColor: 'rgba(0,0,0,0.9)'
          }} />
        </div>
      )}
    </div>
  )

  return (
    <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
      <motion.a
        href={trailerHref}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '10px 22px', borderRadius: 28,
          background: 'var(--accent-gradient)',
          color: '#fff', fontSize: 13, fontWeight: 700,
          textDecoration: 'none',
          boxShadow: '0 4px 20px rgba(167, 139, 250, 0.35)',
          cursor: 'pointer'
        }}
      >
        <Play size={16} fill="#fff" />
        {t('modal.watchTrailer')}
        <ExternalLink size={12} />
      </motion.a>
      <DisabledButton icon={Download} label={t('modal.download')} tooltip={t('modal.download')} />
      <DisabledButton icon={Monitor} label={t('modal.streamOnline')} tooltip={t('modal.streamOnline')} />
      {/* TODO: enable when a licensed content backend is available */}
    </div>
  )
}

export default function MediaModal({ item, onClose }) {
  const { t } = useTranslation()
  const [enriched, setEnriched] = useState(null)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [trailerMuted, setTrailerMuted] = useState(true)
  const scrollRef = useRef(null)
  const data = enriched || item

  useEffect(() => {
    if (!item || !item.id || !item.id.startsWith('tt')) return
    setLoadingDetail(true)
    getTitleDetail(item.id)
      .then((detail) => {
        setEnriched({ ...detail, overview: item.overview || detail.overview })
      })
      .catch(() => {})
      .finally(() => setLoadingDetail(false))
  }, [item?.id])

  useEffect(() => {
    if (!item?.id) return
    setEnriched(null)
  }, [item?.id])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [item?.id])

  if (!item) return null

  const posterUrl = data.poster || ''
  const trailerKey = data.trailer
  const hasTrailerBg = !!trailerKey

  const cast = data.cast || []
  const directors = data.directors || []
  const genres = data.genres || []
  const rating = data.rating
  const year = data.year
  const title = data.title || ''
  const overview = data.overview || ''
  const metacritic = data.metacritic

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        variants={backdropVar}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(2px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 0
        }}
      >
        {hasTrailerBg ? (
          <>
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&playlist=${trailerKey}&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3`}
              style={{
                position: 'absolute', inset: 0,
                width: '100vw', height: '100vh',
                pointerEvents: 'none',
                border: 'none'
              }}
              allow="autoplay; encrypted-media"
              title="trailer-bg"
            />
            <div style={{
              position: 'absolute', top: 80, right: 24, zIndex: 25,
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'grid', placeItems: 'center',
              cursor: 'pointer', backdropFilter: 'blur(10px)'
            }}
              onClick={(e) => { e.stopPropagation(); setTrailerMuted(!trailerMuted) }}
            >
              {trailerMuted ? <VolumeX size={16} color="#fff" /> : <Volume2 size={16} color="#fff" />}
            </div>
          </>
        ) : (
          posterUrl && (
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${posterUrl})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              filter: 'blur(50px) saturate(1.4)',
              opacity: 0.5,
              transform: 'scale(1.1)'
            }} />
          )
        )}

        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.95) 100%)'
        }} />

        <motion.div
          key="modal"
          variants={modalVar}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: '90vw',
            maxWidth: 1000,
            height: '90dvh',
            maxHeight: 800,
            background: hasTrailerBg ? 'rgba(8,8,16,0.6)' : 'rgba(15,15,25,0.7)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 40px 120px rgba(0,0,0,0.7)',
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            style={{
              position: 'absolute', top: 16, right: 16, zIndex: 20,
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'grid', placeItems: 'center',
              cursor: 'pointer', backdropFilter: 'blur(10px)'
            }}
          >
            <X size={20} color="#fff" />
          </motion.button>

          <div ref={scrollRef} style={{
            flex: 1, overflowY: 'auto', padding: '40px 36px',
            display: 'flex', gap: 40,
            direction: 'ltr'
          }}>
            {posterUrl && (
              <div style={{ flexShrink: 0, width: 280 }}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.1 }}
                  style={{
                    width: '100%', aspectRatio: '2/3',
                    borderRadius: 16, overflow: 'hidden',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                    position: 'sticky', top: 0
                  }}
                >
                  <img src={posterUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </motion.div>
              </div>
            )}

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              style={{ flex: 1, minWidth: 0 }}
            >
              <motion.h1 variants={staggerItem} style={{
                fontSize: 32, fontWeight: 900, margin: 0,
                lineHeight: 1.15, letterSpacing: '-0.02em'
              }}>
                {title}
              </motion.h1>

              <motion.div variants={staggerItem} style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
                {year && (
                  <span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500 }}>{year}</span>
                )}
                {data.runtimeSeconds && (
                  <>
                    <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>•</span>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={13} />
                      {formatRuntime(data.runtimeSeconds)}
                    </span>
                  </>
                )}
              </motion.div>

              {genres.length > 0 && (
                <motion.div variants={staggerItem} style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                  {genres.map((g) => (
                    <motion.span
                      key={g}
                      variants={staggerItem}
                      style={{
                        padding: '5px 14px', borderRadius: 20,
                        fontSize: 12, fontWeight: 600,
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {g}
                    </motion.span>
                  ))}
                </motion.div>
              )}

              <motion.div variants={staggerItem} style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                {rating && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '6px 16px', borderRadius: 12,
                      background: 'rgba(255,215,0,0.1)',
                      border: '1px solid rgba(255,215,0,0.2)'
                    }}
                  >
                    <Star size={18} fill="var(--accent-gold)" color="var(--accent-gold)" />
                    <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent-gold)' }}>{rating}</span>
                  </motion.div>
                )}
                {metacritic && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '6px 14px', borderRadius: 12,
                      background: 'rgba(98,201,67,0.1)',
                      border: '1px solid rgba(98,201,67,0.2)'
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 800, color: '#62c943' }}>{metacritic.score}</span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>{t('modal.metacritic')}</span>
                  </motion.div>
                )}
              </motion.div>

              {overview && (
                <motion.p variants={staggerItem} style={{
                  fontSize: 14, lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  marginTop: 20, margin: 0,
                  maxWidth: 600
                }}>
                  {overview}
                </motion.p>
              )}

              {directors.length > 0 && (
                <motion.div variants={staggerItem} style={{ marginTop: 20 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {t('modal.directors')}
                  </span>
                  <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                    {directors.map((d) => (
                      <motion.div
                        key={d.id}
                        variants={staggerItem}
                        whileHover={{ scale: 1.06 }}
                        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                      >
                        {d.image ? (
                          <img src={d.image} alt={d.name} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--glass-bg)', display: 'grid', placeItems: 'center' }}>
                            <User size={14} color="var(--text-muted)" />
                          </div>
                        )}
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{d.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {cast.length > 0 && (
                <motion.div variants={staggerItem} style={{ marginTop: 24 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {t('modal.cast')}
                  </span>
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    style={{
                      display: 'flex', gap: 12, marginTop: 10,
                      overflowX: 'auto', paddingBottom: 8
                    }}
                  >
                    {cast.map((c) => (
                      <motion.div
                        key={c.id}
                        variants={staggerItem}
                        whileHover={{ scale: 1.08 }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0, width: 72 }}
                      >
                        {c.image ? (
                          <img src={c.image} alt={c.name} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.08)' }} />
                        ) : (
                          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--glass-bg)', border: '2px solid rgba(255,255,255,0.08)', display: 'grid', placeItems: 'center' }}>
                            <User size={22} color="var(--text-muted)" />
                          </div>
                        )}
                        <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.2, maxWidth: 72 }}>{c.name}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              <motion.div variants={staggerItem}>
                <ActionButtons title={title} year={year} t={t} />
              </motion.div>

              {loadingDetail && (
                <motion.div variants={staggerItem} style={{ marginTop: 16 }}>
                  <div className="skeleton" style={{ height: 16, width: 160, borderRadius: 8 }} />
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
