import React, { useState } from 'react';
import ScanForm from './ScanForm';
import StatsCard from './StatsCard';

const Dashboard = ({ onScanComplete }) => {
  const [isLoading, setIsLoading] = useState(false);

  const stats = [
    {
      title: 'Total Scans',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: '📊',
      color: 'blue'
    },
    {
      title: 'Open Ports',
      value: '89',
      change: '+5%',
      changeType: 'negative',
      icon: '🚪',
      color: 'red'
    },
    {
      title: 'Vulnerabilities',
      value: '23',
      change: '-8%',
      changeType: 'positive',
      icon: '⚠️',
      color: 'yellow'
    },
    {
      title: 'Services',
      value: '156',
      change: '+3%',
      changeType: 'positive',
      icon: '🔧',
      color: 'green'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Network Security Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Monitor and analyze your network attack surface with professional-grade scanning tools
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Scan Form */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Network Scanner</h2>
              <p className="text-gray-600 text-sm">
                Enter target IP address or domain name to perform a comprehensive security scan
              </p>
            </div>
            <ScanForm 
              onScanComplete={onScanComplete}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          {/* Recent Scans */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Recent Scans</h3>
            </div>
            <div className="space-y-3">
              {[
                { target: '192.168.1.1', time: '2 min ago', status: 'completed' },
                { target: 'example.com', time: '15 min ago', status: 'completed' },
                { target: '10.0.0.1', time: '1 hour ago', status: 'completed' }
              ].map((scan, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{scan.target}</p>
                    <p className="text-sm text-gray-500">{scan.time}</p>
                  </div>
                  <span className="badge badge-success">Completed</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="card bg-blue-50 border-blue-200">
            <div className="card-header border-blue-200">
              <h3 className="card-title text-blue-800">💡 Quick Tips</h3>
            </div>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• Use common port ranges: 1-1000, 1-65535</li>
              <li>• Scan your own network first for testing</li>
              <li>• Results include service detection and vulnerabilities</li>
              <li>• All scans are logged for audit purposes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 