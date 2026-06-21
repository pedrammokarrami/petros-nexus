import { useState } from 'react'
import { DiscoverDeck } from './DiscoverDeck'
import { SuggestionRail } from './SuggestionRail'

export function DiscoverTab({ suggestions, onAddFriend, loading }) {
  const [deckIndex, setDeckIndex] = useState(0)

  const handleSkip = () => {}
  const handleMessage = (friend) => {}
  const handleSelectSuggestion = (index) => {
    setDeckIndex(index)
  }

  return (
    <div className="fnd-discover-tab">
      {loading ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 24px',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: '3px solid var(--fnd-border-soft)',
              borderTopColor: 'var(--fnd-accent)',
              animation: 'spin 0.8s linear infinite',
            }}
          />
        </div>
      ) : (
        <>
          <DiscoverDeck
            suggestions={suggestions}
            onSkip={handleSkip}
            onAddFriend={onAddFriend}
            onMessage={handleMessage}
          />

          {suggestions.length > 3 && (
            <SuggestionRail
              suggestions={suggestions}
              onSelect={handleSelectSuggestion}
            />
          )}
        </>
      )}
    </div>
  )
}
