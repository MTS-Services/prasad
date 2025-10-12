import React, { useState, useEffect } from 'react';
import { HiOutlineBriefcase, HiOutlineEye } from 'react-icons/hi';
import axiosInstance from '../../../config/axiosConfig';

const Jobs = () => {
  const [jobsData, setJobsData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchJobsData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/admin/data/jobs.json');
        const data = response.data;
        setJobsData(data);
        setJobs(data.jobs || []);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err.message || 'Failed to load jobs data');
      } finally {
        setLoading(false);
      }
    };

    fetchJobsData();
  }, []);

  // Pagination
  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const paginatedJobs = jobs.slice(
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
        <div className='text-gray-700'>Loading jobs data...</div>
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
              <div className='bg-teal-100 p-3 rounded-lg mr-4'>
                <HiOutlineBriefcase className='w-8 h-8 text-teal-600' />
              </div>
              <div>
                <h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>
                  {jobsData?.title || 'Jobs'}
                </h1>
                <p className='text-gray-600 mt-1'>
                  Manage job postings and assignments
                </p>
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <span className='bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium'>
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {jobsData?.stats && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
            {jobsData.stats.map((stat, index) => (
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

        {/* Jobs Table */}
        <div className='bg-white rounded-xl shadow-sm'>
          <div className='p-6 border-b border-gray-200'>
            <h2 className='text-xl font-bold text-gray-900'>All Jobs</h2>
            <p className='text-gray-600 mt-1'>
              Showing {paginatedJobs.length} of {jobs.length} jobs
            </p>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50 border-b border-gray-200'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    Job Title
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    Client
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    Status
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    Priority
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    Created
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {paginatedJobs.map((job, index) => (
                  <tr key={job.id || index} className='hover:bg-gray-50'>
                    <td className='px-6 py-4'>
                      <div className='text-sm font-medium text-gray-900'>
                        {job.title || 'N/A'}
                      </div>
                      <div className='text-sm text-gray-500'>
                        {job.description || ''}
                      </div>
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-900'>
                      {job.client || 'N/A'}
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          job.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : job.status === 'in-progress'
                            ? 'bg-yellow-100 text-yellow-700'
                            : job.status === 'pending'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {job.status || 'pending'}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`text-sm font-medium ${
                          job.priority === 'high'
                            ? 'text-red-600'
                            : job.priority === 'medium'
                            ? 'text-yellow-600'
                            : 'text-green-600'
                        }`}
                      >
                        {job.priority || 'medium'}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-900'>
                      {job.createdDate || 'N/A'}
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
              {Math.min(currentPage * itemsPerPage, jobs.length)} of{' '}
              {jobs.length} results
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

export default Jobs;
