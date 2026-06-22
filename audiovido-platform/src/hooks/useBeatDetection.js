import { useRef, useCallback, useEffect, useState } from 'react'

export default function useBeatDetection(audioContext, mediaElement) {
  const [beatData, setBeatData] = useState({ beat: false, amplitude: 0 })
  const analyserRef = useRef(null)
  const sourceRef = useRef(null)
  const frameRef = useRef(null)
  const lastBeatRef = useRef(0)

  useEffect(() => {
    if (!audioContext || !mediaElement) return

    if (!sourceRef.current) {
      sourceRef.current = audioContext.createMediaElementSource(mediaElement)
    }

    const analyser = audioContext.createAnalyser()
    analyser.fftSize = 256
    analyserRef.current = analyser

    sourceRef.current.connect(analyser)
    analyser.connect(audioContext.destination)

    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const detect = () => {
      if (!analyserRef.current) return
      analyserRef.current.getByteFrequencyData(dataArray)

      const avg = dataArray.reduce((a, b) => a + b, 0) / bufferLength
      const amplitude = avg / 255
      const now = Date.now()
      const isBeat = amplitude > 0.4 && (now - lastBeatRef.current) > 250

      if (isBeat) lastBeatRef.current = now

      setBeatData({ beat: isBeat, amplitude })

      frameRef.current = requestAnimationFrame(detect)
    }

    detect()
    return () => cancelAnimationFrame(frameRef.current)
  }, [audioContext, mediaElement])

  return beatData
}
