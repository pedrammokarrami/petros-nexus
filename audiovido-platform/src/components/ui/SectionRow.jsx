import { ChevronLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function SectionRow({ title, children, viewAll, style }) {
  const { t } = useTranslation()

  return (
    <section style={{ marginBottom: 'var(--section-gap)', position: 'relative', zIndex: 1, ...style }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
          paddingLeft: 16,
          paddingRight: 16
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 4, height: 22, borderRadius: 2,
            background: 'var(--accent-gradient)',
            flexShrink: 0
          }} />
          <h2
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em'
            }}
          >
            {title}
          </h2>
        </div>
        {viewAll && (
          <motion.button
            whileHover={{ x: -2 }}
            onClick={viewAll}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-muted)',
              padding: '6px 10px',
              borderRadius: 20,
              background: 'var(--glass-bg)',
              backdropFilter: 'var(--glass-blur)',
              border: '1px solid var(--glass-border)',
              cursor: 'pointer'
            }}
          >
            {t('sectionRow.viewAll')} <ChevronLeft size={14} />
          </motion.button>
        )}
      </div>
      <div
        className="scroll-row"
        style={{
          paddingLeft: 16,
          paddingRight: 16
        }}
      >
        {children}
      </div>
    </section>
  )
}
