### 🧾 Tipo de Pregunta: `RANGE`

### 🧩 Descripción:

Una pregunta de tipo `RANGE` permite al usuario **seleccionar un valor numérico** dentro de un **rango definido** (por ejemplo, de 0 a 7). Se usa para medir cantidades, frecuencias u otras métricas numéricas que tienen un límite inferior y superior conocidos.

---

### 📐 Estructura del Objeto

```json
{
  "id": 1,
  "type": "RANGE",
  "order": 1,
  "text": "Durante los últimos 7 días, ¿cuántos días realizó usted actividades físicas vigorosas como levantar objetos pesados, excavar, aeróbicos o pedalear rápido en bicicleta?",
  "validation": {
    "min_value": 0,
    "max_value": 7
  }
}

```

---

### 🧱 Propiedades

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id` | `integer` | Identificador único de la pregunta. |
| `type` | `string` | Tipo de pregunta. En este caso, siempre es `"RANGE"`. |
| `order` | `integer` | Posición de esta pregunta en la secuencia del cuestionario. |
| `text` | `string` | Texto o enunciado de la pregunta que se muestra al usuario. |
| `validation` | `object` | Reglas de validación del valor permitido. |

### Dentro de `validation`:

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `min_value` | `number` | Valor mínimo permitido. |
| `max_value` | `number` | Valor máximo permitido. |

---

### 🧠 Semántica de Uso

- Este tipo de pregunta está diseñada para recolectar **valores numéricos enteros** dentro de un rango fijo.
- Ideal para preguntas de **frecuencia** o **conteo limitado**, como:
    - "¿Cuántos días hizo ejercicio esta semana?"
    - "¿Cuántas veces comió frutas en los últimos 7 días?"
- El valor ingresado debe estar dentro de `min_value` y `max_value` (inclusive).

---

### ✅ Validación (lógica de entrada)

Antes de aceptar la respuesta, se deben cumplir las siguientes condiciones:

```python
min_value <= respuesta <= max_value

```

Cualquier entrada fuera de ese rango debe ser rechazada con un mensaje de error (por ejemplo: `"El valor debe estar entre 0 y 7"`).

---

### 🖥️ Representación en la UI (sugerencias)

- **Slider (barra deslizante)** con números del `min_value` al `max_value`.
- **Input numérico** con validación en tiempo real.
- **Botones de incremento/decremento (+ / -)** con límites establecidos.

---

### 🧪 Ejemplo de Respuesta Esperada (formato JSON)

```json
{
  "question_id": 1,
  "answer": 5
}

```

---

### 🔐 Consideraciones adicionales

- Puede ser útil permitir solo números enteros (`int`) si la métrica no admite decimales.
- En interfaces de usuario, mostrar el rango de valores esperados ayuda a reducir errores.
- Si se usa un `slider`, mostrar los números como etiquetas para facilitar la selección.