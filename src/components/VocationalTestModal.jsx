import React, { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, CheckCircle2, ChevronRight, ChevronLeft, RotateCcw, Award, BookOpen, Brain, Heart, Zap, Target, Star, Download, Share2, Check, X, Trophy, TrendingUp, GraduationCap, Flame, ArrowRight } from 'lucide-react';

// Preguntas del Test Vocacional Oficial UNSA (20 Preguntas Reales ponderadas por Área: Biomédicas, Ingenierías y Sociales)
const VOCATIONAL_QUESTIONS = [
  {
    id: 1,
    category: 'Ingenierías y Arquitectura',
    area: 'ingenierias',
    badgeColor: '#3B82F6',
    question: '¿Te apasiona comprender cómo funcionan los circuitos, programar aplicaciones de software o automatizar procesos con tecnología?'
  },
  {
    id: 2,
    category: 'Ciencias Biomédicas',
    area: 'biomedicas',
    badgeColor: '#10B981',
    question: '¿Sientes fascinación por la anatomía humana, el tratamiento de enfermedades, la genética o la fisiología de los seres vivos?'
  },
  {
    id: 3,
    category: 'Ciencias Sociales y Humanidades',
    area: 'sociales',
    badgeColor: '#EC4899',
    question: '¿Disfrutas analizar problemáticas de la sociedad, debatir sobre leyes y justicia, o investigar historia y comportamiento humano?'
  },
  {
    id: 4,
    category: 'Ingenierías y Arquitectura',
    area: 'ingenierias',
    badgeColor: '#3B82F6',
    question: '¿Te atrae diseñar planos de infraestructuras, construcciones de puentes, edificios o calcular estructuras resistentes?'
  },
  {
    id: 5,
    category: 'Ciencias Biomédicas',
    area: 'biomedicas',
    badgeColor: '#10B981',
    question: '¿Te gustaría trabajar en laboratorios de análisis clínicos, sintetizando medicamentos o manipulando cultivos microbiológicos?'
  },
  {
    id: 6,
    category: 'Ciencias Sociales y Humanidades',
    area: 'sociales',
    badgeColor: '#EC4899',
    question: '¿Te motiva crear empresas, liderar equipos de trabajo, administrar finanzas o diseñar campañas de marketing y comunicación?'
  },
  {
    id: 7,
    category: 'Ingenierías y Arquitectura',
    area: 'ingenierias',
    badgeColor: '#3B82F6',
    question: '¿Disfrutas resolver problemas lógicos complejos utilizando álgebra, cálculo diferencial, física mecánica o estadística aplicada?'
  },
  {
    id: 8,
    category: 'Ciencias Biomédicas',
    area: 'biomedicas',
    badgeColor: '#10B981',
    question: '¿Sientes una fuerte vocación por atender y cuidar directamente a personas enfermas, en rehabilitación o emergencias de salud?'
  },
  {
    id: 9,
    category: 'Ciencias Sociales y Humanidades',
    area: 'sociales',
    badgeColor: '#EC4899',
    question: '¿Te entusiasma brindar orientación psicológica, entender los trastornos emocionales o enseñar y formar a niños y jóvenes?'
  },
  {
    id: 10,
    category: 'Ingenierías y Arquitectura',
    area: 'ingenierias',
    badgeColor: '#3B82F6',
    question: '¿Te interesa el sector minero, la extracción de metales, energías renovables, termodinámica o procesos químicos industriales?'
  },
  {
    id: 11,
    category: 'Ciencias Biomédicas',
    area: 'biomedicas',
    badgeColor: '#10B981',
    question: '¿Te preocupa la preservación del medio ambiente, la fauna silvestre, la producción agropecuaria y la biotecnología agrícola?'
  },
  {
    id: 12,
    category: 'Ciencias Sociales y Humanidades',
    area: 'sociales',
    badgeColor: '#EC4899',
    question: '¿Te gusta redactar artículos de opinión, expresarte mediante la literatura, el periodismo de investigación o la producción audiovisual?'
  },
  {
    id: 13,
    category: 'Ingenierías y Arquitectura',
    area: 'ingenierias',
    badgeColor: '#3B82F6',
    question: '¿Te gustaría diseñar maquinaria mecánica, sistemas de robótica, vehículos autónomos o redes eléctricas de alta potencia?'
  },
  {
    id: 14,
    category: 'Ciencias Biomédicas',
    area: 'biomedicas',
    badgeColor: '#10B981',
    question: '¿Te interesa promover una nutrición saludable, la salud bucal (odontología) o desarrollar políticas públicas de salud preventiva?'
  },
  {
    id: 15,
    category: 'Ciencias Sociales y Humanidades',
    area: 'sociales',
    badgeColor: '#EC4899',
    question: '¿Te resulta cómodo manejar presupuestos, analizar estados financieros, balances contables o estudiar políticas económicas?'
  },
  {
    id: 16,
    category: 'Ingenierías y Arquitectura',
    area: 'ingenierias',
    badgeColor: '#3B82F6',
    question: '¿Te entusiasma la ciencia de datos, ciberseguridad, desarrollo de inteligencia artificial y computación en la nube?'
  },
  {
    id: 17,
    category: 'Ciencias Biomédicas',
    area: 'biomedicas',
    badgeColor: '#10B981',
    question: '¿Te genera curiosidad la investigación con células madre, bioinformática, vacunas y reacciones bioquímicas a nivel molecular?'
  },
  {
    id: 18,
    category: 'Ciencias Sociales y Humanidades',
    area: 'sociales',
    badgeColor: '#EC4899',
    question: '¿Te identificas con la defensa de los derechos fundamentales, la resolución pacífica de conflictos o la diplomacia internacional?'
  },
  {
    id: 19,
    category: 'Ingenierías y Arquitectura',
    area: 'ingenierias',
    badgeColor: '#3B82F6',
    question: '¿Te gusta optimizar la cadena de suministros, la ergonomía industrial, el control de calidad y la gestión de proyectos?'
  },
  {
    id: 20,
    category: 'Ciencias Biomédicas',
    area: 'biomedicas',
    badgeColor: '#10B981',
    question: '¿Te motiva trabajar en quirófanos, salas de cuidados intensivos o centros de diagnóstico por imágenes de alta precisión?'
  }
];

// Carreras Oficiales de la UNSA por Área
// Carreras Oficiales de la UNSA por Área con Arquetipos Psicométricos y Métricas de Admisión
const UNSA_CAREERS_MAP = {
  biomedicas: {
    name: 'Ciencias Biomédicas (Área I)',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.08)',
    borderColor: '#10B981',
    archetype: {
      title: 'El Científico Clínico & Guardián de la Vida',
      subtitle: 'Perfil con Vocación Biomédica, Diagnóstico y Ética de Servicio',
      description: 'Tu perfil destaca por una profunda curiosidad hacia las ciencias de la salud, la investigación biológica y el tratamiento de enfermedades, guiado por una alta empatía y vocación de servicio integral a la comunidad.'
    },
    podium: [
      { rank: 1, name: 'Medicina Humana', match: '97%', cutScore: '89.20 pts', medal: '🥇 Oro', tag: 'Máxima Demanda', desc: 'Diagnóstico médico, cirugía, terapéutica y salud integral en hospitales y clínicas.' },
      { rank: 2, name: 'Enfermería / Odontología', match: '91%', cutScore: '75.10 pts', medal: '🥈 Plata', tag: 'Atención Directa', desc: 'Cuidados críticos, rehabilitación, salud comunitaria y procedimientos odontológicos.' },
      { rank: 3, name: 'Farmacia, Bioquímica & Biología', match: '86%', cutScore: '72.80 pts', medal: '🥉 Bronce', tag: 'Investigación', desc: 'Farmacología, biotecnología molecular, toxicología y genética en laboratorios.' }
    ],
    aptitudes: [
      { name: 'Vocación de Servicio & Empatía Humana', level: '96%', grade: 'Sobresaliente' },
      { name: 'Análisis Biológico y Bioquímico', level: '92%', grade: 'Sobresaliente' },
      { name: 'Toma de Decisiones Clínicas', level: '85%', grade: 'Avanzado' },
      { name: 'Resiliencia y Trabajo Bajo Presión', level: '89%', grade: 'Avanzado' }
    ],
    strategyPlan: {
      focus: 'Cursos Críticos con Mayor Ponderación en Área I (Biomédicas):',
      courses: [
        { name: 'Biología Celular y Humana', weight: 'Ponderación Máxima (25%)', tip: 'Enfócate en genética, citología, histología y fisiología de sistemas.' },
        { name: 'Química Orgánica & Inorgánica', weight: 'Ponderación Alta (20%)', tip: 'Domina estequiometría, nomenclatura y soluciones.' },
        { name: 'Raz. Verbal y Matemático', weight: 'Clave de Velocidad (20%)', tip: 'Asegura los puntos rápidos para ganar tiempo en ciencias.' }
      ]
    },
    topCareers: [
      { name: 'Medicina Humana', desc: 'Diagnóstico, tratamiento médico integral y cirugía.' },
      { name: 'Enfermería', desc: 'Atención integral del paciente, cuidados críticos y salud comunitaria.' },
      { name: 'Farmacia y Bioquímica', desc: 'Formulación de fármacos, toxicología y análisis clínico.' },
      { name: 'Biología', desc: 'Genética, ecología, microbiología y biotecnología molecular.' },
      { name: 'Nutrición', desc: 'Dietoterapia, bioquímica nutricional y salud pública.' },
      { name: 'Odontología', desc: 'Salud bucal, ortodoncia, rehabilitación oral y cirugía maxilofacial.' }
    ],
    strengths: ['Alta vocación de servicio humano', 'Pensamiento analítico en ciencias biológicas y químicas', 'Capacidad de respuesta bajo presión', 'Empatía y ética médica']
  },
  ingenierias: {
    name: 'Ingenierías y Ciencias Exactas (Área II)',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.08)',
    borderColor: '#3B82F6',
    archetype: {
      title: 'El Arquitecto Tecnológico & Analista Sistemático',
      subtitle: 'Perfil de Alta Capacidad Lógica, Modelado Matemático e Innovación',
      description: 'Muestras una sobresaliente inclinación hacia el razonamiento analítico, la optimización de procesos y el diseño de soluciones tecnológicas y de infraestructura que transforman la industria y la sociedad.'
    },
    podium: [
      { rank: 1, name: 'Ingeniería de Sistemas / Software', match: '96%', cutScore: '83.50 pts', medal: '🥇 Oro', tag: 'Alta Demanda Tech', desc: 'Arquitectura cloud, ciberseguridad, desarrollo algorítmico e inteligencia artificial.' },
      { rank: 2, name: 'Ingeniería Industrial', match: '92%', cutScore: '78.40 pts', medal: '🥈 Plata', tag: 'Gestión & Procesos', desc: 'Optimización de cadena de suministro, calidad, automatización y gerencia operativa.' },
      { rank: 3, name: 'Ingeniería Civil / Electrónica', match: '87%', cutScore: '76.90 pts', medal: '🥉 Bronce', tag: 'Infraestructura', desc: 'Diseño estructural sismorresistente, cálculo de obras civiles y hardware avanzado.' }
    ],
    aptitudes: [
      { name: 'Razonamiento Cuantitativo & Lógico', level: '95%', grade: 'Sobresaliente' },
      { name: 'Resolución Sistemática de Problemas', level: '92%', grade: 'Sobresaliente' },
      { name: 'Abstracción y Pensamiento Algorítmico', level: '89%', grade: 'Avanzado' },
      { name: 'Visión Espacial y Modelado Físico', level: '86%', grade: 'Avanzado' }
    ],
    strategyPlan: {
      focus: 'Cursos Críticos con Mayor Ponderación en Área II (Ingenierías):',
      courses: [
        { name: 'Física Pre-U', weight: 'Ponderación Máxima (25%)', tip: 'Domina cinemática, dinámica, estática, termodinámica y electrodinámica.' },
        { name: 'Álgebra & Raz. Matemático', weight: 'Ponderación Alta (20%)', tip: 'Prioriza funciones, polinomios, matrices y conteo de rutas.' },
        { name: 'Geometría y Trigonometría', weight: 'Puntaje de Desempate (15%)', tip: 'Clave para geometría del espacio y razones trigonométricas.' }
      ]
    },
    topCareers: [
      { name: 'Ingeniería de Sistemas', desc: 'Software, arquitecturas cloud, ciberseguridad y bases de datos.' },
      { name: 'Ingeniería de Software / IA', desc: 'Desarrollo de aplicaciones, algoritmos e inteligencia artificial.' },
      { name: 'Ingeniería Civil', desc: 'Infraestructura, diseño sismorresistente, puentes e hidráulica.' },
      { name: 'Ingeniería Industrial', desc: 'Optimización de procesos, cadena de suministro y gerencia.' },
      { name: 'Ingeniería Mecánica / Eléctrica', desc: 'Sistemas térmicos, redes de potencia y automatización.' },
      { name: 'Arquitectura', desc: 'Diseño espacial, urbanismo y planificación del hábitat humano.' }
    ],
    strengths: ['Razonamiento lógico-matemático y espacial', 'Resolución sistemática de problemas complejos', 'Afinidad por la programación y hardware', 'Capacidad de modelamiento y abstracción']
  },
  sociales: {
    name: 'Ciencias Sociales y Humanidades (Área III)',
    color: '#EC4899',
    bgColor: 'rgba(236, 72, 153, 0.08)',
    borderColor: '#EC4899',
    archetype: {
      title: 'El Estratega Humanista & Líder Social',
      subtitle: 'Perfil de Pensamiento Crítico, Comunicación Persuasiva y Gestión',
      description: 'Demuestras una gran agudeza para comprender fenómenos sociales, marcos normativos, dinámicas económicas y liderazgo organizativo orientado a la justicia, la gobernanza y el impacto humano.'
    },
    podium: [
      { rank: 1, name: 'Derecho', match: '96%', cutScore: '82.80 pts', medal: '🥇 Oro', tag: 'Litigio & Justicia', desc: 'Legislación, derecho constitucional, litigio procesal y asesoría jurídica corporativa.' },
      { rank: 2, name: 'Psicología', match: '92%', cutScore: '78.90 pts', medal: '🥈 Plata', tag: 'Comportamiento', desc: 'Psicología clínica, psicoterapia, neuropsicología y gestión del talento humano.' },
      { rank: 3, name: 'Administración / Economía', match: '88%', cutScore: '75.60 pts', medal: '🥉 Bronce', tag: 'Dirección Estratégica', desc: 'Modelos econométricos, finanzas públicas, negocios internacionales y políticas.' }
    ],
    aptitudes: [
      { name: 'Comunicación Asertiva y Oratoria', level: '94%', grade: 'Sobresaliente' },
      { name: 'Pensamiento Crítico y Hermenéutico', level: '91%', grade: 'Sobresaliente' },
      { name: 'Capacidad de Mediación y Negociación', level: '88%', grade: 'Avanzado' },
      { name: 'Comprensión Lectora y Expresión Escrita', level: '93%', grade: 'Sobresaliente' }
    ],
    strategyPlan: {
      focus: 'Cursos Críticos con Mayor Ponderación en Área III (Sociales):',
      courses: [
        { name: 'Lenguaje y Literatura', weight: 'Ponderación Máxima (25%)', tip: 'Excelente sintaxis, funciones del lenguaje y análisis literario.' },
        { name: 'Historia Nacional y Universal', weight: 'Ponderación Alta (20%)', tip: 'Enfócate en procesos republicanos, culturas originarias y siglo XX.' },
        { name: 'Filosofía, Cívica & Economía', weight: 'Preguntas Determinantes (15%)', tip: 'Doctrinas filosóficas, derechos humanos y estructura del Estado.' }
      ]
    },
    topCareers: [
      { name: 'Derecho', desc: 'Legislación, defensa procesal, litigio y asesoría jurídica corporativa.' },
      { name: 'Psicología', desc: 'Evaluación psicoterapéutica, psicología clínica, social y organizacional.' },
      { name: 'Administración', desc: 'Dirección estratégica, negocios internacionales y liderazgo corporativo.' },
      { name: 'Contabilidad', desc: 'Auditoría financiera, gestión tributaria y peritaje contable.' },
      { name: 'Economía', desc: 'Análisis macroeconómico, econometría y evaluación de proyectos de inversión.' },
      { name: 'Ciencias de la Comunicación', desc: 'Periodismo multimedia, relaciones públicas, publicidad y cine.' }
    ],
    strengths: ['Inteligencia verbal y comunicación persuasiva', 'Liderazgo, empatía y negociación', 'Pensamiento crítico frente a la realidad social', 'Habilidad para la mediación y gestión humana']
  }
};

const OPTIONS = [
  { label: 'Muy identificado / Me apasiona', points: 4, desc: 'Es una actividad que disfruto mucho y me veo ejerciéndola a futuro.' },
  { label: 'Me interesa bastante', points: 3, desc: 'Me llama la atención y tengo facilidad o gusto por el tema.' },
  { label: 'Me resulta neutral / Indiferente', points: 2, desc: 'Ni me entusiasma ni me disgusta; punto intermedio.' },
  { label: 'Poco identificado / No me interesa', points: 1, desc: 'No tengo interés en esta área ni me atrae como profesión.' }
];

export const VocationalTestModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOptPoints, setSelectedOptPoints] = useState(null);
  const contentRef = useRef(null);

  const handleStartPreparation = (areaKey, careerName) => {
    try {
      localStorage.setItem('unsa_target_area', areaKey);
      if (careerName) localStorage.setItem('unsa_target_career', careerName);
      localStorage.setItem('unsa_vocational_completed', 'true');
    } catch (e) {
      console.error(e);
    }
    if (onClose) onClose();
    navigate('/aprender');
  };

  const currentQ = VOCATIONAL_QUESTIONS[currentStep] || VOCATIONAL_QUESTIONS[0];
  const totalQuestions = VOCATIONAL_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectAnswer = (points) => {
    setSelectedOptPoints(points);
    const updated = { ...answers, [currentQ.id]: { points, area: currentQ.area } };
    setAnswers(updated);

    setTimeout(() => {
      setSelectedOptPoints(null);
      if (currentStep < totalQuestions - 1) {
        setCurrentStep(prev => prev + 1);
        if (contentRef.current) {
          contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        setIsFinished(true);
        if (contentRef.current) {
          contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }, 180);
  };

  const handleNextStep = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(prev => prev + 1);
      if (contentRef.current) {
        contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (answeredCount === totalQuestions) {
      setIsFinished(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      if (contentRef.current) {
        contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsFinished(false);
    setSelectedOptPoints(null);
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Cálculo de Resultados
  const results = useMemo(() => {
    if (!isFinished) return null;

    const scores = { ingenierias: 0, biomedicas: 0, sociales: 0 };
    const counts = { ingenierias: 0, biomedicas: 0, sociales: 0 };

    VOCATIONAL_QUESTIONS.forEach(q => {
      counts[q.area] += 4; // Max score per question is 4
      if (answers[q.id]) {
        scores[q.area] += answers[q.id].points;
      }
    });

    const percentages = {
      ingenierias: Math.round((scores.ingenierias / counts.ingenierias) * 100) || 0,
      biomedicas: Math.round((scores.biomedicas / counts.biomedicas) * 100) || 0,
      sociales: Math.round((scores.sociales / counts.sociales) * 100) || 0
    };

    const sortedAreas = Object.keys(percentages).sort((a, b) => percentages[b] - percentages[a]);
    const topAreaKey = sortedAreas[0];
    const topAreaData = UNSA_CAREERS_MAP[topAreaKey];

    return {
      percentages,
      sortedAreas,
      topAreaKey,
      topAreaData
    };
  }, [isFinished, answers]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.78)',
        backdropFilter: 'blur(8px)'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '820px',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '92vh',
          backgroundColor: 'var(--modal-bg, #FFFFFF)',
          border: '1px solid var(--card-border, rgba(13, 148, 136, 0.3))',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.55)'
        }}
      >
        {/* Header del Modal */}
        <div style={{
          padding: 'clamp(14px, 3vw, 20px) clamp(16px, 3.5vw, 24px)',
          background: 'linear-gradient(135deg, #0F766E 0%, #0D9488 50%, #0284C7 100%)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            <div style={{ padding: '9px', background: 'rgba(255, 255, 255, 0.18)', borderRadius: '14px', flexShrink: 0 }}>
              <Compass size={22} color="#FFFFFF" />
            </div>
            <div style={{ minWidth: 0 }}>
              <h3 style={{ margin: 0, fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)', fontWeight: 900, lineHeight: 1.2 }}>
                Test Vocacional Universitario Oficial
              </h3>
              <p style={{ margin: '3px 0 0', fontSize: 'clamp(0.74rem, 1.8vw, 0.82rem)', color: '#CCFBF1', lineHeight: 1.3 }}>
                Descubre tu área vocacional y carreras universitarias recomendadas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar test vocacional"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.18)',
              border: 'none',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'background 0.15s ease'
            }}
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Contenido Principal con Auto-Scroll */}
        <div ref={contentRef} style={{ padding: 'clamp(14px, 3.5vw, 24px)', overflowY: 'auto', flex: 1 }}>
          {!isFinished ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Barra de Progreso */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary, #64748B)', marginBottom: '8px' }}>
                  <span>Pregunta {currentStep + 1} de {totalQuestions}</span>
                  <span style={{ color: '#0D9488', fontWeight: 900 }}>{progressPercent}% respondido</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(0, 0, 0, 0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      height: '100%', 
                      width: `${Math.max(5, progressPercent)}%`, 
                      background: 'linear-gradient(90deg, #0D9488, #10B981)', 
                      borderRadius: '99px',
                      transition: 'width 0.3s ease'
                    }} 
                  />
                </div>
              </div>

              {/* Contenedor Animado de la Pregunta y Opciones */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                >
                  {/* Tarjeta de la Pregunta */}
                  <div 
                    style={{
                      padding: 'clamp(16px, 3.5vw, 24px)',
                      borderRadius: '20px',
                      border: `2px solid ${currentQ.badgeColor}33`,
                      background: 'var(--card-bg, #F8FAFC)',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span 
                        style={{
                          padding: '4px 12px',
                          borderRadius: '8px',
                          fontSize: '0.72rem',
                          fontWeight: 900,
                          textTransform: 'uppercase',
                          color: '#FFFFFF',
                          backgroundColor: currentQ.badgeColor
                        }}
                      >
                        {currentQ.category}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #64748B)', fontWeight: 600 }}>
                        Pregunta #{currentQ.id}
                      </span>
                    </div>

                    <h4 style={{ margin: 0, fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)', fontWeight: 800, color: 'var(--text-main, #0F172A)', lineHeight: 1.45 }}>
                      {currentQ.question}
                    </h4>
                  </div>

                  {/* Opciones de Selección Adaptadas */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '10px' }}>
                    {OPTIONS.map((opt, i) => {
                      const isSaved = answers[currentQ.id]?.points === opt.points;
                      const isTapped = selectedOptPoints === opt.points;
                      const isSelected = isSaved || isTapped;

                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSelectAnswer(opt.points)}
                          style={{
                            padding: '14px 16px',
                            borderRadius: '16px',
                            border: isSelected ? '2px solid #0D9488' : '1px solid var(--card-border, rgba(0,0,0,0.1))',
                            background: isSelected ? 'rgba(13, 148, 136, 0.14)' : 'var(--card-bg, #FFFFFF)',
                            transform: isTapped ? 'scale(0.98)' : 'scale(1)',
                            textAlign: 'left',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            transition: 'all 0.15s ease',
                            boxShadow: isSelected ? '0 4px 12px rgba(13, 148, 136, 0.2)' : '0 2px 6px rgba(0,0,0,0.02)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 800, fontSize: '0.88rem', color: isSelected ? '#0D9488' : 'var(--text-main, #0F172A)' }}>
                              {opt.label}
                            </span>
                            {isSelected && <Check size={18} color="#0D9488" style={{ fontWeight: 900 }} />}
                          </div>
                          <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary, #64748B)', fontWeight: 500, lineHeight: 1.35 }}>
                            {opt.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Botones de Navegación */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px' }}>
                <button
                  type="button"
                  disabled={currentStep === 0}
                  onClick={handlePrevStep}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '12px',
                    border: '1px solid var(--card-border, rgba(0,0,0,0.15))',
                    background: 'var(--card-bg, #FFFFFF)',
                    color: 'var(--text-main, #0F172A)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                    opacity: currentStep === 0 ? 0.35 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <ChevronLeft size={16} /> Anterior
                </button>

                {answers[currentQ.id] && currentStep < totalQuestions - 1 && (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '12px',
                      border: 'none',
                      background: '#0D9488',
                      color: '#FFFFFF',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    Siguiente <ChevronRight size={16} />
                  </button>
                )}
              </div>

            </div>
          ) : (
            /* =========================================================
               INFORME PSICOMÉTRICO VOCACIONAL OFICIAL UNSA
               ========================================================= */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              
              {/* Tarjeta de Arquetipo Vocacional Ganador */}
              <div 
                style={{
                  padding: 'clamp(20px, 4vw, 28px)',
                  borderRadius: '24px',
                  border: `2px solid ${results.topAreaData.borderColor}`,
                  background: results.topAreaData.bgColor,
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '18px',
                      background: '#FFFFFF',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Brain size={30} color={results.topAreaData.color} />
                    </div>
                    <div>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '3px 10px',
                        borderRadius: '999px',
                        fontSize: '0.72rem',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: results.topAreaData.color,
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: `1px solid ${results.topAreaData.color}33`,
                        marginBottom: '4px'
                      }}>
                        <Sparkles size={12} /> Diagnóstico Vocacional Oficial
                      </span>
                      <h3 style={{ margin: 0, fontSize: 'clamp(1.25rem, 3vw, 1.65rem)', fontWeight: 900, color: 'var(--text-main, #0F172A)', lineHeight: 1.25 }}>
                        {results.topAreaData.archetype?.title || results.topAreaData.name}
                      </h3>
                    </div>
                  </div>

                  <div style={{
                    padding: '8px 14px',
                    borderRadius: '14px',
                    background: '#FFFFFF',
                    border: `1px solid ${results.topAreaData.color}33`,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                    textAlign: 'right'
                  }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-secondary, #64748B)', textTransform: 'uppercase' }}>
                      Afinidad Dominante
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: results.topAreaData.color, lineHeight: 1.1 }}>
                      {results.percentages[results.topAreaKey]}%
                    </div>
                  </div>
                </div>

                <div style={{
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  color: results.topAreaData.color,
                  letterSpacing: '0.02em'
                }}>
                  {results.topAreaData.archetype?.subtitle}
                </div>

                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary, #475569)', lineHeight: 1.55 }}>
                  {results.topAreaData.archetype?.description || results.topAreaData.description}
                </p>

                {/* Botón CTA Primario en la cabecera del arquetipo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '6px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => handleStartPreparation(results.topAreaKey, results.topAreaData.podium?.[0]?.name)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 22px',
                      borderRadius: '14px',
                      border: 'none',
                      background: `linear-gradient(135deg, ${results.topAreaData.color} 0%, #0284C7 100%)`,
                      color: '#FFFFFF',
                      fontSize: '0.88rem',
                      fontWeight: 900,
                      cursor: 'pointer',
                      boxShadow: `0 4px 16px ${results.topAreaData.color}44`,
                      transition: 'transform 0.15s ease'
                    }}
                  >
                    <GraduationCap size={18} />
                    <span>Empezar mi Ruta para esta Carrera en RASTRO</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* PODIO DE HONOR: TOP 3 CARRERAS RECOMENDADAS UNSA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 900, color: 'var(--text-main, #0F172A)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Trophy size={18} color="#EAB308" />
                      <span>Podio Oficial de Carreras Recomendadas</span>
                    </h4>
                    <p style={{ margin: '3px 0 0', fontSize: '0.76rem', color: 'var(--text-secondary, #64748B)' }}>
                      Basado en tu perfil de respuestas, ponderación temática y puntajes de corte oficiales
                    </p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '12px' }}>
                  {(results.topAreaData.podium || []).map((car) => {
                    const isFirst = car.rank === 1;
                    return (
                      <div
                        key={car.rank}
                        style={{
                          padding: '18px 16px',
                          borderRadius: '20px',
                          border: isFirst ? `2px solid ${results.topAreaData.color}` : '1px solid var(--card-border, rgba(0,0,0,0.1))',
                          background: isFirst ? 'rgba(255, 255, 255, 0.98)' : 'var(--card-bg, #FFFFFF)',
                          boxShadow: isFirst ? `0 8px 24px ${results.topAreaData.color}22` : '0 2px 8px rgba(0,0,0,0.03)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: '12px',
                          position: 'relative'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{
                              fontSize: '0.82rem',
                              fontWeight: 900,
                              padding: '3px 10px',
                              borderRadius: '999px',
                              background: isFirst ? `${results.topAreaData.color}18` : 'rgba(0,0,0,0.06)',
                              color: isFirst ? results.topAreaData.color : 'var(--text-secondary, #64748B)'
                            }}>
                              {car.medal}
                            </span>
                            <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <CheckCircle2 size={13} /> {car.match} Match
                            </span>
                          </div>

                          <h5 style={{ margin: '0 0 6px', fontSize: '1rem', fontWeight: 900, color: 'var(--text-main, #0F172A)', lineHeight: 1.25 }}>
                            {car.name}
                          </h5>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                            <span style={{
                              fontSize: '0.68rem',
                              fontWeight: 800,
                              padding: '2px 8px',
                              borderRadius: '6px',
                              background: 'rgba(245, 158, 11, 0.12)',
                              color: '#B45309'
                            }}>
                              Puntaje ref: {car.cutScore}
                            </span>
                            <span style={{
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              color: 'var(--text-secondary, #64748B)'
                            }}>
                              {car.tag}
                            </span>
                          </div>

                          <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary, #64748B)', lineHeight: 1.45 }}>
                            {car.desc}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleStartPreparation(results.topAreaKey, car.name)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '12px',
                            border: isFirst ? 'none' : '1px solid var(--card-border, rgba(0,0,0,0.15))',
                            background: isFirst ? results.topAreaData.color : 'transparent',
                            color: isFirst ? '#FFFFFF' : 'var(--text-main, #0F172A)',
                            fontWeight: 800,
                            fontSize: '0.78rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <span>Elegir {car.name.split(' ')[0]}</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* DIAGNÓSTICO PSICOMÉTRICO DE APTITUDES */}
              <div style={{
                padding: '20px',
                borderRadius: '20px',
                background: 'var(--card-bg, #FFFFFF)',
                border: '1px solid var(--card-border, rgba(0,0,0,0.1))',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp size={18} color="var(--accent-color, #007AFF)" />
                  <span style={{ fontWeight: 900, fontSize: '0.92rem', color: 'var(--text-main, #0F172A)' }}>
                    Diagnóstico de Aptitudes & Competencias Vocacionales:
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '14px' }}>
                  {(results.topAreaData.aptitudes || []).map((apt, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                        <span style={{ fontWeight: 800, color: 'var(--text-main, #0F172A)' }}>{apt.name}</span>
                        <span style={{ fontWeight: 900, color: results.topAreaData.color }}>{apt.grade} ({apt.level})</span>
                      </div>
                      <div style={{ width: '100%', height: '7px', backgroundColor: 'rgba(0,0,0,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                        <div style={{ width: apt.level, height: '100%', backgroundColor: results.topAreaData.color, borderRadius: '99px' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PLAN ESTRATÉGICO DE PREPARACIÓN UNSA */}
              {results.topAreaData.strategyPlan && (
                <div style={{
                  padding: '20px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.05) 0%, rgba(13, 148, 136, 0.05) 100%)',
                  border: '1.5px solid rgba(0, 122, 255, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Target size={18} color="#007AFF" />
                    <div>
                      <span style={{ fontWeight: 900, fontSize: '0.92rem', color: 'var(--text-main, #0F172A)', display: 'block' }}>
                        {results.topAreaData.strategyPlan.focus}
                      </span>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary, #64748B)' }}>
                        Estrategia para maximizar puntaje en el temario y examen de admisión
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '10px', marginTop: '4px' }}>
                    {results.topAreaData.strategyPlan.courses.map((crs, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '12px 14px',
                          borderRadius: '14px',
                          background: 'var(--card-bg, #FFFFFF)',
                          border: '1px solid rgba(0, 122, 255, 0.15)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 800, fontSize: '0.84rem', color: 'var(--text-main, #0F172A)' }}>
                            {crs.name}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.70rem', color: '#007AFF', fontWeight: 800 }}>
                          {crs.weight}
                        </span>
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary, #64748B)', lineHeight: 1.35, marginTop: '2px' }}>
                          {crs.tip}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* COMPARATIVA DE COMPATIBILIDAD CON LAS 3 ÁREAS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main, #0F172A)' }}>
                  Compatibilidad General por Áreas de Admisión:
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '10px' }}>
                  {results.sortedAreas.map((areaKey) => {
                    const areaInfo = UNSA_CAREERS_MAP[areaKey];
                    const percent = results.percentages[areaKey];
                    const isWinner = areaKey === results.topAreaKey;

                    return (
                      <div
                        key={areaKey}
                        style={{
                          padding: '14px 16px',
                          borderRadius: '16px',
                          border: isWinner ? `2px solid ${areaInfo.color}` : '1px solid var(--card-border, rgba(0,0,0,0.08))',
                          background: isWinner ? `${areaInfo.color}0D` : 'var(--card-bg, #FFFFFF)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--text-main, #0F172A)' }}>
                            {areaInfo.name.split(' (')[0]}
                          </span>
                          <span style={{ fontWeight: 900, fontSize: '1.05rem', color: areaInfo.color }}>
                            {percent}%
                          </span>
                        </div>

                        <div style={{ width: '100%', height: '7px', backgroundColor: 'rgba(0,0,0,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                          <div style={{ width: `${percent}%`, height: '100%', backgroundColor: areaInfo.color, borderRadius: '99px' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Botón de Reiniciar */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', paddingTop: '6px' }}>
                <button
                  type="button"
                  onClick={handleRestart}
                  style={{
                    padding: '11px 22px',
                    borderRadius: '14px',
                    border: '1px solid var(--card-border, rgba(0,0,0,0.2))',
                    background: 'var(--card-bg, #FFFFFF)',
                    color: 'var(--text-main, #0F172A)',
                    fontSize: '0.84rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <RotateCcw size={15} /> Volver a realizar la Evaluación
                </button>
              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 24px', borderTop: '1px solid var(--card-border, rgba(0,0,0,0.1))', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg, #F8FAFC)' }}>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary, #64748B)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Compass size={14} color="#0D9488" />
            <span>Módulo de Orientación Vocacional Oficial • Admisión Universitaria</span>
          </span>
          <button
            onClick={onClose}
            style={{
              padding: '8px 18px',
              borderRadius: '10px',
              background: '#0F172A',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.82rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Cerrar
          </button>
        </div>

      </motion.div>
    </div>
  );
};
