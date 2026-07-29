import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaSun, FaMoon, FaUserAlt } from 'react-icons/fa';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';

export const Navbar = () => {
  const { theme, toggleDarkMode } = useContext(ThemeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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

  return (
    <nav className={`navbar ${scrolled ? 'shrink' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo">
          <FaHeartbeat className="navbar-logo-icon" />
          <span>NovaLife AI</span>
        </Link>

        {/* Navigation Links */}
        <ul className="navbar-menu">
          <li><Link to="/" className="navbar-link">Home</Link></li>
          <li><a href="#about" className="navbar-link">About</a></li>
          <li><a href="#features" className="navbar-link">Features</a></li>
          <li><a href="#ai-prediction" className="navbar-link">AI Prediction</a></li>
          <li><a href="#donation" className="navbar-link">Donation</a></li>
          <li>
            <button
              onClick={handleDashboardRedirect}
              className="navbar-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
            >
              Dashboard
            </button>
          </li>
          <li><a href="#contact" className="navbar-link">Contact</a></li>
        </ul>

        {/* Action Buttons */}
        <div className="navbar-actions">
          <button
            className="navbar-theme-toggle"
            onClick={toggleDarkMode}
            title={theme?.darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme?.darkMode ? <FaSun style={{ color: '#FFC107' }} /> : <FaMoon />}
          </button>

          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button className="btn btn-outline" onClick={handleDashboardRedirect}>
                <FaUserAlt /> Dashboard
              </button>
              <button
                className="btn btn-danger"
                onClick={logout}
                style={{ padding: '8px 14px', fontSize: '0.85rem' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;