// =============================================================================
// ORSTTY PERSONALITY
// Plantillas de texto separadas de la lógica del motor (orstty-engine.js
// nunca decide qué "dice" ORSTTY, solo qué intención/entidad detectó).
//
// RASTRO puede editar este archivo libremente, o agregar respuestas nuevas
// con registerResponse(), sin tocar el motor.
//
// IMPORTANTE: estas plantillas nunca inventan datos (nombres de videos,
// cursos, usuarios, etc). Solo acompañan el resultado que ya devolvió
// el motor y que RASTRO llenará con datos reales de Firebase.
// =============================================================================

const templates = {
  saludar: [
    '¡Hola! Soy ORSTTY, tu asistente de estudio. ¿Qué tema o duda académica revisamos hoy?',
    'Hola, listo para estudiar. Dime qué curso o tema de la sección Aprender quieres repasar.',
    '¡Buenas! Soy ORSTTY. Pregúntame sobre cualquier concepto del temario, fórmulas o teoría.',
    'Aquí estoy. ¿Con qué tema del temario arrancamos hoy?'
  ],
  ayuda: [
    'Soy tu asistente de estudio en RASTRO. Pregúntame sobre el temario oficial, conceptos, fórmulas o temas de la sección Aprender.',
    'Te ayudo a repasar todo el contenido de Aprender. Dime qué tema necesitas entender y lo resolvemos paso a paso.',
    'Estoy para resolver tus dudas del temario rápido y al grano. ¿Qué curso o tema revisamos?'
  ],
  buscar_videos: [
    'Buscando el tema que me pides, un momento...',
    'Revisando qué explicaciones y recursos tenemos sobre esto...',
    'Escaneando el temario para ubicar el tema...'
  ],
  buscar_material: [
    'Localizando el material de estudio...',
    'Revisando los apuntes y separatas del temario...',
    'Buscando los documentos y fichas de estudio...'
  ],
  buscar_cursos: [
    'Revisando los cursos disponibles en el temario...',
    'Consultando los cursos de la sección Aprender...',
    'Explorando las materias disponibles...'
  ],
  buscar_libros: [
    'Buscando en la biblioteca académica...',
    'Revisando los libros y textos de referencia...',
    'Consultando las fuentes bibliográficas recomendadas...'
  ],
  buscar_examenes: [
    'Buscando simulacros y preguntas tipo examen...',
    'Localizando preguntas del banco de evaluación...',
    'Revisando el banco de preguntas para este tema...'
  ],
  buscar_publicaciones: [
    'Revisando aportes de la comunidad de estudio...',
    'Consultando las consultas y notas compartidas...',
    'Buscando publicaciones recientes...'
  ],
  buscar_perfiles: [
    'Buscando a ese usuario...',
    'Consultando el registro de estudiantes...'
  ],
  buscar_semanas: [
    'Revisando las semanas del temario...',
    'Consultando la programación de semanas de estudio...',
    'Verificando los temas por semana...'
  ],
  buscar_nuevos: [
    'Revisando las novedades académicas...',
    'Consultando los temas y materiales añadidos recientemente...',
    'Verificando las últimas actualizaciones...'
  ],
  comparar_recursos: [
    'Comparando los recursos solicitados...',
    'Analizando las diferencias entre ambos temas...',
    'Evaluando las opciones del temario...'
  ],
  filtrar: [
    'Aplicando los filtros solicitados...',
    'Filtrando los resultados del temario...',
    'Mostrando únicamente el contenido relevante...'
  ],
  abrir_recurso: [
    'Abriendo el recurso solicitado...',
    'Redirigiéndote al tema correspondiente...'
  ],
  volver: [
    'Listo, volvemos. ¿Qué más quieres repasar?',
    'De vuelta al menú. ¿Seguimos con otro tema del temario?'
  ],
  pregunta_conocimiento: [
    'Te explico este concepto con base en el temario:',
    'Aquí tienes la explicación clara y directa:'
  ],
  desviar_recurso: [
    'Buscando los conceptos disponibles en Aprender...',
    'Consultando el temario de este curso...'
  ],
  conversacion: [
    'Interesante. ¿En qué tema del temario te puedo ayudar con eso?',
    'Cuéntame, ¿qué tema o fórmula específica necesitas repasar?',
    'Listo para ayudarte. ¿Qué materia o lección estudiamos?'
  ],
  no_entendido: [
    'No logré captar la consulta. Puedes escribir algo como "explícame cinemática" o "fórmula de energía".',
    'No comprendí bien la pregunta. Intenta con el nombre de un curso, semana o concepto del temario.',
    'No identifiqué ese tema. ¿Quieres que busquemos una materia específica de Aprender?'
  ],
  no_results: [
    'No encontré coincidencias con ese término. ¿Probamos con otro tema del temario?',
    'Sin resultados directos. Puedes intentar con el nombre de la materia o una palabra clave.',
    'No se hallaron registros. ¿Deseas explorar los cursos de Aprender?'
  ],
  error: [
    'Ocurrió una interrupción al procesar la consulta. Por favor intenta de nuevo.',
    'Hubo un detalle técnico temporal. Vuelve a intentar en un instante.'
  ],
  default: [
    'Entendido.',
    'Listo.',
    'Correcto.'
  ],
};

/**
 * Devuelve una respuesta de texto para una intención o clave de estado.
 * Si no existe, usa la respuesta por defecto.
 */
export function getResponse(key) {
  const options = templates[key] || templates.default;
  const i = Math.floor(Math.random() * options.length);
  return options[i];
}

/**
 * Agrega una respuesta nueva a una intención/clave existente o nueva,
 * sin tocar el resto del archivo.
 * registerResponse("buscar_videos", "Ya casi tengo tus videos...");
 */
export function registerResponse(key, text) {
  if (!templates[key]) templates[key] = [];
  templates[key].push(text);
}
