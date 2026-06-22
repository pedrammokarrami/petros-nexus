import { useEffect, useRef, useCallback } from 'react'
import usePlayerStore from '../../store/usePlayerStore'

function createNoiseBuffer(ctx, duration, generator) {
  const size = ctx.sampleRate * duration
  const buffer = ctx.createBuffer(1, size, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  generator(data, ctx)
  return buffer
}

export default function AudioEngine({ audioContext, theme, onBeat }) {
  const analyserRef = useRef(null)
  const sourceRef = useRef(null)
  const activeNodes = useRef([])
  const sfxTimerRef = useRef(null)
  const beatFrameRef = useRef(null)
  const lastBeatRef = useRef(0)
  const { currentMedia, isPlaying } = usePlayerStore()

  const cleanupNodes = useCallback(() => {
    activeNodes.current.forEach((n) => {
      try { n?.disconnect?.(); n?.stop?.() } catch {}
    })
    activeNodes.current = []
  }, [])

  useEffect(() => {
    if (!audioContext) return

    const ctx = audioContext

    const masterGain = ctx.createGain()
    masterGain.gain.value = 0.8
    masterGain.connect(ctx.destination)
    activeNodes.current.push(masterGain)

    const analyser = ctx.createAnalyser()
    analyser.fftSize = 256
    analyserRef.current = analyser

    let spatialNode = null
    let eqNode = null

    if (theme === 'modern') {
      const panner = ctx.createStereoPanner()
      panner.pan.value = 0

      const convolver = ctx.createConvolver()
      const irLen = ctx.sampleRate * 0.8
      const irBuffer = ctx.createBuffer(2, irLen, ctx.sampleRate)
      for (let ch = 0; ch < 2; ch++) {
        const data = irBuffer.getChannelData(ch)
        for (let i = 0; i < irLen; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.15))
        }
      }
      convolver.buffer = irBuffer
      convolver.connect(analyser)
      panner.connect(convolver)
      spatialNode = panner

      const delay = ctx.createDelay(0.08)
      delay.delayTime.value = 0.035
      const delayGain = ctx.createGain()
      delayGain.gain.value = 0.15
      delay.connect(delayGain)
      delayGain.connect(analyser)
      activeNodes.current.push(delay, delayGain)
    }

    if (theme === 'negative') {
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 3000

      const distortion = ctx.createWaveShaper()
      const curve = new Float32Array(256)
      for (let i = 0; i < 256; i++) {
        const x = (i - 128) / 128
        curve[i] = Math.tanh(x * 0.8) * 0.9 + x * 0.1
      }
      distortion.curve = curve

      filter.connect(distortion)
      distortion.connect(analyser)
      eqNode = filter
    }

    if (theme === 'tv') {
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.value = 800
      filter.Q.value = 0.5
      filter.connect(analyser)
      eqNode = filter
    }

    if (theme === 'bar') {
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowshelf'
      filter.frequency.value = 200
      filter.gain.value = -4
      filter.connect(analyser)
      eqNode = filter
    }

    if (spatialNode) {
      spatialNode.connect(analyser)
    } else if (eqNode) {
      eqNode.connect(analyser)
    }

    if (!spatialNode && !eqNode) {
      const dryGain = ctx.createGain()
      dryGain.connect(analyser)
      activeNodes.current.push(dryGain)
    }

    analyser.connect(masterGain)

    const ambience = (() => {
      if (theme === 'bar') {
        const buffer = createNoiseBuffer(ctx, 3, (data) => {
          for (let i = 0; i < data.length; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.004
            data[i] += Math.sin(i * 0.002) * 0.003
            data[i] += Math.sin(i * 0.005) * 0.001
          }
        })
        const src = ctx.createBufferSource()
        src.buffer = buffer
        src.loop = true
        const gain = ctx.createGain()
        gain.gain.value = 0.1
        src.connect(gain)
        gain.connect(masterGain)
        src.start()
        return { source: src, gain }
      }
      if (theme === 'tv') {
        const buffer = createNoiseBuffer(ctx, 3, (data) => {
          for (let i = 0; i < data.length; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.001
          }
        })
        const src = ctx.createBufferSource()
        src.buffer = buffer
        src.loop = true
        const gain = ctx.createGain()
        gain.gain.value = 0.025
        src.connect(gain)
        gain.connect(masterGain)
        src.start()
        return { source: src, gain }
      }
      return null
    })()
    if (ambience) activeNodes.current.push(ambience.source, ambience.gain)

    const scheduleSFX = () => {
      if (!audioContext || !['negative', 'tv'].includes(theme)) return

      const intervals = { negative: 12000 + Math.random() * 20000, tv: 18000 + Math.random() * 30000 }
      const delay = intervals[theme] || 20000

      sfxTimerRef.current = setTimeout(() => {
        if (!audioContext) return
        const c = audioContext
        let buffer

        if (theme === 'negative') {
          const type = Math.random() > 0.5 ? 'chip' : 'cough'
          if (type === 'chip') {
            buffer = createNoiseBuffer(c, 0.4, (data) => {
              for (let i = 0; i < data.length; i++) {
                const env = Math.max(0, 1 - i / data.length)
                data[i] = (Math.random() * 2 - 1) * env * env * 0.35
              }
            })
          } else {
            buffer = createNoiseBuffer(c, 0.5, (data) => {
              for (let i = 0; i < data.length; i++) {
                const t = i / c.sampleRate
                data[i] = Math.sin(t * 350 * (1 + t * 8)) * Math.max(0, 1 - t / 0.4) * 0.12
                data[i] += Math.sin(t * 500) * Math.max(0, 1 - t / 0.4) * 0.08
              }
            })
          }
        } else if (theme === 'tv') {
          buffer = createNoiseBuffer(c, 0.8, (data) => {
            for (let i = 0; i < data.length; i++) {
              const t = i / c.sampleRate
              data[i] = Math.sin(t * 250 * (1 + Math.sin(t * 2) * 0.3)) * Math.max(0, 1 - t / 0.7) * 0.05
              data[i] += Math.sin(t * 180) * Math.max(0, 1 - t / 0.7) * 0.03
            }
          })
        }

        if (buffer) {
          const src = c.createBufferSource()
          src.buffer = buffer
          const gain = c.createGain()
          gain.gain.value = theme === 'tv' ? 0.04 : 0.1
          src.connect(gain)
          gain.connect(c.destination)
          src.start()
          activeNodes.current.push(src, gain)
        }

        scheduleSFX()
      }, delay)
    }

    if (['negative', 'tv'].includes(theme)) {
      scheduleSFX()
    }

    return () => {
      cleanupNodes()
      clearTimeout(sfxTimerRef.current)
      cancelAnimationFrame(beatFrameRef.current)
    }
  }, [audioContext, theme, cleanupNodes])

  useEffect(() => {
    if (!analyserRef.current || !audioContext) return

    const bufferLength = analyserRef.current.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const detect = () => {
      if (!analyserRef.current || audioContext.state === 'closed') return
      analyserRef.current.getByteFrequencyData(dataArray)

      const sum = dataArray.reduce((a, b) => a + b, 0)
      const avg = sum / bufferLength
      const amplitude = avg / 255

      const now = Date.now()
      const isBeat = amplitude > 0.4 && (now - lastBeatRef.current) > 280

      if (isBeat) lastBeatRef.current = now

      onBeat({ beat: isBeat, amplitude, timestamp: now })

      beatFrameRef.current = requestAnimationFrame(detect)
    }

    beatFrameRef.current = requestAnimationFrame(detect)
    return () => cancelAnimationFrame(beatFrameRef.current)
  }, [audioContext, onBeat])

  return null
}
