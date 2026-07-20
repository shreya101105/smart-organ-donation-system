import React, { useEffect, useState } from 'react';
import { FaHistory } from 'react-icons/fa';
import { formatDate } from '../../utils/helper';

const DEFAULT_HISTORY = [
  {
    id: 'TX-4521',
    organ: 'Kidney',
    donorName: 'Robert Stark',
    recName: 'Alice Smith',
    hospName: 'Apex Multispeciality Hospital',
    compatScore: 82,
    date: '2026-07-16T15:30:00Z',
    status: 'Completed'
  }
];

export const TransplantHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('smart_organ_transplants_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    } else {
      localStorage.setItem('smart_organ_transplants_history', JSON.stringify(DEFAULT_HISTORY));
      setHistory(DEFAULT_HISTORY);
    }
  }, []);

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Transplant Surgery Logs</h3>
          <p>Historical audit logs of successful transplant operations completed at this hospital facility.</p>
        </div>
      </div>

      <div className="table-responsive">
        {history.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Transplant Code</th>
                <th>Organ transplanted</th>
                <th>Pledged Donor</th>
                <th>Recipient Patient</th>
                <th>Coordinating Facility</th>
                <th>HLA Match Rating</th>
                <th>Surgery Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((tx) => (
                <tr key={tx.id}>
                  <td style={{ fontWeight: '700' }}>{tx.id}</td>
                  <td style={{ fontWeight: '600' }}>{tx.organ}</td>
                  <td>{tx.donorName}</td>
                  <td>{tx.recName}</td>
                  <td>{tx.hospName}</td>
                  <td style={{ fontWeight: '700', color: 'var(--secondary-color)' }}>{tx.compatScore}%</td>
                  <td>{formatDate(tx.date)}</td>
                  <td>
                    <span className="badge badge-success">{tx.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', opacity: 0.6 }}>
            <FaHistory style={{ fontSize: '3rem', marginBottom: '10px' }} />
            <h4>No surgery records logged</h4>
            <p style={{ fontSize: '0.85rem' }}>No surgeries have been verified or completed yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default TransplantHistory;
