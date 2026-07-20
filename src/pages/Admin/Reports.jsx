import React from 'react';
import { FaFileInvoice, FaDownload } from 'react-icons/fa';

const AUDIT_LOGS = [
  { id: 'LOG-7721', action: 'Transplant Surgery Cleared', details: 'Transplant TX-4521 cleared by surgeon & hospital nodes.', user: 'Apex Hospital', date: '2026-07-16 15:35' },
  { id: 'LOG-7720', action: 'HLA Report Verified', details: 'HLA Report for Alice Smith verified and signed.', user: 'Dr. Robert Carter', date: '2026-07-16 14:32' },
  { id: 'LOG-7719', action: 'Diagnostic Upload', details: 'HLA crossmatch files uploaded for Alice Smith.', user: 'Metro Diagnostics', date: '2026-07-15 10:32' },
  { id: 'LOG-7718', action: 'New Donor Pledged', details: 'Signed organ pledge submitted for Robert Stark.', user: 'Robert Stark', date: '2026-07-15 12:00' }
];

export const Reports = () => {
  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>System Audit Reports Ledger</h3>
          <p>Download or review transactional database action registries logged by system nodes.</p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Log Reference</th>
              <th>Action Triggered</th>
              <th>Action details</th>
              <th>Logged User Node</th>
              <th>Date / Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {AUDIT_LOGS.map((log) => (
              <tr key={log.id}>
                <td style={{ fontWeight: '700' }}>{log.id}</td>
                <td style={{ fontWeight: '600' }}>{log.action}</td>
                <td style={{ fontSize: '0.85rem', opacity: 0.85 }}>{log.details}</td>
                <td>{log.user}</td>
                <td>{log.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Reports;
