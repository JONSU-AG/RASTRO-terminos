import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePomodoro } from '../context/PomodoroContext';
import { Play, Pause, X } from 'lucide-react';

/**
 * Temporizador Flotante Pro: "La Bolita"
 * Ultra-compacta, no estorbosa, circular, con anillo de progreso SVG,
 * tiempo en vivo de alta legibilidad y arrastre 100% fluido en cualquier pantalla.
 */
export const PomodoroFloatingPill = () => {
  const {
    isRunning,
    isOpen,
    isMinimized,
    timeLeft,
    activeMode,
    openModal,
    togglePlay,
    closeAndStop,
    progressRatio
  } = usePomodoro();

  const [isHovered, setIsHovered] = useState(false);

  // Si el modal está abierto o no está activo, no se muestra
  if (isOpen || (!isRunning && !isMinimized)) {
    return null;
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Geometría del anillo circular
  const size = 58;
  const strokeWidth = 3.5;
  const center = size / 2;
  const radius = center - strokeWidth - 1; // 24.5px
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - Math.max(0, Math.min(1, progressRatio)));

  return (
    <AnimatePresence>
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.06}
        whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 999999 }}
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 20 }}
        transition={{ type: 'spring', stiffness: 450, damping: 26 }}
        style={{
          position: 'fixed',
          bottom: '92px',
          right: '20px',
          zIndex: 89900,
          cursor: 'grab',
          userSelect: 'none',
          touchAction: 'none'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title="Arrastra para mover a donde quieras • Clic para abrir el temporizador"
      >
        {/* LA BOLITA FLOTANTE CIRCULAR */}
        <div
          onClick={openModal}
          style={{
            position: 'relative',
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.96) 0%, rgba(30, 27, 75, 0.98) 100%)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: `0 10px 28px rgba(0, 0, 0, 0.75), 0 0 18px ${activeMode.color}45`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            cursor: 'pointer',
            transition: 'box-shadow 0.2s ease, transform 0.15s ease'
          }}
        >
          {/* Anillo de progreso SVG alrededor de la bolita */}
          <svg
            width={size}
            height={size}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              transform: 'rotate(-90deg)',
              pointerEvents: 'none'
            }}
          >
            {/* Pista de fondo */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Progreso activo */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke={activeMode.color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              style={{
                filter: `drop-shadow(0 0 4px ${activeMode.color})`,
                transition: 'stroke-dashoffset 0.4s ease'
              }}
            />
          </svg>

          {/* Contenido interior de la bolita: Emoji + Tiempo mm:ss */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              lineHeight: 1
            }}
          >
            <motion.span
              animate={isRunning ? { scale: [1, 1.15, 1] } : { scale: 1 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              style={{ fontSize: '0.85rem', marginBottom: '2px' }}
            >
              {activeMode.iconEmoji || '🧠'}
            </motion.span>
            <span
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                fontSize: '0.68rem',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
              }}
            >
              {formattedTime}
            </span>
          </div>

          {/* Punto de estado pulsante (verde = activo / ámbar = pausado) */}
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isRunning ? '#10B981' : '#F59E0B',
              boxShadow: `0 0 6px ${isRunning ? '#10B981' : '#F59E0B'}`,
              border: '1.5px solid #0F172A',
              zIndex: 3
            }}
          />

          {/* Botón rápido Play/Pausa al pasar el ratón */}
          {isHovered && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                if (typeof navigator !== 'undefined' && navigator.vibrate) {
                  navigator.vibrate(10);
                }
                togglePlay();
              }}
              title={isRunning ? 'Pausar' : 'Reanudar'}
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: isRunning ? '#EF4444' : '#10B981',
                border: '1.5px solid #0F172A',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 4,
                boxShadow: '0 2px 8px rgba(0,0,0,0.6)'
              }}
            >
              {isRunning ? <Pause size={9} fill="#FFF" /> : <Play size={9} fill="#FFF" style={{ marginLeft: '1px' }} />}
            </motion.button>
          )}

          {/* Botón rápido de cerrar (X) al pasar el ratón */}
          {isHovered && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                closeAndStop();
              }}
              title="Cerrar temporizador"
              style={{
                position: 'absolute',
                top: '-5px',
                left: '-5px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.9)',
                border: '1.5px solid #0F172A',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 4,
                boxShadow: '0 2px 6px rgba(0,0,0,0.6)'
              }}
            >
              <X size={10} strokeWidth={3} />
            </motion.button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
