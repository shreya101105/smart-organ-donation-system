import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaHeartbeat,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaEnvelope,
  FaLock,
  FaUserMd,
  FaExclamationTriangle
} from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { validateEmail } from '../../utils/validators';
import './Auth.css';

// SVG Google Icon
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" style={{ flexShrink: 0, filter: 'none', WebkitFilter: 'none' }}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
  </svg>
);

const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

const MAX_ATTEMPTS = 3;
const LOCKOUT_TIME_MS = 2 * 60 * 1000;
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

export const Login = () => {
  const { login, currentUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialRole = queryParams.get('role') || 'Patient';

  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  // STRICT INLINE STYLE FIX FOR ICONS
  const iconWrapperStyle = {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 99,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    background: 'transparent',
    filter: 'none',
    WebkitFilter: 'none',
    backdropFilter: 'none',
    WebkitBackdropFilter: 'none',
    boxShadow: 'none',
    color: '#4b5563',
    fontSize: '1.1rem'
  };

  useEffect(() => {
    const loadGoogleScript = () => {
      if (document.getElementById('google-gsi-script')) return;
      const script = document.createElement('script');
      script.id = 'google-gsi-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };
    loadGoogleScript();
  }, []);

  const handleOpenGoogle = () => {
    if (isLocked) {
      setError(`Account locked. Please wait ${formatTime(lockoutRemaining)} before signing in.`);
      return;
    }
    setError('');

    if (!window.google) {
      setError('Google Sign-In service is loading. Please try again in a moment.');
      return;
    }

    setGoogleLoading(true);

    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response) => {
          if (response.credential) {
            const googleUser = parseJwt(response.credential);
            if (googleUser && googleUser.email) {
              if (googleLogin) {
                googleLogin(role, googleUser.email, googleUser);
              }
              setGoogleLoading(false);
              navigate(`/${role.toLowerCase()}/dashboard`);
            } else {
              setGoogleLoading(false);
              setError('Failed to extract email from Google account.');
            }
          } else {
            setGoogleLoading(false);
            setError('Google Sign-In failed.');
          }
        },
        auto_select: false,
      });

      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          const client = window.google.accounts.oauth2.initTokenClient({
            client_id: GOOGLE_CLIENT_ID,
            scope: 'email profile',
            callback: async (tokenResponse) => {
              if (tokenResponse && tokenResponse.access_token) {
                try {
                  const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                  });
                  const userInfo = await res.json();
                  if (googleLogin) {
                    googleLogin(role, userInfo.email, userInfo);
                  }
                  setGoogleLoading(false);
                  navigate(`/${role.toLowerCase()}/dashboard`);
                } catch (e) {
                  setGoogleLoading(false);
                  setError('Failed to fetch Google profile details.');
                }
              } else {
                setGoogleLoading(false);
              }
            },
          });
          client.requestAccessToken({ prompt: 'select_account' });
        }
      });
    } catch (err) {
      setGoogleLoading(false);
      setError('Unable to initiate Google Sign-In.');
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('remembered_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }

    const lockoutTime = localStorage.getItem('login_lockout_until');
    const storedAttempts = parseInt(localStorage.getItem('login_failed_attempts') || '0', 10);

    if (lockoutTime) {
      const remaining = Math.ceil((parseInt(lockoutTime, 10) - Date.now()) / 1000);
      if (remaining > 0) {
        setIsLocked(true);
        setLockoutRemaining(remaining);
        setFailedAttempts(MAX_ATTEMPTS);
      } else {
        localStorage.removeItem('login_lockout_until');
        localStorage.removeItem('login_failed_attempts');
        setFailedAttempts(0);
      }
    } else {
      setFailedAttempts(storedAttempts);
    }
  }, []);

  useEffect(() => {
    let timer;
    if (isLocked && lockoutRemaining > 0) {
      timer = setInterval(() => {
        setLockoutRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsLocked(false);
            setFailedAttempts(0);
            localStorage.removeItem('login_lockout_until');
            localStorage.removeItem('login_failed_attempts');
            setError('');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLocked, lockoutRemaining]);

  useEffect(() => {
    if (currentUser) {
      navigate(`/${currentUser.role.toLowerCase()}/dashboard`);
    }
  }, [currentUser, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (isLocked) {
      setError(`Account locked. Try again in ${formatTime(lockoutRemaining)}.`);
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    if (rememberMe) {
      localStorage.setItem('remembered_email', email);
    } else {
      localStorage.removeItem('remembered_email');
    }

    setTimeout(() => {
      const result = login(email, password, role);
      setLoading(false);

      if (result.success) {
        setFailedAttempts(0);
        localStorage.removeItem('login_failed_attempts');
        localStorage.removeItem('login_lockout_until');
        navigate(`/${result.user.role.toLowerCase()}/dashboard`);
      } else {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);
        localStorage.setItem('login_failed_attempts', nextAttempts.toString());

        if (nextAttempts >= MAX_ATTEMPTS) {
          const lockoutUntil = Date.now() + LOCKOUT_TIME_MS;
          localStorage.setItem('login_lockout_until', lockoutUntil.toString());
          setIsLocked(true);
          setLockoutRemaining(120);
          setError(`Too many failed attempts! Account is locked for 2 minutes (120s).`);
        } else {
          const remaining = MAX_ATTEMPTS - nextAttempts;
          setError(`${result.message || 'Invalid credentials.'} ${remaining} attempt(s) remaining before a 2-minute lockout.`);
        }
      }
    }, 850);
  };

  return (
    <div className="auth-page">
      <div className="floating-blob blob-primary"></div>
      <div className="floating-blob blob-secondary"></div>
      <div className="bg-mesh"></div>

      <div className="auth-container">
        <motion.div className="auth-card" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }}>
          <div className="auth-header">
            <div className="navbar-logo" style={{ justifyContent: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'inline-flex', marginRight: '8px', filter: 'none' }}>
                <FaHeartbeat style={{ filter: 'none', color: '#10b981' }} />
              </div>
              <span>NovaLife AI Portal</span>
            </div>
            <h2 className="auth-title">NovaLife AI</h2>
            <p className="auth-subtitle">Clinical Diagnostics & Registry Portal</p>
          </div>

          <div className="auth-tab-bar">
            <button className="auth-tab active">Sign In</button>
            <button className="auth-tab" onClick={() => navigate('/register')}>Sign Up</button>
          </div>

          {isLocked && (
            <div className="alert alert-warning lockout-alert">
              <FaExclamationTriangle style={{ marginRight: '8px', flexShrink: 0, filter: 'none' }} />
              <div>
                <strong>Account Temporarily Locked</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem' }}>
                  Too many failed attempts. Try again in <strong>{formatTime(lockoutRemaining)}</strong>.
                </p>
              </div>
            </div>
          )}

          {error && !isLocked && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleLogin}>
            {/* ROLES INPUT */}
            <div className="floating-input-group">
              <label className="form-label">Roles</label>
              <div style={{ position: 'relative', width: '100%' }}>
                <div style={iconWrapperStyle}>
                  <FaUserMd />
                </div>
                <select
                  className="form-select"
                  style={{ paddingLeft: '48px' }}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={loading || googleLoading || isLocked}
                >
                  <option value="Patient">Patient</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Hospital">Hospital</option>
                  <option value="Laboratory">Laboratory</option>
                  <option value="Goverment">Goverment</option>
                  <option value="NGO">NGO</option>
                </select>
              </div>
            </div>

            {/* EMAIL INPUT */}
            <div className="floating-input-group">
              <label className="form-label">Email Credentials</label>
              <div style={{ position: 'relative', width: '100%' }}>
                <div style={iconWrapperStyle}>
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  className="form-input"
                  style={{ paddingLeft: '48px' }}
                  placeholder="e.g. nurse@system.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading || googleLoading || isLocked}
                  required
                />
              </div>
            </div>

            {/* PASSWORD INPUT */}
            <div className="floating-input-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative', width: '100%' }}>
                <div style={iconWrapperStyle}>
                  <FaLock />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  style={{ paddingLeft: '48px', paddingRight: '48px' }}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading || googleLoading || isLocked}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLocked}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: '#4b5563',
                    cursor: 'pointer',
                    zIndex: 99,
                    display: 'flex',
                    alignItems: 'center',
                    filter: 'none'
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="auth-options-stacked">
              <label className="remember-me-label">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading || googleLoading || isLocked}
                />
                <span>Remember me</span>
              </label>

              <Link to={`/forgot-password?email=${email}`} className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-shimmer"
              style={{ width: '100%' }}
              disabled={loading || googleLoading || isLocked}
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : isLocked ? (
                `Locked (${formatTime(lockoutRemaining)})`
              ) : (
                <>
                  <FaSignInAlt style={{ marginRight: '8px', filter: 'none' }} /> Login
                </>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="btn-google-standard"
            onClick={handleOpenGoogle}
            disabled={loading || googleLoading || isLocked}
          >
            {googleLoading ? (
              <span>Connecting Google...</span>
            ) : (
              <>
                <GoogleIcon />
                <span>Continue with Google</span>
              </>
            )}
          </button>

          <div className="auth-footer">
            Need credentials?{' '}
            <Link to={`/register?role=${role}`} className="auth-link">
              Register
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;