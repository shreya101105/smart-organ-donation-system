import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaIdCard, FaHeart, FaDna, FaPrint, FaQrcode, FaCheckCircle } from 'react-icons/fa';
import Card from '../../components/Cards/Card';
import Button from '../../components/Buttons/Button';
import Badge from '../../components/Feedback/Badge';

export const DigitalDonorCard = ({ donor = {} }) => {
  const [flipped, setFlipped] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h3>Digital Donor Card</h3>
          <p>Your secure encrypted digital organ donation pledge pass.</p>
        </div>
        <Button variant="outline" onClick={handlePrint} icon={FaPrint}>
          Print Pass
        </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', padding: '20px 0' }}>
        {/* Flipping Card Container */}
        <div 
          onClick={() => setFlipped(!flipped)}
          style={{
            perspective: '1000px',
            width: '100%',
            maxWidth: '430px',
            height: '260px',
            cursor: 'pointer',
          }}
        >
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* FRONT SIDE */}
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                background: 'linear-gradient(135deg, #09111F 0%, #151E2E 100%)',
                border: '1px solid var(--primary-color)',
                boxShadow: '0 0 25px rgba(0, 229, 255, 0.2)',
                borderRadius: '18px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ margin: 0, fontFamily: 'var(--font-heading)', letterSpacing: '2px', color: '#fff', fontSize: '1rem' }}>LIFELINK AI</h4>
                  <span style={{ fontSize: '0.62rem', color: 'var(--primary-color)', fontWeight: '700', letterSpacing: '1px' }}>CLINICAL DONOR PASS</span>
                </div>
                <FaHeart style={{ color: '#EF4444', fontSize: '1.6rem', filter: 'drop-shadow(0 0 6px #EF4444)' }} />
              </div>

              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '1.3rem', fontWeight: '800', color: '#fff', letterSpacing: '0.5px' }}>{donor.name}</h3>
                <div style={{ display: 'flex', gap: '20px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>
                  <div>
                    BLOOD: <strong style={{ color: 'var(--primary-color)' }}>{donor.bloodGroup || 'O+'}</strong>
                  </div>
                  <div>
                    ID: <strong>LLD-992384</strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
                <span style={{ fontSize: '0.65rem', color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <FaCheckCircle /> PLEDGE VERIFIED
                </span>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>Click to Flip & Scan</span>
              </div>
            </div>

            {/* BACK SIDE */}
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'linear-gradient(135deg, #151E2E 0%, #09111F 100%)',
                border: '1px solid var(--secondary-color)',
                boxShadow: '0 0 25px rgba(37, 99, 235, 0.2)',
                borderRadius: '18px',
                padding: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: '#fff'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '60%' }}>
                <div>
                  <h5 style={{ margin: '0 0 6px 0', fontSize: '0.78rem', color: 'var(--secondary-color)', letterSpacing: '0.5px' }}>PLEDGED ORGANS</h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {(donor.organsWillingToDonate || ['Kidney', 'Cornea']).map((org) => (
                      <Badge key={org} type="primary">{org}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', display: 'block' }}>BLOCKCHAIN SECURE HASH</span>
                  <code style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.6)', wordBreak: 'break-all' }}>0x7F22A1E...56B3A9B2</code>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ background: '#fff', padding: '8px', borderRadius: '8px', display: 'flex' }}>
                  <FaQrcode style={{ fontSize: '4.5rem', color: '#000' }} />
                </div>
                <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>SCAN TO CLEAR</span>
              </div>
            </div>
          </motion.div>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--muted-color)', textAlign: 'center', maxWidth: '400px' }}>
          This card is linked to your national Aadhaar and clinical HLA records. In emergency situations, hospitals can scan your QR code to verify consent immediately.
        </p>
      </div>
    </div>
  );
};

export default DigitalDonorCard;
