import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, CheckCircle2, ChevronRight, ChevronLeft, RotateCcw, Award, BookOpen, Brain, Heart, Zap, Target, Star, Download, Share2, Check } from 'lucide-react';

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
const UNSA_CAREERS_MAP = {
  biomedicas: {
    name: 'Ciencias Biomédicas (Área I)',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: '#10B981',
    description: 'Enfocada en el estudio de la vida, salud humana y animal, biotecnología, farmacia y preservación del bienestar integral.',
    topCareers: [
      { name: 'Medicina Humana', desc: 'Diagnóstico, tratamiento médico integral y cirugía.' },
      { name: 'Enfermería', desc: 'Atención integral del paciente, cuidados críticos y salud comunitaria.' },
      { name: 'Farmacia y Bioquímica', desc: 'Formulación de fármacos, toxicología y análisis clínico.' },
      { name: 'Biología', desc: 'Genética, ecología, microbiología y biotecnología molecular.' },
      { name: 'Nutrición', desc: 'Dietoterapia, bioquímica nutricional y salud pública.' },
      { name: 'Odontología', desc: 'Salud bucal, ortodoncia, rehabilitación oral y cirugía maxilofacial.' },
      { name: 'Agronomía / Pesquera', desc: 'Producción agroalimentaria y recursos biológicos sostenibles.' }
    ],
    strengths: ['Alta vocación de servicio humano', 'Pensamiento analítico en ciencias biológicas y químicas', 'Capacidad de respuesta bajo presión', 'Empatía y ética médica']
  },
  ingenierias: {
    name: 'Ingenierías y Ciencias Exactas (Área II)',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: '#3B82F6',
    description: 'Orientada a la resolución de problemas tecnológicos, infraestructura física, ciencias de la computación, minería e innovación industrial.',
    topCareers: [
      { name: 'Ingeniería de Sistemas', desc: 'Software, arquitecturas cloud, ciberseguridad y bases de datos.' },
      { name: 'Ingeniería de Software / IA', desc: 'Desarrollo de aplicaciones, algoritmos e inteligencia artificial.' },
      { name: 'Ingeniería Civil', desc: 'Infraestructura, diseño sismorresistente, puentes e hidráulica.' },
      { name: 'Ingeniería Industrial', desc: 'Optimización de procesos, cadena de suministro y gerencia.' },
      { name: 'Ingeniería Mecánica / Eléctrica', desc: 'Sistemas térmicos, redes de potencia y automatización.' },
      { name: 'Ingeniería de Minas / Metalúrgica', desc: 'Extracción responsable, procesamiento mineral y geotecnia.' },
      { name: 'Ingeniería Química', desc: 'Plantas de transformación química, refinación y síntesis.' },
      { name: 'Arquitectura', desc: 'Diseño espacial, urbanismo y planificación del hábitat humano.' }
    ],
    strengths: ['Razonamiento lógico-matemático y espacial', 'Resolución sistemática de problemas complejos', 'Afinidad por la programación y hardware', 'Capacidad de modelamiento y abstracción']
  },
  sociales: {
    name: 'Ciencias Sociales y Humanidades (Área III)',
    color: '#EC4899',
    bgColor: 'rgba(236, 72, 153, 0.1)',
    borderColor: '#EC4899',
    description: 'Dedicada al estudio de la sociedad, las instituciones, la economía, el marco jurídico, el comportamiento individual y la cultura.',
    topCareers: [
      { name: 'Derecho', desc: 'Legislación, defensa procesal, litigio y asesoría jurídica corporativa.' },
      { name: 'Psicología', desc: 'Evaluación psicoterapéutica, psicología clínica, social y organizacional.' },
      { name: 'Administración', desc: 'Dirección estratégica, negocios internacionales y liderazgo corporativo.' },
      { name: 'Contabilidad', desc: 'Auditoría financiera, gestión tributaria y peritaje contable.' },
      { name: 'Economía', desc: 'Análisis macroeconómico, econometría y evaluación de proyectos de inversión.' },
      { name: 'Ciencias de la Comunicación', desc: 'Periodismo multimedia, relaciones públicas, publicidad y cine.' },
      { name: 'Educación', desc: 'Pedagogía didáctica, docencia especializada y gestión educativa.' },
      { name: 'Artes / Historia / Sociología', desc: 'Creación artística, preservación cultural e investigación histórica.' }
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
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOptPoints, setSelectedOptPoints] = useState(null);
  const contentRef = useRef(null);

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
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #0F766E 0%, #0D9488 50%, #0284C7 100%)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', background: 'rgba(255, 255, 255, 0.18)', borderRadius: '14px' }}>
              <Compass size={24} color="#FFFFFF" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900 }}>Test Vocacional Oficial UNSA</h3>
              <p style={{ margin: '2px 0 0', fontSize: '0.82rem', color: '#CCFBF1' }}>
                Descubre tu área vocacional y carreras recomendadas en la Universidad Nacional de San Agustín
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '8px 14px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              color: '#FFFFFF',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        {/* Contenido Principal con Auto-Scroll */}
        <div ref={contentRef} style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {!isFinished ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
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
                  style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                >
                  {/* Tarjeta de la Pregunta */}
                  <div 
                    style={{
                      padding: '24px',
                      borderRadius: '20px',
                      border: `2px solid ${currentQ.badgeColor}33`,
                      background: 'var(--card-bg, #F8FAFC)',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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

                    <h4 style={{ margin: 0, fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', fontWeight: 800, color: 'var(--text-main, #0F172A)', lineHeight: 1.45 }}>
                      {currentQ.question}
                    </h4>
                  </div>

                  {/* Opciones de Selección */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
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
                            padding: '16px 18px',
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
                            <span style={{ fontWeight: 800, fontSize: '0.9rem', color: isSelected ? '#0D9488' : 'var(--text-main, #0F172A)' }}>
                              {opt.label}
                            </span>
                            {isSelected && <Check size={18} color="#0D9488" style={{ fontWeight: 900 }} />}
                          </div>
                          <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary, #64748B)', fontWeight: 500 }}>
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
            /* Vista de Resultados */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Tarjeta de Ganador */}
              <div 
                style={{
                  padding: '28px',
                  borderRadius: '24px',
                  border: `2px solid ${results.topAreaData.borderColor}`,
                  background: results.topAreaData.bgColor,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{ padding: '14px', borderRadius: '99px', background: '#FFFFFF', boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}>
                  <Award size={36} color={results.topAreaData.color} />
                </div>
                <div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', color: results.topAreaData.color }}>
                    Área de Mayor Compatibilidad UNSA
                  </span>
                  <h3 style={{ margin: '4px 0 0', fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 900, color: 'var(--text-main, #0F172A)' }}>
                    {results.topAreaData.name}
                  </h3>
                  <p style={{ margin: '8px auto 0', maxWidth: '600px', fontSize: '0.88rem', color: 'var(--text-secondary, #475569)', lineHeight: 1.5 }}>
                    {results.topAreaData.description}
                  </p>
                </div>
              </div>

              {/* Porcentajes por Área */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main, #0F172A)' }}>
                  Compatibilidad con las 3 Áreas de Admisión UNSA:
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  {results.sortedAreas.map((areaKey) => {
                    const areaInfo = UNSA_CAREERS_MAP[areaKey];
                    const percent = results.percentages[areaKey];

                    return (
                      <div
                        key={areaKey}
                        style={{
                          padding: '16px',
                          borderRadius: '16px',
                          border: `1px solid ${areaInfo.color}33`,
                          background: 'var(--card-bg, #FFFFFF)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-main, #0F172A)' }}>
                            {areaInfo.name.split(' (')[0]}
                          </span>
                          <span style={{ fontWeight: 900, fontSize: '1.1rem', color: areaInfo.color }}>
                            {percent}%
                          </span>
                        </div>

                        <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(0,0,0,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                          <div style={{ width: `${percent}%`, height: '100%', backgroundColor: areaInfo.color, borderRadius: '99px' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Carreras Sugeridas en la UNSA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main, #0F172A)' }}>
                  Carreras Profesionales Recomendadas en la UNSA:
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '10px' }}>
                  {results.topAreaData.topCareers.map((car, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '14px',
                        borderRadius: '14px',
                        border: '1px solid var(--card-border, rgba(0,0,0,0.08))',
                        background: 'var(--card-bg, #FFFFFF)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px'
                      }}
                    >
                      <div style={{ 
                        width: '32px', 
                        height: '32px', 
                        borderRadius: '8px', 
                        backgroundColor: `${results.topAreaData.color}18`, 
                        color: results.topAreaData.color, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        flexShrink: 0,
                        fontWeight: 900,
                        fontSize: '0.75rem'
                      }}>
                        #{idx + 1}
                      </div>
                      <div>
                        <span style={{ fontWeight: 800, fontSize: '0.86rem', color: 'var(--text-main, #0F172A)', display: 'block' }}>
                          {car.name}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary, #64748B)', fontWeight: 500, lineHeight: 1.35, display: 'block', marginTop: '2px' }}>
                          {car.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fortalezas Clave */}
              <div style={{ padding: '16px 20px', borderRadius: '16px', background: 'var(--card-bg, #F8FAFC)', border: '1px solid var(--card-border, rgba(0,0,0,0.1))' }}>
                <span style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--text-main, #0F172A)', display: 'block', marginBottom: '8px' }}>
                  Rasgos y Habilidades Clave de tu Perfil:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {results.topAreaData.strengths.map((str, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '99px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        backgroundColor: results.topAreaData.bgColor,
                        color: results.topAreaData.color,
                        border: `1px solid ${results.topAreaData.color}40`
                      }}
                    >
                      ✓ {str}
                    </span>
                  ))}
                </div>
              </div>

              {/* Botón de Reiniciar */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', paddingTop: '8px' }}>
                <button
                  type="button"
                  onClick={handleRestart}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '14px',
                    border: '1px solid var(--card-border, rgba(0,0,0,0.2))',
                    background: 'var(--card-bg, #FFFFFF)',
                    color: 'var(--text-main, #0F172A)',
                    fontSize: '0.86rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <RotateCcw size={16} /> Volver a realizar el Test
                </button>
              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 24px', borderTop: '1px solid var(--card-border, rgba(0,0,0,0.1))', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg, #F8FAFC)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #64748B)' }}>
            🧭 Módulo de Orientación Vocacional • CEPREUNSA 2027
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
