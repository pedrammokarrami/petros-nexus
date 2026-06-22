import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, ArrowUp } from 'lucide-react'
import AvatarScene from '../components/AvatarScene/AvatarScene'
import useAvatarAnimations from '../components/AvatarScene/useAvatarAnimations'
import { getCompletion } from '../services/ai'

const SOPHIE_SYSTEM_PROMPT = `You are Sophie, an AI music assistant for AudioVido. 
Be friendly, concise (max 2 sentences).
When you want to offer choices, end your response with:
CHOICES: ["Option1", "Option2", "Option3"]
Only add CHOICES when it makes sense to offer options.`

function ResponseBubble({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'absolute',
        top: '20%',
        left: 16,
        right: 16,
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
        bottom: 70,
        left: 16,
        right: 16,
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

function ChoiceCard({ choice, index, dismissed, selected, onSelect }) {
  const isSelected = selected === index
  const isDismissed = dismissed && !isSelected

  return (
    <motion.button
      key={`choice-${index}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{
        opacity: isDismissed ? 0 : isSelected ? 0 : 1,
        scale: isSelected ? [1, 1.15, 0] : isDismissed ? 0.8 : 1,
        x: isDismissed ? 10 : 0,
        y: isDismissed ? 8 : 0,
      }}
      transition={{
        delay: index * 0.06,
        duration: isSelected ? 0.35 : 0.3,
        ease: 'easeOut',
      }}
      onClick={() => !dismissed && onSelect(choice, index)}
      style={{
        padding: '16px 20px',
        borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.15)',
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Inter, system-ui, sans-serif',
        cursor: dismissed ? 'default' : 'pointer',
        textAlign: 'center',
        outline: 'none',
        WebkitTapHighlightColor: 'transparent',
        width: '100%',
        maxWidth: 280,
      }}
    >
      {choice}
    </motion.button>
  )
}

export default function Search() {
  const { avatarRef, setTalking, setIdle, setWalkingOut, setReturning } = useAvatarAnimations()
  const [chatState, setChatState] = useState('idle')
  const [lastMessage, setLastMessage] = useState(null)
  const [currentChoices, setCurrentChoices] = useState(null)
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [dismissed, setDismissed] = useState(false)
  const conversationRef = useRef([])

  const timersRef = useRef([])
  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout)
  }, [])

  const setTimer = useCallback((fn, delay) => {
    const id = setTimeout(fn, delay)
    timersRef.current.push(id)
    return id
  }, [])

  const handleAIResponse = useCallback((text, choices) => {
    setLastMessage(text)
    setChatState('talking')
    console.log('[Search] handleAIResponse -> setTalking')
    setTalking()

    if (choices && choices.length > 0) {
      setTimer(() => {
        setChatState('choosing')
        console.log('[Search] setWalkingOut')
        setWalkingOut()
        setCurrentChoices(choices)
      }, 1500)
    } else {
      setTimer(() => {
        setChatState('idle')
        setIdle()
      }, 3000)
    }
  }, [setTalking, setWalkingOut, setIdle, setTimer])

  const sendMessage = useCallback(async (userText) => {
    if (!userText.trim()) return

    setChatState('thinking')
    setCurrentChoices(null)
    setLastMessage(null)
    setSelectedChoice(null)
    setDismissed(false)

    conversationRef.current.push({ role: 'user', content: userText })

    try {
      const history = conversationRef.current.slice(-6)
      const raw = await getCompletion(history, SOPHIE_SYSTEM_PROMPT)

      if (raw) {
        const choicesMatch = raw.match(/CHOICES:\s*(\[.*?\])/s)
        const messageText = raw.replace(/CHOICES:.*$/s, '').trim()
        const choices = choicesMatch ? JSON.parse(choicesMatch[1]) : null

        conversationRef.current.push({ role: 'assistant', content: messageText })
        handleAIResponse(messageText, choices)
      } else {
        handleAIResponse("I'm having trouble connecting. Please try again.", null)
      }
    } catch (err) {
      console.error('AI error:', err)
      handleAIResponse("I'm having trouble connecting. Please try again.", null)
    }
  }, [handleAIResponse])

  const handleChoiceSelected = useCallback((choice) => {
    setCurrentChoices(null)
    setSelectedChoice(null)
    setDismissed(false)
    setChatState('returning')
    setReturning()

    setTimer(() => {
      setChatState('idle')
      setIdle()
      sendMessage(choice)
    }, 1200)
  }, [setReturning, setIdle, setTimer, sendMessage])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100dvh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: '#0a0a0f',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(100,0,200,0.15) 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(0,229,255,0.08) 0%, transparent 50%)',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: chatState === 'choosing' ? '45%' : '100%',
          transition: 'width 0.5s ease',
          zIndex: 1,
        }}
      >
        <AvatarScene ref={avatarRef} />
      </div>

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
              top: '20%',
              left: 16,
              right: 16,
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

      {chatState === 'choosing' && currentChoices && (
        <div
          style={{
            position: 'absolute',
            right: 16,
            top: '20%',
            width: '50%',
            maxWidth: 300,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            zIndex: 10,
            alignItems: 'flex-end',
          }}
        >
          {currentChoices.map((choice, i) => (
            <ChoiceCard
              key={i}
              choice={choice}
              index={i}
              dismissed={dismissed}
              selected={selectedChoice}
              onSelect={(value, idx) => {
                setSelectedChoice(idx)
                setDismissed(true)
                setTimer(() => handleChoiceSelected(value), 400)
              }}
            />
          ))}
        </div>
      )}

      <InputBar onSend={sendMessage} disabled={chatState !== 'idle'} />
    </div>
  )
}
