-- ============================================================
-- Migration 001: Playlists, Mixers & Cinema Session tables
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. PLAYLISTS (schema expected by supabaseService.js)
CREATE TABLE IF NOT EXISTS playlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS playlist_tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  playlist_id uuid NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
  track_id text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- 2. MIXERS (save/restore DJ deck state)
CREATE TABLE IF NOT EXISTS mixers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  deck_state jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. CINEMA SESSIONS (sync-watch rooms)
CREATE TABLE IF NOT EXISTS cinema_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  host_user_id uuid NOT NULL,
  title text NOT NULL,
  video_ref text NOT NULL,
  video_title text DEFAULT '',
  video_thumbnail_url text DEFAULT '',
  invite_code text UNIQUE NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'ended')),
  current_position_seconds numeric DEFAULT 0,
  is_playing boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cinema_session_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES cinema_sessions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  joined_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cinema_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES cinema_sessions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  body text NOT NULL,
  type text DEFAULT 'chat' CHECK (type IN ('chat', 'reaction')),
  created_at timestamptz DEFAULT now()
);

-- 4. ROW LEVEL SECURITY
-- TODO: Tighten to auth.uid() once real auth is wired.
-- Currently permissive (all anon + authenticated) since no auth session system exists yet.

ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlist_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE mixers ENABLE ROW LEVEL SECURITY;
ALTER TABLE cinema_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cinema_session_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE cinema_messages ENABLE ROW LEVEL SECURITY;

-- Playlists (owner can CRUD, public read for sharing)
CREATE POLICY "playlists_anon_select" ON playlists FOR SELECT USING (true);
CREATE POLICY "playlists_anon_insert" ON playlists FOR INSERT WITH CHECK (true);
CREATE POLICY "playlists_anon_update" ON playlists FOR UPDATE USING (true);
CREATE POLICY "playlists_anon_delete" ON playlists FOR DELETE USING (true);

-- Playlist tracks (anyone can read/insert/delete for simplicity)
CREATE POLICY "playlist_tracks_anon_select" ON playlist_tracks FOR SELECT USING (true);
CREATE POLICY "playlist_tracks_anon_insert" ON playlist_tracks FOR INSERT WITH CHECK (true);
CREATE POLICY "playlist_tracks_anon_delete" ON playlist_tracks FOR DELETE USING (true);

-- Mixers
CREATE POLICY "mixers_anon_select" ON mixers FOR SELECT USING (true);
CREATE POLICY "mixers_anon_insert" ON mixers FOR INSERT WITH CHECK (true);
CREATE POLICY "mixers_anon_update" ON mixers FOR UPDATE USING (true);
CREATE POLICY "mixers_anon_delete" ON mixers FOR DELETE USING (true);

-- Cinema sessions (public read, host controls write)
CREATE POLICY "cinema_sessions_anon_select" ON cinema_sessions FOR SELECT USING (true);
CREATE POLICY "cinema_sessions_anon_insert" ON cinema_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "cinema_sessions_anon_update" ON cinema_sessions FOR UPDATE USING (true);

-- Cinema session participants
CREATE POLICY "cinema_participants_anon_select" ON cinema_session_participants FOR SELECT USING (true);
CREATE POLICY "cinema_participants_anon_insert" ON cinema_session_participants FOR INSERT WITH CHECK (true);

-- Cinema messages
CREATE POLICY "cinema_messages_anon_select" ON cinema_messages FOR SELECT USING (true);
CREATE POLICY "cinema_messages_anon_insert" ON cinema_messages FOR INSERT WITH CHECK (true);

-- 5. ENABLE REALTIME for cinema_session and cinema_messages
ALTER PUBLICATION supabase_realtime ADD TABLE cinema_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE cinema_messages;
