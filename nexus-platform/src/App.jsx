import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import './i18n/index'
import PetrosBackground from '@petros-background/PetrosBackground'
import AppShell from './components/layout/AppShell'
import Splash from './pages/Splash'
import HomePage from './pages/HomePage'
import Sound from './pages/Sound'
import Vision from './pages/Vision'
import Search from './pages/Search'
import LibraryPage from './pages/LibraryPage'
import PlaylistsPage from './pages/PlaylistsPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import DJModePage from './pages/DJModePage'
import FanClubsListPage from './pages/FanClubsListPage'
import FanClubPage from './pages/FanClubPage'
import FriendsPage from './pages/FriendsPage'
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
  const { i18n } = useTranslation()
  const location = useLocation()
  const [petrosConfig, setPetrosConfig] = useState(null)

  const isDJRoute = location.pathname === '/dj'

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage')
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage)
    }
  }, [i18n])

  useEffect(() => {
    const dir = i18n.language === 'fa' || i18n.language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.dir = dir
  }, [i18n.language])

  useEffect(() => {
    fetch('/petros-config.json')
      .then((r) => r.json())
      .then(setPetrosConfig)
      .catch(() => {})
  }, [])

  return (
    <>
      <PetrosBackground enabled={!isDJRoute} config={petrosConfig} />
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<AuthGuard />}>
          <Route element={<AppShell />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/sound" element={<Sound />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/search" element={<Search />} />
            <Route path="/hub" element={<LibraryPage />} />
            <Route path="/hub/playlists" element={<PlaylistsPage />} />
            <Route path="/hub/fan-club" element={<FanClubsListPage />} />
            <Route path="/hub/fan-club/:clubId" element={<FanClubPage />} />
            <Route path="/hub/friends" element={<FriendsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/library" element={<Navigate to="/hub" replace />} />
            <Route path="/library/*" element={<Navigate to="/hub" replace />} />
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
