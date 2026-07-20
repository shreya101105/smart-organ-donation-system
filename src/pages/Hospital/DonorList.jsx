import React, { useEffect, useState } from 'react';
import { FaHandHoldingHeart } from 'react-icons/fa';

export const DonorList = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('smart_organ_users');
    if (saved) {
      const parsed = JSON.parse(saved);
      const filtered = parsed.filter(u => u.role === 'Donor');
      setDonors(filtered);
    }
  }, []);

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Registered Organ Donors</h3>
          <p>Verify consents, blood matches, and fitness clearances of active organ donors.</p>
        </div>
      </div>

      <div className="table-responsive">
        {donors.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Donor Name</th>
                <th>Email Address</th>
                <th>Phone</th>
                <th>Blood Group</th>
                <th>Medical History</th>
                <th>Emergency Contact</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((d) => (
                <tr key={d.email}>
                  <td style={{ fontWeight: '600' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FaHandHoldingHeart style={{ color: 'var(--secondary-color)' }} /> {d.name}
                    </span>
                  </td>
                  <td>{d.email}</td>
                  <td>{d.phone}</td>
                  <td style={{ fontWeight: '700' }}>{d.bloodGroup}</td>
                  <td style={{ fontSize: '0.85rem', opacity: 0.85 }}>{d.medicalHistory || 'Healthy / No issues'}</td>
                  <td style={{ fontSize: '0.82rem', opacity: 0.85 }}>{d.emergencyContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', opacity: 0.6 }}>
            <FaHandHoldingHeart style={{ fontSize: '3rem', marginBottom: '10px' }} />
            <h4>No donors registered</h4>
            <p style={{ fontSize: '0.85rem' }}>No donor profiles are active in the system.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default DonorList;
