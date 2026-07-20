import React, { useState, useEffect } from 'react';
import { FaFileMedical, FaPlus, FaCheck } from 'react-icons/fa';
import { formatDate } from '../../utils/helper';

const INITIAL_REPORTS = [
  {
    id: 'dr-rep-01',
    patientName: 'Alice Smith',
    patientEmail: 'recipient@system.com',
    organGroup: 'Kidney',
    findings: 'Patient exhibits stage 4 chronic renal disease. GFR indices drop below 20. Immediate transplant queue allocation recommended.',
    treatmentPlan: 'Scheduled transplant screening. Coordinate with Apex Hospital for donor matching.',
    date: '2026-07-16T14:30:00Z',
    signedBy: 'Dr. Robert Carter'
  }
];

export const Reports = () => {
  const [reports, setReports] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patient: '',
    organGroup: 'Kidney',
    findings: '',
    treatmentPlan: ''
  });
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('smart_organ_doctor_clinical_reports');
    if (saved) {
      setReports(JSON.parse(saved));
    } else {
      localStorage.setItem('smart_organ_doctor_clinical_reports', JSON.stringify(INITIAL_REPORTS));
      setReports(INITIAL_REPORTS);
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDraftReport = (e) => {
    e.preventDefault();
    if (!formData.patient || !formData.findings) return;

    const newReport = {
      id: 'dr-rep-' + Math.floor(1000 + Math.random() * 9000),
      patientName: formData.patient,
      patientEmail: formData.patient.toLowerCase().replace(' ', '') + '@system.com', // mock email
      organGroup: formData.organGroup,
      findings: formData.findings,
      treatmentPlan: formData.treatmentPlan || 'Routine diagnostics checkup.',
      date: new Date().toISOString(),
      signedBy: 'Dr. Robert Carter'
    };

    const saved = localStorage.getItem('smart_organ_doctor_clinical_reports') || '[]';
    const parsed = JSON.parse(saved);
    const updated = [newReport, ...parsed];
    localStorage.setItem('smart_organ_doctor_clinical_reports', JSON.stringify(updated));

    setReports([newReport, ...reports]);
    setShowForm(false);
    setFormData({ patient: '', organGroup: 'Kidney', findings: '', treatmentPlan: '' });
    setSuccess('Clinical findings report drafted and signed successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Clinical Findings & Reports</h3>
          <p>Draft and view clinical health status logs signed by your nephrologist dashboard.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <FaPlus /> {showForm ? 'View Reports List' : 'Draft New Report'}
        </button>
      </div>

      {success && <div className="alert alert-success">{success}</div>}

      {showForm ? (
        <div className="card">
          <h4 style={{ marginBottom: '20px' }}>Draft Patient Report</h4>
          <form onSubmit={handleDraftReport} className="form-grid">
            <div className="form-group">
              <label className="form-label">Patient Name *</label>
              <input 
                type="text" 
                name="patient" 
                className="form-input" 
                placeholder="e.g. John Doe"
                value={formData.patient} 
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Organ Group Under Review</label>
              <select 
                name="organGroup" 
                className="form-select" 
                value={formData.organGroup} 
                onChange={handleInputChange}
              >
                <option value="Kidney">Kidney</option>
                <option value="Liver">Liver</option>
                <option value="Heart">Heart</option>
                <option value="Pancreas">Pancreas</option>
                <option value="Cornea">Cornea</option>
              </select>
            </div>

            <div className="form-group form-grid-full">
              <label className="form-label">Clinical Findings Summary *</label>
              <textarea 
                name="findings" 
                className="form-textarea" 
                rows="4" 
                placeholder="Describe diagnostics results, tissue anomalies, and risk indices..."
                value={formData.findings} 
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div className="form-group form-grid-full">
              <label className="form-label">Suggested Treatment Plan</label>
              <textarea 
                name="treatmentPlan" 
                className="form-textarea" 
                rows="3" 
                placeholder="Suggest transplant timelines, referrals, or medication steps..."
                value={formData.treatmentPlan} 
                onChange={handleInputChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary form-grid-full">
              <FaCheck /> Sign and Log Clinical Report
            </button>
          </form>
        </div>
      ) : (
        <div className="table-responsive">
          {reports.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Organ Under Review</th>
                  <th>Clinical Findings</th>
                  <th>Suggested Treatment</th>
                  <th>Log Date</th>
                  <th>Signee Doctor</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((rep) => (
                  <tr key={rep.id}>
                    <td style={{ fontWeight: '600' }}>{rep.patientName}</td>
                    <td>{rep.organGroup}</td>
                    <td style={{ fontSize: '0.85rem', maxWidth: '300px', opacity: 0.85 }}>{rep.findings}</td>
                    <td style={{ fontSize: '0.85rem', maxWidth: '200px', opacity: 0.85 }}>{rep.treatmentPlan}</td>
                    <td>{formatDate(rep.date)}</td>
                    <td style={{ fontStyle: 'italic', fontWeight: '500' }}>{rep.signedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', opacity: 0.6 }}>
              <FaFileMedical style={{ fontSize: '3rem', marginBottom: '10px' }} />
              <h4>No clinical reports drafted</h4>
              <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                Create a clinical findings report to display logs here.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Reports;
