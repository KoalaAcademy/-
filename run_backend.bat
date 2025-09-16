@echo off
REM Added Windows batch script for easy backend startup
echo Starting Flask Backend...
cd /d "%~dp0"
if exist .venv\Scripts\activate.bat (
    call .venv\Scripts\activate.bat
) else (
    echo Virtual environment not found. Please create one first.
    pause
    exit /b 1
)
set FLASK_APP=backend/app.py
set FLASK_ENV=development
set FLASK_DEBUG=1
python backend/app.py
pause
