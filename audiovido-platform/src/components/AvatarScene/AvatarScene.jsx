import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

const WalkingSophieUrl = '/avatars/Walking_Sophie.fbx'
const TalkingSophieUrl = '/avatars/Talking_Sophie.fbx'
const WalkingUrl = '/avatars/Walking.fbx'
const StopWalkingUrl = '/avatars/Stop_Walking.fbx'

const ANIM_STATES = {
  IDLE: 'idle',
  TALKING: 'talking',
  WALKING_OUT: 'walking_out',
  RETURNING: 'returning',
}

function loadFbx(url) {
  return new Promise((resolve, reject) => {
    const loader = new FBXLoader()
    const originalWarn = console.warn
    console.warn = (...args) => {
      if (typeof args[0] === 'string' && args[0].includes('FBXLoader')) return
      originalWarn(...args)
    }
    loader.load(url,
      (result) => {
        console.warn = originalWarn
        resolve(result)
      },
      undefined,
      (err) => {
        console.warn = originalWarn
        reject(err)
      }
    )
  })
}

function CameraController() {
  const { camera } = useThree()
  useEffect(() => {
    camera.lookAt(0, 0.8, 0)
  }, [camera])
  return null
}

function LoadingPlaceholder() {
  const meshRef = useRef()
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })
  return (
    <mesh ref={meshRef} position={[0, 0.8, 0]}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial color="#7c3aed" emissive="#4c1d95" emissiveIntensity={0.3} />
    </mesh>
  )
}

function SceneContent({ stateRef }) {
  const { camera } = useThree()
  const [loaded, setLoaded] = useState(false)
  const groupRef = useRef(null)
  const mixerRef = useRef(null)
  const actionsRef = useRef({})
  const currentAnimRef = useRef('idle')
  const modelRef = useRef(null)
  const pulseLightRef = useRef(null)
  const animPosRef = useRef(null)
  const spineRef = useRef(null)

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

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        const spineBone = model.getObjectByName('mixamorig:Spine') || model.getObjectByName('Spine')
        if (spineBone) spineRef.current = spineBone

        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3())
        const height = size.y || 1

        const targetHeight = 2.0
        const scale = targetHeight / height

        model.scale.setScalar(scale)

        box.setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        model.position.set(0, -center.y, 0)

        camera.lookAt(0, 0.8, 0)

        const mixer = new THREE.AnimationMixer(model)
        mixerRef.current = mixer

        const clips = {
          talking: talkingFbx.animations[0],
          walking: walkingFbx.animations[0],
          returning: stopWalkingFbx.animations[0],
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

        setLoaded(true)
      } catch (err) {
        console.error('[AvatarScene] FBX load failed:', err)
      }
    })()
    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFrame((state, delta) => {
    if (mixerRef.current) mixerRef.current.update(delta)

    // Procedural idle breathing
    if (currentAnimRef.current === 'idle' && spineRef.current) {
      const t = state.clock.elapsedTime
      spineRef.current.rotation.z = Math.sin(t * 0.8) * 0.012
      spineRef.current.rotation.x = Math.sin(t * 0.6) * 0.008
    }

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
        next.setEffectiveWeight(1.0)
        next.timeScale = 1.0
        next.play()
        prev.crossFadeTo(next, 0.3, true)
      } else if (next && !prev) {
        next.reset().play()
      }

      if (wanted === 'walking_out') {
        animPosRef.current = {
          startTime: state.clock.elapsedTime,
          from: modelRef.current?.position.x || 0,
          to: -0.8,
          duration: 1.2,
        }
      } else if (wanted === 'returning') {
        animPosRef.current = {
          startTime: state.clock.elapsedTime,
          from: modelRef.current?.position.x || -0.8,
          to: 0,
          duration: 1.0,
        }
      }

      if (spineRef.current) {
        spineRef.current.rotation.z = 0
        spineRef.current.rotation.x = 0
      }

      currentAnimRef.current = wanted
    }

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

    if (pulseLightRef.current) {
      const t = state.clock.elapsedTime
      pulseLightRef.current.intensity = 0.4 + Math.sin(t * 2) * 0.15
    }
  })

  return (
    <>
      <CameraController />
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 2]} intensity={0.8} />
      <pointLight
        ref={pulseLightRef}
        position={[0, 0.5, 0.5]}
        intensity={0.4}
        color="#00e5ff"
      />
      {!loaded && <LoadingPlaceholder />}
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
        camera={{ fov: 45, position: [0, 0.5, 3.5], near: 0.1, far: 100 }}
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
