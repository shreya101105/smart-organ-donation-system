import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaIdCard, FaDna, FaHospitalSymbol } from 'react-icons/fa';

export const Services = () => {
  const services = [
    {
      icon: <FaHeartbeat />,
      title: 'Organ Stress Profiling',
      desc: 'Enables patients to query blood diagnostic telemetry and simulate clinical health risk scores.'
    },
    {
      icon: <FaIdCard />,
      title: 'Pledge Card Generation',
      desc: 'Register as an organ donor, sign legal consent declarations, and receive your digital donor badge.'
    },
    {
      icon: <FaDna />,
      title: 'Virtual Tissue Crossmatching',
      desc: 'Evaluates compatibility matrices between waiting recipients and active donors based on tissue markers.'
    },
    {
      icon: <FaHospitalSymbol />,
      title: 'Transplant Pipeline Coordinator',
      desc: 'Streamlines approval pipelines, hospital inventory updates, and surgeon confirmations.'
    }
  ];

  return (
    <section className="home-section" id="services">
      <div className="container">
        <div className="section-header">
          <h2>Core Services</h2>
          <p>We provide professional solutions to simplify donor matching and diagnostic tracking.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
          {services.map((s, index) => (
            <motion.div 
              key={index}
              className="card service-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p style={{ marginTop: '10px', fontSize: '0.9rem', opacity: 0.85 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Services;
