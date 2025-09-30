## 🧾 Tipo de Pregunta: `TIMER`

---

### 🧩 Descripción:

Una pregunta de tipo `TIMER` se usa para registrar una **duración de tiempo** (no una hora del día, sino un intervalo). El valor se espera como un **string en formato ISO 8601** de duración, como `"PT30M"` para 30 minutos o `"PT1H15M"` para 1 hora y 15 minutos.

---

### 📐 Estructura del Objeto

```json
 

```

---

### 🧱 Propiedades

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id` | `integer` | Identificador único de la pregunta. |
| `type` | `string` | Tipo de pregunta. En este caso, `"TIMER"`. |
| `order` | `integer` | Posición de esta pregunta en el cuestionario. |
| `text` | `string` | Texto de la pregunta que se muestra al usuario. |
| `validation` | `object` | Reglas de validación que definen los límites de duración aceptados. |

### Dentro de `validation`:

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `min_value` | `string` (ISO 8601 duration) | Duración mínima aceptada. |
| `max_value` | `string` (ISO 8601 duration) | Duración máxima aceptada. |

---

### 🧠 Formato de Duración: **ISO 8601 Duration**

Este formato es el estándar internacional para representar **intervalos de tiempo** como texto.

### 📌 Sintaxis general:

```
PnYnMnDTnHnMnS

```

- `P` = comienzo del período
- `T` = separador entre parte de fecha y hora
- `nH` = horas
- `nM` = minutos
- `nS` = segundos

### 📌 Ejemplos usados en este tipo de pregunta:

| Valor ISO8601 | Descripción |
| --- | --- |
| `"PT0M"` | 0 minutos |
| `"PT24H"` | 24 horas |
| `"PT1H30M"` | 1 hora y 30 minutos |
| `"PT45M"` | 45 minutos |
| `"PT2H"` | 2 horas |

> Nota: Solo se usan componentes de tiempo (T...), no de fecha.
> 

---

### ✅ Validación

Antes de aceptar la respuesta, la duración ingresada debe estar dentro del rango definido:

```python
min_value <= respuesta <= max_value

```

Esto se puede comparar usando objetos `datetime.timedelta` en Python, por ejemplo, o directamente con herramientas que soporten ISO 8601.

---

### 🖥️ Representación en UI (sugerencias)

- **Selector de tiempo personalizado** (`HH:mm`, `H:M`, o `duración`) con validación en tiempo real.
- **Campos separados** para horas y minutos.
- Posibilidad de mostrar la duración total seleccionada (por ejemplo: "1 hora 45 minutos").

---

### 🧪 Ejemplo de Respuesta Esperada

```json
{
  "question_id": 2,
  "answer": "PT1H30M"
}

```

---

### 🔐 Consideraciones Técnicas

- El valor debe parsearse como un **ISO 8601 duration string**.
- Idealmente, debe convertirse a una estructura como `timedelta` en el backend para validación y almacenamiento.
- Evitar valores inválidos como `"PT25H"` si el `max_value` es `"PT24H"`.

---

### 🧰 Conversión a `timedelta` en Python (ejemplo)

```python
import isodate

duracion = isodate.parse_duration("PT1H30M")
print(duracion.total_seconds())  # 5400.0

```