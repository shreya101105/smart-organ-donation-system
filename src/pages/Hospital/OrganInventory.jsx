import React, { useState } from 'react';
import { FaBoxes, FaThermometerHalf, FaPlus } from 'react-icons/fa';

const INITIAL_INVENTORY = [
  { id: 'inv-01', organ: 'Kidney', bloodGroup: 'O+', temp: '-4.2°C', shelf: 'Cryo-A12', status: 'Available' },
  { id: 'inv-02', organ: 'Cornea', bloodGroup: 'A-', temp: '2.1°C', shelf: 'Cold-B05', status: 'Reserved' },
  { id: 'inv-03', organ: 'Liver', bloodGroup: 'B+', temp: '-3.8°C', shelf: 'Cryo-A02', status: 'Available' }
];

export const OrganInventory = () => {
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    organ: 'Kidney',
    bloodGroup: 'O+',
    temp: '-4.0°C',
    shelf: 'Cryo-A10'
  });

  const handleAdd = (e) => {
    e.preventDefault();
    const newItem = {
      id: 'inv-' + Math.floor(100 + Math.random() * 900),
      organ: formData.organ,
      bloodGroup: formData.bloodGroup,
      temp: formData.temp,
      shelf: formData.shelf,
      status: 'Available'
    };
    setInventory([...inventory, newItem]);
    setShowForm(false);
    setFormData({ organ: 'Kidney', bloodGroup: 'O+', temp: '-4.0°C', shelf: 'Cryo-A10' });
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Cryo-Storage Organ Inventory</h3>
          <p>Monitor available organs, storage shelf coordinates, and oxygen/thermal sensors.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <FaPlus /> {showForm ? 'View Inventory' : 'Log Storage Item'}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <h4 style={{ marginBottom: '20px' }}>Log New Storage Item</h4>
          <form onSubmit={handleAdd} className="form-grid">
            <div className="form-group">
              <label className="form-label">Organ Type</label>
              <select 
                className="form-select" 
                value={formData.organ} 
                onChange={(e) => setFormData({ ...formData, organ: e.target.value })}
              >
                <option value="Kidney">Kidney</option>
                <option value="Liver">Liver</option>
                <option value="Heart">Heart</option>
                <option value="Pancreas">Pancreas</option>
                <option value="Cornea">Cornea</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Blood Group</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. O+"
                value={formData.bloodGroup} 
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Storage Temperature (°C)</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. -4.0°C"
                value={formData.temp} 
                onChange={(e) => setFormData({ ...formData, temp: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Shelf Location</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Cryo-A10"
                value={formData.shelf} 
                onChange={(e) => setFormData({ ...formData, shelf: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary form-grid-full">Add to Cryo Shelf</button>
          </form>
        </div>
      )}

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Storage Item ID</th>
              <th>Organ Type</th>
              <th>Blood Type</th>
              <th>Storage Temp</th>
              <th>Storage Unit / Shelf</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: '700' }}>{item.id}</td>
                <td style={{ fontWeight: '600' }}>{item.organ}</td>
                <td style={{ fontWeight: '700' }}>{item.bloodGroup}</td>
                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaThermometerHalf style={{ color: 'var(--primary-color)' }} /> {item.temp}
                  </span>
                </td>
                <td style={{ fontSize: '0.85rem' }}>{item.shelf}</td>
                <td>
                  <span className={`badge ${item.status === 'Available' ? 'badge-success' : 'badge-warning'}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrganInventory;
