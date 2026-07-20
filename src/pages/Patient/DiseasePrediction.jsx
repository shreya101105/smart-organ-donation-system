import React, { useState } from 'react';
import { FaLaptopMedical, FaChevronRight, FaHeartbeat } from 'react-icons/fa';
import { ORGANS } from '../../utils/constants';
import { simulateDiseasePrediction } from '../../utils/helper';

export const DiseasePrediction = () => {
  const [organ, setOrgan] = useState('Kidney');
  const [metrics, setMetrics] = useState({
    creatinine: '1.0',
    egfr: '95',
    bilirubin: '0.8',
    alt: '25',
    bloodPressure: '120/80',
    heartRate: '72',
    glucose: '90'
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setMetrics({ ...metrics, [e.target.name]: e.target.value });
  };

  const handleRunPrediction = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const pred = simulateDiseasePrediction(metrics, organ);
      setResult(pred);
      setLoading(false);

      // Save to local storage history list
      const savedHistory = localStorage.getItem('smart_organ_prediction_history') || '[]';
      const history = JSON.parse(savedHistory);
      const newEntry = {
        id: Math.random().toString(36).substr(2, 9),
        organ,
        score: pred.score,
        riskLevel: pred.riskLevel,
        color: pred.color,
        message: pred.message,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('smart_organ_prediction_history', JSON.stringify([newEntry, ...history]));
    }, 1200);
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>AI Disease Prediction</h3>
          <p>Run simulated analysis on blood diagnostic numbers to evaluate organ failure risks.</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <form onSubmit={handleRunPrediction}>
            <div className="form-group">
              <label className="form-label">Select Organ to Analyze</label>
              <select 
                className="form-select" 
                value={organ} 
                onChange={(e) => { setOrgan(e.target.value); setResult(null); }}
                disabled={loading}
              >
                {ORGANS.slice(0, 4).map(org => <option key={org} value={org}>{org}</option>)}
              </select>
            </div>

            {organ === 'Kidney' && (
              <>
                <div className="form-group">
                  <label className="form-label">Serum Creatinine (mg/dL)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    name="creatinine" 
                    className="form-input" 
                    value={metrics.creatinine} 
                    onChange={handleInputChange}
                    disabled={loading}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">eGFR (mL/min/1.73m²)</label>
                  <input 
                    type="number" 
                    name="egfr" 
                    className="form-input" 
                    value={metrics.egfr} 
                    onChange={handleInputChange}
                    disabled={loading}
                    required
                  />
                </div>
              </>
            )}

            {organ === 'Liver' && (
              <>
                <div className="form-group">
                  <label className="form-label">Total Bilirubin (mg/dL)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    name="bilirubin" 
                    className="form-input" 
                    value={metrics.bilirubin} 
                    onChange={handleInputChange}
                    disabled={loading}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">ALT / SGPT (U/L)</label>
                  <input 
                    type="number" 
                    name="alt" 
                    className="form-input" 
                    value={metrics.alt} 
                    onChange={handleInputChange}
                    disabled={loading}
                    required
                  />
                </div>
              </>
            )}

            {organ === 'Heart' && (
              <>
                <div className="form-group">
                  <label className="form-label">Blood Pressure (Systolic/Diastolic)</label>
                  <input 
                    type="text" 
                    name="bloodPressure" 
                    className="form-input" 
                    placeholder="e.g. 120/80" 
                    value={metrics.bloodPressure} 
                    onChange={handleInputChange}
                    disabled={loading}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Heart Rate (BPM)</label>
                  <input 
                    type="number" 
                    name="heartRate" 
                    className="form-input" 
                    value={metrics.heartRate} 
                    onChange={handleInputChange}
                    disabled={loading}
                    required
                  />
                </div>
              </>
            )}

            {organ === 'Pancreas' && (
              <div className="form-group">
                <label className="form-label">Fasting Blood Glucose (mg/dL)</label>
                <input 
                  type="number" 
                  name="glucose" 
                  className="form-input" 
                  value={metrics.glucose} 
                  onChange={handleInputChange}
                  disabled={loading}
                  required
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
              {loading ? 'Running AI Diagnostics...' : <><FaLaptopMedical /> Execute Diagnosis</>}
            </button>
          </form>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          {result ? (
            <div style={{ width: '100%' }}>
              <div style={{ fontSize: '3rem', color: result.color }}>
                <FaHeartbeat />
              </div>
              <h4 style={{ margin: '14px 0 6px 0' }}>Analysis Report</h4>
              <div style={{ fontSize: '2.8rem', fontWeight: '800', color: result.color }}>
                {result.score}%
              </div>
              <p style={{ fontWeight: '700', color: result.color, textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '14px' }}>
                {result.riskLevel} Stress Risk
              </p>
              <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: 'rgba(0,0,0,0.03)', border: '1px solid var(--border-color)', fontSize: '0.88rem' }}>
                {result.message}
              </div>
            </div>
          ) : (
            <div style={{ opacity: 0.6 }}>
              <FaLaptopMedical style={{ fontSize: '3rem', marginBottom: '12px' }} />
              <h4>Waiting for execution</h4>
              <p style={{ fontSize: '0.8rem', maxWidth: '280px', margin: '0 auto', marginTop: '6px' }}>
                Fill in the clinical values on the left panel and click Execute Diagnosis to generate report.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default DiseasePrediction;
