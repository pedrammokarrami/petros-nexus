import { useState, useEffect, useRef, useCallback } from 'react'
import { Upload, Image, Clock, Save } from 'lucide-react'

const biomes = [
  { id: 'urban', label: 'شهری' },
  { id: 'forest', label: 'جنگلی' },
  { id: 'rural', label: 'روستایی' },
  { id: 'beach', label: 'ساحلی' },
]

const particleOptions = [
  { value: 'none', label: 'هیچ' },
  { value: 'snow', label: 'برف' },
  { value: 'rain', label: 'باران' },
  { value: 'fireflies', label: 'کرم‌شب‌تاب' },
  { value: 'leaves', label: 'برگ' },
]

function darknessFactor(hour) {
  const rad = (hour / 24) * Math.PI * 2 - Math.PI
  return (1 - Math.cos(rad)) / 2
}

function goldenBump(hour, center, width, peak) {
  const d = hour - center
  return peak * Math.exp(-(d * d) / (2 * width * width))
}

function getTimeOfDay(hour) {
  const dark = darknessFactor(hour)
  const golden = Math.min(
    goldenBump(hour, 6, 1.4, 0.32) + goldenBump(hour, 18, 1.4, 0.32),
    0.4
  )
  return { dark, golden }
}

function PetrosPreview({ biomeData, avatarImage, hour }) {
  const { dark, golden } = getTimeOfDay(hour)

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/9',
        borderRadius: 12,
        overflow: 'hidden',
        background: '#060912',
      }}
    >
      {biomeData?.image && (
        <img
          src={`/${biomeData.image}`}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
          }}
        />
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 4,
          background: 'linear-gradient(180deg, rgba(255,150,60,0.9) 0%, rgba(255,90,60,0.5) 100%)',
          mixBlendMode: 'screen',
          opacity: golden,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 4,
          backgroundColor: '#060912',
          mixBlendMode: 'multiply',
          opacity: dark * 0.68,
          pointerEvents: 'none',
        }}
      />
      {avatarImage && (
        <img
          src={`/${avatarImage}`}
          alt=""
          style={{
            position: 'absolute',
            bottom: '8%',
            right: '5%',
            zIndex: 5,
            width: 80,
            height: 80,
            objectFit: 'contain',
            animation: 'previewFloat 3s ease-in-out infinite',
          }}
        />
      )}
      <style>{`
        @keyframes previewFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
      <div
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 10,
          background: 'rgba(0,0,0,0.6)',
          color: '#fff',
          padding: '4px 10px',
          borderRadius: 6,
          fontSize: 12,
          direction: 'ltr',
        }}
      >
        {Math.floor(hour)}:{String(Math.round((hour % 1) * 60)).padStart(2, '0')}
      </div>
    </div>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('urban')
  const [config, setConfig] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)
  const [manualTime, setManualTime] = useState(true)
  const [hour, setHour] = useState(12)
  const fileInputRef = useRef(null)
  const avatarFileInputRef = useRef(null)
  const [uploadTarget, setUploadTarget] = useState(null)

  useEffect(() => {
    fetch('/api/config')
      .then((r) => r.json())
      .then((cfg) => {
        setConfig(cfg)
        const now = new Date()
        setHour(now.getHours() + now.getMinutes() / 60)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (manualTime) return
    const interval = setInterval(() => {
      const now = new Date()
      setHour(now.getHours() + now.getMinutes() / 60)
    }, 30000)
    return () => clearInterval(interval)
  }, [manualTime])

  const showMessage = (text) => {
    setMessage(text)
    setTimeout(() => setMessage(null), 2000)
  }

  const handleUpload = async (e, target) => {
    const file = e.target.files?.[0]
    if (!file) return
    const form = new FormData()
    form.append('file', file)
    form.append('target', target)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: form })
      const data = await res.json()
      if (data.path) {
        const newConfig = { ...config }
        if (target === 'avatar') {
          newConfig.avatar = { ...newConfig.avatar, image: data.path }
        } else if (newConfig.biomes[target]) {
          newConfig.biomes[target] = { ...newConfig.biomes[target], image: data.path }
        }
        setConfig(newConfig)
        showMessage('آپلود شد')
      }
    } catch {
      showMessage('خطا در آپلود')
    }
  }

  const handleParticleChange = (biomeId, value) => {
    setConfig((prev) => ({
      ...prev,
      biomes: {
        ...prev.biomes,
        [biomeId]: { ...prev.biomes[biomeId], particle: value },
      },
    }))
  }

  const handleImageUploadClick = (target) => {
    setUploadTarget(target)
    setTimeout(() => fileInputRef.current?.click(), 0)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })
      showMessage('ذخیره شد')
    } catch {
      showMessage('خطا در ذخیره')
    }
    setSaving(false)
  }

  const activeBiomeData = config?.biomes?.[activeTab]
  const avatarImage = config?.avatar?.image

  return (
    <div
      style={{
        display: 'flex',
        height: '100dvh',
        background: '#0d0d1a',
        color: '#e0e0e0',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          width: 320,
          borderLeft: '1px solid #1e1e30',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          overflowY: 'auto',
        }}
      >
        <h1 style={{ fontSize: 18, fontWeight: 700, color: '#c084fc' }}>
          استودیوی پس‌زمینه
        </h1>

        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {biomes.map((b) => (
            <button
              key={b.id}
              onClick={() => setActiveTab(b.id)}
              style={{
                flex: 1,
                minWidth: 60,
                padding: '8px 4px',
                border: '1px solid',
                borderColor: activeTab === b.id ? '#c084fc' : '#2a2a40',
                borderRadius: 8,
                background: activeTab === b.id ? '#1e1a3a' : 'transparent',
                color: activeTab === b.id ? '#c084fc' : '#888',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {b.label}
            </button>
          ))}
        </div>

        <div
          style={{
            background: '#131326',
            borderRadius: 12,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 600, color: '#aaa' }}>
            {biomes.find((b) => b.id === activeTab)?.label}
          </div>

          <div>
            <button
              onClick={() => handleImageUploadClick(activeTab)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px dashed #3a3a5a',
                borderRadius: 8,
                background: '#1a1a30',
                color: '#aaa',
                cursor: 'pointer',
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <Image size={16} />
              {activeBiomeData?.image ? 'تغییر تصویر' : 'آپلود تصویر'}
            </button>
          </div>

          <div>
            <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 6 }}>
              نوع ذرات
            </label>
            <select
              value={activeBiomeData?.particle || 'none'}
              onChange={(e) => handleParticleChange(activeTab, e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #2a2a40',
                borderRadius: 8,
                background: '#1a1a30',
                color: '#e0e0e0',
                fontSize: 13,
              }}
            >
              {particleOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          style={{
            background: '#131326',
            borderRadius: 12,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 600, color: '#aaa' }}>
            آواتار
          </div>
          <button
            onClick={() => {
              setUploadTarget('avatar')
              setTimeout(() => avatarFileInputRef.current?.click(), 0)
            }}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px dashed #3a3a5a',
              borderRadius: 8,
              background: '#1a1a30',
              color: '#aaa',
              cursor: 'pointer',
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Upload size={16} />
            {avatarImage ? 'تغییر آواتار' : 'آپلود آواتار GIF'}
          </button>
        </div>

        <div
          style={{
            background: '#131326',
            borderRadius: 12,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#aaa' }}>
              <Clock size={14} style={{ verticalAlign: 'middle', marginLeft: 6 }} />
              زمان
            </div>
            <button
              onClick={() => setManualTime(!manualTime)}
              style={{
                padding: '4px 12px',
                border: '1px solid #2a2a40',
                borderRadius: 6,
                background: manualTime ? '#2a1a4a' : 'transparent',
                color: manualTime ? '#c084fc' : '#666',
                cursor: 'pointer',
                fontSize: 11,
              }}
            >
              {manualTime ? 'دستی' : 'واقعی'}
            </button>
          </div>
          {manualTime && (
            <input
              type="range"
              min={0}
              max={24}
              step={0.1}
              value={hour}
              onChange={(e) => setHour(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          )}
          <div style={{ textAlign: 'center', fontSize: 12, color: '#888', direction: 'ltr' }}>
            {Math.floor(hour)}:{String(Math.round((hour % 1) * 60)).padStart(2, '0')}
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || !config}
          style={{
            padding: '12px',
            border: 'none',
            borderRadius: 10,
            background: saving ? '#555' : '#7c3aed',
            color: '#fff',
            fontSize: 15,
            fontWeight: 700,
            cursor: saving ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Save size={18} />
          {saving ? 'در حال ذخیره...' : 'ذخیره تنظیمات'}
        </button>

        {message && (
          <div
            style={{
              padding: '8px 16px',
              background: '#1a3a1a',
              border: '1px solid #2a5a2a',
              borderRadius: 8,
              color: '#6f6',
              fontSize: 13,
              textAlign: 'center',
            }}
          >
            {message}
          </div>
        )}
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 40,
        }}
      >
        <div style={{ maxWidth: 800, width: '100%' }}>
          <PetrosPreview
            biomeData={activeBiomeData}
            avatarImage={avatarImage}
            hour={hour}
          />
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => handleUpload(e, uploadTarget)}
      />
      <input
        ref={avatarFileInputRef}
        type="file"
        accept="image/gif,image/*"
        style={{ display: 'none' }}
        onChange={(e) => handleUpload(e, 'avatar')}
      />
    </div>
  )
}
