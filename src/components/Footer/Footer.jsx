import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaEnvelope, FaPhoneAlt, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="footer" style={{ borderTop: '1px solid var(--border-color)', background: 'var(--bg-color)', transition: 'var(--transition-smooth)' }}>
      <div className="container footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', padding: '60px 20px 40px 20px' }}>
        <div>
          <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-color)', marginBottom: '16px' }}>
            <FaHeartbeat style={{ color: 'var(--primary-color)' }} />
            <span>LifeLink AI</span>
          </div>
          <p style={{ fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--muted-color)', marginBottom: '20px' }}>
            Smart AI Disease Detection & Organ Donation Platform. Pioneering clinical HLA tissue matching and early transplant analytics.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#" className="social-link" style={{ color: 'var(--muted-color)', fontSize: '1.2rem', transition: 'color 0.2s' }}><FaTwitter /></a>
            <a href="#" className="social-link" style={{ color: 'var(--muted-color)', fontSize: '1.2rem', transition: 'color 0.2s' }}><FaLinkedin /></a>
            <a href="#" className="social-link" style={{ color: 'var(--muted-color)', fontSize: '1.2rem', transition: 'color 0.2s' }}><FaGithub /></a>
          </div>
        </div>

        <div>
          <h4 className="footer-title" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-color)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gateways</h4>
          <ul className="footer-links" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
            <li><Link to="/login?role=Patient" style={{ color: 'var(--muted-color)', fontSize: '0.9rem' }}>Patient Dashboard</Link></li>
            <li><Link to="/login?role=Donor" style={{ color: 'var(--muted-color)', fontSize: '0.9rem' }}>Donor Gateway</Link></li>
            <li><Link to="/login?role=Recipient" style={{ color: 'var(--muted-color)', fontSize: '0.9rem' }}>Recipient Desk</Link></li>
            <li><Link to="/login?role=Doctor" style={{ color: 'var(--muted-color)', fontSize: '0.9rem' }}>Doctor Hub</Link></li>
            <li><Link to="/login?role=Hospital" style={{ color: 'var(--muted-color)', fontSize: '0.9rem' }}>Hospital Panel</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-color)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Resources</h4>
          <ul className="footer-links" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
            <li><Link to="/about" style={{ color: 'var(--muted-color)', fontSize: '0.9rem' }}>About LifeLink AI</Link></li>
            <li><Link to="/services" style={{ color: 'var(--muted-color)', fontSize: '0.9rem' }}>Our AI Models</Link></li>
            <li><Link to="/resources" style={{ color: 'var(--muted-color)', fontSize: '0.9rem' }}>Compatibility Rules</Link></li>
            <li><Link to="/contact" style={{ color: 'var(--muted-color)', fontSize: '0.9rem' }}>Support & Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-color)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Emergency Desk</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--muted-color)', lineHeight: '1.6', marginBottom: '16px' }}>
            For real-time HLA profile crossmatching alerts or transplant authority approvals:
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-color)', marginBottom: '8px' }}>
            <FaPhoneAlt style={{ color: 'var(--primary-color)' }} /> <span>+91 11-2345-6789</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-color)' }}>
            <FaEnvelope style={{ color: 'var(--primary-color)' }} /> <span>clinical@lifelinkai.gov.in</span>
          </div>
        </div>
      </div>

      <div className="container footer-bottom" style={{ borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'center', padding: '30px 20px', fontSize: '0.85rem', color: 'var(--muted-color)' }}>
        <p>&copy; {new Date().getFullYear()} LifeLink AI - Smart Organ Disease Detection & Donation. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
