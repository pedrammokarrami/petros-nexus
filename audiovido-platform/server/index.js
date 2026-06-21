import express from 'express'
import cors from 'cors'
import os from 'os'
import fs from 'fs'

const app = express()
app.use(cors())
app.use(express.json())

const startTime = Date.now()

function getCpuUsage() {
  const cpus = os.cpus()
  let idle = 0, total = 0
  for (const cpu of cpus) {
    for (const type in cpu.times) {
      total += cpu.times[type]
    }
    idle += cpu.times.idle
  }
  return 1 - idle / total
}

function getRamUsage() {
  const total = os.totalmem()
  const free = os.freemem()
  return 1 - free / total
}

function getDiskUsage() {
  try {
    const stats = fs.statfsSync('/')
    return 1 - stats.bfree / stats.blocks
  } catch {
    return null
  }
}

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '1.0.0',
    uptime: (Date.now() - startTime) / 1000,
    cpu: getCpuUsage(),
    ram: getRamUsage(),
    disk: getDiskUsage(),
    timestamp: new Date().toISOString()
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`AudioVido API running on port ${PORT}`)
})
