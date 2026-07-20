import React, { useContext, useState } from 'react';
import { FaSun, FaMoon, FaSave, FaUndo } from 'react-icons/fa';
import { ThemeContext } from '../../context/ThemeContext';

export const ThemeSettings = () => {
  const { theme, toggleDarkMode, updateThemeColors, resetTheme } = useContext(ThemeContext);

  const [primary, setPrimary] = useState(theme.primaryColor);
  const [secondary, setSecondary] = useState(theme.secondaryColor);
  const [accent, setAccent] = useState(theme.accentColor);

  const handleApplyColors = () => {
    updateThemeColors({
      primaryColor: primary,
      secondaryColor: secondary,
      accentColor: accent
    });
    alert('Colors applied to live preview! Save from Website appearance if desired.');
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Theme Interface Customizer</h3>
          <p>Modify color schemes and default themes globally across the user ecosystem.</p>
        </div>
      </div>

      <div className="grid-2">
        {/* Toggle dark mode */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left', textAlign: 'left' }}>
          <h4>Theme Mode Configuration</h4>
          <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '20px' }}>
            Switch baseline styles between Dark Mode and Light Mode settings.
          </p>
          <button className="btn btn-outline" onClick={toggleDarkMode} style={{ width: '100%' }}>
            {theme.darkMode ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <FaSun /> Enable Light Mode
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <FaMoon /> Enable Dark Mode
              </span>
            )}
          </button>
        </div>

        {/* Color pickers */}
        <div className="card" style={{ textAlign: 'left' }}>
          <h4>Theme Color Tokens</h4>
          <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '20px' }}>
            Choose color schemes for buttons, headers, active highlights, and indicators.
          </p>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Primary Brand Color</span>
              <strong>{primary}</strong>
            </label>
            <input 
              type="color" 
              className="form-input" 
              value={primary} 
              onChange={(e) => setPrimary(e.target.value)} 
              style={{ height: '40px', padding: '2px', cursor: 'pointer' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Secondary Success Accent</span>
              <strong>{secondary}</strong>
            </label>
            <input 
              type="color" 
              className="form-input" 
              value={secondary} 
              onChange={(e) => setSecondary(e.target.value)} 
              style={{ height: '40px', padding: '2px', cursor: 'pointer' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Accent Warning Tint</span>
              <strong>{accent}</strong>
            </label>
            <input 
              type="color" 
              className="form-input" 
              value={accent} 
              onChange={(e) => setAccent(e.target.value)} 
              style={{ height: '40px', padding: '2px', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button className="btn btn-primary" onClick={handleApplyColors} style={{ flexGrow: 1 }}>
              <FaSave /> Apply Colors
            </button>
            <button className="btn btn-outline" onClick={resetTheme} title="Reset to Defaults">
              <FaUndo /> Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ThemeSettings;
