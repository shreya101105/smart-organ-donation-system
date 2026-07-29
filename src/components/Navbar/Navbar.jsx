import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaShieldAlt, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

export const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

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

  const handleDashboardRedirect = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    const role = currentUser.role ? currentUser.role.toLowerCase() : 'user';
    navigate(`/${role}/dashboard`);
  };

  const handleLogout = () => {
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
        height: scrolled ? '70px' : '90px',
        background: scrolled
          ? 'var(--card-bg, rgba(15, 25, 45, 0.85))'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled
          ? '1px solid var(--border-color)'
          : '1px solid transparent',
        display: 'flex',
        alignItems: 'center',
        zIndex: 999,
        transition: 'var(--transition-smooth)',
      }}
    >
      <div
        className="container navbar-container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '0 20px',
        }}
      >
        {/* Brand Logo with Full Animated Diagnostic Core */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '1.4rem',
            fontWeight: 800,
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-color)',
            textDecoration: 'none',
          }}
        >
          {/* Animated Orbit Diagnostic Core Graphic */}
          <div className="nav-diagnostic-core">
            <div className="nav-core-orbit nav-outer-dashed"></div>
            <div className="nav-core-orbit nav-inner-glow"></div>
            <div className="nav-core-center-shield">
              <FaShieldAlt className="nav-core-shield-icon" />
            </div>
          </div>

          <span>NovaLife AI</span>
        </Link>

        {/* Menu Navigation */}
        <ul
          className="navbar-menu"
          style={{
            listStyle: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <NavLink
              to="/"
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
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
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
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
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
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/resources"
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
              Resources
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
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
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Action Controls */}
        <div
          className="navbar-actions"
          style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
        >
          <ThemeToggle />

          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                style={{ padding: '10px 16px', fontSize: '0.85rem' }}
              >
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link
                to="/login"
                className="btn btn-outline"
                style={{
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-color)',
                  textDecoration: 'none',
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary"
                style={{
                  background:
                    'linear-gradient(135deg, var(--secondary-color) 0%, var(--primary-color) 100%)',
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Embedded CSS for the Mini Animated Core in Navbar */}
      <style>{`
        .nav-diagnostic-core {
          position: relative;
          width: 42px;
          height: 42px;
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
          width: 42px;
          height: 42px;
          border: 1.5px dashed rgba(0, 212, 255, 0.6);
          animation: navSpinClockwise 15s linear infinite;
        }

        .nav-core-orbit.nav-inner-glow {
          width: 34px;
          height: 34px;
          border: 1px solid rgba(0, 212, 255, 0.4);
          box-shadow: 0 0 8px rgba(0, 212, 255, 0.3),
                      inset 0 0 8px rgba(0, 212, 255, 0.2);
          animation: navPulseGlow 3s ease-in-out infinite alternate;
        }

        .nav-core-center-shield {
          width: 24px;
          height: 24px;
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
          font-size: 0.75rem;
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
        .navbar-link:hover {
          color: var(--primary-color) !important;
        }
        @media (max-width: 768px) {
          .navbar-menu {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;