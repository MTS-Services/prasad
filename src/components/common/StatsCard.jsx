import React from 'react';
import {
  HiOutlineUsers,
  HiOutlineBriefcase,
  HiOutlineCurrencyDollar,
  HiOutlineExclamation,
  HiTicket,
} from 'react-icons/hi';

const getIcon = (iconName) => {
  const icons = {
    users: HiOutlineUsers,
    briefcase: HiOutlineBriefcase,
    dollar: HiOutlineCurrencyDollar,
    warning: HiOutlineExclamation,
    ticket: HiTicket,
  };
  return icons[iconName] || HiOutlineUsers;
};

const getIconBgColor = (iconName) => {
  const colors = {
    users: 'bg-blue-100',
    briefcase: 'bg-green-100',
    dollar: 'bg-emerald-100',
    warning: 'bg-red-100',
    ticket: 'bg-purple-100',
  };
  return colors[iconName] || 'bg-gray-100';
};

const getIconColor = (iconName) => {
  const colors = {
    users: 'text-blue-600',
    briefcase: 'text-green-600',
    dollar: 'text-emerald-600',
    warning: 'text-red-600',
    ticket: 'text-purple-600',
  };
  return colors[iconName] || 'text-gray-600';
};

const StatsCard = ({ stat }) => {
  const Icon = getIcon(stat.icon);
  const bgColor = getIconBgColor(stat.icon);
  const iconColor = getIconColor(stat.icon);

  return (
    <div className='bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200'>
      <div className='flex items-center justify-between'>
        <div className='flex-1'>
          <p className='text-sm font-medium text-gray-600 mb-1'>{stat.label}</p>
          <p className='text-2xl font-bold text-gray-900 mb-2'>{stat.value}</p>
          {stat.change && (
            <p
              className={`text-sm flex items-center ${
                stat.changeType === 'positive'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              <span
                className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  stat.changeType === 'positive' ? 'bg-green-500' : 'bg-red-500'
                }`}
              ></span>
              {stat.change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
