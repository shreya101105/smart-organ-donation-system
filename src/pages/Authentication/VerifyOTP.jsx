import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaArrowLeft, FaCheck } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

export const VerifyOTP = () => {
  const { verifyOTP, otpState } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email') || '';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Array of refs for input navigation
  const inputRefs = useRef([]);

  // Auto focus first box
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (isNaN(value)) return; // Numbers only
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only keep last typed digit
    setOtp(newOtp);

    // Focus next box
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Focus back on Backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setError('');

    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      setError('Please enter the complete 6-digit code.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = verifyOTP(email, enteredOtp);
      setLoading(false);
      if (result.success) {
        navigate(`/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        setError(result.message || 'Verification failed. Try again.');
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
            <FaShieldAlt />
          </div>
          <h2 className="auth-title" style={{ fontSize: '1.8rem' }}>Verify OTP</h2>
          <p className="auth-subtitle" style={{ marginBottom: '20px' }}>
            Enter the verification code sent to <strong style={{ color: 'var(--text-color)' }}>{email}</strong>
          </p>

          {otpState && (
            <div
              style={{
                fontSize: '0.8rem',
                background: 'rgba(40,167,69,0.1)',
                border: '1px solid rgba(40,167,69,0.2)',
                color: '#28a745',
                padding: '8px',
                borderRadius: '6px',
                marginBottom: '20px'
              }}
            >
              [MOCK SERVICE] Current active OTP is: <strong>{otpState.otp}</strong>
            </div>
          )}

          {error && <div className="alert alert-danger" style={{ marginBottom: '20px' }}>{error}</div>}

          <form onSubmit={handleVerify}>
            {/* OTP BOX CONTAINER */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '28px'
              }}
            >
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  disabled={loading}
                  required
                  style={{
                    width: '42px',               // Box Width chota kar diya
                    height: '46px',              // Box Height chota kar diya
                    textAlign: 'center',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    color: 'var(--text-color)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary-color)';
                    e.target.style.boxShadow = '0 0 8px rgba(37, 99, 235, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-color)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              ))}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-shimmer"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              disabled={loading}
            >
              {loading ? 'Verifying...' : <><FaCheck /> Verify & Proceed</>}
            </button>
          </form>

          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
            <Link to="/forgot-password" className="auth-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaArrowLeft /> Resend OTP
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyOTP;