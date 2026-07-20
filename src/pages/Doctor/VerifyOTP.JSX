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
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  // Auto focus first box
  useEffect(() => {
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (isNaN(value)) return; // Allow numbers only
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only keep last typed digit
    setOtp(newOtp);

    // Focus next box
    if (value && index < 5 && inputRefs[index + 1].current) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Focus back on Backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs[index - 1].current) {
      inputRefs[index - 1].current.focus();
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
    <div className="auth-wrapper">
      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '16px' }}>
          <FaShieldAlt />
        </div>
        <h2>Verify OTP</h2>
        <p className="auth-subtitle">
          Enter the verification code sent to <strong style={{ color: 'var(--text-color)' }}>{email}</strong>
        </p>

        {otpState && (
          <div style={{ 
            fontSize: '0.8rem', 
            background: 'rgba(40,167,69,0.1)', 
            border: '1px solid rgba(40,167,69,0.2)',
            color: '#28a745',
            padding: '8px', 
            borderRadius: '6px',
            marginBottom: '20px'
          }}>
            [MOCK SERVICE] Current active OTP is: <strong>{otpState.otp}</strong>
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleVerify}>
          <div className="otp-container">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={inputRefs[idx]}
                type="text"
                className="otp-box"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                disabled={loading}
                required
              />
            ))}
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
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
  );
};

export default VerifyOTP;
