import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ScanResults from './components/ScanResults';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [scanResults, setScanResults] = useState(null);

  const handleScanComplete = (results) => {
    setScanResults(results);
    setCurrentView('results');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onScanComplete={handleScanComplete} />;
      case 'results':
        return <ScanResults results={scanResults} onBack={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard onScanComplete={handleScanComplete} />;
    }
  };

  return (
    <div className="App">
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1 p-8">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
}

export default App; 