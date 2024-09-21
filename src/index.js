import React from 'react';
import ReactDOM from 'react-dom/client';  // Importa el nuevo API para React 18
import './styles.css';
import App from './App';

// Usa el nuevo método createRoot en React 18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
