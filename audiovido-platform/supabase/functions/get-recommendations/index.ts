import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const spotifyToken = Deno.env.get("SPOTIFY_ACCESS_TOKEN")
const tmdbKey = Deno.env.get("TMDB_API_KEY")

serve(async (req) => {
  try {
    const { userId, mood } = await req.json()

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    const { data: user } = await supabase
      .from("users")
      .select("music_taste, cinema_taste")
      .eq("id", userId)
      .single()

    let tracks = []
    let movies = []

    if (user?.music_taste?.length && spotifyToken) {
      const spotifyRes = await fetch(
        `https://api.spotify.com/v1/recommendations?seed_genres=${user.music_taste.join(",")}&limit=20`,
        { headers: { Authorization: `Bearer ${spotifyToken}` } }
      )
      const spotifyData = await spotifyRes.json()
      tracks = spotifyData.tracks || []

      await supabase.from("tracks").upsert(
        tracks.map((track: any) => ({
          spotify_id: track.id,
          name: track.name,
          artist: track.artists[0]?.name,
          album: track.album?.name,
          image: track.album?.images?.[0]?.url,
          popularity: track.popularity,
        })),
        { onConflict: "spotify_id" }
      )
    }

    if (user?.cinema_taste?.length && tmdbKey) {
      const genreMap: Record<string, number> = {
        action: 28, adventure: 12, animation: 16, comedy: 35,
        crime: 80, documentary: 99, drama: 18, family: 10751,
        fantasy: 14, horror: 27, mystery: 9648, romance: 10749,
        scifi: 878, thriller: 53, war: 10752, western: 37,
      }

      const genreIds = user.cinema_taste
        .map((g: string) => genreMap[g.toLowerCase()])
        .filter(Boolean)
        .join(",")

      const tmdbRes = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreIds}&api_key=${tmdbKey}`
      )
      const tmdbData = await tmdbRes.json()
      movies = tmdbData.results || []
    }

    return new Response(
      JSON.stringify({ tracks, movies }),
      { headers: { "Content-Type": "application/json" } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
})
