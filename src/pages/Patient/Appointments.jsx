import React, { useState, useEffect, useContext } from 'react';
import { FaCalendarPlus, FaCalendarAlt, FaCheck } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { SPECIALISTS } from '../../utils/constants';
import { formatDate } from '../../utils/helper';

const MOCK_APPOINTMENTS = [
  {
    id: 'app-901',
    patientEmail: 'patient@system.com',
    patientName: 'John Doe',
    doctorName: 'Dr. Robert Carter',
    specialty: 'Nephrologist',
    date: '2026-07-25',
    time: '10:00 AM',
    reason: 'Routine post-prediction evaluation checkup',
    status: 'Confirmed'
  }
];

export const Appointments = () => {
  const { currentUser } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    time: '10:00 AM',
    reason: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('smart_organ_appointments');
    if (saved) {
      const parsed = JSON.parse(saved);
      const filtered = parsed.filter(a => a.patientEmail.toLowerCase() === currentUser.email.toLowerCase());
      setAppointments(filtered);
    } else {
      localStorage.setItem('smart_organ_appointments', JSON.stringify(MOCK_APPOINTMENTS));
      setAppointments(MOCK_APPOINTMENTS);
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBook = (e) => {
    e.preventDefault();
    if (!formData.doctor || !formData.date || !formData.reason) return;

    const doctorObject = SPECIALISTS.find(s => s.name === formData.doctor) || SPECIALISTS[0];

    const newApp = {
      id: 'app-' + Math.floor(1000 + Math.random() * 9000),
      patientEmail: currentUser.email,
      patientName: currentUser.name,
      doctorName: doctorObject.name,
      specialty: doctorObject.role.split(' ')[1] || 'Specialist',
      date: formData.date,
      time: formData.time,
      reason: formData.reason,
      status: 'Pending Approval'
    };

    const saved = localStorage.getItem('smart_organ_appointments') || '[]';
    const parsed = JSON.parse(saved);
    const updated = [newApp, ...parsed];
    localStorage.setItem('smart_organ_appointments', JSON.stringify(updated));

    setAppointments([newApp, ...appointments]);
    setShowForm(false);
    setFormData({ doctor: '', date: '', time: '10:00 AM', reason: '' });
    setMessage('Appointment requested successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Consultation Appointments</h3>
          <p>Book and monitor consultation appointments with transplant doctors.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <FaCalendarPlus /> {showForm ? 'View Schedule' : 'Schedule Appointment'}
        </button>
      </div>

      {message && <div className="alert alert-success">{message}</div>}

      {showForm ? (
        <div className="card">
          <h4 style={{ marginBottom: '20px' }}>Request Appointment</h4>
          <form onSubmit={handleBook} className="form-grid">
            <div className="form-group">
              <label className="form-label">Select Specialist Doctor *</label>
              <select 
                name="doctor" 
                className="form-select" 
                value={formData.doctor} 
                onChange={handleInputChange}
                required
              >
                <option value="">Select Doctor</option>
                {SPECIALISTS.map(doc => (
                  <option key={doc.name} value={doc.name}>{doc.name} ({doc.role})</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Date *</label>
              <input 
                type="date" 
                name="date" 
                className="form-input" 
                value={formData.date} 
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Time Slot</label>
              <select 
                name="time" 
                className="form-select" 
                value={formData.time} 
                onChange={handleInputChange}
              >
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:30 PM">03:30 PM</option>
              </select>
            </div>

            <div className="form-group form-grid-full">
              <label className="form-label">Reason for Consultation *</label>
              <textarea 
                name="reason" 
                className="form-textarea" 
                rows="3" 
                placeholder="Briefly explain your symptoms or transplant interest..."
                value={formData.reason} 
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary form-grid-full">
              <FaCheck /> Confirm Appointment Request
            </button>
          </form>
        </div>
      ) : (
        <div className="table-responsive">
          {appointments.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Physician Name</th>
                  <th>Clinical Specialty</th>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((app) => (
                  <tr key={app.id}>
                    <td style={{ fontWeight: '600' }}>{app.doctorName}</td>
                    <td>{app.specialty}</td>
                    <td>{formatDate(app.date)}</td>
                    <td>{app.time}</td>
                    <td style={{ fontSize: '0.85rem', opacity: 0.85 }}>{app.reason}</td>
                    <td>
                      <span className={`badge ${
                        app.status === 'Confirmed' ? 'badge-success' : 'badge-warning'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', opacity: 0.6 }}>
              <FaCalendarAlt style={{ fontSize: '3rem', marginBottom: '10px' }} />
              <h4>No appointments scheduled</h4>
              <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                Schedule a consultation to talk to one of our board-certified experts.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Appointments;
