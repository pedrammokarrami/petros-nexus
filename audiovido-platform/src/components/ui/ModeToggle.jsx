import { motion } from 'framer-motion'
import { Music, Film } from 'lucide-react'
import usePlayerStore from '../../store/usePlayerStore'

export default function ModeToggle({ size = 48, style }) {
  const { mode, toggleMode } = usePlayerStore()

  return (
    <motion.button
      onClick={toggleMode}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--accent-gradient)',
        color: '#fff',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        border: 'none',
        ...style
      }}
    >
      <motion.div
        key={mode}
        initial={{ rotate: -180, opacity: 0, scale: 0 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        {mode === 'sound' ? <Music size={size * 0.45} /> : <Film size={size * 0.45} />}
      </motion.div>
    </motion.button>
  )
}
