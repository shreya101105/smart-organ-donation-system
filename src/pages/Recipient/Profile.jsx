import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Card from '../../components/Cards/Card';
import Input from '../../components/Inputs/Input';
import Button from '../../components/Buttons/Button';
import Toast from '../../components/Feedback/Toast';

export const Profile = () => {
  const { currentUser, updateProfile } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: currentUser.name || '',
    phone: currentUser.phone || '',
    bloodGroup: currentUser.bloodGroup || '',
    requiredOrgan: currentUser.requiredOrgan || '',
    urgency: currentUser.urgency || '',
    emergencyContact: currentUser.emergencyContact || '',
    doctorRecommendation: currentUser.doctorRecommendation || ''
  });

  const [loading, setLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      updateProfile(form);
      setLoading(false);
      setToastOpen(true);
    }, 1000);
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Recipient Profile</h3>
          <p>Manage your patient data, organ requirements, and emergency contacts.</p>
        </div>
      </div>

      <Card glow style={{ padding: '40px', maxWidth: '700px' }}>
        <form onSubmit={handleFormSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <Input 
              label="Full Name" 
              name="name" 
              value={form.name} 
              onChange={handleInputChange} 
              required
            />
            <Input 
              label="Phone Number" 
              name="phone" 
              value={form.phone} 
              onChange={handleInputChange}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="floating-input-group">
              <label className="form-label floating" style={{ position: 'absolute', top: '-10px', left: '16px', fontSize: '0.78rem', color: 'var(--primary-color)', background: 'var(--bg-color)', padding: '0 6px', zIndex: 10 }}>Blood Group</label>
              <select 
                name="bloodGroup" 
                className="form-select" 
                value={form.bloodGroup} 
                onChange={handleInputChange}
                required
              >
                <option value="">Select Blood Group</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>
            
            <Input 
              label="Emergency Contact" 
              name="emergencyContact" 
              value={form.emergencyContact} 
              onChange={handleInputChange}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="floating-input-group">
              <label className="form-label floating" style={{ position: 'absolute', top: '-10px', left: '16px', fontSize: '0.78rem', color: 'var(--primary-color)', background: 'var(--bg-color)', padding: '0 6px', zIndex: 10 }}>Required Organ</label>
              <select 
                name="requiredOrgan" 
                className="form-select" 
                value={form.requiredOrgan} 
                onChange={handleInputChange}
                required
              >
                <option value="">Select Organ</option>
                {['Kidney', 'Heart', 'Liver', 'Lung', 'Cornea', 'Brain'].map(org => <option key={org} value={org}>{org}</option>)}
              </select>
            </div>

            <div className="floating-input-group">
              <label className="form-label floating" style={{ position: 'absolute', top: '-10px', left: '16px', fontSize: '0.78rem', color: 'var(--primary-color)', background: 'var(--bg-color)', padding: '0 6px', zIndex: 10 }}>Urgency Level</label>
              <select 
                name="urgency" 
                className="form-select" 
                value={form.urgency} 
                onChange={handleInputChange}
                required
              >
                <option value="">Select Urgency</option>
                {['Low', 'Medium', 'High', 'Critical'].map(urg => <option key={urg} value={urg}>{urg}</option>)}
              </select>
            </div>
          </div>

          <Input 
            label="Doctor Clinical Recommendation" 
            name="doctorRecommendation" 
            value={form.doctorRecommendation} 
            onChange={handleInputChange}
            placeholder="e.g. Dr. Carter recommends immediate renal transplantation."
          />

          <Button 
            type="submit" 
            variant="primary" 
            loading={loading}
            style={{ marginTop: '10px' }}
          >
            Save Profile
          </Button>
        </form>
      </Card>

      <Toast 
        isOpen={toastOpen} 
        onClose={() => setToastOpen(false)}
        type="success"
        message="Your recipient medical registration has been updated."
      />
    </div>
  );
};

export default Profile;
