import React from 'react';
import { motion } from 'framer-motion';
import { FaLaptopMedical, FaUserCheck, FaDna, FaBuilding, FaVials, FaBrain, FaFilePdf } from 'react-icons/fa';
import Card from '../../components/Cards/Card';
import Button from '../../components/Buttons/Button';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

export const Services = () => {
  const navigate = useNavigate();

  const servicesList = [
    {
      icon: FaBrain,
      title: 'AI Multi-Organ Disease Prediction',
      desc: 'Early warning scoring models for Kidney, Liver, Heart, Lung, Eye, and Brain. Input bio-markers (creatinine, bilirubin, glucose, eGFR) to assess organ failure risks.',
      color: 'var(--primary-color)',
      action: () => navigate('/login?role=Patient'),
      btnLabel: 'Run Diagnostic Simulator'
    },
    {
      icon: FaDna,
      title: 'Tissue Typing & Crossmatching',
      desc: 'Smart matching of Human Leukocyte Antigens (HLA-A, B, C, DRB1) between donor and recipient. Computes panel reactive antibodies (PRA) to decrease graft rejection risks.',
      color: '#00FFD1',
      action: () => navigate('/login?role=Laboratory'),
      btnLabel: 'Launch HLA typing Panel'
    },
    {
      icon: FaUserCheck,
      title: 'Organ Donor Registry & Digital Cards',
      desc: 'Secure digital consent records. Registered donors receive an encrypted digital donor card containing organ pledge identifiers and blood details.',
      color: '#4F8CFF',
      action: () => navigate('/login?role=Donor'),
      btnLabel: 'Access Donor Gate'
    },
    {
      icon: FaLaptopMedical,
      title: 'Doctor Diagnostic Verification Desk',
      desc: 'Authorized clinical dashboards for nephrologists, cardiologists, and hepatologists to check AI predictions, sign matching logs, and clear transplant cases.',
      color: '#6EE7FF',
      action: () => navigate('/login?role=Doctor'),
      btnLabel: 'Specialist Gate'
    },
    {
      icon: FaBuilding,
      title: 'Hospital Inventory & Organ Logistics',
      desc: 'Real-time monitoring of available matched organs (ischemic window clocks, shipping coordinates) and hospital transplantation waiting schedules.',
      color: '#A855F7',
      action: () => navigate('/login?role=Hospital'),
      btnLabel: 'Hospital Portal'
    },
    {
      icon: FaVials,
      title: 'Automated Lab Upload APIs',
      desc: 'Allows diagnostic laboratories to upload raw HLA crossmatch files, DNA assays, and metabolic panel PDFs directly to a patient’s profile.',
      color: '#F43F5E',
      action: () => navigate('/login?role=Laboratory'),
      btnLabel: 'Laboratory Desk'
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
            <FaLaptopMedical /> SERVICES & CAPABILITIES
          </motion.div>
          <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '20px', color: 'var(--text-color)' }}>
            Ecosystem Services & <span style={{ background: 'linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Transplant Gates</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--muted-color)', lineHeight: '1.7' }}>
            LifeLink AI coordinates organ donor registry, pathlab testing, failure diagnostic predictions, and hospital delivery logistics.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div style={{ padding: '20px 20px 100px 20px' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
            {servicesList.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Card 
                    glow 
                    style={{ 
                      padding: '30px', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'space-between',
                      height: '100%' 
                    }}
                  >
                    <div>
                      <div 
                        style={{ 
                          width: '60px', 
                          height: '60px', 
                          borderRadius: '14px', 
                          background: 'rgba(255,255,255,0.02)', 
                          border: `1px solid var(--border-color)`,
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          fontSize: '1.7rem',
                          color: service.color,
                          marginBottom: '24px',
                          boxShadow: `0 0 15px rgba(255,255,255,0.01)`
                        }}
                      >
                        <ServiceIcon />
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
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
