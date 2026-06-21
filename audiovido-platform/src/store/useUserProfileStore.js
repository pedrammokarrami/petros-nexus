import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const INITIAL = {
  favoriteGenres: [],
  dislikedGenres: [],
  preferredMoods: [],
  preferredEras: [],
  languagePreferences: [],
  preferredVocalStyle: 'any',
  energyLevel: null,
  favoriteArtists: [],
  recentlyPlayed: [],
  tasteQuestionsAnswered: 0,
}

const useUserProfileStore = create(
  persist(
    (set, get) => ({
      ...INITIAL,
      updateProfile: (updates) => set((s) => ({ ...s, ...updates })),
      addGenre: (g) =>
        set((s) => ({
          favoriteGenres: s.favoriteGenres.includes(g) ? s.favoriteGenres : [...s.favoriteGenres, g],
        })),
      removeGenre: (g) =>
        set((s) => ({ favoriteGenres: s.favoriteGenres.filter((x) => x !== g) })),
      addDislikedGenre: (g) =>
        set((s) => ({
          dislikedGenres: s.dislikedGenres.includes(g) ? s.dislikedGenres : [...s.dislikedGenres, g],
        })),
      addMood: (m) =>
        set((s) => ({
          preferredMoods: s.preferredMoods.includes(m) ? s.preferredMoods : [...s.preferredMoods, m],
        })),
      addEra: (e) =>
        set((s) => ({
          preferredEras: s.preferredEras.includes(e) ? s.preferredEras : [...s.preferredEras, e],
        })),
      addLanguage: (l) =>
        set((s) => ({
          languagePreferences: s.languagePreferences.includes(l)
            ? s.languagePreferences
            : [...s.languagePreferences, l],
        })),
      setVocalStyle: (v) => set({ preferredVocalStyle: v }),
      setEnergyLevel: (e) => set({ energyLevel: e }),
      addFavoriteArtist: (a) =>
        set((s) => ({
          favoriteArtists: s.favoriteArtists.includes(a) ? s.favoriteArtists : [...s.favoriteArtists, a],
        })),
      addToRecentlyPlayed: (track) =>
        set((s) => ({
          recentlyPlayed: [track, ...s.recentlyPlayed.filter((t) => t.id !== track.id)].slice(0, 50),
        })),
      markTasteQuestionAnswered: () =>
        set((s) => ({ tasteQuestionsAnswered: s.tasteQuestionsAnswered + 1 })),
      reset: () => set(INITIAL),
    }),
    { name: 'audiovido_user_profile' },
  ),
)

export default useUserProfileStore
