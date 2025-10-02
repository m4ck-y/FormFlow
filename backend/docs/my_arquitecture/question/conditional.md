# 📄 Documentación Completa: Objeto `conditional`

---

## 🧩 Descripción General

El objeto `conditional` define **condiciones lógicas** que deben cumplirse para que una pregunta (u otro elemento del cuestionario) se muestre o habilite. Esto permite crear flujos dinámicos, mostrando preguntas sólo cuando ciertas respuestas anteriores cumplen reglas específicas.

---

## 📐 Estructura General

```json
"conditional": {
  "type": "all",
  "rules": [
    {
      "id_question": 1,
      "operator": ">",
      "value": 0
    }
  ]
}
```

---

## 🧱 Propiedades

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `type` | string | Tipo de lógica para evaluar las reglas:<br/>- `"all"`: todas las reglas deben cumplirse (AND).<br/>- `"any"`: al menos una regla debe cumplirse (OR).<br/>- `"none"`: ninguna regla debe cumplirse (NOT). |
| `rules` | array | Lista de reglas individuales a evaluar. |

---

## 🧩 Regla Individual (`rule`)

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id_question` | integer | ID de la pregunta cuyas respuestas se evalúan. |
| `operator` | string | Operador lógico de comparación:<br/>`"=="`, `"!="`, `">"`, `"<"`, `">="`, `"<="`. |
| `value` | number \| string | Valor contra el que se compara la respuesta de la pregunta especificada. |

---

## 🧠 Funcionamiento

1. El sistema revisa las respuestas dadas a las preguntas indicadas en las reglas.
2. Aplica el operador para comparar la respuesta con el valor definido.
3. Evalúa todas las reglas según el tipo (`all`, `any`, `none`).
4. Devuelve `true` o `false` indicando si la condición global se cumple o no.

---

## 1. Interfaces y Tipado en TypeScript

```tsx
type Operator = "==" | "!=" | ">" | "<" | ">=" | "<=";

interface SchemaConditionRule {
  id_question: number;
  operator: Operator;
  value: number | string;
}

type ConditionalType = "all" | "any" | "none";

interface SchemaCondition {
  type: ConditionalType;
  rules: Array<SchemaConditionRule | SchemaCondition>; // permite anidación
}

```

---

## 2. Funciones para Evaluar Condicionales (TypeScript)

```tsx
function evalRule(
  response: number | string | undefined,
  operator: Operator,
  value: number | string
): boolean {
  if (response === undefined) return false;

  switch (operator) {
    case "==": return response === value;
    case "!=": return response !== value;
    case ">":
      return typeof response === "number" && typeof value === "number"
        ? response > value
        : false;
    case "<":
      return typeof response === "number" && typeof value === "number"
        ? response < value
        : false;
    case ">=":
      return typeof response === "number" && typeof value === "number"
        ? response >= value
        : false;
    case "<=":
      return typeof response === "number" && typeof value === "number"
        ? response <= value
        : false;
    default:
      return false;
  }
}

function evalSchemaCondition(
  condition: SchemaCondition,
  responses: Record<number, number | string>
): boolean {
  const results = condition.rules.map((rule) => {
    // Si es una regla simple
    if ('id_question' in rule) {
      return evalRule(responses[rule.id_question], rule.operator, rule.value);
    }
    // Si es un condition anidado
    else {
      return evalSchemaCondition(rule, responses);
    }
  });

  switch (condition.type) {
    case "all":
      return results.every(Boolean);
    case "any":
      return results.some(Boolean);
    case "none":
      return !results.some(Boolean);
    default:
      return false;
  }
}

```

---

## 3. Ejemplo de Uso en TypeScript

```tsx
const conditionExample: SchemaCondition = {
  type: "all",
  rules: [
    { id_question: 1, operator: ">", value: 0 },
    { id_question: 2, operator: "<=", value: 5 }
  ]
};

const userResponses: Record<number, number> = {
  1: 3,
  2: 5,
  3: 10
};

const result = evalSchemaCondition(conditionExample, userResponses);
console.log(result); // true

// Ejemplo con anidación (lógica compleja)
const conditionWithNesting: SchemaCondition = {
  type: "any", // OR principal
  rules: [
    // Regla simple
    { id_question: 1, operator: ">", value: 10 },
    // SchemaCondition anidado
    {
      type: "all", // AND anidado
      rules: [
        { id_question: 2, operator: ">=", value: 5 },
        { id_question: 3, operator: "==", value: "yes" }
      ]
    }
  ]
};

// Lógica: (pregunta_1 > 10) OR (pregunta_2 >= 5 AND pregunta_3 == "yes")
const complexResponses = { 1: 8, 2: 6, 3: "yes" };
const complexResult = evalSchemaCondition(conditionWithNesting, complexResponses);
console.log(complexResult); // true (porque 2 >= 5 AND 3 == "yes")

```

---

## 4. Ejemplo Equivalente en JavaScript

```jsx
function evalRule(response, operator, value) {
  if (response === undefined) return false;

  switch (operator) {
    case "==": return response === value;
    case "!=": return response !== value;
    case ">": return typeof response === "number" && typeof value === "number" ? response > value : false;
    case "<": return typeof response === "number" && typeof value === "number" ? response < value : false;
    case ">=": return typeof response === "number" && typeof value === "number" ? response >= value : false;
    case "<=": return typeof response === "number" && typeof value === "number" ? response <= value : false;
    default: return false;
  }
}

function evalSchemaCondition(condition, responses) {
  const results = condition.rules.map(rule => {
    // Si es una regla simple
    if (rule.id_question !== undefined) {
      return evalRule(responses[rule.id_question], rule.operator, rule.value);
    }
    // Si es un condition anidado
    else {
      return evalSchemaCondition(rule, responses);
    }
  });

  switch (condition.type) {
    case "all": return results.every(Boolean);
    case "any": return results.some(Boolean);
    case "none": return !results.some(Boolean);
    default: return false;
  }
}

const conditionExample = {
  type: "all",
  rules: [
    { id_question: 1, operator: ">", value: 0 },
    { id_question: 2, operator: "<=", value: 5 }
  ]
};

const userResponses = { 1: 3, 2: 5, 3: 10 };

const result = evalSchemaCondition(conditionExample, userResponses);
console.log(result); // true

```

---

## 5. Implementación Python (Backend)

### Enums para Type Safety

```python
# app/question/domain/enum/conditional.py
from enum import Enum

class EConditionalOperator(str, Enum):
    EQUAL = "=="
    NOT_EQUAL = "!="
    GREATER_THAN = ">"
    LESS_THAN = "<"
    GREATER_EQUAL = ">="
    LESS_EQUAL = "<="

class EConditionalType(str, Enum):
    ALL = "all"    # AND
    ANY = "any"    # OR  
    NONE = "none"  # NOT
```

### Schemas Pydantic

```python
# app/question/domain/schemas/conditional.py
from app.question.domain.enum.conditional import EConditionalOperator, EConditionalType

class SchemaConditionRule(BaseModel):
    id_question: int
    operator: EConditionalOperator
    value: Union[int, float, str]

class SchemaCondition(BaseModel):
    type: EConditionalType
    rules: List[Union[SchemaConditionRule, 'SchemaCondition']]  # permite anidación
```

### Ejemplo de Uso

```python
# Crear condition (type-safe)
condition = SchemaCondition(
    type=EConditionalType.ALL,
    rules=[
        SchemaConditionRule(
            id_question=1, 
            operator=EConditionalOperator.GREATER_THAN, 
            value=0
        )
    ]
)

# Serializar para BD
json_data = condition.model_dump_json()
# {"type": "all", "rules": [{"id_question": 1, "operator": ">", "value": 0}]}

# Ejemplo con anidación
condition_nested = SchemaCondition(
    type=EConditionalType.ANY,  # OR principal
    rules=[
        # Regla simple
        SchemaConditionRule(id_question=1, operator=EConditionalOperator.GREATER_THAN, value=10),
        # SchemaCondition anidado
        SchemaCondition(
            type=EConditionalType.ALL,  # AND anidado
            rules=[
                SchemaConditionRule(id_question=2, operator=EConditionalOperator.GREATER_EQUAL, value=5),
                SchemaConditionRule(id_question=3, operator=EConditionalOperator.EQUAL, value="yes")
            ]
        )
    ]
)

# Flujo completo Frontend → Backend → BD
# 1. Frontend envía SchemaCreateAPIQuestion con condition como SchemaCondition
api_question = SchemaCreateAPIQuestion(
    type=EQuestionType.SINGLE_CHOICE,
    text="¿Has tenido pensamientos de autolesión?",
    order=9,
    condition=condition_nested,  # Objeto SchemaCondition
    list_options=[]
)

# 2. Backend convierte a schema de BD
db_question = api_question.to_db_schema()  # Conversión automática según motor

# 3. Resultado según motor:
# SQLite: condition = '{"type": "any", "rules": [...]}'  (string)
# PostgreSQL: condition = {"type": "any", "rules": [...]}  (dict/JSONB)
```

---

## 🏗️ Arquitectura de Schemas (Refinada - Versión Final)

### Filosofía de Diseño

La arquitectura final está diseñada con **un solo schema base unificado** que maneja automáticamente la conversión bidireccional entre objetos `Conditional` y representaciones de base de datos, eliminando duplicación y simplificando el mantenimiento.

**Principio clave**: **Siempre trabajar con objetos `Conditional` en toda la aplicación**, con conversión automática transparente según el motor de BD.

### Arquitectura Unificada

#### 1. **SchemaBaseQuestion** - Schema Base Unificado
```python
class SchemaBaseQuestion(BaseORMModel):
    """Schema base con condition como objeto SchemaCondition - maneja conversión automática"""
    condition: Optional[SchemaCondition] = Field(None, description="Condición para mostrar la pregunta")
    
    @field_validator('condition', mode='before')
    @classmethod
    def parse_condition_json(cls, v):
        """Convierte automáticamente JSON string a objeto SchemaCondition"""
        if isinstance(v, str):  # Desde BD SQLite (JSON string)
            try:
                data = json.loads(v)
                return SchemaCondition(**data)
            except json.JSONDecodeError:
                return None
        elif isinstance(v, dict):  # Desde BD PostgreSQL (dict)
            return SchemaCondition(**v)
        return v  # Ya es objeto SchemaCondition
```

**Beneficios:**
- ✅ **Un solo schema base** para toda la aplicación
- ✅ **Conversión automática** desde BD → objeto
- ✅ **Type safety completo** - siempre `Optional[SchemaCondition]`
- ✅ **Compatible** con SQLite (string) y PostgreSQL (dict)

#### 2. **SchemaCreateDBQuestion** - Especializado para Inserción BD
```python
class SchemaCreateDBQuestion(SchemaBaseQuestion):
    """Schema para inserción en BD - conversión automática según motor"""
    
    @field_validator("condition", mode='after')
    @classmethod
    def prepare_condition_for_db(cls, v):
        """Convierte condition según el motor de BD"""
        if v and isinstance(v, SchemaCondition):
            from app.config.db import is_db_postgres
            
            if not is_db_postgres():
                # SQLite: convertir a JSON string
                log_info("SQLite: Converting condition to JSON string")
                v = v.model_dump_json()
                log_info("SQLite: ", v)
            # PostgreSQL: mantener como objeto (se serializa automáticamente)
        return v
```

**Beneficios:**
- ✅ **Conversión específica** solo para inserción
- ✅ **Logging detallado** para debugging
- ✅ **Detección automática** del motor de BD

#### 3. **SchemaCreateAPIQuestion** - Para Frontend/API
```python
class SchemaCreateAPIQuestion(SchemaBaseQuestion, BaseCreateAPISchema):
    """Schema para API - frontend siempre envía objetos estructurados"""
    list_options: List[SCreateAPIItemOption]
    
    def to_db_schema(self) -> SchemaCreateDBQuestion:
        """Conversión explícita a schema de BD"""
        return SchemaCreateDBQuestion(
            type=self.type,
            text=self.text,
            order=self.order,
            condition=self.condition  # Se convierte automáticamente en el validator
        )
```

### Flujo de Datos Completo

```python
# 1. Frontend → API (siempre objetos)
api_data = SchemaCreateAPIQuestion(
    condition=SchemaCondition(
        type=EConditionalType.ALL,
        rules=[SchemaConditionRule(...)]
    )
)

# 2. API → BD (conversión automática)
db_data = api_data.to_db_schema()  # SchemaCreateDBQuestion

# 3. Inserción en BD (automática según motor)
# SQLite: condition → '{"type": "all", "rules": [...]}'  (string)
# PostgreSQL: condition → {"type": "all", "rules": [...]}  (dict/JSONB)

# 4. Lectura desde BD (conversión automática)
# SQLite: '{"type": "all", ...}' → parse_condition_json() → SchemaCondition object
# PostgreSQL: {"type": "all", ...} → parse_condition_json() → SchemaCondition object

# 5. Respuesta API (siempre objetos)
response = SchemaDetailQuestion(condition=condition_obj)  # Objeto SchemaCondition
```

### Ventajas de la Arquitectura Refinada

#### ✅ **Eliminación de Duplicación**
- **Antes**: `SchemaBaseQuestion` + `SchemaBaseQuestion_str` (duplicación)
- **Ahora**: Un solo `SchemaBaseQuestion` unificado

#### ✅ **Conversión Bidireccional Automática**
- **Lectura**: JSON string/dict → objeto `Conditional` (automático)
- **Escritura**: objeto `Conditional` → formato BD (automático según motor)

#### ✅ **Type Safety Completo**
- **Toda la aplicación**: `condition: Optional[SchemaCondition]`
- **Sin tipos Union confusos**: No más `SchemaCondition | str`
- **IntelliSense completo**: IDE reconoce propiedades de `SchemaCondition`

#### ✅ **Mantenibilidad Mejorada**
- **Un solo lugar** para lógica de conversión
- **Logging integrado** para debugging
- **Fácil testing** de conversiones

### Ejemplo de Uso Práctico

```python
# Crear pregunta con conditional desde API
async def create_question_endpoint(question_data: SchemaCreateAPIQuestion):
    """Endpoint que maneja condition automáticamente"""
    
    # 1. Datos del frontend (siempre objetos)
    print(f"API condition type: {type(question_data.condition)}")  # <class 'SchemaCondition'>
    
    # 2. Conversión a schema de BD
    db_schema = question_data.to_db_schema()
    print(f"DB condition type: {type(db_schema.condition)}")  # str (SQLite) o dict (PostgreSQL)
    
    # 3. Inserción automática
    question_id = await question_service.create(db_schema)
    
    return {"id": question_id, "message": "Question created with condition"}

# Leer pregunta con condition desde BD
async def get_question_endpoint(question_id: int):
    """Endpoint que convierte condition automáticamente"""
    
    # 1. Lectura desde BD (automática)
    question = await question_service.get(question_id)  # SchemaDetailQuestion
    
    # 2. SchemaCondition ya convertido a objeto
    print(f"Response condition type: {type(question.condition)}")  # <class 'SchemaCondition'>
    
    return question  # Frontend recibe objetos estructurados
```

### Testing de la Arquitectura

```python
def test_conditional_conversion():
    """Test completo de conversión bidireccional"""
    
    # 1. Crear condition object
    condition = SchemaCondition(
        type=EConditionalType.ALL,
        rules=[SchemaConditionRule(question_id=1, operator=EConditionalOperator.EQUALS, value="yes")]
    )
    
    # 2. API Schema
    api_schema = SchemaCreateAPIQuestion(
        type=EQuestionType.SINGLE_CHOICE,
        text="Test question",
        order=1,
        condition=condition,
        list_options=[]
    )
    
    # 3. Conversión a DB Schema
    db_schema = api_schema.to_db_schema()
    
    # 4. Verificar conversión según motor
    if is_db_postgres():
        assert isinstance(db_schema.condition, dict)
    else:
        assert isinstance(db_schema.condition, str)
    
    # 5. Simular lectura desde BD
    if isinstance(db_schema.condition, str):
        # SQLite: string → object
        parsed = SchemaBaseQuestion.parse_condition_json(db_schema.condition)
        assert isinstance(parsed, SchemaCondition)
        assert parsed.type == EConditionalType.ALL
```

---

## 🔧 Implementación Técnica Detallada

### Configuración de Base de Datos

#### Modelo SQLAlchemy
```python
class ModelQuestion(BaseModel):
    # Columna JSON para condiciones - compatible SQLite/PostgreSQL
    condition = Column(get_json_column_type(), nullable=True)
```

#### Función de Detección de Motor
```python
def get_json_column_type():
    """Retorna el tipo de columna JSON según el motor de BD"""
    if is_db_postgres():
        return JSONB  # PostgreSQL: JSONB nativo
    else:
        return Text   # SQLite: TEXT para JSON strings
```

### Integración con BaseLayerApplication

```python
def Create(self, value: TCreateAPISchema, db: TSession, auto_commit: bool = True) -> int:
    """Crea entidad con conversión automática de schemas"""
    
    # Convertir schema de API a schema de BD si tiene el método to_db_schema()
    if hasattr(value, 'to_db_schema') and callable(getattr(value, 'to_db_schema')):
        schema_db = value.to_db_schema()
        log_info("Conversión API → DB ejecutada")
        log_info("CreateAPISchema condition type:", type(value.condition))
        log_info("CreateDBSchema condition type:", type(schema_db.condition))
    else:
        schema_db = value
        log_info("Sin conversión - usando schema API directamente")

    return self.repository.Create(schema_db, db, auto_commit=auto_commit)
```

### Endpoints Automáticos

Los endpoints estándar ya funcionan automáticamente:

```python
# POST /question - Crear pregunta con conditional
# GET /question/{id} - Obtener pregunta con conditional convertido
# GET /question/list - Listar preguntas con conditionals convertidos
# PUT /question - Actualizar pregunta con conditional
```

---

## 🚀 Estado de Implementación

### ✅ **Completado**
- ✅ **Schemas unificados** con conversión bidireccional
- ✅ **Validators automáticos** para ambos motores de BD
- ✅ **Integración con BaseLayerApplication**
- ✅ **Logging detallado** para debugging
- ✅ **Type safety completo** en toda la aplicación

### 🔄 **En Progreso**
- 🔄 **Testing unitario** de conversiones
- 🔄 **Testing de integración** con ambos motores
- 🔄 **Documentación OpenAPI** actualizada

### 📋 **Próximos Pasos**
- [ ] Aplicar mismo patrón a otros módulos (Option, Form, Section)
- [ ] Crear herramientas de migración para datos existentes
- [ ] Optimizar performance con cache si es necesario

---

## 📝 Notas y Recomendaciones

### Evaluación de Conditionals
- Se asume que las respuestas se almacenan en un objeto donde la clave es el `id_question`.
- Los operadores `<`, `>`, `<=`, `>=` aplican sólo para valores numéricos; con strings la evaluación retorna `false`.
- El tipo `"none"` permite usar lógica de negación para que ninguna regla se cumpla.
- Puedes extender esta lógica para operadores más complejos (`includes`, `in`, etc.) si tu caso lo requiere.

### Arquitectura de Schemas
- **Principio fundamental**: El frontend siempre trabaja con objetos `SchemaCondition` estructurados
- **Conversión automática**: La BD se adapta según el motor sin lógica manual en endpoints
- **Type safety**: Eliminación completa de tipos Union confusos
- **Mantenibilidad**: Un solo lugar para lógica de conversión con logging integrado

### Performance
- **SQLite**: Conversión a JSON string es rápida y eficiente
- **PostgreSQL**: JSONB nativo permite queries complejas sobre conditional
- **Cache**: Considerar cache de conversiones para aplicaciones de alto tráfico

Esta arquitectura es la base para crear cuestionarios y formularios con visibilidad y habilitación dinámica de preguntas o secciones, con soporte completo para condition logic.