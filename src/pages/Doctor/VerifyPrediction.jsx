import React, { useState, useEffect, useContext } from 'react';
import { FaHeartbeat, FaCheck, FaEdit } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { formatDate } from '../../utils/helper';

const INITIAL_PREDICTIONS = [
  {
    id: 'pred-301',
    patientName: 'John Doe',
    patientEmail: 'patient@system.com',
    organ: 'Kidney',
    score: 35,
    riskLevel: 'Low',
    color: '#28A745',
    message: 'Serum Creatinine: 1.1 mg/dL, eGFR: 92 mL/min. No immediate issues.',
    timestamp: '2026-07-18T10:00:00Z',
    verified: false,
    doctorNotes: ''
  },
  {
    id: 'pred-302',
    patientName: 'Alice Smith',
    patientEmail: 'recipient@system.com',
    organ: 'Kidney',
    score: 82,
    riskLevel: 'Critical',
    color: '#DC3545',
    message: 'Serum Creatinine: 3.8 mg/dL, eGFR: 18 mL/min. Highly abnormal metrics.',
    timestamp: '2026-07-16T12:00:00Z',
    verified: false,
    doctorNotes: ''
  }
];

export const VerifyPrediction = () => {
  const { currentUser } = useContext(AuthContext);
  const [predictions, setPredictions] = useState([]);
  const [activeVerify, setActiveVerify] = useState(null);
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('smart_organ_doctor_verifications');
    if (saved) {
      setPredictions(JSON.parse(saved));
    } else {
      localStorage.setItem('smart_organ_doctor_verifications', JSON.stringify(INITIAL_PREDICTIONS));
      setPredictions(INITIAL_PREDICTIONS);
    }
  }, []);

  const handleVerify = (predId) => {
    const updated = predictions.map(p => {
      if (p.id === predId) {
        return {
          ...p,
          verified: true,
          verifiedBy: currentUser.name,
          doctorNotes: notes || 'Biochemical metrics audited. Risk status confirmed.'
        };
      }
      return p;
    });

    localStorage.setItem('smart_organ_doctor_verifications', JSON.stringify(updated));
    setPredictions(updated);
    setActiveVerify(null);
    setNotes('');
    setSuccess('AI disease prediction report verified successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Verify AI Disease Predictions</h3>
          <p>Review raw lab telemetry diagnostics and verify risk scores with specialist advice.</p>
        </div>
      </div>

      {success && <div className="alert alert-success">{success}</div>}

      {activeVerify && (
        <div className="card" style={{ marginBottom: '24px', textAlign: 'left' }}>
          <h4>Approve Report for {activeVerify.patientName} ({activeVerify.organ})</h4>
          <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '16px' }}>
            Biochemical findings detail: "{activeVerify.message}" with failure risk of {activeVerify.score}%.
          </p>
          <div className="form-group">
            <label className="form-label">Clinical Consultant Remarks</label>
            <textarea 
              className="form-textarea" 
              rows="3" 
              placeholder="Enter specialist recommendations, diagnostic clearance, or treatment path..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-primary" onClick={() => handleVerify(activeVerify.id)}>
              <FaCheck /> Confirm Verification
            </button>
            <button className="btn btn-outline" onClick={() => setActiveVerify(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Organ Checked</th>
              <th>Risk Score</th>
              <th>Alert Level</th>
              <th>Clinical Details</th>
              <th>Date Checked</th>
              <th>Verification Status</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((p) => (
              <tr key={p.id}>
                <td style={{ fontWeight: '600' }}>{p.patientName}</td>
                <td>{p.organ}</td>
                <td style={{ fontWeight: '700', color: p.color }}>{p.score}%</td>
                <td>
                  <span className="badge" style={{ backgroundColor: `${p.color}20`, color: p.color }}>
                    {p.riskLevel}
                  </span>
                </td>
                <td style={{ fontSize: '0.82rem', maxWidth: '240px', opacity: 0.85 }}>{p.message}</td>
                <td>{formatDate(p.timestamp)}</td>
                <td>
                  {p.verified ? (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="badge badge-success" style={{ alignSelf: 'flex-start' }}>Verified</span>
                      <span style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '4px' }}>
                        By {p.verifiedBy}: "{p.doctorNotes}"
                      </span>
                    </div>
                  ) : (
                    <button 
                      className="btn btn-outline" 
                      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                      onClick={() => { setActiveVerify(p); setNotes(''); }}
                    >
                      <FaEdit /> Verify Report
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default VerifyPrediction;
