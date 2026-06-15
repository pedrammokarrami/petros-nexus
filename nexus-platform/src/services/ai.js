const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY
const BASE_URL = 'https://openrouter.ai/api/v1/chat/completions'
const FALLBACK_MODELS = [
  'meta-llama/llama-3.1-8b-instruct',
  'mistralai/mistral-7b-instruct',
  'google/gemma-2-9b-it:free',
]

export async function getCompletion(messages, systemPrompt) {
  if (!API_KEY) return null

  const context = [
    { role: 'system', content: systemPrompt },
    ...messages,
  ]

  for (const model of FALLBACK_MODELS) {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'Nexus Search',
        },
        body: JSON.stringify({ model, messages: context }),
      })

      if (!res.ok) {
        const err = await res.text()
        console.error(`AI model ${model} failed (${res.status}):`, err)
        continue
      }

      const data = await res.json()
      const content = data.choices?.[0]?.message?.content
      if (content) return content.trim()
    } catch (err) {
      console.error(`AI model ${model} threw:`, err.message)
      continue
    }
  }

  return null
}
