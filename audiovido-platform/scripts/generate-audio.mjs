import { writeFileSync } from 'fs'

const SR = 44100
const DURATION = 30

const TRACKS = [
  { bpm: 80,  baseFreq: 110 },   // m1
  { bpm: 90,  baseFreq: 130 },   // m2
  { bpm: 100, baseFreq: 100 },   // m3
  { bpm: 110, baseFreq: 120 },   // m4
  { bpm: 120, baseFreq: 165 },   // m5
  { bpm: 130, baseFreq: 98 },    // m6
  { bpm: 95,  baseFreq: 140 },   // m7
  { bpm: 105, baseFreq: 88 },    // m8
  { bpm: 140, baseFreq: 175 },   // m9
  { bpm: 125, baseFreq: 105 },   // m10
]

function generateSamples(bpm, baseFreq) {
  const n = DURATION * SR
  const out = new Float32Array(n)
  const beatSec = 60 / bpm
  const halfBeat = beatSec / 2

  for (let i = 0; i < n; i++) {
    const t = i / SR
    let s = 0

    // Kick drum at each beat
    const bp = (t % beatSec) / beatSec
    if (bp < 0.12) {
      const env = 1 - bp / 0.12
      s += Math.sin(2 * Math.PI * 55 * t) * env * 0.6
    }

    // Hi-hat at offbeats
    const hp = (t % halfBeat) / halfBeat
    if (hp < 0.04) {
      const env = 1 - hp / 0.04
      s += (Math.random() * 2 - 1) * env * 0.1
    }

    // Bass line
    s += Math.sin(2 * Math.PI * baseFreq * t) * 0.12

    // Pad chord (4th above + octave)
    s += Math.sin(2 * Math.PI * (baseFreq * 4 / 3) * t) * 0.08
    s += Math.sin(2 * Math.PI * (baseFreq * 2) * t) * 0.06

    // Clip
    s = Math.max(-0.92, Math.min(0.92, s))
    out[i] = s
  }
  return out
}

function writeWAV(filename, samples) {
  const bitsPerSample = 16
  const numChannels = 1
  const dataSize = samples.length * (bitsPerSample / 8) * numChannels
  const buf = Buffer.alloc(44 + dataSize)

  buf.write('RIFF', 0)
  buf.writeUInt32LE(36 + dataSize, 4)
  buf.write('WAVE', 8)
  buf.write('fmt ', 12)
  buf.writeUInt32LE(16, 16)
  buf.writeUInt16LE(1, 20)
  buf.writeUInt16LE(numChannels, 22)
  buf.writeUInt32LE(SR, 24)
  buf.writeUInt32LE(SR * numChannels * bitsPerSample / 8, 28)
  buf.writeUInt16LE(numChannels * bitsPerSample / 8, 32)
  buf.writeUInt16LE(bitsPerSample, 34)
  buf.write('data', 36)
  buf.writeUInt32LE(dataSize, 40)

  let offset = 44
  for (let i = 0; i < samples.length; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]))
    const intVal = clamped < 0 ? clamped * 0x8000 : clamped * 0x7FFF
    buf.writeInt16LE(Math.round(intVal), offset)
    offset += 2
  }

  writeFileSync(filename, buf)
}

for (let i = 0; i < TRACKS.length; i++) {
  const { bpm, baseFreq } = TRACKS[i]
  const samples = generateSamples(bpm, baseFreq)
  const path = `public/assets/audio/track-${i + 1}.wav`
  writeWAV(path, samples)
  console.log(`Generated ${path}: ${bpm} BPM, ${baseFreq} Hz base`)
}
