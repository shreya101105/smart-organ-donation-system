import React, { useState } from 'react';
import Card from '../../components/Cards/Card';
import Button from '../../components/Buttons/Button';
import Toast from '../../components/Feedback/Toast';

export const Settings = () => {
  const [prefs, setPrefs] = useState({
    emailAlerts: true,
    smsAlerts: false,
    transplantMatchAlerts: true,
    anonymousDonation: false
  });

  const [loading, setLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const handleCheckboxChange = (e) => {
    setPrefs({ ...prefs, [e.target.name]: e.target.checked });
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToastOpen(true);
    }, 1000);
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>System Settings</h3>
          <p>Modify your communications, matching alerts, and clinical ledger visibility preferences.</p>
        </div>
      </div>

      <Card glow style={{ padding: '40px', maxWidth: '650px' }}>
        <form onSubmit={handleSaveSettings}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            Alert Channels
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '30px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                name="emailAlerts" 
                checked={prefs.emailAlerts} 
                onChange={handleCheckboxChange} 
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }}
              />
              <div>
                <strong style={{ display: 'block' }}>Email Diagnostic Logs</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted-color)' }}>Receive detailed PDF clinical receipts and matching triggers.</span>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                name="smsAlerts" 
                checked={prefs.smsAlerts} 
                onChange={handleCheckboxChange} 
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }}
              />
              <div>
                <strong style={{ display: 'block' }}>SMS Matching Push Alerts</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted-color)' }}>Instant mobile notifications if a patient matches HLA profile.</span>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                name="transplantMatchAlerts" 
                checked={prefs.transplantMatchAlerts} 
                onChange={handleCheckboxChange} 
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }}
              />
              <div>
                <strong style={{ display: 'block' }}>Direct Surgeon Communications</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted-color)' }}>Allow transplant surgeons at clearing hospitals to contact you.</span>
              </div>
            </label>
          </div>

          <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            Privacy Policies
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '30px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                name="anonymousDonation" 
                checked={prefs.anonymousDonation} 
                onChange={handleCheckboxChange} 
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }}
              />
              <div>
                <strong style={{ display: 'block' }}>Anonymous Registry Listing</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted-color)' }}>Mask your name and age from hospitals until matching is confirmed.</span>
              </div>
            </label>
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            loading={loading}
          >
            Save Settings
          </Button>
        </form>
      </Card>

      <Toast 
        isOpen={toastOpen} 
        onClose={() => setToastOpen(false)}
        type="success"
        message="Your preference adjustments have been saved locally."
      />
    </div>
  );
};

export default Settings;
