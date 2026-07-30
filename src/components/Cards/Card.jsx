import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  onClick,
  hoverable = true,
  glow = false,
  padding = '1.5rem', // Added: Customizable responsive padding prop
  className = '',
  style = {},
  ...props
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`glass-card ${className}`}
      style={{
        width: '100%', // Ensures full width within grid items/flex boxes
        maxWidth: '100%', // Prevents horizontal overflow on small screens
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        ...style
      }}
      whileHover={
        hoverable
          ? {
            y: -5,
            scale: 1.01,
            boxShadow: '0 15px 30px rgba(0, 229, 255, 0.15), 0 0 25px rgba(37, 99, 235, 0.1)',
          }
          : {}
      }
      whileTap={
        hoverable || onClick
          ? {
            scale: 0.98,
            y: 0,
          }
          : {}
      }
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      {...props}
    >
      {/* Light glow effects with GPU acceleration */}
      {glow && (
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 60%)',
            pointerEvents: 'none',
            zIndex: 0,
            willChange: 'transform',
          }}
        />
      )}

      {/* Inner Content Wrapper */}
      <div
        className="card-content"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: padding,
          width: '100%',
          height: '100%'
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Card;