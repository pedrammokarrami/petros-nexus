import { useRef, useLayoutEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ListMusic, Users, Heart, Briefcase } from 'lucide-react'
import usePlayerStore from '../store/usePlayerStore'
import useHubPanelStore from '../store/useHubPanelStore'
import Live2DAvatar from '../components/avatar/Live2DAvatar'
import HubPanel from '../components/hub/HubPanel'
import PlaylistsPanel from '../components/hub/PlaylistsPanel'
import BusinessPanel from '../components/hub/BusinessPanel'
import FanClubsPanel from '../components/hub/FanClubsPanel'
import FriendsPanel from '../components/hub/FriendsPanel'


const COMPOSITION_RATIO = 0.92
const RING_RATIO = 0.42
const ORBIT_RATIO = 0.35
const BUTTON_RATIO = 0.18
const MAX_HUB_WIDTH = 430

const ANGLES_DEG = [-45, 45, 135, 225]

const BUTTON_DEFS = [
  { id: 'playlists', label: 'Playlists', route: '/playlists', icon: ListMusic, accent: '#A78BFA' },
  { id: 'clubs', label: 'Fan Clubs', route: '/clubs', icon: Users, accent: '#FB923C' },
  { id: 'friends', label: 'Friends', route: '/friends', icon: Heart, accent: '#4ADE80' },
  { id: 'business', label: 'Business', route: '/business', icon: Briefcase, accent: '#FBBF24' },
]

function computeLayout(hubWidth, hubHeight) {
  if (!hubWidth || !hubHeight) return null

  const compositionSize = Math.min(hubWidth, hubHeight) * COMPOSITION_RATIO
  const ringDiameter = compositionSize * RING_RATIO
  const orbitRadius = compositionSize * ORBIT_RATIO
  const buttonDiameter = compositionSize * BUTTON_RATIO

  return {
    compositionSize,
    ringDiameter,
    orbitRadius,
    buttonDiameter,
    buttons: BUTTON_DEFS.map((def, i) => {
      const rad = (ANGLES_DEG[i] * Math.PI) / 180
      return {
        ...def,
        x: Math.cos(rad) * orbitRadius,
        y: Math.sin(rad) * orbitRadius,
      }
    }),
  }
}

function OrbitButton({ item, index, buttonDiameter }) {
  const navigate = useNavigate()
  const openPanel = useHubPanelStore((s) => s.openPanel)
  const Icon = item.icon
  const iconSize = Math.max(14, buttonDiameter * 0.48)
  const iconChipSize = Math.max(26, buttonDiameter * 0.52)
  const labelFontSize = Math.max(7.5, buttonDiameter * 0.13)

  return (
    <motion.button
      onClick={() => {
        if (item.id === 'business') navigate('/business')
        else if (item.id === 'clubs') navigate('/library/fan-club')
        else openPanel(item.id)
      }}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 320,
        damping: 24,
        delay: 0.15 + index * 0.1,
      }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: 'absolute',
        left: `calc(50% + ${item.x}px)`,
        top: `calc(50% + ${item.y}px)`,
        width: buttonDiameter,
        height: buttonDiameter,
        borderRadius: Math.max(14, buttonDiameter * 0.3),
        transform: 'translate(-50%, -50%)',
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px) saturate(150%)',
        WebkitBackdropFilter: 'blur(20px) saturate(150%)',
        border: '1px solid rgba(255,255,255,0.14)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Math.max(2, buttonDiameter * 0.05),
        cursor: 'pointer',
        zIndex: 5,
        boxShadow: `inset 0 1px 1px rgba(255,255,255,0.25), 0 0 24px ${item.accent}33`,
      }}
    >
      <div
        style={{
          width: iconChipSize,
          height: iconChipSize,
          borderRadius: Math.max(8, iconChipSize * 0.35),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.15), 0 0 12px ${item.accent}22`,
        }}
      >
        <Icon size={iconSize} color={item.accent} />
      </div>
      <span
        style={{
          fontSize: labelFontSize,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.8)',
          letterSpacing: '0.03em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: buttonDiameter - 6,
        }}
      >
        {item.label}
      </span>
    </motion.button>
  )
}

export default function NexusHubPage() {
  const hubRef = useRef(null)
  const [hubSize, setHubSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const el = hubRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    setHubSize({ width: rect.width, height: rect.height })

    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setHubSize({ width, height })
    })

    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const layout = useMemo(() => computeLayout(hubSize.width, hubSize.height), [hubSize])

  const mode = usePlayerStore((s) => s.mode)
  const isPlaying = usePlayerStore((s) => s.isPlaying)
  const activePanel = useHubPanelStore((s) => s.activePanel)
  const closePanel = useHubPanelStore((s) => s.closePanel)
  const bgColors = mode === 'sound'
    ? { primary: '#7C3AED', secondary: '#A78BFA' }
    : { primary: '#0EA5E9', secondary: '#38BDF8' }

  const avatarGlow = mode === 'sound'
    ? 'rgba(167,139,250,0.35)'
    : 'rgba(56,189,248,0.35)'

  const pulse = isPlaying ? 4 : 10

  return (
    <>
    <div
      style={{
        position: 'fixed',
        top: 'var(--header-height)',
        left: 0,
        right: 0,
        bottom: 'calc(var(--miniplayer-height) + var(--bottomnav-height) + var(--safe-bottom))',
        overflow: 'hidden',
        background: '#0a0a0f',
      }}
    >
      <motion.div
        animate={{
          scale: [1, isPlaying ? 1.06 : 1.02, 1],
        }}
        transition={{
          duration: pulse,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
        style={{
          position: 'absolute',
          width: '80vw',
          height: '80vw',
          maxWidth: 480,
          maxHeight: 480,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: `radial-gradient(circle at 50% 50%, ${bgColors.primary}22 0%, ${bgColors.secondary}11 40%, transparent 70%)`,
          filter: 'blur(80px)',
          willChange: 'transform',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          ref={hubRef}
          style={{
            width: '100%',
            maxWidth: MAX_HUB_WIDTH,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {layout && (
            <div
              style={{
                width: layout.compositionSize,
                height: layout.compositionSize,
                position: 'relative',
                flexShrink: 0,
              }}
            >
              {layout.buttons.map((btn, i) => (
                <OrbitButton
                  key={btn.id}
                  item={btn}
                  index={i}
                  buttonDiameter={layout.buttonDiameter}
                />
              ))}

              <motion.div
                animate={{
                  scale: [1, isPlaying ? 1.03 : 1.01, 1],
                }}
                transition={{
                  duration: pulse,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: layout.ringDiameter,
                  height: layout.ringDiameter,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1,
                }}
              >
                <motion.div
                  animate={{
                    boxShadow: isPlaying
                      ? [
                          `0 0 40px ${avatarGlow}, 0 0 80px ${avatarGlow.replace('0.35', '0.12')}`,
                          `0 0 60px ${avatarGlow}, 0 0 120px ${avatarGlow.replace('0.35', '0.18')}`,
                          `0 0 40px ${avatarGlow}, 0 0 80px ${avatarGlow.replace('0.35', '0.12')}`,
                        ]
                      : [
                          `0 0 30px ${avatarGlow}, 0 0 60px ${avatarGlow.replace('0.35', '0.08')}`,
                          `0 0 40px ${avatarGlow}, 0 0 80px ${avatarGlow.replace('0.35', '0.1')}`,
                          `0 0 30px ${avatarGlow}, 0 0 60px ${avatarGlow.replace('0.35', '0.08')}`,
                        ],
                  }}
                  transition={{
                    duration: pulse,
                    ease: 'easeInOut',
                    repeat: Infinity,
                  }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    pointerEvents: 'none',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    overflow: 'hidden',
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mode}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.88, filter: 'blur(6px)' }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      style={{ width: '100%', height: '100%' }}
                    >
                      <Live2DAvatar mode={mode === 'sound' ? 'audio' : 'video'} orbState="idle" />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>

    <AnimatePresence>
      {activePanel && (
        <HubPanel panelId={activePanel} onClose={closePanel}>
          {activePanel === 'playlists' && <PlaylistsPanel />}
          {activePanel === 'business' && <BusinessPanel />}
          {activePanel === 'clubs' && <FanClubsPanel />}
          {activePanel === 'friends' && <FriendsPanel />}
        </HubPanel>
      )}
    </AnimatePresence>

    </>
  )
}
