const HOUR = 3600000
const NOW = Date.now()

const ALL_CLUBS = [
  {
    id: 'night-shift',
    name: 'Night Shift',
    description: 'Late-night music club with electric cyan vibes and the best underground tracks.',
    imageUrl: 'https://picsum.photos/seed/nightshift/400/200',
    memberCount: 1240,
    isFollowing: false,
    genre: 'electronic',
    activity: 85,
    recentActivityTime: NOW - 2 * HOUR,
  },
  {
    id: 'velvet-reel',
    name: 'The Velvet Reel',
    description: 'Cinema lovers unite. Hot pink curtains, classic reels, and frame-by-frame analysis.',
    imageUrl: 'https://picsum.photos/seed/velvetreel/400/200',
    memberCount: 856,
    isFollowing: true,
    genre: 'indie',
    activity: 62,
    recentActivityTime: NOW - 10 * HOUR,
  },
  {
    id: 'persian-pop',
    name: 'Persian Pop Society',
    description: 'Dedicated to the best of Persian pop music — past, present and future.',
    imageUrl: 'https://picsum.photos/seed/persianpop/400/200',
    memberCount: 4320,
    isFollowing: false,
    genre: 'pop',
    activity: 91,
    recentActivityTime: NOW - 1 * HOUR,
  },
  {
    id: 'classic-masters',
    name: 'Classic Masters',
    description: 'Celebrating timeless Persian classical vocals and instrumentation.',
    imageUrl: 'https://picsum.photos/seed/classic/400/200',
    memberCount: 8740,
    isFollowing: false,
    genre: 'classical',
    activity: 45,
    recentActivityTime: NOW - 48 * HOUR,
  },
  {
    id: 'tehran-underground',
    name: 'Tehran Underground',
    description: 'Independent artists, alternative sounds, and the future edge of the scene.',
    imageUrl: 'https://picsum.photos/seed/underground/400/200',
    memberCount: 432,
    isFollowing: false,
    genre: 'alternative',
    activity: 78,
    recentActivityTime: NOW - 6 * HOUR,
  },
  {
    id: 'jazz-fusion',
    name: 'Jazz & Fusion Lounge',
    description: 'Persian jazz, fusion experiments, and late-night listening sessions.',
    imageUrl: 'https://picsum.photos/seed/jazz/400/200',
    memberCount: 3520,
    isFollowing: true,
    genre: 'jazz',
    activity: 73,
    recentActivityTime: NOW - 4 * HOUR,
  },
  {
    id: 'dance-electronic',
    name: 'Dance & Electronic',
    description: 'Persian electronic, remixes, and dance-floor energy.',
    imageUrl: 'https://picsum.photos/seed/dance/400/200',
    memberCount: 7640,
    isFollowing: false,
    genre: 'electronic',
    activity: 88,
    recentActivityTime: NOW - 30 * 60 * 1000,
  },
  {
    id: 'podcast-hub',
    name: 'Podcast Producers Hub',
    description: 'Connect with creators, share tips, and discover new shows.',
    imageUrl: 'https://picsum.photos/seed/podcast/400/200',
    memberCount: 2810,
    isFollowing: false,
    genre: 'talk',
    activity: 55,
    recentActivityTime: NOW - 20 * HOUR,
  },
  {
    id: 'lofi-lounge',
    name: 'Lo-Fi Lounge',
    description: 'Chill beats, vinyl crackle, and late-night study sessions.',
    imageUrl: 'https://picsum.photos/seed/lofi/400/200',
    memberCount: 5890,
    isFollowing: false,
    genre: 'electronic',
    activity: 76,
    recentActivityTime: NOW - 3 * HOUR,
  },
  {
    id: 'rock-rewind',
    name: 'Rock Rewind',
    description: 'Classic rock anthems and deep cuts from the golden era.',
    imageUrl: 'https://picsum.photos/seed/rock/400/200',
    memberCount: 9210,
    isFollowing: false,
    genre: 'rock',
    activity: 69,
    recentActivityTime: NOW - 12 * HOUR,
  },
  {
    id: 'soul-kitchen',
    name: 'Soul Kitchen',
    description: 'Deep soul, funk, and grooves that move your feet.',
    imageUrl: 'https://picsum.photos/seed/soul/400/200',
    memberCount: 2150,
    isFollowing: false,
    genre: 'soul',
    activity: 81,
    recentActivityTime: NOW - 5 * HOUR,
  },
  {
    id: 'synthwave-club',
    name: 'Synthwave Club',
    description: 'Neon-drenched retro futurescapes and dark synth.',
    imageUrl: 'https://picsum.photos/seed/synthwave/400/200',
    memberCount: 1670,
    isFollowing: false,
    genre: 'electronic',
    activity: 93,
    recentActivityTime: NOW - 45 * 60 * 1000,
  },
]

export async function fetchUserFanClubs() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(ALL_CLUBS), 400)
  })
}

export async function fetchAllClubs() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(ALL_CLUBS), 300)
  })
}

export async function joinClub(clubId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, clubId }), 200)
  })
}
