# 🛡️ Attack Surface Monitoring Tool

A professional-grade network security scanning and monitoring application built for class presentation. This tool provides comprehensive network reconnaissance capabilities with a modern, responsive web interface.

## ✨ Features

- **Network Port Scanning**: Comprehensive port scanning using nmap
- **Service Detection**: Automatic service and version identification
- **Vulnerability Assessment**: Mock vulnerability reports for demonstration
- **Interactive Charts**: Visual representation of scan results using Chart.js
- **Professional UI**: Modern, responsive design with professional styling
- **Real-time Results**: Live scan progress and results display

## 🏗️ Architecture

- **Frontend**: React.js with custom CSS (Tailwind-like utilities)
- **Backend**: FastAPI with Python nmap integration
- **Charts**: Chart.js for data visualization
- **Styling**: Custom CSS with utility classes

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- nmap installed on your system
- Administrative privileges (for port scanning)

## 🚀 Quick Start

### 1. Clone and Setup

```bash
git clone <repository-url>
cd CS_Project
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
python main.py
```

The backend will be available at `http://localhost:8000`

### 3. Frontend Setup

```bash
# Open new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend will be available at `http://localhost:3000`

## 🔧 Configuration

### Backend Configuration

The backend uses the following default settings:
- **Host**: 0.0.0.0 (all interfaces)
- **Port**: 8000
- **CORS**: Enabled for localhost:3000
- **Nmap Arguments**: `-sS -sV --version-intensity 2`

### Frontend Configuration

The frontend is configured to:
- **Proxy**: Automatically forwards API calls to backend
- **Port**: 3000
- **Charts**: Responsive Chart.js visualizations

## 📱 Usage

### 1. Dashboard
- Navigate to the dashboard to see overview statistics
- View recent scan history and quick tips

### 2. Network Scanning
- Enter target IP address or domain name
- Select port range (predefined or custom)
- Click "Start Scan" to begin reconnaissance

### 3. Results Analysis
- View comprehensive scan results
- Analyze open ports and services
- Review vulnerability reports
- Export results for further analysis

## 🎯 Example Scans

### Local Network Testing
```
Target: 192.168.1.1
Port Range: 1-1000
```

### Web Application Testing
```
Target: example.com
Port Range: 80,443,8080,8443
```

### Database Testing
```
Target: 10.0.0.1
Port Range: 3306,5432,6379
```

## 🔒 Security Considerations

⚠️ **Important**: This tool is designed for educational purposes and legitimate security testing.

- **Legal Use Only**: Only scan networks you own or have explicit permission to test
- **Rate Limiting**: Be respectful of network resources
- **Administrative Access**: Some scans require elevated privileges
- **Network Policies**: Respect corporate and institutional security policies

## 🛠️ Development

### Project Structure
```
CS_Project/
├── backend/
│   ├── main.py              # FastAPI application
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── App.js          # Main application
│   │   └── index.js        # Entry point
│   ├── public/             # Static assets
│   └── package.json        # Node.js dependencies
└── README.md               # This file
```

### Key Components

#### Backend (`backend/main.py`)
- FastAPI application with CORS support
- `/scan` endpoint for network scanning
- nmap integration with python-nmap
- Mock vulnerability generation
- Comprehensive error handling

#### Frontend Components
- **Dashboard**: Main interface with statistics and scan form
- **ScanForm**: Input validation and API integration
- **ScanResults**: Results display with charts and tables
- **Sidebar**: Navigation and branding

### Adding Features

#### New Scan Types
1. Add new scan method in `backend/main.py`
2. Create corresponding frontend form component
3. Update API endpoints and response models

#### Custom Visualizations
1. Install additional Chart.js plugins
2. Create new chart components
3. Integrate with scan results data

## 🐛 Troubleshooting

### Common Issues

#### Backend Won't Start
```bash
# Check Python version
python --version

# Verify dependencies
pip list

# Check nmap installation
nmap --version
```

#### Frontend Build Errors
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version
```

#### Scan Failures
- Ensure target is reachable
- Check firewall settings
- Verify administrative privileges
- Review nmap installation

### Debug Mode

Enable debug logging in the backend:
```python
# In main.py
import logging
logging.basicConfig(level=logging.DEBUG)
```

## 📊 Performance

### Scan Performance
- **Small Range (1-1000)**: ~30 seconds
- **Medium Range (1-10000)**: ~2-3 minutes
- **Full Range (1-65535)**: ~10-15 minutes

### Optimization Tips
- Use specific port ranges for faster scans
- Implement scan queuing for multiple targets
- Cache results to avoid duplicate scans

## 🔮 Future Enhancements

- **Real-time Monitoring**: Continuous network surveillance
- **Alert System**: Automated vulnerability notifications
- **Report Generation**: PDF/Word export functionality
- **Integration**: SIEM and ticketing system integration
- **Advanced Scans**: Custom script execution and payload testing

## 📚 Educational Resources

- **Network Security**: Understanding port scanning and reconnaissance
- **Web Development**: React.js and FastAPI best practices
- **Data Visualization**: Chart.js implementation
- **API Design**: RESTful API development with FastAPI

## 🤝 Contributing

This project is designed for educational purposes. Contributions are welcome for:
- Bug fixes and improvements
- Additional scan types
- Enhanced visualizations
- Documentation updates



---

**⚠️ Disclaimer**: This tool is for educational and legitimate security testing purposes only. Users are responsible for ensuring compliance with applicable laws and obtaining proper authorization before scanning any networks. 