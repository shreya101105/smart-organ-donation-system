import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaSave } from 'react-icons/fa';
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
    phone: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    address: '',
    height: '',
    weight: '',
    medicalHistory: '',
    allergies: '',
    emergencyContact: '',
    aadhaarFile: '',
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

    const validation = validateRegistrationForm(formData, 'Patient');
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = register(formData, 'Patient');
      setLoading(false);
      if (result.success) {
        navigate('/patient/dashboard');
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
          placeholder="e.g. 9876543210"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        {errors.phone && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Date of Birth *</label>
        <input 
          type="date" 
          name="dob"
          className="form-input" 
          value={formData.dob}
          onChange={handleChange}
          required
        />
        {errors.dob && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.dob}</span>}
      </div>

      <div className="form-group">
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
        {errors.gender && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.gender}</span>}
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
        <label className="form-label">Height (cm) *</label>
        <input 
          type="number" 
          name="height"
          className="form-input" 
          placeholder="e.g. 175"
          value={formData.height}
          onChange={handleChange}
          required
        />
        {errors.height && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.height}</span>}
      </div>

      <div className="form-group">
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
        {errors.weight && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.weight}</span>}
      </div>

      <div className="form-group">
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
        {errors.emergencyContact && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.emergencyContact}</span>}
      </div>

      <div className="form-group form-grid-full">
        <label className="form-label">Permanent Address *</label>
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

      <div className="form-group form-grid-full">
        <label className="form-label">Medical History (Diagnoses, Past surgeries)</label>
        <textarea 
          name="medicalHistory" 
          className="form-textarea" 
          rows="2"
          placeholder="Specify if any, or 'None'"
          value={formData.medicalHistory}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="form-group form-grid-full">
        <label className="form-label">Known Allergies</label>
        <input 
          type="text" 
          name="allergies"
          className="form-input" 
          placeholder="e.g. Peanuts, Sulfa drugs"
          value={formData.allergies}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Upload Aadhaar Identity Card *</label>
        <label className="file-upload-input">
          <FaCloudUploadAlt className="file-upload-icon" />
          <span style={{ fontSize: '0.8rem', display: 'block' }}>
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
        {loading ? 'Submitting registration...' : <><FaSave /> Register as Patient</>}
      </button>
    </form>
  );
};

export default PatientRegistration;
