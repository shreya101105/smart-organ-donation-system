import React, { useState } from 'react';
import Card from '../../components/Cards/Card';
import Button from '../../components/Buttons/Button';
import Toast from '../../components/Feedback/Toast';

export const Settings = () => {
  const [prefs, setPrefs] = useState({
    emailAlerts: true,
    matchTriggers: true,
    waitlistAlerts: true
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
          <h3>Recipient Settings</h3>
          <p>Configure notifications, direct surgeon alerts, and diagnostic log delivery settings.</p>
        </div>
      </div>

      <Card glow style={{ padding: '40px', maxWidth: '650px' }}>
        <form onSubmit={handleSaveSettings}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            Alert Settings
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
                <strong style={{ display: 'block' }}>Email Diagnostic Reports</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted-color)' }}>Receive detailed reports on crossmatching tests immediately.</span>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                name="matchTriggers" 
                checked={prefs.matchTriggers} 
                onChange={handleCheckboxChange} 
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }}
              />
              <div>
                <strong style={{ display: 'block' }}>Instant SMS Match Triggers</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted-color)' }}>Receive instant text alerts if a compatible organ is pledged.</span>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                name="waitlistAlerts" 
                checked={prefs.waitlistAlerts} 
                onChange={handleCheckboxChange} 
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }}
              />
              <div>
                <strong style={{ display: 'block' }}>Waitlist Standing Modifications</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted-color)' }}>Receive alerts if your national waitlist index adjusts.</span>
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
        message="Your recipient settings have been updated."
      />
    </div>
  );
};

export default Settings;
