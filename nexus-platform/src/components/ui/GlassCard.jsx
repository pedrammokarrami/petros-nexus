import { motion } from 'framer-motion'

export default function GlassCard({ children, style, onClick, glow = false, padding = 16, ...props }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding,
        ...(glow ? { boxShadow: `0 0 30px rgba(167, 139, 250, 0.15)` } : {}),
        willChange: 'transform',
        ...style
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
