import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaHandHoldingHeart, FaHistory, FaSyncAlt, FaBell, 
  FaColumns, FaUserAlt, FaIdCard, FaAward, FaCog, FaCheckCircle
} from 'react-icons/fa';

import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar/Sidebar';
import DonateOrgan from './DonateOrgan';
import DonationHistory from './DonationHistory';
import MatchingStatus from './MatchingStatus';
import DigitalDonorCard from './DigitalDonorCard';
import Certificates from './Certificates';
import Profile from './Profile';
import Settings from './Settings';
import Notifications from './Notifications';

import '../../assets/css/dashboard.css';

export const DonorDashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('Overview');
  const navigate = useNavigate();

  // Route protection
  if (!currentUser || currentUser.role !== 'Donor') {
    navigate('/login?role=Donor');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { label: 'Overview', tab: 'Overview', icon: FaColumns },
    { label: 'Digital Donor Card', tab: 'Card', icon: FaIdCard },
    { label: 'Pledge Organ', tab: 'Donate', icon: FaHandHoldingHeart },
    { label: 'Pledges History', tab: 'History', icon: FaHistory },
    { label: 'Match Status', tab: 'Matching', icon: FaSyncAlt },
    { label: 'Certificates', tab: 'Certificates', icon: FaAward },
    { label: 'Alerts', tab: 'Notifications', icon: FaBell },
    { label: 'Profile', tab: 'Profile', icon: FaUserAlt },
    { label: 'Settings', tab: 'Settings', icon: FaCog },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewTab setActiveTab={setActiveTab} donor={currentUser} />;
      case 'Card':
        return <DigitalDonorCard donor={currentUser} />;
      case 'Donate':
        return <DonateOrgan donor={currentUser} />;
      case 'History':
        return <DonationHistory donor={currentUser} />;
      case 'Matching':
        return <MatchingStatus donor={currentUser} />;
      case 'Certificates':
        return <Certificates donor={currentUser} />;
      case 'Notifications':
        return <Notifications donor={currentUser} />;
      case 'Profile':
        return <Profile donor={currentUser} />;
      case 'Settings':
        return <Settings donor={currentUser} />;
      default:
        return <OverviewTab setActiveTab={setActiveTab} donor={currentUser} />;
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Reusable Sidebar */}
      <Sidebar 
        title="Donor Panel"
        logoIcon={FaHandHoldingHeart}
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
            Donor Workspace / {activeTab}
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

// Internal Sub-component OverviewTab for Donor
const OverviewTab = ({ setActiveTab, donor }) => {
  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Welcome, {donor.name}!</h3>
          <p>Thank you for your pledge to save lives. Review your digital donor card and quick tasks below.</p>
        </div>
      </div>

      <div className="grid-2">
        {/* Mock Digital Donor Card Preview */}
        <div 
          onClick={() => setActiveTab('Card')}
          className="glass-card"
          style={{ 
            background: 'linear-gradient(135deg, #09111F 0%, #151E2E 100%)', 
            color: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '240px',
            borderRadius: '18px',
            border: '1px solid var(--border-color)',
            padding: '24px',
            textAlign: 'left',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '1rem', fontWeight: '800', fontFamily: 'var(--font-heading)', letterSpacing: '1px' }}>
              SMART DONOR PASS
            </span>
            <FaIdCard style={{ fontSize: '2.5rem', opacity: 0.2 }} />
          </div>

          <div style={{ margin: '15px 0' }}>
            <h4 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '2px', color: '#fff' }}>{donor.name}</h4>
            <div style={{ display: 'flex', gap: '20px', fontSize: '0.8rem', opacity: 0.9 }}>
              <div>
                <span>Blood: </span><strong style={{ color: 'var(--primary-color)' }}>{donor.bloodGroup}</strong>
              </div>
              <div>
                <span>Organs: </span><strong>{(donor.organsWillingToDonate || ['Kidney']).length} Pledged</strong>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px' }}>
            <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FaCheckCircle /> PLEDGE VERIFIED
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8, color: 'var(--primary-color)' }}>
              Open Full Pass &rarr;
            </div>
          </div>
        </div>

        {/* Quick Operations panel */}
        <div className="card" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h4>Quick Tasks</h4>
          <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '20px' }}>
            Modify pledged organs list, download legal consent copies, or check live recipient cross-matching.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button className="btn btn-secondary" onClick={() => setActiveTab('Donate')} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FaHandHoldingHeart /> Submit New Organ Pledge
            </button>
            <button className="btn btn-primary" onClick={() => setActiveTab('Matching')} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FaSyncAlt /> Query Live Recipient Crossmatches
            </button>
            <button className="btn btn-outline" onClick={() => setActiveTab('History')} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FaHistory /> View Pledge Sign History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
