// ORSTTY AI Local - Respuestas inteligentes y directas sin internet
// Conectado directamente a los contenidos y temarios de la sección Aprender
import { SUBJECT_ROADMAP, SUBJECTS_CONFIG } from '../../data/learningPathData.js';

const KNOWLEDGE_BASE = {
  // Ciencias
  'relatividad': 'La relatividad es una teoría de Einstein que explica cómo funcionan el espacio y el tiempo. Hay dos partes: la especial (1905) sobre velocidad y la general (1915) sobre gravedad. 🚀',
  'mitocondria': 'La mitocondria es la "central energética" de la célula. Produce ATP (energía) mediante respiración celular. Tiene su propio ADN. ⚡',
  'fotosintesis': 'La fotosíntesis es el proceso donde las plantas convierten luz solar en glucosa. Necesitan CO2, agua y luz. Producen oxígeno. 🌱',
  ' ADN': 'El ADN (ácido desoxirribonucleico) es la molécula que contiene nuestros genes. Tiene forma de doble hélice y se encuentra en el núcleo de las células. 🧬',
  'celula': 'La célula es la unidad básica de la vida. Tiene membrana, citoplasma y núcleo. Las plantas tienen pared celular y cloroplastos. 🔬',
  'atomo': 'El átomo es la unidad básica de la materia. Tiene núcleo (protones y neutrones) y electrones girando alrededor. ⚛️',
  'energia': 'La energía es la capacidad de hacer trabajo. No se crea ni se destruye, solo se transforma (1ra ley de la termodinámica). 🔋',
  'gravedad': 'La gravedad es la fuerza de atracción entre masas. En la Tierra, los objetos caen a 9.8 m/s². Einstein la explicó como curvatura del espacio-tiempo. 🍎',
  'velocidad': 'La velocidad es la distancia recorrida por unidad de tiempo. Fórmula: v = d/t. Se mide en m/s o km/h. 🏎️',
  'acido': 'Los ácidos tienen pH menor a 7, saben agrios, conductan electricidad y neutralizan bases. Ejemplos: ácido clorhídrico (HCl), ácido sulfúrico (H2SO4). 🧪',
  'base': 'Las bases tienen pH mayor a 7, saben amargas, son jabonosas y neutralizan ácidos. Ejemplos: hidróxido de sodio (NaOH), hidróxido de calcio. 🧼',
  'tabla periodica': 'La tabla periodica organiza los 118 elementos químicos por número atómico, grupos y períodos. Fue creada por Mendeléyev en 1869. 📊',
  'formula': 'Una fórmula química muestra los elementos de un compuesto. Ej: H2O = 2 hidrógenos + 1 oxígeno. Las fórmulas moleculares muestran la cantidad real de átomos. ✏️',
  'velocidad de la luz': 'La velocidad de la luz en el vacío es 299,792,458 m/s (aproximadamente 300,000 km/s). Es la velocidad máxima del universo. 💡',
  'masa': 'La masa es la cantidad de materia en un objeto. Se mide en kilogramos (kg). No confundir con peso, que es la fuerza de gravedad sobre la masa. ⚖️',
  'inercia': 'La inercia es la resistencia de un objeto a cambiar su estado de movimiento. Un objeto en reposo tiende a quedarse en reposo, y uno en movimiento sigue en movimiento. 🎳',
  'presion': 'La presión es la fuerza aplicada por unidad de área. P = F/A. Se mide en Pascales (Pa). La presión atmosférica a nivel del mar es 101,325 Pa. 🌡️',
  
  // Matemáticas
  'pitagoras': 'El teorema de Pitágoras dice: en un triángulo rectángulo, a² + b² = c², donde c es la hipotenusa. Sirve para calcular lados de triángulos. 📐',
  'ecuacion': 'Una ecuación es una igualdad matemática con una incógnita (x). Para resolverla, despejamos la variable. Ej: 2x + 3 = 7 → x = 2. 📝',
  'fraccion': 'Una fracción representa una parte de un todo. Tiene numerador (arriba) y denominador (abajo). Ej: 3/4 = tres cuartos. Se puede simplificar. 🔢',
  'porcentaje': 'Un porcentaje es una fracción de 100. Para calcular: (parte/total) × 100. Ej: 25 de 100 = 25%. Para calcular 20% de 50: 0.20 × 50 = 10. 💯',
  'geometria': 'La geometría estudia formas, tamaños y propiedades del espacio. Incluye puntos, líneas, ángulos, triángulos, círculos y sólidos. 📏',
  'triangulo': 'Un triángulo tiene 3 lados y 3 ángulos que suman 180°. Puede ser: equilátero (3 lados iguales), isósceles (2 iguales) o escaleno (ninguno igual). 🔺',
  'circulo': 'Un círculo es una figura donde todos los puntos están a la misma distancia del centro. Área = πr². Perímetro = 2πr. 🎯',
  'porcentaje error': 'El porcentaje de error mide la precisión de un valor. Fórmula: |(valor real - valor experimental) / valor real| × 100. 📊',
  'potencia': 'Una potencia es una multiplicación repetida. a^n = a × a × a... (n veces). Ej: 2³ = 2 × 2 × 2 = 8. ⬆️',
  'raiz cuadrada': 'La raíz cuadrada de un número es otro número que multiplicado por sí mismo da el original. Ej: √16 = 4 porque 4 × 4 = 16. √',
  'angulo': 'Un ángulo es la unión de dos rayos con un vértice. Se mide en grados: agudo (<90°), recto (=90°), obtuso (>90°), llano (=180°). 📐',
  'volumen': 'El volumen es el espacio que ocupa un objeto tridimensional. Se mide en unidades cúbicas (cm³, m³). Volumen del cubo = lado³. 📦',
  'perimetro': 'El perímetro es la suma de todos los lados de una figura. Ej: perímetro del cuadrado = 4 × lado. Se mide en unidades de longitud. 📏',
  'area': 'El área es la superficie que cubre una figura. Se mide en unidades cuadradas (cm², m²). Ej: área del rectángulo = base × altura. 🔲',
  'promedio': 'El promedio (media) es la suma de todos los valores dividida entre la cantidad. Ej: (10 + 20 + 30) / 3 = 20. 📊',
  'factorial': 'El factorial de un número n (n!) es el producto de todos los números enteros desde 1 hasta n. Ej: 5! = 5×4×3×2×1 = 120. 5!',
  'combinatoria': 'La combinatoria estudia las formas de agrupar elementos. C(n,r) = n! / (r! × (n-r)!). Ej: C(5,2) = 10 formas de elegir 2 de 5. 🎲',
  'permutacion': 'Una permutación es el orden en que se disponen elementos. P(n) = n!. Ej: 3 personas pueden sentarse de 6 formas (3! = 6). 🔄',
  'aritmetica': 'La aritmética es la rama de las matemáticas que estudia los números y sus operaciones: suma, resta, multiplicación y división. ➕➖✖️➗',
  'algebra': 'El álgebra usa letras (variables) para representar números desconocidos. Permite resolver ecuaciones y encontrar valores de x, y, etc. 📐',
  'trigonometria': 'La trigonometría estudia las relaciones entre ángulos y lados de triángulos. Funciones principales: seno, coseno y tangente. 📊',
  'seno': 'El seno de un ángulo en un triángulo rectángulo es la razón entre el lado opuesto y la hipotenusa. sin(θ) = opuesto/hipotenusa. 📐',
  'coseno': 'El coseno de un ángulo es la razón entre el lado adyacente y la hipotenusa. cos(θ) = adyacente/hipotenusa. 📐',
  'tangente': 'La tangente de un ángulo es la razón entre el lado opuesto y el adyacente. tan(θ) = opuesto/adyacente = seno/coseno. 📐',
  'hipotenusa': 'La hipotenusa es el lado más largo de un triángulo rectángulo, opuesto al ángulo recto. Se calcula con Pitágoras: c = √(a² + b²). 📐',
  'area del circulo': 'El área de un círculo es A = πr², donde r es el radio. π (pi) ≈ 3.14159. Ejemplo: radio 5 → A = π × 25 ≈ 78.54. 🔵',
  'volumen del cilindro': 'El volumen de un cilindro es V = πr²h, donde r es el radio de la base y h es la altura. 🥫',
  'volumen del cono': 'El volumen de un cono es V = (πr²h)/3, donde r es el radio y h es la altura. Es 1/3 del volumen del cilindro. 🍦',
  'volumen de la esfera': 'El volumen de una esfera es V = (4/3)πr³, donde r es el radio. Fue descubierto por Arquímedes. ⚽',
  'teorema de pitagoras': 'En un triángulo rectángulo, el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos: a² + b² = c². 📐',
  'formula general': 'La fórmula general de segundo grado es: ax² + bx + c = 0. Se resuelve con: x = (-b ± √(b²-4ac)) / 2a. 📝',
  'raices de una ecuacion': 'Las raíces de una ecuación son los valores de x que la satisfacen. En 2do grado, el discriminante (b²-4ac) indica: >0 dos raíces, =0 una raíz, <0 sin raíces reales. 🔢',
  'progresion aritmetica': 'Una progresión aritmetica tiene una diferencia constante entre términos consecutivos. an = a1 + (n-1)d. Suma: Sn = n(a1 + an)/2. 📈',
  'progresion geometrica': 'Una progresión geométrica tiene una razón constante. an = a1 × r^(n-1). Suma: Sn = a1(1-r^n)/(1-r). 📈',
  
  // Historia
  'independencia del peru': 'La independencia del Perú se declaró el 28 de julio de 1821 por José de San Martín en Lima. La batalla final fue en Ayacucho (1824). 🇵🇪',
  'batalla de ayacucho': 'La Batalla de Ayacucho (9 de diciembre de 1824) fue la última gran batalla por la independencia sudamericana. Antonio José de Sucre venció al virrey La Serna. ⚔️',
  'san martin': 'José de San Martín fue libertador de Argentina, Chile y Perú. Llegó al Perú en 1820 y declaró la independencia en 1821. 🗡️',
  'bolivar': 'Simón Bolívar fue libertador de Venezuela, Colombia, Ecuador, Perú y Bolivia. Liberó el Perú y dio su nombre a Bolivia. 🏛️',
  'tahuantinsuyo': 'El Tahuantinsuyo fue el imperio incaico, el más grande de Sudamérica. Tenía 4 regiones (suyos) y abarcaba desde Colombia hasta Chile. 🏔️',
  'incas': 'Los incas fueron una civilización avanzada que construyó Machu Picchu, desarrollo cultivos en terrazas y tenía un sistema de caminos de más de 30,000 km. 👑',
  'conquista del peru': 'La conquista del Perú fue realizada por Francisco Pizarro entre 1531-1533. Capturó al inca Atahualpa en Cajamarca y fundó Lima en 1535. ⚔️',
  'colonizacion': 'La colonización española del Perú duró casi 300 años (1533-1821). Se estableció el Virreinato del Perú, se explotaron minas y se impuso el catolicismo. 🏰',
  'virreinato': 'El Virreinato del Perú fue la entidad política colonial que governaba gran parte de Sudamérica. Su capital era Lima, la "Ciudad de los Reyes". 🏛️',
  'guerra del pacifico': 'La Guerra del Pacífico (1879-1884) enfrentó a Perú y Bolivia contra Chile. Perú perdió Arica, Tacna y Tarapacá. Fue por recursos del salitre. ⚔️',
  'ancash': 'Ancash es un departamento del Perú, capital: Huaraz. Tiene la Cordillera Blanca (Cerro Huascarán, 6,768 m) y el Callejón de Huaylas. 🏔️',
  'cusco': 'Cusco fue la capital del imperio incaico. Es Patrimonio de la Humanidad. Machu Picchu está a 112 km. Turismo: Sacsayhuamán, Moray, Salineras. 🏛️',
  'lima': 'Lima es la capital del Perú, fundada por Pizarro en 1535. Tiene el centro histórico (Patrimonio UNESCO), el Rímac y la gastronomía reconocida mundialmente. 🌆',
  'arequipa': 'Arequipa es la "Ciudad Blanca", capital del Perú en dos ocasiones. Tiene el Colca (cóndores) y el Misti (volcán). Arquitectura de sillar blanco. 🏔️',
  
  // Geografía
  'amazonas': 'El río Amazonas es el más caudaloso del mundo, con 7,062 km. Nace en Perú (Nevado Mismi) y desemboca en Brasil. Su cuenca cubre 7 millones km². 🌊',
  'andes': 'Los Andes son la cordillera más larga del mundo (7,000 km). Recorren 7 países de Sudamérica. Su pico más alto es el Aconcagua (6,961 m). 🏔️',
  'amazonia': 'La Amazonía es la selva más grande del mundo. Cubre 6.7 millones km² en 9 países. Tiene el 10% de la biodiversidad mundial. 🌳',
  'costa del peru': 'La costa del Perú tiene 2,414 km, desértica con valles fértiles. Ciudades: Tumbes, Piura, Lima, Ica, Arequipa, Tacna. Temperatura: 15-25°C. 🏖️',
  'sierra del peru': 'La sierra del Perú es la región andina, con valles, mesetas y cordilleras. Temperatura: 5-20°C. Ciudades: Cusco, Huancayo, Huaraz. 🏔️',
  'selva del peru': 'La selva del Perú cubre el 60% del territorio. Amazonas, Loreto, San Martín. Temperatura: 24-28°C. Biodiversidad enorme. 🌳',
  
  // Física
  'ohm': 'La Ley de Ohm establece: V = I × R (Voltaje = Corriente × Resistencia). Mide cómo fluye la electricidad en un circuito. ⚡',
  'newton': 'La Segunda Ley de Newton: F = m × a (Fuerza = masa × aceleración). Un newton es la fuerza para acelerar 1 kg a 1 m/s². 🍎',
  'termodinamica': 'La termodinamica estudia el calor y la energía. Primera ley: energía no se crea ni se destruye. Segunda ley: el entropía siempre aumenta. 🔥',
  'electromagnetismo': 'El electromagnetismo une electricidad y magnetismo. Maxwell demostró que son la misma fuerza. Las ondas de radio, luz y rayos X son electromagnéticas. ⚡',
  'ondas': 'Las ondas transfieren energía sin materia. Son transversales (luz) o longitudinales (sonido). Se miden en frecuencia (Hz) y amplitud. 🌊',
  'luz': 'La luz es una onda electromagnética visible. Viaja a 300,000 km/s. Se comporta como onda y partícula (fotón). El arcoíris es descomposición de la luz. 💡',
  'sonido': 'El sonido es una onda mecánica que necesita un medio (aire, agua). Se mide en decibelios (dB). Velocidad en aire: 343 m/s a 20°C. 🔊',
  'calor': 'El calor es energía en tránsito por diferencia de temperatura. Se transmite por conducción, convección y radiación. Se mide en julios (J). 🔥',
  'temperatura': 'La temperatura mide la energía cinética de las partículas. Escalas: Celsius (°C), Fahrenheit (°F), Kelvin (K). 0°C = 273 K = 32°F. 🌡️',
  'friccion': 'La fricción es la fuerza que se opone al movimiento entre superficies. Puede ser estática (no mueve) o cinética (en movimiento). F = μ × N. 🛑',
  'trabajo': 'En física, trabajo es fuerza por distancia: W = F × d × cos(θ). Se mide en julios (J). No es lo mismo que trabajo cotidiano. 💪',
  'potencia fisica': 'La potencia es la rapidez con que se hace trabajo: P = W/t. Se mide en vatios (W). 1 W = 1 J/s. Un caballo de fuerza = 746 W. ⚡',
  'impulso': 'El impulso es fuerza por tiempo: J = F × Δt. Es igual al cambio de momento lineal. Se usa para frenar o acelerar objetos. 🎯',
  'momento lineal': 'El momento lineal es masa por velocidad: p = m × v. Se conserva en colisiones. Un objeto en movimiento tiende a seguir en movimiento. 🎳',
  
  // Biología
  'respiracion celular': 'La respiración celular convierte glucosa en ATP (energía). Etapas: glucólisis, ciclo de Krebs, cadena de transporte de electrones. Ocurre en mitocondrias. ⚡',
  'digestion': 'La digestión descompone los alimentos en nutrientes. Boca (masticación) → estómago (ácidos) → intestino delgado (absorción) → intestino grueso (agua). 🍽️',
  'circulacion': 'El sistema circulatorio bombea sangre por el cuerpo. Corazón → arterias → capilares → venas → corazón. Transporta oxígeno y nutrientes. ❤️',
  'respiracion': 'La respiración es el intercambio de gases: inhalamos O2, exhalamos CO2. Pulmones → alvéolos → sangre → células. Ocurce 12-20 veces por minuto. 🫁',
  'nervioso': 'El sistema nervioso controla el cuerpo. Cerebro (control central), médula espinal, nervios. Neuronas transmiten señales eléctricas. 🧠',
  'excretor': 'El sistema excretor elimina desechos: riñones (orina), pulmones (CO2), piel (sudor), hígado (bilis). Los riñones filtran 180 litros/día. 🚿',
  'reproductor': 'El sistema reproductor produce gametos y hormonas. Hombres: testículos (testosterona, espermatozoides). Mujeres: ovarios (estrógeno, óvulos). 👶',
  'endocrino': 'El sistema endocrino usa hormonas para regular funciones. Glándulas: tiroides, pituitaria, suprarrenales, páncreas (insulina). 🧪',
  'inmunologico': 'El sistema inmunológico defiende contra patógenos. Células B (anticuerpos), células T (destruyen infectadas), fagocitos (devoran). 🛡️',
  'evolucion': 'La evolución es el cambio de especies con el tiempo. Darwin propuso selección natural: sobreviven los más aptos. Mecanismos: mutación, selección, deriva. 🦎',
  'genetica': 'La genética estudia la herencia. Genes (ADN) determinan características. Dominantes (A) se expresan, recesivos (a) solo con aa. Punnett square. 🧬',
  'homeostasis': 'La homeostasis es el equilibrio interno del cuerpo. Ejemplos: temperatura 37°C, pH 7.4, glucosa constante. Mantiene la vida. ⚖️',
  'ecologia': 'La ecología estudia las relaciones entre organismos y su ambiente. Incluye ecosistemas, cadenas alimenticias, biodiversidad. 🌍',
  'biodiversidad': 'La biodiversidad es la variedad de vida en un área. Incluye diversidad genética, de especies y de ecosistemas. La Amazonía tiene la mayor del mundo. 🌳',
  
  // Términos generales
  'ciencia': 'La ciencia es el conjunto de conocimientos organizados y verificables mediante método científico: observación, hipótesis, experimentación, conclusión. 🔬',
  'tecnologia': 'La tecnología es la aplicación del conocimiento científico para resolver problemas y mejorar la vida humana. Incluye herramientas, máquinas y sistemas. 💻',
  'sociedad': 'La sociedad es el conjunto de personas que comparten una cultura, instituciones y formas de vida. Se organizan en comunidades, países y civilizaciones. 🏛️',
  'cultura': 'La cultura es el conjunto de costumbres, creencias, arte y formas de vida de un grupo. Se transmite de generación en generación. 🎭',
  'economia': 'La economía estudia cómo se distribuyen los recursos escasos. Incluye oferta y demanda, inflación, PIB, empleo y política monetaria. 📈',
  'politica': 'La política es la actividad por la cual se gobierna un país o comunidad. Incluye elecciones, partidos, poder legislativo, ejecutivo y judicial. 🏛️',
  'educacion': 'La educación es el proceso de aprendizaje y enseñanza. Desarrolla conocimientos, habilidades, valores y pensamiento crítico. 📚',
  'salud': 'La salud es el estado de bienestar físico, mental y social. No solo es ausencia de enfermedad. Se mantiene con hábitos saludables. 💪',
  'deporte': 'El deporte es la actividad física regulada por reglas. Beneficios: salud cardiovascular, fuerza, coordinación, trabajo en equipo. ⚽',
  'arte': 'El arte es la expresión de creatividad y emociones. Incluye pintura, escultura, música, literatura, danza y cine. Refleja la cultura humana. 🎨',
  
  // Peru specific
  'gobierno del peru': 'El Perú es una república democrática. Poderes: Ejecutivo (presidente), Legislativo (congreso), Judicial. Capital: Lima. Idioma: español, quechua, aimara. 🇵🇪',
  'constitucion del peru': 'La Constitución Política del Perú es la ley suprema. Fue promulgada en 1993. Establece derechos, deberes y organización del Estado. 📜',
  'economia del peru': 'La economía del Perú depende de minería (oro, cobre, plata), agricultura (quinoa, aguacate) y pesca. PIB: ~$220 mil millones. Inflación controlada. 📈',
  'poblacion del peru': 'El Perú tiene aproximadamente 34 millones de habitantes. 60% vive en la costa, 30% en la sierra, 10% en la selva. Crecimiento: 1% anual. 👥',
};

// Función auxiliar para normalizar texto
function cleanText(str) {
  if (!str) return '';
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, " ").trim();
}

// Búsqueda profunda en los contenidos de la sección Aprender (SUBJECT_ROADMAP)
function searchAprenderRoadmap(query) {
  if (!SUBJECT_ROADMAP || typeof SUBJECT_ROADMAP !== 'object') return null;

  const cleanQuery = cleanText(query);
  const queryWords = cleanQuery.split(/\s+/).filter(w => w.length > 2);
  if (queryWords.length === 0) return null;

  // 1. Detectar si pregunta por un curso específico y semana
  const isAskingWeek = cleanQuery.includes('semana') || cleanQuery.includes('leccion');
  for (const [subjectName, lessons] of Object.entries(SUBJECT_ROADMAP)) {
    const cleanSubj = cleanText(subjectName);
    if (cleanQuery.includes(cleanSubj) || cleanSubj.includes(cleanQuery)) {
      // Si pregunta por una semana específica: ej. "semana 1 de biologia"
      if (isAskingWeek) {
        const weekMatch = cleanQuery.match(/(?:semana|leccion)\s*(\d+)/i);
        if (weekMatch && weekMatch[1]) {
          const weekNum = parseInt(weekMatch[1], 10);
          const lesson = lessons.find(l => l.semana === weekNum || l.lessonNumber === weekNum);
          if (lesson) {
            const subtemasTxt = (lesson.subtemas || [])
              .map(s => `• **${s.subCode || ''} ${s.title}**`)
              .join('\n');

            return {
              found: true,
              topic: `${subjectName} - Semana ${weekNum}`,
              response: `En la sección **Aprender**, la **Semana ${weekNum} de ${subjectName}** comprende:\n\n**${lesson.title}**\n\nSubtemas oficiales del temario:\n${subtemasTxt}\n\n📍 Puedes abrir esta semana directamente en el mapa estelar de **${subjectName}**.`
            };
          }
        }
      }

      // Si pregunta por el temario o contenido general del curso
      if (cleanQuery.includes('temario') || cleanQuery.includes('temas') || cleanQuery.includes('que viene') || cleanQuery.includes('curso')) {
        const weeksSummary = lessons.slice(0, 6).map(l => `• **Semana ${l.semana || l.lessonNumber}:** ${l.shortName || l.title}`).join('\n');
        return {
          found: true,
          topic: `Temario de ${subjectName}`,
          response: `El curso de **${subjectName}** en la sección **Aprender** tiene la siguiente estructura por semanas:\n\n${weeksSummary}\n\n📍 Selecciona **${subjectName}** en la barra superior de **Aprender** para iniciar su ruta interactiva.`
        };
      }
    }
  }

  // 2. Buscar tema / concepto en todos los subtemas de todos los cursos
  let bestMatch = null;
  let highestScore = 0;

  for (const [subjectName, lessons] of Object.entries(SUBJECT_ROADMAP)) {
    for (const lesson of lessons) {
      const subtemas = lesson.subtemas || [];
      for (const sub of subtemas) {
        const cleanTitle = cleanText(sub.title || '');
        const cleanShortTitle = cleanText(sub.shortTitle || '');
        const theory = sub.theory || {};
        const cleanTema = cleanText(theory.tema || '');
        const cleanMarco = cleanText(theory.marcoteorico || '');
        const formulaData = theory.formula_data || {};
        const cleanFormulaNombre = cleanText(formulaData.teorema_nombre || '');

        let score = 0;

        // Coincidencia exacta de frase en título o tema
        if (cleanTitle.includes(cleanQuery) || cleanShortTitle.includes(cleanQuery) || cleanTema.includes(cleanQuery)) {
          score += 15;
        }

        // Coincidencia en fórmula
        if (cleanFormulaNombre && cleanFormulaNombre.includes(cleanQuery)) {
          score += 12;
        }

        // Conteo de palabras coincidentes
        for (const word of queryWords) {
          if (cleanTitle.includes(word) || cleanShortTitle.includes(word) || cleanTema.includes(word)) {
            score += 4;
          }
          if (cleanFormulaNombre.includes(word)) {
            score += 3;
          }
          if (cleanMarco.includes(word)) {
            score += 1;
          }
        }

        if (score > highestScore && score >= 4) {
          highestScore = score;
          bestMatch = {
            subject: subjectName,
            semana: lesson.semana || lesson.lessonNumber,
            subCode: sub.subCode || '1.1',
            title: sub.title || sub.shortTitle,
            theory,
            formulaData
          };
        }
      }
    }
  }

  if (bestMatch && bestMatch.theory) {
    const { subject, semana, subCode, title, theory, formulaData } = bestMatch;
    
    // Extraer resumen conceptual conciso (primeras 2 o 3 oraciones del marco teórico)
    let resumen = '';
    if (theory.marcoteorico) {
      const sentences = theory.marcoteorico.split(/(?<=[.!?])\s+/);
      resumen = sentences.slice(0, 3).join(' ');
      if (resumen.length > 380) {
        resumen = resumen.substring(0, 377) + '...';
      }
    } else {
      resumen = `Este concepto corresponde a **${title}** dentro del temario oficial de ${subject}.`;
    }

    // Información de fórmula si existe
    let formulaSnippet = '';
    if (formulaData && (formulaData.formula_simple || formulaData.teorema_nombre)) {
      const nombreForm = formulaData.teorema_nombre || 'Fórmula / Teorema';
      const simple = formulaData.formula_simple ? `\`${formulaData.formula_simple}\`` : '';
      formulaSnippet = `\n\n📌 **${nombreForm}:** ${simple}`;
    }

    // Clave de admisión si existe en las secciones
    let claveExamen = '';
    if (Array.isArray(theory.sections)) {
      const examenSection = theory.sections.find(s => 
        (s.heading && (s.heading.toLowerCase().includes('examen') || s.heading.toLowerCase().includes('claves') || s.heading.toLowerCase().includes('admision')))
      );
      if (examenSection && examenSection.body) {
        const firstLine = examenSection.body.split('\n').filter(l => l.trim().length > 5)[0];
        if (firstLine) {
          claveExamen = `\n\n💡 **Dato clave para examen:** ${firstLine.replace(/^[•\-\*\s]+/, '')}`;
        }
      }
    }

    const response = `En la sección **Aprender** (${subject} • Semana ${semana}):\n\n${resumen}${formulaSnippet}${claveExamen}\n\n📍 Encuentras la teoría interactiva completa y preguntas de este tema en **${subject}** (Semana ${semana}, Tema ${subCode}).`;

    return {
      found: true,
      topic: `${subject} - ${title}`,
      response
    };
  }

  return null;
}

// Función para buscar en la base de conocimiento local y Aprender
export function searchLocalKnowledge(query) {
  if (!query || typeof query !== 'string') {
    return { found: false, response: null };
  }

  // 1. Primero consultar la base del temario pedagógico oficial de Aprender
  const aprenderResult = searchAprenderRoadmap(query);
  if (aprenderResult && aprenderResult.found) {
    return aprenderResult;
  }

  const normalized = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // 2. Buscar coincidencia exacta o parcial en la base de conocimiento científica
  for (const [key, value] of Object.entries(KNOWLEDGE_BASE)) {
    const normalizedKey = key.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (normalized.includes(normalizedKey) || normalizedKey.includes(normalized)) {
      return {
        found: true,
        topic: key,
        response: `${value}\n\n📍 Puedes profundizar y poner a prueba este tema en la sección **Aprender**.`
      };
    }
  }
  
  // 3. Buscar palabras clave
  const words = normalized.split(/\s+/).filter(w => w.length >= 3 && !['que', 'como', 'para', 'sobre', 'dime', 'cual', 'donde'].includes(w));
  for (const word of words) {
    for (const [key, value] of Object.entries(KNOWLEDGE_BASE)) {
      if (key.toLowerCase().includes(word)) {
        return {
          found: true,
          topic: key,
          response: `${value}\n\n📍 Puedes profundizar este tema en la sección **Aprender**.`
        };
      }
    }
  }
  
  return { found: false, response: null };
}

// Función para generar respuesta de IA Local
export function getLocalAIResponse(query) {
  const result = searchLocalKnowledge(query);
  
  if (result.found) {
    return {
      success: true,
      response: result.response,
      source: 'local'
    };
  }
  
  return {
    success: false,
    response: null,
    source: 'local'
  };
}

export default {
  searchLocalKnowledge,
  getLocalAIResponse,
  KNOWLEDGE_BASE
};
