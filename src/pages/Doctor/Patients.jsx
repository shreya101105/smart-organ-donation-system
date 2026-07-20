import React, { useEffect, useState } from 'react';
import { FaUserInjured, FaSearch } from 'react-icons/fa';

const DEFAULT_PATIENTS = [
  {
    id: 'pat-1',
    name: 'John Doe',
    email: 'patient@system.com',
    dob: '1995-05-15',
    bloodGroup: 'O+',
    disease: 'Mild Asthma, Kidney risk tracking',
    emergencyContact: 'Jane Doe (+91 9876543211)'
  },
  {
    id: 'pat-2',
    name: 'Alice Smith',
    email: 'recipient@system.com',
    dob: '1990-09-20',
    bloodGroup: 'A-',
    disease: 'End-Stage Renal Disease (ESRD)',
    emergencyContact: 'Bob Smith (+91 8765432100)'
  }
];

export const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('smart_organ_users');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Filter out patients and recipients
      const list = parsed.filter(u => u.role === 'Patient' || u.role === 'Recipient');
      setPatients(list);
    } else {
      setPatients(DEFAULT_PATIENTS);
    }
  }, []);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Patient Cases Registry</h3>
          <p>Review credentials, clinical charts, and history logs of registered patients.</p>
        </div>
        <div style={{ position: 'relative' }}>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search by name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '220px', paddingLeft: '14px' }}
          />
        </div>
      </div>

      <div className="table-responsive">
        {filteredPatients.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Role Identity</th>
                <th>Email Address</th>
                <th>Blood Group</th>
                <th>Medical History / Diagnosis</th>
                <th>Emergency Contact</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((p) => (
                <tr key={p.email}>
                  <td style={{ fontWeight: '600' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FaUserInjured /> {p.name}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${p.role === 'Recipient' ? 'badge-danger' : 'badge-success'}`}>
                      {p.role}
                    </span>
                  </td>
                  <td>{p.email}</td>
                  <td style={{ fontWeight: '700' }}>{p.bloodGroup}</td>
                  <td style={{ fontSize: '0.85rem', opacity: 0.85 }}>
                    {p.disease || p.medicalHistory || 'No disease record'}
                  </td>
                  <td style={{ fontSize: '0.82rem', opacity: 0.85 }}>{p.emergencyContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', opacity: 0.6 }}>
            <FaSearch style={{ fontSize: '3rem', marginBottom: '10px' }} />
            <h4>No patient matches found</h4>
            <p style={{ fontSize: '0.85rem' }}>Try adjusting your keywords in the search bar.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Patients;
