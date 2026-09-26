import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePomodoro } from '../context/PomodoroContext';
import { useTheme } from '../context/ThemeContext';
import { Maximize2, Brain, Coffee, Sparkles, X, ArrowLeftRight } from 'lucide-react';
import { PlayPauseMorph } from './common/MorphIcon';

/**
 * Píldora de Pomodoro Flotante Exclusiva en Bordes Laterales (Screen Recorder Style)
 * - Anclada estrictamente a los bordes laterales (izquierdo o derecho).
 * - Movimiento vertical seguro a lo largo del borde (drag="y") delimitado entre el header y la barra inferior.
 * - Siempre visible al minimizar el modal de Pomodoro, sin saltos fuera de la pantalla.
 * - Cero emojis (iconos SVG de lucide-react).
 */
export const PomodoroFloatingPill = () => {
  const {
    isRunning,
    isOpen,
    isMinimized,
    timeLeft,
    activeModeKey,
    activeMode,
    openModal,
    togglePlay,
    addSeconds,
    closeAndStop
  } = usePomodoro();

  const { isLight } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [dockSide, setDockSide] = useState(() => {
    try {
      return localStorage.getItem('rastro_pomodoro_dock_side') || 'right';
    } catch {
      return 'right';
    }
  });

  // Posición vertical segura (por defecto a 140px desde arriba)
  const [pillY, setPillY] = useState(() => {
    try {
      const saved = Number(localStorage.getItem('rastro_pomodoro_y'));
      return (!isNaN(saved) && saved >= 76) ? saved : 140;
    } catch {
      return 140;
    }
  });

  const pillRef = useRef(null);
  const isDraggingRef = useRef(false);

  // Si el modal está abierto o el temporizador no está corriendo ni minimizado, no se muestra
  const shouldShow = !isOpen && (isRunning || isMinimized);

  // Persistir configuración en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rastro_pomodoro_dock_side', dockSide);
      localStorage.setItem('rastro_pomodoro_y', String(pillY));
    } catch {}
  }, [dockSide, pillY]);

  // Cerrar expansión si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pillRef.current && !pillRef.current.contains(e.target)) {
        setIsExpanded(false);
      }
    };
    if (isExpanded) {
      document.addEventListener('pointerdown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [isExpanded]);

  // Formato mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const modeColor = activeMode?.color || '#A855F7';
  const ModeIcon = activeModeKey === 'shortBreak' 
    ? Coffee 
    : activeModeKey === 'longBreak' 
      ? Sparkles 
      : Brain;

  const modeLabel = activeModeKey === 'shortBreak' 
    ? 'Descanso' 
    : activeModeKey === 'longBreak' 
      ? 'Pausa' 
      : 'Estudio';

  // Alternar lado entre izquierda y derecha
  const toggleDockSide = (e) => {
    if (e) e.stopPropagation();
    setDockSide(prev => (prev === 'right' ? 'left' : 'right'));
  };

  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleDragEnd = (_e, info) => {
    if (typeof window === 'undefined') return;
    const screenH = window.innerHeight;
    const minY = 64;                           // respetar navbar superior
    const maxY = Math.max(minY, screenH - 80); // respetar navbar inferior
    const newY = Math.max(minY, Math.min(pillY + info.offset.y, maxY));
    setPillY(newY);

    // Cambio de borde si arrastró horizontalmente con fuerza
    if (Math.abs(info.offset.x) > 60) {
      if (dockSide === 'right' && info.offset.x < -60) {
        setDockSide('left');
      } else if (dockSide === 'left' && info.offset.x > 60) {
        setDockSide('right');
      }
    }

    setTimeout(() => {
      isDraggingRef.current = false;
    }, 100);
  };

  const handlePillClick = () => {
    if (isDraggingRef.current) return;
    setIsExpanded(prev => !prev);
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          key="pomodoro-floating-pill"
          ref={pillRef}
          initial={{ opacity: 0, x: dockSide === 'right' ? 40 : -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dockSide === 'right' ? 40 : -40 }}
          transition={{ type: 'spring', stiffness: 420, damping: 30 }}
          drag="y"
          dragMomentum={false}
          dragElastic={0}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{
            position: 'fixed',
            top: `${pillY}px`,
            // Semi-oculta cuando compacta: asoma solo el borde redondeado
            // Se desliza a 8px visible cuando está expandida
            [dockSide === 'right' ? 'right' : 'left']: isExpanded ? '8px' : '-22px',
            transition: 'right 0.22s ease, left 0.22s ease',
            zIndex: 99990,
            userSelect: 'none',
            touchAction: 'none'
          }}
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            style={{
              background: 'var(--card-bg, #0F172A)',
              backdropFilter: 'blur(24px) saturate(190%)',
              WebkitBackdropFilter: 'blur(24px) saturate(190%)',
              borderRadius: '999px',
              border: `1.5px solid ${modeColor}88`,
              boxShadow: `0 8px 24px rgba(0, 0, 0, ${isLight ? '0.14' : '0.55'}), 0 0 14px ${modeColor}40`,
              color: 'var(--text-main, #FFFFFF)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              boxSizing: 'border-box'
            }}
            onClick={handlePillClick}
          >
            {/* ESTADO 1: PÍLDORA LATERAL COMPACTA — solo MM:SS, sin iconos SVG */}
            {!isExpanded ? (
              <motion.div
                layout="position"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '5px 10px',
                  height: '34px',
                  boxSizing: 'border-box'
                }}
                title="Toca para expandir controles de Pomodoro"
              >
                {/* Solo el tiempo — cero SVG, cero punto pulsante */}
                <span
                  style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: '0.78rem',
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                    color: modeColor,
                    lineHeight: 1
                  }}
                >
                  {formattedTime}
                </span>
              </motion.div>
            ) : (
              /* ESTADO 2: PÍLDORA EXPANDIDA (CONTROLES RÁPIDOS) */
              <motion.div
                layout="position"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.16 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 10px 6px 14px',
                  height: '44px',
                  boxSizing: 'border-box'
                }}
              >
                {/* Modo y Tiempo */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginRight: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ModeIcon size={12} color={modeColor} strokeWidth={2.5} />
                    <span
                      style={{
                        fontSize: '0.64rem',
                        fontWeight: 900,
                        color: modeColor,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em'
                      }}
                    >
                      {modeLabel}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      fontSize: '0.92rem',
                      fontWeight: 900,
                      letterSpacing: '-0.02em',
                      color: 'var(--text-main, currentColor)',
                      lineHeight: 1
                    }}
                  >
                    {formattedTime}
                  </span>
                </div>

                {/* Botón Play / Pausa */}
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  title={isRunning ? 'Pausar' : 'Iniciar'}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: isRunning ? 'rgba(239, 68, 68, 0.2)' : `${modeColor}30`,
                    border: isRunning ? '1px solid #EF4444' : `1px solid ${modeColor}`,
                    color: isRunning ? '#EF4444' : modeColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <PlayPauseMorph isPlaying={isRunning} size={14} color="currentColor" spring="bouncy" />
                </motion.button>

                {/* Botón +5 min */}
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addSeconds(300);
                  }}
                  title="Sumar 5 minutos"
                  style={{
                    padding: '4px 8px',
                    borderRadius: '8px',
                    background: 'rgba(120, 120, 128, 0.12)',
                    border: '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                    color: 'var(--text-main, currentColor)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  +5m
                </motion.button>

                {/* Botón Cambiar de Borde Lateral (Izquierda / Derecha) */}
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  type="button"
                  onClick={toggleDockSide}
                  title={dockSide === 'right' ? 'Mover al borde izquierdo' : 'Mover al borde derecho'}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: 'rgba(120, 120, 128, 0.12)',
                    border: '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                    color: 'var(--text-secondary, currentColor)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <ArrowLeftRight size={12} />
                </motion.button>

                {/* Botón Abrir Reloj Completo */}
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                    openModal();
                  }}
                  title="Abrir temporizador completo"
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: 'rgba(120, 120, 128, 0.12)',
                    border: '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                    color: 'var(--text-secondary, currentColor)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Maximize2 size={12} />
                </motion.button>

                {/* Botón Detener / Cerrar */}
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeAndStop();
                  }}
                  title="Detener y cerrar Pomodoro"
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.35)',
                    color: '#EF4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <X size={13} />
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PomodoroFloatingPill;
