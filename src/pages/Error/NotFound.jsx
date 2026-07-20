import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaHome } from 'react-icons/fa';

export const NotFound = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      backgroundColor: 'var(--homepage-bg-color)',
      color: 'var(--text-color)',
      textAlign: 'center'
    }}>
      <FaHeartbeat style={{ fontSize: '4rem', color: '#dc3545', marginBottom: '20px', animation: 'pulse 1.5s infinite' }} />
      <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '10px' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Page Not Found</h2>
      <p style={{ maxWidth: '420px', opacity: 0.8, marginBottom: '30px' }}>
        The clinical route or dashboard you requested does not exist or has been relocated to another server node.
      </p>
      <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <FaHome /> Back to Home Page
      </Link>
    </div>
  );
};
export default NotFound;
