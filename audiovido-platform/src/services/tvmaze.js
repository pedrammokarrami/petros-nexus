const BASE = 'https://api.tvmaze.com'

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
  if (!res.ok) throw new Error(`TVmaze error: ${res.status}`)
  return res
}

function parseShow(show) {
  return {
    id: `tvmaze-${show.id}`,
    title: show.name || 'Unknown',
    overview: (show.summary || '').replace(/<[^>]+>/g, ''),
    poster: show.image?.original || show.image?.medium || '',
    cover: show.image?.medium || '',
    thumbnail: show.image?.medium || '',
    rating: show.rating?.average || null,
    year: show.premiered ? parseInt(show.premiered) : null,
    genres: show.genres || [],
    type: 'series',
    source: 'tvmaze',
    status: show.status || null,
    language: show.language || null
  }
}

export async function searchSeries(query, limit = 10) {
  if (!query.trim()) return []
  const res = await fetchWithRetry(`${BASE}/search/shows?q=${encodeURIComponent(query)}`)
  const data = await res.json()
  return data.slice(0, limit).map((item) => parseShow(item.show))
}

export async function getPopularSeries(page = 1, limit = 10) {
  try {
    const res = await fetchWithRetry(`${BASE}/shows?page=${page}`)
    const data = await res.json()
    return data.slice(0, limit).map(parseShow)
  } catch {
    return []
  }
}

export async function getSeriesDetail(id) {
  const res = await fetchWithRetry(`${BASE}/shows/${id}`)
  const show = await res.json()
  return parseShow(show)
}

export async function getEpisodes(showId) {
  const res = await fetchWithRetry(`${BASE}/shows/${showId}/episodes`)
  return await res.json()
}
