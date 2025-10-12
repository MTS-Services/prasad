import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/common/Layout';
import { DashboardLayout } from '../components/common/DashboardLayout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotAuthorizedPage from '../pages/NotAuthorizedPage';
import NotFoundPage from '../pages/NotFoundPage';

// Dashboard Components
import AdminDashboard from '../components/admin/components/AdminDashboard';
import EmployeeDashboard from '../components/employee/EmployeeDashboard';
import FieldAgentDashboard from '../components/fieldAgent/FieldAgentDashboard';
import MarketingDashboard from '../components/marketing/MarketingDashboard';

// Admin Components
import Complaints from '../components/admin/components/Complaints';
import DroneOperator from '../components/admin/components/DroneOperator';
import EmployeeManagement from '../components/admin/components/EmployeeManagement';
import FieldAgent from '../components/admin/components/FieldAgent';
import Jobs from '../components/admin/components/Jobs';
import PaymentsManagement from '../components/admin/components/PaymentsManagement';
import Reports from '../components/admin/components/Reports';
import UserManagement from '../components/admin/components/UserManagement';

// Employee Components
import Profile from '../components/employee/Profile';
import EmployeeReports from '../components/employee/Reports';
import Schedule from '../components/employee/Schedule';
import Training from '../components/employee/Training';
import Messages from '../components/employee/Messages';
import MyTasks from '../components/employee/MyTasks';

// Field Agent Components
import FieldAgentReports from '../components/fieldAgent/Reports';
import MyAssignments from '../components/fieldAgent/MyAssignments';
import LocationTracking from '../components/fieldAgent/LocationTracking';
import PhotoCapture from '../components/fieldAgent/PhotoCapture';
import RouteOptimization from '../components/fieldAgent/RouteOptimization';
import VehicleManagement from '../components/fieldAgent/VehicleManagement';

// Marketing Components
import Analytics from '../components/marketing/Analytics';
import Campaigns from '../components/marketing/Campaigns';
import ContentManagement from '../components/marketing/ContentManagement';
import EmailMarketing from '../components/marketing/EmailMarketing';
import SocialMedia from '../components/marketing/SocialMedia';
import Audience from '../components/marketing/Audience';

// Private Route Components
import {
  PrivateRoute,
  PrivateAdminRoute,
  PrivateEmployeeRoute,
  PrivateFieldAgentRoute,
  PrivateMarketingRoute,
} from './PrivateRoute';
import { RoleBasedRedirect } from './RoleBasedRedirect';

const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/unauthorized',
        element: <NotAuthorizedPage />,
      },
      {
        path: '/dashboard',
        element: <RoleBasedRedirect />,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <PrivateAdminRoute>
        <DashboardLayout />
      </PrivateAdminRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: 'complaints',
        element: <Complaints />,
      },
      {
        path: 'drone-operators',
        element: <DroneOperator />,
      },
      {
        path: 'employees',
        element: <EmployeeManagement />,
      },
      {
        path: 'field-agents',
        element: <FieldAgent />,
      },
      {
        path: 'jobs',
        element: <Jobs />,
      },
      {
        path: 'payments',
        element: <PaymentsManagement />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
      {
        path: 'users',
        element: <UserManagement />,
      },
    ],
  },
  {
    path: '/employee',
    element: (
      <PrivateEmployeeRoute>
        <DashboardLayout />
      </PrivateEmployeeRoute>
    ),
    children: [
      {
        index: true,
        element: <EmployeeDashboard />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'reports',
        element: <EmployeeReports />,
      },
      {
        path: 'schedule',
        element: <Schedule />,
      },
      {
        path: 'training',
        element: <Training />,
      },
      {
        path: 'messages',
        element: <Messages />,
      },
      {
        path: 'tasks',
        element: <MyTasks />,
      },
    ],
  },
  {
    path: '/field-agent',
    element: (
      <PrivateFieldAgentRoute>
        <DashboardLayout />
      </PrivateFieldAgentRoute>
    ),
    children: [
      {
        index: true,
        element: <FieldAgentDashboard />,
      },
      {
        path: 'reports',
        element: <FieldAgentReports />,
      },
      {
        path: 'assignments',
        element: <MyAssignments />,
      },
      {
        path: 'location-tracking',
        element: <LocationTracking />,
      },
      {
        path: 'photo-capture',
        element: <PhotoCapture />,
      },
      {
        path: 'route-optimization',
        element: <RouteOptimization />,
      },
      {
        path: 'vehicle-management',
        element: <VehicleManagement />,
      },
    ],
  },
  {
    path: '/marketing',
    element: (
      <PrivateMarketingRoute>
        <DashboardLayout />
      </PrivateMarketingRoute>
    ),
    children: [
      {
        index: true,
        element: <MarketingDashboard />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'campaigns',
        element: <Campaigns />,
      },
      {
        path: 'content-management',
        element: <ContentManagement />,
      },
      {
        path: 'email-marketing',
        element: <EmailMarketing />,
      },
      {
        path: 'social-media',
        element: <SocialMedia />,
      },
      {
        path: 'audience',
        element: <Audience />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export { AppRoutes };
