import { useEffect, useRef, useCallback } from 'react'
import usePlayerStore from '../../store/usePlayerStore'

export default function AudioEngine({ audioContext, theme, onBeat }) {
  const analyserRef = useRef(null)
  const sourceRef = useRef(null)
  const ambienceRef = useRef(null)
  const beatCounterRef = useRef(0)
  const lastBeatRef = useRef(0)
  const animFrameRef = useRef(null)
  const { currentMedia, isPlaying } = usePlayerStore()

  const createAmbienceNode = useCallback(() => {
    if (!audioContext) return null
    const bufferSize = audioContext.sampleRate * 2
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
    const data = buffer.getChannelData(0)

    if (theme === 'bar') {
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.003
        data[i] += Math.sin(i * 0.001) * 0.002
        data[i] += Math.sin(i * 0.0037) * 0.001
      }
    } else if (theme === 'negative') {
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.002
        if (Math.random() < 0.0003) {
          data[i] += (Math.random() * 2 - 1) * 0.05
        }
      }
    } else if (theme === 'tv') {
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.001
      }
    }

    const source = audioContext.createBufferSource()
    source.buffer = buffer
    source.loop = true

    const gain = audioContext.createGain()
    gain.gain.value = theme === 'bar' ? 0.12 : theme === 'negative' ? 0.08 : 0.04
    source.connect(gain)
    gain.connect(audioContext.destination)
    source.start()
    return { source, gain }
  }, [audioContext, theme])

  const scheduleRandomSFX = useCallback(() => {
    if (!audioContext || !['negative', 'tv'].includes(theme)) return

    const intervals = { negative: 15000 + Math.random() * 25000, tv: 20000 + Math.random() * 35000 }

    const timer = setTimeout(() => {
      if (!audioContext) return
      const ctx = audioContext
      const bufferSize = ctx.sampleRate * 0.5
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)

      if (theme === 'negative') {
        const type = Math.random() > 0.5 ? 'chip' : 'cough'
        if (type === 'chip') {
          for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.max(0, 1 - i / bufferSize) * 0.4
          }
        } else {
          for (let i = 0; i < bufferSize; i++) {
            const t = i / ctx.sampleRate
            data[i] = Math.sin(t * 400 * (1 + t * 5)) * Math.max(0, 1 - t / 0.3) * 0.15
          }
        }
      } else if (theme === 'tv') {
        for (let i = 0; i < bufferSize; i++) {
          const t = i / ctx.sampleRate
          data[i] = Math.sin(t * 200 * (1 + t * 3)) * Math.max(0, 1 - t / 0.6) * 0.06
        }
      }

      const sfx = ctx.createBufferSource()
      sfx.buffer = buffer
      const gain = ctx.createGain()
      gain.gain.value = 0.15
      sfx.connect(gain)
      gain.connect(ctx.destination)
      sfx.start()

      scheduleRandomSFX()
    }, intervals[theme] || 20000)

    return () => clearTimeout(timer)
  }, [audioContext, theme])

  useEffect(() => {
    if (!audioContext || !currentMedia) return

    const ambience = createAmbienceNode()
    ambienceRef.current = ambience

    const analyser = audioContext.createAnalyser()
    analyser.fftSize = 256
    analyserRef.current = analyser

    const sfxCleanup = scheduleRandomSFX()

    return () => {
      ambience?.source?.stop()
      if (sfxCleanup && typeof sfxCleanup === 'function') sfxCleanup()
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [audioContext, currentMedia, theme, createAmbienceNode, scheduleRandomSFX])

  useEffect(() => {
    if (!analyserRef.current || !audioContext) return

    const bufferLength = analyserRef.current.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const detectBeat = () => {
      if (!analyserRef.current) return
      analyserRef.current.getByteFrequencyData(dataArray)

      const avg = dataArray.reduce((a, b) => a + b, 0) / bufferLength
      const amplitude = avg / 255

      const now = Date.now()
      const isBeat = amplitude > 0.4 && (now - lastBeatRef.current) > 300

      if (isBeat) {
        lastBeatRef.current = now
        beatCounterRef.current++
      }

      onBeat({ beat: isBeat, amplitude, timestamp: now })

      animFrameRef.current = requestAnimationFrame(detectBeat)
    }

    detectBeat()

    return () => cancelAnimationFrame(animFrameRef.current)
  }, [audioContext, onBeat])

  return null
}
