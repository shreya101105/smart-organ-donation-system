import React, { useEffect, useState, useContext } from 'react';
import { FaFileMedical, FaDownload } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { formatDate } from '../../utils/helper';
import Card from '../../components/Cards/Card';
import Table from '../../components/Table/Table';

const MOCK_RECORDS = [
  {
    id: 'rep-r1',
    patientEmail: 'recipient@system.com',
    labName: 'Metro Diagnostics & Pathlabs',
    testName: 'HLA Tissue Typing & HLA Antibody Screen',
    fileName: 'hla_screen_recipient.pdf',
    date: '2026-07-16T11:00:00Z',
    status: 'Verified'
  },
  {
    id: 'rep-r2',
    patientEmail: 'recipient@system.com',
    labName: 'Metro Diagnostics & Pathlabs',
    testName: 'PRA (Panel Reactive Antibody) Assay & Virtual Crossmatch',
    fileName: 'pra_virtual_crossmatch.pdf',
    date: '2026-07-11T13:45:00Z',
    status: 'Verified'
  }
];

export const Reports = () => {
  const { currentUser } = useContext(AuthContext);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('smart_organ_lab_reports');
    if (saved) {
      const parsed = JSON.parse(saved);
      const filtered = parsed.filter(r => r.patientEmail.toLowerCase() === currentUser.email.toLowerCase());
      setReports(filtered);
    } else {
      localStorage.setItem('smart_organ_lab_reports', JSON.stringify(MOCK_RECORDS));
      setReports(MOCK_RECORDS);
    }
  }, [currentUser]);

  const handleDownload = (fileName) => {
    alert(`[MOCK DOWNLOAD] Downloading report file: ${fileName}`);
  };

  const headers = ['Test / Panel Name', 'Diagnostic Lab', 'Upload Date', 'Uploaded File', 'Status', 'Action'];

  const rows = reports.map(rep => [
    rep.testName,
    rep.labName,
    formatDate(rep.date),
    rep.fileName,
    <span className="badge badge-success">{rep.status}</span>,
    <button 
      className="btn btn-outline" 
      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
      onClick={() => handleDownload(rep.fileName)}
    >
      <FaDownload /> Download
    </button>
  ]);

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Medical Diagnostics Reports</h3>
          <p>View verified blood work, tissue crossmatching, and HLA diagnostics uploaded by laboratories.</p>
        </div>
      </div>

      <Table 
        headers={headers}
        rows={rows}
        emptyMessage="No clinical reports uploaded yet."
      />
    </div>
  );
};

export default Reports;
