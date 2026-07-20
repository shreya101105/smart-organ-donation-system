import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { validateEmail } from '../../utils/validators';
import './Auth.css';

export const Login = () => {
  const { login, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Get initial role from query param (e.g., ?role=Patient)
  const queryParams = new URLSearchParams(location.search);
  const initialRole = queryParams.get('role') || 'Patient';

  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If user is already logged in, redirect to dashboard
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
    // Simulate minor network delay
    setTimeout(() => {
      const result = login(email, password, role);
      setLoading(false);
      if (result.success) {
        navigate(`/${result.user.role.toLowerCase()}/dashboard`);
      } else {
        setError(result.message);
      }
    }, 800);
  };

  return (
    <div className="auth-wrapper">
      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-brand">
          <FaHeartbeat />
          <span>SmartOrgan Portal</span>
        </div>
        <h2>Sign In</h2>
        <p className="auth-subtitle">Select your clinical role and enter credentials to log in.</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Select Role</label>
            <select 
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
            >
              <option value="Patient">Patient</option>
              <option value="Recipient">Recipient</option>
              <option value="Donor">Donor</option>
              <option value="Doctor">Doctor</option>
              <option value="Hospital">Hospital</option>
              <option value="Laboratory">Laboratory</option>
              <option value="Admin">Admin (System Representative)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="e.g. name@system.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-input-wrapper">
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="form-input" 
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
              <button 
                type="button" 
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="auth-extra-links">
            <label className="auth-checkbox-group">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember Me</span>
            </label>
            <Link to={`/forgot-password?email=${email}`} className="auth-link">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Signing In...' : <><FaSignInAlt /> Login</>}
          </button>
        </form>

        <div style={{ marginTop: '24px', fontSize: '0.9rem', opacity: 0.85 }}>
          Don't have an account?{' '}
          <Link to={`/register?role=${role}`} className="auth-link" style={{ fontWeight: '600' }}>
            Register Now
          </Link>
        </div>

        {/* Development Helper Box */}
        <div style={{ 
          marginTop: '30px', 
          padding: '12px', 
          border: '1px dashed var(--primary-color)', 
          borderRadius: '8px', 
          fontSize: '0.78rem',
          textAlign: 'left',
          backgroundColor: 'rgba(0,123,255,0.02)'
        }}>
          <strong style={{ color: 'var(--primary-color)' }}>Demo Test Accounts:</strong><br/>
          &bull; <strong>Admin:</strong> admin@system.com / admin123<br/>
          &bull; <strong>Patient:</strong> patient@system.com / patient123<br/>
          &bull; <strong>Doctor:</strong> doctor@system.com / doctor123<br/>
          &bull; <strong>Donor:</strong> donor@system.com / donor123<br/>
          &bull; <strong>Recipient:</strong> recipient@system.com / recipient123<br/>
          &bull; <strong>Hospital:</strong> hospital@system.com / hospital123<br/>
          &bull; <strong>Laboratory:</strong> lab@system.com / lab123
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
