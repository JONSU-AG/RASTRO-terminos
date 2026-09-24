import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown, Clock, Sparkles, ExternalLink, Info, CheckCircle2, ChevronRight, BookOpen, AlertCircle } from 'lucide-react';
import { DEFAULT_ADMISSION_SCHEDULE } from '../data/admissionScheduleData';
import { subscribeToSiteSettings, getCachedSiteSettings } from '../lib/siteSettings';
import { useTheme } from '../context/ThemeContext';
import { syncWidgetsData } from '../lib/widgetSync';

// Tarjeta individual de tiempo con diseño deportivo / marcador de alta legibilidad y optimización Android
const ModernTimeCard = ({ value, label, accentColor = '#38BDF8' }) => {
  const formattedVal = String(value).padStart(2, '0');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: '0', maxWidth: '85px' }}>
      <div 
        style={{
          width: '100%',
          height: '52px',
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #090D16 0%, #172033 100%)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.28), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
        }}
      >
        {/* Glow de fondo dinámico con color del examen */}
        <div 
          style={{
            position: 'absolute',
            inset: '-2px',
            opacity: 0.22,
            filter: 'blur(5px)',
            borderRadius: '14px',
            pointerEvents: 'none',
            background: accentColor
          }}
        />

        <AnimatePresence mode="popLayout">
          <motion.span
            key={formattedVal}
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -5, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
              fontWeight: 900,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              color: '#FFFFFF',
              position: 'relative',
              zIndex: 2,
              letterSpacing: '-0.02em',
              textShadow: `0 0 12px ${accentColor}99`
            }}
          >
            {formattedVal}
          </motion.span>
        </AnimatePresence>

        {/* Indicador de borde superior deportivo */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent)'
        }} />
      </div>

      <span 
        style={{
          marginTop: '5px',
          fontSize: 'clamp(0.62rem, 2vw, 0.72rem)',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: 'var(--text-secondary, #64748B)',
          textAlign: 'center'
        }}
      >
        {label}
      </span>
    </div>
  );
};

// Modal con el cronograma oficial completo y detallado
export const FullScheduleModal = ({ isOpen, onClose, schedule }) => {
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)'
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
          maxWidth: '750px',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
          backgroundColor: 'var(--card-bg, #FFFFFF)',
          border: '1px solid var(--card-border, rgba(0, 122, 255, 0.2))',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Header del Modal */}
        <div style={{
          padding: '18px 22px',
          background: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', background: 'rgba(255, 255, 255, 0.18)', borderRadius: '12px' }}>
              <Calendar size={20} color="#FFFFFF" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', fontWeight: 900 }}>Cronograma Oficial UNSA 2027</h3>
              <p style={{ margin: '2px 0 0', fontSize: '0.75rem', opacity: 0.9 }}>CEPREUNSA, Ordinarios, Quintos, Extraordinario y Filiales</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '6px 12px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.18)',
              border: 'none',
              color: '#FFFFFF',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        {/* Lista de Procesos */}
        <div style={{ padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          {schedule.map((item, idx) => {
            const hasPassed = new Date(item.targetDate || item.evaluacionConocimientos || item.evaluacionPrevia).getTime() < Date.now();

            return (
              <div
                key={item.id || idx}
                style={{
                  padding: '14px 16px',
                  borderRadius: '16px',
                  border: `1px solid ${item.color ? item.color + '40' : 'rgba(0, 122, 255, 0.2)'}`,
                  background: 'var(--card-bg, #F8FAFC)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        color: '#FFFFFF',
                        background: item.color || '#3B82F6'
                      }}
                    >
                      {item.badge || 'UNSA'}
                    </span>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main, #0F172A)' }}>
                      {item.name}
                    </h4>
                  </div>

                  {hasPassed ? (
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '99px', background: '#E2E8F0', color: '#475569' }}>
                      Finalizado
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '99px', background: '#DCFCE7', color: '#15803D', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={11} /> Próximo
                    </span>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', fontSize: '0.8rem' }}>
                  {item.inscripcionesInicio && (
                    <div style={{ padding: '8px 10px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.15)' }}>
                      <span style={{ fontWeight: 800, color: '#1D4ED8', display: 'block', marginBottom: '2px' }}>📝 Inscripciones:</span>
                      <span style={{ color: 'var(--text-main, #0F172A)', fontWeight: 600 }}>
                        {new Date(item.inscripcionesInicio).toLocaleDateString('es-PE')} al {new Date(item.inscripcionesFin).toLocaleDateString('es-PE')}
                      </span>
                    </div>
                  )}

                  {item.inicioClases && (
                    <div style={{ padding: '8px 10px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
                      <span style={{ fontWeight: 800, color: '#047857', display: 'block', marginBottom: '2px' }}>🏫 Inicio de Clases:</span>
                      <span style={{ color: 'var(--text-main, #0F172A)', fontWeight: 600 }}>
                        {new Date(item.inicioClases).toLocaleDateString('es-PE')}
                      </span>
                    </div>
                  )}

                  {item.evaluacionPrevia && (
                    <div style={{ padding: '8px 10px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.15)' }}>
                      <span style={{ fontWeight: 800, color: '#B45309', display: 'block', marginBottom: '2px' }}>🎯 1era Evaluación / Previa:</span>
                      <span style={{ color: 'var(--text-main, #0F172A)', fontWeight: 700 }}>
                        {new Date(item.evaluacionPrevia).toLocaleDateString('es-PE', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  )}

                  {item.evaluacionConocimientos && (
                    <div style={{ padding: '8px 10px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
                      <span style={{ fontWeight: 800, color: '#B91C1C', display: 'block', marginBottom: '2px' }}>🏁 Conocimientos:</span>
                      <span style={{ color: 'var(--text-main, #0F172A)', fontWeight: 800 }}>
                        {new Date(item.evaluacionConocimientos).toLocaleDateString('es-PE', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  )}

                  {item.evaluacionAptitudes && (
                    <div style={{ padding: '8px 10px', borderRadius: '8px', background: 'rgba(147, 51, 234, 0.08)', border: '1px solid rgba(147, 51, 234, 0.15)' }}>
                      <span style={{ fontWeight: 800, color: '#7E22CE', display: 'block', marginBottom: '2px' }}>🧠 Aptitudes:</span>
                      <span style={{ color: 'var(--text-main, #0F172A)', fontWeight: 800 }}>
                        {new Date(item.evaluacionAptitudes).toLocaleDateString('es-PE', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  )}

                  {item.asignacionVacantes && (
                    <div style={{ padding: '8px 10px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.15)' }}>
                      <span style={{ fontWeight: 800, color: '#B45309', display: 'block', marginBottom: '2px' }}>🎓 Vacantes:</span>
                      <span style={{ color: 'var(--text-main, #0F172A)', fontWeight: 800 }}>
                        {new Date(item.asignacionVacantes).toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  )}

                  {item.note && (
                    <div style={{ padding: '8px 10px', borderRadius: '8px', background: 'rgba(20, 184, 166, 0.08)', border: '1px solid rgba(20, 184, 166, 0.2)', gridColumn: '1 / -1' }}>
                      <span style={{ color: '#0F766E', fontSize: '0.74rem', fontWeight: 700 }}>
                        ℹ️ {item.note}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer del Modal */}
        <div style={{ padding: '12px 18px', borderTop: '1px solid var(--card-border, rgba(0,0,0,0.1))', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg, #F8FAFC)' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary, #64748B)' }}>
            📌 Fuente: DUA UNSA Arequipa
          </span>
          <button
            onClick={onClose}
            style={{
              padding: '6px 16px',
              borderRadius: '8px',
              background: 'var(--text-main, #0F172A)',
              color: 'var(--card-bg, #FFFFFF)',
              fontWeight: 800,
              fontSize: '0.8rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Entendido
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export function ExamCountdownFlipClock() {
  const { theme } = useTheme();
  const [scheduleList, setScheduleList] = useState(DEFAULT_ADMISSION_SCHEDULE);
  const [selectedProcessId, setSelectedProcessId] = useState(() => {
    return localStorage.getItem('rastro_selected_exam_process') || DEFAULT_ADMISSION_SCHEDULE[0]?.id || 'ceprunsa-quintos-2027';
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFullScheduleModal, setShowFullScheduleModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const cached = getCachedSiteSettings();
    if (cached && Array.isArray(cached.admissionSchedule) && cached.admissionSchedule.length > 0) {
      setScheduleList(cached.admissionSchedule);
    }

    const unsub = subscribeToSiteSettings((settings) => {
      if (settings && Array.isArray(settings.admissionSchedule) && settings.admissionSchedule.length > 0) {
        setScheduleList(settings.admissionSchedule);
      }
    });

    return () => {
      if (typeof unsub === 'function') unsub();
    };
  }, []);

  const activeProcess = useMemo(() => {
    const found = scheduleList.find(p => p.id === selectedProcessId);
    if (found) return found;

    const futureProcesses = scheduleList.filter(p => {
      const target = p.targetDate || p.evaluacionConocimientos || p.evaluacionPrevia;
      return target && new Date(target).getTime() > Date.now();
    });

    return futureProcesses[0] || scheduleList[0];
  }, [scheduleList, selectedProcessId]);

  useEffect(() => {
    const targetTimeStr = activeProcess?.targetDate || activeProcess?.evaluacionPrevia || activeProcess?.evaluacionConocimientos;
    if (!targetTimeStr) return;

    const targetTime = new Date(targetTimeStr).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [activeProcess]);

  // Sincronizar datos del examen activo con los widgets nativos de Android
  useEffect(() => {
    if (!activeProcess) return;
    const target = activeProcess.targetDate || activeProcess.evaluacionConocimientos || activeProcess.evaluacionPrevia;
    syncWidgetsData({
      examName: activeProcess.shortName || activeProcess.name,
      examDate: target,
      examDays: timeLeft.days
    });
  }, [activeProcess, timeLeft.days]);

  const handleSelectProcess = (proc) => {
    setSelectedProcessId(proc.id);
    localStorage.setItem('rastro_selected_exam_process', proc.id);
    setShowDropdown(false);
  };

  return (
    <>
      <div 
        id="exam-countdown-widget-container"
        style={{
          width: '100%',
          maxWidth: '100%',
          margin: '0 auto',
          borderRadius: '24px',
          padding: '16px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          background: 'var(--card-bg, rgba(255, 255, 255, 0.85))',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--card-border, rgba(59, 130, 246, 0.25))',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
          boxSizing: 'border-box'
        }}
      >
        {/* Cabecera del Widget con Selector y Botón de Cronograma */}
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 900, color: 'var(--accent-color, #2563EB)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} /> Cuenta Regresiva UNSA
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowFullScheduleModal(true);
              }}
              style={{
                fontSize: '0.74rem',
                fontWeight: 800,
                color: 'var(--accent-color, #0284C7)',
                backgroundColor: 'rgba(59, 130, 246, 0.12)',
                padding: '5px 12px',
                borderRadius: '99px',
                border: '1px solid var(--card-border, rgba(59, 130, 246, 0.25))',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                touchAction: 'manipulation',
                minHeight: '32px'
              }}
            >
              <Calendar size={13} /> Ver Cronograma
            </button>
          </div>

          {/* Selector de Examen / Proceso */}
          <div style={{ position: 'relative', width: '100%' }}>
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '14px',
                border: '1px solid var(--card-border, rgba(59, 130, 246, 0.25))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                cursor: 'pointer',
                textAlign: 'left',
                background: 'var(--card-bg, rgba(255, 255, 255, 0.9))',
                minHeight: '44px',
                touchAction: 'manipulation'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden', flex: 1 }}>
                <div 
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '99px',
                    flexShrink: 0,
                    background: activeProcess?.color || 'var(--accent-color, #3B82F6)'
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 900, color: 'var(--text-main, #0F172A)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {activeProcess?.name}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary, #64748B)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {activeProcess?.description || 'Fecha oficial de evaluación'}
                  </span>
                </div>
              </div>

              <ChevronDown 
                size={16} 
                style={{
                  color: 'var(--text-secondary, #64748B)',
                  transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                  flexShrink: 0
                }} 
              />
            </button>

            {/* Dropdown de Opciones */}
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute',
                    top: '105%',
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    borderRadius: '16px',
                    border: '1px solid var(--card-border, rgba(59, 130, 246, 0.3))',
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                    padding: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    maxHeight: '240px',
                    overflowY: 'auto',
                    backgroundColor: 'var(--card-bg, #FFFFFF)',
                    backdropFilter: 'blur(16px)'
                  }}
                >
                  {scheduleList.map((proc) => {
                    const isSelected = proc.id === activeProcess.id;
                    return (
                      <button
                        key={proc.id}
                        type="button"
                        onClick={() => handleSelectProcess(proc)}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '10px',
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          border: 'none',
                          background: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                          color: isSelected ? 'var(--accent-color, #2563EB)' : 'var(--text-main, #0F172A)',
                          fontWeight: isSelected ? 800 : 500,
                          minHeight: '38px'
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span>{proc.name}</span>
                          <span style={{ fontSize: '0.68rem', opacity: 0.75, fontWeight: 500 }}>
                            📅 {proc.targetDate ? new Date(proc.targetDate).toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' }) : proc.description}
                          </span>
                        </div>
                        {isSelected && <CheckCircle2 size={16} color="var(--accent-color, #2563EB)" style={{ flexShrink: 0 }} />}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Tarjetas Modernas de Cuenta Regresiva Horizontal Centradas */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: '100%', margin: '0 auto' }}>
          <ModernTimeCard value={timeLeft.days} label="Días" accentColor={activeProcess?.color || '#3B82F6'} />
          <span style={{ color: 'var(--text-secondary, #94A3B8)', fontWeight: 900, fontSize: '1.25rem', paddingBottom: '16px', userSelect: 'none' }}>:</span>
          <ModernTimeCard value={timeLeft.hours} label="Horas" accentColor={activeProcess?.color || '#3B82F6'} />
          <span style={{ color: 'var(--text-secondary, #94A3B8)', fontWeight: 900, fontSize: '1.25rem', paddingBottom: '16px', userSelect: 'none' }}>:</span>
          <ModernTimeCard value={timeLeft.minutes} label="Minutos" accentColor={activeProcess?.color || '#3B82F6'} />
          <span style={{ color: 'var(--text-secondary, #94A3B8)', fontWeight: 900, fontSize: '1.25rem', paddingBottom: '16px', userSelect: 'none' }}>:</span>
          <ModernTimeCard value={timeLeft.seconds} label="Segundos" accentColor={activeProcess?.color || '#3B82F6'} />
        </div>
      </div>

      {/* Modal de Cronograma Completo */}
      <FullScheduleModal
        isOpen={showFullScheduleModal}
        onClose={() => setShowFullScheduleModal(false)}
        schedule={scheduleList}
      />
    </>
  );
}

export default ExamCountdownFlipClock;
