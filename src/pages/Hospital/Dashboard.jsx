import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaHospital, FaBoxes, FaUserInjured, FaHandHoldingHeart, FaCheckCircle, 
  FaHistory, FaSignOutAlt, FaColumns, FaBell, FaUserAlt
} from 'react-icons/fa';

import { AuthContext } from '../../context/AuthContext';
import OrganInventory from './OrganInventory';
import DonorList from './DonorList';
import RecipientList from './RecipientList';
import MatchApproval from './MatchApproval';
import TransplantHistory from './TransplantHistory';

import '../../assets/css/dashboard.css';

export const HospitalDashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('Overview');
  const navigate = useNavigate();

  // Protect route
  if (!currentUser || currentUser.role !== 'Hospital') {
    navigate('/login?role=Hospital');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewTab setActiveTab={setActiveTab} hosp={currentUser} />;
      case 'Inventory':
        return <OrganInventory />;
      case 'Donors':
        return <DonorList />;
      case 'Recipients':
        return <RecipientList />;
      case 'Matches':
        return <MatchApproval />;
      case 'History':
        return <TransplantHistory />;
      default:
        return <OverviewTab setActiveTab={setActiveTab} hosp={currentUser} />;
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div>
          <div className="sidebar-logo">
            <FaHospital /> <span>Hospital Panel</span>
          </div>
          
          <div className="sidebar-profile">
            <div className="sidebar-profile-name">{currentUser.name}</div>
            <div className="sidebar-profile-role">{currentUser.hospitalType} Facility</div>
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
                className={`sidebar-button ${activeTab === 'Inventory' ? 'active' : ''}`}
                onClick={() => setActiveTab('Inventory')}
              >
                <FaBoxes /> Organ Inventory
              </button>
            </li>
            <li className="sidebar-item">
              <button 
                className={`sidebar-button ${activeTab === 'Donors' ? 'active' : ''}`}
                onClick={() => setActiveTab('Donors')}
              >
                <FaHandHoldingHeart /> Donor Registry
              </button>
            </li>
            <li className="sidebar-item">
              <button 
                className={`sidebar-button ${activeTab === 'Recipients' ? 'active' : ''}`}
                onClick={() => setActiveTab('Recipients')}
              >
                <FaUserInjured /> Recipient Waiting
              </button>
            </li>
            <li className="sidebar-item">
              <button 
                className={`sidebar-button ${activeTab === 'Matches' ? 'active' : ''}`}
                onClick={() => setActiveTab('Matches')}
              >
                <FaCheckCircle /> Match Approval
              </button>
            </li>
            <li className="sidebar-item">
              <button 
                className={`sidebar-button ${activeTab === 'History' ? 'active' : ''}`}
                onClick={() => setActiveTab('History')}
              >
                <FaHistory /> Transplants History
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
            Hospital Workspace / {activeTab}
          </div>
          <div className="header-actions">
            <div className="header-user-badge">
              <FaHospital style={{ color: 'var(--primary-color)' }} />
              <span>{currentUser.name} ({currentUser.city})</span>
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

// Internal Sub-component OverviewTab for Hospital
const OverviewTab = ({ setActiveTab, hosp }) => {
  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Welcome, {hosp.name}!</h3>
          <p>Coordinates transplant inventory, patient lists, and surgeon approvals below.</p>
        </div>
      </div>

      <div className="stats-grid-row">
        <div className="stat-card">
          <div className="stat-card-icon"><FaBoxes /></div>
          <div className="stat-card-info">
            <h4>3 Items</h4>
            <p>Cryo-Preserved Organs</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon secondary"><FaCheckCircle /></div>
          <div className="stat-card-info">
            <h4>1 Pending</h4>
            <p>Match Approvals</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon danger"><FaHistory /></div>
          <div className="stat-card-info">
            <h4>1 Completed</h4>
            <p>Transplants Logged</p>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card" style={{ textAlign: 'left' }}>
          <h4>Transplant Actions</h4>
          <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '20px' }}>
            Check real-time HLA matches, verify donor consents, check cryo temperatures, and approve transplants.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button className="btn btn-primary" onClick={() => setActiveTab('Matches')} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FaCheckCircle /> Approve Outstanding Donor-Recipient Matches
            </button>
            <button className="btn btn-secondary" onClick={() => setActiveTab('Inventory')} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FaBoxes /> Open Cold Cryo-Storage Telemetry
            </button>
            <button className="btn btn-outline" onClick={() => setActiveTab('History')} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FaHistory /> Query Transplant Log History
            </button>
          </div>
        </div>

        <div className="card" style={{ textAlign: 'left' }}>
          <h4>Facility Details</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', marginTop: '10px' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 0', fontWeight: '600' }}>License Number</td>
                <td style={{ padding: '8px 0', textAlign: 'right', opacity: 0.8 }}>{hosp.registrationNumber || 'HOSP-2026-99'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 0', fontWeight: '600' }}>Facility Type</td>
                <td style={{ padding: '8px 0', textAlign: 'right', opacity: 0.8 }}>{hosp.hospitalType || 'Private'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 0', fontWeight: '600' }}>Address Coordinates</td>
                <td style={{ padding: '8px 0', textAlign: 'right', opacity: 0.8 }}>{hosp.address}, {hosp.city}, {hosp.state}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 0', fontWeight: '600' }}>PIN Code</td>
                <td style={{ padding: '8px 0', textAlign: 'right', opacity: 0.8 }}>{hosp.pinCode || '201301'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
