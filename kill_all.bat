@echo off
echo Killing all Python processes (Backend)...
taskkill /F /IM python.exe /T
echo Killing all Node.js processes (Frontend)...
taskkill /F /IM node.exe /T
echo.
echo All services stopped. You can now run start_all.bat again.
pause
