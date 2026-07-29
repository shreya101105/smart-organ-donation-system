import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaMicrochip, FaDna, FaUserShield, FaHospitalAlt, FaRegHandshake } from 'react-icons/fa';
import Card from '../../components/Cards/Card';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

// Corrected relative import paths (../../ reaches src/)
import bgiImage from '../../components/images/bgi.png';
import bgvImage from '../../components/images/bgv.png';

export const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 200 } }
  };

  return (
    <div className="about-page">
      <Navbar />

      {/* Floating lights background blobs */}
      <div className="floating-blob blob-primary" />
      <div className="floating-blob blob-secondary" />

      {/* Hero Section */}
      <div style={{ padding: '160px 20px 80px 20px', textAlign: 'center', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0, 229, 255, 0.1)',
              color: 'var(--primary-color)',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: '700',
              marginBottom: '24px',
              border: '1px solid rgba(0, 229, 255, 0.2)'
            }}
          >
            <FaHeartbeat /> ABOUT OUR PLATFORM
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '20px', color: 'var(--text-color)', lineHeight: '1.2' }}
          >
            Redefining Organ Matching with <span style={{ background: 'linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Intelligent Clinical AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ fontSize: '1.15rem', color: 'var(--muted-color)', lineHeight: '1.7' }}
          >
            LifeLink AI is a futuristic decentralized medical environment built to accelerate organ disease detection, HLA tissue typing, compatibility crossmatching, and legal transplant approvals in real-time.
          </motion.p>
        </div>
      </div>

      {/* Pillars Section */}
      <div style={{ padding: '40px 20px 100px 20px' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            className="grid-3"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={itemVariants}>
              <Card glow style={{ padding: '36px', height: '100%' }}>
                <div style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '20px' }}><FaMicrochip /></div>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '12px' }}>Intelligent AI Predictors</h3>
                <p style={{ color: 'var(--muted-color)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                  Our highly trained deep learning algorithms analyze patient serum creatinine, GFR, bilirubin, and heart profiles to predict and flag organ failures before they progress.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card glow style={{ padding: '36px', height: '100%' }}>
                <div style={{ fontSize: '2.5rem', color: '#00FFD1', marginBottom: '20px' }}><FaDna /></div>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '12px' }}>Precision HLA Matching</h3>
                <p style={{ color: 'var(--muted-color)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                  We automate complex clinical calculations like HLA tissue matching, virtual crossmatching, and donor-recipient compatibility arrays to ensure optimal graft survival rates.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card glow style={{ padding: '36px', height: '100%' }}>
                <div style={{ fontSize: '2.5rem', color: '#4F8CFF', marginBottom: '20px' }}><FaUserShield /></div>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '12px' }}>Role-Based Gateways</h3>
                <p style={{ color: 'var(--muted-color)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                  A unified portal connecting Patients, Donors, Recipients, Doctors, Hospitals, and Labs. Every action is secure, transparent, validated, and logged to prevent legal errors.
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Platform Vision Section */}
      <div style={{ background: 'rgba(255, 255, 255, 0.01)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '80px 20px' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '20px' }}>Clinical Ecosystem & Integrity</h2>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '16px' }}>
              LifeLink AI matches organ donations by factoring in precise physiological properties, age weight coefficients, geographical distance metrics, and transplant urgency markers.
            </p>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7' }}>
              We collaborate with hospitals, transplant specialists, and pathlabs to provide a fast, secure, and regulatory-compliant bridge that saves thousands of lives daily.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ position: 'relative' }}
          >
            <div style={{
              background: 'radial-gradient(circle, rgba(0, 229, 255, 0.05) 0%, transparent 70%)',
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              zIndex: -1
            }} />
            <div className="glass-card" style={{ padding: '40px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
                <div style={{ fontSize: '1.6rem', color: 'var(--primary-color)', marginTop: '4px' }}><FaHospitalAlt /></div>
                <div>
                  <h4 style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-color)', marginBottom: '6px' }}>Verified Medical Network</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted-color)' }}>Affiliated with top-tier national laboratories and multispecialty healthcare systems.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ fontSize: '1.6rem', color: '#00FFD1', marginTop: '4px' }}><FaRegHandshake /></div>
                <div>
                  <h4 style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-color)', marginBottom: '6px' }}>Legal & Consent Controls</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted-color)' }}>Full donor consent logs, digital signature records, and authority clearance checklists.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />

      {/* Embedded CSS styles for dynamic light/dark background switching */}
      <style>{`
        .about-page {
          background-color: var(--bg-color);
          background-image: var(--homepage-bg-image, url(${bgiImage}));
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          transition: background-image 0.4s ease-in-out, background-color 0.4s ease-in-out;
        }

        .dark-mode .about-page {
          background-image: var(--homepage-bg-image, url(${bgvImage}));
        }

        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default About;