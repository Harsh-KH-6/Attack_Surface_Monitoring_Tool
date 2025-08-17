import React from 'react';

const StatsCard = ({ title, value, change, changeType, icon, color }) => {
  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      red: 'bg-red-50 border-red-200 text-red-700',
      green: 'bg-green-50 border-green-200 text-green-700',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700'
    };
    return colors[color] || colors.blue;
  };

  const getChangeColor = (changeType) => {
    return changeType === 'positive' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="card hover:shadow-lg transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <div className="flex items-center gap-1 mt-2">
            <span className={`text-sm font-medium ${getChangeColor(changeType)}`}>
              {change}
            </span>
            <span className="text-xs text-gray-500">from last month</span>
          </div>
        </div>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${getColorClasses(color)}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard; 