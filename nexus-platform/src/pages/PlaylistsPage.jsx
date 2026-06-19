import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ListMusic, Bookmark, History, Music, Plus, X, Play, Star } from 'lucide-react'
import usePlayerStore from '../store/usePlayerStore'
import { mockSavedItems, mockHistory } from '../data/mockData'

const tabs = [
  { id: 'playlist', labelKey: 'library.playlist', icon: ListMusic },
  { id: 'saved', labelKey: 'library.saved', icon: Bookmark },
  { id: 'history', labelKey: 'library.history', icon: History }
]

const defaultPlaylists = [
  { id: 'pl-default-1', nameKey: 'library.defaultPlaylist1', createdAt: '۱۵ فروردین ۱۴۰۴' },
  { id: 'pl-default-2', nameKey: 'library.defaultPlaylist2', createdAt: '۱۰ فروردین ۱۴۰۴' },
  { id: 'pl-default-3', nameKey: 'library.defaultPlaylist3', createdAt: '۵ فروردین ۱۴۰۴' }
]

let playlistIdCounter = 4

export default function PlaylistsPage() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('playlist')
  const [playlists, setPlaylists] = useState(defaultPlaylists)
  const [showModal, setShowModal] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState('')

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }

  const createPlaylist = () => {
    const name = newPlaylistName.trim()
    if (!name) return
    setPlaylists([...playlists, { id: ++playlistIdCounter, name, createdAt: new Date().toLocaleDateString('fa-IR') }])
    setNewPlaylistName('')
    setShowModal(false)
  }

  const EmptyState = ({ icon: Icon, message, actionLabel, onAction }) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px',
        gap: 20
      }}
    >
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          border: '1px solid var(--glass-border)',
          display: 'grid',
          placeItems: 'center'
        }}
      >
        <Icon size={40} color="var(--text-muted)" />
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: 16, textAlign: 'center', lineHeight: 1.6 }}>
        {message}
      </p>
      {actionLabel && (
        <button
          onClick={onAction}
          style={{
            padding: '14px 32px',
            borderRadius: 30,
            background: 'var(--accent-gradient)',
            color: '#fff',
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
            border: 'none'
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'playlist':
        if (playlists.length === 0) {
          return (
            <EmptyState
              icon={ListMusic}
              message={t('library.emptyPlaylist')}
              actionLabel={t('library.createPlaylist')}
              onAction={() => setShowModal(true)}
            />
          )
        }
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {playlists.map((pl) => (
              <div
                key={pl.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 16px',
                  borderRadius: 16,
                  background: 'var(--glass-bg)',
                  backdropFilter: 'var(--glass-blur)',
                  WebkitBackdropFilter: 'var(--glass-blur)',
                  border: '1px solid var(--glass-border)'
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'var(--accent-gradient)',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0
                  }}
                >
                  <Music size={22} color="#fff" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {t(pl.nameKey)}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {t('library.createdAt', { date: pl.createdAt })}
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => setShowModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '14px',
                borderRadius: 16,
                border: '2px dashed var(--glass-border)',
                background: 'transparent',
                color: 'var(--text-muted)',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                marginTop: 8
              }}
            >
              <Plus size={18} />
              {t('library.newPlaylistBtn')}
            </button>
          </div>
        )
      case 'saved':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {mockSavedItems.map((item) => (
              <div
                key={item.id}
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
                <div style={{ width: 52, height: 52, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                  <img src={item.cover || item.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title || item.show}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.artist || item.host || item.genre}
                  </div>
                </div>
                <Star size={16} fill="var(--accent-gold)" color="var(--accent-gold)" />
              </div>
            ))}
          </div>
        )
      case 'history':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {mockHistory.map((item) => (
              <div
                key={item.id}
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
                <div style={{ width: 52, height: 52, borderRadius: 12, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                  <img src={item.cover || item.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {item.progress !== undefined && item.progress < 1 && (
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.2)' }}>
                      <div style={{ height: '100%', width: `${item.progress * 100}%`, background: 'var(--accent-gradient)' }} />
                    </div>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title || item.show}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {item.artist || item.host} • {item.listenedAt}
                  </div>
                </div>
                <Play size={16} color="var(--accent-primary)" />
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
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
          gap: 8,
          overflowX: 'auto',
          paddingBottom: 4,
          marginBottom: 20,
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 18px',
                borderRadius: 20,
                background: isActive ? 'var(--accent-gradient)' : 'var(--glass-bg)',
                backdropFilter: isActive ? 'none' : 'var(--glass-blur)',
                WebkitBackdropFilter: isActive ? 'none' : 'var(--glass-blur)',
                border: isActive ? 'none' : '1px solid var(--glass-border)',
                color: isActive ? '#fff' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 400,
                fontSize: 13,
                whiteSpace: 'nowrap'
              }}
            >
              {tab.icon && <tab.icon size={16} />}
              {t(tab.labelKey)}
            </button>
          )
        })}
      </div>

      {renderContent()}

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 300,
              background: 'rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: 360,
                background: 'var(--bg-primary)',
                borderRadius: 24,
                padding: 24,
                border: '1px solid var(--glass-border)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontSize: 18, fontWeight: 700 }}>{t('library.newPlaylist')}</span>
                <button onClick={() => setShowModal(false)} style={{ width: 36, height: 36, display: 'grid', placeItems: 'center' }}>
                  <X size={20} color="var(--text-muted)" />
                </button>
              </div>
              <input
                autoFocus
                placeholder={t('library.playlistNamePlaceholder')}
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') createPlaylist() }}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: 14,
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-primary)',
                  fontSize: 15,
                  outline: 'none',
                  marginBottom: 16,
                  direction: 'rtl'
                }}
              />
              <button
                onClick={createPlaylist}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: 14,
                  background: newPlaylistName.trim() ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.1)',
                  color: newPlaylistName.trim() ? '#fff' : 'var(--text-muted)',
                  fontWeight: 600,
                  fontSize: 14,
                  border: 'none',
                  cursor: newPlaylistName.trim() ? 'pointer' : 'default'
                }}
              >
                {t('library.create')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
