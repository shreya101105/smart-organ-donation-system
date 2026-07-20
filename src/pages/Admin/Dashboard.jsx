import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaCog, FaUsers, FaChartBar, FaFileInvoice, FaBrush, 
  FaSignOutAlt, FaColumns, FaUserShield, FaBell
} from 'react-icons/fa';

import { AuthContext } from '../../context/AuthContext';
import ManageUsers from './ManageUsers';
import Analytics from './Analytics';
import Reports from './Reports';
import ThemeSettings from './ThemeSettings';
import WebsiteSettings from './WebsiteSettings';

import '../../assets/css/dashboard.css';

export const AdminDashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('Overview');
  const navigate = useNavigate();

  // Protect route
  if (!currentUser || currentUser.role !== 'Admin') {
    navigate('/login?role=Admin');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewTab setActiveTab={setActiveTab} admin={currentUser} />;
      case 'Users':
        return <ManageUsers />;
      case 'Analytics':
        return <Analytics />;
      case 'Reports':
        return <Reports />;
      case 'Theme':
        return <ThemeSettings />;
      case 'Website':
        return <WebsiteSettings />;
      default:
        return <OverviewTab setActiveTab={setActiveTab} admin={currentUser} />;
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div>
          <div className="sidebar-logo">
            <FaUserShield /> <span>Admin Panel</span>
          </div>
          
          <div className="sidebar-profile">
            <div className="sidebar-profile-name">{currentUser.name}</div>
            <div className="sidebar-profile-role">System Administrator</div>
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
                className={`sidebar-button ${activeTab === 'Users' ? 'active' : ''}`}
                onClick={() => setActiveTab('Users')}
              >
                <FaUsers /> Manage Users
              </button>
            </li>
            <li className="sidebar-item">
              <button 
                className={`sidebar-button ${activeTab === 'Analytics' ? 'active' : ''}`}
                onClick={() => setActiveTab('Analytics')}
              >
                <FaChartBar /> Analytics
              </button>
            </li>
            <li className="sidebar-item">
              <button 
                className={`sidebar-button ${activeTab === 'Reports' ? 'active' : ''}`}
                onClick={() => setActiveTab('Reports')}
              >
                <FaFileInvoice /> Audit Reports
              </button>
            </li>
            <li className="sidebar-item">
              <button 
                className={`sidebar-button ${activeTab === 'Theme' ? 'active' : ''}`}
                onClick={() => setActiveTab('Theme')}
              >
                <FaBrush /> Theme Settings
              </button>
            </li>
            <li className="sidebar-item">
              <button 
                className={`sidebar-button ${activeTab === 'Website' ? 'active' : ''}`}
                onClick={() => setActiveTab('Website')}
              >
                <FaCog /> Appearance
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
            Admin Workspace / {activeTab}
          </div>
          <div className="header-actions">
            <div className="header-user-badge">
              <FaUserShield style={{ color: 'var(--primary-color)' }} />
              <span>{currentUser.name} (Root Executive)</span>
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

// Internal Sub-component OverviewTab for Admin
const OverviewTab = ({ setActiveTab, admin }) => {
  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Welcome, Administrator!</h3>
          <p>Logged into system operations console. Audit users, configure colors, or check databases below.</p>
        </div>
      </div>

      <div className="stats-grid-row">
        <div className="stat-card">
          <div className="stat-card-icon"><FaUsers /></div>
          <div className="stat-card-info">
            <h4>7 Accounts</h4>
            <p>Active Users Registry</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon secondary"><FaChartBar /></div>
          <div className="stat-card-info">
            <h4>98.8%</h4>
            <p>HLA Matching Accuracy</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon danger"><FaFileInvoice /></div>
          <div className="stat-card-info">
            <h4>4 Entries</h4>
            <p>Audit Log Records</p>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card" style={{ textAlign: 'left' }}>
          <h4>Executive Controls</h4>
          <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '20px' }}>
            Modify homepage layouts, change brand color tokens, inspect databases, and manage registered roles.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button className="btn btn-primary" onClick={() => setActiveTab('Website')} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FaCog /> Customize Website Backgrounds & Blurs
            </button>
            <button className="btn btn-secondary" onClick={() => setActiveTab('Theme')} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FaBrush /> Customize Brand Color Themes
            </button>
            <button className="btn btn-outline" onClick={() => setActiveTab('Users')} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FaUsers /> Open User Registrations Desk
            </button>
          </div>
        </div>

        <div className="card" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h4>Live Customizer Status</h4>
          <p style={{ fontSize: '0.88rem', opacity: 0.85 }}>
            Theme changes (primary colors, light/dark baseline states) and appearance settings (homepage wallpaper patterns, blurs, and header opacities) automatically update on page loads and store inside LocalStorage.
          </p>
          <button className="btn btn-outline" style={{ marginTop: '20px' }} onClick={() => setActiveTab('Analytics')}>
            View Statistics charts
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
