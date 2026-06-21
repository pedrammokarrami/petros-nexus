// Kit v2 — Hyper-immersive Fan Club rooms.
// Bartender lines + members positioned spatially (top/left coords of the venue).

const ROCK_CLUB = {
  slug: "rock",
  scope: "club-rock",
  name: "The Loud Room",
  kicker: "Rock · Late shift",
  tagline: "Bass in your chest. Strangers shouting along.",
  bg: { slotId: "bg-rock", placeholder: "Drop a photo of a rock club" },
  bartender: {
    name: "Doc",
    slotId: "char-rock-bartender",
    placeholder: "Drop the bartender (rock)",
    lines: [
      "what'll it be, friend?",
      "47 in tonight. packed house.",
      "the new pressing's already half gone.",
      "tape just dropped. side A's a riot.",
      "drinks are colder than the sound mix.",
    ],
  },
  marquee: "TAPE ONE · SIDE A",
  caption: "LIVE FROM A CROWDED BAR · 9:42 PM",
  drinks: [
    { id: "whiskey",  name: "Whiskey, neat",     emoji: "🥃" },
    { id: "beer",     name: "Cold beer",         emoji: "🍺" },
    { id: "shot",     name: "Tequila shot",      emoji: "🍷" },
    { id: "water",    name: "Water (taking it easy)", emoji: "💧" },
  ],
  neonSigns: [
    { text: "LIVE MUSIC",  top: "10%", left: "8%",  rotate: -6, color: "#ff6a3d", flicker: true },
    { text: "OPEN MIC",    top: "15%", right: "10%", rotate: 4, color: "#ff00ff", flicker: false },
  ],
  members: [
    // Each member sits "at" a coordinate of the venue
    { name: "Reni Q",     top: "78%", left: "12%", activity: 0.85, msg: "that drum break is unreal" },
    { name: "Mara",       top: "82%", left: "26%", activity: 0.3 },
    { name: "Iggy",       top: "76%", left: "40%", activity: 0.5,  msg: "okay tape 1 side a IS the year" },
    { name: "K Honey",    top: "84%", left: "55%", activity: 0.2 },
    { name: "Vinyl Joon", top: "78%", left: "68%", activity: 0.4 },
    { name: "Atlas",      top: "82%", left: "82%", activity: 0.55, msg: "submerge you legend" },
    { name: "Polestar",   top: "70%", left: "92%", activity: 0.2 },
  ],
  initialChat: [
    { id: 1, author: "DJ Echo", persona: "dj",        text: "welcome back to the floor — fresh tape just dropped 🎧" },
    { id: 2, author: "Reni Q",  persona: "spotlight", text: "that drum break is unreal. who's the producer", intensity: 0.9 },
    { id: 3, author: "Iggy",    persona: "member",    text: "okay tape 1 side a IS the year", intensity: 0.6 },
  ],
};

const CINEMA_CLUB = {
  slug: "cinema",
  scope: "club-cinema",
  name: "The Velvet Reel",
  kicker: "Cinema · Late show",
  tagline: "Bring your favorite scene. Bring strong opinions.",
  bg: { slotId: "bg-cinema", placeholder: "Drop a photo of a cinema interior" },
  bartender: {
    name: "Mona",
    slotId: "char-cinema-bartender",
    placeholder: "Drop the cinema attendant",
    lines: [
      "house lights are coming down.",
      "fresh popcorn — three minutes.",
      "no spoilers. tonight's a slow build.",
      "balcony's still got two seats.",
      "the projector hates the cold.",
    ],
  },
  marquee: "REEL 3 · SCENE 7",
  caption: "MULHOLLAND DR. · 1:48 AM",
  drinks: [
    { id: "wine",     name: "Red wine",          emoji: "🍷" },
    { id: "espresso", name: "Double espresso",   emoji: "☕" },
    { id: "popcorn",  name: "Buttered popcorn",  emoji: "🍿" },
    { id: "soda",     name: "Cherry soda",       emoji: "🥤" },
  ],
  neonSigns: [
    { text: "NOW SHOWING", top: "12%", left: "10%", rotate: -4, color: "#f72585", flicker: true },
    { text: "BALCONY",     top: "18%", right: "8%", rotate: 5,  color: "#00f5d4", flicker: false },
  ],
  members: [
    { name: "Cassette", top: "76%", left: "16%", activity: 0.9, msg: "that long take. brutal." },
    { name: "Lumen",    top: "78%", left: "30%", activity: 0.3 },
    { name: "Bea",      top: "82%", left: "44%", activity: 0.5,  msg: "the score is doing 80% of the work" },
    { name: "Reel",     top: "76%", left: "58%", activity: 0.25 },
    { name: "Mara",     top: "80%", left: "72%", activity: 0.35, msg: "why i fell in love with movies" },
    { name: "Cinemax",  top: "74%", left: "85%", activity: 0.2 },
  ],
  initialChat: [
    { id: 1, author: "The Usher", persona: "dj",        text: "house lights down. tonight's reel: a slow build, no spoilers." },
    { id: 2, author: "Cassette",  persona: "spotlight", text: "the way the camera holds on her face for those extra two seconds. brutal.", intensity: 0.85 },
    { id: 3, author: "Bea",       persona: "member",    text: "the score is doing 80% of the work here", intensity: 0.5 },
  ],
};

window.__CLUBS_V2 = { rock: ROCK_CLUB, cinema: CINEMA_CLUB };
