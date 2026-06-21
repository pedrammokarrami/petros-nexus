import { useState, useRef, useCallback } from 'react'
import { MessageCircle, UserPlus, X } from 'lucide-react'
import { GlowAvatar } from '../../components/GlowAvatar'
import { Pill } from '../../components/Pill'

export function DiscoverDeck({ suggestions, onSkip, onAddFriend, onMessage }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [exitDir, setExitDir] = useState(null)
  const dragStart = useRef({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const current = suggestions[currentIndex]
  const total = suggestions.length

  const handleSwipe = useCallback((dir) => {
    setExitDir(dir)
    setTimeout(() => {
      if (dir === 'right') onAddFriend(current)
      else onSkip(current)
      setCurrentIndex(prev => Math.min(prev + 1, total - 1))
      setExitDir(null)
      setDragX(0)
      setDragY(0)
    }, 300)
  }, [current, onAddFriend, onSkip, total])

  const handlePointerDown = useCallback((e) => {
    const p = e.touches ? e.touches[0] : e
    dragStart.current = { x: p.clientX, y: p.clientY }
    setIsDragging(true)
  }, [])

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return
    const p = e.touches ? e.touches[0] : e
    setDragX(p.clientX - dragStart.current.x)
    setDragY(p.clientY - dragStart.current.y)
  }, [isDragging])

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)
    if (Math.abs(dragX) > 80) {
      handleSwipe(dragX > 0 ? 'right' : 'left')
    } else {
      setDragX(0)
      setDragY(0)
    }
  }, [isDragging, dragX, handleSwipe])

  if (!current) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          padding: '60px 24px',
          color: 'var(--fnd-text-dim)',
        }}
      >
        <div style={{ fontSize: 'var(--fnd-fs-24)' }}>✨</div>
        <div style={{ fontSize: 'var(--fnd-fs-16)', fontWeight: 500 }}>All caught up!</div>
        <div style={{ fontSize: 'var(--fnd-fs-14)', color: 'var(--fnd-text-muted)' }}>New suggestions coming soon</div>
      </div>
    )
  }

  const rot = dragX * 0.05
  const opacity = 1 - Math.min(Math.abs(dragX) / 500, 0.4)

  return (
    <div
      className="fnd-discover-deck"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
        padding: '16px 0',
        userSelect: 'none',
      }}
    >
      <div style={{ fontSize: 'var(--fnd-fs-13)', color: 'var(--fnd-text-muted)', fontFamily: 'var(--fnd-font-mono)' }}>
        {currentIndex + 1} / {total}
      </div>

      <div
        ref={cardRef}
        className={`fnd-discover-card ${exitDir ? `fnd-swipe-${exitDir}` : ''}`}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        style={{
          width: 'calc(100vw - 40px)',
          maxWidth: 420,
          aspectRatio: '3 / 4',
          borderRadius: 'var(--fnd-radius-xl)',
          background: 'var(--fnd-bg-surface)',
          border: '1px solid var(--fnd-border-strong)',
          overflow: 'hidden',
          position: 'relative',
          cursor: 'grab',
          transform: exitDir
            ? (exitDir === 'left' ? 'translateX(-150vw) rotateZ(-20deg)' : 'translateX(150vw) rotateZ(20deg)')
            : `translateX(${dragX}px) rotateZ(${rot}deg)`,
          opacity: exitDir ? 0 : opacity,
          transition: isDragging || exitDir ? 'none' : 'transform 0.3s ease, opacity 0.3s ease',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            height: '100%',
            padding: 24,
            textAlign: 'center',
          }}
        >
          <GlowAvatar src={current.avatar} name={current.name} isOnline={current.isOnline} size="xl" />
          <div>
            <div style={{ fontSize: 'var(--fnd-fs-24)', fontWeight: 700, color: 'var(--fnd-text-hi)' }}>
              {current.name}
            </div>
            {current.bio && (
              <div style={{ fontSize: 'var(--fnd-fs-14)', color: 'var(--fnd-text-dim)', marginTop: 4, maxWidth: 280 }}>
                {current.bio}
              </div>
            )}
          </div>

          {current.compatibility != null && (
            <div
              style={{
                fontSize: 'var(--fnd-fs-32)',
                fontWeight: 800,
                fontFamily: 'var(--fnd-font-mono)',
                color: current.compatibility >= 80 ? 'var(--fnd-accent)' : 'var(--fnd-cyan-400)',
              }}
            >
              {current.compatibility}%
            </div>
          )}

          <div
            style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {current.stats?.music != null && <Pill label="Music" value={`${current.stats.music}%`} color="var(--fnd-purple-400)" />}
            {current.stats?.cinema != null && <Pill label="Cinema" value={`${current.stats.cinema}%`} color="var(--fnd-coral-400)" />}
            {current.stats?.activity != null && <Pill label="Activity" value={`${current.stats.activity}%`} color="var(--fnd-amber-400)" />}
          </div>

          {Math.abs(dragX) > 40 && (
            <div
              style={{
                position: 'absolute',
                top: 24,
                [dragX > 0 ? 'right' : 'left']: 24,
                padding: '6px 14px',
                borderRadius: 'var(--fnd-radius-pill)',
                background: dragX > 0 ? 'color-mix(in oklab, var(--fnd-accent) 90%, transparent)' : 'color-mix(in oklab, var(--fnd-danger) 90%, transparent)',
                color: '#fff',
                fontSize: 'var(--fnd-fs-14)',
                fontWeight: 700,
                transform: 'rotateZ(-10deg)',
              }}
            >
              {dragX > 0 ? 'ADD' : 'SKIP'}
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 20,
          alignItems: 'center',
        }}
      >
        <button
          onClick={() => handleSwipe('left')}
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            border: '2px solid var(--fnd-border-soft)',
            background: 'var(--fnd-bg-surface-raised)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all var(--fnd-dur-fast) var(--fnd-ease-out)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'color-mix(in oklab, var(--fnd-danger) 20%, transparent)'; e.currentTarget.style.borderColor = 'var(--fnd-danger)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--fnd-bg-surface-raised)'; e.currentTarget.style.borderColor = 'var(--fnd-border-soft)' }}
        >
          <X size={24} color="var(--fnd-danger)" />
        </button>
        <button
          onClick={() => handleSwipe('right')}
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            border: '2px solid var(--fnd-accent)',
            background: 'color-mix(in oklab, var(--fnd-accent) 20%, transparent)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all var(--fnd-dur-fast) var(--fnd-ease-out)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'color-mix(in oklab, var(--fnd-accent) 40%, transparent)'; e.currentTarget.style.transform = 'scale(1.1)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'color-mix(in oklab, var(--fnd-accent) 20%, transparent)'; e.currentTarget.style.transform = 'scale(1)' }}
        >
          <UserPlus size={24} color="var(--fnd-accent)" />
        </button>
      </div>
    </div>
  )
}
