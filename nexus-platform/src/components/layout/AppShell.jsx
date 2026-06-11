import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from './Header'
import BottomNav from './BottomNav'
import MiniPlayer from './MiniPlayer'
import usePlayerStore from '../../store/usePlayerStore'

const navPaths = ['/home', '/sound', '/vision', '/search', '/library']

export default function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const mode = usePlayerStore((s) => s.mode)
  const isSplash = location.pathname === '/'
  const showNav = navPaths.includes(location.pathname)

  useEffect(() => {
    const saved = localStorage.getItem('nexus_mode')
    if (saved && saved !== mode) {
      usePlayerStore.getState().setMode(saved)
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode)
  }, [mode])

  return (
    <div
      style={{
        height: '100dvh',
        overflow: 'hidden',
        background: 'var(--bg-primary)'
      }}
    >
      {!isSplash && <Header />}
      {!isSplash && showNav && <BottomNav />}
      {!isSplash && <MiniPlayer />}

      <main
        style={{
          position: 'fixed',
          top: isSplash ? 0 : 'var(--header-height)',
          left: 0,
          right: 0,
          bottom: isSplash
            ? 0
            : showNav
              ? 'calc(var(--miniplayer-height) + var(--bottomnav-height) + var(--safe-bottom))'
              : 0,
          overflowY: isSplash ? 'hidden' : 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain'
        }}
      >
        <Outlet />
      </main>
    </div>
  )
}
