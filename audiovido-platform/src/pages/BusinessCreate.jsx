import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Check, ArrowLeft } from 'lucide-react'
import useBusinessStore from '../store/useBusinessStore'
import { generateHTML, CATEGORIES, CATEGORY_COLORS } from '../data/templates'

const QUESTIONS = [
  { key: 'name', label: "What's your business name?", type: 'text' },
  { key: 'category', label: "What's your business category?", type: 'select', options: CATEGORIES },
  { key: 'description', label: 'Tell me about your work in 1-2 sentences', type: 'text' },
  { key: 'social', label: "What's your primary social media or website?", type: 'text' },
  { key: 'email', label: "What's your contact email or phone?", type: 'text' },
  { key: 'color', label: "What's your main accent color preference?", type: 'color', options: ['#a78bfa', '#39b6ff', '#f97316', '#ef4444', '#fbbf24', '#22c55e', '#ec4899', '#14b8a6', '#8b5cf6'] },
  { key: 'features', label: "Any special features you'd like? (optional)", type: 'text', optional: true },
  { key: 'location', label: "What's your business location / city?", type: 'text' },
  { key: 'tagline', label: 'Do you have a tagline or bio?', type: 'text' },
  { key: 'notes', label: 'Any additional notes? (optional)', type: 'text', optional: true },
]

const COLORS = ['#a78bfa', '#39b6ff', '#f97316', '#ef4444', '#fbbf24', '#22c55e', '#ec4899', '#14b8a6', '#8b5cf6']

export default function BusinessCreate() {
  const navigate = useNavigate()
  const addBusiness = useBusinessStore((s) => s.addBusiness)
  const updateBusinessHTML = useBusinessStore((s) => s.updateBusinessHTML)

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [input, setInput] = useState('')
  const [done, setDone] = useState(false)
  const [createdBiz, setCreatedBiz] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const endRef = useRef(null)

  const total = QUESTIONS.length
  const current = QUESTIONS[step]
  const isLast = step >= total

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [step, done])

  const handleSubmit = () => {
    if (current?.type === 'select' || current?.type === 'color') {
      advance(input || current.options?.[0] || '')
    } else if (input.trim() || current?.optional) {
      advance(input.trim())
    }
  }

  const advance = (value) => {
    const key = current.key
    const newAnswers = { ...answers, [key]: value || answers[key] || '' }
    setAnswers(newAnswers)
    setInput('')

    if (step + 1 >= total) {
      setDone(true)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)

      const created = addBusiness(newAnswers)
      const bizId = created ? created.id : null

      const html = generateHTML({ ...newAnswers, templateUsed: created?.templateUsed || 'artist-musician' })
      if (bizId) updateBusinessHTML(bizId, html)

      setCreatedBiz({ ...newAnswers, id: bizId })
    } else {
      setStep(step + 1)
    }
  }

  const viewSite = () => {
    if (createdBiz?.id) navigate('/business/' + createdBiz.id)
  }

  return (
    <div style={{
      minHeight: '100dvh', background: '#0a0a0f',
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px',
        background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <button onClick={() => navigate(-1)} style={{
          width: 36, height: 36, display: 'grid', placeItems: 'center',
          borderRadius: 10, background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer',
        }}>
          <ArrowLeft size={18} color="rgba(255,255,255,0.7)" />
        </button>
        <Sparkles size={18} color="#FBBF24" />
        <span style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>Create Business</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 120px' }}>
        <div style={{ maxWidth: 430, margin: '0 auto' }}>
          {!isLast && !done && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12,
            }}>
              {Array.from({ length: total }).map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 3, borderRadius: 2,
                  background: i <= step ? '#FBBF24' : 'rgba(255,255,255,0.1)',
                  transition: 'background 0.3s',
                }} />
              ))}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {!isLast && !done && current && (
              <>
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 16, textAlign: 'center', marginTop: 20,
                }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 30%, #FBBF2488, #FBBF2433 60%, #0a0a0f 100%)',
                    display: 'grid', placeItems: 'center',
                    boxShadow: '0 0 40px rgba(251,191,36,0.2)',
                    animation: 'pulse-glow 2s ease-in-out infinite',
                  }}>
                    <Sparkles size={36} color="#FBBF24" />
                  </div>
                  <div style={{
                    background: 'rgba(251,191,36,0.1)',
                    border: '1px solid rgba(251,191,36,0.2)',
                    borderRadius: 16, padding: '14px 20px',
                    maxWidth: 320, fontSize: 15, color: '#e8edf2',
                    lineHeight: 1.5,
                  }}>
                    {current.label}
                    {current.optional && <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}> (optional)</span>}
                  </div>
                </div>

                <div style={{ marginTop: 8 }}>
                  {current.type === 'select' ? (
                    <div style={{
                      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
                    }}>
                      {current.options.map((opt) => {
                        const catColor = CATEGORY_COLORS[opt] || '#FBBF24'
                        return (
                          <button
                            key={opt}
                            onClick={() => { setInput(opt); advance(opt) }}
                            style={{
                              padding: '12px 8px', borderRadius: 12, border: '1px solid rgba(251,191,36,0.2)',
                              background: 'rgba(251,191,36,0.06)', cursor: 'pointer',
                              color: '#e8edf2', fontSize: 14, fontWeight: 600,
                              transition: 'all 0.15s',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = catColor; e.currentTarget.style.background = catColor + '18' }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(251,191,36,0.2)'; e.currentTarget.style.background = 'rgba(251,191,36,0.06)' }}
                          >
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  ) : current.type === 'color' ? (
                    <div style={{
                      display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center',
                    }}>
                      {current.options.map((c) => (
                        <button
                          key={c}
                          onClick={() => { setInput(c); advance(c) }}
                          style={{
                            width: 48, height: 48, borderRadius: '50%',
                            background: c, border: '3px solid ' + (answers.color === c ? '#fff' : 'transparent'),
                            cursor: 'pointer', boxShadow: answers.color === c ? `0 0 20px ${c}` : 'none',
                            transition: 'all 0.15s',
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} style={{ display: 'flex', gap: 8 }}>
                      <input
                        autoFocus
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={current.optional ? 'Type your answer (or skip)' : 'Type your answer...'}
                        style={{
                          flex: 1, padding: '14px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)',
                          background: 'rgba(255,255,255,0.04)', color: '#e8edf2', fontSize: 15, outline: 'none',
                        }}
                      />
                      <button type="submit" style={{
                        padding: '14px 20px', borderRadius: 12, border: 'none',
                        background: 'linear-gradient(135deg, #FBBF24, #F59E0B)',
                        color: '#000', fontWeight: 700, cursor: 'pointer', fontSize: 14,
                      }}>
                        Send
                      </button>
                    </form>
                  )}
                </div>
              </>
            )}

            {done && (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 24, padding: '40px 20px', textAlign: 'center',
              }}>
                {showConfetti && (
                  <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100 }}>
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div key={i} style={{
                        position: 'absolute', left: Math.random() * 100 + '%', top: -10,
                        width: 8, height: 8, borderRadius: '50%',
                        background: [FBBF24, '#F59E0B', '#a78bfa', '#39b6ff', '#22c55e'][i % 5],
                        animation: `fall ${2 + Math.random() * 3}s linear forwards`,
                        animationDelay: Math.random() * 2 + 's',
                        opacity: 0.8,
                      }} />
                    ))}
                    <style>{`
                      @keyframes fall { to { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
                      @keyframes pulse-glow { 0%,100% { box-shadow: 0 0 40px rgba(251,191,36,0.2); } 50% { box-shadow: 0 0 60px rgba(251,191,36,0.4); } }
                    `}</style>
                  </div>
                )}

                <div style={{
                  width: 100, height: 100, borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 30%, #22c55e88, #22c55e33 60%, #0a0a0f 100%)',
                  display: 'grid', placeItems: 'center',
                  boxShadow: '0 0 50px rgba(34,197,94,0.3)',
                }}>
                  <Check size={48} color="#22c55e" />
                </div>

                <div style={{ fontSize: 24, fontWeight: 800, color: '#e8edf2' }}>
                  Your website is ready! 🎉
                </div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', maxWidth: 300, lineHeight: 1.6 }}>
                  We've generated a custom website for {createdBiz?.name || 'your business'} using the {createdBiz?.category || 'selected'} template.
                </div>

                <div style={{
                  width: '100%', maxWidth: 280, height: 160, borderRadius: 16,
                  background: `linear-gradient(135deg, ${createdBiz?.color || '#a78bfa'}33, #0a0a0f 70%)`,
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: 8, position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                    background: `linear-gradient(90deg, ${createdBiz?.color || '#a78bfa'}, transparent)`,
                  }} />
                  <GlobeIcon size={32} style={{ opacity: 0.3 }} />
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>
                    {createdBiz?.name || 'My Business'}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button onClick={viewSite} style={{
                    padding: '14px 32px', borderRadius: 14, border: 'none', cursor: 'pointer',
                    background: 'linear-gradient(135deg, #FBBF24, #F59E0B)',
                    color: '#000', fontWeight: 800, fontSize: 15,
                    boxShadow: '0 0 30px rgba(251,191,36,0.3)',
                  }}>
                    View Site
                  </button>
                  <button onClick={() => navigate('/business')} style={{
                    padding: '14px 24px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
                    background: 'rgba(255,255,255,0.04)', color: '#e8edf2', fontWeight: 600, fontSize: 15,
                  }}>
                    Back to Hub
                  </button>
                </div>
              </div>
            )}
          </div>

          <div ref={endRef} />
        </div>
      </div>
    </div>
  )
}

function GlobeIcon({ size = 24, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={style}>
      <circle cx="12" cy="12" r="10" />
      <ellipse cx="12" cy="12" rx="4" ry="10" />
      <path d="M2 12h20" />
    </svg>
  )
}
