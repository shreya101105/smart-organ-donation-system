import React, { useState, useContext, useEffect } from 'react';
import { FaFileMedical, FaCheck, FaInfoCircle } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { ORGANS } from '../../utils/constants';

export const ApplyOrgan = () => {
  const { currentUser } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [organ, setOrgan] = useState('Kidney');
  const [urgency, setUrgency] = useState('High');
  const [details, setDetails] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('smart_organ_recipient_requests');
    if (saved) {
      setRequests(JSON.parse(saved));
    }
  }, []);

  const handleRequest = (e) => {
    e.preventDefault();
    if (!details) return;

    const checkExists = requests.some(r => r.organ === organ && r.recipientEmail === currentUser.email);
    if (checkExists) {
      alert(`You have already filed a request for a ${organ}.`);
      return;
    }

    const newRequest = {
      id: 'req-' + Math.floor(100 + Math.random() * 900),
      recipientEmail: currentUser.email,
      recipientName: currentUser.name,
      bloodGroup: currentUser.bloodGroup || 'A-',
      organ,
      urgency,
      details,
      date: new Date().toISOString(),
      status: 'Pending Verification'
    };

    const saved = localStorage.getItem('smart_organ_recipient_requests') || '[]';
    const parsed = JSON.parse(saved);
    const updated = [newRequest, ...parsed];
    localStorage.setItem('smart_organ_recipient_requests', JSON.stringify(updated));

    setRequests(updated);
    setDetails('');
    setMessage(`Transplant request for ${organ} filed successfully!`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Apply for Organ Allocation</h3>
          <p>Submit a formal request to join the national organ transplantation waiting list.</p>
        </div>
      </div>

      {message && <div className="alert alert-success">{message}</div>}

      <div className="grid-2">
        <div className="card">
          <form onSubmit={handleRequest}>
            <div className="form-group">
              <label className="form-label">Required Transplant Organ</label>
              <select 
                className="form-select" 
                value={organ} 
                onChange={(e) => setOrgan(e.target.value)}
              >
                {ORGANS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Urgency Classification</label>
              <select 
                className="form-select" 
                value={urgency} 
                onChange={(e) => setUrgency(e.target.value)}
              >
                <option value="Critical">Critical (Immediate Transplant Needed)</option>
                <option value="High">High Urgency</option>
                <option value="Medium">Medium Urgency</option>
                <option value="Low">Low / Stable</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Clinical Indication Details</label>
              <textarea 
                className="form-textarea" 
                rows="4" 
                placeholder="Detail primary clinical diagnoses, recommendations from doctors, and surgery histories..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <FaFileMedical /> File Transplant Request
            </button>
          </form>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-color)' }}>
            <FaInfoCircle /> <strong>Submission Rules</strong>
          </div>
          <p style={{ fontSize: '0.85rem', opacity: 0.85 }}>
            To join the active queue, you must possess verified clinical pathology records uploaded by a certified Laboratory.
          </p>
          <ul style={{ fontSize: '0.82rem', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', opacity: 0.85 }}>
            <li>Requests are audited manually by affiliated transplant surgeons.</li>
            <li>Once verified, your profile joins the automated crossmatching checks.</li>
            <li>Patients can register emergency contacts to get match alerts instantly.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ApplyOrgan;
