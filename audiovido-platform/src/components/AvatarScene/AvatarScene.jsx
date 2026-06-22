import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

import WalkingSophieUrl from '../../assets/avatars/Walking_Sophie.fbx'
import TalkingSophieUrl from '../../assets/avatars/Talking_Sophie.fbx'
import WalkingUrl from '../../assets/avatars/Walking.fbx'
import StopWalkingUrl from '../../assets/avatars/Stop_Walking.fbx'

const ANIM_STATES = {
  IDLE: 'idle',
  TALKING: 'talking',
  WALKING_OUT: 'walking_out',
  RETURNING: 'returning',
}

function loadFbx(url) {
  return new Promise((resolve, reject) => {
    const loader = new FBXLoader()
    loader.load(url, resolve, undefined, reject)
  })
}

function SceneContent({ stateRef }) {
  const { gl } = useThree()
  const groupRef = useRef(null)
  const mixerRef = useRef(null)
  const actionsRef = useRef({})
  const currentAnimRef = useRef('idle')
  const modelRef = useRef(null)
  const pulseLightRef = useRef(null)
  const animPosRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const [baseModel, talkingFbx, walkingFbx, stopWalkingFbx] = await Promise.all([
          loadFbx(WalkingSophieUrl),
          loadFbx(TalkingSophieUrl),
          loadFbx(WalkingUrl),
          loadFbx(StopWalkingUrl),
        ])
        if (cancelled || !groupRef.current) return

        const model = baseModel
        modelRef.current = model
        groupRef.current.add(model)

        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3())
        const height = size.y
        const vh = gl.domElement.clientHeight
        const scale = Math.min((vh * 0.8) / height, 2.5)
        model.scale.setScalar(scale)
        model.position.y = -(height * 0.5) * scale * 0.35

        const mixer = new THREE.AnimationMixer(model)
        mixerRef.current = mixer

        const clips = {
          idle: baseModel.animations[0],
          talking: talkingFbx.animations[0],
          walking: walkingFbx.animations[0],
          returning: stopWalkingFbx.animations[0],
        }

        if (clips.idle) {
          const a = mixer.clipAction(clips.idle)
          a.setLoop(THREE.LoopRepeat)
          a.timeScale = 0.2
          a.setEffectiveWeight(0.3)
          a.play()
          actionsRef.current.idle = a
        }
        if (clips.talking) {
          const a = mixer.clipAction(clips.talking)
          a.setLoop(THREE.LoopRepeat)
          a.timeScale = 1.0
          actionsRef.current.talking = a
        }
        if (clips.walking) {
          const a = mixer.clipAction(clips.walking)
          a.setLoop(THREE.LoopOnce)
          a.clampWhenFinished = true
          actionsRef.current.walking = a
        }
        if (clips.returning) {
          const a = mixer.clipAction(clips.returning)
          a.setLoop(THREE.LoopOnce)
          a.clampWhenFinished = true
          actionsRef.current.returning = a
        }
      } catch (err) {
        console.error('[AvatarScene] FBX load failed:', err)
      }
    })()
    return () => { cancelled = true }
  }, [gl])

  useFrame((state, delta) => {
    if (mixerRef.current) mixerRef.current.update(delta)

    // State transition handling
    const wanted = stateRef.current
    if (wanted !== currentAnimRef.current) {
      const prev = actionsRef.current[currentAnimRef.current]
      const next = actionsRef.current[wanted]

      if (prev && next && prev !== next) {
        next.reset()
        next.setLoop(
          wanted === 'walking_out' || wanted === 'returning'
            ? THREE.LoopOnce
            : THREE.LoopRepeat
        )
        if (wanted === 'walking_out' || wanted === 'returning') {
          next.clampWhenFinished = true
        }
        if (wanted === 'idle') {
          next.setEffectiveWeight(0.3)
          next.timeScale = 0.2
        } else if (wanted === 'talking') {
          next.timeScale = 1.0
          next.setEffectiveWeight(1.0)
        }
        next.play()
        prev.crossFadeTo(next, 0.3, true)
      } else if (next && !prev) {
        next.reset().play()
      }

      if (wanted === 'walking_out') {
        animPosRef.current = {
          startTime: state.clock.elapsedTime,
          from: modelRef.current?.position.x || 0,
          to: 2,
          duration: 1.2,
        }
      } else if (wanted === 'returning') {
        animPosRef.current = {
          startTime: state.clock.elapsedTime,
          from: modelRef.current?.position.x || 2,
          to: 0,
          duration: 1.0,
        }
      }

      currentAnimRef.current = wanted
    }

    // Position animation
    if (animPosRef.current && modelRef.current) {
      const ap = animPosRef.current
      const progress = Math.min(
        (state.clock.elapsedTime - ap.startTime) / ap.duration,
        1
      )
      const eased = 1 - Math.pow(1 - progress, 3)
      modelRef.current.position.x = ap.from + (ap.to - ap.from) * eased
      if (progress >= 1) animPosRef.current = null
    }

    // Pulsing glow
    if (pulseLightRef.current) {
      const t = state.clock.elapsedTime
      pulseLightRef.current.intensity = 0.4 + Math.sin(t * 2) * 0.15
    }
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 2]} intensity={0.8} />
      <pointLight
        ref={pulseLightRef}
        position={[0, 0.5, 0.5]}
        intensity={0.4}
        color="#00e5ff"
      />
      <group ref={groupRef} />
    </>
  )
}

const AvatarScene = forwardRef(function AvatarScene({ style }, ref) {
  const stateRef = useRef('idle')

  useImperativeHandle(ref, () => ({
    setAnimationState(state) {
      if (ANIM_STATES[state.toUpperCase()]) {
        stateRef.current = state
      }
    },
  }))

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: 'transparent',
        ...style,
      }}
    >
      <Canvas
        camera={{ fov: 45, position: [0, 0, 3], near: 0.1, far: 100 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearAlpha(0)
          gl.setClearColor(0x000000, 0)
        }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%' }}
      >
        <SceneContent stateRef={stateRef} />
      </Canvas>
    </div>
  )
})

export default AvatarScene
