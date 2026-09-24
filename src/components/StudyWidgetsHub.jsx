import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  Clock, 
  Calendar, 
  ArrowRight, 
  ChevronDown, 
  Sparkles, 
  ShieldCheck, 
  Zap,
  Target,
  Trophy
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useGamification } from '../context/GamificationContext';
import { MiRachaModal } from './MiRachaModal';
import { OrsttyMascot } from './Mascots';
import { DuolingoFlameIcon } from './DuolingoFlameIcon';

// CRONOGRAMA OFICIAL DE ADMISIÓN UNSA 2026-2027
export const EXAM_SCHEDULE = [
  {
    id: 'ceprunsa_1',
    name: 'CEPREUNSA I FASE',
    subtitle: 'Evaluación de Conocimientos',
    targetDate: '2026-07-05T08:00:00',
    tagColor: '#10B981',
    tagBg: 'rgba(16, 185, 129, 0.12)',
    badge: 'Oficial'
  },
  {
    id: 'ordinario_1',
    name: 'ORDINARIO I FASE',
    subtitle: 'Evaluación General',
    targetDate: '2026-08-09T08:00:00',
    tagColor: '#3B82F6',
    tagBg: 'rgba(59, 130, 246, 0.12)',
    badge: 'UNSA'
  },
  {
    id: 'quintos',
    name: 'CICLO QUINTOS',
    subtitle: 'Examen de Escolares',
    targetDate: '2026-11-01T08:00:00',
    tagColor: '#F59E0B',
    tagBg: 'rgba(245, 158, 11, 0.12)',
    badge: 'Escolares'
  },
  {
    id: 'ceprunsa_2',
    name: 'CEPREUNSA II FASE',
    subtitle: 'Evaluación de Conocimientos',
    targetDate: '2027-01-24T08:00:00',
    tagColor: '#8B5CF6',
    tagBg: 'rgba(139, 92, 246, 0.12)',
    badge: 'Fase II'
  },
  {
    id: 'ordinario_2',
    name: 'ORDINARIO II FASE',
    subtitle: 'Admisión General UNSA',
    targetDate: '2027-03-14T08:00:00',
    tagColor: '#EC4899',
    tagBg: 'rgba(236, 72, 153, 0.12)',
    badge: 'General'
  }
];

/**
 * MascotVector: Mascota Vectorial 100% Libre de Derechos (SVG Puro + Framer Motion)
 * Diseñada exclusivamente para RASTRO como acompañante de estudio.
 */
export const MascotVector = ({ mood = 'happy', size = 56, slow = true }) => {
  return (
    <motion.div
      animate={{
        y: slow ? [0, -2, 0] : (mood === 'cheering' ? [0, -3, 0, -1.5, 0] : [0, -2, 0]),
        rotate: slow ? [0, -0.8, 0.8, 0] : (mood === 'cheering' ? [0, -1.5, 1.5, 0] : [0, -1, 1, 0])
      }}
      transition={{
        duration: slow ? 5.5 : 4.0,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 4px 10px rgba(139, 92, 246, 0.35))' }}
      >
        {/* Cuerpo / Orejitas de búho/gatito espacial */}
        <path
          d="M20 40 C20 22, 32 15, 40 25 C45 20, 55 20, 60 25 C68 15, 80 22, 80 40 C85 60, 80 82, 50 85 C20 82, 15 60, 20 40 Z"
          fill="url(#mascotGrad)"
        />

        {/* Pancita luminosa */}
        <ellipse cx="50" cy="58" rx="20" ry="18" fill="rgba(255, 255, 255, 0.22)" />

        {/* Ojos grandes expresivos */}
        <ellipse cx="38" cy="42" rx="7" ry="8" fill="#0F172A" />
        <ellipse cx="62" cy="42" rx="7" ry="8" fill="#0F172A" />

        {/* Brillos oculares */}
        <circle cx="36" cy="39" r="2.5" fill="#FFFFFF" />
        <circle cx="60" cy="39" r="2.5" fill="#FFFFFF" />
        <circle cx="40" cy="45" r="1.2" fill="#FFFFFF" />
        <circle cx="64" cy="45" r="1.2" fill="#FFFFFF" />

        {/* Mejillas sonrosadas */}
        <circle cx="30" cy="50" r="4" fill="#F43F5E" opacity="0.6" />
        <circle cx="70" cy="50" r="4" fill="#F43F5E" opacity="0.6" />

        {/* Biquito / Boquita */}
        {mood === 'cheering' ? (
          <path d="M46 48 Q50 54 54 48 Z" fill="#F59E0B" />
        ) : (
          <path d="M47 48 Q50 51 53 48" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        )}

        {/* Estrellita / Birrete de estudio */}
        <path
          d="M50 14 L53 22 L61 22 L55 27 L57 35 L50 30 L43 35 L45 27 L39 22 L47 22 Z"
          fill="#FDE047"
          stroke="#EAB308"
          strokeWidth="1"
        />

        {/* Gradiente oficial */}
        <defs>
          <linearGradient id="mascotGrad" x1="20" y1="20" x2="80" y2="85" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B5CF6" />
            <stop offset="0.5" stopColor="#6366F1" />
            <stop offset="1" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export const StudyWidgetsHub = () => {
  const navigate = useNavigate();
  const { streak = 1, streakFreeze = 1 } = useGamification();

  // Encontrar automáticamente el examen más próximo con fecha futura
  const now = Date.now();
  const futureExams = EXAM_SCHEDULE.filter(e => new Date(e.targetDate).getTime() > now);
  const defaultExam = futureExams.length > 0 ? futureExams[0] : EXAM_SCHEDULE[EXAM_SCHEDULE.length - 1];

  const [selectedExamId, setSelectedExamId] = useState(defaultExam.id);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);

  // Countdown timer calculations
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const activeExam = EXAM_SCHEDULE.find(e => e.id === selectedExamId) || EXAM_SCHEDULE[0];

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(activeExam.targetDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [activeExam.targetDate]);

  return (
    <div style={{ maxWidth: '1200px', margin: '20px auto 0', padding: '0 24px', boxSizing: 'border-box' }}>
      
      {/* Encabezado del Hub de Widgets */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ padding: '6px 10px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.12)', color: '#6366F1', fontWeight: 900, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={14} /> WIDGETS DE ESTUDIO
          </div>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary, #64748B)' }}>
            Herramientas activas para tu preparación
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsStreakModalOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            color: '#F97316',
            fontSize: '0.8rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span>Ver Detalles de Racha</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Grid de Widgets (Contador + Racha Diaria) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        
        {/* WIDGET 1: CONTADOR REGRESIVO OFICIAL DE EXAMEN */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: 'var(--card-bg, #FFFFFF)',
            border: '1.5px solid var(--card-border, rgba(0, 0, 0, 0.08))',
            borderRadius: '24px',
            padding: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Fondo sutil decorativo */}
          <div
            style={{
              position: 'absolute',
              top: '-30px',
              right: '-30px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${activeExam.tagColor}22 0%, transparent 70%)`,
              pointerEvents: 'none'
            }}
          />

          {/* Selector de Examen y Cabecera del Widget */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '14px', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: `${activeExam.tagColor}18`,
                  color: activeExam.tagColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Clock size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary, #64748B)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Cuenta Regresiva
                </span>
                <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 900, color: 'var(--text-main, #0F172A)' }}>
                  {activeExam.name}
                </h3>
              </div>
            </div>

            {/* Dropdown Selector de Exámenes */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 10px',
                  borderRadius: '10px',
                  border: '1px solid var(--card-border, rgba(0, 0, 0, 0.1))',
                  background: 'var(--bg-main, #F8FAFC)',
                  color: 'var(--text-main, #0F172A)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                <span>Cambiar</span>
                <ChevronDown size={14} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 4, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '100%',
                      zIndex: 50,
                      background: 'var(--card-bg, #FFFFFF)',
                      border: '1px solid var(--card-border, rgba(0, 0, 0, 0.12))',
                      borderRadius: '14px',
                      padding: '6px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                      minWidth: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    {EXAM_SCHEDULE.filter(exam => new Date(exam.targetDate).getTime() > Date.now()).map(exam => (
                      <button
                        key={exam.id}
                        type="button"
                        onClick={() => {
                          setSelectedExamId(exam.id);
                          setIsDropdownOpen(false);
                        }}
                        style={{
                          padding: '8px 10px',
                          borderRadius: '8px',
                          border: 'none',
                          background: selectedExamId === exam.id ? `${exam.tagColor}18` : 'transparent',
                          color: selectedExamId === exam.id ? exam.tagColor : 'var(--text-main, #0F172A)',
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <span>{exam.name}</span>
                        <span style={{ fontSize: '0.65rem', opacity: 0.8 }}>{exam.badge}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Cuadrículas de Dígitos (Flip Clock Minimalista) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', margin: '8px 0 16px' }}>
            {[
              { val: timeLeft.days, label: 'DÍAS' },
              { val: timeLeft.hours, label: 'HORAS' },
              { val: timeLeft.minutes, label: 'MIN' },
              { val: timeLeft.seconds, label: 'SEG' }
            ].map((unit, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-main, #F1F5F9)',
                  border: '1px solid var(--card-border, rgba(0, 0, 0, 0.06))',
                  borderRadius: '14px',
                  padding: '10px 4px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                    fontWeight: 900,
                    color: 'var(--text-main, #0F172A)',
                    lineHeight: 1
                  }}
                >
                  {String(unit.val).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    color: 'var(--text-secondary, #64748B)',
                    marginTop: '4px',
                    letterSpacing: '0.05em'
                  }}
                >
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Pie del Widget de Examen */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--card-border, rgba(0, 0, 0, 0.06))' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-secondary, #64748B)', fontWeight: 600 }}>
              <Calendar size={14} color={activeExam.tagColor} />
              <span>Fecha: {new Date(activeExam.targetDate).toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>

            <Link
              to="/aprender"
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: activeExam.tagColor,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>Practicar fijas</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </motion.div>

        {/* WIDGET 2: RACHA DE ESTUDIO DIARIA ("MI RACHA") */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(239, 68, 68, 0.08) 100%)',
            border: '1.5px solid rgba(249, 115, 22, 0.3)',
            borderRadius: '24px',
            padding: '20px',
            boxShadow: '0 10px 30px rgba(249, 115, 22, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Mascota Oficial ORSTTY en esquina superior con flotación suave y lenta */}
          <div style={{ position: 'absolute', top: '10px', right: '14px', zIndex: 2 }}>
            <OrsttyMascot mood="cheering" size={64} slow={true} />
          </div>

          {/* Cabecera de la Racha */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#EA580C', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                HÁBITO DE ESTUDIO
              </span>
              <span style={{ fontSize: '0.68rem', background: 'rgba(249, 115, 22, 0.2)', color: '#C2410C', padding: '2px 8px', borderRadius: '6px', fontWeight: 800 }}>
                {streakFreeze > 0 ? `🛡️ ${streakFreeze} escudo` : '🔥 Racha activa'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(239, 68, 68, 0.15) 100%)',
                  border: '1.5px solid rgba(249, 115, 22, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(249, 115, 22, 0.15)',
                  flexShrink: 0
                }}
              >
                <DuolingoFlameIcon size={30} active={true} animated={true} />
              </div>

              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-main, #0F172A)' }}>
                  {streak} {streak === 1 ? 'Día de Racha' : 'Días de Racha'}
                </h3>
                <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: 'var(--text-secondary, #64748B)', fontWeight: 600 }}>
                  ¡Completa 1 lección diaria para no perderla!
                </p>
              </div>
            </div>
          </div>

          {/* Barra de progreso de racha semanal */}
          <div style={{ margin: '14px 0 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
              {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => {
                const isCompleted = i < Math.min(7, Math.max(1, streak % 7 || 7));
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      padding: '6px 2px',
                      borderRadius: '8px',
                      textAlign: 'center',
                      background: isCompleted ? '#F97316' : 'rgba(120, 120, 128, 0.12)',
                      color: isCompleted ? '#FFFFFF' : 'var(--text-secondary, #64748B)',
                      fontSize: '0.68rem',
                      fontWeight: 900,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Botón de acción para continuar la racha */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => navigate('/aprender')}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)',
                transition: 'all 0.15s ease'
              }}
            >
              <span>Continuar Racha</span>
              <ArrowRight size={14} />
            </button>

            <button
              type="button"
              onClick={() => setIsStreakModalOpen(true)}
              style={{
                padding: '10px 12px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                color: '#EA580C',
                fontWeight: 800,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Abrir detalles de racha"
            >
              <Trophy size={16} />
            </button>
          </div>
        </motion.div>

      </div>

      {/* Modal Completo de Racha */}
      <MiRachaModal
        isOpen={isStreakModalOpen}
        onClose={() => setIsStreakModalOpen(false)}
      />

    </div>
  );
};

export default StudyWidgetsHub;
