import { useState } from 'react'
import { motion } from 'framer-motion'
import { ListMusic, Bookmark, History, Music, Heart } from 'lucide-react'
import usePlayerStore from '../store/usePlayerStore'

const tabs = [
  { id: 'playlist', label: 'پلی‌لیست', icon: ListMusic },
  { id: 'saved', label: 'ذخیره‌شده', icon: Bookmark },
  { id: 'history', label: 'تاریخچه', icon: History }
]

export default function Library() {
  const [activeTab, setActiveTab] = useState('playlist')
  const queue = usePlayerStore((s) => s.queue)

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }

  const EmptyState = ({ icon: Icon, message, actionLabel }) => (
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
        return (
          <EmptyState
            icon={ListMusic}
            message="هنوز پلی‌لیستی نداری!"
            actionLabel="ساخت پلی‌لیست"
          />
        )
      case 'saved':
        return (
          <EmptyState
            icon={Bookmark}
            message="محتواهای ذخیره شدهات\nاینجا نمایش داده می‌شود"
          />
        )
      case 'history':
        return (
          <EmptyState
            icon={History}
            message="تاریخچه پخش تو\nاینجا قابل مشاهده است"
          />
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
              {tab.label}
            </button>
          )
        })}
      </div>

      {renderContent()}
    </motion.div>
  )
}
