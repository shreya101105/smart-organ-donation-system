import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

export const Sidebar = ({
  title = 'Panel',
  logoIcon: LogoIcon = null,
  user = {},
  menuItems = [],
  activeTab = '',
  setActiveTab = () => { },
  onLogout = () => { },
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMobileSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  const sidebarContent = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        overflowY: 'auto',
      }}
    >
      <div>
        {/* Brand / Logo Header */}
        <div
          className="sidebar-logo"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '1.25rem',
            fontWeight: 700,
            marginBottom: '20px',
            color: 'var(--text-color)',
          }}
        >
          {LogoIcon && <LogoIcon style={{ color: 'var(--primary-color)', fontSize: '1.4rem' }} />}
          <span>{title}</span>
        </div>

        {/* User Info Card */}
        {user && (user.name || user.role) && (
          <div
            className="sidebar-profile"
            style={{
              padding: '12px 14px',
              borderRadius: '10px',
              background: 'var(--card-bg, rgba(255, 255, 255, 0.05))',
              border: '1px solid var(--border-color, rgba(255, 255, 255, 0.1))',
              marginBottom: '20px',
            }}
          >
            <div
              className="sidebar-profile-name"
              title={user.name}
              style={{
                fontWeight: 600,
                fontSize: '0.95rem',
                color: 'var(--text-color)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {user.name || 'User'}
            </div>
            <div
              className="sidebar-profile-role"
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted, #8a99ad)',
                textTransform: 'capitalize',
                marginTop: '2px',
              }}
            >
              {user.role || 'Member'}
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <ul
          className="sidebar-menu"
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeTab === item.tab;
            return (
              <li key={item.tab || idx} className="sidebar-item">
                <motion.button
                  className={`sidebar-button ${isActive ? 'active' : ''}`}
                  onClick={() => handleTabClick(item.tab)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: isActive
                      ? 'var(--primary-color, #00d4ff)'
                      : 'transparent',
                    color: isActive ? '#fff' : 'var(--text-color)',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.2s ease, color 0.2s ease',
                  }}
                >
                  {Icon && <Icon style={{ fontSize: '1.1rem', flexShrink: 0 }} />}
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.label}
                  </span>
                </motion.button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer / Sign Out Button */}
      <div className="sidebar-footer" style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-color, rgba(255, 255, 255, 0.1))' }}>
        <button
          className="btn btn-danger"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
          onClick={onLogout}
        >
          <FaSignOutAlt /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header Bar */}
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
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-color, rgba(255, 255, 255, 0.1))',
          zIndex: 800,
          padding: '0 16px',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--text-color)' }}>
          {LogoIcon && <LogoIcon style={{ color: 'var(--primary-color)', fontSize: '1.25rem' }} />}
          <span>{title}</span>
        </div>
        <button
          onClick={toggleMobileSidebar}
          aria-label="Toggle Dashboard Sidebar Menu"
          aria-expanded={isOpen}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-color)',
            fontSize: '1.35rem',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Desktop Sidebar (visible on screens > 768px) */}
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
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={toggleMobileSidebar}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: '#000',
                zIndex: 850,
              }}
            />

            {/* Slide Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: 'min(280px, 80vw)',
                height: '100dvh',
                background: 'var(--bg-color, #0f192d)',
                borderRight: '1px solid var(--border-color, rgba(255, 255, 255, 0.1))',
                zIndex: 900,
                padding: '24px 20px',
                boxShadow: '10px 0 30px rgba(0,0,0,0.5)',
                boxSizing: 'border-box',
              }}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Responsive Breakpoint CSS Injection */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-sidebar {
            display: none !important;
          }
          .mobile-header {
            display: flex !important;
          }
          .dashboard-layout,
          .dashboard-container,
          .main-content {
            grid-template-columns: 1fr !important;
            padding-top: 60px !important;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;