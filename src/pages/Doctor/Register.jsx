import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserAlt, FaProcedures, FaHandHoldingHeart, FaUserMd, FaHospital, FaVials } from 'react-icons/fa';

import PatientRegistration from '../RegistrationForms/PatientRegistration';
// import RecipientRegistration from '../RegistrationForms/RecipientRegistration';
// import DonorRegistration from '../RegistrationForms/DonorRegistration';
// import DoctorRegistration from '../RegistrationForms/DoctorRegistration';
import HospitalRegistration from '../RegistrationForms/HospitalRegistration';
import LaboratoryRegistration from '../RegistrationForms/LaboratoryRegistration';

import './Auth.css';

// Animated NovaLife AI Moving Circle Logo
const NovaLifeLogo = () => (
  <div className="novalife-logo-container" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
    <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="novaGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="novaGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      {/* Outer Rotating Dash Ring */}
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke="url(#novaGradient1)"
        strokeWidth="3"
        strokeDasharray="8 6"
        fill="none"
        style={{
          transformOrigin: '50px 50px',
          animation: 'spinClockwise 12s linear infinite'
        }}
      />

      {/* Counter-Rotating Inner Arc */}
      <circle
        cx="50"
        cy="50"
        r="36"
        stroke="url(#novaGradient2)"
        strokeWidth="2.5"
        strokeDasharray="140 30"
        strokeLinecap="round"
        fill="none"
        style={{
          transformOrigin: '50px 50px',
          animation: 'spinCounterClockwise 8s linear infinite'
        }}
      />

      {/* Center AI Pulse Core */}
      <circle
        cx="50"
        cy="50"
        r="14"
        fill="url(#novaGradient1)"
        style={{
          transformOrigin: '50px 50px',
          animation: 'pulseCore 2s ease-in-out infinite alternate'
        }}
      />

      {/* Orbiting Sparkle Node */}
      <circle
        cx="50"
        cy="8"
        r="4"
        fill="#60a5fa"
        style={{
          transformOrigin: '50px 50px',
          animation: 'spinClockwise 4s linear infinite'
        }}
      />
    </svg>

    <style>{`
      @keyframes spinClockwise {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes spinCounterClockwise {
        0% { transform: rotate(360deg); }
        100% { transform: rotate(0deg); }
      }
      @keyframes pulseCore {
        0% { transform: scale(0.85); opacity: 0.8; }
        100% { transform: scale(1.15); opacity: 1; }
      }
    `}</style>
  </div>
);

export const Register = () => {
  const location = useLocation();

  // Pick initial role from query parameters (?role=Patient)
  const queryParams = new URLSearchParams(location.search);
  const initialRole = queryParams.get('role') || 'Patient';

  const [selectedRole, setSelectedRole] = useState(initialRole);

  const roles = [
    { id: 'Patient', label: 'Patient', icon: <FaUserAlt />, desc: 'Predict disease severity' },
    { id: 'Recipient', label: 'Recipient', icon: <FaProcedures />, desc: 'Request matching organs' },
    { id: 'Donor', label: 'Donor', icon: <FaHandHoldingHeart />, desc: 'Pledge to donate organs' },
    { id: 'Doctor', label: 'Doctor', icon: <FaUserMd />, desc: 'Audit matches & clear diagnoses' },
    { id: 'Hospital', label: 'Hospital', icon: <FaHospital />, desc: 'Coordinate surgeries & storage' },
    { id: 'Laboratory', label: 'Laboratory', icon: <FaVials />, desc: 'Upload diagnostics reports' }
  ];

  // If query parameters change, sync the role state
  useEffect(() => {
    const qRole = queryParams.get('role');
    if (qRole && roles.some(r => r.id === qRole)) {
      setSelectedRole(qRole);
    }
  }, [location]);

  const renderForm = () => {
    switch (selectedRole) {
      case 'Patient':
        return <PatientRegistration />;
      // case 'Recipient':
      //   return <RecipientRegistration />;
      // case 'Donor':
      //   return <DonorRegistration />;
      // case 'Doctor':
      //   return <DoctorRegistration />;
      case 'Hospital':
        return <HospitalRegistration />;
      case 'Laboratory':
        return <LaboratoryRegistration />;
      default:
        return <PatientRegistration />;
    }
  };

  return (
    <div className="register-wrapper">
      <motion.div
        className="register-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-brand" style={{ justifyContent: 'center', gap: '12px', alignItems: 'center' }}>
          <NovaLifeLogo />
          <span style={{ fontSize: '1.6rem', fontWeight: '700', letterSpacing: '-0.5px' }}>
            NovaLife AI
          </span>
        </div>
        <h2 style={{ textAlign: 'center', marginTop: '10px' }}>Create Account</h2>
        <p className="auth-subtitle" style={{ textAlign: 'center' }}>
          Select your registration role to generate the corresponding medical profile.
        </p>

        {/* Role boxes */}
        <div className="role-selection-grid">
          {roles.map((r) => {
            const isSelected = selectedRole === r.id;
            return (
              <div
                key={r.id}
                className={`role-select-box ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedRole(r.id)}
              >
                <div className="role-select-icon">{r.icon}</div>
                <h4>{r.label}</h4>
                <p>{r.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Form area */}
        <div className="dynamic-form-container">
          <h3 style={{ marginBottom: '20px', color: 'var(--primary-color)' }}>
            {selectedRole} Registration Form
          </h3>
          {renderForm()}
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.95rem', opacity: 0.85 }}>
          Already have an account?{' '}
          <Link to={`/login?role=${selectedRole}`} className="auth-link" style={{ fontWeight: '600' }}>
            Sign In Here
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;