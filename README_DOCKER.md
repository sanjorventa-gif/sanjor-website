# Guía de Uso con Docker

Esta aplicación ha sido dockerizada para facilitar su despliegue y ejecución.

## Requisitos Previos

Para ejecutar este proyecto solo necesitas **Docker**.

Hemos incluido un script para facilitar su instalación:

1.  Ejecuta `install_prerequisites.bat` (intentará instalar Docker Desktop automáticamente).
2.  **Reinicia tu computadora** si se instaló Docker.
3.  Abre **Docker Desktop** y espera a que inicie.

## Estructura

- **Backend**: FastAPI (Puerto 8000)
- **Frontend**: React + Nginx (Puerto 80)
- **Base de Datos**: SQLite (Persistida en `./backend/data/sql_app.db`)

## Instrucciones de Ejecución

1.  **Construir y levantar los contenedores:**

    Abre una terminal en la raíz del proyecto (donde está `docker-compose.yml`) y ejecuta:

    ```bash
    docker compose up --build -d
    ```

    El flag `-d` ejecuta los contenedores en segundo plano (detached mode).

2.  **Verificar que todo esté corriendo:**

    ```bash
    docker compose ps
    ```

    Deberías ver dos servicios: `sanjor_backend` y `sanjor_frontend` en estado `Up`.

3.  **Acceder a la aplicación:**

    - **Frontend (Web):** Abre tu navegador en [http://localhost](http://localhost)
    - **Backend (API Docs):** Abre tu navegador en [http://localhost:8000/docs](http://localhost:8000/docs)

4.  **Ver logs (opcional):**

    Si necesitas ver qué está pasando:

    ```bash
    docker compose logs -f
    ```

5.  **Detener la aplicación:**

    ```bash
    docker compose down
    ```

## Notas Importantes

- **Base de Datos**: La base de datos se guarda en el archivo local `backend/data/sql_app.db`. Gracias al volumen configurado en Docker, los datos **no se pierden** al reiniciar los contenedores.
- **Cambios en el código**: Si modificas el código, necesitarás volver a ejecutar `docker-compose up --build -d` para reconstruir las imágenes con los cambios.
