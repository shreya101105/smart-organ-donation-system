import React, { useState, useEffect } from 'react';
import { FaCalendarCheck, FaCalendarAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { formatDate } from '../../utils/helper';

export const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('smart_organ_appointments');
    if (saved) {
      // For demo, list all appointments allocated for Dr. Carter
      const parsed = JSON.parse(saved);
      const filtered = parsed.filter(a => a.doctorName.toLowerCase().includes('carter'));
      setAppointments(filtered);
    }
  }, []);

  const handleStatusUpdate = (appId, newStatus) => {
    const saved = localStorage.getItem('smart_organ_appointments') || '[]';
    const parsed = JSON.parse(saved);
    const updated = parsed.map(a => a.id === appId ? { ...a, status: newStatus } : a);
    localStorage.setItem('smart_organ_appointments', JSON.stringify(updated));

    setAppointments(appointments.map(a => a.id === appId ? { ...a, status: newStatus } : a));
    setSuccess(`Appointment request successfully marked as ${newStatus}!`);
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>My Consultation Registry</h3>
          <p>Confirm, reject, or schedule patient consultations requested via portal.</p>
        </div>
      </div>

      {success && <div className="alert alert-success">{success}</div>}

      <div className="table-responsive">
        {appointments.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Requested Date</th>
                <th>Requested Time</th>
                <th>Reason / Notes</th>
                <th>Status</th>
                <th>Action Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((app) => (
                <tr key={app.id}>
                  <td style={{ fontWeight: '600' }}>{app.patientName}</td>
                  <td>{formatDate(app.date)}</td>
                  <td>{app.time}</td>
                  <td style={{ fontSize: '0.85rem', opacity: 0.85 }}>{app.reason}</td>
                  <td>
                    <span className={`badge ${
                      app.status === 'Confirmed' ? 'badge-success' : 
                      app.status === 'Rejected' ? 'badge-danger' : 'badge-warning'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td>
                    {app.status === 'Pending Approval' ? (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          className="btn btn-secondary" 
                          style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                          onClick={() => handleStatusUpdate(app.id, 'Confirmed')}
                        >
                          <FaCheck /> Confirm
                        </button>
                        <button 
                          className="btn btn-danger" 
                          style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                          onClick={() => handleStatusUpdate(app.id, 'Rejected')}
                        >
                          <FaTimes /> Reject
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>No actions pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', opacity: 0.6 }}>
            <FaCalendarAlt style={{ fontSize: '3rem', marginBottom: '10px' }} />
            <h4>No appointment requests found</h4>
            <p style={{ fontSize: '0.85rem' }}>Patients have not scheduled any appointments with you.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Appointments;
