import { useMemo, useState, useEffect } from 'react'
import Lottie from 'lottie-react'

let idleAnimation = null

async function loadAnimation() {
  try {
    const res = await fetch('/lottie-idle.json')
    if (res.ok) {
      idleAnimation = await res.json()
    }
  } catch (e) {
    console.warn('Failed to load idle animation:', e)
  }
}

loadAnimation()

export default function LottieAvatar({ state = 'idle' }) {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    setOpacity(0)
    const timer = setTimeout(() => {
      setOpacity(1)
    }, 150)
    return () => clearTimeout(timer)
  }, [state])

  const containerStyle = useMemo(() => ({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  }), [])

  const lottieStyle = useMemo(() => ({
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    opacity,
    transition: 'opacity 0.3s ease',
  }), [opacity])

  const speed = state === 'talking' ? 1.5 : state === 'thinking' ? 0.8 : 1
  const loop = state !== 'happy'

  return (
    <div style={containerStyle}>
      {idleAnimation && (
        <Lottie
          animationData={idleAnimation}
          style={lottieStyle}
          loop={loop}
          speed={speed}
        />
      )}
    </div>
  )
}