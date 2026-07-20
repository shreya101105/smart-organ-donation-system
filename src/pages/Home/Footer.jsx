import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-logo">
            <FaHeartbeat style={{ color: 'var(--primary-color)' }} />
            <span>NovaLife AI</span>
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: '1.5', opacity: 0.8 }}>
            An intelligent portal for early failure analysis, legal pledges, matching compatibilities, and transplant clearances.
          </p>
        </div>

        <div>
          <h4 className="footer-title">Role Gateways</h4>
          <ul className="footer-links">
            <li><Link to="/login?role=Patient">Patient Portal</Link></li>
            <li><Link to="/login?role=Donor">Donor Portal</Link></li>
            <li><Link to="/login?role=Recipient">Recipient Portal</Link></li>
            <li><Link to="/login?role=Doctor">Doctor Portal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Help Links</h4>
          <ul className="footer-links">
            <li><a href="#about">About Project</a></li>
            <li><a href="#compatibility">HLA Matching</a></li>
            <li><a href="#faq">FAQs</a></li>
            <li><a href="#contact">Contact Support</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Clinical Desk</h4>
          <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>
            For emergency HLA report verification requests, contact the central verification node:
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', fontSize: '0.85rem' }}>
            <FaPhoneAlt /> <span>+91 11-2345-6789</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', fontSize: '0.85rem' }}>
            <FaEnvelope /> <span>clinical@smartorgan.gov.in</span>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} NovaLife AI - Organ Donation Management System. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;
