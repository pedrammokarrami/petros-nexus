import { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, ChevronDown, ChevronUp } from 'lucide-react'
import FanClubCard from '../components/FanClubCard'
import { fetchUserFanClubs, fetchAllClubs } from '../utils/mockFanClubsData'
import { calculateSuggestions } from '../utils/clubSuggestions'
import './fanClubsListPage.css'

export default function FanClubsListPage() {
  const navigate = useNavigate()
  const [clubs, setClubs] = useState([])
  const [allClubs, setAllClubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAllSuggestions, setShowAllSuggestions] = useState(false)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        setLoading(true)
        const [userData, catalogData] = await Promise.all([
          fetchUserFanClubs(),
          fetchAllClubs(),
        ])
        if (!cancelled) {
          setClubs(userData)
          setAllClubs(catalogData)
        }
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const toggleFollow = useCallback((id) => {
    setClubs((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFollowing: !c.isFollowing } : c))
    )
  }, [])

  const toggleSuggestionFollow = useCallback((id) => {
    setClubs((prev) => {
      const exists = prev.some((c) => c.id === id)
      if (exists) {
        return prev.map((c) =>
          c.id === id ? { ...c, isFollowing: true } : c
        )
      }
      const suggestion = suggestions.find((s) => s.id === id)
      if (suggestion) {
        return [...prev, { ...suggestion, isFollowing: true }]
      }
      return prev
    })
  }, [])

  const suggestions = useMemo(
    () => calculateSuggestions(clubs, allClubs),
    [clubs, allClubs]
  )

  const userClubCards = useMemo(
    () =>
      clubs.map((club) => (
        <FanClubCard
          key={club.id}
          club={club}
          onJoin={() => navigate(`/hub/fan-club/${club.id}`)}
          onToggleFollow={toggleFollow}
        />
      )),
    [clubs, navigate, toggleFollow]
  )

  const suggestionCards = useMemo(() => {
    const visible = showAllSuggestions ? suggestions : suggestions.slice(0, 3)
    return visible.map((club) => (
      <FanClubCard
        key={club.id}
        club={club}
        badgeLabel={club.badgeLabel}
        onJoin={() => navigate(`/hub/fan-club/${club.id}`)}
        onToggleFollow={toggleSuggestionFollow}
      />
    ))
  }, [suggestions, navigate, toggleSuggestionFollow, showAllSuggestions])

  const showSuggestions = suggestions.length > 0 && clubs.filter((c) => c.isFollowing).length < 3

  if (loading) {
    return (
      <div className="fan-clubs-list-container">
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading your fan clubs...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="fan-clubs-list-container">
        <div className="loading-state">
          <p style={{ color: '#ff4d6d' }}>Something went wrong: {error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: 16,
              padding: '8px 20px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.06)',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fan-clubs-list-container">
      <div className="fan-clubs-header">
        <div>
          <h1>Fan Clubs</h1>
          <p>Discover communities built around the music you love.</p>
        </div>
      </div>

      <div className="fan-clubs-grid">{userClubCards}</div>

      {clubs.length === 0 && !loading && (
        <div className="empty-state">
          <p>No fan clubs yet. Explore suggestions below to get started!</p>
        </div>
      )}

      {showSuggestions && (
        <section className="suggested-section">
          <div className="suggested-header">
            <h2>Suggested For You</h2>
            {suggestions.length > 3 && (
              <button
                className="suggested-toggle"
                onClick={() => setShowAllSuggestions((v) => !v)}
              >
                {showAllSuggestions ? (
                  <>
                    Show less <ChevronUp size={14} />
                  </>
                ) : (
                  <>
                    View All ({suggestions.length}) <ChevronDown size={14} />
                  </>
                )}
              </button>
            )}
          </div>
          <div className="fan-clubs-grid">{suggestionCards}</div>
        </section>
      )}

      <button
        className="btn-add-club-fab"
        onClick={() => navigate('/hub/fan-club/create')}
      >
        <Plus size={20} />
        <span>Create New Club</span>
      </button>
    </div>
  )
}
