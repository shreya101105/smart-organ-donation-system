import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';

export const Alert = ({
  children,
  type = 'info', // success, danger, warning, info
  title = '',
  onClose = null, // Optional callback to close/dismiss alert
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
      exit={{ opacity: 0, scale: 0.95 }}
      className={`alert ${className}`}
      style={{
        display: 'flex',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '12px',
        backgroundColor: currentStyle.bg,
        border: currentStyle.border,
        color: 'var(--text-color)',
        alignItems: 'flex-start',
        lineHeight: '1.5',
        fontSize: 'clamp(0.85rem, 2.5vw, 0.92rem)',
        width: '100%',
        boxSizing: 'border-box',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        position: 'relative',
        wordBreak: 'break-word',
        ...style
      }}
    >
      {/* Icon Wrapper with Flex Shrink Prevention */}
      <span
        style={{
          color: currentStyle.color,
          display: 'flex',
          alignItems: 'center',
          fontSize: '1.25rem',
          marginTop: '2px',
          flexShrink: 0
        }}
      >
        <Icon />
      </span>

      {/* Main Alert Content */}
      <div style={{ flexGrow: 1, minWidth: 0 }}>
        {title && (
          <h5
            style={{
              margin: '0 0 4px 0',
              fontWeight: '700',
              color: currentStyle.color,
              fontSize: 'clamp(0.9rem, 2.8vw, 0.98rem)'
            }}
          >
            {title}
          </h5>
        )}
        <div style={{ opacity: 0.9, lineHeight: '1.4' }}>{children}</div>
      </div>

      {/* Optional Dismiss/Close Button for Touch Interface */}
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close alert"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--muted-color)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            flexShrink: 0,
            borderRadius: '4px',
            transition: 'color 0.2s ease',
            marginLeft: '4px'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = currentStyle.color)}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-color)')}
        >
          <FaTimes />
        </button>
      )}
    </motion.div>
  );
};

export default Alert;