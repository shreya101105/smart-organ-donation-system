import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaSave, FaEye, FaEyeSlash, FaExclamationCircle } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { BLOOD_GROUPS } from '../../utils/constants';

export const PatientRegistration = ({ onSuccess }) => {
  const authContext = useContext(AuthContext);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [e.target.name]: file.name }));
      if (errors[e.target.name]) {
        setErrors((prev) => ({ ...prev, [e.target.name]: null }));
      }
    }
  };

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

  const validateForm = () => {
    let newErrors = {};

    // 1. Full Name
    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required.';
    }

    // 2. Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // 3. Password
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    // 4. Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    // 5. Phone Number (10 Digit Indian Standard)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Enter valid 10-digit mobile number.';
    }

    // 6. Date of Birth
    if (!formData.dob) {
      newErrors.dob = 'Date of Birth is required.';
    }

    // 7. Gender
    if (!formData.gender) {
      newErrors.gender = 'Gender selection is required.';
    }

    // 8. Blood Group
    if (!formData.bloodGroup) {
      newErrors.bloodGroup = 'Blood Group selection is required.';
    }

    // 9. Emergency Contact
    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = 'Emergency contact info is required.';
    }

    // 10. Permanent Address
    if (!formData.address.trim()) {
      newErrors.address = 'Permanent Address is required.';
    }

    // 11. Govt ID Document Upload
    if (!formData.aadhaarFile) {
      newErrors.aadhaarFile = 'Government ID document upload is required.';
    }

    // 12. Profile Photo Upload
    if (!formData.profilePhoto) {
      newErrors.profilePhoto = 'Profile photo upload is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const isValid = validateForm();

    if (!isValid) {
      setErrorMsg('Please fix the highlighted errors in red before submitting.');
      return;
    }

    setLoading(true);

    try {
      if (authContext && authContext.register) {
        await authContext.register(formData, 'Patient');
      }

      if (onSuccess) {
        onSuccess(formData);
      } else {
        navigate('/patient/dashboard');
      }
    } catch (err) {
      setErrorMsg('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
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
          placeholder="e.g. John Doe"
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
          placeholder="e.g. johndoe5@gmail.com"
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
            placeholder="Min 6 characters"
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
            style={getInputStyle(errors.confirmPassword, true)}
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
        {errors.confirmPassword && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.confirmPassword}
          </span>
        )}
      </div>

      {/* 5. Phone Number */}
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
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
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
          {(BLOOD_GROUPS || ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']).map((bg) => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>
        {errors.bloodGroup && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.bloodGroup}
          </span>
        )}
      </div>

      {/* 9. Emergency Contact */}
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

      {/* 10. Permanent Address */}
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

      {/* 11. Identity Document Upload */}
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

      {/* 12. Profile Photo Upload (Mandatory) */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Profile Photo *</label>
        <label
          className="file-upload-input"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            border: errors.profilePhoto ? '2px dashed #ef4444' : '1px dashed #cbd5e1',
            backgroundColor: errors.profilePhoto ? 'rgba(239, 68, 68, 0.05)' : 'transparent',
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          <FaCloudUploadAlt className="file-upload-icon" style={{ fontSize: '1.5rem', color: errors.profilePhoto ? '#ef4444' : '#64748b' }} />
          <span style={{ fontSize: '0.85rem', display: 'block', marginTop: '4px', color: errors.profilePhoto ? '#ef4444' : 'inherit' }}>
            {formData.profilePhoto ? formData.profilePhoto : 'Click to Upload Profile Picture (JPG/PNG)'}
          </span>
          <input
            type="file"
            name="profilePhoto"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
        </label>
        {errors.profilePhoto && (
          <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
            <FaExclamationCircle /> {errors.profilePhoto}
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Submitting registration...' : <><FaSave /> Register as Patient</>}
      </button>
    </form>
  );
};

export default PatientRegistration;