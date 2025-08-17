import React, { useState } from 'react';
import axios from 'axios';

const ScanForm = ({ onScanComplete, isLoading, setIsLoading }) => {
  const [formData, setFormData] = useState({
    target: '',
    portRange: '1-1000'
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const validateForm = () => {
    if (!formData.target.trim()) {
      setError('Target IP/Domain is required');
      return false;
    }
    
    // Basic IP/Domain validation
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!ipRegex.test(formData.target) && !domainRegex.test(formData.target)) {
      setError('Please enter a valid IP address or domain name');
      return false;
    }
    
    const portRangeRegex = /^(\d+)-(\d+)$/;
    if (!portRangeRegex.test(formData.portRange)) {
      setError('Please enter a valid port range (e.g., 1-1000)');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('Starting scan for:', formData.target, 'on ports:', formData.portRange);
      
      const response = await axios.post('/scan', {
        target: formData.target,
        port_range: formData.portRange
      });

      console.log('Scan completed successfully:', response.data);
      onScanComplete(response.data);
      
    } catch (err) {
      console.error('Scan failed:', err);
      setError(err.response?.data?.detail || 'Scan failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const commonPortRanges = [
    { label: 'Common Ports (1-1000)', value: '1-1000' },
    { label: 'Well-known Ports (1-1024)', value: '1-1024' },
    { label: 'All Ports (1-65535)', value: '1-65535' },
    { label: 'Web Services (80,443,8080,8443)', value: '80,443,8080,8443' },
    { label: 'Database Ports (3306,5432,6379)', value: '3306,5432,6379' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Target Input */}
      <div className="form-group">
        <label htmlFor="target" className="form-label">
          Target IP Address or Domain
        </label>
        <input
          type="text"
          id="target"
          name="target"
          value={formData.target}
          onChange={handleInputChange}
          placeholder="e.g., 192.168.1.1 or example.com"
          className="form-input"
          disabled={isLoading}
        />
        <p className="text-sm text-gray-500 mt-1">
          Enter the IP address or domain name you want to scan
        </p>
      </div>

      {/* Port Range Input */}
      <div className="form-group">
        <label htmlFor="portRange" className="form-label">
          Port Range
        </label>
        <select
          id="portRange"
          name="portRange"
          value={formData.portRange}
          onChange={handleInputChange}
          className="form-input"
          disabled={isLoading}
        >
          {commonPortRanges.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-500 mt-1">
          Select a predefined port range or enter custom range (e.g., 1-1000)
        </p>
      </div>

      {/* Custom Port Range Input */}
      <div className="form-group">
        <label htmlFor="customPortRange" className="form-label">
          Custom Port Range (Optional)
        </label>
        <input
          type="text"
          id="customPortRange"
          name="portRange"
          value={formData.portRange}
          onChange={handleInputChange}
          placeholder="e.g., 22,80,443 or 1-1000"
          className="form-input"
          disabled={isLoading}
        />
        <p className="text-sm text-gray-500 mt-1">
          Enter specific ports (comma-separated) or ranges (e.g., 1-1000)
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="spinner"></div>
              Scanning...
            </>
          ) : (
            <>
              🔍 Start Scan
            </>
          )}
        </button>
        
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-600">
            <div className="spinner"></div>
            <span>This may take a few minutes...</span>
          </div>
        )}
      </div>

      {/* Scan Information */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">ℹ️ Scan Information</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Port scanning using SYN scan (-sS) for stealth</li>
          <li>• Service version detection enabled</li>
          <li>• Vulnerability assessment included</li>
          <li>• Results cached for 24 hours</li>
        </ul>
      </div>
    </form>
  );
};

export default ScanForm;