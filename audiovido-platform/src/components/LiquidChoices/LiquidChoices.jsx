import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BubbleBurst from './BubbleBurst'

export default function LiquidChoices({ choices, onChoiceSelected }) {
  const [visible, setVisible] = useState({})
  const [burst, setBurst] = useState(null)
  const visibleRef = useRef({})

  useEffect(() => {
    if (choices?.length) {
      const init = {}
      choices.forEach((_, i) => { init[i] = true })
      setVisible(init)
      visibleRef.current = { ...init }
      setBurst(null)
    }
  }, [choices])

  const handleClick = useCallback(
    (value, index, e) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top
      setBurst({ x: cx, y: cy, index })

      visibleRef.current[index] = false
      setVisible((prev) => ({ ...prev, [index]: false }))

      const remaining = Object.values(visibleRef.current).filter(Boolean).length
      if (remaining === 0) {
        setTimeout(() => onChoiceSelected?.(value), 500)
      }
    },
    [onChoiceSelected]
  )

  if (!choices?.length) return null

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '35%',
        left: '5%',
        right: '5%',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
        pointerEvents: 'auto',
      }}
    >
      <AnimatePresence>
        {choices.map((choice, i) =>
          visible[i] ? (
            <motion.button
              key={`choice-${i}-${choice}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                delay: i * 0.08,
                type: 'spring',
                stiffness: 200,
                damping: 22,
              }}
              onClick={(e) => handleClick(choice, i, e)}
              style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                maxWidth: 340,
                padding: '16px 24px',
                borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: 15,
                fontFamily: 'Inter, system-ui, sans-serif',
                cursor: 'pointer',
                textAlign: 'center',
                outline: 'none',
                WebkitTapHighlightColor: 'transparent',
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {burst?.index === i && (
                <BubbleBurst x={burst.x} y={burst.y} />
              )}
              {choice}
            </motion.button>
          ) : null
        )}
      </AnimatePresence>
    </div>
  )
}
