import React, { useState, useEffect, useContext } from 'react';
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
import { AuthContext } from '../../context/AuthContext';

export const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = useContext(AuthContext);

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

  // Framer Motion animation presets
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.08
      }
    },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 }
  };

  // Generic success handler for any form submit
  const handleRegistrationSuccess = async (formData) => {
    try {
      if (authContext && authContext.register) {
        await authContext.register(formData || {}, selectedRole);
      }
    } catch (err) {
      // Fallback redirection without breaking flow
    } finally {
      const targetPath = `/${selectedRole.toLowerCase()}/dashboard`;
      navigate(targetPath);
    }
  };

  const renderForm = () => {
    const props = { onSuccess: handleRegistrationSuccess, role: selectedRole };
    switch (selectedRole) {
      case 'Patient':
        return <PatientRegistration {...props} />;
      case 'Hospital':
        return <HospitalRegistration {...props} />;
      case 'Laboratory':
        return <LaboratoryRegistration {...props} />;
      case 'NGO':
        return <NgoRegistration {...props} />;
      case 'Government':
        return <GovernmentRegistration {...props} />;
      default:
        return <PatientRegistration {...props} />;
    }
  };

  return (
    <div className="auth-page">
      {/* Background Ambience / Blobs */}
      <div className="floating-blob blob-primary"></div>
      <div className="floating-blob blob-secondary"></div>
      <div className="bg-mesh"></div>

      {/* Main Container */}
      <div className="auth-container" style={{ maxWidth: '850px', width: '100%' }}>
        <motion.div
          className="auth-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          style={{ width: '100%', padding: '45px 40px' }}
        >
          {/* Header Branding */}
          <div className="auth-header">
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
          </div>

          {/* Tab Bar Toggle */}
          <div className="auth-tab-bar">
            <button
              className="auth-tab"
              onClick={() => navigate(`/login?role=${selectedRole}`)}
            >
              Sign In
            </button>
            <button className="auth-tab active">Sign Up</button>
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1: ROLE SELECTION */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    marginBottom: '24px',
                    color: 'var(--text-color)'
                  }}
                >
                  Select Registration Roles
                </h3>

                {/* ROLES WITH FLEX-WRAP */}
                <div
                  className="role-grid"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '12px',
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
                          flex: '1 1 120px',
                          minWidth: '110px',
                          padding: '20px 10px',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          textAlign: 'center'
                        }}
                      >
                        <div className="role-icon" style={{ fontSize: '1.8rem' }}>
                          {r.icon}
                        </div>
                        <span
                          className="role-name"
                          style={{
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            whiteSpace: 'nowrap',
                            display: 'block',
                            marginTop: '6px'
                          }}
                        >
                          {r.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* TERMS & CONDITIONS CHECKBOX */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    marginBottom: '25px',
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)'
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
                </div>

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
          <div
            className="auth-footer"
            style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.9rem' }}
          >
            Already registered?{' '}
            <Link to={`/login?role=${selectedRole}`} className="auth-link">
              Sign In Here
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;