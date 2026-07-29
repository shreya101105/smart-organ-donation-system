import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHeartbeat,
  FaUserAlt,
  FaHospital,
  FaVials,
  FaHandHoldingHeart,
  FaLandmark,
  FaArrowLeft,
  FaArrowRight
} from 'react-icons/fa';

import PatientRegistration from '../RegistrationForms/PatientRegistration';
import HospitalRegistration from '../RegistrationForms/HospitalRegistration';
import NgoRegistration from '../RegistrationForms/NGORegistration';
import GovernmentRegistration from '../RegistrationForms/GovernmentRegistration';
import LaboratoryRegistration from '../RegistrationForms/LaboratoryRegistration';

export const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialRole = queryParams.get('role') || 'Patient';

  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [step, setStep] = useState(1);

  // Terms and conditions acceptance state
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const roles = [
    { id: 'Patient', label: 'Patient', icon: <FaUserAlt /> },
    { id: 'Hospital', label: 'Hospital', icon: <FaHospital /> },
    { id: 'Laboratory', label: 'Laboratory', icon: <FaVials /> },
    { id: 'NGO', label: 'NGO', icon: <FaHandHoldingHeart /> },
    { id: 'Government', label: 'Government', icon: <FaLandmark /> }
  ];

  useEffect(() => {
    const qRole = queryParams.get('role');
    if (qRole && roles.some((r) => r.id === qRole)) {
      setSelectedRole(qRole);
    }
  }, [location]);

  // Framer Motion animation presets matching Login.jsx
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

  const renderForm = () => {
    switch (selectedRole) {
      case 'Patient':
        return <PatientRegistration />;
      case 'Hospital':
        return <HospitalRegistration />;
      case 'Laboratory':
        return <LaboratoryRegistration />;
      case 'NGO':
        return <NgoRegistration />;
      case 'Government':
        return <GovernmentRegistration />;
      default:
        return <PatientRegistration />;
    }
  };

  return (
    <div className="auth-page">
      {/* Background Ambience / Blobs */}
      <div className="floating-blob blob-primary"></div>
      <div className="floating-blob blob-secondary"></div>
      <div className="bg-mesh"></div>

      {/* BADA BOX: Increased Max-Width to 850px for spacious layout */}
      <div className="auth-container" style={{ maxWidth: '850px', width: '100%' }}>
        <motion.div
          className="auth-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          style={{ width: '100%', padding: '45px 40px' }}
        >
          {/* Header Branding */}
          <motion.div className="auth-header" variants={itemVariants}>
            <div
              className="navbar-logo"
              style={{
                justifyContent: 'center',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <FaHeartbeat
                className="navbar-logo-icon"
                style={{ fontSize: '1.8rem', color: 'var(--primary-color)' }}
              />
              <span style={{ fontWeight: '800', fontSize: '1.2rem' }}>
                NovaLife AI Portal
              </span>
            </div>
            <h2 className="auth-title">NovaLife AI</h2>
            <p className="auth-subtitle">Clinical Diagnostics & Registry Portal</p>
          </motion.div>

          {/* Tab Bar Toggle */}
          <motion.div className="auth-tab-bar" variants={itemVariants}>
            <button className="auth-tab" onClick={() => navigate('/login')}>
              Sign In
            </button>
            <button className="auth-tab active">Sign Up</button>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* STEP 1: ROLE SELECTION */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h3
                  variants={itemVariants}
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    marginBottom: '24px',
                    color: 'var(--text-color)'
                  }}
                >
                  Select Registration Roles
                </motion.h3>

                {/* ROLES IN 1 WIDE HORIZONTAL LINE */}
                <motion.div
                  className="role-grid"
                  variants={itemVariants}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: '14px',
                    marginBottom: '25px'
                  }}
                >
                  {roles.map((r) => {
                    const isSelected = selectedRole === r.id;
                    return (
                      <div
                        key={r.id}
                        className={`role-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedRole(r.id)}
                        style={{
                          flex: 1,
                          padding: '22px 10px',
                          borderRadius: 'var(--radius-md)'
                        }}
                      >
                        <div className="role-icon" style={{ fontSize: '1.8rem' }}>{r.icon}</div>
                        <span
                          className="role-name"
                          style={{
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {r.label}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>

                {/* TERMS & CONDITIONS CHECKBOX */}
                <motion.div
                  variants={itemVariants}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    marginBottom: '25px',
                    fontSize: '0.875rem',
                    color: 'var(--text-muted, #a1a1aa)'
                  }}
                >
                  <input
                    type="checkbox"
                    id="terms-checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      accentColor: 'var(--primary-color)'
                    }}
                  />
                  <label htmlFor="terms-checkbox" style={{ cursor: 'pointer', userSelect: 'none' }}>
                    I agree to the{' '}
                    <Link to="/terms" className="auth-link" style={{ textDecoration: 'underline' }}>
                      Terms & Conditions
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="auth-link" style={{ textDecoration: 'underline' }}>
                      Privacy Policy
                    </Link>
                  </label>
                </motion.div>

                {/* Continue Action Button */}
                <motion.button
                  type="button"
                  className="btn btn-primary btn-shimmer"
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '1rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    opacity: acceptedTerms ? 1 : 0.6,
                    cursor: acceptedTerms ? 'pointer' : 'not-allowed'
                  }}
                  onClick={() => acceptedTerms && setStep(2)}
                  disabled={!acceptedTerms}
                  variants={itemVariants}
                  whileTap={acceptedTerms ? { scale: 0.98 } : {}}
                >
                  Continue as {selectedRole} <FaArrowRight />
                </motion.button>
              </motion.div>
            )}

            {/* STEP 2: REGISTRATION FORM */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Back to Step 1 */}
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="auth-link"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.9rem',
                    marginBottom: '20px',
                    padding: 0
                  }}
                >
                  <FaArrowLeft /> Back to Role Selection
                </button>

                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: '700',
                    marginBottom: '6px',
                    color: 'var(--text-color)'
                  }}
                >
                  {selectedRole} Setup
                </h3>
                <p className="auth-subtitle" style={{ marginBottom: '24px' }}>
                  Please complete the credential requirements below
                </p>

                {/* Form Wrapper Box */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '28px 24px',
                    textAlign: 'left'
                  }}
                >
                  {renderForm()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Navigation */}
          <motion.div className="auth-footer" variants={itemVariants}>
            Already registered?{' '}
            <Link to={`/login?role=${selectedRole}`} className="auth-link">
              Sign In Here
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;