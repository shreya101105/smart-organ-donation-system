import React from 'react';
import { FaHeartbeat } from 'react-icons/fa';

export const Loader = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'var(--bg-color)',
      color: 'var(--primary-color)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <FaHeartbeat style={{ fontSize: '3.5rem', animation: 'pulse 1.2s infinite' }} />
      <span style={{ marginTop: '16px', fontSize: '1rem', fontWeight: '600', letterSpacing: '0.5px' }}>
        Loading NovaLife AI Portal...
      </span>
      
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
export default Loader;
