import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AppShell from './components/layout/AppShell'
import Splash from './pages/Splash'
import Home from './pages/Home'
import Sound from './pages/Sound'
import Vision from './pages/Vision'
import Search from './pages/Search'
import Library from './pages/Library'
import AudioPlayer from './components/player/AudioPlayer'
import VideoPlayer from './components/player/VideoPlayer'
import usePlayerStore from './store/usePlayerStore'

export default function App() {
  const { isPlayerOpen, playbackType, currentMedia } = usePlayerStore()

  return (
    <>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Splash />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sound" element={<Sound />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/search" element={<Search />} />
          <Route path="/library" element={<Library />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
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
