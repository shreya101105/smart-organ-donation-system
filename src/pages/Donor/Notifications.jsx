import React, { useState } from 'react';
import { FaBell, FaCheckCircle, FaExclamationTriangle, FaTrash } from 'react-icons/fa';
import Card from '../../components/Cards/Card';
import Button from '../../components/Buttons/Button';
import Badge from '../../components/Feedback/Badge';

export const Notifications = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 'alt-1',
      title: 'Organ Pledge Verified',
      message: 'Your consent form and digital organ donation pledge has been successfully signed by Dr. Robert Carter and registered.',
      date: '2026-07-18T10:00:00Z',
      type: 'success',
      read: false
    },
    {
      id: 'alt-2',
      title: 'HLA Tissue Mapping Update',
      message: 'Metro Diagnostics updated HLA tissue crossmatching protocols. Your donor markers are updated on the blockchain network.',
      date: '2026-07-16T14:30:00Z',
      type: 'info',
      read: true
    },
    {
      id: 'alt-3',
      title: 'Clinical Registry Verification',
      message: 'Apex Multispeciality Hospital requested donor clearance checklist verification. Action completed successfully.',
      date: '2026-07-12T09:15:00Z',
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
          <h3>System Alerts</h3>
          <p>Important clinical matching triggers, pledge signs, and system logs.</p>
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
            <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>You do not have any new donor registry alerts at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
