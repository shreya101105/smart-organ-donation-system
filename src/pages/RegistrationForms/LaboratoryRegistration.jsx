import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaSave, FaEye, FaEyeSlash, FaExclamationCircle } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { validateRegistrationForm } from '../../utils/validators';

export const LaboratoryRegistration = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    laboratoryName: '',
    email: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    chiefPathologist: '',
    services: '',
    address: '',
    licenseFile: ''
  });

  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Helper to check password strength (At least 8 chars, 1 letter, 1 number)
  const isPasswordWeak = (pass) => {
    if (!pass) return false;
    return pass.length < 8 || !/\d/.test(pass) || !/[a-zA-Z]/.test(pass);
  };

  const passwordIsWeak = isPasswordWeak(formData.password);
  const passwordsMatch = formData.confirmPassword
    ? formData.password === formData.confirmPassword
    : true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error dynamically as user types
    if (errors[name] || (name === 'laboratoryName' && errors.name)) {
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

  // Dynamic Red Alert Box styling helper
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

    // 1. Laboratory Name Validation
    if (!formData.laboratoryName.trim()) {
      customErrors.laboratoryName = 'Laboratory Name is required.';
      customErrors.name = 'Laboratory Name is required.';
    }

    // 2. Official Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      customErrors.email = 'Official Email Address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      customErrors.email = 'Please enter a valid email address.';
    }

    // 3. License Registration Number Check
    if (!formData.licenseNumber.trim()) {
      customErrors.licenseNumber = 'License Registration Number is required.';
    }

    // 4. Chief Pathologist Name Check
    if (!formData.chiefPathologist.trim()) {
      customErrors.chiefPathologist = 'Chief Pathologist Name is required.';
    }

    // 5. Services Offered Validation
    if (!formData.services.trim()) {
      customErrors.services = 'Diagnostic Services details are required.';
    }

    // 6. Physical Address Check
    if (!formData.address.trim()) {
      customErrors.address = 'Laboratory Physical Address is required.';
    }

    // 7. License Certificate Upload Check
    if (!formData.licenseFile) {
      customErrors.licenseFile = 'Diagnostic License Certificate file is required.';
    }

    // 8. Password Match & Strength Validation
    if (passwordIsWeak) {
      customErrors.password = 'Weak password! Use at least 8 chars with letters & numbers.';
    }

    if (formData.password !== formData.confirmPassword) {
      customErrors.confirmPassword = 'Passwords do not match.';
    }

    // 9. External Validator Integration
    const submissionData = { ...formData, name: formData.laboratoryName };
    const validation = validateRegistrationForm ? validateRegistrationForm(submissionData, 'Laboratory') : { isValid: true, errors: {} };
    const mergedErrors = { ...validation.errors, ...customErrors };

    if (Object.keys(mergedErrors).length > 0) {
      setErrors(mergedErrors);
      setErrorMsg('Please resolve all highlighted red fields before submitting.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = register ? register(submissionData, 'Laboratory') : { success: true };
      setLoading(false);
      if (result?.success) {
        navigate('/laboratory/dashboard');
      } else {
        setErrorMsg(result?.message || 'Registration failed. Please try again.');
      }
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate /* Prevents browser native tooltips */
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        width: '100%',
        maxWidth: '550px',
        margin: '0 auto'
      }}
    >
      {/* Top Error Alert Banner */}
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

      {/* 1. Laboratory Name */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Laboratory Name *</label>
        <input
          type="text"
          name="laboratoryName"
          className="form-input"
          placeholder="e.g. Metro Diagnostics"
          value={formData.laboratoryName}
          onChange={handleChange}
          style={getInputStyle(errors.laboratoryName || errors.name)}
        />
        {(errors.laboratoryName || errors.name) && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.laboratoryName || errors.name}
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
          placeholder="e.g. contact@metrodiagnostics.com"
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

      {/* 3. Password Field */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Password *</label>
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            className="form-input"
            placeholder="Min 8 chars (include letters & numbers)"
            value={formData.password}
            onChange={handleChange}
            style={getInputStyle(errors.password || passwordIsWeak, true)}
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
        {passwordIsWeak && (
          <span style={{ color: '#f59e0b', fontSize: '0.75rem', marginTop: '4px', fontWeight: '500' }}>
            ⚠️ Weak password! Must be at least 8 characters and contain both letters and numbers.
          </span>
        )}
        {errors.password && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.password}
          </span>
        )}
      </div>

      {/* 4. Confirm Password Field */}
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

      {/* 5. License Registration Number */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">License Registration Number *</label>
        <input
          type="text"
          name="licenseNumber"
          className="form-input"
          placeholder="e.g. LAB-LIC-775"
          value={formData.licenseNumber}
          onChange={handleChange}
          style={getInputStyle(errors.licenseNumber)}
        />
        {errors.licenseNumber && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.licenseNumber}
          </span>
        )}
      </div>

      {/* 6. Chief Pathologist */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Chief Pathologist *</label>
        <input
          type="text"
          name="chiefPathologist"
          className="form-input"
          placeholder="Pathologist in charge name"
          value={formData.chiefPathologist}
          onChange={handleChange}
          style={getInputStyle(errors.chiefPathologist)}
        />
        {errors.chiefPathologist && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.chiefPathologist}
          </span>
        )}
      </div>

      {/* 7. Services Offered */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Services Offered (HLA Crossmatching, HLA Typing, Blood Work) *</label>
        <textarea
          name="services"
          className="form-textarea"
          rows="3"
          placeholder="Detail diagnostic procedures provided"
          value={formData.services}
          onChange={handleChange}
          style={getInputStyle(errors.services)}
        ></textarea>
        {errors.services && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.services}
          </span>
        )}
      </div>

      {/* 8. Laboratory Physical Address */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Laboratory Physical Address *</label>
        <textarea
          name="address"
          className="form-textarea"
          rows="3"
          placeholder="Enter complete facility street address..."
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

      {/* 9. Upload Diagnostic License Certificate */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Upload Diagnostic License Certificate *</label>
        <label
          className="file-upload-input"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            border: errors.licenseFile ? '2px dashed #ef4444' : '1px dashed #cbd5e1',
            backgroundColor: errors.licenseFile ? 'rgba(239, 68, 68, 0.05)' : 'transparent',
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          <FaCloudUploadAlt className="file-upload-icon" style={{ fontSize: '1.5rem', color: errors.licenseFile ? '#ef4444' : '#64748b' }} />
          <span style={{ fontSize: '0.85rem', display: 'block', marginTop: '4px', color: errors.licenseFile ? '#ef4444' : 'inherit' }}>
            {formData.licenseFile ? formData.licenseFile : 'Upload regulatory license (PDF)'}
          </span>
          <input
            type="file"
            name="licenseFile"
            accept=".pdf"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
        </label>
        {errors.licenseFile && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.licenseFile}
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
        {loading ? 'Submitting registration...' : <><FaSave /> Register Laboratory</>}
      </button>
    </form>
  );
};

export default LaboratoryRegistration;