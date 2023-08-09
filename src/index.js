import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ApiContextProvider } from './components/ApiContextProvider';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ApiContextProvider>
        <App />
      </ApiContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
