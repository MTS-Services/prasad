import React, { useState, useEffect } from 'react';
import { HiOutlineUsers, HiOutlineEye } from 'react-icons/hi';
import axiosInstance from '../../../config/axiosConfig';

const UserManagement = () => {
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/admin/data/users.json');
        const data = response.data;
        setUserData(data);
        setUsers(data.users || []);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message || 'Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Pagination
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 w-full flex items-center justify-center'>
        <div className='text-gray-700'>Loading user data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 w-full flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-red-600 mb-4'>Error: {error}</p>
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

  return (
    <div className='min-h-screen bg-gray-50 w-full'>
      <div className='w-full px-4 sm:px-6 lg:px-8 py-6'>
        {/* Header Section */}
        <div className='bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8'>
          <div className='flex items-center justify-between flex-wrap gap-4'>
            <div className='flex items-center'>
              <div className='bg-green-100 p-3 rounded-lg mr-4'>
                <HiOutlineUsers className='w-8 h-8 text-green-600' />
              </div>
              <div>
                <h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>
                  {userData?.title || 'User Management'}
                </h1>
                <p className='text-gray-600 mt-1'>
                  Manage user accounts and permissions
                </p>
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <span className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium'>
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {userData?.stats && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
            {userData.stats.map((stat, index) => (
              <div key={index} className='bg-white p-6 rounded-xl shadow-sm'>
                <h3 className='font-semibold text-gray-900 mb-2'>
                  {stat.label}
                </h3>
                <p className='text-2xl font-bold text-blue-600'>{stat.value}</p>
                {stat.change && (
                  <p
                    className={`text-sm mt-1 ${
                      stat.changeType === 'positive'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Users Table */}
        <div className='bg-white rounded-xl shadow-sm'>
          <div className='p-6 border-b border-gray-200'>
            <h2 className='text-xl font-bold text-gray-900'>All Users</h2>
            <p className='text-gray-600 mt-1'>
              Showing {paginatedUsers.length} of {users.length} users
            </p>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50 border-b border-gray-200'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    Name
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    Email
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    Role
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    Status
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    Joined
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {paginatedUsers.map((user, index) => (
                  <tr key={user.id || index} className='hover:bg-gray-50'>
                    <td className='px-6 py-4'>
                      <div className='flex items-center'>
                        <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3'>
                          <span className='text-blue-600 font-semibold text-sm'>
                            {user.name
                              ?.split(' ')
                              .map((n) => n[0])
                              .join('')
                              .toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div>
                          <div className='text-sm font-medium text-gray-900'>
                            {user.name || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-900'>
                      {user.email || 'N/A'}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-900'>
                      {user.role || 'User'}
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {user.status || 'active'}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-900'>
                      {user.joinedDate || 'N/A'}
                    </td>
                    <td className='px-6 py-4'>
                      <button className='text-gray-600 hover:text-gray-900'>
                        <HiOutlineEye className='w-5 h-5' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className='px-6 py-4 border-t border-gray-200 flex items-center justify-between'>
            <div className='text-sm text-gray-600'>
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, users.length)} of{' '}
              {users.length} results
            </div>
            <div className='flex gap-2'>
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className='px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50'
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages || totalPages === 0}
                className='px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50'
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
