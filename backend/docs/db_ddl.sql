-- ===================================================================
-- TABLA: form
-- Representa la plantilla inmutable de un cuestionario o formulario.
-- Define su estructura lógica, pero NO almacena respuestas ni instancias.
-- ===================================================================
CREATE TABLE form (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    scoring_expression JSONB,      -- Fórmula para calcular puntaje (ej. {"op": "sum", "fields": ["q1", "q2"]})
    evaluation_expression JSONB    -- Regla para clasificar resultado (ej. {"if": [{"gte": ["score", 70]}, "aprobado", "reprobado"]})
);

COMMENT ON TABLE form IS 'Plantilla inmutable de un formulario. Define preguntas (vía tabla question), y lógica de cálculo mediante expresiones en JSONB.';

COMMENT ON COLUMN form.key IS 'Identificador semántico y estable (ej. "onboarding_survey_v3"). Útil para referencias en código o integraciones. No cambia aunque se modifique el nombre.';

COMMENT ON COLUMN form.name IS 'Nombre legible del formulario para usuarios finales (ej. "Encuesta de Bienvenida").';

COMMENT ON COLUMN form.description IS 'Descripción explicativa del propósito del formulario.';

COMMENT ON COLUMN form.scoring_expression IS 'Expresión en JSONB que define cómo se calcula el puntaje numérico a partir de las respuestas. Ejemplo: {"operation": "weighted_sum", "weights": {"q1": 0.3, "q2": 0.7}}. Se evalúa al procesar una respuesta.';

COMMENT ON COLUMN form.evaluation_expression IS 'Expresión en JSONB que define cómo se interpreta el puntaje para generar una clasificación cualitativa. Ejemplo: {"if": [{"gte": ["score", 80]}, "excelente", {"gte": ["score", 60]}, "suficiente", "insuficiente"]}.';

-- ===================================================================
-- TABLA: question
-- Define cada pregunta dentro de un formulario.
-- Vinculada 1:N con form. Esencial para validar respuestas y renderizar el cuestionario.
-- ===================================================================
CREATE TABLE question (
    id SERIAL PRIMARY KEY,
    id_form INTEGER NOT NULL REFERENCES form(id) ON DELETE CASCADE,
    key VARCHAR(100) NOT NULL,
    text TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL,
    config JSONB,
    position INTEGER NOT NULL DEFAULT 0,
    UNIQUE (id_form, key)
);

COMMENT ON TABLE question IS 'Pregunta individual que forma parte de un formulario. Permite validar que las respuestas correspondan a preguntas reales y definir su comportamiento.';

COMMENT ON COLUMN question.key IS 'Identificador único dentro del formulario (ej. "satisfaction_rating"). Se usa en las expresiones de scoring/evaluación y en las respuestas.';

COMMENT ON COLUMN question.question_type IS 'Tipo de pregunta: "text", "number", "single_choice", "multiple_choice", "boolean", etc. Define cómo se interpreta el campo "value" en la respuesta.';

COMMENT ON COLUMN question.config IS 'Configuración específica por tipo. Ejemplos: {"options": ["Sí", "No"]}, {"min": 0, "max": 10}, {"required": true}.';

-- ===================================================================
-- TABLA: assignment
-- Representa la asignación lógica de un formulario a una persona o entidad.
-- NOTA: La persona asignada (id_person) NO tiene por qué ser quien responde.
-- Esto permite escenarios como:
--   • Un tutor responde por un estudiante.
--   • Un gerente asigna una autoevaluación a su equipo (pero cada uno responde por sí mismo).
--   • Un sistema asigna a un grupo, y luego un representante responde.
-- 
-- GESTIÓN DE REASIGNACIONES: Un usuario puede tener múltiples asignaciones al mismo formulario
-- en diferentes momentos. Cada nueva asignación crea un registro independiente en esta tabla.
-- Ejemplo: Juan puede tener asignación 1 (enero 2024), asignación 2 (febrero 2024) para el mismo formulario.
-- 
-- RESULTADOS POR ASIGNACIÓN: Almacena los resultados definitivos de la asignación,
-- basados en la mejor respuesta o la última respuesta enviada para esta asignación específica.
-- 
-- PROGRESO POR ASIGNACIÓN: También puede almacenar el progreso actual de la asignación
-- para mostrar en interfaces de usuario sin necesidad de cálculos complejos.
-- 
-- CÁLCULO DE RESULTADOS: Los campos scoring_result y evaluation_result se calculan
-- automáticamente cuando answered_questions = total_questions (formulario completado)
-- y el estado del intento activo es 'completed' o 'submitted'.
-- ===================================================================
CREATE TABLE assignment (
    id SERIAL PRIMARY KEY,
    id_form INTEGER NOT NULL REFERENCES form(id) ON DELETE CASCADE,
    id_person INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    -- Progreso actual de la asignación
    n_questions_total INTEGER,                    -- Total de preguntas del formulario
    n_questions_answered INTEGER DEFAULT 0,       -- Preguntas respondidas en intento activo actual
    -- Resultados definitivos de la asignación
    scoring_result JSONB,                       -- Resultado definitivo del cálculo de puntaje
    evaluation_result JSONB,                    -- Resultado definitivo de la evaluación cualitativa
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE assignment IS 'Asignación lógica de un formulario a una persona o entidad (id_person). NO implica que esa persona responda directamente. Sirve para control de acceso, notificaciones y trazabilidad organizacional. GESTIÓN DE REASIGNACIONES: Esta tabla permite que un usuario tenga múltiples asignaciones del mismo formulario en diferentes momentos. Cada asignación es independiente y puede tener su propio historial de respuestas. RESULTADOS POR ASIGNACIÓN: Almacena los resultados definitivos (puntaje y evaluación) asociados a esta asignación específica, permitiendo comparar rendimiento entre diferentes asignaciones del mismo formulario a la misma persona. PROGRESO: También almacena el progreso actual para optimizar consultas de interfaces de usuario.';

COMMENT ON COLUMN assignment.id_person IS 'ID de la persona, estudiante, empleado o entidad a quien se le "asigna" el formulario. Puede ser distinto del usuario que responde (ver response.id_responder_user). Ej: un alumno (id_person=123) recibe una evaluación, pero su tutor (id_responder_user=456) la completa.';

COMMENT ON COLUMN assignment.status IS 'Estado de la asignación: "active", "cancelled", "completed", etc. Útil para gestionar flujos sin eliminar registros. En caso de reasignaciones, las asignaciones anteriores pueden mantenerse con status "completed" o "cancelled" para mantener historial.';

COMMENT ON COLUMN assignment.n_questions_total IS 'Total de preguntas del formulario asignado. Se calcula al crear la asignación y se usa para calcular progreso.';

COMMENT ON COLUMN assignment.n_questions_answered IS 'Cantidad de preguntas respondidas en el intento activo actual. Se actualiza en tiempo real a medida que el usuario responde preguntas. Permite mostrar progreso sin cálculos complejos.';

COMMENT ON COLUMN assignment.scoring_result IS 'Resultado definitivo del cálculo de puntaje para esta asignación. Se calcula automáticamente cuando n_questions_answered = n_questions_total (formulario completado) y el estado del intento activo es "completed" o "submitted". Contiene el puntaje final y detalles de cálculo basados en la mejor respuesta o la última respuesta enviada. Ejemplo: {"final_score": 85, "calculation_method": "best_score", "details": {"best_score": 85, "last_score": 70, "attempts": 3}, "calculation_timestamp": "2024-01-15T10:30:00Z"}';

COMMENT ON COLUMN assignment.evaluation_result IS 'Resultado definitivo de la evaluación cualitativa para esta asignación. Se calcula automáticamente cuando n_questions_answered = n_questions_total (formulario completado) y el estado del intento activo es "completed" o "submitted". Contiene la clasificación final y detalles basados en scoring_result. Ejemplo: {"category": "aprobado", "level": "alto", "description": "Excelente desempeño", "based_on": "best_score", "thresholds": {"min": 70, "max": 100}, "evaluation_timestamp": "2024-01-15T10:30:00Z"}';

-- ===================================================================
-- TABLA: scheduled
-- Define cuándo y por cuánto tiempo está disponible una asignación para ser respondida.
-- Cada programación permite uno o más intentos (response).
-- 
-- RELACIÓN CON REASIGNACIONES: Cada assignment puede tener uno o más scheduled, permitiendo
-- múltiples ventanas de tiempo para responder el mismo formulario asignado.
-- ===================================================================
CREATE TABLE scheduled (
    id SERIAL PRIMARY KEY,
    id_assignment INTEGER NOT NULL REFERENCES assignment(id) ON DELETE CASCADE,
    id_admin INTEGER NOT NULL,
    available_from TIMESTAMP NOT NULL,
    available_until TIMESTAMP NOT NULL,
    time_limit_minutes INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (available_from <= available_until),
    CHECK (time_limit_minutes IS NULL OR time_limit_minutes > 0)
);

COMMENT ON TABLE scheduled IS 'Programación de la disponibilidad de una asignación. Define la ventana de tiempo en la que se puede iniciar una respuesta y el límite de duración por intento. GESTIÓN DE REASIGNACIONES: Un assignment puede tener múltiples scheduled, permitiendo reprogramar la disponibilidad del formulario para la misma persona.';

COMMENT ON COLUMN scheduled.id_admin IS 'ID del administrador o sistema que programó esta disponibilidad. Útil para auditoría.';

COMMENT ON COLUMN scheduled.time_limit_minutes IS 'Tiempo máximo permitido desde que se inicia una respuesta (started_at) hasta que debe enviarse (submitted_at). Si es NULL, no hay límite.';

-- ===================================================================
-- TABLA: response
-- Representa un intento concreto de responder un formulario programado.
-- Aquí se almacenan los metadatos del intento y los resultados calculados.
-- 
-- GESTIÓN DE REINTENTOS: Cada fila representa un intento independiente de completar
-- el formulario. Un scheduled puede tener múltiples responses (reintentos).
-- Ejemplo: Un usuario puede tener intento 1 (abandonado), intento 2 (enviado), intento 3 (en progreso).
-- 
-- GESTIÓN DE REASIGNACIONES: Al reasignar el mismo formulario, se crean nuevas responses
-- asociadas a la nueva asignación (nuevo scheduled), permitiendo historial completo.
-- 
-- RELACIÓN CON RESULTADOS: Los resultados de cada intento se almacenan aquí, y el assignment
-- puede actualizar sus resultados finales basados en la respuesta definitiva de esta asignación.
-- ===================================================================
CREATE TABLE response (
    id SERIAL PRIMARY KEY,
    id_scheduled INTEGER NOT NULL REFERENCES scheduled(id) ON DELETE CASCADE,
    id_responder_user INTEGER NOT NULL,
    started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    submitted_at TIMESTAMP,
    attempt_number INTEGER DEFAULT 1,    -- Número de intento para el mismo scheduled
    CHECK (completed_at IS NULL OR started_at <= completed_at),
    CHECK (submitted_at IS NULL OR (completed_at IS NOT NULL AND completed_at <= submitted_at))
);

COMMENT ON TABLE response IS 'Intento individual de completar un formulario programado. GESTIÓN DE REINTENTOS: Cada fila representa un intento independiente. Pueden existir múltiples intentos por scheduled (reintentos). GESTIÓN DE REASIGNACIONES: Al reasignar el mismo formulario, se crean nuevas responses asociadas a la nueva programación, manteniendo historial completo. RELACIÓN CON RESULTADOS: Los resultados de cada intento se almacenan aquí y pueden usarse para actualizar los resultados finales en la tabla assignment.';

COMMENT ON COLUMN response.id_responder_user IS 'ID del usuario que REALMENTE completó y envió el formulario. Puede ser distinto de assignment.id_person (ej. tutor, representante, delegado).';

COMMENT ON COLUMN response.started_at IS 'Momento en que el usuario abrió el formulario para responder.';

COMMENT ON COLUMN response.completed_at IS 'Momento en que el usuario marcó el formulario como "completo" (puede guardar progreso sin enviar).';

COMMENT ON COLUMN response.submitted_at IS 'Momento en que el usuario envió oficialmente el formulario. Solo entonces se considera válido para cálculo de resultados.';

COMMENT ON COLUMN response.status IS 'Estado del intento: "active" (en progreso), "completed" (completado pero no enviado), "submitted" (enviado), "abandoned" (abandonado). Permite distinguir entre intentos activos e intentos anteriores.';

COMMENT ON COLUMN response.attempt_number IS 'Número de intento para el mismo scheduled. Permite identificar si es el primer intento, segundo intento, etc., facilitando el control de reintentos.';

-- ===================================================================
-- TABLA: answer
-- Almacena la respuesta a una pregunta específica dentro de un intento (response).
-- El valor se guarda en JSONB para soportar múltiples tipos de datos.
-- 
-- RELACIÓN CON REINTENTOS: Las respuestas están asociadas a responses específicos,
-- permitiendo que cada intento tenga sus propias respuestas independientes.
-- ===================================================================
CREATE TABLE answer (
    id SERIAL PRIMARY KEY,
    id_response INTEGER NOT NULL REFERENCES response(id) ON DELETE CASCADE,
    id_question INTEGER NOT NULL REFERENCES question(id) ON DELETE CASCADE,
    value JSONB NOT NULL,
    CHECK (value ? 'type' AND value ? 'value')
);

COMMENT ON TABLE answer IS 'Respuesta individual a una pregunta en un intento específico. El valor se normaliza en JSONB para flexibilidad. GESTIÓN DE REINTENTOS: Las respuestas están asociadas a responses específicos, lo que permite que cada intento tenga sus propias respuestas independientes, facilitando el historial de respuestas por intento.';

COMMENT ON COLUMN answer.value IS 'Estructura normalizada: {"type": "string|number|boolean|array", "value": ...}. Ejemplos:
  - Texto: {"type": "text", "value": "Muy satisfecho"}
  - Número: {"type": "number", "value": 9.5}
  - Opción múltiple: {"type": "array", "value": ["opc1", "opc3"]}
  Esta estructura permite procesar respuestas de forma genérica y segura.';