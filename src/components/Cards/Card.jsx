import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  onClick,
  hoverable = true,
  glow = false,
  className = '',
  style = {},
  ...props
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`glass-card ${className}`}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
      whileHover={
        hoverable
          ? {
              y: -8,
              scale: 1.02,
              boxShadow: '0 20px 40px rgba(0, 229, 255, 0.15), 0 0 30px rgba(37, 99, 235, 0.1)',
            }
          : {}
      }
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {/* Light glow effects */}
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
          }}
        />
      )}
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </motion.div>
  );
};

export default Card;
