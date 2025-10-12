import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Base PrivateRoute for authentication check
export const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-xl font-semibold text-gray-700'>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

// Role-based route protection
export const RoleBasedRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-xl font-semibold text-gray-700'>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  if (user.role !== role) {
    return <Navigate to='/unauthorized' replace />;
  }

  return children;
};

// Specific role-based routes
export const PrivateAdminRoute = ({ children }) => {
  return <RoleBasedRoute role='admin'>{children}</RoleBasedRoute>;
};

export const PrivateEmployeeRoute = ({ children }) => {
  return <RoleBasedRoute role='employee'>{children}</RoleBasedRoute>;
};

export const PrivateFieldAgentRoute = ({ children }) => {
  return <RoleBasedRoute role='field_agent'>{children}</RoleBasedRoute>;
};

export const PrivateMarketingRoute = ({ children }) => {
  return <RoleBasedRoute role='marketing'>{children}</RoleBasedRoute>;
};
