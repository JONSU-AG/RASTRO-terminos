import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Coffee,
  Brain,
  Sparkles,
  X,
  Volume2,
  VolumeX,
  Plus,
  Minus,
  Sliders,
  Repeat,
  Music,
  Check,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Minimize2,
  Info,
  BookOpen
} from 'lucide-react';
import { OrsttyMascot } from './Mascots';
import { soundEngine, SOUND_CATALOG } from '../lib/soundEffects';
import { usePomodoro, POMODORO_MODES, DEFAULT_SOUNDS_BY_MODE } from '../context/PomodoroContext';

export const PomodoroModal = ({ isOpen: propIsOpen, onClose: propOnClose }) => {
  const context = usePomodoro();

  // Permite controlar desde contexto global o desde props de compatibilidad
  const isModalOpen = propIsOpen !== undefined ? propIsOpen : context.isOpen;
  const handleClose = propOnClose !== undefined ? propOnClose : context.closeModal;

  const {
    activeModeKey,
    activeMode,
    timeLeft,
    isRunning,
    autoCycle,
    setAutoCycle,
    completedCycles,
    soundEnabled,
    setSoundEnabled,
    soundsByMode,
    currentSoundId,
    setSoundForCurrentMode,
    setSoundForSpecificMode,
    switchMode,
    togglePlay,
    resetTimer,
    addSeconds,
    minimize,
    closeAndStop,
    customStudyMinutes,
    setCustomStudyMinutes,
    customShortBreakMinutes,
    setCustomShortBreakMinutes,
    customLongBreakMinutes,
    setCustomLongBreakMinutes,
    customCyclesBeforeLongBreak,
    setCustomCyclesBeforeLongBreak,
    currentModeDuration,
    progressRatio
  } = context;

  // Modal explicativo de la técnica Pomodoro
  const [showExplanation, setShowExplanation] = useState(false);

  // Selector desplegable de sonido de alarma
  const [showSoundSelector, setShowSoundSelector] = useState(false);
  const [soundCategoryFilter, setSoundCategoryFilter] = useState('Todos');
  const [soundTargetModeKey, setSoundTargetModeKey] = useState('study');
  const [previewingId, setPreviewingId] = useState(null);

  // Formato mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const targetSoundId = soundsByMode[soundTargetModeKey] || 'campana_zen';
  const targetSoundObj = SOUND_CATALOG.find((s) => s.id === targetSoundId) || SOUND_CATALOG[0];
  const targetModeObj = POMODORO_MODES[soundTargetModeKey] || POMODORO_MODES.study;

  const currentSoundObj = SOUND_CATALOG.find((s) => s.id === currentSoundId) || SOUND_CATALOG[0];

  const categories = ['Todos', 'Relajantes', 'Cósmicos', 'Enérgicos', 'Clásicos', 'Alegres'];

  const filteredSounds =
    soundCategoryFilter === 'Todos'
      ? SOUND_CATALOG
      : SOUND_CATALOG.filter((s) => s.category === soundCategoryFilter);

  const handlePreviewSound = (soundId, e) => {
    if (e) e.stopPropagation();
    setPreviewingId(soundId);
    soundEngine.play(soundId);
    setTimeout(() => {
      setPreviewingId((prev) => (prev === soundId ? null : prev));
    }, 2800);
  };

  const handleSelectSoundForTargetMode = (soundId, modeKey) => {
    const target = modeKey || soundTargetModeKey;
    if (setSoundForSpecificMode) {
      setSoundForSpecificMode(target, soundId);
    } else {
      setSoundForCurrentMode(soundId);
    }
    soundEngine.play(soundId);
  };

  if (!isModalOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100050,
          background: 'rgba(2, 6, 23, 0.86)',
          backdropFilter: 'blur(22px) saturate(180%)',
          WebkitBackdropFilter: 'blur(22px) saturate(180%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          boxSizing: 'border-box'
        }}
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 16 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '460px',
            maxHeight: 'min(92vh, 680px)',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            background: 'linear-gradient(165deg, rgba(30, 27, 75, 0.98) 0%, rgba(15, 23, 42, 0.99) 100%)',
            border: '1.5px solid rgba(168, 85, 247, 0.4)',
            borderRadius: '24px',
            padding: '16px 14px 14px',
            boxShadow: '0 24px 70px rgba(0, 0, 0, 0.85), 0 0 40px rgba(168, 85, 247, 0.25)',
            color: '#F8FAFC',
            position: 'relative',
            boxSizing: 'border-box'
          }}
        >
          {/* HEADER DEL MODAL (FIJO EN LA PARTE SUPERIOR) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
              paddingBottom: '8px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              gap: '8px',
              flexShrink: 0
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'rgba(168, 85, 247, 0.2)',
                  border: '1px solid rgba(168, 85, 247, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#C084FC',
                  flexShrink: 0
                }}
              >
                <Timer size={18} />
              </div>
              <div style={{ minWidth: 0 }}>
                <span
                  style={{
                    fontSize: '0.64rem',
                    fontWeight: 900,
                    color: '#C084FC',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    display: 'block'
                  }}
                >
                  Temporizador Pro
                </span>
                <h3
                  style={{
                    fontSize: '1.02rem',
                    fontWeight: 900,
                    margin: 0,
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  Técnica Pomodoro
                </h3>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              {/* Toggle de sonido */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? 'Silenciar alarmas' : 'Activar alarmas'}
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '9px',
                  background: soundEnabled ? 'rgba(245, 158, 11, 0.18)' : 'rgba(148, 163, 184, 0.15)',
                  border: soundEnabled
                    ? '1px solid rgba(245, 158, 11, 0.4)'
                    : '1px solid rgba(148, 163, 184, 0.3)',
                  color: soundEnabled ? '#FBBF24' : '#94A3B8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              </motion.button>

              {/* BOTÓN 1: MINIMIZAR (A PÍLDORA FLOTANTE) */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                onClick={minimize}
                title="Minimizar a píldora flotante en pantalla"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '5px 9px',
                  borderRadius: '9px',
                  background: 'rgba(56, 189, 248, 0.16)',
                  border: '1.5px solid rgba(56, 189, 248, 0.45)',
                  color: '#38BDF8',
                  fontSize: '0.72rem',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                <Minus size={13} strokeWidth={3} />
                <span>Minimizar</span>
              </motion.button>

              {/* BOTÓN 2: CERRAR (APAGAR / SALIR) */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                onClick={closeAndStop}
                title="Cerrar y detener temporizador"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '5px 9px',
                  borderRadius: '9px',
                  background: 'rgba(239, 68, 68, 0.16)',
                  border: '1.5px solid rgba(239, 68, 68, 0.45)',
                  color: '#F87171',
                  fontSize: '0.72rem',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                <X size={13} strokeWidth={3} />
                <span>Cerrar</span>
              </motion.button>
            </div>
          </div>

          {/* CUERPO PRINCIPAL CON SCROLL FLUIDO INTEGRADO */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              paddingRight: '2px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              boxSizing: 'border-box'
            }}
          >

          {/* BOTÓN EXPLICATIVO: ¿CÓMO FUNCIONA LA TÉCNICA POMODORO? */}
          <div style={{ marginBottom: '14px' }}>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowExplanation(!showExplanation)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: '12px',
                background: showExplanation
                  ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(56, 189, 248, 0.2) 100%)'
                  : 'rgba(15, 23, 42, 0.65)',
                border: showExplanation ? '1px solid #A855F7' : '1px solid rgba(255, 255, 255, 0.1)',
                color: showExplanation ? '#FDE047' : '#E2E8F0',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HelpCircle size={15} color="#FDE047" />
                <span>ℹ️ ¿Cómo funciona la Técnica Pomodoro?</span>
              </div>
              <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                {showExplanation ? 'Ocultar guía ▲' : 'Ver método ▼'}
              </span>
            </motion.button>

            {/* GUÍA EXPLICATIVA ANIMADA */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    background: 'rgba(10, 14, 28, 0.9)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: '14px',
                    padding: '12px 14px',
                    marginTop: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    fontSize: '0.78rem',
                    color: '#CBD5E1',
                    lineHeight: 1.35
                  }}
                >
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ background: '#A855F7', color: '#FFF', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900, flexShrink: 0 }}>1</span>
                    <div><strong style={{ color: '#E9D5FF' }}>Foco Absoluto (25 min):</strong> Elige un tema o tanda de preguntas. Cero redes, cero distracciones.</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ background: '#10B981', color: '#FFF', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900, flexShrink: 0 }}>2</span>
                    <div><strong style={{ color: '#A7F3D0' }}>Descanso Corto (5 min):</strong> Desconecta, estira o bebe agua. Tu cerebro asimila los conceptos sin esfuerzo.</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ background: '#F59E0B', color: '#FFF', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900, flexShrink: 0 }}>3</span>
                    <div><strong style={{ color: '#FDE68A' }}>Ciclo de 4 Bloques:</strong> Repite 4 tandas completas de concentración para dominar el temario.</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ background: '#38BDF8', color: '#FFF', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900, flexShrink: 0 }}>4</span>
                    <div><strong style={{ color: '#BAE6FD' }}>Descanso Largo (15-30 min):</strong> Tras completar los 4 bloques, descansa a fondo para evitar el agotamiento mental.</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SELECTOR DE MODOS (TABS DE ESTUDIO / DESCANSO / PERSONALIZADO) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '6px',
              marginBottom: '16px'
            }}
          >
            {Object.values(POMODORO_MODES).map((mode) => {
              const isSelected = activeModeKey === mode.id;
              const IconComponent =
                mode.id === 'study'
                  ? Brain
                  : mode.id === 'shortBreak'
                  ? Coffee
                  : mode.id === 'longBreak'
                  ? Sparkles
                  : Sliders;

              return (
                <motion.button
                  key={mode.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => switchMode(mode.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 6px',
                    borderRadius: '12px',
                    border: isSelected ? `2px solid ${mode.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                    background: isSelected
                      ? `linear-gradient(135deg, ${mode.color}40 0%, ${mode.color}15 100%)`
                      : 'rgba(15, 23, 42, 0.6)',
                    color: isSelected ? '#FFFFFF' : '#94A3B8',
                    fontWeight: 900,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    boxShadow: isSelected ? `0 0 14px ${mode.color}35` : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <IconComponent size={15} color={isSelected ? mode.color : '#94A3B8'} />
                  <span>{mode.name}</span>
                </motion.button>
              );
            })}
          </div>

          {/* CUADRO DEL TEMPORIZADOR CIRCULAR RESPONSIVE CON SVG Y TIEMPO DIGITAL */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              margin: '6px 0 16px'
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '154px',
                height: '154px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Anillo de fondo */}
              <svg width="154" height="154" style={{ transform: 'rotate(-90deg)' }}>
                <circle
                  cx="77"
                  cy="77"
                  r="67"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="6"
                  fill="transparent"
                />
                <motion.circle
                  cx="77"
                  cy="77"
                  r="67"
                  stroke={activeMode.color}
                  strokeWidth="6"
                  strokeDasharray={2 * Math.PI * 67}
                  strokeDashoffset={2 * Math.PI * 67 * (1 - progressRatio)}
                  strokeLinecap="round"
                  fill="transparent"
                  style={{
                    filter: `drop-shadow(0 0 8px ${activeMode.color})`,
                    transition: 'stroke-dashoffset 0.5s ease, stroke 0.3s ease'
                  }}
                />
              </svg>

              {/* Tiempo Central y Estado */}
              <div
                style={{
                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
              >
                <motion.span
                  key={formattedTime}
                  initial={{ scale: 0.98 }}
                  animate={{ scale: 1 }}
                  style={{
                    fontFamily: 'monospace, system-ui',
                    fontSize: '2.15rem',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    color: '#FFFFFF',
                    lineHeight: 1
                  }}
                >
                  {formattedTime}
                </motion.span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    color: activeMode.color,
                    marginTop: '5px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  {isRunning ? 'EN PROCESO' : 'PAUSADO'}
                </span>
                <span style={{ fontSize: '0.65rem', color: '#64748B', marginTop: '2px', fontWeight: 600 }}>
                  Bloques hoy: {completedCycles}
                </span>
              </div>
            </div>
          </div>

          {/* PANEL UNIFICADO Y GLOBAL DE CONFIGURACIÓN PERSONALIZADA */}
          {activeModeKey === 'custom' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1.5px solid rgba(245, 158, 11, 0.4)',
                borderRadius: '18px',
                padding: '14px',
                marginBottom: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sliders size={16} color="#FBBF24" />
                  <span style={{ fontSize: '0.84rem', fontWeight: 900, color: '#FDE047' }}>
                    Configuración Global del Ciclo:
                  </span>
                </div>
                <span style={{ fontSize: '0.68rem', color: '#94A3B8' }}>Guarda automáticamente</span>
              </div>

              {/* GRID CON 4 CAMPOS: ESTUDIO, DESCANSO CORTO, DESCANSO LARGO, BLOQUES */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '10px'
                }}
              >
                {/* 1. Tiempo de Estudio */}
                <div style={{ background: 'rgba(15, 23, 42, 0.7)', borderRadius: '12px', padding: '8px 10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '0.7rem', color: '#A855F7', fontWeight: 800, marginBottom: '4px' }}>
                    🧠 Estudio (min)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                    <button
                      type="button"
                      onClick={() => setCustomStudyMinutes(Math.max(1, customStudyMinutes - 5))}
                      style={{ width: '26px', height: '26px', borderRadius: '6px', background: '#334155', border: 'none', color: '#FFF', fontWeight: 900, cursor: 'pointer' }}
                    >-</button>
                    <input
                      type="number"
                      min="1"
                      max="180"
                      value={customStudyMinutes}
                      onChange={(e) => setCustomStudyMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                      style={{ width: '48px', textAlign: 'center', background: '#0F172A', border: '1px solid #A855F7', color: '#FFF', fontWeight: 900, borderRadius: '6px', padding: '3px 0' }}
                    />
                    <button
                      type="button"
                      onClick={() => setCustomStudyMinutes(Math.min(180, customStudyMinutes + 5))}
                      style={{ width: '26px', height: '26px', borderRadius: '6px', background: '#334155', border: 'none', color: '#FFF', fontWeight: 900, cursor: 'pointer' }}
                    >+</button>
                  </div>
                </div>

                {/* 2. Descanso Corto */}
                <div style={{ background: 'rgba(15, 23, 42, 0.7)', borderRadius: '12px', padding: '8px 10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 800, marginBottom: '4px' }}>
                    ☕ Descanso Corto (min)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                    <button
                      type="button"
                      onClick={() => setCustomShortBreakMinutes(Math.max(1, customShortBreakMinutes - 1))}
                      style={{ width: '26px', height: '26px', borderRadius: '6px', background: '#334155', border: 'none', color: '#FFF', fontWeight: 900, cursor: 'pointer' }}
                    >-</button>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={customShortBreakMinutes}
                      onChange={(e) => setCustomShortBreakMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                      style={{ width: '48px', textAlign: 'center', background: '#0F172A', border: '1px solid #10B981', color: '#FFF', fontWeight: 900, borderRadius: '6px', padding: '3px 0' }}
                    />
                    <button
                      type="button"
                      onClick={() => setCustomShortBreakMinutes(Math.min(60, customShortBreakMinutes + 1))}
                      style={{ width: '26px', height: '26px', borderRadius: '6px', background: '#334155', border: 'none', color: '#FFF', fontWeight: 900, cursor: 'pointer' }}
                    >+</button>
                  </div>
                </div>

                {/* 3. Descanso Largo */}
                <div style={{ background: 'rgba(15, 23, 42, 0.7)', borderRadius: '12px', padding: '8px 10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '0.7rem', color: '#38BDF8', fontWeight: 800, marginBottom: '4px' }}>
                    ✨ Descanso Largo (min)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                    <button
                      type="button"
                      onClick={() => setCustomLongBreakMinutes(Math.max(1, customLongBreakMinutes - 5))}
                      style={{ width: '26px', height: '26px', borderRadius: '6px', background: '#334155', border: 'none', color: '#FFF', fontWeight: 900, cursor: 'pointer' }}
                    >-</button>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={customLongBreakMinutes}
                      onChange={(e) => setCustomLongBreakMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                      style={{ width: '48px', textAlign: 'center', background: '#0F172A', border: '1px solid #38BDF8', color: '#FFF', fontWeight: 900, borderRadius: '6px', padding: '3px 0' }}
                    />
                    <button
                      type="button"
                      onClick={() => setCustomLongBreakMinutes(Math.min(120, customLongBreakMinutes + 5))}
                      style={{ width: '26px', height: '26px', borderRadius: '6px', background: '#334155', border: 'none', color: '#FFF', fontWeight: 900, cursor: 'pointer' }}
                    >+</button>
                  </div>
                </div>

                {/* 4. Bloques antes del Descanso Largo */}
                <div style={{ background: 'rgba(15, 23, 42, 0.7)', borderRadius: '12px', padding: '8px 10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '0.7rem', color: '#F59E0B', fontWeight: 800, marginBottom: '4px' }}>
                    🔄 Bloques antes del D. Largo
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                    <button
                      type="button"
                      onClick={() => setCustomCyclesBeforeLongBreak(Math.max(1, customCyclesBeforeLongBreak - 1))}
                      style={{ width: '26px', height: '26px', borderRadius: '6px', background: '#334155', border: 'none', color: '#FFF', fontWeight: 900, cursor: 'pointer' }}
                    >-</button>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={customCyclesBeforeLongBreak}
                      onChange={(e) => setCustomCyclesBeforeLongBreak(Math.max(1, parseInt(e.target.value) || 1))}
                      style={{ width: '48px', textAlign: 'center', background: '#0F172A', border: '1px solid #F59E0B', color: '#FFF', fontWeight: 900, borderRadius: '6px', padding: '3px 0' }}
                    />
                    <button
                      type="button"
                      onClick={() => setCustomCyclesBeforeLongBreak(Math.min(12, customCyclesBeforeLongBreak + 1))}
                      style={{ width: '26px', height: '26px', borderRadius: '6px', background: '#334155', border: 'none', color: '#FFF', fontWeight: 900, cursor: 'pointer' }}
                    >+</button>
                  </div>
                </div>
              </div>

              {/* PLANTILLAS RÁPIDAS DE ESTUDIO */}
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px', scrollbarWidth: 'none' }}>
                {[
                  { label: '🎯 Clásico (25-5-20 / 4)', study: 25, shortB: 5, longB: 20, cycles: 4 },
                  { label: '⚡ Ultra Foco (50-10-30 / 3)', study: 50, shortB: 10, longB: 30, cycles: 3 },
                  { label: '🚀 Intenso (35-7-20 / 4)', study: 35, shortB: 7, longB: 20, cycles: 4 },
                  { label: '⏱️ Express (1-1-2 / 2)', study: 1, shortB: 1, longB: 2, cycles: 2 }
                ].map((preset, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => {
                      setCustomStudyMinutes(preset.study);
                      setCustomShortBreakMinutes(preset.shortB);
                      setCustomLongBreakMinutes(preset.longB);
                      setCustomCyclesBeforeLongBreak(preset.cycles);
                      if (!isRunning) {
                        switchMode('custom');
                      }
                    }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      padding: '4px 8px',
                      color: '#CBD5E1',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      whiteSpace: 'nowrap',
                      cursor: 'pointer'
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* SELECTOR DE SONIDO INDIVIDUAL POR CADA MODO */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.75)',
              border: `1.5px solid ${targetModeObj.color}55`,
              borderRadius: '18px',
              padding: '14px',
              marginBottom: '16px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 900, color: '#F1F5F9', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Music size={14} color="#A855F7" />
                  <span>Sonidos de Alarma por Modo</span>
                </div>
                <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>
                  Elige qué sonido sonará al terminar cada etapa:
                </div>
              </div>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  background: 'rgba(255, 255, 255, 0.08)',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  color: '#CBD5E1'
                }}
              >
                24 tonos disponibles
              </span>
            </div>

            {/* TABS DE LOS 4 MODOS PARA ASIGNAR SONIDO */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '6px',
                marginBottom: '12px'
              }}
            >
              {Object.values(POMODORO_MODES).map((mode) => {
                const isSelectedMode = soundTargetModeKey === mode.id;
                const assignedSoundId = soundsByMode[mode.id] || DEFAULT_SOUNDS_BY_MODE[mode.id] || 'campana_zen';
                const assignedSound = SOUND_CATALOG.find((s) => s.id === assignedSoundId) || SOUND_CATALOG[0];

                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => {
                      setSoundTargetModeKey(mode.id);
                      setShowSoundSelector(true);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: '12px',
                      border: isSelectedMode ? `2px solid ${mode.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                      background: isSelectedMode ? `${mode.color}25` : 'rgba(30, 41, 59, 0.5)',
                      color: isSelectedMode ? '#FFFFFF' : '#CBD5E1',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelectedMode ? `0 0 12px ${mode.color}35` : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                      <span style={{ fontSize: '1rem', flexShrink: 0 }}>{mode.iconEmoji}</span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 900, color: isSelectedMode ? mode.color : '#E2E8F0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {mode.name}
                        </div>
                        <div style={{ fontSize: '0.64rem', color: '#94A3B8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {assignedSound.name}
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.9rem', marginLeft: '4px', flexShrink: 0 }}>{assignedSound.icon}</span>
                  </button>
                );
              })}
            </div>

            {/* RESUMEN DEL MODO EN EDICIÓN CON BOTÓN DE PRUEBA Y DESPLIEGUE DEL CATÁLOGO */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: '12px',
                background: 'rgba(2, 6, 23, 0.6)',
                border: `1px solid ${targetModeObj.color}40`,
                cursor: 'pointer'
              }}
              onClick={() => setShowSoundSelector(!showSoundSelector)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>{targetSoundObj.icon}</span>
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 900, color: targetModeObj.color, textTransform: 'uppercase' }}>
                    Sonido para: {targetModeObj.name}
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#FFFFFF' }}>
                    {targetSoundObj.name} <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>• {targetSoundObj.duration}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  type="button"
                  onClick={(e) => handlePreviewSound(targetSoundId, e)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '8px',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    background: 'rgba(56, 189, 248, 0.15)',
                    color: '#38BDF8',
                    fontWeight: 800,
                    fontSize: '0.74rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <Play size={11} fill="#38BDF8" /> Probar
                </button>
                {showSoundSelector ? <ChevronUp size={16} color="#94A3B8" /> : <ChevronDown size={16} color="#94A3B8" />}
              </div>
            </div>

            {/* LISTA DESPLEGABLE DE LOS 24 SONIDOS DISPONIBLES (CON SCROLL FLUIDO) */}
            {showSoundSelector && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Categorías deslizables */}
                <div
                  style={{
                    display: 'flex',
                    gap: '6px',
                    overflowX: 'auto',
                    paddingBottom: '8px',
                    marginBottom: '10px',
                    scrollbarWidth: 'none',
                    minHeight: '34px',
                    alignItems: 'center'
                  }}
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSoundCategoryFilter(cat)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '999px',
                        border:
                          soundCategoryFilter === cat
                            ? `1.5px solid ${targetModeObj.color}`
                            : '1px solid rgba(255, 255, 255, 0.1)',
                        background:
                          soundCategoryFilter === cat ? `${targetModeObj.color}35` : 'rgba(15, 23, 42, 0.8)',
                        color: soundCategoryFilter === cat ? '#FFFFFF' : '#94A3B8',
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                        flexShrink: 0
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Grid con scroll de opciones */}
                <div
                  style={{
                    maxHeight: '190px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    paddingRight: '4px'
                  }}
                >
                  {filteredSounds.map((sound) => {
                    const isSelected = targetSoundId === sound.id;
                    const isPreviewing = previewingId === sound.id;

                    return (
                      <div
                        key={sound.id}
                        onClick={() => handleSelectSoundForTargetMode(sound.id, soundTargetModeKey)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '7px 10px',
                          borderRadius: '10px',
                          border: isSelected
                            ? `1.5px solid ${targetModeObj.color}`
                            : '1px solid rgba(255, 255, 255, 0.06)',
                          background: isSelected ? `${targetModeObj.color}22` : 'rgba(30, 41, 59, 0.4)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '1.1rem' }}>{sound.icon}</span>
                          <div>
                            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#FFFFFF' }}>
                              {sound.name}
                            </div>
                            <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>
                              {sound.category} • {sound.duration}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <button
                            onClick={(e) => handlePreviewSound(sound.id, e)}
                            style={{
                              padding: '3px 8px',
                              borderRadius: '6px',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              background: isPreviewing ? '#10B981' : 'rgba(255, 255, 255, 0.08)',
                              color: '#FFFFFF',
                              fontSize: '0.68rem',
                              fontWeight: 800,
                              cursor: 'pointer'
                            }}
                          >
                            {isPreviewing ? 'Sonando...' : 'Oír'}
                          </button>
                          {isSelected && <Check size={16} color={targetModeObj.color} strokeWidth={3} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* CICLO AUTOMÁTICO TOGGLE */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '12px 14px',
              marginBottom: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Repeat size={18} color="#38BDF8" />
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#FFFFFF' }}>
                  Modo Automático (Ciclo continuo)
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                  Alterna estudio y descanso al sonar la campana
                </div>
              </div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '42px', height: '24px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={autoCycle}
                onChange={(e) => setAutoCycle(e.target.checked)}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: autoCycle ? '#10B981' : '#334155',
                  borderRadius: '24px',
                  transition: 'background 0.25s ease'
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: autoCycle ? '20px' : '2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    transition: 'left 0.25s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                />
              </span>
            </label>
          </div>

          {/* BOTONES PRINCIPALES DE CONTROL 3D (REINICIAR / PLAY / +5M) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '20px'
            }}
          >
            {/* Reiniciar */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={resetTimer}
              title="Reiniciar contador"
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#CBD5E1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={20} />
            </motion.button>

            {/* Iniciar / Pausar */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={togglePlay}
              className="duo-btn-3d"
              style={{
                flex: 1,
                maxWidth: '200px',
                padding: '14px 20px',
                borderRadius: '18px',
                border: 'none',
                background: isRunning
                  ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
                  : 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
                boxShadow: isRunning ? '0 5px 0 #991B1B' : '0 5px 0 #581C87',
                color: '#FFFFFF',
                fontWeight: 900,
                fontSize: '1.05rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              {isRunning ? (
                <>
                  <Pause size={20} fill="#FFFFFF" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play size={20} fill="#FFFFFF" />
                  <span>Iniciar</span>
                </>
              )}
            </motion.button>

            {/* +5 Minutos */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => addSeconds(5 * 60)}
              title="Sumar 5 minutos"
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#CBD5E1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontWeight: 800,
                fontSize: '0.85rem'
              }}
            >
              + 5m
            </motion.button>
          </div>

          {/* CONSEJO DE ORSTTY */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(168, 85, 247, 0.25)',
              borderRadius: '16px',
              padding: '10px 14px'
            }}
          >
            <OrsttyMascot size={46} mood={isRunning ? 'pensativo' : 'feliz'} />
            <span style={{ fontSize: '0.82rem', color: '#CBD5E1', lineHeight: 1.35 }}>
              {activeMode.tip}
            </span>
          </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
