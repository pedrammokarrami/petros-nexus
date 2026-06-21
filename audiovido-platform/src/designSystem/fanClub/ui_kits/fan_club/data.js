// Sample club content. Two themes ship: Night Shift (music) and The Velvet Reel (cinema).

const NIGHT_SHIFT = {
  slug: "night-shift",
  scope: "club-music",
  name: "Night Shift",
  kicker: "Music Club · After Hours",
  tagline: "Where the late shift trades headphones.",
  marqueeContent: "♪ NIGHT SHIFT ♪",
  caption: "LIVE FROM A CROWDED BAR · 9:42 PM · TOKYO",
  nowPlaying: { track: "Nocturne 12 · Submerge Mix", artist: "Submerge", progress: 0.42 },
  challenge: {
    title: "Drop a song for the rain",
    description: "Share one track that fits a gray afternoon. Voted winner plays Sunday.",
    progress: 0.34,
    progressLabel: "17 of 50 shared",
    tag: "Daily",
  },
  mood: 0.72,
  trendingTopic: "#NIGHTSHIFT",
  seedMessages: [
    { id: 1, author: "DJ Echo", persona: "dj",        time: "now", text: "welcome back to the floor — fresh tape just dropped 🎧" },
    { id: 2, author: "Reni Q",  persona: "spotlight", time: "2m",  text: "that drum break is unreal. who's the producer",
      reactions: [{ emoji: "🔥", count: 7 }, { emoji: "🤯", count: 3 }] },
    { id: 3, author: "Mara",    persona: "member",    time: "1m",  text: "i could live in this song" },
    { id: 4, author: "Iggy",    persona: "member",    time: "<1m", text: "okay this is the album of the year and we're 19 minutes in",
      reactions: [{ emoji: "💯", count: 4 }] },
    { id: 5, author: "Submerge",persona: "member",    time: "<1m", text: "ty mara — that means a lot. tape 2 incoming friday" },
  ],
  members: [
    { name: "Reni Q",      active: true,  status: "live"    },
    { name: "Mara",                       status: "online"  },
    { name: "Iggy",                       status: "online"  },
    { name: "DJ Echo",     active: true,  status: "live"    },
    { name: "Submerge",                   status: "online"  },
    { name: "K Honey",                    status: "online"  },
    { name: "Vinyl Joon",                 status: "offline" },
    { name: "Atlas",                      status: "online"  },
    { name: "Polestar",                   status: "online"  },
    { name: "Birdfoot",                   status: "online"  },
    { name: "Cassette",                   status: "offline" },
  ],
};

const VELVET_REEL = {
  slug: "velvet-reel",
  scope: "club-cinema",
  name: "The Velvet Reel",
  kicker: "Cinema Club · Late Show",
  tagline: "Bring your favorite scene. Bring strong opinions.",
  marqueeContent: "▸ THE VELVET REEL ◂",
  caption: "REEL 3 / SCENE 7 · MULHOLLAND DR. · 1:48 AM",
  nowPlaying: { track: "Score · The Long Take", artist: "Ennio Marc.", progress: 0.65 },
  challenge: {
    title: "Frame of the week",
    description: "Drop a single still that haunts you. Vote opens Sunday at midnight.",
    progress: 0.58,
    progressLabel: "29 of 50 shared",
    tag: "Weekly",
  },
  mood: 0.38,
  trendingTopic: "#LATESHOW",
  seedMessages: [
    { id: 1, author: "The Usher", persona: "dj",        time: "now", text: "house lights down. tonight's reel: a slow build, no spoilers." },
    { id: 2, author: "Cassette",  persona: "spotlight", time: "3m",  text: "the way the camera holds on her face for those extra two seconds. brutal.",
      reactions: [{ emoji: "🎬", count: 9 }, { emoji: "👁", count: 4 }] },
    { id: 3, author: "Lumen",     persona: "member",    time: "2m",  text: "best long take of the decade and i won't be arguing" },
    { id: 4, author: "Bea",       persona: "member",    time: "1m",  text: "okay but the score doing 80% of the work here",
      reactions: [{ emoji: "💯", count: 6 }] },
    { id: 5, author: "Reel",      persona: "member",    time: "<1m", text: "this scene is why i fell in love with movies as a kid" },
  ],
  members: [
    { name: "Cassette",   active: true, status: "live"    },
    { name: "Lumen",                    status: "online"  },
    { name: "Bea",                      status: "online"  },
    { name: "The Usher",  active: true, status: "live"    },
    { name: "Reel",                     status: "online"  },
    { name: "Mara",                     status: "online"  },
    { name: "Frame",                    status: "offline" },
    { name: "Cinemax",                  status: "online"  },
    { name: "Atlas",                    status: "online"  },
    { name: "Klieg",                    status: "offline" },
  ],
};

const CLUBS = {
  "night-shift": NIGHT_SHIFT,
  "velvet-reel": VELVET_REEL,
};

window.__CLUBS = CLUBS;
