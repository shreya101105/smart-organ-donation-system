import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  disabled = false,
  required = false,
  error = '',
  icon: Icon = null,
  className = '',
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`floating-input-group ${className} ${error ? 'has-error' : ''}`}>
      {label && (
        <label 
          className={`form-label ${focused || value ? 'floating' : ''}`}
          style={{
            position: 'absolute',
            left: Icon ? '40px' : '16px',
            top: focused || value ? '-10px' : '14px',
            fontSize: focused || value ? '0.78rem' : '0.95rem',
            color: error 
              ? '#EF4444' 
              : focused 
                ? 'var(--primary-color)' 
                : 'var(--muted-color)',
            background: 'var(--bg-color)',
            padding: '0 6px',
            borderRadius: '4px',
            pointerEvents: 'none',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 10,
          }}
        >
          {label} {required && <span style={{ color: '#EF4444' }}>*</span>}
        </label>
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {Icon && (
          <span 
            className="input-icon" 
            style={{ 
              position: 'absolute', 
              left: '16px', 
              color: focused ? 'var(--primary-color)' : 'var(--muted-color)',
              transition: 'color 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none'
            }}
          >
            <Icon />
          </span>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? placeholder : ''}
          disabled={disabled}
          required={required}
          className={`form-input ${error ? 'error-border' : ''}`}
          style={{
            paddingLeft: Icon ? '44px' : '16px',
            borderColor: error ? '#EF4444' : undefined,
          }}
          {...props}
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            style={{
              color: '#EF4444',
              fontSize: '0.8rem',
              marginTop: '5px',
              paddingLeft: '4px',
              fontWeight: '500'
            }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Input;
