import { create } from 'zustand'

const getInitialMode = () => {
  try {
    return localStorage.getItem('audiovido_mode') || 'sound'
  } catch {
    return 'sound'
  }
}

const usePlayerStore = create((set, get) => ({
  currentMedia: null,
  isPlaying: false,
  progress: 0,
  volume: 0.8,
  mode: getInitialMode(),
  queue: [],
  isPlayerOpen: false,
  playbackType: null,

  play: (media) => {
    set({
      currentMedia: media,
      isPlaying: true,
      progress: 0,
      playbackType: media?.file_url?.includes('.mp4') || media?.type === 'movie' || media?.type === 'series'
        ? 'video' : 'audio',
      isPlayerOpen: true
    })
  },

  pause: () => set({ isPlaying: false }),

  resume: () => set({ isPlaying: true }),

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

  setProgress: (progress) => set({ progress: Math.max(0, Math.min(1, progress)) }),

  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),

  setMode: (mode) => {
    localStorage.setItem('audiovido_mode', mode)
    set({ mode })
  },

  toggleMode: () => {
    const newMode = get().mode === 'sound' ? 'vision' : 'sound'
    localStorage.setItem('audiovido_mode', newMode)
    set({ mode: newMode })
  },

  addToQueue: (media) => set((state) => ({ queue: [...state.queue, media] })),

  removeFromQueue: (id) => set((state) => ({
    queue: state.queue.filter((m) => m.id !== id)
  })),

  clearQueue: () => set({ queue: [] }),

  nextTrack: () => {
    const { queue, currentMedia } = get()
    if (queue.length === 0) return
    const currentIndex = queue.findIndex((m) => m.id === currentMedia?.id)
    const nextIndex = (currentIndex + 1) % queue.length
    const next = queue[nextIndex]
    if (next) {
      set({ currentMedia: next, isPlaying: true, progress: 0 })
    }
  },

  prevTrack: () => {
    const { queue, currentMedia } = get()
    if (queue.length === 0) return
    const currentIndex = queue.findIndex((m) => m.id === currentMedia?.id)
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length
    const prev = queue[prevIndex]
    if (prev) {
      set({ currentMedia: prev, isPlaying: true, progress: 0 })
    }
  },

  closePlayer: () => set({ isPlayerOpen: false }),

  openPlayer: () => set({ isPlayerOpen: true }),

  stop: () => set({
    currentMedia: null,
    isPlaying: false,
    progress: 0,
    isPlayerOpen: false,
    playbackType: null
  })
}))

export default usePlayerStore
