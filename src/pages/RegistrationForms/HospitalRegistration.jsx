import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaSave, FaEye, FaEyeSlash, FaExclamationCircle } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { HOSPITAL_TYPES } from '../../utils/constants';
import { validateRegistrationForm } from '../../utils/validators';

export const HospitalRegistration = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hospitalName: '',
    email: '',
    password: '',
    confirmPassword: '',
    hospitalType: '',
    registrationNumber: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    certFile: ''
  });

  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Helper to check password strength (Min 8 chars, 1 letter, 1 number)
  const checkPasswordStrength = (pass) => {
    if (!pass) return null;
    const isWeak = pass.length < 8 || !/\d/.test(pass) || !/[a-zA-Z]/.test(pass);
    return isWeak ? 'Weak password (Use at least 8 chars with letters & numbers)' : null;
  };

  const passwordWarning = checkPasswordStrength(formData.password);
  const passwordsMatch = formData.confirmPassword
    ? formData.password === formData.confirmPassword
    : true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error as soon as user types
    if (errors[name] || (name === 'hospitalName' && errors.name)) {
      setErrors((prev) => ({ ...prev, [name]: null, name: null }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [e.target.name]: file.name });
      if (errors[e.target.name]) {
        setErrors((prev) => ({ ...prev, [e.target.name]: null }));
      }
    }
  };

  // Helper function for Dynamic Red Alert Box styling
  const getInputStyle = (hasError, extraPadding = false) => ({
    width: '100%',
    padding: extraPadding ? '10px 40px 10px 12px' : '10px 12px',
    borderRadius: '8px',
    outline: 'none',
    transition: 'all 0.25s ease',
    border: hasError ? '2px solid #ef4444' : '1px solid #cbd5e1',
    backgroundColor: hasError ? 'rgba(239, 68, 68, 0.06)' : '#ffffff',
    boxShadow: hasError ? '0 0 10px rgba(239, 68, 68, 0.25)' : 'none',
    color: '#1e293b'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setErrorMsg('');

    let customErrors = {};

    // 1. Hospital Name Validation
    if (!formData.hospitalName.trim()) {
      customErrors.hospitalName = 'Hospital Name is required.';
      customErrors.name = 'Hospital Name is required.';
    }

    // 2. Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      customErrors.email = 'Email Address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      customErrors.email = 'Please enter a valid email address.';
    }

    // 3. Hospital Type Check
    if (!formData.hospitalType) {
      customErrors.hospitalType = 'Please select a Hospital Type.';
    }

    // 4. Registration Number Check
    if (!formData.registrationNumber.trim()) {
      customErrors.registrationNumber = 'Registration / Certificate Number is required.';
    }

    // 5. Address Validation
    if (!formData.address.trim()) {
      customErrors.address = 'Physical Address is required.';
    }

    // 6. City & State Check
    if (!formData.city.trim()) {
      customErrors.city = 'City is required.';
    }
    if (!formData.state.trim()) {
      customErrors.state = 'State is required.';
    }

    // 7. PIN Code Validation (Strict 6 Digits)
    const pinCodeRegex = /^[1-9][0-9]{5}$/;
    if (!formData.pinCode.trim()) {
      customErrors.pinCode = 'Postal PIN Code is required.';
    } else if (!pinCodeRegex.test(formData.pinCode.trim())) {
      customErrors.pinCode = 'Enter a valid 6-digit PIN code.';
    }

    // 8. Certificate File Check
    if (!formData.certFile) {
      customErrors.certFile = 'Hospital Registration Certificate file is required.';
    }

    // 9. Password Validation
    if (passwordWarning) {
      customErrors.password = passwordWarning;
    }

    if (formData.password !== formData.confirmPassword) {
      customErrors.confirmPassword = 'Passwords do not match.';
    }

    // 10. External Validator Integration
    const submissionData = { ...formData, name: formData.hospitalName };
    const validation = validateRegistrationForm ? validateRegistrationForm(submissionData, 'Hospital') : { isValid: true, errors: {} };
    const mergedErrors = { ...validation.errors, ...customErrors };

    if (Object.keys(mergedErrors).length > 0) {
      setErrors(mergedErrors);
      setErrorMsg('Please resolve all highlighted red fields before submitting.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = register ? register(submissionData, 'Hospital') : { success: true };
      setLoading(false);
      if (result?.success) {
        navigate('/hospital/dashboard');
      } else {
        setErrorMsg(result?.message || 'Registration failed. Please try again.');
      }
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate /* Bypasses default HTML tooltips */
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        width: '100%',
        maxWidth: '550px',
        margin: '0 auto'
      }}
    >
      {/* Main Error Banner */}
      {errorMsg && (
        <div
          className="alert alert-danger"
          style={{
            color: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid #ef4444',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FaExclamationCircle style={{ fontSize: '1.1rem', flexShrink: 0 }} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 1. Hospital Name */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Hospital Name *</label>
        <input
          type="text"
          name="hospitalName"
          className="form-input"
          placeholder="e.g. Apex Multispeciality Hospital"
          value={formData.hospitalName}
          onChange={handleChange}
          style={getInputStyle(errors.hospitalName || errors.name)}
        />
        {(errors.hospitalName || errors.name) && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.hospitalName || errors.name}
          </span>
        )}
      </div>

      {/* 2. Email Address */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Email Address *</label>
        <input
          type="email"
          name="email"
          className="form-input"
          placeholder="e.g. info@apexhospital.com"
          value={formData.email}
          onChange={handleChange}
          style={getInputStyle(errors.email)}
        />
        {errors.email && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.email}
          </span>
        )}
      </div>

      {/* 3. Password */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Password *</label>
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            className="form-input"
            placeholder="Min 8 chars (letters & numbers)"
            value={formData.password}
            onChange={handleChange}
            style={getInputStyle(errors.password || passwordWarning, true)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center'
            }}
            tabIndex="-1"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {passwordWarning && (
          <span style={{ color: '#f59e0b', fontSize: '0.75rem', marginTop: '4px', fontWeight: '500' }}>
            ⚠️ {passwordWarning}
          </span>
        )}
        {errors.password && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.password}
          </span>
        )}
      </div>

      {/* 4. Confirm Password */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Confirm Password *</label>
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            className="form-input"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={getInputStyle(errors.confirmPassword || !passwordsMatch, true)}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center'
            }}
            tabIndex="-1"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {(!passwordsMatch || errors.confirmPassword) && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.confirmPassword || 'Passwords do not match'}
          </span>
        )}
      </div>

      {/* 5. Hospital Type */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Hospital Type *</label>
        <select
          name="hospitalType"
          className="form-select"
          value={formData.hospitalType}
          onChange={handleChange}
          style={getInputStyle(errors.hospitalType)}
        >
          <option value="">Select Type</option>
          {HOSPITAL_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
        {errors.hospitalType && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.hospitalType}
          </span>
        )}
      </div>

      {/* 6. Registration / Certificate Number */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Registration / Certificate Number *</label>
        <input
          type="text"
          name="registrationNumber"
          className="form-input"
          placeholder="e.g. HOSP-2026-99"
          value={formData.registrationNumber}
          onChange={handleChange}
          style={getInputStyle(errors.registrationNumber)}
        />
        {errors.registrationNumber && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.registrationNumber}
          </span>
        )}
      </div>

      {/* 7. City */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">City *</label>
        <input
          type="text"
          name="city"
          className="form-input"
          placeholder="e.g. Mumbai"
          value={formData.city}
          onChange={handleChange}
          style={getInputStyle(errors.city)}
        />
        {errors.city && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.city}
          </span>
        )}
      </div>

      {/* 8. State */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">State *</label>
        <input
          type="text"
          name="state"
          className="form-input"
          placeholder="e.g. Maharashtra"
          value={formData.state}
          onChange={handleChange}
          style={getInputStyle(errors.state)}
        />
        {errors.state && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.state}
          </span>
        )}
      </div>

      {/* 9. Postal PIN Code */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Postal PIN Code *</label>
        <input
          type="text"
          name="pinCode"
          className="form-input"
          maxLength="6"
          placeholder="6 digits (e.g. 400001)"
          value={formData.pinCode}
          onChange={handleChange}
          style={getInputStyle(errors.pinCode)}
        />
        {errors.pinCode && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.pinCode}
          </span>
        )}
      </div>

      {/* 10. Physical Address */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Physical Address *</label>
        <textarea
          name="address"
          className="form-textarea"
          rows="3"
          placeholder="Full street address..."
          value={formData.address}
          onChange={handleChange}
          style={getInputStyle(errors.address)}
        ></textarea>
        {errors.address && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.address}
          </span>
        )}
      </div>

      {/* 11. Upload Registration Certificate */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Upload Registration Certificate *</label>
        <label
          className="file-upload-input"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            border: errors.certFile ? '2px dashed #ef4444' : '1px dashed #cbd5e1',
            backgroundColor: errors.certFile ? 'rgba(239, 68, 68, 0.05)' : 'transparent',
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          <FaCloudUploadAlt className="file-upload-icon" style={{ fontSize: '1.5rem', color: errors.certFile ? '#ef4444' : '#64748b' }} />
          <span style={{ fontSize: '0.85rem', display: 'block', marginTop: '4px', color: errors.certFile ? '#ef4444' : 'inherit' }}>
            {formData.certFile ? formData.certFile : 'Upload authority registry cert (PDF)'}
          </span>
          <input
            type="file"
            name="certFile"
            accept=".pdf"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
        </label>
        {errors.certFile && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.certFile}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
        style={{
          marginTop: '10px',
          width: '100%',
          padding: '12px',
          backgroundColor: '#2563eb',
          color: '#ffffff',
          fontWeight: '600',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Submitting registration...' : <><FaSave /> Register Hospital</>}
      </button>
    </form>
  );
};

export default HospitalRegistration;