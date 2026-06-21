const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const cache = new Map()

async function tmdbFetch(endpoint) {
  if (!API_KEY) return null
  const sep = endpoint.includes('?') ? '&' : '?'
  const url = `${BASE_URL}${endpoint}${sep}api_key=${API_KEY}&language=en-US`
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export function tmdbImage(path, size = 'w500') {
  if (!path) return null
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export async function searchMovie(title, year) {
  const params = new URLSearchParams({ query: title })
  if (year) params.set('year', String(year))
  const data = await tmdbFetch(`/search/movie?${params}`)
  return data?.results?.[0] || null
}

export async function searchTv(title, year) {
  const params = new URLSearchParams({ query: title })
  if (year) params.set('first_air_date_year', String(year))
  const data = await tmdbFetch(`/search/tv?${params}`)
  return data?.results?.[0] || null
}

export async function findByImdbId(imdbId) {
  const key = `find:${imdbId}`
  if (cache.has(key)) return cache.get(key)
  const data = await tmdbFetch(`/find/${imdbId}?external_source=imdb_id`)
  const result = data?.movie_results?.[0] || data?.tv_results?.[0] || null
  if (result) {
    result.media_type = data.movie_results?.[0] ? 'movie' : 'tv'
    cache.set(key, result)
  }
  return result
}

export async function getMovieDetails(tmdbId) {
  const key = `movie:${tmdbId}`
  if (cache.has(key)) return cache.get(key)
  const data = await tmdbFetch(`/movie/${tmdbId}?append_to_response=credits,reviews,videos,images,recommendations,release_dates`)
  if (data) cache.set(key, data)
  return data
}

export async function getTvDetails(tmdbId) {
  const key = `tv:${tmdbId}`
  if (cache.has(key)) return cache.get(key)
  const data = await tmdbFetch(`/tv/${tmdbId}?append_to_response=credits,reviews,videos,images,recommendations,release_dates`)
  if (data) cache.set(key, data)
  return data
}

export async function searchTmdb(title, year, imdbId, type) {
  if (imdbId) {
    const byImdb = await findByImdbId(imdbId)
    if (byImdb) {
      const mediaType = byImdb.media_type || 'movie'
      return mediaType === 'tv' ? getTvDetails(byImdb.id) : getMovieDetails(byImdb.id)
    }
  }
  if (type === 'series' || type === 'tv' || type === 'anime') {
    const found = await searchTv(title, year)
    if (found) return getTvDetails(found.id)
  }
  const found = await searchMovie(title, year)
  if (found) return getMovieDetails(found.id)
  if (!year) {
    const found2 = await searchTv(title)
    if (found2) return getTvDetails(found2.id)
  }
  return null
}
