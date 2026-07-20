import React, { useState, useEffect, useContext } from 'react';
import { FaBell, FaTrash } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { formatDate } from '../../utils/helper';

const MOCK_NOTIFICATIONS = [
  {
    id: 'not-01',
    userEmail: 'patient@system.com',
    title: 'New Laboratory Report Uploaded',
    message: 'Metro Diagnostics uploaded your HLA Tissue Typing report. Open Medical Reports tab to review.',
    date: '2026-07-15T11:00:00Z',
    read: false
  },
  {
    id: 'not-02',
    userEmail: 'patient@system.com',
    title: 'Consultation Appointment Confirmed',
    message: 'Your appointment request with Dr. Robert Carter has been approved for July 25 at 10:00 AM.',
    date: '2026-07-12T09:45:00Z',
    read: true
  }
];

export const Notifications = () => {
  const { currentUser } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('smart_organ_notifications');
    if (saved) {
      const parsed = JSON.parse(saved);
      const filtered = parsed.filter(n => n.userEmail.toLowerCase() === currentUser.email.toLowerCase());
      setNotifications(filtered);
    } else {
      localStorage.setItem('smart_organ_notifications', JSON.stringify(MOCK_NOTIFICATIONS));
      setNotifications(MOCK_NOTIFICATIONS);
    }
  }, [currentUser]);

  const handleMarkAsRead = (id) => {
    const saved = localStorage.getItem('smart_organ_notifications') || '[]';
    const parsed = JSON.parse(saved);
    const updated = parsed.map(n => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem('smart_organ_notifications', JSON.stringify(updated));
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleDelete = (id) => {
    const saved = localStorage.getItem('smart_organ_notifications') || '[]';
    const parsed = JSON.parse(saved);
    const updated = parsed.filter(n => n.id !== id);
    localStorage.setItem('smart_organ_notifications', JSON.stringify(updated));
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>System Notifications</h3>
          <p>Read alerts regarding laboratory uploads, doctor clearances, and matching updates.</p>
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
            <h4>All caught up!</h4>
            <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
              No new alerts or system updates in your box.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Notifications;
