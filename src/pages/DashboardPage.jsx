import React from 'react';
import { useAuth } from '../hooks/useAuth';
import AdminDashboard from '../components/admin/components/AdminDashboard';
import MarketingDashboard from '../components/marketing/MarketingDashboard';
import EmployeeDashboard from '../components/employee/EmployeeDashboard';
import FieldAgentDashboard from '../components/fieldAgent/FieldAgentDashboard';
import NotAuthorizedPage from './NotAuthorizedPage';

const DashboardPage = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'marketing':
      return <MarketingDashboard />;
    case 'employee':
      return <EmployeeDashboard />;
    case 'field_agent':
      return <FieldAgentDashboard />;
    default:
      return <NotAuthorizedPage />;
  }
};

export default DashboardPage;
