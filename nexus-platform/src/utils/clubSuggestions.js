const HOUR = 3600000

export function calculateSuggestions(userClubs, allClubs) {
  const followedIds = new Set(
    userClubs.filter((c) => c.isFollowing).map((c) => c.id)
  )
  const followedGenres = userClubs
    .filter((c) => c.isFollowing)
    .map((c) => c.genre)

  const now = Date.now()

  const candidates = allClubs
    .filter((c) => !followedIds.has(c.id))
    .map((c) => {
      let score = 0
      const reasons = []

      if (followedGenres.includes(c.genre)) {
        score += 50
        reasons.push('Similar to your taste')
      }

      if (c.memberCount > 1000) {
        score += 30
        if (!reasons.length) reasons.push('Popular')
      }

      if (c.activity > 70) {
        score += 20
        if (!reasons.length) reasons.push('Trending')
      }

      if (c.recentActivityTime && now - c.recentActivityTime < 24 * HOUR) {
        score += 15
        if (!reasons.length) reasons.push('Active now')
      }

      if (!reasons.length) reasons.push('Recommended')

      return { ...c, relevanceScore: score, badgeLabel: reasons[0] }
    })

  candidates.sort((a, b) => b.relevanceScore - a.relevanceScore)
  return candidates.slice(0, 5)
}
