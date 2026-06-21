import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Header } from '../designSystem/friendsPage/ui_kits/friends-page/Header'
import { FriendsTab } from '../designSystem/friendsPage/ui_kits/friends-page/FriendsTab'
import { DiscoverTab } from '../designSystem/friendsPage/ui_kits/friends-page/DiscoverTab'
import { SearchTab } from '../designSystem/friendsPage/ui_kits/friends-page/SearchTab'
import { ReferralsTab } from '../designSystem/friendsPage/ui_kits/friends-page/ReferralsTab'
import { FriendProfileModal } from '../designSystem/friendsPage/ui_kits/friends-page/FriendProfileModal'
import { mockFriends } from '../data/mockFriends'
import '../designSystem/friendsPage/styles.css'
import './FriendsPage.css'

function generateSuggestions(count = 8) {
  const names = [
    'Elena Voss', 'Marcus Chen', 'Lena Park', 'Omar Hassan',
    'Zara Khan', 'Leo Bianchi', 'Aria Patel', 'Kai Nakamura',
    'Noor Ali', 'Sofia Reyes', 'Felix Wagner', 'Yuna Kim',
    'Idris Diallo', 'Chloe Moreau', 'Ravi Mehta', 'Tara O\'Brien',
  ]
  const bios = [
    'Electronic music producer & vinyl collector',
    'Film buff — Tarantino era is peak cinema',
    'Indie game developer & synthwave enthusiast',
    'Podcast host & documentary filmmaker',
    'Classical pianist exploring ambient soundscapes',
    'Street photographer & film noir obsessive',
    'Record label curator & DJ',
    'Animation student & Studio Ghibli superfan',
    'Live sound engineer & jazz lover',
    'Scriptwriter working on my first feature',
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: `suggestion-${i + 1}`,
    name: names[i % names.length],
    avatar: `https://picsum.photos/seed/sug${i + 1}/100/100`,
    isOnline: Math.random() > 0.4,
    bio: bios[i % bios.length],
    compatibility: Math.floor(65 + Math.random() * 35),
    stats: {
      music: Math.floor(50 + Math.random() * 50),
      cinema: Math.floor(40 + Math.random() * 60),
      activity: Math.floor(30 + Math.random() * 70),
    },
  }))
}

const referralCode = 'AudioVido-SARIR'

function generateReferrals() {
  const names = [
    'Ali Rezai', 'Sara Mohammadi', 'Peyman Ghasemi', 'Nina Kordi',
  ]
  return names.map((name, i) => ({
    id: `ref-${i + 1}`,
    name,
    avatar: `https://picsum.photos/seed/ref${i + 1}/100/100`,
    joinDate: `${['2 weeks', '1 month', '3 weeks', '5 days'][i]} ago`,
    xp: [50, 50, 50, 50][i],
  }))
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
}

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState('friends')
  const [friends, setFriends] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [referrals, setReferrals] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [filterMode, setFilterMode] = useState('all')

  useEffect(() => {
    const timer = setTimeout(() => {
      setFriends(mockFriends.map(f => ({
        ...f,
        sharedInterest: ['Music Lover', 'Cinema Fan', 'DJ', 'Producer'][Math.floor(Math.random() * 4)],
      })))
      setSuggestions(generateSuggestions())
      setReferrals(generateReferrals())
      setLoading(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  const handleAddFriend = (suggestion) => {
    if (!friends.find(f => f.id === suggestion.id)) {
      setFriends(prev => [{
        id: suggestion.id,
        name: suggestion.name,
        avatar: suggestion.avatar,
        isOnline: true,
        lastSeen: null,
        sharedInterest: 'New Friend',
      }, ...prev])
    }
  }

  return (
    <motion.div
      className="friends-page-outer"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <div className="friends-page-container">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'friends' && (
          <FriendsTab
            friends={friends}
            filter={filterMode}
            onFilterChange={setFilterMode}
            onFriendClick={setSelectedFriend}
            loading={loading}
          />
        )}

        {activeTab === 'discover' && (
          <DiscoverTab
            suggestions={suggestions}
            onAddFriend={handleAddFriend}
            loading={loading}
          />
        )}

        {activeTab === 'search' && (
          <SearchTab
            allUsers={[...friends, ...suggestions]}
            onFriendClick={setSelectedFriend}
          />
        )}

        {activeTab === 'referrals' && (
          <ReferralsTab
            referrals={referrals}
            referralCode={referralCode}
          />
        )}

        {selectedFriend && (
          <FriendProfileModal
            friend={selectedFriend}
            onClose={() => setSelectedFriend(null)}
            onMessage={() => console.log('Message', selectedFriend.name)}
            onAddFriend={() => {
              handleAddFriend(selectedFriend)
              setSelectedFriend(null)
            }}
          />
        )}
      </div>
    </motion.div>
  )
}
