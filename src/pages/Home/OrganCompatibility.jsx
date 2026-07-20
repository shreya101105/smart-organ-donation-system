import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaSearch } from 'react-icons/fa';
import { BLOOD_GROUPS } from '../../utils/constants';
import { calculateCompatibility } from '../../utils/helper';

export const OrganCompatibility = () => {
  const [donorBg, setDonorBg] = useState('O-');
  const [recipientBg, setRecipientBg] = useState('A+');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleCalculate = () => {
    // Generate a simulated score using our utility
    const result = calculateCompatibility(
      { bloodGroup: donorBg, email: 'donor@test.com' },
      { bloodGroup: recipientBg, email: 'recipient@test.com' }
    );
    setScore(result);
    setShowResult(true);
  };

  return (
    <section className="home-section" id="compatibility">
      <div className="container">
        <div className="section-header">
          <h2>Organ Compatibility Tool</h2>
          <p>Quickly check the compatibility likelihood between blood types and HLA antigens.</p>
        </div>

        <motion.div 
          className="compat-widget"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="compat-inputs">
            <div className="form-group">
              <label className="form-label">Donor Blood Group</label>
              <select 
                className="form-select"
                value={donorBg}
                onChange={(e) => { setDonorBg(e.target.value); setShowResult(false); }}
              >
                {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Recipient Blood Group</label>
              <select 
                className="form-select"
                value={recipientBg}
                onChange={(e) => { setRecipientBg(e.target.value); setShowResult(false); }}
              >
                {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>
          </div>

          <button className="btn btn-primary" onClick={handleCalculate} style={{ width: '100%' }}>
            <FaSearch /> Calculate Compatibility
          </button>

          {showResult && (
            <motion.div 
              className="compat-result"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.4 }}
            >
              <FaHeartbeat style={{ fontSize: '2.5rem', color: score > 50 ? 'var(--secondary-color)' : '#dc3545' }} />
              <h4>Immunological Compatibility Score</h4>
              <div className="compat-score">{score}%</div>
              <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                {score >= 70 
                  ? 'Strong Compatibility! Low risk of hyper-acute rejection.' 
                  : score >= 45 
                  ? 'Moderate Compatibility. Secondary immunosuppressant verification required.' 
                  : 'Critical immunological variance. HLA crossmatching strongly advised.'}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
export default OrganCompatibility;
