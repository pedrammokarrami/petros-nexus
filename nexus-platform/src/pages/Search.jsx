import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Star, Music, Film } from 'lucide-react'
import usePlayerStore from '../store/usePlayerStore'
import MediaModal from '../components/ui/MediaModal'
import VrmAvatarScene from '../components/avatar/VrmAvatarScene'
import { getCompletion } from '../services/ai'
import { searchTracks } from '../services/jamendo'
import { searchTitles } from '../services/imdbapi'
import { searchSeries } from '../services/tvmaze'
import { searchAnime } from '../services/jikan'

const SEARCH_SYSTEM_PROMPT = `You are a search intent classifier for NEXUS, a media entertainment app.

The current mode is {mode}.
- "audio" mode = music only, using the Jamendo API
- "video" mode = movies via imdbapi, series via TVmaze, anime via Jikan

Given the user's message and the conversation history, determine what they want to search for.
Respond with ONLY valid JSON (no markdown, no code fences, no extra text) in this exact structure:
{
  "searchTerms": ["term1", "term2"],
  "sources": ["jamendo"] or ["imdbapi","tvmaze","jikan"] or a subset,
  "reply": "A brief natural response in the user's language acknowledging what you're searching for (max 15 words)"
}

Rules:
- For audio mode, sources must always be ["jamendo"].
- For video mode:
  - If the user EXPLICITLY specifies a movie/film (e.g. "movie", "film", "فیلم", "سینمایی"), only use ["imdbapi"].
  - If the user EXPLICITLY specifies a series/TV show (e.g. "series", "TV show", "سریال"), only use ["tvmaze"].
  - If the user EXPLICITLY specifies anime (e.g. "anime", "انیمه"), only use ["jikan"].
  - If the user mentions a title WITHOUT specifying a type (e.g. just "Arcane" or "آرکین"), use ALL THREE sources: ["imdbapi","tvmaze","jikan"].
  - If the user asks a general category (e.g. "action movies", "فیلم های اکشن", "new shows", "کمدی"), use all three sources.
- searchTerms should be the most effective search queries for the APIs (e.g. genre names, artist names, titles, country names).
- If this is a follow-up query (like "older", "more recent", "Korean", "action"), adjust searchTerms accordingly based on the previous search context.
- The reply should acknowledge what the user asked for (e.g. "Looking for action movies..." or "Finding Korean series..."). Keep it brief.
- Detect the user's language automatically and reply in the same language.`

const MODE_TABS = [
  { key: 'audio', labelKey: 'search.tabAudio' },
  { key: 'video', labelKey: 'search.tabVideo' },
]

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

function CircularCard({ item, onClick }) {
  const image = item.cover || item.poster || item.thumbnail || ''
  const isMusic = item.source === 'jamendo'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.08, transition: { type: 'spring', stiffness: 350, damping: 18 } }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(item)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        flexShrink: 0,
        width: 90,
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid rgba(124, 58, 237, 0.25)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.6), 0 0 15px rgba(124, 58, 237, 0.15)',
          flexShrink: 0,
        }}
      >
        {image ? (
          <img
            src={image}
            alt={item.title || ''}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'rgba(124, 58, 237, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isMusic ? <Music size={22} color="rgba(124,58,237,0.5)" /> : <Film size={22} color="rgba(56,189,248,0.5)" />}
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', width: '100%', maxWidth: 80 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: '#fff',
            textShadow: '0 1px 8px rgba(0,0,0,0.8)',
          }}
        >
          {item.title || item.name || item.show || ''}
        </div>
      </div>
    </motion.div>
  )
}

function TypingDots() {
  const [dots, setDots] = useState('')
  useEffect(() => {
    const id = setInterval(() => setDots((p) => (p.length >= 3 ? '' : p + '.')), 400)
    return () => clearInterval(id)
  }, [])
  return (
    <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>
      Searching{dots}
    </span>
  )
}

const messageVar = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 22 } },
}

export default function Search() {
  const { t, i18n } = useTranslation()
  const [mode, setMode] = useState('audio')
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [modalItem, setModalItem] = useState(null)

  const inputRef = useRef(null)
  const isSpeakingRef = useRef(false)
  const expressionRef = useRef(null)
  const lookTargetRef = useRef(null)
  const storePlay = usePlayerStore((s) => s.play)

  const lang = i18n.language

  useEffect(() => {
    isSpeakingRef.current = isLoading
  }, [isLoading])

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

  const sendMessage = useCallback(async () => {
    const text = inputText.trim()
    if (!text || isLoading) return

    const userMsg = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setInputText('')
    expressionRef.current = { name: 'surprised', until: performance.now() + 1200 }
    setIsLoading(true)

    try {
      const systemPrompt = SEARCH_SYSTEM_PROMPT.replace('{mode}', mode)

      const history = messages
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content }))

      const aiRaw = await getCompletion([...history, userMsg], systemPrompt)

      let searchTerms = [text]
      let sources = mode === 'audio' ? ['jamendo'] : ['imdbapi', 'tvmaze', 'jikan']
      let reply = ''

      if (aiRaw) {
        try {
          const cleaned = aiRaw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim()
          const parsed = JSON.parse(cleaned)
          if (parsed.searchTerms?.length) searchTerms = parsed.searchTerms
          if (parsed.sources?.length) sources = parsed.sources
          if (parsed.reply) reply = parsed.reply
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

      expressionRef.current = {
        name: results.length > 0 ? 'happy' : 'sad',
        until: performance.now() + 2500,
      }

      lookTargetRef.current = {
        yaw: 0.55,
        until: performance.now() + 2500,
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

      const assistantMsg = { role: 'assistant', content: assistantContent }
      if (results.length > 0) {
        assistantMsg.results = results
      }
      setMessages((prev) => [...prev, assistantMsg])
    } catch (err) {
      expressionRef.current = { name: 'surprised', until: performance.now() + 2500 }
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            lang === 'fa' ? 'خطایی رخ داد. دوباره تلاش کن.' : 'Something went wrong. Please try again.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [inputText, isLoading, mode, messages, lang])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <style>{`
        .search-input::placeholder { color: rgba(255,255,255,0.3); }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* SINGLE FIXED CONTAINER — both VRM and UI share one stacking context */}
      <div style={{ position: 'fixed', inset: 0 }}>

        {/* VRM AVATAR — full-screen background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <VrmAvatarScene isSpeakingRef={isSpeakingRef} expressionRef={expressionRef} mode={mode} lookTargetRef={lookTargetRef} />
        </div>

        {/* UI OVERLAY — same stacking context, higher z-index */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 9999,
            pointerEvents: 'none',
            transform: 'translateZ(0)',
          }}
        >
        {/* MODE TOGGLE — top-right */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            display: 'flex',
            gap: 2,
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: 20,
            padding: 3,
            border: '1px solid rgba(255,255,255,0.06)',
            pointerEvents: 'auto',
          }}
        >
          {MODE_TABS.map((tab) => {
            const active = mode === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => {
                  if (tab.key !== mode) {
                    setMode(tab.key)
                    setMessages([])
                  }
                }}
                style={{
                  padding: '5px 12px',
                  borderRadius: 18,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  background: active ? 'rgba(124,58,237,0.35)' : 'transparent',
                  color: active ? '#fff' : 'rgba(255,255,255,0.45)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  textTransform: 'uppercase',
                }}
              >
                {t(tab.labelKey)}
              </button>
            )
          })}
        </div>

        {/* GREETING / INITIAL CAPTION */}
        {messages.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: 'absolute',
              bottom: 100,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 15,
              lineHeight: 1.6,
              textAlign: 'center',
              color: 'rgba(255,255,255,0.7)',
              textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            {lang === 'fa'
              ? 'سلام 👋 چه چیزی می‌خواهی تماشا کنی؟'
              : 'Hi 👋 What do you want to watch?'}
          </motion.div>
        )}

        {/* FLOATING MESSAGES — last 4 as subtitle overlays */}
        {messages.length > 0 && (
          <div
            style={{
              position: 'absolute',
              bottom: 96,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'auto',
              maxWidth: '80%',
              maxHeight: 'calc(100vh - 240px)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              pointerEvents: 'none',
            }}
            className="hide-scrollbar"
          >
            {messages.slice(-4).map((msg, idx) => {
              const isUser = msg.role === 'user'
              const realIdx = messages.length - 4 + idx
              return (
                <motion.div
                  key={`${msg.role}-${realIdx}`}
                  variants={messageVar}
                  initial="hidden"
                  animate="visible"
                  style={{
                    fontSize: 15,
                    lineHeight: 1.5,
                    textAlign: 'center',
                    whiteSpace: 'pre-wrap',
                    color: isUser ? 'rgba(200, 180, 255, 0.85)' : 'rgba(255, 255, 255, 0.9)',
                    textShadow: '0 2px 16px rgba(0,0,0,0.7), 0 0 8px rgba(0,0,0,0.4)',
                    padding: '2px 0',
                  }}
                >
                  {stripCJK(msg.content)}
                </motion.div>
              )
            })}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ paddingTop: 4 }}
              >
                <TypingDots />
              </motion.div>
            )}
          </div>
        )}

        {/* FLOATING RESULTS — circular cards row */}
        {lastResults && (
          <div
            style={{
              position: 'absolute',
              bottom: 140,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 12,
              overflowX: 'auto',
              padding: '4px 16px',
              maxWidth: '100%',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              justifyContent: 'center',
              pointerEvents: 'auto',
            }}
            className="hide-scrollbar"
          >
            {lastResults.slice(0, 8).map((item) => (
              <CircularCard key={item.id} item={item} onClick={handleResultClick} />
            ))}
          </div>
        )}

        {/* INPUT BAR — glass bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: 560,
            width: 'calc(100% - 40px)',
            pointerEvents: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 8,
              background: 'rgba(15, 15, 30, 0.5)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 28,
              padding: '8px 8px 8px 16px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
            }}
          >
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder={lang === 'fa' ? 'پیام خود را بنویسید...' : 'Type your message...'}
              className="search-input"
              style={{
                flex: 1,
                background: 'transparent',
                color: '#fff',
                fontSize: 14,
                border: 'none',
                outline: 'none',
                resize: 'none',
                padding: '6px 0',
                maxHeight: 96,
                lineHeight: 1.5,
                fontFamily: 'inherit',
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!inputText.trim() || isLoading}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: inputText.trim() && !isLoading ? '#7c3aed' : 'rgba(124, 58, 237, 0.2)',
                color: inputText.trim() && !isLoading ? '#fff' : 'rgba(255,255,255,0.2)',
                cursor: inputText.trim() && !isLoading ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
                flexShrink: 0,
                fontSize: 16,
              }}
            >
              ➤
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
