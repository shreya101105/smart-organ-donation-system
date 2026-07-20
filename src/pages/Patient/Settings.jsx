import React, { useContext, useState } from 'react';
import { FaLock, FaSun, FaMoon } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';

export const Settings = () => {
  const { theme, toggleDarkMode } = useContext(ThemeContext);
  const { currentUser, updateProfile } = useContext(AuthContext);

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordData.oldPassword !== currentUser.password) {
      setError('Incorrect existing password.');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Confirm password does not match.');
      return;
    }

    const res = updateProfile({ password: passwordData.newPassword });
    if (res.success) {
      setSuccess('Password updated successfully!');
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    }
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Workspace Settings</h3>
          <p>Configure theme modes and security credentials.</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h4 style={{ marginBottom: '14px' }}>Appearance</h4>
          <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '20px' }}>
            Switch between light and dark modes quickly. All changes automatically sync to local storage.
          </p>

          <button className="btn btn-outline" onClick={toggleDarkMode} style={{ width: '100%' }}>
            {theme.darkMode ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <FaSun /> Switch to Light Mode
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <FaMoon /> Switch to Dark Mode
              </span>
            )}
          </button>
        </div>

        <div className="card">
          <h4 style={{ marginBottom: '14px' }}>Update Security Password</h4>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input 
                type="password" 
                name="oldPassword" 
                className="form-input" 
                value={passwordData.oldPassword} 
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input 
                type="password" 
                name="newPassword" 
                className="form-input" 
                value={passwordData.newPassword} 
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input 
                type="password" 
                name="confirmPassword" 
                className="form-input" 
                value={passwordData.confirmPassword} 
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
              <FaLock /> Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Settings;
