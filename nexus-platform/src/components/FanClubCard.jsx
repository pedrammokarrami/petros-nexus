import { memo } from 'react'
import { Users, Check, Zap } from 'lucide-react'

function formatCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  return String(n)
}

function activityLabel(activity) {
  if (activity >= 80) return 'Very active'
  if (activity >= 50) return 'Active'
  if (activity >= 20) return 'Quiet'
  return 'Inactive'
}

const FanClubCard = memo(
  ({ club, onJoin, onToggleFollow, badgeLabel }) => {
    return (
      <div className="fan-club-card" onClick={onJoin}>
        <div className="club-image-wrap">
          <img
            src={club.imageUrl}
            alt={club.name}
            loading="lazy"
            className="club-image"
          />
          {badgeLabel && <span className="club-badge">{badgeLabel}</span>}
        </div>
        <div className="club-info">
          <h3>{club.name}</h3>
          <p className="club-description">{club.description}</p>
          <div className="club-meta">
            <p className="member-count">
              <Users size={12} />
              {' '}{formatCount(club.memberCount)} members
            </p>
            {club.activity !== undefined && (
              <span className={`activity-indicator activity--${activityLabel(club.activity).toLowerCase().replace(/\s+/g, '-')}`}>
                <Zap size={10} />
                {' '}{activityLabel(club.activity)}
              </span>
            )}
          </div>
        </div>
        <div className="club-actions">
          <button
            className={`btn-status ${club.isFollowing ? 'following' : 'follow'}`}
            onClick={(e) => {
              e.stopPropagation()
              onToggleFollow(club.id)
            }}
          >
            {club.isFollowing ? <><Check size={14} /> Following</> : '+ Follow'}
          </button>
        </div>
      </div>
    )
  },
  (prevProps, nextProps) =>
    prevProps.club.id === nextProps.club.id &&
    prevProps.club.memberCount === nextProps.club.memberCount &&
    prevProps.club.isFollowing === nextProps.club.isFollowing &&
    prevProps.badgeLabel === nextProps.badgeLabel
)

FanClubCard.displayName = 'FanClubCard'

export default FanClubCard
