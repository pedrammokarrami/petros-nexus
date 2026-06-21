import { useState } from 'react'
import { Briefcase, ShoppingCart, Zap } from 'lucide-react'
import { mockBusinessItems } from '../../data/mockBusiness'

const ACCENT = '#FBBF24'

function formatNXT(n) {
  return n.toLocaleString('en-US') + ' NXT'
}

export default function BusinessPanel() {
  const [items] = useState(mockBusinessItems)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '14px 16px',
          borderRadius: 16,
          background: `rgba(251,191,36,0.08)`,
          border: '1px solid rgba(251,191,36,0.15)',
        }}
      >
        <Zap size={20} color={ACCENT} />
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
          Browse marketplace tools and services. All prices shown in USD and NXT.
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 16,
              background: 'var(--glass-bg)',
              backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              border: '1px solid var(--glass-border)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '100%',
                height: 140,
                background: `linear-gradient(135deg, ${ACCENT}22, ${ACCENT}08)`,
                display: 'grid',
                placeItems: 'center',
                position: 'relative',
              }}
            >
              <Briefcase size={40} color={`${ACCENT}44`} />
              <div
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  padding: '4px 10px',
                  borderRadius: 8,
                  background: `${ACCENT}22`,
                  border: `1px solid ${ACCENT}44`,
                  fontSize: 11,
                  fontWeight: 600,
                  color: ACCENT,
                }}
              >
                {item.category}
              </div>
            </div>

            <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>
                {item.title}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                {item.description}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 4,
                  paddingTop: 10,
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: ACCENT }}>
                    ${item.priceUSD.toFixed(2)}
                  </span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
                    {formatNXT(item.priceNXT)}
                  </span>
                </div>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 16px',
                    borderRadius: 10,
                    background: ACCENT,
                    color: '#0a0a0f',
                    fontWeight: 600,
                    fontSize: 13,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <ShoppingCart size={14} />
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
