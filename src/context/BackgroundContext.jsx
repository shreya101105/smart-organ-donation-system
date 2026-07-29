import React, { createContext, useState, useEffect } from 'react';

// Import image assets for both Light and Dark modes
import bgiImage from '../components/images/bgi.png';
import bgvImage from '../components/images/bgv.png';

export const BackgroundContext = createContext();

const DEFAULT_BACKGROUND = {
  homepageBgColor: '',
  homepageBgImageLight: bgiImage, // Light mode background image
  homepageBgImageDark: bgvImage,   // Dark mode background image
  heroBg: 'linear-gradient(135deg, #1e1b4b 0%, #3b0764 100%)',
  navbarColor: 'rgba(9, 10, 15, 0.85)',
  footerColor: '#050608',
  bgBlur: 16,
  bgOpacity: 0.85,
};

export const BackgroundProvider = ({ children }) => {
  const [bgSettings, setBgSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('smart_organ_background');
      return saved ? JSON.parse(saved) : DEFAULT_BACKGROUND;
    } catch (e) {
      return DEFAULT_BACKGROUND;
    }
  });

  useEffect(() => {
    localStorage.setItem('smart_organ_background', JSON.stringify(bgSettings));

    const applyBackgrounds = () => {
      const root = document.documentElement;
      const isDarkMode = root.classList.contains('dark-mode');

      // Pick image dynamically based on active mode
      const activeImage = isDarkMode
        ? (bgSettings.homepageBgImageDark || bgvImage)
        : (bgSettings.homepageBgImageLight || bgiImage);

      root.style.setProperty('--homepage-bg-color', bgSettings.homepageBgColor || 'transparent');
      root.style.setProperty(
        '--homepage-bg-image',
        activeImage && activeImage !== 'none' ? `url("${activeImage}")` : 'none'
      );
      root.style.setProperty('--hero-bg', bgSettings.heroBg);
      root.style.setProperty('--navbar-color', bgSettings.navbarColor);
      root.style.setProperty('--footer-color', bgSettings.footerColor);
      root.style.setProperty('--bg-blur', `${bgSettings.bgBlur}px`);
      root.style.setProperty('--bg-opacity', bgSettings.bgOpacity);
    };

    applyBackgrounds();

    // Listen for dark-mode class toggles on <html>
    const observer = new MutationObserver(() => {
      applyBackgrounds();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [bgSettings]);

  const updateBgSettings = (newSettings) => {
    setBgSettings((prev) => ({ ...prev, ...newSettings }));
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

export default BackgroundProvider;