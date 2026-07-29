import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLaptopMedical, FaSearch, FaShieldAlt } from 'react-icons/fa';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="container hero-grid">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginLeft: 'auto',
            paddingLeft: '50px',
            maxWidth: '90%'
          }}
        >
          <span style={{
            display: 'inline-block',
            padding: '6px 14px',
            background: 'rgba(0, 229, 255, 0.1)',
            border: '1px solid rgba(0, 229, 255, 0.25)',
            color: 'var(--primary-color)',
            borderRadius: '40px',
            fontSize: '0.85rem',
            fontWeight: '700',
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px'
          }}>
            NovaLife AI diagnostic gateway
          </span>
          <h1 style={{ marginBottom: '20px' }}>AI Powered Organ Disease Detection & Smart Organ Donation Platform</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.85, lineHeight: '1.7', marginBottom: '32px' }}>
            Leverage Artificial Intelligence to predict kidney, liver, and heart diseases, connect compatible donors with recipients, and support hospitals with efficient transplant coordination.
          </p>
          <div className="hero-buttons">
            <motion.button
              className="btn btn-primary"
              onClick={() => navigate('/login')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaLaptopMedical /> Access Portal
            </motion.button>
            <motion.button
              className="btn btn-secondary"
              onClick={() => navigate('/login?role=Hospital')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaSearch /> Emergency Organ Search
            </motion.button>
          </div>
        </motion.div>

        {/* Glowing Futuristic Diagnostic Core Orbital Graphic */}
        <motion.div
          className="hero-image-container"
          initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
        >
          <div className="diagnostic-core-outer">
            {/* Concentric rotating glowing orbits */}
            <div className="core-orbit outer-dashed"></div>
            <div className="core-orbit inner-glow"></div>

            {/* Center core info */}
            <div className="core-center-shield">
              <FaShieldAlt className="core-shield-icon" />
              <div className="core-brand-label">NovaLife AI</div>
              <div className="core-sub-label">DIAGNOSTIC CORE</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Embedded CSS for the interactive futuristic core graphic */}
      <style>{`
        .diagnostic-core-outer {
          position: relative;
          width: 360px;
          height: 360px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .core-orbit {
          position: absolute;
          border-radius: 50%;
          transition: all 0.5s ease;
        }

        .core-orbit.outer-dashed {
          width: 340px;
          height: 340px;
          border: 2px dashed rgba(0, 212, 255, 0.4);
          animation: spinClockwise 25s linear infinite;
        }

        .core-orbit.inner-glow {
          width: 290px;
          height: 290px;
          border: 1px solid rgba(0, 212, 255, 0.2);
          box-shadow: 0 0 30px rgba(0, 212, 255, 0.15),
                      inset 0 0 35px rgba(0, 212, 255, 0.1);
          animation: pulseGlow 4s ease-in-out infinite alternate;
        }

        .core-center-shield {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: rgba(17, 24, 39, 0.7);
          backdrop-filter: blur(14px);
          border: 2px solid var(--primary-color);
          box-shadow: 0 0 25px rgba(0, 212, 255, 0.25),
                      inset 0 0 20px rgba(0, 212, 255, 0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 5;
          text-align: center;
        }

        .core-shield-icon {
          font-size: 2.8rem;
          color: var(--primary-color);
          margin-bottom: 12px;
          filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.6));
          animation: iconFloat 3s ease-in-out infinite;
        }

        .core-brand-label {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-color);
          letter-spacing: 0.5px;
        }

        .core-sub-label {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--muted-color);
          letter-spacing: 1.5px;
          margin-top: 4px;
        }

        @keyframes spinClockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulseGlow {
          0% { transform: scale(1); box-shadow: 0 0 20px rgba(0, 212, 255, 0.1), inset 0 0 20px rgba(0, 212, 255, 0.05); }
          100% { transform: scale(1.03); box-shadow: 0 0 45px rgba(0, 212, 255, 0.3), inset 0 0 35px rgba(0, 212, 255, 0.15); }
        }

        @keyframes iconFloat {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .hero-content {
            padding-left: 0 !important;
            margin-left: 0 !important;
            max-width: 100% !important;
          }
          .diagnostic-core-outer {
            width: 280px;
            height: 280px;
          }
          .core-orbit.outer-dashed {
            width: 270px;
            height: 270px;
          }
          .core-orbit.inner-glow {
            width: 230px;
            height: 230px;
          }
          .core-center-shield {
            width: 160px;
            height: 160px;
          }
          .core-shield-icon {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;