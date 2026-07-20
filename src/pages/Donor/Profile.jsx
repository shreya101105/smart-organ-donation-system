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
    emergencyContact: currentUser.emergencyContact || '',
    organsInput: (currentUser.organsWillingToDonate || []).join(', ')
  });

  const [loading, setLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const organsArray = form.organsInput
      .split(',')
      .map(o => o.trim())
      .filter(o => o.length > 0);

    const updatedData = {
      name: form.name,
      phone: form.phone,
      bloodGroup: form.bloodGroup,
      emergencyContact: form.emergencyContact,
      organsWillingToDonate: organsArray
    };

    setTimeout(() => {
      updateProfile(updatedData);
      setLoading(false);
      setToastOpen(true);
    }, 1000);
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Profile Details</h3>
          <p>Manage your donor registration metadata, blood parameters, and emergency indicators.</p>
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

          <Input 
            label="Organs Willing to Donate (comma separated)" 
            name="organsInput" 
            value={form.organsInput} 
            onChange={handleInputChange}
            placeholder="e.g. Kidney, Cornea, Liver"
            required
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
        message="Your donor profile has been updated on the secure LifeLink ledger."
      />
    </div>
  );
};

export default Profile;
