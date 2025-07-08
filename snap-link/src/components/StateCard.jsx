import React from 'react';
import { FaMousePointer, FaUserFriends, FaGlobe, FaCity } from 'react-icons/fa';

function StateCard({ totalClick, totalUniqueUser, totalCountry, totalCity }) {
  const stats = [
    {
      title: 'Total Clicks',
      value: totalClick,
      color: '#3674B5', // Blue
      icon: <FaMousePointer className="text-[#3674B5] text-2xl" />,
    },
    {
      title: 'Unique Users',
      value: totalUniqueUser,
      color: '#00809D', // Light Blue
      icon: <FaUserFriends className="text-[#00809D] text-2xl" />,
    },
    {
      title: 'Countries',
      value: totalCountry,
      color: '#093FB4', // Yellow
      icon: <FaGlobe className="text-[#093FB4] text-2xl" />,
    },
    {
      title: 'Cities',
      value: totalCity,
      color: '#ED3500', // Cream
      icon: <FaCity className="text-[#ED3500] text-2xl" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 group"
        >
          {/* Icon */}
          <div className="mb-2">{stat.icon}</div>

          {/* Value */}
          <div
            className="text-3xl font-bold"
            style={{ color: stat.color }}
          >
            {stat.value}
          </div>

          {/* Title */}
          <div className="text-gray-600 text-sm mt-1 group-hover:text-black transition-colors">
            {stat.title}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StateCard;
