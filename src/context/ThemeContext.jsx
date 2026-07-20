import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

// ======================= DARK THEME =======================
// ======================= PREMIUM DARK THEME =======================
const darkTheme = {
  darkMode: true,

  // Backgrounds
  bg: "#071321",                     // Premium Deep Blue
  card: "rgba(18,30,52,0.88)",       // Glass Card

  // Brand Colors
  primary: "#00E5FF",                // Neon Cyan
  secondary: "#3B82F6",              // Electric Blue
  accent: "#C084FC",                 // Purple Glow

  // Text
  text: "#F8FAFC",
  cardText: "#FFFFFF",
  muted: "#A5B4C7",

  // Borders
  border: "rgba(0,229,255,0.20)",

  // Homepage
  homepageBg: "#071321",

  homepageImage: `
  radial-gradient(circle at 15% 20%, rgba(0,229,255,0.12), transparent 25%),
  radial-gradient(circle at 85% 15%, rgba(192,132,252,0.12), transparent 25%),
  radial-gradient(circle at 50% 90%, rgba(59,130,246,0.10), transparent 30%),
  linear-gradient(135deg,#071321,#0E1B33,#162848)
  `,

  // Navbar & Footer
  navbar: "rgba(7,19,33,0.82)",
  footer: "#0B1729",

  // Effects
  glow: "rgba(0,229,255,.45)",
  shadow: "rgba(0,0,0,.35)",
};


// ======================= LIGHT THEME =======================
const lightTheme = {
  darkMode: false,

  // Backgrounds
  bg: "#F8FAF2",              // Cream White
  card: "#FFFFFF",

  // Brand Colors
  primary: "#B8860B",         // Mustard Gold
  secondary: "#4CAF50",       // Fresh Green
  accent: "#2E7D32",          // Deep Green

  // Text
  text: "#2F3E2F",
  cardText: "#2F3E2F",
  muted: "#6B7B5A",

  // Borders
  border: "#D8E5C2",

  // Homepage
  homepageBg: "#F8FAF2",
  homepageImage: "none",

  // Navbar & Footer
  navbar: "rgba(248,250,242,0.95)",
  footer: "#EDF5E4",

  // Effects
  glow: "rgba(184,134,11,.18)",
  shadow: "rgba(76,175,80,.10)",
};
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("smart_organ_theme");

    if (saved) {
      return JSON.parse(saved);
    }

    return lightTheme; // Default Theme
  });

  useEffect(() => {
    localStorage.setItem("smart_organ_theme", JSON.stringify(theme));

    const root = document.documentElement;

    root.style.setProperty("--bg-color", theme.bg);
    root.style.setProperty("--card-bg", theme.card);

    root.style.setProperty("--primary-color", theme.primary);
    root.style.setProperty("--secondary-color", theme.secondary);
    root.style.setProperty("--accent-color", theme.accent);

    root.style.setProperty("--text-color", theme.text);
    root.style.setProperty("--card-text", theme.cardText);
    root.style.setProperty("--muted-color", theme.muted);

    root.style.setProperty("--border-color", theme.border);

    root.style.setProperty("--homepage-bg-color", theme.homepageBg);
    root.style.setProperty("--homepage-bg-image", theme.homepageImage);

    root.style.setProperty("--navbar-color", theme.navbar);
    root.style.setProperty("--footer-color", theme.footer);

    root.style.setProperty("--glow-color", theme.glow);
    root.style.setProperty("--shadow-color", theme.shadow);

    if (theme.darkMode) {
      root.classList.add("dark-mode");
    } else {
      root.classList.remove("dark-mode");
    }
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme((prev) => (prev.darkMode ? lightTheme : darkTheme));
  };

  const updateThemeColors = (newColors) => {
    setTheme((prev) => ({
      ...prev,
      ...newColors,
    }));
  };

  const resetTheme = () => {
    setTheme(lightTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleDarkMode,
        updateThemeColors,
        resetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;