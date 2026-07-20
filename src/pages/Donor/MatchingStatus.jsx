import React, { useState, useEffect, useContext } from 'react';
import { FaSync, FaHeart } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { calculateCompatibility } from '../../utils/helper';

export const MatchingStatus = () => {
  const { currentUser } = useContext(AuthContext);
  const [recipients, setRecipients] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMatches();
  }, [currentUser]);

  const loadMatches = () => {
    setLoading(true);
    setTimeout(() => {
      const savedUsers = localStorage.getItem('smart_organ_users');
      const savedPledges = localStorage.getItem('smart_organ_donor_pledges');
      
      if (savedUsers) {
        const users = JSON.parse(savedUsers);
        // Find all recipients
        const recList = users.filter(u => u.role === 'Recipient');
        
        let activePledges = [];
        if (savedPledges) {
          activePledges = JSON.parse(savedPledges).filter(p => p.donorEmail.toLowerCase() === currentUser.email.toLowerCase());
        }

        // Generate match profiles
        const results = [];
        activePledges.forEach(pledge => {
          recList.forEach(rec => {
            // Recipient must require this specific organ
            if (rec.requiredOrgan.toLowerCase() === pledge.organ.toLowerCase()) {
              const score = calculateCompatibility(
                { bloodGroup: pledge.bloodGroup, email: currentUser.email },
                { bloodGroup: rec.bloodGroup, email: rec.email }
              );
              
              results.push({
                pledgeId: pledge.id,
                organ: pledge.organ,
                recName: rec.name,
                recEmail: rec.email,
                recBlood: rec.bloodGroup,
                recDisease: rec.disease,
                compatScore: score
              });
            }
          });
        });
        
        // Sort matches by compatibility score descending
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
          <h3>Automated Match Status</h3>
          <p>Real-time compatibility queries between your active pledges and recipients on the waiting list.</p>
        </div>
        <button className="btn btn-outline" onClick={loadMatches} disabled={loading}>
          <FaSync /> {loading ? 'Running HLA match...' : 'Refresh Matches'}
        </button>
      </div>

      <div className="table-responsive">
        {matches.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>My Pledged Organ</th>
                <th>Compatible Recipient</th>
                <th>Recipient Blood</th>
                <th>Diagnosis / Primary Condition</th>
                <th>Compatibility Score</th>
                <th>Match Quality</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((m, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: '600' }}>{m.organ} (Code: {m.pledgeId})</td>
                  <td style={{ fontWeight: '600' }}>{m.recName}</td>
                  <td style={{ fontWeight: '700' }}>{m.recBlood}</td>
                  <td style={{ fontSize: '0.85rem', opacity: 0.85 }}>{m.recDisease}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', opacity: 0.6 }}>
            <FaHeart style={{ fontSize: '3rem', marginBottom: '10px', color: 'var(--primary-color)' }} />
            <h4>No recipient matches detected</h4>
            <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
              We are currently querying recipients on the waiting list for compatibility with your pledges.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default MatchingStatus;
