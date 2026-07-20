import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { BackgroundProvider } from './context/BackgroundContext';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <BackgroundProvider>
        <AuthProvider>
          <div className="app-container">
            <div className="bg-mesh"></div>
            <div className="page-wrapper">
              <AppRoutes />
            </div>
          </div>
        </AuthProvider>
      </BackgroundProvider>
    </ThemeProvider>
  );
}

export default App;
