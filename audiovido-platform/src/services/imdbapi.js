const BASE = 'https://api.imdbapi.dev'

const popularSearchTerms = [
  'inception', 'avatar', 'batman', 'gladiator', 'matrix',
  'interstellar', 'joker', 'titanic', 'tenet', 'dune',
  'oppenheimer', 'barbie', 'mission impossible', 'john wick',
  'spider-man', 'avengers', 'star wars', 'lord of the rings'
]

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url)
      if (res.ok) return res
      if (res.status < 500 && res.status !== 429) throw new Error(`imdbapi error: ${res.status}`)
      if (i < retries - 1) await sleep(800 * (i + 1))
    } catch (e) {
      if (e.message?.startsWith('imdbapi error')) throw e
      if (i < retries - 1) await sleep(800 * (i + 1))
      else throw e
    }
  }
  const res = await fetch(url)
  if (!res.ok) return null
  return res
}

function parseTitle(t) {
  const poster = t.primaryImage?.url || ''
  return {
    id: t.id,
    title: t.primaryTitle || t.originalTitle || 'Unknown',
    overview: t.plot || '',
    poster,
    cover: poster,
    thumbnail: poster,
    rating: t.rating?.aggregateRating || null,
    year: t.startYear || null,
    genres: t.genres || [],
    type: t.type || 'movie',
    source: 'imdbapi',
    trailer: null
  }
}

export async function searchTitles(query, limit = 10) {
  if (!query.trim()) return []
  const params = new URLSearchParams({ query, limit: String(limit) })
  try {
    const res = await fetchWithRetry(`${BASE}/search/titles?${params}`)
    if (!res) { console.warn('[imdbapi] returning empty — API unavailable'); return [] }
    const data = await res.json()
    return (data.titles || []).slice(0, limit).map(parseTitle)
  } catch {
    console.warn('[imdbapi] searchTitles failed, returning empty')
    return []
  }
}

export async function getTopMovies(limit = 10) {
  try {
    const res = await fetchWithRetry(`${BASE}/titles?limit=${limit * 2}`)
    if (res) {
      const data = await res.json()
      const movies = (data.titles || [])
        .filter((t) => t.type === 'movie')
        .slice(0, limit)
        .map(parseTitle)
      if (movies.length > 0) return movies
    }
  } catch {}
  const seen = new Set()
  const results = []
  const shuffled = [...popularSearchTerms].sort(() => Math.random() - 0.5)
  for (const term of shuffled) {
    if (results.length >= limit) break
    try {
      const movies = await searchTitles(term, limit * 2)
      for (const m of movies) {
        if (results.length >= limit) break
        if (!seen.has(m.id)) {
          seen.add(m.id)
          results.push(m)
        }
      }
    } catch {}
  }
  return results.slice(0, limit)
}

async function fetchMovies(params, limit, fallbackTerms) {
  try {
    const res = await fetchWithRetry(`${BASE}/titles?${params}`)
    if (!res) throw new Error('unavailable')
    const data = await res.json()
    const movies = (data.titles || []).filter((t) => t.type === 'movie').slice(0, limit).map(parseTitle)
    if (movies.length > 0) return movies
  } catch {}
  if (fallbackTerms) {
    const seen = new Set(); const results = []
    const shuffled = [...fallbackTerms].sort(() => Math.random() - 0.5)
    for (const term of shuffled) {
      if (results.length >= limit) break
      try {
        const items = await searchTitles(term, limit * 2)
        for (const m of items) {
          if (results.length >= limit) break
          if (!seen.has(m.id)) { seen.add(m.id); results.push(m) }
        }
      } catch {}
    }
    return results.slice(0, limit)
  }
  return []
}

export async function getNewestMovies(limit = 10) {
  const params = new URLSearchParams({ types: 'MOVIE', sortBy: 'SORT_BY_RELEASE_DATE', sortOrder: 'DESC', limit: String(limit * 2) })
  return fetchMovies(params, limit, ['2024', '2025', 'new film', 'latest movie'])
}

export async function getTopRated(limit = 10) {
  const params = new URLSearchParams({ types: 'MOVIE', sortBy: 'SORT_BY_USER_RATING', sortOrder: 'DESC', minAggregateRating: '7', minVoteCount: '1000', limit: String(limit * 2) })
  return fetchMovies(params, limit, ['masterpiece', 'best film', 'top rated'])
}

export async function getMostPopular(limit = 10) {
  const params = new URLSearchParams({ types: 'MOVIE', sortBy: 'SORT_BY_POPULARITY', sortOrder: 'DESC', limit: String(limit * 2) })
  return fetchMovies(params, limit, popularSearchTerms)
}

export async function getMostVoted(limit = 10) {
  const params = new URLSearchParams({ types: 'MOVIE', sortBy: 'SORT_BY_USER_RATING_COUNT', sortOrder: 'DESC', limit: String(limit * 2) })
  return fetchMovies(params, limit, ['most watched', 'blockbuster', 'popular movie'])
}

export async function getByGenre(genre, limit = 10) {
  const params = new URLSearchParams({ types: 'MOVIE', genres: genre.toUpperCase(), sortBy: 'SORT_BY_USER_RATING', sortOrder: 'DESC', limit: String(limit * 2) })
  return fetchMovies(params, limit, [`${genre} movie`, genre])
}

export async function getByCountry(countryCodes, limit = 10) {
  const codes = countryCodes.split(',')
  const params = new URLSearchParams({ types: 'MOVIE', sortBy: 'SORT_BY_USER_RATING', sortOrder: 'DESC', limit: String(limit * 2) })
  codes.forEach((c) => params.append('countryCodes', c.trim()))
  return fetchMovies(params, limit)
}

export async function getTitleDetail(imdbId) {
  try {
    const res = await fetchWithRetry(`${BASE}/titles/${imdbId}`)
    if (!res) { console.warn('[imdbapi] getTitleDetail: API unavailable'); return null }
    const t = await res.json()
    return {
      ...parseTitle(t),
      runtimeSeconds: t.runtimeSeconds || null,
      directors: (t.directors || []).map((d) => ({
        id: d.id,
        name: d.displayName,
        image: d.primaryImage?.url || ''
      })),
      cast: (t.stars || []).map((s) => ({
        id: s.id,
        name: s.displayName,
        image: s.primaryImage?.url || ''
      })),
      metacritic: t.metacritic || null,
      trailer: t.trailer || null
    }
  } catch {
    console.warn('[imdbapi] getTitleDetail failed')
    return null
  }
}
