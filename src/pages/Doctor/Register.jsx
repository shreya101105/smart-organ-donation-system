import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
      case 'Recipient':
        return <RecipientRegistration />;
      case 'Donor':
        return <DonorRegistration />;
      case 'Doctor':
        return <DoctorRegistration />;
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
        <div className="auth-brand" style={{ justifyContent: 'center' }}>
          <FaHeartbeat />
          <span>SmartOrgan Registry</span>
        </div>
        <h2 style={{ textAlign: 'center' }}>Create Account</h2>
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
