import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserAlt, FaProcedures, FaHandHoldingHeart, FaUserMd, FaHospital, FaVials, FaHeartbeat } from 'react-icons/fa';

import PatientRegistration from '../RegistrationForms/PatientRegistration';
import RecipientRegistration from '../RegistrationForms/RecipientRegistration';
import DonorRegistration from '../RegistrationForms/DonorRegistration';
import DoctorRegistration from '../RegistrationForms/DoctorRegistration';
import HospitalRegistration from '../RegistrationForms/HospitalRegistration';
import LaboratoryRegistration from '../RegistrationForms/LaboratoryRegistration';

import './Auth.css';

export const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Pick initial role from query parameters (?role=Patient)
  const queryParams = new URLSearchParams(location.search);
  const initialRole = queryParams.get('role') || 'Patient';

  const [selectedRole, setSelectedRole] = useState(initialRole);

  const roles = [
    { id: 'Patient', label: 'Patient', icon: <FaUserAlt />, desc: 'Check failure risks' },
    { id: 'Recipient', label: 'Recipient', icon: <FaProcedures />, desc: 'Transplant queues' },
    { id: 'Donor', label: 'Donor', icon: <FaHandHoldingHeart />, desc: 'Pledge consent' },
    { id: 'Doctor', label: 'Doctor', icon: <FaUserMd />, desc: 'Verify diagnostics' },
    { id: 'Hospital', label: 'Hospital', icon: <FaHospital />, desc: 'Clear surgeries' },
    { id: 'Laboratory', label: 'Laboratory', icon: <FaVials />, desc: 'Post lab files' }
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
        return <PatientRegistration key="Patient" />;
      case 'Recipient':
        return <RecipientRegistration key="Recipient" />;
      case 'Donor':
        return <DonorRegistration key="Donor" />;
      case 'Doctor':
        return <DoctorRegistration key="Doctor" />;
      case 'Hospital':
        return <HospitalRegistration key="Hospital" />;
      case 'Laboratory':
        return <LaboratoryRegistration key="Laboratory" />;
      default:
        return <PatientRegistration key="Patient" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="auth-page">
      <div className="floating-blob blob-primary" style={{ top: '5%', left: '5%' }}></div>
      <div className="floating-blob blob-secondary" style={{ bottom: '10%', right: '10%' }}></div>
      <div className="bg-mesh"></div>

      <div className="auth-container register-wide">
        <motion.div 
          className="auth-card"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ padding: '40px' }}
        >
          <motion.div className="auth-header" variants={itemVariants}>
            <div className="navbar-logo" style={{ justifyContent: 'center', marginBottom: '10px' }}>
              <FaHeartbeat className="navbar-logo-icon" />
              <span>NovaLife AI Registry</span>
            </div>
            <h2 className="auth-title">NovaLife AI</h2>
            <p className="auth-subtitle">Clinical Diagnostics & Registry Portal</p>
          </motion.div>

          <motion.div className="auth-tab-bar" variants={itemVariants}>
            <button className="auth-tab" onClick={() => navigate('/login')}>Sign In</button>
            <button className="auth-tab active">Sign Up</button>
          </motion.div>

          {/* Role boxes */}
          <motion.div className="role-grid" variants={itemVariants}>
            {roles.map((r) => {
              const isSelected = selectedRole === r.id;
              return (
                <motion.div 
                  key={r.id}
                  className={`role-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedRole(r.id)}
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="role-icon">{r.icon}</div>
                  <div className="role-name">{r.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Form area */}
          <motion.div 
            className="card"
            style={{ 
              background: 'rgba(255, 255, 255, 0.01)', 
              border: '1px solid var(--border-color)', 
              borderRadius: 'var(--radius-md)',
              padding: '30px',
              textAlign: 'left'
            }}
            variants={itemVariants}
          >
            <h3 style={{ marginBottom: '24px', color: 'var(--primary-color)', fontSize: '1.25rem', fontWeight: '800' }}>
              {selectedRole} Profile Registration Setup
            </h3>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRole}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {renderForm()}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div className="auth-footer" variants={itemVariants}>
            Already have an account?{' '}
            <Link to={`/login?role=${selectedRole}`} className="auth-link">
              Sign In
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
