import { ChevronLeft } from 'lucide-react'

export default function SectionRow({ title, children, viewAll, style }) {
  return (
    <section style={{ marginBottom: 28, ...style }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
          paddingLeft: 4,
          paddingRight: 4
        }}
      >
        <h2
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: 'var(--text-primary)'
          }}
        >
          {title}
        </h2>
        {viewAll && (
          <button
            onClick={viewAll}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--text-muted)',
              padding: '4px 8px'
            }}
          >
            همه <ChevronLeft size={16} />
          </button>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          gap: 12,
          overflowX: 'auto',
          overflowY: 'hidden',
          paddingBottom: 8,
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory'
        }}
      >
        {children}
      </div>
    </section>
  )
}
