import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from '../../common/LoadingSpinner';

// Import dashboard components
import RevenueChart from '../charts/RevenueChart';
import UserActivityTable from '../../common/UserActivityTable';
import StatsCard from '../../common/StatsCard';

// Import axios instance
import axiosInstance from '../../../config/axiosConfig';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          '/admin/data/dashboardData.json'
        );
        const data = response.data;
        setDashboardData(data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-center'>
          <p className='text-red-600 mb-4'>
            Error loading dashboard data: {error}
          </p>
          <button
            className='px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700'
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className='flex items-center justify-center h-64'>
        <p className='text-gray-500'>No dashboard data available</p>
      </div>
    );
  }

  return (
    <div className='w-full'>
      {/* Header Section */}
      <div className='mb-6'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>
            {dashboardData.overview?.title || 'Admin Dashboard'}
          </h1>
          <p className='text-gray-600'>
            {dashboardData.overview?.subtitle ||
              'Monitor your platform performance and key metrics'}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      {dashboardData.overview?.stats && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          {dashboardData.overview.stats.map((stat, index) => (
            <StatsCard key={stat.id || index} stat={stat} />
          ))}
        </div>
      )}

      {/* Additional Stats */}
      {dashboardData.overview?.additionalStats && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          {dashboardData.overview.additionalStats.map((stat, index) => (
            <StatsCard key={stat.id || index} stat={stat} />
          ))}
        </div>
      )}

      {/* Chart Section */}
      {dashboardData.revenueChart && (
        <div className='mb-8'>
          <RevenueChart
            data={dashboardData.revenueChart.data}
            title={dashboardData.revenueChart.title}
          />
        </div>
      )}

      {/* User Activity Table */}
      {dashboardData.recentActivity && (
        <div>
          <UserActivityTable
            data={dashboardData.recentActivity}
            title={dashboardData.recentActivity.title}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
