import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';
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

    const validation = validateRegistrationForm(formData, 'Patient');
    if (!validation.isValid) {
      setErrors(validation.errors);
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
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        width: '100%',
        maxWidth: '550px',
        margin: '0 auto'
      }}
    >
      {errorMsg && <div className="alert alert-danger" style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }}>{errorMsg}</div>}

      {/* 1. Full Name */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Full Name *</label>
        <input
          type="text"
          name="name"
          className="form-input"
          value={formData.name}
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

      {/* 5. Phone Number */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Phone Number *</label>
        <input
          type="tel"
          name="phone"
          className="form-input"
          placeholder="e.g. 9876543210"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        {errors.phone && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.phone}</span>}
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
          required
        />
        {errors.dob && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.dob}</span>}
      </div>

      {/* 7. Gender */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Gender *</label>
        <select
          name="gender"
          className="form-select"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.gender}</span>}
      </div>

      {/* 8. Blood Group */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Blood Group *</label>
        <select
          name="bloodGroup"
          className="form-select"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
        >
          <option value="">Select Blood Group</option>
          {BLOOD_GROUPS.map((bg) => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>
        {errors.bloodGroup && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.bloodGroup}</span>}
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
          required
        />
        {errors.weight && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.weight}</span>}
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
          required
        />
        {errors.emergencyContact && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.emergencyContact}</span>}
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
          required
        ></textarea>
        {errors.address && <span style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '4px' }}>{errors.address}</span>}
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
        ></textarea>
      </div>

      {/* 13. Identity Document Upload */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Upload Government ID / Identity Card *</label>
        <label className="file-upload-input" style={{ width: '100%', boxSizing: 'border-box' }}>
          <FaCloudUploadAlt className="file-upload-icon" />
          <span style={{ fontSize: '0.85rem', display: 'block', marginTop: '4px' }}>
            {formData.aadhaarFile ? formData.aadhaarFile : 'Click to Upload PDF/Image'}
          </span>
          <input
            type="file"
            name="aadhaarFile"
            accept=".pdf,.png,.jpg,.jpeg"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
            required
          />
        </label>
      </div>

      {/* 14. Profile Photo */}
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label className="form-label">Profile Photo (Optional)</label>
        <label className="file-upload-input" style={{ width: '100%', boxSizing: 'border-box' }}>
          <FaCloudUploadAlt className="file-upload-icon" />
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
        disabled={loading || !passwordsMatch}
        style={{ marginTop: '10px', width: '100%', padding: '12px' }}
      >
        {loading ? 'Submitting registration...' : <><FaSave /> Register as Patient</>}
      </button>
    </form>
  );
};

export default PatientRegistration;