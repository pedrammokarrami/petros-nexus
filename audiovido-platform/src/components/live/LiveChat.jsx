import { useState, useEffect, useRef, useCallback } from 'react'
import { Send } from 'lucide-react'

const usernames = ['Mina', 'Sara', 'Reza', 'Ali', 'Nina', 'Kian']
const userColors = {
  Mina: '#f472b6',
  Sara: '#34d399',
  Reza: '#60a5fa',
  Ali: '#fbbf24',
  Nina: '#a78bfa',
  Kian: '#fb923c',
}

const chatMessages = {
  'cinema-modern': [
    'This IMAX quality is insane 🔥',
    'Best seat in the house!',
    'The sound design 🤯',
    'Who else is watching alone? 🍿',
  ],
  'cinema-negative': [
    'So vintage vibe 🎞️',
    'Reminds me of old theaters',
    'This film grain is art',
    'Smells like popcorn 🍿',
  ],
  'cinema-tv': [
    'Late night TV hits different',
    'CRT glow is unmatched',
    'Nostalgia overload 📺',
    'Perfect for rainy days ☔',
  ],
  'music-bar': [
    'This playlist is smooth 🍷',
    'Cozy vibes only',
    'Cheers everyone!',
    'Bartender, one more!',
  ],
  'music-club': [
    'DROP THE BEAT! 🔥',
    'This bass is hitting 🕺',
    'Turn it up!!',
    'Best night ever! 🎵',
  ],
  'music-concert': [
    'THIS IS LIVE?! 🔥',
    'The energy is unreal 🎸',
    'Best concert ever!',
    'Sing it louder!!!',
  ],
}

const typedMessages = {
  'cinema-modern': 'Type your review...',
  'cinema-negative': 'Share a thought...',
  'cinema-tv': 'Channel your thoughts...',
  'music-bar': 'Order a drink...',
  'music-club': 'Drop a message...',
  'music-concert': 'Shout it out...',
}

export default function LiveChat({ mode, accent, inputStyle }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [users] = useState(() => {
    const all = ['You', ...usernames]
    return all.sort(() => Math.random() - 0.5)
  })
  const intervalRef = useRef(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const randomUser = usernames[Math.floor(Math.random() * usernames.length)]
      const pool = chatMessages[mode] || chatMessages['cinema-modern']
      const text = pool[Math.floor(Math.random() * pool.length)]
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          user: randomUser,
          text,
          timestamp: Date.now(),
        },
      ])
    }, 3000 + Math.random() * 4000)
    return () => clearInterval(intervalRef.current)
  }, [mode])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = useCallback(() => {
    if (!input.trim()) return
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: 'You',
        text: input.trim(),
        timestamp: Date.now(),
      },
    ])
    setInput('')
  }, [input])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      maxHeight: 300,
    }}>
      <div style={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        paddingRight: 4,
      }}>
        {messages.slice(-12).map((msg) => (
          <div
            key={msg.id}
            style={{
              padding: '6px 10px',
              borderRadius: 10,
              background: msg.user === 'You'
                ? `${accent}33`
                : 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              fontSize: 12,
              lineHeight: 1.4,
              color: '#fff',
              alignSelf: msg.user === 'You' ? 'flex-end' : 'flex-start',
              maxWidth: '90%',
              wordBreak: 'break-word',
            }}
          >
            <span
              style={{
                fontWeight: 700,
                fontSize: 11,
                color: msg.user === 'You' ? accent : (userColors[msg.user] || '#aaa'),
                marginRight: 6,
              }}
            >
              {msg.user}
            </span>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{
        display: 'flex',
        gap: 6,
        alignItems: 'center',
        pointerEvents: 'auto',
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
          placeholder={typedMessages[mode] || 'Type a message...'}
          style={{
            flex: 1,
            height: 44,
            padding: '0 14px',
            borderRadius: 14,
            border: `1px solid ${inputStyle?.borderColor || 'rgba(255,255,255,0.15)'}`,
            background: inputStyle?.background || 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            color: '#fff',
            fontSize: 13,
            outline: 'none',
            minWidth: 0,
          }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            border: 'none',
            background: input.trim() ? accent : 'rgba(255,255,255,0.1)',
            cursor: input.trim() ? 'pointer' : 'default',
            display: 'grid',
            placeItems: 'center',
            flexShrink: 0,
          }}
        >
          <Send size={16} color={input.trim() ? '#fff' : 'rgba(255,255,255,0.3)'} />
        </button>
      </div>
    </div>
  )
}
