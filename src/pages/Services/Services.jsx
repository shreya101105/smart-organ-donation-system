import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Cards/Card';
import Button from '../../components/Buttons/Button';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

// Background image imports
import bgiImage from '../../components/images/bgi.png';
import bgvImage from '../../components/images/bgv.png';

export const Services = () => {
  const navigate = useNavigate();

  // 6 Core Workflow Services using simple text icons
  const servicesList = [
    {
      badge: 'AI Diagnostic',
      title: 'AI Organ Failure Predictor',
      desc: 'Predicts organ failure risks for Kidney, Liver, Heart, and Lungs using patient bio-markers like creatinine and eGFR.',
      color: 'var(--primary-color)',
      action: () => navigate('/login?role=Patient'),
      btnLabel: 'Patient Portal'
    },
    {
      badge: 'Waitlist Queue',
      title: 'Recipient Urgency Queue',
      desc: 'Calculates real-time waitlist priorities and organ compatibility scores based on severity metrics.',
      color: '#00D4FF',
      action: () => navigate('/login?role=Recipient'),
      btnLabel: 'Recipient Gate'
    },
    {
      badge: 'Donor Registry',
      title: 'Donor Registry & Digital Cards',
      desc: 'Encrypted donor registration and digital donor card generation with blood group and pledge details.',
      color: '#4F8CFF',
      action: () => navigate('/login?role=Donor'),
      btnLabel: 'Donor Gate'
    },
    {
      badge: 'Clinical Verification',
      title: 'Doctor Verification Desk',
      desc: 'Clinical dashboard for medical specialists to review AI predictions and grant transplant clearances.',
      color: '#6EE7FF',
      action: () => navigate('/login?role=Doctor'),
      btnLabel: 'Specialist Gate'
    },
    {
      badge: 'Cold Storage',
      title: 'Hospital Logistics & Ischemic Timer',
      desc: 'Monitors available matched organs, cold ischemic storage timers, and operating room schedules.',
      color: '#A855F7',
      action: () => navigate('/login?role=Hospital'),
      btnLabel: 'Hospital Portal'
    },
    {
      badge: 'Pathology Desk',
      title: 'Laboratory HLA Crossmatching',
      desc: 'Allows diagnostic pathlabs to upload HLA typing assays and metabolic test files directly to patient profiles.',
      color: '#F43F5E',
      action: () => navigate('/login?role=Laboratory'),
      btnLabel: 'Laboratory Desk'
    }
  ];

  return (
    <div className="services-page">
      <Navbar />

      <div className="floating-blob blob-primary" style={{ top: '20%', right: '10%' }} />
      <div className="floating-blob blob-secondary" style={{ bottom: '20%', left: '10%' }} />

      {/* Header */}
      <div style={{ padding: '160px 20px 60px 20px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
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
            SERVICES & CAPABILITIES
          </motion.div>

          <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '20px', color: 'var(--text-color)' }}>
            Ecosystem Services & <span style={{ background: 'linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Transplant Gates</span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--muted-color)', lineHeight: '1.7' }}>
            NovaLife AI coordinates organ donor registries, pathlab testing, failure diagnostic predictions, and hospital delivery logistics.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div style={{ padding: '20px 20px 100px 20px' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {servicesList.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card
                  glow
                  style={{
                    padding: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    height: '100%'
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        color: service.color,
                        marginBottom: '20px'
                      }}
                    >
                      {service.badge}
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--text-color)', marginBottom: '12px' }}>
                      {service.title}
                    </h3>

                    <p style={{ fontSize: '0.9rem', color: 'var(--muted-color)', lineHeight: '1.6', marginBottom: '24px' }}>
                      {service.desc}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    onClick={service.action}
                    style={{ alignSelf: 'flex-start', fontSize: '0.85rem', width: '100%' }}
                  >
                    {service.btnLabel}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {/* Dynamic background switching & theme CSS styling */}
      <style>{`
        .services-page {
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

        .dark-mode .services-page {
          background-image: var(--homepage-bg-image, url(${bgvImage}));
        }
      `}</style>
    </div>
  );
};

export default Services;