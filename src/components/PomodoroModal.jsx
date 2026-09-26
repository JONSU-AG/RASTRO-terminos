import React, { useState } from 'react';
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
  Settings,
  Sliders,
  Repeat,
  Music,
  Check,
  ChevronLeft,
  HelpCircle,
  Clock,
  Flame,
  Award
} from 'lucide-react';
import { OrsttyMascot, ArtyonMascot, DynamicMascot, DualMascotDuo } from './Mascots';
import { PlayPauseMorph } from './common/MorphIcon';
import { soundEngine, SOUND_CATALOG } from '../lib/soundEffects';
import { usePomodoro, POMODORO_MODES, DEFAULT_SOUNDS_BY_MODE } from '../context/PomodoroContext';
import { useTheme } from '../context/ThemeContext';

export const PomodoroModal = ({ isOpen: propIsOpen, onClose: propOnClose }) => {
  const context = usePomodoro();
  const { isLight, theme } = useTheme();

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
    todayStudiedMinutes,
    setPresetDuration,
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
    progressRatio
  } = context;

  // Vista de Ajustes (pantalla secundaria limpia)
  const [showSettings, setShowSettings] = useState(false);
  const [soundTargetModeKey, setSoundTargetModeKey] = useState('study');
  const [previewingId, setPreviewingId] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

  // Formato mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const targetSoundId = soundsByMode?.[soundTargetModeKey] || DEFAULT_SOUNDS_BY_MODE[soundTargetModeKey] || 'campana_zen';

  const handlePreviewSound = (soundId, e) => {
    if (e) e.stopPropagation();
    setPreviewingId(soundId);
    soundEngine.play(soundId);
    setTimeout(() => {
      setPreviewingId((prev) => (prev === soundId ? null : prev));
    }, 2800);
  };

  const handleSelectSound = (soundId) => {
    if (setSoundForSpecificMode) {
      setSoundForSpecificMode(soundTargetModeKey, soundId);
    } else {
      setSoundForCurrentMode(soundId);
    }
    soundEngine.play(soundId);
  };

  // Modos visibles en las pestañas principales con nombres claros y directos
  const mainModes = [
    { id: 'study', name: 'Estudio', time: `${customStudyMinutes || 25}m`, icon: Brain, color: '#A855F7' },
    { id: 'shortBreak', name: 'Descanso Corto', time: `${customShortBreakMinutes || 5}m`, icon: Coffee, color: '#10B981' },
    { id: 'longBreak', name: 'Descanso Largo', time: `${customLongBreakMinutes || 15}m`, icon: Sparkles, color: '#38BDF8' }
  ];

  // Geometría del anillo de progreso
  const circleRadius = 82;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference * (1 - Math.max(0, Math.min(1, progressRatio)));

  // Bloques del ciclo actual
  const totalBlocks = customCyclesBeforeLongBreak || 4;
  const currentBlockInCycle = (completedCycles % totalBlocks) + 1;

  // Botón dinámico según el modo actual
  const getButtonLabel = () => {
    if (isRunning) {
      if (activeModeKey === 'shortBreak' || activeModeKey === 'longBreak') return 'Pausar Descanso';
      return 'Pausar Estudio';
    } else {
      if (activeModeKey === 'shortBreak') return 'Iniciar Descanso';
      if (activeModeKey === 'longBreak') return 'Iniciar Descanso';
      return 'Iniciar Estudio';
    }
  };

  const activeColor = activeMode?.color || '#A855F7';

  // Presets rápidos a 1 solo toque
  const quickPresets = [15, 25, 45, 50];

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100050,
          background: isLight ? 'rgba(15, 23, 42, 0.45)' : 'rgba(2, 6, 23, 0.85)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '14px',
          boxSizing: 'border-box'
        }}
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 16 }}
          transition={{ type: 'spring', stiffness: 420, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '430px',
            maxHeight: '92vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            background: 'var(--card-bg, #18181B)',
            backdropFilter: 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
            border: `1.5px solid ${activeColor}55`,
            borderRadius: '28px',
            boxShadow: `0 24px 60px rgba(0, 0, 0, ${isLight ? '0.22' : '0.85'}), 0 0 35px ${activeColor}25`,
            color: 'var(--text-main, #FFFFFF)',
            position: 'relative',
            boxSizing: 'border-box'
          }}
        >
          {/* ======================================================== */}
          {/* CABECERA PRINCIPAL LIMPIA                                */}
          {/* ======================================================== */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 18px 12px',
              borderBottom: '1px solid var(--card-border, rgba(120, 120, 128, 0.15))',
              gap: '8px',
              flexShrink: 0
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '12px',
                  background: `${activeColor}22`,
                  border: `1px solid ${activeColor}50`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: activeColor,
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
                    color: activeColor,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    display: 'block'
                  }}
                >
                  {showSettings ? 'Configuración' : 'Temporizador de Estudio'}
                </span>
                <h3
                  style={{
                    fontSize: '1.02rem',
                    fontWeight: 900,
                    margin: 0,
                    color: 'var(--text-main, #FFFFFF)',
                    letterSpacing: '-0.02em',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {showSettings ? 'Ajustes de Tiempo y Alarma' : activeMode?.name || 'Estudio'}
                </h3>
              </div>
            </div>

            {/* BOTONES DE ACCIÓN DE CABECERA (SVG PURO) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              {/* Botón Silenciar / Activar Sonido */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? 'Silenciar alarma' : 'Activar alarma'}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: soundEnabled ? 'rgba(245, 158, 11, 0.18)' : 'var(--card-bg, rgba(255, 255, 255, 0.08))',
                  border: soundEnabled ? '1px solid rgba(245, 158, 11, 0.45)' : '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                  color: soundEnabled ? '#F59E0B' : 'var(--text-muted, #94A3B8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
              </motion.button>

              {/* Botón Ajustes (SVG Engranaje / Volver) */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setShowSettings(!showSettings)}
                title={showSettings ? 'Volver al reloj' : 'Personalizar tiempos y sonidos'}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: showSettings ? `${activeColor}35` : 'var(--card-bg, rgba(255, 255, 255, 0.08))',
                  border: showSettings ? `1.5px solid ${activeColor}` : '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                  color: showSettings ? activeColor : 'var(--text-main, #FFFFFF)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                {showSettings ? <ChevronLeft size={16} strokeWidth={2.5} /> : <Settings size={15} />}
              </motion.button>

              {/* Botón Minimizar */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={(e) => {
                  e?.stopPropagation?.();
                  minimize();
                }}
                title="Minimizar a píldora flotante"
                aria-label="Minimizar"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'rgba(56, 189, 248, 0.16)',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  color: '#38BDF8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Minus size={15} strokeWidth={3} />
              </motion.button>

              {/* Botón Cerrar */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={(e) => {
                  e?.stopPropagation?.();
                  closeAndStop();
                }}
                title="Cerrar y detener temporizador"
                aria-label="Cerrar"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'rgba(239, 68, 68, 0.16)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#F87171',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={15} strokeWidth={2.5} />
              </motion.button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CONTENIDO PRINCIPAL SCROLLEABLE LIMPIO                   */}
          {/* ======================================================== */}
          <div
            style={{
              padding: '16px 18px 18px',
              overflowY: 'auto',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {!showSettings ? (
              /* ==================================================== */
              /* VISTA 1: RELOJ PRINCIPAL DE ESTUDIO                  */
              /* ==================================================== */
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* SELECTOR DE MODOS (PÍLDORAS TÁCTILES LIMPIAS) */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px',
                    marginBottom: '10px'
                  }}
                >
                  {mainModes.map((mode) => {
                    const isSelected = activeModeKey === mode.id;
                    const Icon = mode.icon;
                    return (
                      <motion.button
                        key={mode.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => switchMode(mode.id)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '3px',
                          padding: '9px 4px',
                          borderRadius: '16px',
                          border: isSelected ? `2px solid ${mode.color}` : '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                          background: isSelected
                            ? `${mode.color}22`
                            : 'var(--card-bg, rgba(255, 255, 255, 0.05))',
                          color: isSelected ? mode.color : 'var(--text-muted, #94A3B8)',
                          cursor: 'pointer',
                          boxShadow: isSelected ? `0 0 16px ${mode.color}30` : 'none',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Icon size={14} color={isSelected ? mode.color : 'var(--text-muted, #94A3B8)'} />
                          <span style={{ fontSize: '0.76rem', fontWeight: 800 }}>{mode.name}</span>
                        </div>
                        <span
                          style={{
                            fontSize: '0.66rem',
                            fontWeight: 700,
                            color: isSelected ? mode.color : 'var(--text-muted, #94A3B8)'
                          }}
                        >
                          {mode.time}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* TEMPORIZADOR CIRCULAR ADAPTABLE */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    margin: '4px 0 10px'
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '184px',
                      height: '184px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <svg width="184" height="184" style={{ transform: 'rotate(-90deg)' }}>
                      {/* Anillo de fondo */}
                      <circle
                        cx="92"
                        cy="92"
                        r={circleRadius}
                        stroke="var(--card-border, rgba(120, 120, 128, 0.2))"
                        strokeWidth="7"
                        fill="transparent"
                      />
                      {/* Anillo de progreso animado */}
                      <motion.circle
                        cx="92"
                        cy="92"
                        r={circleRadius}
                        stroke={activeColor}
                        strokeWidth="7"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        fill="transparent"
                        style={{
                          transition: 'stroke-dashoffset 0.4s ease, stroke 0.3s ease'
                        }}
                      />
                    </svg>

                    {/* Tiempo Digital en el centro */}
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
                      <span
                        style={{
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                          fontSize: '2.75rem',
                          fontWeight: 900,
                          letterSpacing: '-0.03em',
                          color: 'var(--text-main, #FFFFFF)',
                          lineHeight: 1
                        }}
                      >
                        {formattedTime}
                      </span>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 900,
                          color: activeColor,
                          marginTop: '6px',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          background: `${activeColor}20`,
                          padding: '2px 8px',
                          borderRadius: '999px'
                        }}
                      >
                        {isRunning ? 'EN CURSO' : 'PAUSADO'}
                      </span>
                    </div>
                  </div>

                  {/* INDICADOR DE CICLO: BLOQUE 1 DE 4 */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginTop: '6px',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      background: 'var(--card-bg, rgba(255, 255, 255, 0.05))',
                      border: '1px solid var(--card-border, rgba(120, 120, 128, 0.2))'
                    }}
                  >
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-muted, #94A3B8)' }}>
                      Bloque {currentBlockInCycle} de {totalBlocks}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      {Array.from({ length: totalBlocks }).map((_, idx) => {
                        const isDone = idx < (completedCycles % totalBlocks);
                        const isCurrent = idx === (completedCycles % totalBlocks);
                        return (
                          <div
                            key={idx}
                            style={{
                              width: isCurrent ? '10px' : '7px',
                              height: isCurrent ? '10px' : '7px',
                              borderRadius: '50%',
                              background: isDone
                                ? '#10B981'
                                : isCurrent
                                ? activeColor
                                : 'var(--card-border, rgba(120, 120, 128, 0.3))',
                              boxShadow: isCurrent ? `0 0 8px ${activeColor}` : 'none',
                              transition: 'all 0.2s ease'
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* ==================================================== */}
                {/* PRESETS RÁPIDOS A 1 TOQUE (15m, 25m, 45m, 50m)      */}
                {/* ==================================================== */}
                {activeModeKey === 'study' && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      margin: '2px 0 10px'
                    }}
                  >
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-muted, #94A3B8)', marginRight: '4px' }}>
                      Tiempo:
                    </span>
                    {quickPresets.map((mins) => {
                      const isActive = (customStudyMinutes || 25) === mins;
                      return (
                        <button
                          key={mins}
                          type="button"
                          onClick={() => setPresetDuration && setPresetDuration(mins)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '10px',
                            border: isActive ? `1.5px solid ${activeColor}` : '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                            background: isActive
                              ? `${activeColor}25`
                              : 'var(--card-bg, rgba(255, 255, 255, 0.05))',
                            color: isActive ? activeColor : 'var(--text-main, #CBD5E1)',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {mins}m
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* ==================================================== */}
                {/* BOTONES PRINCIPALES DE CONTROL                       */}
                {/* ==================================================== */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    margin: '4px 0 12px'
                  }}
                >
                  {/* Reiniciar */}
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={resetTimer}
                    title="Reiniciar este bloque"
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      background: 'var(--card-bg, rgba(255, 255, 255, 0.08))',
                      border: '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                      color: 'var(--text-main, #CBD5E1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <RotateCcw size={18} />
                  </motion.button>

                  {/* Botón Principal (Play / Pausa) con Texto Dinámico */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={togglePlay}
                    style={{
                      flex: 1,
                      maxWidth: '220px',
                      padding: '13px 18px',
                      borderRadius: '16px',
                      border: 'none',
                      background: isRunning
                        ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
                        : `linear-gradient(135deg, ${activeColor} 0%, #7C3AED 100%)`,
                      boxShadow: isRunning ? '0 5px 0 #991B1B' : '0 5px 0 #581C87',
                      color: '#FFFFFF',
                      fontWeight: 900,
                      fontSize: '0.98rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      letterSpacing: '0.02em'
                    }}
                  >
                    <PlayPauseMorph isPlaying={isRunning} size={19} color="#FFFFFF" spring="bouncy" />
                    <span>{getButtonLabel()}</span>
                  </motion.button>

                  {/* +5 Minutos */}
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => addSeconds(5 * 60)}
                    title="Extender 5 minutos más"
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      background: 'var(--card-bg, rgba(255, 255, 255, 0.08))',
                      border: '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                      color: 'var(--text-main, #CBD5E1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontWeight: 900,
                      fontSize: '0.78rem'
                    }}
                  >
                    +5m
                  </motion.button>
                </div>

                {/* MÉTRICA EN VIVO DE ESTUDIO HOY */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    padding: '7px 12px',
                    borderRadius: '12px',
                    background: 'var(--card-bg, rgba(255, 255, 255, 0.05))',
                    border: '1px solid var(--card-border, rgba(120, 120, 128, 0.15))',
                    marginBottom: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.74rem', color: 'var(--text-main, #CBD5E1)', fontWeight: 700 }}>
                    <Clock size={13} color="#38BDF8" />
                    <span>Hoy: <strong>{todayStudiedMinutes || 0} min</strong></span>
                  </div>
                  <div style={{ width: '1px', height: '14px', background: 'var(--card-border, rgba(120, 120, 128, 0.2))' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.74rem', color: 'var(--text-main, #CBD5E1)', fontWeight: 700 }}>
                    <Flame size={13} color="#F59E0B" />
                    <span>Bloques: <strong>{completedCycles || 0}</strong></span>
                  </div>
                </div>

                {/* CONSEJO COMPACTO DE ORSTTY */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'var(--card-bg, rgba(255, 255, 255, 0.05))',
                    border: `1px solid ${activeColor}30`,
                    borderRadius: '16px',
                    padding: '8px 12px',
                    marginTop: 'auto'
                  }}
                >
                  <DynamicMascot
                    prefer={activeModeKey === 'study' ? (isRunning ? 'orstty' : 'artyon') : 'artyon'}
                    size={38}
                    mood={isRunning ? (activeModeKey === 'study' ? 'pensativo' : 'emocionado') : 'feliz'}
                  />
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted, #CBD5E1)', lineHeight: 1.35, fontWeight: 500 }}>
                    {activeMode?.tip || '¡Concéntrate al 100%! Cada minuto de estudio cuenta para tu meta.'}
                  </span>
                </div>
              </div>
            ) : (
              /* ==================================================== */
              /* VISTA 2: PANEL DE AJUSTES LIMPIO Y ORGANIZADO        */
              /* ==================================================== */
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
              >
                {/* 1. DURACIONES DE CADA FASE */}
                <div
                  style={{
                    background: 'var(--card-bg, rgba(255, 255, 255, 0.05))',
                    borderRadius: '16px',
                    border: '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <Sliders size={15} color="#A855F7" />
                    <span style={{ fontSize: '0.82rem', fontWeight: 900, color: 'var(--text-main, #FFFFFF)' }}>
                      Duración de cada fase
                    </span>
                  </div>

                  {/* Fila Estudio */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.78rem', color: isLight ? '#334155' : '#E2E8F0', fontWeight: 600 }}>Estudio</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => setCustomStudyMinutes(Math.max(5, (customStudyMinutes || 25) - 5))}
                        style={{ width: '28px', height: '28px', borderRadius: '8px', background: isLight ? '#E2E8F0' : '#334155', border: 'none', color: isLight ? '#0F172A' : '#FFF', fontWeight: 900, cursor: 'pointer' }}
                      >-</button>
                      <span style={{ minWidth: '46px', textAlign: 'center', fontWeight: 900, fontSize: '0.85rem', color: '#A855F7' }}>
                        {customStudyMinutes || 25} min
                      </span>
                      <button
                        type="button"
                        onClick={() => setCustomStudyMinutes(Math.min(90, (customStudyMinutes || 25) + 5))}
                        style={{ width: '28px', height: '28px', borderRadius: '8px', background: isLight ? '#E2E8F0' : '#334155', border: 'none', color: isLight ? '#0F172A' : '#FFF', fontWeight: 900, cursor: 'pointer' }}
                      >+</button>
                    </div>
                  </div>

                  {/* Fila Descanso Corto */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.78rem', color: isLight ? '#334155' : '#E2E8F0', fontWeight: 600 }}>Descanso corto</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => setCustomShortBreakMinutes(Math.max(1, (customShortBreakMinutes || 5) - 1))}
                        style={{ width: '28px', height: '28px', borderRadius: '8px', background: isLight ? '#E2E8F0' : '#334155', border: 'none', color: isLight ? '#0F172A' : '#FFF', fontWeight: 900, cursor: 'pointer' }}
                      >-</button>
                      <span style={{ minWidth: '46px', textAlign: 'center', fontWeight: 900, fontSize: '0.85rem', color: '#10B981' }}>
                        {customShortBreakMinutes || 5} min
                      </span>
                      <button
                        type="button"
                        onClick={() => setCustomShortBreakMinutes(Math.min(30, (customShortBreakMinutes || 5) + 1))}
                        style={{ width: '28px', height: '28px', borderRadius: '8px', background: isLight ? '#E2E8F0' : '#334155', border: 'none', color: isLight ? '#0F172A' : '#FFF', fontWeight: 900, cursor: 'pointer' }}
                      >+</button>
                    </div>
                  </div>

                  {/* Fila Descanso Largo */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.78rem', color: isLight ? '#334155' : '#E2E8F0', fontWeight: 600 }}>Descanso largo</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => setCustomLongBreakMinutes(Math.max(5, (customLongBreakMinutes || 15) - 5))}
                        style={{ width: '28px', height: '28px', borderRadius: '8px', background: isLight ? '#E2E8F0' : '#334155', border: 'none', color: isLight ? '#0F172A' : '#FFF', fontWeight: 900, cursor: 'pointer' }}
                      >-</button>
                      <span style={{ minWidth: '46px', textAlign: 'center', fontWeight: 900, fontSize: '0.85rem', color: '#38BDF8' }}>
                        {customLongBreakMinutes || 15} min
                      </span>
                      <button
                        type="button"
                        onClick={() => setCustomLongBreakMinutes(Math.min(60, (customLongBreakMinutes || 15) + 5))}
                        style={{ width: '28px', height: '28px', borderRadius: '8px', background: isLight ? '#E2E8F0' : '#334155', border: 'none', color: isLight ? '#0F172A' : '#FFF', fontWeight: 900, cursor: 'pointer' }}
                      >+</button>
                    </div>
                  </div>

                  {/* Bloques por ciclo */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.78rem', color: isLight ? '#334155' : '#E2E8F0', fontWeight: 600 }}>Bloques por ciclo</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => setCustomCyclesBeforeLongBreak(Math.max(2, (customCyclesBeforeLongBreak || 4) - 1))}
                        style={{ width: '28px', height: '28px', borderRadius: '8px', background: isLight ? '#E2E8F0' : '#334155', border: 'none', color: isLight ? '#0F172A' : '#FFF', fontWeight: 900, cursor: 'pointer' }}
                      >-</button>
                      <span style={{ minWidth: '46px', textAlign: 'center', fontWeight: 900, fontSize: '0.85rem', color: '#F59E0B' }}>
                        {customCyclesBeforeLongBreak || 4}
                      </span>
                      <button
                        type="button"
                        onClick={() => setCustomCyclesBeforeLongBreak(Math.min(8, (customCyclesBeforeLongBreak || 4) + 1))}
                        style={{ width: '28px', height: '28px', borderRadius: '8px', background: isLight ? '#E2E8F0' : '#334155', border: 'none', color: isLight ? '#0F172A' : '#FFF', fontWeight: 900, cursor: 'pointer' }}
                      >+</button>
                    </div>
                  </div>
                </div>

                {/* 2. TONOS RELAJANTES DE ALARMA */}
                <div
                  style={{
                    background: 'var(--card-bg, rgba(255, 255, 255, 0.05))',
                    borderRadius: '16px',
                    border: '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Music size={15} color="#10B981" />
                      <span style={{ fontSize: '0.82rem', fontWeight: 900, color: 'var(--text-main, #FFFFFF)' }}>
                        Tono de alarma relajante
                      </span>
                    </div>
                    <span style={{ fontSize: '0.66rem', color: 'var(--text-muted, #94A3B8)' }}>100% gratuito</span>
                  </div>

                  {/* Selector de modo para el sonido */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[
                      { key: 'study', label: 'Fin de Estudio' },
                      { key: 'shortBreak', label: 'Fin de Pausa' }
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setSoundTargetModeKey(tab.key)}
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          borderRadius: '10px',
                          border: soundTargetModeKey === tab.key ? '1.5px solid #A855F7' : '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                          background: soundTargetModeKey === tab.key ? 'rgba(168, 85, 247, 0.25)' : 'var(--card-bg, rgba(255, 255, 255, 0.05))',
                          color: soundTargetModeKey === tab.key ? (isLight ? '#7C3AED' : '#FFFFFF') : 'var(--text-muted, #94A3B8)',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Lista limpia de sonidos relajantes */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px',
                      maxHeight: '160px',
                      overflowY: 'auto',
                      paddingRight: '4px'
                    }}
                  >
                    {SOUND_CATALOG.map((snd) => {
                      const isSelected = targetSoundId === snd.id;
                      const isPreviewing = previewingId === snd.id;
                      return (
                        <div
                          key={snd.id}
                          onClick={() => handleSelectSound(snd.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '6px 10px',
                            borderRadius: '10px',
                            border: isSelected ? '1.5px solid #10B981' : '1px solid var(--card-border, rgba(120, 120, 128, 0.15))',
                            background: isSelected ? 'rgba(16, 185, 129, 0.18)' : 'var(--card-bg, rgba(255, 255, 255, 0.04))',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                            <div style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '8px',
                              background: isSelected ? 'rgba(16, 185, 129, 0.25)' : 'rgba(120, 120, 128, 0.12)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              <Music size={14} color={isSelected ? '#10B981' : '#94A3B8'} />
                            </div>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-main, #FFFFFF)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {snd.name}
                              </div>
                              <div style={{ fontSize: '0.62rem', color: 'var(--text-muted, #94A3B8)' }}>
                                {snd.duration} • Suave
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <button
                              type="button"
                              onClick={(e) => handlePreviewSound(snd.id, e)}
                              style={{
                                padding: '3px 8px',
                                borderRadius: '6px',
                                border: '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                                background: isPreviewing ? '#10B981' : 'var(--card-bg, rgba(255, 255, 255, 0.08))',
                                color: isPreviewing ? '#FFFFFF' : 'var(--text-main, #FFFFFF)',
                                fontSize: '0.66rem',
                                fontWeight: 800,
                                cursor: 'pointer'
                              }}
                            >
                              {isPreviewing ? 'Sonando...' : 'Oír'}
                            </button>
                            {isSelected && <Check size={14} color="#10B981" strokeWidth={3} />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. MODO AUTOMÁTICO SWITCH */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'var(--card-bg, rgba(255, 255, 255, 0.05))',
                    borderRadius: '16px',
                    border: '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                    padding: '10px 14px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Repeat size={16} color="#38BDF8" />
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main, #FFFFFF)' }}>
                        Ciclo continuo automático
                      </div>
                      <div style={{ fontSize: '0.66rem', color: 'var(--text-muted, #94A3B8)' }}>
                        Pasa a descanso al terminar el estudio
                      </div>
                    </div>
                  </div>
                  <label style={{ position: 'relative', display: 'inline-block', width: '38px', height: '22px', cursor: 'pointer' }}>
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
                        background: autoCycle ? '#10B981' : '#64748B',
                        borderRadius: '24px',
                        transition: 'background 0.2s ease'
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          top: '2px',
                          left: autoCycle ? '18px' : '2px',
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: '#FFFFFF',
                          transition: 'left 0.2s ease'
                        }}
                      />
                    </span>
                  </label>
                </div>

                {/* 4. GUÍA RÁPIDA DESPLEGABLE */}
                <div style={{ borderRadius: '14px', border: `1px solid ${isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)'}`, overflow: 'hidden' }}>
                  <button
                    type="button"
                    onClick={() => setShowGuide(!showGuide)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      background: isLight ? 'rgba(0, 0, 0, 0.03)' : 'rgba(15, 23, 42, 0.5)',
                      border: 'none',
                      color: isLight ? '#334155' : '#E2E8F0',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <HelpCircle size={14} color="#F59E0B" />
                      <span>¿Cómo funciona el método Pomodoro?</span>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: isLight ? '#64748B' : '#94A3B8' }}>{showGuide ? '▲' : '▼'}</span>
                  </button>
                  {showGuide && (
                    <div style={{ padding: '10px 12px', background: isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(2, 6, 23, 0.7)', fontSize: '0.72rem', color: isLight ? '#475569' : '#CBD5E1', display: 'flex', flexDirection: 'column', gap: '6px', lineHeight: 1.35 }}>
                      <div><strong>1. Estudio (25 min):</strong> Elige un tema y resuelve preguntas con cero distracciones.</div>
                      <div><strong>2. Descanso corto (5 min):</strong> Desconecta y estira. Tu cerebro afianza lo repasado.</div>
                      <div><strong>3. Descanso largo (15 min):</strong> Al completar 4 bloques, descansa a fondo para evitar el agotamiento.</div>
                    </div>
                  )}
                </div>

                {/* BOTÓN LISTO - VOLVER AL RELOJ */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSettings(false)}
                  style={{
                    padding: '12px',
                    borderRadius: '14px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    boxShadow: '0 4px 0 #047857',
                    color: '#FFFFFF',
                    fontWeight: 900,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Check size={16} strokeWidth={3} />
                  <span>Listo, volver al temporizador</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
};

export default PomodoroModal;
