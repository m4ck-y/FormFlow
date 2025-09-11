# 🐳 Dockerfile - FormFlow Backend

# Imagen optimizada para producción con uv como gestor de paquetes

# ⚠️ CRÍTICO: Esta versión DEBE coincidir con .python-version
# Si no coincide, uv descargará otra versión de Python, duplicando el tamaño de la imagen
# .python-version = 3.13 → FROM python:3.13-bookworm
FROM python:3.13-bookworm

# Copiar uv (gestor de paquetes Python ultrarrápido) desde imagen oficial
COPY --from=ghcr.io/astral-sh/uv:0.8.8 /uv /uvx /bin/

# Establecer directorio de trabajo
WORKDIR /app

# === OPTIMIZACIÓN DE CACHE DE LAYERS ===
# Copiar archivos de configuración primero para aprovechar cache de Docker
# Si pyproject.toml/uv.lock no cambian, esta layer se reutiliza
COPY pyproject.toml uv.lock ./

# Instalar dependencias usando uv (mucho más rápido que pip)
# --locked: usa exactamente las versiones del uv.lock
RUN uv sync --locked

# Copiar código fuente después de instalar dependencias
# Esto permite que cambios en el código no invaliden el cache de dependencias
COPY . .

# Exponer puerto 8000 para la aplicación FastAPI
EXPOSE 8000


# Comando de ejecución optimizado para producción
# --host 0.0.0.0: permite conexiones desde fuera del contenedor
# --port 8000: puerto estándar para APIs
CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
