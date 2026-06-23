import { useState, useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AvatarScene from '../components/AvatarScene/AvatarScene'
import useAvatarAnimations from '../components/AvatarScene/useAvatarAnimations'
import { getCompletion } from '../services/ai'

function speakText(text, context = 'music') {
  if (!window.speechSynthesis) return

  window.speechSynthesis.cancel()

  const cleanText = text.replace(/CHOICES:.*$/s, '').trim()
  const utterance = new SpeechSynthesisUtterance(cleanText)

  if (context === 'music') {
    utterance.rate = 1.15
    utterance.pitch = 1.2
    utterance.volume = 1.0
  } else if (context === 'film') {
    utterance.rate = 0.88
    utterance.pitch = 0.85
    utterance.volume = 1.0
  }

  const voices = window.speechSynthesis.getVoices()
  const preferred = ['Samantha', 'Karen', 'Moira', 'Tessa', 'Veena']
  let voice = null
  for (const name of preferred) {
    voice = voices.find(v => v.name.includes(name))
    if (voice) break
  }
  if (!voice) {
    voice = voices.find(v => v.lang.startsWith('en') &&
      (v.name.toLowerCase().includes('female') ||
       v.name.includes('f-') ||
       v.gender === 'female'))
  }
  if (voice) utterance.voice = voice

  window.speechSynthesis.speak(utterance)
}

function detectContext(text) {
  const filmWords = ['film', 'movie', 'cinema', 'director', 'scene',
    'watch', 'actor', 'series', 'episode', 'visual']
  const lower = text.toLowerCase()
  return filmWords.some(w => lower.includes(w)) ? 'film' : 'music'
}

if (typeof window !== 'undefined' && window.speechSynthesis?.onvoiceschanged !== undefined) {
  window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices() }
}

const SOPHIE_SYSTEM_PROMPT = `You are Sophie, an AI music assistant for AudioVido. 
Be friendly, concise (max 2 sentences).
When you want to offer choices, end your response with:
CHOICES: ["Option1", "Option2", "Option3"]
Only add CHOICES when it makes sense to offer options.`

export default function Search() {
  const navigate = useNavigate()
  const { avatarRef, setTalking, setIdle, setWalkingOut, setReturning } = useAvatarAnimations()
  const [chatState, setChatState] = useState('idle')
  const [lastMessage, setLastMessage] = useState(null)
  const [currentChoices, setCurrentChoices] = useState(null)
  const [inputText, setInputText] = useState('')
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
    const ctx = detectContext(text)
    speakText(text, ctx)

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

    if (window.speechSynthesis) window.speechSynthesis.cancel()

    setChatState('thinking')
    setCurrentChoices(null)

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
    setChatState('returning')
    setReturning()

    setTimer(() => {
      setChatState('idle')
      setIdle()

      const playKeywords = ['listen', 'play', 'numb', 'song', 'track', 'music']
      const isPlayAction = playKeywords.some(kw =>
        choice.toLowerCase().includes(kw)
      )

      if (isPlayAction) {
        navigate('/sound')
      } else {
        sendMessage(choice)
      }
    }, 1200)
  }, [setReturning, setIdle, setTimer, sendMessage, navigate])

  const handleSend = useCallback(() => {
    const trimmed = inputText.trim()
    if (!trimmed || chatState !== 'idle') return
    sendMessage(trimmed)
    setInputText('')
  }, [inputText, chatState, sendMessage])

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      overflow: 'hidden',
      background: '#0a0a0f',
    }}>
      {/* Gradient background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse at 50% 0%, rgba(100,0,200,0.15) 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(0,229,255,0.08) 0%, transparent 50%)',
      }} />

      {/* Avatar — full screen */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        width: chatState === 'choosing' ? '45%' : '100%',
        transition: 'width 0.5s ease',
      }}>
        <AvatarScene ref={avatarRef} />
      </div>

      {/* Bottom gradient for readability */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '50%',
        background: 'linear-gradient(to top, rgba(8,8,20,0.95) 0%, rgba(8,8,20,0.4) 60%, transparent 100%)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* Thinking indicator */}
      {chatState === 'thinking' && (
        <div style={{
          position: 'absolute',
          top: '15%', left: '5%', right: '5%',
          zIndex: 10,
          padding: '16px 20px',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          color: 'rgba(255,255,255,0.6)',
          fontSize: 15,
          lineHeight: 1.6,
        }}>
          Sophie is thinking...
        </div>
      )}

      {/* Response bubble — stays until next message */}
      {lastMessage && (
        <div style={{
          position: 'absolute',
          top: '15%', left: '5%', right: '5%',
          zIndex: 10,
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderLeft: '3px solid #00e5ff',
          borderRadius: 20,
          padding: '16px 20px',
          color: 'white',
          fontSize: 15,
          lineHeight: 1.6,
        }}>
          {lastMessage}
        </div>
      )}

      {/* Choices — side by side with Sophie */}
      {chatState === 'choosing' && currentChoices && currentChoices.length > 0 && (
        <div style={{
          position: 'absolute',
          right: '4%',
          top: '25%',
          width: '52%',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}>
          {currentChoices.map((choice, i) => (
            <button
              key={i}
              onClick={() => handleChoiceSelected(choice)}
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 20,
                padding: '14px 18px',
                color: 'white',
                fontSize: 14,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
                minHeight: 44,
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              {choice}
            </button>
          ))}
        </div>
      )}

      {/* Input bar — fixed above bottom nav */}
      <div style={{
        position: 'absolute',
        bottom: 'calc(84px + env(safe-area-inset-bottom, 0px))',
        left: 16,
        right: 16,
        zIndex: 20,
        display: 'flex',
        gap: 8,
        alignItems: 'center',
      }}>
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask Sophie anything..."
          disabled={chatState !== 'idle'}
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 50,
            padding: '12px 20px',
            color: 'white',
            fontSize: 15,
            outline: 'none',
            minHeight: 44,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        />
        <button
          onClick={handleSend}
          disabled={chatState !== 'idle' || !inputText.trim()}
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: chatState === 'idle' && inputText.trim() ? '#00e5ff' : 'rgba(255,255,255,0.1)',
            border: 'none',
            cursor: chatState === 'idle' && inputText.trim() ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: 'white',
            fontSize: 18,
            opacity: chatState === 'idle' && inputText.trim() ? 1 : 0.4,
          }}
        >
          ↑
        </button>
      </div>
    </div>
  )
}
