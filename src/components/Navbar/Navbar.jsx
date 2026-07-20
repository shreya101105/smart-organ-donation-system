import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaHeartbeat, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
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
    const role = currentUser.role.toLowerCase();
    navigate(`/${role}/dashboard`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Check if we are inside a dashboard layout (which typically hides the public Navbar)
  const isDashboard = location.pathname.includes('/dashboard') || 
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
        background: scrolled ? 'var(--card-bg, rgba(15, 25, 45, 0.85))' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        display: 'flex',
        alignItems: 'center',
        zIndex: 999,
        transition: 'var(--transition-smooth)'
      }}
    >
      <div className="container navbar-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0 20px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-color)' }}>
          <FaHeartbeat style={{ color: 'var(--primary-color)', fontSize: '1.7rem' }} />
          <span>LifeLink AI</span>
        </Link>

        <ul className="navbar-menu" style={{ listStyle: 'none', display: 'flex', alignItems: 'center', gap: '30px', margin: 0, padding: 0 }}>
          <li>
            <NavLink to="/" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`} style={({ isActive }) => ({ color: isActive ? 'var(--primary-color)' : 'var(--text-color)', fontWeight: isActive ? 600 : 500, fontSize: '0.92rem' })}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`} style={({ isActive }) => ({ color: isActive ? 'var(--primary-color)' : 'var(--text-color)', fontWeight: isActive ? 600 : 500, fontSize: '0.92rem' })}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`} style={({ isActive }) => ({ color: isActive ? 'var(--primary-color)' : 'var(--text-color)', fontWeight: isActive ? 600 : 500, fontSize: '0.92rem' })}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/resources" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`} style={({ isActive }) => ({ color: isActive ? 'var(--primary-color)' : 'var(--text-color)', fontWeight: isActive ? 600 : 500, fontSize: '0.92rem' })}>
              Resources
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`} style={({ isActive }) => ({ color: isActive ? 'var(--primary-color)' : 'var(--text-color)', fontWeight: isActive ? 600 : 500, fontSize: '0.92rem' })}>
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ThemeToggle />

          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button className="btn btn-outline" onClick={handleDashboardRedirect} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaUserAlt /> Panel
              </button>
              <button className="btn btn-danger" onClick={handleLogout} style={{ padding: '10px 16px', fontSize: '0.85rem' }}>
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link to="/login" className="btn btn-outline" style={{ border: '1px solid var(--border-color)', color: 'var(--text-color)' }}>Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, var(--secondary-color) 0%, var(--primary-color) 100%)', color: '#fff' }}>Register</Link>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
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
