import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Music, Plus, Disc3 } from 'lucide-react'

const defaultPlaylists = [
  { id: 'pl-default-1', nameKey: 'library.defaultPlaylist1', createdAt: '۱۵ فروردین ۱۴۰۴' },
  { id: 'pl-default-2', nameKey: 'library.defaultPlaylist2', createdAt: '۱۰ فروردین ۱۴۰۴' },
  { id: 'pl-default-3', nameKey: 'library.defaultPlaylist3', createdAt: '۵ فروردین ۱۴۰۴' },
]

export default function PlaylistsPanel() {
  const { t } = useTranslation()
  const [playlists] = useState(defaultPlaylists)
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
              border: '1px solid var(--glass-border)',
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
                flexShrink: 0,
              }}
            >
              <Music size={22} color="#fff" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {t(pl.nameKey)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {t('library.createdAt', { date: pl.createdAt })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          padding: '14px',
          borderRadius: 16,
          border: '2px dashed var(--glass-border)',
          background: 'transparent',
          color: 'var(--text-muted)',
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer',
        }}
      >
        <Plus size={18} />
        {t('library.newPlaylistBtn')}
      </button>

      <div
        style={{
          marginTop: 8,
          padding: '16px',
          borderRadius: 16,
          background: 'linear-gradient(135deg, rgba(167,139,250,0.12) 0%, rgba(167,139,250,0.04) 100%)',
          border: '1px solid rgba(167,139,250,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'rgba(167,139,250,0.2)',
            display: 'grid',
            placeItems: 'center',
            flexShrink: 0,
          }}
        >
          <Disc3 size={22} color="#A78BFA" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#A78BFA' }}>
            Create DJ
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Generate a smart DJ mix from your playlists
          </div>
        </div>
        <button
          onClick={() => navigate('/dj')}
          style={{
            padding: '10px 20px',
            borderRadius: 12,
            background: '#A78BFA',
            color: '#fff',
            fontWeight: 600,
            fontSize: 13,
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Create DJ
        </button>
      </div>
    </div>
  )
}
