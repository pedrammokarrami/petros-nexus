import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const ASSETS_DIR = path.resolve(__dirname, '../../shared/petros-background/assets')
const CONFIG_PATH = path.resolve(__dirname, '../../shared/petros-background/config.json')

fs.mkdirSync(ASSETS_DIR, { recursive: true })

const upload = multer({ storage: multer.memoryStorage() })

const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'no file' })
  const target = req.body.target || 'misc'
  const ext = path.extname(req.file.originalname) || '.jpg'
  const filename = `${target}${ext}`
  const filepath = path.join(ASSETS_DIR, filename)
  fs.writeFileSync(filepath, req.file.buffer)
  const relativePath = `petros-assets/${filename}`
  res.json({ path: relativePath })
})

app.get('/api/config', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'))
    res.json(data)
  } catch {
    res.status(500).json({ error: 'config not found' })
  }
})

app.post('/api/config', (req, res) => {
  try {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(req.body, null, 2), 'utf-8')
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'config write failed' })
  }
})

const PORT = 4321
app.listen(PORT, () => {
  console.log(`BG Studio API running on http://localhost:${PORT}`)
})
