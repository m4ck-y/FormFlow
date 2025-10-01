# 🤖 Propuesta Kiro: Implementación Mejorada de Condicionales

---

## 🎯 Contexto de la Propuesta

Esta propuesta mejora la implementación actual del sistema de condicionales en FormFlow, manteniendo la compatibilidad SQLite/PostgreSQL pero optimizando la experiencia del desarrollador y la arquitectura del código.

---

## 📊 Análisis de Enfoques de Detección de BD

### ✅ Enfoque Actual (Recomendado)
```python
def is_db_postgres():
    return "postgresql" in settings.SQLALCHEMY_DB_URL
```

### ❌ Alternativa Evaluada (Descartada)
```python
if engine.dialect.name == "postgresql":
    JSONType = JSONB
```

### Comparación Técnica

| Aspecto | Enfoque Actual | Alternativa | Ganador |
|---------|----------------|-------------|---------|
| **Disponibilidad** | ✅ Desde el inicio | ❌ Requiere engine | Actual |
| **Dependencias** | ✅ Solo settings | ❌ Requiere engine | Actual |
| **Simplicidad** | ✅ Una línea | ❌ Más verboso | Actual |
| **Consistencia** | ✅ Ya usado en codebase | ❌ Nuevo patrón | Actual |
| **Testing** | ✅ Fácil de mockear | ❌ Complejo | Actual |

---

## 🏗️ Propuesta de Implementación

### 1. Función Helper en `app/config/db.py`

```python
def get_json_column_type():
    """
    Retorna el tipo de columna JSON apropiado según el motor de base de datos.
    
    Returns:
        JSONB para PostgreSQL, Text para SQLite
    """
    if is_db_postgres():
        from sqlalchemy.dialects.postgresql import JSONB
        return JSONB
    else:
        from sqlalchemy import Text
        return Text
```

### 2. Modelo SQLAlchemy Mejorado

```python
from app.config.db import get_json_column_type, BaseModel
from sqlalchemy import Column, Integer, String, ForeignKey

class QuestionModel(BaseModel):
    __tablename__ = 'question'
    
    text = Column(String(500), nullable=False)
    type = Column(String(50), nullable=False)
    id_form = Column(Integer, ForeignKey('form.id'), nullable=False)
    
    # Columna JSON con detección automática
    condition = Column(get_json_column_type(), nullable=True)
```

### 3. Esquemas Pydantic Optimizados

#### Modelo Base (Flexible para BD)
```python
from typing import Optional, Union
from pydantic import BaseModel

class Question(BaseModel):
    id: int
    text: str
    type: str
    id_form: int
    condition: Optional[Conditional | str] = None  # Flexible para ambos motores
    
    def get_condition(self) -> Optional[Conditional]:
        """Convierte condition a objeto Conditional independientemente del motor DB"""
        if isinstance(self.condition, str):
            try:
                data = json.loads(self.condition)
                return Conditional(**data)
            except Exception:
                return None
        elif isinstance(self.condition, Conditional):
            return self.condition
        return None
```

#### Modelo de Respuesta API (Siempre Estructurado)
```python
from pydantic import field_validator
import json

class QuestionResponse(BaseModel):
    id: int
    text: str
    type: str
    id_form: int
    condition: Optional[Conditional] = None  # Siempre objeto estructurado
    
    @field_validator('condition', mode='before')
    @classmethod
    def parse_condition_json(cls, v):
        """Convierte automáticamente JSON string a objeto Conditional"""
        if isinstance(v, str):
            try:
                data = json.loads(v)
                return Conditional(**data)
            except json.JSONDecodeError:
                return None
        elif isinstance(v, dict):
            return Conditional(**v)
        return v
```

### 4. Endpoints FastAPI Optimizados

```python
from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

@app.get("/questions/{question_id}", response_model=QuestionResponse)
def get_question(question_id: int, db: Session = Depends(get_db)):
    """
    Obtiene una pregunta con su conditional parseado automáticamente.
    
    La respuesta siempre retorna condition como objeto estructurado,
    independientemente del motor de base de datos.
    """
    question = db.query(QuestionModel).filter(QuestionModel.id == question_id).first()
    
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    # QuestionResponse automáticamente parsea str → Conditional
    return QuestionResponse(**question.__dict__)

@app.get("/forms/{form_id}/questions", response_model=List[QuestionResponse])
def get_form_questions(form_id: int, db: Session = Depends(get_db)):
    """Obtiene todas las preguntas de un formulario con conditionals parseados"""
    questions = db.query(QuestionModel).filter(QuestionModel.id_form == form_id).all()
    
    # Cada condition se parsea automáticamente a objeto Conditional
    return [QuestionResponse(**q.__dict__) for q in questions]
```

---

## 🔄 Operaciones de Base de Datos

### Guardar Conditional
```python
def create_question(question_data: dict, db: Session) -> QuestionModel:
    """Crea una pregunta con conditional, manejando conversión automática"""
    condition_value = question_data.get('condition')
    
    # Convertir Conditional a formato apropiado según motor
    if isinstance(condition_value, Conditional):
        if not is_db_postgres():
            # SQLite: convertir a JSON string
            condition_value = condition_value.model_dump_json()
        else:
            # PostgreSQL: puede manejar dict directamente
            condition_value = condition_value.model_dump()
    
    question = QuestionModel(
        text=question_data['text'],
        type=question_data['type'],
        id_form=question_data['id_form'],
        condition=condition_value
    )
    
    db.add(question)
    db.commit()
    return question
```

### Leer Conditional
```python
def get_question_with_condition(question_id: int, db: Session) -> Optional[Question]:
    """Obtiene pregunta con conditional parseado automáticamente"""
    question_model = db.query(QuestionModel).filter(QuestionModel.id == question_id).first()
    
    if not question_model:
        return None
    
    # Question maneja automáticamente str (SQLite) o dict (PostgreSQL)
    return Question(**question_model.__dict__)
```

---

## 📋 Migraciones de Base de Datos

### SQLite
```sql
CREATE TABLE question (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text VARCHAR(500) NOT NULL,
    type VARCHAR(50) NOT NULL,
    id_form INTEGER NOT NULL,
    condition TEXT,  -- JSON almacenado como texto
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    deleted_at DATETIME,
    FOREIGN KEY(id_form) REFERENCES form(id)
);
```

### PostgreSQL
```sql
CREATE TABLE question (
    id SERIAL PRIMARY KEY,
    text VARCHAR(500) NOT NULL,
    type VARCHAR(50) NOT NULL,
    id_form INTEGER NOT NULL,
    condition JSONB,  -- JSON binario nativo
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY(id_form) REFERENCES form(id)
);

-- Índice GIN para consultas JSON eficientes (opcional)
CREATE INDEX idx_question_condition ON question USING GIN (condition);
```

---

## 🎯 Ejemplos de Uso

### Crear Pregunta con Conditional
```python
# Datos de entrada
question_data = {
    "text": "¿Has tenido pensamientos de autolesión?",
    "type": "yes_no",
    "id_form": 1,
    "condition": Conditional(
        type="all",
        rules=[
            ConditionalRule(id_question=8, operator=">=", value=2)
        ]
    )
}

# Crear en base de datos
question = create_question(question_data, db)
```

### Obtener y Usar Conditional
```python
# Obtener pregunta
question = get_question_with_condition(1, db)

# Usar conditional (método actual)
conditional = question.get_condition()
if conditional:
    print(f"Tipo: {conditional.type}")
    print(f"Reglas: {len(conditional.rules)}")

# O usar directamente en API
response = get_question(1, db)  # QuestionResponse
# response.condition ya es objeto Conditional
```

### Respuesta JSON de la API
```json
{
  "id": 9,
  "text": "¿Has tenido pensamientos de autolesión?",
  "type": "yes_no",
  "id_form": 1,
  "condition": {
    "type": "all",
    "rules": [
      {
        "id_question": 8,
        "operator": ">=",
        "value": 2
      }
    ]
  }
}
```

---

## ✅ Ventajas de la Propuesta

### 1. **Compatibilidad Total**
- ✅ SQLite: condition como TEXT (JSON string)
- ✅ PostgreSQL: condition como JSONB (binario)
- ✅ Pydantic maneja ambos casos transparentemente

### 2. **API Consistente**
- ✅ Respuestas siempre con JSON estructurado
- ✅ No strings JSON en respuestas de API
- ✅ Validación automática con Pydantic

### 3. **Flexibilidad Interna**
- ✅ Modelo base acepta str o Conditional
- ✅ Modelo de respuesta siempre estructurado
- ✅ Conversión automática transparente

### 4. **Mantenibilidad**
- ✅ Usa función existente `is_db_postgres()`
- ✅ Helper function para tipo de columna
- ✅ Separación clara de responsabilidades

### 5. **Performance**
- ✅ JSONB en PostgreSQL para consultas eficientes
- ✅ TEXT en SQLite para compatibilidad
- ✅ Conversión solo cuando es necesaria

---

## 🔮 Migración desde Implementación Actual

### Paso 1: Agregar Helper Function
```python
# En app/config/db.py
def get_json_column_type():
    if is_db_postgres():
        from sqlalchemy.dialects.postgresql import JSONB
        return JSONB
    else:
        from sqlalchemy import Text
        return Text
```

### Paso 2: Actualizar Modelo SQLAlchemy
```python
# Cambiar de:
condition = Column(JSONType, nullable=True)

# A:
condition = Column(get_json_column_type(), nullable=True)
```

### Paso 3: Crear QuestionResponse
```python
# Nuevo modelo para respuestas API
class QuestionResponse(BaseModel):
    # ... con @field_validator
```

### Paso 4: Actualizar Endpoints
```python
# Cambiar response_model a QuestionResponse
@app.get("/questions/{id}", response_model=QuestionResponse)
```

---

## 🏆 Conclusión

Esta propuesta mantiene la **compatibilidad total** con el sistema actual mientras mejora:

1. **Experiencia del desarrollador** - APIs más limpias y consistentes
2. **Mantenibilidad** - Separación clara entre modelos internos y de respuesta
3. **Performance** - Aprovecha las capacidades nativas de cada motor
4. **Escalabilidad** - Preparado para evolución futura

La implementación es **incremental** y **no rompe** el código existente, permitiendo migración gradual.

---

**Fecha de propuesta:** Enero 2025  
**Propuesto por:** Kiro AI Assistant  
**Estado:** Pendiente de evaluación  
**Impacto:** Bajo riesgo, alta mejora en DX