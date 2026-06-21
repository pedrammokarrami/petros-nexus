import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react'

const LIVE2D_PARAM_MOUTH = 'ParamMouthOpenY'

const Live2DAvatar = forwardRef(function Live2DAvatar({ modelPath, orbState = 'idle' }, ref) {
  const canvasRef = useRef(null)
  const appRef = useRef(null)
  const modelRef = useRef(null)
  const animFrameRef = useRef(null)
  const lipSyncActiveRef = useRef(false)
  const lipSyncValueRef = useRef(0)

  const cleanup = useCallback(() => {
    lipSyncActiveRef.current = false
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current)
      animFrameRef.current = null
    }
    if (modelRef.current) {
      try { modelRef.current.destroy() } catch {}
      modelRef.current = null
    }
    if (appRef.current) {
      try { appRef.current.destroy(true, { children: true }) } catch {}
      appRef.current = null
    }
  }, [])

  useImperativeHandle(ref, () => ({
    startLipSync() {
      lipSyncActiveRef.current = true
    },
    stopLipSync() {
      lipSyncActiveRef.current = false
      const model = modelRef.current
      if (!model) return
      try {
        model.internalModel.coreModel.setParameterValueById(LIVE2D_PARAM_MOUTH, 0)
      } catch {}
    },
    reactToMood(mood) {
      if (!modelRef.current) return
      try {
        const em = modelRef.current.internalModel.motionManager.expressionManager
        if (!em || !em.definitions) return
        const defs = em.definitions.map((d) => d.Name || d.name)
        const mapping = {
          action: ['angry', 'anger', 'surprised'],
          horror: ['angry', 'surprised', 'fear'],
          comedy: ['happy', 'joy'],
          romance: ['happy', 'love'],
          drama: ['sad'],
          scifi: ['surprised'],
          fantasy: ['happy', 'surprised'],
          'music-energetic': ['happy', 'angry'],
          'music-chill': ['happy', 'relaxed'],
          'music-sad': ['sad'],
          'music-happy': ['happy'],
        }
        const targets = mapping[mood] || []
        let chosen = null
        for (const t of targets) {
          if (defs.includes(t)) { chosen = t; break }
        }
        if (chosen) {
          modelRef.current.expression(chosen)
        } else if (defs.length > 0) {
          modelRef.current.expression(defs[0])
        }
      } catch {}
    },
    playMotion(group = 'TapBody') {
      if (!modelRef.current) return
      try {
        modelRef.current.motion(group)
      } catch {}
    },
    focus(x, y, instant) {
      if (modelRef.current) modelRef.current.focus(x, y, instant)
    },
    motion(group, index) {
      if (modelRef.current) modelRef.current.motion(group, index)
    },
  }), [])

  useEffect(() => {
    if (!canvasRef.current || !modelPath) return

    let cancelled = false

    async function init() {
      const PIXI = await import('pixi.js')
      window.PIXI = PIXI

      const { Live2DModel } = await import('pixi-live2d-display/cubism4')

      if (cancelled) return

      const app = new PIXI.Application({
        view: canvasRef.current,
        width: canvasRef.current.clientWidth,
        height: canvasRef.current.clientHeight,
        backgroundAlpha: 0,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
      })

      appRef.current = app

      const model = await Live2DModel.from(modelPath, { autoUpdate: false })

      if (cancelled) { model.destroy(); return }

      modelRef.current = model

      const baseWidth = model.internalModel.originalWidth || model.width
      const baseHeight = model.internalModel.originalHeight || model.height

      function resize() {
        if (!appRef.current || !modelRef.current) return
        const w = appRef.current.view.clientWidth
        const h = appRef.current.view.clientHeight
        appRef.current.renderer.resize(w, h)

        const scale = Math.min(w / baseWidth, h / baseHeight) * 1.1
        modelRef.current.scale.set(scale)
        modelRef.current.position.set(w / 2, h / 2 + baseHeight * scale * 0.05)
        modelRef.current.anchor.set(0.5, 0.5)
      }

      resize()
      window.addEventListener('resize', resize)

      model.once('destroy', () => {
        window.removeEventListener('resize', resize)
      })

      app.stage.addChild(model)

      model.autoUpdate = true

      const em = model.internalModel.motionManager.expressionManager
      if (em && em.definitions) {
        const names = em.definitions.map((d) => d.Name || d.name)
        console.log(`[Live2D] ${model.internalModel.settings.name} expressions:`, names)
      }

      const params = model.internalModel.coreModel._parameterIds
        || (model.internalModel.coreModel.parameters ? Array.from({ length: model.internalModel.coreModel.parameters.getCount() }, (_, i) => model.internalModel.coreModel.parameters.getIds()[i]) : [])
      console.log(`[Live2D] ${model.internalModel.settings.name} all parameters:`, params)
      console.log(`[Live2D] ${model.internalModel.settings.name} has ${LIVE2D_PARAM_MOUTH}:`, params.includes(LIVE2D_PARAM_MOUTH))

      app.ticker.add(() => {
        if (lipSyncActiveRef.current && modelRef.current) {
          lipSyncValueRef.current = 0.3 + Math.abs(Math.sin(Date.now() * 0.015)) * 0.7
          try {
            modelRef.current.internalModel.coreModel.setParameterValueById(LIVE2D_PARAM_MOUTH, lipSyncValueRef.current)
          } catch {}
          if (Math.random() < 0.03) console.log('[LipSync] tick, value:', lipSyncValueRef.current.toFixed(2))
        }
      }, null, PIXI.UPDATE_PRIORITY.LOW)

      function tick() {
        if (cancelled) return
        animFrameRef.current = requestAnimationFrame(tick)
      }
      tick()
    }

    init()

    return () => {
      cancelled = true
      cleanup()
    }
  }, [modelPath, cleanup])

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          borderRadius: '50%',
        }}
      />
    </div>
  )
})

export default Live2DAvatar
