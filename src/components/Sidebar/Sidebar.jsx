import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

export const Sidebar = ({
  title = 'Panel',
  logoIcon: LogoIcon = null,
  user = {},
  menuItems = [],
  activeTab = '',
  setActiveTab = () => {},
  onLogout = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsOpen(false); // Close on mobile
  };

  const sidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <div>
        <div className="sidebar-logo">
          {LogoIcon && <LogoIcon />} <span>{title}</span>
        </div>
        
        {user && (
          <div className="sidebar-profile">
            <div className="sidebar-profile-name" title={user.name}>{user.name}</div>
            <div className="sidebar-profile-role">{user.role || 'User'}</div>
          </div>
        )}

        <ul className="sidebar-menu">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeTab === item.tab;
            return (
              <li key={idx} className="sidebar-item">
                <motion.button 
                  className={`sidebar-button ${isActive ? 'active' : ''}`}
                  onClick={() => handleTabClick(item.tab)}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  {Icon && <Icon />} {item.label}
                </motion.button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="sidebar-footer">
        <button 
          className="btn btn-danger" 
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }} 
          onClick={onLogout}
        >
          <FaSignOutAlt /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <div 
        className="mobile-header"
        style={{
          display: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'var(--card-bg, rgba(15, 25, 45, 0.95))',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--border-color)',
          zIndex: 800,
          padding: '0 20px',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
          {LogoIcon && <LogoIcon style={{ color: 'var(--primary-color)' }} />} 
          <span>{title}</span>
        </div>
        <button 
          onClick={toggleMobileSidebar}
          style={{ background: 'none', border: 'none', color: 'var(--text-color)', fontSize: '1.25rem', cursor: 'pointer' }}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Desktop Sidebar (visible on desktop, hidden on mobile in dashboard.css) */}
      <aside className="dashboard-sidebar desktop-sidebar">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (AnimatePresence) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileSidebar}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: '#000',
                zIndex: 850
              }}
            />
            {/* Sidebar drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '280px',
                height: '100vh',
                background: 'var(--bg-color)',
                borderRight: '1px solid var(--border-color)',
                zIndex: 900,
                padding: '32px 24px',
                boxShadow: '10px 0 30px rgba(0,0,0,0.5)'
              }}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      
      {/* Mobile responsive helper style injection */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-sidebar {
            display: none !important;
          }
          .mobile-header {
            display: flex !important;
          }
          .dashboard-layout {
            grid-template-columns: 1fr !important;
            padding-top: 60px !important;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
