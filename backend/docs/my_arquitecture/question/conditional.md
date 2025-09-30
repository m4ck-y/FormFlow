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
| `type` | string | Tipo de lógica para evaluar las reglas:- `"all"`: todas las reglas deben cumplirse (AND).- `"any"`: al menos una regla debe cumplirse (OR).- `"none"`: ninguna regla debe cumplirse (NOT). |
| `rules` | array | Lista de reglas individuales a evaluar. |

---

## 🧩 Regla Individual (`rule`)

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id_question` | integer | ID de la pregunta cuyas respuestas se evalúan. |
| `operator` | string | Operador lógico de comparación:`"=="`, `"!="`, `">"`, `"<"`, `">="`, `"<="`. |
| `value` | number | string | Valor contra el que se compara la respuesta de la pregunta especificada. |

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
  rules: ConditionalRule[];
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
  const results = conditional.rules.map((rule) =>
    evalRule(responses[rule.id_question], rule.operator, rule.value)
  );

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
  const results = conditional.rules.map(rule =>
    evalRule(responses[rule.id_question], rule.operator, rule.value)
  );

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

## 📝 Notas y Recomendaciones

- Se asume que las respuestas se almacenan en un objeto donde la clave es el `id_question`.
- Los operadores `<`, `>`, `<=`, `>=` aplican sólo para valores numéricos; con strings la evaluación retorna `false`.
- El tipo `"none"` permite usar lógica de negación para que ninguna regla se cumpla.
- Puedes extender esta lógica para operadores más complejos (`includes`, `in`, etc.) si tu caso lo requiere.
- Esta lógica es clave para crear cuestionarios y formularios con visibilidad y habilitación dinámica de preguntas o secciones.