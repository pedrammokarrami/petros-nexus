import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import '../dj/audio.js'
import '../dj/components.jsx'
import '../dj/controller.css'
import DJController from '../dj/app.jsx'
import * as supabaseService from '../services/supabaseService'

const USER_ID = localStorage.getItem('audiovido_user_id') || 'demo-user'

export default function DJModePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const mixerId = searchParams.get('mixerId')
  const [restoreNote, setRestoreNote] = useState('')

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

  // Restore mixer state if mixerId param is present
  useEffect(() => {
    if (!mixerId) return
    let cancelled = false
    ;(async () => {
      try {
        const mixer = await supabaseService.getMixerById(mixerId)
        if (cancelled || !mixer) return
        const eng = window.djEngine
        if (!eng) return

        const ds = mixer.deck_state
        if (ds?.rate != null) {
          eng.setRate(ds.rate)
        }
        if (ds?.name) {
          setRestoreNote(`Mixer "${mixer.name}" restored. Track "${ds.name}" needs to be reloaded manually (file picker / drag-drop).`)
        } else {
          setRestoreNote(`Mixer "${mixer.name}" restored. Rate set to ${Math.round((ds?.rate || 1) * 100)}%.`)
        }
      } catch (e) {
        console.error('Failed to restore mixer:', e)
      }
    })()
    return () => { cancelled = true }
  }, [mixerId])

  const handleSaveMixer = async () => {
    const eng = window.djEngine
    if (!eng) return
    const name = prompt('Name this mixer session:')
    if (!name) return
    const deckState = {
      rate: eng.rate,
      name: eng.name,
      currentTime: eng.audio?.currentTime || 0,
      duration: eng.duration,
      playing: eng.playing,
      loaded: eng.loaded,
    }
    try {
      await supabaseService.saveMixer(USER_ID, name, deckState)
      alert('Mixer saved!')
    } catch (e) {
      console.error('Failed to save mixer:', e)
      alert('Failed to save mixer.')
    }
  }

  return (
    <div id="dj-root" style={{ position: 'relative', width: '100%', height: '100dvh', overflow: 'hidden', background: '#0a0b0d' }}>
      <div style={{
        position: 'fixed', top: 20, left: 20, zIndex: 999,
        display: 'flex', gap: 8,
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            width: 42, height: 42, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
            display: 'grid', placeItems: 'center',
            color: '#c8ccd0', boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={handleSaveMixer}
          style={{
            width: 42, height: 42, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
            display: 'grid', placeItems: 'center',
            color: '#39b6ff', boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}
          title="Save Mixer"
        >
          <Save size={20} />
        </button>
      </div>

      {restoreNote && (
        <div style={{
          position: 'fixed', top: 72, left: 20, right: 20, zIndex: 999,
          padding: '10px 14px', borderRadius: 10,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
          color: '#e8edf2', fontSize: 12, lineHeight: 1.4,
          maxWidth: 480,
        }}>
          {restoreNote}
          <button
            onClick={() => setRestoreNote('')}
            style={{
              marginLeft: 10, background: 'none', border: 'none', cursor: 'pointer',
              color: '#39b6ff', fontSize: 12, fontWeight: 700,
            }}
          >
            Dismiss
          </button>
        </div>
      )}

      <DJController />
    </div>
  )
}
