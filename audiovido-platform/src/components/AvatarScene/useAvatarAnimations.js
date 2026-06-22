import { useRef, useCallback, useState } from 'react'

const STATE = {
  IDLE: 'idle',
  TALKING: 'talking',
  WALKING_OUT: 'walking_out',
  RETURNING: 'returning',
}

export default function useAvatarAnimations() {
  const avatarRef = useRef(null)
  const [currentState, setCurrentState] = useState('idle')

  const setIdle = useCallback(() => {
    setCurrentState('idle')
    avatarRef.current?.setAnimationState('idle')
  }, [])

  const setTalking = useCallback(() => {
    setCurrentState('talking')
    avatarRef.current?.setAnimationState('talking')
  }, [])

  const setWalkingOut = useCallback(() => {
    setCurrentState('walking_out')
    avatarRef.current?.setAnimationState('walking_out')
  }, [])

  const setReturning = useCallback(() => {
    setCurrentState('returning')
    avatarRef.current?.setAnimationState('returning')
  }, [])

  return {
    avatarRef,
    currentState,
    setIdle,
    setTalking,
    setWalkingOut,
    setReturning,
    STATE,
  }
}
