import React, { useState, useEffect, useContext } from 'react';
import { FaHeartbeat, FaSync } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { calculateCompatibility } from '../../utils/helper';

export const MatchStatus = () => {
  const { currentUser } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMatches();
  }, [currentUser]);

  const loadMatches = () => {
    setLoading(true);
    setTimeout(() => {
      const savedPledges = localStorage.getItem('smart_organ_donor_pledges');
      const savedRequests = localStorage.getItem('smart_organ_recipient_requests');
      
      if (savedRequests && savedPledges) {
        const requests = JSON.parse(savedRequests).filter(r => r.recipientEmail.toLowerCase() === currentUser.email.toLowerCase());
        const pledges = JSON.parse(savedPledges);

        const results = [];
        requests.forEach(req => {
          pledges.forEach(pledge => {
            if (pledge.organ.toLowerCase() === req.organ.toLowerCase()) {
              const score = calculateCompatibility(
                { bloodGroup: pledge.bloodGroup, email: pledge.donorEmail },
                { bloodGroup: req.bloodGroup, email: currentUser.email }
              );

              results.push({
                organ: req.organ,
                donorName: pledge.donorName,
                donorBlood: pledge.bloodGroup,
                donorEmail: pledge.donorEmail,
                compatScore: score,
                status: score >= 75 ? 'Waiting Hospital Confirmation' : 'Under immunological evaluation'
              });
            }
          });
        });

        results.sort((a, b) => b.compatScore - a.compatScore);
        setMatches(results);
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Live Compatibility Match Status</h3>
          <p>Real-time crossmatching notifications between your requests and active donor pledges.</p>
        </div>
        <button className="btn btn-outline" onClick={loadMatches} disabled={loading}>
          <FaSync /> {loading ? 'Running HLA checks...' : 'Check Matches'}
        </button>
      </div>

      <div className="table-responsive">
        {matches.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Requested Organ</th>
                <th>Compatible Donor</th>
                <th>Donor Blood Group</th>
                <th>Compatibility Score</th>
                <th>Match Quality</th>
                <th>Transplant Stage Status</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((m, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: '600' }}>{m.organ}</td>
                  <td style={{ fontWeight: '600' }}>{m.donorName}</td>
                  <td style={{ fontWeight: '700' }}>{m.donorBlood}</td>
                  <td style={{ fontWeight: '800', color: m.compatScore >= 60 ? 'var(--secondary-color)' : '#dc3545' }}>
                    {m.compatScore}%
                  </td>
                  <td>
                    <span className={`badge ${
                      m.compatScore >= 70 ? 'badge-success' : 
                      m.compatScore >= 45 ? 'badge-warning' : 'badge-danger'
                    }`}>
                      {m.compatScore >= 70 ? 'High Match' : m.compatScore >= 45 ? 'Moderate' : 'Low Match'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem', fontWeight: '500', opacity: 0.85 }}>
                    {m.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', opacity: 0.6 }}>
            <FaHeartbeat style={{ fontSize: '3rem', marginBottom: '10px' }} />
            <h4>No matches detected yet</h4>
            <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
              We are constantly checking the database for compatible tissue donors. Check back soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default MatchStatus;
