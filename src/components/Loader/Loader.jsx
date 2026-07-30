import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat } from 'react-icons/fa';

export const Loader = ({
  message = 'Accessing Intelligent Healthcare Systems...',
  fullScreen = true
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: fullScreen ? '100dvh' : '100%',
        width: fullScreen ? '100dvw' : '100%',
        minHeight: fullScreen ? '100vh' : '220px',
        position: fullScreen ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        background: fullScreen ? 'var(--bg-color, #050816)' : 'transparent',
        backdropFilter: fullScreen ? 'blur(10px)' : 'none',
        WebkitBackdropFilter: fullScreen ? 'blur(10px)' : 'none',
        zIndex: fullScreen ? 9999 : 1,
        color: '#FFFFFF',
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ position: 'relative', marginBottom: '24px' }}>
        {/* Pulsating Glow Rings */}
        <motion.div
          animate={{
            scale: [1, 1.35, 1],
            opacity: [0.6, 0, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            top: -16,
            left: -16,
            right: -16,
            bottom: -16,
            borderRadius: '50%',
            border: '2px solid var(--primary-color, #00E5FF)',
            filter: 'blur(4px)',
          }}
        />

        {/* Center Pulse Icon Circle */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            background: 'rgba(0, 229, 255, 0.1)',
            padding: 'clamp(16px, 4vw, 24px)',
            borderRadius: '50%',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 30px rgba(0, 229, 255, 0.2)'
          }}
        >
          <FaHeartbeat
            style={{
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              color: 'var(--primary-color, #00E5FF)'
            }}
          />
        </motion.div>
      </div>

      {/* Loading Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
          fontWeight: 600,
          letterSpacing: '0.04em',
          color: 'var(--muted-color, #94A3B8)',
          textAlign: 'center',
          maxWidth: '420px',
          margin: 0,
          lineHeight: '1.5',
          wordBreak: 'break-word'
        }}
      >
        {message}
      </motion.p>
    </div>
  );
};

export default Loader;