import React from 'react';
import { motion } from 'framer-motion';

export const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      badge: 'Account Setup',
      title: 'Register Role',
      desc: 'Sign up under your assigned portal: Patient, Donor, Recipient, Doctor, Hospital, or Laboratory.'
    },
    {
      number: '02',
      badge: 'Data Ingestion',
      title: 'Clinical Logs',
      desc: 'Laboratories upload pathology results while patients run AI disease risk diagnostics.'
    },
    {
      number: '03',
      badge: 'Matching Engine',
      title: 'Crossmatching',
      desc: 'Algorithms match donor organs based on HLA profiles, blood group matrices, and urgency scores.'
    },
    {
      number: '04',
      badge: 'Final Delivery',
      title: 'Transplant',
      desc: 'Verified clinical teams approve clearances and complete time-critical transplant surgeries.'
    }
  ];

  return (
    <section
      id="how-it-works"
      style={{
        padding: '100px 20px',
        backgroundColor: 'var(--bg-color)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '20px',
              background: 'rgba(0, 229, 255, 0.08)',
              border: '1px solid rgba(0, 229, 255, 0.2)',
              color: 'var(--primary-color)',
              fontSize: '0.8rem',
              fontWeight: '700',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}
          >
            Workflow Pipeline
          </motion.div>

          <h2 style={{ fontSize: '2.8rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text-color)', marginBottom: '16px' }}>
            How It Works
          </h2>

          <p style={{ fontSize: '1.1rem', color: 'var(--muted-color)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Four streamlined milestones coordinating organ allocation, health evaluation, and delivery.
          </p>
        </div>

        {/* Timeline Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '36px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div>
                {/* Number & Badge Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--primary-color)', opacity: 0.9, fontFamily: 'var(--font-heading)' }}>
                    {step.number}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: 'var(--muted-color)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}>
                    {step.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-color)', marginBottom: '12px' }}>
                  {step.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--muted-color)', lineHeight: '1.6', margin: 0 }}>
                  {step.desc}
                </p>
              </div>

              {/* Progress Line */}
              <div style={{ marginTop: '30px', height: '2px', background: 'linear-gradient(90deg, var(--primary-color) 0%, transparent 100%)', opacity: 0.4 }} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;