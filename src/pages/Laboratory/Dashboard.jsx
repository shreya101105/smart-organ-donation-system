import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaVials, FaCloudUploadAlt, FaUserAlt, FaHistory, 
  FaSignOutAlt, FaColumns, FaBell
} from 'react-icons/fa';

import { AuthContext } from '../../context/AuthContext';
import UploadReports from './UploadReports';
import PatientReports from './PatientReports';
import TestHistory from './TestHistory';

import '../../assets/css/dashboard.css';

export const LaboratoryDashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('Overview');
  const navigate = useNavigate();

  // Protect route
  if (!currentUser || currentUser.role !== 'Laboratory') {
    navigate('/login?role=Laboratory');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewTab setActiveTab={setActiveTab} lab={currentUser} />;
      case 'Upload':
        return <UploadReports />;
      case 'Patients':
        return <PatientReports />;
      case 'History':
        return <TestHistory />;
      default:
        return <OverviewTab setActiveTab={setActiveTab} lab={currentUser} />;
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div>
          <div className="sidebar-logo">
            <FaVials /> <span>Lab Panel</span>
          </div>
          
          <div className="sidebar-profile">
            <div className="sidebar-profile-name">{currentUser.name}</div>
            <div className="sidebar-profile-role">Diagnostic Center</div>
          </div>

          <ul className="sidebar-menu">
            <li className="sidebar-item">
              <button 
                className={`sidebar-button ${activeTab === 'Overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('Overview')}
              >
                <FaColumns /> Overview
              </button>
            </li>
            <li className="sidebar-item">
              <button 
                className={`sidebar-button ${activeTab === 'Upload' ? 'active' : ''}`}
                onClick={() => setActiveTab('Upload')}
              >
                <FaCloudUploadAlt /> Upload Reports
              </button>
            </li>
            <li className="sidebar-item">
              <button 
                className={`sidebar-button ${activeTab === 'Patients' ? 'active' : ''}`}
                onClick={() => setActiveTab('Patients')}
              >
                <FaUserAlt /> Patient Registry
              </button>
            </li>
            <li className="sidebar-item">
              <button 
                className={`sidebar-button ${activeTab === 'History' ? 'active' : ''}`}
                onClick={() => setActiveTab('History')}
              >
                <FaHistory /> Test History
              </button>
            </li>
          </ul>
        </div>

        <div className="sidebar-footer">
          <button className="btn btn-danger" style={{ width: '100%' }} onClick={handleLogout}>
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="dashboard-title">
            Laboratory Workspace / {activeTab}
          </div>
          <div className="header-actions">
            <div className="header-user-badge">
              <FaVials style={{ color: 'var(--primary-color)' }} />
              <span>{currentUser.name} (License: {currentUser.licenseNumber || 'Verified'})</span>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

// Internal Sub-component OverviewTab for Laboratory
const OverviewTab = ({ setActiveTab, lab }) => {
  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Welcome, {lab.name}!</h3>
          <p>Logged into pathlab systems. Upload reports and manage immunological typing checks.</p>
        </div>
      </div>

      <div className="stats-grid-row">
        <div className="stat-card">
          <div className="stat-card-icon"><FaCloudUploadAlt /></div>
          <div className="stat-card-info">
            <h4>Active Panel</h4>
            <p>Report Upload Desk</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon secondary"><FaUserAlt /></div>
          <div className="stat-card-info">
            <h4>2 Registered</h4>
            <p>Ecosystem Patients</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon danger"><FaHistory /></div>
          <div className="stat-card-info">
            <h4>2 Uploaded</h4>
            <p>Diagnostic Reports</p>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card" style={{ textAlign: 'left' }}>
          <h4>Laboratory Operations</h4>
          <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '20px' }}>
            Upload GFR renal panels, HLA antigens mapping profiles, or AST liver diagnostics.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button className="btn btn-primary" onClick={() => setActiveTab('Upload')} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FaCloudUploadAlt /> Upload Patient Blood/HLA Reports
            </button>
            <button className="btn btn-secondary" onClick={() => setActiveTab('Patients')} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FaUserAlt /> Query Patient Identifiers Index
            </button>
            <button className="btn btn-outline" onClick={() => setActiveTab('History')} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FaHistory /> Query Past Laboratory Ledger
            </button>
          </div>
        </div>

        <div className="card" style={{ textAlign: 'left' }}>
          <h4>Diagnostic Facility Profile</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', marginTop: '10px' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 0', fontWeight: '600' }}>Chief Pathologist</td>
                <td style={{ padding: '8px 0', textAlign: 'right', opacity: 0.8 }}>{lab.chiefPathologist || 'Dr. Sarah Connor'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 0', fontWeight: '600' }}>Registry License ID</td>
                <td style={{ padding: '8px 0', textAlign: 'right', opacity: 0.8 }}>{lab.licenseNumber || 'LAB-LIC-775'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 0', fontWeight: '600' }}>Services Offered</td>
                <td style={{ padding: '8px 0', textAlign: 'right', opacity: 0.8, fontSize: '0.78rem' }}>{lab.services || 'HLA crossmatching, blood panels'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 0', fontWeight: '600' }}>Facility Location</td>
                <td style={{ padding: '8px 0', textAlign: 'right', opacity: 0.8 }}>{lab.address || 'Connaught Place, New Delhi'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LaboratoryDashboard;
