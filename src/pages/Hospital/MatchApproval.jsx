import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaSyncAlt } from 'react-icons/fa';
import { calculateCompatibility } from '../../utils/helper';

export const MatchApproval = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    runCrossMatch();
  }, []);

  const runCrossMatch = () => {
    setLoading(true);
    setTimeout(() => {
      const savedUsers = localStorage.getItem('smart_organ_users');
      const savedPledges = localStorage.getItem('smart_organ_donor_pledges');

      if (savedUsers && savedPledges) {
        const users = JSON.parse(savedUsers);
        const pledges = JSON.parse(savedPledges).filter(p => p.status === 'Active Pledge');
        const recipients = users.filter(u => u.role === 'Recipient');

        const results = [];
        pledges.forEach(pledge => {
          recipients.forEach(rec => {
            if (rec.requiredOrgan.toLowerCase() === pledge.organ.toLowerCase()) {
              const score = calculateCompatibility(
                { bloodGroup: pledge.bloodGroup, email: pledge.donorEmail },
                { bloodGroup: rec.bloodGroup, email: rec.email }
              );

              // Only show compatible matches (e.g., above 45% matching likelihood)
              if (score >= 45) {
                results.push({
                  id: `match-${pledge.id}-${rec.email.split('@')[0]}`,
                  organ: pledge.organ,
                  donorName: pledge.donorName,
                  donorEmail: pledge.donorEmail,
                  donorBlood: pledge.bloodGroup,
                  recName: rec.name,
                  recEmail: rec.email,
                  recBlood: rec.bloodGroup,
                  compatScore: score
                });
              }
            }
          });
        });

        setMatches(results);
      }
      setLoading(false);
    }, 800);
  };

  const handleApproveTransplant = (match) => {
    if (!window.confirm(`Confirm clinical transplant surgery clearance for Recipient ${match.recName} with Donor ${match.donorName}?`)) {
      return;
    }

    // 1. Remove from active pledges/mark completed
    const savedPledges = localStorage.getItem('smart_organ_donor_pledges') || '[]';
    const pledges = JSON.parse(savedPledges).map(p => {
      if (p.donorEmail.toLowerCase() === match.donorEmail.toLowerCase() && p.organ.toLowerCase() === match.organ.toLowerCase()) {
        return { ...p, status: 'Transplanted Successfully' };
      }
      return p;
    });
    localStorage.setItem('smart_organ_donor_pledges', JSON.stringify(pledges));

    // 2. Add transplant log
    const savedHistory = localStorage.getItem('smart_organ_transplants_history') || '[]';
    const history = JSON.parse(savedHistory);
    const newRecord = {
      id: 'TX-' + Math.floor(1000 + Math.random() * 9000),
      organ: match.organ,
      donorName: match.donorName,
      recName: match.recName,
      hospName: 'Apex Multispeciality Hospital',
      compatScore: match.compatScore,
      date: new Date().toISOString(),
      status: 'Completed'
    };
    localStorage.setItem('smart_organ_transplants_history', JSON.stringify([newRecord, ...history]));

    // Update state
    setMatches(matches.filter(m => m.id !== match.id));
    setSuccess(`Transplant surgical clearance completed for case ${newRecord.id}!`);
    setTimeout(() => setSuccess(''), 3000);
  };

  const getMockHLADetail = (id) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash += id.charCodeAt(i);
    const matchCount = 4 + (hash % 3);
    const markers = `A*02:${hash % 90}, B*44:${hash % 80}, DRB1*04:${hash % 70}`;
    return {
      antigens: `${matchCount}/6 loci`,
      markers,
      ischemic: `${12 + (hash % 12)} Hrs Limit`,
      pra: `${hash % 15}% PRA`
    };
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Transplant Surgery Match Approval</h3>
          <p>Review tissue typing scores and approve operating clearances for compatible candidates.</p>
        </div>
        <button className="btn btn-outline" onClick={runCrossMatch} disabled={loading}>
          <FaSyncAlt /> {loading ? 'Auditing compatibility...' : 'Re-Run HLA Crossmatch'}
        </button>
      </div>

      {success && <div className="alert alert-success">{success}</div>}

      <div className="table-responsive">
        {matches.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Transplant Organ</th>
                <th>Pledged Donor (HLA Profiling)</th>
                <th>Waiting Recipient (HLA Profiling)</th>
                <th>HLA Match Score</th>
                <th>Compatibility Quality</th>
                <th>Surgery Authorization</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((m) => {
                const hla = getMockHLADetail(m.id);
                return (
                  <tr key={m.id}>
                    <td style={{ fontWeight: '600' }}>
                      {m.organ}
                      <span style={{ display: 'block', fontSize: '0.72rem', opacity: 0.6 }}>Max Cold Window: {hla.ischemic}</span>
                    </td>
                    <td>
                      <strong>{m.donorName}</strong> ({m.donorBlood})
                      <span style={{ display: 'block', fontSize: '0.75rem', opacity: 0.75, fontFamily: 'monospace', color: 'var(--primary-color)' }}>
                        HLA: {hla.markers}
                      </span>
                    </td>
                    <td>
                      <strong>{m.recName}</strong> ({m.recBlood})
                      <span style={{ display: 'block', fontSize: '0.75rem', opacity: 0.75, fontFamily: 'monospace', color: 'var(--secondary-color)' }}>
                        Cross-Match: {hla.antigens} ({hla.pra})
                      </span>
                    </td>
                    <td style={{ fontWeight: '800', color: m.compatScore >= 70 ? 'var(--secondary-color)' : '#e0a800' }}>
                      {m.compatScore}%
                    </td>
                    <td>
                      <span className={`badge ${m.compatScore >= 70 ? 'badge-success' : 'badge-warning'}`}>
                        {m.compatScore >= 70 ? 'High' : 'Moderate'}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                        onClick={() => handleApproveTransplant(m)}
                      >
                        Approve Surgery
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', opacity: 0.6 }}>
            <FaCheckCircle style={{ fontSize: '3rem', marginBottom: '10px' }} />
            <h4>All matches verified</h4>
            <p style={{ fontSize: '0.85rem' }}>No pending transplant approvals at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default MatchApproval;
