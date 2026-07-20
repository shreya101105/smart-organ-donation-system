import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat } from 'react-icons/fa';

export const Loader = ({ message = 'Accessing Intelligent Healthcare Systems...' }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        background: '#050816', // Core dark background
        zIndex: 9999,
        color: '#FFFFFF'
      }}
    >
      <div style={{ position: 'relative', marginBottom: '30px' }}>
        {/* Pulsating Glow rings */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.6, 0, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            top: -20,
            left: -20,
            right: -20,
            bottom: -20,
            borderRadius: '50%',
            border: '2px solid var(--primary-color, #00E5FF)',
            filter: 'blur(4px)',
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            background: 'rgba(0, 229, 255, 0.1)',
            padding: '24px',
            borderRadius: '50%',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 30px rgba(0, 229, 255, 0.2)'
          }}
        >
          <FaHeartbeat style={{ fontSize: '3rem', color: 'var(--primary-color, #00E5FF)' }} />
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1rem',
          fontWeight: 600,
          letterSpacing: '0.05em',
          color: 'var(--muted-color, #94A3B8)',
          textAlign: 'center',
          padding: '0 20px',
        }}
      >
        {message}
      </motion.p>
    </div>
  );
};

export default Loader;
