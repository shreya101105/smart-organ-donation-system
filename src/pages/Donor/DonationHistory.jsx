import React, { useState, useEffect, useContext } from 'react';
import { FaHistory, FaHandHoldingHeart, FaTrash } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { formatDate } from '../../utils/helper';

export const DonationHistory = () => {
  const { currentUser } = useContext(AuthContext);
  const [pledges, setPledges] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('smart_organ_donor_pledges');
    if (saved) {
      const parsed = JSON.parse(saved);
      const filtered = parsed.filter(p => p.donorEmail.toLowerCase() === currentUser.email.toLowerCase());
      setPledges(filtered);
    } else {
      // Prepopulate an initial pledge for the mock donor
      const mockPledges = [
        {
          id: 'plg-881',
          donorEmail: 'donor@system.com',
          donorName: 'Robert Stark',
          organ: 'Kidney',
          bloodGroup: 'O+',
          date: '2026-07-15T12:00:00Z',
          status: 'Active Pledge'
        },
        {
          id: 'plg-882',
          donorEmail: 'donor@system.com',
          donorName: 'Robert Stark',
          organ: 'Cornea',
          bloodGroup: 'O+',
          date: '2026-07-15T12:05:00Z',
          status: 'Active Pledge'
        }
      ];
      localStorage.setItem('smart_organ_donor_pledges', JSON.stringify(mockPledges));
      setPledges(mockPledges);
    }
  }, [currentUser]);

  const handleDeletePledge = (pledgeId) => {
    if (window.confirm('Are you sure you want to retract this organ pledge?')) {
      const saved = localStorage.getItem('smart_organ_donor_pledges') || '[]';
      const parsed = JSON.parse(saved);
      const updated = parsed.filter(p => p.id !== pledgeId);
      localStorage.setItem('smart_organ_donor_pledges', JSON.stringify(updated));

      setPledges(pledges.filter(p => p.id !== pledgeId));
    }
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Pledges Log History</h3>
          <p>Review active pledges and signed legal declarations submitted under your profile.</p>
        </div>
      </div>

      <div className="table-responsive">
        {pledges.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Pledge Code</th>
                <th>Organ Willing to Donate</th>
                <th>Donor Name</th>
                <th>Blood Type</th>
                <th>Pledge Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pledges.map((p) => (
                <tr key={p.id}>
                  <td style={{ fontWeight: '700' }}>{p.id}</td>
                  <td style={{ fontWeight: '600' }}>{p.organ}</td>
                  <td>{p.donorName}</td>
                  <td style={{ fontWeight: '700' }}>{p.bloodGroup}</td>
                  <td>{formatDate(p.date)}</td>
                  <td>
                    <span className="badge badge-success">{p.status}</span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-danger" 
                      style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center' }}
                      onClick={() => handleDeletePledge(p.id)}
                    >
                      <FaTrash /> Retract
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', opacity: 0.6 }}>
            <FaHistory style={{ fontSize: '3rem', marginBottom: '10px' }} />
            <h4>No active pledges found</h4>
            <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
              Pledge your organ to donate and generate cards.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default DonationHistory;
