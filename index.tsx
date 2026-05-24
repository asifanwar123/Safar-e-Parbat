import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Auto-remove cache and storage when website starts in a new browser session/tab
try {
  if (!sessionStorage.getItem('safar_session_active')) {
    // Clear all localStorage so the app starts with fresh default values from constants
    localStorage.clear();
    
    // Clear SessionStorage fully and re-initialize
    sessionStorage.clear();
    sessionStorage.setItem('safar_session_active', 'true');
    
    // Clear custom cached assets if support exists
    if (window.caches) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
    
    console.log("Safar-e-Parbat: Cache and local storage cleared for a fresh session.");
  }
} catch (e) {
  console.warn("Failed to clear session cache silently:", e);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);