import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const PORT = 3000;

// Lazy initialization of GoogleGenAI
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const ORSTTY_SYSTEM_INSTRUCTION = `Eres ORSTTY, el asistente inteligente, tutor de IA y guía oficial de navegación de la plataforma preuniversitaria RASTRO (para postulantes a la UNSA, CEPREUNSA y exámenes de admisión).

MISIÓN PRINCIPAL:
1. ENTENDER AL ESTUDIANTE AUNQUE ESCRIBA CON ERRORES ORTOGRÁFICOS, ABREVIATURAS O TYPOS (Ej: "bio", "fisca", "quimik", "filo", "psico", "civca", "raz mate", "geo", "test vocacinal", "q carrera", "ingenieria", "biomedicas", "sociales").
2. ORIENTAR SEGÚN EL ÁREA ACADÉMICA DE LA UNSA:
   - **Área 1: Biomédicas / Salud** (Medicina, Enfermería, Biología, Odontología, Farmacia...). Materias clave: Biología, Química, Física, Raz. Verbal.
   - **Área 2: Ingenierías / Ciencias Exactas** (Sistemas, Civil, Minas, Mecánica, Industrial...). Materias clave: Matemática/Álgebra, Física, Química, Raz. Matemático.
   - **Área 3: Sociales / Humanidades** (Derecho, Psicología, Economía, Historia, Literatura...). Materias clave: Lenguaje, Literatura, Filosofía, Cívica, Historia, Raz. Verbal.
3. TEST VOCACIONAL & ORIENTACIÓN:
   - Si el estudiante pregunta qué estudiar, pide un test vocacional o tiene dudas sobre carreras, ofrécele orientación por áreas y activa la acción de TEST VOCACIONAL para que pueda realizar el test de 20 preguntas de la UNSA.
4. GENERAR SIEMPRE UNA TARJETA ESPECIAL DE ORIGEN (originCard) Y ACCIONES DE NAVEGACIÓN:
   - Apunta al destino exacto del contenido:
     - /aprender/:subject (Ej: /aprender/biologia, /aprender/fisica, /aprender/quimica, /aprender/algebra, /aprender/filosofia, etc.)
     - /cursos (Videos y clases por academia)
     - /biblioteca (Material compartido, PDFs, separatas)
     - /simulador (Simulacros de examen cronometrados)
     - /formulario (Compendio de fórmulas)
     - VOCATIONAL_TEST (Test Vocacional oficial)

ESTRUCTURA DE RESPUESTA REQUERIDA (JSON ESTRICTO):
{
  "text": "Explicación amigable, concisa y motivadora con formato Markdown.",
  "speechSummary": "Resumen de 1 o 2 oraciones para ser leído por voz.",
  "suggestions": ["Sugerencia 1", "Sugerencia 2", "Sugerencia 3"],
  "originCard": {
    "type": "SUBJECT_PATH" | "VOCATIONAL_TEST" | "SIMULATOR" | "COURSE_VIDEOS" | "LIBRARY" | "FORMULARY",
    "title": "Título del destino (Ej: 🧬 Biología • Ruta de Aprendizaje)",
    "badge": "Biomédicas" | "Ingenierías" | "Sociales" | "Test Vocacional" | "Simulador" | "Material",
    "badgeColor": "#10B981" | "#3B82F6" | "#EC4899" | "#F59E0B" | "#8B5CF6",
    "target": "/aprender/biologia" | "/aprender/fisica" | "/simulador" | "/cursos" | "/biblioteca" | "/formulario" | "VOCATIONAL_TEST",
    "description": "Qué encontrará en el origen.",
    "ctaLabel": "🚀 Ir al Origen de Biología",
    "previewItems": ["Semana 1 a 12", "Teoría y Fórmulas", "Banco de Preguntas"]
  },
  "actions": [
    {
      "type": "NAVIGATE",
      "target": "/aprender/biologia",
      "label": "Abrir en Aprender",
      "badge": "Aprender"
    }
  ],
  "quizQuestion": null
}
`;

// Detector inteligente de intención con tolerancia a errores ortográficos (typos), áreas académicas y Test Vocacional
function detectFuzzyIntentAndOrigin(rawQuery: string) {
  const q = (rawQuery || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // 1. Test Vocacional / Orientación / Dudas de Carreras
  if (
    q.includes('voca') || q.includes('carrera') || q.includes('estudiar') || 
    q.includes('orient') || q.includes('aptitud') || q.includes('elegir') ||
    q.includes('que estudio') || q.includes('que sigo')
  ) {
    return {
      category: 'vocational',
      text: "¡Excelente decisión! Descubrir tu verdadera vocación es el primer paso para asegurar tu ingreso a la UNSA. El **Test Vocacional Oficial** evalúa tus intereses en las 3 grandes áreas: **Biomédicas**, **Ingenierías** y **Sociales** mediante 20 preguntas ponderadas.",
      speechSummary: "He preparado el Test Vocacional de la UNSA para orientarte según tus afinidades.",
      suggestions: ["Iniciar Test Vocacional", "Ver Área Biomédicas", "Ver Área Ingenierías", "Ver Área Sociales"],
      originCard: {
        type: 'VOCATIONAL_TEST',
        title: '🧭 Test Vocacional Oficial UNSA',
        badge: 'Orientación & Vocación',
        badgeColor: '#A855F7',
        target: 'VOCATIONAL_TEST',
        description: 'Diagnóstico de 20 preguntas ponderadas para descubrir tu perfil ideal: Biomédicas, Ingenierías o Sociales.',
        ctaLabel: '✨ Iniciar Test Vocacional Ahora',
        previewItems: ['20 Preguntas Oficiales', 'Puntaje Ponderado', 'Diagnóstico de Carrera UNSA']
      },
      actions: [
        { type: 'VOCATIONAL_TEST', target: 'VOCATIONAL_TEST', label: '🧭 Realizar Test Vocacional', badge: 'Test Vocacional' },
        { type: 'NAVIGATE', target: '/aprender', label: '📖 Explorar Temarios', badge: 'Aprender' }
      ]
    };
  }

  // 2. Área Biomédicas / Biología / Salud
  if (
    q.includes('biomed') || q.includes('medicin') || q.includes('salud') || q.includes('enferm') ||
    q.includes('bio') || q.includes('celul') || q.includes('mitos') || q.includes('meios') ||
    q.includes('citolog') || q.includes('genet') || q.includes('anatom') || q.includes('organo')
  ) {
    return {
      category: 'biomedicas',
      text: "El **Área de Ciencias Biomédicas** de la UNSA (Medicina, Enfermería, Biología, Odontología, Farmacia) tiene su peso mayor en **Biología y Química** (casi 40% del puntaje ponderado de admisión). En la sección **Aprender** tienes la ruta oficial de 12 semanas con teoría y fijas de citología y genética.",
      speechSummary: "En el Área Biomédicas, Biología y Química son los cursos con mayor ponderación. Te dirijo al origen de Biología.",
      suggestions: ["Ver Semana 1 de Biología", "Explicar Mitosis y Meiosis", "Test Vocacional", "Simulador Biomédicas"],
      originCard: {
        type: 'SUBJECT_PATH',
        title: '🧬 Biología • Ruta de Aprendizaje (12 Semanas)',
        badge: 'Área Biomédicas',
        badgeColor: '#10B981',
        target: '/aprender/biologia',
        description: 'Citología, Genética mendeliana, Bioquímica y Anatomía humana con teoría interactiva y fijas de examen.',
        ctaLabel: '🚀 Ir al Origen de Biología (Aprender)',
        previewItems: ['12 Semanas de Temario', 'Teoría & Fórmulas', 'Preguntas Tipo Admisión']
      },
      actions: [
        { type: 'NAVIGATE', target: '/aprender/biologia', label: '🧬 Abrir Origen: Biología', badge: 'Biomédicas' },
        { type: 'NAVIGATE', target: '/cursos', label: '🎥 Ver Videos de Biología', badge: 'Cursos' },
        { type: 'NAVIGATE', target: '/biblioteca', label: '📚 Separatas y Tomos PDF', badge: 'Material' }
      ]
    };
  }

  // 3. Área Ingenierías / Física / Matemática / Álgebra
  if (
    q.includes('ingen') || q.includes('sistem') || q.includes('civil') || q.includes('mina') ||
    q.includes('fisic') || q.includes('fisca') || q.includes('fisiac') || q.includes('fisik') ||
    q.includes('mruv') || q.includes('newton') || q.includes('dinam') || q.includes('vector') ||
    q.includes('mate') || q.includes('algeb') || q.includes('aljeb') || q.includes('polinom') ||
    q.includes('rm') || q.includes('raz mate') || q.includes('trigo') || q.includes('geom')
  ) {
    const isFisica = q.includes('fis');
    const targetSubj = isFisica ? 'fisica' : 'algebra';
    const subjName = isFisica ? 'Física' : 'Álgebra';

    return {
      category: 'ingenierias',
      text: "El **Área de Ingenierías y Ciencias Exactas** (Sistemas, Civil, Mecánica, Minas, Industrial) prioriza **Matemática (Álgebra, Geometría, Trigonometría), Física y Razonamiento Cuantitativo**. Tienes a tu disposición la ruta de 12 semanas con fórmulas despejadas y resolución de ejercicios.",
      speechSummary: `Para Ingenierías, ${subjName} y Matemáticas son determinantes. Te enlazo directamente al módulo oficial.`,
      suggestions: [`Semana 1 de ${subjName}`, "Fórmulas de MRUV y Dinámica", "Simulador Ingenierías", "Test Vocacional"],
      originCard: {
        type: 'SUBJECT_PATH',
        title: `⚡ ${subjName} • Ruta de Aprendizaje (12 Semanas)`,
        badge: 'Área Ingenierías',
        badgeColor: '#3B82F6',
        target: `/aprender/${targetSubj}`,
        description: `Cinemática, Dinámica, Estática, Polinomios y Vectores con teoría paso a paso y formulario oficial.`,
        ctaLabel: `🚀 Ir al Origen de ${subjName} (Aprender)`,
        previewItems: ['12 Semanas Oficiales', 'Formularios & DCL', 'Banco de Ejercicios UNSA']
      },
      actions: [
        { type: 'NAVIGATE', target: `/aprender/${targetSubj}`, label: `⚡ Abrir Origen: ${subjName}`, badge: 'Ingenierías' },
        { type: 'NAVIGATE', target: '/formulario', label: '📐 Ver Formulario Interactivo', badge: 'Fórmulas' },
        { type: 'NAVIGATE', target: '/simulador', label: '🎯 Practicar en Simulador', badge: 'Simulador' }
      ]
    };
  }

  // 4. Área Sociales / Humanidades / Letras
  if (
    q.includes('social') || q.includes('derech') || q.includes('filo') || q.includes('platon') ||
    q.includes('psico') || q.includes('civic') || q.includes('civca') || q.includes('constituc') ||
    q.includes('lengua') || q.includes('literat') || q.includes('histor') || q.includes('hp') ||
    q.includes('hu') || q.includes('geograf') || q.includes('geo') || q.includes('humanidad')
  ) {
    let sub = 'filosofia';
    let subLabel = 'Filosofía';
    if (q.includes('leng') || q.includes('gram')) { sub = 'lenguaje'; subLabel = 'Lenguaje'; }
    else if (q.includes('lit')) { sub = 'literatura'; subLabel = 'Literatura'; }
    else if (q.includes('hist')) { sub = 'historia_peru'; subLabel = 'Historia'; }
    else if (q.includes('civ')) { sub = 'civica'; subLabel = 'Cívica'; }
    else if (q.includes('psic')) { sub = 'psicologia'; subLabel = 'Psicología'; }
    else if (q.includes('geo')) { sub = 'geografia'; subLabel = 'Geografía'; }

    return {
      category: 'sociales',
      text: "El **Área de Ciencias Sociales y Humanidades** (Derecho, Psicología, Economía, Relaciones Industriales, Literatura) evalúa con alto peso **Comprensión Verbal, Filosofía, Cívica, Historia y Lenguaje**. Te enlazo al origen de la materia para repasar la teoría y preguntas fijas.",
      speechSummary: `En Sociales, ${subLabel} y las humanidades definen el ingreso. Te enlazo al origen del contenido.`,
      suggestions: [`Semana 1 de ${subLabel}`, "Repasar Constitución de 1993", "Simulador Sociales", "Test Vocacional"],
      originCard: {
        type: 'SUBJECT_PATH',
        title: `🏛️ ${subLabel} • Ruta de Aprendizaje (12 Semanas)`,
        badge: 'Área Sociales',
        badgeColor: '#EC4899',
        target: `/aprender/${sub}`,
        description: `Corrientes epistemológicas, historia, normativa gramatical y leyes de la Constitución con fijas de admisión.`,
        ctaLabel: `🚀 Ir al Origen de ${subLabel} (Aprender)`,
        previewItems: ['12 Semanas de Temario', 'Fijas de Examen UNSA', 'Resúmenes Clave']
      },
      actions: [
        { type: 'NAVIGATE', target: `/aprender/${sub}`, label: `🏛️ Abrir Origen: ${subLabel}`, badge: 'Sociales' },
        { type: 'NAVIGATE', target: '/biblioteca', label: '📚 Tomos y Separatas PDF', badge: 'Material' },
        { type: 'NAVIGATE', target: '/simulador', label: '🎯 Simulador de Examen', badge: 'Simulador' }
      ]
    };
  }

  // 5. Química
  if (q.includes('quim') || q.includes('estequiomet') || q.includes('enlace') || q.includes('tabla period')) {
    return {
      category: 'quimica',
      text: "En **Química Preuniversitaria**, temas como Estructura Atómica, Enlace Químico, Tabla Periódica y Estequiometría son fijos en los exámenes de admisión de Biomédicas e Ingenierías. Tienes la ruta completa en la sección Aprender.",
      speechSummary: "Química es fundamental para Biomédicas e Ingenierías. Te enlazo al origen de la materia.",
      suggestions: ["Semana 1 de Química", "Tabla Periódica Interactiva", "Leyes de los Gases", "Simulador"],
      originCard: {
        type: 'SUBJECT_PATH',
        title: '⚗️ Química • Ruta de Aprendizaje (12 Semanas)',
        badge: 'Ciencias Exactas',
        badgeColor: '#06B6D4',
        target: '/aprender/quimica',
        description: 'Estructura atómica, enlaces, balance redox, estequiometría y química orgánica paso a paso.',
        ctaLabel: '🚀 Ir al Origen de Química (Aprender)',
        previewItems: ['Tabla Periódica', '12 Semanas de Teoría', 'Ejercicios Resueltos']
      },
      actions: [
        { type: 'NAVIGATE', target: '/aprender/quimica', label: '⚗️ Abrir Origen: Química', badge: 'Química' },
        { type: 'NAVIGATE', target: '/cursos', label: '🎥 Ver Videos de Química', badge: 'Cursos' },
        { type: 'NAVIGATE', target: '/formulario', label: '📐 Ver Fórmulas', badge: 'Fórmulas' }
      ]
    };
  }

  // 6. Simulador de Examen
  if (q.includes('simul') || q.includes('examen') || q.includes('test') || q.includes('prueba') || q.includes('cronometr') || q.includes('ranking')) {
    return {
      category: 'simulador',
      text: "El **Simulador de Examen RASTRO** te permite practicar con exámenes cronometrados tipo admisión UNSA, con cálculo automático de puntaje ponderado por área y ranking nacional de postulantes.",
      speechSummary: "Accede al simulador de examen cronometrado para medir tu puntaje de admisión.",
      suggestions: ["Iniciar Simulacro 100 Preguntas", "Simulacro Rápido 20 Preguntas", "Ver Ranking", "Test Vocacional"],
      originCard: {
        type: 'SIMULATOR',
        title: '🎯 Simulador Oficial de Examen UNSA',
        badge: 'Simulacros & Ranking',
        badgeColor: '#F59E0B',
        target: '/simulador',
        description: 'Cronómetro real de 2 horas, preguntas ponderadas por área (Biomédicas, Ingenierías, Sociales) y ranking.',
        ctaLabel: '🚀 Abrir Simulador de Examen',
        previewItems: ['Cronómetro en Vivo', 'Puntaje Ponderado', 'Ranking Nacional']
      },
      actions: [
        { type: 'NAVIGATE', target: '/simulador', label: '🎯 Ir al Simulador de Examen', badge: 'Simulador' },
        { type: 'NAVIGATE', target: '/aprender', label: '📖 Repasar Temario', badge: 'Aprender' }
      ]
    };
  }

  // 7. Videos y Cursos
  if (q.includes('video') || q.includes('clase') || q.includes('curso') || q.includes('academ') || q.includes('esparta') || q.includes('kelsen')) {
    return {
      category: 'cursos',
      text: "En la sección **Cursos** encuentras clases magistrales en video grabadas por profesores de academias líderes (Esparta, Kelsen, Briceño), organizadas por curso y nivel.",
      speechSummary: "Encuentra todas las clases en video explicadas en la sección Cursos.",
      suggestions: ["Ver Academia Esparta", "Ver Clases de Biología", "Ver Clases de Física", "Simulador"],
      originCard: {
        type: 'COURSE_VIDEOS',
        title: '🎥 Clases en Video por Academia (Cursos)',
        badge: 'Cursos & Academias',
        badgeColor: '#38BDF8',
        target: '/cursos',
        description: 'Clases en video de alta calidad, resolución de ejercicios en pizarra y explicaciones audiovisuales.',
        ctaLabel: '🚀 Ir al Origen de Cursos en Video',
        previewItems: ['Academias Destacadas', 'Resolución en Pizarra', 'Material de Repaso']
      },
      actions: [
        { type: 'NAVIGATE', target: '/cursos', label: '🎥 Ir a Cursos en Video', badge: 'Cursos' },
        { type: 'NAVIGATE', target: '/aprender', label: '📖 Ir a Ruta de Aprendizaje', badge: 'Aprender' }
      ]
    };
  }

  // 8. Biblioteca / Material Compartido / PDFs
  if (q.includes('libr') || q.includes('bibliotec') || q.includes('pdf') || q.includes('separat') || q.includes('mater') || q.includes('compend') || q.includes('tomo')) {
    return {
      category: 'biblioteca',
      text: "En la **Biblioteca & Material Compartido** tienes acceso a tomos oficiales de CEPREUNSA, libros preuniversitarios de Lumbreras y Cuzcano, separatas y bancos de preguntas en PDF listos para descargar o leer.",
      speechSummary: "Accede a todos los libros y material compartido en PDF en la Biblioteca.",
      suggestions: ["Tomos CEPREUNSA", "Bancos de Preguntas PDF", "Formularios", "Ver Aprender"],
      originCard: {
        type: 'LIBRARY',
        title: '📚 Material Compartido & Biblioteca PDF',
        badge: 'Material Compartido',
        badgeColor: '#34D399',
        target: '/biblioteca',
        description: 'Tomos oficiales CEPREUNSA, compendios, libros y separatas compartidas por la comunidad.',
        ctaLabel: '🚀 Abrir Material Compartido',
        previewItems: ['Tomos CEPREUNSA', 'Separatas y Resúmenes', 'Bancos en PDF']
      },
      actions: [
        { type: 'NAVIGATE', target: '/biblioteca', label: '📚 Abrir Material Compartido', badge: 'Material' },
        { type: 'NAVIGATE', target: '/aprender', label: '📖 Ir a Aprender', badge: 'Aprender' }
      ]
    };
  }

  // 9. Fórmulas
  if (q.includes('formul') || q.includes('teorem') || q.includes('ley')) {
    return {
      category: 'formulario',
      text: "En el **Formulario Interactivo** dispones de todas las fórmulas de Física (MRUV, Dinámica, Estática, Electromagnetismo), Álgebra y Química para consultas instantáneas.",
      speechSummary: "Encuentra todas las fórmulas matemáticas, físicas y químicas en el Formulario.",
      suggestions: ["Fórmulas de MRUV", "Fórmulas de Dinámica", "Fórmulas de Álgebra", "Simulador"],
      originCard: {
        type: 'FORMULARY',
        title: '📐 Formulario General Preuniversitario',
        badge: 'Fórmulas Interactivas',
        badgeColor: '#8B5CF6',
        target: '/formulario',
        description: 'Compendio interactivo con fórmulas, teoremas y leyes de Física, Química y Matemáticas.',
        ctaLabel: '🚀 Abrir Formulario Interactivo',
        previewItems: ['Fórmulas de Física', 'Álgebra y Geometría', 'Química y Constantes']
      },
      actions: [
        { type: 'NAVIGATE', target: '/formulario', label: '📐 Abrir Formulario', badge: 'Fórmulas' },
        { type: 'NAVIGATE', target: '/aprender', label: '📖 Ir a Aprender', badge: 'Aprender' }
      ]
    };
  }

  // General por defecto con tarjeta de Aprender
  return {
    category: 'general',
    text: `¡Entendido! He procesado tu consulta sobre **${rawQuery}**. Puedes profundizar en la ruta de 12 semanas de Aprender, ver explicaciones en video en Cursos, o realizar un test vocacional para definir tu carrera:`,
    speechSummary: "Te dejo el acceso directo a los módulos oficiales de RASTRO.",
    suggestions: [
      "Test Vocacional UNSA",
      "Semana 1 de Biología",
      "Fórmulas de Física",
      "Simulador de examen"
    ],
    originCard: {
      type: 'SUBJECT_PATH',
      title: '📖 Ruta de Aprendizaje RASTRO (12 Semanas)',
      badge: 'Temario Oficial',
      badgeColor: '#A855F7',
      target: '/aprender',
      description: 'Temarios oficiales de las 15 asignaturas preuniversitarias organizadas por semanas con teoría interactiva.',
      ctaLabel: '🚀 Ir al Origen de Aprender',
      previewItems: ['15 Materias Oficiales', '12 Semanas de Ruta', 'Fijas de Admisión']
    },
    actions: [
      { type: 'NAVIGATE', target: '/aprender', label: '📖 Ver en Aprender', badge: 'Aprender' },
      { type: 'NAVIGATE', target: '/cursos', label: '🎥 Ver Videos en Cursos', badge: 'Cursos' },
      { type: 'VOCATIONAL_TEST', target: 'VOCATIONAL_TEST', label: '🧭 Test Vocacional', badge: 'Vocacional' }
    ]
  };
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "10mb" }));

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", geminiReady: Boolean(process.env.GEMINI_API_KEY) });
  });

  // ORSTTY Intelligent Chat Endpoint
  app.post("/api/orstty/chat", async (req, res) => {
    try {
      const { message, history = [], context = {} } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "El mensaje es obligatorio." });
      }

      const fuzzyResult = detectFuzzyIntentAndOrigin(message);
      const ai = getGenAI();

      if (!ai) {
        // Fallback inteligente enriquecido con tarjetas de origen y tolerancia a faltas ortográficas
        return res.json({
          text: fuzzyResult.text,
          speechSummary: fuzzyResult.speechSummary,
          suggestions: fuzzyResult.suggestions,
          originCard: fuzzyResult.originCard,
          actions: fuzzyResult.actions,
          action: fuzzyResult.actions[0] || null,
          isFallback: true
        });
      }

      // Preparar historial y contexto
      let promptWithContext = `Mensaje del estudiante: "${message}"\n`;
      if (context.subject) {
        promptWithContext += `Materia actual del estudiante: ${context.subject}\n`;
      }
      if (context.week) {
        promptWithContext += `Semana de temario actual: Semana ${context.week}\n`;
      }

      // Formatear mensajes previos si existen
      const formattedHistory = (history || [])
        .slice(-6)
        .map((h: any) => `${h.sender === "user" ? "Estudiante" : "ORSTTY"}: ${h.text}`)
        .join("\n");

      const finalPrompt = formattedHistory
        ? `Conversación previa reciente:\n${formattedHistory}\n\n${promptWithContext}`
        : promptWithContext;

      let parsedResponse: any = null;

      try {
        let response;
        try {
          response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: finalPrompt,
            config: {
              systemInstruction: ORSTTY_SYSTEM_INSTRUCTION,
              responseMimeType: "application/json",
              temperature: 0.7,
            },
          });
        } catch (e1) {
          response = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: finalPrompt,
            config: {
              systemInstruction: ORSTTY_SYSTEM_INSTRUCTION,
              responseMimeType: "application/json",
              temperature: 0.7,
            },
          });
        }

        const responseText = response.text || "{}";
        try {
          parsedResponse = JSON.parse(responseText);
        } catch (parseErr) {
          parsedResponse = {
            text: responseText,
            speechSummary: responseText.slice(0, 150),
            suggestions: ["Explicar con más detalle", "Hacerme una pregunta de prueba", "Ver temas de Aprender"]
          };
        }
      } catch (geminiErr: any) {
        parsedResponse = {
          text: fuzzyResult.text,
          speechSummary: fuzzyResult.speechSummary,
          suggestions: fuzzyResult.suggestions,
          originCard: fuzzyResult.originCard,
          actions: fuzzyResult.actions
        };
      }

      // Construir lista unificada de acciones de navegación
      let finalActions = Array.isArray(parsedResponse.actions) ? parsedResponse.actions : [];
      if (parsedResponse.action && !finalActions.some((a: any) => a.target === parsedResponse.action.target)) {
        finalActions.unshift(parsedResponse.action);
      }

      // Si no devolvió acciones explícitas, inferir accesos a secciones de RASTRO según el contenido
      if (finalActions.length === 0) {
        finalActions.push(
          {
            type: "NAVIGATE",
            target: "/aprender",
            label: "📖 Temario en Aprender",
            badge: "Aprender",
            description: "Ver temario y lecciones de 12 semanas"
          },
          {
            type: "NAVIGATE",
            target: "/cursos",
            label: "🎥 Clases en Cursos",
            badge: "Cursos",
            description: "Ver videos y clases de academias"
          },
          {
            type: "NAVIGATE",
            target: "/biblioteca",
            label: "📚 Material Compartido",
            badge: "Material Compartido",
            description: "Libros, PDFs y separatas descargables"
          }
        );
      }

      const finalOriginCard = parsedResponse.originCard || fuzzyResult.originCard || null;

      return res.json({
        text: parsedResponse.text || fuzzyResult.text,
        speechSummary: parsedResponse.speechSummary || fuzzyResult.speechSummary,
        suggestions: parsedResponse.suggestions || fuzzyResult.suggestions,
        originCard: finalOriginCard,
        actions: finalActions,
        action: finalActions[0] || null,
        quizQuestion: parsedResponse.quizQuestion || null,
        isGemini: true
      });
    } catch (err: any) {
      console.error("Error en /api/orstty/chat:", err);
      res.status(500).json({
        error: "No se pudo procesar la respuesta en este momento.",
        text: "Hubo un pequeño retraso al consultar el núcleo de IA. Sin embargo, todos los módulos de RASTRO y el temario están disponibles.",
        speechSummary: "Hubo un retraso de conexión. Puedes repetir tu pregunta o explorar el temario en la app.",
        suggestions: ["Reintentar pregunta", "Abrir temario", "Simulador de examen"]
      });
    }
  });

  // ORSTTY Speech-to-Text / Audio Action Helper
  app.post("/api/orstty/quick-quiz", async (req, res) => {
    try {
      const { subject = "Biología" } = req.body;
      const ai = getGenAI();
      if (!ai) {
        return res.json({
          question: "¿Cuál es la organela celular responsable de la respiración celular y producción de ATP?",
          options: ["Ribosoma", "Mitocondria", "Aparato de Golgi", "Lisosoma"],
          correctIndex: 1,
          explanation: "La mitocondria es la central energética donde ocurre el ciclo de Krebs y la fosforilación oxidativa."
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Genera 1 pregunta de opción múltiple tipo examen de admisión UNSA/CEPREUNSA para la materia: ${subject}.`,
        config: {
          systemInstruction: `Responde con un JSON que tenga:
          {
            "question": "string",
            "options": ["A", "B", "C", "D"],
            "correctIndex": 0,
            "explanation": "string"
          }`,
          responseMimeType: "application/json",
          temperature: 0.8
        }
      });

      const data = JSON.parse(response.text || "{}");
      res.json(data);
    } catch (e) {
      res.json({
        question: "¿Cuál es el elemento químico con símbolo 'Fe' y número atómico 26?",
        options: ["Fósforo", "Flúor", "Hierro", "Francio"],
        correctIndex: 2,
        explanation: "Fe proviene del latín Ferrum y corresponde al Hierro."
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
