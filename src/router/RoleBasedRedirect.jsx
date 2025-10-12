import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const RoleBasedRedirect = () => {
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

  // Redirect based on user role
  switch (user.role?.toLowerCase()) {
    case 'admin':
      return <Navigate to='/admin' replace />;
    case 'employee':
      return <Navigate to='/employee' replace />;
    case 'field_agent':
      return <Navigate to='/field-agent' replace />;
    case 'marketing':
      return <Navigate to='/marketing' replace />;
    default:
      // If role is not recognized, redirect to unauthorized page
      console.warn('Unrecognized user role:', user.role);
      return <Navigate to='/unauthorized' replace />;
  }
};

export default RoleBasedRedirect;
