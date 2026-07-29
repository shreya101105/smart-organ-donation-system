import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaChevronDown, FaDna, FaHospitalAlt, FaRegHandshake } from 'react-icons/fa';
import Card from '../../components/Cards/Card';
import Badge from '../../components/Feedback/Badge';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

// Background image imports
import bgiImage from '../../components/images/bgi.png';
import bgvImage from '../../components/images/bgv.png';

export const Resources = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const compatibilityMatrix = [
    { bloodType: 'O-', canDonateTo: 'All Types (Universal Donor)', canReceiveFrom: 'O-' },
    { bloodType: 'O+', canDonateTo: 'O+, A+, B+, AB+', canReceiveFrom: 'O-, O+' },
    { bloodType: 'A-', canDonateTo: 'A-, A+, AB-, AB+', canReceiveFrom: 'O-, A-' },
    { bloodType: 'A+', canDonateTo: 'A+, AB+', canReceiveFrom: 'O-, O+, A-, A+' },
    { bloodType: 'B-', canDonateTo: 'B-, B+, AB-, AB+', canReceiveFrom: 'O-, B-' },
    { bloodType: 'B+', canDonateTo: 'B+, AB+', canReceiveFrom: 'O-, O+, B-, B+' },
    { bloodType: 'AB-', canDonateTo: 'AB-, AB+', canReceiveFrom: 'O-, A-, B-, AB-' },
    { bloodType: 'AB+', canDonateTo: 'AB+ (Universal Recipient)', canReceiveFrom: 'All Types' }
  ];

  const regulations = [
    {
      title: 'Transplantation of Human Organs Act (THOA)',
      desc: 'The primary legislative framework regulating the removal, storage, and transplantation of human organs for therapeutic purposes. It strictly prohibits commercial dealings in human organs.'
    },
    {
      title: 'HLA Crossmatching Standards',
      desc: 'Clinical protocols requiring pre-transplant crossmatching. The laboratory must run serum assays to rule out pre-existing anti-HLA antibodies which might cause hyperacute rejection.'
    },
    {
      title: 'Brain Death Declaration Committee',
      desc: 'Deceased organ donation requires validation by an authorized medical board of four doctors, running two apnea tests 6 hours apart under local jurisdiction norms.'
    }
  ];

  return (
    <div className="resources-page">
      <Navbar />

      <div className="floating-blob blob-primary" style={{ top: '15%', left: '15%' }} />
      <div className="floating-blob blob-secondary" style={{ bottom: '25%', right: '15%' }} />

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
            <FaBook /> CLINICAL EDUCATION NODE
          </motion.div>
          <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text-color)', marginBottom: '20px' }}>
            Transplant Guides & <span style={{ background: 'linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Compatibility Rules</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--muted-color)', lineHeight: '1.7' }}>
            Access verified details on immunological parameters, blood group match matrices, and legislative criteria governing organ donations.
          </p>
        </div>
      </div>

      <div style={{ padding: '20px 20px 100px 20px' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.6fr 1.4fr', gap: '50px' }}>
          {/* Blood Compatibility matrix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card glow style={{ padding: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ fontSize: '1.8rem', color: 'var(--primary-color)', display: 'flex' }}><FaDna /></div>
                <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>Blood Compatibility Matrix</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted-color)', marginBottom: '20px', lineHeight: '1.5' }}>
                Blood compatibility is the first critical gate in transplant evaluations. A mismatched blood group results in immediate vascular rejection.
              </p>

              <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1.5px solid var(--border-color)' }}>
                      <th style={{ padding: '14px 16px', fontWeight: '700', color: 'var(--text-color)' }}>Blood Type</th>
                      <th style={{ padding: '14px 16px', fontWeight: '700', color: 'var(--text-color)' }}>Compatible Donors To</th>
                      <th style={{ padding: '14px 16px', fontWeight: '700', color: 'var(--text-color)' }}>Compatible Receivers From</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compatibilityMatrix.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '12px 16px', fontWeight: '600' }}><Badge type={item.bloodType.includes('-') ? 'danger' : 'success'}>{item.bloodType}</Badge></td>
                        <td style={{ padding: '12px 16px', color: 'var(--text-color)' }}>{item.canDonateTo}</td>
                        <td style={{ padding: '12px 16px', color: 'var(--muted-color)' }}>{item.canReceiveFrom}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>

          {/* Legislative rules list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card glow style={{ padding: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ fontSize: '1.8rem', color: '#00FFD1', display: 'flex' }}><FaHospitalAlt /></div>
                  <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>Legal & Regulatory Framework</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {regulations.map((reg, index) => (
                    <div key={index} style={{ borderBottom: index < regulations.length - 1 ? '1px solid var(--border-color)' : 'none', paddingBottom: index < regulations.length - 1 ? '16px' : '0' }}>
                      <h5 style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-color)', marginBottom: '6px' }}>{reg.title}</h5>
                      <p style={{ fontSize: '0.85rem', color: 'var(--muted-color)', lineHeight: '1.5' }}>{reg.desc}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Accordion checklist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card glow style={{ padding: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ fontSize: '1.8rem', color: '#4F8CFF', display: 'flex' }}><FaRegHandshake /></div>
                  <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>Who is eligible to donate?</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { q: 'Living Donor Criteria', a: 'Must be between 18-65 years old, in sound mental and physical health, with compatible HLA and blood profiles, and acting out of voluntary consent.' },
                    { q: 'Deceased Donor Criteria', a: 'Requires certified declaration of brain-stem death by authorized clinical committees. Organs are retrieved while somatic circulation is maintained.' },
                    { q: 'Absolute Contraindications', a: 'Active untreated sepsis, disseminated systemic malignancy, active HIV infection (except HLA-matched studies), or chronic multi-organ failures.' }
                  ].map((item, idx) => (
                    <div key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
                      <button
                        onClick={() => toggleFAQ(idx)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          justify: 'space-between',
                          alignItems: 'center',
                          padding: '16px 20px',
                          background: 'rgba(255,255,255,0.01)',
                          border: 'none',
                          color: 'var(--text-color)',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <span>{item.q}</span>
                        <motion.span
                          animate={{ rotate: activeFAQ === idx ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ display: 'flex' }}
                        >
                          <FaChevronDown />
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {activeFAQ === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{
                              borderTop: '1px solid var(--border-color)',
                              background: 'rgba(255,255,255,0.005)',
                              padding: '16px 20px',
                              fontSize: '0.85rem',
                              color: 'var(--muted-color)',
                              lineHeight: '1.5'
                            }}
                          >
                            {item.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Dynamic background switching & responsive styling */}
      <style>{`
        .resources-page {
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

        .dark-mode .resources-page {
          background-image: var(--homepage-bg-image, url(${bgvImage}));
        }

        @media (max-width: 992px) {
          div[style*="gridTemplateColumns: 1.6fr 1.4fr"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Resources;