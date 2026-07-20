import React, { useState, useContext, useEffect } from 'react';
import { FaHandHoldingHeart, FaCheck, FaInfoCircle } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { ORGANS } from '../../utils/constants';

export const DonateOrgan = () => {
  const { currentUser } = useContext(AuthContext);
  const [pledges, setPledges] = useState([]);
  const [organ, setOrgan] = useState('Kidney');
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('smart_organ_donor_pledges');
    if (saved) {
      setPledges(JSON.parse(saved));
    }
  }, []);

  const handlePledge = (e) => {
    e.preventDefault();
    if (!consent) {
      alert('You must sign the legal consent checkbox to pledge.');
      return;
    }

    const checkExists = pledges.some(p => p.organ === organ && p.donorEmail === currentUser.email);
    if (checkExists) {
      alert(`You have already pledged a ${organ}.`);
      return;
    }

    const newPledge = {
      id: 'plg-' + Math.floor(100 + Math.random() * 900),
      donorEmail: currentUser.email,
      donorName: currentUser.name,
      organ,
      bloodGroup: currentUser.bloodGroup || 'O+',
      date: new Date().toISOString(),
      status: 'Active Pledge'
    };

    const saved = localStorage.getItem('smart_organ_donor_pledges') || '[]';
    const parsed = JSON.parse(saved);
    const updated = [newPledge, ...parsed];
    localStorage.setItem('smart_organ_donor_pledges', JSON.stringify(updated));

    setPledges(updated);
    setConsent(false);
    setMessage(`Successfully pledged to donate your ${organ}!`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Donate Organ Pledge Desk</h3>
          <p>Submit legal declarations detailing organs you are willing to pledge.</p>
        </div>
      </div>

      {message && <div className="alert alert-success">{message}</div>}

      <div className="grid-2">
        <div className="card">
          <form onSubmit={handlePledge}>
            <div className="form-group">
              <label className="form-label">Select Organ to Pledge</label>
              <select 
                className="form-select" 
                value={organ} 
                onChange={(e) => setOrgan(e.target.value)}
              >
                {ORGANS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div className="form-group" style={{ margin: '20px 0' }}>
              <label style={{ display: 'flex', gap: '8px', fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left' }}>
                <input 
                  type="checkbox" 
                  checked={consent} 
                  onChange={(e) => setConsent(e.target.checked)} 
                  required
                />
                <span>
                  I legally declare that in the event of brain death or clinical eligibility, I volunteer my selected organ for emergency matching, and verify that the medical logs on my profile are true.
                </span>
              </label>
            </div>

            <button type="submit" className="btn btn-secondary" style={{ width: '100%' }}>
              <FaHandHoldingHeart /> Sign Organ Pledge
            </button>
          </form>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-color)' }}>
            <FaInfoCircle /> <strong>Pledge Guidelines</strong>
          </div>
          <p style={{ fontSize: '0.85rem', opacity: 0.85 }}>
            Donation pledges are voluntary. Details remain confidential and visible only to verified hospitals and surgeons during virtual tissue compatibility queries.
          </p>
          <ul style={{ fontSize: '0.82rem', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', opacity: 0.85 }}>
            <li>You can select and sign pledges for multiple organs.</li>
            <li>A certified medical coordinator will perform HLA validation tests when a match is found.</li>
            <li>Pledges can be cancelled or modified inside this dashboard at any time.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default DonateOrgan;
