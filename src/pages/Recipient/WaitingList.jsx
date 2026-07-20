import React, { useState, useEffect, useContext } from 'react';
import { FaHourglassHalf, FaProcedures, FaTrash } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { formatDate } from '../../utils/helper';

export const WaitingList = () => {
  const { currentUser } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('smart_organ_recipient_requests');
    if (saved) {
      const parsed = JSON.parse(saved);
      const filtered = parsed.filter(r => r.recipientEmail.toLowerCase() === currentUser.email.toLowerCase());
      setRequests(filtered);
    } else {
      // Prepopulate an initial request for Alice Smith
      const mockReqs = [
        {
          id: 'req-601',
          recipientEmail: 'recipient@system.com',
          recipientName: 'Alice Smith',
          bloodGroup: 'A-',
          organ: 'Kidney',
          urgency: 'High',
          details: 'End-Stage Renal Disease (ESRD) diagnostics checked.',
          date: '2026-07-16T12:00:00Z',
          status: 'Verified & Active'
        }
      ];
      localStorage.setItem('smart_organ_recipient_requests', JSON.stringify(mockReqs));
      setRequests(mockReqs);
    }
  }, [currentUser]);

  const handleDeleteRequest = (reqId) => {
    if (window.confirm('Are you sure you want to cancel this transplant request?')) {
      const saved = localStorage.getItem('smart_organ_recipient_requests') || '[]';
      const parsed = JSON.parse(saved);
      const updated = parsed.filter(r => r.id !== reqId);
      localStorage.setItem('smart_organ_recipient_requests', JSON.stringify(updated));

      setRequests(requests.filter(r => r.id !== reqId));
    }
  };

  // Mock queue generator based on email hash
  const getQueuePosition = (id) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash += id.charCodeAt(i);
    }
    return (hash % 12) + 1; // Return position between 1 and 12
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>My Active Waiting List Positions</h3>
          <p>Monitor your active transplant requests and virtual queue allocations.</p>
        </div>
      </div>

      <div className="table-responsive">
        {requests.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Requested Organ</th>
                <th>Urgency Level</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Queue Position</th>
                <th>Action Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id}>
                  <td style={{ fontWeight: '700' }}>{r.id}</td>
                  <td style={{ fontWeight: '600' }}>{r.organ}</td>
                  <td>
                    <span className={`badge ${
                      r.urgency === 'Critical' ? 'badge-danger' : 
                      r.urgency === 'High' ? 'badge-warning' : 'badge-success'
                    }`}>
                      {r.urgency}
                    </span>
                  </td>
                  <td>{formatDate(r.date)}</td>
                  <td>
                    <span className="badge badge-success">{r.status}</span>
                  </td>
                  <td style={{ fontWeight: '700', color: 'var(--primary-color)' }}>
                    #{getQueuePosition(r.id)}
                  </td>
                  <td>
                    <button 
                      className="btn btn-danger" 
                      style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center' }}
                      onClick={() => handleDeleteRequest(r.id)}
                    >
                      <FaTrash /> Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', opacity: 0.6 }}>
            <FaHourglassHalf style={{ fontSize: '3rem', marginBottom: '10px' }} />
            <h4>No active transplant requests</h4>
            <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
              File a request using the Apply Organ tab to join the waiting list.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default WaitingList;
