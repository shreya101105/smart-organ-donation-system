import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaSave } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { BLOOD_GROUPS, ORGANS } from '../../utils/constants';
import { validateRegistrationForm } from '../../utils/validators';

export const RecipientRegistration = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    bloodGroup: '',
    disease: '',
    requiredOrgan: '',
    urgency: '',
    doctorRecommendation: '',
    medicalReportFile: '',
    emergencyContact: '',
    profilePhoto: ''
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

    const validation = validateRegistrationForm(formData, 'Recipient');
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = register(formData, 'Recipient');
      setLoading(false);
      if (result.success) {
        navigate('/recipient/dashboard');
      } else {
        setErrorMsg(result.message);
      }
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      {errorMsg && <div className="form-grid-full alert alert-danger">{errorMsg}</div>}

      <div className="form-group">
        <label className="form-label">Full Name *</label>
        <input 
          type="text" 
          name="name"
          className="form-input" 
          value={formData.name}
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
        <label className="form-label">Phone Number *</label>
        <input 
          type="tel" 
          name="phone"
          className="form-input" 
          placeholder="10-digit number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        {errors.phone && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Blood Group *</label>
        <select 
          name="bloodGroup" 
          className="form-select"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
        >
          <option value="">Select Blood Group</option>
          {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
        </select>
        {errors.bloodGroup && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.bloodGroup}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Required Organ *</label>
        <select 
          name="requiredOrgan" 
          className="form-select"
          value={formData.requiredOrgan}
          onChange={handleChange}
          required
        >
          <option value="">Select Organ</option>
          {ORGANS.map(organ => <option key={organ} value={organ}>{organ}</option>)}
        </select>
        {errors.requiredOrgan && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.requiredOrgan}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Transplant Urgency *</label>
        <select 
          name="urgency" 
          className="form-select"
          value={formData.urgency}
          onChange={handleChange}
          required
        >
          <option value="">Select Urgency</option>
          <option value="Critical">Critical (Immediate Transplant Needed)</option>
          <option value="High">High Urgency</option>
          <option value="Medium">Medium Urgency</option>
          <option value="Low">Low / Stable</option>
        </select>
        {errors.urgency && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.urgency}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Emergency Contact (Name & Tel) *</label>
        <input 
          type="text" 
          name="emergencyContact"
          className="form-input" 
          placeholder="Bob Smith (+91 87654...)"
          value={formData.emergencyContact}
          onChange={handleChange}
          required
        />
        {errors.emergencyContact && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.emergencyContact}</span>}
      </div>

      <div className="form-group form-grid-full">
        <label className="form-label">Primary Diagnosis / Disease State *</label>
        <textarea 
          name="disease" 
          className="form-textarea" 
          rows="2"
          placeholder="e.g. End-Stage Renal Disease (ESRD) secondary to Diabetes"
          value={formData.disease}
          onChange={handleChange}
          required
        ></textarea>
        {errors.disease && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.disease}</span>}
      </div>

      <div className="form-group form-grid-full">
        <label className="form-label">Doctor Recommendation Summary</label>
        <textarea 
          name="doctorRecommendation" 
          className="form-textarea" 
          rows="2"
          placeholder="e.g. Recommended for immediate renal transplant by Dr. Carter"
          value={formData.doctorRecommendation}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="form-group">
        <label className="form-label">Upload Medical Diagnosis Reports *</label>
        <label className="file-upload-input">
          <FaCloudUploadAlt className="file-upload-icon" />
          <span style={{ fontSize: '0.8rem', display: 'block' }}>
            {formData.medicalReportFile ? formData.medicalReportFile : 'Upload pathology/clinical scans (PDF)'}
          </span>
          <input 
            type="file" 
            name="medicalReportFile" 
            accept=".pdf" 
            style={{ display: 'none' }} 
            onChange={handleFileUpload}
            required
          />
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">Profile Photo (Optional)</label>
        <label className="file-upload-input">
          <FaCloudUploadAlt className="file-upload-icon" />
          <span style={{ fontSize: '0.8rem', display: 'block' }}>
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

      <button 
        type="submit" 
        className="btn btn-primary form-grid-full" 
        disabled={loading}
        style={{ marginTop: '20px' }}
      >
        {loading ? 'Submitting registration...' : <><FaSave /> Register as Recipient</>}
      </button>
    </form>
  );
};

export default RecipientRegistration;
