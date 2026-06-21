import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Search as SearchIcon, ArrowUp, Volume2, VolumeX } from 'lucide-react'
import usePlayerStore from '../store/usePlayerStore'
import MediaModal from '../components/ui/MediaModal'
import Live2DAvatar from '../components/avatar/Live2DAvatar'
import { getCompletion } from '../services/ai'
import { searchTracks } from '../services/jamendo'
import { searchTitles } from '../services/imdbapi'
import { searchSeries } from '../services/tvmaze'
import { searchAnime } from '../services/jikan'

const SEARCH_SYSTEM_PROMPT = `You are AudioVido, a warm, knowledgeable film-and-music-buff friend. The conversation language is {lang}. The current search mode is {mode}.

RULES:
- Default response language is ENGLISH.
- If the user writes in another language (Persian, French, Spanish, etc.), switch to that language and stay in it for all future responses (do NOT bounce back to English unless the user writes in English again).
- Respond with ONLY valid JSON. No markdown, no code fences, no extra text. Use this structure:
{
  "reply": "your casual, warm response text",
  "mood": "action|horror|comedy|romance|drama|scifi|fantasy|music-energetic|music-chill|music-sad|music-happy|neutral",
  "searchTerms": ["term1", "term2"],
  "sources": ["jamendo"] or ["imdbapi","tvmaze","jikan"] or a subset,
  "category": "movie|series|anime|music|unscoped"
}

STYLE:
- Friendly, casual, like a film/music buff friend. Use contractions, light humor, enthusiasm.
- Keep "reply" short (1-2 sentences max).
- When the user searches a SPECIFIC well-known movie/show/song, creatively weave in a famous quote, line, or lyric from it.
- When the user searches a GENRE or MOOD: match the vibe (horror → mysterious, comedy → playful, romance → warm, action → energetic).
- Set "mood" to match the vibe of the query for background theming.

SEARCH RULES:
- For audio mode, sources must always be ["jamendo"].
- For video mode:
  - EXPLICIT movie keywords → only use ["imdbapi"]
  - EXPLICIT series keywords → only use ["tvmaze"]
  - EXPLICIT anime keywords → only use ["jikan"]
  - Title WITHOUT type → use ALL THREE: ["imdbapi","tvmaze","jikan"]
  - General category → use all three
- searchTerms should be effective queries for the APIs (genre names, artist names, titles, etc).
- "category" should describe the result type.

LANGUAGE:
- Default: English.
- If user writes in Persian, switch to Persian and stay in Persian.
- If user writes in another language, switch to that language.`

function stripCJK(text) {
  return text.replace(/[\u4E00-\u9FFF\u3040-\u30FF\uAC00-\uD7AF]/g, '')
}

function deduplicate(arr) {
  const seen = new Set()
  return arr.filter((item) => {
    if (seen.has(item.id)) return false
    seen.add(item.id)
    return true
  })
}

const messageVar = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 22 } },
}

const exitVar = {
  exit: { opacity: 0, y: -8, transition: { duration: 0.3 } },
}

function TypingDots() {
  const [dots, setDots] = useState('')
  useEffect(() => {
    const id = setInterval(() => setDots((p) => (p.length >= 3 ? '' : p + '.')), 400)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="search-typing-dots">Searching{dots}</span>
  )
}

function CircularResultCard({ item, onClick }) {
  const image = item.cover || item.poster || item.thumbnail || ''

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(item)}
      className="search-result-card"
    >
      <div className="search-result-card-img">
        {image ? (
          <img
            src={image}
            alt={item.title || ''}
            loading="lazy"
          />
        ) : (
          <div className="search-result-card-fallback">
            <SearchIcon size={18} />
          </div>
        )}
      </div>
      <div className="search-result-card-title">
        {item.title || item.name || item.show || ''}
      </div>
    </motion.div>
  )
}

const MODE_MAP = {
  sound: 'audio',
  vision: 'video',
}

const MOOD_GRADIENTS = {
  action: 'radial-gradient(circle at 50% 50%, #ff4d00 0%, #8b0000 100%)',
  horror: 'radial-gradient(circle at 50% 50%, #1a0033 0%, #0a1a0a 100%)',
  comedy: 'radial-gradient(circle at 50% 50%, #ffd700 0%, #ff6b9d 100%)',
  romance: 'radial-gradient(circle at 50% 50%, #ff6b9d 0%, #c44569 100%)',
  drama: 'radial-gradient(circle at 50% 50%, #2c3e50 0%, #34495e 100%)',
  scifi: 'radial-gradient(circle at 50% 50%, #00d4ff 0%, #0066ff 100%)',
  fantasy: 'radial-gradient(circle at 50% 50%, #7c3aed 0%, #4c1d95 100%)',
  'music-energetic': 'radial-gradient(circle at 50% 50%, #ff006e 0%, #fb5607 100%)',
  'music-chill': 'radial-gradient(circle at 50% 50%, #06ffa5 0%, #1b9aaa 100%)',
  'music-sad': 'radial-gradient(circle at 50% 50%, #4a5568 0%, #2d3748 100%)',
  'music-happy': 'radial-gradient(circle at 50% 50%, #ffbe0b 0%, #fb5607 100%)',
  neutral: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.4) 0%, transparent 70%)',
}

const VOICE_PROFILES = {
  action: { rate: 1.15, pitch: 0.85 },
  horror: { rate: 0.85, pitch: 0.7 },
  comedy: { rate: 1.2, pitch: 1.3 },
  romance: { rate: 0.9, pitch: 1.1 },
  drama: { rate: 0.95, pitch: 0.95 },
  scifi: { rate: 1.0, pitch: 0.9 },
  fantasy: { rate: 1.0, pitch: 1.05 },
  'music-energetic': { rate: 1.2, pitch: 1.2 },
  'music-chill': { rate: 0.9, pitch: 1.0 },
  'music-sad': { rate: 0.85, pitch: 0.85 },
  'music-happy': { rate: 1.15, pitch: 1.25 },
  neutral: { rate: 1.0, pitch: 1.0 },
}

function MoodBackground({ mood }) {
  const gradient = MOOD_GRADIENTS[mood] || MOOD_GRADIENTS.neutral
  return (
    <motion.div
      key={mood}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        inset: -40,
        borderRadius: '50%',
        background: gradient,
        filter: 'blur(60px)',
        opacity: 0.5,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

function useTTS() {
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null)
  const [muted, setMuted] = useState(false)

  const speak = useCallback((text, profileOverrides) => {
    const synth = synthRef.current
    if (!synth || !text) return null
    synth.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    const profile = { ...profileOverrides }
    utterance.lang = profile.lang || 'en-US'
    utterance.rate = profile.rate ?? 1.0
    utterance.pitch = profile.pitch ?? 1.0
    utterance.volume = 1
    const voices = synth.getVoices()
    if (voices.length > 0) {
      const cloud = voices.filter((v) => !v.localService)
      const preferred = cloud.length > 0
        ? cloud.find((v) => {
            const n = v.name.toLowerCase()
            if (profile.isMale) return n.includes('daniel') || n.includes('male') || n.includes('alex')
            return n.includes('samantha') || n.includes('female') || n.includes('zira')
          }) || cloud[0]
        : voices.find((v) => {
            const n = v.name.toLowerCase()
            if (profile.isMale) return n.includes('daniel') || n.includes('male') || n.includes('alex')
            return n.includes('samantha') || n.includes('female') || n.includes('zira')
          }) || voices[0]
      if (preferred) utterance.voice = preferred
    }
    if (!muted) synth.speak(utterance)
    return utterance
  }, [muted])

  const stopSpeech = useCallback(() => {
    const synth = synthRef.current
    if (synth) synth.cancel()
  }, [])

  return { speak, stopSpeech, muted, setMuted }
}

let msgIdCounter = 0
function nextMsgId() {
  return ++msgIdCounter
}

export default function Search() {
  const { t, i18n } = useTranslation()
  const storeMode = usePlayerStore((s) => s.mode)
  const storePlay = usePlayerStore((s) => s.play)

  const avatarRef = useRef(null)
  const mode = MODE_MAP[storeMode] || 'video'

  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [modalItem, setModalItem] = useState(null)
  const [orbState, setOrbState] = useState('idle')
  const [currentMood, setCurrentMood] = useState('neutral')
  const [conversationLang, setConversationLang] = useState('en')

  const { speak, stopSpeech, muted, setMuted } = useTTS()

  const inputRef = useRef(null)

  const lang = i18n.language

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices()
        console.log('[TTS] Available voices:', voices.map((v) => `${v.name} (${v.lang}) ${v.localService ? '[local]' : '[cloud]'}`))
      }
      if (window.speechSynthesis.getVoices().length > 0) {
        const voices = window.speechSynthesis.getVoices()
        console.log('[TTS] Available voices:', voices.map((v) => `${v.name} (${v.lang}) ${v.localService ? '[local]' : '[cloud]'}`))
      }
    }
  }, [])

  useEffect(() => {
    if (isLoading) {
      setOrbState('thinking')
    } else if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1]
      if (lastMsg.role === 'assistant') {
        setOrbState(lastMsg.results?.length ? 'results' : 'idle')
      } else {
        setOrbState('idle')
      }
    } else {
      setOrbState('idle')
    }
  }, [isLoading, messages])

  const handleResultClick = useCallback(
    (item) => {
      if (item.source === 'jamendo' || item.type === 'music') {
        storePlay(item)
      } else {
        setModalItem(item)
      }
    },
    [storePlay],
  )

  const lastResults = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].results?.length) return messages[i].results
    }
    return null
  }, [messages])

  const lastUserMessage = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'user') return messages[i]
    }
    return null
  }, [messages])

  const lastAssistantMessage = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'assistant') return messages[i]
    }
    return null
  }, [messages])

  const sendMessage = useCallback(async () => {
    const text = inputText.trim()
    if (!text || isLoading) return

    const userMsg = { role: 'user', content: text, _id: nextMsgId() }
    setMessages((prev) => [...prev, userMsg])
    setInputText('')
    setOrbState('thinking')
    setIsLoading(true)

    if (avatarRef.current) {
      avatarRef.current.playMotion('TapBody')
    }

    const newLang = /[\u0600-\u06FF]/.test(text) ? 'fa' : 'en'
    if (newLang !== conversationLang) {
      setConversationLang(newLang)
    }

    try {
      const systemPrompt = SEARCH_SYSTEM_PROMPT
        .replace('{mode}', mode)
        .replace('{lang}', conversationLang)

      const history = messages
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content }))

      const aiRaw = await getCompletion([...history, userMsg], systemPrompt)

      let searchTerms = [text]
      let sources = mode === 'audio' ? ['jamendo'] : ['imdbapi', 'tvmaze', 'jikan']
      let reply = ''
      let mood = 'neutral'
      let category = 'unscoped'

      if (aiRaw) {
        try {
          const cleaned = aiRaw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim()
          const parsed = JSON.parse(cleaned)
          if (parsed.searchTerms?.length) searchTerms = parsed.searchTerms
          if (parsed.sources?.length) sources = parsed.sources
          if (parsed.reply) reply = parsed.reply
          if (parsed.mood) mood = parsed.mood
          if (parsed.category) category = parsed.category
        } catch {
          searchTerms = [text]
        }
      }

      if (mode === 'video' && sources.length < 3) {
        const typeKeywords = ['movie', 'movies', 'film', 'فیلم', 'سینمایی', 'series', 'سریال', 'show', 'shows', 'انیمه', 'anime', 'animes']
        const hasExplicitType = typeKeywords.some(kw => text.toLowerCase().includes(kw))
        if (!hasExplicitType) {
          sources = ['imdbapi', 'tvmaze', 'jikan']
        }
      }

      let results = []

      if (mode === 'audio') {
        const allTracks = []
        for (const term of searchTerms.slice(0, 3)) {
          try {
            const tracks = await searchTracks(term, 5)
            allTracks.push(...tracks)
          } catch {}
        }
        results = deduplicate(allTracks).slice(0, 10)
      } else {
        for (const source of sources) {
          for (const term of searchTerms.slice(0, 2)) {
            try {
              if (source === 'imdbapi') {
                const movies = await searchTitles(term, 5)
                results.push(...movies)
              } else if (source === 'tvmaze') {
                const shows = await searchSeries(term, 5)
                results.push(...shows)
              } else if (source === 'jikan') {
                const anime = await searchAnime(term, 5)
                results.push(...anime)
              }
            } catch {}
          }
        }
        results = deduplicate(results).slice(0, 12)
      }

      const assistantContent =
        stripCJK(reply) ||
        (results.length > 0
          ? lang === 'fa'
            ? 'اینا چیزایی هستن که پیدا کردم 👇'
            : "Here's what I found 👇"
          : lang === 'fa'
            ? 'چیزی پیدا نکردم. یه چیز دیگه رو امتحان کن.'
            : "Nothing found. Try something else.")

      setCurrentMood(mood)

      const assistantMsg = { role: 'assistant', content: assistantContent, _id: nextMsgId() }
      if (results.length > 0) {
        assistantMsg.results = results
      }
      setMessages((prev) => [...prev, assistantMsg])

      if (avatarRef.current) {
        avatarRef.current.reactToMood(mood)
      }

      const voiceProfile = VOICE_PROFILES[mood] || VOICE_PROFILES.neutral

      if (!muted) {
        const synth = window.speechSynthesis
        if (synth) {
          synth.cancel()
          const utterance = new SpeechSynthesisUtterance(assistantContent)
          utterance.lang = conversationLang === 'fa' ? 'fa-IR' : 'en-US'
          utterance.rate = voiceProfile.rate
          utterance.pitch = voiceProfile.pitch
          utterance.volume = 1

          const voices = synth.getVoices()
          if (voices.length > 0) {
            const cloud = voices.filter((v) => !v.localService)
            const preferred = cloud.length > 0
              ? cloud.find((v) => {
                  const n = v.name.toLowerCase()
                  if (mode === 'video') return n.includes('daniel') || n.includes('male') || n.includes('alex')
                  return n.includes('samantha') || n.includes('female') || n.includes('zira')
                }) || cloud[0]
              : voices.find((v) => {
                  const n = v.name.toLowerCase()
                  if (mode === 'video') return n.includes('daniel') || n.includes('male') || n.includes('alex')
                  return n.includes('samantha') || n.includes('female') || n.includes('zira')
                }) || voices[0]
            if (preferred) utterance.voice = preferred
          }

          let pollInterval
          let chromeFix

          utterance.onstart = () => {
            avatarRef.current?.startLipSync()
          }

          pollInterval = setInterval(() => {
            if (!synth.speaking && !synth.pending) {
              clearInterval(pollInterval)
              clearInterval(chromeFix)
              avatarRef.current?.stopLipSync()
            }
          }, 200)

          utterance.onend = () => {
            setTimeout(() => {
              if (!synth.speaking) {
                clearInterval(pollInterval)
                clearInterval(chromeFix)
                avatarRef.current?.stopLipSync()
              }
            }, 300)
          }

          utterance.onerror = () => {
            clearInterval(pollInterval)
            clearInterval(chromeFix)
            avatarRef.current?.stopLipSync()
          }

          synth.speak(utterance)

          chromeFix = setInterval(() => {
            if (synth.speaking) {
              synth.pause()
              synth.resume()
            } else {
              clearInterval(chromeFix)
            }
          }, 10000)
        }
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: lang === 'fa' ? 'خطایی رخ داد. دوباره تلاش کن.' : 'Something went wrong. Please try again.', _id: nextMsgId() },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [inputText, isLoading, mode, messages, lang, conversationLang, speak, muted])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const toggleMute = () => {
    stopSpeech()
    setMuted((m) => !m)
    if (avatarRef.current) avatarRef.current.stopLipSync()
  }

  return (
    <>
      <style>{`
        .search-bg {
          position: fixed;
          inset: 0;
          background: #0a0a0f;
          overflow: hidden;
        }
        .search-bg-glow {
          position: fixed;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          top: -200px;
          left: -200px;
          filter: blur(120px);
          opacity: 0.4;
          transition: background 1.5s ease;
          will-change: transform;
        }
        .search-bg-glow.idle { background: radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%); }
        .search-bg-glow.thinking { background: radial-gradient(circle, rgba(56,189,248,0.5) 0%, transparent 70%); }
        .search-bg-glow.results { background: radial-gradient(circle, rgba(20,184,166,0.5) 0%, transparent 70%); }
        .search-bg-glow-2 {
          position: fixed;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          bottom: -150px;
          right: -150px;
          filter: blur(100px);
          opacity: 0.3;
          transition: background 1.5s ease;
          will-change: transform;
        }
        .search-bg-glow-2.idle { background: radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%); }
        .search-bg-glow-2.thinking { background: radial-gradient(circle, rgba(14,165,233,0.4) 0%, transparent 70%); }
        .search-bg-glow-2.results { background: radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%); }

        .search-panel {
          position: relative;
          width: min(92vw, 520px);
          max-height: min(90vh, 700px);
          display: flex;
          flex-direction: column;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(40px) saturate(180%);
          -webkit-backdrop-filter: blur(40px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 32px;
          box-shadow: 0 8px 60px rgba(0,0,0,0.5), 0 0 40px rgba(139,92,246,0.08);
          overflow: hidden;
        }

        .search-panel-header {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px 20px 8px;
          position: relative;
        }

        .search-panel-messages {
          flex: 1;
          overflow-y: auto;
          padding: 4px 24px 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .search-panel-messages::-webkit-scrollbar { display: none; }
        .search-panel-messages { scrollbar-width: none; }

        .search-panel-footer {
          flex-shrink: 0;
          padding: 8px 16px 20px;
        }

        @keyframes orb-glow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes orb-glow-results {
          0% { transform: scale(1); opacity: 1; }
          20% { transform: scale(1.25); opacity: 0.8; }
          40% { transform: scale(0.95); opacity: 1; }
          60% { transform: scale(1.1); opacity: 0.9; }
          80% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        .search-message {
          font-size: 14px;
          line-height: 1.6;
          white-space: pre-wrap;
          padding: 2px 0;
          max-width: 100%;
        }
        .search-message.user {
          color: rgba(200, 180, 255, 0.9);
          text-shadow: 0 2px 16px rgba(0,0,0,0.6);
          text-align: right;
        }
        .search-message.assistant {
          color: rgba(255, 255, 255, 0.8);
          text-shadow: 0 2px 16px rgba(0,0,0,0.6);
          text-align: left;
        }
        .search-message-role {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          opacity: 0.4;
          margin-bottom: 1px;
        }
        .search-message.user .search-message-role {
          text-align: right;
        }

        .search-typing-dots {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          text-shadow: 0 2px 12px rgba(0,0,0,0.8);
          text-align: left;
          display: block;
        }

        .search-input-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 100px;
          padding: 8px 8px 8px 20px;
          transition: all 0.3s ease;
        }
        .search-input-bar:focus-within {
          border-color: rgba(167,139,250,0.4);
          box-shadow: 0 0 20px rgba(167,139,250,0.08);
        }

        .search-input {
          flex: 1;
          background: transparent;
          color: #fff;
          font-size: 14px;
          border: none;
          outline: none;
          resize: none;
          padding: 4px 0;
          max-height: 80px;
          line-height: 1.5;
          font-family: inherit;
        }
        .search-input::placeholder { color: rgba(255,255,255,0.3); }

        .search-send-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .search-send-btn.active {
          background: rgba(167,139,250,0.2);
          border-color: rgba(167,139,250,0.4);
          color: rgba(167,139,250,0.9);
        }
        .search-send-btn.active:hover {
          background: rgba(167,139,250,0.35);
          box-shadow: 0 0 24px rgba(167,139,250,0.3);
        }
        .search-send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .search-greeting {
          text-align: center;
          color: rgba(255,255,255,0.5);
          font-size: 14px;
          line-height: 1.6;
          text-shadow: 0 2px 20px rgba(0,0,0,0.8);
          pointer-events: none;
          padding: 20px 0;
        }

        .search-results-row {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding: 8px 0 4px;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        .search-results-row::-webkit-scrollbar { display: none; }
        .search-results-row { scrollbar-width: none; }

        .search-result-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
          width: 80px;
          cursor: pointer;
        }
        .search-result-card-img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.2);
          box-shadow: 0 4px 20px rgba(0,0,0,0.4), 0 0 15px rgba(167,139,250,0.08);
          flex-shrink: 0;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .search-result-card:hover .search-result-card-img {
          box-shadow: 0 4px 30px rgba(0,0,0,0.6), 0 0 30px rgba(167,139,250,0.2);
        }
        .search-result-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .search-result-card-fallback {
          width: 100%;
          height: 100%;
          background: rgba(167,139,250,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(167,139,250,0.4);
        }
        .search-result-card-title {
          font-size: 10px;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #fff;
          text-shadow: 0 1px 8px rgba(0,0,0,0.8);
          max-width: 80px;
          text-align: center;
        }

        .search-mute-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 5;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .search-mute-btn:hover {
          background: rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.8);
        }
      `}</style>

      <div className="search-bg">
        <div className={`search-bg-glow ${orbState}`} />
        <div className={`search-bg-glow-2 ${orbState}`} />
      </div>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          padding: 16,
          pointerEvents: 'none',
        }}
      >
        <div className="search-panel" style={{ pointerEvents: 'auto' }}>
          <div className="search-panel-header">
            <div style={{
              width: 180,
              height: 180,
              borderRadius: '50%',
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              animation: orbState === 'thinking' ? 'orb-glow 1s ease-in-out infinite' : orbState === 'results' ? 'orb-glow-results 1.2s ease-out forwards' : 'orb-glow 3s ease-in-out infinite',
              boxShadow: orbState === 'thinking'
                ? '0 0 50px rgba(56,189,248,0.5), 0 0 100px rgba(56,189,248,0.2), inset 0 0 50px rgba(255,255,255,0.08)'
                : orbState === 'results'
                ? '0 0 40px rgba(20,184,166,0.4), 0 0 80px rgba(20,184,166,0.15), inset 0 0 40px rgba(255,255,255,0.05)'
                : '0 0 40px rgba(167,139,250,0.4), 0 0 80px rgba(167,139,250,0.15), inset 0 0 40px rgba(255,255,255,0.05)',
            }}>
              <MoodBackground mood={currentMood} />
              <Live2DAvatar
                ref={avatarRef}
                modelPath={mode === 'audio' ? '/live2d/hiyori/Hiyori.model3.json' : '/live2d/mark/Mark.model3.json'}
                orbState={orbState}
              />
            </div>

            <button
              className="search-mute-btn"
              onClick={toggleMute}
              title={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
            </button>
          </div>

          {messages.length === 0 && !isLoading && (
            <div className="search-greeting">
              {conversationLang === 'fa'
                ? 'سلام 👋 چه چیزی می‌خواهی جستجو کنی؟'
                : 'Hi 👋 What do you want to search for?'}
            </div>
          )}

          {messages.length > 0 && (
            <div className="search-panel-messages">
              {lastResults && (
                <div className="search-results-row">
                  {lastResults.slice(0, 8).map((item) => (
                    <CircularResultCard key={item.id} item={item} onClick={handleResultClick} />
                  ))}
                </div>
              )}

              <AnimatePresence mode="popLayout">
                {lastUserMessage && (
                  <motion.div
                    key={`user-${lastUserMessage._id}`}
                    layout
                    variants={{ ...messageVar, ...exitVar }}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="search-message user"
                  >
                    <div className="search-message-role">
                      {lang === 'fa' ? 'شما' : 'You'}
                    </div>
                    {lastUserMessage.content}
                  </motion.div>
                )}

                {isLoading && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ paddingTop: 4 }}
                  >
                    <TypingDots />
                  </motion.div>
                )}

                {lastAssistantMessage && (
                  <motion.div
                    key={`assistant-${lastAssistantMessage._id}`}
                    layout
                    variants={{ ...messageVar, ...exitVar }}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="search-message assistant"
                  >
                    <div className="search-message-role">AudioVido</div>
                    {lastAssistantMessage.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <div className="search-panel-footer">
            <div className="search-input-bar">
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder={conversationLang === 'fa' ? 'پیام خود را بنویسید...' : 'Type your message...'}
                className="search-input"
              />
              <button
                onClick={sendMessage}
                disabled={!inputText.trim() || isLoading}
                className={`search-send-btn ${inputText.trim() && !isLoading ? 'active' : ''}`}
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalItem && (
          <MediaModal
            key={modalItem.id}
            item={modalItem}
            onClose={() => setModalItem(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
