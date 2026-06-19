import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useBusinessStore = create(
  persist(
    (set, get) => ({
      businesses: [],

      addBusiness: (data) => {
        const newBiz = {
          id: 'biz-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
          name: data.name || '',
          category: data.category || 'Musician',
          description: data.description || '',
          social: data.social || '',
          email: data.email || '',
          color: data.color || '#9b5de5',
          features: data.features || '',
          location: data.location || '',
          tagline: data.tagline || '',
          notes: data.notes || '',
          templateUsed: getTemplateForCategory(data.category || 'Musician'),
          generatedHTML: '',
          createdAt: Date.now(),
        }
        set((s) => ({ businesses: [newBiz, ...s.businesses] }))
        return newBiz
      },

      updateBusinessHTML: (id, html) =>
        set((s) => ({
          businesses: s.businesses.map((b) =>
            b.id === id ? { ...b, generatedHTML: html } : b
          ),
        })),

      getBusiness: (id) => get().businesses.find((b) => b.id === id),

      removeBusiness: (id) =>
        set((s) => ({
          businesses: s.businesses.filter((b) => b.id !== id),
        })),
    }),
    { name: 'nexus-businesses' }
  ),
)

function getTemplateForCategory(category) {
  const map = {
    Musician: 'artist-musician',
    DJ: 'dj-producer',
    Studio: 'recording-studio',
    Director: 'director-filmmaker',
    Actor: 'actor-performer',
    Cafe: 'music-cafe',
    Cinema: 'cinema-theater',
    Producer: 'production-house',
    Designer: 'designer-stylist',
    Podcaster: 'podcaster-critic',
  }
  return map[category] || 'artist-musician'
}

export default useBusinessStore
