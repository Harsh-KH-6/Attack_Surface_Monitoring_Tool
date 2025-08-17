@echo off
echo Starting Attack Surface Monitoring Tool Frontend...
echo.
echo Make sure you have Node.js installed.
echo.
cd frontend
echo Installing dependencies...
npm install
echo.
echo Starting React development server...
echo Frontend will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
npm start
pause 