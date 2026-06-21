import { useState } from 'react'
import { Gift, Copy, Check, Share2, Users } from 'lucide-react'
import { GlowAvatar } from '../../components/GlowAvatar'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'

function ReferralItem({ referral }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        borderRadius: 'var(--fnd-radius-lg)',
        background: 'var(--fnd-bg-surface)',
        border: '1px solid var(--fnd-border-faint)',
      }}
    >
      <GlowAvatar src={referral.avatar} name={referral.name} size="md" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 'var(--fnd-fs-14)', fontWeight: 600, color: 'var(--fnd-text-hi)' }}>
          {referral.name}
        </div>
        <div style={{ fontSize: 'var(--fnd-fs-12)', color: 'var(--fnd-text-muted)' }}>
          Joined {referral.joinDate}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Badge text="Invited by you" variant="ghost" />
        {referral.xp && (
          <Badge text={`+${referral.xp} XP`} variant="success" />
        )}
      </div>
    </div>
  )
}

export function ReferralsTab({ referrals, referralCode }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  const handleShare = () => {
    if (navigator.share && referralCode) {
      navigator.share({
        title: 'Join me on AudioVido',
        text: `Use my referral code: ${referralCode}`,
      }).catch(() => {})
    }
  }

  return (
    <div className="fnd-referrals-tab" style={{ padding: 16 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 20,
          padding: '16px 20px',
          borderRadius: 'var(--fnd-radius-xl)',
          background: 'color-mix(in oklab, var(--fnd-accent) 10%, transparent)',
          border: '1px solid color-mix(in oklab, var(--fnd-accent) 20%, transparent)',
        }}
      >
        <Gift size={24} color="var(--fnd-accent)" />
        <div>
          <div style={{ fontSize: 'var(--fnd-fs-16)', fontWeight: 700, color: 'var(--fnd-text-hi)' }}>
            Your Referrals
          </div>
          <div style={{ fontSize: 'var(--fnd-fs-14)', color: 'var(--fnd-text-dim)' }}>
            {referrals.length} friend{referrals.length !== 1 ? 's' : ''} joined via your code
          </div>
        </div>
      </div>

      {referrals.length === 0 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            padding: '60px 24px',
            color: 'var(--fnd-text-dim)',
          }}
        >
          <Gift size={48} style={{ opacity: 0.3 }} />
          <div style={{ fontSize: 'var(--fnd-fs-16)', fontWeight: 500 }}>No referrals yet</div>
          <div style={{ fontSize: 'var(--fnd-fs-14)', color: 'var(--fnd-text-muted)' }}>Share your code and earn XP!</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {referrals.map((r, i) => (
            <ReferralItem key={r.id || i} referral={r} />
          ))}
        </div>
      )}

      <div
        style={{
          padding: '16px 20px',
          borderRadius: 'var(--fnd-radius-xl)',
          background: 'var(--fnd-bg-surface)',
          border: '1px solid var(--fnd-border-soft)',
        }}
      >
        <div style={{ fontSize: 'var(--fnd-fs-14)', fontWeight: 600, color: 'var(--fnd-text-dim)', marginBottom: 12 }}>
          Share Your Referral Code
        </div>
        <div
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: 'var(--fnd-radius-lg)',
              background: 'var(--fnd-bg-page)',
              border: '1px solid var(--fnd-border-soft)',
              fontFamily: 'var(--fnd-font-mono)',
              fontSize: 'var(--fnd-fs-16)',
              fontWeight: 700,
              color: 'var(--fnd-accent)',
              letterSpacing: '0.05em',
            }}
          >
            {referralCode || 'AudioVido-XXXX'}
          </div>
          <button
            onClick={handleCopy}
            style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--fnd-radius-md)',
              border: '1px solid var(--fnd-border-soft)',
              background: 'var(--fnd-bg-surface-raised)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--fnd-dur-fast) var(--fnd-ease-out)',
            }}
          >
            {copied ? <Check size={18} color="var(--fnd-success)" /> : <Copy size={18} color="var(--fnd-text-dim)" />}
          </button>
          <button
            onClick={handleShare}
            style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--fnd-radius-md)',
              border: '1px solid var(--fnd-border-soft)',
              background: 'var(--fnd-bg-surface-raised)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--fnd-dur-fast) var(--fnd-ease-out)',
            }}
          >
            <Share2 size={18} color="var(--fnd-text-dim)" />
          </button>
        </div>
      </div>
    </div>
  )
}
