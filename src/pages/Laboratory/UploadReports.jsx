import React, { useState, useEffect } from 'react';
import { FaCloudUploadAlt, FaCheck, FaVials } from 'react-icons/fa';

export const UploadReports = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patientEmail: '',
    testName: 'HLA Tissue Typing & Crossmatching',
    fileName: '',
    notes: ''
  });
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('smart_organ_users');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Get all patients
      const filtered = parsed.filter(u => u.role === 'Patient' || u.role === 'Recipient');
      setPatients(filtered);
      if (filtered.length > 0) {
        setFormData(prev => ({ ...prev, patientEmail: filtered[0].email }));
      }
    }
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, fileName: file.name });
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!formData.patientEmail || !formData.fileName) {
      alert('Please fill out all fields and select a file.');
      return;
    }

    const patientObj = patients.find(p => p.email.toLowerCase() === formData.patientEmail.toLowerCase());

    const newReport = {
      id: 'rep-' + Math.floor(100 + Math.random() * 900),
      patientEmail: formData.patientEmail,
      patientName: patientObj ? patientObj.name : 'Unknown Patient',
      labName: 'Metro Diagnostics & Pathlabs',
      testName: formData.testName,
      fileName: formData.fileName,
      date: new Date().toISOString(),
      status: 'Verified'
    };

    // Save to LocalStorage patient reports table
    const savedReports = localStorage.getItem('smart_organ_lab_reports') || '[]';
    const parsed = JSON.parse(savedReports);
    localStorage.setItem('smart_organ_lab_reports', JSON.stringify([newReport, ...parsed]));

    setSuccess(`Successfully uploaded diagnostic report for ${newReport.patientName}!`);
    setFormData(prev => ({ ...prev, fileName: '', notes: '' }));
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Upload Diagnostic Report</h3>
          <p>Assign diagnostic test reports, blood GFR details, and HLA tissue crossmatches directly to patient profile directories.</p>
        </div>
      </div>

      {success && <div className="alert alert-success">{success}</div>}

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
        <form onSubmit={handleUploadSubmit}>
          <div className="form-group">
            <label className="form-label">Select Patient Email Address *</label>
            <select 
              className="form-select" 
              value={formData.patientEmail} 
              onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
            >
              {patients.map(p => (
                <option key={p.email} value={p.email}>{p.name} ({p.email})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Diagnostics Panel Type *</label>
            <select 
              className="form-select" 
              value={formData.testName} 
              onChange={(e) => setFormData({ ...formData, testName: e.target.value })}
            >
              <option value="HLA Tissue Typing & Crossmatching">HLA Tissue Typing & Crossmatching</option>
              <option value="Creatinine & Renal Function Panel">Creatinine & Renal Function Panel</option>
              <option value="Hepatic Panel / AST ALT Serum">Hepatic Panel / AST ALT Serum</option>
              <option value="HLA Crossmatch Check">HLA Crossmatch Check</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Select Pathology PDF Report File *</label>
            <label className="file-upload-input">
              <FaCloudUploadAlt className="file-upload-icon" />
              <span style={{ fontSize: '0.88rem', display: 'block' }}>
                {formData.fileName ? formData.fileName : 'Choose PDF report file'}
              </span>
              <input 
                type="file" 
                accept=".pdf" 
                style={{ display: 'none' }} 
                onChange={handleFileUpload}
                required
              />
            </label>
          </div>

          <div className="form-group">
            <label className="form-label">Pathologist Remarks / Comments</label>
            <textarea 
              className="form-textarea" 
              rows="3" 
              placeholder="Enter lab findings summaries..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            <FaVials /> Upload Diagnostic File
          </button>
        </form>
      </div>
    </div>
  );
};
export default UploadReports;
