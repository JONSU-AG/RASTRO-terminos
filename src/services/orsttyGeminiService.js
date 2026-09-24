// src/services/orsttyGeminiService.js
// Servicio unificado para el asistente inteligente ORSTTY con Google Gemini & Modo Voz estilo Alexa

export const PREU_SUBJECTS = [
  { id: 'biologia', name: 'Biología', icon: '🧬', color: '#10B981', area: 'Ciencias Médicas y Naturales' },
  { id: 'quimica', name: 'Química', icon: '⚗️', color: '#06B6D4', area: 'Ciencias e Ingenierías' },
  { id: 'fisica', name: 'Física', icon: '⚡', color: '#EAB308', area: 'Físico-Matemáticas' },
  { id: 'matematica', name: 'Matemática & Álgebra', icon: '📐', color: '#8B5CF6', area: 'Matemáticas y Análisis' },
  { id: 'razonamiento_matematico', name: 'Raz. Matemático', icon: '🔢', color: '#6366F1', area: 'Habilidad Cuantitativa' },
  { id: 'lenguaje', name: 'Lenguaje & Gramática', icon: '📖', color: '#EC4899', area: 'Comunicación y Letras' },
  { id: 'literatura', name: 'Literatura', icon: '📚', color: '#F43F5E', area: 'Humanidades' },
  { id: 'filosofia', name: 'Filosofía', icon: '🏛️', color: '#64748B', area: 'Pensamiento Crítico' },
  { id: 'psicologia', name: 'Psicología', icon: '🧠', color: '#A855F7', area: 'Ciencias Sociales' },
  { id: 'civica', name: 'Cívica & Constitución', icon: '⚖️', color: '#14B8A6', area: 'Ciudadanía y Derecho' },
  { id: 'historia_peru', name: 'Historia del Perú', icon: '🇵🇪', color: '#EF4444', area: 'Ciencias Históricas' },
  { id: 'historia_universal', name: 'Historia Universal', icon: '🌍', color: '#F97316', area: 'Ciencias Históricas' },
  { id: 'geografia', name: 'Geografía', icon: '🗺️', color: '#059669', area: 'Geografía del Perú y Mundo' },
  { id: 'logica', name: 'Lógica Proposicional', icon: '💡', color: '#3B82F6', area: 'Razonamiento Formal' },
  { id: 'anatomia', name: 'Anatomía Humana', icon: '🫀', color: '#DC2626', area: 'Biomédicas' }
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
      text: '¡Por supuesto! Si no estás seguro de qué carrera o área elegir para postular a la **UNSA**, el **Test Vocacional Oficial** te ayuda a identificar tu perfil mediante 20 preguntas ponderadas en **Biomédicas**, **Ingenierías** y **Sociales**.',
      speechSummary: 'Te he enviado la tarjeta especial para realizar el Test Vocacional Oficial de la UNSA.',
      suggestions: ['✨ Iniciar Test Vocacional Ahora', 'Ver Área Biomédicas (Biología)', 'Ver Área Ingenierías (Física)', 'Ver Área Sociales (Filosofía)'],
      originCard: {
        type: 'VOCATIONAL_TEST',
        title: '🧭 Test Vocacional Oficial UNSA',
        badge: 'Orientación Vocacional',
        badgeColor: '#A855F7',
        target: 'VOCATIONAL_TEST',
        description: 'Diagnóstico de 20 preguntas reales para calcular tu afinidad y carrera compatible en la UNSA.',
        ctaLabel: '✨ Iniciar Test Vocacional',
        previewItems: ['20 Preguntas Oficiales', 'Puntaje Ponderado UNSA', 'Diagnóstico de Carrera']
      },
      actions: [
        { type: 'VOCATIONAL_TEST', target: 'VOCATIONAL_TEST', label: '🧭 Iniciar Test Vocacional', badge: 'Test Vocacional' },
        { type: 'NAVIGATE', target: '/aprender', label: '📚 Ver Temario Completo', badge: 'Aprender' }
      ],
      action: { type: 'VOCATIONAL_TEST', target: 'VOCATIONAL_TEST', label: '🧭 Iniciar Test Vocacional', badge: 'Test Vocacional' }
    };
  }

  // 2. Detección de Área Biomédicas (Biología, Medicina, Química, Anatomía, Célula)
  if (
    q.includes('biomed') || q.includes('medicin') || q.includes('bio') || q.includes('celul') || 
    q.includes('mitos') || q.includes('enferm') || q.includes('anatom') || q.includes('quimic') ||
    q.includes('biolojia') || q.includes('biologia')
  ) {
    const isQuimica = q.includes('quim');
    const subjId = isQuimica ? 'quimica' : 'biologia';
    const subjName = isQuimica ? 'Química' : 'Biología';
    const color = isQuimica ? '#06B6D4' : '#10B981';
    const icon = isQuimica ? '🧪' : '🧬';
    const topics = isQuimica ? '36 temas' : '43 temas';

    return {
      text: `En el **Área de Biomédicas** (Medicina, Enfermería, Odontología), **${subjName}** representa la mayor ponderación de tu examen. Aquí tienes la tarjeta oficial con acceso directo a fichas, temario y contenido del curso:`,
      speechSummary: `Para Biomédicas, ${subjName} es la materia clave. Te envío su tarjeta con acceso al origen.`,
      suggestions: [`⚡ Fichas de ${subjName}`, `📄 Temas de ${subjName}`, 'Simulador Biomédicas', 'Test Vocacional'],
      originCard: {
        type: 'SUBJECT_PATH',
        subjectId: subjId,
        subjectName: subjName,
        title: `${subjName}`,
        icon: icon,
        topicsCount: topics,
        badge: 'Área Biomédicas',
        badgeColor: color,
        target: `/aprender/${subjId}`,
        description: isQuimica 
          ? 'Materia, estructura atómica, tabla periódica, enlaces, nomenclatura y química orgánica.'
          : 'Citología, Genética, Fisiología, Bioquímica con teoría interactiva y fijas de examen.',
        ctaLabel: `🚀 Ir al curso de ${subjName}`,
        previewItems: [topics, '12 Semanas Oficiales', 'Fijas Tipo Admisión']
      },
      actions: [
        { type: 'NAVIGATE', target: `/aprender/${subjId}`, label: `🚀 Ir a ${subjName}`, badge: 'Biomédicas' }
      ],
      action: { type: 'NAVIGATE', target: `/aprender/${subjId}`, label: `🚀 Ir a ${subjName}`, badge: 'Biomédicas' }
    };
  }

  // 3. Detección de Área Ingenierías (Física, Álgebra, Geometría, Trigonometría, Matemáticas)
  if (
    q.includes('ingen') || q.includes('fisic') || q.includes('fisca') || q.includes('mate') || 
    q.includes('algeb') || q.includes('rm') || q.includes('geomet') || q.includes('trigono') ||
    q.includes('cinemat') || q.includes('estatic')
  ) {
    const isFisica = q.includes('fis');
    const subjId = isFisica ? 'fisica' : 'matematica';
    const subjName = isFisica ? 'Física' : 'Matemática';
    const color = isFisica ? '#EAB308' : '#8B5CF6';
    const icon = isFisica ? '⚡' : '📐';
    const topics = isFisica ? '38 temas' : '48 temas';

    return {
      text: `En el **Área de Ingenierías**, **${subjName}** y el razonamiento cuantitativo definen tu ingreso a la UNSA. Aquí tienes la tarjeta oficial con acceso directo:`,
      speechSummary: `Para Ingenierías, ${subjName} es fundamental. Te envío la tarjeta directa.`,
      suggestions: [`⚡ Fichas de ${subjName}`, `📄 Temas de ${subjName}`, 'Formularios y Teoremas', 'Simulador Ingenierías'],
      originCard: {
        type: 'SUBJECT_PATH',
        subjectId: subjId,
        subjectName: subjName,
        title: `${subjName}`,
        icon: icon,
        topicsCount: topics,
        badge: 'Área Ingenierías',
        badgeColor: color,
        target: `/aprender/${subjId}`,
        description: isFisica 
          ? 'Análisis dimensional, vectores, MRU/MRUV, leyes de Newton, estática, trabajo y fluidos.'
          : 'Polinomios, matrices, funciones, geometría del espacio y trigonometría analítica.',
        ctaLabel: `🚀 Ir al curso de ${subjName}`,
        previewItems: [topics, '12 Semanas Oficiales', 'Formularios & DCL']
      },
      actions: [
        { type: 'NAVIGATE', target: `/aprender/${subjId}`, label: `⚡ Abrir ${subjName}`, badge: 'Ingenierías' }
      ],
      action: { type: 'NAVIGATE', target: `/aprender/${subjId}`, label: `⚡ Abrir ${subjName}`, badge: 'Ingenierías' }
    };
  }

  // 4. Detección de Área Sociales y Humanidades (Filosofía, Lenguaje, Historia, Cívica, Literatura)
  if (
    q.includes('social') || q.includes('derech') || q.includes('filo') || q.includes('lengua') || 
    q.includes('civic') || q.includes('histor') || q.includes('literat') || q.includes('psico') ||
    q.includes('humanid') || q.includes('constituc')
  ) {
    const isFilo = q.includes('filo');
    const isCivica = q.includes('civic') || q.includes('derech');
    const isHist = q.includes('histor');
    const subjId = isFilo ? 'filosofia' : isCivica ? 'civica' : isHist ? 'historia_peru' : 'lenguaje';
    const subjName = isFilo ? 'Filosofía' : isCivica ? 'Cívica' : isHist ? 'Historia del Perú' : 'Lenguaje';
    const color = isFilo ? '#64748B' : isCivica ? '#14B8A6' : isHist ? '#EF4444' : '#EC4899';
    const icon = isFilo ? '🏛️' : isCivica ? '⚖️' : isHist ? '🇵🇪' : '📖';
    const topics = isFilo ? '24 temas' : isCivica ? '28 temas' : '32 temas';

    return {
      text: `En el **Área de Sociales y Humanidades** (Derecho, Psicología, Educación, Administración), **${subjName}** tiene un peso crucial en el puntaje. Aquí tienes la tarjeta oficial con acceso al origen:`,
      speechSummary: `En Sociales, ${subjName} es determinante. Te envío la tarjeta directa.`,
      suggestions: [`⚡ Fichas de ${subjName}`, `📄 Temas de ${subjName}`, 'Simulador Sociales', 'Constitución 1993'],
      originCard: {
        type: 'SUBJECT_PATH',
        subjectId: subjId,
        subjectName: subjName,
        title: `${subjName}`,
        icon: icon,
        topicsCount: topics,
        badge: 'Área Sociales',
        badgeColor: color,
        target: `/aprender/${subjId}`,
        description: 'Teoría sintetizada, doctrinas, leyes constitucionales y fijas oficiales de examen UNSA.',
        ctaLabel: `🚀 Ir al curso de ${subjName}`,
        previewItems: [topics, '12 Semanas Oficiales', 'Fijas UNSA']
      },
      actions: [
        { type: 'NAVIGATE', target: `/aprender/${subjId}`, label: `🏛️ Abrir ${subjName}`, badge: 'Sociales' }
      ],
      action: { type: 'NAVIGATE', target: `/aprender/${subjId}`, label: `🏛️ Abrir ${subjName}`, badge: 'Sociales' }
    };
  }

  // 5. Pomodoro / Cronómetro de estudio
  if (q.includes('pomodor') || q.includes('pomo') || q.includes('cronomet') || q.includes('temporiz')) {
    return {
      text: '¡Excelente! La técnica **Pomodoro** (25 min de foco + 5 min de descanso) maximiza tu retención para el examen UNSA. Puedes abrir el temporizador con el botón en la barra de navegación o aquí mismo:',
      speechSummary: 'Iniciando técnica Pomodoro para tu sesión de estudio.',
      suggestions: ['Abrir Pomodoro', 'Modo Estudio Intenso 50m', 'Test Vocacional'],
      originCard: {
        type: 'POMODORO',
        title: '⏱️ Temporizador Pomodoro Pro',
        badge: 'Método de Estudio',
        badgeColor: '#EF4444',
        target: 'POMODORO',
        description: 'Técnica científica de estudio: 25 minutos de concentración absoluta y 5 minutos de descanso con 24 tonos de alarma.',
        ctaLabel: '🚀 Abrir Temporizador Pomodoro',
        previewItems: ['Bloques de 25 min', '24 Tonos de Alarma', 'Modo Píldora Flotante']
      },
      actions: [
        { type: 'POMODORO', target: 'POMODORO', label: '⏱️ Abrir Pomodoro', badge: 'Pomodoro' }
      ],
      action: { type: 'POMODORO', target: 'POMODORO', label: '⏱️ Abrir Pomodoro', badge: 'Pomodoro' }
    };
  }

  // 6. Simulador / Examen tipo UNSA
  if (q.includes('simula') || q.includes('examen') || q.includes('rank') || q.includes('practic')) {
    return {
      text: 'En el **Simulador de Examen** de RASTRO puedes rendir exámenes con cronómetro real de 2 horas, puntaje ponderado oficial UNSA y comparativa en el ranking de postulantes.',
      speechSummary: 'Abriendo simulador de examen para tu práctica.',
      suggestions: ['Iniciar simulacro ahora', 'Ver ranking nacional', 'Repasar teoría'],
      originCard: {
        type: 'SIMULATOR',
        title: '🎯 Simulador Oficial de Examen UNSA',
        badge: 'Simulacros & Ranking',
        badgeColor: '#F59E0B',
        target: '/simulador',
        description: 'Cronómetro real de 2 horas, puntaje ponderado por área y ranking de postulantes.',
        ctaLabel: '🚀 Abrir Simulador de Examen',
        previewItems: ['Cronómetro en Vivo', 'Puntaje Ponderado', 'Ranking Nacional']
      },
      actions: [
        { type: 'NAVIGATE', target: '/simulador', label: '🚀 Ir al Simulador de Examen', badge: 'Simulador' }
      ],
      action: { type: 'NAVIGATE', target: '/simulador', label: '🚀 Ir al Simulador de Examen', badge: 'Simulador' }
    };
  }

  if (q.includes('curso') || q.includes('video') || q.includes('clase')) {
    return {
      text: 'En la sección **Cursos** encontrarás clases en video organizadas por academia y tema para reforzar tu estudio.',
      speechSummary: 'Puedes explorar todas las clases en video en la sección Cursos.',
      suggestions: ['Ver videos de Biología', 'Ver videos de Química', 'Simulador'],
      originCard: {
        type: 'COURSE_VIDEOS',
        title: '🎥 Clases en Video por Academia (Cursos)',
        badge: 'Cursos & Academias',
        badgeColor: '#38BDF8',
        target: '/cursos',
        description: 'Clases en video explicativas grabadas por profesores de academias líderes.',
        ctaLabel: '🚀 Ir a Cursos en Video',
        previewItems: ['Academias Destacadas', 'Resolución en Pizarra', 'Material de Repaso']
      },
      actions: [
        { type: 'NAVIGATE', target: '/cursos', label: '🎥 Ir a Cursos en Video', badge: 'Cursos' }
      ],
      action: { type: 'NAVIGATE', target: '/cursos', label: '🎥 Ir a Cursos en Video', badge: 'Cursos' }
    };
  }

  if (q.includes('libro') || q.includes('biblioteca') || q.includes('pdf') || q.includes('material')) {
    return {
      text: 'En la **Biblioteca / Material Compartido** tienes acceso a tomos de CEPREUNSA, compendios, libros y separatas en PDF.',
      speechSummary: 'Todos los libros y materiales compartidos están en la Biblioteca.',
      suggestions: ['Tomos de Cepreunsa', 'Formularios PDF', 'Ver Aprender'],
      originCard: {
        type: 'LIBRARY',
        title: '📚 Material Compartido & Biblioteca PDF',
        badge: 'Material Compartido',
        badgeColor: '#34D399',
        target: '/biblioteca',
        description: 'Tomos oficiales CEPREUNSA, compendios y separatas descargables.',
        ctaLabel: '🚀 Abrir Material Compartido',
        previewItems: ['Tomos CEPREUNSA', 'Separatas y Resúmenes', 'Bancos en PDF']
      },
      actions: [
        { type: 'NAVIGATE', target: '/biblioteca', label: '📚 Abrir Material Compartido', badge: 'Material Compartido' }
      ],
      action: { type: 'NAVIGATE', target: '/biblioteca', label: '📚 Abrir Material Compartido', badge: 'Material Compartido' }
    };
  }

  return {
    text: `¡Entendido! He procesado tu consulta sobre **${text}**. Puedes acceder a la teoría en Aprender, ver las clases grabadas en Cursos o realizar tu Test Vocacional:`,
    speechSummary: 'Te dejo los accesos directos al origen del contenido en RASTRO.',
    suggestions: [
      'Test Vocacional UNSA',
      'Explicar mitosis y meiosis',
      'Fórmulas de Física',
      'Simulador de examen'
    ],
    originCard: {
      type: 'SUBJECT_PATH',
      title: '📖 Ruta de Aprendizaje (12 Semanas)',
      badge: 'Temario Oficial',
      badgeColor: '#A855F7',
      target: '/aprender',
      description: 'Acceso a las 15 asignaturas preuniversitarias con teoría y preguntas fijas.',
      ctaLabel: '🚀 Ir al Origen de Aprender',
      previewItems: ['15 Materias', '12 Semanas de Ruta', 'Fijas de Admisión']
    },
    actions: [
      { type: 'NAVIGATE', target: '/aprender', label: '📖 Temario en Aprender', badge: 'Aprender' }
    ],
    action: { type: 'NAVIGATE', target: '/aprender', label: '📖 Temario en Aprender', badge: 'Aprender' }
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
