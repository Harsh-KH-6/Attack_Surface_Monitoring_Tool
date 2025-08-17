import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ScanResults = ({ results, onBack }) => {
  if (!results) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No scan results available</p>
        <button onClick={onBack} className="btn btn-primary mt-4">
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Prepare chart data for port states
  const portStatesData = {
    labels: ['Open', 'Closed', 'Filtered'],
    datasets: [
      {
        label: 'Port Count',
        data: [
          results.summary.open_ports,
          results.summary.closed_ports,
          results.summary.total_ports_scanned - results.summary.open_ports - results.summary.closed_ports
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(156, 163, 175, 0.8)'
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(156, 163, 175, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare chart data for vulnerability severity
  const vulnerabilityData = {
    labels: Object.keys(results.summary.severity_breakdown),
    datasets: [
      {
        label: 'Vulnerabilities',
        data: Object.values(results.summary.severity_breakdown),
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',   // Critical - Red
          'rgba(245, 158, 11, 0.8)',  // High - Orange
          'rgba(245, 158, 11, 0.6)',  // Medium - Yellow
          'rgba(34, 197, 94, 0.8)',   // Low - Green
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(34, 197, 94, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Port States Distribution',
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Vulnerability Severity Distribution',
      },
    },
  };

  const getSeverityColor = (severity) => {
    const colors = {
      'Critical': 'badge-danger',
      'High': 'badge-danger',
      'Medium': 'badge-warning',
      'Low': 'badge-success'
    };
    return colors[severity] || 'badge-info';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Scan Results
          </h1>
          <p className="text-gray-600">
            Target: <span className="font-semibold">{results.target}</span> | 
            Scan Time: <span className="font-semibold">{results.scan_time}</span>
          </p>
        </div>
        <button onClick={onBack} className="btn btn-secondary">
          ← Back to Dashboard
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-blue-50 border-blue-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700">{results.summary.total_ports_scanned}</div>
            <div className="text-sm text-blue-600">Total Ports Scanned</div>
          </div>
        </div>
        <div className="card bg-red-50 border-red-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-700">{results.summary.open_ports}</div>
            <div className="text-sm text-red-600">Open Ports</div>
          </div>
        </div>
        <div className="card bg-green-50 border-green-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700">{results.summary.services_detected}</div>
            <div className="text-sm text-green-600">Services Detected</div>
          </div>
        </div>
        <div className="card bg-yellow-50 border-yellow-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-700">{results.summary.vulnerabilities_found}</div>
            <div className="text-sm text-yellow-600">Vulnerabilities</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Port States Distribution</h3>
          </div>
          <div className="h-64">
            <Bar data={portStatesData} options={chartOptions} />
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Vulnerability Severity</h3>
          </div>
          <div className="h-64">
            <Pie data={vulnerabilityData} options={pieOptions} />
          </div>
        </div>
      </div>

      {/* Open Ports Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Open Ports & Services</h3>
          <p className="text-gray-600 text-sm">
            {results.services.length} services detected on open ports
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Port</th>
                <th>Service</th>
                <th>Version</th>
                <th>Protocol</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.services.map((service, index) => (
                <tr key={index}>
                  <td className="font-mono font-medium">{service.port}</td>
                  <td>
                    <span className="font-medium">{service.service}</span>
                  </td>
                  <td className="text-gray-600">{service.version}</td>
                  <td className="text-gray-600">{service.protocol}</td>
                  <td>
                    <span className="badge badge-success">{service.state}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vulnerabilities Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Vulnerability Report</h3>
          <p className="text-gray-600 text-sm">
            {results.vulnerabilities.length} vulnerabilities detected
          </p>
        </div>
        <div className="space-y-4">
          {results.vulnerabilities.map((vuln, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">{vuln.title}</h4>
                  <p className="text-sm text-gray-600">CVE: {vuln.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge ${getSeverityColor(vuln.severity)}`}>
                    {vuln.severity}
                  </span>
                  <span className="text-sm text-gray-600">
                    CVSS: {vuln.cvss_score}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Description:</p>
                  <p className="text-gray-800">{vuln.description}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Affected Service:</p>
                  <p className="font-medium">{vuln.affected_service} (Port {vuln.port})</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">Recommendation:</p>
                <p className="text-gray-800">{vuln.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Ports Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Complete Port Scan Results</h3>
          <p className="text-gray-600 text-sm">
            Detailed results for all scanned ports
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Port</th>
                <th>State</th>
                <th>Service</th>
                <th>Version</th>
                <th>Protocol</th>
              </tr>
            </thead>
            <tbody>
              {results.ports.map((port, index) => (
                <tr key={index}>
                  <td className="font-mono font-medium">{port.port}</td>
                  <td>
                    <span className={`badge ${
                      port.state === 'open' ? 'badge-success' : 
                      port.state === 'closed' ? 'badge-danger' : 'badge-info'
                    }`}>
                      {port.state}
                    </span>
                  </td>
                  <td className="font-medium">{port.service}</td>
                  <td className="text-gray-600">{port.version || 'N/A'}</td>
                  <td className="text-gray-600">{port.protocol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Section */}
      <div className="card bg-gray-50 border-gray-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Export Results</h3>
          <p className="text-gray-600 mb-4">
            Download your scan results for further analysis or reporting
          </p>
          <div className="flex gap-4 justify-center">
            <button className="btn btn-primary">
              📄 Export as PDF
            </button>
            <button className="btn btn-secondary">
              📊 Export as CSV
            </button>
            <button className="btn btn-success">
              📋 Copy to Clipboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanResults; 