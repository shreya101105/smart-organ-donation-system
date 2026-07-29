import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUserInjured, FaUserCheck, FaFileContract, FaCalendarCheck,
  FaBell, FaSignOutAlt, FaColumns, FaUserMd, FaHospital, FaClinicMedical, FaCog
} from 'react-icons/fa';

import { AuthContext } from '../../context/AuthContext';
import Patients from './Patients';
import VerifyPrediction from './VerifyPrediction';
import Reports from './Reports';
import Appointments from './Appointments';
import Notifications from './Notifications';
import Settings from './Settings'; // Imported Settings sub-component

import '../../assets/css/dashboard.css';

export const DoctorDashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('Overview');
  const navigate = useNavigate();

  // Route protection
  if (!currentUser || currentUser.role !== 'Doctor') {
    navigate('/login?role=Doctor');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewTab setActiveTab={setActiveTab} doc={currentUser} />;
      case 'Patients':
        return <Patients />;
      case 'VerifyPrediction':
        return <VerifyPrediction />;
      case 'Reports':
        return <Reports />;
      case 'Appointments':
        return <Appointments />;
      case 'Notifications':
        return <Notifications />;
      case 'Settings':
        return <Settings handleLogout={handleLogout} />;
      default:
        return <OverviewTab setActiveTab={setActiveTab} doc={currentUser} />;
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div>
          <div className="sidebar-logo">
            <FaUserMd /> <span>Doctor Panel</span>
          </div>

          <div className="sidebar-profile">
            <div className="sidebar-profile-name">{currentUser.name}</div>
            <div className="sidebar-profile-role">{currentUser.specialization || 'Transplant Specialist'}</div>
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
                className={`sidebar-button ${activeTab === 'Patients' ? 'active' : ''}`}
                onClick={() => setActiveTab('Patients')}
              >
                <FaUserInjured /> Patients Registry
              </button>
            </li>
            <li className="sidebar-item">
              <button
                className={`sidebar-button ${activeTab === 'VerifyPrediction' ? 'active' : ''}`}
                onClick={() => setActiveTab('VerifyPrediction')}
              >
                <FaUserCheck /> Verify Predictions
              </button>
            </li>
            <li className="sidebar-item">
              <button
                className={`sidebar-button ${activeTab === 'Reports' ? 'active' : ''}`}
                onClick={() => setActiveTab('Reports')}
              >
                <FaFileContract /> Clinical Reports
              </button>
            </li>
            <li className="sidebar-item">
              <button
                className={`sidebar-button ${activeTab === 'Appointments' ? 'active' : ''}`}
                onClick={() => setActiveTab('Appointments')}
              >
                <FaCalendarCheck /> Appointments
              </button>
            </li>
            <li className="sidebar-item">
              <button
                className={`sidebar-button ${activeTab === 'Notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('Notifications')}
              >
                <FaBell /> Clinical Alerts
              </button>
            </li>
            <li className="sidebar-item">
              <button
                className={`sidebar-button ${activeTab === 'Settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('Settings')}
              >
                <FaCog /> Settings
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

      {/* Main content Area */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="dashboard-title">
            Doctor Workspace / {activeTab}
          </div>
          <div className="header-actions">
            <div className="header-notification-icon" onClick={() => setActiveTab('Notifications')}>
              <FaBell />
              <span className="header-notification-badge"></span>
            </div>
            <div className="header-user-badge">
              <FaUserMd style={{ color: 'var(--primary-color)' }} />
              <span>{currentUser.name} ({currentUser.medRegNumber || 'Verified License'})</span>
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

// Internal Sub-component OverviewTab for Doctor
const OverviewTab = ({ setActiveTab, doc }) => {
  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Welcome, {doc.name}!</h3>
          <p>You are logged into the clinical management board. Here is a summary of your assigned workflows.</p>
        </div>
      </div>

      <div className="stats-grid-row">
        <div className="stat-card">
          <div className="stat-card-icon"><FaUserInjured /></div>
          <div className="stat-card-info">
            <h4>2</h4>
            <p>Assigned Cases</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon secondary"><FaUserCheck /></div>
          <div className="stat-card-info">
            <h4>2 Pending</h4>
            <p>Reports Verification</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon danger"><FaCalendarCheck /></div>
          <div className="stat-card-info">
            <h4>1 Active</h4>
            <p>Consultations Queue</p>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card" style={{ textAlign: 'left' }}>
          <h4>Specialist Actions</h4>
          <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '20px' }}>
            Audits patient GFR and biochemical predictions, registers diagnostic evaluations, or approves transplant queues.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button className="btn btn-primary" onClick={() => setActiveTab('VerifyPrediction')} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FaUserCheck /> Check and Verify Diagnostic Predictions
            </button>
            <button className="btn btn-secondary" onClick={() => setActiveTab('Reports')} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FaClinicMedical /> Draft Patient Diagnostic Evaluation Summary
            </button>
            <button className="btn btn-outline" onClick={() => setActiveTab('Patients')} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FaUserInjured /> Query Full Patients Medical History Charts
            </button>
          </div>
        </div>

        <div className="card" style={{ textAlign: 'left' }}>
          <h4>Credentials & Affiliation</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', marginTop: '10px' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 0', fontWeight: '600' }}>Affiliated Hospital</td>
                <td style={{ padding: '8px 0', textAlign: 'right', opacity: 0.8 }}>{doc.hospital || 'Apex Multispeciality Hospital'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 0', fontWeight: '600' }}>Qualifications</td>
                <td style={{ padding: '8px 0', textAlign: 'right', opacity: 0.8 }}>{doc.qualification || 'MD, DM (Nephrology)'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 0', fontWeight: '600' }}>Registration ID</td>
                <td style={{ padding: '8px 0', textAlign: 'right', color: 'var(--primary-color)', fontWeight: '600' }}>{doc.medRegNumber || 'MCI-87654'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 0', fontWeight: '600' }}>Specialization</td>
                <td style={{ padding: '8px 0', textAlign: 'right', opacity: 0.8 }}>{doc.specialization || 'Nephrologist'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;