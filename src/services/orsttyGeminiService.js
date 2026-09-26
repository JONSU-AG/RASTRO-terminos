// src/services/orsttyGeminiService.js
// Servicio unificado para el asistente inteligente ORSTTY con Google Gemini & Modo Voz estilo Alexa

export const PREU_SUBJECTS = [
  { id: 'biologia', name: 'Biología', iconSlug: 'dna', color: '#10B981', area: 'Ciencias Médicas y Naturales' },
  { id: 'quimica', name: 'Química', iconSlug: 'flask', color: '#06B6D4', area: 'Ciencias e Ingenierías' },
  { id: 'fisica', name: 'Física', iconSlug: 'zap', color: '#EAB308', area: 'Físico-Matemáticas' },
  { id: 'matematica', name: 'Matemática & Álgebra', iconSlug: 'calculator', color: '#8B5CF6', area: 'Matemáticas y Análisis' },
  { id: 'razonamiento_matematico', name: 'Raz. Matemático', iconSlug: 'hash', color: '#6366F1', area: 'Habilidad Cuantitativa' },
  { id: 'lenguaje', name: 'Lenguaje & Gramática', iconSlug: 'book', color: '#EC4899', area: 'Comunicación y Letras' },
  { id: 'literatura', name: 'Literatura', iconSlug: 'books', color: '#F43F5E', area: 'Humanidades' },
  { id: 'filosofia', name: 'Filosofía', iconSlug: 'landmark', color: '#64748B', area: 'Pensamiento Crítico' },
  { id: 'psicologia', name: 'Psicología', iconSlug: 'brain', color: '#A855F7', area: 'Ciencias Sociales' },
  { id: 'civica', name: 'Cívica & Constitución', iconSlug: 'scale', color: '#14B8A6', area: 'Ciudadanía y Derecho' },
  { id: 'historia_peru', name: 'Historia del Perú', iconSlug: 'map-pin', color: '#EF4444', area: 'Ciencias Históricas' },
  { id: 'historia_universal', name: 'Historia Universal', iconSlug: 'globe', color: '#F97316', area: 'Ciencias Históricas' },
  { id: 'geografia', name: 'Geografía', iconSlug: 'map', color: '#059669', area: 'Geografía del Perú y Mundo' },
  { id: 'logica', name: 'Lógica Proposicional', iconSlug: 'lightbulb', color: '#3B82F6', area: 'Razonamiento Formal' },
  { id: 'anatomia', name: 'Anatomía Humana', iconSlug: 'heart', color: '#DC2626', area: 'Biomédicas' }
];

/**
 * Consulta al endpoint de backend de ORSTTY (con Google Gemini 3.8 Flash)
 */
export async function askOrsttyGemini(message, history = [], context = {}) {
  try {
    const res = await fetch('/api/orstty/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        history: history.slice(-6),
        context
      })
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const data = await res.json();
    return {
      text: data.text || 'He recibido tu mensaje.',
      speechSummary: data.speechSummary || data.text,
      suggestions: Array.isArray(data.suggestions) ? data.suggestions : ['Explicar tema', 'Simulador', 'Temario'],
      originCard: data.originCard || null,
      actions: Array.isArray(data.actions) ? data.actions : (data.action ? [data.action] : []),
      action: data.action || (Array.isArray(data.actions) ? data.actions[0] : null),
      quizQuestion: data.quizQuestion || null,
      isGemini: data.isGemini || false
    };
  } catch (err) {
    console.warn('Error connecting to /api/orstty/chat, using smart fallback:', err);
    return fallbackOrsttyResponse(message);
  }
}

/**
 * Fallback heurístico inteligente si el servidor no responde o hay lentitud
 * Incluye tolerancia avanzada a errores ortográficos, detección de áreas y test vocacional
 */
function fallbackOrsttyResponse(text) {
  const raw = (text || '').toLowerCase();
  const q = raw.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // 1. Detección de Test Vocacional / Orientación / Dudas de carrera (incluso con typos)
  if (
    q.includes('voca') || q.includes('carrer') || q.includes('estudia') || 
    q.includes('orien') || q.includes('aptitud') || q.includes('elegir') ||
    q.includes('test') || q.includes('no se que') || q.includes('que elijo') ||
    q.includes('vocacional') || q.includes('voacional') || q.includes('escorbo') ||
    q.includes('esapecuifico') || q.includes('haga el test') || q.includes('hazme el test')
  ) {
    return {
      text: 'Si tienes dudas sobre qué carrera o área elegir para postular a la universidad, el **Test Vocacional Oficial** te ayuda a identificar tu perfil mediante 20 preguntas ponderadas en **Biomédicas**, **Ingenierías** y **Sociales**.',
      speechSummary: 'Te he enviado la tarjeta para realizar el Test Vocacional Oficial Universitario.',
      suggestions: ['Iniciar Test Vocacional Ahora', 'Ver Área Biomédicas (Biología)', 'Ver Área Ingenierías (Física)', 'Ver Área Sociales (Filosofía)'],
      originCard: {
        type: 'VOCATIONAL_TEST',
        title: 'Test Vocacional Universitario Oficial',
        badge: 'Orientación Vocacional',
        badgeColor: '#A855F7',
        target: 'VOCATIONAL_TEST',
        description: 'Diagnóstico de 20 preguntas reales para calcular tu afinidad y carrera compatible.',
        ctaLabel: 'Iniciar Test Vocacional',
        previewItems: ['20 Preguntas Oficiales', 'Puntaje Ponderado', 'Diagnóstico de Carrera']
      },
      actions: [
        { type: 'VOCATIONAL_TEST', target: 'VOCATIONAL_TEST', label: 'Iniciar Test Vocacional', badge: 'Test Vocacional' },
        { type: 'NAVIGATE', target: '/aprender', label: 'Ver Temario Completo', badge: 'Aprender' }
      ],
      action: { type: 'VOCATIONAL_TEST', target: 'VOCATIONAL_TEST', label: 'Iniciar Test Vocacional', badge: 'Test Vocacional' }
    };
  }

  // 2. Chats / Permisos de compartir / Contactar creadores o usuarios
  if (
    q.includes('chat') || q.includes('permis') || q.includes('contact') || 
    q.includes('creador') || q.includes('hablar') || q.includes('autor') ||
    q.includes('pedir permiso') || q.includes('grupo') || q.includes('amigo')
  ) {
    return {
      text: 'En la sección **Chats** puedes comunicarte con otros estudiantes y creadores de contenido de la comunidad para solicitar permisos de difusión de material o coordinar grupos de estudio.',
      speechSummary: 'Puedes usar la sección Chats para contactar a creadores y pedir permisos de material.',
      suggestions: ['Ir a Chats', 'Ver Material Compartido', 'Ver Temario de Aprender'],
      originCard: {
        type: 'CHATS',
        title: 'Mensajería & Chats de Comunidad',
        badge: 'Chats & Colaboración',
        badgeColor: '#0EA5E9',
        target: '/chats',
        description: 'Canal directo para coordinar con creadores, solicitar autorización de contenido y formar grupos de estudio.',
        ctaLabel: 'Abrir Sección de Chats',
        previewItems: ['Mensajes Directos', 'Permisos de Contenido', 'Grupos de Estudio']
      },
      actions: [
        { type: 'NAVIGATE', target: '/chats', label: 'Abrir Chats', badge: 'Chats' },
        { type: 'NAVIGATE', target: '/biblioteca', label: 'Ver Biblioteca', badge: 'Biblioteca' }
      ],
      action: { type: 'NAVIGATE', target: '/chats', label: 'Abrir Chats', badge: 'Chats' }
    };
  }

  // 3. Detección de Apuntes / Resúmenes / Separatas / PDFs
  if (
    q.includes('apunte') || q.includes('resumen') || q.includes('nota') || 
    q.includes('separat') || q.includes('pdf') || q.includes('guia') ||
    q.includes('compend') || q.includes('tomo')
  ) {
    const isBio = q.includes('bio') || q.includes('medicin') || q.includes('anatom') || q.includes('salud');
    const isIng = q.includes('ingen') || q.includes('fisic') || q.includes('mate') || q.includes('algeb') || q.includes('rm');
    const isSoc = q.includes('social') || q.includes('filo') || q.includes('civic') || q.includes('histor') || q.includes('lengua') || q.includes('literat');
    const isQuim = q.includes('quim');

    let subjTarget = '/aprender';
    let subjName = 'General';
    let areaColor = '#10B981';
    let areaLabel = 'Material de Repaso';

    if (isBio) {
      subjTarget = '/aprender/biologia';
      subjName = 'Biología & Ciencias de la Salud';
      areaColor = '#10B981';
      areaLabel = 'Apuntes Biomédicas';
    } else if (isIng) {
      subjTarget = '/aprender/fisica';
      subjName = 'Física, Matemáticas & Exactas';
      areaColor = '#EAB308';
      areaLabel = 'Apuntes Ingenierías';
    } else if (isSoc) {
      subjTarget = '/aprender/filosofia';
      subjName = 'Filosofía, Humanidades & Sociales';
      areaColor = '#64748B';
      areaLabel = 'Apuntes Sociales';
    } else if (isQuim) {
      subjTarget = '/aprender/quimica';
      subjName = 'Química Preuniversitaria';
      areaColor = '#06B6D4';
      areaLabel = 'Apuntes Química';
    }

    return {
      text: `En la **Biblioteca & Material Compartido** tienes acceso a tomos preuniversitarios, apuntes y separatas en PDF. Si buscas la **teoría oficial estructurada** tema por tema, también puedes estudiarla directamente en la sección **Aprender**:`,
      speechSummary: `Encuentra apuntes en la Biblioteca y la teoría oficial completa en Aprender.`,
      suggestions: ['Ver Material en Biblioteca', `Ver Teoría en Aprender`, 'Simulador de Examen', 'Test Vocacional'],
      originCard: {
        type: 'LIBRARY',
        title: `Apuntes & Material: ${subjName}`,
        badge: areaLabel,
        badgeColor: areaColor,
        target: '/biblioteca',
        description: `Bancos de preguntas, compendios en PDF y resúmenes compartidos para reforzar tu preparación hacia la universidad.`,
        ctaLabel: 'Abrir Material Compartido',
        previewItems: ['Tomos Preuniversitarios', 'Separatas en PDF', 'Acceso Libre']
      },
      actions: [
        { type: 'NAVIGATE', target: '/biblioteca', label: 'Abrir Biblioteca', badge: 'Biblioteca' },
        { type: 'NAVIGATE', target: subjTarget, label: `Ver Teoría de ${subjName}`, badge: 'Aprender' }
      ],
      action: { type: 'NAVIGATE', target: '/biblioteca', label: 'Abrir Biblioteca', badge: 'Biblioteca' }
    };
  }

  // 4. Detección de Área Biomédicas (Biología, Medicina, Química, Anatomía, Célula)
  if (
    q.includes('biomed') || q.includes('medicin') || q.includes('bio') || q.includes('celul') || 
    q.includes('mitos') || q.includes('meios') || q.includes('adn') || q.includes('genet') || 
    q.includes('enferm') || q.includes('anatom') || q.includes('quimic') || q.includes('organo') ||
    q.includes('biolojia') || q.includes('biologia') || q.includes('ecolog') || q.includes('tejido')
  ) {
    const isQuimica = q.includes('quim');
    const isAnat = q.includes('anatom') || q.includes('organo');
    const subjId = isQuimica ? 'quimica' : isAnat ? 'anatomia' : 'biologia';
    const subjName = isQuimica ? 'Química' : isAnat ? 'Anatomía Humana' : 'Biología';
    const color = isQuimica ? '#06B6D4' : isAnat ? '#DC2626' : '#10B981';
    const topics = isQuimica ? '36 temas' : isAnat ? '24 temas' : '43 temas';

    return {
      text: `En el **Área de Biomédicas** (Medicina, Enfermería, Odontología), **${subjName}** representa la mayor ponderación de tu examen. Aquí tienes la tarjeta oficial con acceso directo a fichas, temario y contenido del curso:`,
      speechSummary: `Para Biomédicas, ${subjName} es la materia clave. Te envío su tarjeta con acceso al origen.`,
      suggestions: [`Fichas de ${subjName}`, `Temas de ${subjName}`, 'Simulador Biomédicas', 'Test Vocacional'],
      originCard: {
        type: 'SUBJECT_PATH',
        subjectId: subjId,
        subjectName: subjName,
        title: subjName,
        topicsCount: topics,
        badge: 'Área Biomédicas',
        badgeColor: color,
        target: `/aprender/${subjId}`,
        description: isQuimica 
          ? 'Materia, estructura atómica, tabla periódica, enlaces, nomenclatura y química orgánica.'
          : 'Citología, Genética, Fisiología, Bioquímica con teoría interactiva y fijas de examen.',
        ctaLabel: `Ir al curso de ${subjName}`,
        previewItems: [topics, '12 Semanas Oficiales', 'Fijas Tipo Admisión']
      },
      actions: [
        { type: 'NAVIGATE', target: `/aprender/${subjId}`, label: `Ir a ${subjName}`, badge: 'Biomédicas' },
        { type: 'NAVIGATE', target: '/biblioteca', label: `Apuntes de ${subjName}`, badge: 'Biblioteca' }
      ],
      action: { type: 'NAVIGATE', target: `/aprender/${subjId}`, label: `Ir a ${subjName}`, badge: 'Biomédicas' }
    };
  }

  // 5. Detección de Área Ingenierías (Física, Álgebra, Geometría, Trigonometría, Matemáticas)
  if (
    q.includes('ingen') || q.includes('fisic') || q.includes('fisca') || q.includes('mate') || 
    q.includes('algeb') || q.includes('rm') || q.includes('geomet') || q.includes('trigono') ||
    q.includes('cinemat') || q.includes('estatic') || q.includes('dinamic') || q.includes('vector') ||
    q.includes('newton') || q.includes('termodinam') || q.includes('electromagnet')
  ) {
    const isFisica = q.includes('fis') || q.includes('vector') || q.includes('newton') || q.includes('cinemat') || q.includes('estatic') || q.includes('dinamic');
    const isRM = q.includes('rm') || q.includes('razonamiento matematico');
    const subjId = isFisica ? 'fisica' : isRM ? 'razonamiento_matematico' : 'matematica';
    const subjName = isFisica ? 'Física' : isRM ? 'Raz. Matemático' : 'Matemática & Álgebra';
    const color = isFisica ? '#EAB308' : isRM ? '#6366F1' : '#8B5CF6';
    const topics = isFisica ? '38 temas' : isRM ? '30 temas' : '48 temas';

    return {
      text: `En el **Área de Ingenierías**, **${subjName}** y el razonamiento cuantitativo definen tu ingreso universitario. Aquí tienes la tarjeta oficial con acceso directo:`,
      speechSummary: `Para Ingenierías, ${subjName} es fundamental. Te envío la tarjeta directa.`,
      suggestions: [`Fichas de ${subjName}`, `Temas de ${subjName}`, 'Formularios y Teoremas', 'Simulador Ingenierías'],
      originCard: {
        type: 'SUBJECT_PATH',
        subjectId: subjId,
        subjectName: subjName,
        title: subjName,
        topicsCount: topics,
        badge: 'Área Ingenierías',
        badgeColor: color,
        target: `/aprender/${subjId}`,
        description: isFisica 
          ? 'Análisis dimensional, vectores, MRU/MRUV, leyes de Newton, estática, trabajo y fluidos.'
          : 'Polinomios, matrices, funciones, geometría del espacio y trigonometría analítica.',
        ctaLabel: `Ir al curso de ${subjName}`,
        previewItems: [topics, '12 Semanas Oficiales', 'Formularios & DCL']
      },
      actions: [
        { type: 'NAVIGATE', target: `/aprender/${subjId}`, label: `Abrir ${subjName}`, badge: 'Ingenierías' },
        { type: 'NAVIGATE', target: '/biblioteca', label: `Apuntes de ${subjName}`, badge: 'Biblioteca' }
      ],
      action: { type: 'NAVIGATE', target: `/aprender/${subjId}`, label: `Abrir ${subjName}`, badge: 'Ingenierías' }
    };
  }

  // 6. Detección de Área Sociales y Humanidades (Filosofía, Lenguaje, Historia, Cívica, Literatura)
  if (
    q.includes('social') || q.includes('derech') || q.includes('filo') || q.includes('lengua') || 
    q.includes('civic') || q.includes('histor') || q.includes('literat') || q.includes('psico') ||
    q.includes('humanid') || q.includes('constituc') || q.includes('geograf') || q.includes('logic') ||
    q.includes('platon') || q.includes('aristotel') || q.includes('vallejo') || q.includes('tahuantinsuyo')
  ) {
    const isFilo = q.includes('filo') || q.includes('platon') || q.includes('aristotel');
    const isCivica = q.includes('civic') || q.includes('derech') || q.includes('constituc');
    const isHist = q.includes('histor') || q.includes('tahuantinsuyo');
    const isLit = q.includes('literat') || q.includes('vallejo') || q.includes('obra');
    const isPsico = q.includes('psico');
    const isGeo = q.includes('geograf');

    const subjId = isFilo ? 'filosofia' : isCivica ? 'civica' : isHist ? 'historia_peru' : isLit ? 'literatura' : isPsico ? 'psicologia' : isGeo ? 'geografia' : 'lenguaje';
    const subjName = isFilo ? 'Filosofía' : isCivica ? 'Cívica & Constitución' : isHist ? 'Historia Nacional' : isLit ? 'Literatura' : isPsico ? 'Psicología' : isGeo ? 'Geografía' : 'Lenguaje & Gramática';
    const color = isFilo ? '#64748B' : isCivica ? '#14B8A6' : isHist ? '#EF4444' : isLit ? '#F43F5E' : isPsico ? '#A855F7' : isGeo ? '#059669' : '#EC4899';
    const topics = isFilo ? '24 temas' : isCivica ? '28 temas' : '32 temas';

    return {
      text: `En el **Área de Sociales y Humanidades** (Derecho, Psicología, Educación, Administración), **${subjName}** tiene un peso crucial en el puntaje. Aquí tienes la tarjeta oficial con acceso al origen:`,
      speechSummary: `En Sociales, ${subjName} es determinante. Te envío la tarjeta directa.`,
      suggestions: [`Fichas de ${subjName}`, `Temas de ${subjName}`, 'Simulador Sociales', 'Constitución'],
      originCard: {
        type: 'SUBJECT_PATH',
        subjectId: subjId,
        subjectName: subjName,
        title: subjName,
        topicsCount: topics,
        badge: 'Área Sociales',
        badgeColor: color,
        target: `/aprender/${subjId}`,
        description: 'Teoría sintetizada, doctrinas, leyes constitucionales y fijas oficiales de examen de admisión.',
        ctaLabel: `Ir al curso de ${subjName}`,
        previewItems: [topics, '12 Semanas Oficiales', 'Fijas de Admisión']
      },
      actions: [
        { type: 'NAVIGATE', target: `/aprender/${subjId}`, label: `Abrir ${subjName}`, badge: 'Sociales' },
        { type: 'NAVIGATE', target: '/biblioteca', label: `Apuntes de ${subjName}`, badge: 'Biblioteca' }
      ],
      action: { type: 'NAVIGATE', target: `/aprender/${subjId}`, label: `Abrir ${subjName}`, badge: 'Sociales' }
    };
  }

  // 7. Pomodoro / Cronómetro de estudio
  if (q.includes('pomodor') || q.includes('pomo') || q.includes('cronomet') || q.includes('temporiz') || q.includes('concentr')) {
    return {
      text: '¡Excelente! La técnica **Pomodoro** (25 min de concentración + 5 min de descanso) maximiza tu retención para el examen de admisión. Puedes abrir el temporizador con el botón en la barra de navegación o aquí mismo:',
      speechSummary: 'Iniciando técnica Pomodoro para tu sesión de estudio.',
      suggestions: ['Abrir Pomodoro', 'Modo Estudio Intenso 50m', 'Test Vocacional'],
      originCard: {
        type: 'POMODORO',
        title: 'Temporizador Pomodoro Pro',
        badge: 'Método de Estudio',
        badgeColor: '#EF4444',
        target: 'POMODORO',
        description: 'Técnica científica de estudio: 25 minutos de concentración absoluta y 5 minutos de descanso con 24 tonos de alarma.',
        ctaLabel: 'Abrir Temporizador Pomodoro',
        previewItems: ['Bloques de 25 min', '24 Tonos de Alarma', 'Modo Píldora Flotante']
      },
      actions: [
        { type: 'POMODORO', target: 'POMODORO', label: 'Abrir Pomodoro', badge: 'Pomodoro' }
      ],
      action: { type: 'POMODORO', target: 'POMODORO', label: 'Abrir Pomodoro', badge: 'Pomodoro' }
    };
  }

  // 8. Simulador / Examen de admisión
  if (q.includes('simula') || q.includes('examen') || q.includes('rank') || q.includes('practic')) {
    return {
      text: 'En el **Simulador de Examen** de RASTRO puedes rendir exámenes con cronómetro real de 2 horas, puntaje ponderado oficial y comparativa en el ranking de postulantes.',
      speechSummary: 'Abriendo simulador de examen para tu práctica.',
      suggestions: ['Iniciar simulacro ahora', 'Ver ranking de postulantes', 'Repasar teoría'],
      originCard: {
        type: 'SIMULATOR',
        title: 'Simulador Oficial de Examen de Admisión',
        badge: 'Simulacros & Ranking',
        badgeColor: '#F59E0B',
        target: '/simulador',
        description: 'Cronómetro real de 2 horas, puntaje ponderado por área y ranking de postulantes.',
        ctaLabel: 'Abrir Simulador de Examen',
        previewItems: ['Cronómetro en Vivo', 'Puntaje Ponderado', 'Ranking de Postulantes']
      },
      actions: [
        { type: 'NAVIGATE', target: '/simulador', label: 'Ir al Simulador de Examen', badge: 'Simulador' }
      ],
      action: { type: 'NAVIGATE', target: '/simulador', label: 'Ir al Simulador de Examen', badge: 'Simulador' }
    };
  }

  // 9. Cursos y rutas de estudio
  if (q.includes('curso') || q.includes('video') || q.includes('clase') || q.includes('academ') || q.includes('profesor') || q.includes('aprender')) {
    return {
      text: 'En la sección **Aprender** y **Cursos** encontrarás las **Rutas Temáticas oficiales**, resúmenes preuniversitarios de obras literarias y bancos de preguntas clasificados.',
      speechSummary: 'Puedes explorar todas las Rutas Temáticas oficiales y resúmenes de estudio en la sección Aprender.',
      suggestions: ['Ver Rutas Temáticas', 'Ver Obras Literarias', 'Simulador'],
      originCard: {
        type: 'COURSE_VIDEOS',
        title: 'Rutas Temáticas y Material de Estudio (Aprender)',
        badge: 'Temario Oficial',
        badgeColor: '#38BDF8',
        target: '/aprender',
        description: 'Módulos paso a paso organizados por materia con teoría preuniversitaria y preguntas oficiales.',
        ctaLabel: 'Ir a Aprender',
        previewItems: ['Rutas Temáticas', 'Bancos de Preguntas', 'Resúmenes de Obras']
      },
      actions: [
        { type: 'NAVIGATE', target: '/aprender', label: 'Ir a Rutas de Estudio', badge: 'Aprender' }
      ],
      action: { type: 'NAVIGATE', target: '/aprender', label: 'Ir a Rutas de Estudio', badge: 'Aprender' }
    };
  }

  // 10. Fallback General
  return {
    text: `He procesado tu consulta sobre **${text}**. Puedes acceder a la teoría en Aprender, ver las clases grabadas en Cursos o realizar tu Test Vocacional:`,
    speechSummary: 'Te dejo los accesos directos al origen del contenido en RASTRO.',
    suggestions: [
      'Test Vocacional',
      'Explicar mitosis y meiosis',
      'Fórmulas de Física',
      'Simulador de examen'
    ],
    originCard: {
      type: 'SUBJECT_PATH',
      title: 'Ruta de Aprendizaje (12 Semanas)',
      badge: 'Temario Oficial',
      badgeColor: '#A855F7',
      target: '/aprender',
      description: 'Acceso a las 15 asignaturas preuniversitarias con teoría y preguntas fijas.',
      ctaLabel: 'Ir a Aprender',
      previewItems: ['15 Materias', '12 Semanas de Ruta', 'Fijas de Admisión']
    },
    actions: [
      { type: 'NAVIGATE', target: '/aprender', label: 'Temario en Aprender', badge: 'Aprender' },
      { type: 'NAVIGATE', target: '/biblioteca', label: 'Abrir Material Compartido', badge: 'Biblioteca' }
    ],
    action: { type: 'NAVIGATE', target: '/aprender', label: 'Temario en Aprender', badge: 'Aprender' }
  };
}

/**
 * Síntesis de voz estilo Alexa para leer respuestas de ORSTTY en español
 */
let currentUtterance = null;

export function speakOrsttyAlexa(text, onStart, onEnd, onError) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis no soportado en este navegador.');
    return;
  }

  try {
    // Detener audio previo si existía
    window.speechSynthesis.cancel();

    // Limpiar markdown básico para que la voz fluya natural
    const cleanText = text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/#{1,6}\s?/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/`{1,3}(.*?)`{1,3}/g, '$1')
      .slice(0, 320); // Limitar a un resumen conciso y rápido

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 1.05; // Ritmo ágil estilo Alexa
    utterance.pitch = 1.02;

    // Buscar voz en español óptima si está disponible
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find(v => v.lang.startsWith('es') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Paulina') || v.name.includes('Mónica') || v.name.includes('Jorge') || v.name.includes('Helena')));
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    if (onStart) utterance.onstart = onStart;
    if (onEnd) utterance.onend = onEnd;
    if (onError) utterance.onerror = onError;

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Error al reproducir voz de ORSTTY:', err);
    if (onError) onError(err);
  }
}

export function stopOrsttyAlexaVoice() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Reconocimiento de voz para hablarle a ORSTTY por micrófono estilo Alexa
 */
export function createOrsttyVoiceRecognizer(onResult, onStatusChange, onError) {
  if (typeof window === 'undefined') return null;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    return null;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-PE'; // Español de Perú / Latinoamérica
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      if (onStatusChange) onStatusChange('listening');
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (onResult) {
        onResult({
          text: finalTranscript || interimTranscript,
          isFinal: Boolean(finalTranscript)
        });
      }
    };

    recognition.onerror = (err) => {
      console.warn('Speech recognition error:', err);
      if (onError) onError(err);
      if (onStatusChange) onStatusChange('idle');
    };

    recognition.onend = () => {
      if (onStatusChange) onStatusChange('idle');
    };

    return recognition;
  } catch (e) {
    console.warn('Could not initialize SpeechRecognition:', e);
    return null;
  }
}
