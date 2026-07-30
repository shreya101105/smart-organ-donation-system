import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
  style = {},
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div
      className={`floating-input-group ${className} ${error ? 'has-error' : ''}`}
      style={{
        position: 'relative',
        width: '100%',
        marginBottom: '18px',
        boxSizing: 'border-box',
        ...style
      }}
    >
      {/* Floating Label */}
      {label && (
        <label
          className={`form-label ${focused || value ? 'floating' : ''}`}
          style={{
            position: 'absolute',
            left: (focused || value) ? '12px' : (Icon ? '42px' : '16px'),
            top: (focused || value) ? '-10px' : '50%',
            transform: (focused || value) ? 'translateY(0)' : 'translateY(-50%)',
            fontSize: (focused || value) ? '0.78rem' : 'clamp(0.88rem, 2.5vw, 0.95rem)',
            fontWeight: (focused || value) ? '600' : '400',
            color: error
              ? '#EF4444'
              : focused
                ? 'var(--primary-color)'
                : 'var(--muted-color)',
            background: 'var(--bg-color)',
            padding: '0 6px',
            borderRadius: '4px',
            pointerEvents: 'none',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 10,
            maxWidth: 'calc(100% - 32px)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {label} {required && <span style={{ color: '#EF4444' }}>*</span>}
        </label>
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
        {/* Optional Leading Icon */}
        {Icon && (
          <span
            className="input-icon"
            style={{
              position: 'absolute',
              left: '14px',
              color: focused ? 'var(--primary-color)' : 'var(--muted-color)',
              transition: 'color 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
              fontSize: '1.1rem',
              zIndex: 2
            }}
          >
            <Icon />
          </span>
        )}

        {/* Input Control */}
        <input
          type={inputType}
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
            width: '100%',
            height: '48px',
            paddingLeft: Icon ? '42px' : '16px',
            paddingRight: isPassword ? '44px' : '16px',
            fontSize: '16px', // Prevents iOS Safari automatic zoom on focus
            color: 'var(--text-color)',
            background: 'transparent',
            borderRadius: '10px',
            border: `1.5px solid ${error ? '#EF4444' : focused ? 'var(--primary-color)' : 'var(--border-color, rgba(255,255,255,0.15))'}`,
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            boxShadow: focused ? `0 0 0 3px ${error ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0, 229, 255, 0.15)'}` : 'none'
          }}
          {...props}
        />

        {/* Optional Password Visibility Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            style={{
              position: 'absolute',
              right: '12px',
              background: 'transparent',
              border: 'none',
              color: 'var(--muted-color)',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              zIndex: 2
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            style={{
              color: '#EF4444',
              fontSize: '0.8rem',
              marginTop: '6px',
              paddingLeft: '4px',
              fontWeight: '500',
              lineHeight: '1.3'
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