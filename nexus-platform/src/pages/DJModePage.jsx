import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import '../dj/audio.js'
import '../dj/components.jsx'
import '../dj/controller.css'
import DJController from '../dj/app.jsx'

export default function DJModePage() {
  const navigate = useNavigate()

  useEffect(() => {
    function fitStage() {
      const panel = document.querySelector('.panel')
      if (!panel) return
      const scale = Math.min(window.innerWidth / 1280, (window.innerHeight - 92) / 1560)
      panel.style.transform = 'translate(-50%, -50%) scale(' + scale + ')'
    }
    window.addEventListener('resize', fitStage)

    const obs = new MutationObserver(fitStage)
    const root = document.getElementById('dj-root')
    if (root) obs.observe(root, { childList: true, subtree: true })
    fitStage()

    window.addEventListener('dragover', (e) => { e.preventDefault(); document.querySelector('.deckbar')?.classList.add('drag') })
    window.addEventListener('dragleave', (e) => { if (e.relatedTarget === null) document.querySelector('.deckbar')?.classList.remove('drag') })
    const onDrop = (e) => {
      e.preventDefault()
      document.querySelector('.deckbar')?.classList.remove('drag')
      const f = e.dataTransfer?.files?.[0]
      if (f && window.djEngine) window.djEngine.load(f)
    }
    window.addEventListener('drop', onDrop)

    return () => {
      window.removeEventListener('resize', fitStage)
      obs.disconnect()
    }
  }, [])

  return (
    <div id="dj-root" style={{ position: 'relative', width: '100%', height: '100dvh', overflow: 'hidden', background: '#0a0b0d' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'fixed', top: 20, left: 20, zIndex: 999,
          width: 42, height: 42, borderRadius: '50%', border: 'none', cursor: 'pointer',
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
          display: 'grid', placeItems: 'center',
          color: '#c8ccd0', boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
        }}
      >
        <ArrowLeft size={20} />
      </button>
      <DJController />
    </div>
  )
}
