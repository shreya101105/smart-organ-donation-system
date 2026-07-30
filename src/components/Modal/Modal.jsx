import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md', // sm, md, lg, xl
  closeOnOverlayClick = true,
  className = '',
  style = {}
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const sizeWidths = {
    sm: '400px',
    md: '550px',
    lg: '800px',
    xl: '1000px',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100dvw',
            height: '100dvh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '16px',
            boxSizing: 'border-box'
          }}
        >
          {/* Backdrop Blur & Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOnOverlayClick ? onClose : undefined}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(5, 8, 22, 0.8)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          />

          {/* Modal Card / Bottom Sheet Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`glass-card responsive-modal-card ${className}`}
            style={{
              width: '100%',
              maxWidth: sizeWidths[size] || sizeWidths.md,
              maxHeight: 'calc(100dvh - 32px)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 10000,
              padding: 0,
              overflow: 'hidden',
              borderRadius: '16px',
              background: 'var(--card-bg, rgba(15, 23, 42, 0.95))',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 229, 255, 0.12)',
              border: '1px solid var(--border-color, rgba(255, 255, 255, 0.1))',
              position: 'relative',
              ...style
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: '1px solid var(--border-color, rgba(255, 255, 255, 0.1))',
                background: 'rgba(255, 255, 255, 0.02)',
                flexShrink: 0
              }}
            >
              {title && (
                <h4
                  style={{
                    margin: 0,
                    fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--text-color)',
                    fontWeight: 700,
                    paddingRight: '12px',
                    wordBreak: 'break-word'
                  }}
                >
                  {title}
                </h4>
              )}

              <button
                onClick={onClose}
                aria-label="Close modal"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--muted-color)',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                  borderRadius: '50%',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                  marginLeft: 'auto'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#EF4444';
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--muted-color)';
                  e.currentTarget.style.background = 'none';
                }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div
              style={{
                padding: 'clamp(16px, 4vw, 24px)',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain',
                fontSize: 'clamp(0.88rem, 2.5vw, 0.95rem)',
                lineHeight: '1.6',
                color: 'var(--text-color)',
                flexGrow: 1
              }}
            >
              {children}
            </div>
          </motion.div>

          {/* Inline Media Query Fallback for Small Mobile Screen Bottom-Sheet Behaviour */}
          <style>{`
            @media (max-width: 600px) {
              .responsive-modal-card {
                align-self: flex-end !important;
                margin-bottom: 0 !important;
                border-bottom-left-radius: 0 !important;
                border-bottom-right-radius: 0 !important;
                max-height: 88dvh !important;
              }
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;