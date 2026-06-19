import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function getPasswordStrength(pw) {
  if (pw.length < 6) return { label: 'Weak', score: 0 }
  let s = 0
  if (pw.length >= 8) s++
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++
  if (/\d/.test(pw)) s++
  if (/[^a-zA-Z0-9]/.test(pw)) s++
  if (s <= 1) return { label: 'Weak', score: 0 }
  if (s === 2) return { label: 'Medium', score: 1 }
  return { label: 'Strong', score: 2 }
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff">
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path fill="#EA4335" d="M5.27 9.76A7.08 7.08 0 0 1 12 4.91c1.73 0 3.3.6 4.53 1.57l3.37-3.37A11.96 11.96 0 0 0 12 0C7.39 0 3.34 2.69 1.38 6.61l3.89 3.15z" />
      <path fill="#4285F4" d="M16.53 19.24A7.08 7.08 0 0 1 12 19.1c-2.66 0-5-1.5-6.19-3.69l-3.9 3.15C4.78 22.22 8.1 24 12 24c3.25 0 6.2-1.17 8.46-3.09l-3.93-3.67z" />
      <path fill="#FBBC05" d="M21.82 12.27c0-.87-.08-1.49-.23-2.18H12v3.97h5.52a4.9 4.9 0 0 1-2.12 3.22l3.93 3.67c1.84-1.7 2.96-4.23 2.96-7.7l.01-.98z" />
      <path fill="#34A853" d="M5.81 14.24A7.19 7.19 0 0 1 5.27 12c0-.78.13-1.53.37-2.24L1.38 6.61A11.94 11.94 0 0 0 0 12c0 2.66.84 5.13 2.27 7.16l3.54-2.92z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.2 11.39.6.1.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.34-1.75-1.34-1.75-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.23 1.83 1.23 1.07 1.84 2.8 1.31 3.49 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.3-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.76.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.57C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
    </svg>
  )
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('login')
  const [loading, setLoading] = useState(false)
  const [errorToast, setErrorToast] = useState(null)

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirm, setRegConfirm] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)

  const [errors, setErrors] = useState({})

  const showError = useCallback((msg) => {
    setErrorToast(msg)
    setTimeout(() => setErrorToast(null), 4000)
  }, [])

  const validateLogin = useCallback(() => {
    const e = {}
    if (!loginEmail.trim()) e.loginEmail = 'Email is required'
    else if (!validateEmail(loginEmail)) e.loginEmail = 'Invalid email'
    if (!loginPassword) e.loginPassword = 'Password is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }, [loginEmail, loginPassword])

  const validateRegister = useCallback(() => {
    const e = {}
    if (!regName.trim()) e.regName = 'Name is required'
    if (!regEmail.trim()) e.regEmail = 'Email is required'
    else if (!validateEmail(regEmail)) e.regEmail = 'Invalid email'
    if (!regPassword) e.regPassword = 'Password is required'
    else if (regPassword.length < 6) e.regPassword = 'At least 6 characters'
    if (regPassword !== regConfirm) e.regConfirm = 'Passwords do not match'
    if (!agreeTerms) e.agreeTerms = 'You must agree to the terms'
    setErrors(e)
    return Object.keys(e).length === 0
  }, [regName, regEmail, regPassword, regConfirm, agreeTerms])

  const handleLogin = useCallback(async () => {
    if (!validateLogin()) return
    setLoading(true)
    try {
      await delay(1200)
      localStorage.setItem('nexus_auth', 'true')
      navigate('/home')
    } catch {
      showError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [validateLogin, navigate, showError])

  const handleRegister = useCallback(async () => {
    if (!validateRegister()) return
    setLoading(true)
    try {
      await delay(1200)
      localStorage.setItem('nexus_auth', 'true')
      navigate('/home')
    } catch {
      showError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [validateRegister, navigate, showError])

  const handleSocialAuth = useCallback(async (provider) => {
    setLoading(true)
    try {
      await delay(800)
      localStorage.setItem('nexus_auth', 'true')
      navigate('/home')
    } catch {
      showError(`${provider} sign-in failed.`)
    } finally {
      setLoading(false)
    }
  }, [navigate, showError])

  function switchTab(tab) {
    setActiveTab(tab)
    setErrors({})
  }

  const passwordStrength = getPasswordStrength(regPassword)

  return (
    <div className="login-page">
      <div className="login-backdrop" />
      <div className="login-overlay">
        {errorToast && <div className="login-error-toast">{errorToast}</div>}

        <div className="login-card">
          <h1 className="login-logo">Audiovido</h1>
          <p className="login-subtitle">Music &amp; Movies — Free Forever</p>

          <div className="login-tabs">
            <button
              className={`login-tab${activeTab === 'login' ? ' active' : ''}`}
              onClick={() => switchTab('login')}
            >
              Login
            </button>
            <button
              className={`login-tab${activeTab === 'register' ? ' active' : ''}`}
              onClick={() => switchTab('register')}
            >
              Register
            </button>
          </div>

          {activeTab === 'login' && (
            <div className="login-form">
              <div className="login-field">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className={errors.loginEmail ? 'error' : ''}
                />
                {errors.loginEmail && <p className="field-error">{errors.loginEmail}</p>}
              </div>

              <div className="login-field">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className={errors.loginPassword ? 'error' : ''}
                />
                {errors.loginPassword && <p className="field-error">{errors.loginPassword}</p>}
              </div>

              <div className="login-row">
                <label className="login-checkbox">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <span className="login-link">Forgot password?</span>
              </div>

              <button
                className="login-btn"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? <div className="spinner" /> : 'Sign In'}
              </button>

              <div className="login-divider">
                <span>OR CONTINUE WITH</span>
              </div>

              <div className="login-social">
                <button className="login-social-btn" onClick={() => handleSocialAuth('Apple')} disabled={loading}>
                  <AppleIcon />
                </button>
                <button className="login-social-btn" onClick={() => handleSocialAuth('Google')} disabled={loading}>
                  <GoogleIcon />
                </button>
                <button className="login-social-btn" onClick={() => handleSocialAuth('GitHub')} disabled={loading}>
                  <GitHubIcon />
                </button>
              </div>

              <p className="login-footer">
                No account?{' '}
                <button onClick={() => switchTab('register')}>Register below</button>
              </p>
            </div>
          )}

          {activeTab === 'register' && (
            <div className="login-form">
              <div className="login-field">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className={errors.regName ? 'error' : ''}
                />
                {errors.regName && <p className="field-error">{errors.regName}</p>}
              </div>

              <div className="login-field">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className={errors.regEmail ? 'error' : ''}
                />
                {errors.regEmail && <p className="field-error">{errors.regEmail}</p>}
              </div>

              <div className="login-field">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className={errors.regPassword ? 'error' : ''}
                />
                {errors.regPassword && <p className="field-error">{errors.regPassword}</p>}
                {regPassword && (
                  <p className={`password-strength ${passwordStrength.label.toLowerCase()}`}>
                    {passwordStrength.label}
                  </p>
                )}
              </div>

              <div className="login-field">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                  value={regConfirm}
                  onChange={(e) => setRegConfirm(e.target.value)}
                  className={errors.regConfirm ? 'error' : ''}
                />
                {errors.regConfirm && <p className="field-error">{errors.regConfirm}</p>}
              </div>

              <label className="login-checkbox">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>I agree to Terms &amp; Conditions</span>
              </label>
              {errors.agreeTerms && <p className="field-error" style={{ marginTop: -8 }}>{errors.agreeTerms}</p>}

              <button
                className="login-btn"
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? <div className="spinner" /> : 'Create Account'}
              </button>

              <div className="login-divider">
                <span>OR SIGN UP WITH</span>
              </div>

              <div className="login-social">
                <button className="login-social-btn" onClick={() => handleSocialAuth('Apple')} disabled={loading}>
                  <AppleIcon />
                </button>
                <button className="login-social-btn" onClick={() => handleSocialAuth('Google')} disabled={loading}>
                  <GoogleIcon />
                </button>
                <button className="login-social-btn" onClick={() => handleSocialAuth('GitHub')} disabled={loading}>
                  <GitHubIcon />
                </button>
              </div>

              <p className="login-footer">
                Already have account?{' '}
                <button onClick={() => switchTab('login')}>Login above</button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
