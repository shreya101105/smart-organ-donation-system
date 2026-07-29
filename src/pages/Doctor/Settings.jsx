import React, { useState, useContext } from 'react';
import {
    FaUserMd, FaHospital, FaKey, FaBell, FaSignOutAlt,
    FaSave, FaShieldAlt, FaCheckCircle, FaUserCheck
} from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

const Settings = ({ handleLogout }) => {
    const { currentUser } = useContext(AuthContext);

    // Form state initialized with context data
    const [formData, setFormData] = useState({
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        phone: currentUser?.phone || '+1 (555) 019-2834',
        specialization: currentUser?.specialization || 'Nephrologist',
        qualification: currentUser?.qualification || 'MD, DM (Nephrology)',
        medRegNumber: currentUser?.medRegNumber || 'MCI-87654',
        hospital: currentUser?.hospital || 'Apex Multispeciality Hospital',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        emailAlerts: true,
        criticalPatientAlerts: true,
        twoFactorAuth: false
    });

    const [savedSuccess, setSavedSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        // API save logic goes here
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
    };

    return (
        <div className="tab-content-panel">
            <div className="panel-header">
                <div>
                    <h3>Account & Preferences Settings</h3>
                    <p>Manage your professional profile, security credentials, and alert notifications.</p>
                </div>
                {savedSuccess && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: '600' }}>
                        <FaCheckCircle /> Profile updated successfully!
                    </div>
                )}
            </div>

            <div className="grid-2">
                {/* Profile & Credentials Form */}
                <div className="card" style={{ textAlign: 'left' }}>
                    <h4><FaUserMd style={{ marginRight: '8px', color: 'var(--primary-color)' }} /> Clinical Profile Details</h4>
                    <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '20px' }}>
                        Update your public medical profile details visible to patients and clinical administrators.
                    </p>

                    <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>Specialization</label>
                                <input
                                    type="text"
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>Medical License ID</label>
                                <input
                                    type="text"
                                    name="medRegNumber"
                                    value={formData.medRegNumber}
                                    readOnly
                                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-light, #f8f9fa)', cursor: 'not-allowed' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>Affiliated Institution</label>
                            <input
                                type="text"
                                name="hospital"
                                value={formData.hospital}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ marginTop: '10px', width: 'fit-content', alignSelf: 'flex-start' }}>
                            <FaSave /> Save Profile Changes
                        </button>
                    </form>
                </div>

                {/* Security, Notifications & Account Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Security & Password */}
                    <div className="card" style={{ textAlign: 'left' }}>
                        <h4><FaShieldAlt style={{ marginRight: '8px', color: 'var(--primary-color)' }} /> Security & Credentials</h4>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    placeholder="••••••••"
                                    value={formData.currentPassword}
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        placeholder="••••••••"
                                        value={formData.newPassword}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                                    />
                                </div>
                            </div>
                            <button className="btn btn-secondary" style={{ width: 'fit-content', marginTop: '6px' }}>
                                <FaKey /> Update Password
                            </button>
                        </div>
                    </div>

                    {/* Preferences & Sign Out Option */}
                    <div className="card" style={{ textAlign: 'left' }}>
                        <h4><FaBell style={{ marginRight: '8px', color: 'var(--primary-color)' }} /> Alert Preferences</h4>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', fontSize: '0.88rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    name="criticalPatientAlerts"
                                    checked={formData.criticalPatientAlerts}
                                    onChange={handleInputChange}
                                />
                                Receive urgent SMS alerts for high-risk diagnostic predictions
                            </label>

                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    name="emailAlerts"
                                    checked={formData.emailAlerts}
                                    onChange={handleInputChange}
                                />
                                Daily email summary of pending consultations and reports
                            </label>
                        </div>

                        <hr style={{ margin: '20px 0', borderColor: 'var(--border-color)', opacity: 0.3 }} />

                        {/* Direct Sign Out Option */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <strong style={{ fontSize: '0.9rem', display: 'block' }}>Session Management</strong>
                                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Log out from all active clinical workstations.</span>
                            </div>
                            <button className="btn btn-danger" onClick={handleLogout}>
                                <FaSignOutAlt /> Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;