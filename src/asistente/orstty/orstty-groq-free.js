// ORSTTY IA - Sistema gratuito de IA para ORSTTY
// Soporta: Kilo Code (vía proxy) + Google Gemini (gratis)
// Sin CORS issues - funciona en desarrollo y producción

// ============================================
// PROVIDERS DISPONIBLES
// ============================================
const GEMINI_KEY = ''; // Usuario ingresa su key gratis de Google AI Studio

const API_PROVIDERS = [
  {
    name: 'Kilo Code (Nemotron 120B)',
    type: 'openai',
    baseUrl: '/api/kilo', // Vite proxy en dev, directo en prod
    model: 'nvidia/nemotron-3-super-120b-a12b:free',
    requiresKey: false,
    corsProxy: true
  },
  {
    name: 'Google Gemini Flash',
    type: 'gemini',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    model: 'gemini-2.0-flash',
    requiresKey: true,
    corsProxy: false
  }
];

let currentProviderIndex = 0;

// ============================================
// GESTIÓN DE PROVIDERS
// ============================================
function getCurrentProvider() {
  return API_PROVIDERS[currentProviderIndex];
}

function rotateProvider() {
  currentProviderIndex = (currentProviderIndex + 1) % API_PROVIDERS.length;
  console.log(`🔄 Rotando a: ${getCurrentProvider().name}`);
}

// ============================================
// SIEMPRE HABILITADA
// ============================================
export function hasApiKey() {
  return true;
}

export function getKeyCount() {
  return API_PROVIDERS.length;
}

// ============================================
// SYSTEM PROMPT DE ORSTTY
// ============================================
function getSystemPrompt(context = {}) {
  const { materia, semana } = context;
  
  let ctx = '';
  if (materia) ctx += `El usuario está estudiando ${materia}. `;
  if (semana) ctx += `Está en la semana ${semana}. `;

  return `Eres ORSTTY, el asistente de estudio y buscador académico de RASTRO. Te comportas como un asistente inteligente, directo y servicial (al estilo Siri o Alexa, con un tono amigable, coloquial y masculino).

IDENTIDAD Y ROL:
- Eres un asistente académico inteligente, práctico y cercano (masculino).
- Tu misión es responder dudas sobre los cursos, temas, fórmulas y conceptos de la sección Aprender.
- Respondes con claridad, precisión conceptual y sin rodeos.

CÓMO RESPONDER:
Según la consulta, puedes estructurar tu respuesta de forma ordenada:
- [TEORÍA]: Cuando te piden explicar un concepto, fenómeno o definición.
- [PRÁCTICA / FÓRMULAS]: Cuando solicitan cómo resolver un ejercicio, pasos o fórmulas.
- [TEMARIO]: Cuando preguntan qué temas estudiar, semanas o contenidos de evaluación.
- [ORIENTACIÓN]: Para consejos de estudio, motivación o dudas de navegación en Aprender.

REGLAS ESTRICTAS:
1. ENFOQUE 100% ACADÉMICO: Todo tu conocimiento se basa en los contenidos de la sección Aprender (cursos, semanas, teoría y fórmulas oficiales).
2. CONCISO Y EFICAZ: Responde de forma clara y directa (máximo 3-4 oraciones o viñetas cortas), sin relleno.
3. TONO: Amigable, respetuoso, motivador y directo (como un buen compañero de estudio o asistente digital inteligente).

${ctx}`;
}

// ============================================
// CONSULTA A KILO CODE (via proxy)
// ============================================
async function queryKiloCode(message, context) {
  const provider = API_PROVIDERS[0];
  
  try {
    console.log(`🤖 Kilo Code: "${message.substring(0, 30)}..."`);
    
    const response = await fetch(provider.baseUrl + '/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: provider.model,
        messages: [
          { role: 'system', content: getSystemPrompt(context) },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 300,
        stream: false
      }),
      signal: AbortSignal.timeout(25000)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (content) {
      console.log('✅ Kilo Code respondió');
      return { success: true, response: content, provider: 'Kilo Code' };
    }
  } catch (error) {
    console.warn('⚠️ Kilo Code falló:', error.message);
  }
  
  return { success: false };
}

// ============================================
// CONSULTA A GOOGLE GEMINI
// ============================================
async function queryGemini(message, context) {
  // Intentar con key del localStorage o del código
  const savedKey = localStorage.getItem('orstty_gemini_key') || GEMINI_KEY;
  
  if (!savedKey) {
    console.log('ℹ️ Sin key de Gemini, saltando...');
    return { success: false };
  }

  try {
    console.log(`🤖 Gemini Flash: "${message.substring(0, 30)}..."`);
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${savedKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: getSystemPrompt(context) + '\n\nUsuario: ' + message }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300
        }
      }),
      signal: AbortSignal.timeout(20000)
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (content) {
      console.log('✅ Gemini respondió');
      return { success: true, response: content, provider: 'Gemini' };
    }
  } catch (error) {
    console.warn('⚠️ Gemini falló:', error.message);
  }
  
  return { success: false };
}

// ============================================
// CONSULTA PRINCIPAL (CON FALLBACKS)
// ============================================
export async function queryGroq(message, context = {}) {
  // 1. Intentar Kilo Code primero
  const kiloResult = await queryKiloCode(message, context);
  if (kiloResult.success) return kiloResult;

  // 2. Intentar Gemini después
  const geminiResult = await queryGemini(message, context);
  if (geminiResult.success) return geminiResult;

  return {
    success: false,
    error: 'Todos los providers fallaron',
    response: null
  };
}

// ============================================
// LÓGICA DE USO
// ============================================
export function shouldUseGroq(intent, hasToolResult, userMessage) {
  if (intent === 'saludar') return false;
  if (intent === 'ayuda') return false;
  if (hasToolResult) return false;
  
  if (/que es|que son|como funciona|explica|definicion|significa|dime sobre|hablame de|quien fue|quien es|quien descubrio|cuando fue|donde esta|por que|cuanto es|cual es|como se hace|historia de|ciencia/i.test(userMessage)) {
    return true;
  }
  
  return false;
}

// ============================================
// FUNCIÓN PRINCIPAL
// ============================================
export async function getGroqResponse(userMessage, orsttyResult, context = {}) {
  console.log('🔍 getGroqResponse:', { userMessage, intent: orsttyResult?.intent });
  
  const shouldUse = shouldUseGroq(
    orsttyResult?.intent,
    !!orsttyResult?.toolOutput,
    userMessage
  );

  if (!shouldUse) {
    return { used: false, reason: 'No es pregunta informativa', response: null };
  }

  const result = await queryGroq(userMessage, context);
  console.log('📊 Resultado:', result);

  if (result.success) {
    return { 
      used: true, 
      response: result.response, 
      provider: result.provider
    };
  }

  return { used: false, reason: 'Error en API', error: result.error, response: null };
}

// Guardar key de Gemini
export function setGeminiKey(key) {
  if (key) {
    localStorage.setItem('orstty_gemini_key', key);
    return true;
  }
  return false;
}

export function addApiKey(key) { return false; }

export default {
  queryGroq,
  hasApiKey,
  addApiKey,
  getKeyCount,
  shouldUseGroq,
  getGroqResponse,
  setGeminiKey
};
