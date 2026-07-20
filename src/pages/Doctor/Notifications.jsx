import React, { useState, useEffect } from 'react';
import { FaBell, FaTrash } from 'react-icons/fa';
import { formatDate } from '../../utils/helper';

const MOCK_NOTIFICATIONS = [
  {
    id: 'doc-not-01',
    userEmail: 'doctor@system.com',
    title: 'New Patient Consultation Requested',
    message: 'John Doe scheduled an appointment for July 25 at 10:00 AM. Check Appointments tab.',
    date: '2026-07-18T10:05:00Z',
    read: false
  },
  {
    id: 'doc-not-02',
    userEmail: 'doctor@system.com',
    title: 'Patient Diagnostic Report Ready',
    message: 'HLA tissue typing for Alice Smith is ready and uploaded. Review findings.',
    date: '2026-07-16T15:00:00Z',
    read: true
  }
];

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('smart_organ_doctor_notifications');
    if (saved) {
      setNotifications(JSON.parse(saved));
    } else {
      localStorage.setItem('smart_organ_doctor_notifications', JSON.stringify(MOCK_NOTIFICATIONS));
      setNotifications(MOCK_NOTIFICATIONS);
    }
  }, []);

  const handleMarkAsRead = (id) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem('smart_organ_doctor_notifications', JSON.stringify(updated));
    setNotifications(updated);
  };

  const handleDelete = (id) => {
    const updated = notifications.filter(n => n.id !== id);
    localStorage.setItem('smart_organ_doctor_notifications', JSON.stringify(updated));
    setNotifications(updated);
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Clinical Alerts Feed</h3>
          <p>Read logs regarding pending patient queues, approvals, and matching notifications.</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div 
              key={n.id} 
              className="card" 
              style={{ 
                padding: '20px', 
                textAlign: 'left', 
                borderLeft: n.read ? '1px solid var(--border-color)' : '4px solid var(--primary-color)',
                backgroundColor: n.read ? 'var(--card-bg)' : 'rgba(0,123,255,0.02)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <h5 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '4px' }}>{n.title}</h5>
                <p style={{ fontSize: '0.88rem', opacity: 0.8, marginBottom: '6px' }}>{n.message}</p>
                <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>{formatDate(n.date)}</span>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {!n.read && (
                  <button 
                    className="btn btn-outline" 
                    style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                    onClick={() => handleMarkAsRead(n.id)}
                  >
                    Mark read
                  </button>
                )}
                <button 
                  className="btn btn-danger" 
                  style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center' }}
                  onClick={() => handleDelete(n.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', opacity: 0.6 }}>
            <FaBell style={{ fontSize: '3rem', marginBottom: '10px' }} />
            <h4>Clear log</h4>
            <p style={{ fontSize: '0.85rem' }}>No clinical notifications on file.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Notifications;
