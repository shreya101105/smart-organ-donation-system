import React from 'react';
import { FaChartBar, FaChartPie, FaChartLine } from 'react-icons/fa';

export const Analytics = () => {
  const userDistribution = [
    { label: 'Patients', count: 120, percentage: 40, color: 'var(--primary-color)' },
    { label: 'Donors', count: 90, percentage: 30, color: 'var(--secondary-color)' },
    { label: 'Recipients', count: 45, percentage: 15, color: '#dc3545' },
    { label: 'Doctors', count: 20, percentage: 7, color: '#e0a800' },
    { label: 'Hospitals / Labs', count: 25, percentage: 8, color: '#17a2b8' }
  ];

  const organPledgeDistribution = [
    { organ: 'Kidney', count: 45, fill: '75%' },
    { organ: 'Cornea', count: 32, fill: '55%' },
    { organ: 'Liver', count: 20, fill: '33%' },
    { organ: 'Heart', count: 12, fill: '20%' },
    { organ: 'Lung', count: 8, fill: '12%' },
    { organ: 'Pancreas', count: 6, fill: '10%' }
  ];

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>System Analytics Dashboard</h3>
          <p>Query global database metrics, transplant success indexes, and organ inventory rates.</p>
        </div>
      </div>

      <div className="grid-2">
        {/* User distribution */}
        <div className="card">
          <h4 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaChartPie style={{ color: 'var(--primary-color)' }} /> User Distribution Analytics
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {userDistribution.map((u) => (
              <div key={u.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>
                  <span>{u.label} ({u.count} profiles)</span>
                  <span>{u.percentage}%</span>
                </div>
                <div style={{ height: '10px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${u.percentage}%`, backgroundColor: u.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Organ pledge indexes */}
        <div className="card">
          <h4 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaChartBar style={{ color: 'var(--secondary-color)' }} /> Organ Pledges Registry counts
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {organPledgeDistribution.map((o) => (
              <div key={o.organ} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ width: '80px', fontSize: '0.85rem', fontWeight: '600' }}>{o.organ}</span>
                <div style={{ flexGrow: 1, height: '24px', backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: o.fill, backgroundColor: 'rgba(40,167,69,0.15)', display: 'flex', alignItems: 'center', paddingLeft: '8px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--secondary-color)' }}>{o.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Analytics;
