const CACHE_KEY = 'petros_biome_v1'
const CACHE_TTL = 24 * 60 * 60 * 1000

const API_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

export async function detectBiome(config) {
  if (config.forceBiome) {
    return config.forceBiome
  }

  const cached = loadCachedBiome()
  if (cached) return cached

  try {
    const position = await getPosition(4000)
    const biome = await reverseGeocode(position.latitude, position.longitude)
    cacheBiome(biome)
    return biome
  } catch {
    const fallback = 'urban'
    cacheBiome(fallback)
    return fallback
  }
}

function loadCachedBiome() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { biome, timestamp } = JSON.parse(raw)
    if (Date.now() - timestamp < CACHE_TTL) return biome
    localStorage.removeItem(CACHE_KEY)
    return null
  } catch {
    return null
  }
}

function cacheBiome(biome) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ biome, timestamp: Date.now() }))
  } catch {}
}

function getPosition(timeout) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      (err) => reject(err),
      { timeout, enableHighAccuracy: false }
    )
  })
}

async function reverseGeocode(lat, lng) {
  const url = `${API_URL}?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Geocode API error: ${res.status}`)
  const data = await res.json()

  /*
   * V1 heuristic: the free BigDataCloud API gives city/locality but does
   * not classify land type (forest/rural/beach). For now, if a city or
   * locality is present we classify as "urban". On missing fields or any
   * error, we fall back to "urban" as agreed. Future versions can use a
   * better detection source or manual user selection.
   */
  if (data.city || data.locality) {
    return 'urban'
  }

  return 'urban'
}
