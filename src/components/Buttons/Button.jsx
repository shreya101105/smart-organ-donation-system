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
      className={`btn ${variantClass} ${sizeClass} ${className}`}
      whileHover={!isDisabled ? { scale: 1.03, y: -2 } : {}}
      whileTap={!isDisabled ? { scale: 0.98, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      {...props}
    >
      {loading && (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }}
        >
          <FaSpinner />
        </motion.span>
      )}

      {!loading && Icon && iconPosition === 'left' && (
        <span className="btn-icon left" style={{ marginRight: '8px', display: 'inline-flex', alignItems: 'center' }}><Icon /></span>
      )}

      <span className="btn-text">{children}</span>

      {!loading && Icon && iconPosition === 'right' && (
        <span className="btn-icon right" style={{ marginLeft: '8px', display: 'inline-flex', alignItems: 'center' }}><Icon /></span>
      )}
    </motion.button>
  );
};

export default Button;
