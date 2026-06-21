import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import useBusinessStore from '../store/useBusinessStore'
import { generateHTML } from '../data/templates'

export default function BusinessSite() {
  const { businessId } = useParams()
  const navigate = useNavigate()
  const getBusiness = useBusinessStore((s) => s.getBusiness)
  const updateBusinessHTML = useBusinessStore((s) => s.updateBusinessHTML)

  const biz = getBusiness(businessId)

  if (!biz) {
    return (
      <div style={{
        minHeight: '100dvh', background: '#0a0a0f',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 16, padding: 20,
      }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#e8edf2' }}>Business not found</div>
        <button onClick={() => navigate('/business')} style={{
          padding: '12px 24px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.04)', color: '#e8edf2', cursor: 'pointer', fontSize: 14,
        }}>
          Back to Businesses
        </button>
      </div>
    )
  }

  if (!biz.generatedHTML) {
    const html = generateHTML(biz)
    updateBusinessHTML(biz.id, html)
    biz.generatedHTML = html
  }

  return (
    <div style={{ minHeight: '100dvh', background: '#0a0a0f', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        position: 'sticky', top: 0, zIndex: 20,
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
          <ArrowLeft size={18} color="rgba(255,255,255,0.7)" />
        </button>
        <ExternalLink size={16} color="#FBBF24" />
        <span style={{ fontSize: 17, fontWeight: 700, color: '#fff', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {biz.name}
        </span>
      </div>

      <iframe
        srcDoc={biz.generatedHTML}
        title={biz.name}
        style={{
          flex: 1, width: '100%', border: 'none', background: '#fff',
        }}
        sandbox="allow-scripts"
      />
    </div>
  )
}
