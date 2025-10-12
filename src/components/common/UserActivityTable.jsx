import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HiDotsVertical, HiUser } from 'react-icons/hi';
import Pagination from './Pagination';

const getStatusColor = (statusType) => {
  const colors = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };
  return colors[statusType] || 'bg-gray-100 text-gray-800';
};

const UserActivityTable = ({ data, title = 'Recent User Activity' }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState(data?.data || []);

  // Update current data when page changes
  useEffect(() => {
    if (!data) return;

    if (currentPage === 1) {
      setCurrentData(data.data || []);
    } else if (currentPage === 2 && data.page2Data) {
      setCurrentData(data.page2Data);
    }
  }, [currentPage, data]);

  if (!data || (!data.data && !data.page2Data)) {
    return (
      <div className='bg-white rounded-xl shadow-sm p-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>{title}</h3>
        <div className='text-center py-8'>
          <p className='text-gray-500'>No activity data available</p>
        </div>
      </div>
    );
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log('Page changed to:', page);
  };

  // Translated headers
  const translatedHeaders = [
    t('table.headers.user'),
    t('table.headers.role'),
    t('table.headers.jobTitle'),
    t('table.headers.status'),
    t('table.headers.lastActive'),
    t('table.headers.actions'),
  ];

  return (
    <div className='bg-white rounded-xl shadow-sm'>
      <div className='p-6 border-b border-gray-200'>
        <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              {translatedHeaders.map((header, index) => (
                <th
                  key={index}
                  className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    index === translatedHeaders.length - 1
                      ? 'text-center'
                      : 'text-left'
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {currentData.map((row, index) => (
              <tr key={row.id || index} className='hover:bg-gray-50'>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 h-8 w-8'>
                      <div className='h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center'>
                        <HiUser className='h-4 w-4 text-gray-500' />
                      </div>
                    </div>
                    <div className='ml-3'>
                      <div className='text-sm font-medium text-gray-900'>
                        {row.user}
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900'>{row.role}</div>
                </td>
                <td className='px-6 py-4'>
                  <div className='text-sm text-gray-900 max-w-xs truncate'>
                    {row.jobTitle}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      row.statusType
                    )}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {row.lastActive}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-center'>
                  <button className='text-gray-400 hover:text-gray-600 p-1'>
                    <HiDotsVertical className='h-5 w-5 mx-auto' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.pagination && (
        <Pagination
          currentPage={currentPage}
          totalItems={data.pagination.total}
          showingText={data.pagination.showing}
          hasNext={currentPage < 2}
          hasPrevious={currentPage > 1}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default UserActivityTable;
