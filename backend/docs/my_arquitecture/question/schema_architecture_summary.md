# 🏗️ Resumen: Nueva Arquitectura de Schemas

## 🎯 Problema Resuelto

**Antes**: Schemas confusos con lógica mezclada entre API y BD
**Ahora**: Separación clara de responsabilidades con conversión automática

## 🧩 Arquitectura Implementada

### 1. **Schemas Base**
```python
# Para API - condition siempre como objeto
class SchemaBaseQuestion(BaseORMModel):
    condition: Optional[Conditional]

# Para BD - condition flexible según motor
class SchemaBaseQuestion_str(BaseORMModel):
    condition: Optional[Conditional | str]
```

### 2. **Schema de API** (Frontend)
```python
class SchemaCreateAPIQuestion(SchemaBaseQuestion, BaseCreateAPISchema):
    """
    El frontend necesita ver la estructura del JSON.
    La propiedad condition siempre será un JSON que viene desde el frontend.
    """
    list_options: List[SCreateAPIItemOption]
    
    def to_db_schema(self) -> SchemaCreateDBQuestion:
        """Conversión automática a schema de BD"""
        return SchemaCreateDBQuestion(**self.model_dump())
```

### 3. **Schema de BD** (Base de Datos)
```python
class SchemaCreateDBQuestion(SchemaBaseQuestion_str):
    """
    Se adapta para la inserción en DB ya sea SQLite (text) o PostgreSQL (jsonb).
    Aquí es donde se hace la conversión dinámica según el motor de BD.
    """
    
    @model_validator(mode='after')
    def prepare_condition_for_db(self):
        """Convierte condition según el motor de BD"""
        if self.condition and isinstance(self.condition, Conditional):
            from app.config.db import is_db_postgres
            
            if not is_db_postgres():
                # SQLite: convertir a JSON string
                self.condition = self.condition.model_dump_json()
            # PostgreSQL: mantener como objeto
        
        return self
```

## 🔄 Flujo de Conversión

```python
# 1. Frontend envía datos estructurados
api_data = SchemaCreateAPIQuestion(
    condition=Conditional(...)  # Objeto estructurado
)

# 2. En la capa de infraestructura
def create_question(api_data: SchemaCreateAPIQuestion):
    # La propiedad condition siempre será un JSON que viene desde el frontend
    question_db_schema = api_data.to_db_schema()  # Conversión automática
    
    # Aquí ya está preparado para inserción en BD (dinámico según motor)
    return repository.create(question_db_schema)
```

## ✅ Beneficios Logrados

### 1. **Separación Clara de Responsabilidades**
- **Frontend**: Siempre trabaja con objetos `Conditional` estructurados
- **BD**: Se adapta automáticamente según el motor (SQLite/PostgreSQL)

### 2. **Conversión Automática**
- SQLite: `condition` se convierte a JSON string
- PostgreSQL: `condition` se mantiene como objeto/JSONB
- Sin lógica manual en cada endpoint

### 3. **Type Safety**
- Frontend: `condition: Optional[Conditional]` (siempre tipado)
- BD: `condition: Optional[Conditional | str]` (flexible)

### 4. **Mantenibilidad**
- Un solo lugar para la lógica de conversión
- Fácil de testear y modificar
- Escalable para nuevos motores de BD

## 🎯 Casos de Uso

### Crear Question desde API
```python
# Frontend → API
api_question = SchemaCreateAPIQuestion(
    type=EQuestionType.SINGLE_CHOICE,
    text="¿Cómo se siente?",
    condition=Conditional(
        type=EConditionalType.ALL,
        rules=[ConditionalRule(...)]
    ),
    list_options=[]
)

# API → BD (automático)
db_question = api_question.to_db_schema()
```

### Respuesta desde BD → API
```python
# BD → API (automático con field_validator)
class SchemaQuestionResponse(BaseORMModel):
    condition: Optional[Conditional]
    
    @field_validator('condition', mode='before')
    @classmethod
    def parse_condition_json(cls, v):
        """Convierte JSON string a objeto Conditional"""
        if isinstance(v, str):
            return Conditional(**json.loads(v))
        return v
```

## 🚀 Próximos Pasos

1. **Testing**: Crear tests unitarios para ambos motores de BD
2. **Documentación**: Actualizar OpenAPI docs
3. **Migración**: Aplicar patrón a otros schemas similares
4. **Optimización**: Cache de conversiones si es necesario

---

**Conclusión**: Esta arquitectura es mucho más limpia, mantenible y sigue principios SOLID. El frontend siempre trabaja con objetos estructurados, y la BD se adapta automáticamente sin lógica manual en cada endpoint.