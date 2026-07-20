import React, { useState, useEffect, useContext } from 'react';
import { FaUsers, FaTrash, FaCheckCircle } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

export const ManageUsers = () => {
  const { currentUser } = useContext(AuthContext);
  const [userList, setUserList] = useState([]);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const saved = localStorage.getItem('smart_organ_users');
    if (saved) {
      setUserList(JSON.parse(saved));
    }
  };

  const handleDeleteUser = (email) => {
    if (email.toLowerCase() === currentUser.email.toLowerCase()) {
      alert('You cannot delete your own Administrator account.');
      return;
    }

    if (window.confirm(`Are you sure you want to delete account: ${email}?`)) {
      const saved = localStorage.getItem('smart_organ_users') || '[]';
      const parsed = JSON.parse(saved);
      const updated = parsed.filter(u => u.email.toLowerCase() !== email.toLowerCase());
      localStorage.setItem('smart_organ_users', JSON.stringify(updated));

      setUserList(updated);
      setSuccess(`User account ${email} deleted successfully.`);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>System User Registry</h3>
          <p>Manage, view, and delete accounts registered across the 6 clinical portal gateways.</p>
        </div>
      </div>

      {success && <div className="alert alert-success">{success}</div>}

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Profile Name</th>
              <th>Registered Role</th>
              <th>Email Address</th>
              <th>Phone / Contact</th>
              <th>Details / ID Certificate</th>
              <th>Clinical Verification</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.email}>
                <td style={{ fontWeight: '600' }}>{user.name || user.hospitalName || user.laboratoryName || user.doctorName}</td>
                <td>
                  <span className={`badge ${
                    user.role === 'Admin' ? 'badge-danger' : 
                    user.role === 'Doctor' ? 'badge-success' : 'badge-warning'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td>{user.email}</td>
                <td>{user.phone || 'N/A'}</td>
                <td style={{ fontSize: '0.82rem', opacity: 0.85 }}>
                  {user.role === 'Patient' && `Aadhaar ID: ${user.aadhaarFile}`}
                  {user.role === 'Recipient' && `Required: ${user.requiredOrgan}`}
                  {user.role === 'Donor' && `Organs: ${user.organsWillingToDonate?.join(', ')}`}
                  {user.role === 'Doctor' && `Spec: ${user.specialization}`}
                  {user.role === 'Hospital' && `Type: ${user.hospitalType}`}
                  {user.role === 'Laboratory' && `Lic: ${user.licenseNumber}`}
                  {user.role === 'Admin' && `System Executive`}
                </td>
                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#28a745', fontSize: '0.85rem', fontWeight: '600' }}>
                    <FaCheckCircle /> Verified
                  </span>
                </td>
                <td>
                  <button 
                    className="btn btn-danger" 
                    style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                    onClick={() => handleDeleteUser(user.email)}
                  >
                    <FaTrash /> Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageUsers;
