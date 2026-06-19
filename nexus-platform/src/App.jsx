import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AppShell from './components/layout/AppShell'
import Splash from './pages/Splash'
import Home from './pages/Home'
import Sound from './pages/Sound'
import Vision from './pages/Vision'
import Search from './pages/Search'
import NexusHubPage from './pages/NexusHubPage'
import PlaylistsPage from './pages/PlaylistsPage'
import ProfilePage from './pages/ProfilePage'
import Settings from './pages/Settings'
import DJModePage from './pages/DJModePage'
import FanClubsListPage from './pages/FanClubsListPage'
import FanClubPage from './pages/FanClubPage'
import LoginPage from './pages/LoginPage'
import BusinessList from './pages/BusinessList'
import BusinessCreate from './pages/BusinessCreate'
import BusinessSite from './pages/BusinessSite'
import AudioPlayer from './components/player/AudioPlayer'
import VideoPlayer from './components/player/VideoPlayer'
import usePlayerStore from './store/usePlayerStore'

function AuthGuard() {
  const isAuth = localStorage.getItem('nexus_auth') === 'true'
  const location = useLocation()
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return <Outlet />
}

export default function App() {
  const { isPlayerOpen, playbackType, currentMedia } = usePlayerStore()

  return (
    <>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<AuthGuard />}>
          <Route element={<AppShell />}>
            <Route path="/home" element={<Home />} />
            <Route path="/sound" element={<Sound />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<NexusHubPage />} />
            <Route path="/library/playlists" element={<PlaylistsPage />} />
            <Route path="/library/fan-club" element={<FanClubsListPage />} />
            <Route path="/library/fan-club/:clubId" element={<FanClubPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Route>
          <Route path="/dj" element={<DJModePage />} />
          <Route path="/business" element={<BusinessList />} />
          <Route path="/business/create" element={<BusinessCreate />} />
          <Route path="/business/:businessId" element={<BusinessSite />} />
        </Route>
      </Routes>

      <AnimatePresence mode="wait">
        {isPlayerOpen && currentMedia && playbackType === 'audio' && (
          <AudioPlayer key="audio-player" />
        )}
        {isPlayerOpen && currentMedia && playbackType === 'video' && (
          <VideoPlayer key="video-player" />
        )}
      </AnimatePresence>
    </>
  )
}
