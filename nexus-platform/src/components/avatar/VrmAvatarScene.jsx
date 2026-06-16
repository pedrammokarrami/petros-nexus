import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { VRMLoaderPlugin } from '@pixiv/three-vrm'
import * as THREE from 'three'

const MOUTH_VISEMES = ['aa', 'ih', 'ou', 'ee', 'oh']
const DEG = Math.PI / 180

// ========================
// CAMERA CONTROLLER
// ========================
function CameraController({ vrm }) {
  const { camera } = useThree()
  const controls = useThree((s) => s.controls)

  useEffect(() => {
    if (!vrm) return
    const headBone = vrm.humanoid?.getRawBoneNode('head')
    if (headBone) {
      const headPos = new THREE.Vector3()
      headBone.getWorldPosition(headPos)
      camera.position.set(0, headPos.y, 3.5)

      if (controls) {
        controls.target.copy(headPos)
        controls.minDistance = 2.5
        controls.update()
      }
    }
  }, [vrm, camera, controls])
  return null
}

// ========================
// FLOATING PARTICLES — Cinema (Video mode)
// ========================
function FloatingParticles() {
  const ref = useRef()
  const count = 80
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 5
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array
    const t = state.clock.elapsedTime
    for (let i = 0; i < pos.length; i += 3) {
      pos[i] += Math.sin(t * 0.2 + i * 0.3) * 0.0008
      pos[i + 1] += Math.sin(t * 0.3 + i * 0.5) * 0.0008
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#aaccff" transparent opacity={0.35} sizeAttenuation depthWrite={false} />
    </points>
  )
}

// ========================
// ENVIRONMENT LIGHTS
// ========================
const LIGHT_CINEMA = {
  ambient: { intensity: 0.2, color: '#1a1a3e' },
  hemi: { sky: '#ffd4a0', ground: '#334488', intensity: 0.5 },
  key: { pos: [2, 3, 2], angle: 0.35, penumbra: 0.5, intensity: 2.0, color: '#ffcc88' },
  fill: { pos: [-2, 1.5, 2], intensity: 0.6, color: '#6699ff' },
  back: { pos: [0, 0.5, -2], intensity: 0.3, color: '#334488' },
}

const LIGHT_STUDIO = {
  ambient: { intensity: 0.3, color: '#2a1040' },
  hemi: { sky: '#cc88ff', ground: '#0a0a20', intensity: 0.3 },
  rim1: { pos: [2.5, 2, 2], intensity: 1.0, color: '#cc44ff' },
  rim2: { pos: [-2.5, 1, 2], intensity: 0.8, color: '#44aaff' },
  rim3: { pos: [0, -0.5, 3], intensity: 0.6, color: '#ff44aa' },
}

function EnvironmentLights({ mode }) {
  const rim1Ref = useRef()
  const rim2Ref = useRef()
  const keyRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (mode === 'audio') {
      if (rim1Ref.current) {
        const hue = 0.72 + Math.sin(t * 0.2) * 0.12
        rim1Ref.current.color.setHSL(hue, 0.8, 0.5)
        rim1Ref.current.intensity = 1.0 + Math.sin(t * 0.5) * 0.4
      }
      if (rim2Ref.current) {
        const hue = 0.55 + Math.sin(t * 0.25 + 2) * 0.1
        rim2Ref.current.color.setHSL(hue, 0.7, 0.5)
        rim2Ref.current.intensity = 0.8 + Math.sin(t * 0.4 + 1) * 0.3
      }
    }
    if (mode === 'video' && keyRef.current) {
      keyRef.current.intensity = 2.0 + Math.sin(t * 3.7) * 0.08
    }
  })

  if (mode === 'video') {
    const { ambient, hemi, key, fill, back } = LIGHT_CINEMA
    return (
      <>
        <ambientLight intensity={ambient.intensity} color={ambient.color} />
        <hemisphereLight args={[hemi.sky, hemi.ground, hemi.intensity]} />
        <spotLight ref={keyRef} position={key.pos} angle={key.angle} penumbra={key.penumbra} intensity={key.intensity} color={key.color} />
        <pointLight position={fill.pos} intensity={fill.intensity} color={fill.color} />
        <pointLight position={back.pos} intensity={back.intensity} color={back.color} />
      </>
    )
  }

  const { ambient, hemi, rim1, rim2, rim3 } = LIGHT_STUDIO
  return (
    <>
      <ambientLight intensity={ambient.intensity} color={ambient.color} />
      <hemisphereLight args={[hemi.sky, hemi.ground, hemi.intensity]} />
      <pointLight ref={rim1Ref} position={rim1.pos} intensity={rim1.intensity} color={rim1.color} />
      <pointLight ref={rim2Ref} position={rim2.pos} intensity={rim2.intensity} color={rim2.color} />
      <pointLight position={rim3.pos} intensity={rim3.intensity} color={rim3.color} />
    </>
  )
}

// ========================
// EQUALIZER BARS (CSS, Audio mode)
// ========================
function EqualizerBars({ active }) {
  const [bars, setBars] = useState(() => Array.from({ length: 24 }, (_, i) => ({
    id: i, height: 4 + Math.random() * 8,
  })))

  useEffect(() => {
    if (!active) return
    const id = setInterval(() => {
      setBars((prev) =>
        prev.map((b) => ({ ...b, height: 4 + Math.random() * 28 }))
      )
    }, 120)
    return () => clearInterval(id)
  }, [active])

  if (!active) return null

  return (
    <div
      style={{
        position: 'absolute', bottom: 6, left: 12, right: 12,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        gap: 3, height: 28, zIndex: 15, pointerEvents: 'none',
      }}
    >
      {bars.map((b) => (
        <div
          key={b.id}
          style={{
            width: 3, height: b.height, borderRadius: 2,
            background: `hsl(${270 + b.id * 3}, 75%, ${45 + b.height * 0.6}%)`,
            transition: 'height 0.1s ease',
          }}
        />
      ))}
    </div>
  )
}

// ========================
// WEBGL CONTEXT MONITOR
// ========================
function WebGLContextMonitor() {
  const { gl } = useThree()
  useEffect(() => {
    const canvas = gl.domElement
    const onLost = (e) => {
      e.preventDefault()
      console.warn('[WebGL] Context lost:', e)
    }
    const onRestored = () => console.log('[WebGL] Context restored')
    canvas.addEventListener('webglcontextlost', onLost)
    canvas.addEventListener('webglcontextrestored', onRestored)
    return () => {
      canvas.removeEventListener('webglcontextlost', onLost)
      canvas.removeEventListener('webglcontextrestored', onRestored)
    }
  }, [gl])
  return null
}

// ========================
// VRM MODEL — main avatar logic
// ========================
function VrmModel({ isSpeakingRef, expressionRef, lookTargetRef }) {
  const groupRef = useRef(null)
  const vrmRef = useRef(null)
  const [hasLoaded, setHasLoaded] = useState(false)
  const lipSyncRef = useRef({
    currentViseme: null, lastSwitchTime: 0, nextInterval: 100,
  })
  const expressionNamesRef = useRef([])
  const activeExpressionRef = useRef(null)
  const bonesRef = useRef({})
  const currentYawRef = useRef(0)
  const activePoseRef = useRef('idle')

  useEffect(() => {
    let cancelled = false
    const loader = new GLTFLoader()
    loader.register((parser) => new VRMLoaderPlugin(parser))

    loader.load(
      '/petros.vrm',
      (gltf) => {
        if (cancelled) return
        const vrm = gltf.userData.vrm
        const model = gltf.scene || gltf.scenes?.[0]
        if (!model) return

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        model.scale.setScalar(2.4)
        model.position.set(0, -1.25, 0)

        if (vrm.expressionManager) {
          const names = vrm.expressionManager.expressions.map(e => e.expressionName)
          expressionNamesRef.current = names
        }

        const boneMap = {
          head: vrm.humanoid?.getRawBoneNode('head'),
          neck: vrm.humanoid?.getRawBoneNode('neck'),
          spine: vrm.humanoid?.getRawBoneNode('spine'),
          hips: vrm.humanoid?.getRawBoneNode('hips'),
          leftUpperArm: vrm.humanoid?.getRawBoneNode('leftUpperArm'),
          rightUpperArm: vrm.humanoid?.getRawBoneNode('rightUpperArm'),
          leftLowerArm: vrm.humanoid?.getRawBoneNode('leftLowerArm'),
          rightLowerArm: vrm.humanoid?.getRawBoneNode('rightLowerArm'),
        }
        bonesRef.current = boneMap

        vrmRef.current = vrm
        groupRef.current?.add(model)
        setHasLoaded(true)
      },
      undefined,
      (error) => console.error('VRM load failed:', error),
    )

    return () => {
      cancelled = true
      try {
        vrmRef.current?.scene?.traverse((child) => {
          if (child.isMesh) {
            child.geometry?.dispose()
            const mat = child.material
            if (mat) {
              if (Array.isArray(mat)) {
                mat.forEach((m) => { m.dispose?.(); m.map?.dispose?.() })
              } else {
                mat.dispose?.()
                mat.map?.dispose?.()
              }
            }
          }
        })
      } catch (e) {
      }
      vrmRef.current = null
      groupRef.current = null
    }
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    const vrm = vrmRef.current
    if (!vrm) return

    // -- Static scale (no breathing) --
    groupRef.current.scale.setScalar(2.4)

    if (!vrm?.expressionManager) return

    const { head, neck, spine, hips, leftUpperArm, rightUpperArm } = bonesRef.current

    // --- Hardcoded arm rest poses (natural, not T-pose) ---
    if (leftUpperArm) {
      leftUpperArm.rotation.z = 0.1413
      leftUpperArm.rotation.x = 0
      leftUpperArm.rotation.y = 0
    }
    if (rightUpperArm) {
      rightUpperArm.rotation.z = -0.1413
      rightUpperArm.rotation.x = 0
      rightUpperArm.rotation.y = 0
    }

    const expressionNames = expressionNamesRef.current

    // --- Static rest pose (no animation offsets) ---
    if (head) {
      head.rotation.x = 0
      head.rotation.z = 0
      head.rotation.y = 0
    }
    if (neck) {
      neck.rotation.x = 0
      neck.rotation.z = 0
      neck.rotation.y = 0
    }
    if (spine) {
      spine.rotation.x = 0
      spine.rotation.y = 0
    }
    if (hips) {
      hips.rotation.x = 0
      hips.rotation.y = 0
      hips.rotation.z = 0
    }

    // --- Timed expression reaction ---
    const ae = activeExpressionRef.current
    const expRequest = expressionRef?.current
    if (expRequest && performance.now() < expRequest.until) {
      if (!ae || ae.name !== expRequest.name) {
        if (ae) vrm.expressionManager.setValue(ae.name, 0)
        if (expressionNames.includes(expRequest.name)) {
          vrm.expressionManager.setValue(expRequest.name, 1.0)
        }
        activeExpressionRef.current = { name: expRequest.name, until: expRequest.until }
      }
    } else if (ae && performance.now() >= ae.until) {
      vrm.expressionManager.setValue(ae.name, 0)
      activeExpressionRef.current = null
    }

    // --- Speaking / lip-sync ---
    if (isSpeakingRef?.current) {
      activePoseRef.current = 'active'
      const now = t * 1000
      const ls = lipSyncRef.current

      if (now - ls.lastSwitchTime > ls.nextInterval) {
        if (ls.currentViseme) vrm.expressionManager.setValue(ls.currentViseme, 0)
        const available = expressionNamesRef.current.filter((n) => MOUTH_VISEMES.includes(n))
        if (available.length > 0) {
          const next = available[Math.floor(Math.random() * available.length)]
          vrm.expressionManager.setValue(next, 0.6 + Math.random() * 0.4)
          ls.currentViseme = next
      }
      ls.lastSwitchTime = now
      ls.nextInterval = 80 + Math.random() * 70
    }
  } else {
      activePoseRef.current = 'idle'
      const ls = lipSyncRef.current
      if (ls.currentViseme) {
        vrm.expressionManager.setValue(ls.currentViseme, 0)
        ls.currentViseme = null
      }
    }

    vrm.expressionManager.update(delta)
  })

  return (
    <>
      <group ref={groupRef}>
        {!hasLoaded && (
          <mesh position={[0, -0.2, 0]}>
            <sphereGeometry args={[0.45, 32, 32]} />
            <meshStandardMaterial color="#7c3aed" emissive="#4c1d95" emissiveIntensity={0.25} />
          </mesh>
        )}
      </group>
      {hasLoaded && <CameraController vrm={vrmRef.current} />}
    </>
  )
}

// ========================
// MAIN EXPORT
// ========================
export default function VrmAvatarScene({ isSpeakingRef, expressionRef, mode = 'video', lookTargetRef, onModeToggle, onSendMessage }) {
  const [inputValue, setInputValue] = useState('')
  const bgStyle = useMemo(() => ({
    position: 'relative',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 24,
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'background 0.8s ease',
    background: mode === 'video'
      ? 'linear-gradient(160deg, #050510 0%, #0a0a2e 40%, #0d0d1a 100%)'
      : 'linear-gradient(160deg, #1a0510 0%, #2a0a30 40%, #0d0a1a 100%)',
  }), [mode])

  const vignetteStyle = useMemo(() => ({
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 2,
    transition: 'opacity 0.8s ease',
    opacity: mode === 'video' ? 0.6 : 0.4,
    background: mode === 'video'
      ? 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,10,0.6) 100%)'
      : 'radial-gradient(ellipse at 50% 80%, rgba(180,60,255,0.08) 0%, transparent 70%)',
  }), [mode])

  const filmStripStyle = useMemo(() => mode === 'video' ? {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 2,
    background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 3px, transparent 3px, transparent 7px)',
    zIndex: 15,
    pointerEvents: 'none',
  } : undefined, [mode])

  return (
    <div style={bgStyle}>
      <div style={vignetteStyle} />

      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        <Canvas
          camera={{ position: [0, 1.15, 4], fov: 48 }}
          shadows
          dpr={[1, 2]}
          gl={{ alpha: true }}
        >
          <EnvironmentLights mode={mode} />
          <WebGLContextMonitor />
          {mode === 'video' && <FloatingParticles />}
          <VrmModel
            isSpeakingRef={isSpeakingRef}
            expressionRef={expressionRef}
            lookTargetRef={lookTargetRef}
          />
        </Canvas>
      </div>

      <EqualizerBars active={mode === 'audio'} />
      {mode === 'video' && <div style={filmStripStyle} />}

      <div
        style={{
          position: 'absolute',
          left: 16,
          top: 16,
          zIndex: 20,
          borderRadius: 999,
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(0,0,0,0.35)',
          padding: '4px 12px',
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.35em',
          color: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        VRM Avatar
      </div>

      <div
        style={{
          position: 'absolute',
          right: 16,
          top: 16,
          zIndex: 100,
          display: 'flex',
          gap: 6,
        }}
      >
        {['audio', 'video'].map((m) => (
          <button
            key={m}
            onClick={() => onModeToggle?.(m)}
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.15)',
              background: mode === m ? 'rgba(124,58,237,0.6)' : 'rgba(0,0,0,0.35)',
              color: 'rgba(255,255,255,0.9)',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              transition: 'all 0.2s ease',
            }}
          >
            {m === 'audio' ? 'صوتی' : 'تصویری'}
          </button>
        ))}
      </div>

      <div
        style={{
          position: 'fixed',
          left: '50%',
          bottom: 70,
          transform: 'translateX(-50%)',
          zIndex: 100,
          width: 'calc(100% - 32px)',
          maxWidth: 680,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 10,
            background: 'rgba(15, 15, 35, 0.75)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: '8px 12px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && inputValue.trim() && onSendMessage?.(inputValue.trim()) && setInputValue('')}
            placeholder="پیام خود را بنویسید..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              color: '#fff',
              fontSize: 15,
              fontFamily: 'inherit',
              '&::placeholder': { color: 'rgba(255,255,255,0.4)' },
            }}
          />
          <button
            onClick={() => inputValue.trim() && onSendMessage?.(inputValue.trim()) && setInputValue('')}
            disabled={!inputValue.trim()}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: 'none',
              background: inputValue.trim() ? 'linear-gradient(135deg, #7c3aed, #a855f7)' : 'rgba(255,255,255,0.1)',
              color: '#fff',
              cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              opacity: inputValue.trim() ? 1 : 0.5,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
