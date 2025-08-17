from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import nmap
import json
import random
from typing import List, Dict, Any
import time

app = FastAPI(
    title="Attack Surface Monitoring Tool",
    description="A professional tool for scanning and monitoring network attack surfaces",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScanRequest(BaseModel):
    target: str
    port_range: str

class ScanResponse(BaseModel):
    target: str
    scan_time: str
    ports: List[Dict[str, Any]]
    services: List[Dict[str, Any]]
    vulnerabilities: List[Dict[str, Any]]
    summary: Dict[str, Any]

def generate_mock_vulnerabilities(open_ports: List[int]) -> List[Dict[str, Any]]:
    """Generate realistic mock vulnerability data for demonstration"""
    vuln_templates = [
        {
            "id": "CVE-2023-1234",
            "title": "SQL Injection in Web Application",
            "description": "The web application is vulnerable to SQL injection attacks through user input fields.",
            "severity": "High",
            "cvss_score": 8.5,
            "affected_service": "HTTP",
            "recommendation": "Implement input validation and use parameterized queries."
        },
        {
            "id": "CVE-2023-5678",
            "title": "Weak SSH Configuration",
            "description": "SSH service allows weak authentication methods and outdated protocols.",
            "severity": "Medium",
            "cvss_score": 6.8,
            "affected_service": "SSH",
            "recommendation": "Disable weak ciphers and enforce strong authentication."
        },
        {
            "id": "CVE-2023-9012",
            "title": "Default Credentials",
            "description": "Service is running with default or easily guessable credentials.",
            "severity": "Critical",
            "cvss_score": 9.1,
            "affected_service": "Telnet",
            "recommendation": "Change default passwords and implement strong authentication."
        },
        {
            "id": "CVE-2023-3456",
            "title": "Outdated Software Version",
            "description": "Running outdated software version with known security vulnerabilities.",
            "severity": "Medium",
            "cvss_score": 5.5,
            "affected_service": "FTP",
            "recommendation": "Update to the latest secure version."
        }
    ]
    
    vulnerabilities = []
    for port in open_ports[:3]:  # Limit to 3 vulnerabilities for demo
        vuln = random.choice(vuln_templates).copy()
        vuln["port"] = port
        vulnerabilities.append(vuln)
    
    return vulnerabilities

def detect_services(port: int) -> Dict[str, Any]:
    """Detect common services based on port numbers"""
    common_services = {
        21: "FTP",
        22: "SSH", 
        23: "Telnet",
        25: "SMTP",
        53: "DNS",
        80: "HTTP",
        110: "POP3",
        143: "IMAP",
        443: "HTTPS",
        993: "IMAPS",
        995: "POP3S",
        3306: "MySQL",
        5432: "PostgreSQL",
        6379: "Redis",
        8080: "HTTP-Alt",
        8443: "HTTPS-Alt"
    }
    
    service_name = common_services.get(port, "Unknown")
    version = f"Version {random.randint(1, 10)}.{random.randint(0, 9)}"
    
    return {
        "port": port,
        "service": service_name,
        "version": version,
        "state": "open",
        "protocol": "tcp"
    }

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Attack Surface Monitoring Tool API",
        "version": "1.0.0",
        "endpoints": {
            "POST /scan": "Perform network scan",
            "GET /": "API information"
        }
    }

@app.post("/scan", response_model=ScanResponse)
async def scan_target(request: ScanRequest):
    """
    Perform network scan on target IP/domain with specified port range
    """
    try:
        # Initialize nmap scanner
        nm = nmap.PortScanner()
        
        # Perform the scan
        print(f"Starting scan of {request.target} on ports {request.port_range}")
        nm.scan(request.target, request.port_range, arguments='-sT -sV --version-intensity 2')
        
        # Extract scan results
        ports = []
        services = []
        open_ports = []
        
        for host_addr in nm.all_hosts():
            host = nm[host_addr]
            for proto in host.all_protocols():
                lport = host[proto].keys()
                for port in lport:
                    port_info = host[proto][port]
                    port_data = {
                        "port": port,
                        "state": port_info['state'],
                        "service": port_info.get('name', 'unknown'),
                        "version": port_info.get('version', ''),
                        "protocol": proto
                    }
                    ports.append(port_data)
                    if port_info['state'] == 'open':
                        open_ports.append(port)
                        services.append(detect_services(port))
        
        # Generate mock vulnerabilities
        vulnerabilities = generate_mock_vulnerabilities(open_ports)
        
        # Calculate summary statistics
        total_ports = len(ports)
        open_count = len(open_ports)
        closed_count = total_ports - open_count
        
        # Count severity levels
        severity_counts = {"Critical": 0, "High": 0, "Medium": 0, "Low": 0}
        for vuln in vulnerabilities:
            severity_counts[vuln["severity"]] += 1
        
        summary = {
            "total_ports_scanned": total_ports,
            "open_ports": open_count,
            "closed_ports": closed_count,
            "services_detected": len(services),
            "vulnerabilities_found": len(vulnerabilities),
            "severity_breakdown": severity_counts
        }
        
        return ScanResponse(
            target=request.target,
            scan_time=time.strftime("%Y-%m-%d %H:%M:%S"),
            ports=ports,
            services=services,
            vulnerabilities=vulnerabilities,
            summary=summary
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Scan failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)