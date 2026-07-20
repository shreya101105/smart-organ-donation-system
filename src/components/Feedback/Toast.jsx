import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';

export const Toast = ({
  message,
  type = 'info', // success, error, warning, info
  isOpen,
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    if (isOpen && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  const typeStyles = {
    success: {
      bg: 'rgba(16, 185, 129, 0.1)',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      glow: '0 0 15px rgba(16, 185, 129, 0.2)',
      color: '#10B981',
      icon: FaCheckCircle
    },
    error: {
      bg: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      glow: '0 0 15px rgba(239, 68, 68, 0.2)',
      color: '#EF4444',
      icon: FaTimesCircle
    },
    warning: {
      bg: 'rgba(245, 158, 11, 0.1)',
      border: '1px solid rgba(245, 158, 11, 0.3)',
      glow: '0 0 15px rgba(245, 158, 11, 0.2)',
      color: '#F59E0B',
      icon: FaExclamationCircle
    },
    info: {
      bg: 'rgba(59, 130, 246, 0.1)',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      glow: '0 0 15px rgba(59, 130, 246, 0.2)',
      color: '#3B82F6',
      icon: FaInfoCircle
    }
  };

  const style = typeStyles[type] || typeStyles.info;
  const Icon = style.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: 'var(--card-bg, rgba(15, 25, 45, 0.85))',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: style.border,
            boxShadow: `0 10px 30px rgba(0, 0, 0, 0.2), ${style.glow}`,
            borderRadius: '12px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            maxWidth: '380px',
            minWidth: '280px',
            zIndex: 9999,
          }}
        >
          <span style={{ color: style.color, display: 'flex', alignItems: 'center', fontSize: '1.25rem' }}>
            <Icon />
          </span>

          <div style={{ flexGrow: 1, fontSize: '0.9rem', color: 'var(--text-color)', fontWeight: '500' }}>
            {message}
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--muted-color)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px',
              borderRadius: '50%',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
          >
            <FaTimes />
          </button>

          {/* Animated Countdown Progress Bar */}
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: duration / 1000, ease: 'linear' }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '3px',
              backgroundColor: style.color,
              borderRadius: '0 0 0 12px'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
