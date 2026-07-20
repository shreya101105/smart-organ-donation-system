import React, { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaKey, FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { validateEmail } from '../../utils/validators';

export const ForgotPassword = () => {
  const { initiateForgotPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const [email, setEmail] = useState(queryParams.get('email') || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = initiateForgotPassword(email);
      setLoading(false);
      if (result.success) {
        navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
      } else {
        setError(result.message);
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
          <FaKey />
        </div>
        <h2>Forgot Password?</h2>
        <p className="auth-subtitle">
          Enter your registered email address below. We will send you a 6-digit OTP code to verify your request.
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="e.g. name@system.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Sending OTP...' : <><FaPaperPlane /> Send Verification OTP</>}
          </button>
        </form>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
          <Link to="/login" className="auth-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaArrowLeft /> Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
