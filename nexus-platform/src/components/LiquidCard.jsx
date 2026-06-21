import React, { useState } from 'react'
import './LiquidCard.css'

export default function LiquidCard({ icon, label, color, onClick }) {
  const [isPressed, setIsPressed] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = (e.clientY - centerY) / 10
    const y = (centerX - e.clientX) / 10
    setTilt({ x, y })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const handleClick = () => {
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 400)
    onClick()
  }

  return (
    <button
      className={`liquid-card circular liquid-${color} ${isPressed ? 'pressed' : ''}`}
      onClick={handleClick}
      onTouchEnd={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1)`,
      }}
    >
      <div className="liquid-bg"></div>
      <div className="liquid-glow"></div>
      <div className="liquid-content">
        <div className="liquid-icon">{icon}</div>
        <p className="liquid-label">{label}</p>
      </div>
    </button>
  )
}
