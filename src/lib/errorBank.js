// src/lib/errorBank.js
// Repositorio y Banco de Errores ("Mis Errores") para práctica y repaso enfocado

const STORAGE_KEY = 'rastro_mis_errores';

const DEFAULT_CURATED_ERRORS = [
  {
    id: 'err_fis_01',
    subject: 'Física',
    subtema: 'Análisis Dimensional',
    q: 'En la ecuación homogénea $E = A \\cdot v^2 + B \\cdot F$, donde $E$ es energía, $v$ es velocidad y $F$ es fuerza, determine la dimensión de $[A/B]$.',
    options: [
      'M L^{-1}',
      'M L T^{-1}',
      'L^{-1}',
      'M^0 L^0 T^0',
      'M L'
    ],
    answer: 0,
    explanation: 'Por el principio de homogeneidad: $[E] = [A][v]^2 \\Rightarrow M L^2 T^{-2} = [A] (L T^{-1})^2 \\Rightarrow [A] = M$. Además $[E] = [B][F] \\Rightarrow M L^2 T^{-2} = [B] (M L T^{-2}) \\Rightarrow [B] = L$. Por lo tanto $[A/B] = M / L = M L^{-1}$.',
    dateAdded: Date.now() - 3600000 * 5,
    solved: false
  },
  {
    id: 'err_bio_02',
    subject: 'Biología',
    subtema: 'Genética Clásica',
    q: 'Al cruzar dos individuos heterocigotos para un solo carácter con dominancia completa ($Aa \\times Aa$), ¿cuál es la probabilidad genotípica de obtener un individuo homocigoto?',
    options: [
      '25%',
      '50%',
      '75%',
      '100%',
      '33%'
    ],
    answer: 1,
    explanation: 'El cruce $Aa \\times Aa$ produce genotipos: 1/4 $AA$ (homocigoto dominante), 2/4 $Aa$ (heterocigoto) y 1/4 $aa$ (homocigoto recesivo). Los homocigotos son $AA$ + $aa$ = 1/4 + 1/4 = 2/4 = 50%.',
    dateAdded: Date.now() - 3600000 * 12,
    solved: false
  },
  {
    id: 'err_rv_03',
    subject: 'Razonamiento Verbal',
    subtema: 'Sinónimos Contextuales',
    q: 'Identifique el antónimo contextual de la palabra subrayada: "El orador pronunció un discurso *lacónico* ante la asamblea."',
    options: [
      'Breve',
      'Conciso',
      'Elocuente',
      'Locuaz',
      'Sentencioso'
    ],
    answer: 3,
    explanation: 'Lacónico significa breve, conciso o parco en palabras. Su antónimo directo en el contexto de hablar extensamente es "locuaz" o "prolijo".',
    dateAdded: Date.now() - 3600000 * 24,
    solved: false
  },
  {
    id: 'err_qui_04',
    subject: 'Química',
    subtema: 'Enlace Químico',
    q: '¿Qué tipo de enlace predomina en una molécula de amoníaco ($NH_3$) entre el átomo de nitrógeno y los de hidrógeno?',
    options: [
      'Enlace iónico',
      'Enlace covalente polar',
      'Enlace metálico',
      'Enlace covalente apolar',
      'Puente de disulfuro'
    ],
    answer: 1,
    explanation: 'La diferencia de electronegatividad entre el Nitrógeno (3.0) y el Hidrógeno (2.1) es de 0.9, lo que corresponde a un enlace covalente polar con compartición asimétrica de electrones.',
    dateAdded: Date.now() - 3600000 * 36,
    solved: false
  }
];

export function getFailedQuestions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Inicializar con errores curados para que el usuario siempre tenga material útil de repaso
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CURATED_ERRORS));
      return DEFAULT_CURATED_ERRORS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn('Error leyendo banco de errores:', e);
    return DEFAULT_CURATED_ERRORS;
  }
}

export function saveFailedQuestion(question) {
  if (!question || !question.q) return;
  try {
    const current = getFailedQuestions();
    // Evitar duplicados por texto o id
    const existingIndex = current.findIndex(item => 
      (question.id && item.id === question.id) || 
      (item.q && item.q.trim() === question.q.trim())
    );

    const newItem = {
      id: question.id || `err_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      subject: question.subject || question.asignatura || 'General',
      subtema: question.subtema || question.subtemaTitle || 'Concepto clave',
      q: question.q,
      options: Array.isArray(question.options) ? question.options : [],
      answer: question.answer !== undefined ? question.answer : 0,
      explanation: question.explanation || '',
      dateAdded: Date.now(),
      solved: false
    };

    let updated;
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = { ...updated[existingIndex], ...newItem, solved: false };
    } else {
      updated = [newItem, ...current];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('rastro_error_bank_updated', { detail: updated }));
    }
    return newItem;
  } catch (e) {
    console.warn('Error guardando pregunta en banco de errores:', e);
  }
}

export function markErrorSolved(id) {
  try {
    const current = getFailedQuestions();
    const updated = current.map(item => item.id === id ? { ...item, solved: true } : item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('rastro_error_bank_updated', { detail: updated }));
    }
  } catch (e) {
    console.warn('Error marcando error como resuelto:', e);
  }
}

export function removeFailedQuestion(id) {
  try {
    const current = getFailedQuestions();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('rastro_error_bank_updated', { detail: updated }));
    }
  } catch (e) {
    console.warn('Error eliminando del banco de errores:', e);
  }
}

export function clearAllFailedQuestions() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('rastro_error_bank_updated', { detail: [] }));
    }
  } catch (e) {
    console.warn('Error limpiando banco de errores:', e);
  }
}
