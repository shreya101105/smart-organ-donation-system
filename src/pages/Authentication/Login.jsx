import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaEye, FaEyeSlash, FaSignInAlt, FaEnvelope, FaLock, FaUserMd } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { validateEmail } from '../../utils/validators';
import './Auth.css';

export const Login = () => {
  const { login, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialRole = queryParams.get('role') || 'Patient';

  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate(`/${currentUser.role.toLowerCase()}/dashboard`);
    }
  }, [currentUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = login(email, password, role);
      setLoading(false);
      if (result.success) {
        navigate(`/${result.user.role.toLowerCase()}/dashboard`);
      } else {
        setError(result.message);
      }
    }, 850);
  };

  // Framer Motion presets
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="auth-page">
      {/* Floating Animated Blobs */}
      <div className="floating-blob blob-primary"></div>
      <div className="floating-blob blob-secondary"></div>
      <div className="bg-mesh"></div>

      <div className="auth-container">
        <motion.div 
          className="auth-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="auth-header" variants={itemVariants}>
            <div className="navbar-logo" style={{ justifyContent: 'center', marginBottom: '14px' }}>
              <FaHeartbeat className="navbar-logo-icon" />
              <span>NovaLife AI Portal</span>
            </div>
            <h2 className="auth-title">NovaLife AI</h2>
            <p className="auth-subtitle">Clinical Diagnostics & Registry Portal</p>
          </motion.div>

          <motion.div className="auth-tab-bar" variants={itemVariants}>
            <button className="auth-tab active">Sign In</button>
            <button className="auth-tab" onClick={() => navigate('/register')}>Sign Up</button>
          </motion.div>

          {error && (
            <motion.div className="alert alert-danger" variants={itemVariants}>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin}>
            <motion.div className="floating-input-group" variants={itemVariants}>
              <label className="form-label">Gatekeeper Role</label>
              <div className="input-with-icon">
                <FaUserMd className="input-icon" />
                <select 
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={loading}
                >
                  <option value="Patient">Patient Workspace</option>
                  <option value="Recipient">Recipient Console</option>
                  <option value="Donor">Donor Portal</option>
                  <option value="Doctor">Doctor Dashboard</option>
                  <option value="Hospital">Hospital Authority</option>
                  <option value="Laboratory">Laboratory Diagnostics</option>
                  <option value="Admin">Admin Terminal</option>
                </select>
              </div>
            </motion.div>

            <motion.div className="floating-input-group" variants={itemVariants}>
              <label className="form-label">Email Credentials</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="e.g. nurse@system.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </motion.div>

            <motion.div className="floating-input-group" variants={itemVariants}>
              <label className="form-label">Passcode Pin</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="form-input" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                  style={{ paddingRight: '48px' }}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-color)',
                    opacity: 0.6,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </motion.div>

            <motion.div 
              style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '24px' }}
              variants={itemVariants}
            >
              <Link to={`/forgot-password?email=${email}`} className="auth-link">
                Forgot Password?
              </Link>
            </motion.div>

            <motion.button 
              type="submit" 
              className="btn btn-primary btn-shimmer" 
              style={{ width: '100%' }} 
              disabled={loading}
              variants={itemVariants}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <span className="flex-center" style={{ gap: '8px' }}>
                  <span className="skeleton-row" style={{ width: '16px', height: '16px', borderRadius: '50%', margin: 0 }}></span>
                  Authenticating...
                </span>
              ) : (
                <><FaSignInAlt /> Clear Login</>
              )}
            </motion.button>
          </form>

          <motion.div className="auth-footer" variants={itemVariants}>
            Need credentials?{' '}
            <Link to={`/register?role=${role}`} className="auth-link">
              Register Role Gateway
            </Link>
          </motion.div>

          {/* Clinical Simulator Box */}
          <motion.div 
            style={{ 
              marginTop: '32px', 
              padding: '16px', 
              border: '1px dashed var(--border-color)', 
              borderRadius: 'var(--radius-sm)', 
              fontSize: '0.8rem',
              textAlign: 'left',
              background: 'rgba(255, 255, 255, 0.01)'
            }}
            variants={itemVariants}
          >
            <strong style={{ color: 'var(--primary-color)' }}>Demo Test Accounts:</strong><br/>
            &bull; <strong>Admin:</strong> admin@system.com / admin123<br/>
            &bull; <strong>Patient:</strong> patient@system.com / patient123<br/>
            &bull; <strong>Doctor:</strong> doctor@system.com / doctor123<br/>
            &bull; <strong>Donor:</strong> donor@system.com / donor123<br/>
            &bull; <strong>Recipient:</strong> recipient@system.com / recipient123<br/>
            &bull; <strong>Hospital:</strong> hospital@system.com / hospital123<br/>
            &bull; <strong>Laboratory:</strong> lab@system.com / lab123
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
