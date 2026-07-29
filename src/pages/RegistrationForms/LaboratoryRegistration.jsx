import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';
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

    if (passwordIsWeak) {
      setErrorMsg('Please enter a stronger password before proceeding.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    // Map to name field
    const submissionData = { ...formData, name: formData.laboratoryName };

    const validation = validateRegistrationForm(submissionData, 'Laboratory');
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = register(submissionData, 'Laboratory');
      setLoading(false);
      if (result.success) {
        navigate('/laboratory/dashboard');
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
          style={{
            color: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '0.9rem'
          }}
        >
          {errorMsg}
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
        {passwordIsWeak && (
          <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px', fontWeight: '500' }}>
            ⚠️ Weak password! Must be at least 8 characters and contain both letters and numbers.
          </span>
        )}
        {errors.password && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.password}</span>}
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
          required
        />
        {errors.licenseNumber && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.licenseNumber}</span>}
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
          required
        />
        {errors.chiefPathologist && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.chiefPathologist}</span>}
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
          required
        ></textarea>
        {errors.services && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.services}</span>}
      </div>

      {/* 8. Laboratory Physical Address */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Laboratory Physical Address *</label>
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

      {/* 9. Upload Diagnostic License Certificate */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Upload Diagnostic License Certificate *</label>
        <label className="file-upload-input" style={{ width: '100%', boxSizing: 'border-box' }}>
          <FaCloudUploadAlt className="file-upload-icon" />
          <span style={{ fontSize: '0.85rem', display: 'block', marginTop: '4px' }}>
            {formData.licenseFile ? formData.licenseFile : 'Upload regulatory license (PDF)'}
          </span>
          <input
            type="file"
            name="licenseFile"
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
        disabled={loading || !passwordsMatch || passwordIsWeak}
        style={{ marginTop: '10px', width: '100%', padding: '12px' }}
      >
        {loading ? 'Submitting registration...' : <><FaSave /> Register Laboratory</>}
      </button>
    </form>
  );
};

export default LaboratoryRegistration;