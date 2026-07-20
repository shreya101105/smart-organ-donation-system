import React, { useEffect, useState } from 'react';
import { FaUserAlt, FaSearch } from 'react-icons/fa';

export const PatientReports = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('smart_organ_users');
    if (saved) {
      const parsed = JSON.parse(saved);
      const filtered = parsed.filter(u => u.role === 'Patient' || u.role === 'Recipient');
      setPatients(filtered);
    }
  }, []);

  const filtered = patients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Registered Patients Index</h3>
          <p>Query registered patient files and verify details before creating lab entries.</p>
        </div>
        <div>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search email or name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '220px' }}
          />
        </div>
      </div>

      <div className="table-responsive">
        {filtered.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Role Gateway</th>
                <th>Email Address</th>
                <th>Phone No</th>
                <th>Blood Type</th>
                <th>Emergency Contacts</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.email}>
                  <td style={{ fontWeight: '600' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FaUserAlt /> {p.name}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${p.role === 'Recipient' ? 'badge-danger' : 'badge-success'}`}>
                      {p.role}
                    </span>
                  </td>
                  <td>{p.email}</td>
                  <td>{p.phone}</td>
                  <td style={{ fontWeight: '700' }}>{p.bloodGroup}</td>
                  <td style={{ fontSize: '0.85rem', opacity: 0.85 }}>{p.emergencyContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', opacity: 0.6 }}>
            <FaSearch style={{ fontSize: '3rem', marginBottom: '10px' }} />
            <h4>No patients matching query</h4>
            <p style={{ fontSize: '0.85rem' }}>Verify spelling or email address filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default PatientReports;
