import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUserAlt, FaLaptopMedical, FaFileMedical, FaHistory, 
  FaCalendarAlt, FaBell, FaCog, FaSignOutAlt, FaColumns, FaWeight, FaRulerVertical, FaDna
} from 'react-icons/fa';

import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar/Sidebar';
import Profile from './Profile';
import DiseasePrediction from './DiseasePrediction';
import MedicalReports from './MedicalReports';
import PredictionHistory from './PredictionHistory';
import Appointments from './Appointments';
import Notifications from './Notifications';
import Settings from './Settings';

import '../../assets/css/dashboard.css';

export const PatientDashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('Overview');
  const navigate = useNavigate();

  // Protect route just in case
  if (!currentUser || currentUser.role !== 'Patient') {
    navigate('/login?role=Patient');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { label: 'Overview', tab: 'Overview', icon: FaColumns },
    { label: 'Profile Details', tab: 'Profile', icon: FaUserAlt },
    { label: 'AI Prediction', tab: 'Prediction', icon: FaLaptopMedical },
    { label: 'Lab Reports', tab: 'Reports', icon: FaFileMedical },
    { label: 'Prediction History', tab: 'History', icon: FaHistory },
    { label: 'Consultations', tab: 'Appointments', icon: FaCalendarAlt },
    { label: 'Notifications', tab: 'Notifications', icon: FaBell },
    { label: 'Settings', tab: 'Settings', icon: FaCog }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewTab setActiveTab={setActiveTab} user={currentUser} />;
      case 'Profile':
        return <Profile />;
      case 'Prediction':
        return <DiseasePrediction />;
      case 'Reports':
        return <MedicalReports />;
      case 'History':
        return <PredictionHistory />;
      case 'Appointments':
        return <Appointments />;
      case 'Notifications':
        return <Notifications />;
      case 'Settings':
        return <Settings />;
      default:
        return <OverviewTab setActiveTab={setActiveTab} user={currentUser} />;
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Reusable Sidebar */}
      <Sidebar 
        title="Patient Panel"
        logoIcon={FaLaptopMedical}
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
            Patient Workspace / {activeTab}
          </div>
          <div className="header-actions">
            <div className="header-notification-icon" onClick={() => setActiveTab('Notifications')}>
              <FaBell />
              <span className="header-notification-badge"></span>
            </div>
            <div className="header-user-badge">
              <FaUserAlt style={{ color: 'var(--primary-color)' }} />
              <span>{currentUser.name} ({currentUser.bloodGroup})</span>
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

// Internal Sub-component OverviewTab for default screen
const OverviewTab = ({ setActiveTab, user }) => {
  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Welcome Back, {user.name}!</h3>
          <p>Here is your clinical dashboard outline. Check alerts or run disease models below.</p>
        </div>
      </div>

      <div className="stats-grid-row">
        <div className="stat-card">
          <div className="stat-card-icon"><FaDna /></div>
          <div className="stat-card-info">
            <h4>{user.bloodGroup}</h4>
            <p>Blood Group</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon secondary"><FaRulerVertical /></div>
          <div className="stat-card-info">
            <h4>{user.height} cm</h4>
            <p>Height</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon danger"><FaWeight /></div>
          <div className="stat-card-info">
            <h4>{user.weight} kg</h4>
            <p>Weight</p>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card" style={{ textAlign: 'left' }}>
          <h4>Quick Tasks</h4>
          <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '20px' }}>
            Run early fail assessment models, request specialist doctor consultation, or check diagnostics.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button className="btn btn-primary" onClick={() => setActiveTab('Prediction')} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FaLaptopMedical /> Execute AI Disease Prediction Model
            </button>
            <button className="btn btn-secondary" onClick={() => setActiveTab('Appointments')} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FaCalendarAlt /> Schedule Specialist Consultation
            </button>
            <button className="btn btn-outline" onClick={() => setActiveTab('Reports')} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FaFileMedical /> Open Laboratory Reports Desk
            </button>
          </div>
        </div>

        <div className="card" style={{ textAlign: 'left' }}>
          <h4>Profile Summary</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', marginTop: '10px' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 0', fontWeight: '600' }}>Email Address</td>
                <td style={{ padding: '8px 0', textAlign: 'right', opacity: 0.8 }}>{user.email}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 0', fontWeight: '600' }}>Phone</td>
                <td style={{ padding: '8px 0', textAlign: 'right', opacity: 0.8 }}>{user.phone}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 0', fontWeight: '600' }}>Date of Birth</td>
                <td style={{ padding: '8px 0', textAlign: 'right', opacity: 0.8 }}>{user.dob}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 0', fontWeight: '600' }}>Allergies</td>
                <td style={{ padding: '8px 0', textAlign: 'right', opacity: 0.8, color: '#dc3545', fontWeight: '600' }}>{user.allergies || 'None recorded'}</td>
              </tr>
            </tbody>
          </table>
          <button 
            className="btn btn-outline" 
            style={{ width: '100%', marginTop: '20px', fontSize: '0.85rem' }} 
            onClick={() => setActiveTab('Profile')}
          >
            Update Clinical Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
