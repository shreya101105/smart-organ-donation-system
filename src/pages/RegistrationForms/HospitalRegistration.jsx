import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaSave } from 'react-icons/fa';
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
    hospitalType: '',
    registrationNumber: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    logo: '',
    certFile: ''
  });

  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

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
    <form onSubmit={handleSubmit} className="form-grid">
      {errorMsg && <div className="form-grid-full alert alert-danger">{errorMsg}</div>}

      <div className="form-group">
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
        {errors.name && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.name}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Email Address *</label>
        <input 
          type="email" 
          name="email"
          className="form-input" 
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.email}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Password *</label>
        <input 
          type="password" 
          name="password"
          className="form-input" 
          placeholder="Min 6 characters"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.password}</span>}
      </div>

      <div className="form-group">
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
        {errors.hospitalType && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.hospitalType}</span>}
      </div>

      <div className="form-group">
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
        {errors.registrationNumber && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.registrationNumber}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">City *</label>
        <input 
          type="text" 
          name="city"
          className="form-input" 
          value={formData.city}
          onChange={handleChange}
          required
        />
        {errors.city && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.city}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">State *</label>
        <input 
          type="text" 
          name="state"
          className="form-input" 
          value={formData.state}
          onChange={handleChange}
          required
        />
        {errors.state && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.state}</span>}
      </div>

      <div className="form-group">
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
        {errors.pinCode && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.pinCode}</span>}
      </div>

      <div className="form-group form-grid-full">
        <label className="form-label">Physical Address *</label>
        <textarea 
          name="address" 
          className="form-textarea" 
          rows="2"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>
        {errors.address && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.address}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Upload Registration Certificate *</label>
        <label className="file-upload-input">
          <FaCloudUploadAlt className="file-upload-icon" />
          <span style={{ fontSize: '0.8rem', display: 'block' }}>
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

      <div className="form-group">
        <label className="form-label">Upload Hospital Logo (Optional)</label>
        <label className="file-upload-input">
          <FaCloudUploadAlt className="file-upload-icon" />
          <span style={{ fontSize: '0.8rem', display: 'block' }}>
            {formData.logo ? formData.logo : 'Click to Upload JPG/PNG'}
          </span>
          <input 
            type="file" 
            name="logo" 
            accept="image/*" 
            style={{ display: 'none' }} 
            onChange={handleFileUpload}
          />
        </label>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary form-grid-full" 
        disabled={loading}
        style={{ marginTop: '20px' }}
      >
        {loading ? 'Submitting registration...' : <><FaSave /> Register Hospital</>}
      </button>
    </form>
  );
};

export default HospitalRegistration;
