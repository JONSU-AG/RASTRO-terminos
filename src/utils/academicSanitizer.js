// =============================================================================
// SANITIZADOR ACADÉMICO OFICIAL CEPREUNSA / UNSA
// Garantiza rigor pedagógico por áreas de conocimiento reales:
// 1. STEM (Matemáticas, Física, Química, Raz. Matemático): Fórmulas y KaTeX válidos.
// 2. BIOMÉDICAS (Biología): Bioenergética, citología, y genética mendeliana SOLO en su semana correspondiente.
// 3. LETRAS Y SOCIALES (Filosofía, Historia, Lenguaje, Literatura, Cívica, Geografía, Psicología):
//    Elimina teoremas matemáticos ajenos (Pitágoras, Popper con fórmulas, S.I. ficticio)
//    y provee claves conceptuales, mnemotecnias y doctrinas auténticas.
// =============================================================================

export function normalizeSubjectArea(name) {
  if (!name) return 'general';
  const n = String(name).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (n.includes('matem') || n.includes('algeb') || n.includes('fisic') || n.includes('quimic') || n.includes('aritmet') || n.includes('geom') || n.includes('trigo')) {
    return 'stem';
  }
  if (n.includes('biolog')) {
    return 'biomedicas';
  }
  return 'humanidades';
}

export function isStemSubject(subjectName) {
  return normalizeSubjectArea(subjectName) === 'stem';
}

// Claves conceptuales y doctrinas auténticas para materias de humanidades
const HUMANITIES_FALLBACK_THEORY = {
  'filosofia': {
    title: 'Disciplinas y Corrientes Filosóficas Fundamentales',
    takeaway: 'Gnoseología estudia el conocimiento en general; Epistemología estudia el conocimiento científico riguroso; Axiología estudia los valores y Ética la moral humana.',
    fijaUnsa: 'En la UNSA, no confundas Gnoseología (origen, posibilidad y esencia del conocer) con Epistemología (validación de teorías científicas).'
  },
  'historia': {
    title: 'Periodización Histórica y Procesos Culturales del Perú y el Mundo',
    takeaway: 'La periodización de John Rowe divide el Perú prehispánico en Horizontes (panperuanos: Chavín, Wari, Inca) e Intermedios (desarrollos regionales: Moche/Nazca, Chimú/Chincha).',
    fijaUnsa: 'Distingue siempre las causas estructurales profundas (económicas y sociales) de los detonantes coyunturales de cada proceso histórico.'
  },
  'lenguaje': {
    title: 'Normativa RAE: Acentuación, Morfosintaxis y Semántica',
    takeaway: 'El hiato acentual (vocal cerrada tónica + vocal abierta) destruye el diptongo y se tilda siempre, pasando por encima de las reglas de palabras agudas o graves.',
    fijaUnsa: 'Los adverbios son invariables (nunca dicen "medias molestas", sino "medio molestas"). Los 8 monosílabos con tilde diacrítica son: él, tú, mí, sí, té, dé, sé, más.'
  },
  'literatura': {
    title: 'Teoría Literaria, Obras Representativas y Figuras de Sentido',
    takeaway: 'Los 3 géneros aristotélicos clásicos son: Épico/Narrativo (objetivo), Lírico (subjetivo y emotivo) y Dramático (diálogos para representación teatral).',
    fijaUnsa: 'En Literatura Regional, Mariano Melgar es el precursor del Romanticismo peruano con sus Yaravíes (derivados del Harawi quechua).'
  },
  'civica': {
    title: 'Constitución Política de 1993 y Garantías Constitucionales',
    takeaway: 'El Hábeas Corpus defiende exclusivamente la libertad individual y locomotora; la Acción de Amparo protege los demás derechos fundamentales (salud, educación, trabajo).',
    fijaUnsa: 'La pirámide jurídica ubica la Constitución en la cúspide (1er rango), seguida de las leyes del Congreso (2do rango) y decretos supremos del Ejecutivo (3er rango).'
  },
  'geografia': {
    title: 'Espacio Geográfico, Climas y las 8 Regiones Naturales del Perú',
    takeaway: 'Las 8 regiones naturales de Javier Pulgar Vidal se ordenan de menor a mayor altitud: Chala (0-500m), Yunga (500-2300m), Quechua (2300-3500m), Suni (3500-4000m), Puna (4000-4800m), Janca (>4800m), Rupa Rupa (500-1500m selva alta) y Omagua (80-400m selva baja).',
    fijaUnsa: 'La Cordillera de los Andes es el factor determinante fundamental de la megadiversidad climática, ecológica y orográfica del Perú.'
  },
  'psicologia': {
    title: 'Procesos Cognitivos, Afectivos y Teorías del Desarrollo Humano',
    takeaway: 'Jean Piaget clasifica el desarrollo cognoscitivo en 4 estadios: Sensoriomotriz (0-2 años), Preoperacional (2-7 años), Operaciones Concretas (7-11 años) y Operaciones Formales (11+ años).',
    fijaUnsa: 'En la memoria humana, el almacén a corto plazo (de trabajo) retiene entre 7 ± 2 elementos durante unos 20 segundos; la memoria a largo plazo tiene capacidad casi ilimitada.'
  }
};

/**
 * Sanitiza la teoría de una lección para evitar filtraciones de fórmulas matemáticas en letras
 * o leyes de Mendel prematuras en Biología.
 */
export function sanitizeLessonTheory(theory, subjectName, semana = 1, subtemaTitle = '') {
  if (!theory || typeof theory !== 'object') return theory;

  const area = normalizeSubjectArea(subjectName || theory.asignatura);
  const normSubject = String(subjectName || theory.asignatura || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const cleanTheory = { ...theory };

  // 1. LIMPIEZA EN HUMANIDADES / LETRAS / CIENCIAS SOCIALES
  if (area === 'humanidades') {
    // Las materias de humanidades y ciencias sociales NUNCA tienen fórmulas matemáticas ni teoremas operacionales
    cleanTheory.formula_data = null;
    cleanTheory.mecanismos = null;

    // Limpiar secciones con texto genérico falso de Popper/Gnoseología en Historia, Literatura, etc.
    if (Array.isArray(cleanTheory.sections)) {
      cleanTheory.sections = cleanTheory.sections.map(sec => {
        const h = String(sec.heading || '');
        const b = String(sec.body || '');
        const isDummy = b.includes('axiomas ontológicos') || b.includes('Popper postula') || b.includes('Tercio Excluido') ||
                        b.includes('Desglose de Despejes Operacionales') || b.includes('Razón Suficiente (Leibniz)') ||
                        b.includes('Imperativo Categórico') || (b.includes('Gnoseología = Estudia el conocimiento') && !normSubject.includes('filosof'));

        if (isDummy) {
          const fallback = HUMANITIES_FALLBACK_THEORY[normSubject] || HUMANITIES_FALLBACK_THEORY['filosofia'];
          return {
            heading: `🏛️ Fundamento Disciplinar: ${subtemaTitle || cleanTheory.tema || 'Núcleo Conceptual'}`,
            body: `• Concepto Rector: ${fallback.takeaway}\n• Aplicación Preuniversitaria: Este tema constituye un núcleo evaluado obligatoriamente en el área de Humanidades y Sociales de la UNSA.\n• Clave de Estudio: Analiza las definiciones operacionales exactas, su contexto analítico y las diferencias categoriales entre autores y escuelas.`
          };
        }
        return sec;
      });
    }

    // Asegurar takeaway y fijaUnsa auténticos
    if (!cleanTheory.takeaway || cleanTheory.takeaway.includes('Popper') || cleanTheory.takeaway.includes('Pitágoras')) {
      const fb = HUMANITIES_FALLBACK_THEORY[normSubject];
      if (fb) {
        cleanTheory.takeaway = fb.takeaway;
        cleanTheory.fijaUnsa = fb.fijaUnsa;
      }
    }
  }

  // 2. LIMPIEZA EN BIOLOGÍA (GENÉTICA PREMATURA)
  if (area === 'biomedicas' && Number(semana) < 6) {
    const titleLower = String(subtemaTitle || cleanTheory.tema || '').toLowerCase();
    const isGeneticsTopic = titleLower.includes('genetica') || titleLower.includes('herencia') || titleLower.includes('mendel');

    if (!isGeneticsTopic && cleanTheory.formula_data) {
      const fName = String(cleanTheory.formula_data.teorema_nombre || '').toLowerCase();
      if (fName.includes('mendel') || fName.includes('herencia') || fName.includes('genotipo')) {
        // En semanas 1 a 5, sustituir con el principio real de la semana
        if (Number(semana) === 1) {
          cleanTheory.formula_data = {
            teorema_nombre: 'Etapas del Método Científico Riguroso',
            formula_latex: '\\text{Observación} \\longrightarrow \\text{Problema} \\longrightarrow \\text{Hipótesis} \\longrightarrow \\text{Experimentación} \\longrightarrow \\text{Conclusión/Ley}',
            formula_simple: 'Observación -> Problema -> Hipótesis -> Experimentación -> Conclusión',
            descripcion: 'Secuencia sistemática del método experimental en ciencias biológicas para validar hipótesis contrastables frente a grupos control.',
            despejes: [
              { nombre: 'Grupo Experimental vs Control', latex: '\\text{Grupo Experimental (Variable activa)} \\iff \\text{Grupo Control (Sin variable alterada)}' },
              { nombre: 'Variable Independiente (Causa)', latex: '\\text{Variable Independiente } (X) \\implies \\text{Variable Dependiente } (Y)' }
            ],
            variables: [
              { simbolo: 'VI', nombre: 'Variable Independiente', unidad: 'Factor manipulado por el investigador' },
              { simbolo: 'VD', nombre: 'Variable Dependiente', unidad: 'Respuesta medida o efecto observado' }
            ],
            fija_unsa: 'Lamarck y Treviranus acuñaron formalmente el término "Biología" en 1802. Aristóteles es el Padre de la Biología Antigua por sus descripciones taxonómicas.'
          };
        } else if (Number(semana) === 5) {
          cleanTheory.formula_data = {
            teorema_nombre: 'Ecuaciones Bioenergéticas: Fotosíntesis y Respiración Celular',
            formula_latex: '6\\text{CO}_2 + 6\\text{H}_2\\text{O} + \\text{luz} \\longrightarrow \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\quad|\\quad \\text{Rendimiento: 36 a 38 ATP}',
            formula_simple: '6CO2 + 6H2O + luz -> C6H12O6 + 6O2 (Glucosa y Oxígeno)',
            descripcion: 'Transformación de energía solar en energía química (fotosíntesis) y oxidación aeróbica en mitocondrias con balance de 36 a 38 ATP netos.',
            despejes: [
              { nombre: 'Fase Luminosa (Tilacoides)', latex: '\\text{Fotólisis del Agua (Reacción de Hill)} \\implies \\text{Liberación de } \\text{O}_2, \\; \\text{ATP y NADPH}' },
              { nombre: 'Fase Oscura (Estroma)', latex: '\\text{Ciclo de Calvin-Benson} \\implies \\text{Fijación de } \\text{CO}_2 \\text{ por enzima RuBisCO}' }
            ],
            variables: [
              { simbolo: 'ATP', nombre: 'Adenosín Trifosfato', unidad: 'Moneda energética celular universal' },
              { simbolo: 'RuBisCO', nombre: 'Ribulosa-1,5-bisfosfato carboxilasa', unidad: 'Enzima fijadora de carbono' }
            ],
            fija_unsa: 'La fotólisis del agua ocurre en la fase luminosa (tilacoides) y es la fuente exclusiva del oxígeno libre que respiramos.'
          };
        } else {
          // Para otras semanas de biología sin genética, retirar formula_data si contiene Mendel
          cleanTheory.formula_data = null;
        }
      }
    }
  }

  return cleanTheory;
}

/**
 * Sanitiza las preguntas interactivas para eliminar distractores falsos sobre unidades en el S.I.
 * o vectores físicos en cursos de letras y biología.
 */
export function sanitizeChallenges(challenges, subjectName, semana = 1, subtemaTitle = '') {
  if (!Array.isArray(challenges)) return challenges;

  const area = normalizeSubjectArea(subjectName);
  const normSubject = String(subjectName || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return challenges.map(ch => {
    if (!ch || typeof ch !== 'object') return ch;
    const cleanCh = { ...ch };

    // 1. Limpieza de preguntas trampa con unidades S.I. en Humanidades
    if (area === 'humanidades' || (area === 'biomedicas' && Number(semana) < 6)) {
      const statementStr = String(cleanCh.statement || '');
      const explStr = String(cleanCh.explanation || '');
      const hasSIUnits = (cleanCh.options || []).some(opt => typeof opt === 'string' && (opt.includes('unidades en el S.I.') || opt.includes('coherencia dimensional') || opt.includes('conversión de unidades') || opt.includes('dimensiones físicas')));
      const hasSIExpl = explStr.includes('unidades en el S.I.') || explStr.includes('conversión de unidades') || (explStr.includes('errores de conversión') && area === 'humanidades');
      const isTrap = cleanCh.id?.includes('_trap') || statementStr.includes('distractor más habitual') || statementStr.includes('suele confundir');

      if (hasSIUnits || hasSIExpl || (isTrap && area === 'humanidades')) {
        if (statementStr.includes('unidades en el S.I.') || statementStr.includes('conversión de unidades')) {
          cleanCh.statement = `¿Cuál es el distractor conceptual más habitual que suele confundir a los postulantes al abordar este tema en el examen de admisión?`;
        }
        if (normSubject.includes('literat')) {
          cleanCh.options = [
            'Confundir la especie lírica o dramática con el género literario matriz.',
            'Identificar con claridad el contexto sociohistórico y la intencionalidad estética.',
            'Reconocer los recursos estilísticos y figuras retóricas empleadas.',
            'Distinguir la voz del autor de la perspectiva del narrador o hablante lírico.'
          ];
          cleanCh.correctIndex = 0;
          cleanCh.explanation = 'En Literatura para la UNSA, los distractores clásicos juegan con la confusión entre género (épico, lírico, dramático) y especie (epopeya, elegía, tragedia, comedia).';
        } else if (normSubject.includes('histor')) {
          cleanCh.options = [
            'Confundir la periodización diacrónica con el análisis sincrónico de las fuentes.',
            'Analizar críticamente la correlación entre restos arqueológicos y fuentes documentales.',
            'Distinguir las causas estructurales profundas de los detonantes coyunturales.',
            'Ubicar cronológicamente el proceso dentro de los horizontes e intermedios.'
          ];
          cleanCh.correctIndex = 0;
          cleanCh.explanation = 'En Historia, la trampa recurrente consiste en la anacronía: atribuir características de un periodo u horizonte cultural distinto al analizado.';
        } else if (normSubject.includes('filosof')) {
          cleanCh.options = [
            'Confundir el objeto de estudio de la Gnoseología (conocimiento) con la Epistemología (ciencia).',
            'Diferenciar con precisión los juicios analíticos a priori de los sintéticos a posteriori.',
            'Identificar las tesis centrales del imperativo categórico kantiano.',
            'Distinguir la duda metódica de Descartes del escepticismo pirrónico radical.'
          ];
          cleanCh.correctIndex = 0;
          cleanCh.explanation = 'En Filosofía para la UNSA, la distinción rigurosa entre disciplinas filosóficas (Gnoseología vs Epistemología vs Axiología vs Ética) define el éxito en admisión.';
        } else if (normSubject.includes('lengua')) {
          cleanCh.options = [
            'Aplicar reglas generales de acentuación a palabras con hiato acentual (robúrico).',
            'Identificar la tilde diacrítica en los 8 monosílabos normativos de la RAE.',
            'Reconocer la invariabilidad morfológica de los adverbios frente a los adjetivos.',
            'Verificar la concordancia nominal y verbal en oraciones compuestas.'
          ];
          cleanCh.correctIndex = 0;
          cleanCh.explanation = 'En Lenguaje, el hiato acentual rompe la regla general de agudas y graves (ej: t-í-o, c-a-í-d-a se tildan siempre).';
        } else if (normSubject.includes('civic')) {
          cleanCh.options = [
            'Confundir la garantía del Hábeas Corpus (libertad individual) con la Acción de Amparo.',
            'Distinguir las atribuciones constitucionales del Poder Ejecutivo y el Legislativo.',
            'Identificar las competencias exclusivas del JNE frente a la ONPE y el RENIEC.',
            'Reconocer el orden jerárquico normativo según la pirámide de Kelsen.'
          ];
          cleanCh.correctIndex = 0;
          cleanCh.explanation = 'En Cívica, el Hábeas Corpus protege exclusivamente la libertad individual; el Amparo protege los demás derechos constitucionales.';
        } else if (normSubject.includes('geograf')) {
          cleanCh.options = [
            'Confundir los pisos altitudinales y toponimia de las 8 regiones de Javier Pulgar Vidal.',
            'Relacionar el factor de la Cordillera de los Andes con la diversidad climática.',
            'Distinguir las ecorregiones del mar frío de Humboldt frente al mar tropical.',
            'Localizar las principales cuencas y vertientes hidrográficas del territorio peruano.'
          ];
          cleanCh.correctIndex = 0;
          cleanCh.explanation = 'En Geografía, memoriza con exactitud la toponimia y altitudes de cada región (Chala 0-500m, Yunga 500-2300m, Quechua 2300-3500m, Suni 3500-4000m, etc.).';
        } else if (normSubject.includes('psicol')) {
          cleanCh.options = [
            'Confundir los estadios del desarrollo cognitivo de Piaget o los tipos de memoria.',
            'Diferenciar el condicionamiento clásico pavloviano del condicionamiento operante de Skinner.',
            'Reconocer las leyes de la percepción formuladas por la escuela de la Gestalt.',
            'Distinguir los componentes afectivos y motivacionales de los cognitivos superiores.'
          ];
          cleanCh.correctIndex = 0;
          cleanCh.explanation = 'En Psicología, las preguntas de examen suelen distinguir las etapas del desarrollo cognitivo de Piaget y la memoria sensorial vs a corto plazo.';
        } else if (normSubject.includes('biolog')) {
          cleanCh.options = [
            'Confundir las ramas taxonómicas de la biología con las funcionales (ej: Malacología vs Citología).',
            'Identificar con exactitud los bioelementos primarios organógenos (CHONPS).',
            'Diferenciar la respiración celular anaeróbica en el citosol de la aeróbica mitocondrial.',
            'Distinguir la función de transcripción en el núcleo de la traducción ribosómica.'
          ];
          cleanCh.correctIndex = 0;
          cleanCh.explanation = 'En Biología, el distractor clásico confunde el objeto de estudio de las ramas taxonómicas (ej: Herpetología estudia anfibios y reptiles; Malacología estudia moluscos).';
        }
      }
    }

    // 2. Limpieza de preguntas de vectores físicos filtradas accidentalmente en Biología
    if (area === 'biomedicas' && Number(semana) === 1) {
      const expl = String(cleanCh.explanation || '');
      const isVectorPhysics = expl.includes('𝑅 = 2√13') || expl.includes('vectores oblicuos') || expl.includes('𝑅𝑥 = 10√3');
      if (isVectorPhysics) {
        cleanCh.statement = '¿Cuál de las siguientes secuencias representa rigurosamente el orden de las etapas del Método Científico aplicadas a la investigación biológica?';
        cleanCh.options = [
          'Observación → Problema → Hipótesis → Experimentación → Conclusión → Ley o Teoría',
          'Experimentación → Observación → Hipótesis → Conclusión',
          'Hipótesis → Conclusión → Observación → Experimentación',
          'Teoría → Ley → Observación → Experimentación',
          'Observación → Conclusión → Hipótesis → Ley'
        ];
        cleanCh.correctIndex = 0;
        cleanCh.pedagogicalTier = '🏛️ PREGUNTA OFICIAL CEPREUNSA • MÉTODO CIENTÍFICO';
        cleanCh.explanation = 'El método científico parte de la Observación sistemática, formulación de un Problema, planteamiento de una Hipótesis falsable, Experimentación controlada y emisión de Conclusiones validadas.';
        cleanCh.fuente = 'CEPREUNSA Biología Tomo Oficial';
      }
    }

    return cleanCh;
  });
}

/**
 * Sanitiza un nodo completo de aprendizaje antes de entregarlo a la interfaz.
 */
export function sanitizeLessonNode(node, subjectName) {
  if (!node || typeof node !== 'object') return node;

  const subj = subjectName || node.subject;
  const sem = node.semana || 1;
  const subTitle = node.fullTitle || node.title || '';

  const cleanNode = { ...node };

  if (cleanNode.theory) {
    cleanNode.theory = sanitizeLessonTheory(cleanNode.theory, subj, sem, subTitle);
  }

  if (Array.isArray(cleanNode.challenges)) {
    cleanNode.challenges = sanitizeChallenges(cleanNode.challenges, subj, sem, subTitle);
  }

  // Sanitizar recursivamente todos los subtemas hijos si existen
  if (Array.isArray(cleanNode.subtemas)) {
    cleanNode.subtemas = cleanNode.subtemas.map(st => {
      if (!st || typeof st !== 'object') return st;
      const cleanSt = { ...st };
      const stSem = cleanSt.semana || sem;
      const stTitle = cleanSt.fullTitle || cleanSt.title || subTitle;
      if (cleanSt.theory) {
        cleanSt.theory = sanitizeLessonTheory(cleanSt.theory, subj, stSem, stTitle);
      }
      if (Array.isArray(cleanSt.challenges)) {
        cleanSt.challenges = sanitizeChallenges(cleanSt.challenges, subj, stSem, stTitle);
      }
      return cleanSt;
    });
  }

  return cleanNode;
}
