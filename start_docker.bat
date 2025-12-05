@echo off
echo Verificando instalacion de Docker...

where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Docker no esta instalado o no esta en el PATH.
    echo Por favor, instala Docker Desktop desde: https://www.docker.com/products/docker-desktop
    echo Una vez instalado, reinicia tu computadora e intenta de nuevo.
    pause
    exit /b
)

docker info >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Docker Desktop no esta ejecutandose.
    echo Por favor, inicia Docker Desktop y espera a que termine de cargar.
    echo Luego intenta de nuevo.
    pause
    exit /b
)

echo Iniciando SAN JOR Website con Docker...
docker compose up --build -d
if %errorlevel% neq 0 (
    echo "docker compose" fallo, intentando con "docker-compose"...
    docker-compose up --build -d
)

echo.
echo Contenedores iniciados. Estado actual:
docker compose ps
if %errorlevel% neq 0 (
    docker-compose ps
)

echo.
echo Frontend disponible en: http://localhost
echo Backend API disponible en: http://localhost:8000/docs
pause
