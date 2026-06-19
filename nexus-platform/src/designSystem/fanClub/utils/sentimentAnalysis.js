const happyWords = ['love', 'awesome', 'amazing', 'great', 'beautiful', 'wow', 'fire', 'insane', 'perfect', 'vibe', 'legend', 'unreal']
const sadWords = ['hate', 'sad', 'terrible', 'awful', 'bad', 'worst', 'boring', 'trash']

export function calculateSentiment(text) {
  let score = 0
  happyWords.forEach(word => {
    if (text.toLowerCase().includes(word)) score += 10
  })
  sadWords.forEach(word => {
    if (text.toLowerCase().includes(word)) score -= 10
  })
  return Math.max(-50, Math.min(50, score))
}
