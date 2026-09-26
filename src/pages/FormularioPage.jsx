import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import {
  ArrowLeft,
  Search,
  BookOpen,
  Calculator,
  Atom,
  Compass,
  Zap,
  Info,
  Copy,
  Check,
  Star,
  Printer,
  Sparkles,
  AlertTriangle,
  Grid,
  ListFilter,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  BookmarkCheck,
  FlaskConical,
  Pi,
  Activity,
  Flame,
  CheckCircle2,
  Layers,
  Dna,
  Palette
} from 'lucide-react';
import { MNEMOTECNIAS_PREU } from '../data/mnemotecniasData';
import { MnemotecniasVaultView } from '../components/MnemotecniasVaultView';
import { useTheme } from '../context/ThemeContext';
import { getThemePalette } from '../utils/themeImmersion';

// ==========================================
// FORMULARIO MAESTRO UNIVERSAL DE CIENCIAS & MATEMÁTICAS
// Desde las más básicas elementales hasta las necesarias del temario
// Incluye fórmulas análogas y variantes para casos específicos
// ==========================================
const FORMULAS_CANONICAS = [
  {
    "id": "len_diptongos_hiatos",
    "subject": "Lenguaje",
    "topic": "Fonología y Sílaba",
    "level": "Básica",
    "caseTag": "Diptongos vs. Hiatos",
    "importance": "Fundamental",
    "name": "Regla Universal de Diptongos y Hiatos",
    "latex": "\\text{Diptongo: } V_C + V_A \\;\\lor\\; V_A + V_C \\;\\lor\\; V_C + V_C \\quad|\\quad \\text{Hiato: } V_A - V_A \\;\\lor\\; \\acute{V}_C - V_A",
    "plain": "Diptongo: VC + VA o VA + VC o VC + VC dist. | Hiato: VA - VA o VC(tilde) - VA",
    "desc": "Reglas de unión y separación silábica según la abertura vocálica (Abiertas: A, E, O | Cerradas: I, U).",
    "despejes": [
      {
        "name": "Diptongo Creciente",
        "latex": "V_C + V_A \\implies \\text{via-je, puer-ta, can-ción}"
      },
      {
        "name": "Diptongo Decreciente",
        "latex": "V_A + V_C \\implies \\text{cau-sa, pei-ne, au-la}"
      },
      {
        "name": "Diptongo Homogéneo",
        "latex": "V_C + V_C \\;(\\text{distintas}) \\implies \\text{ciu-dad, cui-da-do}"
      },
      {
        "name": "Hiato Simple",
        "latex": "V_A - V_A \\implies \\text{po-e-ta, ca-os, re-al}"
      },
      {
        "name": "Hiato Acentual (Adiptongo)",
        "latex": "\\acute{V}_C - V_A \\;\\lor\\; V_A - \\acute{V}_C \\implies \\text{ba-úl, tí-a, ma-íz, re-ún-e}"
      }
    ],
    "vars": [
      {
        "symbol": "V_A",
        "name": "Vocal Abierta (Fuerte)",
        "unit": "A, E, O"
      },
      {
        "symbol": "V_C",
        "name": "Vocal Cerrada (Débil)",
        "unit": "I, U"
      },
      {
        "symbol": "\\acute{V}_C",
        "name": "Vocal Cerrada Tildada",
        "unit": "Í, Ú (adquiere fuerza y rompe el diptongo)"
      }
    ],
    "datoClave": "Las vocales abiertas (A, E, O) son 'fuertes' y NUNCA se juntan en la misma sílaba (siempre forman hiato). Las cerradas (I, U) son 'débiles' y se unen; pero si una cerrada lleva tilde (í, ú), adquiere la fuerza de una abierta y rompe el diptongo automáticamente.",
    "fijaUnsa": "Las vocales abiertas (A, E, O) son 'fuertes' y NUNCA se juntan en la misma sílaba (siempre forman hiato). Las cerradas (I, U) son 'débiles' y se unen; pero si una cerrada lleva tilde (í, ú), adquiere la fuerza de una abierta y rompe el diptongo automáticamente.",
    "calcType": null
  },
  {
    "id": "len_truco_sustantivo",
    "subject": "Lenguaje",
    "topic": "Morfología y Sustantivo",
    "level": "Atajo",
    "caseTag": "Regla de Oro RAE",
    "importance": "Alta Relevancia",
    "name": "Identificación de Sustantivo: Prueba RAE 'MUY vs MUCHO'",
    "latex": "\\text{Sustantivo} \\iff \\text{Admite \"MUCHO/A/S\"} \\quad|\\quad \\text{Adjetivo / Adverbio} \\iff \\text{Admite \"MUY\"}",
    "plain": "Sustantivo <==> Admite MUCHO/A/S | Adjetivo/Adverbio <==> Admite MUY",
    "desc": "Criterio lingüístico oficial de la RAE. Supera las fallas del truco escolar de 'grande(s)', que falla ante sustantivos abstractos no dimensionales y adjetivos sustantivados.",
    "despejes": [
      {
        "name": "Prueba RAE 1: 'frío'",
        "latex": "\\text{\"mucho frío\"} \\;(\\checkmark) \\;\\lor\\; \\text{\"muy frío\"} \\;(\\times) \\implies \\text{frío = SUSTANTIVO}"
      },
      {
        "name": "Prueba RAE 2: 'inteligente'",
        "latex": "\\text{\"muy inteligente\"} \\;(\\checkmark) \\;\\lor\\; \\text{\"mucho inteligente\"} \\;(\\times) \\implies \\text{inteligente = ADJETIVO}"
      },
      {
        "name": "Prueba RAE 3: 'peligro'",
        "latex": "\\text{\"mucho peligro\"} \\;(\\checkmark) \\;\\lor\\; \\text{\"muy peligro\"} \\;(\\times) \\implies \\text{peligro = SUSTANTIVO}"
      },
      {
        "name": "Límites del truco escolar 'grande'",
        "latex": "\\text{Falla con abstractos no medibles: \"la nada grande\" (\\times), \"el acaso grande\" (\\times)}"
      }
    ],
    "vars": [
      {
        "symbol": "\\text{MUCHO/A/S}",
        "name": "Cuantificador flexivo para sustantivos",
        "unit": "Mucho frío, mucha plata, muchos amigos"
      },
      {
        "symbol": "\\text{MUY}",
        "name": "Adverbio intensificador para adjetivos",
        "unit": "Muy valiente, muy tarde, muy veloz"
      }
    ],
    "datoClave": "¡Los sustantivos NUNCA admiten 'MUY' (*muy perro* ❌, *muy dinero* ❌)! Si admite 'MUY', es adjetivo o adverbio. Si admite 'MUCHO/A/S' con flexión de género y número, es un sustantivo. El truco escolar de agregar 'grande' ('casa grande') sirve a nivel básico pero falla en examen de admisión con abstractos y palabras ambiguas.",
    "fijaUnsa": "¡Los sustantivos NUNCA admiten 'MUY' (*muy perro* ❌, *muy dinero* ❌)! Si admite 'MUY', es adjetivo o adverbio. Si admite 'MUCHO/A/S' con flexión de género y número, es un sustantivo. El truco escolar de agregar 'grande' ('casa grande') sirve a nivel básico pero falla en examen de admisión con abstractos y palabras ambiguas.",
    "calcType": null
  },
  {
    "id": "len_regla_sega",
    "subject": "Lenguaje",
    "topic": "Acentuación y Ortografía",
    "level": "Básica",
    "caseTag": "Regla Mnemotécnica",
    "importance": "Fundamental",
    "name": "Regla SEGA de Clasificación y Tildación",
    "latex": "\\text{\\textbf{S}} \\;\\text{(Sobreesdrújula)} \\;\\longleftarrow\\; \\text{\\textbf{E}} \\;\\text{(Esdrújula)} \\;\\longleftarrow\\; \\text{\\textbf{G}} \\;\\text{(Grave)} \\;\\longleftarrow\\; \\text{\\textbf{A}} \\;\\text{(Aguda)}",
    "plain": "S (Sobreesdrújula) <-- E (Esdrújula) <-- G (Grave) <-- A (Aguda)",
    "desc": "Esquema nemotécnico de derecha a izquierda (desde la última sílaba hacia atrás) para clasificar y tildar cualquier palabra.",
    "despejes": [
      {
        "name": "A: Agudas (Última sílaba)",
        "latex": "\\text{Se tildan si terminan en } N, \\; S \\;\\lor\\; \\text{vocal} \\implies \\text{can-ción, com-pás, pa-pá}"
      },
      {
        "name": "G: Graves / Llanas (Penúltima)",
        "latex": "\\text{Se tildan si } NO \\text{ terminan en } N, \\; S \\;\\lor\\; \\text{vocal} \\implies \\text{ár-bol, cár-cel, lá-piz}"
      },
      {
        "name": "E: Esdrújulas (Antepenúltima)",
        "latex": "\\text{TODAS se tildan sin excepción} \\implies \\text{mé-di-co, brú-ju-la, quí-mi-ca}"
      },
      {
        "name": "S: Sobreesdrújulas (Anteantepenúltima)",
        "latex": "\\text{TODAS se tildan sin excepción} \\implies \\text{llé-va-te-lo, dī-ga-se-lo}"
      }
    ],
    "vars": [
      {
        "symbol": "S",
        "name": "Sobreesdrújula",
        "unit": "Siempre tilde"
      },
      {
        "symbol": "E",
        "name": "Esdrújula",
        "unit": "Siempre tilde"
      },
      {
        "symbol": "G",
        "name": "Grave o llana",
        "unit": "Terminación ≠ N, S, vocal"
      },
      {
        "symbol": "A",
        "name": "Aguda u oxítona",
        "unit": "Terminación = N, S, vocal"
      }
    ],
    "datoClave": "Escribe la palabra 'S-E-G-A' de derecha a izquierda sobre las sílabas de la palabra. A = última sílaba, G = penúltima, E = antepenúltima, S = anteantepenúltima. ¡Las Esdrújulas y Sobreesdrújulas llevan tilde el 100% de las veces!",
    "fijaUnsa": "Escribe la palabra 'S-E-G-A' de derecha a izquierda sobre las sílabas de la palabra. A = última sílaba, G = penúltima, E = antepenúltima, S = anteantepenúltima. ¡Las Esdrújulas y Sobreesdrújulas llevan tilde el 100% de las veces!",
    "calcType": null
  },
  {
    "id": "len_los_4_porques",
    "subject": "Lenguaje",
    "topic": "Ortografía y Homófonos",
    "level": "Operacional",
    "caseTag": "Diferenciación de Porqués",
    "importance": "Alta Relevancia",
    "name": "La Tabla Maestra de los 4 'Porqués'",
    "latex": "\\text{¿Por qué? } \\text{(Pregunta)} \\quad|\\quad \\text{Porque } \\text{(Causa)} \\quad|\\quad \\text{El porqué } \\text{(Motivo)} \\quad|\\quad \\text{Por que } \\text{(Por el cual)}",
    "plain": "¿Por qué? (Pregunta) | Porque (Causa) | El porqué (Sustantivo motivo) | Por que (Por el cual)",
    "desc": "Distinción exacta de los cuatro homófonos evaluados en ortografía y redacción.",
    "despejes": [
      {
        "name": "1. ¿Por qué? (Separado con tilde)",
        "latex": "\\text{Interrogativo / Exclamativo} \\implies \\text{¿Por qué no repasaste a tiempo?}"
      },
      {
        "name": "2. Porque (Junto sin tilde)",
        "latex": "\\text{Causal / Respuesta } (=\\text{ya que}) \\implies \\text{Aprobé porque estudié con constancia.}"
      },
      {
        "name": "3. El porqué (Junto con tilde)",
        "latex": "\\text{Sustantivo } (=\\text{la razón / el motivo}) \\implies \\text{No entiendo el porqué de su silencio.}"
      },
      {
        "name": "4. Por que (Separado sin tilde)",
        "latex": "\\text{Relativo } (=\\text{por el cual / por la cual}) \\implies \\text{Este es el motivo por que vine.}"
      }
    ],
    "vars": [
      {
        "symbol": "\\text{por qué}",
        "name": "Interrogación / Exclamación",
        "unit": "Tónica, separada"
      },
      {
        "symbol": "\\text{porque}",
        "name": "Conjunción Causal",
        "unit": "Átona, junta"
      },
      {
        "symbol": "\\text{porqué}",
        "name": "Sustantivo Motivo",
        "unit": "Tónica, junta (admite 'los porqués')"
      },
      {
        "symbol": "\\text{por que}",
        "name": "Preposición + Relativo / Conjunción",
        "unit": "Átona, separada"
      }
    ],
    "datoClave": "Prueba rápida: Si puedes reemplazarlo por 'la razón', se escribe junto y con tilde ('el porqué'). Si puedes cambiarlo por 'ya que' o 'dado que', se escribe junto y sin tilde ('porque'). Si es pregunta o exclamación, va separado con tilde ('¿por qué?').",
    "fijaUnsa": "Prueba rápida: Si puedes reemplazarlo por 'la razón', se escribe junto y con tilde ('el porqué'). Si puedes cambiarlo por 'ya que' o 'dado que', se escribe junto y sin tilde ('porque'). Si es pregunta o exclamación, va separado con tilde ('¿por qué?').",
    "calcType": null
  },
  {
    "id": "len_sino_vs_si_no",
    "subject": "Lenguaje",
    "topic": "Sintaxis y Conectores",
    "level": "Operacional",
    "caseTag": "Conjunción vs Condicional",
    "importance": "Alta Relevancia",
    "name": "Diferencia entre 'Sino' y 'Si no'",
    "latex": "\\text{Sino } (=\\text{Excepto / Pero sí}) \\quad\\longleftrightarrow\\quad \\text{Si no } (=\\text{Condicional } + \\text{ Negación})",
    "plain": "Sino (= Excepto / Pero sí) <==> Si no (= Condicional + Negación)",
    "desc": "Regla clave para diferenciar la conjunción adversativa de la construcción condicional negativa.",
    "despejes": [
      {
        "name": "Sino (Junto): Oposición",
        "latex": "\\text{No postuló a Medicina, sino a Ingeniería.}"
      },
      {
        "name": "Sino (Junto): Significa 'excepto'",
        "latex": "\\text{¿Quién sino tú alcanzaría ese primer puesto?}"
      },
      {
        "name": "Si no (Separado): Condicional",
        "latex": "\\text{Si no practicas simulacros, perderás agilidad en el examen.}"
      },
      {
        "name": "Truco de interpolación",
        "latex": "\\text{En 'si no' puedes intercalar una palabra: } \\text{\"Si (tú) no practicas...\"}"
      }
    ],
    "vars": [
      {
        "symbol": "\\text{Sino}",
        "name": "Conjunción adversativa o sustantivo 'destino'",
        "unit": "Junto"
      },
      {
        "symbol": "\\text{Si no}",
        "name": "Conjunción 'si' + adverbio 'no'",
        "unit": "Separado"
      }
    ],
    "datoClave": "Si puedes meter una palabra en el medio (por ejemplo: 'si TÚ no estudias'), SIEMPRE va separado: 'si no'. Si en cambio une dos ideas que se contraponen ('no quiero jugar sino repasar'), siempre va junto: 'sino'.",
    "fijaUnsa": "Si puedes meter una palabra en el medio (por ejemplo: 'si TÚ no estudias'), SIEMPRE va separado: 'si no'. Si en cambio une dos ideas que se contraponen ('no quiero jugar sino repasar'), siempre va junto: 'sino'.",
    "calcType": null
  },
  {
    "id": "len_tildacion_diacritica",
    "subject": "Lenguaje",
    "topic": "Acentuación Especial",
    "level": "Básica",
    "caseTag": "Los 8 Monosílabos",
    "importance": "Fundamental",
    "name": "Tildación Diacrítica (Mnemotecnia 'Él, Tú, Mí, Sí, Té, Dé, Sé, Más')",
    "latex": "\\text{Él, Tú, Mí, Sí, Té, Dé, Sé, Más} \\quad (\\text{Llevan tilde cuando cambian de función})",
    "plain": "El/Él, Tu/Tú, Mi/Mí, Si/Sí, Te/Té, De/Dé, Se/Sé, Mas/Más",
    "desc": "Permite distinguir entre palabras de idéntica escritura pero que cumplen funciones gramaticales diferentes.",
    "despejes": [
      {
        "name": "Él vs El",
        "latex": "\\text{Él (pronombre: } \\text{\"Él ingresó\"}) \\quad|\\quad \\text{El (artículo: } \\text{\"El cuaderno\"})"
      },
      {
        "name": "Tú vs Tu",
        "latex": "\\text{Tú (pronombre: } \\text{\"Tú sabes\"}) \\quad|\\quad \\text{Tu (posesivo: } \\text{\"Tu meta\"})"
      },
      {
        "name": "Mí vs Mi",
        "latex": "\\text{Mí (pronombre: } \\text{\"Para mí\"}) \\quad|\\quad \\text{Mi (posesivo/nota: } \\text{\"Mi examen\"})"
      },
      {
        "name": "Sé vs Se",
        "latex": "\\text{Sé (verbo saber/ser: } \\text{\"Sé constante\"}) \\quad|\\quad \\text{Se (pronombre: } \\text{\"Se preparó\"})"
      },
      {
        "name": "Dé vs De",
        "latex": "\\text{Dé (verbo dar: } \\text{\"Dé su máximo esfuerzo\"}) \\quad|\\quad \\text{De (preposición: } \\text{\"Libro de letras\"})"
      },
      {
        "name": "Té vs Te",
        "latex": "\\text{Té (sustantivo infusión: } \\text{\"Toma té caliente\"}) \\quad|\\quad \\text{Te (pronombre: } \\text{\"Te felicito\"})"
      },
      {
        "name": "Más vs Mas",
        "latex": "\\text{Más (adverbio cantidad: } \\text{\"Más práctica\"}) \\quad|\\quad \\text{Mas (conjunción pero: } \\text{\"Estudió, mas no durmió\"})"
      }
    ],
    "vars": [
      {
        "symbol": "\\acute{X}",
        "name": "Monosílabo con Tilde Diacrítica",
        "unit": "Pronombre, Verbo o Sustantivo"
      },
      {
        "symbol": "X",
        "name": "Monosílabo sin Tilde",
        "unit": "Artículo, Posesivo o Conjunción"
      }
    ],
    "datoClave": "Recuerda: las palabras 'ti', 'fe', 'dio', 'vio', 'fue', 'fui' NUNCA llevan tilde porque son monosílabos sin homónimo átono en español. Solo se tildan los 8 monosílabos de la mnemotecnia (Él, Tú, Mí, Sí, Té, Dé, Sé, Más).",
    "fijaUnsa": "Recuerda: las palabras 'ti', 'fe', 'dio', 'vio', 'fue', 'fui' NUNCA llevan tilde porque son monosílabos sin homónimo átono en español. Solo se tildan los 8 monosílabos de la mnemotecnia (Él, Tú, Mí, Sí, Té, Dé, Sé, Más).",
    "calcType": null
  },
  {
    "id": "fis_dim_fundamentales",
    "subject": "Física",
    "topic": "Análisis Dimensional",
    "level": "Básica",
    "caseTag": "Ecuaciones Dimensionales Básicas",
    "importance": "Fundamental",
    "name": "Magnitudes Fundamentales y Ecuaciones Derivadas Clásicas",
    "latex": "[v] = L T^{-1} \\quad;\\quad [a] = L T^{-2} \\quad;\\quad [F] = M L T^{-2} \\quad;\\quad [W] = [E] = M L^2 T^{-2}",
    "plain": "[v]=LT^-1 ; [a]=LT^-2 ; [F]=MLT^-2 ; [Trabajo/Energia]=ML^2T^-2",
    "desc": "Dimensiones de las magnitudes físicas fundamentales en el Sistema Internacional (Longitud L, Masa M, Tiempo T).",
    "despejes": [
      {
        "name": "Presión [P]",
        "latex": "[P] = M L^{-1} T^{-2}"
      },
      {
        "name": "Potencia Mecánica [Pot]",
        "latex": "[Pot] = M L^2 T^{-3}"
      },
      {
        "name": "Densidad [ρ]",
        "latex": "[\\rho] = M L^{-3}"
      },
      {
        "name": "Frecuencia [f] / Rapidez Angular [ω]",
        "latex": "[f] = [\\omega] = T^{-1}"
      }
    ],
    "vars": [
      {
        "symbol": "L",
        "name": "Dimensión de Longitud",
        "unit": "Metro [m]"
      },
      {
        "symbol": "M",
        "name": "Dimensión de Masa",
        "unit": "Kilogramo [kg]"
      },
      {
        "symbol": "T",
        "name": "Dimensión de Tiempo",
        "unit": "Segundo [s]"
      }
    ],
    "datoClave": "Toda función trigonométrica, logaritmo, número puro, ángulo o constante numérica es ADIMENSIONAL y su dimensión se iguala a 1: [sin θ] = 1, [log x] = 1, [30°] = 1, [π] = 1.",
    "fijaUnsa": "Toda función trigonométrica, logaritmo, número puro, ángulo o constante numérica es ADIMENSIONAL y su dimensión se iguala a 1: [sin θ] = 1, [log x] = 1, [30°] = 1, [π] = 1.",
    "calcType": null
  },
  {
    "id": "fis_dim_homogeneidad",
    "subject": "Física",
    "topic": "Análisis Dimensional",
    "level": "Operacional",
    "caseTag": "Principio de Fourier",
    "importance": "Alta Relevancia",
    "name": "Principio de Homogeneidad de Fourier",
    "latex": "\\text{Si } A = B + \\frac{C}{D} \\implies [A] = [B] = \\left[\\frac{C}{D}\\right]",
    "plain": "Si A = B + C/D ==> [A] = [B] = [C]/[D]",
    "desc": "En toda ecuación física dimensionalmente correcta, todos los términos sumandos deben poseer idéntica fórmula dimensional.",
    "despejes": [
      {
        "name": "Suma y Resta Dimensional",
        "latex": "[A] \\pm [B] = [A] = [B] \\quad (\\text{Nunca } 2[A])"
      },
      {
        "name": "Exponente Adimensional",
        "latex": "\\text{En } k^{x \\cdot t} \\implies [x \\cdot t] = 1 \\implies [x] = T^{-1}"
      }
    ],
    "vars": [
      {
        "symbol": "[A], [B]",
        "name": "Dimensiones de términos sumandos",
        "unit": "Iguales"
      }
    ],
    "datoClave": "En análisis dimensional NO existe la suma algebraica ni resta: [L] + [L] = [L], no 2[L]. Además, los exponentes de cualquier potencia son siempre adimensionales (iguales a 1).",
    "fijaUnsa": "En análisis dimensional NO existe la suma algebraica ni resta: [L] + [L] = [L], no 2[L]. Además, los exponentes de cualquier potencia son siempre adimensionales (iguales a 1).",
    "calcType": null
  },
  {
    "id": "fis_vec_paralelogramo",
    "subject": "Física",
    "topic": "Vectores",
    "level": "Básica",
    "caseTag": "Módulo de la Resultante",
    "importance": "Fundamental",
    "name": "Método del Paralelogramo (Suma Vectorial)",
    "latex": "R = \\sqrt{A^2 + B^2 + 2 A B \\cos\\theta}",
    "plain": "R = sqrt(A^2 + B^2 + 2*A*B*cos(theta))",
    "desc": "Calcula la magnitud del vector resultante de dos vectores concurrentes que forman un ángulo θ entre sí.",
    "despejes": [
      {
        "name": "Resultante Máxima (θ = 0°)",
        "latex": "R_{\\max} = A + B"
      },
      {
        "name": "Resultante Mínima (θ = 180°)",
        "latex": "R_{\\min} = |A - B|"
      },
      {
        "name": "Vectores Perpendiculares (θ = 90°)",
        "latex": "R = \\sqrt{A^2 + B^2}"
      },
      {
        "name": "Diferencia Vectorial |A - B|",
        "latex": "D = \\sqrt{A^2 + B^2 - 2 A B \\cos\\theta}"
      }
    ],
    "vars": [
      {
        "symbol": "R",
        "name": "Módulo del vector resultante",
        "unit": "Unidades [u] o [N]"
      },
      {
        "symbol": "A, B",
        "name": "Módulos de los vectores sumandos",
        "unit": "[u] o [N]"
      },
      {
        "symbol": "\\theta",
        "name": "Ángulo entre los dos vectores",
        "unit": "Grados [^\\circ]"
      }
    ],
    "datoClave": "Si dos vectores de igual módulo (A = B) forman 60°, su resultante es A√3. Si forman 120°, la resultante es exactamente igual a A. Si forman 90°, es A√2.",
    "fijaUnsa": "Si dos vectores de igual módulo (A = B) forman 60°, su resultante es A√3. Si forman 120°, la resultante es exactamente igual a A. Si forman 90°, es A√2.",
    "calcType": null
  },
  {
    "id": "fis_vec_descomposicion",
    "subject": "Física",
    "topic": "Vectores",
    "level": "Básica",
    "caseTag": "Componentes Cartesianas",
    "importance": "Fundamental",
    "name": "Descomposición Rectangular de un Vector",
    "latex": "A_x = A \\cos\\theta \\quad;\\quad A_y = A \\sin\\theta \\quad;\\quad A = \\sqrt{A_x^2 + A_y^2}",
    "plain": "Ax = A*cos(theta) ; Ay = A*sin(theta) ; A = sqrt(Ax^2 + Ay^2)",
    "desc": "Proyección ortogonal de un vector sobre los ejes cartesianos X e Y.",
    "despejes": [
      {
        "name": "Dirección del Vector",
        "latex": "\\tan\\theta = \\frac{A_y}{A_x}"
      },
      {
        "name": "Vector Unitario",
        "latex": "\\vec{\\mu}_A = \\frac{\\vec{A}}{|A|} = \\cos\\theta \\,\\hat{i} + \\sin\\theta \\,\\hat{j}"
      }
    ],
    "vars": [
      {
        "symbol": "A_x, A_y",
        "name": "Componentes horizontal y vertical",
        "unit": "[u]"
      },
      {
        "symbol": "\\theta",
        "name": "Ángulo respecto al eje X positivo",
        "unit": "Grados [^\\circ]"
      }
    ],
    "datoClave": "Mide siempre el ángulo con la horizontal X. Si te dan el ángulo con la vertical Y, la componente horizontal será A sin(α) y la vertical A cos(α).",
    "fijaUnsa": "Mide siempre el ángulo con la horizontal X. Si te dan el ángulo con la vertical Y, la componente horizontal será A sin(α) y la vertical A cos(α).",
    "calcType": null
  },
  {
    "id": "fis_vec_producto_escalar",
    "subject": "Física",
    "topic": "Vectores",
    "level": "Operacional",
    "caseTag": "Producto Escalar y Vectorial",
    "importance": "Alta Probabilidad",
    "name": "Producto Escalar (Punto) y Producto Vectorial (Cruz)",
    "latex": "\\vec{A} \\cdot \\vec{B} = A B \\cos\\theta = A_x B_x + A_y B_y \\quad;\\quad |\\vec{A} \\times \\vec{B}| = A B \\sin\\theta",
    "plain": "A . B = A*B*cos(theta) = Ax*Bx + Ay*By ; |A x B| = A*B*sin(theta)",
    "desc": "Multiplicación de vectores: escalar (produce un número real, trabajo) y vectorial (produce un vector perpendicular, torque o momento).",
    "despejes": [
      {
        "name": "Criterio de Perpendicularidad",
        "latex": "\\vec{A} \\perp \\vec{B} \\iff \\vec{A} \\cdot \\vec{B} = 0"
      },
      {
        "name": "Criterio de Paralelismo",
        "latex": "\\vec{A} \\parallel \\vec{B} \\iff \\vec{A} \\times \\vec{B} = \\vec{0}"
      },
      {
        "name": "Ángulo entre vectores",
        "latex": "\\cos\\theta = \\frac{\\vec{A} \\cdot \\vec{B}}{|A| |B|}"
      }
    ],
    "vars": [
      {
        "symbol": "\\vec{A} \\cdot \\vec{B}",
        "name": "Producto escalar",
        "unit": "Número real"
      },
      {
        "symbol": "\\vec{A} \\times \\vec{B}",
        "name": "Producto vectorial",
        "unit": "Vector ortogonal"
      }
    ],
    "datoClave": "💡 Criterio de Perpendicularidad: Para demostrar si dos vectores son perpendiculares (forman 90°), su producto escalar debe ser idénticamente cero: Ax·Bx + Ay·By = 0. Si forman 0° (paralelos), su producto cruz o vectorial es nulo.",
    "fijaUnsa": "💡 Criterio de Perpendicularidad: Para demostrar si dos vectores son perpendiculares (forman 90°), su producto escalar debe ser idénticamente cero: Ax·Bx + Ay·By = 0. Si forman 0° (paralelos), su producto cruz o vectorial es nulo.",
    "calcType": null
  },
  {
    "id": "fis_conversion_velocidad",
    "subject": "Física",
    "topic": "Conversión de Unidades",
    "level": "Básica",
    "caseTag": "Factor 5/18 y 18/5",
    "importance": "Fundamental",
    "name": "Conversión Rápida de Velocidad: km/h a m/s (Regla del 5/18)",
    "latex": "v_{\\text{m/s}} = v_{\\text{km/h}} \\times \\frac{5}{18} \\quad\\Longleftrightarrow\\quad v_{\\text{km/h}} = v_{\\text{m/s}} \\times \\frac{18}{5}",
    "plain": "v(m/s) = v(km/h) * (5/18)  <===>  v(km/h) = v(m/s) * (18/5)",
    "desc": "Conversión directa e instantánea entre kilómetros por hora [km/h] y metros por segundo [m/s] en el Sistema Internacional.",
    "despejes": [
      {
        "name": "De km/h a m/s (fracción pequeña)",
        "latex": "v_{\\text{m/s}} = \\frac{v_{\\text{km/h}}}{3.6} = v_{\\text{km/h}} \\times \\frac{5}{18}"
      },
      {
        "name": "De m/s a km/h (fracción grande)",
        "latex": "v_{\\text{km/h}} = v_{\\text{m/s}} \\times 3.6 = v_{\\text{m/s}} \\times \\frac{18}{5}"
      },
      {
        "name": "Tabla Rápida del 18 y del 5",
        "latex": "18\\text{ km/h} = 5\\text{ m/s} \\; ; \\; 36\\text{ km/h} = 10\\text{ m/s} \\; ; \\; 54\\text{ km/h} = 15\\text{ m/s} \\; ; \\; 72\\text{ km/h} = 20\\text{ m/s} \\; ; \\; 90\\text{ km/h} = 25\\text{ m/s}"
      }
    ],
    "vars": [
      {
        "symbol": "v_{\\text{km/h}}",
        "name": "Rapidez en kilómetros por hora",
        "unit": "[km/h]"
      },
      {
        "symbol": "v_{\\text{m/s}}",
        "name": "Rapidez en metros por segundo (S.I.)",
        "unit": "[m/s]"
      }
    ],
    "datoClave": "💡 Mnemotecnia & Truco Mental: ¿Vas de grande a pequeño (km/h → m/s)? Multiplica por la fracción pequeña: 5/18 (o divide entre 3.6). ¿Vas de pequeño a grande (m/s → km/h)? Multiplica por la fracción grande: 18/5 (o multiplica por 3.6). ¡Recuerda la tabla mágica: la tabla del 18 en km/h es exactamente la tabla del 5 en m/s! (18 km/h = 5 m/s, 36 km/h = 10 m/s, 54 km/h = 15 m/s, 72 km/h = 20 m/s, 90 km/h = 25 m/s).",
    "fijaUnsa": "💡 Mnemotecnia & Truco Mental: ¿Vas de grande a pequeño (km/h → m/s)? Multiplica por la fracción pequeña: 5/18 (o divide entre 3.6). ¿Vas de pequeño a grande (m/s → km/h)? Multiplica por la fracción grande: 18/5 (o multiplica por 3.6). ¡Recuerda la tabla mágica: la tabla del 18 en km/h es exactamente la tabla del 5 en m/s! (18 km/h = 5 m/s, 36 km/h = 10 m/s, 54 km/h = 15 m/s, 72 km/h = 20 m/s, 90 km/h = 25 m/s).",
    "calcType": "conversion_velocidad"
  },
  {
    "id": "fis_unidades_fundamentales",
    "subject": "Física",
    "topic": "Conversión de Unidades",
    "level": "Básica",
    "caseTag": "Equivalencias S.I.",
    "importance": "Fundamental",
    "name": "Factores de Conversión Universales (Longitud, Masa, Tiempo y Volumen)",
    "latex": "1\\text{ km} = 10^3\\text{ m} \\quad;\\quad 1\\text{ h} = 3600\\text{ s} \\quad;\\quad 1\\text{ m}^3 = 1000\\text{ L} \\quad;\\quad 1\\text{ L} = 1000\\text{ cm}^3",
    "plain": "1 km = 1000 m ; 1 h = 60 min = 3600 s ; 1 m^3 = 1000 L ; 1 L = 1000 cm^3",
    "desc": "Factores de equivalencia universales fundamentales para transformar datos de cualquier problema al Sistema Internacional (S.I.).",
    "despejes": [
      {
        "name": "Tiempo: Horas a Segundos",
        "latex": "1\\text{ h} = 60\\text{ min} \\times 60\\text{ s} = 3600\\text{ s} \\quad;\\quad 1\\text{ d}\\text{ía} = 86400\\text{ s}"
      },
      {
        "name": "Masa: Toneladas, Kilos y Gramos",
        "latex": "1\\text{ tonelada} = 1000\\text{ kg} \\quad;\\quad 1\\text{ kg} = 1000\\text{ g} = 10^6\\text{ mg}"
      },
      {
        "name": "Volumen y Capacidad",
        "latex": "1\\text{ m}^3 = 1000\\text{ L} \\quad;\\quad 1\\text{ L} = 1000\\text{ mL} = 1000\\text{ cm}^3 = 10^{-3}\\text{ m}^3"
      },
      {
        "name": "Agua Pura a 4°C",
        "latex": "1\\text{ L de agua} = 1\\text{ kg} = 1000\\text{ g} \\quad;\\quad \\rho_{\\text{agua}} = 1000\\text{ kg/m}^3"
      }
    ],
    "vars": [
      {
        "symbol": "\\text{m}, \\text{s}, \\text{kg}",
        "name": "Magnitudes fundamentales S.I.",
        "unit": "Sistema Internacional"
      }
    ],
    "datoClave": "💡 Mnemotecnia & Error Habitual: Al convertir horas a segundos, ¡nunca multipliques por 60! 1 hora tiene 60 minutos y cada minuto tiene 60 segundos, por eso siempre es 60 × 60 = 3600 s. En volumen de agua pura: 1 m³ = 1000 litros = 1 tonelada de agua. 1 Litro = 1 kg = 1000 gramos.",
    "fijaUnsa": "💡 Mnemotecnia & Error Habitual: Al convertir horas a segundos, ¡nunca multipliques por 60! 1 hora tiene 60 minutos y cada minuto tiene 60 segundos, por eso siempre es 60 × 60 = 3600 s. En volumen de agua pura: 1 m³ = 1000 litros = 1 tonelada de agua. 1 Litro = 1 kg = 1000 gramos.",
    "calcType": null
  },
  {
    "id": "fis_prefijos_si",
    "subject": "Física",
    "topic": "Conversión de Unidades",
    "level": "Básica",
    "caseTag": "Prefijos S.I.",
    "importance": "Fundamental",
    "name": "Prefijos del Sistema Internacional (Múltiplos y Submúltiplos)",
    "latex": "\\text{Giga }(10^9) \\quad;\\quad \\text{Mega }(10^6) \\quad;\\quad \\text{Kilo }(10^3) \\quad;\\quad \\text{mili }(10^{-3}) \\quad;\\quad \\mu\\text{ (micro) }(10^{-6}) \\quad;\\quad \\text{nano }(10^{-9})",
    "plain": "Giga=10^9 ; Mega=10^6 ; Kilo=10^3 ; mili=10^-3 ; micro=10^-6 ; nano=10^-9 ; pico=10^-12",
    "desc": "Factores universales de potencias de 10 para expresar cantidades astronómicas o microscópicas en física y química.",
    "despejes": [
      {
        "name": "Múltiplos Grandes (Saltos de 10³)",
        "latex": "\\text{Kilo (k)} = 10^3 \\; ; \\; \\text{Mega (M)} = 10^6 \\; ; \\; \\text{Giga (G)} = 10^9 \\; ; \\; \\text{Tera (T)} = 10^{12}"
      },
      {
        "name": "Submúltiplos Pequeños (Saltos de 10⁻³)",
        "latex": "\\text{mili (m)} = 10^{-3} \\; ; \\; \\mu\\text{ (micro)} = 10^{-6} \\; ; \\; \\text{nano (n)} = 10^{-9} \\; ; \\; \\text{pico (p)} = 10^{-12}"
      }
    ],
    "vars": [
      {
        "symbol": "10^{\\pm 3k}",
        "name": "Potencia de base 10",
        "unit": "Adimensional"
      }
    ],
    "datoClave": "💡 Mnemotecnia del Ascensor: Los prefijos principales saltan de 3 en 3. Subiendo (grandes): Kilo (3), Mega (6), Giga (9), Tera (12) -> 'K-M-G-T'. Bajando (pequeños): mili (-3), micro (-6), nano (-9), pico (-12) -> 'm - μ - n - p' (mili, micro, nano, pico).",
    "fijaUnsa": "💡 Mnemotecnia del Ascensor: Los prefijos principales saltan de 3 en 3. Subiendo (grandes): Kilo (3), Mega (6), Giga (9), Tera (12) -> 'K-M-G-T'. Bajando (pequeños): mili (-3), micro (-6), nano (-9), pico (-12) -> 'm - μ - n - p' (mili, micro, nano, pico).",
    "calcType": null
  },
  {
    "id": "fis_mru_basico",
    "subject": "Física",
    "topic": "Cinemática",
    "level": "Básica",
    "caseTag": "Triángulo Nemotécnico d-v-t",
    "importance": "Fundamental",
    "name": "MRU: Ecuación Básica de la Distancia y Posición",
    "latex": "d = v \\cdot t \\quad;\\quad x(t) = x_0 + v \\cdot t",
    "plain": "d = v * t ; x(t) = x0 + v * t",
    "desc": "Relación elemental entre la distancia recorrida, rapidez constante y tiempo con aceleración nula.",
    "despejes": [
      {
        "name": "Velocidad Constante",
        "latex": "v = \\frac{d}{t}"
      },
      {
        "name": "Tiempo de Recorrido",
        "latex": "t = \\frac{d}{v}"
      },
      {
        "name": "Conversión km/h a m/s",
        "latex": "1 \\text{ km/h} = \\frac{5}{18} \\text{ m/s}"
      }
    ],
    "vars": [
      {
        "symbol": "d",
        "name": "Distancia recorrida",
        "unit": "Metros [m]"
      },
      {
        "symbol": "v",
        "name": "Rapidez constante",
        "unit": "m / s"
      },
      {
        "symbol": "t",
        "name": "Tiempo transcurrido",
        "unit": "Segundos [s]"
      }
    ],
    "datoClave": "💡 Mnemotecnia: \"Diosito Ve Todo\" (d = v · t) o \"Dime Veo Televisión\". Con el triángulo mnemotécnico d-v-t: tapa con tu dedo lo que buscas: si buscas d te queda v · t; si buscas v te queda d / t; si buscas t te queda d / v.",
    "fijaUnsa": "💡 Mnemotecnia: \"Diosito Ve Todo\" (d = v · t) o \"Dime Veo Televisión\". Con el triángulo mnemotécnico d-v-t: tapa con tu dedo lo que buscas: si buscas d te queda v · t; si buscas v te queda d / t; si buscas t te queda d / v.",
    "calcType": "mru"
  },
  {
    "id": "fis_mru_velocidad_media",
    "subject": "Física",
    "topic": "Cinemática",
    "level": "Básica",
    "caseTag": "Rapidez Media vs Velocidad Media",
    "importance": "Alta Relevancia",
    "name": "Rapidez Media y Velocidad Media",
    "latex": "v_s = \\frac{e_{\\text{total}}}{t_{\\text{total}}} \\quad;\\quad \\vec{v}_m = \\frac{\\Delta \\vec{x}}{\\Delta t} = \\frac{\\vec{x}_f - \\vec{x}_0}{t}",
    "plain": "vs = espacio_total / tiempo_total ; vm = desplazamiento / tiempo",
    "desc": "Diferencia crítica entre rapidez media (escalar sobre la longitud de trayectoria) y velocidad media (vector sobre el vector desplazamiento).",
    "despejes": [
      {
        "name": "Tramos con distancias iguales d",
        "latex": "v_s = \\frac{2 v_1 v_2}{v_1 + v_2} \\quad (\\text{Media Armónica})"
      },
      {
        "name": "Tramos con tiempos iguales t",
        "latex": "v_s = \\frac{v_1 + v_2}{2} \\quad (\\text{Media Aritmética})"
      }
    ],
    "vars": [
      {
        "symbol": "v_s",
        "name": "Rapidez media escalar",
        "unit": "m / s"
      },
      {
        "symbol": "\\vec{v}_m",
        "name": "Velocidad media vectorial",
        "unit": "m / s"
      }
    ],
    "datoClave": "Si un móvil va de A hacia B a velocidad v1 y regresa de B hacia A a velocidad v2, la rapidez media NO es el promedio simple, sino la media armónica: 2*v1*v2 / (v1 + v2).",
    "fijaUnsa": "Si un móvil va de A hacia B a velocidad v1 y regresa de B hacia A a velocidad v2, la rapidez media NO es el promedio simple, sino la media armónica: 2*v1*v2 / (v1 + v2).",
    "calcType": null
  },
  {
    "id": "fis_mru_tiempos",
    "subject": "Física",
    "topic": "Cinemática",
    "level": "Operacional",
    "caseTag": "Encuentro y Alcance",
    "importance": "Alta Relevancia",
    "name": "MRU: Tiempos de Encuentro y de Alcance",
    "latex": "t_e = \\frac{d}{v_1 + v_2} \\quad;\\quad t_a = \\frac{d}{v_1 - v_2} \\quad (v_1 > v_2)",
    "plain": "te = d / (v1 + v2) ; ta = d / (v1 - v2)",
    "desc": "Tiempo necesario para que dos móviles se encuentren marchando en sentidos opuestos o se alcancen en el mismo sentido.",
    "despejes": [
      {
        "name": "Distancia del móvil 1 al encuentro",
        "latex": "d_1 = \\left(\\frac{v_1}{v_1 + v_2}\\right) d"
      },
      {
        "name": "Distancia del móvil 2 al encuentro",
        "latex": "d_2 = \\left(\\frac{v_2}{v_1 + v_2}\\right) d"
      }
    ],
    "vars": [
      {
        "symbol": "d",
        "name": "Separación inicial",
        "unit": "Metros [m]"
      },
      {
        "symbol": "v_1, v_2",
        "name": "Rapideces de los dos móviles",
        "unit": "m / s"
      },
      {
        "symbol": "t_e, t_a",
        "name": "Tiempos de encuentro y alcance",
        "unit": "Segundos [s]"
      }
    ],
    "datoClave": "En tiempo de alcance, el perseguidor debe tener mayor rapidez (v1 > v2). Si partieron a diferentes horas, calcula primero la distancia adelantada antes de aplicar la fórmula.",
    "fijaUnsa": "En tiempo de alcance, el perseguidor debe tener mayor rapidez (v1 > v2). Si partieron a diferentes horas, calcula primero la distancia adelantada antes de aplicar la fórmula.",
    "calcType": null
  },
  {
    "id": "fis_mruv_1",
    "subject": "Física",
    "topic": "Cinemática",
    "level": "Básica",
    "caseTag": "🎯 Caso: Sin Distancia (d)",
    "importance": "Alta Relevancia",
    "name": "MRUV Variante 1: Velocidad en Función del Tiempo (Sin d)",
    "latex": "v_f = v_0 \\pm a \\cdot t",
    "plain": "vf = v0 +- a * t",
    "desc": "Calcula la velocidad final adquirida sin requerir conocer la distancia recorrida.",
    "despejes": [
      {
        "name": "Aceleración",
        "latex": "a = \\frac{v_f - v_0}{t}"
      },
      {
        "name": "Tiempo Transcurrido",
        "latex": "t = \\frac{v_f - v_0}{a}"
      },
      {
        "name": "Velocidad Inicial",
        "latex": "v_0 = v_f \\mp a \\cdot t"
      }
    ],
    "vars": [
      {
        "symbol": "v_f",
        "name": "Velocidad final",
        "unit": "m / s"
      },
      {
        "symbol": "v_0",
        "name": "Velocidad inicial",
        "unit": "m / s"
      },
      {
        "symbol": "a",
        "name": "Aceleración tangencial constante",
        "unit": "m / s^2"
      },
      {
        "symbol": "t",
        "name": "Tiempo transcurrido",
        "unit": "Segundos [s]"
      }
    ],
    "datoClave": "Usa (+) si acelera (aumenta rapidez) y (-) si frena o desacelera. Si parte del reposo v0 = 0. Si frena hasta detenerse vf = 0.",
    "fijaUnsa": "Usa (+) si acelera (aumenta rapidez) y (-) si frena o desacelera. Si parte del reposo v0 = 0. Si frena hasta detenerse vf = 0.",
    "calcType": "mruv"
  },
  {
    "id": "fis_mruv_2",
    "subject": "Física",
    "topic": "Cinemática",
    "level": "Operacional",
    "caseTag": "🎯 Caso: Sin Velocidad Final (vf)",
    "importance": "Alta Relevancia",
    "name": "MRUV Variante 2: Distancia en Función del Tiempo (Sin vf)",
    "latex": "d = v_0 t \\pm \\frac{1}{2} a t^2",
    "plain": "d = v0 * t +- 0.5 * a * t^2",
    "desc": "Determina la distancia recorrida a partir de la velocidad inicial y aceleración, sin requerir conocer la velocidad final.",
    "despejes": [
      {
        "name": "Distancia si parte del reposo (v0 = 0)",
        "latex": "d = \\frac{1}{2} a t^2"
      },
      {
        "name": "Tiempo si parte del reposo",
        "latex": "t = \\sqrt{\\frac{2d}{a}}"
      }
    ],
    "vars": [
      {
        "symbol": "d",
        "name": "Distancia recorrida",
        "unit": "Metros [m]"
      },
      {
        "symbol": "v_0",
        "name": "Velocidad inicial",
        "unit": "m / s"
      },
      {
        "symbol": "a",
        "name": "Aceleración constante",
        "unit": "m / s^2"
      }
    ],
    "datoClave": "Ley de Galileo: Si parte del reposo, las distancias en segundos sucesivos (1s, 2s, 3s...) están en proporción de números impares: 1k, 3k, 5k, 7k... donde k = a/2.",
    "fijaUnsa": "Ley de Galileo: Si parte del reposo, las distancias en segundos sucesivos (1s, 2s, 3s...) están en proporción de números impares: 1k, 3k, 5k, 7k... donde k = a/2.",
    "calcType": null
  },
  {
    "id": "fis_mruv_3",
    "subject": "Física",
    "topic": "Cinemática",
    "level": "Operacional",
    "caseTag": "🎯 Caso: Sin Tiempo (t)",
    "importance": "Alta Relevancia",
    "name": "MRUV Variante 3: Ecuación de Torricelli (Sin t)",
    "latex": "v_f^2 = v_0^2 \\pm 2 a d",
    "plain": "vf^2 = v0^2 +- 2 * a * d",
    "desc": "Relaciona directamente velocidades inicial y final con aceleración y distancia, completamente independiente del tiempo.",
    "despejes": [
      {
        "name": "Distancia de Frenado (vf = 0)",
        "latex": "d_{\\text{frenado}} = \\frac{v_0^2}{2a}"
      },
      {
        "name": "Aceleración de Frenado",
        "latex": "a = \\frac{v_0^2}{2d}"
      }
    ],
    "vars": [
      {
        "symbol": "v_f",
        "name": "Velocidad final",
        "unit": "m / s"
      },
      {
        "symbol": "v_0",
        "name": "Velocidad inicial",
        "unit": "m / s"
      },
      {
        "symbol": "d",
        "name": "Distancia recorrida",
        "unit": "Metros [m]"
      }
    ],
    "datoClave": "La distancia de frenado es directamente proporcional al cuadrado de la velocidad inicial. Si duplicas la velocidad de un auto, la distancia requerida para detenerlo se multiplica por 4.",
    "fijaUnsa": "La distancia de frenado es directamente proporcional al cuadrado de la velocidad inicial. Si duplicas la velocidad de un auto, la distancia requerida para detenerlo se multiplica por 4.",
    "calcType": null
  },
  {
    "id": "fis_mruv_4",
    "subject": "Física",
    "topic": "Cinemática",
    "level": "Básica",
    "caseTag": "🎯 Caso: Sin Aceleración (a)",
    "importance": "Alta Probabilidad",
    "name": "MRUV Variante 4: Distancia con Velocidad Promedio (Sin a)",
    "latex": "d = \\left(\\frac{v_0 + v_f}{2}\\right) t",
    "plain": "d = ((v0 + vf) / 2) * t",
    "desc": "Calcula la distancia recorrida utilizando la semisuma de velocidades sin necesidad de conocer la aceleración.",
    "despejes": [
      {
        "name": "Velocidad Media Aritmética",
        "latex": "v_m = \\frac{v_0 + v_f}{2}"
      },
      {
        "name": "Tiempo Despejado",
        "latex": "t = \\frac{2d}{v_0 + v_f}"
      }
    ],
    "vars": [
      {
        "symbol": "d",
        "name": "Distancia",
        "unit": "Metros [m]"
      },
      {
        "symbol": "v_0, v_f",
        "name": "Velocidades inicial y final",
        "unit": "m / s"
      },
      {
        "symbol": "t",
        "name": "Tiempo",
        "unit": "Segundos [s]"
      }
    ],
    "datoClave": "Es la más rápida cuando el problema no menciona aceleración. Te ahorra plantear sistemas de ecuaciones de dos incógnitas.",
    "fijaUnsa": "Es la más rápida cuando el problema no menciona aceleración. Te ahorra plantear sistemas de ecuaciones de dos incógnitas.",
    "calcType": null
  },
  {
    "id": "fis_mruv_nesimo",
    "subject": "Física",
    "topic": "Cinemática",
    "level": "Atajo",
    "caseTag": "🎯 Caso: Distancia en el Enésimo Segundo",
    "importance": "Alta Probabilidad",
    "name": "MRUV Variante 5: Distancia en el n-ésimo Segundo Particular",
    "latex": "d_n = v_0 \\pm \\frac{a}{2}(2n - 1)",
    "plain": "dn = v0 +- (a/2) * (2n - 1)",
    "desc": "Calcula la distancia recorrida exclusivamente durante el segundo particular número n (por ejemplo, en el 4to segundo).",
    "despejes": [
      {
        "name": "Desde el reposo (v0 = 0)",
        "latex": "d_n = \\frac{a}{2}(2n - 1)"
      },
      {
        "name": "Aceleración desde d_n",
        "latex": "a = \\frac{2(d_n - v_0)}{2n - 1}"
      }
    ],
    "vars": [
      {
        "symbol": "d_n",
        "name": "Distancia en el segundo n",
        "unit": "Metros [m]"
      },
      {
        "symbol": "n",
        "name": "Número ordinal del segundo (1, 2, 3...)",
        "unit": "Entero"
      }
    ],
    "datoClave": "No confundir 'distancia en los primeros 4 segundos' (d = v0 t + 0.5 a t² con t=4) con 'distancia EN EL 4to segundo' (se usa dn con n=4).",
    "fijaUnsa": "No confundir 'distancia en los primeros 4 segundos' (d = v0 t + 0.5 a t² con t=4) con 'distancia EN EL 4to segundo' (se usa dn con n=4).",
    "calcType": null
  },
  {
    "id": "fis_caida_libre_ecuaciones",
    "subject": "Física",
    "topic": "Cinemática",
    "level": "Básica",
    "caseTag": "Caída Libre Vertical",
    "importance": "Fundamental",
    "name": "MVCL: Ecuaciones de Caída Libre Vertical",
    "latex": "v_f = v_0 \\pm g t \\quad;\\quad h = v_0 t \\pm \\frac{1}{2} g t^2 \\quad;\\quad v_f^2 = v_0^2 \\pm 2 g h",
    "plain": "vf = v0 +- gt ; h = v0*t +- 0.5*g*t^2 ; vf^2 = v0^2 +- 2gh",
    "desc": "Ecuaciones de movimiento vertical bajo la aceleración de la gravedad g (9.8 o 10 m/s²).",
    "despejes": [
      {
        "name": "Tiempo de Subida",
        "latex": "t_{\\text{sub}} = \\frac{v_0}{g}"
      },
      {
        "name": "Tiempo de Vuelo Total",
        "latex": "t_{\\text{vuelo}} = 2 t_{\\text{sub}} = \\frac{2v_0}{g}"
      },
      {
        "name": "Altura Máxima Alcanzada",
        "latex": "H_{\\max} = \\frac{v_0^2}{2g}"
      },
      {
        "name": "Altura en el n-ésimo Segundo",
        "latex": "h_n = v_0 \\pm \\frac{g}{2}(2n - 1)"
      }
    ],
    "vars": [
      {
        "symbol": "h",
        "name": "Altura vertical",
        "unit": "Metros [m]"
      },
      {
        "symbol": "g",
        "name": "Gravedad (10 o 9.8 m/s²)",
        "unit": "m / s^2"
      },
      {
        "symbol": "v_0, v_f",
        "name": "Velocidades verticales",
        "unit": "m / s"
      }
    ],
    "datoClave": "Regla de oro de la gravedad g = 10 m/s²: La velocidad vertical disminuye 10 m/s en cada segundo de subida y aumenta 10 m/s en cada segundo de bajada. En Hmax la velocidad es cero.",
    "fijaUnsa": "Regla de oro de la gravedad g = 10 m/s²: La velocidad vertical disminuye 10 m/s en cada segundo de subida y aumenta 10 m/s en cada segundo de bajada. En Hmax la velocidad es cero.",
    "calcType": null
  },
  {
    "id": "fis_mpcl_parabolico",
    "subject": "Física",
    "topic": "Cinemática",
    "level": "Operacional",
    "caseTag": "Movimiento Parabólico y Atajo 4H/D",
    "importance": "Alta Relevancia",
    "name": "MPCL: Movimiento Parabólico de Caída Libre y Relación de Oro",
    "latex": "H_{\\max} = \\frac{v_0^2 \\sin^2\\theta}{2g} \\quad;\\quad D = \\frac{v_0^2 \\sin(2\\theta)}{g} \\quad;\\quad \\tan\\theta = \\frac{4 H_{\\max}}{D}",
    "plain": "Hmax = (v0^2 * sin^2(theta)) / (2g) ; D = (v0^2 * sin(2*theta)) / g ; tan(theta) = 4*Hmax / D",
    "desc": "Movimiento bidimensional compuesto por MRU en el eje horizontal X y MVCL en el eje vertical Y.",
    "despejes": [
      {
        "name": "Relación Notable Altura-Alcance",
        "latex": "\\tan\\theta = \\frac{4 H_{\\max}}{D}"
      },
      {
        "name": "Alcance Máximo Horizontal (θ = 45°)",
        "latex": "D_{\\max} = \\frac{v_0^2}{g} = 4 H_{\\max}"
      },
      {
        "name": "Tiempo de Vuelo Total",
        "latex": "t_v = \\frac{2 v_0 \\sin\\theta}{g}"
      },
      {
        "name": "Ecuación de la Trayectoria",
        "latex": "y = x \\tan\\theta \\left(1 - \\frac{x}{D}\\right)"
      }
    ],
    "vars": [
      {
        "symbol": "H_{\\max}",
        "name": "Altura máxima",
        "unit": "Metros [m]"
      },
      {
        "symbol": "D",
        "name": "Alcance horizontal total",
        "unit": "Metros [m]"
      },
      {
        "symbol": "\\theta",
        "name": "Ángulo de disparo",
        "unit": "Grados [^\\circ]"
      }
    ],
    "datoClave": "💡 Mnemotecnia de Oro: \"4 Hombres para una Dama\" (tan θ = 4H / D). Vincula directamente la altura máxima H_max y el alcance horizontal D sin necesidad de calcular el tiempo ni la velocidad inicial de lanzamiento.",
    "fijaUnsa": "💡 Mnemotecnia de Oro: \"4 Hombres para una Dama\" (tan θ = 4H / D). Vincula directamente la altura máxima H_max y el alcance horizontal D sin necesidad de calcular el tiempo ni la velocidad inicial de lanzamiento.",
    "calcType": null
  },
  {
    "id": "fis_mcu_basico",
    "subject": "Física",
    "topic": "Cinemática Circular",
    "level": "Básica",
    "caseTag": "MCU Canónico",
    "importance": "Fundamental",
    "name": "Movimiento Circular Uniforme (MCU)",
    "latex": "\\theta = \\omega \\cdot t \\quad;\\quad v = \\omega \\cdot R \\quad;\\quad \\omega = \\frac{2\\pi}{T} = 2\\pi f",
    "plain": "theta = omega * t ; v = omega * R ; omega = 2*pi / T = 2*pi * f",
    "desc": "Movimiento con rapidez angular constante donde el móvil barre ángulos centrales iguales en tiempos iguales.",
    "despejes": [
      {
        "name": "Período y Frecuencia",
        "latex": "T = \\frac{1}{f} \\quad;\\quad f = \\frac{1}{T}"
      },
      {
        "name": "Longitud de Arco Recorrida",
        "latex": "s = \\theta \\cdot R = v \\cdot t"
      },
      {
        "name": "Conversión RPM a rad/s",
        "latex": "1 \\text{ RPM} = \\frac{\\pi}{30} \\text{ rad/s}"
      }
    ],
    "vars": [
      {
        "symbol": "\\theta",
        "name": "Ángulo central barrido",
        "unit": "Radianes [rad]"
      },
      {
        "symbol": "\\omega",
        "name": "Rapidez angular",
        "unit": "rad / s"
      },
      {
        "symbol": "v",
        "name": "Rapidez tangencial o lineal",
        "unit": "m / s"
      },
      {
        "symbol": "R",
        "name": "Radio de la trayectoria",
        "unit": "Metros [m]"
      }
    ],
    "datoClave": "Para pasar de RPM (revoluciones por minuto) a radianes por segundo (rad/s), multiplica por pi/30.",
    "fijaUnsa": "Para pasar de RPM (revoluciones por minuto) a radianes por segundo (rad/s), multiplica por pi/30.",
    "calcType": null
  },
  {
    "id": "fis_aceleracion_centripeta",
    "subject": "Física",
    "topic": "Cinemática Circular",
    "level": "Operacional",
    "caseTag": "Aceleración Centrípeta",
    "importance": "Alta Relevancia",
    "name": "Aceleración Centrípeta y Fuerza Centrípeta",
    "latex": "a_c = \\frac{v^2}{R} = \\omega^2 R \\quad;\\quad F_c = m \\cdot a_c = m \\frac{v^2}{R}",
    "plain": "ac = v^2 / R = omega^2 * R ; Fc = m * ac = m * v^2 / R",
    "desc": "Aceleración radial hacia el centro de curvatura que modifica continuamente la dirección del vector velocidad tangencial.",
    "despejes": [
      {
        "name": "Velocidad Crítica en la cúspide de un rizo",
        "latex": "v_{\\text{crítica}} = \\sqrt{g \\cdot R}"
      },
      {
        "name": "Tensión en el punto más bajo",
        "latex": "T_{\\text{bajo}} = m g + m \\frac{v^2}{R}"
      },
      {
        "name": "Tensión en el punto más alto",
        "latex": "T_{\\text{alto}} = m \\frac{v^2}{R} - m g"
      }
    ],
    "vars": [
      {
        "symbol": "a_c",
        "name": "Aceleración centrípeta",
        "unit": "m / s^2"
      },
      {
        "symbol": "F_c",
        "name": "Fuerza centrípeta neta",
        "unit": "Newtons [N]"
      },
      {
        "symbol": "m",
        "name": "Masa del cuerpo",
        "unit": "kg"
      },
      {
        "symbol": "R",
        "name": "Radio de curvatura",
        "unit": "m"
      }
    ],
    "datoClave": "La fuerza centrípeta Fc NO se dibuja en el diagrama de cuerpo libre (DCL); es la resultante radial: Fc = (Fuerzas hacia el centro) - (Fuerzas hacia afuera).",
    "fijaUnsa": "La fuerza centrípeta Fc NO se dibuja en el diagrama de cuerpo libre (DCL); es la resultante radial: Fc = (Fuerzas hacia el centro) - (Fuerzas hacia afuera).",
    "calcType": null
  },
  {
    "id": "fis_mcuv_completo",
    "subject": "Física",
    "topic": "Cinemática Circular",
    "level": "Operacional",
    "caseTag": "MCUV y Aceleración Total",
    "importance": "Alta Probabilidad",
    "name": "Movimiento Circular Uniformemente Variado (MCUV)",
    "latex": "\\omega_f = \\omega_0 \\pm \\alpha t \\quad;\\quad \\theta = \\omega_0 t \\pm \\frac{1}{2}\\alpha t^2 \\quad;\\quad \\omega_f^2 = \\omega_0^2 \\pm 2\\alpha\\theta",
    "plain": "omega_f = omega_0 +- alpha*t ; theta = omega_0*t +- 0.5*alpha*t^2 ; omega_f^2 = omega_0^2 +- 2*alpha*theta",
    "desc": "Movimiento circular con aceleración angular constante α que incrementa o disminuye la rapidez angular en el tiempo.",
    "despejes": [
      {
        "name": "Relación Tangencial Angular",
        "latex": "a_T = \\alpha \\cdot R \\quad;\\quad v = \\omega \\cdot R"
      },
      {
        "name": "Aceleración Total del Móvil",
        "latex": "a_{\\text{total}} = \\sqrt{a_T^2 + a_c^2}"
      },
      {
        "name": "Ángulo con Semisuma",
        "latex": "\\theta = \\left(\\frac{\\omega_0 + \\omega_f}{2}\\right) t"
      }
    ],
    "vars": [
      {
        "symbol": "\\alpha",
        "name": "Aceleración angular",
        "unit": "rad / s^2"
      },
      {
        "symbol": "a_T",
        "name": "Aceleración tangencial",
        "unit": "m / s^2"
      },
      {
        "symbol": "a_c",
        "name": "Aceleración centrípeta",
        "unit": "m / s^2"
      }
    ],
    "datoClave": "En el MCUV existen dos aceleraciones perpendiculares entre sí: la tangencial aT (cambia la rapidez) y la centrípeta ac (cambia la dirección). La aceleración total es su hipotenusa.",
    "fijaUnsa": "En el MCUV existen dos aceleraciones perpendiculares entre sí: la tangencial aT (cambia la rapidez) y la centrípeta ac (cambia la dirección). La aceleración total es su hipotenusa.",
    "calcType": null
  },
  {
    "id": "fis_estatica_lami",
    "subject": "Física",
    "topic": "Estática",
    "level": "Operacional",
    "caseTag": "Teorema de Lami y 1ra Condición",
    "importance": "Alta Probabilidad",
    "name": "Primera Condición de Equilibrio y Teorema de Lami",
    "latex": "\\sum \\vec{F} = 0 \\quad;\\quad \\frac{F_1}{\\sin\\alpha} = \\frac{F_2}{\\sin\\beta} = \\frac{F_3}{\\sin\\theta}",
    "plain": "Sum F = 0 ; F1 / sin(alfa) = F2 / sin(beta) = F3 / sin(theta)",
    "desc": "Condición de equilibrio traslacional y relación proporcional de tres fuerzas concurrentes y coplanares.",
    "despejes": [
      {
        "name": "Equilibrio por Ejes Cartesianos",
        "latex": "\\sum F_x = 0 \\quad;\\quad \\sum F_y = 0"
      },
      {
        "name": "Ley de Hooke (Fuerza Elástica)",
        "latex": "F_e = k \\cdot x"
      }
    ],
    "vars": [
      {
        "symbol": "F_1, F_2, F_3",
        "name": "Fuerzas en equilibrio",
        "unit": "Newtons [N]"
      },
      {
        "symbol": "\\alpha, \\beta, \\theta",
        "name": "Ángulos opuestos a cada fuerza",
        "unit": "Grados [^\\circ]"
      }
    ],
    "datoClave": "El Teorema de Lami solo es aplicable cuando exactamente TRES fuerzas coplanares y concurrentes sostienen el equilibrio. Para 4 o más fuerzas, descompón en ΣFx = 0 y ΣFy = 0.",
    "fijaUnsa": "El Teorema de Lami solo es aplicable cuando exactamente TRES fuerzas coplanares y concurrentes sostienen el equilibrio. Para 4 o más fuerzas, descompón en ΣFx = 0 y ΣFy = 0.",
    "calcType": null
  },
  {
    "id": "fis_torque_segunda_condicion",
    "subject": "Física",
    "topic": "Estática",
    "level": "Operacional",
    "caseTag": "Momento de una Fuerza",
    "importance": "Alta Relevancia",
    "name": "Momento de una Fuerza (Torque) y 2da Condición de Equilibrio",
    "latex": "M_O^F = \\pm F \\cdot d \\quad;\\quad \\sum M_O = 0 \\implies \\sum M_{\\text{antihorario}} = \\sum M_{\\text{horario}}",
    "plain": "Mo = +- F * d ; Sum Mo = 0",
    "desc": "Tendencia de rotación que produce una fuerza sobre un cuerpo rígido respecto a un eje o centro de giro.",
    "despejes": [
      {
        "name": "Brazo de Palanca Perpendicular",
        "latex": "d = r \\sin\\theta"
      },
      {
        "name": "Momento Nulo",
        "latex": "\\text{Si la fuerza pasa por el eje O } \\implies M_O = 0"
      }
    ],
    "vars": [
      {
        "symbol": "M_O^F",
        "name": "Momento de fuerza",
        "unit": "N \\cdot m"
      },
      {
        "symbol": "F",
        "name": "Fuerza aplicada",
        "unit": "Newtons [N]"
      },
      {
        "symbol": "d",
        "name": "Distancia perpendicular al giro",
        "unit": "Metros [m]"
      }
    ],
    "datoClave": "Signos del torque: Sentido antihorario = POSITIVO (+); Sentido horario = NEGATIVO (-). Ubica el punto de giro en el apoyo donde actúen las fuerzas incógnitas que no te interesa calcular.",
    "fijaUnsa": "Signos del torque: Sentido antihorario = POSITIVO (+); Sentido horario = NEGATIVO (-). Ubica el punto de giro en el apoyo donde actúen las fuerzas incógnitas que no te interesa calcular.",
    "calcType": null
  },
  {
    "id": "fis_newton2_lineal",
    "subject": "Física",
    "topic": "Dinámica",
    "level": "Básica",
    "caseTag": "2da Ley de Newton",
    "importance": "Fundamental",
    "name": "Segunda Ley de Newton (Dinámica Lineal)",
    "latex": "F_r = m \\cdot a \\quad;\\quad a = \\frac{\\sum F_{\\text{favor}} - \\sum F_{\\text{contra}}}{m_{\\text{total}}}",
    "plain": "Fr = m * a ; a = (Sum F_favor - Sum F_contra) / m_total",
    "desc": "Toda fuerza neta no equilibrada imprime sobre el cuerpo o sistema una aceleración en su misma dirección y sentido.",
    "despejes": [
      {
        "name": "Masa Inercial",
        "latex": "m = \\frac{F_r}{a}"
      },
      {
        "name": "Peso Gravitatorio",
        "latex": "P = m \\cdot g"
      },
      {
        "name": "Máquina de Atwood (Polea con 2 masas)",
        "latex": "a = \\left(\\frac{m_1 - m_2}{m_1 + m_2}\\right) g"
      }
    ],
    "vars": [
      {
        "symbol": "F_r",
        "name": "Fuerza resultante",
        "unit": "Newtons [N]"
      },
      {
        "symbol": "m",
        "name": "Masa total inercial",
        "unit": "kg"
      },
      {
        "symbol": "a",
        "name": "Aceleración del sistema",
        "unit": "m / s^2"
      }
    ],
    "datoClave": "Para hallar la aceleración de bloques conectados por cuerdas, trátalos como un solo cuerpo: suma todas las masas y divide la fuerza neta impulsora entre la masa total.",
    "fijaUnsa": "Para hallar la aceleración de bloques conectados por cuerdas, trátalos como un solo cuerpo: suma todas las masas y divide la fuerza neta impulsora entre la masa total.",
    "calcType": "newton"
  },
  {
    "id": "fis_rozamiento_completo",
    "subject": "Física",
    "topic": "Dinámica",
    "level": "Operacional",
    "caseTag": "Fricción Estática y Cinética",
    "importance": "Alta Probabilidad",
    "name": "Fuerza de Rozamiento Estático y Cinético",
    "latex": "f_s^{\\max} = \\mu_s \\cdot N \\quad;\\quad f_k = \\mu_k \\cdot N \\quad;\\quad (\\mu_s > \\mu_k)",
    "plain": "fs_max = mu_s * N ; fk = mu_k * N",
    "desc": "Fuerza tangencial que surge por las asperezas microscópicas entre dos superficies que intentan deslizar entre sí.",
    "despejes": [
      {
        "name": "Normal en Plano Horizontal",
        "latex": "N = m \\cdot g"
      },
      {
        "name": "Normal en Plano Inclinado con ángulo θ",
        "latex": "N = m g \\cos\\theta"
      },
      {
        "name": "Componente del Peso paralela al plano",
        "latex": "P_x = m g \\sin\\theta"
      },
      {
        "name": "Ángulo de Rozamiento Crítico",
        "latex": "\\tan\\theta_c = \\mu_s"
      }
    ],
    "vars": [
      {
        "symbol": "f_s^{\\max}",
        "name": "Rozamiento estático máximo",
        "unit": "N"
      },
      {
        "symbol": "f_k",
        "name": "Rozamiento cinético",
        "unit": "N"
      },
      {
        "symbol": "\\mu_s, \\mu_k",
        "name": "Coeficientes de fricción",
        "unit": "Adimensional"
      }
    ],
    "datoClave": "En un plano inclinado, un bloque empieza a deslizar por su propio peso cuando la tangente del ángulo supera al coeficiente estático: tan(θ) = μs.",
    "fijaUnsa": "En un plano inclinado, un bloque empieza a deslizar por su propio peso cuando la tangente del ángulo supera al coeficiente estático: tan(θ) = μs.",
    "calcType": null
  },
  {
    "id": "fis_trabajo_mecanico",
    "subject": "Física",
    "topic": "Trabajo y Energía",
    "level": "Básica",
    "caseTag": "Trabajo Mecánico",
    "importance": "Fundamental",
    "name": "Trabajo Mecánico de una Fuerza Constante",
    "latex": "W = F \\cdot d \\cos\\theta \\quad;\\quad W_{\\text{neto}} = \\Delta E_c = \\frac{1}{2} m v_f^2 - \\frac{1}{2} m v_0^2",
    "plain": "W = F * d * cos(theta) ; Wneto = Delta Ec = 0.5*m*vf^2 - 0.5*m*v0^2",
    "desc": "Transferencia cuantitativa de energía cuando una fuerza actúa a lo largo de un desplazamiento.",
    "despejes": [
      {
        "name": "Fuerza a Favor del Movimiento (θ = 0°)",
        "latex": "W = +F \\cdot d"
      },
      {
        "name": "Fuerza Perpendicular (θ = 90°)",
        "latex": "W = 0 \\quad (\\text{La normal y el peso en plano horizontal no hacen trabajo})"
      },
      {
        "name": "Fuerza Resistiva (θ = 180°)",
        "latex": "W = -F \\cdot d \\quad (\\text{Trabajo de fricción siempre negativo})"
      }
    ],
    "vars": [
      {
        "symbol": "W",
        "name": "Trabajo mecánico",
        "unit": "Joules [J]"
      },
      {
        "symbol": "F",
        "name": "Fuerza aplicada",
        "unit": "Newtons [N]"
      },
      {
        "symbol": "d",
        "name": "Desplazamiento",
        "unit": "Metros [m]"
      }
    ],
    "datoClave": "El trabajo neto realizado sobre un cuerpo es exactamente igual a la variación de su energía cinética (Teorema del Trabajo y la Energía Cinética).",
    "fijaUnsa": "El trabajo neto realizado sobre un cuerpo es exactamente igual a la variación de su energía cinética (Teorema del Trabajo y la Energía Cinética).",
    "calcType": null
  },
  {
    "id": "fis_potencia_rendimiento",
    "subject": "Física",
    "topic": "Trabajo y Energía",
    "level": "Operacional",
    "caseTag": "Potencia y Eficiencia",
    "importance": "Alta Relevancia",
    "name": "Potencia Mecánica y Rendimiento (Eficiencia)",
    "latex": "P = \\frac{W}{t} = F \\cdot v \\quad;\\quad \\eta = \\frac{P_{\\text{útil}}}{P_{\\text{entregada}}} \\times 100\\%",
    "plain": "P = W / t = F * v ; Eficiencia = (P_util / P_entregada) * 100%",
    "desc": "Rapidez con la cual se efectúa un trabajo y porcentaje de aprovechamiento energético de una máquina.",
    "despejes": [
      {
        "name": "Potencia Perdida",
        "latex": "P_{\\text{entregada}} = P_{\\text{útil}} + P_{\\text{perdida}}"
      },
      {
        "name": "Caballo de Fuerza (HP)",
        "latex": "1 \\text{ HP} \\approx 746 \\text{ Watts}"
      }
    ],
    "vars": [
      {
        "symbol": "P",
        "name": "Potencia mecánica",
        "unit": "Watts [W] = J/s"
      },
      {
        "symbol": "\\eta",
        "name": "Eficiencia o Rendimiento",
        "unit": "Porcentaje [%]"
      }
    ],
    "datoClave": "Si un motor mueve una carga a velocidad constante v venciendo una fuerza resistente F, la potencia desarrollada se calcula al instante con P = F * v.",
    "fijaUnsa": "Si un motor mueve una carga a velocidad constante v venciendo una fuerza resistente F, la potencia desarrollada se calcula al instante con P = F * v.",
    "calcType": null
  },
  {
    "id": "fis_energias_mecanicas",
    "subject": "Física",
    "topic": "Trabajo y Energía",
    "level": "Básica",
    "caseTag": "Energías y Conservación",
    "importance": "Fundamental",
    "name": "Energía Cinética, Potencial y Conservación Mecánica",
    "latex": "E_M = E_c + E_{pg} + E_{pe} = \\frac{1}{2}m v^2 + m g h + \\frac{1}{2}k x^2",
    "plain": "Em = 0.5*m*v^2 + m*g*h + 0.5*k*x^2",
    "desc": "Energía mecánica total y su principio de conservación incondicional en ausencia de fricción.",
    "despejes": [
      {
        "name": "Conservación sin Fricción",
        "latex": "E_{M_A} = E_{M_B}"
      },
      {
        "name": "Con Fuerzas No Conservativas (Fricción)",
        "latex": "W_{\\text{fricción}} = E_{M_B} - E_{M_A}"
      }
    ],
    "vars": [
      {
        "symbol": "E_c",
        "name": "Energía Cinética",
        "unit": "Joules [J]"
      },
      {
        "symbol": "E_{pg}",
        "name": "Energía Potencial Gravitatoria",
        "unit": "Joules [J]"
      },
      {
        "symbol": "E_{pe}",
        "name": "Energía Potencial Elástica de resorte",
        "unit": "Joules [J]"
      }
    ],
    "datoClave": "Si no hay fricción, la energía mecánica se conserva constante en cualquier punto de la trayectoria. Si hay fricción, el trabajo de la fricción Wnc es la diferencia de energía mecánica final menos inicial.",
    "fijaUnsa": "Si no hay fricción, la energía mecánica se conserva constante en cualquier punto de la trayectoria. Si hay fricción, el trabajo de la fricción Wnc es la diferencia de energía mecánica final menos inicial.",
    "calcType": null
  },
  {
    "id": "fis_impulso_choques",
    "subject": "Física",
    "topic": "Trabajo y Energía",
    "level": "Operacional",
    "caseTag": "Impulso y Choques",
    "importance": "Alta Probabilidad",
    "name": "Cantidad de Movimiento, Impulso y Coeficiente de Restitución",
    "latex": "\\vec{p} = m \\vec{v} \\quad;\\quad \\vec{I} = \\vec{F} \\Delta t = \\Delta \\vec{p} \\quad;\\quad e = \\frac{v_{2f} - v_{1f}}{v_{1i} - v_{2i}}",
    "plain": "p = m*v ; I = F*Delta_t = Delta_p ; e = (v2f - v1f) / (v1i - v2i)",
    "desc": "Teorema del impulso y dinámica de colisiones elásticas, inelásticas y perfectamente plásticas.",
    "despejes": [
      {
        "name": "Conservación del Momento Lineal",
        "latex": "\\sum \\vec{p}_{\\text{antes}} = \\sum \\vec{p}_{\\text{después}}"
      },
      {
        "name": "Choque Completamente Plástico (e = 0)",
        "latex": "v_{\\text{común}} = \\frac{m_1 v_1 + m_2 v_2}{m_1 + m_2}"
      },
      {
        "name": "Rebote de una pelota desde altura H",
        "latex": "h_1 = e^2 \\cdot H \\implies e = \\sqrt{\\frac{h_1}{H}}"
      }
    ],
    "vars": [
      {
        "symbol": "\\vec{p}",
        "name": "Cantidad de movimiento",
        "unit": "kg \\cdot m/s"
      },
      {
        "symbol": "\\vec{I}",
        "name": "Impulso",
        "unit": "N \\cdot s"
      },
      {
        "symbol": "e",
        "name": "Coeficiente de restitución",
        "unit": "0 ≤ e ≤ 1"
      }
    ],
    "datoClave": "En choque perfectamente inelástico (plástico), los cuerpos quedan pegados y se mueven con una velocidad común (e = 0). Si una pelota cae desde altura H y rebota hasta h, e = √(h/H).",
    "fijaUnsa": "En choque perfectamente inelástico (plástico), los cuerpos quedan pegados y se mueven con una velocidad común (e = 0). Si una pelota cae desde altura H y rebota hasta h, e = √(h/H).",
    "calcType": null
  },
  {
    "id": "fis_gravitacion_newton",
    "subject": "Física",
    "topic": "Gravitación Universal",
    "level": "Operacional",
    "caseTag": "Ley de Gravitación",
    "importance": "Alta Probabilidad",
    "name": "Ley de Gravitación Universal y Variación de la Gravedad",
    "latex": "F = G \\frac{M \\cdot m}{r^2} \\quad;\\quad g_0 = \\frac{G M}{R^2} \\quad;\\quad g_h = g_0 \\left(\\frac{R}{R + h}\\right)^2",
    "plain": "F = G * M * m / r^2 ; g0 = G*M / R^2 ; gh = g0 * (R / (R+h))^2",
    "desc": "Fuerza de atracción gravitatoria universal entre masas astronómicas y disminución de la aceleración gravitatoria con la altitud.",
    "despejes": [
      {
        "name": "Velocidad Orbital de Satélite",
        "latex": "v_{\\text{orb}} = \\sqrt{\\frac{G M}{r}}"
      },
      {
        "name": "Constante de Gravitación Universal",
        "latex": "G = 6.67 \\times 10^{-11} \\text{ N}\\cdot\\text{m}^2/\\text{kg}^2"
      }
    ],
    "vars": [
      {
        "symbol": "g_0",
        "name": "Gravedad en la superficie terrestre",
        "unit": "9.8 m/s^2"
      },
      {
        "symbol": "g_h",
        "name": "Gravedad a altura h sobre la superficie",
        "unit": "m/s^2"
      },
      {
        "symbol": "R",
        "name": "Radio del planeta",
        "unit": "m"
      }
    ],
    "datoClave": "Si te preguntan '¿a qué altura h la gravedad se reduce a la cuarta parte (g0/4)?', despeja: (R/(R+h))² = 1/4 ==> R/(R+h) = 1/2 ==> h = R (a una altura igual al radio terrestre).",
    "fijaUnsa": "Si te preguntan '¿a qué altura h la gravedad se reduce a la cuarta parte (g0/4)?', despeja: (R/(R+h))² = 1/4 ==> R/(R+h) = 1/2 ==> h = R (a una altura igual al radio terrestre).",
    "calcType": null
  },
  {
    "id": "fis_hidrostatica_presion",
    "subject": "Física",
    "topic": "Hidrostática",
    "level": "Básica",
    "caseTag": "Presión Hidrostática",
    "importance": "Fundamental",
    "name": "Presión, Presión Hidrostática y Presión Absoluta",
    "latex": "P = \\frac{F}{A} \\quad;\\quad P_h = \\rho_L \\cdot g \\cdot h \\quad;\\quad P_{\\text{total}} = P_{\\text{atm}} + P_h",
    "plain": "P = F / A ; Ph = rho * g * h ; Ptotal = Patm + Ph",
    "desc": "Fuerza normal distribuida por unidad de superficie y presión ejercida por el peso de una columna de líquido.",
    "despejes": [
      {
        "name": "Presión Atmosférica Estándar a Nivel del Mar",
        "latex": "P_{\\text{atm}} = 10^5 \\text{ Pa} = 1 \\text{ atm} = 760 \\text{ mmHg}"
      },
      {
        "name": "Tubos en U (Vasos Comunicantes)",
        "latex": "\\rho_1 \\cdot h_1 = \\rho_2 \\cdot h_2 \\quad (\\text{Líquidos no miscibles})"
      }
    ],
    "vars": [
      {
        "symbol": "P_h",
        "name": "Presión hidrostática manométrica",
        "unit": "Pascales [Pa] = N/m^2"
      },
      {
        "symbol": "\\rho_L",
        "name": "Densidad del líquido (Agua = 1000 kg/m^3)",
        "unit": "kg / m^3"
      },
      {
        "symbol": "h",
        "name": "Profundidad bajo la superficie libre",
        "unit": "Metros [m]"
      }
    ],
    "datoClave": "Por cada 10 metros que desciendes en agua líquida, la presión hidrostática aumenta en aproximadamente 1 atmósfera (100 kPa o 10^5 Pa).",
    "fijaUnsa": "Por cada 10 metros que desciendes en agua líquida, la presión hidrostática aumenta en aproximadamente 1 atmósfera (100 kPa o 10^5 Pa).",
    "calcType": "presion_hidro"
  },
  {
    "id": "fis_pascal_prensa",
    "subject": "Física",
    "topic": "Hidrostática",
    "level": "Operacional",
    "caseTag": "Prensa Hidráulica",
    "importance": "Alta Relevancia",
    "name": "Principio de Pascal y Prensa Hidráulica",
    "latex": "\\frac{F_1}{A_1} = \\frac{F_2}{A_2} \\implies \\frac{F_1}{d_1^2} = \\frac{F_2}{d_2^2}",
    "plain": "F1 / A1 = F2 / A2 ==> F1 / d1^2 = F2 / d2^2",
    "desc": "La presión aplicada a un líquido encerrado e incompresible se transmite íntegramente en todas las direcciones.",
    "despejes": [
      {
        "name": "Conservación del Volumen Desplazado",
        "latex": "A_1 \\cdot h_1 = A_2 \\cdot h_2 \\implies F_1 \\cdot h_1 = F_2 \\cdot h_2"
      },
      {
        "name": "Multiplicación de la Fuerza",
        "latex": "F_2 = F_1 \\left(\\frac{d_2}{d_1}\\right)^2"
      }
    ],
    "vars": [
      {
        "symbol": "F_1, F_2",
        "name": "Fuerzas aplicadas en cada émbolo",
        "unit": "Newtons [N]"
      },
      {
        "symbol": "A_1, A_2",
        "name": "Áreas transversales de émbolos",
        "unit": "m^2"
      },
      {
        "symbol": "d_1, d_2",
        "name": "Diámetros de los émbolos",
        "unit": "Metros [m]"
      }
    ],
    "datoClave": "Si el diámetro del émbolo grande es el triple del émbolo chico (d2 = 3*d1), la fuerza se multiplica por NUEVE (3 al cuadrado).",
    "fijaUnsa": "Si el diámetro del émbolo grande es el triple del émbolo chico (d2 = 3*d1), la fuerza se multiplica por NUEVE (3 al cuadrado).",
    "calcType": null
  },
  {
    "id": "fis_arquimedes_flotacion",
    "subject": "Física",
    "topic": "Hidrostática",
    "level": "Operacional",
    "caseTag": "Empuje de Arquímedes",
    "importance": "Alta Relevancia",
    "name": "Principio de Arquímedes y Ley de Flotación",
    "latex": "E = \\rho_L \\cdot g \\cdot V_{\\text{sum}} \\quad;\\quad P_{\\text{aparente}} = P_{\\text{real}} - E \\quad;\\quad \\frac{V_{\\text{sum}}}{V_T} = \\frac{\\rho_{\\text{cuerpo}}}{\\rho_L}",
    "plain": "E = rho_L * g * Vsum ; Paparente = Preal - E ; Vsum / Vtotal = rho_cuerpo / rho_liquido",
    "desc": "Fuerza vertical ascendente que experimenta todo cuerpo sumergido total o parcialmente en un fluido en reposo.",
    "despejes": [
      {
        "name": "Peso Aparente dentro del líquido",
        "latex": "P_{\\text{aparente}} = m g - \\rho_L g V_{\\text{sum}}"
      },
      {
        "name": "Cuerpo en equilibrio flotando",
        "latex": "E = P_{\\text{real}} \\implies \\rho_L V_{\\text{sum}} = \\rho_{\\text{cuerpo}} V_T"
      }
    ],
    "vars": [
      {
        "symbol": "E",
        "name": "Fuerza de empuje hidrostático",
        "unit": "Newtons [N]"
      },
      {
        "symbol": "V_{\\text{sum}}",
        "name": "Volumen de líquido desalojado",
        "unit": "m^3"
      },
      {
        "symbol": "\\rho_{\\text{cuerpo}}",
        "name": "Densidad del cuerpo flotante",
        "unit": "kg / m^3"
      }
    ],
    "datoClave": "La fracción del volumen que queda sumergida en un cuerpo flotante es exactamente la relación entre la densidad del cuerpo y la densidad del líquido: Vsum/Vtotal = ρcuerpo / ρlíquido.",
    "fijaUnsa": "La fracción del volumen que queda sumergida en un cuerpo flotante es exactamente la relación entre la densidad del cuerpo y la densidad del líquido: Vsum/Vtotal = ρcuerpo / ρlíquido.",
    "calcType": null
  },
  {
    "id": "fis_dilatacion_termica",
    "subject": "Física",
    "topic": "Calorimetría",
    "level": "Operacional",
    "caseTag": "Dilatación Térmica",
    "importance": "Alta Probabilidad",
    "name": "Dilatación Térmica (Lineal, Superficial y Volumétrica)",
    "latex": "\\Delta L = L_0 \\alpha \\Delta T \\quad;\\quad \\Delta A = A_0 (2\\alpha) \\Delta T \\quad;\\quad \\Delta V = V_0 (3\\alpha) \\Delta T",
    "plain": "Delta L = L0 * alpha * Delta T ; Delta A = A0 * (2*alpha) * Delta T ; Delta V = V0 * (3*alpha) * Delta T",
    "desc": "Expansión dimensional de los sólidos al aumentar la agitación molecular térmica.",
    "despejes": [
      {
        "name": "Longitud Final",
        "latex": "L_f = L_0 (1 + \\alpha \\Delta T)"
      },
      {
        "name": "Relación de Coeficientes",
        "latex": "\\frac{\\alpha}{1} = \\frac{\\beta}{2} = \\frac{\\gamma}{3}"
      }
    ],
    "vars": [
      {
        "symbol": "\\alpha",
        "name": "Coeficiente de dilatación lineal",
        "unit": "°C^{-1}"
      },
      {
        "symbol": "L_0",
        "name": "Longitud inicial a temperatura T0",
        "unit": "Metros [m]"
      },
      {
        "symbol": "\\Delta T",
        "name": "Variación térmica (Tf - T0)",
        "unit": "°C o K"
      }
    ],
    "datoClave": "El coeficiente de dilatación superficial es el doble del lineal (β = 2α), y el volumétrico es el triple (γ = 3α).",
    "fijaUnsa": "El coeficiente de dilatación superficial es el doble del lineal (β = 2α), y el volumétrico es el triple (γ = 3α).",
    "calcType": null
  },
  {
    "id": "fis_calor_sensible",
    "subject": "Física",
    "topic": "Calorimetría",
    "level": "Básica",
    "caseTag": "Calor Sensible",
    "importance": "Fundamental",
    "name": "Calor Sensible y Capacidad Calorífica",
    "latex": "Q = m \\cdot c_e \\cdot \\Delta T \\quad;\\quad C = m \\cdot c_e \\quad;\\quad \\sum Q_{\\text{ganado}} + \\sum Q_{\\text{perdido}} = 0",
    "plain": "Q = m * ce * Delta T ; C = m * ce ; Sum Qganado + Sum Qperdido = 0",
    "desc": "Cantidad de energía térmica necesaria para modificar la temperatura de una sustancia sin cambiar su estado físico.",
    "despejes": [
      {
        "name": "Calor Específico del Agua Líquida",
        "latex": "c_{e(\\text{agua})} = 1 \\text{ cal/g}\\cdot^\\circ\\text{C} = 4186 \\text{ J/kg}\\cdot\\text{K}"
      },
      {
        "name": "Calor Específico del Hielo y Vapor",
        "latex": "c_{e(\\text{hielo})} = c_{e(\\text{vapor})} = 0.5 \\text{ cal/g}\\cdot^\\circ\\text{C}"
      },
      {
        "name": "Temperatura de Equilibrio Térmico",
        "latex": "T_{eq} = \\frac{m_1 c_1 T_1 + m_2 c_2 T_2}{m_1 c_1 + m_2 c_2}"
      }
    ],
    "vars": [
      {
        "symbol": "Q",
        "name": "Calor sensible transferido",
        "unit": "Calorías [cal] o Joules [J]"
      },
      {
        "symbol": "c_e",
        "name": "Calor específico del material",
        "unit": "cal / g \\cdot ^\\circ C"
      },
      {
        "symbol": "\\Delta T",
        "name": "Variación de temperatura",
        "unit": "°C"
      }
    ],
    "datoClave": "En equilibrio térmico entre dos masas del mismo líquido (ej. agua), Teq es el promedio ponderado de temperaturas: Teq = (m1*T1 + m2*T2)/(m1 + m2).",
    "fijaUnsa": "En equilibrio térmico entre dos masas del mismo líquido (ej. agua), Teq es el promedio ponderado de temperaturas: Teq = (m1*T1 + m2*T2)/(m1 + m2).",
    "calcType": null
  },
  {
    "id": "fis_calor_latente",
    "subject": "Física",
    "topic": "Calorimetría",
    "level": "Operacional",
    "caseTag": "Cambio de Fase",
    "importance": "Alta Relevancia",
    "name": "Calor Latente y Transformación de Estado Físico",
    "latex": "Q_L = m \\cdot L_f \\quad;\\quad Q_L = m \\cdot L_v",
    "plain": "Q = m * Lf ; Q = m * Lv",
    "desc": "Energía requerida para reordenar los enlaces moleculares durante un cambio de fase a temperatura constante.",
    "despejes": [
      {
        "name": "Fusión del Hielo a 0 °C",
        "latex": "L_f = 80 \\text{ cal/g}"
      },
      {
        "name": "Vaporización del Agua a 100 °C",
        "latex": "L_v = 540 \\text{ cal/g}"
      }
    ],
    "vars": [
      {
        "symbol": "Q_L",
        "name": "Calor de transformación de fase",
        "unit": "Calorías [cal]"
      },
      {
        "symbol": "m",
        "name": "Masa de sustancia transformada",
        "unit": "Gramos [g]"
      }
    ],
    "datoClave": "¡Durante todo el cambio de fase la temperatura NO varía! Se mantiene exactamente a 0 °C (fusión) o 100 °C (ebullición del agua a 1 atm).",
    "fijaUnsa": "¡Durante todo el cambio de fase la temperatura NO varía! Se mantiene exactamente a 0 °C (fusión) o 100 °C (ebullición del agua a 1 atm).",
    "calcType": null
  },
  {
    "id": "fis_coulomb_campo",
    "subject": "Física",
    "topic": "Electrostática",
    "level": "Básica",
    "caseTag": "Ley de Coulomb y Campo",
    "importance": "Fundamental",
    "name": "Ley de Coulomb, Campo Eléctrico y Potencial Eléctrico",
    "latex": "F = k \\frac{|q_1 q_2|}{d^2} \\quad;\\quad E = k \\frac{|Q|}{d^2} = \\frac{F}{q_0} \\quad;\\quad V = k \\frac{Q}{d}",
    "plain": "F = k * |q1*q2| / d^2 ; E = k*|Q| / d^2 ; V = k*Q / d",
    "desc": "Interacción electrostática entre cargas puntuales en reposo en el vacío.",
    "despejes": [
      {
        "name": "Constante de Coulomb en el vacío",
        "latex": "k = 9 \\times 10^9 \\text{ N}\\cdot\\text{m}^2/\\text{C}^2"
      },
      {
        "name": "Trabajo Eléctrico entre puntos A y B",
        "latex": "W_{A \\to B} = q (V_A - V_B)"
      },
      {
        "name": "Campo Eléctrico Uniforme",
        "latex": "V = E \\cdot d"
      }
    ],
    "vars": [
      {
        "symbol": "F",
        "name": "Fuerza electrostática",
        "unit": "Newtons [N]"
      },
      {
        "symbol": "E",
        "name": "Intensidad de campo eléctrico",
        "unit": "N / C o V / m"
      },
      {
        "symbol": "V",
        "name": "Potencial eléctrico escalar",
        "unit": "Voltios [V]"
      }
    ],
    "datoClave": "El potencial eléctrico V es una magnitud ESCALAR: sí se sustituye el signo de la carga (+ o -). La fuerza F y el campo E son VECTORIALES: se calculan en valor absoluto y la dirección se halla por atracción o repulsión.",
    "fijaUnsa": "El potencial eléctrico V es una magnitud ESCALAR: sí se sustituye el signo de la carga (+ o -). La fuerza F y el campo E son VECTORIALES: se calculan en valor absoluto y la dirección se halla por atracción o repulsión.",
    "calcType": null
  },
  {
    "id": "fis_capacitancia_condensador",
    "subject": "Física",
    "topic": "Electrostática",
    "level": "Operacional",
    "caseTag": "Condensadores y Capacitancia",
    "importance": "Alta Probabilidad",
    "name": "Capacitancia Eléctrica y Energía Almacenada en Condensador",
    "latex": "C = \\frac{Q}{V} = \\varepsilon_0 \\frac{A}{d} \\quad;\\quad U = \\frac{1}{2} C V^2 = \\frac{Q^2}{2C}",
    "plain": "C = Q / V = epsilon0 * A / d ; U = 0.5 * C * V^2 = Q^2 / (2C)",
    "desc": "Capacidad de almacenar carga y energía potencial electrostática en placas plano-paralelas.",
    "despejes": [
      {
        "name": "Condensadores en Serie (Carga Q constante)",
        "latex": "\\frac{1}{C_{eq}} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\dots"
      },
      {
        "name": "Condensadores en Paralelo (Voltaje V constante)",
        "latex": "C_{eq} = C_1 + C_2 + \\dots"
      }
    ],
    "vars": [
      {
        "symbol": "C",
        "name": "Capacitancia",
        "unit": "Faradios [F] o μF"
      },
      {
        "symbol": "Q",
        "name": "Carga acumulada",
        "unit": "Coulombs [C]"
      },
      {
        "symbol": "V",
        "name": "Diferencia de potencial",
        "unit": "Voltios [V]"
      }
    ],
    "datoClave": "¡Ojo con la regla contraria a las resistencias! Los condensadores en PARALELO se suman directamente (Ceq = C1 + C2), mientras que en SERIE se suman las inversas.",
    "fijaUnsa": "¡Ojo con la regla contraria a las resistencias! Los condensadores en PARALELO se suman directamente (Ceq = C1 + C2), mientras que en SERIE se suman las inversas.",
    "calcType": null
  },
  {
    "id": "fis_electrodinamica_ohm",
    "subject": "Física",
    "topic": "Electrodinámica",
    "level": "Básica",
    "caseTag": "Ley de Ohm y Joule",
    "importance": "Fundamental",
    "name": "Ley de Ohm, Potencia Eléctrica y Efecto Joule",
    "latex": "V = I \\cdot R \\quad;\\quad P = V \\cdot I = I^2 R = \\frac{V^2}{R} \\quad;\\quad Q = 0.24 I^2 R t",
    "plain": "V = I * R ; P = V*I = I^2*R = V^2/R ; Q_calorias = 0.24 * I^2 * R * t",
    "desc": "Leyes de transporte de carga eléctrica a través de conductores ohmicos y disipación de calor por efecto Joule.",
    "despejes": [
      {
        "name": "Intensidad de Corriente Eléctrica",
        "latex": "I = \\frac{q}{t} = \\frac{n \\cdot e}{t} \\quad (e = 1.6 \\times 10^{-19} \\text{ C})"
      },
      {
        "name": "Ley de Pouillet (Resistencia de un Cable)",
        "latex": "R = \\rho \\frac{L}{A}"
      }
    ],
    "vars": [
      {
        "symbol": "V",
        "name": "Diferencia de potencial (Voltaje)",
        "unit": "Voltios [V]"
      },
      {
        "symbol": "I",
        "name": "Intensidad de corriente",
        "unit": "Amperios [A]"
      },
      {
        "symbol": "R",
        "name": "Resistencia eléctrica",
        "unit": "Ohmios [\\Omega]"
      },
      {
        "symbol": "P",
        "name": "Potencia eléctrica disipada",
        "unit": "Watts [W]"
      }
    ],
    "datoClave": "Efecto Joule: 1 Joule equivale a 0.24 calorías. Si te piden el calor desprendido en calorías, multiplica I²*R*t por 0.24.",
    "fijaUnsa": "Efecto Joule: 1 Joule equivale a 0.24 calorías. Si te piden el calor desprendido en calorías, multiplica I²*R*t por 0.24.",
    "calcType": "ohm"
  },
  {
    "id": "fis_resistencias_asociacion",
    "subject": "Física",
    "topic": "Electrodinámica",
    "level": "Operacional",
    "caseTag": "Serie y Paralelo",
    "importance": "Alta Relevancia",
    "name": "Resistencias en Serie y en Paralelo",
    "latex": "R_{\\text{serie}} = R_1 + R_2 + \\dots \\quad;\\quad \\frac{1}{R_{\\text{paralelo}}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots",
    "plain": "R_serie = R1 + R2 ; 1/R_paralelo = 1/R1 + 1/R2",
    "desc": "Cálculo de la resistencia equivalente en circuitos de corriente continua.",
    "despejes": [
      {
        "name": "Atajo para Dos Resistencias en Paralelo",
        "latex": "R_{eq} = \\frac{R_1 \\cdot R_2}{R_1 + R_2} \\quad (\\text{Producto sobre Suma})"
      },
      {
        "name": "N Resistencias Iguales en Paralelo",
        "latex": "R_{eq} = \\frac{R}{N}"
      }
    ],
    "vars": [
      {
        "symbol": "R_{eq}",
        "name": "Resistencia equivalente total",
        "unit": "Ohmios [\\Omega]"
      }
    ],
    "datoClave": "En serie, la CORRIENTE (I) es la misma para todas las resistencias. En paralelo, el VOLTAJE (V) es idéntico en todas las ramas.",
    "fijaUnsa": "En serie, la CORRIENTE (I) es la misma para todas las resistencias. En paralelo, el VOLTAJE (V) es idéntico en todas las ramas.",
    "calcType": null
  },
  {
    "id": "fis_optica_descartes",
    "subject": "Física",
    "topic": "Óptica Geométrica",
    "level": "Operacional",
    "caseTag": "Espejos y Lentes",
    "importance": "Alta Probabilidad",
    "name": "Ecuación de Descartes (Espejos y Lentes) y Ley de Snell",
    "latex": "\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i} \\quad;\\quad M = -\\frac{d_i}{d_o} = \\frac{h_i}{h_o} \\quad;\\quad n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2",
    "plain": "1/f = 1/do + 1/di ; M = -di / do ; n1 * sin(theta1) = n2 * sin(theta2)",
    "desc": "Formación de imágenes ópticas mediante refracción en lentes y reflexión en espejos esféricos.",
    "despejes": [
      {
        "name": "Espejo Cóncavo / Lente Convergente",
        "latex": "f > 0 \\quad (\\text{Foco positivo})"
      },
      {
        "name": "Espejo Convexo / Lente Divergente",
        "latex": "f < 0 \\quad (\\text{Foco negativo})"
      },
      {
        "name": "Imagen Real vs Virtual",
        "latex": "d_i > 0 \\text{ (Real)}; \\quad d_i < 0 \\text{ (Virtual)}"
      }
    ],
    "vars": [
      {
        "symbol": "f",
        "name": "Distancia focal",
        "unit": "cm o m"
      },
      {
        "symbol": "d_o, d_i",
        "name": "Distancia del objeto e imagen",
        "unit": "cm o m"
      },
      {
        "symbol": "n",
        "name": "Índice de refracción del medio",
        "unit": "Adimensional"
      }
    ],
    "datoClave": "Toda imagen virtual siempre es DERECHA (no invertida) y su distancia di es negativa. Toda imagen real siempre es INVERTIDA.",
    "fijaUnsa": "Toda imagen virtual siempre es DERECHA (no invertida) y su distancia di es negativa. Toda imagen real siempre es INVERTIDA.",
    "calcType": null
  },
  {
    "id": "fis_pendulo_mas",
    "subject": "Física",
    "topic": "Oscilaciones",
    "level": "Operacional",
    "caseTag": "Péndulo y Masa-Resorte",
    "importance": "Alta Probabilidad",
    "name": "Movimiento Armónico Simple: Péndulo y Sistema Masa-Resorte",
    "latex": "T_{\\text{péndulo}} = 2\\pi \\sqrt{\\frac{L}{g}} \\quad;\\quad T_{\\text{resorte}} = 2\\pi \\sqrt{\\frac{m}{k}}",
    "plain": "T_pendulo = 2*pi * sqrt(L / g) ; T_resorte = 2*pi * sqrt(m / k)",
    "desc": "Período de oscilación de sistemas armónicos ideales para pequeñas amplitudes angulares.",
    "despejes": [
      {
        "name": "Frecuencia de Oscilación",
        "latex": "f = \\frac{1}{T} = \\frac{1}{2\\pi}\\sqrt{\\frac{g}{L}}"
      },
      {
        "name": "Ecuación de Posición del M.A.S.",
        "latex": "x(t) = A \\sin(\\omega t + \\phi)"
      }
    ],
    "vars": [
      {
        "symbol": "T",
        "name": "Período de una oscilación completa",
        "unit": "Segundos [s]"
      },
      {
        "symbol": "L",
        "name": "Longitud del hilo del péndulo",
        "unit": "Metros [m]"
      },
      {
        "symbol": "k",
        "name": "Constante elástica del resorte",
        "unit": "N / m"
      }
    ],
    "datoClave": "¡El período de un péndulo simple es COMPLETAMENTE INDEPENDIENTE de la masa suspendida! Solo depende de la longitud del hilo L y de la gravedad local g.",
    "fijaUnsa": "¡El período de un péndulo simple es COMPLETAMENTE INDEPENDIENTE de la masa suspendida! Solo depende de la longitud del hilo L y de la gravedad local g.",
    "calcType": null
  },
  {
    "id": "fis_magnetismo_lorentz",
    "subject": "Física",
    "topic": "Electromagnetismo",
    "level": "Operacional",
    "caseTag": "Fuerza Magnética de Lorentz",
    "importance": "Alta Probabilidad",
    "name": "Fuerza Magnética sobre Carga Puntual y Conductor Rectilíneo",
    "latex": "F_m = |q| \\cdot v \\cdot B \\sin\\theta \\quad;\\quad F_m = I \\cdot L \\cdot B \\sin\\theta",
    "plain": "Fm = |q| * v * B * sin(theta) ; Fm = I * L * B * sin(theta)",
    "desc": "Fuerza deflectora que experimenta una carga en movimiento o un alambre conductor inmerso en un campo magnético B.",
    "despejes": [
      {
        "name": "Radio de la Órbita Circular (θ = 90°)",
        "latex": "R = \\frac{m \\cdot v}{|q| \\cdot B}"
      },
      {
        "name": "Regla de la Palma Derecha",
        "latex": "\\text{Pulgar: } \\vec{v} \\text{ o } I; \\quad \\text{Dedos: } \\vec{B}; \\quad \\text{Palma: } \\vec{F}"
      }
    ],
    "vars": [
      {
        "symbol": "B",
        "name": "Inducción magnética (Campo magnético)",
        "unit": "Teslas [T]"
      },
      {
        "symbol": "q",
        "name": "Carga eléctrica",
        "unit": "Coulombs [C]"
      },
      {
        "symbol": "v",
        "name": "Rapidez de la partícula",
        "unit": "m / s"
      }
    ],
    "datoClave": "Si la carga se mueve PARALELA a las líneas de campo magnético (θ = 0° o 180°), la fuerza magnética es exactamente CERO y sigue en MRU.",
    "fijaUnsa": "Si la carga se mueve PARALELA a las líneas de campo magnético (θ = 0° o 180°), la fuerza magnética es exactamente CERO y sigue en MRU.",
    "calcType": null
  },
  {
    "id": "qui_escalas_termo",
    "subject": "Química",
    "topic": "Materia y Magnitudes",
    "level": "Básica",
    "caseTag": "Conversión de Escalas",
    "importance": "Fundamental",
    "name": "Escalas Termométricas y Variación Térmica",
    "latex": "\\frac{C}{5} = \\frac{F - 32}{9} = \\frac{K - 273}{5} = \\frac{R - 492}{9} \\quad;\\quad \\frac{\\Delta C}{5} = \\frac{\\Delta F}{9} = \\frac{\\Delta K}{5} = \\frac{\\Delta R}{9}",
    "plain": "C/5 = (F-32)/9 = (K-273)/5 = (R-492)/9 ; Delta C/5 = Delta F/9 = Delta K/5 = Delta R/9",
    "desc": "Conversión analítica entre escalas relativas (Celsius, Fahrenheit) y escalas absolutas (Kelvin, Rankine).",
    "despejes": [
      {
        "name": "Celsius a Kelvin Directo",
        "latex": "K = C + 273"
      },
      {
        "name": "Fahrenheit a Rankine Directo",
        "latex": "R = F + 460"
      },
      {
        "name": "Punto de Coincidencia C = F",
        "latex": "C = F = -40^\\circ"
      }
    ],
    "vars": [
      {
        "symbol": "C, K",
        "name": "Grados Celsius y Kelvin",
        "unit": "°C, K"
      },
      {
        "symbol": "F, R",
        "name": "Grados Fahrenheit y Rankine",
        "unit": "°F, R"
      }
    ],
    "datoClave": "En variaciones de temperatura (aumentó en, disminuyó en), la variación en Celsius es idéntica a la variación en Kelvin: ΔC = ΔK. Y una variación de 5 °C equivale a 9 °F.",
    "fijaUnsa": "En variaciones de temperatura (aumentó en, disminuyó en), la variación en Celsius es idéntica a la variación en Kelvin: ΔC = ΔK. Y una variación de 5 °C equivale a 9 °F.",
    "calcType": null
  },
  {
    "id": "qui_densidad_peso_esp",
    "subject": "Química",
    "topic": "Materia y Magnitudes",
    "level": "Básica",
    "caseTag": "Densidad y Gravedad",
    "importance": "Fundamental",
    "name": "Densidad Absoluta y Peso Específico",
    "latex": "\\rho = \\frac{m}{V} \\quad;\\quad \\gamma = \\rho \\cdot g = \\frac{W}{V}",
    "plain": "rho = masa / Volumen ; gamma = rho * g",
    "desc": "Masa por unidad de volumen y peso específico de las sustancias homogéneas.",
    "despejes": [
      {
        "name": "Masa Despejada",
        "latex": "m = \\rho \\cdot V"
      },
      {
        "name": "Volumen Despejado",
        "latex": "V = \\frac{m}{\\rho}"
      },
      {
        "name": "Densidad Relativa",
        "latex": "\\rho_{\\text{rel}} = \\frac{\\rho_{\\text{sustancia}}}{\\rho_{\\text{agua}}} \\quad (\\text{Adimensional})"
      }
    ],
    "vars": [
      {
        "symbol": "\\rho",
        "name": "Densidad absoluta",
        "unit": "g/cm^3 o kg/m^3"
      },
      {
        "symbol": "m",
        "name": "Masa de la sustancia",
        "unit": "g o kg"
      },
      {
        "symbol": "V",
        "name": "Volumen ocupado",
        "unit": "mL, cm^3 o m^3"
      }
    ],
    "datoClave": "Densidad del agua pura a 4 °C: 1 g/cm³ = 1 g/mL = 1000 kg/m³.",
    "fijaUnsa": "Densidad del agua pura a 4 °C: 1 g/cm³ = 1 g/mL = 1000 kg/m³.",
    "calcType": null
  },
  {
    "id": "qui_atomo_pez",
    "subject": "Química",
    "topic": "Estructura Atómica",
    "level": "Básica",
    "caseTag": "Regla del PEZ y Masa",
    "importance": "Fundamental",
    "name": "Estructura Atómica, Masa y Carga Nuclear (Regla del PEZ)",
    "latex": "A = Z + n \\quad;\\quad \\text{En átomo neutro: } Z = p^+ = e^- \\quad (\\text{Regla del PEZ})",
    "plain": "A = Z + n ; Z = p = e (Atomo neutro)",
    "desc": "Relación fundamental de las partículas subatómicas fundamentales en el núcleo y la corteza electrónica.",
    "despejes": [
      {
        "name": "Cantidad de Neutrones",
        "latex": "n = A - Z"
      },
      {
        "name": "Catión (Pierde e-)",
        "latex": "e^- = Z - q \\quad (\\text{Carga positiva})"
      },
      {
        "name": "Anión (Gana e-)",
        "latex": "e^- = Z + q \\quad (\\text{Carga negativa})"
      }
    ],
    "vars": [
      {
        "symbol": "A",
        "name": "Número de masa (nucleones fundamentales)",
        "unit": "Entero"
      },
      {
        "symbol": "Z",
        "name": "Número atómico (protones en núcleo)",
        "unit": "Entero"
      },
      {
        "symbol": "n",
        "name": "Número de neutrones neutros",
        "unit": "Entero"
      }
    ],
    "datoClave": "La masa atómica A representa nucleones (protones + neutrones). El número atómico Z nunca cambia en reacciones químicas.",
    "fijaUnsa": "La masa atómica A representa nucleones (protones + neutrones). El número atómico Z nunca cambia en reacciones químicas.",
    "calcType": null
  },
  {
    "id": "qui_numeros_cuanticos",
    "subject": "Química",
    "topic": "Estructura Atómica",
    "level": "Operacional",
    "caseTag": "Números Cuánticos",
    "importance": "Alta Relevancia",
    "name": "Números Cuánticos y Capacidad Electrónica Máxima",
    "latex": "e^-_{\\max(\\text{nivel})} = 2n^2 \\quad;\\quad e^-_{\\max(\\text{subnivel})} = 2(2l + 1) \\quad;\\quad (s=2, p=6, d=10, f=14)",
    "plain": "e_max_nivel = 2n^2 ; e_max_subnivel = 2(2l + 1)",
    "desc": "Conjunto de 4 parámetros cuánticos (n, l, ml, ms) que determinan el estado energético y orbital de un electrón.",
    "despejes": [
      {
        "name": "Subniveles y Valores de l",
        "latex": "s(l=0),\\, p(l=1),\\, d(l=2),\\, f(l=3)"
      },
      {
        "name": "Magnético ml",
        "latex": "m_l = -l, \\dots, 0, \\dots, +l \\quad (2l+1 \\text{ orbitales})"
      },
      {
        "name": "Espín ms",
        "latex": "m_s = +1/2 \\,(\\uparrow) \\quad;\\quad m_s = -1/2 \\,(\\downarrow)"
      }
    ],
    "vars": [
      {
        "symbol": "n",
        "name": "Nivel principal de energía",
        "unit": "1, 2, 3, 4, 5, 6, 7"
      },
      {
        "symbol": "l",
        "name": "Subnivel o momento azimutal",
        "unit": "0 ≤ l ≤ n-1"
      }
    ],
    "datoClave": "Mnemotecnia clásica para subniveles: S-P-D-F ('Sopa de Fideos') con capacidades máximas 2, 6, 10, 14 electrones.",
    "fijaUnsa": "Mnemotecnia clásica para subniveles: S-P-D-F ('Sopa de Fideos') con capacidades máximas 2, 6, 10, 14 electrones.",
    "calcType": null
  },
  {
    "id": "qui_uqm_moles",
    "subject": "Química",
    "topic": "Unidades Químicas de Masa",
    "level": "Básica",
    "caseTag": "Concepto de Mol",
    "importance": "Fundamental",
    "name": "Número de Moles, Número de Avogadro y Masa Molar",
    "latex": "n = \\frac{m}{\\bar{M}} = \\frac{N_{\\text{átomos o moléculas}}}{N_A} = \\frac{V_{CN}}{22.4 \\text{ L}}",
    "plain": "n = m / MasaMolar = N / Avogadro = V_CN / 22.4 L",
    "desc": "Puente dimensional de conversión entre masa en balanza, cantidad de partículas y volumen de un gas ideal en Condiciones Normales (C.N.).",
    "despejes": [
      {
        "name": "Número de Avogadro",
        "latex": "N_A = 6.022 \\times 10^{23} \\text{ entidades/mol}"
      },
      {
        "name": "Volumen Molar en C.N. (0°C y 1 atm)",
        "latex": "V_{\\text{molar}} = 22.4 \\text{ Litros/mol}"
      },
      {
        "name": "Masa de Muestra",
        "latex": "m = n \\cdot \\bar{M}"
      }
    ],
    "vars": [
      {
        "symbol": "n",
        "name": "Cantidad de sustancia",
        "unit": "Moles [mol]"
      },
      {
        "symbol": "\\bar{M}",
        "name": "Masa molar del compuesto",
        "unit": "g / mol"
      },
      {
        "symbol": "m",
        "name": "Masa física",
        "unit": "Gramos [g]"
      }
    ],
    "datoClave": "En Condiciones Normales (C.N.: T = 0 °C = 273 K, P = 1 atm), EXACTAMENTE 1 mol de cualquier gas ideal ocupa un volumen fijo de 22.4 Litros.",
    "fijaUnsa": "En Condiciones Normales (C.N.: T = 0 °C = 273 K, P = 1 atm), EXACTAMENTE 1 mol de cualquier gas ideal ocupa un volumen fijo de 22.4 Litros.",
    "calcType": null
  },
  {
    "id": "qui_masa_equivalente",
    "subject": "Química",
    "topic": "Estequiometría",
    "level": "Operacional",
    "caseTag": "Masa Equivalente y Parámetro θ",
    "importance": "Alta Relevancia",
    "name": "Masa Equivalente (Eq-g) y Número de Equivalentes",
    "latex": "Eq\\text{-}g = \\frac{\\bar{M}}{\\theta} \\quad;\\quad N_{eq} = \\frac{m}{Eq\\text{-}g} = n \\cdot \\theta",
    "plain": "Eq-g = MasaMolar / theta ; Neq = masa / Eq-g = moles * theta",
    "desc": "Cantidad de sustancia que equivale químicamente a 1 mol de electrones o protones en una reacción química.",
    "despejes": [
      {
        "name": "Ácidos",
        "latex": "\\theta = \\text{Número de } H^+ \\text{ transferibles (ej. } H_2SO_4: \\theta=2)"
      },
      {
        "name": "Bases / Hidróxidos",
        "latex": "\\theta = \\text{Número de } OH^- \\text{ (ej. } Al(OH)_3: \\theta=3)"
      },
      {
        "name": "Sales Neutras",
        "latex": "\\theta = (\\text{Subíndice catión}) \\times (\\text{Carga catión})"
      },
      {
        "name": "Redox",
        "latex": "\\theta = \\text{Número de electrones transferidos por molécula}"
      }
    ],
    "vars": [
      {
        "symbol": "Eq\\text{-}g",
        "name": "Masa equivalente o peso equivalente",
        "unit": "g / Eq-g"
      },
      {
        "symbol": "\\theta",
        "name": "Parámetro de valencia química",
        "unit": "Adimensional"
      }
    ],
    "datoClave": "Ley de Combinación Química de Richter: En toda reacción química completa, el número de equivalentes de los reactivos es exactamente igual al número de equivalentes de los productos.",
    "fijaUnsa": "Ley de Combinación Química de Richter: En toda reacción química completa, el número de equivalentes de los reactivos es exactamente igual al número de equivalentes de los productos.",
    "calcType": null
  },
  {
    "id": "qui_gases_universal",
    "subject": "Química",
    "topic": "Gases Ideales",
    "level": "Básica",
    "caseTag": "Ecuación de Estado PV=nRT",
    "importance": "Fundamental",
    "name": "Ecuación Universal de los Gases Ideales y Fórmula con Densidad",
    "latex": "P \\cdot V = n \\cdot R \\cdot T \\quad;\\quad P \\cdot \\bar{M} = \\rho \\cdot R \\cdot T \\quad (\\text{\"Puma = Rata\"})",
    "plain": "P*V = n*R*T ; P*MasaMolar = Densidad*R*T",
    "desc": "Relaciona presión, volumen, temperatura absoluta y moles de un gas ideal en un estado determinado.",
    "despejes": [
      {
        "name": "Con Masa y Masa Molar",
        "latex": "P \\cdot V = \\frac{m}{\\bar{M}} R \\cdot T"
      },
      {
        "name": "Constante R en atm",
        "latex": "R = 0.082 \\text{ atm}\\cdot\\text{L}/\\text{mol}\\cdot\\text{K}"
      },
      {
        "name": "Constante R en mmHg",
        "latex": "R = 62.4 \\text{ mmHg}\\cdot\\text{L}/\\text{mol}\\cdot\\text{K}"
      }
    ],
    "vars": [
      {
        "symbol": "P",
        "name": "Presión absoluta",
        "unit": "atm o mmHg"
      },
      {
        "symbol": "V",
        "name": "Volumen del gas",
        "unit": "Litros [L]"
      },
      {
        "symbol": "T",
        "name": "Temperatura absoluta (OBLIGATORIO K = °C + 273)",
        "unit": "Kelvin [K]"
      }
    ],
    "datoClave": "Mnemotecnia universal: 'Pavo = Ratón' (P*V = R*T*n) o 'Puma = Rata' (P*M = R*T*ρ). ¡La temperatura SIEMPRE debe estar en Kelvin!",
    "fijaUnsa": "Mnemotecnia universal: 'Pavo = Ratón' (P*V = R*T*n) o 'Puma = Rata' (P*M = R*T*ρ). ¡La temperatura SIEMPRE debe estar en Kelvin!",
    "calcType": "gas"
  },
  {
    "id": "qui_gases_ley_combinada",
    "subject": "Química",
    "topic": "Gases Ideales",
    "level": "Operacional",
    "caseTag": "Ley Combinada y Procesos",
    "importance": "Alta Relevancia",
    "name": "Ley Combinada de los Gases y Leyes Particulares",
    "latex": "\\frac{P_1 V_1}{T_1} = \\frac{P_2 V_2}{T_2}",
    "plain": "(P1 * V1) / T1 = (P2 * V2) / T2",
    "desc": "Modificación de un gas entre dos estados para una masa constante encerrada.",
    "despejes": [
      {
        "name": "Isotérmico (Boyle-Mariotte, T = cte)",
        "latex": "P_1 V_1 = P_2 V_2"
      },
      {
        "name": "Isobárico (Charles, P = cte)",
        "latex": "\\frac{V_1}{T_1} = \\frac{V_2}{T_2}"
      },
      {
        "name": "Isócoro (Gay-Lussac, V = cte)",
        "latex": "\\frac{P_1}{T_1} = \\frac{P_2}{T_2}"
      }
    ],
    "vars": [
      {
        "symbol": "P_1, P_2",
        "name": "Presiones inicial y final",
        "unit": "atm o mmHg"
      },
      {
        "symbol": "V_1, V_2",
        "name": "Volúmenes inicial y final",
        "unit": "L o mL"
      },
      {
        "symbol": "T_1, T_2",
        "name": "Temperaturas inicial y final",
        "unit": "Kelvin [K]"
      }
    ],
    "datoClave": "Si un gas se comprime a la mitad de su volumen a temperatura constante (proceso isotérmico de Boyle), su presión se duplica instantáneamente.",
    "fijaUnsa": "Si un gas se comprime a la mitad de su volumen a temperatura constante (proceso isotérmico de Boyle), su presión se duplica instantáneamente.",
    "calcType": null
  },
  {
    "id": "qui_gases_dalton",
    "subject": "Química",
    "topic": "Gases Ideales",
    "level": "Operacional",
    "caseTag": "Mezcla de Gases y Dalton",
    "importance": "Alta Probabilidad",
    "name": "Ley de Presiones Parciales de Dalton",
    "latex": "P_T = \\sum P_i = P_A + P_B + \\dots \\quad;\\quad P_A = X_A \\cdot P_T \\quad;\\quad X_A = \\frac{n_A}{n_T}",
    "plain": "P_total = P_A + P_B ; P_A = X_A * P_total ; X_A = n_A / n_total",
    "desc": "La presión total de una mezcla gaseosa es la suma directa de las presiones que ejercería cada componente solo.",
    "despejes": [
      {
        "name": "Suma de Fracciones Molares",
        "latex": "\\sum X_i = X_A + X_B + \\dots = 1"
      },
      {
        "name": "Masa Molar Promedio de la Mezcla",
        "latex": "\\bar{M}_{\\text{mezcla}} = X_A \\bar{M}_A + X_B \\bar{M}_B + \\dots"
      },
      {
        "name": "Porcentaje en Volumen (%V)",
        "latex": "\\%V_A = X_A \\times 100\\%"
      }
    ],
    "vars": [
      {
        "symbol": "P_T",
        "name": "Presión total de la mezcla",
        "unit": "atm o mmHg"
      },
      {
        "symbol": "P_A",
        "name": "Presión parcial del componente A",
        "unit": "atm o mmHg"
      },
      {
        "symbol": "X_A",
        "name": "Fracción molar",
        "unit": "0 ≤ X ≤ 1"
      }
    ],
    "datoClave": "La fracción molar X multiplicada por 100% es idéntica al porcentaje en volumen de ese gas: %V = X * 100%.",
    "fijaUnsa": "La fracción molar X multiplicada por 100% es idéntica al porcentaje en volumen de ese gas: %V = X * 100%.",
    "calcType": null
  },
  {
    "id": "qui_soluciones_molaridad",
    "subject": "Química",
    "topic": "Soluciones Químicas",
    "level": "Básica",
    "caseTag": "Molaridad",
    "importance": "Fundamental",
    "name": "Molaridad de una Solución Acuosa",
    "latex": "M = \\frac{n_{\\text{sto}}}{V_{\\text{sol}}(L)} = \\frac{m_{\\text{sto}}}{\\bar{M} \\cdot V_{(L)}}",
    "plain": "M = moles_soluto / Litros_solucion = masa / (MasaMolar * Litros)",
    "desc": "Concentración molar que mide los moles de soluto disueltos por cada litro de solución total.",
    "despejes": [
      {
        "name": "Masa de Soluto Necesaria",
        "latex": "m_{\\text{sto}} = M \\cdot \\bar{M} \\cdot V_{(L)}"
      },
      {
        "name": "Moles de Soluto",
        "latex": "n_{\\text{sto}} = M \\cdot V_{(L)}"
      }
    ],
    "vars": [
      {
        "symbol": "M",
        "name": "Molaridad",
        "unit": "mol / L o M"
      },
      {
        "symbol": "m_{\\text{sto}}",
        "name": "Masa de soluto",
        "unit": "Gramos [g]"
      },
      {
        "symbol": "V_{(L)}",
        "name": "Volumen de solución",
        "unit": "Litros [L]"
      }
    ],
    "datoClave": "El volumen en el denominador es siempre el volumen de la SOLUCIÓN TOTAL (soluto + solvente), expresado estrictamente en Litros.",
    "fijaUnsa": "El volumen en el denominador es siempre el volumen de la SOLUCIÓN TOTAL (soluto + solvente), expresado estrictamente en Litros.",
    "calcType": null
  },
  {
    "id": "qui_soluciones_normalidad",
    "subject": "Química",
    "topic": "Soluciones Químicas",
    "level": "Operacional",
    "caseTag": "Normalidad y θ",
    "importance": "Alta Relevancia",
    "name": "Normalidad y Fórmula con Densidad y Pureza",
    "latex": "N = M \\cdot \\theta \\quad;\\quad M = \\frac{10 \\cdot D \\cdot \\%P}{\\bar{M}}",
    "plain": "N = M * theta ; M = (10 * Densidad * %Pureza) / MasaMolar",
    "desc": "Conversión directa entre Molaridad y Normalidad (\"No Me Olvides\") y cálculo a partir de la densidad y pureza comercial.",
    "despejes": [
      {
        "name": "Relación \"No Me Olvides\"",
        "latex": "N = M \\cdot \\theta"
      },
      {
        "name": "Porcentaje en Masa",
        "latex": "\\%m/m = \\frac{m_{\\text{sto}}}{m_{\\text{sol}}} \\times 100\\%"
      }
    ],
    "vars": [
      {
        "symbol": "N",
        "name": "Normalidad",
        "unit": "Eq-g / L o N"
      },
      {
        "symbol": "D",
        "name": "Densidad de la solución",
        "unit": "g / mL"
      },
      {
        "symbol": "\\%P",
        "name": "Porcentaje de pureza en masa",
        "unit": "%"
      }
    ],
    "datoClave": "Mnemotecnia 'No Me Olvides': N = M * θ. Si tienes densidad D (en g/mL) y porcentaje de pureza %P, halla la Molaridad al instante con: M = (10 * D * %P) / MasaMolar.",
    "fijaUnsa": "Mnemotecnia 'No Me Olvides': N = M * θ. Si tienes densidad D (en g/mL) y porcentaje de pureza %P, halla la Molaridad al instante con: M = (10 * D * %P) / MasaMolar.",
    "calcType": null
  },
  {
    "id": "qui_dilucion_neutralizacion",
    "subject": "Química",
    "topic": "Soluciones Químicas",
    "level": "Operacional",
    "caseTag": "Dilución y Neutralización",
    "importance": "Alta Relevancia",
    "name": "Dilución, Mezcla y Neutralización Ácido-Base",
    "latex": "C_1 \\cdot V_1 = C_2 \\cdot V_2 \\quad;\\quad N_{\\text{ácido}} \\cdot V_{\\text{ácido}} = N_{\\text{base}} \\cdot V_{\\text{base}}",
    "plain": "C1 * V1 = C2 * V2 ; Nacido * Vacido = Nbase * Vbase",
    "desc": "Conservación de masa de soluto al añadir agua y punto de equivalencia estequiométrica en titulación ácido-base.",
    "despejes": [
      {
        "name": "Concentración de Mezcla",
        "latex": "C_{\\text{mezcla}} = \\frac{C_1 V_1 + C_2 V_2}{V_1 + V_2}"
      },
      {
        "name": "Volumen de Agua Añadido",
        "latex": "V_{\\text{agua}} = V_2 - V_1"
      }
    ],
    "vars": [
      {
        "symbol": "C_1, C_2",
        "name": "Concentraciones",
        "unit": "M o N"
      },
      {
        "symbol": "V_1, V_2",
        "name": "Volúmenes",
        "unit": "mL o L"
      }
    ],
    "datoClave": "Para neutralización ácido-base completa es obligatorio trabajar con NORMALIDAD (N): Nacido * Vacido = Nbase * Vbase. Si te dan Molaridad, multiplícala antes por θ.",
    "fijaUnsa": "Para neutralización ácido-base completa es obligatorio trabajar con NORMALIDAD (N): Nacido * Vacido = Nbase * Vbase. Si te dan Molaridad, multiplícala antes por θ.",
    "calcType": null
  },
  {
    "id": "qui_ph_poh_escala",
    "subject": "Química",
    "topic": "Ácidos y Bases",
    "level": "Básica",
    "caseTag": "Escala de pH y pOH",
    "importance": "Fundamental",
    "name": "Potencial de Hidrógeno (pH y pOH) y Producto Iónico del Agua",
    "latex": "pH = -\\log[H^+] \\quad;\\quad pOH = -\\log[OH^-] \\quad;\\quad pH + pOH = 14",
    "plain": "pH = -log[H+] ; pOH = -log[OH-] ; pH + pOH = 14",
    "desc": "Medida del grado de acidez o alcalinidad de una disolución a temperatura ambiente estándar (25 °C).",
    "despejes": [
      {
        "name": "Concentración de Iones H+",
        "latex": "[H^+] = 10^{-pH}"
      },
      {
        "name": "Concentración de Iones OH-",
        "latex": "[OH^-] = 10^{-pOH}"
      },
      {
        "name": "Producto Iónico Kw a 25 °C",
        "latex": "[H^+][OH^-] = 10^{-14}"
      }
    ],
    "vars": [
      {
        "symbol": "pH",
        "name": "Potencial de hidrógeno (0 a 14)",
        "unit": "Adimensional"
      },
      {
        "symbol": "[H^+]",
        "name": "Concentración molar de protones",
        "unit": "mol / L"
      }
    ],
    "datoClave": "A 25 °C: pH < 7 es ácido; pH = 7 es neutro; pH > 7 es básico o alcalino. Por ser escala logarítmica, una diferencia de 1 unidad de pH significa que la acidez cambió por un factor de 10.",
    "fijaUnsa": "A 25 °C: pH < 7 es ácido; pH = 7 es neutro; pH > 7 es básico o alcalino. Por ser escala logarítmica, una diferencia de 1 unidad de pH significa que la acidez cambió por un factor de 10.",
    "calcType": null
  },
  {
    "id": "qui_equilibrio_quimico",
    "subject": "Química",
    "topic": "Equilibrio Químico",
    "level": "Operacional",
    "caseTag": "Constantes Kc y Kp",
    "importance": "Alta Probabilidad",
    "name": "Constante de Equilibrio Químico (Kc y Kp)",
    "latex": "K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b} \\quad;\\quad K_p = K_c (R \\cdot T)^{\\Delta n}",
    "plain": "Kc = ([C]^c * [D]^d) / ([A]^a * [B]^b) ; Kp = Kc * (R*T)^Delta_n",
    "desc": "Ley de acción de masas en sistemas químicos reversibles en equilibrio a temperatura constante.",
    "despejes": [
      {
        "name": "Variación de Moles Gaseosos Δn",
        "latex": "\\Delta n = (c + d) - (a + b) \\quad (\\text{Solo gases})"
      },
      {
        "name": "Caso Especial Δn = 0",
        "latex": "K_p = K_c \\quad (\\text{Si no hay cambio en moles gaseosos})"
      }
    ],
    "vars": [
      {
        "symbol": "K_c",
        "name": "Constante en función de concentraciones molares",
        "unit": "Constante"
      },
      {
        "symbol": "K_p",
        "name": "Constante en función de presiones parciales",
        "unit": "Constante"
      }
    ],
    "datoClave": "En la expresión de Kc y Kp NUNCA se incluyen los sólidos puros (s) ni los líquidos puros (l); sus concentraciones se consideran constantes e iguales a 1.",
    "fijaUnsa": "En la expresión de Kc y Kp NUNCA se incluyen los sólidos puros (s) ni los líquidos puros (l); sus concentraciones se consideran constantes e iguales a 1.",
    "calcType": null
  },
  {
    "id": "qui_faraday_electrolisis",
    "subject": "Química",
    "topic": "Electroquímica",
    "level": "Operacional",
    "caseTag": "Leyes de Faraday",
    "importance": "Alta Probabilidad",
    "name": "Leyes de Faraday de la Electrólisis",
    "latex": "m = \\frac{Eq\\text{-}g \\cdot I \\cdot t}{96500} = \\frac{\\bar{M} \\cdot I \\cdot t}{\\theta \\cdot 96500} \\quad;\\quad Q = I \\cdot t",
    "plain": "m = (Eq-g * I * t) / 96500 ; Q = I * t",
    "desc": "Masa de sustancia depositada o liberada en un electrodo durante una celda electrolítica.",
    "despejes": [
      {
        "name": "1 Faraday de Carga",
        "latex": "1 \\text{ Faraday} = 96500 \\text{ Coulombs} = 1 \\text{ mol de } e^-"
      },
      {
        "name": "Carga Eléctrica Q",
        "latex": "Q = I \\cdot t \\quad (t \\text{ en segundos})"
      }
    ],
    "vars": [
      {
        "symbol": "m",
        "name": "Masa depositada en el electrodo",
        "unit": "Gramos [g]"
      },
      {
        "symbol": "I",
        "name": "Intensidad de corriente",
        "unit": "Amperios [A]"
      },
      {
        "symbol": "t",
        "name": "Tiempo de electrólisis",
        "unit": "Segundos [s]"
      }
    ],
    "datoClave": "¡El tiempo t debe colocarse OBLIGATORIAMENTE en segundos! Si te dicen 1 hora, debes reemplazar t = 3600 s.",
    "fijaUnsa": "¡El tiempo t debe colocarse OBLIGATORIAMENTE en segundos! Si te dicen 1 hora, debes reemplazar t = 3600 s.",
    "calcType": null
  },
  {
    "id": "alg_exponentes_leyes",
    "subject": "Álgebra",
    "topic": "Teoría de Exponentes",
    "level": "Básica",
    "caseTag": "Leyes Fundamentales",
    "importance": "Fundamental",
    "name": "Leyes de Exponentes y Radicales Fundamentales",
    "latex": "a^m \\cdot a^n = a^{m+n} \\quad;\\quad \\frac{a^m}{a^n} = a^{m-n} \\quad;\\quad (a^m)^n = a^{m \\cdot n} \\quad;\\quad \\sqrt[n]{a^m} = a^{\\frac{m}{n}}",
    "plain": "a^m * a^n = a^(m+n) ; a^m / a^n = a^(m-n) ; (a^m)^n = a^(m*n) ; sqrt[n](a^m) = a^(m/n)",
    "desc": "Propiedades algebraicas primarias que rigen la multiplicación, división, potenciación y radicación real.",
    "despejes": [
      {
        "name": "Exponente Negativo",
        "latex": "a^{-n} = \\frac{1}{a^n} \\quad;\\quad \\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^n"
      },
      {
        "name": "Exponente Cero",
        "latex": "a^0 = 1 \\quad (a \\ne 0)"
      },
      {
        "name": "Raíz de Raíz",
        "latex": "\\sqrt[m]{\\sqrt[n]{a}} = \\sqrt[m \\cdot n]{a}"
      }
    ],
    "vars": [
      {
        "symbol": "a, b",
        "name": "Bases algebraicas reales",
        "unit": "Reales"
      },
      {
        "symbol": "m, n",
        "name": "Exponentes e índices",
        "unit": "Enteros / Racionales"
      }
    ],
    "datoClave": "Trampa clásica: (a^m)^n es potencia de potencia (se multiplican: a^(m*n)); pero a^(m^n) es una torre de exponentes que se opera de arriba hacia abajo.",
    "fijaUnsa": "Trampa clásica: (a^m)^n es potencia de potencia (se multiplican: a^(m*n)); pero a^(m^n) es una torre de exponentes que se opera de arriba hacia abajo.",
    "calcType": null
  },
  {
    "id": "alg_prod_binomio_cuadrado",
    "subject": "Álgebra",
    "topic": "Productos Notables",
    "level": "Básica",
    "caseTag": "Binomio al Cuadrado",
    "importance": "Fundamental",
    "name": "Trinomio Cuadrado Perfecto y Diferencia de Cuadrados",
    "latex": "(a \\pm b)^2 = a^2 \\pm 2ab + b^2 \\quad;\\quad (a + b)(a - b) = a^2 - b^2",
    "plain": "(a +- b)^2 = a^2 +- 2ab + b^2 ; (a+b)(a-b) = a^2 - b^2",
    "desc": "Desarrollos cuadráticos elementales de aplicación universal en simplificación, factorización y despejes.",
    "despejes": [
      {
        "name": "Despeje de la Suma de Cuadrados",
        "latex": "a^2 + b^2 = (a + b)^2 - 2ab"
      },
      {
        "name": "Suma de Cuadrados con Resta",
        "latex": "a^2 + b^2 = (a - b)^2 + 2ab"
      }
    ],
    "vars": [
      {
        "symbol": "a, b",
        "name": "Términos algebraicos",
        "unit": "Expresiones"
      }
    ],
    "datoClave": "Si te dan como datos la suma (a + b) y el producto (a * b), halla la suma de cuadrados a² + b² elevando el binomio al cuadrado: a² + b² = (a+b)² - 2ab.",
    "fijaUnsa": "Si te dan como datos la suma (a + b) y el producto (a * b), halla la suma de cuadrados a² + b² elevando el binomio al cuadrado: a² + b² = (a+b)² - 2ab.",
    "calcType": null
  },
  {
    "id": "alg_prod_legendre",
    "subject": "Álgebra",
    "topic": "Productos Notables",
    "level": "Atajo",
    "caseTag": "Identidades de Legendre",
    "importance": "Alta Relevancia",
    "name": "Identidades de Legendre (Suma, Diferencia y 4ta Potencia)",
    "latex": "(a + b)^2 + (a - b)^2 = 2(a^2 + b^2) \\quad;\\quad (a + b)^2 - (a - b)^2 = 4ab",
    "plain": "(a+b)^2 + (a-b)^2 = 2(a^2+b^2) ; (a+b)^2 - (a-b)^2 = 4ab",
    "desc": "Reducción directa de la suma y diferencia de cuadrados de dos binomios conjugados sin expandir término a término.",
    "despejes": [
      {
        "name": "Cuarta Potencia de Legendre",
        "latex": "(a + b)^4 - (a - b)^4 = 8ab(a^2 + b^2)"
      }
    ],
    "vars": [
      {
        "symbol": "4ab",
        "name": "Resultado de la resta de cuadrados",
        "unit": "Identidad"
      }
    ],
    "datoClave": "¡Aparece constantemente en simplificación de fracciones! Si ves [(x+1)² - (x-1)²], reemplaza directamente por 4*x*1 = 4x.",
    "fijaUnsa": "¡Aparece constantemente en simplificación de fracciones! Si ves [(x+1)² - (x-1)²], reemplaza directamente por 4*x*1 = 4x.",
    "calcType": null
  },
  {
    "id": "alg_prod_cubos",
    "subject": "Álgebra",
    "topic": "Productos Notables",
    "level": "Operacional",
    "caseTag": "Cubos y Forma de Cauchy",
    "importance": "Alta Relevancia",
    "name": "Binomio al Cubo, Forma de Cauchy y Suma de Cubos",
    "latex": "(a \\pm b)^3 = a^3 \\pm b^3 \\pm 3ab(a \\pm b) \\quad;\\quad a^3 \\pm b^3 = (a \\pm b)(a^2 \\mp ab + b^2)",
    "plain": "(a +- b)^3 = a^3 +- b^3 +- 3ab(a +- b) ; a^3 +- b^3 = (a +- b)(a^2 -+ ab + b^2)",
    "desc": "Desarrollo de potencias cúbicas simplificado en su forma factorizada de Cauchy.",
    "despejes": [
      {
        "name": "Suma de Cubos Despejada",
        "latex": "a^3 + b^3 = (a + b)^3 - 3ab(a + b)"
      },
      {
        "name": "Diferencia de Cubos Despejada",
        "latex": "a^3 - b^3 = (a - b)^3 + 3ab(a - b)"
      }
    ],
    "vars": [
      {
        "symbol": "a, b",
        "name": "Términos algebraicos",
        "unit": "Polinomios"
      }
    ],
    "datoClave": "La forma semidesarrollada de Cauchy es diez veces más útil que la expandida porque permite sustituir de golpe los valores numéricos de la suma (a+b) y el producto (ab).",
    "fijaUnsa": "La forma semidesarrollada de Cauchy es diez veces más útil que la expandida porque permite sustituir de golpe los valores numéricos de la suma (a+b) y el producto (ab).",
    "calcType": null
  },
  {
    "id": "alg_condicional_oro",
    "subject": "Álgebra",
    "topic": "Productos Notables",
    "level": "Atajo",
    "caseTag": "Si a + b + c = 0",
    "importance": "Alta Relevancia",
    "name": "Identidades Condicionales Notables (Si a + b + c = 0)",
    "latex": "a^3 + b^3 + c^3 = 3abc \\quad;\\quad a^2 + b^2 + c^2 = -2(ab + bc + ca)",
    "plain": "Si a+b+c=0 ==> a^3+b^3+c^3 = 3abc ; a^2+b^2+c^2 = -2(ab+bc+ca)",
    "desc": "Propiedades algebraicas exactas que se cumplen siempre que la suma de tres cantidades es idénticamente cero.",
    "despejes": [
      {
        "name": "Quinta Potencia",
        "latex": "\\frac{a^5 + b^5 + c^5}{5} = \\left(\\frac{a^2 + b^2 + c^2}{2}\\right) \\left(\\frac{a^3 + b^3 + c^3}{3}\\right)"
      },
      {
        "name": "Identidad de Gauss",
        "latex": "a^3 + b^3 + c^3 - 3abc = (a+b+c)(a^2+b^2+c^2 - ab - bc - ca)"
      }
    ],
    "vars": [
      {
        "symbol": "a, b, c",
        "name": "Tres cantidades con suma cero",
        "unit": "Reales"
      }
    ],
    "datoClave": "💡 Regla de Oro Condicional: Siempre que veas tres cantidades cuya suma sea cero (a + b + c = 0), la suma de sus cubos es automáticamente el triple producto: a³ + b³ + c³ = 3abc. ¡Permite cancelar y simplificar expresiones complejas de inmediato!",
    "fijaUnsa": "💡 Regla de Oro Condicional: Siempre que veas tres cantidades cuya suma sea cero (a + b + c = 0), la suma de sus cubos es automáticamente el triple producto: a³ + b³ + c³ = 3abc. ¡Permite cancelar y simplificar expresiones complejas de inmediato!",
    "calcType": null
  },
  {
    "id": "alg_polinomios_propiedades",
    "subject": "Álgebra",
    "topic": "Polinomios",
    "level": "Básica",
    "caseTag": "Suma Coeficientes y Término Independiente",
    "importance": "Fundamental",
    "name": "Propiedades Notables de Polinomios y Teorema del Resto",
    "latex": "\\sum \\text{coef} = P(1) \\quad;\\quad T.I. = P(0) \\quad;\\quad \\text{Resto de } \\frac{P(x)}{ax + b} = P\\left(-\\frac{b}{a}\\right)",
    "plain": "Suma_coef = P(1) ; Termino_indep = P(0) ; Resto = P(-b/a)",
    "desc": "Evaluación de polinomios para obtener la suma de sus coeficientes, término independiente y resto de la división polinomial sin dividir.",
    "despejes": [
      {
        "name": "Suma de Coeficientes",
        "latex": "\\sum \\text{coeficientes de } P(x) = P(1)"
      },
      {
        "name": "Término Independiente",
        "latex": "T.I. = P(0)"
      },
      {
        "name": "Teorema del Resto (Descartes)",
        "latex": "\\text{Iguala divisor a cero: } ax + b = 0 \\implies x = -\\frac{b}{a} \\implies R = P(-b/a)"
      }
    ],
    "vars": [
      {
        "symbol": "P(x)",
        "name": "Polinomio algebraico",
        "unit": "Polinomio"
      },
      {
        "symbol": "R",
        "name": "Resto o residuo de la división",
        "unit": "Constante o Polinomio"
      }
    ],
    "datoClave": "Para hallar el residuo de una división entre un binomio lineal (ax + b), jamás hagas la división larga: iguala el divisor a cero (x = -b/a) y evalúa ese valor en el polinomio dividendo.",
    "fijaUnsa": "Para hallar el residuo de una división entre un binomio lineal (ax + b), jamás hagas la división larga: iguala el divisor a cero (x = -b/a) y evalúa ese valor en el polinomio dividendo.",
    "calcType": null
  },
  {
    "id": "alg_cuadratica_general",
    "subject": "Álgebra",
    "topic": "Ecuaciones Cuadráticas",
    "level": "Básica",
    "caseTag": "Fórmula General y Discriminante",
    "importance": "Fundamental",
    "name": "Fórmula General y Discriminante Cuadrático",
    "latex": "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\quad;\\quad \\Delta = b^2 - 4ac",
    "plain": "x = (-b +- sqrt(b^2 - 4ac)) / (2a) ; Delta = b^2 - 4ac",
    "desc": "Solución exacta de la ecuación ax² + bx + c = 0 (a ≠ 0) y análisis de existencia de raíces reales o complejas.",
    "despejes": [
      {
        "name": "Δ > 0",
        "latex": "\\text{Dos raíces reales y distintas}"
      },
      {
        "name": "Δ = 0",
        "latex": "\\text{Raíz real doble (Trinomio Cuadrado Perfecto): } x = -\\frac{b}{2a}"
      },
      {
        "name": "Δ < 0",
        "latex": "\\text{Dos raíces complejas conjugadas (sin solución real)}"
      }
    ],
    "vars": [
      {
        "symbol": "a, b, c",
        "name": "Coeficientes de ax² + bx + c = 0",
        "unit": "Reales"
      },
      {
        "symbol": "\\Delta",
        "name": "Discriminante",
        "unit": "Real"
      }
    ],
    "datoClave": "Si el ejercicio dice 'la ecuación tiene solución única' o 'raíces iguales', iguala de inmediato el discriminante a cero: b² - 4ac = 0.",
    "fijaUnsa": "Si el ejercicio dice 'la ecuación tiene solución única' o 'raíces iguales', iguala de inmediato el discriminante a cero: b² - 4ac = 0.",
    "calcType": "cuadratica"
  },
  {
    "id": "alg_cardano_raices",
    "subject": "Álgebra",
    "topic": "Ecuaciones Cuadráticas",
    "level": "Operacional",
    "caseTag": "Propiedades de Raíces",
    "importance": "Alta Relevancia",
    "name": "Teorema de Cardano y Reconstrucción Cuadrática",
    "latex": "x_1 + x_2 = -\\frac{b}{a} \\quad;\\quad x_1 \\cdot x_2 = \\frac{c}{a} \\quad;\\quad x^2 - S x + P = 0",
    "plain": "Suma = -b/a ; Producto = c/a ; Reconstruccion: x^2 - Sx + P = 0",
    "desc": "Relación entre las raíces de la ecuación cuadrática y sus coeficientes sin resolver la ecuación.",
    "despejes": [
      {
        "name": "Diferencia de Raíces",
        "latex": "|x_1 - x_2| = \\frac{\\sqrt{\\Delta}}{|a|}"
      },
      {
        "name": "Raíces Simétricas (Opuestas)",
        "latex": "x_1 + x_2 = 0 \\implies b = 0"
      },
      {
        "name": "Raíces Recíprocas (Inversas)",
        "latex": "x_1 \\cdot x_2 = 1 \\implies a = c"
      }
    ],
    "vars": [
      {
        "symbol": "S",
        "name": "Suma de raíces (x1 + x2)",
        "unit": "Real"
      },
      {
        "symbol": "P",
        "name": "Producto de raíces (x1 * x2)",
        "unit": "Real"
      }
    ],
    "datoClave": "Raíces simétricas significan x1 = -x2 (por tanto b = 0). Raíces recíprocas significan x1 = 1/x2 (por tanto a = c).",
    "fijaUnsa": "Raíces simétricas significan x1 = -x2 (por tanto b = 0). Raíces recíprocas significan x1 = 1/x2 (por tanto a = c).",
    "calcType": null
  },
  {
    "id": "alg_logaritmos_propiedades",
    "subject": "Álgebra",
    "topic": "Logaritmos",
    "level": "Básica",
    "caseTag": "Propiedades Canónicas",
    "importance": "Fundamental",
    "name": "Logaritmos: Definición y Propiedades de Suma y Cociente",
    "latex": "\\log_b N = x \\iff b^x = N \\quad;\\quad \\log_b(xy) = \\log_b x + \\log_b y \\quad;\\quad \\log_b\\left(\\frac{x}{y}\\right) = \\log_b x - \\log_b y",
    "plain": "log_b(N) = x <=> b^x = N ; log(xy) = log(x) + log(y) ; log(x/y) = log(x) - log(y)",
    "desc": "Función inversa de la exponencial y propiedades operacionales fundamentales de la adición y sustracción logarítmica.",
    "despejes": [
      {
        "name": "Regla del Sombrero",
        "latex": "\\log_{b^m}(x^n) = \\frac{n}{m} \\log_b x"
      },
      {
        "name": "Identidad Fundamental",
        "latex": "b^{\\log_b N} = N"
      },
      {
        "name": "Intercambio de Extremos",
        "latex": "a^{\\log_b c} = c^{\\log_b a}"
      }
    ],
    "vars": [
      {
        "symbol": "b",
        "name": "Base del logaritmo (b > 0, b ≠ 1)",
        "unit": "Real positivo"
      },
      {
        "symbol": "x, y, N",
        "name": "Argumentos estrictamente positivos",
        "unit": "Reales > 0"
      }
    ],
    "datoClave": "El argumento de un logaritmo DEBE ser siempre estrictamente mayor que cero (N > 0). Recuerda: log(A + B) NUNCA es igual a log A + log B.",
    "fijaUnsa": "El argumento de un logaritmo DEBE ser siempre estrictamente mayor que cero (N > 0). Recuerda: log(A + B) NUNCA es igual a log A + log B.",
    "calcType": null
  },
  {
    "id": "alg_logaritmos_cambio_base",
    "subject": "Álgebra",
    "topic": "Logaritmos",
    "level": "Operacional",
    "caseTag": "Cambio de Base y Cadena",
    "importance": "Alta Relevancia",
    "name": "Logaritmos: Cambio de Base y Regla de la Cadena",
    "latex": "\\log_b a = \\frac{\\log_c a}{\\log_c b} \\quad;\\quad \\log_b a \\cdot \\log_c b \\cdot \\log_d c = \\log_d a",
    "plain": "log_b(a) = log_c(a) / log_c(b) ; log_b(a) * log_c(b) = log_c(a)",
    "desc": "Herramientas para unificar bases logarítmicas heterogéneas y cancelar términos en productos encadenados.",
    "despejes": [
      {
        "name": "Inversión de Base y Argumento",
        "latex": "\\log_b a = \\frac{1}{\\log_a b}"
      },
      {
        "name": "Cologaritmo",
        "latex": "\\text{colog}_b x = -\\log_b x = \\log_b(1/x)"
      },
      {
        "name": "Antilogaritmo",
        "latex": "\\text{antilog}_b x = b^x"
      }
    ],
    "vars": [
      {
        "symbol": "c",
        "name": "Nueva base elegida para el cálculo",
        "unit": "Real > 0, ≠ 1"
      }
    ],
    "datoClave": "En la regla de la cadena, los argumentos y las bases intermedias se van simplificando diagonalmente como si fuesen fracciones algebraicas ordinarias.",
    "fijaUnsa": "En la regla de la cadena, los argumentos y las bases intermedias se van simplificando diagonalmente como si fuesen fracciones algebraicas ordinarias.",
    "calcType": null
  },
  {
    "id": "alg_progresion_aritmetica",
    "subject": "Álgebra",
    "topic": "Progresiones",
    "level": "Básica",
    "caseTag": "Progresión Aritmética",
    "importance": "Fundamental",
    "name": "Progresión Aritmética (P.A.): Término Enésimo y Suma",
    "latex": "a_n = a_1 + (n - 1)r \\quad;\\quad S_n = \\left(\\frac{a_1 + a_n}{2}\\right) n",
    "plain": "an = a1 + (n-1)*r ; Sn = ((a1 + an)/2) * n",
    "desc": "Sucesión de números donde cada término se obtiene sumando una razón constante r al término precedente.",
    "despejes": [
      {
        "name": "Razón Aritmética",
        "latex": "r = a_n - a_{n-1}"
      },
      {
        "name": "Número de Términos",
        "latex": "n = \\frac{a_n - a_1}{r} + 1"
      },
      {
        "name": "Suma con Razón",
        "latex": "S_n = \\left(\\frac{2a_1 + (n-1)r}{2}\\right) n"
      }
    ],
    "vars": [
      {
        "symbol": "a_1",
        "name": "Primer término de la P.A.",
        "unit": "Número"
      },
      {
        "symbol": "a_n",
        "name": "Término enésimo (último)",
        "unit": "Número"
      },
      {
        "symbol": "r",
        "name": "Razón aritmética constante",
        "unit": "Número"
      },
      {
        "symbol": "n",
        "name": "Cantidad total de términos",
        "unit": "Entero positivo"
      }
    ],
    "datoClave": "Si una P.A. tiene un número impar de términos, la suma de todos los términos es simplemente el término central multiplicado por n: Sn = a_central * n.",
    "fijaUnsa": "Si una P.A. tiene un número impar de términos, la suma de todos los términos es simplemente el término central multiplicado por n: Sn = a_central * n.",
    "calcType": null
  },
  {
    "id": "alg_progresion_geometrica",
    "subject": "Álgebra",
    "topic": "Progresiones",
    "level": "Operacional",
    "caseTag": "Progresión Geométrica y Suma Límite",
    "importance": "Alta Relevancia",
    "name": "Progresión Geométrica (P.G.) y Suma Límite Infinita",
    "latex": "a_n = a_1 \\cdot q^{n-1} \\quad;\\quad S_n = a_1 \\left(\\frac{q^n - 1}{q - 1}\\right) \\quad;\\quad S_\\infty = \\frac{a_1}{1 - q} \\quad (|q| < 1)",
    "plain": "an = a1 * q^(n-1) ; Sn = a1 * (q^n - 1) / (q - 1) ; S_infinito = a1 / (1 - q)",
    "desc": "Sucesión multiplicativa por una razón geométrica q y suma convergente de infinitos términos decrecientes.",
    "despejes": [
      {
        "name": "Suma Límite Infinita Convergente",
        "latex": "S_\\infty = \\frac{a_1}{1 - q} \\quad (-1 < q < 1)"
      },
      {
        "name": "Término Central para n impar",
        "latex": "a_c = \\sqrt{a_1 \\cdot a_n}"
      }
    ],
    "vars": [
      {
        "symbol": "a_1",
        "name": "Primer término",
        "unit": "Número"
      },
      {
        "symbol": "q",
        "name": "Razón geométrica multiplicativa",
        "unit": "Razón"
      },
      {
        "symbol": "S_\\infty",
        "name": "Suma límite infinita",
        "unit": "Convergente"
      }
    ],
    "datoClave": "💡 Regla Práctica en Rebotes y Series Infinitas: Si una pelota cae de altura H y rebota siempre una fracción f de su altura previa, la suma límite infinita que recorre hasta detenerse es S∞ = H · (1 + f) / (1 - f).",
    "fijaUnsa": "💡 Regla Práctica en Rebotes y Series Infinitas: Si una pelota cae de altura H y rebota siempre una fracción f de su altura previa, la suma límite infinita que recorre hasta detenerse es S∞ = H · (1 + f) / (1 - f).",
    "calcType": null
  },
  {
    "id": "ari_razones_proporciones",
    "subject": "Aritmética",
    "topic": "Razones y Proporciones",
    "level": "Básica",
    "caseTag": "Razones y Proporción Continua",
    "importance": "Fundamental",
    "name": "Razones Aritmética y Geométrica, Proporción Discreta y Continua",
    "latex": "a - b = r \\quad;\\quad \\frac{a}{b} = k \\quad;\\quad \\frac{a}{b} = \\frac{b}{c} \\implies b = \\sqrt{a \\cdot c}",
    "plain": "a - b = r ; a/b = k ; a/b = b/c ==> b = sqrt(a*c)",
    "desc": "Comparación de dos cantidades por diferencia o cociente, y cálculo de medias y terceras proporcionales.",
    "despejes": [
      {
        "name": "Media Proporcional (Proporción Continua)",
        "latex": "b = \\sqrt{a \\cdot c}"
      },
      {
        "name": "Tercera Proporcional",
        "latex": "c = \\frac{b^2}{a}"
      },
      {
        "name": "Cuarta Proporcional (Proporción Discreta)",
        "latex": "\\frac{a}{b} = \\frac{c}{d} \\implies d = \\frac{b \\cdot c}{a}"
      }
    ],
    "vars": [
      {
        "symbol": "a, b, c, d",
        "name": "Términos de la proporción",
        "unit": "Enteros / Reales"
      },
      {
        "symbol": "b",
        "name": "Media geométrica o proporcional",
        "unit": "Real"
      }
    ],
    "datoClave": "En una proporción CONTINUA los términos medios son IGUALES (a/b = b/c); en una DISCRETA los cuatro términos son completamente diferentes (a/b = c/d).",
    "fijaUnsa": "En una proporción CONTINUA los términos medios son IGUALES (a/b = b/c); en una DISCRETA los cuatro términos son completamente diferentes (a/b = c/d).",
    "calcType": null
  },
  {
    "id": "ari_promedios_completo",
    "subject": "Aritmética",
    "topic": "Promedios",
    "level": "Básica",
    "caseTag": "Medias MA, MG, MH",
    "importance": "Fundamental",
    "name": "Medias Aritmética, Geométrica y Armónica",
    "latex": "MA = \\frac{\\sum x}{n} \\quad;\\quad MG = \\sqrt[n]{\\prod x} \\quad;\\quad MH = \\frac{n}{\\sum \\frac{1}{x_i}} \\quad;\\quad MA \\ge MG \\ge MH",
    "plain": "MA = Sum x / n ; MG = n-raiz(Prod x) ; MH = n / Sum(1/x) ; MA >= MG >= MH",
    "desc": "Medidas de tendencia central para caracterizar conjuntos cuantitativos.",
    "despejes": [
      {
        "name": "Propiedad de Oro para 2 Cantidades",
        "latex": "MA \\cdot MH = MG^2 = a \\cdot b"
      },
      {
        "name": "Diferencia de las Cantidades",
        "latex": "(a - b)^2 = 4(MA^2 - MG^2)"
      },
      {
        "name": "MH para 2 Cantidades",
        "latex": "MH = \\frac{2ab}{a + b}"
      }
    ],
    "vars": [
      {
        "symbol": "MA",
        "name": "Media Aritmética (promedio regular)",
        "unit": "Media"
      },
      {
        "symbol": "MG",
        "name": "Media Geométrica (tasas de crecimiento)",
        "unit": "Media"
      },
      {
        "symbol": "MH",
        "name": "Media Armónica (promedios de rapideces)",
        "unit": "Media"
      }
    ],
    "datoClave": "Para exactamente 2 números: MA * MH = MG². Además, las tres medias solo son iguales si todos los elementos del conjunto son idénticos entre sí.",
    "fijaUnsa": "Para exactamente 2 números: MA * MH = MG². Además, las tres medias solo son iguales si todos los elementos del conjunto son idénticos entre sí.",
    "calcType": null
  },
  {
    "id": "ari_regla_tres_compuesta",
    "subject": "Aritmética",
    "topic": "Magnitudes Proporcionales",
    "level": "Operacional",
    "caseTag": "Causa-Circunstancia-Efecto",
    "importance": "Alta Relevancia",
    "name": "Regla de Tres Compuesta (Método Causa-Circunstancia-Efecto)",
    "latex": "\\frac{(\\text{Causa}) \\times (\\text{Circunstancia})}{\\text{Efecto}} = \\text{Constante}",
    "plain": "(Causa * Circunstancia) / Efecto = Constante",
    "desc": "Método unificado que resuelve cualquier problema de magnitudes proporcionales directas e inversas sin analizar regla de tres paso a paso.",
    "despejes": [
      {
        "name": "Fórmula Expandida de Obreros y Obra",
        "latex": "\\frac{(\\text{Obreros} \\times \\text{Rendimiento}) \\times (\\text{Días} \\times \\text{Horas/día})}{\\text{Obra} \\times \\text{Dificultad}} = \\text{cte}"
      },
      {
        "name": "Magnitudes Directas (D.P.)",
        "latex": "\\frac{A}{B} = k \\quad (\\text{Línea recta})"
      },
      {
        "name": "Magnitudes Inversas (I.P.)",
        "latex": "A \\cdot B = k \\quad (\\text{Hipérbola equilátera})"
      }
    ],
    "vars": [
      {
        "symbol": "\\text{Causa}",
        "name": "Agentes que realizan el trabajo (obreros, máquinas, operarios)",
        "unit": "Cantidad"
      },
      {
        "symbol": "\\text{Circunstancia}",
        "name": "Condiciones temporales (días, horas por día, eficiencia)",
        "unit": "Tiempo"
      },
      {
        "symbol": "\\text{Efecto}",
        "name": "El resultado final producido (metros de zanja, dificultad)",
        "unit": "Obra"
      }
    ],
    "datoClave": "Solo divide entre la OBRA y la DIFICULTAD. Todo lo demás (obreros, días, horas/día, rendimiento) va siempre MULTIPLICADO en el numerador.",
    "fijaUnsa": "Solo divide entre la OBRA y la DIFICULTAD. Todo lo demás (obreros, días, horas/día, rendimiento) va siempre MULTIPLICADO en el numerador.",
    "calcType": null
  },
  {
    "id": "ari_porcentajes_comercial",
    "subject": "Aritmética",
    "topic": "Tanto por Ciento",
    "level": "Básica",
    "caseTag": "Comercio, Ganancia y Descuentos",
    "importance": "Fundamental",
    "name": "Aplicaciones Comerciales del Tanto por Ciento",
    "latex": "P_v = P_c + G \\quad;\\quad P_v = P_c - P \\quad;\\quad P_f = P_v + D",
    "plain": "Pv = Pc + Ganancia ; Pv = Pc - Perdida ; Pfijado = Pv + Descuento",
    "desc": "Ecuaciones rectoras del comercio para fijación de precios, ganancias, pérdidas y rebajas.",
    "despejes": [
      {
        "name": "Descuento Único para d1 y d2 sucesivos",
        "latex": "D_U = \\left(d_1 + d_2 - \\frac{d_1 \\cdot d_2}{100}\\right)\\%"
      },
      {
        "name": "Aumento Único para a1 y a2 sucesivos",
        "latex": "A_U = \\left(a_1 + a_2 + \\frac{a_1 \\cdot a_2}{100}\\right)\\%"
      },
      {
        "name": "Ganancia Neta",
        "latex": "G_{\\text{neta}} = G_{\\text{bruta}} - \\text{Gastos}"
      }
    ],
    "vars": [
      {
        "symbol": "P_v",
        "name": "Precio de venta al público",
        "unit": "Soles [S/.]"
      },
      {
        "symbol": "P_c",
        "name": "Precio de costo del comerciante",
        "unit": "Soles [S/.]"
      },
      {
        "symbol": "P_f",
        "name": "Precio fijado o de lista de catálogo",
        "unit": "Soles [S/.]"
      },
      {
        "symbol": "G, D",
        "name": "Ganancia y Descuento comercial",
        "unit": "Soles [S/.]"
      }
    ],
    "datoClave": "Por defecto, la ganancia G siempre se calcula como un porcentaje del precio de COSTO (Pc), a menos que el problema diga explícitamente 'ganancia sobre el precio de venta'.",
    "fijaUnsa": "Por defecto, la ganancia G siempre se calcula como un porcentaje del precio de COSTO (Pc), a menos que el problema diga explícitamente 'ganancia sobre el precio de venta'.",
    "calcType": null
  },
  {
    "id": "ari_interes_simple",
    "subject": "Aritmética",
    "topic": "Regla de Interés",
    "level": "Básica",
    "caseTag": "Interés Simple",
    "importance": "Fundamental",
    "name": "Interés Simple y Monto Final",
    "latex": "I = \\frac{C \\cdot r \\cdot t}{\\text{base}} \\quad;\\quad M = C + I",
    "plain": "I = (C * r * t) / base ; Monto = C + I",
    "desc": "Rendimiento financiero producido por un capital colocado a una tasa de interés constante no acumulativa.",
    "despejes": [
      {
        "name": "Base si t está en Años",
        "latex": "I = \\frac{C \\cdot r \\cdot t}{100}"
      },
      {
        "name": "Base si t está en Meses",
        "latex": "I = \\frac{C \\cdot r \\cdot t}{1200}"
      },
      {
        "name": "Base si t está en Días comerciales",
        "latex": "I = \\frac{C \\cdot r \\cdot t}{36000}"
      }
    ],
    "vars": [
      {
        "symbol": "I",
        "name": "Interés simple generado",
        "unit": "Soles [S/.]"
      },
      {
        "symbol": "C",
        "name": "Capital inicial depositado",
        "unit": "Soles [S/.]"
      },
      {
        "symbol": "r",
        "name": "Tasa anual de interés porcentual",
        "unit": "% anual"
      },
      {
        "symbol": "t",
        "name": "Tiempo transcurrido",
        "unit": "Años, meses o días"
      }
    ],
    "datoClave": "La tasa r DEBE ser anual. Si te dan tasa semestral multiplícala por 2; si es trimestral por 4; si es mensual por 12.",
    "fijaUnsa": "La tasa r DEBE ser anual. Si te dan tasa semestral multiplícala por 2; si es trimestral por 4; si es mensual por 12.",
    "calcType": null
  },
  {
    "id": "ari_divisibilidad_mcd_mcm",
    "subject": "Aritmética",
    "topic": "Teoría de Números",
    "level": "Operacional",
    "caseTag": "MCD, MCM y Cantidad de Divisores",
    "importance": "Alta Relevancia",
    "name": "Descomposición Canónica, Cantidad de Divisores y Propiedad de MCD/MCM",
    "latex": "CD(N) = (\\alpha + 1)(\\beta + 1)(\\gamma + 1) \\quad;\\quad A \\cdot B = \\text{MCD}(A,B) \\cdot \\text{MCM}(A,B)",
    "plain": "CD(N) = (a+1)(b+1)(c+1) ; A * B = MCD * MCM",
    "desc": "Propiedades del teorema fundamental de la aritmética y relación canónica entre el producto de dos números y su MCD y MCM.",
    "despejes": [
      {
        "name": "Divisores Totales",
        "latex": "CD(N) = 1 + CD_{\\text{primos}} + CD_{\\text{compuestos}}"
      },
      {
        "name": "Suma de Divisores",
        "latex": "SD(N) = \\left(\\frac{A^{\\alpha+1}-1}{A-1}\\right)\\left(\\frac{B^{\\beta+1}-1}{B-1}\\right)"
      },
      {
        "name": "Con Factores PESI",
        "latex": "A = d \\cdot p \\quad;\\quad B = d \\cdot q \\implies \\text{MCM} = d \\cdot p \\cdot q"
      }
    ],
    "vars": [
      {
        "symbol": "N = A^\\alpha B^\\beta",
        "name": "Descomposición en factores primos",
        "unit": "Entero"
      },
      {
        "symbol": "CD",
        "name": "Cantidad total de divisores positivos",
        "unit": "Entero"
      }
    ],
    "datoClave": "El producto de dos números enteros A y B es EXACTAMENTE igual al producto de su MCD por su MCM: A * B = MCD * MCM.",
    "fijaUnsa": "El producto de dos números enteros A y B es EXACTAMENTE igual al producto de su MCD por su MCM: A * B = MCD * MCM.",
    "calcType": null
  },
  {
    "id": "ari_conjuntos_cardinal",
    "subject": "Aritmética",
    "topic": "Teoría de Conjuntos",
    "level": "Básica",
    "caseTag": "Cardinales y Conjunto Potencia",
    "importance": "Fundamental",
    "name": "Cardinal de la Unión y Subconjuntos (Potencia)",
    "latex": "n(A \\cup B) = n(A) + n(B) - n(A \\cap B) \\quad;\\quad n(P(A)) = 2^{n(A)}",
    "plain": "n(A U B) = n(A) + n(B) - n(A n B) ; n(P(A)) = 2^n(A)",
    "desc": "Conteo elemental de elementos en teoría de conjuntos finitos y número de subconjuntos posibles.",
    "despejes": [
      {
        "name": "Subconjuntos Propios",
        "latex": "n(P(A)) - 1 = 2^{n(A)} - 1"
      },
      {
        "name": "Unión de Tres Conjuntos",
        "latex": "n(A \\cup B \\cup C) = n(A)+n(B)+n(C) - [n(A\\cap B)+n(B\\cap C)+n(A\\cap C)] + n(A\\cap B\\cap C)"
      }
    ],
    "vars": [
      {
        "symbol": "n(A)",
        "name": "Cardinal del conjunto (número de elementos)",
        "unit": "Entero"
      },
      {
        "symbol": "n(P(A))",
        "name": "Cantidad de subconjuntos",
        "unit": "Entero"
      }
    ],
    "datoClave": "Si un conjunto tiene n elementos, la cantidad de subconjuntos PROPIOS es 2^n - 1 (se resta 1 porque no se cuenta a sí mismo).",
    "fijaUnsa": "Si un conjunto tiene n elementos, la cantidad de subconjuntos PROPIOS es 2^n - 1 (se resta 1 porque no se cuenta a sí mismo).",
    "calcType": null
  },
  {
    "id": "geo_angulos_paralelas",
    "subject": "Geometría",
    "topic": "Ángulos",
    "level": "Básica",
    "caseTag": "Regla del Serrucho y Suplementarios",
    "importance": "Fundamental",
    "name": "Ángulos Suplementarios, Complementarios y Regla del Serrucho",
    "latex": "\\alpha + \\beta = 90^\\circ \\quad;\\quad \\alpha + \\theta = 180^\\circ \\quad;\\quad \\sum \\alpha_{\\text{izquierda}} = \\sum \\beta_{\\text{derecha}}",
    "plain": "alfa + beta = 90 ; alfa + theta = 180 ; Sum alfa_izq = Sum beta_der",
    "desc": "Relaciones angulares entre rectas paralelas cortadas por secantes transversales.",
    "despejes": [
      {
        "name": "Regla del Serrucho",
        "latex": "x + y = \\alpha + \\beta + \\theta"
      },
      {
        "name": "Ángulos Conjugados Internos",
        "latex": "\\alpha + \\beta = 180^\\circ"
      }
    ],
    "vars": [
      {
        "symbol": "\\alpha, \\beta",
        "name": "Medidas angulares",
        "unit": "Grados [^\\circ]"
      }
    ],
    "datoClave": "En la regla del serrucho entre dos rectas paralelas, la suma de los ángulos agudos que apuntan hacia la izquierda es idéntica a la suma de los que apuntan hacia la derecha.",
    "fijaUnsa": "En la regla del serrucho entre dos rectas paralelas, la suma de los ángulos agudos que apuntan hacia la izquierda es idéntica a la suma de los que apuntan hacia la derecha.",
    "calcType": null
  },
  {
    "id": "geo_triangulos_fundamentales",
    "subject": "Geometría",
    "topic": "Triángulos",
    "level": "Básica",
    "caseTag": "Suma Interna y Ángulo Exterior",
    "importance": "Fundamental",
    "name": "Propiedades Fundamentales del Triángulo (Suma Interna, Bumerán y Pescadito)",
    "latex": "\\alpha + \\beta + \\theta = 180^\\circ \\quad;\\quad x = \\alpha + \\beta \\quad;\\quad x_{\\text{bumerán}} = \\alpha + \\beta + \\theta",
    "plain": "alfa + beta + theta = 180 ; x = alfa + beta ; x_bumeran = alfa + beta + theta",
    "desc": "Axiomas angulares del triángulo euclidiano plano y figuras auxiliares notables de examen.",
    "despejes": [
      {
        "name": "Propiedad del Bumerán",
        "latex": "x = \\alpha + \\beta + \\theta"
      },
      {
        "name": "Propiedad del Pescadito",
        "latex": "\\alpha + \\beta = x + y"
      },
      {
        "name": "Desigualdad Triangular (Existencia)",
        "latex": "|a - b| < c < a + b"
      }
    ],
    "vars": [
      {
        "symbol": "\\alpha, \\beta, \\theta",
        "name": "Ángulos interiores del triángulo",
        "unit": "Grados [^\\circ]"
      },
      {
        "symbol": "x",
        "name": "Ángulo exterior opuesto",
        "unit": "Grados [^\\circ]"
      }
    ],
    "datoClave": "Todo ángulo exterior de un triángulo es igual a la suma de los dos ángulos interiores no adyacentes a él: x = α + β.",
    "fijaUnsa": "Todo ángulo exterior de un triángulo es igual a la suma de los dos ángulos interiores no adyacentes a él: x = α + β.",
    "calcType": null
  },
  {
    "id": "geo_semejanza_thales",
    "subject": "Geometría",
    "topic": "Semejanza y Congruencia",
    "level": "Operacional",
    "caseTag": "Teorema de Thales y Bisectriz",
    "importance": "Alta Probabilidad",
    "name": "Teorema de Thales y Teorema de la Bisectriz Interior",
    "latex": "\\frac{a}{b} = \\frac{c}{d} \\quad;\\quad \\frac{a}{c} = \\frac{m}{n} \\quad;\\quad x^2 = a \\cdot c - m \\cdot n",
    "plain": "a / b = c / d ; a / c = m / n ; x^2 = a*c - m*n",
    "desc": "Proporcionalidad métrica generada por haces de rectas paralelas y por la ceviana bisectriz interior.",
    "despejes": [
      {
        "name": "Teorema de la Bisectriz Interior",
        "latex": "\\frac{a}{c} = \\frac{m}{n}"
      },
      {
        "name": "Longitud de la Bisectriz Interior x",
        "latex": "x^2 = a \\cdot c - m \\cdot n"
      },
      {
        "name": "Relación de Áreas en Triángulos Semejantes",
        "latex": "\\frac{A_1}{A_2} = \\left(\\frac{L_1}{L_2}\\right)^2"
      }
    ],
    "vars": [
      {
        "symbol": "a, c",
        "name": "Lados concurrentes del vértice de la bisectriz",
        "unit": "Longitud"
      },
      {
        "symbol": "m, n",
        "name": "Segmentos determinados en la base",
        "unit": "Longitud"
      }
    ],
    "datoClave": "Si dos triángulos son semejantes con razón de lados k, la razón de sus perímetros es k, pero la razón de sus ÁREAS es el cuadrado: k².",
    "fijaUnsa": "Si dos triángulos son semejantes con razón de lados k, la razón de sus perímetros es k, pero la razón de sus ÁREAS es el cuadrado: k².",
    "calcType": null
  },
  {
    "id": "geo_relaciones_metricas_rectangulo",
    "subject": "Geometría",
    "topic": "Relaciones Métricas",
    "level": "Básica",
    "caseTag": "Triángulo Rectángulo",
    "importance": "Fundamental",
    "name": "Teorema de Pitágoras y Relaciones Métricas Rectangulares",
    "latex": "c^2 = a^2 + b^2 \\quad;\\quad h^2 = m \\cdot n \\quad;\\quad a^2 = c \\cdot m \\quad;\\quad a \\cdot b = c \\cdot h",
    "plain": "c^2 = a^2 + b^2 ; h^2 = m * n ; a^2 = c * m ; a * b = c * h",
    "desc": "Cinco relaciones métricas canónicas en el triángulo rectángulo con la altura relativa a la hipotenusa trazada.",
    "despejes": [
      {
        "name": "Inversa de los Cuadrados de los Catetos",
        "latex": "\\frac{1}{h^2} = \\frac{1}{a^2} + \\frac{1}{b^2}"
      },
      {
        "name": "Hipotenusa como Suma de Proyecciones",
        "latex": "c = m + n"
      }
    ],
    "vars": [
      {
        "symbol": "c",
        "name": "Hipotenusa",
        "unit": "Unidades [u]"
      },
      {
        "symbol": "a, b",
        "name": "Catetos",
        "unit": "Unidades [u]"
      },
      {
        "symbol": "h",
        "name": "Altura relativa a la hipotenusa",
        "unit": "Unidades [u]"
      },
      {
        "symbol": "m, n",
        "name": "Proyecciones de los catetos",
        "unit": "Unidades [u]"
      }
    ],
    "datoClave": "¡Fórmula salvavidas de examen! 1/h² = 1/a² + 1/b² permite hallar la altura h directamente conociendo solo los dos catetos, sin calcular la hipotenusa.",
    "fijaUnsa": "¡Fórmula salvavidas de examen! 1/h² = 1/a² + 1/b² permite hallar la altura h directamente conociendo solo los dos catetos, sin calcular la hipotenusa.",
    "calcType": "pitagoras"
  },
  {
    "id": "geo_poncelet_pitot",
    "subject": "Geometría",
    "topic": "Relaciones Métricas",
    "level": "Operacional",
    "caseTag": "Teoremas de Poncelet y Pitot",
    "importance": "Alta Relevancia",
    "name": "Teoremas de Poncelet (Inradio) y Teorema de Pitot",
    "latex": "a + b = c + 2r \\quad (\\text{Poncelet}) \\quad;\\quad a + c = b + d \\quad (\\text{Pitot})",
    "plain": "a + b = c + 2r ; a + c = b + d",
    "desc": "Propiedades métricas de figuras con circunferencias inscritas.",
    "despejes": [
      {
        "name": "Teorema de Poncelet en Triángulo Rectángulo",
        "latex": "\\text{Cateto}_1 + \\text{Cateto}_2 = \\text{Hipotenusa} + 2(\\text{Inradio})"
      },
      {
        "name": "Teorema de Pitot en Cuadrilátero Circunscrito",
        "latex": "\\text{Suma de lados opuestos son iguales: } a + c = b + d"
      }
    ],
    "vars": [
      {
        "symbol": "r",
        "name": "Inradio (radio del círculo inscrito)",
        "unit": "Unidades [u]"
      },
      {
        "symbol": "c",
        "name": "Hipotenusa",
        "unit": "Unidades [u]"
      }
    ],
    "datoClave": "Si tienes un triángulo rectángulo con catetos conocidos (ej. 6 y 8, hipotenusa 10), el inradio se halla al instante con Poncelet: 6 + 8 = 10 + 2r ==> r = 2.",
    "fijaUnsa": "Si tienes un triángulo rectángulo con catetos conocidos (ej. 6 y 8, hipotenusa 10), el inradio se halla al instante con Poncelet: 6 + 8 = 10 + 2r ==> r = 2.",
    "calcType": null
  },
  {
    "id": "geo_cuerdas_tangentes",
    "subject": "Geometría",
    "topic": "Relaciones Métricas",
    "level": "Operacional",
    "caseTag": "Cuerdas, Secantes y Tangentes",
    "importance": "Alta Probabilidad",
    "name": "Relaciones Métricas en la Circunferencia (Cuerdas y Tangente)",
    "latex": "P A \\cdot P B = P C \\cdot P D \\quad;\\quad P T^2 = P A \\cdot P B",
    "plain": "PA * PB = PC * PD ; PT^2 = PA * PB",
    "desc": "Teorema de las cuerdas que se cortan en un punto interior y teorema de la tangente desde un punto exterior.",
    "despejes": [
      {
        "name": "Teorema de las Cuerdas",
        "latex": "a \\cdot b = c \\cdot d"
      },
      {
        "name": "Teorema de la Tangente",
        "latex": "T^2 = a \\cdot b \\quad (\\text{Secante total } a \\times \\text{ parte externa } b)"
      }
    ],
    "vars": [
      {
        "symbol": "PT",
        "name": "Longitud del segmento tangente",
        "unit": "Unidades [u]"
      },
      {
        "symbol": "PA, PB",
        "name": "Segmentos de cuerda o secante",
        "unit": "Unidades [u]"
      }
    ],
    "datoClave": "En el teorema de la tangente, PT² es igual a la secante TOTAL multiplicada únicamente por su parte EXTERNA, nunca por la interna.",
    "fijaUnsa": "En el teorema de la tangente, PT² es igual a la secante TOTAL multiplicada únicamente por su parte EXTERNA, nunca por la interna.",
    "calcType": null
  },
  {
    "id": "geo_poligonos_diagonales",
    "subject": "Geometría",
    "topic": "Polígonos",
    "level": "Básica",
    "caseTag": "Ángulos y Diagonales",
    "importance": "Fundamental",
    "name": "Polígonos Regulares: Suma de Ángulos y Número de Diagonales",
    "latex": "S_i = 180^\\circ(n - 2) \\quad;\\quad N_D = \\frac{n(n - 3)}{2} \\quad;\\quad \\theta_i = \\frac{180^\\circ(n - 2)}{n}",
    "plain": "Si = 180*(n-2) ; ND = n*(n-3)/2 ; theta_int = 180*(n-2)/n",
    "desc": "Cálculo de la suma de ángulos internos, ángulo interior regular y número total de diagonales de un polígono de n lados.",
    "despejes": [
      {
        "name": "Ángulo Exterior y Central",
        "latex": "\\theta_e = \\theta_c = \\frac{360^\\circ}{n}"
      },
      {
        "name": "Diagonales desde un solo vértice",
        "latex": "d_v = n - 3"
      }
    ],
    "vars": [
      {
        "symbol": "n",
        "name": "Número de lados o vértices del polígono",
        "unit": "Entero ≥ 3"
      },
      {
        "symbol": "N_D",
        "name": "Número total de diagonales trazables",
        "unit": "Entero"
      }
    ],
    "datoClave": "En todo polígono convexo, la suma de ángulos EXTERIORES siempre es exactamente 360°, sin importar cuántos lados tenga el polígono.",
    "fijaUnsa": "En todo polígono convexo, la suma de ángulos EXTERIORES siempre es exactamente 360°, sin importar cuántos lados tenga el polígono.",
    "calcType": null
  },
  {
    "id": "geo_areas_triangulares",
    "subject": "Geometría",
    "topic": "Áreas de Regiones Planas",
    "level": "Básica",
    "caseTag": "Área Triangular, Herón e Inradio",
    "importance": "Fundamental",
    "name": "Áreas Triangulares (Básica, Herón, Trigonométrica, Inradio y Circunradio)",
    "latex": "A = \\frac{b \\cdot h}{2} = \\sqrt{p(p-a)(p-b)(p-c)} = \\frac{a b \\sin\\theta}{2} = p \\cdot r = \\frac{abc}{4R}",
    "plain": "A = b*h/2 = sqrt(p(p-a)(p-b)(p-c)) = (a*b*sin(theta))/2 = p*r = (a*b*c)/(4R)",
    "desc": "Compendio completo de las cinco fórmulas equivalentes para calcular el área de cualquier triángulo según los datos disponibles.",
    "despejes": [
      {
        "name": "Triángulo Equilátero",
        "latex": "A_{\\text{equilátero}} = \\frac{L^2 \\sqrt{3}}{4} = \\frac{h^2 \\sqrt{3}}{3}"
      },
      {
        "name": "Fórmula de Herón (Conociendo los 3 lados)",
        "latex": "A = \\sqrt{p(p-a)(p-b)(p-c)} \\quad \\left(p = \\frac{a+b+c}{2}\\right)"
      },
      {
        "name": "Con Inradio r",
        "latex": "A = p \\cdot r"
      },
      {
        "name": "Con Circunradio R",
        "latex": "A = \\frac{a \\cdot b \\cdot c}{4R}"
      }
    ],
    "vars": [
      {
        "symbol": "p",
        "name": "Semiperímetro (a + b + c) / 2",
        "unit": "Unidades [u]"
      },
      {
        "symbol": "r",
        "name": "Inradio (radio del círculo inscrito)",
        "unit": "Unidades [u]"
      },
      {
        "symbol": "R",
        "name": "Circunradio (círculo circunscrito)",
        "unit": "Unidades [u]"
      }
    ],
    "datoClave": "Para un triángulo equilátero de lado L, su área es siempre L²√3 / 4. Si te dan su altura h, el área se calcula directo con h²√3 / 3.",
    "fijaUnsa": "Para un triángulo equilátero de lado L, su área es siempre L²√3 / 4. Si te dan su altura h, el área se calcula directo con h²√3 / 3.",
    "calcType": null
  },
  {
    "id": "geo_areas_cuadrangulares",
    "subject": "Geometría",
    "topic": "Áreas de Regiones Planas",
    "level": "Básica",
    "caseTag": "Cuadrados, Rombos y Trapecios",
    "importance": "Fundamental",
    "name": "Áreas de Cuadriláteros (Cuadrado, Rombo y Trapecio)",
    "latex": "A_{\\text{cuadrado}} = L^2 = \\frac{d^2}{2} \\quad;\\quad A_{\\text{rombo}} = \\frac{D \\cdot d}{2} \\quad;\\quad A_{\\text{trapecio}} = \\left(\\frac{B + b}{2}\\right) h",
    "plain": "A_cuadrado = L^2 = d^2 / 2 ; A_rombo = (D*d)/2 ; A_trapecio = ((B+b)/2) * h",
    "desc": "Cálculo directo del área superficial de polígonos de 4 lados regulares y convexos.",
    "despejes": [
      {
        "name": "Cuadrado por Diagonal",
        "latex": "A = \\frac{d^2}{2}"
      },
      {
        "name": "Trapecio con Mediana M",
        "latex": "A = M \\cdot h \\quad \\left(M = \\frac{B+b}{2}\\right)"
      },
      {
        "name": "Paralelogramo General",
        "latex": "A = b \\cdot h = a \\cdot b \\cdot \\sin\\theta"
      }
    ],
    "vars": [
      {
        "symbol": "D, d",
        "name": "Diagonales mayor y menor",
        "unit": "Longitud"
      },
      {
        "symbol": "B, b",
        "name": "Bases mayor y menor",
        "unit": "Longitud"
      }
    ],
    "datoClave": "Si te dan la diagonal d de un cuadrado (ej. 10 cm), no halles el lado con Pitágoras: el área es simplemente la diagonal al cuadrado sobre 2 (10²/2 = 50 cm²).",
    "fijaUnsa": "Si te dan la diagonal d de un cuadrado (ej. 10 cm), no halles el lado con Pitágoras: el área es simplemente la diagonal al cuadrado sobre 2 (10²/2 = 50 cm²).",
    "calcType": null
  },
  {
    "id": "geo_areas_circulares",
    "subject": "Geometría",
    "topic": "Áreas Circulares",
    "level": "Básica",
    "caseTag": "Círculo y Corona Circular",
    "importance": "Fundamental",
    "name": "Áreas Circulares: Círculo, Corona y Sector Circular",
    "latex": "A_{\\text{círculo}} = \\pi R^2 \\quad;\\quad A_{\\text{corona}} = \\pi(R^2 - r^2) = \\pi\\left(\\frac{AB}{2}\\right)^2",
    "plain": "A_circulo = pi*R^2 ; A_corona = pi*(R^2 - r^2) = pi*(AB/2)^2",
    "desc": "Área de figuras circulares planas y atajo con cuerda tangente para coronas concéntricas.",
    "despejes": [
      {
        "name": "Corona Circular con Cuerda Tangente AB",
        "latex": "A_{\\text{corona}} = \\pi \\left(\\frac{AB}{2}\\right)^2"
      },
      {
        "name": "Sector Circular en Grados",
        "latex": "A_{\\text{sector}} = \\frac{\\pi R^2 \\theta^\\circ}{360^\\circ}"
      },
      {
        "name": "Longitud de Circunferencia",
        "latex": "C = 2\\pi R"
      }
    ],
    "vars": [
      {
        "symbol": "R, r",
        "name": "Radios mayor y menor",
        "unit": "Unidades [u]"
      },
      {
        "symbol": "AB",
        "name": "Longitud de cuerda tangente al círculo menor",
        "unit": "Unidades [u]"
      }
    ],
    "datoClave": "Si te dan la cuerda AB tangente al círculo menor en una corona circular, el área de la corona se calcula en un segundo con A = π*(AB/2)², sin conocer ninguno de los dos radios.",
    "fijaUnsa": "Si te dan la cuerda AB tangente al círculo menor en una corona circular, el área de la corona se calcula en un segundo con A = π*(AB/2)², sin conocer ninguno de los dos radios.",
    "calcType": null
  },
  {
    "id": "geo_espacio_solidos",
    "subject": "Geometría",
    "topic": "Geometría del Espacio",
    "level": "Operacional",
    "caseTag": "Volúmenes del Espacio",
    "importance": "Alta Probabilidad",
    "name": "Volúmenes y Áreas de Cuerpos Redondos (Cilindro, Cono y Esfera)",
    "latex": "V_{\\text{cilindro}} = \\pi R^2 h \\quad;\\quad V_{\\text{cono}} = \\frac{1}{3}\\pi R^2 h \\quad;\\quad V_{\\text{esfera}} = \\frac{4}{3}\\pi R^3",
    "plain": "V_cilindro = pi*R^2*h ; V_cono = (1/3)*pi*R^2*h ; V_esfera = (4/3)*pi*R^3",
    "desc": "Cálculo del volumen tridimensional y áreas de los sólidos de revolución fundamentales.",
    "despejes": [
      {
        "name": "Área Superficial de la Esfera",
        "latex": "A_{\\text{esfera}} = 4\\pi R^2"
      },
      {
        "name": "Área Lateral del Cono",
        "latex": "A_{\\text{lat}} = \\pi R g \\quad (g = \\sqrt{R^2 + h^2})"
      },
      {
        "name": "Área Lateral del Cilindro",
        "latex": "A_{\\text{lat}} = 2\\pi R h"
      },
      {
        "name": "Teorema de Euler (Poliedros)",
        "latex": "C + V = A + 2 \\quad (\\text{Caras + Vértices = Aristas + 2})"
      }
    ],
    "vars": [
      {
        "symbol": "R",
        "name": "Radio del sólido",
        "unit": "Unidades [u]"
      },
      {
        "symbol": "h",
        "name": "Altura perpendicular",
        "unit": "Unidades [u]"
      },
      {
        "symbol": "g",
        "name": "Generatriz inclinada del cono",
        "unit": "Unidades [u]"
      }
    ],
    "datoClave": "Relación de Arquímedes: Para un cono, una semiesfera y un cilindro que comparten igual radio y altura (h = R), sus volúmenes están exactamente en la proporción 1 : 2 : 3.",
    "fijaUnsa": "Relación de Arquímedes: Para un cono, una semiesfera y un cilindro que comparten igual radio y altura (h = R), sus volúmenes están exactamente en la proporción 1 : 2 : 3.",
    "calcType": null
  },
  {
    "id": "tri_soh_cah_toa",
    "subject": "Trigonometría",
    "topic": "Razones Trigonométricas",
    "level": "Básica",
    "caseTag": "SOH CAH TOA en Triángulo Rectángulo",
    "importance": "Fundamental",
    "name": "Definición Básica de Razones Trigonométricas (\"SOH CAH TOA\")",
    "latex": "\\sin\\theta = \\frac{CO}{H} \\quad;\\quad \\cos\\theta = \\frac{CA}{H} \\quad;\\quad \\tan\\theta = \\frac{CO}{CA} \\quad;\\quad \\cot\\theta = \\frac{CA}{CO}",
    "plain": "sin = CO / H ; cos = CA / H ; tan = CO / CA ; cot = CA / CO",
    "desc": "Cocientes directos entre los lados de un triángulo rectángulo respecto a un ángulo agudo θ.",
    "despejes": [
      {
        "name": "Secante y Cosecante",
        "latex": "\\sec\\theta = \\frac{H}{CA} \\quad;\\quad \\csc\\theta = \\frac{H}{CO}"
      },
      {
        "name": "Co-Razones Complementarias (α + β = 90°)",
        "latex": "\\sin\\alpha = \\cos\\beta \\quad;\\quad \\tan\\alpha = \\cot\\beta \\quad;\\quad \\sec\\alpha = \\csc\\beta"
      }
    ],
    "vars": [
      {
        "symbol": "CO",
        "name": "Cateto Opuesto al ángulo θ",
        "unit": "Longitud"
      },
      {
        "symbol": "CA",
        "name": "Cateto Adyacente al ángulo θ",
        "unit": "Longitud"
      },
      {
        "symbol": "H",
        "name": "Hipotenusa mayor del triángulo",
        "unit": "Longitud"
      }
    ],
    "datoClave": "Mnemotecnia clásica 'SOH CAH TOA': Seno = Opuesto/Hipotenusa; Coseno = Adyacente/Hipotenusa; Tangente = Opuesto/Adyacente.",
    "fijaUnsa": "Mnemotecnia clásica 'SOH CAH TOA': Seno = Opuesto/Hipotenusa; Coseno = Adyacente/Hipotenusa; Tangente = Opuesto/Adyacente.",
    "calcType": null
  },
  {
    "id": "tri_triangulos_notables",
    "subject": "Trigonometría",
    "topic": "Razones Trigonométricas",
    "level": "Básica",
    "caseTag": "Triángulos Notables Canónicos",
    "importance": "Fundamental",
    "name": "Triángulos Notables Fundamentales (45°, 30°-60°, 37°-53°)",
    "latex": "\\sin 30^\\circ = \\frac{1}{2} \\quad;\\quad \\sin 45^\\circ = \\frac{\\sqrt{2}}{2} \\quad;\\quad \\sin 37^\\circ = \\frac{3}{5} \\quad;\\quad \\tan 45^\\circ = 1",
    "plain": "sin(30)=1/2 ; sin(45)=sqrt(2)/2 ; sin(37)=3/5 ; tan(45)=1",
    "desc": "Valores exactos y aproximados de las razones trigonométricas de los ángulos notables requeridos en admisión.",
    "despejes": [
      {
        "name": "Triángulo 45° - 45°",
        "latex": "\\text{Catetos: } 1, 1 \\quad;\\quad \\text{Hipotenusa: } \\sqrt{2}"
      },
      {
        "name": "Triángulo 30° - 60°",
        "latex": "\\text{Catetos: } 1, \\sqrt{3} \\quad;\\quad \\text{Hipotenusa: } 2"
      },
      {
        "name": "Triángulo Notable 37° - 53° (Proporción 3k-4k-5k)",
        "latex": "\\text{Catetos: } 3, 4 \\quad;\\quad \\text{Hipotenusa: } 5"
      },
      {
        "name": "Triángulo 16° - 74°",
        "latex": "\\text{Catetos: } 7, 24 \\quad;\\quad \\text{Hipotenusa: } 25"
      }
    ],
    "vars": [
      {
        "symbol": "\\sin 37^\\circ",
        "name": "3 / 5 = 0.6",
        "unit": "Constante"
      },
      {
        "symbol": "\\cos 37^\\circ",
        "name": "4 / 5 = 0.8",
        "unit": "Constante"
      },
      {
        "symbol": "\\tan 37^\\circ",
        "name": "3 / 4 = 0.75",
        "unit": "Constante"
      }
    ],
    "datoClave": "💡 Mnemotecnia de Triángulos Notables: 1) En 37°-53°: frente a 37° va 3k, frente a 53° va 4k, hipotenusa 5k (sen 37° = 3/5, cos 37° = 4/5). 2) En 30°-60°: frente a 30° va 1k, frente a 60° va k√3, hipotenusa 2k. 3) En 45°-45°: catetos 1k, 1k e hipotenusa k√2.",
    "fijaUnsa": "💡 Mnemotecnia de Triángulos Notables: 1) En 37°-53°: frente a 37° va 3k, frente a 53° va 4k, hipotenusa 5k (sen 37° = 3/5, cos 37° = 4/5). 2) En 30°-60°: frente a 30° va 1k, frente a 60° va k√3, hipotenusa 2k. 3) En 45°-45°: catetos 1k, 1k e hipotenusa k√2.",
    "calcType": null
  },
  {
    "id": "tri_sistemas_canonica",
    "subject": "Trigonometría",
    "topic": "Sistemas Angulares",
    "level": "Básica",
    "caseTag": "S = 9k, C = 10k",
    "importance": "Fundamental",
    "name": "Conversión entre Sistemas de Medición Angular (S, C, R)",
    "latex": "\\frac{S}{180} = \\frac{C}{200} = \\frac{R}{\\pi} \\implies \\frac{S}{9} = \\frac{C}{10} = \\frac{20R}{\\pi} = k",
    "plain": "S/180 = C/200 = R/pi ==> S = 9k, C = 10k, R = (pi*k)/20",
    "desc": "Relación de proporcionalidad canónica entre los grados sexagesimales (S), centesimales (C) y radianes (R).",
    "despejes": [
      {
        "name": "Diferencia Directa",
        "latex": "C - S = k"
      },
      {
        "name": "Suma Directa",
        "latex": "C + S = 19k"
      },
      {
        "name": "Relación Clásica",
        "latex": "\\frac{C + S}{C - S} = 19"
      }
    ],
    "vars": [
      {
        "symbol": "S",
        "name": "Grados sexagesimales (S = 9k)",
        "unit": "Grados [^\\circ]"
      },
      {
        "symbol": "C",
        "name": "Grados centesimales (C = 10k)",
        "unit": "Grados [^g]"
      },
      {
        "symbol": "R",
        "name": "Radianes",
        "unit": "Radianes [rad]"
      }
    ],
    "datoClave": "💡 Regla Práctica Universal: En problemas de simplificación con sistemas angulares S, C y R, sustituye siempre S = 9k, C = 10k y R = (π·k)/20. ¡La constante k casi siempre se cancela por completo y obtienes la respuesta en un solo paso!",
    "fijaUnsa": "💡 Regla Práctica Universal: En problemas de simplificación con sistemas angulares S, C y R, sustituye siempre S = 9k, C = 10k y R = (π·k)/20. ¡La constante k casi siempre se cancela por completo y obtienes la respuesta en un solo paso!",
    "calcType": "angular"
  },
  {
    "id": "tri_longitud_arco",
    "subject": "Trigonometría",
    "topic": "Sector Circular",
    "level": "Básica",
    "caseTag": "L = θ · R y Área",
    "importance": "Fundamental",
    "name": "Longitud de Arco y Área de Sector Circular (Las 3 Variantes)",
    "latex": "L = \\theta \\cdot R \\quad;\\quad S = \\frac{1}{2} \\theta R^2 = \\frac{L \\cdot R}{2} = \\frac{L^2}{2\\theta}",
    "plain": "L = theta * R ; S = 0.5*theta*R^2 = (L*R)/2 = L^2 / (2*theta)",
    "desc": "Medida del contorno curvo y tres fórmulas alternativas para el área del sector circular según los datos conocidos.",
    "despejes": [
      {
        "name": "Ángulo Central en Radianes",
        "latex": "\\theta = \\frac{L}{R}"
      },
      {
        "name": "Trapecio Circular (Ángulo)",
        "latex": "\\theta = \\frac{L_1 - L_2}{d}"
      },
      {
        "name": "Trapecio Circular (Área)",
        "latex": "S_{\\text{trap}} = \\left(\\frac{L_1 + L_2}{2}\\right) d"
      }
    ],
    "vars": [
      {
        "symbol": "L",
        "name": "Longitud de arco",
        "unit": "Metros [m] o [u]"
      },
      {
        "symbol": "\\theta",
        "name": "Ángulo central (OBLIGATORIO en radianes)",
        "unit": "Radianes [rad]"
      },
      {
        "symbol": "R",
        "name": "Radio de curvatura",
        "unit": "Metros [m] o [u]"
      }
    ],
    "datoClave": "¡El ángulo θ TIENE que estar en radianes! Si te lo dan en sexagesimales (ej. 45°), multiplícalo por π/180 antes de meterlo a la fórmula.",
    "fijaUnsa": "¡El ángulo θ TIENE que estar en radianes! Si te lo dan en sexagesimales (ej. 45°), multiplícalo por π/180 antes de meterlo a la fórmula.",
    "calcType": null
  },
  {
    "id": "tri_reduccion_cuadrantes",
    "subject": "Trigonometría",
    "topic": "Reducción al Primer Cuadrante",
    "level": "Operacional",
    "caseTag": "Signos y Reducción",
    "importance": "Fundamental",
    "name": "Signos por Cuadrantes y Reglas de Reducción",
    "latex": "\\text{I C: Todas (+)} \\quad;\\quad \\text{II C: } \\sin, \\csc (+) \\quad;\\quad \\text{III C: } \\tan, \\cot (+) \\quad;\\quad \\text{IV C: } \\cos, \\sec (+)",
    "plain": "I: Todas (+) ; II: Sen/Csc (+) ; III: Tan/Cot (+) ; IV: Cos/Sec (+)",
    "desc": "Regla mnemotécnica de signos ('Todas las Señoritas Toman Café') y reducción de ángulos mayores a 90°.",
    "despejes": [
      {
        "name": "Reducción con 180° ± x o 360° - x (Mantiene la razón)",
        "latex": "R.T.(180^\\circ \\pm x) = \\pm R.T.(x)"
      },
      {
        "name": "Reducción con 90° ± x o 270° ± x (Cambia a la Co-Razón)",
        "latex": "R.T.(90^\\circ \\pm x) = \\pm \\text{Co-}R.T.(x)"
      },
      {
        "name": "Ángulos Negativos",
        "latex": "\\cos(-x) = \\cos x \\quad;\\quad \\sin(-x) = -\\sin x"
      }
    ],
    "vars": [
      {
        "symbol": "x",
        "name": "Ángulo agudo equivalente",
        "unit": "Grados [^\\circ]"
      }
    ],
    "datoClave": "Con 180° y 360° la razón se mantiene igual. Con 90° y 270° la razón cambia a su Co-razón (Seno pasa a Coseno, Tangente a Cotangente, Secante a Cosecante). El signo depende del cuadrante original.",
    "fijaUnsa": "Con 180° y 360° la razón se mantiene igual. Con 90° y 270° la razón cambia a su Co-razón (Seno pasa a Coseno, Tangente a Cotangente, Secante a Cosecante). El signo depende del cuadrante original.",
    "calcType": null
  },
  {
    "id": "tri_identidades_pitagoricas",
    "subject": "Trigonometría",
    "topic": "Identidades Fundamentales",
    "level": "Básica",
    "caseTag": "Pitagóricas y Recíprocas",
    "importance": "Fundamental",
    "name": "Identidades Pitagóricas, Recíprocas y por Cociente",
    "latex": "\\sin^2 x + \\cos^2 x = 1 \\quad;\\quad 1 + \\tan^2 x = \\sec^2 x \\quad;\\quad 1 + \\cot^2 x = \\csc^2 x",
    "plain": "sin^2(x) + cos^2(x) = 1 ; 1 + tan^2(x) = sec^2(x) ; 1 + cot^2(x) = csc^2(x)",
    "desc": "Axiomas trigonométricos canónicos universales.",
    "despejes": [
      {
        "name": "Recíprocas",
        "latex": "\\sin x \\cdot \\csc x = 1 \\quad;\\quad \\cos x \\cdot \\sec x = 1 \\quad;\\quad \\tan x \\cdot \\cot x = 1"
      },
      {
        "name": "Por Cociente",
        "latex": "\\tan x = \\frac{\\sin x}{\\cos x} \\quad;\\quad \\cot x = \\frac{\\cos x}{\\sin x}"
      },
      {
        "name": "Atajo Secante y Tangente",
        "latex": "\\sec x + \\tan x = p \\implies \\sec x - \\tan x = \\frac{1}{p}"
      }
    ],
    "vars": [
      {
        "symbol": "x",
        "name": "Ángulo trigonométrico",
        "unit": "rad o °"
      }
    ],
    "datoClave": "Si sec(x) + tan(x) = 5, entonces sec(x) - tan(x) = 1/5 = 0.2. Sumando ambas ecuaciones hallas la secante sin usar identidades complejas.",
    "fijaUnsa": "Si sec(x) + tan(x) = 5, entonces sec(x) - tan(x) = 1/5 = 0.2. Sumando ambas ecuaciones hallas la secante sin usar identidades complejas.",
    "calcType": null
  },
  {
    "id": "tri_identidades_auxiliares",
    "subject": "Trigonometría",
    "topic": "Identidades Fundamentales",
    "level": "Atajo",
    "caseTag": "Identidades Auxiliares de Oro",
    "importance": "Alta Relevancia",
    "name": "Identidades Auxiliares de Alto Rendimiento (Atajos de Examen)",
    "latex": "\\tan x + \\cot x = \\sec x \\cdot \\csc x \\quad;\\quad \\sec^2 x + \\csc^2 x = \\sec^2 x \\cdot \\csc^2 x",
    "plain": "tan(x) + cot(x) = sec(x)*csc(x) ; sec^2(x) + csc^2(x) = sec^2(x)*csc^2(x)",
    "desc": "Igualdades que reducen sumas a multiplicaciones directamente sin expandir en senos y cosenos.",
    "despejes": [
      {
        "name": "Cuartas Potencias",
        "latex": "\\sin^4 x + \\cos^4 x = 1 - 2\\sin^2 x \\cos^2 x"
      },
      {
        "name": "Sextas Potencias",
        "latex": "\\sin^6 x + \\cos^6 x = 1 - 3\\sin^2 x \\cos^2 x"
      },
      {
        "name": "Trinomio Trigonométrico al Cuadrado",
        "latex": "(1 \\pm \\sin x \\pm \\cos x)^2 = 2(1 \\pm \\sin x)(1 \\pm \\cos x)"
      }
    ],
    "vars": [
      {
        "symbol": "x",
        "name": "Ángulo arbitrario",
        "unit": "rad"
      }
    ],
    "datoClave": "¡La suma sec²x + csc²x es idéntica a su PRODUCTO sec²x * csc²x! Te ahorra 5 líneas de cálculo en simplificación de fracciones.",
    "fijaUnsa": "¡La suma sec²x + csc²x es idéntica a su PRODUCTO sec²x * csc²x! Te ahorra 5 líneas de cálculo en simplificación de fracciones.",
    "calcType": null
  },
  {
    "id": "tri_angulos_compuestos",
    "subject": "Trigonometría",
    "topic": "Ángulos Compuestos",
    "level": "Operacional",
    "caseTag": "Suma y Diferencia",
    "importance": "Alta Relevancia",
    "name": "Razones Trigonométricas de la Suma y Diferencia",
    "latex": "\\sin(A \\pm B) = \\sin A \\cos B \\pm \\cos A \\sin B \\quad;\\quad \\cos(A \\pm B) = \\cos A \\cos B \\mp \\sin A \\sin B",
    "plain": "sin(A+-B) = sinA*cosB +- cosA*sinB ; cos(A+-B) = cosA*cosB -+ sinA*sinB",
    "desc": "Desarrollo analítico de senos, cosenos y tangentes para la adición o sustracción de dos ángulos.",
    "despejes": [
      {
        "name": "Tangente de la Suma y Diferencia",
        "latex": "\\tan(A \\pm B) = \\frac{\\tan A \\pm \\tan B}{1 \\mp \\tan A \\tan B}"
      },
      {
        "name": "Condicional si A + B + C = 180°",
        "latex": "\\tan A + \\tan B + \\tan C = \\tan A \\cdot \\tan B \\cdot \\tan C"
      }
    ],
    "vars": [
      {
        "symbol": "A, B",
        "name": "Ángulos independientes",
        "unit": "Grados o Rad"
      }
    ],
    "datoClave": "¡Ojo con el signo del coseno! cos(A + B) lleva signo MENOS en medio: cosA cosB - sinA sinB.",
    "fijaUnsa": "¡Ojo con el signo del coseno! cos(A + B) lleva signo MENOS en medio: cosA cosB - sinA sinB.",
    "calcType": null
  },
  {
    "id": "tri_angulo_doble_degradacion",
    "subject": "Trigonometría",
    "topic": "Ángulo Doble",
    "level": "Operacional",
    "caseTag": "Ángulo Doble y Degradación",
    "importance": "Alta Relevancia",
    "name": "Ángulo Doble y Fórmulas de Degradación de Cuadrados",
    "latex": "\\sin 2x = 2\\sin x \\cos x \\quad;\\quad \\cos 2x = \\cos^2 x - \\sin^2 x = 2\\cos^2 x - 1 = 1 - 2\\sin^2 x",
    "plain": "sin(2x) = 2*sin(x)*cos(x) ; cos(2x) = cos^2(x) - sin^2(x) = 2cos^2(x) - 1 = 1 - 2sin^2(x)",
    "desc": "Fórmulas del arco doble y degradación de exponentes cuadráticos a expresiones lineales de ángulo doble.",
    "despejes": [
      {
        "name": "Degradación de Seno Cuadrado",
        "latex": "2\\sin^2 x = 1 - \\cos 2x"
      },
      {
        "name": "Degradación de Coseno Cuadrado",
        "latex": "2\\cos^2 x = 1 + \\cos 2x"
      },
      {
        "name": "Tangente del Ángulo Doble",
        "latex": "\\tan 2x = \\frac{2\\tan x}{1 - \\tan^2 x}"
      }
    ],
    "vars": [
      {
        "symbol": "x",
        "name": "Ángulo simple",
        "unit": "rad"
      },
      {
        "symbol": "2x",
        "name": "Ángulo doble",
        "unit": "rad"
      }
    ],
    "datoClave": "Las fórmulas de degradación (2 sin²x = 1 - cos 2x y 2 cos²x = 1 + cos 2x) son el atajo rey para simplificar integrales, raíces y ecuaciones con potencias pares.",
    "fijaUnsa": "Las fórmulas de degradación (2 sin²x = 1 - cos 2x y 2 cos²x = 1 + cos 2x) son el atajo rey para simplificar integrales, raíces y ecuaciones con potencias pares.",
    "calcType": null
  },
  {
    "id": "tri_angulo_mitad_atajo",
    "subject": "Trigonometría",
    "topic": "Ángulo Mitad",
    "level": "Atajo",
    "caseTag": "Ángulo Mitad y Atajo csc - cot",
    "importance": "Alta Probabilidad",
    "name": "Ángulo Mitad y Atajo Estrella tan(x/2) = csc x - cot x",
    "latex": "\\tan\\left(\\frac{x}{2}\\right) = \\csc x - \\cot x \\quad;\\quad \\cot\\left(\\frac{x}{2}\\right) = \\csc x + \\cot x",
    "plain": "tan(x/2) = csc(x) - cot(x) ; cot(x/2) = csc(x) + cot(x)",
    "desc": "Cálculo directo de razones de ángulo mitad sin radicales dobles engorrosos.",
    "despejes": [
      {
        "name": "Fórmula Radical Canónica del Seno",
        "latex": "\\sin\\left(\\frac{x}{2}\\right) = \\pm\\sqrt{\\frac{1 - \\cos x}{2}}"
      },
      {
        "name": "Fórmula Radical Canónica del Coseno",
        "latex": "\\cos\\left(\\frac{x}{2}\\right) = \\pm\\sqrt{\\frac{1 + \\cos x}{2}}"
      }
    ],
    "vars": [
      {
        "symbol": "x/2",
        "name": "Ángulo mitad",
        "unit": "rad"
      }
    ],
    "datoClave": "El atajo tan(x/2) = csc(x) - cot(x) evita calcular la raíz cuadrada doble. Por ejemplo: tan(15°) = csc(30°) - cot(30°) = 2 - √3. ¡Inmediato!",
    "fijaUnsa": "El atajo tan(x/2) = csc(x) - cot(x) evita calcular la raíz cuadrada doble. Por ejemplo: tan(15°) = csc(30°) - cot(30°) = 2 - √3. ¡Inmediato!",
    "calcType": null
  },
  {
    "id": "tri_angulo_triple",
    "subject": "Trigonometría",
    "topic": "Ángulo Triple",
    "level": "Operacional",
    "caseTag": "Ángulo Triple",
    "importance": "Alta Probabilidad",
    "name": "Razones Trigonométricas del Ángulo Triple",
    "latex": "\\sin 3x = 3\\sin x - 4\\sin^3 x \\quad;\\quad \\cos 3x = 4\\cos^3 x - 3\\cos x",
    "plain": "sin(3x) = 3*sin(x) - 4*sin^3(x) ; cos(3x) = 4*cos^3(x) - 3*cos(x)",
    "desc": "Desarrollo analítico de senos y cosenos para el triple de un ángulo.",
    "despejes": [
      {
        "name": "Tangente del Ángulo Triple",
        "latex": "\\tan 3x = \\frac{3\\tan x - \\tan^3 x}{1 - 3\\tan^2 x}"
      },
      {
        "name": "Forma Factorizada de Seno Triple",
        "latex": "\\sin 3x = \\sin x (2\\cos 2x + 1)"
      }
    ],
    "vars": [
      {
        "symbol": "x",
        "name": "Ángulo simple",
        "unit": "rad"
      },
      {
        "symbol": "3x",
        "name": "Ángulo triple",
        "unit": "rad"
      }
    ],
    "datoClave": "Mnemotecnia para no confundir: Seno empieza con 3 (3 sen x - 4 sen³x); Coseno empieza con 4 (4 cos³x - 3 cos x).",
    "fijaUnsa": "Mnemotecnia para no confundir: Seno empieza con 3 (3 sen x - 4 sen³x); Coseno empieza con 4 (4 cos³x - 3 cos x).",
    "calcType": null
  },
  {
    "id": "tri_transformaciones_suma_producto",
    "subject": "Trigonometría",
    "topic": "Transformaciones",
    "level": "Operacional",
    "caseTag": "Suma a Producto",
    "importance": "Alta Probabilidad",
    "name": "Transformaciones Trigonométricas (Suma y Diferencia a Producto)",
    "latex": "\\sin A + \\sin B = 2\\sin\\left(\\frac{A + B}{2}\\right)\\cos\\left(\\frac{A - B}{2}\\right) \\quad;\\quad \\cos A + \\cos B = 2\\cos\\left(\\frac{A + B}{2}\\right)\\cos\\left(\\frac{A - B}{2}\\right)",
    "plain": "sinA + sinB = 2*sin((A+B)/2)*cos((A-B)/2) ; cosA + cosB = 2*cos((A+B)/2)*cos((A-B)/2)",
    "desc": "Factorización de sumas o diferencias de razones trigonométricas en productos de factores.",
    "despejes": [
      {
        "name": "Diferencia de Senos",
        "latex": "\\sin A - \\sin B = 2\\sin\\left(\\frac{A - B}{2}\\right)\\cos\\left(\\frac{A + B}{2}\\right)"
      },
      {
        "name": "Diferencia de Cosenos (Lleva signo MENOS)",
        "latex": "\\cos A - \\cos B = -2\\sin\\left(\\frac{A + B}{2}\\right)\\sin\\left(\\frac{A - B}{2}\\right)"
      }
    ],
    "vars": [
      {
        "symbol": "A, B",
        "name": "Ángulos sumandos",
        "unit": "Grados o rad"
      }
    ],
    "datoClave": "¡Atención al signo en cos A - cos B! Lleva un signo MENOS al inicio: -2 sin((A+B)/2) sin((A-B)/2).",
    "fijaUnsa": "¡Atención al signo en cos A - cos B! Lleva un signo MENOS al inicio: -2 sin((A+B)/2) sin((A-B)/2).",
    "calcType": null
  },
  {
    "id": "tri_ley_senos_cosenos_oblicuos",
    "subject": "Trigonometría",
    "topic": "Triángulos Oblicuángulos",
    "level": "Operacional",
    "caseTag": "Ley de Senos y Cosenos",
    "importance": "Fundamental",
    "name": "Ley de Senos, Ley de Cosenos y Ley de Proyecciones",
    "latex": "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R \\quad;\\quad a^2 = b^2 + c^2 - 2bc \\cos A",
    "plain": "a/sin(A) = b/sin(B) = c/sin(C) = 2R ; a^2 = b^2 + c^2 - 2bc*cos(A)",
    "desc": "Teoremas métricos fundamentales para la resolución analítica de cualquier triángulo general no rectángulo.",
    "despejes": [
      {
        "name": "Coseno de un Ángulo Despejado",
        "latex": "\\cos A = \\frac{b^2 + c^2 - a^2}{2bc}"
      },
      {
        "name": "Área Trigonométrica",
        "latex": "\\text{Área} = \\frac{a \\cdot b \\cdot \\sin C}{2} = \\frac{a \\cdot b \\cdot c}{4R}"
      },
      {
        "name": "Ley de Proyecciones",
        "latex": "a = b \\cos C + c \\cos B"
      }
    ],
    "vars": [
      {
        "symbol": "a, b, c",
        "name": "Lados del triángulo oblicuángulo",
        "unit": "Unidades [u]"
      },
      {
        "symbol": "A, B, C",
        "name": "Ángulos interiores opuestos",
        "unit": "Grados [^\\circ]"
      },
      {
        "symbol": "R",
        "name": "Circunradio del triángulo",
        "unit": "Unidades [u]"
      }
    ],
    "datoClave": "💡 ¿Cuándo usar cuál? Usa Ley de Senos cuando conozcas un lado y su ángulo opuesto más cualquier otro dato (a/sin A = b/sin B = 2R). Usa Ley de Cosenos cuando conozcas dos lados y el ángulo comprendido entre ellos, o los tres lados del triángulo (a² = b² + c² - 2bc cos A).",
    "fijaUnsa": "💡 ¿Cuándo usar cuál? Usa Ley de Senos cuando conozcas un lado y su ángulo opuesto más cualquier otro dato (a/sin A = b/sin B = 2R). Usa Ley de Cosenos cuando conozcas dos lados y el ángulo comprendido entre ellos, o los tres lados del triángulo (a² = b² + c² - 2bc cos A).",
    "calcType": null
  }
];

// ==========================================
// CONFIGURACIÓN DE PALETA VISUAL POR ASIGNATURA
// ==========================================
const SUBJECT_THEMES = {
  'Todos': {
    name: 'Todos',
    icon: Atom,
    primary: '#38BDF8',
    secondary: '#0284C7',
    bgBadge: 'rgba(56, 189, 248, 0.12)',
    border: 'rgba(56, 189, 248, 0.35)',
    glow: 'rgba(56, 189, 248, 0.25)'
  },
  'Física': {
    name: 'Física',
    icon: Zap,
    primary: '#38BDF8',
    secondary: '#0284C7',
    bgBadge: 'rgba(56, 189, 248, 0.14)',
    border: 'rgba(56, 189, 248, 0.4)',
    glow: 'rgba(56, 189, 248, 0.3)'
  },
  'Química': {
    name: 'Química',
    icon: FlaskConical,
    primary: '#10B981',
    secondary: '#059669',
    bgBadge: 'rgba(16, 185, 129, 0.14)',
    border: 'rgba(16, 185, 129, 0.4)',
    glow: 'rgba(16, 185, 129, 0.3)'
  },
  'Álgebra': {
    name: 'Álgebra',
    icon: Activity,
    primary: '#A855F7',
    secondary: '#7C3AED',
    bgBadge: 'rgba(168, 85, 247, 0.14)',
    border: 'rgba(168, 85, 247, 0.4)',
    glow: 'rgba(168, 85, 247, 0.3)'
  },
  'Aritmética': {
    name: 'Aritmética',
    icon: Calculator,
    primary: '#F59E0B',
    secondary: '#D97706',
    bgBadge: 'rgba(245, 158, 11, 0.14)',
    border: 'rgba(245, 158, 11, 0.4)',
    glow: 'rgba(245, 158, 11, 0.3)'
  },
  'Geometría': {
    name: 'Geometría',
    icon: Compass,
    primary: '#F43F5E',
    secondary: '#E11D48',
    bgBadge: 'rgba(244, 63, 94, 0.14)',
    border: 'rgba(244, 63, 94, 0.4)',
    glow: 'rgba(244, 63, 94, 0.3)'
  },
  'Trigonometría': {
    name: 'Trigonometría',
    icon: Pi,
    primary: '#06B6D4',
    secondary: '#0891B2',
    bgBadge: 'rgba(6, 182, 212, 0.14)',
    border: 'rgba(6, 182, 212, 0.4)',
    glow: 'rgba(6, 182, 212, 0.3)'
  },
  'Lenguaje': {
    name: 'Lenguaje & Letras',
    icon: BookOpen,
    primary: '#EC4899',
    secondary: '#BE185D',
    bgBadge: 'rgba(236, 72, 153, 0.14)',
    border: 'rgba(236, 72, 153, 0.4)',
    glow: 'rgba(236, 72, 153, 0.3)'
  },
  'Biología': {
    name: 'Biología',
    icon: Dna,
    primary: '#10B981',
    secondary: '#059669',
    bgBadge: 'rgba(16, 185, 129, 0.14)',
    border: 'rgba(16, 185, 129, 0.4)',
    glow: 'rgba(16, 185, 129, 0.3)'
  }
};

// ==========================================
// RENDERIZADOR KATEX CON MEMORIA CACHÉ GLOBAL DE ALTO RENDIMIENTO
// Elimina el 99.9% de parseos repetidos en renderizados y búsqueda
// ==========================================
const katexCache = new Map();

export const renderMath = (latexStr, displayMode = true) => {
  if (!latexStr) return null;
  const key = (displayMode ? 'D:' : 'I:') + latexStr;
  let html = katexCache.get(key);
  if (!html) {
    try {
      html = katex.renderToString(latexStr, {
        displayMode,
        throwOnError: false
      });
      katexCache.set(key, html);
    } catch (e) {
      return <code style={{ fontFamily: 'monospace', color: '#FDE047' }}>{latexStr}</code>;
    }
  }
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

// ==========================================
// DIAGRAMAS CONCEPTUALES VECTORIALES SVG
// ==========================================
const FormulaVisualDiagram = ({ formulaId, themeColor }) => {
  if (!['fis_mru_basico', 'fis_newton2_lineal', 'fis_hidrostatica_presion', 'tri_soh_cah_toa', 'fis_electrodinamica_ohm', 'qui_gases_universal'].includes(formulaId)) {
    return null;
  }

  return (
    <div
      style={{
        background: 'rgba(2, 6, 23, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '14px 16px',
        marginTop: '10px',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', fontWeight: 900, color: '#38BDF8', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '10px' }}>
        <Sparkles size={13} color="#38BDF8" />
        <span>Diagrama Conceptual Visual e Interpretación Física</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', overflowX: 'auto', padding: '4px 0' }}>
        {formulaId === 'fis_mru_basico' && (
          <svg viewBox="0 0 460 130" style={{ width: '100%', maxWidth: '460px', height: 'auto' }}>
            <line x1="20" y1="95" x2="440" y2="95" stroke="#475569" strokeWidth="2.5" strokeDasharray="6 4" />
            <circle cx="50" cy="95" r="4" fill="#38BDF8" />
            <text x="45" y="115" fill="#94A3B8" fontSize="11" fontWeight="700">x = 0</text>
            <circle cx="390" cy="95" r="4" fill="#38BDF8" />
            <text x="375" y="115" fill="#94A3B8" fontSize="11" fontWeight="700">x = d</text>
            
            <line x1="50" y1="20" x2="390" y2="20" stroke="#38BDF8" strokeWidth="1.5" />
            <polygon points="50,20 60,17 60,23" fill="#38BDF8" />
            <polygon points="390,20 380,17 380,23" fill="#38BDF8" />
            <rect x="180" y="10" width="80" height="20" rx="6" fill="#0F172A" stroke="#38BDF8" strokeWidth="1" />
            <text x="220" y="24" textAnchor="middle" fill="#38BDF8" fontSize="11" fontWeight="900">Distancia (d)</text>

            <rect x="170" y="60" width="60" height="26" rx="6" fill="rgba(56, 189, 248, 0.25)" stroke="#38BDF8" strokeWidth="1.8" />
            <circle cx="185" cy="90" r="6" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
            <circle cx="215" cy="90" r="6" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
            <text x="200" y="77" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">MÓVIL</text>

            <line x1="235" y1="73" x2="300" y2="73" stroke="#FDE047" strokeWidth="2.5" />
            <polygon points="308,73 298,69 298,77" fill="#FDE047" />
            <text x="270" y="66" fill="#FDE047" fontSize="11" fontWeight="900">v = cte</text>
            
            <rect x="330" y="45" width="85" height="26" rx="6" fill="rgba(168, 85, 247, 0.2)" stroke="#C084FC" strokeWidth="1" />
            <text x="372" y="62" textAnchor="middle" fill="#E9D5FF" fontSize="10" fontWeight="800">⏱ t transcurrido</text>
          </svg>
        )}

        {formulaId === 'fis_newton2_lineal' && (
          <svg viewBox="0 0 460 150" style={{ width: '100%', maxWidth: '460px', height: 'auto' }}>
            <line x1="20" y1="120" x2="440" y2="120" stroke="#475569" strokeWidth="2.5" />
            <line x1="100" y1="120" x2="90" y2="130" stroke="#334155" strokeWidth="1.5" />
            <line x1="180" y1="120" x2="170" y2="130" stroke="#334155" strokeWidth="1.5" />
            <line x1="260" y1="120" x2="250" y2="130" stroke="#334155" strokeWidth="1.5" />
            <line x1="340" y1="120" x2="330" y2="130" stroke="#334155" strokeWidth="1.5" />

            <rect x="180" y="60" width="80" height="60" rx="8" fill="rgba(56, 189, 248, 0.15)" stroke="#38BDF8" strokeWidth="2" />
            <circle cx="220" cy="90" r="4" fill="#38BDF8" />
            <text x="220" y="94" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900">m</text>

            <line x1="220" y1="60" x2="220" y2="18" stroke="#38BDF8" strokeWidth="2.5" />
            <polygon points="220,10 216,20 224,20" fill="#38BDF8" />
            <text x="230" y="24" fill="#38BDF8" fontSize="11" fontWeight="900">N (Normal)</text>

            <line x1="220" y1="120" x2="220" y2="144" stroke="#F87171" strokeWidth="2.5" />
            <polygon points="220,150 216,140 224,140" fill="#F87171" />
            <text x="230" y="142" fill="#F87171" fontSize="11" fontWeight="900">P = m·g</text>

            <line x1="260" y1="90" x2="350" y2="90" stroke="#34D399" strokeWidth="3" />
            <polygon points="360,90 348,85 348,95" fill="#34D399" />
            <text x="300" y="80" fill="#34D399" fontSize="11" fontWeight="900">F (Tracción)</text>

            <line x1="180" y1="110" x2="110" y2="110" stroke="#F59E0B" strokeWidth="2.5" />
            <polygon points="100,110 112,106 112,114" fill="#F59E0B" />
            <text x="115" y="102" fill="#F59E0B" fontSize="10" fontWeight="900">f_k = μ·N</text>

            <rect x="290" y="15" width="140" height="28" rx="6" fill="rgba(16, 185, 129, 0.18)" stroke="#10B981" strokeWidth="1" />
            <text x="360" y="33" textAnchor="middle" fill="#6EE7B7" fontSize="11" fontWeight="900">➜ a = Fr / m_total</text>
          </svg>
        )}

        {formulaId === 'fis_hidrostatica_presion' && (
          <svg viewBox="0 0 440 140" style={{ width: '100%', maxWidth: '440px', height: 'auto' }}>
            <defs>
              <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0284C7" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0369A1" stopOpacity="0.7" />
              </linearGradient>
            </defs>
            <path d="M 80 20 L 80 120 Q 80 130 90 130 L 230 130 Q 240 130 240 120 L 240 20" fill="none" stroke="#64748B" strokeWidth="2.5" />
            <rect x="83" y="40" width="154" height="87" fill="url(#liquidGrad)" rx="2" />
            <line x1="82" y1="40" x2="238" y2="40" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 2" />
            
            <line x1="160" y1="10" x2="160" y2="35" stroke="#FDE047" strokeWidth="2" />
            <polygon points="160,38 156,30 164,30" fill="#FDE047" />
            <text x="170" y="24" fill="#FDE047" fontSize="11" fontWeight="900">P_atm (1 atm)</text>

            <circle cx="160" cy="100" r="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="172" y="104" fill="#FFFFFF" fontSize="11" fontWeight="800">Punto A</text>

            <line x1="260" y1="40" x2="260" y2="100" stroke="#38BDF8" strokeWidth="1.8" />
            <polygon points="260,40 256,48 264,48" fill="#38BDF8" />
            <polygon points="260,100 256,92 264,92" fill="#38BDF8" />
            <text x="272" y="74" fill="#38BDF8" fontSize="12" fontWeight="900">h (profundidad)</text>

            <rect x="295" y="45" width="135" height="50" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#38BDF8" strokeWidth="1" />
            <text x="362" y="65" textAnchor="middle" fill="#38BDF8" fontSize="10" fontWeight="800">P_hidro = ρ · g · h</text>
            <text x="362" y="83" textAnchor="middle" fill="#FDE047" fontSize="10" fontWeight="800">P_total = P_atm + P_h</text>
          </svg>
        )}

        {formulaId === 'tri_soh_cah_toa' && (
          <svg viewBox="0 0 460 140" style={{ width: '100%', maxWidth: '460px', height: 'auto' }}>
            <polygon points="40,120 220,120 220,20" fill="rgba(6, 182, 212, 0.12)" stroke="#06B6D4" strokeWidth="2.5" />
            <rect x="204" y="104" width="16" height="16" fill="none" stroke="#06B6D4" strokeWidth="1.5" />
            <circle cx="212" cy="112" r="1.5" fill="#06B6D4" />

            <path d="M 75 120 A 35 35 0 0 0 68 102" fill="none" stroke="#FDE047" strokeWidth="2" />
            <text x="82" y="113" fill="#FDE047" fontSize="13" fontWeight="900">θ</text>

            <text x="130" y="134" textAnchor="middle" fill="#6EE7B7" fontSize="11" fontWeight="800">Cateto Adyacente (CA)</text>
            <text x="232" y="70" fill="#F472B6" fontSize="11" fontWeight="800">Cateto Opuesto (CO)</text>
            <text x="110" y="60" fill="#38BDF8" fontSize="12" fontWeight="900">Hipotenusa (H)</text>

            <g transform="translate(290, 15)">
              <rect x="0" y="0" width="150" height="32" rx="6" fill="rgba(56, 189, 248, 0.16)" stroke="#38BDF8" strokeWidth="1" />
              <text x="12" y="21" fill="#38BDF8" fontSize="11" fontWeight="900">SOH:</text>
              <text x="50" y="21" fill="#FFFFFF" fontSize="11" fontWeight="700">sen θ = CO / H</text>

              <rect x="0" y="38" width="150" height="32" rx="6" fill="rgba(52, 211, 153, 0.16)" stroke="#34D399" strokeWidth="1" />
              <text x="12" y="59" fill="#34D399" fontSize="11" fontWeight="900">CAH:</text>
              <text x="50" y="59" fill="#FFFFFF" fontSize="11" fontWeight="700">cos θ = CA / H</text>

              <rect x="0" y="76" width="150" height="32" rx="6" fill="rgba(244, 114, 182, 0.16)" stroke="#F472B6" strokeWidth="1" />
              <text x="12" y="97" fill="#F472B6" fontSize="11" fontWeight="900">TOA:</text>
              <text x="50" y="97" fill="#FFFFFF" fontSize="11" fontWeight="700">tan θ = CO / CA</text>
            </g>
          </svg>
        )}

        {formulaId === 'fis_electrodinamica_ohm' && (
          <svg viewBox="0 0 460 130" style={{ width: '100%', maxWidth: '460px', height: 'auto' }}>
            <path d="M 60 65 L 60 25 L 200 25 M 260 25 L 400 25 L 400 105 L 60 105 L 60 65" fill="none" stroke="#94A3B8" strokeWidth="2.5" />
            
            <line x1="50" y1="55" x2="70" y2="55" stroke="#38BDF8" strokeWidth="3" />
            <text x="75" y="55" fill="#38BDF8" fontSize="10" fontWeight="900">+</text>
            <line x1="55" y1="75" x2="65" y2="75" stroke="#94A3B8" strokeWidth="3" />
            <text x="73" y="80" fill="#94A3B8" fontSize="10" fontWeight="900">-</text>
            <text x="18" y="70" fill="#38BDF8" fontSize="12" fontWeight="900">V (fem)</text>

            <path d="M 200 25 L 206 15 L 218 35 L 230 15 L 242 35 L 254 15 L 260 25" fill="none" stroke="#F59E0B" strokeWidth="3" />
            <text x="230" y="10" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="900">Resistencia (R)</text>

            <line x1="310" y1="25" x2="350" y2="25" stroke="#34D399" strokeWidth="3" />
            <polygon points="358,25 348,20 348,30" fill="#34D399" />
            <text x="330" y="15" fill="#34D399" fontSize="11" fontWeight="900">Corriente (I)</text>

            <rect x="140" y="65" width="200" height="30" rx="8" fill="rgba(245, 158, 11, 0.15)" stroke="#F59E0B" strokeWidth="1" />
            <text x="240" y="84" textAnchor="middle" fill="#FDE047" fontSize="11" fontWeight="900">👑 \"Victoria = Reina Isabel\" (V = R·I)</text>
          </svg>
        )}

        {formulaId === 'qui_gases_universal' && (
          <svg viewBox="0 0 460 135" style={{ width: '100%', maxWidth: '460px', height: 'auto' }}>
            <defs>
              <linearGradient id="pistonGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="100%" stopColor="#64748B" />
              </linearGradient>
            </defs>
            <path d="M 60 20 L 60 120 L 220 120 L 220 20" fill="none" stroke="#64748B" strokeWidth="2.5" />
            <rect x="63" y="55" width="154" height="63" fill="rgba(16, 185, 129, 0.12)" />
            <rect x="63" y="45" width="154" height="12" fill="url(#pistonGrad)" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="140" y1="15" x2="140" y2="45" stroke="#CBD5E1" strokeWidth="4" />
            
            <circle cx="90" cy="70" r="3" fill="#34D399" />
            <circle cx="130" cy="85" r="3" fill="#38BDF8" />
            <circle cx="170" cy="65" r="3" fill="#FBBF24" />
            <circle cx="110" cy="105" r="3" fill="#F472B6" />
            <circle cx="180" cy="100" r="3" fill="#34D399" />
            <circle cx="145" cy="72" r="3" fill="#38BDF8" />

            <circle cx="140" cy="12" r="10" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
            <line x1="140" y1="12" x2="145" y2="7" stroke="#38BDF8" strokeWidth="1.5" />
            <text x="160" y="16" fill="#38BDF8" fontSize="10" fontWeight="800">P (Presión)</text>

            <g transform="translate(245, 20)">
              <rect x="0" y="0" width="195" height="42" rx="8" fill="rgba(16, 185, 129, 0.16)" stroke="#10B981" strokeWidth="1" />
              <text x="97" y="18" textAnchor="middle" fill="#6EE7B7" fontSize="11" fontWeight="900">PAVO = RATÓN</text>
              <text x="97" y="34" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700">P · V = R · T · n</text>

              <rect x="0" y="50" width="195" height="42" rx="8" fill="rgba(245, 158, 11, 0.16)" stroke="#F59E0B" strokeWidth="1" />
              <text x="97" y="68" textAnchor="middle" fill="#FDE047" fontSize="11" fontWeight="900">PUMA = RATA</text>
              <text x="97" y="84" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700">P · M = ρ · R · T</text>
            </g>
          </svg>
        )}
      </div>
    </div>
  );
};

// ==========================================
// MINI-CALCULADORA OPERACIONAL
// ==========================================
const MiniCalculator = ({ type, themeColor }) => {
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);

  const handleCalc = () => {
    try {
      if (type === 'ohm') {
        const v = parseFloat(inputs.v);
        const i = parseFloat(inputs.i);
        const r = parseFloat(inputs.r);
        if (!isNaN(i) && !isNaN(r)) {
          setResult({ label: 'Voltaje (V)', val: (i * r).toFixed(2), unit: 'V' });
        } else if (!isNaN(v) && !isNaN(r) && r !== 0) {
          setResult({ label: 'Corriente (I)', val: (v / r).toFixed(2), unit: 'A' });
        } else if (!isNaN(v) && !isNaN(i) && i !== 0) {
          setResult({ label: 'Resistencia (R)', val: (v / i).toFixed(2), unit: 'Ω' });
        }
      } else if (type === 'mru') {
        const d = parseFloat(inputs.d);
        const v = parseFloat(inputs.v);
        const t = parseFloat(inputs.t);
        if (!isNaN(v) && !isNaN(t)) {
          setResult({ label: 'Distancia (d)', val: (v * t).toFixed(2), unit: 'm' });
        } else if (!isNaN(d) && !isNaN(t) && t !== 0) {
          setResult({ label: 'Velocidad (v)', val: (d / t).toFixed(2), unit: 'm/s' });
        } else if (!isNaN(d) && !isNaN(v) && v !== 0) {
          setResult({ label: 'Tiempo (t)', val: (d / v).toFixed(2), unit: 's' });
        }
      } else if (type === 'newton') {
        const m = parseFloat(inputs.m);
        const a = parseFloat(inputs.a);
        const f = parseFloat(inputs.f);
        if (!isNaN(m) && !isNaN(a)) {
          setResult({ label: 'Fuerza Neta (Fr)', val: (m * a).toFixed(2), unit: 'N' });
        } else if (!isNaN(f) && !isNaN(m) && m !== 0) {
          setResult({ label: 'Aceleración (a)', val: (f / m).toFixed(2), unit: 'm/s²' });
        } else if (!isNaN(f) && !isNaN(a) && a !== 0) {
          setResult({ label: 'Masa (m)', val: (f / a).toFixed(2), unit: 'kg' });
        }
      } else if (type === 'cuadratica') {
        const a = parseFloat(inputs.a);
        const b = parseFloat(inputs.b);
        const c = parseFloat(inputs.c);
        if (!isNaN(a) && !isNaN(b) && !isNaN(c) && a !== 0) {
          const delta = b * b - 4 * a * c;
          if (delta > 0) {
            const x1 = (-b + Math.sqrt(delta)) / (2 * a);
            const x2 = (-b - Math.sqrt(delta)) / (2 * a);
            setResult({
              label: 'Δ = ' + delta.toFixed(2),
              val: `x₁ = ${x1.toFixed(2)}  |  x₂ = ${x2.toFixed(2)}`,
              unit: ''
            });
          } else if (delta === 0) {
            const x = -b / (2 * a);
            setResult({ label: 'Δ = 0 (Raíz doble)', val: `x₁ = x₂ = ${x.toFixed(2)}`, unit: '' });
          } else {
            const real = (-b / (2 * a)).toFixed(2);
            const imag = (Math.sqrt(-delta) / (2 * a)).toFixed(2);
            setResult({
              label: 'Δ < 0 (Complejas)',
              val: `${real} ± ${imag} i`,
              unit: ''
            });
          }
        }
      } else if (type === 'gas') {
        const p = parseFloat(inputs.p);
        const v = parseFloat(inputs.v);
        const n = parseFloat(inputs.n);
        const tC = parseFloat(inputs.tC);
        const T = !isNaN(tC) ? tC + 273 : NaN;
        const R = 0.082;
        if (!isNaN(n) && !isNaN(T) && !isNaN(v) && v !== 0) {
          const pCalc = (n * R * T) / v;
          setResult({ label: 'Presión calculada', val: pCalc.toFixed(2), unit: 'atm' });
        } else if (!isNaN(p) && !isNaN(n) && !isNaN(T) && p !== 0) {
          const vCalc = (n * R * T) / p;
          setResult({ label: 'Volumen calculado', val: vCalc.toFixed(2), unit: 'L' });
        }
      } else if (type === 'presion_hidro') {
        const rho = parseFloat(inputs.rho) || 1000;
        const g = parseFloat(inputs.g) || 9.8;
        const h = parseFloat(inputs.h);
        if (!isNaN(h)) {
          const ph = rho * g * h;
          const phKpa = ph / 1000;
          setResult({ label: `Presión a ${h}m`, val: `${ph.toFixed(0)} Pa (${phKpa.toFixed(1)} kPa)`, unit: '' });
        }
      } else if (type === 'pitagoras') {
        const a = parseFloat(inputs.a);
        const b = parseFloat(inputs.b);
        const c = parseFloat(inputs.c);
        if (!isNaN(a) && !isNaN(b)) {
          const hip = Math.sqrt(a * a + b * b);
          setResult({ label: 'Hipotenusa (c)', val: hip.toFixed(2), unit: 'u' });
        } else if (!isNaN(c) && !isNaN(a) && c > a) {
          const cat = Math.sqrt(c * c - a * a);
          setResult({ label: 'Cateto faltante (b)', val: cat.toFixed(2), unit: 'u' });
        }
      } else if (type === 'heron') {
        const a = parseFloat(inputs.a);
        const b = parseFloat(inputs.b);
        const c = parseFloat(inputs.c);
        if (!isNaN(a) && !isNaN(b) && !isNaN(c)) {
          const p = (a + b + c) / 2;
          const radicando = p * (p - a) * (p - b) * (p - c);
          if (radicando > 0) {
            const area = Math.sqrt(radicando);
            setResult({ label: `Semiperímetro p = ${p.toFixed(2)} u`, val: `Área = ${area.toFixed(2)}`, unit: 'u²' });
          } else {
            setResult({ label: 'Error', val: 'Lados incompatibles', unit: '' });
          }
        }
      } else if (type === 'comercio') {
        const pc = parseFloat(inputs.pc);
        const pct = parseFloat(inputs.pct);
        if (!isNaN(pc) && !isNaN(pct)) {
          const g = pc * (pct / 100);
          const pv = pc + g;
          setResult({ label: `Ganancia = S/. ${g.toFixed(2)}`, val: `Precio de Venta (Pv) = S/. ${pv.toFixed(2)}`, unit: '' });
        }
      } else if (type === 'conversion_velocidad') {
        const kmh = parseFloat(inputs.kmh);
        const ms = parseFloat(inputs.ms);
        if (!isNaN(kmh)) {
          const resMs = kmh * (5 / 18);
          setResult({ label: `${kmh} km/h equivale a:`, val: resMs.toFixed(2), unit: 'm/s' });
        } else if (!isNaN(ms)) {
          const resKmh = ms * (18 / 5);
          setResult({ label: `${ms} m/s equivale a:`, val: resKmh.toFixed(2), unit: 'km/h' });
        }
      } else if (type === 'angular') {
        const s = parseFloat(inputs.s);
        if (!isNaN(s)) {
          const c = (s * 10) / 9;
          const rPi = (s / 180).toFixed(3);
          setResult({ label: `Centesimal: ${c.toFixed(2)}ᵍ`, val: `Radianes: ${rPi} π rad`, unit: '' });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      style={{
        marginTop: '12px',
        padding: '14px',
        borderRadius: '14px',
        background: 'rgba(2, 6, 23, 0.85)',
        border: `1px dashed ${themeColor}50`,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', fontWeight: 800, color: themeColor }}>
        <Calculator size={14} />
        <span>SIMULADOR / CALCULADORA OPERACIONAL EN VIVO</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
        {type === 'ohm' && (
          <>
            <input type="number" placeholder="V (Voltios)" value={inputs.v || ''} onChange={e => setInputs({ ...inputs, v: e.target.value })} className="formula-calc-input" />
            <input type="number" placeholder="I (Amperios)" value={inputs.i || ''} onChange={e => setInputs({ ...inputs, i: e.target.value })} className="formula-calc-input" />
            <input type="number" placeholder="R (Ohmios)" value={inputs.r || ''} onChange={e => setInputs({ ...inputs, r: e.target.value })} className="formula-calc-input" />
          </>
        )}
        {type === 'mru' && (
          <>
            <input type="number" placeholder="d (metros)" value={inputs.d || ''} onChange={e => setInputs({ ...inputs, d: e.target.value })} className="formula-calc-input" />
            <input type="number" placeholder="v (m/s)" value={inputs.v || ''} onChange={e => setInputs({ ...inputs, v: e.target.value })} className="formula-calc-input" />
            <input type="number" placeholder="t (segundos)" value={inputs.t || ''} onChange={e => setInputs({ ...inputs, t: e.target.value })} className="formula-calc-input" />
          </>
        )}
        {type === 'newton' && (
          <>
            <input type="number" placeholder="Fr (Newtons)" value={inputs.f || ''} onChange={e => setInputs({ ...inputs, f: e.target.value })} className="formula-calc-input" />
            <input type="number" placeholder="m (kg)" value={inputs.m || ''} onChange={e => setInputs({ ...inputs, m: e.target.value })} className="formula-calc-input" />
            <input type="number" placeholder="a (m/s²)" value={inputs.a || ''} onChange={e => setInputs({ ...inputs, a: e.target.value })} className="formula-calc-input" />
          </>
        )}
        {type === 'cuadratica' && (
          <>
            <input type="number" placeholder="a (coef x²)" value={inputs.a || ''} onChange={e => setInputs({ ...inputs, a: e.target.value })} className="formula-calc-input" />
            <input type="number" placeholder="b (coef x)" value={inputs.b || ''} onChange={e => setInputs({ ...inputs, b: e.target.value })} className="formula-calc-input" />
            <input type="number" placeholder="c (independiente)" value={inputs.c || ''} onChange={e => setInputs({ ...inputs, c: e.target.value })} className="formula-calc-input" />
          </>
        )}
        {type === 'gas' && (
          <>
            <input type="number" placeholder="P (atm)" value={inputs.p || ''} onChange={e => setInputs({ ...inputs, p: e.target.value })} className="formula-calc-input" />
            <input type="number" placeholder="V (Litros)" value={inputs.v || ''} onChange={e => setInputs({ ...inputs, v: e.target.value })} className="formula-calc-input" />
            <input type="number" placeholder="n (moles)" value={inputs.n || ''} onChange={e => setInputs({ ...inputs, n: e.target.value })} className="formula-calc-input" />
            <input type="number" placeholder="T (°Celsius)" value={inputs.tC || ''} onChange={e => setInputs({ ...inputs, tC: e.target.value })} className="formula-calc-input" />
          </>
        )}
        {type === 'presion_hidro' && (
          <>
            <input type="number" placeholder="Profundidad h (m)" value={inputs.h || ''} onChange={e => setInputs({ ...inputs, h: e.target.value })} className="formula-calc-input" />
            <input type="number" placeholder="Densidad ρ (kg/m³, agua=1000)" value={inputs.rho || ''} onChange={e => setInputs({ ...inputs, rho: e.target.value })} className="formula-calc-input" />
            <input type="number" placeholder="Gravedad g (m/s², def: 9.8)" value={inputs.g || ''} onChange={e => setInputs({ ...inputs, g: e.target.value })} className="formula-calc-input" />
          </>
        )}
        {type === 'pitagoras' && (
          <>
            <input type="number" placeholder="Cateto a" value={inputs.a || ''} onChange={e => setInputs({ ...inputs, a: e.target.value })} className="formula-calc-input" />
            <input type="number" placeholder="Cateto b (o vacío)" value={inputs.b || ''} onChange={e => setInputs({ ...inputs, b: e.target.value })} className="formula-calc-input" />
            <input type="number" placeholder="Hipotenusa c (si buscas b)" value={inputs.c || ''} onChange={e => setInputs({ ...inputs, c: e.target.value })} className="formula-calc-input" />
          </>
        )}
        {type === 'heron' && (
          <>
            <input type="number" placeholder="Lado a" value={inputs.a || ''} onChange={e => setInputs({ ...inputs, a: e.target.value })} className="formula-calc-input" />
            <input type="number" placeholder="Lado b" value={inputs.b || ''} onChange={e => setInputs({ ...inputs, b: e.target.value })} className="formula-calc-input" />
            <input type="number" placeholder="Lado c" value={inputs.c || ''} onChange={e => setInputs({ ...inputs, c: e.target.value })} className="formula-calc-input" />
          </>
        )}
        {type === 'comercio' && (
          <>
            <input type="number" placeholder="Precio Costo S/." value={inputs.pc || ''} onChange={e => setInputs({ ...inputs, pc: e.target.value })} className="formula-calc-input" />
            <input type="number" placeholder="% Ganancia" value={inputs.pct || ''} onChange={e => setInputs({ ...inputs, pct: e.target.value })} className="formula-calc-input" />
          </>
        )}
        {type === 'conversion_velocidad' && (
          <>
            <input type="number" placeholder="Ingresa km/h (ej: 72)" value={inputs.kmh || ''} onChange={e => setInputs({ ...inputs, kmh: e.target.value, ms: '' })} className="formula-calc-input" />
            <input type="number" placeholder="O ingresa m/s (ej: 20)" value={inputs.ms || ''} onChange={e => setInputs({ ...inputs, ms: e.target.value, kmh: '' })} className="formula-calc-input" />
          </>
        )}
        {type === 'angular' && (
          <input type="number" placeholder="Grados Sexagesimales S (°)" value={inputs.s || ''} onChange={e => setInputs({ ...inputs, s: e.target.value })} className="formula-calc-input" />
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button
          type="button"
          onClick={handleCalc}
          style={{
            padding: '7px 16px',
            borderRadius: '10px',
            background: themeColor,
            color: '#0F172A',
            border: 'none',
            fontWeight: 800,
            fontSize: '0.78rem',
            cursor: 'pointer'
          }}
        >
          Calcular
        </button>

        {result && (
          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: themeColor }}>{result.label}:</span>
            <span style={{ color: '#FDE047', background: 'rgba(253, 224, 71, 0.12)', padding: '2px 8px', borderRadius: '6px' }}>
              {result.val} {result.unit}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// TARJETA DETALLADA INDIVIDUAL (MEMOIZADA)
// ==========================================
const FormulaCardDetailed = React.memo(({
  item,
  theme,
  themePalette,
  isFav,
  isCalcOpen,
  copiedId,
  onToggleFavorite,
  onCopy,
  onToggleCalc,
  onGoToMnemotecnia
}) => {
  const isLight = themePalette?.isLight;

  return (
    <div
      className="formula-card-print formula-card-enter"
      style={{
        background: isLight
          ? 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)'
          : 'linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 30, 0.98) 100%)',
        border: `1.5px solid ${theme.border}`,
        borderRadius: '22px',
        padding: '22px 24px',
        boxShadow: isLight
          ? '0 8px 28px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
          : '0 12px 36px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Trama milimétrica tenue */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(${theme.primary}15 1px, transparent 1px)`,
          backgroundSize: '18px 18px',
          pointerEvents: 'none'
        }}
      />

      {/* Header de la tarjeta */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '10px',
          position: 'relative',
          zIndex: 2
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginBottom: '6px' }}>
            <span
              style={{
                padding: '3px 9px',
                borderRadius: '8px',
                background: theme.bgBadge,
                color: theme.primary,
                fontSize: '0.72rem',
                fontWeight: 900,
                textTransform: 'uppercase'
              }}
            >
              {item.subject}
            </span>

            <span style={{ fontSize: '0.78rem', color: isLight ? '#64748B' : '#94A3B8', fontWeight: 700 }}>
              • {item.topic}
            </span>

            {item.caseTag && (
              <span
                style={{
                  fontSize: '0.70rem',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  background: 'rgba(56, 189, 248, 0.15)',
                  color: isLight ? '#0369A1' : '#38BDF8',
                  fontWeight: 800
                }}
              >
                {item.caseTag}
              </span>
            )}

            <span
              style={{
                fontSize: '0.68rem',
                padding: '2px 8px',
                borderRadius: '6px',
                background: item.level === 'Básica' ? 'rgba(16, 185, 129, 0.15)' : item.level === 'Atajo' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                color: item.level === 'Básica' ? '#059669' : item.level === 'Atajo' ? '#DC2626' : '#D97706',
                fontWeight: 800
              }}
            >
              {item.level === 'Básica' ? 'BÁSICA' : item.level === 'Atajo' ? 'ATAJO / CLAVE' : 'OPERACIONAL'}
            </span>
          </div>

          <h3
            style={{
              margin: 0,
              fontSize: '1.24rem',
              fontWeight: 900,
              color: isLight ? '#0F172A' : '#FFFFFF',
              letterSpacing: '-0.01em'
            }}
          >
            {item.name}
          </h3>
        </div>

        {/* Botones de acción */}
        <div className="no-print" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            type="button"
            onClick={() => onToggleFavorite(item.id)}
            title={isFav ? 'Quitar de favoritas' : 'Guardar en favoritas'}
            style={{
              background: isFav ? 'rgba(245, 158, 11, 0.2)' : isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.06)',
              border: isFav ? '1px solid #F59E0B' : isLight ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '10px',
              padding: '7px 10px',
              color: isFav ? '#D97706' : isLight ? '#64748B' : '#94A3B8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.74rem',
              fontWeight: 700
            }}
          >
            <Star size={14} fill={isFav ? '#F59E0B' : 'none'} color={isFav ? '#F59E0B' : '#64748B'} />
            <span className="hide-mobile">{isFav ? 'Guardada' : 'Guardar'}</span>
          </button>

          <button
            type="button"
            onClick={() => onCopy(item.id, item.latex)}
            title="Copiar código LaTeX oficial"
            style={{
              background: copiedId === item.id ? 'rgba(16, 185, 129, 0.2)' : isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.06)',
              border: copiedId === item.id ? '1px solid #10B981' : isLight ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '10px',
              padding: '7px 10px',
              color: copiedId === item.id ? '#059669' : isLight ? '#64748B' : '#94A3B8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.74rem',
              fontWeight: 700
            }}
          >
            {copiedId === item.id ? <Check size={14} color="#059669" /> : <Copy size={14} />}
            <span>{copiedId === item.id ? '¡Copiada!' : 'LaTeX'}</span>
          </button>
        </div>
      </div>

      {/* VISOR KATEX PRINCIPAL */}
      <div
        style={{
          background: isLight ? 'rgba(248, 250, 252, 0.95)' : 'rgba(2, 6, 23, 0.9)',
          border: `1.5px solid ${theme.border}`,
          borderRadius: '16px',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          boxShadow: isLight
            ? `0 4px 16px ${theme.glow}, inset 0 0 10px rgba(0, 0, 0, 0.03)`
            : `0 4px 24px ${theme.glow}, inset 0 0 20px rgba(0, 0, 0, 0.7)`,
          position: 'relative',
          zIndex: 2
        }}
      >
        <div
          style={{
            fontSize: 'clamp(1.18rem, 2.6vw, 1.55rem)',
            color: theme.primary,
            margin: '4px 0',
            overflowX: 'auto',
            maxWidth: '100%',
            padding: '4px 0',
            filter: isLight ? 'none' : `drop-shadow(0 0 10px ${theme.glow})`
          }}
        >
          {renderMath(item.latex, true)}
        </div>

        {item.desc && (
          <p
            style={{
              margin: '6px 0 0 0',
              fontSize: '0.82rem',
              color: isLight ? '#475569' : '#94A3B8',
              lineHeight: 1.5,
              maxWidth: '94%'
            }}
          >
            {item.desc}
          </p>
        )}
      </div>

      {/* DIAGRAMA CONCEPTUAL VISUAL SVG */}
      <FormulaVisualDiagram formulaId={item.id} themeColor={theme.primary} />

      {/* DESPEJES OPERACIONALES */}
      {item.despejes && item.despejes.length > 0 && (
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              fontSize: '0.68rem',
              fontWeight: 900,
              color: isLight ? '#7C3AED' : '#C084FC',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <Sparkles size={12} color={isLight ? '#7C3AED' : '#C084FC'} />
            <span>DESPEJES OPERACIONALES Y VARIANTES DE EXAMEN</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '8px'
            }}
          >
            {item.despejes.map((despeje, dIdx) => (
              <div
                key={dIdx}
                style={{
                  background: isLight ? 'rgba(147, 51, 234, 0.05)' : 'rgba(255, 255, 255, 0.04)',
                  border: isLight ? '1px solid rgba(147, 51, 234, 0.2)' : '1px solid rgba(192, 132, 252, 0.25)',
                  borderRadius: '12px',
                  padding: '9px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3px'
                }}
              >
                <div style={{ fontSize: '0.70rem', color: isLight ? '#334155' : '#E2E8F0', fontWeight: 800 }}>
                  {despeje.name}
                </div>
                <div
                  style={{
                    fontSize: '1.02rem',
                    color: isLight ? '#6B21A8' : '#E9D5FF',
                    overflowX: 'auto',
                    padding: '2px 0'
                  }}
                >
                  {renderMath(despeje.latex, false)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GLOSARIO DE VARIABLES S.I. */}
      {item.vars && item.vars.length > 0 && (
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              fontSize: '0.68rem',
              fontWeight: 900,
              color: isLight ? '#059669' : '#34D399',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <BookOpen size={12} color={isLight ? '#059669' : '#34D399'} />
            <span>NOMENCLATURA DE VARIABLES Y UNIDADES (S.I.)</span>
          </div>

          <div
            style={{
              background: isLight ? 'rgba(16, 185, 129, 0.06)' : 'rgba(16, 185, 129, 0.05)',
              border: isLight ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '14px',
              padding: '10px 14px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '6px'
            }}
          >
            {item.vars.map((v, vIdx) => (
              <div
                key={vIdx}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '6px',
                  fontSize: '0.78rem'
                }}
              >
                <span
                  style={{
                    fontFamily: "'KaTeX_Math', 'Cambria Math', serif",
                    fontWeight: 900,
                    color: isLight ? '#047857' : '#6EE7B7',
                    fontSize: '0.94rem'
                  }}
                >
                  {renderMath(v.symbol, false)}:
                </span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: isLight ? '#1E293B' : '#F1F5F9', fontWeight: 600 }}>{v.name}</span>
                  {v.unit && (
                    <span style={{ color: isLight ? '#64748B' : '#94A3B8', fontSize: '0.70rem', fontFamily: 'monospace' }}>
                      [{v.unit}]
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DATO IMPORTANTE & MNEMOTECNIA */}
      {(item.datoClave || item.fijaUnsa) && (
        <div
          style={{
            background: isLight
              ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(217, 119, 6, 0.06) 100%)'
              : 'linear-gradient(135deg, rgba(245, 158, 11, 0.10) 0%, rgba(217, 119, 6, 0.04) 100%)',
            border: isLight ? '1.5px solid rgba(245, 158, 11, 0.4)' : '1.5px solid rgba(245, 158, 11, 0.35)',
            borderRadius: '14px',
            padding: '11px 15px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            position: 'relative',
            zIndex: 2
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: 'rgba(245, 158, 11, 0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '1px'
            }}
          >
            <Sparkles size={16} color="#D97706" />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: '0.72rem',
                fontWeight: 900,
                color: isLight ? '#B45309' : '#FBBF24',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '3px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Sparkles size={12} color={isLight ? '#B45309' : '#FBBF24'} />
              <span>DATO IMPORTANTE & MNEMOTECNIA</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: isLight ? '#78350F' : '#FEF3C7', lineHeight: 1.5, fontWeight: 500 }}>
              {item.datoClave || item.fijaUnsa}
            </div>
            {((item.datoClave || item.fijaUnsa)?.toLowerCase().includes('mnemotecnia') || ['fis_mru_basico', 'qui_gases_universal', 'fis_electrodinamica_ohm', 'tri_razones_trigonometricas', 'len_truco_sustantivo', 'len_regla_sega'].includes(item.id)) && (
              <button
                type="button"
                onClick={() => onGoToMnemotecnia(item.subject)}
                style={{
                  marginTop: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  background: 'rgba(245, 158, 11, 0.15)',
                  color: isLight ? '#92400E' : '#FDE047',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Sparkles size={13} color="#D97706" />
                <span>Ver Mnemotecnia Pre-U en Cara B →</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* CALCULADORA OPERACIONAL */}
      {item.calcType && (
        <div className="no-print" style={{ position: 'relative', zIndex: 2 }}>
          <button
            type="button"
            onClick={() => onToggleCalc(item.id)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '9px 14px',
              borderRadius: '12px',
              border: `1px solid ${theme.primary}40`,
              background: isCalcOpen ? `${theme.primary}20` : isLight ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.04)',
              color: isCalcOpen ? theme.primary : isLight ? '#334155' : '#E2E8F0',
              fontWeight: 800,
              fontSize: '0.78rem',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <Calculator size={14} color={theme.primary} />
              <span>Calculadora Operacional en Vivo (Probar con Valores)</span>
            </div>
            {isCalcOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>

          {isCalcOpen && (
            <MiniCalculator type={item.calcType} themeColor={theme.primary} />
          )}
        </div>
      )}
    </div>
  );
});

// ==========================================
// TARJETA DE BOLSILLO COMPACTA (MEMOIZADA)
// ==========================================
const FormulaCardBolsillo = React.memo(({
  item,
  theme,
  themePalette,
  isFav,
  copiedId,
  onToggleFavorite,
  onCopy
}) => {
  const isLight = themePalette?.isLight;

  return (
    <div
      className="formula-card-print formula-card-enter"
      style={{
        background: isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.92)',
        border: `1px solid ${theme.border}`,
        borderRadius: '16px',
        padding: '12px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        boxShadow: isLight ? '0 4px 14px rgba(0, 0, 0, 0.05)' : '0 4px 16px rgba(0, 0, 0, 0.3)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              fontSize: '0.66rem',
              fontWeight: 900,
              padding: '2px 7px',
              borderRadius: '6px',
              background: theme.bgBadge,
              color: theme.primary
            }}
          >
            {item.subject}
          </span>
          <span style={{ fontSize: '0.72rem', color: isLight ? '#64748B' : '#94A3B8', fontWeight: 700 }}>
            {item.topic}
          </span>
          {item.caseTag && (
            <span style={{ fontSize: '0.66rem', color: isLight ? '#0369A1' : '#38BDF8', background: 'rgba(56,189,248,0.1)', padding: '1px 5px', borderRadius: '4px' }}>
              {item.caseTag}
            </span>
          )}
        </div>

        <div className="no-print" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button
            type="button"
            onClick={() => onToggleFavorite(item.id)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px' }}
          >
            <Star size={13} fill={isFav ? '#F59E0B' : 'none'} color={isFav ? '#F59E0B' : '#64748B'} />
          </button>
          <button
            type="button"
            onClick={() => onCopy(item.id, item.latex)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px', color: copiedId === item.id ? '#10B981' : '#64748B' }}
          >
            {copiedId === item.id ? <Check size={13} color="#10B981" /> : <Copy size={13} />}
          </button>
        </div>
      </div>

      <h4 style={{ margin: 0, fontSize: '0.94rem', fontWeight: 800, color: isLight ? '#0F172A' : '#FFFFFF' }}>
        {item.name}
      </h4>

      <div
        style={{
          background: isLight ? 'rgba(241, 245, 249, 0.95)' : 'rgba(2, 6, 23, 0.85)',
          border: `1px solid ${theme.border}`,
          borderRadius: '10px',
          padding: '8px 10px',
          textAlign: 'center',
          fontSize: '1.10rem',
          color: theme.primary,
          overflowX: 'auto'
        }}
      >
        {renderMath(item.latex, true)}
      </div>

      {(item.datoClave || item.fijaUnsa) && (
        <div style={{ fontSize: '0.72rem', color: isLight ? '#92400E' : '#FDE68A', lineHeight: 1.35 }}>
          <strong style={{ color: isLight ? '#B45309' : '#FBBF24' }}>Mnemotecnia: </strong>
          {(item.datoClave || item.fijaUnsa).slice(0, 110)}...
        </div>
      )}
    </div>
  );
});

// ==========================================
// COMPONENTE PRINCIPAL FORMULARIO PAGE
// ==========================================
export const FormularioPage = () => {
  const navigate = useNavigate();
  const { theme: activeThemeKey } = useTheme();
  const themePalette = getThemePalette(activeThemeKey);

  // Estados
  const [activePortal, setActivePortal] = useState('formulas'); // 'formulas' (Cara A) | 'mnemotecnias' (Cara B)
  const [selectedSubject, setSelectedSubject] = useState('Todos');
  const [selectedTopic, setSelectedTopic] = useState('Todos');
  const [selectedLevel, setSelectedLevel] = useState('Todos'); // 'Todos' | 'Básica' | 'Operacional' | 'Atajo'
  const [searchQuery, setSearchQuery] = useState('');
  // React 18 Concurrent Deferred Query para evitar congelamientos de entrada al tipear
  const deferredQuery = React.useDeferredValue ? React.useDeferredValue(searchQuery) : searchQuery;

  const [viewMode, setViewMode] = useState('detallado'); // 'detallado' | 'bolsillo' | 'favoritas'
  const [activeCalcId, setActiveCalcId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Renderizado Progresivo por Lotes (Evita inyectar 50,000 elementos DOM de golpe)
  const INITIAL_BATCH = 12;
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);
  const sentinelRef = useRef(null);

  // Materias con Mnemotecnias en Cara B
  const MNEMONIC_SUBJECTS = ['Todos', 'Física', 'Química', 'Trigonometría', 'Lenguaje', 'Biología', 'Aritmética'];

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('rastro_formulas_favs');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('rastro_formulas_favs', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Reiniciar conteo visible cuando cambian filtros
  useEffect(() => {
    setVisibleCount(INITIAL_BATCH);
  }, [selectedSubject, selectedTopic, selectedLevel, deferredQuery, viewMode, activePortal]);

  // Extraer lista de temas dinámicos según materia seleccionada
  const availableTopics = useMemo(() => {
    const list = ['Todos'];
    FORMULAS_CANONICAS.forEach(f => {
      if (selectedSubject === 'Todos' || f.subject === selectedSubject) {
        if (!list.includes(f.topic)) {
          list.push(f.topic);
        }
      }
    });
    return list;
  }, [selectedSubject]);

  useEffect(() => {
    if (!availableTopics.includes(selectedTopic)) {
      setSelectedTopic('Todos');
    }
  }, [selectedSubject, availableTopics, selectedTopic]);

  // Contadores por materia para Cara A
  const countsBySubject = useMemo(() => {
    const map = {};
    FORMULAS_CANONICAS.forEach(f => {
      map[f.subject] = (map[f.subject] || 0) + 1;
    });
    return map;
  }, []);

  // Contadores por materia para Cara B (Mnemotecnias)
  const mnemonicCountsBySubject = useMemo(() => {
    const map = {};
    (MNEMOTECNIAS_PREU || []).forEach(m => {
      if (m && m.subject) {
        map[m.subject] = (map[m.subject] || 0) + 1;
      }
    });
    return map;
  }, []);
  const countsMnemotecniasBySubject = mnemonicCountsBySubject;

  // Fórmulas filtradas para Cara A (usando deferredQuery no bloqueante)
  const filteredFormulas = useMemo(() => {
    return FORMULAS_CANONICAS.filter(item => {
      if (selectedSubject !== 'Todos' && item.subject !== selectedSubject) return false;
      if (selectedTopic !== 'Todos' && item.topic !== selectedTopic) return false;
      if (selectedLevel !== 'Todos' && item.level !== selectedLevel) return false;
      if (viewMode === 'favoritas' && !favorites.includes(item.id)) return false;

      if (deferredQuery.trim()) {
        const q = deferredQuery.toLowerCase();
        const matchName = item.name?.toLowerCase().includes(q);
        const matchTopic = item.topic?.toLowerCase().includes(q);
        const matchSubject = item.subject?.toLowerCase().includes(q);
        const matchPlain = item.plain?.toLowerCase().includes(q);
        const matchLatex = item.latex?.toLowerCase().includes(q);
        const matchDesc = item.desc?.toLowerCase().includes(q);
        const matchCase = item.caseTag?.toLowerCase().includes(q);
        const matchDato = item.datoClave?.toLowerCase().includes(q);
        const matchFija = item.fijaUnsa?.toLowerCase().includes(q);
        return (matchName || matchTopic || matchSubject || matchPlain || matchLatex || matchDesc || matchCase || matchDato || matchFija);
      }
      return true;
    });
  }, [selectedSubject, selectedTopic, selectedLevel, viewMode, favorites, deferredQuery]);

  // Fórmulas visibles por lotes
  const displayedFormulas = useMemo(() => {
    return filteredFormulas.slice(0, visibleCount);
  }, [filteredFormulas, visibleCount]);

  // Sentinel IntersectionObserver para scroll suave infinito
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount(prev => Math.min(prev + 12, filteredFormulas.length));
      }
    }, { rootMargin: '350px' });

    observer.observe(el);
    return () => observer.disconnect();
  }, [filteredFormulas.length, visibleCount]);

  // Mnemotecnias filtradas para Cara B
  const filteredMnemonics = useMemo(() => {
    return MNEMOTECNIAS_PREU.filter(item => {
      if (selectedSubject !== 'Todos' && item.subject !== selectedSubject) return false;
      if (viewMode === 'favoritas' && !favorites.includes(item.id)) return false;

      if (deferredQuery.trim()) {
        const q = deferredQuery.toLowerCase();
        const matchTitle = item.title?.toLowerCase().includes(q);
        const matchSubject = item.subject?.toLowerCase().includes(q);
        const matchTopic = item.topic?.toLowerCase().includes(q);
        const matchCatch = item.catchphrase?.toLowerCase().includes(q);
        const matchHook = item.hook?.toLowerCase().includes(q);
        const matchFormula = item.formula?.toLowerCase().includes(q);
        return (matchTitle || matchSubject || matchTopic || matchCatch || matchHook || matchFormula);
      }
      return true;
    });
  }, [selectedSubject, viewMode, favorites, deferredQuery]);

  const currentTheme = SUBJECT_THEMES[selectedSubject] || SUBJECT_THEMES['Todos'];

  return (
    <div
      className="formulario-master-container"
      style={{
        minHeight: '100vh',
        background: themePalette.isLight
          ? `radial-gradient(ellipse 80% 50% at 50% 8%, rgba(${themePalette.accentRgb}, 0.12) 0%, transparent 70%),
             radial-gradient(ellipse 60% 45% at 85% 65%, rgba(${themePalette.accentRgb}, 0.08) 0%, transparent 60%),
             ${themePalette.bgBase}`
          : `radial-gradient(ellipse 80% 50% at 50% 8%, rgba(${themePalette.accentRgb}, 0.22) 0%, transparent 70%),
             radial-gradient(ellipse 60% 45% at 85% 65%, rgba(${themePalette.accentRgb}, 0.12) 0%, transparent 60%),
             ${themePalette.bgBase}`,
        color: themePalette.textPrimary,
        padding: '0 16px 120px',
        boxSizing: 'border-box'
      }}
    >
      <style>{`
        .formula-card-enter {
          animation: formulaFadeIn 0.25s ease-out forwards;
        }
        @keyframes formulaFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .formula-calc-input {
          width: 100%;
          padding: 8px 12px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(15, 23, 42, 0.9);
          color: #F8FAFC;
          font-size: 0.8rem;
          font-weight: 600;
          box-sizing: border-box;
          outline: none;
        }
        .formula-calc-input:focus {
          border-color: #38BDF8;
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.25);
        }
        .katex-display {
          overflow-x: auto;
          overflow-y: hidden;
          max-width: 100%;
          padding: 4px 0;
          -webkit-overflow-scrolling: touch;
        }
        .katex-display::-webkit-scrollbar {
          height: 4px;
        }
        .katex-display::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        @media (max-width: 640px) {
          .formula-card-print {
            padding: 16px 14px !important;
          }
          .formula-calc-input {
            font-size: 0.76rem !important;
            padding: 6px 10px !important;
          }
        }
        @media print {
          body {
            background: #FFFFFF !important;
            color: #000000 !important;
          }
          .no-print, nav, header, .liquid-navbar, button {
            display: none !important;
          }
          .formulario-master-container {
            padding: 0 !important;
            background: #FFFFFF !important;
            color: #000000 !important;
          }
          .formula-card-print {
            border: 1px solid #CCCCCC !important;
            background: #FFFFFF !important;
            color: #000000 !important;
            break-inside: avoid;
            box-shadow: none !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        {/* BARRA SUPERIOR */}
        {/* BARRA SUPERIOR MINIMALISTA (Estilo iOS Glance / Google Clean) */}
        <div
          className="no-print"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 4px',
            borderBottom: '1px solid var(--card-border, rgba(120, 120, 128, 0.12))',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '10px'
          }}
        >
          {/* Botón Volver Limpio */}
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate('/');
              }
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '12px',
              border: '1px solid var(--card-border, rgba(120, 120, 128, 0.16))',
              background: 'var(--card-bg, #FFFFFF)',
              color: 'var(--text-main, #0F172A)',
              fontWeight: 800,
              fontSize: '0.84rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <ArrowLeft size={16} />
            <span>Volver</span>
          </button>

          {/* Título Central Sobrio */}
          <div style={{ textAlign: 'center' }}>
            <h2 style={{
              margin: 0,
              fontSize: '1.05rem',
              fontWeight: 900,
              color: 'var(--text-main, #0F172A)',
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>Fórmulas & Truquitos Pre-U</span>
            </h2>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary, #64748B)', fontWeight: 600 }}>
              {activePortal === 'formulas' 
                ? `${filteredFormulas.length} fórmulas clasificadas` 
                : `${filteredMnemonics.length} mnemotecnias activas`}
            </span>
          </div>

          {/* Botón Imprimir Ficha */}
          <button
            type="button"
            onClick={handlePrint}
            title="Imprimir compendio para repaso"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '8px 12px',
              borderRadius: '12px',
              border: '1px solid var(--card-border, rgba(120, 120, 128, 0.16))',
              background: 'var(--card-bg, #FFFFFF)',
              color: 'var(--text-main, #0F172A)',
              fontWeight: 700,
              fontSize: '0.78rem',
              cursor: 'pointer'
            }}
          >
            <Printer size={14} />
            <span className="hide-mobile">Imprimir</span>
          </button>
        </div>

        {/* CONMUTADOR DE CARAS (Segmented Control Estilo iOS / Google Tabs) */}
        <div
          className="no-print"
          style={{
            display: 'flex',
            maxWidth: '520px',
            margin: '0 auto 16px',
            background: 'rgba(120, 120, 128, 0.10)',
            padding: '4px',
            borderRadius: '16px',
            gap: '4px'
          }}
        >
          <button
            type="button"
            onClick={() => {
              setActivePortal('formulas');
              if (!Object.keys(SUBJECT_THEMES).includes(selectedSubject)) {
                setSelectedSubject('Todos');
              }
            }}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '12px',
              border: 'none',
              background: activePortal === 'formulas' ? 'var(--card-bg, #FFFFFF)' : 'transparent',
              color: activePortal === 'formulas' ? 'var(--accent-color, #007AFF)' : 'var(--text-secondary, #64748B)',
              fontWeight: 800,
              fontSize: '0.84rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '7px',
              boxShadow: activePortal === 'formulas' ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
              transition: 'all 0.18s ease'
            }}
          >
            <Calculator size={16} />
            <span>Cara A: Fórmulas</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActivePortal('mnemotecnias');
              if (!MNEMONIC_SUBJECTS.includes(selectedSubject)) {
                setSelectedSubject('Todos');
              }
            }}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '12px',
              border: 'none',
              background: activePortal === 'mnemotecnias' ? 'var(--card-bg, #FFFFFF)' : 'transparent',
              color: activePortal === 'mnemotecnias' ? '#A855F7' : 'var(--text-secondary, #64748B)',
              fontWeight: 800,
              fontSize: '0.84rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '7px',
              boxShadow: activePortal === 'mnemotecnias' ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
              transition: 'all 0.18s ease'
            }}
          >
            <Sparkles size={16} />
            <span>Cara B: Mnemotecnias</span>
          </button>
        </div>

        {/* BUSCADOR LIMPIO TIPO GOOGLE SEARCH */}
        <div className="no-print" style={{ position: 'relative', maxWidth: '640px', margin: '0 auto 18px' }}>
          <Search
            size={17}
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-secondary, #94A3B8)'
            }}
          />
          <input
            type="text"
            placeholder={activePortal === 'formulas'
              ? "Buscar fórmula o tema (ej: Ohm, Torricelli, MRUV, Gases)..."
              : "Buscar mnemotecnia (ej: Diosito, Pavo Ratón, Purinas, SEGA)..."}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 42px 12px 44px',
              borderRadius: '16px',
              border: '1px solid var(--card-border, rgba(120, 120, 128, 0.18))',
              background: 'var(--card-bg, #FFFFFF)',
              color: 'var(--text-main, #0F172A)',
              fontSize: '0.90rem',
              fontWeight: 600,
              boxSizing: 'border-box',
              outline: 'none',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(120, 120, 128, 0.15)',
                border: 'none',
                color: 'var(--text-secondary, #64748B)',
                cursor: 'pointer',
                borderRadius: '50%',
                width: '22px',
                height: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.72rem',
                fontWeight: 800
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* SELECTOR DE MODO DE VISUALIZACIÓN COMPACTO (Estilo iOS Segmented) */}
        <div
          className="no-print"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '14px',
            flexWrap: 'wrap'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              background: 'rgba(120, 120, 128, 0.10)',
              padding: '3px',
              borderRadius: '14px',
              border: '1px solid var(--card-border, rgba(120, 120, 128, 0.14))',
              gap: '2px'
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode('detallado')}
              style={{
                padding: '6px 14px',
                borderRadius: '10px',
                border: 'none',
                background: viewMode === 'detallado' ? 'var(--card-bg, #FFFFFF)' : 'transparent',
                color: viewMode === 'detallado' ? 'var(--accent-color, #0284C7)' : 'var(--text-secondary, #64748B)',
                fontWeight: 800,
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: viewMode === 'detallado' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <BookOpen size={13} /> Detallada ({activePortal === 'formulas' ? filteredFormulas.length : filteredMnemonics.length})
            </button>

            <button
              type="button"
              onClick={() => setViewMode('bolsillo')}
              style={{
                padding: '6px 14px',
                borderRadius: '10px',
                border: 'none',
                background: viewMode === 'bolsillo' ? 'var(--card-bg, #FFFFFF)' : 'transparent',
                color: viewMode === 'bolsillo' ? '#A855F7' : 'var(--text-secondary, #64748B)',
                fontWeight: 800,
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: viewMode === 'bolsillo' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <Grid size={13} /> Bolsillo
            </button>

            <button
              type="button"
              onClick={() => setViewMode('favoritas')}
              style={{
                padding: '6px 14px',
                borderRadius: '10px',
                border: 'none',
                background: viewMode === 'favoritas' ? 'var(--card-bg, #FFFFFF)' : 'transparent',
                color: viewMode === 'favoritas' ? '#D97706' : 'var(--text-secondary, #64748B)',
                fontWeight: 800,
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: viewMode === 'favoritas' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <Star size={13} fill={viewMode === 'favoritas' ? '#D97706' : 'none'} /> Guardadas ({favorites.length})
            </button>
          </div>
        </div>

        {/* SELECTOR DE NIVEL / DIFICULTAD COMPACTO (EXCLUSIVO CARA A) */}
        {activePortal === 'formulas' && (
          <div
            className="no-print"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '14px',
              flexWrap: 'wrap'
            }}
          >
            {[
              { id: 'Todos', label: 'Todos' },
              { id: 'Básica', label: 'Básicas' },
              { id: 'Operacional', label: 'Aplicadas' },
              { id: 'Atajo', label: 'Atajos Pre-U' }
            ].map(lvl => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => setSelectedLevel(lvl.id)}
                style={{
                  padding: '4px 11px',
                  borderRadius: '999px',
                  border: selectedLevel === lvl.id ? '1px solid var(--accent-color, #0284C7)' : '1px solid var(--card-border, rgba(120, 120, 128, 0.16))',
                  background: selectedLevel === lvl.id ? 'rgba(2, 132, 199, 0.12)' : 'var(--card-bg, #FFFFFF)',
                  color: selectedLevel === lvl.id ? 'var(--accent-color, #0284C7)' : 'var(--text-secondary, #64748B)',
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        )}

        {/* SELECTOR DE MATERIAS (PILLS) */}
        <div
          className="no-print"
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '10px',
            marginBottom: '14px',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {(activePortal === 'formulas' ? Object.keys(SUBJECT_THEMES) : MNEMONIC_SUBJECTS).map(subj => {
            const isSelected = selectedSubject === subj;
            const theme = SUBJECT_THEMES[subj] || SUBJECT_THEMES['Todos'];
            const Icon = theme.icon;
            const count = activePortal === 'formulas' ? (countsBySubject?.[subj] || 0) : (mnemonicCountsBySubject?.[subj] || countsMnemotecniasBySubject?.[subj] || 0);

            return (
              <button
                key={subj}
                type="button"
                onClick={() => setSelectedSubject(subj)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '9px 16px',
                  borderRadius: '14px',
                  border: isSelected ? `2px solid ${theme.primary}` : themePalette.isLight ? '1.5px solid rgba(0, 0, 0, 0.1)' : '1.5px solid rgba(255, 255, 255, 0.1)',
                  background: isSelected ? theme.bgBadge : themePalette.isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.7)',
                  color: isSelected ? theme.primary : themePalette.textSecondary,
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: isSelected ? `0 4px 14px ${theme.glow}` : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={14} color={isSelected ? theme.primary : '#64748B'} />
                <span>{subj}</span>
                <span
                  style={{
                    fontSize: '0.70rem',
                    padding: '2px 6px',
                    borderRadius: '999px',
                    background: isSelected ? theme.primary : themePalette.isLight ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.08)',
                    color: isSelected ? '#FFFFFF' : themePalette.textSecondary,
                    fontWeight: 900
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* SUBFILTRO DE TEMAS DINÁMICOS (EXCLUSIVO CARA A) */}
        {activePortal === 'formulas' && availableTopics.length > 2 && (
          <div
            className="no-print"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              overflowX: 'auto',
              paddingBottom: '12px',
              marginBottom: '22px',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: themePalette.textMuted, textTransform: 'uppercase', marginRight: '4px' }}>
              Tema:
            </span>
            {availableTopics.map(topic => {
              const isSelected = selectedTopic === topic;
              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSelectedTopic(topic)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '10px',
                    border: isSelected ? `1px solid ${currentTheme.primary}` : themePalette.isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)',
                    background: isSelected ? currentTheme.primary : themePalette.isLight ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.04)',
                    color: isSelected ? '#FFFFFF' : themePalette.textSecondary,
                    fontWeight: 700,
                    fontSize: '0.74rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {topic}
                </button>
              );
            })}
          </div>
        )}

        {activePortal === 'mnemotecnias' ? (
          <MnemotecniasVaultView
            mnemonics={filteredMnemonics}
            viewMode={viewMode}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            copiedId={copiedId}
            handleCopy={handleCopy}
            renderMath={renderMath}
            SUBJECT_THEMES={SUBJECT_THEMES}
            themePalette={themePalette}
            onGoToFormulas={() => setActivePortal('formulas')}
          />
        ) : (
          <>
            {/* ESTADO VACÍO */}
            {filteredFormulas.length === 0 && (
              <div
                style={{
                  padding: '60px 20px',
                  textAlign: 'center',
                  background: themePalette.isLight ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 0.8)',
                  borderRadius: '24px',
                  border: themePalette.isLight ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)',
                  maxWidth: '500px',
                  margin: '30px auto'
                }}
              >
                <AlertTriangle size={36} color="#F59E0B" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ margin: '0 0 6px', fontSize: '1.1rem', color: themePalette.textPrimary }}>
                  {viewMode === 'favoritas' ? 'No tienes fórmulas guardadas aún' : 'No se encontraron fórmulas'}
                </h3>
                <p style={{ color: themePalette.textSecondary, fontSize: '0.86rem', margin: 0 }}>
                  {viewMode === 'favoritas'
                    ? 'Presiona la estrella ⭐ en cualquier fórmula para agregarla a tu hoja de fórmulas personal.'
                    : `No encontramos fórmulas que coincidan con los filtros seleccionados.`}
                </p>
              </div>
            )}

            {/* MODO 1: PIZARRA CIENTÍFICA DETALLADA */}
            {viewMode === 'detallado' && filteredFormulas.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {displayedFormulas.map(item => {
                  const theme = SUBJECT_THEMES[item.subject] || SUBJECT_THEMES['Todos'];
                  const isFav = favorites.includes(item.id);
                  const isCalcOpen = activeCalcId === item.id;

                  return (
                    <FormulaCardDetailed
                      key={item.id}
                      item={item}
                      theme={theme}
                      themePalette={themePalette}
                      isFav={isFav}
                      isCalcOpen={isCalcOpen}
                      copiedId={copiedId}
                      onToggleFavorite={toggleFavorite}
                      onCopy={handleCopy}
                      onToggleCalc={id => setActiveCalcId(prev => prev === id ? null : id)}
                      onGoToMnemotecnia={subj => {
                        setActivePortal('mnemotecnias');
                        if (MNEMONIC_SUBJECTS.includes(subj)) {
                          setSelectedSubject(subj);
                        }
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  );
                })}

                {/* BOTÓN & SENTINEL DE CARGA PROGRESIVA */}
                {filteredFormulas.length > visibleCount && (
                  <div className="no-print" style={{ textAlign: 'center', padding: '24px 0' }}>
                    <div ref={sentinelRef} style={{ height: '20px', margin: '-10px 0' }} />
                    <button
                      type="button"
                      onClick={() => setVisibleCount(prev => Math.min(prev + 12, filteredFormulas.length))}
                      style={{
                        padding: '11px 22px',
                        borderRadius: '14px',
                        border: `1.5px solid ${currentTheme.primary}`,
                        background: `rgba(${themePalette.accentRgb}, 0.15)`,
                        color: themePalette.isLight ? currentTheme.secondary : '#FFFFFF',
                        fontWeight: 900,
                        fontSize: '0.84rem',
                        cursor: 'pointer',
                        boxShadow: `0 4px 16px ${currentTheme.glow}`,
                        marginRight: '10px'
                      }}
                    >
                      Cargar más fórmulas ({visibleCount} de {filteredFormulas.length}) ⬇️
                    </button>
                    <button
                      type="button"
                      onClick={() => setVisibleCount(filteredFormulas.length)}
                      style={{
                        padding: '11px 18px',
                        borderRadius: '14px',
                        border: themePalette.isLight ? '1px solid rgba(0, 0, 0, 0.15)' : '1px solid rgba(255, 255, 255, 0.15)',
                        background: themePalette.isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.05)',
                        color: themePalette.textSecondary,
                        fontWeight: 700,
                        fontSize: '0.80rem',
                        cursor: 'pointer'
                      }}
                    >
                      Mostrar todas ({filteredFormulas.length})
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* MODO 2: FICHA DE BOLSILLO */}
            {viewMode === 'bolsillo' && filteredFormulas.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(310px, 100%), 1fr))',
                    gap: '12px'
                  }}
                >
                  {displayedFormulas.map(item => {
                    const theme = SUBJECT_THEMES[item.subject] || SUBJECT_THEMES['Todos'];
                    const isFav = favorites.includes(item.id);

                    return (
                      <FormulaCardBolsillo
                        key={item.id}
                        item={item}
                        theme={theme}
                        themePalette={themePalette}
                        isFav={isFav}
                        copiedId={copiedId}
                        onToggleFavorite={toggleFavorite}
                        onCopy={handleCopy}
                      />
                    );
                  })}
                </div>

                {filteredFormulas.length > visibleCount && (
                  <div className="no-print" style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div ref={sentinelRef} style={{ height: '20px', margin: '-10px 0' }} />
                    <button
                      type="button"
                      onClick={() => setVisibleCount(prev => Math.min(prev + 12, filteredFormulas.length))}
                      style={{
                        padding: '10px 22px',
                        borderRadius: '14px',
                        border: `1.5px solid ${currentTheme.primary}`,
                        background: `rgba(${themePalette.accentRgb}, 0.15)`,
                        color: themePalette.isLight ? currentTheme.secondary : '#FFFFFF',
                        fontWeight: 900,
                        fontSize: '0.84rem',
                        cursor: 'pointer',
                        boxShadow: `0 4px 16px ${currentTheme.glow}`,
                        marginRight: '10px'
                      }}
                    >
                      Cargar más fichas ({visibleCount} de {filteredFormulas.length}) ⬇️
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* MODO 3: FAVORITAS */}
            {viewMode === 'favoritas' && filteredFormulas.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div
                  style={{
                    padding: '12px 18px',
                    borderRadius: '14px',
                    background: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: '#D97706',
                    fontSize: '0.84rem',
                    fontWeight: 700
                  }}
                >
                  <span>⭐ Tu colección personal de fórmulas guardadas ({filteredFormulas.length})</span>
                  <button
                    type="button"
                    onClick={() => setFavorites([])}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#DC2626',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    Vaciar Colección
                  </button>
                </div>

                {filteredFormulas.map(item => {
                  const theme = SUBJECT_THEMES[item.subject] || SUBJECT_THEMES['Todos'];
                  const isFav = favorites.includes(item.id);
                  const isCalcOpen = activeCalcId === item.id;

                  return (
                    <FormulaCardDetailed
                      key={item.id}
                      item={item}
                      theme={theme}
                      themePalette={themePalette}
                      isFav={isFav}
                      isCalcOpen={isCalcOpen}
                      copiedId={copiedId}
                      onToggleFavorite={toggleFavorite}
                      onCopy={handleCopy}
                      onToggleCalc={id => setActiveCalcId(prev => prev === id ? null : id)}
                      onGoToMnemotecnia={subj => {
                        setActivePortal('mnemotecnias');
                        if (MNEMONIC_SUBJECTS.includes(subj)) {
                          setSelectedSubject(subj);
                        }
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FormularioPage;
