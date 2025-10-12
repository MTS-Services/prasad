import React from 'react';
import { useTranslation } from 'react-i18next';

const Pagination = ({
  currentPage = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  showingText,
  hasNext = true,
  hasPrevious = false,
}) => {
  const { t } = useTranslation();

  const handlePreviousClick = () => {
    if (hasPrevious && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (hasNext && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div className='px-6 py-4 bg-white border-t border-gray-200'>
      <div className='flex items-center justify-between'>
        <div className='text-sm text-gray-700'>
          {showingText ||
            `${t('pagination.showing')} ${Math.min(
              (currentPage - 1) * itemsPerPage + 1,
              totalItems
            )} ${t('pagination.of')} ${totalItems} ${t('pagination.users')}`}
        </div>
        <div className='flex items-center space-x-1'>
          <button
            onClick={handlePreviousClick}
            className='px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={!hasPrevious}
          >
            {t('pagination.previous')}
          </button>

          {/* Page 1 */}
          <button
            className={`px-3 py-2 text-sm font-medium rounded ${
              currentPage === 1
                ? 'bg-green-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handlePageClick(1)}
          >
            1
          </button>

          {/* Page 2 */}
          <button
            className={`px-3 py-2 text-sm font-medium rounded ${
              currentPage === 2
                ? 'bg-green-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handlePageClick(2)}
          >
            2
          </button>

          <button
            onClick={handleNextClick}
            className='px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={!hasNext}
          >
            {t('pagination.next')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
