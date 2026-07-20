import React, { useState } from 'react';
import { FaBell, FaCheckCircle, FaExclamationTriangle, FaTrash } from 'react-icons/fa';
import Card from '../../components/Cards/Card';
import Button from '../../components/Buttons/Button';
import Badge from '../../components/Feedback/Badge';

export const Notifications = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 'alt-r1',
      title: 'Waitlist Registry Initialized',
      message: 'Your recipient application has been registered. You are placed in the national queue for Kidney transplants.',
      date: '2026-07-17T09:00:00Z',
      type: 'success',
      read: false
    },
    {
      id: 'alt-r2',
      title: 'HLA Typing Results Uploaded',
      message: 'Metro Diagnostics uploaded HLA tissue typing results to your profile. Virtual crossmatch can now be performed.',
      date: '2026-07-16T11:15:00Z',
      type: 'info',
      read: true
    },
    {
      id: 'alt-r3',
      title: 'Clinical Authorization Signed',
      message: 'Dr. Robert Carter uploaded recommendations clarifying critical kidney transplantation urgency.',
      date: '2026-07-11T14:00:00Z',
      type: 'success',
      read: true
    }
  ]);

  const markAllRead = () => {
    setAlerts(alerts.map(a => ({ ...a, read: true })));
  };

  const deleteAlert = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h3>System Notifications</h3>
          <p>Real-time updates regarding your waitlist index and diagnostic reports status.</p>
        </div>
        {alerts.some(a => !a.read) && (
          <Button variant="outline" onClick={markAllRead}>
            Mark All as Read
          </Button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <Card 
              key={alert.id}
              glow={!alert.read}
              style={{
                padding: '20px 24px',
                borderLeft: alert.read ? '1px solid var(--border-color)' : '3px solid var(--primary-color)',
                background: alert.read ? 'rgba(255,255,255,0.005)' : 'rgba(0, 229, 255, 0.02)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '20px'
              }}
            >
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ 
                  marginTop: '4px',
                  fontSize: '1.25rem', 
                  color: alert.type === 'success' ? '#10B981' : 'var(--primary-color)' 
                }}>
                  {alert.type === 'success' ? <FaCheckCircle /> : <FaBell />}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <h5 style={{ fontWeight: '700', fontSize: '0.98rem', color: 'var(--text-color)', margin: 0 }}>{alert.title}</h5>
                    {!alert.read && <Badge type="primary">New</Badge>}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--muted-color)', lineHeight: '1.5', marginBottom: '4px' }}>{alert.message}</p>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.35)' }}>
                    {new Date(alert.date).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => deleteAlert(alert.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--muted-color)',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                  borderRadius: '50%',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#EF4444';
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--muted-color)';
                  e.currentTarget.style.background = 'none';
                }}
              >
                <FaTrash />
              </button>
            </Card>
          ))
        ) : (
          <div style={{ padding: '60px', textAlign: 'center', opacity: 0.6 }}>
            <FaBell style={{ fontSize: '3rem', marginBottom: '10px' }} />
            <h4>All clear! No alerts</h4>
            <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>You do not have any new registry notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
