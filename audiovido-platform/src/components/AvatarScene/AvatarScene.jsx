import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

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
  const currentActionRef = useRef(null)
  const currentStateNameRef = useRef('idle')
  const modelRef = useRef(null)
  const pulseLightRef = useRef(null)
  const talkingTimerRef = useRef(null)
  const isTalkingRef = useRef(false)
  const animFrameIdRef = useRef(null)

  function playAction(name, loop = false) {
    const next = actionsRef.current[name]
    if (!next) {
      console.warn('[Avatar] Missing action:', name)
      return
    }

    const current = currentActionRef.current

    if (current === next && next.isRunning()) return

    Object.values(actionsRef.current).forEach(a => {
      if (a && a !== next) {
        a.fadeOut(0.2)
        setTimeout(() => a.stop(), 200)
      }
    })

    next.reset()
    next.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce)
    next.clampWhenFinished = !loop
    next.fadeIn(0.2)
    next.play()

    currentActionRef.current = next
    currentStateNameRef.current = name
    console.log('[Avatar] → Playing:', name, loop ? 'loop' : 'once')
  }

  function animatePosition(from, to, duration, onComplete) {
    if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current)
    const start = performance.now()

    function tick() {
      const elapsed = performance.now() - start
      const t = Math.min(elapsed / duration, 1)
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      if (modelRef.current) modelRef.current.position.x = from + (to - from) * ease
      if (t < 1) {
        animFrameIdRef.current = requestAnimationFrame(tick)
      } else {
        if (modelRef.current) modelRef.current.position.x = to
        animFrameIdRef.current = null
        if (onComplete) onComplete()
      }
    }

    animFrameIdRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const [baseModel, idleFbx, talkingFbx, walkingFbx, stopWalkingFbx] = await Promise.all([
          loadFbx('/avatars/Walking_Sophie.fbx'),
          loadFbx('/avatars/Idle.fbx'),
          loadFbx('/avatars/Talking_Sophie.fbx'),
          loadFbx('/avatars/Walking.fbx'),
          loadFbx('/avatars/Stop_Walking.fbx'),
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

        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3())
        const height = size.y || 1
        const targetHeight = 1.6
        const scale = targetHeight / height
        model.scale.setScalar(scale)

        box.setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        model.position.set(0, -center.y + 0.1, 0)

        camera.lookAt(0, 0.8, 0)

        const mixer = new THREE.AnimationMixer(model)
        mixerRef.current = mixer

        const animFiles = [
          { key: 'idle', fbx: idleFbx, loop: true },
          { key: 'talking', fbx: talkingFbx, loop: true },
          { key: 'walking_out', fbx: walkingFbx, loop: false },
          { key: 'returning', fbx: stopWalkingFbx, loop: false },
        ]

        animFiles.forEach(({ key, fbx, loop }) => {
          if (fbx.animations.length > 0) {
            const clip = fbx.animations[0]
            const action = mixer.clipAction(clip)
            action.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce)
            action.clampWhenFinished = !loop
            actionsRef.current[key] = action
          }
        })

        console.log('[Animations loaded]',
          animFiles.map(a => a.key + ': ' + (a.fbx.animations[0]?.name || 'none')))
        console.log('[Talking clips]',
          talkingFbx.animations.map(a => a.name + ' dur:' + a.duration.toFixed(2)))

        mixer.stopAllAction()

        requestAnimationFrame(() => {
          playAction('idle', true)
          setLoaded(true)
        })
      } catch (err) {
        console.error('[AvatarScene] FBX load failed:', err)
      }
    })()
    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFrame((state, delta) => {
    if (mixerRef.current) mixerRef.current.update(delta)

    const t = state.clock.elapsedTime
    const wanted = stateRef.current

    if (wanted !== currentStateNameRef.current) {
      currentStateNameRef.current = wanted

      if (wanted === 'idle') {
        if (talkingTimerRef.current) clearTimeout(talkingTimerRef.current)
        isTalkingRef.current = false
        playAction('idle', true)

      } else if (wanted === 'talking') {
        if (isTalkingRef.current) return
        isTalkingRef.current = true
        playAction('idle', true)
        if (talkingTimerRef.current) clearTimeout(talkingTimerRef.current)
        talkingTimerRef.current = setTimeout(() => {
          isTalkingRef.current = false
          stateRef.current = 'idle'
          currentStateNameRef.current = 'idle'
          playAction('idle', true)
        }, 4000)

      } else if (wanted === 'walking_out') {
        playAction('walking_out', false)
        const fromX = modelRef.current?.position.x || 0
        animatePosition(fromX, -0.55, 1000, () => {
          playAction('idle', true)
        })

      } else if (wanted === 'returning') {
        playAction('returning', false)
        const fromX = modelRef.current?.position.x || -0.55
        animatePosition(fromX, 0, 900, () => {
          stateRef.current = 'idle'
          currentStateNameRef.current = 'idle'
          playAction('idle', true)
        })
      }
    }

    if (pulseLightRef.current) {
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
      console.log(`[Avatar] setAnimationState: ${state}`)
      const key = state.toUpperCase()
      if (ANIM_STATES[key]) {
        stateRef.current = ANIM_STATES[key]
      }
    },
    setIdle() { stateRef.current = 'idle' },
    setTalking() { stateRef.current = 'talking' },
    setWalkingOut() { stateRef.current = 'walking_out' },
    setReturning() { stateRef.current = 'returning' },
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
        camera={{ fov: 55, position: [0, 1.0, 2.8], near: 0.1, far: 100 }}
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
