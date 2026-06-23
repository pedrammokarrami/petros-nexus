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
    avatarRef.current?.setAnimationState('IDLE')
  }, [])

  const setTalking = useCallback(() => {
    setCurrentState('talking')
    avatarRef.current?.setAnimationState('TALKING')
  }, [])

  const setWalkingOut = useCallback(() => {
    setCurrentState('walking_out')
    avatarRef.current?.setAnimationState('WALKING_OUT')
  }, [])

  const setReturning = useCallback(() => {
    setCurrentState('returning')
    avatarRef.current?.setAnimationState('RETURNING')
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
