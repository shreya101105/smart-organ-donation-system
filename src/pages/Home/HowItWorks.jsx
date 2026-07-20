import React from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaFileMedical, FaSyncAlt, FaHeart } from 'react-icons/fa';

export const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus />,
      title: '1. Register Role',
      desc: 'Sign up as a Patient, Donor, Recipient, Doctor, Hospital, or Laboratory.'
    },
    {
      icon: <FaFileMedical />,
      title: '2. Clinical Logs',
      desc: 'Laboratories upload pathology results and patients check disease prediction.'
    },
    {
      icon: <FaSyncAlt />,
      title: '3. Crossmatching',
      desc: 'Our algorithms match donor organs based on HLA profiles & blood types.'
    },
    {
      icon: <FaHeart />,
      title: '4. Transplant',
      desc: 'Verified hospitals and surgeons approve and complete transplant surgeries.'
    }
  ];

  return (
    <section className="home-section" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Four simple milestones that streamline the organ matching and health evaluation pipeline.</p>
        </div>

        <div className="how-steps">
          {steps.map((s, index) => (
            <motion.div 
              key={index}
              className="how-step"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="how-number flex-center">{index + 1}</div>
              <div style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '14px' }}>
                {s.icon}
              </div>
              <h4>{s.title}</h4>
              <p style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '8px', padding: '0 10px' }}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;
