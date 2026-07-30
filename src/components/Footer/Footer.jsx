import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaEnvelope, FaPhoneAlt, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer
      className="footer"
      style={{
        borderTop: '1px solid var(--border-color)',
        background: 'var(--bg-color)',
        transition: 'var(--transition-smooth)',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <div
        className="container footer-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'clamp(24px, 4vw, 40px)',
          padding: 'clamp(32px, 5vw, 60px) 20px clamp(24px, 4vw, 40px) 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          boxSizing: 'border-box'
        }}
      >
        {/* Brand Column */}
        <div className="footer-col">
          <div
            className="footer-logo"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: 'clamp(1.2rem, 3vw, 1.4rem)',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-color)',
              marginBottom: '16px'
            }}
          >
            <FaHeartbeat style={{ color: 'var(--primary-color)', flexShrink: 0 }} />
            <span>LifeLink AI</span>
          </div>
          <p style={{ fontSize: 'clamp(0.82rem, 2.2vw, 0.88rem)', lineHeight: '1.6', color: 'var(--muted-color)', marginBottom: '20px' }}>
            Smart AI Disease Detection & Organ Donation Platform. Pioneering clinical HLA tissue matching and early transplant analytics.
          </p>
          {/* Social Links */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <a
              href="#"
              aria-label="Twitter"
              className="social-link"
              style={{ color: 'var(--muted-color)', fontSize: '1.25rem', padding: '6px', margin: '-6px', transition: 'color 0.2s ease' }}
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="social-link"
              style={{ color: 'var(--muted-color)', fontSize: '1.25rem', padding: '6px', margin: '-6px', transition: 'color 0.2s ease' }}
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="social-link"
              style={{ color: 'var(--muted-color)', fontSize: '1.25rem', padding: '6px', margin: '-6px', transition: 'color 0.2s ease' }}
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Gateways Column */}
        <div className="footer-col">
          <h4
            className="footer-title"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
              color: 'var(--text-color)',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Gateways
          </h4>
          <ul className="footer-links" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0, margin: 0 }}>
            <li><Link to="/login?role=Patient" style={{ color: 'var(--muted-color)', fontSize: '0.88rem', display: 'inline-block', padding: '2px 0' }}>Patient Dashboard</Link></li>
            <li><Link to="/login?role=Donor" style={{ color: 'var(--muted-color)', fontSize: '0.88rem', display: 'inline-block', padding: '2px 0' }}>Donor Gateway</Link></li>
            <li><Link to="/login?role=Recipient" style={{ color: 'var(--muted-color)', fontSize: '0.88rem', display: 'inline-block', padding: '2px 0' }}>Recipient Desk</Link></li>
            <li><Link to="/login?role=Doctor" style={{ color: 'var(--muted-color)', fontSize: '0.88rem', display: 'inline-block', padding: '2px 0' }}>Doctor Hub</Link></li>
            <li><Link to="/login?role=Hospital" style={{ color: 'var(--muted-color)', fontSize: '0.88rem', display: 'inline-block', padding: '2px 0' }}>Hospital Panel</Link></li>
          </ul>
        </div>

        {/* Resources Column */}
        <div className="footer-col">
          <h4
            className="footer-title"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
              color: 'var(--text-color)',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Resources
          </h4>
          <ul className="footer-links" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0, margin: 0 }}>
            <li><Link to="/about" style={{ color: 'var(--muted-color)', fontSize: '0.88rem', display: 'inline-block', padding: '2px 0' }}>About LifeLink AI</Link></li>
            <li><Link to="/services" style={{ color: 'var(--muted-color)', fontSize: '0.88rem', display: 'inline-block', padding: '2px 0' }}>Our AI Models</Link></li>
            <li><Link to="/resources" style={{ color: 'var(--muted-color)', fontSize: '0.88rem', display: 'inline-block', padding: '2px 0' }}>Compatibility Rules</Link></li>
            <li><Link to="/contact" style={{ color: 'var(--muted-color)', fontSize: '0.88rem', display: 'inline-block', padding: '2px 0' }}>Support & Contact</Link></li>
          </ul>
        </div>

        {/* Emergency Desk Column */}
        <div className="footer-col">
          <h4
            className="footer-title"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
              color: 'var(--text-color)',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Emergency Desk
          </h4>
          <p style={{ fontSize: 'clamp(0.82rem, 2.2vw, 0.88rem)', color: 'var(--muted-color)', lineHeight: '1.6', marginBottom: '16px' }}>
            For real-time HLA profile crossmatching alerts or transplant authority approvals:
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-color)', marginBottom: '10px', wordBreak: 'break-word' }}>
            <FaPhoneAlt style={{ color: 'var(--primary-color)', flexShrink: 0 }} /> <span>+91 11-2345-6789</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-color)', wordBreak: 'break-word' }}>
            <FaEnvelope style={{ color: 'var(--primary-color)', flexShrink: 0 }} /> <span>clinical@lifelinkai.gov.in</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="footer-bottom"
        style={{
          borderTop: '1px solid var(--border-color)',
          padding: '20px',
          fontSize: 'clamp(0.78rem, 2vw, 0.85rem)',
          color: 'var(--muted-color)',
          textAlign: 'center'
        }}
      >
        <p style={{ margin: 0, lineHeight: '1.5' }}>
          &copy; {new Date().getFullYear()} LifeLink AI - Smart Organ Disease Detection & Donation. All rights reserved.
        </p>
      </div>

      {/* Scoped responsive style fallbacks */}
      <style>{`
        .social-link:hover {
          color: var(--primary-color) !important;
        }
        .footer-links a:hover {
          color: var(--primary-color) !important;
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;