import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaSave } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { validateRegistrationForm } from '../../utils/validators';

export const LaboratoryRegistration = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    laboratoryName: '',
    email: '',
    password: '',
    licenseNumber: '',
    chiefPathologist: '',
    services: '',
    address: '',
    logo: '',
    licenseFile: ''
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
    <form onSubmit={handleSubmit} className="form-grid">
      {errorMsg && <div className="form-grid-full alert alert-danger">{errorMsg}</div>}

      <div className="form-group">
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
        {errors.licenseNumber && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.licenseNumber}</span>}
      </div>

      <div className="form-group">
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
        {errors.chiefPathologist && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.chiefPathologist}</span>}
      </div>

      <div className="form-group form-grid-full">
        <label className="form-label">Services Offered (HLA Crossmatching, HLA Typing, Blood Work) *</label>
        <textarea 
          name="services" 
          className="form-textarea" 
          rows="2"
          placeholder="Detail diagnostic procedures provided"
          value={formData.services}
          onChange={handleChange}
          required
        ></textarea>
        {errors.services && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.services}</span>}
      </div>

      <div className="form-group form-grid-full">
        <label className="form-label">Laboratory Physical Address *</label>
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
        <label className="form-label">Upload Diagnostic License Certificate *</label>
        <label className="file-upload-input">
          <FaCloudUploadAlt className="file-upload-icon" />
          <span style={{ fontSize: '0.8rem', display: 'block' }}>
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

      <div className="form-group">
        <label className="form-label">Upload Laboratory Logo (Optional)</label>
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
        {loading ? 'Submitting registration...' : <><FaSave /> Register Laboratory</>}
      </button>
    </form>
  );
};

export default LaboratoryRegistration;
