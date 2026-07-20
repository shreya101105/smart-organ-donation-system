import React, { useEffect, useState } from 'react';
import { FaUserInjured } from 'react-icons/fa';

export const RecipientList = () => {
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('smart_organ_users');
    if (saved) {
      const parsed = JSON.parse(saved);
      const filtered = parsed.filter(u => u.role === 'Recipient');
      setRecipients(filtered);
    }
  }, []);

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Wait-listed Organ Recipients</h3>
          <p>Review diagnosis descriptions, transplant urgencies, and doctor approvals for recipients.</p>
        </div>
      </div>

      <div className="table-responsive">
        {recipients.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Recipient Name</th>
                <th>Required Organ</th>
                <th>Urgency Rating</th>
                <th>Blood Group</th>
                <th>Diagnosis Details</th>
                <th>Emergency Contact</th>
              </tr>
            </thead>
            <tbody>
              {recipients.map((r) => (
                <tr key={r.email}>
                  <td style={{ fontWeight: '600' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FaUserInjured style={{ color: 'var(--primary-color)' }} /> {r.name}
                    </span>
                  </td>
                  <td style={{ fontWeight: '600' }}>{r.requiredOrgan}</td>
                  <td>
                    <span className={`badge ${
                      r.urgency === 'Critical' ? 'badge-danger' : 
                      r.urgency === 'High' ? 'badge-warning' : 'badge-success'
                    }`}>
                      {r.urgency}
                    </span>
                  </td>
                  <td style={{ fontWeight: '700' }}>{r.bloodGroup}</td>
                  <td style={{ fontSize: '0.85rem', opacity: 0.85, maxWidth: '240px' }}>
                    {r.disease || 'Primary organ failure'}
                  </td>
                  <td style={{ fontSize: '0.82rem', opacity: 0.85 }}>{r.emergencyContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', opacity: 0.6 }}>
            <FaUserInjured style={{ fontSize: '3rem', marginBottom: '10px' }} />
            <h4>No wait-listed recipients</h4>
            <p style={{ fontSize: '0.85rem' }}>No recipient profiles are active in the system.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default RecipientList;
