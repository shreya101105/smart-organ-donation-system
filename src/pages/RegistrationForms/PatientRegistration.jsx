import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaSave, FaEye, FaEyeSlash, FaExclamationCircle } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { BLOOD_GROUPS } from '../../utils/constants';
import { validateRegistrationForm } from '../../utils/validators';

export const PatientRegistration = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    address: '',
    weight: '',
    medicalHistory: '',
    emergencyContact: '',
    aadhaarFile: '',
    profilePhoto: ''
  });

  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Helper to check password strength
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

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
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

  // Helper function for dynamic Red Alert input box styling
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

    // Strict Mobile Number Check
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      customErrors.phone = 'Mobile number is required.';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      customErrors.phone = 'Mobile number is not correct (Use proper 10-digit number).';
    }

    if (formData.password !== formData.confirmPassword) {
      customErrors.confirmPassword = 'Passwords do not match.';
      setErrorMsg('Passwords do not match.');
    }

    // Run existing utility validator
    const validation = validateRegistrationForm ? validateRegistrationForm(formData, 'Patient') : { isValid: true, errors: {} };
    const mergedErrors = { ...validation.errors, ...customErrors };

    if (Object.keys(mergedErrors).length > 0) {
      setErrors(mergedErrors);
      if (!errorMsg) {
        setErrorMsg('Please fix the highlighted errors in red before submitting.');
      }
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = register(formData, 'Patient');
      setLoading(false);
      if (result?.success) {
        navigate('/patient/dashboard');
      } else {
        setErrorMsg(result?.message || 'Registration failed. Please try again.');
      }
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate /* Disables browser default tooltip popups */
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        width: '100%',
        maxWidth: '550px',
        margin: '0 auto'
      }}
    >
      {/* Top Banner Alert Message */}
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

      {/* 1. Full Name */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Full Name *</label>
        <input
          type="text"
          name="name"
          className="form-input"
          value={formData.name}
          onChange={handleChange}
          style={getInputStyle(errors.name)}
        />
        {errors.name && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.name}
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
            placeholder="Min 8 characters"
            value={formData.password}
            onChange={handleChange}
            style={getInputStyle(errors.password, true)}
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

      {/* 5. Phone Number (With Red Glow Alert Box) */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Phone Number *</label>
        <input
          type="tel"
          name="phone"
          maxLength={10}
          className="form-input"
          placeholder="e.g. 9876543210"
          value={formData.phone}
          onChange={handleChange}
          style={getInputStyle(errors.phone)}
        />
        {errors.phone && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
            <FaExclamationCircle /> {errors.phone}
          </span>
        )}
      </div>

      {/* 6. Date of Birth */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Date of Birth *</label>
        <input
          type="date"
          name="dob"
          className="form-input"
          value={formData.dob}
          onChange={handleChange}
          style={getInputStyle(errors.dob)}
        />
        {errors.dob && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.dob}
          </span>
        )}
      </div>

      {/* 7. Gender */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Gender *</label>
        <select
          name="gender"
          className="form-select"
          value={formData.gender}
          onChange={handleChange}
          style={getInputStyle(errors.gender)}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.gender}
          </span>
        )}
      </div>

      {/* 8. Blood Group */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Blood Group *</label>
        <select
          name="bloodGroup"
          className="form-select"
          value={formData.bloodGroup}
          onChange={handleChange}
          style={getInputStyle(errors.bloodGroup)}
        >
          <option value="">Select Blood Group</option>
          {BLOOD_GROUPS.map((bg) => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>
        {errors.bloodGroup && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.bloodGroup}
          </span>
        )}
      </div>

      {/* 9. Weight */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Weight (kg) *</label>
        <input
          type="number"
          name="weight"
          className="form-input"
          placeholder="e.g. 70"
          value={formData.weight}
          onChange={handleChange}
          style={getInputStyle(errors.weight)}
        />
        {errors.weight && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.weight}
          </span>
        )}
      </div>

      {/* 10. Emergency Contact */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Emergency Contact (Name & Tel) *</label>
        <input
          type="text"
          name="emergencyContact"
          className="form-input"
          placeholder="Jane Doe (+91 98765...)"
          value={formData.emergencyContact}
          onChange={handleChange}
          style={getInputStyle(errors.emergencyContact)}
        />
        {errors.emergencyContact && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.emergencyContact}
          </span>
        )}
      </div>

      {/* 11. Permanent Address */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Permanent Address *</label>
        <textarea
          name="address"
          className="form-textarea"
          rows="3"
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

      {/* 12. Medical History */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Medical History (Diagnoses, Past surgeries)</label>
        <textarea
          name="medicalHistory"
          className="form-textarea"
          rows="3"
          placeholder="Specify if any, or 'None'"
          value={formData.medicalHistory}
          onChange={handleChange}
          style={getInputStyle(false)}
        ></textarea>
      </div>

      {/* 13. Identity Document Upload */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Upload Government ID / Identity Card *</label>
        <label
          className="file-upload-input"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            border: errors.aadhaarFile ? '2px dashed #ef4444' : '1px dashed #cbd5e1',
            backgroundColor: errors.aadhaarFile ? 'rgba(239, 68, 68, 0.05)' : 'transparent',
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          <FaCloudUploadAlt className="file-upload-icon" style={{ fontSize: '1.5rem', color: errors.aadhaarFile ? '#ef4444' : '#64748b' }} />
          <span style={{ fontSize: '0.85rem', display: 'block', marginTop: '4px', color: errors.aadhaarFile ? '#ef4444' : 'inherit' }}>
            {formData.aadhaarFile ? formData.aadhaarFile : 'Click to Upload PDF/Image'}
          </span>
          <input
            type="file"
            name="aadhaarFile"
            accept=".pdf,.png,.jpg,.jpeg"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
        </label>
        {errors.aadhaarFile && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.aadhaarFile}
          </span>
        )}
      </div>

      {/* 14. Profile Photo */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Profile Photo (Optional)</label>
        <label className="file-upload-input" style={{ width: '100%', boxSizing: 'border-box', border: '1px dashed #cbd5e1', padding: '16px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }}>
          <FaCloudUploadAlt className="file-upload-icon" style={{ fontSize: '1.5rem' }} />
          <span style={{ fontSize: '0.85rem', display: 'block', marginTop: '4px' }}>
            {formData.profilePhoto ? formData.profilePhoto : 'Click to Upload JPG/PNG'}
          </span>
          <input
            type="file"
            name="profilePhoto"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
        </label>
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
        {loading ? 'Submitting registration...' : <><FaSave /> Register as Patient</>}
      </button>
    </form>
  );
};

export default PatientRegistration;