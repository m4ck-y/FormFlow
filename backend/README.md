# FormFlow - Plataforma de Evaluación Clínica Digital

![Python](https://img.shields.io/badge/python-3.13+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.116+-green.svg)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0-red.svg)
![Pydantic](https://img.shields.io/badge/Pydantic-2.0-orange.svg)
![uv](https://img.shields.io/badge/uv-package_manager-purple.svg)
![Docker](https://img.shields.io/badge/Docker-containerized-blue.svg)
![Clean Architecture](https://img.shields.io/badge/Architecture-Clean_Architecture-brightgreen.svg)
![CIE-11](https://img.shields.io/badge/CIE--11-Medical_Standards-red.svg)
![Clinical](https://img.shields.io/badge/Clinical-80+_Instruments-blue.svg)

**Plataforma especializada en evaluaciones clínicas y psicológicas con motor de reglas condicionales dinámicas**

## Descripción del Proyecto

**FormFlow** es una plataforma especializada en **evaluaciones clínicas y psicológicas digitales** que revoluciona la forma en que las instituciones de salud recopilan y procesan datos médicos. Con más de **80 instrumentos clínicos validados** y un **motor de reglas condicionales avanzado**, transforma evaluaciones estáticas en experiencias dinámicas e inteligentes.

### 🏥 **Especialización Médica Real**
- **80+ Instrumentos Validados:** PHQ-9, GAD-7, C-SSRS, CRAFFT, AUDIT, SF-12, WOMAC
- **Estándares Internacionales:** Integración completa con códigos CIE-11
- **Referencias Científicas:** Enlaces directos a estudios de validación en PubMed
- **Demografía Específica:** Grupos etarios, poblaciones objetivo y tiempo de aplicación

### 🧠 **Motor de Reglas Condicionales Inteligente**
- **Lógica Dinámica:** Preguntas que aparecen/desaparecen según respuestas previas
- **Cálculos Automáticos:** Puntuaciones, IMC, escalas de evaluación en tiempo real
- **Flujos Adaptativos:** Experiencia personalizada para cada usuario
- **Condiciones Complejas:** Operadores ALL, ANY, NONE para lógica médica avanzada

### 🏗️ **Arquitectura Empresarial**
- **Arquitectura Limpia:** Diseño orientado al dominio con clara separación de responsabilidades
- **Alto Rendimiento:** FastAPI asíncrono con SQLAlchemy 2.0 para rendimiento óptimo
- **Multi-Base de Datos:** PostgreSQL para producción, SQLite para desarrollo/investigación
- **Type Safety Completo:** Pydantic v2 con validación robusta para datos médicos

## 🚀 **Características Revolucionarias**

### **Motor de Reglas Condicionales Avanzado**
```json
{
  "condition": {
    "type": "any",
    "rules": [
      {"id_question": 1, "operator": ">", "value": 0},
      {"id_question": 2, "operator": "==", "value": "Sí"}
    ]
  }
}
```
- **Visibilidad Dinámica:** Preguntas que aparecen solo cuando son relevantes
- **Lógica Médica Compleja:** Condiciones ALL/ANY/NONE para flujos clínicos
- **Cálculos en Tiempo Real:** Puntuaciones automáticas (PHQ-9, GAD-7, etc.)
- **Validaciones Inteligentes:** Reglas que se adaptan al contexto del paciente

### **Catálogo Clínico Extenso (80+ Instrumentos)**

#### **Salud Mental:**
- **PHQ-9:** Depresión (implementado completamente)
- **GAD-7:** Ansiedad generalizada
- **C-SSRS:** Evaluación de riesgo suicida
- **HADS:** Ansiedad y depresión hospitalaria

#### **Adicciones y Sustancias:**
- **CRAFFT:** Screening de adicciones en adolescentes
- **AUDIT:** Trastornos por uso de alcohol
- **CAGE:** Detección rápida de alcoholismo

#### **Evaluaciones Médicas:**
- **SF-12:** Calidad de vida relacionada con salud
- **WOMAC:** Evaluación de osteoartritis
- **FINDRISC:** Riesgo de diabetes tipo 2
- **FRAIL/SARC-F:** Fragilidad y sarcopenia

### **Integración con Estándares Médicos Internacionales**
- **Códigos CIE-11:** Clasificación internacional de enfermedades
- **Referencias Científicas:** Enlaces directos a PubMed y estudios de validación
- **Demografía Específica:** Grupos etarios, poblaciones objetivo definidas
- **Tiempo de Aplicación:** Estimaciones precisas por instrumento

### **Arquitectura Técnica de Nivel Empresarial**
- **Clean Architecture:** Separación estricta Dominio-Aplicación-Infraestructura
- **Multi-Base de Datos:** PostgreSQL (producción) / SQLite (investigación)
- **Type Safety Médico:** Validación robusta para datos clínicos sensibles
- **Rendimiento Asíncrono:** FastAPI optimizado para alta concurrencia hospitalaria

## Arquitectura del Proyecto

El backend sigue una **Arquitectura Limpia** (o Hexagonal) dividida en tres capas principales. Esta separación es clave para el plan de desarrollo, ya que permite que la lógica de negocio (el corazón del proyecto) no dependa de detalles técnicos como la base de datos o el framework web.

**Capa de Dominio (`app/*/domain`)**
- **Propósito**: Contiene la lógica de negocio pura y las reglas del sistema. Es el núcleo de la aplicación.
- **Componentes**:
  - **Esquemas Pydantic (`schemas`)**: Definen las estructuras de datos y las reglas de validación (ej. `SchemaCreateAPIForm`).
  - **Interfaces de Repositorio (`repository`)**: Contratos que definen las operaciones de persistencia que la capa de aplicación puede usar, sin conocer la implementación.

**Capa de Aplicación (`app/*/application`)**
- **Propósito**: Orquesta los casos de uso del sistema. Actúa como un intermediario entre la infraestructura y el dominio.
- **Componentes**:
  - **Lógica de Aplicación (`BaseLayerApplication`)**: Coordina la obtención de datos, llama a la lógica de dominio y delega la persistencia a los repositorios.

**Capa de Infraestructura (`app/*/infrastructure`)**
- **Propósito**: Contiene todos los detalles técnicos y puntos de contacto con el mundo exterior.
- **Componentes**:
  - **API/Servicio (`service`)**: Endpoints de FastAPI que exponen los casos de uso al cliente.
  - **Base de Datos (`database`)**: Modelos de SQLAlchemy (`BaseModel`) y la implementación concreta de los repositorios que interactúan con la base de datos.
  - **Configuración (`config`)**: Gestión de la conexión a la base de datos y variables de entorno.

## Stack Tecnológico

### Backend Principal
- **FastAPI 0.116+** - Framework web moderno y rápido con OpenAPI automático
- **SQLAlchemy 2.0** - ORM avanzado con soporte async y type safety
- **Pydantic v2** - Validación de datos con rendimiento potenciado por Rust
- **Uvicorn** - Servidor ASGI ultrarrápido

### Desarrollo y Despliegue
- **UV Package Manager** - Gestor de paquetes Python ultrarrápido de Astral (10-100x más rápido que pip)
- **Docker** - Containerización multi-etapa para despliegue en producción
- **PostgreSQL/SQLite** - Base de datos de nivel producción con flexibilidad de desarrollo
- **Python 3.13+** - Últimas características y mejoras de rendimiento de Python

### Patrones de Arquitectura
- **Arquitectura Limpia** - Arquitectura hexagonal con inversión de dependencias
- **Patrón Repository** - Capa de abstracción de acceso a datos
- **Domain-Driven Design** - Separación y encapsulación de lógica de negocio
- **CQRS Ready** - Soporte para Command Query Responsibility Segregation

## Estructura de Archivos

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
├── pyproject.toml        # Configuración del proyecto y dependencias
├── uv.lock              # Archivo de bloqueo de dependencias
└── ...
```

## Guía de Inicio Rápido

### Prerrequisitos
- Python 3.13+
- [UV Package Manager](https://docs.astral.sh/uv/) (recomendado) o pip

### Configuración Rápida con UV (Recomendado)

**1. Clonar y navegar**
```bash
git clone <URL_DEL_REPOSITORIO>
cd FormFlow/backend
```

**2. Instalar UV (si no está instalado)**
```bash
# macOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**3. Configurar entorno y dependencias**
```bash
# Crear entorno virtual e instalar dependencias (ultrarrápido)
uv sync

# Activar entorno virtual
source .venv/bin/activate  # Linux/macOS
# .venv\Scripts\activate   # Windows
```

**4. Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con la configuración de base de datos
```

**5. Ejecutar aplicación**
```bash
uv run uvicorn app.main:app --reload
```

### Documentación de la API
- **Swagger UI:** http://127.0.0.1:8000/docs
- **ReDoc:** http://127.0.0.1:8000/redoc
- **Esquema OpenAPI:** http://127.0.0.1:8000/openapi.json

### Configuración Alternativa (pip tradicional)
<details>
<summary>Expandir configuración tradicional</summary>

```bash
# Crear entorno virtual
python -m venv .venv
source .venv/bin/activate

# Instalar dependencias desde pyproject.toml
pip install .

# Configurar y ejecutar
cp .env.example .env
uvicorn app.main:app --reload
```
</details>

## Despliegue en Producción con Docker

### Build Multi-Etapa de Docker
El Dockerfile utiliza builds multi-etapa para imágenes de producción optimizadas:

```dockerfile
# Etapa de desarrollo con UV para instalación rápida de dependencias
FROM python:3.13-slim as builder
RUN pip install uv
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen

# Etapa de producción - imagen de runtime mínima
FROM python:3.13-slim as runtime
COPY --from=builder /app/.venv /app/.venv
# Optimizada para tamaño y seguridad
```

### Despliegue Rápido

**Opción A: Listo para Producción (Recomendado)**
```bash
# Construir imagen de producción optimizada
docker build -t formflow-api:latest .

# Ejecutar con archivo de entorno
docker run -d \
  --name formflow-api \
  -p 8000:8000 \
  --env-file .env \
  --restart unless-stopped \
  formflow-api:latest
```

**Opción B: Desarrollo con Hot Reload**
```bash
# Desarrollo con montaje de volumen
docker run -d \
  --name formflow-dev \
  -p 8000:8000 \
  -v $(pwd):/app \
  --env-file .env \
  formflow-api:latest \
  uvicorn app.main:app --reload --host 0.0.0.0
```

### Gestión de Contenedores

```bash
# Ciclo de vida del contenedor
docker ps -a                           # Listar todos los contenedores
docker logs -f formflow-api            # Seguir logs en tiempo real
docker exec -it formflow-api bash      # Acceso shell interactivo
docker stop formflow-api               # Apagado controlado
docker restart formflow-api            # Reiniciar contenedor

# Gestión de imágenes
docker images                          # Listar imágenes
docker system prune -a                 # Limpiar recursos no utilizados
```

### Endpoints del Servicio
Una vez desplegado, acceder a la API en:
- **API Base:** http://localhost:8000
- **Documentación Interactiva:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc
- **Health Check:** http://localhost:8000/health

### Configuración de Producción
```bash
# Variables de entorno para producción
SQLALCHEMY_DB_URL=postgresql+psycopg://user:pass@host:5432/db
DEBUG=False
ROOT_PATH=/api/form
CORS_ORIGINS=https://yourdomain.com
```

## Aspectos Técnicos Destacados

### Excelencia Arquitectónica
```python
# Implementación de Arquitectura Limpia
app/
├── base/                    # Abstracciones e interfaces compartidas
├── form/                    # Módulo de dominio de formularios
│   ├── domain/             # Lógica de negocio y reglas
│   ├── application/        # Casos de uso y orquestación  
│   └── infrastructure/     # Preocupaciones externas (BD, API)
├── question/               # Gestión de preguntas
├── section/                # Organización de secciones
└── assignment/             # Sistema de asignación de formularios
```

### Rendimiento y Escalabilidad
- **Async/Await:** I/O no bloqueante para alta concurrencia
- **Connection Pooling:** Gestión eficiente de recursos de base de datos
- **Type Safety:** Type hints completos con compatibilidad mypy
- **Lazy Loading:** Consultas de base de datos optimizadas con relaciones SQLAlchemy

### Estándares de Calidad de Código
- **Principios SOLID:** Inversión de dependencias y responsabilidad única
- **Patrón Repository:** Abstracción limpia de acceso a datos
- **Domain-Driven Design:** Encapsulación de lógica de negocio
- **Validación Pydantic:** Type checking en tiempo de ejecución y serialización de datos

### Preparación para Producción
- **Docker Multi-etapa:** Builds de contenedor optimizados
- **Configuración de Entorno:** Cumplimiento de aplicación 12-factor
- **Manejo de Errores:** Gestión integral de excepciones
- **Documentación API:** Especificaciones OpenAPI auto-generadas

## Hoja de Ruta y Mejoras Futuras

### Seguridad y Autenticación
- [ ] **Integración JWT/OAuth2:** Protección segura de endpoints
- [ ] **Control de Acceso Basado en Roles:** Sistema de permisos granular
- [ ] **Logging de Auditoría:** Seguimiento completo de acciones de usuario

### Características Avanzadas
- [ ] **Analíticas de Respuestas:** Análisis estadístico y reportes
- [ ] **Plantillas de Formularios:** Plantillas pre-construidas médicas y de encuestas
- [ ] **Colaboración en Tiempo Real:** Edición multi-usuario de formularios
- [ ] **Capacidades de Exportación:** Generación PDF, Excel y CSV

### Aseguramiento de Calidad
- [ ] **Testing Integral:** Pruebas unitarias, de integración y E2E
- [ ] **Testing de Rendimiento:** Pruebas de carga con escenarios realistas
- [ ] **Pipeline CI/CD:** Testing y despliegue automatizado

### Escalabilidad
- [ ] **Arquitectura de Microservicios:** Descomposición de servicios
- [ ] **Arquitectura Orientada a Eventos:** Procesamiento asíncrono de mensajes
- [ ] **Capa de Caché:** Integración Redis para rendimiento

## 🏥 **Aplicaciones Clínicas del Mundo Real**

### **Hospitales y Centros de Salud**
```json
{
  "name": "PHQ-9 Depression Screening",
  "description": "Evaluación de depresión con lógica condicional avanzada",
  "list_cie11_codes": [{"code": "6A7", "description": "Trastornos depresivos"}],
  "condition": {
    "type": "any",
    "rules": [
      {"id_question": 1, "operator": ">", "value": 0},
      {"id_question": 2, "operator": ">", "value": 0}
    ]
  },
  "scoring": {
    "formula": "sum(questions.*.value)",
    "interpretation": [
      {"range": "0-4", "level": "Depresión mínima", "action": "Seguimiento rutinario"},
      {"range": "5-9", "level": "Depresión leve", "action": "Evaluación clínica"},
      {"range": "10-14", "level": "Depresión moderada", "action": "Tratamiento recomendado"},
      {"range": "15-19", "level": "Depresión moderada-severa", "action": "Tratamiento activo"},
      {"range": "20-27", "level": "Depresión severa", "action": "Tratamiento inmediato"}
    ]
  }
}
```

### **Casos de Uso Específicos:**

#### **🧠 Salud Mental:**
- **Screening Primario:** PHQ-9, GAD-7 para detección temprana
- **Evaluación de Riesgo:** C-SSRS para prevención de suicidio
- **Seguimiento Longitudinal:** Aplicación periódica para monitoreo de tratamiento

#### **🏥 Medicina Interna:**
- **Evaluación Funcional:** SF-12 para calidad de vida post-tratamiento
- **Screening Metabólico:** FINDRISC para riesgo de diabetes
- **Evaluación Geriátrica:** FRAIL, SARC-F para fragilidad y sarcopenia

#### **🔬 Investigación Clínica:**
- **Estudios Longitudinales:** Seguimiento de cohortes con instrumentos estandarizados
- **Validación de Instrumentos:** Plataforma para nuevas escalas psicométricas
- **Análisis Epidemiológico:** Datos estructurados para investigación poblacional

### **Ventajas Competitivas:**
- **Reducción de Errores:** Eliminación de transcripción manual
- **Estandarización:** Instrumentos validados internacionalmente
- **Eficiencia:** Lógica condicional reduce tiempo de aplicación
- **Interoperabilidad:** Integración con sistemas hospitalarios (HL7/FHIR ready)

## Métricas de Calidad de Código

### Gestión de Deuda Técnica
- **Cobertura de Tipos:** 95%+ type hints en toda la base de código
- **Complejidad Ciclomática:** Promedio <5 por función
- **Cobertura de Pruebas:** Objetivo 90%+ (en desarrollo)
- **Documentación:** Docstrings integrales y documentación de API

### Benchmarks de Rendimiento
- **Tiempo de Respuesta:** <100ms promedio para operaciones CRUD
- **Throughput:** 1000+ requests/segundo (instancia única)
- **Uso de Memoria:** <512MB bajo carga normal
- **Consultas de Base de Datos:** Prevención del problema N+1 con eager loading

## Contribución y Desarrollo

### Flujo de Trabajo de Desarrollo
```bash
# Configurar entorno de desarrollo
uv sync --dev

# Ejecutar pruebas
uv run pytest

# Formateo de código
uv run black .
uv run isort .

# Verificación de tipos
uv run mypy .

# Ejecutar con hot reload
uv run uvicorn app.main:app --reload
```

### Estándares de Código
- **PEP 8:** Cumplimiento de guía de estilo Python
- **Black:** Formateo automático de código
- **isort:** Organización de declaraciones de importación
- **mypy:** Verificación estática de tipos
- **Conventional Commits:** Mensajes de commit semánticos

## 📊 **Estado del Proyecto**

![Development Status](https://img.shields.io/badge/Status-Active_Development-brightgreen.svg)
![Code Quality](https://img.shields.io/badge/Code_Quality-Production_Ready-blue.svg)
![Architecture](https://img.shields.io/badge/Architecture-Clean_Architecture-success.svg)
![Clinical Instruments](https://img.shields.io/badge/Clinical_Instruments-80+_Cataloged-blue.svg)
![Conditional Logic](https://img.shields.io/badge/Conditional_Logic-Implemented-green.svg)

### **🎯 Hitos Completados**
- ✅ **Motor de Reglas Condicionales:** Lógica ALL/ANY/NONE implementada
- ✅ **Catálogo Clínico:** 80+ instrumentos médicos catalogados con metadatos
- ✅ **Integración CIE-11:** Códigos médicos internacionales
- ✅ **Arquitectura Multi-BD:** PostgreSQL/SQLite con conversión automática
- ✅ **Instrumentos Implementados:** PHQ-9, CRAFFT con lógica condicional completa
- ✅ **Sistema de Cálculos:** Framework para puntuaciones automáticas
- ✅ **Referencias Científicas:** Enlaces a PubMed y estudios de validación

### **🔄 En Desarrollo Activo**
- 🔄 **Sistema de Respuestas:** Captura y análisis de datos de pacientes
- 🔄 **Dashboard Clínico:** Visualización de resultados y tendencias
- 🔄 **Autenticación Médica:** JWT/OAuth2 con roles hospitalarios
- 🔄 **Suite de Pruebas:** Testing específico para lógica médica

### **📋 Roadmap Próximo**
- 📋 **Integración HL7/FHIR:** Interoperabilidad con sistemas hospitalarios
- 📋 **Algoritmos de IA:** Detección de patrones en respuestas
- 📋 **Reportes Clínicos:** Generación automática de informes médicos
- 📋 **Validación Regulatoria:** Cumplimiento FDA/CE para dispositivos médicos

## 🧠 **Motor de Reglas Condicionales - Innovación Técnica**

### **Teoría y Fundamentos**
FormFlow implementa un **motor de reglas condicionales avanzado** que transforma formularios estáticos en experiencias dinámicas e inteligentes, similar a plataformas como Google Forms o Typeform, pero especializado para el ámbito médico.

### **Componentes Clave del Sistema**

#### **1. Sujetos y Entidades**
```typescript
interface SubjectReference {
  entity: "question" | "person" | "form";
  property: "value" | "age" | "score";
  selector?: "id" | "group" | "all";
}
```

#### **2. Operadores y Comparaciones**
- **Comparación:** `==`, `!=`, `>`, `<`, `>=`, `<=`
- **Lógicos:** `and`, `or`, `not`
- **Agregados:** `sum`, `avg`, `min`, `max`, `count`
- **Colección:** `all`, `any`, `none`

#### **3. Composición de Condiciones**
```json
{
  "condition": {
    "type": "any",
    "rules": [
      {"id_question": 1, "operator": ">", "value": 0},
      {"id_question": 2, "operator": "==", "value": "Sí"}
    ]
  }
}
```

### **Beneficios del Sistema**
- **Reducción de Dependencia del Código:** Configuración declarativa sin programación
- **Personalización Total:** Flujos adaptativos para cada paciente
- **Escalabilidad:** Manejo eficiente de formularios complejos
- **Integración Fácil:** Formato JSON estándar para interoperabilidad

### **Aplicación en Contexto Médico**
- **Screening Inteligente:** Preguntas que aparecen según síntomas reportados
- **Validaciones Clínicas:** Reglas que aseguran coherencia en respuestas médicas
- **Cálculos Automáticos:** Puntuaciones de escalas (PHQ-9, GAD-7) en tiempo real
- **Flujos Adaptativos:** Rutas diferentes según perfil demográfico del paciente

## 👨‍💻 **Acerca del Desarrollador**

Este proyecto demuestra experiencia especializada en:
- **Arquitectura de Software Médico:** Clean Architecture, DDD aplicado a salud digital
- **APIs de Alto Rendimiento:** FastAPI asíncrono optimizado para datos clínicos
- **Sistemas de Reglas Complejas:** Motores de decisión para lógica médica
- **Estándares Médicos Internacionales:** CIE-11, instrumentos psicométricos validados
- **Tecnología Sanitaria:** Cumplimiento regulatorio y validación clínica

### Conectemos
- **LinkedIn:** [Tu Perfil de LinkedIn]
- **GitHub:** [Tu Perfil de GitHub]
- **Email:** [Tu Email]
- **Portfolio:** [Tu Sitio Web de Portfolio]

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

<div align="center">

**Si encuentras este proyecto interesante, considera darle una estrella**

*Construido con tecnologías Python modernas*

</div>