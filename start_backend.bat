@echo off
echo Starting Attack Surface Monitoring Tool Backend...
echo.
echo Make sure you have Python and the required dependencies installed.
echo.
cd backend
echo Creating virtual environment...
python -m venv venv
echo.
echo Activating virtual environment...
call venv\Scripts\activate
echo.
echo Installing dependencies...
pip install -r requirements.txt
echo.
echo Starting FastAPI server...
echo Backend will be available at: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.
python main.py
pause 