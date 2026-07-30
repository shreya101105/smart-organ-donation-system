import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaShieldAlt, FaUserAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

export const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleDashboardRedirect = () => {
    setMobileMenuOpen(false);
    if (!currentUser) {
      navigate('/login');
      return;
    }
    const role = currentUser.role ? currentUser.role.toLowerCase() : 'user';
    navigate(`/${role}/dashboard`);
  };

  const handleLogout = () => {
    setMobileMenuOpen(false);
    logout();
    navigate('/');
  };

  // Hide public navbar inside dashboard routes
  const isDashboard =
    location.pathname.includes('/dashboard') ||
    location.pathname.startsWith('/patient/') ||
    location.pathname.startsWith('/donor/') ||
    location.pathname.startsWith('/recipient/') ||
    location.pathname.startsWith('/doctor/') ||
    location.pathname.startsWith('/hospital/') ||
    location.pathname.startsWith('/laboratory/') ||
    location.pathname.startsWith('/admin/');

  if (isDashboard) return null;

  return (
    <nav
      className={`navbar ${scrolled ? 'shrink' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: scrolled ? '64px' : '80px',
        background: scrolled || mobileMenuOpen
          ? 'var(--card-bg, rgba(15, 25, 45, 0.95))'
          : 'rgba(15, 25, 45, 0.4)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled || mobileMenuOpen
          ? '1px solid var(--border-color, rgba(255, 255, 255, 0.1))'
          : '1px solid transparent',
        display: 'flex',
        alignItems: 'center',
        zIndex: 9999,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        className="container navbar-container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 20px',
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: 'clamp(1.15rem, 3vw, 1.4rem)',
            fontWeight: 800,
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-color)',
            textDecoration: 'none',
            zIndex: 10001
          }}
        >
          {/* Animated Diagnostic Core Graphic */}
          <div className="nav-diagnostic-core">
            <div className="nav-core-orbit nav-outer-dashed"></div>
            <div className="nav-core-orbit nav-inner-glow"></div>
            <div className="nav-core-center-shield">
              <FaShieldAlt className="nav-core-shield-icon" />
            </div>
          </div>

          <span>NovaLife AI</span>
        </Link>

        {/* Desktop Links Menu */}
        <ul
          className="navbar-menu desktop-only"
          style={{
            listStyle: 'none',
            alignItems: 'center',
            gap: '28px',
            margin: 0,
            padding: 0,
          }}
        >
          {['/', '/about', '/services', '/resources', '/contact'].map((path) => {
            const label = path === '/' ? 'Home' : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2);
            return (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `navbar-link ${isActive ? 'active' : ''}`
                  }
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--primary-color)' : 'var(--text-color)',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.92rem',
                    textDecoration: 'none',
                  })}
                >
                  {label}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Desktop Right Action Controls */}
        <div
          className="navbar-actions desktop-only"
          style={{ alignItems: 'center', gap: '16px' }}
        >
          <ThemeToggle />

          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                className="btn btn-outline"
                onClick={handleDashboardRedirect}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <FaUserAlt /> Panel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleLogout}
                aria-label="Logout"
                style={{ padding: '10px 14px', fontSize: '0.85rem' }}
              >
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link
                to="/login"
                className="btn btn-outline"
                style={{
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-color)',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px'
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(135deg, var(--secondary-color) 0%, var(--primary-color) 100%)',
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '8px 18px',
                  borderRadius: '8px'
                }}
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle & Actions */}
        <div className="mobile-toggle-wrapper" style={{ display: 'none', alignItems: 'center', gap: '12px', zIndex: 10001 }}>
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-color)',
              fontSize: '1.4rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px'
            }}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      <div
        className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: scrolled ? '64px' : '80px',
          left: 0,
          width: '100vw',
          height: 'calc(100dvh - 64px)',
          background: 'var(--card-bg, #090d16)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 20px',
          boxSizing: 'border-box',
          overflowY: 'auto',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
          transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'all' : 'none',
          zIndex: 9998
        }}
      >
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {['/', '/about', '/services', '/resources', '/contact'].map((path) => {
            const label = path === '/' ? 'Home' : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2);
            return (
              <li key={path} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                <NavLink
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--primary-color)' : 'var(--text-color)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '1.1rem',
                    textDecoration: 'none',
                    display: 'block'
                  })}
                >
                  {label}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Mobile Authentication Buttons */}
        <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {currentUser ? (
            <>
              <button
                className="btn btn-outline"
                onClick={handleDashboardRedirect}
                style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              >
                <FaUserAlt /> Dashboard Panel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleLogout}
                style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-outline"
                style={{ width: '100%', textAlign: 'center', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', textDecoration: 'none', color: 'var(--text-color)' }}
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary"
                style={{ width: '100%', textAlign: 'center', padding: '12px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--secondary-color) 0%, var(--primary-color) 100%)', textDecoration: 'none', color: '#fff' }}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Styles & Animation Rules */}
      <style>{`
        .desktop-only {
          display: flex;
        }

        .nav-diagnostic-core {
          position: relative;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .nav-core-orbit {
          position: absolute;
          border-radius: 50%;
        }

        .nav-core-orbit.nav-outer-dashed {
          width: 36px;
          height: 36px;
          border: 1.5px dashed rgba(0, 212, 255, 0.6);
          animation: navSpinClockwise 15s linear infinite;
        }

        .nav-core-orbit.nav-inner-glow {
          width: 28px;
          height: 28px;
          border: 1px solid rgba(0, 212, 255, 0.4);
          box-shadow: 0 0 8px rgba(0, 212, 255, 0.3), inset 0 0 8px rgba(0, 212, 255, 0.2);
          animation: navPulseGlow 3s ease-in-out infinite alternate;
        }

        .nav-core-center-shield {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(17, 24, 39, 0.85);
          backdrop-filter: blur(6px);
          border: 1px solid var(--primary-color, #00d4ff);
          box-shadow: 0 0 8px rgba(0, 212, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
        }

        .nav-core-shield-icon {
          font-size: 0.65rem;
          color: var(--primary-color, #00d4ff);
          filter: drop-shadow(0 0 4px rgba(0, 212, 255, 0.8));
          animation: navIconFloat 2.5s ease-in-out infinite;
        }

        @keyframes navSpinClockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes navPulseGlow {
          0% { transform: scale(1); box-shadow: 0 0 6px rgba(0, 212, 255, 0.2); }
          100% { transform: scale(1.05); box-shadow: 0 0 12px rgba(0, 212, 255, 0.6); }
        }

        @keyframes navIconFloat {
          0% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
          100% { transform: translateY(0); }
        }

        .navbar-link {
          position: relative;
          padding: 8px 0;
          transition: var(--transition-fast);
        }
        .navbar-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary-color);
          transition: var(--transition-fast);
        }
        .navbar-link:hover::after, .navbar-link.active::after {
          width: 100%;
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-toggle-wrapper {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;