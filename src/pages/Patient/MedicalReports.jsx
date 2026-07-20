import React, { useEffect, useState, useContext } from 'react';
import { FaFileMedical, FaDownload } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { formatDate } from '../../utils/helper';

const MOCK_REPORTS = [
  {
    id: 'rep-101',
    patientEmail: 'patient@system.com',
    labName: 'Metro Diagnostics & Pathlabs',
    testName: 'HLA Tissue Typing & Crossmatching',
    fileName: 'hla_crossmatch_report.pdf',
    date: '2026-07-15T10:30:00Z',
    status: 'Verified'
  },
  {
    id: 'rep-102',
    patientEmail: 'patient@system.com',
    labName: 'Metro Diagnostics & Pathlabs',
    testName: 'Creatinine & Renal Function Panel',
    fileName: 'renal_kidney_scan.pdf',
    date: '2026-07-10T14:15:00Z',
    status: 'Verified'
  }
];

export const MedicalReports = () => {
  const { currentUser } = useContext(AuthContext);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('smart_organ_lab_reports');
    if (saved) {
      const parsed = JSON.parse(saved);
      const filtered = parsed.filter(r => r.patientEmail.toLowerCase() === currentUser.email.toLowerCase());
      setReports(filtered);
    } else {
      localStorage.setItem('smart_organ_lab_reports', JSON.stringify(MOCK_REPORTS));
      setReports(MOCK_REPORTS);
    }
  }, [currentUser]);

  const handleDownload = (fileName) => {
    alert(`[MOCK DOWNLOAD] Downloading file: ${fileName}`);
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Medical Diagnostics Reports</h3>
          <p>View verified blood work, tissue crossmatching, and organ scans uploaded by pathlabs.</p>
        </div>
      </div>

      <div className="table-responsive">
        {reports.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Test / Panel Name</th>
                <th>Diagnostic Lab</th>
                <th>Upload Date</th>
                <th>Uploaded File</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((rep) => (
                <tr key={rep.id}>
                  <td style={{ fontWeight: '600' }}>{rep.testName}</td>
                  <td>{rep.labName}</td>
                  <td>{formatDate(rep.date)}</td>
                  <td style={{ color: 'var(--primary-color)', fontSize: '0.85rem' }}>{rep.fileName}</td>
                  <td>
                    <span className="badge badge-success">{rep.status}</span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-outline" 
                      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                      onClick={() => handleDownload(rep.fileName)}
                    >
                      <FaDownload /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', opacity: 0.6 }}>
            <FaFileMedical style={{ fontSize: '3rem', marginBottom: '10px' }} />
            <h4>No reports uploaded yet</h4>
            <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
              Your laboratory has not uploaded diagnostic results to your profile yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default MedicalReports;
