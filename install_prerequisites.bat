@echo off
echo ==========================================
echo   Instalador de Requisitos - SAN JOR
echo ==========================================
echo.

:: 1. Verificar si Docker ya existe
where docker >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Docker ya esta instalado.
    echo.
    echo Puedes ejecutar 'start_docker.bat' para iniciar la aplicacion.
    pause
    exit /b
)

:: 2. Si no existe, intentar instalar con Winget
echo [!] Docker no fue encontrado.
echo Intentando instalar Docker Desktop automaticamente via Winget...
echo.

where winget >nul 2>nul
if %errorlevel% neq 0 (
    echo [X] Winget no esta disponible en este sistema.
    goto :ManualInstall
)

:: Ejecutar instalacion
winget install -e --id Docker.DockerDesktop
if %errorlevel% neq 0 (
    echo.
    echo [X] Hubo un error en la instalacion automatica.
    goto :ManualInstall
)

echo.
echo ==========================================
echo   INSTALACION FINALIZADA
echo ==========================================
echo.
echo Docker Desktop se ha instalado correctamente.
echo.
echo [IMPORTANTE]
echo 1. Debes REINICIAR tu computadora ahora.
echo 2. Despues de reiniciar, abre "Docker Desktop" y espera a que inicie.
echo 3. Finalmente, ejecuta 'start_docker.bat'.
echo.
pause
exit /b

:ManualInstall
echo.
echo ==========================================
echo   INSTALACION MANUAL REQUERIDA
echo ==========================================
echo.
echo No pudimos instalar Docker automaticamente.
echo Por favor, descargalo e instalalo manualmente desde:
echo.
echo https://www.docker.com/products/docker-desktop
echo.
echo Abriendo navegador...
start https://www.docker.com/products/docker-desktop
pause
