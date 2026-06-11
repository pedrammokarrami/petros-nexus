import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Music, Film } from 'lucide-react'
import usePlayerStore from '../store/usePlayerStore'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.25 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

export default function Splash() {
  const navigate = useNavigate()
  const setMode = usePlayerStore((s) => s.setMode)
  const [animating, setAnimating] = useState(false)

  const handleSelect = (mode) => {
    setAnimating(true)
    setMode(mode)
    setTimeout(() => navigate('/home'), 600)
  }

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
        padding: 32,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -200,
          right: -200,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -200,
          left: -200,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={animating ? 'hidden' : 'show'}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
      >
        <motion.div variants={itemVariants}>
          <h1
            style={{
              fontSize: 56,
              fontWeight: 900,
              letterSpacing: '0.3em',
              background: 'linear-gradient(135deg, #A78BFA, #38BDF8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: 8
            }}
          >
            NEXUS
          </h1>
        </motion.div>

        <motion.p
          variants={itemVariants}
          style={{
            fontSize: 16,
            color: 'var(--text-muted)',
            letterSpacing: '0.15em',
            fontWeight: 300,
            marginBottom: 40
          }}
        >
          Your Universe of Entertainment
        </motion.p>

        <motion.div variants={itemVariants} style={{ display: 'flex', gap: 16, flexDirection: 'column', width: '100%', maxWidth: 320 }}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect('sound')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              padding: '18px 32px',
              borderRadius: 30,
              background: 'linear-gradient(135deg, #A78BFA, #7C3AED)',
              color: '#fff',
              fontSize: 16,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            <Music size={22} />
            ورود به دنیای صدا
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect('vision')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              padding: '18px 32px',
              borderRadius: 30,
              background: 'linear-gradient(135deg, #38BDF8, #0EA5E9)',
              color: '#fff',
              fontSize: 16,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            <Film size={22} />
            ورود به دنیای تصویر
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
