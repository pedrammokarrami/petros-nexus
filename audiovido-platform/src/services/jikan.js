const BASE = 'https://api.jikan.moe/v4'

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url)
      if (res.ok) return res
      if (i < retries - 1) await sleep(800 * (i + 1))
    } catch {
      if (i < retries - 1) await sleep(800 * (i + 1))
    }
  }
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Jikan error: ${res.status}`)
  return res
}

function parseAnime(anime) {
  const img = anime.images?.webp || anime.images?.jpg || {}
  return {
    id: `jikan-${anime.mal_id}`,
    title: anime.title || anime.title_english || 'Unknown',
    overview: anime.synopsis || '',
    poster: img.large_image_url || img.image_url || '',
    cover: img.image_url || '',
    thumbnail: img.small_image_url || img.image_url || '',
    rating: anime.score || null,
    year: anime.year || null,
    genres: (anime.genres || []).map((g) => g.name),
    type: 'anime',
    source: 'jikan',
    episodes: anime.episodes || null,
    status: anime.status || null,
    airing: anime.airing || false
  }
}

export async function searchAnime(query, limit = 10) {
  if (!query.trim()) return []
  const res = await fetchWithRetry(`${BASE}/anime?q=${encodeURIComponent(query)}&limit=${limit}&order_by=score&sort=desc`)
  const data = await res.json()
  return (data.data || []).slice(0, limit).map(parseAnime)
}

export async function getTopAnime(limit = 10) {
  try {
    const res = await fetchWithRetry(`${BASE}/top/anime?limit=${limit}&filter=bypopularity`)
    const data = await res.json()
    const items = (data.data || []).slice(0, limit).map(parseAnime)
    if (items.length > 0) return items
  } catch {}
  return []
}

export async function getAiringAnime(limit = 10) {
  try {
    const res = await fetchWithRetry(`${BASE}/seasons/now?limit=${limit}`)
    const data = await res.json()
    const items = (data.data || []).slice(0, limit).map(parseAnime)
    if (items.length > 0) return items
  } catch {}
  return []
}

export async function getAnimeByGenre(genreId, limit = 10) {
  try {
    const res = await fetchWithRetry(`${BASE}/anime?genres=${genreId}&limit=${limit}&order_by=score&sort=desc`)
    const data = await res.json()
    const items = (data.data || []).slice(0, limit).map(parseAnime)
    if (items.length > 0) return items
  } catch {}
  return []
}
