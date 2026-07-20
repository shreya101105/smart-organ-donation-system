import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaProcedures, FaFileMedical, FaHourglassHalf, FaSyncAlt, FaBell, 
  FaColumns, FaUserAlt, FaHeartbeat, FaCog, FaClinicMedical
} from 'react-icons/fa';

import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar/Sidebar';
import ApplyOrgan from './ApplyOrgan';
import WaitingList from './WaitingList';
import MatchStatus from './MatchStatus';
import Reports from './Reports';
import Profile from './Profile';
import Settings from './Settings';
import Notifications from './Notifications';

import '../../assets/css/dashboard.css';

export const RecipientDashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('Overview');
  const navigate = useNavigate();

  // Route protection
  if (!currentUser || currentUser.role !== 'Recipient') {
    navigate('/login?role=Recipient');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { label: 'Overview', tab: 'Overview', icon: FaColumns },
    { label: 'Apply Organ', tab: 'Apply', icon: FaFileMedical },
    { label: 'Waiting List', tab: 'WaitingList', icon: FaHourglassHalf },
    { label: 'Match Status', tab: 'Matching', icon: FaSyncAlt },
    { label: 'Diagnostics Reports', tab: 'Reports', icon: FaClinicMedical },
    { label: 'Alerts', tab: 'Notifications', icon: FaBell },
    { label: 'Profile', tab: 'Profile', icon: FaUserAlt },
    { label: 'Settings', tab: 'Settings', icon: FaCog }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewTab setActiveTab={setActiveTab} rec={currentUser} />;
      case 'Apply':
        return <ApplyOrgan rec={currentUser} />;
      case 'WaitingList':
        return <WaitingList rec={currentUser} />;
      case 'Matching':
        return <MatchStatus rec={currentUser} />;
      case 'Reports':
        return <Reports rec={currentUser} />;
      case 'Notifications':
        return <Notifications rec={currentUser} />;
      case 'Profile':
        return <Profile rec={currentUser} />;
      case 'Settings':
        return <Settings rec={currentUser} />;
      default:
        return <OverviewTab setActiveTab={setActiveTab} rec={currentUser} />;
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Reusable Sidebar */}
      <Sidebar 
        title="Recipient Panel"
        logoIcon={FaProcedures}
        user={currentUser}
        menuItems={menuItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="dashboard-title">
            Recipient Workspace / {activeTab}
          </div>
          <div className="header-actions">
            <div className="header-notification-icon" onClick={() => setActiveTab('Notifications')} style={{ cursor: 'pointer', position: 'relative' }}>
              <FaBell />
              <span className="header-notification-badge" style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: '#EF4444', borderRadius: '50%' }}></span>
            </div>
            <div className="header-user-badge">
              <FaUserAlt style={{ color: 'var(--primary-color)' }} />
              <span>{currentUser.name} ({currentUser.bloodGroup})</span>
            </div>
          </div>
        </header>

        <div className="dashboard-content" style={{ padding: '40px' }}>
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

// Internal Sub-component OverviewTab for Recipient
const OverviewTab = ({ setActiveTab, rec }) => {
  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <div className="stat-card-info">
            <h4>{rec.requiredOrgan || 'Kidney'}</h4>
            <p>Required Organ</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon secondary"><FaHourglassHalf /></div>
          <div className="stat-card-info">
            <h4>#3</h4>
            <p>Queue Position</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon danger"><FaHeartbeat /></div>
          <div className="stat-card-info">
            <h4>{rec.urgency || 'High'}</h4>
            <p>Urgency Rating</p>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card" style={{ textAlign: 'left' }}>
          <h4>Quick Tasks</h4>
          <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '20px' }}>
            Submit transplant requests, check compatibility with active donors, or review queue positions.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button className="btn btn-primary" onClick={() => setActiveTab('Apply')} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FaFileMedical /> File Organ Transplant Application
            </button>
            <button className="btn btn-secondary" onClick={() => setActiveTab('Matching')} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FaSyncAlt /> Run Real-time HLA Matching Queries
            </button>
            <button className="btn btn-outline" onClick={() => setActiveTab('WaitingList')} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FaHourglassHalf /> Check Waiting List Positions
            </button>
          </div>
        </div>

        <div className="card" style={{ textAlign: 'left' }}>
          <h4>Recipient Parameters</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', marginTop: '10px' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 0', fontWeight: '600' }}>Disease State</td>
                <td style={{ padding: '8px 0', textAlign: 'right', opacity: 0.8 }}>{rec.disease || 'End-Stage Renal Disease'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 0', fontWeight: '600' }}>Blood Group</td>
                <td style={{ padding: '8px 0', textAlign: 'right', opacity: 0.8 }}>{rec.bloodGroup || 'A-'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 0', fontWeight: '600' }}>Emergency Contact</td>
                <td style={{ padding: '8px 0', textAlign: 'right', opacity: 0.8 }}>{rec.emergencyContact || 'Bob Smith'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecipientDashboard;
