import React, { useContext, useState } from 'react';
import { FaImage, FaUndo, FaSave } from 'react-icons/fa';
import { BackgroundContext } from '../../context/BackgroundContext';

export const WebsiteSettings = () => {
  const { bgSettings, updateBgSettings, resetBgSettings } = useContext(BackgroundContext);

  const [bgColor, setBgColor] = useState(bgSettings.homepageBgColor);
  const [bgImage, setBgImage] = useState(bgSettings.homepageBgImage);
  const [heroBg, setHeroBg] = useState(bgSettings.heroBg);
  const [navColor, setNavColor] = useState(bgSettings.navbarColor);
  const [footerColor, setFooterColor] = useState(bgSettings.footerColor);
  const [blur, setBlur] = useState(bgSettings.bgBlur);
  const [opacity, setOpacity] = useState(bgSettings.bgOpacity);

  const handleApply = () => {
    updateBgSettings({
      homepageBgColor: bgColor,
      homepageBgImage: bgImage,
      heroBg: heroBg,
      navbarColor: navColor,
      footerColor: footerColor,
      bgBlur: parseInt(blur),
      bgOpacity: parseFloat(opacity)
    });
    alert('Website customizations applied successfully! Live preview active.');
  };

  // Mock background patterns
  const patterns = [
    { label: 'Solid Default', value: '' },
    { label: 'Polished Lab', value: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=1200' },
    { label: 'Abstract Medical', value: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200' }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="tab-content-panel">
      <div className="panel-header">
        <div>
          <h3>Website Appearance & Layout Settings</h3>
          <p>Configure homepage backgrounds, navbar styles, header blurs, and opacities globally.</p>
        </div>
      </div>

      <div className="grid-2">
        {/* Colors and sliders */}
        <div className="card" style={{ textAlign: 'left' }}>
          <h4>Background & Glassmorphism sliders</h4>
          <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '20px' }}>
            Adjust layouts, blurs, and opacities for page widgets.
          </p>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Glassmorphism Blur: <strong>{blur}px</strong></span>
            </label>
            <input 
              type="range" 
              min="0" 
              max="30" 
              value={blur} 
              onChange={(e) => setBlur(e.target.value)} 
              className="form-input"
              style={{ cursor: 'pointer' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Card Background Opacity: <strong>{Math.round(opacity * 100)}%</strong></span>
            </label>
            <input 
              type="range" 
              min="0.5" 
              max="1.0" 
              step="0.05"
              value={opacity} 
              onChange={(e) => setOpacity(e.target.value)} 
              className="form-input"
              style={{ cursor: 'pointer' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Homepage Background Image Pattern</label>
            <select 
              className="form-select" 
              value={bgImage && !bgImage.startsWith('data:') ? bgImage : ''} 
              onChange={(e) => setBgImage(e.target.value)}
            >
              {patterns.map(pat => (
                <option key={pat.label} value={pat.value}>{pat.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Or Upload Custom Background Image</label>
            <input 
              type="file" 
              accept="image/*"
              className="form-input"
              onChange={handleImageUpload}
            />
            {bgImage && bgImage.startsWith('data:') && (
              <div style={{ marginTop: '10px' }}>
                <span style={{ fontSize: '0.78rem', display: 'block', marginBottom: '4px' }}>Custom Image Loaded:</span>
                <img 
                  src={bgImage} 
                  alt="custom-bg-preview" 
                  style={{ width: '120px', height: '70px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                />
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={() => setBgImage('')}
                  style={{ display: 'block', padding: '4px 8px', fontSize: '0.75rem', marginTop: '6px' }}
                >
                  Clear Custom Wallpaper
                </button>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Homepage Solid Background Color</label>
            <input 
              type="color" 
              className="form-input" 
              value={bgColor} 
              onChange={(e) => setBgColor(e.target.value)}
              style={{ height: '40px', padding: '2px', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Global Nav Bar colors */}
        <div className="card" style={{ textAlign: 'left' }}>
          <h4>Layout Headers & Gradients</h4>
          <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '20px' }}>
            Choose header backgrounds and custom primary hero gradients.
          </p>

          <div className="form-group">
            <label className="form-label">Navbar Background Color</label>
            <input 
              type="color" 
              className="form-input" 
              value={navColor} 
              onChange={(e) => setNavColor(e.target.value)}
              style={{ height: '40px', padding: '2px', cursor: 'pointer' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Footer Background Color</label>
            <input 
              type="color" 
              className="form-input" 
              value={footerColor} 
              onChange={(e) => setFooterColor(e.target.value)}
              style={{ height: '40px', padding: '2px', cursor: 'pointer' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Hero Banner Gradient Preset</label>
            <select 
              className="form-select" 
              value={heroBg} 
              onChange={(e) => setHeroBg(e.target.value)}
            >
              <option value="linear-gradient(135deg, #0056B3 0%, #007BFF 100%)">Classic Blue (Default)</option>
              <option value="linear-gradient(135deg, #1A202C 0%, #2D3748 100%)">Midnight Slate</option>
              <option value="linear-gradient(135deg, #2C3E50 0%, #000000 100%)">Deep Teal</option>
              <option value="linear-gradient(135deg, #FF5A5F 0%, #FF7A00 100%)">Warm Coral</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button className="btn btn-primary" onClick={handleApply} style={{ flexGrow: 1 }}>
              <FaSave /> Save Changes
            </button>
            <button className="btn btn-outline" onClick={resetBgSettings}>
              <FaUndo /> Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WebsiteSettings;
