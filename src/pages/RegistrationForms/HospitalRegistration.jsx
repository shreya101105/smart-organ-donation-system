import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [e.target.name]: file.name });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setErrorMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    // Map to name field
    const submissionData = { ...formData, name: formData.hospitalName };

    const validation = validateRegistrationForm(submissionData, 'Hospital');
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = register(submissionData, 'Hospital');
      setLoading(false);
      if (result.success) {
        navigate('/hospital/dashboard');
      } else {
        setErrorMsg(result.message);
      }
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        width: '100%',
        maxWidth: '550px',
        margin: '0 auto'
      }}
    >
      {errorMsg && (
        <div
          className="alert alert-danger"
          style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }}
        >
          {errorMsg}
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
          required
        />
        {errors.name && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.name}</span>}
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
          required
        />
        {errors.email && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.email}</span>}
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
            style={{ paddingRight: '40px', width: '100%' }}
            required
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
        {errors.password && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.password}</span>}
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
            style={{ paddingRight: '40px', width: '100%' }}
            required
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
        {!passwordsMatch && (
          <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>
            ❌ Passwords do not match
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
          required
        >
          <option value="">Select Type</option>
          {HOSPITAL_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
        {errors.hospitalType && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.hospitalType}</span>}
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
          required
        />
        {errors.registrationNumber && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.registrationNumber}</span>}
      </div>

      {/* 7. City */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">City *</label>
        <input
          type="text"
          name="city"
          className="form-input"
          value={formData.city}
          onChange={handleChange}
          required
        />
        {errors.city && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.city}</span>}
      </div>

      {/* 8. State */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">State *</label>
        <input
          type="text"
          name="state"
          className="form-input"
          value={formData.state}
          onChange={handleChange}
          required
        />
        {errors.state && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.state}</span>}
      </div>

      {/* 9. Postal PIN Code */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Postal PIN Code *</label>
        <input
          type="text"
          name="pinCode"
          className="form-input"
          maxLength="6"
          placeholder="6 digits"
          value={formData.pinCode}
          onChange={handleChange}
          required
        />
        {errors.pinCode && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.pinCode}</span>}
      </div>

      {/* 10. Physical Address */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Physical Address *</label>
        <textarea
          name="address"
          className="form-textarea"
          rows="3"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>
        {errors.address && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.address}</span>}
      </div>

      {/* 11. Upload Registration Certificate */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Upload Registration Certificate *</label>
        <label className="file-upload-input" style={{ width: '100%', boxSizing: 'border-box' }}>
          <FaCloudUploadAlt className="file-upload-icon" />
          <span style={{ fontSize: '0.85rem', display: 'block', marginTop: '4px' }}>
            {formData.certFile ? formData.certFile : 'Upload authority registry cert (PDF)'}
          </span>
          <input
            type="file"
            name="certFile"
            accept=".pdf"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
            required
          />
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading || !passwordsMatch}
        style={{ marginTop: '10px', width: '100%', padding: '12px' }}
      >
        {loading ? 'Submitting registration...' : <><FaSave /> Register Hospital</>}
      </button>
    </form>
  );
};

export default HospitalRegistration;