import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { AppStateProvider } from './context/AppStateContext';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AppStateProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AppStateProvider>
  </React.StrictMode>
);
