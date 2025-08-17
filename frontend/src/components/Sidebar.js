import React from 'react';

const Sidebar = ({ currentView, onViewChange }) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      description: 'Network scanning interface'
    },
    {
      id: 'results',
      label: 'Scan Results',
      icon: '🔍',
      description: 'View scan results and reports'
    }
  ];

  return (
    <div className="w-64 bg-white shadow-xl border-r border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">🛡️</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Attack Surface</h1>
            <p className="text-sm text-gray-500">Monitoring Tool</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Class Presentation</p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span>🛡️</span>
            <span>Security Tool</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 