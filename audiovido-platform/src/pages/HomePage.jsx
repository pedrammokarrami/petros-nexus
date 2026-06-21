import { useState, useEffect, useCallback } from 'react'
import './HomePage.css'

const MOCK_USER = {
  name: 'Alex',
  avatar: 'https://picsum.photos/seed/avatar/200/200',
  preferences: { genres: ['pop', 'electronic', 'jazz'] },
  listeningHistory: Array.from({ length: 47 }, (_, i) => ({ date: i }))
}

const MOCK_RECOMMENDATIONS = [
  { id: 'r1', name: 'Neon Dreams', artist: 'Crystal Waves', image: 'https://picsum.photos/seed/rec1/400/400', type: 'music', reason: 'Based on your electronic preference' },
  { id: 'r2', name: 'Midnight Jazz', artist: 'Blue Note Collective', image: 'https://picsum.photos/seed/rec2/400/400', type: 'music', reason: 'Perfect for your chill mood' },
  { id: 'r3', name: 'Pulse', artist: 'Rhythm Machine', image: 'https://picsum.photos/seed/rec3/400/400', type: 'music', reason: 'Energy boost for your workout' },
  { id: 'r4', name: 'Deep Focus', artist: 'Ambient Lab', image: 'https://picsum.photos/seed/rec4/400/400', type: 'music', reason: 'Concentration mode activated' },
  { id: 'r5', name: 'The Last Horizon', artist: 'Sci-Fi Chronicles', image: 'https://picsum.photos/seed/rec5/400/400', type: 'video', year: 2024, rating: 8.7, reason: 'Trending in your region' },
  { id: 'r6', name: 'Ocean Depths', artist: 'Nature Series', image: 'https://picsum.photos/seed/rec6/400/400', type: 'video', year: 2024, rating: 9.1, reason: 'You watched similar documentaries' },
]

const MOCK_MOOD_RECS = {
  happy: { id: 'mh1', name: 'Sunshine Pop', artist: 'Beach Vibes', image: 'https://picsum.photos/seed/happy/400/400' },
  chill: { id: 'mc1', name: 'Lofi Beats', artist: 'Study Dreams', image: 'https://picsum.photos/seed/chill/400/400' },
  energetic: { id: 'me1', name: 'Power Up', artist: 'Bass Drop', image: 'https://picsum.photos/seed/energy/400/400' },
  focus: { id: 'mf1', name: 'Deep Work', artist: 'Focus Lab', image: 'https://picsum.photos/seed/focus/400/400' },
}

const MOCK_CONTINUE_MUSIC = { id: 'cm1', name: 'Shab-e Yalda', artist: 'Mohsen Yeganeh', image: 'https://picsum.photos/seed/cmusic/400/400', progress: 0.65 }

const MOCK_CONTINUE_VIDEO = { id: 'cv1', name: 'The Last Horizon', director: 'Christopher Nolan', thumbnail: 'https://picsum.photos/seed/cvideo/640/360', progress: 0.42 }

const MOCK_FRIENDS = [
  { id: 'f1', userName: 'Sarah', userAvatar: 'https://picsum.photos/seed/friend1/200/200', type: 'listening', itemName: 'Midnight Jazz', timeAgo: '2 min ago' },
  { id: 'f2', userName: 'Mike', userAvatar: 'https://picsum.photos/seed/friend2/200/200', type: 'listening', itemName: 'Power Up', timeAgo: '5 min ago' },
  { id: 'f3', userName: 'Emma', userAvatar: 'https://picsum.photos/seed/friend3/200/200', type: 'watching', itemName: 'The Last Horizon', timeAgo: '12 min ago' },
  { id: 'f4', userName: 'James', userAvatar: 'https://picsum.photos/seed/friend4/200/200', type: 'listening', itemName: 'Lofi Beats', timeAgo: '18 min ago' },
  { id: 'f5', userName: 'Luna', userAvatar: 'https://picsum.photos/seed/friend5/200/200', type: 'watching', itemName: 'Ocean Depths', timeAgo: '25 min ago' },
]

const MOCK_TRENDING = [
  { id: 't1', name: 'Neon Dreams', image: 'https://picsum.photos/seed/trend1/400/400', streams: '12.4M' },
  { id: 't2', name: 'Midnight Jazz', image: 'https://picsum.photos/seed/trend2/400/400', streams: '8.7M' },
  { id: 't3', name: 'Pulse', image: 'https://picsum.photos/seed/trend3/400/400', streams: '6.2M' },
  { id: 't4', name: 'Shab-e Yalda', image: 'https://picsum.photos/seed/trend4/400/400', streams: '5.1M' },
  { id: 't5', name: 'Deep Focus', image: 'https://picsum.photos/seed/trend5/400/400', streams: '4.8M' },
  { id: 't6', name: 'Ocean Depths', image: 'https://picsum.photos/seed/trend6/400/400', streams: '3.9M' },
  { id: 't7', name: 'Power Up', image: 'https://picsum.photos/seed/trend7/400/400', streams: '3.2M' },
  { id: 't8', name: 'Deep Work', image: 'https://picsum.photos/seed/trend8/400/400', streams: '2.8M' },
]

function simulateFetch(ms = 800) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function Header({ userData }) {
  const [greeting, setGreeting] = useState('Welcome back')
  const [unreadCount, setUnreadCount] = useState(3)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  return (
    <header className="home-header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">AudioVido</div>
        </div>
        <div className="header-center">
          <h1 className="greeting">
            {greeting}, {userData?.name || 'Friend'}!
          </h1>
        </div>
        <div className="header-right">
          <button className="icon-button notification-bell" aria-label="Notifications">
            {unreadCount > 0 && <span className="badge-dot" />}
          </button>
          <button className="icon-button settings" aria-label="Settings">
          </button>
          <button className="icon-button profile" aria-label="Profile">
            <img
              src={userData?.avatar || MOCK_USER.avatar}
              alt="Profile"
              className="profile-avatar"
            />
          </button>
        </div>
      </div>
    </header>
  )
}

function HeroSection({ selectedMood, onMoodSelect, recommendedTrack }) {
  const MOODS = [
    { key: 'happy', emoji: '😊', label: 'Happy' },
    { key: 'chill', emoji: '😌', label: 'Chill' },
    { key: 'energetic', emoji: '🔥', label: 'Energetic' },
    { key: 'focus', emoji: '🎯', label: 'Focus' },
  ]

  if (!selectedMood) {
    return (
      <section className="hero-section mood-hero">
        <div className="hero-content">
          <h2>What&apos;s your mood right now?</h2>
          <div className="mood-buttons">
            {MOODS.map(mood => (
              <button
                key={mood.key}
                className="mood-button"
                onClick={() => onMoodSelect(mood.key)}
              >
                {mood.emoji} {mood.label}
              </button>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="hero-section recommendation-hero">
      <div className="recommendation-card">
        <img
          src={recommendedTrack?.image}
          alt={recommendedTrack?.name}
          className="recommendation-image"
        />
        <div className="recommendation-overlay">
          <div className="recommendation-content">
            <p className="recommendation-label">
              Based on your {selectedMood} mood
            </p>
            <h3>{recommendedTrack?.name}</h3>
            <p className="recommendation-artist">
              {recommendedTrack?.artist}
            </p>
            <button className="play-button">
              Play Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ListeningStreakSection({ streak }) {
  const progress = (streak % 10) * 10

  return (
    <section className="streak-section">
      <div className="streak-card">
        <div className="streak-icon">🔥</div>
        <div className="streak-content">
          <h3 className="streak-title">{streak} Day Streak!</h3>
          <p className="streak-subtitle">
            {streak >= 7 ? 'Amazing consistency!' : streak >= 3 ? 'Keep it up!' : 'Listen daily to build your streak'}
          </p>
        </div>
        <div className="streak-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ContinuePlayingSection({ music, video }) {
  if (!music && !video) return null

  return (
    <section className="continue-section">
      <h2>Continue Playing</h2>
      <div className="continue-grid">
        {music && (
          <div className="continue-card music-card">
            <img src={music.image} alt={music.name} />
            <div className="card-overlay">
              <button className="continue-play-btn" aria-label="Play">
                ▶
              </button>
            </div>
            <div className="card-info">
              <p className="card-label">🎵 Music</p>
              <h4>{music.name}</h4>
              <p className="card-artist">{music.artist}</p>
            </div>
          </div>
        )}
        {video && (
          <div className="continue-card video-card">
            <img src={video.thumbnail} alt={video.name} />
            <div className="card-overlay">
              <button className="continue-play-btn" aria-label="Play">
                ▶
              </button>
            </div>
            <div className="card-info">
              <p className="card-label">🎬 Video</p>
              <h4>{video.name}</h4>
              <p className="card-artist">{video.director}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function ForYouSection({ items, loading }) {
  return (
    <section className="for-you-section">
      <h2>For You Right Now</h2>
      {loading ? (
        <div className="loading-skeleton">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card-skeleton" />
          ))}
        </div>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <div className="item-image-wrapper">
                <img src={item.image} alt={item.name} />
                <div className="item-overlay">
                  <button className="item-play-btn" aria-label="Play">▶</button>
                </div>
              </div>
              <div className="item-info">
                <div className="item-meta">
                  {item.type === 'music' ? '🎵' : '🎬'} {item.rating || item.year || ''}
                </div>
                <h4>{item.name}</h4>
                <p className="item-artist">{item.artist || item.director}</p>
                <p className="item-reason">Why: {item.reason}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

function FriendsActivitySection({ activities }) {
  return (
    <section className="friends-activity-section">
      <h2>Your Friends Are Playing</h2>
      <div className="activity-list">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-card">
            <img
              src={activity.userAvatar}
              alt={activity.userName}
              className="activity-avatar"
            />
            <div className="activity-content">
              <p className="activity-user">{activity.userName}</p>
              <p className="activity-text">
                {activity.type === 'listening' ? '🎵 Listening to' : '🎬 Watching'}{' '}
                <strong>{activity.itemName}</strong>
              </p>
              <p className="activity-time">{activity.timeAgo}</p>
            </div>
            <button className="activity-action">
              {activity.type === 'listening' ? '♪ Listen' : '▶ Watch'}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

function TrendingNowSection({ items }) {
  return (
    <section className="trending-section">
      <h2>Trending Now</h2>
      <div className="trending-grid">
        {items.map((item, index) => (
          <div key={item.id} className="trending-card">
            <div className="trending-rank">#{index + 1}</div>
            <img src={item.image} alt={item.name} />
            <div className="trending-info">
              <h4>{item.name}</h4>
              <p>{item.streams} streams</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function DiscoverSection() {
  const items = [
    { icon: '🎲', title: 'Surprise Me', desc: 'Random pick just for you', className: 'surprise' },
    { icon: '🔀', title: 'Random Song', desc: 'Spin the wheel of music', className: 'random' },
    { icon: '🏆', title: 'Daily Challenge', desc: 'Listen to 3 new tracks', className: 'challenge' },
    { icon: '🆕', title: 'New Releases', desc: 'Fresh from your favorites', className: 'new-releases' },
  ]

  return (
    <section className="discover-section">
      <h2>Discover</h2>
      <div className="discover-grid">
        {items.map((item, i) => (
          <div key={i} className={`discover-card ${item.className}`}>
            <div className="discover-icon">{item.icon}</div>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function HomePage() {
  const [userData, setUserData] = useState(null)
  const [recommendedTrack, setRecommendedTrack] = useState(null)
  const [selectedMood, setSelectedMood] = useState(null)
  const [forYouItems, setForYouItems] = useState([])
  const [friendsActivity, setFriendsActivity] = useState([])
  const [trendingItems, setTrendingItems] = useState([])
  const [continuePlayingMusic, setContinuePlayingMusic] = useState(null)
  const [continuePlayingVideo, setContinuePlayingVideo] = useState(null)
  const [listeningStreak, setListeningStreak] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAll() {
      await simulateFetch(1200)

      setUserData(MOCK_USER)

      const streak = Math.min(Math.floor((MOCK_USER.listeningHistory.length / 7) * 2 + 1), 99)
      setListeningStreak(streak)

      setContinuePlayingMusic(MOCK_CONTINUE_MUSIC)
      setContinuePlayingVideo(MOCK_CONTINUE_VIDEO)

      const forYou = [...MOCK_RECOMMENDATIONS].sort(() => Math.random() - 0.5).slice(0, 4)
      setForYouItems(forYou)

      setFriendsActivity(MOCK_FRIENDS)
      setTrendingItems(MOCK_TRENDING)
      setLoading(false)
    }

    fetchAll()
  }, [])

  const handleMoodSelect = useCallback(async (mood) => {
    setSelectedMood(mood)
    await simulateFetch(600)
    setRecommendedTrack(MOCK_MOOD_RECS[mood])
  }, [])

  return (
    <div className="home-page">
      <Header userData={userData} />

      <main className="home-content">
        <HeroSection
          selectedMood={selectedMood}
          onMoodSelect={handleMoodSelect}
          recommendedTrack={recommendedTrack}
        />

        <ListeningStreakSection streak={listeningStreak} />

        <ContinuePlayingSection
          music={continuePlayingMusic}
          video={continuePlayingVideo}
        />

        <ForYouSection
          items={forYouItems}
          loading={loading}
        />

        <FriendsActivitySection activities={friendsActivity} />

        <TrendingNowSection items={trendingItems} />

        <DiscoverSection />
      </main>
    </div>
  )
}
