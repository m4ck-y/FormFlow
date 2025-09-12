# FormFlow - Backend

![Python](https://img.shields.io/badge/python-3.10+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.103.2-green.svg)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0-red.svg)
![Pydantic](https://img.shields.io/badge/Pydantic-2.0-orange.svg)

## 📝 ¿De qué va el proyecto?

**FormFlow** es un servicio de backend (API) diseñado para la creación y gestión de formularios y encuestas dinámicas. Su principal objetivo es permitir la construcción de formularios complejos que pueden estar compuestos por preguntas directas o estructurados en múltiples secciones, cada una con su propio conjunto de preguntas.

El proyecto está construido siguiendo principios de **Arquitectura Limpia (Clean Architecture)**, lo que garantiza una alta cohesión, bajo acoplamiento y una excelente mantenibilidad y escalabilidad.

---

## ✨ Características Principales

- **Creación Dinámica de Formularios**: Construye formularios con una lista de preguntas o anidando secciones.
- **Validación Robusta**: Utiliza Pydantic para una validación estricta y clara de los datos de entrada y salida.
- **Arquitectura por Capas**: Separación clara de responsabilidades (Dominio, Aplicación, Infraestructura) para un código más limpio y fácil de mantener.
- **Abstracción de Base de Datos**: Gracias a SQLAlchemy, el sistema es agnóstico a la base de datos y está preparado para funcionar con PostgreSQL y SQLite.
- **API Asíncrona**: Construido sobre FastAPI para ofrecer un alto rendimiento y soporte nativo para operaciones asíncronas.

---

## 🏛️ Arquitectura del Proyecto

El backend sigue una **Arquitectura Limpia** (o Hexagonal) dividida en tres capas principales. Esta separación es clave para el plan de desarrollo, ya que permite que la lógica de negocio (el corazón del proyecto) no dependa de detalles técnicos como la base de datos o el framework web.

1.  **Capa de Dominio (`app/*/domain`)**
    - **Propósito**: Contiene la lógica de negocio pura y las reglas del sistema. Es el núcleo de la aplicación.
    - **Componentes**:
        - **Esquemas Pydantic (`schemas`)**: Definen las estructuras de datos y las reglas de validación (ej. `SchemaCreateAPIForm`).
        - **Interfaces de Repositorio (`repository`)**: Contratos que definen las operaciones de persistencia que la capa de aplicación puede usar, sin conocer la implementación.

2.  **Capa de Aplicación (`app/*/application`)**
    - **Propósito**: Orquesta los casos de uso del sistema. Actúa como un intermediario entre la infraestructura y el dominio.
    - **Componentes**:
        - **Lógica de Aplicación (`BaseLayerApplication`)**: Coordina la obtención de datos, llama a la lógica de dominio y delega la persistencia a los repositorios.

3.  **Capa de Infraestructura (`app/*/infrastructure`)**
    - **Propósito**: Contiene todos los detalles técnicos y puntos de contacto con el mundo exterior.
    - **Componentes**:
        - **API/Servicio (`service`)**: Endpoints de FastAPI que exponen los casos de uso al cliente.
        - **Base de Datos (`database`)**: Modelos de SQLAlchemy (`BaseModel`) y la implementación concreta de los repositorios que interactúan con la base de datos.
        - **Configuración (`config`)**: Gestión de la conexión a la base de datos y variables de entorno.

---

## 💻 Pila Tecnológica

- **Framework**: **FastAPI**
- **ORM**: **SQLAlchemy**
- **Validación de Datos**: **Pydantic V2**
- **Servidor ASGI**: **Uvicorn**
- **Base de Datos**: Preparado para **PostgreSQL** y **SQLite**

---

## 📁 Estructura de Archivos

La estructura de directorios refleja la arquitectura por capas, organizando el código por entidad de negocio (`form`, `section`, `question`).

```
FormFlow/
├── app/
│   ├── base/             # Clases base genéricas para todas las capas
│   │   ├── application/  # Lógica de aplicación base (CRUD)
│   │   ├── domain/       # Esquemas e interfaces de dominio base
│   │   └── infrastructure/ # Componentes de infraestructura base
│   ├── form/             # Módulo de la entidad 'Form'
│   │   ├── application/
│   │   ├── domain/
│   │   └── infrastructure/
│   ├── question/         # Módulo de la entidad 'Question'
│   ├── section/          # Módulo de la entidad 'Section'
│   ├── __init__.py
│   └── main.py           # Punto de entrada de la aplicación FastAPI
├── .env.example          # Plantilla para variables de entorno
├── requirements.txt      # Dependencias del proyecto
└── ...
```

---

## 🚀 Cómo Empezar

1.  **Clonar el repositorio**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd FormFlow/backend
    ```

2.  **Crear y activar un entorno virtual**
    ```bash
    python -m venv .venv
    source .venv/bin/activate
    # En Windows: .venv\Scripts\activate
    ```

3.  **Instalar dependencias**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configurar variables de entorno**
    Copia el archivo `.env.example` a `.env` y configura la variable `DATABASE_URL`.
    ```bash
    cp .env.example .env
    ```

5.  **Ejecutar la aplicación**
    ```bash
    uvicorn app.main:app --reload
    ```

6.  **Acceder a la documentación de la API**
    Abre tu navegador y ve a http://127.0.0.1:8000/docs para ver la documentación interactiva de Swagger UI.

---

## 🐳 Ejecución con Docker

### Construcción y Ejecución

#### 1. Construir la imagen Docker
```bash
sudo docker build -t formflow_backend .
```

#### 2. Ejecutar el contenedor

**Opción A: Usando archivo .env (Recomendado)**
```bash
sudo docker run -p 8000:8000 --env-file .env --name formflow_backend formflow_backend
```

**Opción B: Pasando variables de entorno directamente**
```bash
sudo docker run -p 8000:8000 \
  -e SQLALCHEMY_DB_URL="postgresql+psycopg2://<db_user>:<db_password>@<db_host>:<db_port>/<db_name>?sslmode=require" \
  -e DEBUG=True \
  --name formflow_backend \
  formflow_backend
```

### Gestión de Contenedores

#### Ver contenedores (activos y detenidos)
```bash
sudo docker ps -a
```

#### Detener contenedor
```bash
sudo docker stop formflow_backend
```

#### Eliminar contenedor
```bash
sudo docker rm formflow_backend
# O por ID: sudo docker rm 243bb3d93489
```

#### Ver logs del contenedor
```bash
sudo docker logs formflow_backend
sudo docker logs -f formflow_backend  # Seguir logs en tiempo real
```

### Gestión de Imágenes

#### Listar imágenes
```bash
sudo docker images
```

#### Eliminar imagen
```bash
sudo docker rmi formflow_backend
# O por ID: sudo docker rmi 6cf0c487c619
```

#### Limpiar imágenes no utilizadas
```bash
sudo docker image prune
sudo docker system prune  # Limpieza completa (contenedores, imágenes, redes)
```

### Comandos de Desarrollo

#### Reconstruir y ejecutar (desarrollo rápido)
```bash
# Detener y eliminar contenedor anterior
sudo docker stop formflow_backend 2>/dev/null || true
sudo docker rm formflow_backend 2>/dev/null || true

# Reconstruir imagen
sudo docker build -t formflow_backend .

# Ejecutar nuevo contenedor
sudo docker run -p 8000:8000 --env-file .env --name formflow_backend formflow_backend
```

#### Ejecutar en modo interactivo (debugging)
```bash
sudo docker run -it -p 8000:8000 --env-file .env --name formflow_backend formflow_backend /bin/bash
```

### Acceso a la Aplicación

Una vez que el contenedor esté ejecutándose:
- **API**: http://localhost:8000
- **Documentación Swagger**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Notas Importantes

- **Variables de entorno**: Asegúrate de que tu archivo `.env` no contenga comillas dobles alrededor de los valores (especialmente para `SQLALCHEMY_DB_URL`)
- **Puerto**: El contenedor expone el puerto 8000, mapeado al puerto 8000 del host
- **Persistencia**: Los datos se almacenan en la base de datos externa (Neon), no en el contenedor
- **Logs**: Usa `docker logs` para ver la salida de la aplicación y debugging

---

## 🗺️ Plan y Próximos Pasos

- **Implementar Autenticación y Autorización**: Proteger los endpoints con JWT u OAuth2.
- **Completar la Auditoría**: Activar y utilizar los campos `created_by`, `updated_by` para registrar qué usuario realiza cada acción.
- **Testing**: Desarrollar una suite de tests unitarios y de integración para garantizar la fiabilidad del código.
- **Manejo de Respuestas**: Implementar un sistema para recolectar y almacenar las respuestas de los formularios.
- **CI/CD**: Configurar un pipeline de Integración Continua y Despliegue Continuo.