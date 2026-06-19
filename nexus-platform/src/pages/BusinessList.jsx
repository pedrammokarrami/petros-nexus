import { useNavigate } from 'react-router-dom'
import { Plus, Globe, ExternalLink, Sparkles, Briefcase } from 'lucide-react'
import useBusinessStore from '../store/useBusinessStore'
import { CATEGORY_COLORS } from '../data/templates'

export default function BusinessList() {
  const navigate = useNavigate()
  const businesses = useBusinessStore((s) => s.businesses)

  return (
    <div style={{
      minHeight: '100dvh', background: '#0a0a0f',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px',
        background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <button onClick={() => navigate(-1)} style={{
          width: 36, height: 36, display: 'grid', placeItems: 'center',
          borderRadius: 10, background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
        </button>
        <Briefcase size={20} color="#FBBF24" />
        <span style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>My Businesses</span>
      </div>

      <div style={{ flex: 1, padding: 16, maxWidth: 430, margin: '0 auto', width: '100%' }}>
        {businesses.length === 0 ? (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', padding: '60px 20px', textAlign: 'center', gap: 16,
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(251,191,36,0.1)',
              display: 'grid', placeItems: 'center',
              border: '2px dashed rgba(251,191,36,0.3)',
            }}>
              <Briefcase size={36} color="#FBBF24" opacity={0.5} />
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#e8edf2' }}>No businesses yet</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', maxWidth: 280, lineHeight: 1.6 }}>
              Create your first business website and get discovered across the NEXUS network.
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {businesses.map((biz) => {
              const catColor = CATEGORY_COLORS[biz.category] || '#FBBF24'
              return (
                <div
                  key={biz.id}
                  onClick={() => navigate('/business/' + biz.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: 16, borderRadius: 16, cursor: 'pointer',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = catColor + '44' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
                >
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%', flexShrink: 0,
                    background: `radial-gradient(circle at 35% 30%, ${catColor}88, ${catColor}33 60%, #0a0a0f 100%)`,
                    display: 'grid', placeItems: 'center',
                    boxShadow: `0 0 30px ${catColor}33, inset 0 0 0 1px rgba(255,255,255,0.1)`,
                    position: 'relative', overflow: 'hidden',
                  }}>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(60% 50% at 50% 20%, rgba(255,255,255,0.2), transparent)` }} />
                    <Globe size={26} color="#fff" style={{ opacity: 0.8 }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#e8edf2', marginBottom: 4 }}>{biz.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 10,
                        background: catColor + '22', color: catColor,
                      }}>{biz.category}</span>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
                        {new Date(biz.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <ExternalLink size={16} color="rgba(255,255,255,0.3)" />
                </div>
              )
            })}
          </div>
        )}

        <div style={{ height: 100 }} />
      </div>

      <div style={{
        position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        zIndex: 20,
      }}>
        <button
          onClick={() => navigate('/business/create')}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '16px 32px', borderRadius: 16, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #FBBF24, #F59E0B)',
            color: '#000', fontSize: 16, fontWeight: 800, letterSpacing: 0.5,
            boxShadow: '0 0 40px rgba(251,191,36,0.3), 0 4px 12px rgba(0,0,0,0.3)',
            transition: 'transform 0.15s',
          }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)' }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
        >
          <Plus size={20} />
          Add Business
        </button>
      </div>
    </div>
  )
}
