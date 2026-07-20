import React, { createContext, useState, useEffect } from 'react';

export const BackgroundContext = createContext();

const DEFAULT_BACKGROUND = {
  homepageBgColor: '#090a0f',
  homepageBgImage: '', // base64 or URL if uploaded
  heroBg: 'linear-gradient(135deg, #1e1b4b 0%, #3b0764 100%)', // Deep indigo to dark purple gradient
  navbarColor: 'rgba(9, 10, 15, 0.85)',
  footerColor: '#050608',
  bgBlur: 16, // px
  bgOpacity: 0.85,
};

export const BackgroundProvider = ({ children }) => {
  const [bgSettings, setBgSettings] = useState(() => {
    const saved = localStorage.getItem('smart_organ_background');
    return saved ? JSON.parse(saved) : DEFAULT_BACKGROUND;
  });

  useEffect(() => {
    localStorage.setItem('smart_organ_background', JSON.stringify(bgSettings));

    // Apply styling to root element
    const root = document.documentElement;
    root.style.setProperty('--homepage-bg-color', bgSettings.homepageBgColor);
    root.style.setProperty('--homepage-bg-image', bgSettings.homepageBgImage ? `url(${bgSettings.homepageBgImage})` : 'none');
    root.style.setProperty('--hero-bg', bgSettings.heroBg);
    root.style.setProperty('--navbar-color', bgSettings.navbarColor);
    root.style.setProperty('--footer-color', bgSettings.footerColor);
    root.style.setProperty('--bg-blur', `${bgSettings.bgBlur}px`);
    root.style.setProperty('--bg-opacity', bgSettings.bgOpacity);
  }, [bgSettings]);

  const updateBgSettings = (newSettings) => {
    setBgSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetBgSettings = () => {
    setBgSettings(DEFAULT_BACKGROUND);
  };

  return (
    <BackgroundContext.Provider value={{ bgSettings, updateBgSettings, resetBgSettings }}>
      {children}
    </BackgroundContext.Provider>
  );
};
