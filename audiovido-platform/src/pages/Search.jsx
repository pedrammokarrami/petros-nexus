import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, ArrowUp } from 'lucide-react'
import AvatarScene from '../components/AvatarScene/AvatarScene'
import useAvatarAnimations from '../components/AvatarScene/useAvatarAnimations'
import LiquidChoices from '../components/LiquidChoices/LiquidChoices'

const MOCK_RESPONSES = [
  { text: "Hi! 👋 What kind of music are you looking for?", choices: ["Pop", "Rock", "Hip-Hop", "Electronic"] },
  { text: "Great choice! Here are some tracks for you 🎵", choices: null },
  { text: "Want me to create a playlist?", choices: ["Yes please!", "Maybe later"] },
]

const CHAT_STATES = {
  IDLE: 'idle',
  THINKING: 'thinking',
  TALKING: 'talking',
  CHOOSING: 'choosing',
  RETURNING: 'returning',
}

function ResponseBubble({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'absolute',
        top: '25%',
        left: '5%',
        right: '5%',
        zIndex: 3,
        padding: '20px 24px',
        borderRadius: 24,
        border: '1px solid rgba(255,255,255,0.12)',
        borderLeft: '3px solid #00e5ff',
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Inter, system-ui, sans-serif',
        lineHeight: 1.6,
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      {message}
    </motion.div>
  )
}

function InputBar({ onSend, disabled }) {
  const [text, setText] = useState('')
  const inputRef = useRef(null)

  const handleSend = useCallback(() => {
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setText('')
  }, [text, disabled, onSend])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 16,
        left: '5%',
        right: '5%',
        zIndex: 4,
        display: 'flex',
        gap: 8,
        padding: '8px 8px 8px 20px',
        borderRadius: 100,
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        alignItems: 'center',
      }}
    >
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask Sophie anything..."
        disabled={disabled}
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: '#fff',
          fontSize: 15,
          fontFamily: 'Inter, system-ui, sans-serif',
          lineHeight: 1.5,
          padding: '4px 0',
        }}
      />
      <button
        onClick={() => {}}
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '1px solid rgba(0, 229, 255, 0.3)',
          background: 'rgba(0, 229, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#00e5ff',
          flexShrink: 0,
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <Mic size={18} />
      </button>
      <button
        onClick={handleSend}
        disabled={!text.trim() || disabled}
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '1px solid rgba(255, 107, 107, 0.3)',
          background: !text.trim() || disabled
            ? 'rgba(255,107,107,0.05)'
            : 'rgba(255,107,107,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: !text.trim() || disabled ? 'not-allowed' : 'pointer',
          color: !text.trim() || disabled
            ? 'rgba(255,107,107,0.3)'
            : '#ff6b6b',
          flexShrink: 0,
          transition: 'all 0.2s ease',
          opacity: !text.trim() || disabled ? 0.5 : 1,
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <ArrowUp size={18} />
      </button>
    </div>
  )
}

function ThinkingDots() {
  const [dots, setDots] = useState('')
  useEffect(() => {
    const id = setInterval(() => setDots((p) => (p.length >= 3 ? '' : p + '.')), 400)
    return () => clearInterval(id)
  }, [])
  return <>Sophie is thinking{dots}</>
}

export default function Search() {
  const { avatarRef, setTalking, setIdle, setWalkingOut, setReturning } = useAvatarAnimations()
  const [chatState, setChatState] = useState('idle')
  const [lastMessage, setLastMessage] = useState(null)
  const [currentChoices, setCurrentChoices] = useState(null)
  const mockIndexRef = useRef(0)

  // Cleanup timeouts on unmount
  const timersRef = useRef([])
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout)
    }
  }, [])

  const setTimer = useCallback((fn, delay) => {
    const id = setTimeout(fn, delay)
    timersRef.current.push(id)
    return id
  }, [])

  const handleSend = useCallback((text) => {
    if (chatState !== 'idle') return

    setChatState('thinking')
    setCurrentChoices(null)
    setLastMessage(null)

    setTimer(() => {
      const responses = MOCK_RESPONSES
      const idx = mockIndexRef.current % responses.length
      mockIndexRef.current += 1
      const response = responses[idx]

      setChatState('talking')
      setLastMessage(response.text)
      setTalking()

      if (response.choices) {
        setTimer(() => {
          setChatState('choosing')
          setWalkingOut()

          setTimer(() => {
            setCurrentChoices(response.choices)
          }, 1200)
        }, 500)
      } else {
        setTimer(() => {
          setChatState('idle')
          setLastMessage(null)
          setIdle()
        }, 3000)
      }
    }, 800)
  }, [chatState, setTalking, setIdle, setWalkingOut, setReturning, setTimer])

  const handleChoiceSelected = useCallback((value) => {
    setCurrentChoices(null)
    setChatState('returning')
    setReturning()

    setTimer(() => {
      setChatState('idle')
      setLastMessage(null)
      setIdle()
    }, 1000)
  }, [setReturning, setIdle, setTimer])

  return (
    <div
      style={{
        height: '100dvh',
        position: 'relative',
        overflow: 'hidden',
        background: '#0a0a0f',
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(100,0,200,0.15) 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(0,229,255,0.08) 0%, transparent 50%)',
          zIndex: 0,
        }}
      />

      {/* Avatar Scene */}
      <AvatarScene ref={avatarRef} />

      {/* Gradient overlay for readability */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Response bubble */}
      <AnimatePresence mode="wait">
        {chatState === 'thinking' && (
          <motion.div
            key="thinking"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: '25%',
              left: '5%',
              right: '5%',
              zIndex: 3,
              padding: '20px 24px',
              borderRadius: 24,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              color: 'rgba(255,255,255,0.6)',
              fontSize: 15,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            <ThinkingDots />
          </motion.div>
        )}
        {chatState === 'talking' && lastMessage && (
          <ResponseBubble key="response" message={lastMessage} />
        )}
      </AnimatePresence>

      {/* Liquid glass choices */}
      <LiquidChoices
        choices={currentChoices}
        onChoiceSelected={handleChoiceSelected}
      />

      {/* Input bar */}
      <InputBar
        onSend={handleSend}
        disabled={chatState !== 'idle'}
      />
    </div>
  )
}
