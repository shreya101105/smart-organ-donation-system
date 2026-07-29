import React from 'react';
import { motion } from 'framer-motion';
import { FaLungs, FaProcedures, FaDiagnoses } from 'react-icons/fa';

export const Features = () => {
  const pipelineCards = [
    {
      title: 'Kidney Disease AI',
      icon: <FaDiagnoses />,
      desc: 'AI model for kidney disease prediction.',
      color: '#00E5FF'
    },
    {
      title: 'Liver Disease AI',
      icon: <FaProcedures />,
      desc: 'AI-based liver disease analysis.',
      color: '#0077FF'
    },
    {
      title: 'Heart Disease AI',
      icon: <FaLungs />,
      desc: 'Heart disease risk prediction.',
      color: '#7C3AED'
    }
  ];

  return (
    <section className="home-section" id="features" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">

        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto'
          }}
        >
          <h2 style={{ fontSize: '2.4rem', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '14px', textAlign: 'center', width: '100%' }}>
            Multi-Organ Intelligent Diagnostic Pipeline
          </h2>
          <p style={{ color: 'var(--muted-color)', maxWidth: '700px', margin: '0 auto', fontSize: '1.02rem', textAlign: 'center', width: '100%' }}>
            Three dedicated convolutional neural networks calibrated to pinpoint clinical indicators on radiographic scans.
          </p>
        </motion.div>

        {/* Features Grids */}
        <div className="why-grid" style={{ marginTop: '50px' }}>
          {pipelineCards.map((card, idx) => (
            <motion.div
              key={card.title}
              className="card glass-card"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                y: -8,
                borderColor: card.color,
                boxShadow: `0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px ${card.color}25`
              }}
              style={{ padding: '36px 30px', textAlign: 'left', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              <div
                className="feature-icon-wrapper"
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--radius-sm)',
                  background: `${card.color}15`,
                  color: card.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem'
                }}
              >
                {card.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '12px' }}>
                  {card.title}
                </h3>
                <p style={{ color: 'var(--muted-color)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        #features .section-header {
          text-align: center !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
        }

        #features .section-header h2,
        #features .section-header p {
          text-align: center !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
      `}</style>
    </section>
  );
};

export default Features;