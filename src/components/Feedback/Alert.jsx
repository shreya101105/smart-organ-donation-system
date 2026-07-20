import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';

export const Alert = ({
  children,
  type = 'info', // success, danger, warning, info
  title = '',
  className = '',
  style = {}
}) => {
  const alertStyles = {
    success: {
      bg: 'rgba(16, 185, 129, 0.08)',
      border: '1px solid rgba(16, 185, 129, 0.25)',
      color: '#10B981',
      icon: FaCheckCircle
    },
    danger: {
      bg: 'rgba(239, 68, 68, 0.08)',
      border: '1px solid rgba(239, 68, 68, 0.25)',
      color: '#EF4444',
      icon: FaTimesCircle
    },
    warning: {
      bg: 'rgba(245, 158, 11, 0.08)',
      border: '1px solid rgba(245, 158, 11, 0.25)',
      color: '#F59E0B',
      icon: FaExclamationCircle
    },
    info: {
      bg: 'rgba(59, 130, 246, 0.08)',
      border: '1px solid rgba(59, 130, 246, 0.25)',
      color: '#3B82F6',
      icon: FaInfoCircle
    }
  };

  const currentStyle = alertStyles[type] || alertStyles.info;
  const Icon = currentStyle.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`alert ${className}`}
      style={{
        display: 'flex',
        gap: '14px',
        padding: '14px 18px',
        borderRadius: '12px',
        backgroundColor: currentStyle.bg,
        border: currentStyle.border,
        color: 'var(--text-color)',
        alignItems: 'flex-start',
        lineHeight: '1.5',
        fontSize: '0.92rem',
        ...style
      }}
    >
      <span style={{ color: currentStyle.color, display: 'flex', alignItems: 'center', fontSize: '1.2rem', marginTop: '2px' }}>
        <Icon />
      </span>
      <div style={{ flexGrow: 1 }}>
        {title && <h5 style={{ margin: '0 0 4px 0', fontWeight: '700', color: currentStyle.color, fontSize: '0.95rem' }}>{title}</h5>}
        <div style={{ opacity: 0.9 }}>{children}</div>
      </div>
    </motion.div>
  );
};

export default Alert;
