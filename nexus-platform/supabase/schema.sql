-- ============================================================================
-- NEXUS Platform — Supabase Database Schema
-- Run this in Supabase SQL Editor after creating the project
-- ============================================================================

-- ─── USERS ──────────────────────────────────────────────────────────────────

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR,
  avatar TEXT,
  bio TEXT,
  listening_hours INT DEFAULT 0,
  followers_count INT DEFAULT 0,
  following_count INT DEFAULT 0,

  music_taste TEXT[],
  cinema_taste TEXT[],
  friend_discovery TEXT[],
  revenue_model VARCHAR,

  knowledge_score INT DEFAULT 0,
  knowledge_level VARCHAR DEFAULT 'Stranger',

  referral_code VARCHAR UNIQUE,
  referred_by UUID REFERENCES users(id),

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX users_email_idx ON users(email);
CREATE INDEX users_referral_code_idx ON users(referral_code);

-- ─── TRACKS ─────────────────────────────────────────────────────────────────

CREATE TABLE tracks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  spotify_id VARCHAR UNIQUE,
  name VARCHAR NOT NULL,
  artist VARCHAR NOT NULL,
  album VARCHAR,
  image TEXT,
  duration INT,
  genres TEXT[],
  popularity INT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX tracks_spotify_id_idx ON tracks(spotify_id);

-- ─── VIDEOS ─────────────────────────────────────────────────────────────────

CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tmdb_id VARCHAR UNIQUE,
  title VARCHAR NOT NULL,
  director VARCHAR,
  genres TEXT[],
  image TEXT,
  rating FLOAT,
  release_date DATE,
  description TEXT,
  runtime INT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX videos_tmdb_id_idx ON videos(tmdb_id);

-- ─── FRIENDS ────────────────────────────────────────────────────────────────

CREATE TABLE friends (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user1_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user2_id UUID REFERENCES users(id) ON DELETE CASCADE,
  compatibility_score INT,
  music_match INT,
  cinema_match INT,
  activity_match INT,
  match_reasons TEXT[],
  status VARCHAR DEFAULT 'accepted',
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user1_id, user2_id)
);

CREATE INDEX friends_user1_idx ON friends(user1_id);
CREATE INDEX friends_user2_idx ON friends(user2_id);

-- ─── PLAYLISTS ──────────────────────────────────────────────────────────────

CREATE TABLE playlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR NOT NULL,
  description TEXT,
  image TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX playlists_user_id_idx ON playlists(user_id);

CREATE TABLE playlist_tracks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
  track_id UUID REFERENCES tracks(id) ON DELETE CASCADE,
  added_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(playlist_id, track_id)
);

CREATE INDEX playlist_tracks_playlist_id_idx ON playlist_tracks(playlist_id);

-- ─── FAN CLUBS ──────────────────────────────────────────────────────────────

CREATE TABLE fan_clubs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR NOT NULL,
  description TEXT,
  image TEXT,
  category VARCHAR,
  mood VARCHAR DEFAULT 'neutral',
  member_count INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX fan_clubs_creator_id_idx ON fan_clubs(creator_id);

CREATE TABLE fan_club_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fan_club_id UUID REFERENCES fan_clubs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(fan_club_id, user_id)
);

CREATE INDEX fan_club_members_fan_club_id_idx ON fan_club_members(fan_club_id);
CREATE INDEX fan_club_members_user_id_idx ON fan_club_members(user_id);

CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fan_club_id UUID REFERENCES fan_clubs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  sentiment INT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX chat_messages_fan_club_id_idx ON chat_messages(fan_club_id);
CREATE INDEX chat_messages_created_at_idx ON chat_messages(created_at);

-- ─── ACTIVITY & HISTORY ────────────────────────────────────────────────────

CREATE TABLE user_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  activity_type VARCHAR,
  item_id VARCHAR,
  item_name VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX user_activity_user_id_idx ON user_activity(user_id);
CREATE INDEX user_activity_created_at_idx ON user_activity(created_at);

CREATE TABLE listening_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  track_id UUID REFERENCES tracks(id) ON DELETE CASCADE,
  played_at TIMESTAMP DEFAULT NOW(),
  duration INT
);

CREATE INDEX listening_history_user_id_idx ON listening_history(user_id);

CREATE TABLE watch_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
  watched_at TIMESTAMP DEFAULT NOW(),
  duration INT
);

CREATE INDEX watch_history_user_id_idx ON watch_history(user_id);

-- ─── REFERRALS ──────────────────────────────────────────────────────────────

CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  referred_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  referral_code VARCHAR,
  status VARCHAR DEFAULT 'pending',
  reward INT DEFAULT 50,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

CREATE INDEX referrals_referrer_user_id_idx ON referrals(referrer_user_id);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE friends ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE fan_clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own friends" ON friends
  FOR SELECT USING (auth.uid() = user1_id OR auth.uid() = user2_id);

CREATE POLICY "Users can edit own playlists" ON playlists
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own playlists" ON playlists
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view fan clubs" ON fan_clubs
  FOR SELECT USING (true);

CREATE POLICY "Users can view messages in their clubs" ON chat_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM fan_club_members
      WHERE fan_club_id = chat_messages.fan_club_id
        AND user_id = auth.uid()
    )
  );
