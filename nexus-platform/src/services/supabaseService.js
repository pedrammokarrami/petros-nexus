import { supabase } from '../lib/supabase'

// ─── AUTH ────────────────────────────────────────────────────────────────────

export async function signUp(email, password, name) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw error

  const { error: profileError } = await supabase.from('users').insert({
    id: data.user.id,
    email,
    name,
  })
  if (profileError) throw profileError

  return data
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user ?? null
}

// ─── USER PROFILE ────────────────────────────────────────────────────────────

export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) throw error
  return data
}

export async function updateUserProfile(userId, updates) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  if (error) throw error
  return data
}

// ─── HOME RECOMMENDATIONS ────────────────────────────────────────────────────

export async function getForYouRecommendations(userId, limit = 20) {
  const user = await getUserProfile(userId)

  const [tracksResult, videosResult] = await Promise.all([
    supabase
      .from('tracks')
      .select('*')
      .in('genres', user.music_taste || [])
      .limit(limit),
    supabase
      .from('videos')
      .select('*')
      .in('genres', user.cinema_taste || [])
      .limit(limit),
  ])

  return {
    tracks: tracksResult.data || [],
    videos: videosResult.data || [],
  }
}

export async function getTrendingItems(type = 'all', limit = 10) {
  let tracks = []
  let videos = []

  if (type === 'music' || type === 'all') {
    const { data } = await supabase
      .from('tracks')
      .select('*')
      .order('popularity', { ascending: false })
      .limit(limit)
    tracks = data || []
  }

  if (type === 'cinema' || type === 'all') {
    const { data } = await supabase
      .from('videos')
      .select('*')
      .order('rating', { ascending: false })
      .limit(limit)
    videos = data || []
  }

  return { tracks, videos }
}

export async function getContinuePlaying(userId) {
  const { data: lastMusic } = await supabase
    .from('listening_history')
    .select('*, tracks(*)')
    .eq('user_id', userId)
    .order('played_at', { ascending: false })
    .limit(1)
    .single()

  const { data: lastVideo } = await supabase
    .from('watch_history')
    .select('*, videos(*)')
    .eq('user_id', userId)
    .order('watched_at', { ascending: false })
    .limit(1)
    .single()

  return {
    music: lastMusic?.tracks ?? null,
    video: lastVideo?.videos ?? null,
  }
}

// ─── FRIENDS ──────────────────────────────────────────────────────────────────

export async function getFriendsList(userId) {
  const { data, error } = await supabase
    .from('friends')
    .select('*, user1:user1_id(id, name, avatar), user2:user2_id(id, name, avatar)')
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
    .eq('status', 'accepted')
  if (error) throw error

  return (data || []).map(f => {
    const friend = f.user1_id === userId ? f.user2 : f.user1
    return { ...f, friend }
  })
}

export async function addFriend(userId, friendId) {
  const { data, error } = await supabase
    .from('friends')
    .insert({ user1_id: userId, user2_id: friendId, status: 'accepted' })
    .select()
  if (error) throw error
  return data
}

export async function getFriendsActivity(userId, limit = 10) {
  const friends = await getFriendsList(userId)
  const friendIds = friends.map(f => f.friend.id)

  if (friendIds.length === 0) return []

  const { data, error } = await supabase
    .from('user_activity')
    .select('*, users(id, name, avatar)')
    .in('user_id', friendIds)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data || []
}

// ─── FAN CLUBS ────────────────────────────────────────────────────────────────

export async function getFanClubs() {
  const { data, error } = await supabase
    .from('fan_clubs')
    .select('*, creator:creator_id(name, avatar)')
  if (error) throw error
  return data || []
}

export async function createFanClub(club) {
  const { data, error } = await supabase
    .from('fan_clubs')
    .insert(club)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function joinFanClub(userId, fanClubId) {
  const { error } = await supabase
    .from('fan_club_members')
    .insert({ fan_club_id: fanClubId, user_id: userId })
  if (error) throw error
}

export async function leaveFanClub(userId, fanClubId) {
  const { error } = await supabase
    .from('fan_club_members')
    .delete()
    .eq('fan_club_id', fanClubId)
    .eq('user_id', userId)
  if (error) throw error
}

export async function getFanClubMessages(fanClubId, limit = 50) {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*, user:user_id(id, name, avatar)')
    .eq('fan_club_id', fanClubId)
    .order('created_at', { ascending: true })
    .limit(limit)
  if (error) throw error
  return data || []
}

export async function sendFanClubMessage(fanClubId, userId, text) {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert({ fan_club_id: fanClubId, user_id: userId, text })
    .select()
  if (error) throw error
  return data
}

// ─── PLAYBACK HISTORY ────────────────────────────────────────────────────────

export async function logListening(userId, trackId, duration) {
  const { error } = await supabase.from('listening_history').insert({
    user_id: userId,
    track_id: trackId,
    duration,
  })
  if (error) throw error
}

export async function logWatching(userId, videoId, duration) {
  const { error } = await supabase.from('watch_history').insert({
    user_id: userId,
    video_id: videoId,
    duration,
  })
  if (error) throw error
}

// ─── SEARCH ──────────────────────────────────────────────────────────────────

export async function globalSearch(query, limit = 20) {
  const [tracks, videos, users] = await Promise.all([
    supabase.from('tracks').select('*').textSearch('name', query).limit(limit),
    supabase.from('videos').select('*').textSearch('title', query).limit(limit),
    supabase.from('users').select('*').textSearch('name', query).limit(limit),
  ])

  return {
    tracks: tracks.data || [],
    videos: videos.data || [],
    users: users.data || [],
  }
}

// ─── PLAYLISTS ───────────────────────────────────────────────────────────────

export async function getPlaylists(userId) {
  const { data, error } = await supabase
    .from('playlists')
    .select('*, playlist_tracks(count)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function createPlaylist(userId, name, description) {
  const { data, error } = await supabase
    .from('playlists')
    .insert({ user_id: userId, name, description })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function addTrackToPlaylist(playlistId, trackId) {
  const { error } = await supabase
    .from('playlist_tracks')
    .insert({ playlist_id: playlistId, track_id: trackId })
  if (error) throw error
}

// ─── REFERRALS ───────────────────────────────────────────────────────────────

export async function getReferralCode(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('referral_code')
    .eq('id', userId)
    .single()
  if (error) throw error
  return data?.referral_code
}

export async function applyReferral(referralCode, newUserId) {
  const { data: referrer, error: findError } = await supabase
    .from('users')
    .select('id')
    .eq('referral_code', referralCode)
    .single()
  if (findError) throw new Error('Invalid referral code')

  const { error } = await supabase.from('referrals').insert({
    referrer_user_id: referrer.id,
    referred_user_id: newUserId,
    referral_code: referralCode,
  })
  if (error) throw error
}

// ─── REAL-TIME SUBSCRIPTIONS ─────────────────────────────────────────────────

export function subscribeToFanClubChat(fanClubId, callback) {
  return supabase
    .channel(`chat:${fanClubId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'chat_messages',
        filter: `fan_club_id=eq.${fanClubId}`,
      },
      payload => callback(payload.new)
    )
    .subscribe()
}

export function subscribeToUserActivity(userId, callback) {
  return supabase
    .channel(`activity:${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'user_activity',
        filter: `user_id=eq.${userId}`,
      },
      payload => callback(payload.new)
    )
    .subscribe()
}
