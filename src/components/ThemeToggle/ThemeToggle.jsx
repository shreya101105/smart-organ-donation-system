import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../../context/ThemeContext';

export const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleDarkMode } = useContext(ThemeContext);
  const isDark = theme?.darkMode ?? false;

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={toggleDarkMode}
      className={`theme-toggle-btn ${className}`}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid var(--border-color, rgba(255, 255, 255, 0.12))',
        borderRadius: '50%',
        width: '42px',
        height: '42px',
        minWidth: '42px',
        minHeight: '42px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'var(--text-color, #ffffff)',
        position: 'relative',
        overflow: 'hidden',
        outline: 'none',
        padding: 0,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ y: 16, rotate: 45, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -16, rotate: -45, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          {isDark ? (
            <FaSun style={{ color: '#FFC107', fontSize: '1.2rem', filter: 'drop-shadow(0 0 4px rgba(255, 193, 7, 0.4))' }} />
          ) : (
            <FaMoon style={{ color: '#818CF8', fontSize: '1.15rem', filter: 'drop-shadow(0 0 4px rgba(129, 140, 248, 0.4))' }} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Style Injection for Hover & Mobile Screen Optimization */}
      <style>{`
        .theme-toggle-btn:hover {
          border-color: var(--primary-color, #00d4ff) !important;
          box-shadow: 0 0 12px rgba(0, 212, 255, 0.3) !important;
          background: rgba(255, 255, 255, 0.08) !important;
        }

        @media (max-width: 768px) {
          .theme-toggle-btn {
            width: 44px !important;
            height: 44px !important;
            min-width: 44px !important;
            min-height: 44px !important;
          }
        }
      `}</style>
    </motion.button>
  );
};

export default ThemeToggle;