// =============================================================================
// BÓVEDA MAESTRA DE MNEMOTECNIAS & HACKS PREUNIVERSITARIOS (CEPRUNSA / SAN MARCOS / UNI)
// Frases gancho, acrónimos inolvidables y reglas nemotécnicas para examen de admisión
// =============================================================================

export const MNEMOTECNIAS_PREU = [
  // ---------------------------------------------------------------------------
  // FÍSICA
  // ---------------------------------------------------------------------------
  {
    id: "mne_fis_mru_diosito",
    subject: "Física",
    topic: "Cinemática MRU",
    phrase: "DIOSITO LO VE TODO",
    shortFormula: "d = v \\cdot t",
    importance: "Leyenda Pre-U",
    category: "Fórmula Fundamental",
    summary: "El triángulo nemotécnico más famoso de la física para distancia, velocidad y tiempo.",
    breakdown: [
      { letter: "D", word: "Diosito", concept: "Distancia recorrida (d)", unit: "Metros [m]" },
      { letter: "V", word: "Ve", concept: "Rapidez constante (v)", unit: "m/s" },
      { letter: "T", word: "Todo", concept: "Tiempo transcurrido (t)", unit: "Segundos [s]" }
    ],
    triangulo: {
      top: "d",
      bottomLeft: "v",
      bottomRight: "t",
      regla: "Tapa con tu dedo la variable que buscas: si buscas 'd' te queda 'v · t'; si buscas 'v' te queda 'd / t'; si buscas 't' te queda 'd / v'."
    },
    explicacion: "En lugar de memorizar 3 despejes algebraicos por separado, la frase 'Diosito Ve Todo' coloca a Diosito (D) en la cúspide del triángulo y a Ve (V) y Todo (T) abajo multiplicándose.",
    fijaExamen: "¡OJO CON LAS UNIDADES! Si la rapidez te la dan en km/h y el tiempo en segundos, primero convierte a m/s multiplicando por 5/18 antes de usar la fórmula.",
    ejemplo: "Un móvil viaja a 72 km/h durante 6 s. ¿Qué distancia recorre? 1) Rapidez: 72 × (5/18) = 20 m/s. 2) Diosito Ve Todo: d = 20 × 6 = 120 metros.",
    tags: ["MRU", "Cinemática", "Triángulo", "Distancia"]
  },
  {
    id: "mne_fis_ohm_reina_isabel",
    subject: "Física",
    topic: "Electrodinámica",
    phrase: "¡VIVA LA REINA ISABEL!",
    shortFormula: "V = R \\cdot I \\quad\\lor\\quad V = I \\cdot R",
    importance: "Leyenda Pre-U",
    category: "Ley de Ohm",
    summary: "La mnemotecnia monárquica que define la relación entre Voltaje, Resistencia y Corriente.",
    breakdown: [
      { letter: "V", word: "Viva", concept: "Voltaje / Potencial eléctrico (V)", unit: "Voltios [V]" },
      { letter: "R", word: "Reina", concept: "Resistencia eléctrica (R)", unit: "Ohmios [Ω]" },
      { letter: "I", word: "Isabel", concept: "Intensidad de corriente (I)", unit: "Amperios [A]" }
    ],
    triangulo: {
      top: "V",
      bottomLeft: "I",
      bottomRight: "R",
      regla: "Tapa con el dedo: V = I · R  |  I = V / R  |  R = V / I"
    },
    explicacion: "Alternativa clásica: 'Victoria Reina de Inglaterra'. Te asegura no dudar jamás si la intensidad va dividiendo o multiplicando.",
    fijaExamen: "En circuitos en serie, la corriente (I) es la misma para todas las resistencias; en paralelo, el voltaje (V) es el mismo en todas las ramas.",
    ejemplo: "Un foco de 20 Ω se conecta a 220 V. ¿Corriente? 'Viva la Reina Isabel' -> I = V / R = 220 / 20 = 11 Amperios.",
    tags: ["Ohm", "Electricidad", "Circuitos", "Voltaje"]
  },
  {
    id: "mne_fis_newton_fama",
    subject: "Física",
    topic: "Dinámica Lineal",
    phrase: "FAMA  /  FUMA",
    shortFormula: "F_R = m \\cdot a",
    importance: "Fundamental",
    category: "2da Ley de Newton",
    summary: "Fuerza resultante es igual a la masa multiplicada por la aceleración.",
    breakdown: [
      { letter: "F", word: "Fuerza", concept: "Fuerza Resultante neta (Fr)", unit: "Newtons [N]" },
      { letter: "M", word: "Masa", concept: "Masa inercial (m)", unit: "Kilogramos [kg]" },
      { letter: "A", word: "Aceleración", concept: "Aceleración del cuerpo (a)", unit: "m/s²" }
    ],
    explicacion: "Acrónimo 'FAMA' (F = m · a) o 'Federación Médica Argentina'. La aceleración siempre tiene la misma dirección y sentido que la fuerza resultante.",
    fijaExamen: "En planos inclinados o con rozamiento, primero calcula Fr = (Fuerzas a favor) - (Fuerzas en contra) antes de igualar a m · a.",
    ejemplo: "Una masa de 4 kg recibe una fuerza neta de 20 N. ¿Aceleración? a = F / m = 20 / 4 = 5 m/s².",
    tags: ["Dinámica", "Newton", "Fuerza", "Aceleración"]
  },
  {
    id: "mne_fis_mruv_viejos_feos",
    subject: "Física",
    topic: "Cinemática MRUV",
    phrase: "VIEJO FEO = VIEJO IDIOTA MÁS ATORRANTE",
    shortFormula: "v_f = v_0 \\pm a \\cdot t",
    importance: "Alta Frecuencia",
    category: "Ecuación Temporal MRUV",
    summary: "Velocidad final en función de la velocidad inicial, aceleración y tiempo.",
    breakdown: [
      { letter: "Vf", word: "Viejo Feo", concept: "Velocidad final", unit: "m/s" },
      { letter: "Vo", word: "Viejo Idiota / Vete", concept: "Velocidad inicial", unit: "m/s" },
      { letter: "a·t", word: "Más Atorrante", concept: "Aceleración × Tiempo", unit: "m/s" }
    ],
    explicacion: "También se usa: 'Vete... y no vuelvas' (V_f = V_0 + a·t). El signo es (+) si el movimiento es acelerado (gana rapidez) y (-) si es retardado (frena).",
    fijaExamen: "Si el problema dice 'parte del reposo', Vo = 0. Si dice 'hasta detenerse', Vf = 0.",
    ejemplo: "Un auto parte del reposo con a = 3 m/s² durante 4 s. Vf = 0 + (3)(4) = 12 m/s.",
    tags: ["MRUV", "Cinemática", "Aceleración"]
  },
  {
    id: "mne_fis_mruv_cuadrados",
    subject: "Física",
    topic: "Cinemática MRUV",
    phrase: "VIEJOS FEOS AL CUADRADO",
    shortFormula: "v_f^2 = v_0^2 \\pm 2 \\cdot a \\cdot d",
    importance: "Alta Frecuencia",
    category: "Ecuación Independiente del Tiempo",
    summary: "La fórmula que se usa cuando el problema NO te da el tiempo ni te lo pide.",
    breakdown: [
      { letter: "Vf²", word: "Viejo Feo²", concept: "Velocidad final al cuadrado", unit: "(m/s)²" },
      { letter: "Vo²", word: "Viejo Idiota²", concept: "Velocidad inicial al cuadrado", unit: "(m/s)²" },
      { letter: "2ad", word: "Dos Amores Difíciles", concept: "2 × aceleración × distancia", unit: "(m/s)²" }
    ],
    explicacion: "Regla de oro: ¿En el enunciado no aparece el tiempo 't'? ¡Usa inmediatamente la ecuación de los cuadrados!",
    fijaExamen: "En caída libre vertical, la aceleración 'a' se reemplaza por la gravedad 'g' (usualmente 9.8 o 10 m/s²) y 'd' por la altura 'h'.",
    ejemplo: "Un auto a 10 m/s frena hasta detenerse (Vf = 0) en 25 m. 0 = 10² - 2(a)(25) -> 50a = 100 -> a = 2 m/s².",
    tags: ["MRUV", "Sin Tiempo", "Cuadrados"]
  },
  {
    id: "mne_fis_fraccion_chiquita",
    subject: "Física",
    topic: "Conversión de Unidades",
    phrase: "DE GRANDE A CHIQUITO: FRACCIÓN CHIQUITA (5/18)",
    shortFormula: "1 \\text{ km/h} \\times \\frac{5}{18} = 1 \\text{ m/s} \\quad;\\quad 1 \\text{ m/s} \\times \\frac{18}{5} = 1 \\text{ km/h}",
    importance: "Fundamental",
    category: "Conversión Rápida",
    summary: "¿Vas a una unidad más pequeña (km/h a m/s)? Multiplica por el número menor arriba (5/18).",
    breakdown: [
      { letter: "km/h → m/s", word: "Hacia lo pequeño", concept: "Multiplica por 5/18", unit: "5 arriba (chico)" },
      { letter: "m/s → km/h", word: "Hacia lo grande", concept: "Multiplica por 18/5", unit: "18 arriba (grande)" }
    ],
    explicacion: "Evita hacer la doble regla de tres de 1000m / 3600s. Simplificando 1000/3600 da exactamente 5/18. Truco mental: 18 km/h = 5 m/s, 36 km/h = 10 m/s, 54 km/h = 15 m/s, 72 km/h = 20 m/s, 90 km/h = 25 m/s.",
    fijaExamen: "Todos los múltiplos de 18 km/h equivalen a múltiplos de 5 m/s. Si ves 72 km/h en el examen: 72/18 = 4 -> 4 × 5 = 20 m/s ¡al instante sin lápiz!",
    ejemplo: "54 km/h a m/s: 54 × (5/18) = 3 × 5 = 15 m/s.",
    tags: ["Conversión", "Velocidad", "Atajo"]
  },

  // ---------------------------------------------------------------------------
  // QUÍMICA
  // ---------------------------------------------------------------------------
  {
    id: "mne_qui_gases_pavo_raton",
    subject: "Química",
    topic: "Gases Ideales",
    phrase: "PAVO = RATÓN",
    shortFormula: "P \\cdot V = R \\cdot T \\cdot n",
    importance: "Leyenda Pre-U",
    category: "Ecuación Universal de Gases",
    summary: "La mnemotecnia reina de la química preuniversitaria para relacionar Presión, Volumen, Moles y Temperatura.",
    breakdown: [
      { letter: "P·V", word: "PAVO", concept: "Presión (atm) × Volumen (L)", unit: "atm · L" },
      { letter: "R·T·n", word: "RATÓN", concept: "Constante R × Temp (K) × moles (n)", unit: "R = 0.082" }
    ],
    explicacion: "P·A·V·O = R·A·T·Ó·N (omitiendo las 'A' y las 'O'). Si la presión está en mmHg, R = 62.4. Si está en atmósferas, R = 0.082 atm·L/(mol·K).",
    fijaExamen: "¡TRAMPA DECISIVA! La temperatura 'T' SIEMPRE se mide en KELVIN: K = °C + 273. Si pones grados Celsius en la fórmula, la pregunta está perdida.",
    ejemplo: "Calcula el volumen de 2 moles de gas a 27 °C y 0.82 atm. T = 27 + 273 = 300 K. PAVO = RATÓN -> (0.82)(V) = (0.082)(300)(2) -> V = 60 Litros.",
    tags: ["Gases", "Química", "Presión", "Temperatura"]
  },
  {
    id: "mne_qui_densidad_policia_militar",
    subject: "Química",
    topic: "Gases Ideales y Densidad",
    phrase: "POLICÍA MILITAR = DEDO ROTO  /  PUMA = RATA",
    shortFormula: "P \\cdot \\bar{M} = d \\cdot R \\cdot T",
    importance: "Alta Frecuencia",
    category: "Densidad de Gases",
    summary: "Calcula la masa molar o densidad de cualquier gas ideal sin pasar por los moles.",
    breakdown: [
      { letter: "P · M", word: "Policía Militar / PUMA", concept: "Presión × Masa Molar del gas", unit: "atm · g/mol" },
      { letter: "d · R · T", word: "Dedo Roto / RATA", concept: "Densidad × Constante R × Temperatura", unit: "g/L · R · K" }
    ],
    explicacion: "Deriva de sustituir n = m / M en PAVO = RATÓN y despejar la densidad d = m / V. Te ahorra 3 pasos algebraicos en el examen.",
    fijaExamen: "La densidad de los gases en química casi siempre se expresa en gramos por litro (g/L), no en kg/m³.",
    ejemplo: "Halla la masa molar de un gas con d = 1.4 g/L a 0.82 atm y 300 K. (0.82)(M) = (1.4)(0.082)(300) -> M = 42 g/mol.",
    tags: ["Gases", "Densidad", "Masa Molar"]
  },
  {
    id: "mne_qui_molaridad_puercos",
    subject: "Química",
    topic: "Soluciones y Concentraciones",
    phrase: "10 PUERCOS DE MIERDA  /  10 × %P × D / M",
    shortFormula: "M = \\frac{10 \\cdot \\%P \\cdot D}{\\bar{M}}",
    importance: "Leyenda Pre-U",
    category: "Molaridad Directa",
    summary: "Calcula la Molaridad en un solo renglón cuando te dan porcentaje en peso (%P) y densidad (D).",
    breakdown: [
      { letter: "10", word: "10", concept: "Factor de conversión volumétrico", unit: "Constante" },
      { letter: "%P", word: "Puercos", concept: "Porcentaje en masa / pureza (%W)", unit: "%" },
      { letter: "D", word: "De", concept: "Densidad de la solución", unit: "g/mL" },
      { letter: "M", word: "Mierda", concept: "Masa molar del soluto", unit: "g/mol" }
    ],
    explicacion: "En academias preuniversitarias esta fórmula es legendaria: evita asumir 1000 mL de solución, calcular masa de solución y luego moles. ¡Se resuelve en 15 segundos!",
    fijaExamen: "El %P se coloca como número entero (si es 49%, pones 49, no 0.49). La densidad debe estar en g/mL o g/cm³.",
    ejemplo: "Solución de H2SO4 (M = 98 g/mol) al 49% en peso con D = 1.2 g/mL. M = (10 × 49 × 1.2) / 98 = 6 Molar.",
    tags: ["Soluciones", "Molaridad", "Concentración", "Atajo"]
  },
  {
    id: "mne_qui_normalidad_no_me_olvides",
    subject: "Química",
    topic: "Soluciones Químicas",
    phrase: "NO ME OLVIDES (N = M · θ)",
    shortFormula: "N = M \\cdot \\theta",
    importance: "Alta Frecuencia",
    category: "Normalidad vs Molaridad",
    summary: "Relaciona la Normalidad con la Molaridad mediante el parámetro de carga (teta).",
    breakdown: [
      { letter: "N", word: "No", concept: "Normalidad de la solución", unit: "Eq-g / L" },
      { letter: "M", word: "Me", concept: "Molaridad de la solución", unit: "mol / L" },
      { letter: "θ", word: "Olvides (teta)", concept: "Parámetro equivalente", unit: "H+, OH-, carga total" }
    ],
    explicacion: "Valores de θ: En ácidos = número de H+ liberables (HCl -> 1, H2SO4 -> 2). En hidróxidos = número de OH- (NaOH -> 1, Ca(OH)2 -> 2). En sales = carga neta del catión.",
    fijaExamen: "Para el ácido fosfórico H3PO4, θ = 3; para el ácido sulfúrico H2SO4, θ = 2.",
    ejemplo: "Si tienes H2SO4 a 1.5 Molar: N = M · θ = 1.5 × 2 = 3 Normal.",
    tags: ["Normalidad", "Molaridad", "Soluciones"]
  },
  {
    id: "mne_qui_subniveles_sopa",
    subject: "Química",
    topic: "Estructura Atómica",
    phrase: "SOPA DE FIDEOS  (s, p, d, f)",
    shortFormula: "s^2 \\quad;\\quad p^6 \\quad;\\quad d^{10} \\quad;\\quad f^{14}",
    importance: "Fundamental",
    category: "Subniveles y Electrones",
    summary: "Orden y capacidad máxima de electrones en los 4 subniveles atómicos.",
    breakdown: [
      { letter: "S", word: "Sopa", concept: "Subnivel Sharp (l = 0)", unit: "Máx 2 e⁻ (1 orbital)" },
      { letter: "P", word: "De", concept: "Subnivel Principal (l = 1)", unit: "Máx 6 e⁻ (3 orbitales)" },
      { letter: "D", word: "Fideos", concept: "Subnivel Difuso (l = 2)", unit: "Máx 10 e⁻ (5 orbitales)" },
      { letter: "F", word: "Sabrosos", concept: "Subnivel Fundamental (l = 3)", unit: "Máx 14 e⁻ (7 orbitales)" }
    ],
    explicacion: "Cada subnivel aumenta de 4 en 4 electrones: 2 (+4) -> 6 (+4) -> 10 (+4) -> 14. El número de orbitales es la mitad de los electrones: 1, 3, 5, 7.",
    fijaExamen: "Los números cuánticos azimutales (l) asociados son: s = 0, p = 1, d = 2, f = 3.",
    ejemplo: "¿Cuántos orbitales tiene el subnivel d? Capacidad 10 e⁻ / 2 = 5 orbitales.",
    tags: ["Química", "Atómica", "Orbitales", "Configuración"]
  },
  {
    id: "mne_qui_regla_serrucho",
    subject: "Química",
    topic: "Configuración Electrónica",
    phrase: "SÍ, SOPA, SOPA, SE DA PENSIÓN, SE DA PENSIÓN, SE FUE DE PASEO...",
    shortFormula: "1s^2 \\, 2s^2 \\, 2p^6 \\, 3s^2 \\, 3p^6 \\, 4s^2 \\, 3d^{10} \\, 4p^6 \\, 5s^2 \\dots",
    importance: "Leyenda Pre-U",
    category: "Principio de Aufbau / Moeller",
    summary: "La canción del serrucho para distribuir electrones de menor a mayor energía relativa.",
    breakdown: [
      { letter: "Sí", word: "1s", concept: "1s²", unit: "2 e⁻" },
      { letter: "Sopa Sopa", word: "2s 2p / 3s 3p", concept: "2s² 2p⁶ / 3s² 3p⁶", unit: "Hasta 18 e⁻ (Argón)" },
      { letter: "Se Da Pensión", word: "4s 3d 4p", concept: "4s² 3d¹⁰ 4p⁶", unit: "Hasta 36 e⁻ (Kriptón)" },
      { letter: "Se Da Pensión", word: "5s 4d 5p", concept: "5s² 4d¹⁰ 5p⁶", unit: "Hasta 54 e⁻ (Xenón)" },
      { letter: "Se Fue De Paseo", word: "6s 4f 5d 6p", concept: "6s² 4f¹⁴ 5d¹⁰ 6p⁶", unit: "Hasta 86 e⁻ (Radón)" }
    ],
    explicacion: "Sigue la secuencia de las iniciales: S (Sí), S-P (Sopa), S-P (Sopa), S-D-P (Se Da Pensión), S-D-P (Se Da Pensión), S-F-D-P (Se Fue De Paseo).",
    fijaExamen: "¡Antimagnéticos / Excepciones (By-pass)! Si termina en d⁴ o d⁹, salta un electrón del s para quedar más estable en d⁵ o d¹⁰ (ejemplo: Cobre Z=29: [Ar] 4s¹ 3d¹⁰, no 4s² 3d⁹).",
    ejemplo: "Configuración del Hierro (Z=26): Sí, Sopa, Sopa, Se Da... -> 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶.",
    tags: ["Serrucho", "Electrones", "Aufbau", "Moeller"]
  },

  // ---------------------------------------------------------------------------
  // TRIGONOMETRÍA
  // ---------------------------------------------------------------------------
  {
    id: "mne_tri_coca_coca_hielito",
    subject: "Trigonometría",
    topic: "Razones Trigonométricas",
    phrase: "COCA COCA HIELITO HIELITO",
    shortFormula: "\\text{sen}=\\frac{CO}{H} ,\\; \\text{cos}=\\frac{CA}{H} ,\\; \\text{tan}=\\frac{CO}{CA} ,\\; \\text{cot}=\\frac{CA}{CO} ,\\; \\text{sec}=\\frac{H}{CA} ,\\; \\text{csc}=\\frac{H}{CO}",
    importance: "Leyenda Pre-U",
    category: "Razones en Triángulo Rectángulo",
    summary: "Escribe 'CO-CA-CO-CA-HIE-HIE' de ida en los numeradores y de vuelta en los denominadores.",
    breakdown: [
      { letter: "Ida (Numerador)", word: "CO - CA - CO - CA - HIE - HIE", concept: "Numeradores de sen, cos, tan, cot, sec, csc", unit: "Arriba" },
      { letter: "Vuelta (Denom)", word: "HIE - HIE - CA - CO - CA - CO", concept: "Denominadores de abajo hacia arriba", unit: "Abajo" }
    ],
    explicacion: "Escribe en columna las 6 razones: Sen, Cos, Tan, Cot, Sec, Csc. En los numeradores cantas: CO, CA, CO, CA, H, H. Luego en los denominadores cantas al revés: H, H, CA, CO, CA, CO. ¡Y tienes las 6 razones completas sin equivocarte jamás!",
    fijaExamen: "Recuerda las razones recíprocas: Sen × Csc = 1 ; Cos × Sec = 1 ; Tan × Cot = 1 (para el mismo ángulo).",
    ejemplo: "En un triángulo con CO = 3, CA = 4, H = 5: Sen = CO/H = 3/5; Cos = CA/H = 4/5; Tan = CO/CA = 3/4.",
    tags: ["Razones", "Trigonometría", "Coca-Coca", "SOH-CAH-TOA"]
  },
  {
    id: "mne_tri_cuadrantes_chicas_cafe",
    subject: "Trigonometría",
    topic: "Ángulos en Posición Normal",
    phrase: "TODAS LAS CHICAS TOMAN CAFÉ",
    shortFormula: "\\text{I C: Todas (+)} \\quad;\\quad \\text{II C: Sen/Csc (+)} \\quad;\\quad \\text{III C: Tan/Cot (+)} \\quad;\\quad \\text{IV C: Cos/Sec (+)}",
    importance: "Leyenda Pre-U",
    category: "Signos en los 4 Cuadrantes",
    summary: "Signos positivos de las razones trigonométricas en los cuatro cuadrantes del plano cartesiano.",
    breakdown: [
      { letter: "I Cuadrante", word: "TODAS", concept: "Todas las 6 razones son POSITIVAS (+)", unit: "0° a 90°" },
      { letter: "II Cuadrante", word: "CHICAS (Seno)", concept: "Seno y su recíproca Cosecante son (+)", unit: "90° a 180°" },
      { letter: "III Cuadrante", word: "TOMAN (Tangente)", concept: "Tangente y Cotangente son (+)", unit: "180° a 270°" },
      { letter: "IV Cuadrante", word: "CAFÉ (Coseno)", concept: "Coseno y Secante son (+)", unit: "270° a 360°" }
    ],
    explicacion: "Recorre en sentido antihorario desde el primer cuadrante: I (Todas) -> II (Seno / Chicas) -> III (Tangente / Toman) -> IV (Coseno / Café). Las que no se nombran en ese cuadrante son NEGATIVAS (-).",
    fijaExamen: "¿Qué signo tiene Sen(200°)? 200° está en el III C (donde mandan Tan y Cot). Por tanto, Sen(200°) es NEGATIVO (-).",
    ejemplo: "Cos(300°): 300° está en el IV C (Café = Coseno manda) -> es POSITIVO (+).",
    tags: ["Cuadrantes", "Signos", "Reducción", "Trigonometría"]
  },

  // ---------------------------------------------------------------------------
  // LENGUAJE & COMUNICACIÓN (REGLAS Y HACKS RIGUROSOS)
  // ---------------------------------------------------------------------------
  {
    id: "mne_len_sustantivo_muy_mucho",
    subject: "Lenguaje",
    topic: "Morfología y Categorías Gramaticales",
    phrase: "LA PRUEBA REINA RAE: ¿MUY O MUCHO?",
    shortFormula: "\\text{Adjetivo / Adverbio } \\iff \\text{Admite \"MUY\"} \\quad|\\quad \\text{Sustantivo } \\iff \\text{Admite \"MUCHO/A/S\"}",
    importance: "Regla de Oro RAE",
    category: "Identificación de Sustantivo vs Adjetivo",
    summary: "La prueba lingüística formal de la RAE que supera al truco escolar de agregar 'grande'.",
    breakdown: [
      { letter: "MUY", word: "Admite MUY", concept: "Es Adjetivo o Adverbio", unit: "Invariable: muy alegre, muy lejos, muy veloz" },
      { letter: "MUCHO/A/S", word: "Admite MUCHO", concept: "Es Sustantivo", unit: "Concordancia: mucho frío, mucha paciencia, muchos amigos" }
    ],
    explicacion: "¿Por qué el truco escolar de 'palabra + grande' tiene fallas en examen de admisión? Porque falla ante sustantivos abstractos no graduables ('la nada grande' ❌, 'el acaso grande' ❌) y no distingue adjetivos sustantivados. En cambio, la regla de la RAE es tajante: LOS SUSTANTIVOS NUNCA ADMITEN 'MUY' (*muy dinero* ❌, *muy perro* ❌, *muy calor* ❌). Solo admiten cuantificadores variables: 'mucho/mucha/muchos/muchas'.",
    fijaExamen: "¿Dudas si 'inteligencia' es adjetivo o sustantivo? Prueba: ¿'Muy inteligencia' (❌) o 'Mucha inteligencia' (✔)? Es SUSTANTIVO. ¿'Inteligente'? ¿'Muy inteligente' (✔) o 'Mucha inteligente' (❌)? Es ADJETIVO.",
    ejemplo: "'Tenía un gran temor'. ¿'Temor'? -> 'Mucho temor' (✔), no 'Muy temor' (❌) -> 'Temor' es SUSTANTIVO. ¿'Temeroso'? -> 'Muy temeroso' (✔) -> Es ADJETIVO.",
    tags: ["Sustantivo", "Adjetivo", "Gramática", "RAE", "Hack"]
  },
  {
    id: "mne_len_adverbio_soltero",
    subject: "Lenguaje",
    topic: "Morfología del Adverbio",
    phrase: "EL ADVERBIO ES SOLTERO (INVARIABLE)",
    shortFormula: "\\text{Adverbio } \\implies \\text{NUNCA cambia de género ni número } (\\text{medio}, \\text{demasiado}, \\text{puro})",
    importance: "Fija UNSA",
    category: "Corrección Idiomática",
    summary: "El adverbio no se casa con nadie: jamás flexiona a femenino ni plural cuando modifica a un adjetivo o verbo.",
    breakdown: [
      { letter: "CORRECTO ✔", word: "Medio molesta", concept: "'Medio' es adverbio de cantidad modificando al adjetivo", unit: "Invariable" },
      { letter: "INCORRECTO ❌", word: "Media molesta", concept: "Error grave sancionado en admisión (media es adjetivo fraccionario)", unit: "Trampa fija" }
    ],
    explicacion: "En los exámenes de admisión colocan preguntas de discordancia gramatical. Si una palabra significa 'un poco' o 'parcialmente' (como 'medio'), actúa como adverbio y DEBE permanecer en masculino singular siempre.",
    fijaExamen: "Solo se dice 'media' cuando es adjetivo de mitad: 'media naranja', 'media manzana'. Pero cuando modifica a adjetivos: 'Ella está MEDIO distraída', 'Ellas están MEDIO locas', 'Llegaron MEDIO cansados'.",
    ejemplo: "Incorrecto: 'Ellas son medias tímidas' ❌ -> Correcto: 'Ellas son MEDIO tímidas' ✔.",
    tags: ["Adverbio", "Concordancia", "Medio", "Ortografía"]
  },
  {
    id: "mne_len_sega_acentuacion",
    subject: "Lenguaje",
    topic: "Acentuación General",
    phrase: "S - E - G - A  (DE DERECHA A IZQUIERDA)",
    shortFormula: "\\textbf{S}\\text{ (4ta)} \\;\\longleftarrow\\; \\textbf{E}\\text{ (3ra)} \\;\\longleftarrow\\; \\textbf{G}\\text{ (2da)} \\;\\longleftarrow\\; \\textbf{A}\\text{ (1ra / última)}",
    importance: "Fundamental",
    category: "Clasificación de Palabras",
    summary: "Escribe las iniciales S-E-G-A sobre las sílabas desde la última hacia atrás para tildar al instante.",
    breakdown: [
      { letter: "A", word: "Agudas (Oxítonas)", concept: "Última sílaba tónica", unit: "Se tildan si terminan en N, S o vocal" },
      { letter: "G", word: "Graves / Llanas (Paroxítonas)", concept: "Penúltima sílaba tónica", unit: "Se tildan si NO terminan en N, S ni vocal" },
      { letter: "E", word: "Esdrújulas (Proparoxítonas)", concept: "Antepenúltima sílaba tónica", unit: "TODAS se tildan sin excepción" },
      { letter: "S", word: "Sobreesdrújulas (Preproparoxítonas)", concept: "Antes de la antepenúltima", unit: "TODAS se tildan sin excepción" }
    ],
    explicacion: "Coloca la palabra separada en sílabas y escribe encima de derecha a izquierda: A, G, E, S. Identifica dónde recae el golpe de voz (acento prosódico).",
    fijaExamen: "Si una palabra termina en 'S' precedida de otra consonante (bíceps, cómics, fórceps), las agudas NO se tildan (robots), pero las graves SÍ se tildan (bíceps, récords).",
    ejemplo: "cár-cel -> Penúltima sílaba (G), termina en L (distinta de N, S, vocal) -> Lleva tilde: cár-cel.",
    tags: ["Acentuación", "SEGA", "Tildación", "Sílaba"]
  },
  {
    id: "mne_len_tildacion_diacritica_8",
    subject: "Lenguaje",
    topic: "Acentuación Diacrítica",
    phrase: "ÉL DÉ MÁS TÉ SÍ SÉ MÍ TÚ",
    shortFormula: "\\text{\"Si él me da más té, sé que le diré sí para mí y para ti no\"}",
    importance: "Leyenda Pre-U",
    category: "Monosílabos con Tilde",
    summary: "Los únicos 8 monosílabos que admiten tilde diacrítica en español para diferenciar significados.",
    breakdown: [
      { letter: "Él / El", word: "Él (pronombre) vs El (artículo)", concept: "Él ingresó / El aula", unit: "Con tilde: persona" },
      { letter: "Tú / Tu", word: "Tú (pronombre) vs Tu (posesivo)", concept: "Tú puedes / Tu meta", unit: "Con tilde: persona" },
      { letter: "Mí / Mi", word: "Mí (pronombre) vs Mi (posesivo/nota)", concept: "Para mí / Mi libro", unit: "Con tilde: persona" },
      { letter: "Té / Te", word: "Té (sustantivo) vs Te (pronombre)", concept: "Toma té caliente / Te llamé", unit: "Con tilde: infusión" },
      { letter: "Dé / De", word: "Dé (verbo dar) vs De (preposición)", concept: "Dé su apoyo / Vaso de agua", unit: "Con tilde: verbo" },
      { letter: "Sé / Se", word: "Sé (verbo saber/ser) vs Se (pronombre)", concept: "Sé constante; ya lo sé / Se marchó", unit: "Con tilde: verbo" },
      { letter: "Más / Mas", word: "Más (cantidad) vs Mas (conjunción pero)", concept: "Más preguntas / Estudió, mas falló", unit: "Con tilde: cantidad" },
      { letter: "Sí / Si", word: "Sí (afirmación/pronombre) vs Si (condicional)", concept: "Dijo que sí; volvió en sí / Si vienes...", unit: "Con tilde: sí rotundo" }
    ],
    explicacion: "Palabras como 'ti', 'fe', 'dio', 'vio', 'fue', 'fui', 'da', 'di' NUNCA llevan tilde porque son monosílabos sin pareja átona en español.",
    fijaExamen: "La palabra 'solo' (incluso como 'solamente') y los pronombres 'este, ese, aquel' ya NO se tildan según la normativa oficial de la RAE.",
    ejemplo: "Correcto: 'Si él me da más té, sé que le diré que sí a mi sueño de ingresar'.",
    tags: ["Diacrítica", "Monosílabos", "Tilde", "Normativa"]
  },
  {
    id: "mne_len_4_porques",
    subject: "Lenguaje",
    topic: "Ortografía de Conectores",
    phrase: "LOS 4 PORQUÉS: PREGUNTA, RESPUESTA, MOTIVO Y RELATIVO",
    shortFormula: "¿\\text{Por qué}? \\quad\\longleftrightarrow\\quad \\text{Porque} \\quad\\longleftrightarrow\\quad \\text{El porqué} \\quad\\longleftrightarrow\\quad \\text{Por que}",
    importance: "Fija UNSA",
    category: "Grafías Dudosa",
    summary: "Aprende a diferenciar las cuatro formas homófonas de 'porque' sin dudar jamás.",
    breakdown: [
      { letter: "¿Por qué?", word: "Separado y con tilde", concept: "Pregunta directa o indirecta", unit: "¿Por qué no viniste? / No sé por qué se fue." },
      { letter: "Porque", word: "Junto y sin tilde", concept: "Causa o respuesta (= ya que, dado que)", unit: "Llegó tarde porque llovió." },
      { letter: "El porqué", word: "Junto y con tilde", concept: "Sustantivo que significa 'el motivo' / 'la razón'", unit: "Ignoro el porqué de su actitud." },
      { letter: "Por que", word: "Separado y sin tilde", concept: "Equivale a 'por el cual' o preposición + que", unit: "Fueron muchos los premios por que compitió." }
    ],
    explicacion: "El truco definitivo: Si puedes ponerle 'el' o 'un' adelante ('el porqué'), es sustantivo: junto y con tilde. Si puedes sustituirlo por 'ya que', es 'porque' junto y sin tilde. Si es interrogación o exclamación: separado con tilde.",
    fijaExamen: "En oraciones interrogativas indirectas no hay signos de interrogación pero sí tilde: 'Dime por qué no estudiaste'.",
    ejemplo: "¿Por qué protestas? Porque desconozco el porqué de las leyes por que votaron.",
    tags: ["Porqués", "Conectores", "Ortografía", "Lenguaje"]
  },

  // ---------------------------------------------------------------------------
  // BIOLOGÍA
  // ---------------------------------------------------------------------------
  {
    id: "mne_bio_mitosis_prometo",
    subject: "Biología",
    topic: "Ciclo Celular y Mitosis",
    phrase: "PRO METO A ANA TEJER",
    shortFormula: "\\text{Profase} \\longrightarrow \\text{Metafase} \\longrightarrow \\text{Anafase} \\longrightarrow \\text{Telofase}",
    importance: "Leyenda Pre-U",
    category: "Fases de la Mitosis",
    summary: "Las cuatro fases consecutivas de la división nuclear en células somáticas eucariotas.",
    breakdown: [
      { letter: "PRO", word: "Profase", concept: "Condensación de cromatina, desaparece carioteca y nucleolo", unit: "Fase 1" },
      { letter: "METO", word: "Metafase", concept: "Cromosomas alineados en la placa ecuatorial (máxima condensación)", unit: "Fase 2" },
      { letter: "ANA", word: "Anafase", concept: "Separación y disyunción de cromátidas hermanas hacia los polos", unit: "Fase 3" },
      { letter: "TEJER", word: "Telofase", concept: "Reaparición de carioteca, descondensación y citocinesis", unit: "Fase 4" }
    ],
    explicacion: "PRO-METO A ANA TEJER es el clásico indiscutible. En Metafase se realiza el cariotipo porque los cromosomas alcanzan su máxima visibilidad y grosor.",
    fijaExamen: "¿En qué fase se observan mejor los cromosomas para detectar anomalías genéticas? En METAFASE (placa ecuatorial).",
    ejemplo: "Secuencia: Profase (prepara) -> Metafase (medio/ecuador) -> Anafase (apartar/polos) -> Telofase (termina).",
    tags: ["Mitosis", "Biología", "Célula", "Genética"]
  },
  {
    id: "mne_bio_bioelementos_chonps",
    subject: "Biología",
    topic: "Bioquímica de la Vida",
    phrase: "C - H - O - N - P - S",
    shortFormula: "\\text{C (Carbono) , H (Hidrógeno) , O (Oxígeno) , N (Nitrógeno) , P (Fósforo) , S (Azufre)}",
    importance: "Fundamental",
    category: "Bioelementos Primarios",
    summary: "Los 6 bioelementos organógenos que constituyen más del 96% de la masa de los seres vivos.",
    breakdown: [
      { letter: "C", word: "Carbono", concept: "Esqueleto tetravalente de todas las biomoléculas orgánicas", unit: "~18%" },
      { letter: "H", word: "Hidrógeno", concept: "Componente del agua y dador de protones", unit: "~10%" },
      { letter: "O", word: "Oxígeno", concept: "Bioelemento más abundante en masa del cuerpo humano", unit: "~65%" },
      { letter: "N", word: "Nitrógeno", concept: "Componente estructural de aminoácidos, proteínas y ácidos nucleicos", unit: "~3%" },
      { letter: "P", word: "Fósforo", concept: "Presente en ATP, fosfolípidos de membranas y nucleótidos", unit: "~1%" },
      { letter: "S", word: "Azufre", concept: "Presente en aminoácidos cisteína y metionina (puentes disulfuro)", unit: "~0.3%" }
    ],
    explicacion: "El oxígeno es el bioelemento más abundante en porcentaje de masa debido a la gran cantidad de agua corporal (~70%). El carbono es el elemento estructural base de la vida.",
    fijaExamen: "¿Cuál es el bioelemento más abundante en masa en el ser humano? El OXÍGENO (65%), no el carbono.",
    ejemplo: "CHON forman glúcidos y lípidos; CHONP ácidos nucleicos; CHONS proteínas.",
    tags: ["Bioquímica", "CHONPS", "Bioelementos", "Célula"]
  },
  {
    id: "mne_bio_bases_gardel_troilo",
    subject: "Biología",
    topic: "Ácidos Nucleicos",
    phrase: "CARLOS GARDEL (C-G)  &  ANÍBAL TROILO (A-T)",
    shortFormula: "\\text{Citosina } \\equiv \\text{ Guanina (3 enlaces)} \\quad;\\quad \\text{Adenina } = \\text{ Timina (2 enlaces)}",
    importance: "Alta Frecuencia",
    category: "Complementariedad de Bases ADN",
    summary: "Apareamiento complementario de bases nitrogenadas según la Ley de Chargaff.",
    breakdown: [
      { letter: "C - G", word: "Carlos Gardel", concept: "Citosina se une con Guanina mediante 3 puentes de hidrógeno", unit: "3 enlaces H" },
      { letter: "A - T", word: "Aníbal Troilo", concept: "Adenina se une con Timina mediante 2 puentes de hidrógeno", unit: "2 enlaces H" },
      { letter: "Agua Pura", word: "AG-Purina", concept: "Adenina y Guanina son bases PÚRICAS (dos anillos)", unit: "Purinas" }
    ],
    explicacion: "En el ARN, la Timina es reemplazada por el Uracilo (A-U). La mnemotecnia 'Agua Pura' (A-G = Púricas) te recuerda que Adenina y Guanina son las purinas.",
    fijaExamen: "El enlace Citosina-Guanina (C≡G) tiene 3 puentes de hidrógeno y es más resistente térmicamente que el par Adenina-Timina (A=T) que tiene solo 2 enlaces.",
    ejemplo: "Si un segmento de ADN tiene 30% de Guanina, por Ley de Chargaff tiene 30% de Citosina, 20% de Adenina y 20% de Timina.",
    tags: ["ADN", "Genética", "Bases", "Chargaff"]
  },

  // ---------------------------------------------------------------------------
  // ARITMÉTICA & RAZONAMIENTO MATEMÁTICO
  // ---------------------------------------------------------------------------
  {
    id: "mne_ari_es_sobre_de",
    subject: "Aritmética",
    topic: "Tanto por Ciento",
    phrase: "\"ES\" SOBRE \"DE\" × 100%",
    shortFormula: "\\text{Porcentaje} = \\frac{\\text{Parte (\"es\", \"son\", \"representa\")}}{\\text{Todo (\"de\", \"del\", \"respecto a\")}} \\times 100\\%",
    importance: "Leyenda Pre-U",
    category: "Fracción y Tanto por Ciento",
    summary: "¿Qué tanto por ciento de A es B? La palabra 'es' va arriba (numerador) y 'de' va abajo (denominador).",
    breakdown: [
      { letter: "ES", word: "Numerador (Arriba)", concept: "La parte o lo que se compara (es, representa, equivale)", unit: "Parte" },
      { letter: "DE", word: "Denominador (Abajo)", concept: "El total o referencia (de, del, respecto a)", unit: "Total" }
    ],
    explicacion: "En problemas de razonamiento matemático como '¿Qué porcentaje de 80 es 20?', los estudiantes a menudo no saben quién divide a quién. La regla mnemotécnica 'ES sobre DE' lo resuelve en medio segundo: 20 ('es') / 80 ('de') × 100% = 25%.",
    fijaExamen: "Fíjate bien en la preposición: '¿Qué porcentaje es 15 respecto de 60?' -> ES = 15, DE = 60 -> (15/60) × 100% = 25%.",
    ejemplo: "¿Qué porcentaje de 50 es 10? Fracción: 10 / 50 = 1/5 -> 1/5 × 100% = 20%.",
    tags: ["Porcentajes", "Aritmética", "RM", "Atajo"]
  },
  {
    id: "mne_ari_campanadas_intervalos",
    subject: "Aritmética",
    topic: "Razonamiento Matemático",
    phrase: "INTERVALOS = CAMPANADAS - 1",
    shortFormula: "i = C - 1 \\quad;\\quad \\text{Tiempo Total} = i \\times t_{\\text{intervalo}}",
    importance: "Fija UNSA",
    category: "Problemas de Campanadas y Cortes",
    summary: "El tiempo transcurrido depende del número de INTERVALOS entre campanadas, ¡NUNCA de las campanadas!",
    breakdown: [
      { letter: "Campanadas", word: "Golpes / Sonidos", concept: "No miden tiempo por sí solas", unit: "Eventos" },
      { letter: "Intervalos", word: "Campanadas - 1", concept: "Los silencios reales donde pasa el tiempo", unit: "Intervalos (i)" }
    ],
    explicacion: "Trampa clásica de examen: 'Un reloj da 4 campanadas en 6 segundos. ¿Cuánto tardará en dar 8 campanadas?'. Si haces regla de tres directa (4 camp -> 6s, 8 camp -> 12s) ¡ESTÁ MAL! 4 campanadas tienen 3 intervalos -> cada intervalo dura 6/3 = 2 s. Para 8 campanadas hay 7 intervalos -> 7 × 2 s = 14 segundos.",
    fijaExamen: "Aplica la misma lógica para estacas y cortes: N° cortes = N° partes - 1; N° estacas = N° partes + 1.",
    ejemplo: "6 campanadas en 10 s -> 5 intervalos = 10 s -> 1 intervalo = 2 s. ¿11 campanadas? 10 intervalos × 2 s = 20 s.",
    tags: ["Campanadas", "Intervalos", "RM", "Trampa"]
  }
];
