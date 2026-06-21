const CLIENT_ID = import.meta.env.VITE_JAMENDO_CLIENT_ID || '56d30c95'
const BASE = 'https://api.jamendo.com/v3.0'

function parseTracks(results) {
  return (results || []).map((track) => {
    const tags = track.musicinfo?.tags
    const genreTags = [
      ...(tags?.genres || []),
      ...(tags?.instruments || [])
    ].slice(0, 2).join(', ')

    return {
      id: `jamendo-${track.id}`,
      title: track.name,
      artist: track.artist_name,
      duration: track.duration,
      cover: track.image,
      file_url: track.audio,
      genre: genreTags || 'Unknown',
      type: 'music',
      source: 'jamendo'
    }
  })
}

async function fetchTracks(extraParams, limit = 10) {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    format: 'json',
    limit: String(limit),
    include: 'musicinfo',
    audioformat: 'mp32',
    ...extraParams
  })

  const res = await fetch(`${BASE}/tracks/?${params}`)
  if (!res.ok) throw new Error('Jamendo API request failed')

  const data = await res.json()

  if (data.headers?.status !== 'success') {
    throw new Error(data.headers?.error_message || 'Jamendo API error')
  }

  return parseTracks(data.results)
}

export async function searchTracks(query, limit = 10) {
  if (!query.trim()) return []
  return fetchTracks({ search: query }, limit)
}

export async function getNewReleases(limit = 10) {
  return fetchTracks({ order: 'releasedate_desc' }, limit)
}

export async function getTrending(limit = 10) {
  return fetchTracks({ order: 'popularity_total' }, limit)
}
