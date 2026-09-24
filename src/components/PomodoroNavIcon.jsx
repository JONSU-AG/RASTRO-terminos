import React from 'react';
import { motion } from 'framer-motion';

/**
 * PomodoroNavIcon - Custom SVG Icon for Pomodoro Timer in Navigation
 * Stylized Tomato Timer with graduation tick marks, top stem & leaf.
 */
export const PomodoroNavIcon = ({ size = 20, active = false, isRunning = false, className = '' }) => {
  return (
    <div
      className={`pomodoro-nav-icon ${className}`}
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={isRunning ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="pomodoroGrad" x1="2" y1="5" x2="22" y2="21" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
          <linearGradient id="pomodoroLeafGrad" x1="12" y1="1" x2="16" y2="6" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Glow halo when running */}
        {isRunning && (
          <circle
            cx="12"
            cy="13"
            r="10"
            fill="#EF4444"
            opacity="0.25"
            className="animate-pulse"
          />
        )}

        {/* Hoja / Tallo superior */}
        <path
          d="M12 2C12.5 3.5 13.8 4.8 15.5 5C14 5.8 12.5 5.5 12 5C11.5 5.5 10 5.8 8.5 5C10.2 4.8 11.5 3.5 12 2Z"
          fill="url(#pomodoroLeafGrad)"
        />
        <path
          d="M12 2.5V5"
          stroke="#059669"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Cuerpo del Tomate / Timer */}
        <path
          d="M12 5.5C6.5 5.5 3 9 3 13.5C3 18 6.8 21 12 21C17.2 21 21 18 21 13.5C21 9 17.5 5.5 12 5.5Z"
          fill="url(#pomodoroGrad)"
          stroke={active ? '#FFFFFF' : '#B91C1C'}
          strokeWidth="1.2"
        />

        {/* Graduación del dial (marcas 5, 10, 15, 20, 25) */}
        <line x1="12" y1="8" x2="12" y2="9.8" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
        <line x1="16" y1="9.8" x2="14.8" y2="10.8" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.75" />
        <line x1="17.5" y1="13.5" x2="16" y2="13.5" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.75" />
        <line x1="8" y1="9.8" x2="9.2" y2="10.8" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.75" />
        <line x1="6.5" y1="13.5" x2="8" y2="13.5" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.75" />

        {/* Aguja / Puntero central */}
        <circle cx="12" cy="13.5" r="1.8" fill="#FFFFFF" />
        <motion.line
          x1="12"
          y1="13.5"
          x2="12"
          y2="10"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          strokeLinecap="round"
          animate={isRunning ? { rotate: 360 } : { rotate: 0 }}
          transition={isRunning ? { repeat: Infinity, duration: 12, ease: 'linear' } : {}}
          style={{ originX: '12px', originY: '13.5px' }}
        />
      </motion.svg>

      {/* Punto activo si está corriendo */}
      {isRunning && (
        <span
          style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#10B981',
            boxShadow: '0 0 6px #10B981'
          }}
        />
      )}
    </div>
  );
};
