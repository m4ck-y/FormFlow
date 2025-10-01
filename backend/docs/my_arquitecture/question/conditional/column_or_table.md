# 📊 Decisión Técnica: Columna JSON vs Tabla Relacional para Condicionales

---

## 🎯 Contexto del Problema

En el sistema FormFlow, cada pregunta puede tener una condición opcional que determina si debe mostrarse, basándose en respuestas a preguntas anteriores. Se debe decidir entre dos enfoques arquitectónicos para almacenar estas condiciones.

### Opciones Evaluadas

1. **Opción A:** Columna `condition` JSON/JSONB en la tabla `question`
2. **Opción B:** Tabla relacional externa `condition` con reglas normalizadas

---

## ⚖️ Análisis Comparativo

### 🔹 Opción A: Columna JSON en Question

| Aspecto | Detalle | Evaluación |
|---------|---------|------------|
| **Eficiencia de lectura** | Una sola consulta obtiene pregunta + condición | ⭐⭐⭐⭐⭐ |
| **Eficiencia de escritura** | Una sola operación INSERT/UPDATE | ⭐⭐⭐⭐⭐ |
| **Indexación** | Limitada en SQLite, avanzada en PostgreSQL (GIN) | ⭐⭐⭐ |
| **Escalabilidad** | Buena para condiciones simples no reutilizables | ⭐⭐⭐⭐ |
| **Consultas SQL** | Difícil filtrar por reglas específicas | ⭐⭐ |
| **Complejidad implementación** | Baja - Un solo modelo | ⭐⭐⭐⭐⭐ |

### 🔹 Opción B: Tabla Relacional Externa

| Aspecto | Detalle | Evaluación |
|---------|---------|------------|
| **Eficiencia de lectura** | Requiere JOIN para obtener condiciones | ⭐⭐⭐ |
| **Eficiencia de escritura** | Múltiples INSERTs (question + conditions) | ⭐⭐⭐ |
| **Indexación** | Excelente - índices directos en columnas | ⭐⭐⭐⭐⭐ |
| **Escalabilidad** | Muy buena para condiciones complejas/compartidas | ⭐⭐⭐⭐⭐ |
| **Consultas SQL** | Potente - filtros complejos nativos | ⭐⭐⭐⭐⭐ |
| **Complejidad implementación** | Alta - Múltiples modelos y relaciones | ⭐⭐ |

---

## 🧠 Justificación de la Decisión

### ✅ Características del Contexto FormFlow

1. **Propiedad exclusiva:** Las condiciones pertenecen únicamente a cada pregunta
2. **No compartidas:** No hay reutilización entre preguntas o formularios
3. **Procesamiento interno:** Solo la lógica de negocio las interpreta
4. **Sin consultas complejas:** No necesitamos filtrar por campos internos del JSON
5. **MVP/Sistema personal:** Enfoque en simplicidad y performance de lectura

### 🚀 Beneficios Técnicos de la Opción A

#### **1. Performance Superior**
```python
# ✅ Una sola consulta
question = session.query(Question).filter(Question.id == 1).first()
conditional = question.get_conditional()  # Procesamiento en memoria

# ❌ Múltiples consultas con Opción B
question = session.query(Question).filter(Question.id == 1).first()
conditions = session.query(Condition).filter(Condition.question_id == 1).all()
rules = session.query(Rule).filter(Rule.condition_id.in_([c.id for c in conditions])).all()
```

#### **2. Bajo Acoplamiento**
- Las condiciones no participan en relaciones entre entidades
- No afectan integridad referencial
- No requieren tabla separada

#### **3. Flexibilidad Estructural**
```json
{
  "type": "all",
  "rules": [
    {"id_question": 1, "operator": ">", "value": 0},
    {"id_question": 2, "operator": "==", "value": "yes"}
  ]
}
```
- Estructura compleja sin múltiples tablas
- Fácil evolución sin migraciones

#### **4. Compatibilidad Multi-Motor**
```python
# PostgreSQL: JSONB nativo
condition = Column(JSONB, nullable=True)

# SQLite: TEXT con JSON
condition = Column(Text, nullable=True)

# Pydantic maneja ambos transparentemente
condition: Optional[Union[str, Conditional]] = None
```

---

## 📋 Criterios de Decisión

### ✅ Usar Columna JSON cuando:
- Datos propios de la entidad (no compartidos)
- No consultas SQL sobre campos internos
- Procesamiento en aplicación
- Estructura variable/compleja
- MVP o sistema simple

### ❌ Usar Normalización cuando:
- Datos compartidos entre entidades
- Necesitas filtrar/buscar por subcampos
- Lógica SQL compleja
- Auditoría/versionado individual
- Sistema empresarial con consultas administrativas

---

## 🎯 Decisión Final

### **Opción Seleccionada: A - Columna JSON**

**Justificación:**
1. **Contexto del proyecto:** FormFlow es un MVP enfocado en formularios personales
2. **Casos de uso principales:** Evaluación de condiciones en memoria durante renderizado
3. **Performance crítica:** Carga rápida de formularios completos
4. **Simplicidad:** Menor complejidad de implementación y mantenimiento

### **Implementación Técnica**

#### **Modelo SQLAlchemy:**
```python
class Question(BaseModel):
    __tablename__ = 'question'
    
    id = Column(Integer, primary_key=True)
    text = Column(String, nullable=False)
    type = Column(String, nullable=False)
    id_form = Column(Integer, ForeignKey('form.id'))
    
    # Columna JSON/JSONB para condiciones
    condition = Column(JSONType, nullable=True)
```

#### **Schema Pydantic:**
```python
class Question(BaseModel):
    id: int
    text: str
    type: str
    id_form: int
    condition: Optional[Union[str, Conditional]] = None
    
    def get_condition(self) -> Optional[Conditional]:
        """Convierte condition a objeto Conditional independientemente del motor DB"""
        if isinstance(self.condition, str):
            try:
                data = json.loads(self.condition)
                return Conditional(**data)
            except Exception:
                return None
        elif isinstance(self.condition, dict):
            return Conditional(**self.condition)
        elif isinstance(self.condition, Conditional):
            return self.condition
        return None
```

---

## 🔮 Evolución Futura

### **Cuándo Migrar a Opción B:**
Si FormFlow evoluciona hacia sistema empresarial y necesita:
- Condiciones compartidas entre formularios
- Dashboard administrativo con filtros complejos
- Auditoría de cambios en reglas
- Análisis estadístico de condiciones

### **Migración Gradual:**
```sql
-- Paso 1: Crear tablas normalizadas
CREATE TABLE condition (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES question(id),
    type VARCHAR(10) NOT NULL
);

-- Paso 2: Migrar datos existentes
INSERT INTO condition (question_id, type, ...)
SELECT id, condition->>'type', ...
FROM question 
WHERE condition IS NOT NULL;

-- Paso 3: Deprecar columna JSON gradualmente
```

---

## 📊 Métricas de Éxito

### **Indicadores de Performance:**
- **Tiempo de carga de formulario:** < 100ms
- **Memoria utilizada:** Mínima por formulario
- **Complejidad de código:** Baja mantenibilidad

### **Indicadores de Escalabilidad:**
- **Número de condiciones por pregunta:** < 5 reglas típicamente
- **Complejidad de condiciones:** Estructura simple (2-3 niveles)
- **Frecuencia de cambios:** Baja (definidas en diseño)

---

## 🏆 Conclusión

La decisión de usar una **columna JSON para almacenar condiciones** está completamente justificada para el contexto actual de FormFlow. Esta elección:

1. **Maximiza performance** donde es crítico (carga de formularios)
2. **Simplifica implementación** y mantenimiento
3. **Mantiene flexibilidad** para evolución futura
4. **Sigue mejores prácticas** modernas de modelado híbrido

La arquitectura puede evolucionar hacia normalización cuando los requisitos del negocio lo justifiquen, pero para el MVP actual, la columna JSON es la opción técnicamente superior.

---

**Fecha de decisión:** Enero 2025  
**Revisión programada:** Al alcanzar 1000+ formularios activos  
**Responsable técnico:** Equipo de Arquitectura FormFlow