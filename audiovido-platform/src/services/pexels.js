const API_KEY = import.meta.env.VITE_PEXELS_API_KEY || ''
const BASE = 'https://api.pexels.com/videos'

function pickVideoFile(files) {
  const sorted = [...files].sort((a, b) => {
    const qualityOrder = { sd: 0, hd: 1, uhd: 2 }
    const aQ = qualityOrder[a.quality] ?? 99
    const bQ = qualityOrder[b.quality] ?? 99
    if (aQ !== bQ) return aQ - bQ
    return (a.size || 0) - (b.size || 0)
  })
  return sorted.find((f) => f.file_type === 'video/mp4') || sorted[0]
}

export async function searchVideos(query, limit = 10) {
  if (!API_KEY) throw new Error('Pexels API key not configured — add VITE_PEXELS_API_KEY to .env')
  if (!query.trim()) return []

  const params = new URLSearchParams({
    query,
    per_page: String(limit)
  })

  const res = await fetch(`${BASE}/search?${params}`, {
    headers: { Authorization: API_KEY }
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Pexels API error: ${res.status}`)
  }

  const data = await res.json()

  return (data.videos || []).map((video) => {
    const file = pickVideoFile(video.video_files || [])
    return {
      id: `pexels-${video.id}`,
      title: query,
      artist: video.user?.name || 'Pexels',
      duration: video.duration,
      cover: video.image,
      thumbnail: video.image,
      file_url: file?.link || '',
      type: 'movie',
      source: 'pexels',
      quality: file?.quality || 'sd'
    }
  })
}
