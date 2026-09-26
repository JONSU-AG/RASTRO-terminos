import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  Sparkles,
  Heart,
  Lock,
  Check,
  Play,
  BookOpen,
  Star,
  Trophy,
  Gift,
  X,
  ChevronRight,
  Compass,
  ArrowRight,
  Share2,
  Zap,
  CheckCircle2,
  Target,
  GraduationCap,
  Rocket,
  Orbit,
  Telescope,
  Timer,
  Dna,
  Globe,
  Scale,
  FlaskConical,
  Brain,
  Feather,
  Calculator,
  Languages,
  Landmark,
  FileText,
  Binary,
  LayoutGrid,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Palette,
  Bookmark,
  Flag,
  Sigma,
  Lightbulb
} from 'lucide-react';
import {
  SUBJECTS_CONFIG,
  getLessonsForSubject,
  CEPREUNSA_OFFICIAL_THEORY
} from '../data/learningPathData';
import { useGamification } from '../context/GamificationContext';
import { usePomodoro } from '../context/PomodoroContext';
import { useTheme } from '../context/ThemeContext';
import { getThemePalette } from '../utils/themeImmersion';
import { LessonEngine } from '../components/aprender/LessonEngine';
import { RankingSimulacroModal } from '../components/RankingSimulacroModal';
import AnimatedCounter from '../components/AnimatedCounter';
import { DuolingoFlameIcon } from '../components/DuolingoFlameIcon';
import { OrsttyMascot, ArtyonMascot, MascotDialogue, DynamicMascot, DualMascotDuo } from '../components/Mascots';
import { FormulaDisplay } from '../components/FormulaDisplay';
import { CourseFlashcardsModal } from '../components/CourseFlashcardsModal';
import { LiteraturaViewerModal } from '../components/LiteraturaViewerModal';
import { LITERATURA_OBRAS } from '../data/literaturaData';

// Iconos vectoriales nítidos para cada una de las 15 asignaturas sin cortes ni desfases tipográficos
export const SubjectLucideIcon = ({ id, size = 18, color = 'currentColor' }) => {
  const norm = (id || '').toLowerCase();
  if (norm.includes('físic') || norm.includes('fisic')) return <Zap size={size} color={color === 'currentColor' ? '#FDE047' : color} fill={color === 'currentColor' ? '#FEF08A' : undefined} strokeWidth={2.4} />;
  if (norm.includes('filosof')) return <Brain size={size} color={color} strokeWidth={2.2} />;
  if (norm.includes('biolog')) return <Dna size={size} color={color} strokeWidth={2.2} />;
  if (norm.includes('lengua')) return <FileText size={size} color={color} strokeWidth={2.2} />;
  if (norm.includes('histor')) return <Landmark size={size} color={color} strokeWidth={2.2} />;
  if (norm.includes('psicol')) return <Brain size={size} color={color} strokeWidth={2.2} />;
  if (norm.includes('quimic')) return <FlaskConical size={size} color={color} strokeWidth={2.2} />;
  if (norm.includes('civic')) return <Scale size={size} color={color} strokeWidth={2.2} />;
  if (norm.includes('geograf')) return <Globe size={size} color={color} strokeWidth={2.2} />;
  if (norm.includes('logic')) return <Orbit size={size} color={color} strokeWidth={2.2} />;
  if (norm.includes('matem')) return <Calculator size={size} color={color} strokeWidth={2.2} />;
  if (norm.includes('verbal')) return <Feather size={size} color={color} strokeWidth={2.2} />;
  if (norm.includes('literat')) return <BookOpen size={size} color={color} strokeWidth={2.2} />;
  if (norm.includes('algeb')) return <Binary size={size} color={color} strokeWidth={2.2} />;
  if (norm.includes('ingl') || norm.includes('engl')) return <Languages size={size} color={color} strokeWidth={2.2} />;
  return <GraduationCap size={size} color={color} strokeWidth={2.2} />;
};

// Consejos especializados de ORSTTY para cada uno de los 15 cursos oficiales
const SUBJECT_MASCOT_TIPS = {
  'Filosofía': '¡Filosofía define el área de Sociales! Las preguntas sobre Epistemología y Ética se repiten en cada examen ordinario.',
  'Historia': '¡Domina la cronología de las culturas preincas y la República! Suelen venir 3 preguntas directas en admisión.',
  'Lenguaje': '¡Atención a la acentuación diacrítica y la concordancia nominal! Son puntos fijos que no debes regalar.',
  'Literatura': '¡Repasa la Generación del 50 y el Vanguardismo peruano! Preguntas clave de comprensión e interpretación.',
  'Cívica': '¡La Constitución de 1993 y las garantías constitucionales (Habeas Corpus y Amparo) entran siempre!',
  'Geografía': '¡Aprende las 8 regiones naturales de Javier Pulgar Vidal y el relieve peruano al revés y al derecho!',
  'Biología': '¡Biología representa casi 15 preguntas en Biomédicas! Domina Genética mendeliana y Citología celular.',
  'Química': '¡Estequiometría y Enlace Químico son decisivos! Asegura tus despejes y balanceo por tanteo y redox.',
  'Psicología': '¡Procesos cognitivos: memoria, percepción y teorías del aprendizaje son los temas estrella de la evaluación!',
  'Álgebra': '¡Polinomios, Productos Notables y Logaritmos son el corazón de las matemáticas en Ingenierías!',
  'Física': '¡Cinemática, Dinámica y Electrostática! Dibuja siempre tu diagrama de cuerpo libre (DCL) antes de operar.',
  'Raz. Matemático': '¡Planteo de ecuaciones y certezas te dan máxima velocidad! No te quedes más de 2 minutos por ejercicio.',
  'Raz. Lógico': '¡Tablas de verdad y equivalencias lógicas! Resuélvelas con método abreviado para ahorrar valiosos segundos.',
  'Raz. Verbal': '¡Antónimos contextuales y conectores lógicos! Es la sección con mayor peso en el baremo oficial.',
  'Inglés': '¡Comprensión de lectura y tiempos verbales básicos! Asegura esos 5 puntos que marcan la diferencia de ingreso.'
};

// Red de conexiones sinérgicas entre los 15 cursos oficiales (Constelaciones del Saber)
const SUBJECT_CONNECTIONS = {
  'Filosofía': {
    area: 'Sociales y Humanidades',
    connected: ['Historia', 'Lenguaje', 'Cívica'],
    synergyTip: 'El pensamiento crítico de Filosofía fundamenta el análisis histórico y la argumentación en Lenguaje.'
  },
  'Historia': {
    area: 'Sociales y Humanidades',
    connected: ['Filosofía', 'Geografía', 'Cívica'],
    synergyTip: 'Conecta los procesos históricos con las transformaciones del espacio territorial en Geografía.'
  },
  'Lenguaje': {
    area: 'Sociales y Humanidades',
    connected: ['Literatura', 'Raz. Verbal', 'Filosofía'],
    synergyTip: 'La normativa gramatical y sintaxis son la base directa para la comprensión en Raz. Verbal y Literatura.'
  },
  'Literatura': {
    area: 'Sociales y Humanidades',
    connected: ['Lenguaje', 'Historia', 'Raz. Verbal'],
    synergyTip: 'El contexto sociohistórico es indispensable para descifrar las corrientes literarias evaluadas en admisión.'
  },
  'Cívica': {
    area: 'Sociales y Humanidades',
    connected: ['Filosofía', 'Historia', 'Geografía'],
    synergyTip: 'Los derechos constitucionales y la estructura del Estado nacen de la filosofía política y la historia peruana.'
  },
  'Geografía': {
    area: 'Sociales y Humanidades',
    connected: ['Historia', 'Cívica', 'Biología'],
    synergyTip: 'El geosistema y las 8 regiones naturales se articulan con los ecosistemas vivos de Biología.'
  },
  'Biología': {
    area: 'Biomédicas',
    connected: ['Química', 'Psicología', 'Geografía'],
    synergyTip: 'Las bases moleculares de la célula y el ADN dependen directamente de los enlaces de Química.'
  },
  'Química': {
    area: 'Biomédicas / Ciencias',
    connected: ['Biología', 'Física', 'Álgebra'],
    synergyTip: 'La estructura atómica y estequiometría se apoyan en los despejes matemáticos de Álgebra y la Física.'
  },
  'Psicología': {
    area: 'Biomédicas / Sociales',
    connected: ['Biología', 'Filosofía', 'Cívica'],
    synergyTip: 'Las bases neurobiológicas de la memoria y percepción se conectan con el sistema nervioso de Biología.'
  },
  'Álgebra': {
    area: 'Ingenierías / Ciencias',
    connected: ['Física', 'Raz. Matemático', 'Química'],
    synergyTip: 'El dominio de productos notables y polinomios es el motor operativo para resolver ejercicios de Física.'
  },
  'Física': {
    area: 'Ingenierías / Ciencias',
    connected: ['Álgebra', 'Raz. Matemático', 'Química'],
    synergyTip: 'Los vectores y cinemática aplican de forma inmediata las leyes algebraicas y de razonamiento numérico.'
  },
  'Raz. Matemático': {
    area: 'Todas las Áreas',
    connected: ['Álgebra', 'Raz. Lógico', 'Física'],
    synergyTip: 'Las sucesiones y sumatorias te otorgan agilidad mental y velocidad en todas las preguntas de cálculo.'
  },
  'Raz. Lógico': {
    area: 'Todas las Áreas',
    connected: ['Filosofía', 'Raz. Matemático', 'Raz. Verbal'],
    synergyTip: 'Las inferencias y tablas de verdad estructuran el rigor lógico en cualquier carrera que elijas.'
  },
  'Raz. Verbal': {
    area: 'Todas las Áreas',
    connected: ['Lenguaje', 'Literatura', 'Inglés'],
    synergyTip: 'La precisión léxica y comprensión textual representan el mayor porcentaje de puntos en el examen de admisión.'
  },
  'Inglés': {
    area: 'Todas las Áreas',
    connected: ['Raz. Verbal', 'Lenguaje'],
    synergyTip: 'La gramática comparada y la deducción de textos en inglés aseguran tus puntos decisivos de vacante.'
  }
};

// ==========================================================================
// RUTA DE APRENDIZAJE MODERNA ESTILO DUOLINGO • CEPREUNSA
// Conexión precisa de nodos por curvas Bezier, botones 3D y temas dinámicos
// ==========================================================================

// Componente orbital de Anillo de Progreso Planetario Estilo Duolingo con iluminación de partes (subtemas)
export const PlanetProgressRing = ({
  size = 104,
  totalParts = 4,
  completedParts = 0,
  color = '#38BDF8',
  isCurrent = false,
  isMastered = false,
  isChest = false,
  isTrophy = false
}) => {
  if (isChest || isTrophy || totalParts <= 1) return null;

  const radius = (size - 14) / 2;
  const circumference = 2 * Math.PI * radius;
  const parts = Math.max(1, totalParts);
  const gap = parts > 1 ? 8 : 0;
  const segmentLength = Math.max(1, (circumference / parts) - gap);

  const segments = [];
  for (let i = 0; i < parts; i++) {
    const isCompleted = isMastered || i < completedParts;
    const strokeDasharray = `${segmentLength} ${circumference - segmentLength}`;
    const strokeDashoffset = -((circumference / parts) * i) + (gap / 2);

    segments.push(
      <circle
        key={i}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={
          isCompleted
            ? (color || '#FDE047')
            : isCurrent
              ? 'rgba(255, 255, 255, 0.22)'
              : 'rgba(148, 163, 184, 0.14)'
        }
        strokeWidth={isCompleted ? 4.5 : 2.5}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        style={{
          filter: isCompleted ? `drop-shadow(0 0 7px ${color || '#FDE047'})` : 'none',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
          transform: 'rotate(-90deg)',
          overflow: 'visible'
        }}
      >
        {segments}
      </svg>
    </div>
  );
};

// Cofre 3D auténtico estilo Duolingo con madera, bandas metálicas doradas, cerradura y 3 estrellas
const Duolingo3DChest = ({ isUnlocked, isClaimed, onClick }) => {
  return (
    <motion.div
      whileHover={isUnlocked ? { scale: 1.08, y: -3 } : { scale: 1.02 }}
      whileTap={isUnlocked ? { scale: 0.94, y: 3 } : { scale: 0.98 }}
      onClick={onClick}
      style={{
        cursor: isUnlocked ? 'pointer' : 'not-allowed',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 4,
        userSelect: 'none'
      }}
    >
      {/* Caja de Cofre 3D */}
      <div
        style={{
          width: '74px',
          height: '60px',
          background: isClaimed
            ? 'linear-gradient(180deg, #94A3B8 0%, #64748B 100%)'
            : 'linear-gradient(180deg, #F59E0B 0%, #D97706 50%, #B45309 100%)',
          borderRadius: '16px 16px 12px 12px',
          border: isClaimed ? '2.5px solid #CBD5E1' : '2.5px solid #FEF3C7',
          boxShadow: isClaimed
            ? '0 8px 0 #475569, 0 12px 18px rgba(0,0,0,0.25)'
            : '0 8px 0 #78350F, 0 12px 22px rgba(217, 119, 6, 0.45)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '4px'
        }}
      >
        {/* Tapa con curvatura y brillo 3D */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '24px',
            background: isClaimed
              ? 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)'
              : 'linear-gradient(180deg, #FDE68A 0%, #F59E0B 60%, #D97706 100%)',
            borderBottom: '2px solid rgba(0,0,0,0.2)'
          }}
        />

        {/* Bandas doradas verticales */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '10px',
            width: '8px',
            background: isClaimed ? '#E2E8F0' : '#FEF3C7',
            borderLeft: '1px solid rgba(0,0,0,0.15)',
            borderRight: '1px solid rgba(0,0,0,0.15)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: '10px',
            width: '8px',
            background: isClaimed ? '#E2E8F0' : '#FEF3C7',
            borderLeft: '1px solid rgba(0,0,0,0.15)',
            borderRight: '1px solid rgba(0,0,0,0.15)'
          }}
        />

        {/* Cerradura frontal redonda metálica con ranura */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: isClaimed ? '#F1F5F9' : '#FFFFFF',
            border: isClaimed ? '2.5px solid #94A3B8' : '2.5px solid #CA8A04',
            boxShadow: '0 2px 5px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3
          }}
        >
          <div
            style={{
              width: '5px',
              height: '7px',
              background: isClaimed ? '#64748B' : '#78350F',
              borderRadius: '2px'
            }}
          />
        </div>
      </div>

      {/* 3 Estrellas bajo el cofre estilo Duolingo */}
      <div style={{ display: 'flex', gap: '3px', marginTop: '6px' }}>
        {[0, 1, 2].map((s) => (
          <Star
            key={s}
            size={13}
            fill={isClaimed ? '#EAB308' : '#94A3B8'}
            color={isClaimed ? '#CA8A04' : '#64748B'}
          />
        ))}
      </div>
    </motion.div>
  );
};

export const Aprender = () => {
  const navigate = useNavigate();
  const { subject: subjectParam } = useParams();
  const {
    streak,
    xp,
    level,
    currentLevelProgress,
    hearts,
    completedLessons,
    addXp,
    recordLessonCompletion,
    jumpToLesson
  } = useGamification();
  const { theme, toggleTheme } = useTheme();
  const themePalette = getThemePalette(theme);
  const isLight = Boolean(themePalette?.isLight);

  const [selectedSubject, setSelectedSubject] = useState(SUBJECTS_CONFIG[0]);
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estados de navegación entre los 15 cursos oficiales de la Matriz CEPREUNSA
  const [showAllCoursesModal, setShowAllCoursesModal] = useState(false);
  const [courseSearchQuery, setCourseSearchQuery] = useState('');
  const coursesScrollRef = useRef(null);

  // Desplegable de Temas Oficiales y Salto Rápido de Niveles al tocar el Banner
  const [showSyllabusDropdown, setShowSyllabusDropdown] = useState(false);
  const [skipConfirmTopic, setSkipConfirmTopic] = useState(null);
  const [syllabusFilter, setSyllabusFilter] = useState('');

  // Modal interactivo de Fórmulas para el HUD
  const [showFormulaModal, setShowFormulaModal] = useState(false);

  // Modal interactivo de Flashcards activas para el curso actual
  const [showCourseFlashcards, setShowCourseFlashcards] = useState(false);

  // Visor de Resúmenes Detallados de Obras Literarias Preuniversitarias (90% argumento + 10% repaso)
  const [readingObra, setReadingObra] = useState(null);

  // Determinar si el curso actual es de ciencias exactas/fórmulas o de letras/humanidades/biología (Truquitos)
  const isStemCourse = useMemo(() => {
    const raw = (selectedSubject?.name || selectedSubject?.id || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return raw.includes('matemat') || raw.includes('fisic') || raw.includes('quimic') || raw.includes('algeb') || raw.includes('geom') || raw.includes('trigo') || raw.includes('aritmet');
  }, [selectedSubject]);

  // Recopilar fórmulas, teoremas y truquitos disponibles para el curso actual
  const courseFormulas = useMemo(() => {
    const list = [];
    (lessons || []).forEach((l) => {
      (l.subtemas || []).forEach((st) => {
        if (isStemCourse) {
          const hasDirect = st.theory?.formula_data || st.theory?.mecanismos;
          if (hasDirect) {
            list.push({
              week: l.semana || l.lessonNumber,
              lessonTitle: l.title,
              subtemaTitle: st.title || st.shortTitle,
              subCode: st.subCode || '',
              formulaData: st.theory?.formula_data,
              rawMecanismos: st.theory?.mecanismos,
              fijaUnsa: st.theory?.fijaUnsa || st.theory?.mnemotecnia
            });
          }
        } else {
          // Materias de letras, humanidades y ciencias sociales: proveer estrictamente trucos mnemotécnicos y claves fijas SIN fórmulas matemáticas
          const trick = st.theory?.fijaUnsa || st.theory?.mnemotecnia || st.theory?.takeaway || st.description;
          if (trick) {
            list.push({
              week: l.semana || l.lessonNumber,
              lessonTitle: l.title,
              subtemaTitle: st.title || st.shortTitle,
              subCode: st.subCode || '',
              formulaData: null,
              rawMecanismos: trick,
              fijaUnsa: st.theory?.fijaUnsa ? `Punto Clave: ${st.theory.fijaUnsa}` : (st.theory?.takeaway ? `Concepto: ${st.theory.takeaway}` : null)
            });
          }
        }
      });
    });
    return list;
  }, [lessons, isStemCourse]);

  // Sincronizar materia desde la URL (/aprender/:subject)
  useEffect(() => {
    if (subjectParam) {
      const cleanParam = decodeURIComponent(subjectParam).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const found = SUBJECTS_CONFIG.find((s) => {
        const cleanId = s.id.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const cleanName = s.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return cleanId === cleanParam || cleanName === cleanParam;
      });
      if (found && found.id !== selectedSubject.id) {
        setSelectedSubject(found);
      }
    }
  }, [subjectParam, selectedSubject.id]);

  const handleSelectSubjectWorld = (subj) => {
    setSelectedSubject(subj);
    navigate(`/aprender/${encodeURIComponent(subj.id.toLowerCase())}`, { replace: true });
    setShowAllCoursesModal(false);
  };

  const scrollCourses = (direction) => {
    if (coursesScrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      coursesScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredCourses = SUBJECTS_CONFIG;

  const searchedCoursesInModal = useMemo(() => {
    const q = courseSearchQuery.trim().toLowerCase();
    return SUBJECTS_CONFIG.filter((subj) => {
      if (!q) return true;
      return (
        subj.name.toLowerCase().includes(q) ||
        (subj.description || '').toLowerCase().includes(q)
      );
    });
  }, [courseSearchQuery]);

  // Lista de temas filtrada para el desplegable del temario
  const filteredSyllabusTopics = useMemo(() => {
    const q = syllabusFilter.trim().toLowerCase();
    if (!q) return lessons;
    return lessons.filter((l) => {
      const title = (l.fullTitle || l.title || '').toLowerCase();
      const week = String(l.semana || '');
      return title.includes(q) || week.includes(q);
    });
  }, [lessons, syllabusFilter]);

  // Confirmar salto rápido a un tema
  const handleConfirmJumpToTopic = (topic) => {
    if (!topic) return;
    const targetIdx = lessons.findIndex((l) => l.id === topic.id);
    if (targetIdx > 0) {
      const priorIds = lessons.slice(0, targetIdx).map((l) => l.id);
      if (typeof jumpToLesson === 'function') {
        jumpToLesson(priorIds);
      }
    }
    setSkipConfirmTopic(null);
    setShowSyllabusDropdown(false);

    // Abrir tarjeta de preparación del nivel seleccionado
    setPreviewNode(topic);

    // Desplazar suavemente hasta el nodo correspondiente en el camino
    setTimeout(() => {
      const el = document.getElementById(`lesson-node-${topic.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 250);
  };

  // Lección activa para jugar en LessonEngine
  const [activeLesson, setActiveLesson] = useState(null);

  // Modales
  const [previewNode, setPreviewNode] = useState(null);
  const [expandedTheorySubId, setExpandedTheorySubId] = useState(null);
  const [showUnitGuide, setShowUnitGuide] = useState(false);
  const [chestModal, setChestModal] = useState(null);
  const [showRankingModal, setShowRankingModal] = useState(false);
  const [lockedHintId, setLockedHintId] = useState(null);
  const { openModal: openPomodoroModal } = usePomodoro();

  // Cargar lecciones cada vez que se cambia de materia
  useEffect(() => {
    let isMounted = true;
    if (lessons.length === 0) {
      setIsLoading(true);
    }

    getLessonsForSubject(selectedSubject.id).then((loaded) => {
      if (isMounted) {
        setLessons(loaded || []);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedSubject]);

  // Conteo de lecciones completadas
  const completedCount = useMemo(() => {
    return lessons.filter((l) => completedLessons[l.id] || (l.parentPlanetId && completedLessons[l.parentPlanetId])).length;
  }, [lessons, completedLessons]);

  // Coordenadas x en porcentaje para el camino sinuoso estilo Duolingo (curva serpenteante suave)
  // Genera un sendero fluido centrado en 50% con amplitudes óptimas (entre 28% y 72%)
  const pathXPercent = useMemo(() => [50, 68, 72, 58, 42, 28, 32, 50, 68, 72, 58, 42, 28, 32, 50], []);

  // Índice de la lección activa actual (primera no completada)
  const currentActiveLessonIndex = useMemo(() => {
    if (!lessons || lessons.length === 0) return 0;
    const idx = lessons.findIndex((l) => {
      const isDone = completedLessons[l.id] || (l.parentPlanetId && completedLessons[l.parentPlanetId]);
      return !isDone;
    });
    return idx === -1 ? lessons.length - 1 : idx;
  }, [lessons, completedLessons]);

  const stepY = 170; // 170px de espacio vertical entre nodos: garantiza holgura total para que el tooltip ¡EMPEZAR! nunca colisione con el pill del tema
  const startY = 82; // Centro vertical del primer nodo con espacio suficiente para el tooltip ¡EMPEZAR!
  const totalPathHeight = useMemo(() => {
    return Math.max(startY + (lessons.length - 1) * stepY + 120, 380);
  }, [lessons.length, startY, stepY]);

  // Posición dinámica de la mascota a lo largo del sendero en zigzag
  const { mascotX, mascotY } = useMemo(() => {
    const activeX = pathXPercent[currentActiveLessonIndex % pathXPercent.length] || 50;
    const activeY = startY + currentActiveLessonIndex * stepY;
    // Si el nodo está a la derecha (>= 50%), colocamos la mascota a la izquierda para no tapar el nodo ni el texto;
    // si el nodo está a la izquierda (< 50%), la colocamos a la derecha con margen seguro.
    const mX = activeX >= 50
      ? Math.max(10, activeX - 28)
      : Math.min(82, activeX + 24);
    const mY = activeY - 26;
    return { mascotX: mX, mascotY: mY };
  }, [currentActiveLessonIndex, pathXPercent, startY, stepY]);

  // Generar el trazado SVG continuo completo (Sendero Base)
  const svgConnectorPath = useMemo(() => {
    if (lessons.length === 0) return '';
    const startX = pathXPercent[0];
    let d = `M ${startX} ${startY}`;
    for (let i = 1; i < lessons.length; i++) {
      const prevX = pathXPercent[(i - 1) % pathXPercent.length];
      const prevY = startY + (i - 1) * stepY;
      const currX = pathXPercent[i % pathXPercent.length];
      const currY = startY + i * stepY;

      // Curva de Bezier cúbica continua con tangentes verticales suaves en cada nodo (estilo Duolingo)
      const cp1X = prevX;
      const cp1Y = prevY + stepY * 0.52;
      const cp2X = currX;
      const cp2Y = currY - stepY * 0.52;

      d += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${currX} ${currY}`;
    }
    return d;
  }, [lessons, pathXPercent, startY, stepY]);

  // Generar el trazado SVG de progreso completado (Sendero de Avance)
  const svgCompletedPath = useMemo(() => {
    if (lessons.length === 0 || currentActiveLessonIndex === 0) return '';
    const maxIdx = Math.min(currentActiveLessonIndex, lessons.length - 1);
    const startX = pathXPercent[0];
    let d = `M ${startX} ${startY}`;
    for (let i = 1; i <= maxIdx; i++) {
      const prevX = pathXPercent[(i - 1) % pathXPercent.length];
      const prevY = startY + (i - 1) * stepY;
      const currX = pathXPercent[i % pathXPercent.length];
      const currY = startY + i * stepY;

      const cp1X = prevX;
      const cp1Y = prevY + stepY * 0.52;
      const cp2X = currX;
      const cp2Y = currY - stepY * 0.52;

      d += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${currX} ${currY}`;
    }
    return d;
  }, [lessons, pathXPercent, currentActiveLessonIndex, startY, stepY]);

  // Datos de conexión sinérgica del curso actual
  const currentConnection = SUBJECT_CONNECTIONS[selectedSubject.name] || SUBJECT_CONNECTIONS[selectedSubject.id] || {
    connected: [],
    synergyTip: 'Domina los conceptos fundamentales para asegurar tu vacante universitaria.'
  };

  // Manejar apertura de cofre de recompensa
  const handleClaimChest = (lesson) => {
    if (completedLessons[lesson.id]) {
      setChestModal({
        title: 'Cofre ya reclamado',
        xp: 0,
        message: '¡Ya obtuviste la recompensa de esta lección!'
      });
      return;
    }

    const xpEarned = lesson.xpReward || 50;
    addXp(xpEarned);
    recordLessonCompletion(lesson.id, { score: 100, xpEarned });
    setChestModal({
      title: '¡Cofre de Recompensa!',
      xp: xpEarned,
      message: '¡Has conseguido experiencia y puntos para consolidar tu avance preuniversitario!'
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        backgroundColor: themePalette.bgBase || (isLight ? '#FAF7F2' : '#070C18'),
        color: themePalette.textPrimary || (isLight ? '#0F172A' : '#F8FAFC'),
        overflowX: 'hidden'
      }}
    >
      {/* ================= FONDO ADAPTABLE AL TEMA CON MICRO-DETALLES (ESTILO DUOLINGO MODERNO) ================= */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundColor: themePalette.bgBase || (isLight ? '#FAF7F2' : '#070C18'),
          backgroundImage: isLight
            ? `
              radial-gradient(circle at 50% 12%, rgba(${themePalette.accentRgb}, 0.12) 0%, transparent 60%),
              radial-gradient(circle at 85% 65%, ${selectedSubject.color}14 0%, transparent 45%),
              radial-gradient(circle at 15% 85%, rgba(${themePalette.accentRgb}, 0.08) 0%, transparent 50%),
              radial-gradient(rgba(0, 0, 0, 0.05) 1.2px, transparent 1.2px)
            `
            : `
              radial-gradient(circle at 50% 12%, rgba(${themePalette.accentRgb}, 0.24) 0%, transparent 65%),
              radial-gradient(circle at 85% 65%, ${selectedSubject.color}22 0%, transparent 50%),
              radial-gradient(circle at 15% 85%, rgba(${themePalette.accentRgb}, 0.14) 0%, transparent 50%),
              radial-gradient(rgba(255, 255, 255, 0.045) 1.2px, transparent 1.2px)
            `,
          backgroundSize: '100% 100%, 100% 100%, 100% 100%, 28px 28px',
          backgroundPosition: 'center center, center center, center center, 0 0'
        }}
      />

      {/* CONTENEDOR PRINCIPAL CENTRADO (Optimizado para teléfonos Android / móviles) */}
      <div
        className="page-container"
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          width: '100%',
          maxWidth: '520px',
          overflowX: 'clip',
          boxSizing: 'border-box',
          paddingTop: 'clamp(74px, 10vh, 92px)',
          paddingBottom: '120px',
          paddingLeft: 'clamp(8px, 2.5vw, 14px)',
          paddingRight: 'clamp(8px, 2.5vw, 14px)',
          margin: '0 auto'
        }}
      >

        {/* ================= BARRA DE ESTADO / HUD DE NAVEGACIÓN (100% RESPONSIVE EN ANDROID Y ESCRITORIO) ================= */}
        <div
          className="aprender-hud-bar"
          style={{
            background: isLight ? 'rgba(255, 255, 255, 0.95)' : (themePalette.cardBg || 'rgba(15, 23, 42, 0.90)'),
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: isLight ? '1.5px solid rgba(0, 0, 0, 0.08)' : `1.5px solid ${themePalette.subtleBorder}`,
            borderBottom: isLight ? '3px solid rgba(0, 0, 0, 0.12)' : `3px solid ${themePalette.accent}44`,
            borderRadius: '16px',
            padding: '5px 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '3px',
            boxShadow: isLight
              ? '0 4px 16px rgba(0, 0, 0, 0.06)'
              : `0 8px 24px rgba(0, 0, 0, 0.4), 0 0 16px ${themePalette.glow}`,
            marginBottom: '14px',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {/* 1. Racha Diaria */}
          <motion.div
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ y: 1, scale: 0.97 }}
            title={`Racha de estudio: ${streak} días`}
            className="duo-btn-3d"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              flex: '1 1 0',
              minWidth: 0,
              height: '32px',
              background: isLight
                ? 'linear-gradient(180deg, #FEF2F2 0%, #FEE2E2 100%)'
                : 'linear-gradient(180deg, rgba(239, 68, 68, 0.25) 0%, rgba(185, 28, 28, 0.35) 100%)',
              border: isLight ? '1.5px solid #FCA5A5' : '1.5px solid #EF4444',
              borderBottom: isLight ? '2.5px solid #DC2626' : '2.5px solid #991B1B',
              padding: '0 5px',
              borderRadius: '10px',
              color: isLight ? '#B91C1C' : '#FCA5A5',
              fontWeight: 900,
              fontSize: '0.73rem',
              boxShadow: isLight
                ? '0 2px 6px rgba(220, 38, 38, 0.12)'
                : '0 0 10px rgba(239, 68, 68, 0.20)',
              userSelect: 'none',
              cursor: 'default',
              whiteSpace: 'nowrap'
            }}
          >
            <DuolingoFlameIcon size={15} active={true} animated={true} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <AnimatedCounter value={streak || 0} suffix="d" duration={1100} />
            </span>
          </motion.div>

          {/* 2. Nivel Expedición & XP */}
          <motion.div
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ y: 1, scale: 0.97 }}
            title={`Nivel ${level} (${xp || 0} XP acumulados)`}
            className="duo-btn-3d"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              flex: '1.2 1 0',
              minWidth: 0,
              height: '32px',
              background: isLight
                ? 'linear-gradient(180deg, #FFFBEB 0%, #FEF3C7 100%)'
                : 'linear-gradient(180deg, rgba(245, 158, 11, 0.25) 0%, rgba(180, 83, 9, 0.35) 100%)',
              border: isLight ? '1.5px solid #FDE68A' : '1.5px solid #F59E0B',
              borderBottom: isLight ? '2.5px solid #D97706' : '2.5px solid #92400E',
              padding: '0 5px',
              borderRadius: '10px',
              color: isLight ? '#92400E' : '#FDE68A',
              fontWeight: 900,
              fontSize: '0.72rem',
              boxShadow: isLight
                ? '0 2px 6px rgba(217, 119, 6, 0.12)'
                : '0 0 10px rgba(245, 158, 11, 0.20)',
              userSelect: 'none',
              cursor: 'default',
              whiteSpace: 'nowrap'
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.15, 1]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}
            >
              <Sparkles size={11} color={isLight ? '#D97706' : '#FDE047'} />
            </motion.div>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Nv.<AnimatedCounter value={level || 1} duration={900} /> (<AnimatedCounter value={xp || 0} suffix="XP" duration={1200} />)
            </span>
          </motion.div>

          {/* 3. Vidas / Escudos */}
          <motion.div
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ y: 1, scale: 0.97 }}
            title={`Vidas disponibles: ${hearts}`}
            className="duo-btn-3d"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              flex: '0.9 1 0',
              minWidth: 0,
              height: '32px',
              color: isLight ? '#9F1239' : '#FECDD3',
              fontWeight: 900,
              fontSize: '0.73rem',
              background: isLight
                ? 'linear-gradient(180deg, #FFF1F2 0%, #FFE4E6 100%)'
                : 'linear-gradient(180deg, rgba(244, 63, 94, 0.25) 0%, rgba(159, 18, 57, 0.35) 100%)',
              border: isLight ? '1.5px solid #FECDD3' : '1.5px solid #F43F5E',
              borderBottom: isLight ? '2.5px solid #E11D48' : '2.5px solid #9F1239',
              padding: '0 5px',
              borderRadius: '10px',
              boxShadow: isLight
                ? '0 2px 6px rgba(225, 29, 72, 0.12)'
                : '0 0 10px rgba(244, 63, 94, 0.20)',
              userSelect: 'none',
              cursor: 'default',
              whiteSpace: 'nowrap'
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1, 1.1, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                times: [0, 0.15, 0.3, 0.45, 1],
                ease: 'easeInOut'
              }}
              style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}
            >
              <Heart size={12} fill="#E11D48" color="#E11D48" />
            </motion.div>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <AnimatedCounter value={hearts ?? 5} duration={1000} />
            </span>
          </motion.div>

          {/* 4. Fórmulas / Truquitos del Curso */}
          <motion.button
            type="button"
            onClick={() => setShowFormulaModal(true)}
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ y: 1, scale: 0.97 }}
            title={isStemCourse
              ? `Abrir recetario de fórmulas y teoremas de ${selectedSubject.name}`
              : `Abrir trucos mnemotécnicos y claves fijas de ${selectedSubject.name}`}
            className="duo-btn-3d"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              flex: '1.1 1 0',
              minWidth: 0,
              height: '32px',
              color: isStemCourse
                ? (isLight ? '#5B21B6' : '#DDD6FE')
                : (isLight ? '#065F46' : '#A7F3D0'),
              fontWeight: 900,
              fontSize: '0.72rem',
              background: isStemCourse
                ? (isLight
                    ? 'linear-gradient(180deg, #F5F3FF 0%, #EDE9FE 100%)'
                    : 'linear-gradient(180deg, rgba(139, 92, 246, 0.25) 0%, rgba(91, 33, 182, 0.35) 100%)')
                : (isLight
                    ? 'linear-gradient(180deg, #ECFDF5 0%, #D1FAE5 100%)'
                    : 'linear-gradient(180deg, rgba(16, 185, 129, 0.25) 0%, rgba(4, 120, 87, 0.35) 100%)'),
              border: isStemCourse
                ? (isLight ? '1.5px solid #DDD6FE' : '1.5px solid #8B5CF6')
                : (isLight ? '1.5px solid #A7F3D0' : '1.5px solid #10B981'),
              borderBottom: isStemCourse
                ? (isLight ? '2.5px solid #7C3AED' : '2.5px solid #5B21B6')
                : (isLight ? '2.5px solid #059669' : '2.5px solid #047857'),
              padding: '0 5px',
              borderRadius: '10px',
              boxShadow: isStemCourse
                ? (isLight
                    ? '0 2px 6px rgba(124, 58, 237, 0.12)'
                    : '0 0 10px rgba(139, 92, 246, 0.20)')
                : (isLight
                    ? '0 2px 6px rgba(16, 185, 129, 0.12)'
                    : '0 0 10px rgba(16, 185, 129, 0.20)'),
              userSelect: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}
            >
              {isStemCourse ? (
                <Sigma size={12} color={isLight ? '#6D28D9' : '#A78BFA'} />
              ) : (
                <Lightbulb size={12} color={isLight ? '#059669' : '#34D399'} />
              )}
            </motion.div>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 900 }}>
              {isStemCourse ? 'Fórmulas' : 'Truquitos'}
            </span>
          </motion.button>
        </div>

        {/* ================= CÁPSULAS DE MATERIAS CON DESPLAZAMIENTO RÁPIDO ================= */}
        <div style={{ marginBottom: '18px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={() => scrollCourses('left')}
              title="Desplazar a la izquierda"
              style={{
                width: '32px',
                height: '38px',
                flexShrink: 0,
                borderRadius: '12px',
                background: isLight ? '#FFFFFF' : 'rgba(15, 23, 42, 0.85)',
                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.15)',
                color: isLight ? '#475569' : '#94A3B8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: isLight ? '0 2px 6px rgba(0, 0, 0, 0.05)' : 'none',
                backdropFilter: 'blur(10px)'
              }}
            >
              <ChevronLeft size={18} />
            </button>

            <div
              ref={coursesScrollRef}
              style={{
                display: 'flex',
                gap: '10px',
                overflowX: 'auto',
                paddingBottom: '8px',
                paddingTop: '2px',
                scrollbarWidth: 'none',
                WebkitOverflowScrolling: 'touch',
                paddingLeft: '2px',
                paddingRight: '2px',
                flex: 1
              }}
            >
              {filteredCourses.map((subj) => {
                const isSelected = selectedSubject.id === subj.id;
                return (
                  <button
                    key={subj.id}
                    onClick={() => handleSelectSubjectWorld(subj)}
                    className="duo-btn-3d"
                    style={{
                      padding: isSelected ? '10px 20px' : '9px 16px',
                      minWidth: 'max-content',
                      boxSizing: 'border-box',
                      borderRadius: '18px',
                      border: isSelected
                        ? '2.5px solid #FFFFFF'
                        : (isLight ? '1.5px solid #CBD5E1' : `1.5px solid ${themePalette.subtleBorder || 'rgba(255, 255, 255, 0.14)'}`),
                      outline: isSelected ? `2.5px solid ${themePalette.accent || '#0284C7'}` : 'none',
                      outlineOffset: isSelected ? '1px' : '0',
                      background: isSelected
                        ? (themePalette.badgeGradient || themePalette.bannerGradient || 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)')
                        : (isLight ? '#FFFFFF' : 'rgba(15, 23, 42, 0.72)'),
                      color: isSelected
                        ? '#FFFFFF'
                        : (isLight ? '#1E293B' : '#FFFFFF'),
                      boxShadow: isSelected
                        ? `0 6px 0 ${themePalette.accentDark || '#0369A1'}, 0 10px 24px rgba(2, 132, 199, 0.45)`
                        : (isLight ? '0 3px 0 #CBD5E1' : '0 3px 0 rgba(0, 0, 0, 0.35)'),
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '9px',
                      cursor: 'pointer',
                      fontWeight: 900,
                      fontSize: '0.88rem',
                      lineHeight: 1.2,
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                      backdropFilter: 'blur(14px)',
                      transition: 'all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      <SubjectLucideIcon id={subj.id} size={18} color={isSelected ? '#FFFFFF' : (themePalette.accent || subj.color)} />
                    </span>
                    <span style={{ letterSpacing: '0.01em' }}>{subj.name}</span>
                    {isSelected && (
                      <span
                        style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          background: '#FDE047',
                          boxShadow: '0 0 8px #FDE047',
                          display: 'inline-block',
                          marginLeft: '2px'
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => scrollCourses('right')}
              title="Desplazar a la derecha"
              style={{
                width: '32px',
                height: '38px',
                flexShrink: 0,
                borderRadius: '12px',
                background: isLight ? '#FFFFFF' : 'rgba(15, 23, 42, 0.85)',
                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.15)',
                color: isLight ? '#475569' : '#94A3B8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: isLight ? '0 2px 6px rgba(0, 0, 0, 0.05)' : 'none',
                backdropFilter: 'blur(10px)'
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ================= BANNER DE ASIGNATURA: SEGUNDA NAVBAR TEMPORAL STICKY ================= */}
        <div
          className="aprender-sticky-banner"
          style={{
            width: '100%',
            maxWidth: '460px',
            margin: '0 auto 16px',
            background: themePalette.bannerGradient || (isLight
              ? `linear-gradient(135deg, ${selectedSubject.color} 0%, ${themePalette.accentDark || selectedSubject.color} 100%)`
              : `linear-gradient(135deg, ${selectedSubject.color} 0%, rgba(15, 23, 42, 0.95) 100%)`),
            borderRadius: '22px',
            border: isLight ? '1.5px solid rgba(255, 255, 255, 0.6)' : '1.5px solid rgba(255, 255, 255, 0.15)',
            borderBottom: `5px solid ${themePalette.bannerBorderBottom || themePalette.accentDark || '#075985'}`,
            padding: '12px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            color: '#FFFFFF',
            boxShadow: isLight
              ? '0 10px 25px -4px rgba(0, 0, 0, 0.2), 0 4px 10px -2px rgba(0, 0, 0, 0.1)'
              : '0 14px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(56, 189, 248, 0.2)',
            overflow: 'hidden',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxSizing: 'border-box'
          }}
        >
          {/* Patrón de brillo decorativo sutil en esquina */}
          <div
            style={{
              position: 'absolute',
              top: '-30px',
              right: '-20px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.22) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', position: 'relative', zIndex: 1, width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
              <DualMascotDuo size={34} orsttyMood="feliz" artyonMood="contento" />
              <h1
                style={{
                  margin: 0,
                  fontSize: 'clamp(1.15rem, 3.6vw, 1.45rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  color: '#FFFFFF',
                  textShadow: '0 2px 6px rgba(0, 0, 0, 0.35)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {selectedSubject.name}
              </h1>
            </div>

            <span
              style={{
                fontSize: '0.70rem',
                fontWeight: 900,
                background: 'rgba(255, 255, 255, 0.22)',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                padding: '3px 8px',
                borderRadius: '8px',
                letterSpacing: '0.01em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: '#FFFFFF',
                flexShrink: 0
              }}
            >
              <BookOpen size={11} />
              {lessons.length} temas
            </span>
          </div>

          {/* Lado inferior / Fila de Botones de Acción bien espaciados y ordenados */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 1, width: '100%' }}>
            <button
              type="button"
              onClick={() => setShowCourseFlashcards(true)}
              title={`Ver Flashcards y fichas activas de ${selectedSubject.name}`}
              className="duo-btn-3d"
              style={{
                flex: 1,
                minWidth: 0,
                background: 'rgba(255, 255, 255, 0.22)',
                border: '1.5px solid rgba(255, 255, 255, 0.45)',
                borderBottom: '3px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                padding: '6px 8px',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                fontSize: '0.76rem',
                fontWeight: 900,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.15s ease'
              }}
            >
              <Zap size={13} strokeWidth={2.4} color="#FDE047" fill="#FDE047" style={{ flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Fichas</span>
            </button>

            <button
              type="button"
              onClick={() => setShowSyllabusDropdown(!showSyllabusDropdown)}
              title="Ver temario completo del curso"
              className="duo-btn-3d"
              style={{
                flex: 1,
                minWidth: 0,
                background: showSyllabusDropdown ? '#FFFFFF' : 'rgba(255, 255, 255, 0.2)',
                border: '1.5px solid rgba(255, 255, 255, 0.4)',
                borderBottom: '3px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                padding: '6px 8px',
                color: showSyllabusDropdown ? (selectedSubject.color || '#0284C7') : '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                fontSize: '0.76rem',
                fontWeight: 900,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.15s ease'
              }}
            >
              <FileText size={14} strokeWidth={2.4} style={{ flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Temas</span>
              <ChevronDown size={13} style={{ transform: showSyllabusDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
            </button>

            <button
              type="button"
              onClick={() => setShowUnitGuide(true)}
              title="Guía del Curso"
              className="duo-btn-3d"
              style={{
                flex: 1,
                minWidth: 0,
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1.5px solid rgba(255, 255, 255, 0.4)',
                borderBottom: '3px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                padding: '6px 8px',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                fontSize: '0.76rem',
                fontWeight: 900,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)'
              }}
            >
              <BookOpen size={14} strokeWidth={2.4} style={{ flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Guía</span>
            </button>
          </div>
        </div>

        {/* ================= DESPLEGABLE CON ESTILO DIRECTAMENTE ABAJO DEL CONTENEDOR ================= */}
        <AnimatePresence>
          {showSyllabusDropdown && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{
                width: '100%',
                maxWidth: '460px',
                margin: '0 auto 16px',
                overflow: 'hidden',
                boxSizing: 'border-box'
              }}
            >
              <div
                style={{
                  background: isLight ? '#FFFFFF' : 'linear-gradient(180deg, #0F172A 0%, #020617 100%)',
                  border: isLight ? '1.5px solid #E2E8F0' : '1.5px solid rgba(255, 255, 255, 0.16)',
                  borderTop: `3.5px solid ${selectedSubject.color}`,
                  borderRadius: '20px',
                  padding: '16px',
                  boxShadow: isLight
                    ? '0 12px 28px rgba(0, 0, 0, 0.08)'
                    : '0 16px 36px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.12)',
                  position: 'relative'
                }}
              >
                {/* Header del Desplegable */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '10px',
                        background: `${selectedSubject.color}25`,
                        border: `1.5px solid ${selectedSubject.color}55`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <SubjectLucideIcon id={selectedSubject.name} size={16} color={selectedSubject.color} />
                    </div>
                    <div>
                      <h2 style={{ fontSize: '0.98rem', fontWeight: 900, margin: 0, color: isLight ? '#0F172A' : '#FFFFFF', letterSpacing: '-0.01em' }}>
                        Temario Oficial • {selectedSubject.name}
                      </h2>
                      <p style={{ margin: 0, fontSize: '0.72rem', color: isLight ? '#64748B' : '#94A3B8' }}>
                        Selecciona un tema para avanzar o saltar directamente
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowSyllabusDropdown(false)}
                    style={{
                      background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.1)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isLight ? '#475569' : '#94A3B8',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Buscador ligero */}
                <div style={{ position: 'relative', marginBottom: '10px' }}>
                  <Search size={14} color="#64748B" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={syllabusFilter}
                    onChange={(e) => setSyllabusFilter(e.target.value)}
                    placeholder="Buscar tema por nombre..."
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '8px 12px 8px 32px',
                      background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.6)',
                      border: isLight ? '1.5px solid #CBD5E1' : '1.5px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '12px',
                      color: isLight ? '#0F172A' : '#FFFFFF',
                      fontSize: '0.82rem',
                      outline: 'none'
                    }}
                  />
                  {syllabusFilter && (
                    <button
                      type="button"
                      onClick={() => setSyllabusFilter('')}
                      style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: isLight ? '#64748B' : '#94A3B8', cursor: 'pointer' }}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Lista scrolleable estilizada */}
                <div
                  style={{
                    maxHeight: '340px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '7px',
                    paddingRight: '3px'
                  }}
                >
                  {filteredSyllabusTopics.map((topic, index) => {
                    const isTopicMastered = Boolean(completedLessons[topic.id]);
                    const targetIdx = lessons.findIndex((l) => l.id === topic.id);
                    const prevTopic = lessons[targetIdx - 1];
                    const isTopicUnlocked = targetIdx === 0 || Boolean(completedLessons[prevTopic?.id]);
                    const isCurrent = isTopicUnlocked && !isTopicMastered;

                    return (
                      <div
                        key={topic.id}
                        onClick={() => {
                          if (isTopicMastered || isCurrent) {
                            setShowSyllabusDropdown(false);
                            setPreviewNode(topic);
                            const el = document.getElementById(`lesson-node-${topic.id}`);
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          } else {
                            setSkipConfirmTopic(topic);
                          }
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 12px',
                          borderRadius: '14px',
                          background: isCurrent
                            ? (isLight ? '#EFF6FF' : 'rgba(59, 130, 246, 0.15)')
                            : isTopicMastered
                            ? (isLight ? '#F0FDF4' : 'rgba(16, 185, 129, 0.12)')
                            : (isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.5)'),
                          border: isCurrent
                            ? '1.5px solid #3B82F6'
                            : isTopicMastered
                            ? '1.5px solid rgba(16, 185, 129, 0.4)'
                            : (isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)'),
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '8px',
                              background: isCurrent ? '#3B82F6' : isTopicMastered ? '#10B981' : (isLight ? '#E2E8F0' : 'rgba(255,255,255,0.1)'),
                              color: isCurrent || isTopicMastered ? '#FFFFFF' : (isLight ? '#64748B' : '#94A3B8'),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.74rem',
                              fontWeight: 900,
                              flexShrink: 0,
                              marginTop: '2px'
                            }}
                          >
                            {isTopicMastered ? <Check size={14} strokeWidth={3} /> : index + 1}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                              fontSize: '0.84rem',
                              fontWeight: 800,
                              color: isLight ? '#0F172A' : '#FFFFFF',
                              lineHeight: 1.3,
                              wordBreak: 'break-word',
                              whiteSpace: 'normal'
                            }}>
                              {topic.fullTitle || topic.title}
                            </div>
                            <div style={{ fontSize: '0.70rem', color: isLight ? '#64748B' : '#94A3B8', fontWeight: 600, marginTop: '2px' }}>
                              {topic.semana ? `Semana ${topic.semana}` : 'Lección oficial'}
                            </div>
                          </div>
                        </div>

                        <div style={{ flexShrink: 0, marginLeft: '6px' }}>
                          {isTopicMastered ? (
                            <span style={{ fontSize: '0.70rem', fontWeight: 800, color: '#10B981', display: 'flex', alignItems: 'center', gap: '3px', whiteSpace: 'nowrap' }}>
                              <CheckCircle2 size={13} /> Listo
                            </span>
                          ) : isCurrent ? (
                            <span style={{ fontSize: '0.70rem', fontWeight: 900, color: '#3B82F6', display: 'flex', alignItems: 'center', gap: '3px', whiteSpace: 'nowrap' }}>
                              <Play size={11} fill="#3B82F6" /> En curso
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSkipConfirmTopic(topic);
                              }}
                              className="duo-btn-3d"
                              style={{
                                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                border: 'none',
                                color: '#FFFFFF',
                                padding: '5px 9px',
                                borderRadius: '9px',
                                fontSize: '0.70rem',
                                fontWeight: 900,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                                boxShadow: '0 2px 5px rgba(245, 158, 11, 0.3)',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              <Zap size={11} fill="#FFF" />
                              <span>Empezar aquí</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {filteredSyllabusTopics.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '20px 10px', color: '#94A3B8' }}>
                      <p style={{ margin: 0, fontSize: '0.82rem' }}>No se encontraron temas con ese nombre.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= SECCIÓN ESPECIAL: OBRAS LITERARIAS (TEMARIO COMPLETO) ================= */}
        {(selectedSubject?.name === 'Literatura' || (selectedSubject?.id || '').toLowerCase().includes('literat')) && (
          <div style={{
            width: '100%',
            maxWidth: '520px',
            margin: '0 auto 20px',
            padding: '16px',
            borderRadius: '24px',
            background: isLight ? 'linear-gradient(135deg, rgba(6, 78, 59, 0.08) 0%, rgba(4, 120, 87, 0.14) 100%)' : 'linear-gradient(135deg, rgba(6, 78, 59, 0.45) 0%, rgba(4, 120, 87, 0.25) 100%)',
            border: '2px solid rgba(16, 185, 129, 0.35)',
            boxShadow: '0 6px 20px rgba(16, 185, 129, 0.15)',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(16, 185, 129, 0.35)'
                }}>
                  <BookOpen size={18} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 900, color: isLight ? '#064E3B' : '#6EE7B7', letterSpacing: '-0.01em' }}>
                    Obras Literarias Preuniversitarias
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: '0.74rem', color: isLight ? '#047857' : '#A7F3D0', fontWeight: 600 }}>
                    90% Argumento narrativo • 10% Apunte de repaso
                  </p>
                </div>
              </div>
              <Link
                to="/biblioteca?tab=obras"
                style={{
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  color: '#10B981',
                  textDecoration: 'none',
                  padding: '5px 12px',
                  borderRadius: '10px',
                  background: isLight ? '#FFFFFF' : 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>Ver las 20 obras</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Carrusel de Obras para lectura inmediata */}
            <div style={{
              display: 'flex',
              gap: '12px',
              overflowX: 'auto',
              paddingBottom: '8px',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch'
            }}>
              {LITERATURA_OBRAS.map((obra) => (
                <motion.div
                  key={obra.id}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setReadingObra(obra)}
                  style={{
                    flex: '0 0 170px',
                    cursor: 'pointer',
                    padding: '12px',
                    borderRadius: '16px',
                    background: isLight ? '#FFFFFF' : 'rgba(15, 23, 42, 0.88)',
                    border: '1.5px solid rgba(16, 185, 129, 0.25)',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box'
                  }}
                >
                  <div>
                    <div style={{
                      height: '5px',
                      borderRadius: '99px',
                      background: obra.portadaGradiente || 'linear-gradient(135deg, #059669, #10B981)',
                      marginBottom: '8px'
                    }} />
                    <h4 style={{
                      margin: 0,
                      fontSize: '0.84rem',
                      fontWeight: 800,
                      color: isLight ? '#0F172A' : '#FFFFFF',
                      lineHeight: 1.25,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {obra.titulo}
                    </h4>
                    <p style={{
                      margin: '4px 0 0',
                      fontSize: '0.72rem',
                      color: isLight ? '#64748B' : '#94A3B8',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {obra.autor}
                    </p>
                  </div>
                  <div style={{
                    marginTop: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{
                      fontSize: '0.66rem',
                      fontWeight: 700,
                      color: '#10B981',
                      background: 'rgba(16, 185, 129, 0.12)',
                      padding: '2px 6px',
                      borderRadius: '6px'
                    }}>
                      {obra.especie || 'Obra'}
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#10B981' }}>
                      Leer →
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TABLERO DE NIVELES CON ESTILO GAMIFICADO ================= */}
        <div
          style={{
            width: '100%',
            maxWidth: '430px',
            margin: '0 auto 60px',
            position: 'relative',
            minHeight: `${totalPathHeight}px`,
            zIndex: 1,
            background: isLight
              ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 250, 252, 0.92) 100%)'
              : 'linear-gradient(180deg, rgba(15, 23, 42, 0.72) 0%, rgba(2, 6, 23, 0.86) 100%)',
            borderRadius: '32px',
            border: isLight ? '2px solid rgba(226, 232, 240, 0.9)' : '2px solid rgba(255, 255, 255, 0.08)',
            borderBottom: isLight ? '6px solid #CBD5E1' : `6px solid ${selectedSubject.color}40`,
            boxShadow: isLight
              ? '0 20px 45px -10px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.85) inset'
              : `0 24px 50px -10px rgba(0, 0, 0, 0.65), 0 0 35px ${selectedSubject.color}15, 0 0 0 1px rgba(255, 255, 255, 0.05) inset`,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '22px 6px 70px',
            boxSizing: 'border-box'
          }}
        >
          {/* Encabezado decorativo de inicio del camino */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '6px 16px',
              margin: '0 auto 16px',
              width: 'fit-content',
              borderRadius: '999px',
              background: isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.06)',
              border: isLight ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '0.72rem',
              fontWeight: 800,
              color: isLight ? '#64748B' : '#94A3B8',
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}
          >
            <Rocket size={14} color={selectedSubject.color || '#3B82F6'} />
            <span>Ruta Oficial de Aprendizaje • Nivel 1</span>
          </div>

          {/* MASCOTA OFICIAL ORSTTY DINÁMICA QUE SIGUE EL PROGRESO DEL ESTUDIANTE */}
          <motion.div
            initial={false}
            animate={{
              top: `${mascotY}px`,
              left: `${mascotX}%`
            }}
            transition={{
              type: 'spring',
              stiffness: 80,
              damping: 15
            }}
            style={{
              position: 'absolute',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 5,
              pointerEvents: 'none'
            }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <DynamicMascot size={64} mood="cheering" animate={false} />
            </motion.div>
            <div
              style={{
                width: '44px',
                height: '8px',
                background: isLight ? 'rgba(0, 0, 0, 0.12)' : 'rgba(0, 0, 0, 0.4)',
                borderRadius: '50%',
                marginTop: '-4px'
              }}
            />
          </motion.div>

          {/* TRAZADO DEL CAMINO SVG RESPONSIVE CON EXACTITUD MILIMÉTRICA */}
          <svg
            viewBox={`0 0 100 ${totalPathHeight}`}
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${totalPathHeight}px`,
              pointerEvents: 'none',
              zIndex: 1,
              transform: 'translateZ(0)'
            }}
          >
            {/* Sombra inferior 3D del sendero */}
            {svgConnectorPath && (
              <path
                d={svgConnectorPath}
                fill="none"
                stroke={isLight ? '#CBD5E1' : 'rgba(0, 0, 0, 0.6)'}
                strokeWidth="20"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                transform="translate(0, 4)"
              />
            )}
            {/* Sendero Base */}
            {svgConnectorPath && (
              <path
                d={svgConnectorPath}
                fill="none"
                stroke={isLight ? '#E2E8F0' : '#1E293B'}
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            )}

            {/* Sendero de Avance completado estilo Duolingo */}
            {svgCompletedPath && (
              <path
                d={svgCompletedPath}
                fill="none"
                stroke="#58CC02"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            )}
          </svg>

          {/* NODOS / PIEDRAS DE PASO 3D */}
          {isLoading ? (
            <div style={{ padding: '80px 0', textAlign: 'center', position: 'relative', zIndex: 3 }}>
              <div style={{ display: 'inline-flex', padding: '16px', background: 'rgba(0,122,255,0.1)', borderRadius: '50%', marginBottom: '16px' }}>
                <Sparkles size={32} className="spinning-icon" style={{ color: selectedSubject.color || 'var(--accent-color)' }} />
              </div>
              <p style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.96rem', margin: 0 }}>Cargando ruta de aprendizaje...</p>
            </div>
          ) : (
            lessons.map((lesson, idx) => {
              const nodeCenterX = pathXPercent[idx % pathXPercent.length];
              const nodeCenterY = startY + idx * stepY;
              const isChest = lesson.nodeType === 'chest';
              const isTrophy = lesson.nodeType === 'trophy' || idx === lessons.length - 1;
              const isMidpoint = lessons.length > 3 && idx === Math.floor(lessons.length / 2);

              const totalParts = lesson.subtemas?.length || 1;
              const completedParts = lesson.subtemas && lesson.subtemas.length > 0
                ? lesson.subtemas.filter((st) => completedLessons[st.id] || completedLessons[lesson.id]).length
                : (completedLessons[lesson.id] ? 1 : 0);
              const isLessonMastered = (lesson.subtemas && lesson.subtemas.length > 0)
                ? (completedParts >= totalParts || Boolean(completedLessons[lesson.id]))
                : Boolean(completedLessons[lesson.id]);
              const isCompleted = isLessonMastered;

              const prevLesson = lessons[idx - 1];
              const isPrevCompleted = idx === 0 || Boolean(completedLessons[prevLesson?.id]) || (
                prevLesson?.subtemas && prevLesson.subtemas.length > 0 &&
                prevLesson.subtemas.every((st) => completedLessons[st.id] || completedLessons[prevLesson.id])
              );
              const isUnlocked = idx === 0 || isPrevCompleted;
              const isCurrent = isUnlocked && !isCompleted;

              // Posición vertical: el centro del botón (radio 37px) queda exactamente en nodeCenterY
              const posY = nodeCenterY - 37;

              return (
                <div
                  key={lesson.id}
                  id={`lesson-node-${lesson.id}`}
                  style={{
                    position: 'absolute',
                    top: `${posY}px`,
                    left: `${nodeCenterX}%`,
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: isCurrent ? 12 : 4,
                    width: '180px'
                  }}
                >
                  {/* HITO MITAD DE RUTA (50%) - EVALUACIÓN O SIMULACRO */}
                  {isMidpoint && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '20px',
                        left: 'calc(50% + 55px)', // Desplazado a la derecha para no solaparse con los tooltips superiores
                        whiteSpace: 'nowrap',
                        zIndex: 11
                      }}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowRankingModal(true);
                        }}
                        className="duo-btn-3d"
                        style={{
                          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                          border: '1.5px solid #FEF08A',
                          borderRadius: '12px',
                          padding: '5px 12px',
                          color: '#FFFFFF',
                          fontSize: '0.72rem',
                          fontWeight: 900,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)'
                        }}
                      >
                        <Flag size={13} fill="#FFF" />
                        <span>Evaluación 50%</span>
                      </button>
                    </div>
                  )}

                  {/* BOCADILLO FLOTANTE DUOLINGO ¡EMPEZAR! SOBRE EL NODO ACTIVO */}
                  {isCurrent && (
                    <motion.div
                      className="duo-bubble-tooltip"
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95, y: 2 }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      onClick={() => {
                        if (isChest) {
                          handleClaimChest(lesson);
                        } else {
                          setPreviewNode({ ...lesson, idx });
                        }
                      }}
                      style={{
                        position: 'absolute',
                        top: '-38px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#58CC02',
                        color: '#FFFFFF',
                        border: 'none',
                        borderBottom: '4px solid #46A302',
                        fontWeight: 900,
                        fontSize: '0.80rem',
                        padding: '4px 14px',
                        borderRadius: '16px',
                        boxShadow: '0 4px 14px rgba(88, 204, 2, 0.4)',
                        letterSpacing: '0.05em',
                        whiteSpace: 'nowrap',
                        zIndex: 14,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <Sparkles size={14} color="#FEF08A" />
                      <span>¡EMPEZAR!</span>
                      {/* Flecha apuntando hacia abajo al botón */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-7px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 0,
                          height: 0,
                          borderLeft: '7px solid transparent',
                          borderRight: '7px solid transparent',
                          borderTop: '7px solid #46A302'
                        }}
                      />
                    </motion.div>
                  )}

                  {/* BOCADILLO DE FEEDBACK PARA NIVELES BLOQUEADOS */}
                  {lockedHintId === lesson.id && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-42px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: isLight ? '#1E293B' : 'rgba(15, 23, 42, 0.95)',
                        color: '#FFFFFF',
                        fontSize: '0.72rem',
                        fontWeight: 900,
                        padding: '5px 12px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        whiteSpace: 'nowrap',
                        zIndex: 20,
                        boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                        pointerEvents: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <Lock size={12} color="#F87171" />
                      <span>¡Completa el nivel anterior!</span>
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-5px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 0,
                          height: 0,
                          borderLeft: '5px solid transparent',
                          borderRight: '5px solid transparent',
                          borderTop: isLight ? '5px solid #1E293B' : '5px solid rgba(15, 23, 42, 0.95)'
                        }}
                      />
                    </div>
                  )}

                  {/* SI ES COFRE: COFRE 3D REAL ESTILO DUOLINGO */}
                  {isChest ? (
                    <Duolingo3DChest
                      isUnlocked={isUnlocked}
                      isClaimed={isCompleted}
                      onClick={() => {
                        if (isUnlocked) {
                          handleClaimChest(lesson);
                        } else {
                          setLockedHintId(lesson.id);
                          setTimeout(() => setLockedHintId((prev) => (prev === lesson.id ? null : prev)), 2200);
                        }
                      }}
                    />
                  ) : (
                    <>
                      {/* ENVOLTORIO CONCÉNTRICO DEL NODO 3D Y ANILLO MORADO "TÓCAME" */}
                      <div
                        style={{
                          position: 'relative',
                          width: isTrophy ? '82px' : '74px',
                          height: isTrophy ? '82px' : '74px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {/* ANILLO MORADO CONCÉNTRICO PULSANTE "¡TÓCAME! / TOCA PARA JUGAR" */}
                        {isCurrent && (
                          <>
                            {/* Halo concéntrico principal fijado alrededor del nivel actual */}
                            <motion.div
                              animate={{
                                scale: [1, 1.15, 1],
                                opacity: [0.95, 0.45, 0.95]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut'
                              }}
                              style={{
                                position: 'absolute',
                                top: '-14px',
                                left: '-14px',
                                right: '-14px',
                                bottom: '-14px',
                                borderRadius: '50%',
                                border: '4px solid #A855F7',
                                boxShadow: '0 0 24px rgba(168, 85, 247, 0.7), inset 0 0 14px rgba(168, 85, 247, 0.35)',
                                pointerEvents: 'none',
                                zIndex: 1
                              }}
                            />
                            {/* Onda expansiva radar estilo Duolingo que emana del nivel diciendo "tócame" */}
                            <motion.div
                              animate={{
                                scale: [1, 1.34],
                                opacity: [0.65, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeOut'
                              }}
                              style={{
                                position: 'absolute',
                                top: '-14px',
                                left: '-14px',
                                right: '-14px',
                                bottom: '-14px',
                                borderRadius: '50%',
                                border: '2.5px solid #C084FC',
                                pointerEvents: 'none',
                                zIndex: 1
                              }}
                            />
                          </>
                        )}

                        {/* ANILLO DE PROGRESO DE SUBTEMAS */}
                        {isCurrent && totalParts > 1 && (
                          <PlanetProgressRing
                            size={98}
                            totalParts={totalParts}
                            completedParts={completedParts}
                            color="#58CC02"
                            isCurrent={true}
                            isMastered={false}
                            isChest={false}
                            isTrophy={isTrophy}
                          />
                        )}

                        {/* BOTÓN 3D ESTILO DUOLINGO AUTÉNTICO */}
                        <motion.button
                          whileHover={isUnlocked ? { scale: 1.06, y: -2 } : { scale: 1.02 }}
                          whileTap={isUnlocked ? { scale: 0.94, y: 4 } : { scale: 0.98 }}
                          animate={isCurrent ? { y: [0, -3, 0] } : {}}
                          transition={isCurrent ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } : {}}
                          onClick={() => {
                            if (isUnlocked) {
                              setPreviewNode({ ...lesson, idx });
                            } else {
                              setLockedHintId(lesson.id);
                              setTimeout(() => setLockedHintId((prev) => (prev === lesson.id ? null : prev)), 2200);
                            }
                          }}
                          className={`tactile-node ${
                            isCompleted ? 'completed' :
                            isTrophy ? 'exam' :
                            isCurrent ? 'current' :
                            'locked'
                          }`}
                          style={{
                            width: isTrophy ? '82px' : '74px',
                            height: isTrophy ? '82px' : '74px',
                            cursor: isUnlocked ? 'pointer' : 'not-allowed',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            zIndex: 3,
                            transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                          }}
                        >
                          {/* Brillo especular superior sólo en nodos desbloqueados (evita efecto bola brillante en locked) */}
                          {isUnlocked && (
                            <div
                              style={{
                                position: 'absolute',
                                top: '4px',
                                left: '14%',
                                width: '72%',
                                height: '34%',
                                borderRadius: '50%',
                                background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.08) 75%, transparent 100%)',
                                pointerEvents: 'none'
                              }}
                            />
                          )}

                          {isCompleted ? (
                            <Star size={34} fill="#B45309" color="#B45309" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }} />
                          ) : isTrophy ? (
                            <Trophy size={36} color="#FFFFFF" style={{ filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.4))' }} />
                          ) : isCurrent ? (
                            <Play size={32} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: '4px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }} />
                          ) : (
                            <Lock size={26} color={isLight ? '#94A3B8' : '#52656D'} strokeWidth={2.4} />
                          )}

                          {/* 3 Estrellas para lecciones completadas */}
                          {isCompleted && (
                            <div
                              style={{
                                position: 'absolute',
                                bottom: '-12px',
                                display: 'flex',
                                gap: '2px',
                                background: isLight ? '#FFFFFF' : '#1A242D',
                                padding: '2px 7px',
                                borderRadius: '999px',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                                border: '1.5px solid #F59E0B'
                              }}
                            >
                              {[1, 2, 3].map((s) => (
                                <Star key={s} size={10} fill="#F59E0B" color="#F59E0B" />
                              ))}
                            </div>
                          )}
                        </motion.button>
                      </div>

                      {/* Etiqueta / Pill con tema académico que no comprime ni corta el texto */}
                      <div
                        style={{
                          marginTop: isCompleted ? '16px' : '10px',
                          padding: '4px 12px',
                          borderRadius: '14px',
                          background: isCurrent
                            ? (isLight ? '#EFF6FF' : 'rgba(37, 99, 235, 0.22)')
                            : isCompleted
                              ? (isLight ? '#FEF3C7' : 'rgba(217, 119, 6, 0.2)')
                              : (isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)'),
                          border: isCurrent
                            ? (isLight ? '1.5px solid #BFDBFE' : '1.5px solid rgba(59, 130, 246, 0.45)')
                            : isCompleted
                              ? (isLight ? '1.5px solid #FDE68A' : '1.5px solid rgba(245, 158, 11, 0.35)')
                              : (isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)'),
                          maxWidth: '180px',
                          textAlign: 'center',
                          boxShadow: isCurrent
                            ? (isLight ? '0 4px 12px rgba(37, 99, 235, 0.18)' : '0 0 14px rgba(59, 130, 246, 0.35)')
                            : 'none',
                          zIndex: 4,
                          pointerEvents: 'none'
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: '0.74rem',
                            fontWeight: 800,
                            color: isCurrent
                              ? (isLight ? '#1D4ED8' : '#93C5FD')
                              : isCompleted
                                ? (isLight ? '#B45309' : '#FDE047')
                                : (isLight ? '#64748B' : '#94A3B8'),
                            lineHeight: 1.25,
                            textAlign: 'center',
                            wordBreak: 'break-word',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {lesson.shortName || lesson.title}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}

          {/* HITO FINAL DE GRADUACIÓN / META DE APRENDIZAJE */}
          {!isLoading && lessons.length > 0 && (
            <div
              style={{
                position: 'absolute',
                bottom: '18px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 18px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: '#FFFFFF',
                fontSize: '0.74rem',
                fontWeight: 900,
                boxShadow: '0 4px 16px rgba(16, 185, 129, 0.4)',
                whiteSpace: 'nowrap',
                zIndex: 5
              }}
            >
              <GraduationCap size={15} />
              <span>Meta del Curso • Máximo Rendimiento</span>
            </div>
          )}
        </div>

    </div>

      {/* ================= MODAL PREVIEW Y HUB ORBITAL DE SUBTEMAS ================= */}
      <AnimatePresence>
        {previewNode && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 90000,
              background: 'rgba(2, 6, 23, 0.82)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
            onClick={() => setPreviewNode(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '680px',
                maxHeight: '92vh',
                background: isLight ? '#FFFFFF' : 'linear-gradient(180deg, #0F172A 0%, #080D1A 100%)',
                border: isLight ? '1.5px solid #E2E8F0' : '1.5px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '28px',
                padding: 'clamp(18px, 3.5vw, 26px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                boxShadow: isLight
                  ? `0 20px 50px rgba(0, 0, 0, 0.12), 0 0 20px ${selectedSubject.color}20`
                  : `0 25px 70px rgba(0, 0, 0, 0.8), 0 0 30px ${selectedSubject.color}25`,
                color: isLight ? '#0F172A' : '#F8FAFC',
                overflowY: 'auto'
              }}
            >
              {/* Header del Planeta */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative' }}>
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '16px',
                    background: selectedSubject.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.7rem',
                    flexShrink: 0,
                    boxShadow: `0 0 20px ${selectedSubject.color}66`
                  }}
                >
                  {previewNode.nodeIcon || selectedSubject.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.74rem', color: isLight ? '#B45309' : '#FDE047', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {selectedSubject.name.toUpperCase()} • SEMANA {previewNode.semana}
                    </span>
                    <span style={{ fontSize: '0.7rem', background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.12)', padding: '2px 8px', borderRadius: '6px', color: isLight ? '#475569' : '#CBD5E1', fontWeight: 800 }}>
                      Matriz Oficial de Evaluación
                    </span>
                  </div>
                  <h3 style={{ margin: '3px 0 0', fontSize: 'clamp(1.1rem, 2.8vw, 1.35rem)', fontWeight: 900, color: isLight ? '#0F172A' : '#FFFFFF', lineHeight: 1.25 }}>
                    {previewNode.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewNode(null)}
                  style={{
                    background: isLight ? '#F1F5F9' : 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '34px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: isLight ? '#475569' : '#94A3B8',
                    flexShrink: 0
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Si el nodo tiene subtemas (Planeta Duolingo-style) */}
              {previewNode.subtemas && previewNode.subtemas.length > 0 ? (
                <>
                  {/* Banner de progreso del Anillo Planetario */}
                  {(() => {
                    const totalSt = previewNode.subtemas.length;
                    const doneSt = previewNode.subtemas.filter((st) => completedLessons[st.id] || completedLessons[previewNode.id]).length;
                    const pct = Math.round((doneSt / totalSt) * 100);
                    return (
                      <div
                        style={{
                          background: isLight ? '#F8FAFC' : 'rgba(15, 23, 42, 0.85)',
                          border: isLight ? '1.5px solid #E2E8F0' : '1.5px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '18px',
                          padding: '12px 16px',
                          boxShadow: isLight ? '0 2px 8px rgba(0,0,0,0.04)' : 'inset 0 1px 0 rgba(255,255,255,0.1)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.82rem', fontWeight: 900 }}>
                          <span style={{ color: isLight ? '#0284C7' : (themePalette.tagText || '#38BDF8'), display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <CheckCircle2 size={15} color={isLight ? '#0284C7' : '#38BDF8'} /> Progreso de la Lección ({doneSt}/{totalSt} Partes Dominadas)
                          </span>
                          <span style={{ color: doneSt === totalSt ? '#10B981' : (isLight ? '#0284C7' : '#38BDF8') }}>
                            {pct}% COMPLETADO
                          </span>
                        </div>

                        {/* Barra segmentada estilo Duolingo */}
                        <div style={{ display: 'flex', gap: '6px', height: '8px' }}>
                          {previewNode.subtemas.map((st, i) => {
                            const isDone = Boolean(completedLessons[st.id] || completedLessons[previewNode.id]);
                            return (
                              <div
                                key={st.id}
                                style={{
                                  flex: 1,
                                  height: '100%',
                                  borderRadius: '999px',
                                  background: isDone
                                    ? 'linear-gradient(90deg, #10B981, #34D399)'
                                    : (isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.12)'),
                                  boxShadow: isDone ? '0 0 8px rgba(16, 185, 129, 0.6)' : 'none',
                                  transition: 'all 0.3s ease'
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Lista interactiva de los subtemas */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '2px' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', color: isLight ? '#64748B' : '#94A3B8' }}>
                      Partes de la Lección (Subtemas del Prospecto Oficial):
                    </div>

                    {previewNode.subtemas.map((st, sIdx) => {
                      const isSubDone = Boolean(completedLessons[st.id] || completedLessons[previewNode.id]);
                      const isSubNext = !isSubDone && (sIdx === 0 || Boolean(completedLessons[previewNode.subtemas[sIdx - 1]?.id]));
                      const isExpanded = expandedTheorySubId === st.id;

                      return (
                        <div
                          key={st.id}
                          style={{
                            background: isSubDone
                              ? (isLight ? '#ECFDF5' : 'rgba(16, 185, 129, 0.1)')
                              : isSubNext
                                ? (isLight ? '#F0F9FF' : 'rgba(56, 189, 248, 0.12)')
                                : (isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.55)'),
                            border: isSubDone
                              ? (isLight ? '1.5px solid #10B981' : '1.5px solid rgba(16, 185, 129, 0.45)')
                              : isSubNext
                                ? (isLight ? '1.5px solid #0284C7' : '1.5px solid rgba(56, 189, 248, 0.55)')
                                : (isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.1)'),
                            borderRadius: '18px',
                            padding: '12px 14px',
                            transition: 'all 0.2s ease',
                            boxShadow: isSubNext ? '0 0 16px rgba(56, 189, 248, 0.25)' : 'none'
                          }}
                        >
                          {/* Fila principal del subtema */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', flexWrap: 'wrap' }}>
                            <div style={{ flex: 1, minWidth: '220px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                <span style={{ fontSize: '0.72rem', fontWeight: 900, background: isLight ? '#FEF3C7' : 'rgba(255, 255, 255, 0.14)', padding: '2px 7px', borderRadius: '6px', color: isLight ? '#92400E' : '#FEF08A' }}>
                                  Parte {st.subCode}
                                </span>
                                {isSubDone ? (
                                  <span style={{ fontSize: '0.72rem', fontWeight: 900, color: isLight ? '#059669' : '#6EE7B7', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                    <Check size={13} strokeWidth={3} /> Dominado (+25 XP)
                                  </span>
                                ) : isSubNext ? (
                                  <span style={{ fontSize: '0.72rem', fontWeight: 900, color: isLight ? '#0284C7' : '#38BDF8', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                    <Sparkles size={13} /> Siguiente Misión
                                  </span>
                                ) : (
                                  <span style={{ fontSize: '0.72rem', color: isLight ? '#64748B' : '#94A3B8' }}>
                                    Por Conquistar
                                  </span>
                                )}
                              </div>
                              <h4 style={{ margin: 0, fontSize: '0.94rem', fontWeight: 800, color: isLight ? '#0F172A' : '#FFFFFF', lineHeight: 1.3 }}>
                                {st.title}
                              </h4>
                            </div>

                            {/* Botones de acción del subtema */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              {/* Botón Ver Teoría del Tomo */}
                              <button
                                type="button"
                                onClick={() => setExpandedTheorySubId(isExpanded ? null : st.id)}
                                style={{
                                  padding: '7px 11px',
                                  borderRadius: '12px',
                                  background: isExpanded ? '#0284C7' : 'rgba(255, 255, 255, 0.08)',
                                  border: isExpanded ? '1px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.14)',
                                  color: '#FFFFFF',
                                  fontSize: '0.76rem',
                                  fontWeight: 800,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                <BookOpen size={13} />
                                <span>{isExpanded ? 'Ocultar Teoría' : 'Teoría Oficial'}</span>
                                {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                              </button>

                              {/* Botón Iniciar Reto Oficial */}
                              <button
                                type="button"
                                className="duo-btn-3d"
                                onClick={() => {
                                  const subLessonToPlay = {
                                    id: st.id,
                                    parentPlanetId: previewNode.id,
                                    subject: selectedSubject.name,
                                    semana: previewNode.semana,
                                    title: `${selectedSubject.name} • ${st.title}`,
                                    shortName: st.shortTitle,
                                    nodeIcon: st.icon || '🪐',
                                    xpReward: 25,
                                    theory: st.theory,
                                    challenges: st.challenges
                                  };
                                  setPreviewNode(null);
                                  setActiveLesson(subLessonToPlay);
                                }}
                                style={{
                                  padding: '7px 14px',
                                  borderRadius: '12px',
                                  background: isSubDone ? '#059669' : (themePalette.badgeGradient || themePalette.accent || selectedSubject.color),
                                  border: 'none',
                                  color: '#FFFFFF',
                                  fontSize: '0.78rem',
                                  fontWeight: 900,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  boxShadow: isSubDone
                                    ? '0 3px 0 #047857'
                                    : `0 3px 0 ${themePalette.accentDark || '#0284C7'}`
                                }}
                              >
                                <Play size={13} fill="#FFFFFF" />
                                <span>{isSubDone ? 'Repasar' : 'Entrenar'}</span>
                              </button>
                            </div>
                          </div>

                          {/* Acordeón desplegable con Teoría Oficial de Nivel 80+ Puntos */}
                          <AnimatePresence>
                            {isExpanded && st.theory && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{
                                  marginTop: '12px',
                                  paddingTop: '12px',
                                  borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '10px'
                                }}
                              >
                                {/* Marco Teórico General */}
                                {st.theory.marcoteorico && (
                                  <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '12px', padding: '12px' }}>
                                    <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#38BDF8', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                      <BookOpen size={13} /> Marco Teórico Oficial
                                    </div>
                                    <div style={{ fontSize: '0.84rem', color: '#E2E8F0', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                                      {st.theory.marcoteorico}
                                    </div>
                                  </div>
                                )}

                                {/* Secciones de Teoría Oficial */}
                                {st.theory.sections && st.theory.sections.map((sec, secIdx) => (
                                  <div key={secIdx} style={{ background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.6)', border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '12px', padding: '12px' }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 900, color: isLight ? '#475569' : '#94A3B8', textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                      <BookOpen size={13} /> {sec.heading}
                                    </div>
                                    <div style={{ fontSize: '0.84rem', color: isLight ? '#334155' : '#E2E8F0', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
                                      {sec.body}
                                    </div>
                                  </div>
                                ))}

                                {/* Pizarra de Fórmulas y Teoremas Canónicos con Tipografía KaTeX (Exclusivo Cursos STEM) */}
                                {isStemCourse && (st.theory?.formula_data || st.theory?.mecanismos) && (
                                  <FormulaDisplay
                                    formulaData={st.theory?.formula_data}
                                    rawMecanismos={st.theory?.mecanismos}
                                  />
                                )}

                                {/* Clave Fija de Aprendizaje (Alto Rendimiento) */}
                                {st.theory.fijaUnsa && (
                                  <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1.5px solid rgba(239, 68, 68, 0.45)', borderRadius: '12px', padding: '12px' }}>
                                    <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#F87171', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                      <Flame size={13} /> Clave Fija de Aprendizaje (Alto Rendimiento)
                                    </div>
                                    <div style={{ fontSize: '0.84rem', color: '#FEE2E2', lineHeight: 1.5, whiteSpace: 'pre-line', fontWeight: 600 }}>
                                      {st.theory.fijaUnsa}
                                    </div>
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                /* Vista estándar para Lecciones Individuales Descomprimidas, Hitos o Cofres */
                <>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ background: isLight ? '#EFF6FF' : 'rgba(59, 130, 246, 0.2)', border: isLight ? '1px solid #BFDBFE' : '1px solid rgba(59, 130, 246, 0.4)', color: isLight ? '#1D4ED8' : '#93C5FD', padding: '4px 10px', borderRadius: '8px', fontSize: '0.76rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Landmark size={13} />
                      <span>Temario Oficial {previewNode.subCode ? `• Tema ${previewNode.subCode}` : ''}</span>
                    </span>
                    <span style={{ background: isLight ? '#ECFDF5' : 'rgba(16, 185, 129, 0.2)', border: isLight ? '1px solid #A7F3D0' : '1px solid rgba(16, 185, 129, 0.4)', color: isLight ? '#047857' : '#6EE7B7', padding: '4px 10px', borderRadius: '8px', fontSize: '0.76rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Target size={13} />
                      <span>{previewNode.challenges?.length || 5} Retos Interactivos</span>
                    </span>
                  </div>

                  <p style={{ margin: 0, fontSize: '0.94rem', color: isLight ? '#334155' : '#94A3B8', lineHeight: '1.5', fontWeight: 600 }}>
                    {previewNode.fullTitle || previewNode.title}. Domina este tema del prospecto para asegurar tu máximo puntaje de ingreso.
                  </p>

                  {/* Resumen teórico previo si existe */}
                  {previewNode.theory?.summary && (
                    <div style={{ background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.05)', border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 14px', borderRadius: '14px', fontSize: '0.84rem', color: isLight ? '#475569' : '#CBD5E1', lineHeight: '1.5' }}>
                      <strong style={{ color: isLight ? '#0F172A' : '#FFFFFF', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
                        <Bookmark size={13} />
                        <span>Clave del Tema:</span>
                      </strong>
                      {previewNode.theory.summary}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.06)', border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 18px', borderRadius: '16px', fontSize: '0.9rem' }}>
                    <span style={{ color: isLight ? '#64748B' : '#94A3B8', fontWeight: 700 }}>Recompensa de expedición</span>
                    <span style={{ fontWeight: 900, color: '#F59E0B', fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      +{previewNode.xpReward || 25} XP
                      <Zap size={14} fill="#F59E0B" />
                    </span>
                  </div>

                  <button
                    type="button"
                    className="duo-btn-3d"
                    onClick={() => {
                      const toPlay = {
                        id: previewNode.id,
                        parentPlanetId: previewNode.parentPlanetId,
                        subject: selectedSubject.name,
                        semana: previewNode.semana,
                        title: `${selectedSubject.name} • ${previewNode.fullTitle || previewNode.title}`,
                        shortName: previewNode.shortName,
                        nodeIcon: previewNode.nodeIcon || null,
                        xpReward: previewNode.xpReward || 25,
                        theory: previewNode.theory,
                        challenges: previewNode.challenges
                      };
                      setPreviewNode(null);
                      setActiveLesson(toPlay);
                    }}
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '18px',
                      border: 'none',
                      background: themePalette.badgeGradient || themePalette.bannerGradient || selectedSubject.color,
                      boxShadow: `0 6px 0 ${themePalette.accentDark || '#0284C7'}, 0 0 20px ${themePalette.glow || 'rgba(0, 0, 0, 0.3)'}`,
                      color: '#FFFFFF',
                      fontSize: '1.08rem',
                      fontWeight: 900,
                      cursor: 'pointer',
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Play size={18} fill="#FFF" />
                    <span>{completedLessons[previewNode.id] ? 'Repasar Lección (+15 XP)' : '¡Comenzar Lección! (+25 XP)'}</span>
                  </button>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MODAL GUÍA DE UNIDAD (TEORÍA OFICIAL CEPREUNSA) ================= */}
      <AnimatePresence>
        {showUnitGuide && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 90000,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(10px, 3vw, 20px)'
            }}
            onClick={() => setShowUnitGuide(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '680px',
                maxHeight: 'min(88vh, 760px)',
                background: isLight ? '#FFFFFF' : 'linear-gradient(180deg, #0F172A 0%, #090D16 100%)',
                border: isLight ? '1.5px solid #E2E8F0' : '1.5px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '26px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: isLight
                  ? `0 25px 70px rgba(0, 0, 0, 0.12), 0 0 35px ${selectedSubject.color}20`
                  : `0 25px 70px rgba(0, 0, 0, 0.85), 0 0 35px ${selectedSubject.color}33`,
                color: isLight ? '#0F172A' : '#F8FAFC',
                overflow: 'hidden'
              }}
            >
              {/* Encabezado Fijo Sticky */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 20px',
                  background: isLight ? '#F8FAFC' : 'rgba(15, 23, 42, 0.96)',
                  borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(16px)',
                  flexShrink: 0,
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '14px',
                      background: `linear-gradient(135deg, ${selectedSubject.color} 0%, rgba(15, 23, 42, 0.9) 100%)`,
                      border: '1.5px solid rgba(255, 255, 255, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: `0 4px 12px ${selectedSubject.color}44`
                    }}
                  >
                    <SubjectLucideIcon id={selectedSubject.id} size={22} color="#FFFFFF" />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 'clamp(1.05rem, 3.5vw, 1.3rem)',
                        fontWeight: 900,
                        color: isLight ? '#0F172A' : '#FFFFFF',
                        lineHeight: 1.2,
                        letterSpacing: '-0.02em',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      Guía Oficial: {selectedSubject.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                      <span style={{ fontSize: '0.74rem', color: isLight ? '#0284C7' : '#38BDF8', fontWeight: 800 }}>
                        Tomos Oficiales
                      </span>
                      <span style={{ color: isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255, 255, 255, 0.3)', fontSize: '0.7rem' }}>•</span>
                      <span style={{ fontSize: '0.74rem', color: isLight ? '#64748B' : '#94A3B8', fontWeight: 700 }}>
                        Temario Completo
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <div style={{ display: 'none', md: 'block' }}>
                    <DynamicMascot mood="feliz" size={36} />
                  </div>
                  <button
                    onClick={() => setShowUnitGuide(false)}
                    aria-label="Cerrar guía"
                    style={{
                      background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
                      border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '50%',
                      width: '34px',
                      height: '34px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: isLight ? '#475569' : '#FFFFFF',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Contenido Teórico con Scroll Cómodo y Responsive */}
              <div
                style={{
                  overflowY: 'auto',
                  flex: 1,
                  padding: '18px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent'
                }}
              >
                {/* Tarjeta 1: Principio General */}
                <div
                  style={{
                    background: isLight ? '#EFF6FF' : 'rgba(59, 130, 246, 0.09)',
                    border: isLight ? '1px solid #BFDBFE' : '1px solid rgba(59, 130, 246, 0.25)',
                    borderLeft: '4px solid #3B82F6',
                    padding: '14px 16px',
                    borderRadius: '0 16px 16px 0',
                    boxShadow: isLight ? '0 2px 8px rgba(0, 0, 0, 0.04)' : '0 4px 16px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '7px' }}>
                    <BookOpen size={16} color={isLight ? '#2563EB' : '#60A5FA'} />
                    <h4 style={{ margin: 0, color: isLight ? '#1D4ED8' : '#93C5FD', fontWeight: 900, fontSize: '0.92rem', letterSpacing: '-0.01em' }}>
                      Principio General y Fundamento Epistemológico
                    </h4>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.86rem', lineHeight: '1.55', color: isLight ? '#334155' : '#E2E8F0' }}>
                    {lessons[0]?.theory?.sections[0]?.body || selectedSubject.description}
                  </p>
                </div>

                {/* Tarjeta 2: Pizarra de Fórmulas (STEM) o Claves Doctrinales (Humanidades) */}
                {isStemCourse && lessons[0]?.subtemas?.[0]?.theory?.formula_data ? (
                  <FormulaDisplay
                    formulaData={lessons[0]?.subtemas?.[0]?.theory?.formula_data}
                    rawMecanismos={lessons[0]?.theory?.sections?.[1]?.body}
                  />
                ) : (
                  <div
                    style={{
                      background: isLight ? '#F5F3FF' : 'rgba(139, 92, 246, 0.09)',
                      border: isLight ? '1px solid #DDD6FE' : '1px solid rgba(139, 92, 246, 0.25)',
                      borderLeft: '4px solid #8B5CF6',
                      padding: '14px 16px',
                      borderRadius: '0 16px 16px 0',
                      boxShadow: isLight ? '0 2px 8px rgba(0, 0, 0, 0.04)' : '0 4px 16px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '7px' }}>
                      <Target size={16} color={isLight ? '#7C3AED' : '#C084FC'} />
                      <h4 style={{ margin: 0, color: isLight ? '#6D28D9' : '#C4B5FD', fontWeight: 900, fontSize: '0.92rem', letterSpacing: '-0.01em' }}>
                        {isStemCourse ? 'Casos Particulares, Fórmulas y Taxonomía Evaluada' : 'Claves Conceptuales, Escuelas y Doctrina Evaluada'}
                      </h4>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.86rem', lineHeight: '1.55', color: isLight ? '#334155' : '#E2E8F0' }}>
                      {lessons[0]?.theory?.sections?.[1]?.body || (isStemCourse ? 'Revisión exhaustiva de clasificaciones, teoremas y casos operacionales evaluados en el examen de admisión.' : 'Revisión rigurosa de autores, corrientes, normas y definiciones clave evaluadas en el prospecto oficial.')}
                    </p>
                  </div>
                )}

                {/* Tarjeta 3: Deducción Práctica */}
                <div
                  style={{
                    background: isLight ? '#ECFDF5' : 'rgba(16, 185, 129, 0.09)',
                    border: isLight ? '1px solid #A7F3D0' : '1px solid rgba(16, 185, 129, 0.25)',
                    borderLeft: '4px solid #10B981',
                    padding: '14px 16px',
                    borderRadius: '0 16px 16px 0',
                    boxShadow: isLight ? '0 2px 8px rgba(0, 0, 0, 0.04)' : '0 4px 16px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '7px' }}>
                    <Sparkles size={16} color={isLight ? '#059669' : '#34D399'} />
                    <h4 style={{ margin: 0, color: isLight ? '#047857' : '#6EE7B7', fontWeight: 900, fontSize: '0.92rem', letterSpacing: '-0.01em' }}>
                      Deducción Práctica para el Examen
                    </h4>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.86rem', lineHeight: '1.55', color: isLight ? '#334155' : '#E2E8F0' }}>
                    {lessons[0]?.theory?.takeaway || 'Aplica los conceptos esenciales para deducir la alternativa correcta con rapidez y exactitud sin caer en distractores.'}
                  </p>
                </div>

                {/* Tarjeta 4: Consejo Estratégico de ORSTTY */}
                <div
                  style={{
                    background: isLight ? '#FEF3C7' : 'rgba(245, 158, 11, 0.08)',
                    border: isLight ? '1px solid #FDE68A' : '1px solid rgba(245, 158, 11, 0.25)',
                    borderLeft: '4px solid #F59E0B',
                    padding: '12px 16px',
                    borderRadius: '0 16px 16px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div style={{ flexShrink: 0 }}>
                    <DynamicMascot mood="contento" size={44} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', color: isLight ? '#B45309' : '#FBBF24' }}>
                      Consejo de Estudio RASTRO
                    </span>
                    <p style={{ margin: '2px 0 0', fontSize: '0.84rem', color: isLight ? '#78350F' : '#FEF3C7', lineHeight: '1.45', fontWeight: 600 }}>
                      {SUBJECT_MASCOT_TIPS[selectedSubject.name] || '¡Estudia con constancia y asegura cada punto en el baremo oficial!'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pie Fijo Sticky con Botón Táctil */}
              <div
                style={{
                  padding: '14px 20px',
                  background: isLight ? '#F8FAFC' : 'rgba(15, 23, 42, 0.98)',
                  borderTop: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.1)',
                  flexShrink: 0
                }}
              >
                <button
                  onClick={() => setShowUnitGuide(false)}
                  className="duo-btn-3d"
                  style={{
                    width: '100%',
                    padding: '14px 20px',
                    borderRadius: '16px',
                    border: 'none',
                    background: themePalette.badgeGradient || selectedSubject.color,
                    boxShadow: `0 4px 0 ${themePalette.accentDark || '#0284C7'}, 0 8px 20px ${themePalette.glow || 'rgba(0, 0, 0, 0.25)'}`,
                    color: '#FFFFFF',
                    fontWeight: 900,
                    fontSize: '0.98rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    letterSpacing: '0.02em'
                  }}
                >
                  <Check size={18} strokeWidth={3} />
                  <span>Entendido, volver a la expedición</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MODAL COFRE DE METEORITO / BONUS XP ================= */}
      <AnimatePresence>
        {chestModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 90000,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
            onClick={() => setChestModal(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '420px',
                background: '#0F172A',
                border: '1.5px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '28px',
                padding: '28px 24px',
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
                color: '#F8FAFC',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div style={{ marginBottom: '14px', position: 'relative' }}>
                <DynamicMascot size={84} mood="cheering" />
              </div>
              <h3 style={{ fontSize: '1.55rem', fontWeight: 900, margin: '0 0 8px', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {chestModal.alreadyClaimed ? (
                  <>
                    <Gift size={24} color="#FBBF24" />
                    <span>¡Cofre Ya Reclamado!</span>
                  </>
                ) : (
                  <>
                    <Zap size={24} color="#FBBF24" fill="#FBBF24" />
                    <span>¡Cofre Astral Reclamado!</span>
                  </>
                )}
              </h3>
              <p style={{ fontSize: '0.94rem', color: '#94A3B8', margin: '0 0 20px', lineHeight: 1.4 }}>
                {chestModal.alreadyClaimed
                  ? `Ya acumulaste la bonificación de este meteorito en ${selectedSubject.name}. ¡Avanza al siguiente Astro para continuar conquistando la vacante!`
                  : `¡Gran constancia! Has reclamado la recompensa cósmica de ${selectedSubject.name} y desbloqueado la siguiente órbita.`}
              </p>
              <div
                style={{
                  background: 'rgba(245, 158, 11, 0.16)',
                  border: '2px dashed #F59E0B',
                  borderRadius: '18px',
                  padding: '12px 24px',
                  fontSize: '1.35rem',
                  fontWeight: 900,
                  color: '#FBBF24',
                  marginBottom: '24px',
                  boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>+{chestModal.xpReward || 50} XP</span>
                <Zap size={20} fill="#FBBF24" />
              </div>
              <button
                className="duo-btn-3d"
                onClick={() => setChestModal(null)}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '18px',
                  border: 'none',
                  background: '#10B981',
                  boxShadow: '0 5px 0 #047857',
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: '1.05rem',
                  cursor: 'pointer'
                }}
              >
                ¡Continuar Aprendiendo!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MODAL MATRIZ COMPLETA DE 15 CURSOS CEPREUNSA ================= */}
      <AnimatePresence>
        {showAllCoursesModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              backgroundColor: 'rgba(2, 6, 23, 0.88)',
              backdropFilter: 'blur(16px)'
            }}
            onClick={() => setShowAllCoursesModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: isLight ? '#FFFFFF' : 'linear-gradient(180deg, #0F172A 0%, #020617 100%)',
                border: isLight ? '1.5px solid #E2E8F0' : '2px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '28px',
                padding: 'clamp(20px, 4vw, 32px)',
                width: '100%',
                maxWidth: '840px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: isLight
                  ? '0 25px 60px rgba(0, 0, 0, 0.12), 0 0 35px rgba(245, 158, 11, 0.1)'
                  : '0 25px 60px rgba(0, 0, 0, 0.75), 0 0 35px rgba(245, 158, 11, 0.15)',
                position: 'relative'
              }}
            >
              {/* Header Modal */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px', gap: '12px' }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: isLight ? '#FEF3C7' : 'rgba(245, 158, 11, 0.2)', border: isLight ? '1px solid #F59E0B' : '1px solid rgba(245, 158, 11, 0.4)', padding: '4px 10px', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 900, color: isLight ? '#92400E' : '#FEF08A', textTransform: 'uppercase', marginBottom: '8px' }}>
                    <GraduationCap size={14} /> Temario y Matriz Oficial de Evaluación
                  </div>
                  <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.65rem)', fontWeight: 900, margin: '0 0 4px', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                    Los 15 Cursos de Formación Académica
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: isLight ? '#475569' : '#94A3B8', lineHeight: 1.4 }}>
                    Estructurados en 10 semanas académicas completas con teoría profunda y preguntas del banco oficial para asegurar más de 80 puntos.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllCoursesModal(false)}
                  style={{
                    background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isLight ? '#475569' : '#94A3B8',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Barra de Búsqueda y Filtros de Área dentro del modal */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={18} color="#64748B" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={courseSearchQuery}
                    onChange={(e) => setCourseSearchQuery(e.target.value)}
                    placeholder="Buscar curso por nombre, área o temas..."
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '12px 14px 12px 42px',
                      background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.7)',
                      border: isLight ? '1.5px solid #CBD5E1' : '1.5px solid rgba(255, 255, 255, 0.14)',
                      borderRadius: '16px',
                      color: isLight ? '#0F172A' : '#FFFFFF',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                  {courseSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setCourseSearchQuery('')}
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: isLight ? '#64748B' : '#94A3B8', cursor: 'pointer' }}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* Indicador de Asignaturas Generales */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: isLight ? '#64748B' : '#94A3B8', fontWeight: 600 }}>
                    Mostrando {searchedCoursesInModal.length} de {SUBJECTS_CONFIG.length} asignaturas generales del temario oficial
                  </span>
                  <span style={{ fontSize: '0.75rem', color: isLight ? '#92400E' : '#FEF08A', background: isLight ? '#FEF3C7' : 'rgba(245, 158, 11, 0.15)', padding: '3px 10px', borderRadius: '8px', border: isLight ? '1px solid #F59E0B' : '1px solid rgba(245, 158, 11, 0.3)', fontWeight: 800 }}>
                    10 Semanas Oficiales c/u
                  </span>
                </div>
              </div>

              {/* Grid de los 15 Cursos */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: '12px'
                }}
              >
                {searchedCoursesInModal.map((subj) => {
                  const isCurrent = selectedSubject.id === subj.id;
                  return (
                    <div
                      key={subj.id}
                      onClick={() => {
                        handleSelectSubjectWorld(subj);
                      }}
                      style={{
                        background: isCurrent
                          ? (isLight ? `${subj.color}15` : `${subj.color}22`)
                          : (isLight ? '#F8FAFC' : 'rgba(15, 23, 42, 0.7)'),
                        border: isCurrent
                          ? `2px solid ${subj.color}`
                          : (isLight ? '1.5px solid #E2E8F0' : '1.5px solid rgba(255, 255, 255, 0.1)'),
                        borderRadius: '20px',
                        padding: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative',
                        boxShadow: isCurrent
                          ? (isLight ? `0 0 16px ${subj.color}30` : `0 0 20px ${subj.color}40`)
                          : (isLight ? '0 2px 6px rgba(0,0,0,0.04)' : 'none')
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '12px',
                            background: `${subj.color}25`,
                            border: `1px solid ${subj.color}55`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <SubjectLucideIcon id={subj.id} size={22} color={subj.color} />
                        </div>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.1)',
                            color: isLight ? '#334155' : '#E2E8F0'
                          }}
                        >
                          Asignatura General
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.05rem', fontWeight: 900, margin: '0 0 4px', color: isLight ? '#0F172A' : '#FFFFFF' }}>
                        {subj.name}
                      </h3>
                      <p style={{ margin: '0 0 10px', fontSize: '0.78rem', color: isLight ? '#64748B' : '#94A3B8', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {subj.description}
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.72rem' }}>
                        <span style={{ color: isLight ? '#B45309' : '#FDE047', fontWeight: 800 }}>10 Semanas • 40+ Lecciones</span>
                        {isCurrent ? (
                          <span style={{ color: '#10B981', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Check size={13} strokeWidth={3} /> Activo
                          </span>
                        ) : (
                          <span style={{ color: isLight ? '#0284C7' : '#38BDF8', fontWeight: 700 }}>Seleccionar →</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {searchedCoursesInModal.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94A3B8' }}>
                  <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>No se encontraron cursos con ese criterio.</p>
                  <button
                    type="button"
                    onClick={() => { setCourseSearchQuery(''); setSelectedAreaFilter('ALL'); }}
                    style={{ marginTop: '10px', padding: '6px 14px', borderRadius: '10px', background: '#0284C7', border: 'none', color: '#FFFFFF', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Restablecer Filtros
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MODAL DE CONFIRMACIÓN DE SALTO A UN TEMA ================= */}
      <AnimatePresence>
        {skipConfirmTopic && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              backgroundColor: 'rgba(2, 6, 23, 0.9)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)'
            }}
            onClick={() => setSkipConfirmTopic(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '440px',
                background: isLight ? '#FFFFFF' : 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
                border: isLight ? '1.5px solid #CBD5E1' : '2px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '26px',
                padding: '28px 24px',
                textAlign: 'center',
                boxShadow: isLight
                  ? '0 25px 60px rgba(0, 0, 0, 0.16)'
                  : '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(245, 158, 11, 0.25)',
                color: isLight ? '#0F172A' : '#F8FAFC'
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  boxShadow: '0 6px 18px rgba(245, 158, 11, 0.4)'
                }}
              >
                <Rocket size={30} color="#FFFFFF" />
              </div>

              <h3 style={{ fontSize: '1.38rem', fontWeight: 900, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                ¿Empezar desde este tema?
              </h3>

              <div
                style={{
                  background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.08)',
                  padding: '12px 14px',
                  borderRadius: '14px',
                  marginBottom: '16px',
                  fontSize: '0.94rem',
                  fontWeight: 800,
                  color: isLight ? '#0F172A' : '#FFFFFF'
                }}
              >
                {skipConfirmTopic.fullTitle || skipConfirmTopic.title}
              </div>

              <p style={{ fontSize: '0.88rem', color: isLight ? '#475569' : '#94A3B8', margin: '0 0 24px', lineHeight: 1.5 }}>
                ¿Estás seguro de saltar aquí? Los temas anteriores de <strong>{selectedSubject.name}</strong> se considerarán superados para que continúes directamente desde este punto.
              </p>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setSkipConfirmTopic(null)}
                  className="duo-btn-3d"
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: '14px',
                    background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.1)',
                    border: isLight ? '1.5px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.15)',
                    color: isLight ? '#475569' : '#CBD5E1',
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={() => handleConfirmJumpToTopic(skipConfirmTopic)}
                  className="duo-btn-3d"
                  style={{
                    flex: 1.3,
                    padding: '12px 16px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    border: 'none',
                    borderBottom: '4px solid #047857',
                    color: '#FFFFFF',
                    fontWeight: 900,
                    fontSize: '0.94rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
                  }}
                >
                  <Check size={16} strokeWidth={3} />
                  <span>¡Sí, empezar aquí!</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MODAL DE FÓRMULAS Y TRUQUITOS DEL CURSO (HUD) ================= */}
      <AnimatePresence>
        {showFormulaModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px',
              paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
            onClick={() => setShowFormulaModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '480px',
                maxHeight: '85vh',
                background: isLight ? '#FFFFFF' : '#0F172A',
                borderRadius: '24px',
                border: isLight ? '2px solid rgba(0,0,0,0.1)' : (isStemCourse ? '2px solid rgba(139, 92, 246, 0.35)' : '2px solid rgba(16, 185, 129, 0.35)'),
                borderBottom: isLight ? '5px solid rgba(0,0,0,0.15)' : (isStemCourse ? '5px solid #7C3AED' : '5px solid #059669'),
                boxShadow: isLight
                  ? '0 20px 40px rgba(0,0,0,0.15)'
                  : (isStemCourse
                      ? '0 25px 60px rgba(0,0,0,0.7), 0 0 30px rgba(124, 58, 237, 0.3)'
                      : '0 25px 60px rgba(0,0,0,0.7), 0 0 30px rgba(16, 185, 129, 0.3)'),
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxSizing: 'border-box'
              }}
            >
              {/* Header del Modal */}
              <div
                style={{
                  padding: '14px 18px',
                  borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: isLight
                    ? 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)'
                    : 'linear-gradient(180deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)',
                  flexShrink: 0
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '12px',
                      background: isStemCourse
                        ? 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)'
                        : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      boxShadow: isStemCourse
                        ? '0 4px 12px rgba(124, 58, 237, 0.35)'
                        : '0 4px 12px rgba(16, 185, 129, 0.35)',
                      flexShrink: 0
                    }}
                  >
                    {isStemCourse ? <Sigma size={20} /> : <Lightbulb size={20} />}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.98rem', fontWeight: 900, color: isLight ? '#0F172A' : '#FFFFFF', lineHeight: 1.2 }}>
                      {isStemCourse ? 'Fórmulas y Teoremas' : 'Truquitos y Claves Prácticas'}
                    </div>
                    <div style={{ fontSize: '0.74rem', fontWeight: 700, color: isLight ? '#64748B' : '#94A3B8' }}>
                      {isStemCourse
                        ? `${selectedSubject.name} • Temario Oficial`
                        : `${selectedSubject.name} • Mnemotecnias y Puntos Clave`}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowFormulaModal(false)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: isLight ? '#475569' : '#E2E8F0'
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Contenido scrolleable de Fórmulas / Truquitos */}
              <div
                style={{
                  padding: '14px',
                  overflowY: 'auto',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                {courseFormulas.length > 0 ? (
                  <>
                    <div
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: isLight ? '#64748B' : '#94A3B8',
                        padding: '0 4px'
                      }}
                    >
                      {courseFormulas.length}{' '}
                      {courseFormulas.length === 1
                        ? (isStemCourse ? 'fórmula evaluada' : 'clave o truco evaluado')
                        : (isStemCourse ? 'fórmulas evaluadas' : 'claves y trucos evaluados')}{' '}
                      en este curso
                    </div>

                    {courseFormulas.map((f, idx) => (
                      <div
                        key={`form-${idx}`}
                        style={{
                          background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.45)',
                          border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '16px',
                          padding: '8px 10px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px'
                        }}
                      >
                        {/* Cabecera del subtema */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                          <span
                            style={{
                              fontSize: '0.68rem',
                              fontWeight: 900,
                              textTransform: 'uppercase',
                              padding: '2px 7px',
                              borderRadius: '6px',
                              background: isLight ? '#EDE9FE' : 'rgba(124, 58, 237, 0.25)',
                              color: isLight ? '#6D28D9' : '#C4B5FD'
                            }}
                          >
                            Semana {f.week} {f.subCode ? `• ${f.subCode}` : ''}
                          </span>
                          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: isLight ? '#1E293B' : '#F1F5F9' }}>
                            {f.subtemaTitle}
                          </span>
                        </div>

                        {/* Renderizado de Fórmula con KaTeX */}
                        <FormulaDisplay
                          formulaData={f.formulaData}
                          rawMecanismos={f.rawMecanismos}
                          compact={true}
                        />

                        {/* Clave fija esencial si existe */}
                        {f.fijaUnsa && (
                          <div
                            style={{
                              background: isLight ? '#FEF2F2' : 'rgba(239, 68, 68, 0.12)',
                              border: isLight ? '1px solid #FECDD3' : '1px solid rgba(239, 68, 68, 0.3)',
                              borderRadius: '8px',
                              padding: '5px 8px',
                              fontSize: '0.72rem',
                              color: isLight ? '#991B1B' : '#FCA5A5',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px'
                            }}
                          >
                            <Flame size={12} color="#EF4444" style={{ flexShrink: 0 }} />
                            <span><strong>Punto Clave:</strong> {f.fijaUnsa}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '26px 14px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '16px',
                        background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isLight ? '#64748B' : '#94A3B8'
                      }}
                    >
                      <BookOpen size={26} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.96rem', fontWeight: 900, color: isLight ? '#0F172A' : '#FFFFFF', marginBottom: '4px' }}>
                        {isStemCourse ? 'Temario Teórico y Conceptual' : 'Claves y Puntos Mnemotécnicos'}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: isLight ? '#64748B' : '#94A3B8', lineHeight: 1.5, maxWidth: '340px' }}>
                        {isStemCourse ? (
                          <>El curso de <strong>{selectedSubject.name}</strong> prioriza reglas teóricas y definiciones oficiales. Puedes explorar cursos con fórmulas y teoremas:</>
                        ) : (
                          <>El curso de <strong>{selectedSubject.name}</strong> se enfoca en desarrollo conceptual y memoria activa. ¡Avanza por las lecciones para dominar las preguntas fijas!</>
                        )}
                      </div>
                    </div>

                    <div style={{ width: '100%', marginTop: '6px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                        {['fisica', 'quimica', 'algebra', 'geometria'].map((subjKey) => {
                          const conf = SUBJECTS_CONFIG.find((s) => s.id === subjKey);
                          if (!conf) return null;
                          return (
                            <button
                              key={subjKey}
                              type="button"
                              onClick={() => {
                                handleSelectSubjectWorld(conf);
                                setShowFormulaModal(false);
                              }}
                              className="duo-btn-3d"
                              style={{
                                padding: '8px 10px',
                                borderRadius: '12px',
                                background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.08)',
                                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.15)',
                                color: isLight ? '#1E293B' : '#FFFFFF',
                                fontWeight: 800,
                                fontSize: '0.80rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                justifyContent: 'center'
                              }}
                            >
                              <span>{conf.icon}</span>
                              <span>{conf.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div
                style={{
                  padding: '12px 16px',
                  borderTop: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  background: isLight ? '#F8FAFC' : 'rgba(15, 23, 42, 0.8)',
                  flexShrink: 0
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowFormulaModal(false)}
                  className="duo-btn-3d"
                  style={{
                    padding: '8px 20px',
                    borderRadius: '12px',
                    background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.12)',
                    border: 'none',
                    color: isLight ? '#334155' : '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '0.84rem',
                    cursor: 'pointer'
                  }}
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <RankingSimulacroModal
        isOpen={showRankingModal}
        onClose={() => setShowRankingModal(false)}
        initialCourse={selectedSubject?.name || 'Biología'}
      />

      {/* Modal de Flashcards por Curso, Tema y Subtema */}
      <CourseFlashcardsModal
        isOpen={showCourseFlashcards}
        onClose={() => setShowCourseFlashcards(false)}
        subject={selectedSubject}
      />

      {/* Modal Digital de Lectura de Obras Literarias Pre-U (90% argumento narrativo + 10% apunte de repaso) */}
      {readingObra && (
        <LiteraturaViewerModal
          obra={readingObra}
          isOpen={Boolean(readingObra)}
          onClose={() => setReadingObra(null)}
        />
      )}

      {/* ================= MOTOR DE LECCIÓN EN PANTALLA COMPLETA ================= */}
      {activeLesson && (
        <LessonEngine
          lesson={activeLesson}
          themePalette={themePalette}
          onComplete={() => {
            if (typeof recordLessonCompletion === 'function') {
              // 1. Marcar el subtema o reto actual como completado
              recordLessonCompletion(activeLesson.id, activeLesson.xpReward || 25, 3);

              // 2. Si es parte de un planeta con subtemas, verificar si se conquistaron todos
              if (activeLesson.parentPlanetId) {
                const parentPlanet = lessons.find((l) => l.id === activeLesson.parentPlanetId);
                if (parentPlanet && parentPlanet.subtemas) {
                  const allSubtemasDone = parentPlanet.subtemas.every(
                    (st) => st.id === activeLesson.id || completedLessons[st.id]
                  );
                  if (allSubtemasDone) {
                    recordLessonCompletion(parentPlanet.id, 50, 3);
                  }
                }
              }
            }
            setActiveLesson(null);
          }}
          onExit={() => {
            setActiveLesson(null);
          }}
        />
      )}
    </div>
  );
};

export default Aprender;

