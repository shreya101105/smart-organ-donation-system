import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaSave } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { SPECIALIZATIONS, EXPERIENCES } from '../../utils/constants';
import { validateRegistrationForm } from '../../utils/validators';

export const DoctorRegistration = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    doctorName: '',
    email: '',
    password: '',
    qualification: '',
    experience: '',
    specialization: '',
    medRegNumber: '',
    hospital: '',
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

    const submissionData = { ...formData, name: formData.doctorName };

    const validation = validateRegistrationForm(submissionData, 'Doctor');
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = register(submissionData, 'Doctor');
      setLoading(false);
      if (result.success) {
        navigate('/doctor/dashboard');
      } else {
        setErrorMsg(result.message);
      }
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-grid"
      style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', margin: '0 auto' }}
    >
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      <div className="form-group">
        <label className="form-label">Doctor Name *</label>
        <input
          type="text"
          name="doctorName"
          className="form-input"
          placeholder="e.g. Dr. Robert Carter"
          value={formData.doctorName}
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
          placeholder="e.g. doctor@hospital.com"
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
        <label className="form-label">Specialization *</label>
        <select
          name="specialization"
          className="form-select"
          value={formData.specialization}
          onChange={handleChange}
          required
        >
          <option value="">Select Specialization</option>
          {SPECIALIZATIONS.map(spec => <option key={spec} value={spec}>{spec}</option>)}
        </select>
        {errors.specialization && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.specialization}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Academic Qualification *</label>
        <input
          type="text"
          name="qualification"
          className="form-input"
          placeholder="e.g. MD, DM (Nephrology)"
          value={formData.qualification}
          onChange={handleChange}
          required
        />
        {errors.qualification && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.qualification}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Years of Experience *</label>
        <select
          name="experience"
          className="form-select"
          value={formData.experience}
          onChange={handleChange}
          required
        >
          <option value="">Select Experience</option>
          {EXPERIENCES.map(exp => <option key={exp} value={exp}>{exp}</option>)}
        </select>
        {errors.experience && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.experience}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Medical Registration Number *</label>
        <input
          type="text"
          name="medRegNumber"
          className="form-input"
          placeholder="State Medical Council No."
          value={formData.medRegNumber}
          onChange={handleChange}
          required
        />
        {errors.medRegNumber && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.medRegNumber}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Affiliated Hospital *</label>
        <input
          type="text"
          name="hospital"
          className="form-input"
          placeholder="Hospital name"
          value={formData.hospital}
          onChange={handleChange}
          required
        />
        {errors.hospital && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.hospital}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Upload Medical License / Certificate *</label>
        <label className="file-upload-input">
          <FaCloudUploadAlt className="file-upload-icon" />
          <span style={{ fontSize: '0.8rem', display: 'block' }}>
            {formData.licenseFile ? formData.licenseFile : 'Upload physician registration certificate (PDF/Image)'}
          </span>
          <input
            type="file"
            name="licenseFile"
            accept=".pdf,.png,.jpg,.jpeg"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
            required
          />
        </label>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
        style={{ marginTop: '10px', width: '100%' }}
      >
        {loading ? 'Submitting registration...' : <><FaSave /> Register as Medical Doctor</>}
      </button>
    </form>
  );
};

export default DoctorRegistration;