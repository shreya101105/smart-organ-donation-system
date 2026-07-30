import React from 'react';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // primary, secondary, outline, danger, text
  size = 'md', // sm, md, lg
  loading = false,
  disabled = false,
  icon: Icon = null,
  iconPosition = 'left', // left, right
  fullWidth = false, // Added: Mobile forms/modals ke liye optional full-width prop
  className = '',
  ...props
}) => {
  // Determine variant-specific CSS classes
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const isDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`btn ${variantClass} ${sizeClass} ${fullWidth ? 'btn-full-width' : ''} ${className}`}
      whileHover={!isDisabled ? { scale: 1.02, y: -2 } : {}}
      whileTap={!isDisabled ? { scale: 0.97, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100%', // Prevent overflow on small screens
        opacity: isDisabled ? 0.65 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ...props.style
      }}
      {...props}
    >
      {loading && (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginRight: children ? '8px' : '0',
            flexShrink: 0
          }}
        >
          <FaSpinner />
        </motion.span>
      )}

      {!loading && Icon && iconPosition === 'left' && (
        <span
          className="btn-icon left"
          style={{
            marginRight: children ? '8px' : '0',
            display: 'inline-flex',
            alignItems: 'center',
            flexShrink: 0
          }}
        >
          <Icon />
        </span>
      )}

      {children && (
        <span
          className="btn-text"
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%'
          }}
        >
          {children}
        </span>
      )}

      {!loading && Icon && iconPosition === 'right' && (
        <span
          className="btn-icon right"
          style={{
            marginLeft: children ? '8px' : '0',
            display: 'inline-flex',
            alignItems: 'center',
            flexShrink: 0
          }}
        >
          <Icon />
        </span>
      )}
    </motion.button>
  );
};

export default Button;