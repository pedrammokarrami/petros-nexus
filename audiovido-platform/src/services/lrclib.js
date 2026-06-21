const LRCLIB_BASE = 'https://lrclib.net/api'

function parseLRC(lrcText) {
  if (!lrcText) return []
  const lines = lrcText.split('\n')
  const result = []
  const timeRegex = /\[(\d+):(\d+)\.(\d+)\]/
  for (const line of lines) {
    const match = line.match(timeRegex)
    if (!match) continue
    const minutes = parseInt(match[1], 10)
    const seconds = parseInt(match[2], 10)
    const hundredths = parseInt(match[3], 10)
    const time = minutes * 60 + seconds + hundredths / 100
    const text = line.replace(timeRegex, '').trim()
    if (text) result.push({ time, text })
  }
  return result
}

async function searchLyrics({ trackName, artistName }) {
  const params = new URLSearchParams({
    track_name: trackName,
    artist_name: artistName,
  })
  const res = await fetch(`${LRCLIB_BASE}/search?${params}`)
  if (!res.ok) return null
  const list = await res.json()
  if (!list?.length) return null
  const best = list[0]
  return {
    synced: parseLRC(best.syncedLyrics),
    plain: best.plainLyrics || null,
    instrumental: best.instrumental || false,
  }
}

export async function getSyncedLyrics({ trackName, artistName, albumName, duration }) {
  const params = new URLSearchParams({
    track_name: trackName || '',
    artist_name: artistName || '',
  })
  if (albumName) params.set('album_name', albumName)
  if (duration) params.set('duration', String(Math.round(duration)))

  try {
    const res = await fetch(`${LRCLIB_BASE}/get?${params}`)
    if (!res.ok) return await searchLyrics({ trackName, artistName })
    const data = await res.json()
    if (!data || data.error) return await searchLyrics({ trackName, artistName })
    return {
      synced: parseLRC(data.syncedLyrics),
      plain: data.plainLyrics || null,
      instrumental: data.instrumental || false,
    }
  } catch {
    return await searchLyrics({ trackName, artistName })
  }
}
