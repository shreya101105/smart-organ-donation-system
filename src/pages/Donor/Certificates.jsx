import React from 'react';
import { FaAward, FaPrint, FaDownload, FaRibbon } from 'react-icons/fa';
import Card from '../../components/Cards/Card';
import Button from '../../components/Buttons/Button';

export const Certificates = ({ donor = {} }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h3>Donation Certificates</h3>
          <p>Download or print your certificate of honor acknowledging your pledge to save lives.</p>
        </div>
        <Button variant="outline" onClick={handlePrint} icon={FaPrint}>
          Print Certificate
        </Button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
        <Card 
          glow 
          style={{ 
            width: '100%', 
            maxWidth: '680px', 
            background: 'var(--card-bg)',
            border: '2px solid var(--primary-color)',
            boxShadow: '0 0 35px rgba(0, 229, 255, 0.15)',
            borderRadius: '18px',
            padding: '50px',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          {/* Certificate Border accents */}
          <div style={{
            position: 'absolute',
            top: '15px',
            left: '15px',
            right: '15px',
            bottom: '15px',
            border: '1px dashed rgba(0, 229, 255, 0.3)',
            borderRadius: '12px',
            pointerEvents: 'none'
          }} />

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <div style={{ position: 'relative' }}>
              <FaAward style={{ fontSize: '4.5rem', color: 'var(--primary-color)', filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.4))' }} />
              <FaRibbon style={{ position: 'absolute', bottom: '-10px', right: '-10px', fontSize: '2rem', color: 'var(--secondary-color)' }} />
            </div>
          </div>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text-color)', fontSize: '2rem', letterSpacing: '2px', marginBottom: '10px' }}>
            CERTIFICATE OF APPRECIATION
          </h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted-color)', letterSpacing: '4px', textTransform: 'uppercase', display: 'block', marginBottom: '30px' }}>
            LIFELINK AI DIGITAL REGISTRY
          </span>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-color)', fontStyle: 'italic', marginBottom: '30px' }}>
            This document is proudly presented to
          </p>

          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '2.2rem', color: 'var(--primary-color)', marginBottom: '30px', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', display: 'inline-block', minWidth: '300px' }}>
            {donor.name}
          </h3>

          <p style={{ fontSize: '0.92rem', color: 'var(--muted-color)', lineHeight: '1.8', maxWidth: '500px', margin: '0 auto 40px auto' }}>
            in grateful recognition of their noble pledge to donate organs <strong>({(donor.organsWillingToDonate || ['Kidney']).join(', ')})</strong>, offering the gift of life and health to patients in end-stage failures. Registered on the secure national LifeLink nodes.
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 30px' }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-color)' }}>Dr. Sarah Connor</span>
              <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--muted-color)' }}>Director, LifeLink Clinical Board</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-color)' }}>{new Date().toLocaleDateString()}</span>
              <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--muted-color)' }}>Registration Date</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Certificates;
