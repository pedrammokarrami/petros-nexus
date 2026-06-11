import { searchMedia as mockSearch } from '../data/mockData'

const API_BASE = 'http://localhost:3001'

async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, {
      ...options,
      signal: AbortSignal.timeout(3000)
    })
    if (!res.ok) throw new Error('API error')
    return await res.json()
  } catch {
    return null
  }
}

export async function searchMedia(query) {
  if (!query.trim()) return []
  const data = await safeFetch(`${API_BASE}/api/media/search?q=${encodeURIComponent(query)}`)
  if (data) return data
  return mockSearch(query)
}

export async function getMediaById(id) {
  const data = await safeFetch(`${API_BASE}/api/media/${id}`)
  if (data) return data
  return null
}

export function streamMedia(id) {
  return `${API_BASE}/api/media/${id}/stream`
}

export async function getTrending() {
  const data = await safeFetch(`${API_BASE}/api/media/trending`)
  if (data) return data
  return null
}

export async function getFeatured() {
  const data = await safeFetch(`${API_BASE}/api/media/featured`)
  if (data) return data
  return null
}
