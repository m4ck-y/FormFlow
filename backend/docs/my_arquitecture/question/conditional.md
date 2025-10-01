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

interface ConditionalRule {
  id_question: number;
  operator: Operator;
  value: number | string;
}

type ConditionalType = "all" | "any" | "none";

interface Conditional {
  type: ConditionalType;
  rules: Array<ConditionalRule | Conditional>; // permite anidación
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

function evalConditional(
  conditional: Conditional,
  responses: Record<number, number | string>
): boolean {
  const results = conditional.rules.map((rule) => {
    // Si es una regla simple
    if ('id_question' in rule) {
      return evalRule(responses[rule.id_question], rule.operator, rule.value);
    }
    // Si es un conditional anidado
    else {
      return evalConditional(rule, responses);
    }
  });

  switch (conditional.type) {
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
const conditionalExample: Conditional = {
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

const result = evalConditional(conditionalExample, userResponses);
console.log(result); // true

// Ejemplo con anidación (lógica compleja)
const conditionalWithNesting: Conditional = {
  type: "any", // OR principal
  rules: [
    // Regla simple
    { id_question: 1, operator: ">", value: 10 },
    // Conditional anidado
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
const complexResult = evalConditional(conditionalWithNesting, complexResponses);
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

function evalConditional(conditional, responses) {
  const results = conditional.rules.map(rule => {
    // Si es una regla simple
    if (rule.id_question !== undefined) {
      return evalRule(responses[rule.id_question], rule.operator, rule.value);
    }
    // Si es un conditional anidado
    else {
      return evalConditional(rule, responses);
    }
  });

  switch (conditional.type) {
    case "all": return results.every(Boolean);
    case "any": return results.some(Boolean);
    case "none": return !results.some(Boolean);
    default: return false;
  }
}

const conditionalExample = {
  type: "all",
  rules: [
    { id_question: 1, operator: ">", value: 0 },
    { id_question: 2, operator: "<=", value: 5 }
  ]
};

const userResponses = { 1: 3, 2: 5, 3: 10 };

const result = evalConditional(conditionalExample, userResponses);
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

class ConditionalRule(BaseModel):
    id_question: int
    operator: EConditionalOperator
    value: Union[int, float, str]

class Conditional(BaseModel):
    type: EConditionalType
    rules: List[Union[ConditionalRule, 'Conditional']]  # permite anidación
```

### Ejemplo de Uso

```python
# Crear conditional (type-safe)
conditional = Conditional(
    type=EConditionalType.ALL,
    rules=[
        ConditionalRule(
            id_question=1, 
            operator=EConditionalOperator.GREATER_THAN, 
            value=0
        )
    ]
)

# Serializar para BD
json_data = conditional.model_dump_json()
# {"type": "all", "rules": [{"id_question": 1, "operator": ">", "value": 0}]}

# Ejemplo con anidación
conditional_nested = Conditional(
    type=EConditionalType.ANY,  # OR principal
    rules=[
        # Regla simple
        ConditionalRule(id_question=1, operator=EConditionalOperator.GREATER_THAN, value=10),
        # Conditional anidado
        Conditional(
            type=EConditionalType.ALL,  # AND anidado
            rules=[
                ConditionalRule(id_question=2, operator=EConditionalOperator.GREATER_EQUAL, value=5),
                ConditionalRule(id_question=3, operator=EConditionalOperator.EQUAL, value="yes")
            ]
        )
    ]
)

# Flujo completo Frontend → Backend → BD
# 1. Frontend envía SchemaCreateAPIQuestion con condition como Conditional
api_question = SchemaCreateAPIQuestion(
    type=EQuestionType.SINGLE_CHOICE,
    text="¿Has tenido pensamientos de autolesión?",
    order=9,
    condition=conditional_nested,  # Objeto Conditional
    list_options=[]
)

# 2. Backend convierte a schema de BD
db_question = api_question.to_db_schema()  # Conversión automática según motor

# 3. Resultado según motor:
# SQLite: condition = '{"type": "any", "rules": [...]}'  (string)
# PostgreSQL: condition = {"type": "any", "rules": [...]}  (dict/JSONB)
```

---

## 🏗️ Arquitectura de Schemas (Mejorada)

### Separación de Responsabilidades

La arquitectura de schemas está diseñada para separar claramente las responsabilidades entre la API y la base de datos, siguiendo el principio de que **el frontend siempre trabaja con objetos estructurados**, mientras que **la BD se adapta según el motor**.

#### 1. **SchemaBaseQuestion** - Base para API
```python
class SchemaBaseQuestion(BaseORMModel):
    condition: Optional[Conditional]  # Siempre objeto estructurado
```

#### 2. **SchemaBaseQuestion_str** - Base para BD
```python
class SchemaBaseQuestion_str(BaseORMModel):
    condition: Optional[Conditional | str]  # Flexible según motor
```

#### 3. **SchemaCreateAPIQuestion** - Para Frontend/API
- `condition: Optional[Conditional]` - Siempre como objeto estructurado
- El frontend envía y recibe objetos JSON estructurados
- Validación completa de tipos y estructura
- Método `to_db_schema()` para conversión automática

#### 4. **SchemaCreateDBQuestion** - Para Base de Datos  
- `condition: Optional[Conditional | str]` - Flexible según motor de BD
- SQLite: Se convierte automáticamente a JSON string
- PostgreSQL: Se mantiene como JSONB nativo
- Conversión transparente en el `@model_validator`

### Flujo de Conversión

```python
# Frontend → API
api_data = SchemaCreateAPIQuestion(condition=Conditional(...))

# API → BD (conversión automática)
db_data = api_data.to_db_schema()  # o SchemaCreateDBQuestion(**api_data.dict())

# La conversión se hace automáticamente según el motor:
# - SQLite: condition se convierte a JSON string
# - PostgreSQL: condition se mantiene como objeto
```

### Ejemplo de Uso en Infraestructura

```python
def create_question(api_data: SchemaCreateAPIQuestion):
    """
    Imaginemos que en el frontend se usa SchemaCreateAPIQuestion,
    luego en alguna capa de infraestructura, se hace la conversión:
    """
    
    # La propiedad condition siempre será un JSON que viene desde el frontend
    question_db_schema = api_data.to_db_schema()  # Conversión automática
    
    # Aquí ya está preparado para inserción en BD (dinámico según motor)
    # - SQLite: condition es string JSON
    # - PostgreSQL: condition es objeto/dict
    
    return repository.create(question_db_schema)
```

---

## 📝 Notas y Recomendaciones

- Se asume que las respuestas se almacenan en un objeto donde la clave es el `id_question`.
- Los operadores `<`, `>`, `<=`, `>=` aplican sólo para valores numéricos; con strings la evaluación retorna `false`.
- El tipo `"none"` permite usar lógica de negación para que ninguna regla se cumpla.
- Puedes extender esta lógica para operadores más complejos (`includes`, `in`, etc.) si tu caso lo requiere.
- Esta lógica es clave para crear cuestionarios y formularios con visibilidad y habilitación dinámica de preguntas o secciones.
- **Nueva arquitectura**: El frontend siempre trabaja con objetos `Conditional`, la conversión a string/JSON se hace automáticamente en la capa de BD según el motor.