import { Users } from 'lucide-react'
import { TabBar } from '../../components/TabBar'

const TABS = [
  { id: 'friends', label: 'Friends' },
  { id: 'discover', label: 'Discover' },
  { id: 'search', label: 'Search' },
  { id: 'referrals', label: 'Referrals' },
]

export function Header({ activeTab, onTabChange }) {
  return (
    <div
      className="fnd-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 'var(--fnd-z-sticky)',
        background: 'var(--fnd-bg-overlay)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        borderBottom: '1px solid var(--fnd-border-soft)',
        padding: '12px 16px 8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 'var(--fnd-radius-md)',
            background: 'color-mix(in oklab, var(--fnd-accent) 20%, transparent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Users size={20} color="var(--fnd-accent)" />
        </div>
        <span
          style={{
            fontSize: 'var(--fnd-fs-20)',
            fontWeight: 700,
            color: 'var(--fnd-text-hi)',
            letterSpacing: '-0.02em',
          }}
        >
          Friends
        </span>
      </div>
      <TabBar tabs={TABS} activeTab={activeTab} onChange={onTabChange} />
    </div>
  )
}
