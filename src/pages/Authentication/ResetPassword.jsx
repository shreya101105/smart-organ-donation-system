import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { validatePassword } from '../../utils/validators';

export const ResetPassword = () => {
  const { resetPassword, checkPasswordReused } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Independent visibility states
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Password Strength Logic
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: 'transparent', width: '0%' };

    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) return { score, label: 'Weak', color: '#ef4444', width: '33%' };
    if (score <= 4) return { score, label: 'Medium', color: '#f59e0b', width: '66%' };
    return { score, label: 'Strong', color: '#10b981', width: '100%' };
  };

  const strength = getPasswordStrength(password);

  // Fallback Check for Password Reuse if AuthContext method isn't present
  const isPasswordAlreadyUsed = (userEmail, newPassword) => {
    if (checkPasswordReused) {
      return checkPasswordReused(userEmail, newPassword);
    }
    try {
      const historyKey = `password_history_${userEmail.toLowerCase()}`;
      const savedHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
      return savedHistory.includes(newPassword);
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (strength.label === 'Weak') {
      setError('Your password is too weak. Add numbers, capital letters, or special characters.');
      return;
    }

    // CHECK IF PASSWORD ALREADY USED
    if (isPasswordAlreadyUsed(email, password)) {
      setError('This password has already been used previously. Please choose a new password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = resetPassword(email, password);
      setLoading(false);

      if (result && result.success) {
        // Save to password history to prevent future reuse
        try {
          const historyKey = `password_history_${email.toLowerCase()}`;
          const currentHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
          if (!currentHistory.includes(password)) {
            currentHistory.push(password);
            localStorage.setItem(historyKey, JSON.stringify(currentHistory));
          }
        } catch (e) {
          // ignore localStorage error
        }

        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError((result && result.message) || 'Failed to update password. Please try again.');
      }
    }, 800);
  };

  return (
    <div className="auth-page">
      {/* Background Ambience / Blobs */}
      <div className="floating-blob blob-primary"></div>
      <div className="floating-blob blob-secondary"></div>
      <div className="bg-mesh"></div>

      <div className="auth-container">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '16px' }}>
            <FaLock />
          </div>
          <h2 className="auth-title" style={{ fontSize: '1.8rem' }}>Reset Password</h2>
          <p className="auth-subtitle" style={{ marginBottom: '24px' }}>
            Configure a new secure password for your account.
          </p>

          {success && (
            <div className="alert alert-success" style={{ marginBottom: '20px' }}>
              Password updated successfully! Redirecting you to login...
            </div>
          )}

          {error && <div className="alert alert-danger" style={{ marginBottom: '20px' }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* NEW PASSWORD FIELD */}
            <div className="form-group" style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>
                New Password
              </label>
              <div className="password-input-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading || success}
                  style={{ width: '100%', paddingRight: '45px' }}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPass(!showPass)}
                  disabled={loading || success}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted, #a1a1aa)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem'
                  }}
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* LIVE PASSWORD STRENGTH METER */}
              {password && (
                <div style={{ marginTop: '10px' }}>
                  <div
                    style={{
                      height: '4px',
                      width: '100%',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '2px',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: strength.width,
                        backgroundColor: strength.color,
                        transition: 'all 0.3s ease-in-out'
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.75rem',
                      marginTop: '6px'
                    }}
                  >
                    <span style={{ color: 'var(--text-muted, #a1a1aa)' }}>Password strength:</span>
                    <strong style={{ color: strength.color }}>{strength.label}</strong>
                  </div>
                </div>
              )}
            </div>

            {/* CONFIRM PASSWORD FIELD */}
            <div className="form-group" style={{ marginBottom: '28px', textAlign: 'left' }}>
              <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>
                Confirm Password
              </label>
              <div className="password-input-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type={showConfirmPass ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Re-type password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading || success}
                  style={{ width: '100%', paddingRight: '45px' }}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  disabled={loading || success}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted, #a1a1aa)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem'
                  }}
                >
                  {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-shimmer"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              disabled={loading || success}
            >
              {loading ? 'Updating Password...' : <><FaCheck /> Reset Password</>}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;