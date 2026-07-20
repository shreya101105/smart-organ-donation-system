import React, { useState, useEffect } from 'react';
import { FaHistory, FaHeartbeat } from 'react-icons/fa';
import { formatDate } from '../../utils/helper';

export const PredictionHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('smart_organ_prediction_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your prediction logs?')) {
      localStorage.removeItem('smart_organ_prediction_history');
      setHistory([]);
    }
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Prediction History Logs</h3>
          <p>Logs of previous biochemical diagnostics checked on our portal.</p>
        </div>
        {history.length > 0 && (
          <button 
            className="btn btn-danger" 
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            onClick={handleClearHistory}
          >
            Clear History
          </button>
        )}
      </div>

      <div className="table-responsive">
        {history.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Analyzed Organ</th>
                <th>Diagnostic Date</th>
                <th>Stress Score</th>
                <th>Risk Classification</th>
                <th>Clinical Assessment Message</th>
              </tr>
            </thead>
            <tbody>
              {history.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontWeight: '600' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FaHeartbeat style={{ color: log.color }} /> {log.organ}
                    </span>
                  </td>
                  <td>{formatDate(log.timestamp)}</td>
                  <td style={{ fontWeight: '700', color: log.color }}>{log.score}%</td>
                  <td>
                    <span className="badge" style={{ backgroundColor: `${log.color}20`, color: log.color }}>
                      {log.riskLevel}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem', opacity: 0.85 }}>{log.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', opacity: 0.6 }}>
            <FaHistory style={{ fontSize: '3rem', marginBottom: '10px' }} />
            <h4>No prediction logs found</h4>
            <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
              Run an AI diagnostics evaluation to populate this logs registry.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default PredictionHistory;
