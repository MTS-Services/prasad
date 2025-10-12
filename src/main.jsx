import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AppRoutes } from './router/AppRoutes';
import { AuthProvider } from './context/AuthProvider';
import { ErrorBoundary } from './components/utility/ErrorBoundary';
import './i18n'; // Initialize i18n
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={AppRoutes} />
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
