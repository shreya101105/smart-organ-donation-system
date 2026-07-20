import React, { useContext, useState } from 'react';
import { FaUser, FaSave } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

export const Profile = () => {
  const { currentUser, updateProfile } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    phone: currentUser.phone || '',
    dob: currentUser.dob || '',
    gender: currentUser.gender || '',
    bloodGroup: currentUser.bloodGroup || '',
    address: currentUser.address || '',
    height: currentUser.height || '',
    weight: currentUser.weight || '',
    medicalHistory: currentUser.medicalHistory || '',
    allergies: currentUser.allergies || '',
    emergencyContact: currentUser.emergencyContact || ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const res = updateProfile(formData);
    if (res.success) {
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>My Profile</h3>
          <p>Update your personal information and clinical metrics.</p>
        </div>
      </div>

      {message && <div className="alert alert-success">{message}</div>}

      <div className="card">
        <form onSubmit={handleSave} className="form-grid">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              name="name" 
              className="form-input" 
              value={formData.name} 
              onChange={handleChange} 
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              className="form-input" 
              value={formData.phone} 
              onChange={handleChange} 
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <input 
              type="date" 
              name="dob" 
              className="form-input" 
              value={formData.dob} 
              onChange={handleChange} 
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Gender</label>
            <select 
              name="gender" 
              className="form-select" 
              value={formData.gender} 
              onChange={handleChange}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Blood Group</label>
            <input 
              type="text" 
              name="bloodGroup" 
              className="form-input" 
              value={formData.bloodGroup} 
              readOnly 
              style={{ backgroundColor: 'rgba(0,0,0,0.05)', cursor: 'not-allowed' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Emergency Contact</label>
            <input 
              type="text" 
              name="emergencyContact" 
              className="form-input" 
              value={formData.emergencyContact} 
              onChange={handleChange} 
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Height (cm)</label>
            <input 
              type="number" 
              name="height" 
              className="form-input" 
              value={formData.height} 
              onChange={handleChange} 
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Weight (kg)</label>
            <input 
              type="number" 
              name="weight" 
              className="form-input" 
              value={formData.weight} 
              onChange={handleChange} 
              required
            />
          </div>

          <div className="form-group form-grid-full">
            <label className="form-label">Address</label>
            <textarea 
              name="address" 
              className="form-textarea" 
              rows="2" 
              value={formData.address} 
              onChange={handleChange} 
              required
            ></textarea>
          </div>

          <div className="form-group form-grid-full">
            <label className="form-label">Medical History</label>
            <textarea 
              name="medicalHistory" 
              className="form-textarea" 
              rows="2" 
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
              value={formData.allergies} 
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary form-grid-full" style={{ marginTop: '10px' }}>
            <FaSave /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};
export default Profile;
