import React from 'react';
import { motion } from 'framer-motion';

/**
 * DuolingoFlameIcon - SVG de Fuego Vectorial Limpio SIN FONDO
 * - Totalmente transparente y sin fondos pesados, idéntico al estilo de los demás íconos de navegación (Home, BookOpen, Trophy, etc.).
 * - Trazo limpio con animación fluida y sutil de llama.
 * - Adopta el color del estado activo/inactivo (currentColor / #FFFFFF).
 */
export const DuolingoFlameIcon = ({
  size = 20,
  active = false,
  animated = true,
  color,
  className = '',
  style = {}
}) => {
  const isCustomColor = Boolean(color);
  const strokeColor = isCustomColor ? color : "url(#flameGrad)";
  const innerStrokeColor = isCustomColor ? color : "#F59E0B";
  const mainFill = isCustomColor ? 'transparent' : 'rgba(239, 68, 68, 0.2)';
  const innerFill = isCustomColor ? 'transparent' : 'rgba(245, 158, 11, 0.3)';

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        background: 'transparent',
        ...style
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          overflow: 'visible',
          background: 'transparent'
        }}
      >
        <defs>
          <linearGradient id="flameGrad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
        </defs>
        {/* Llama exterior fluida estilo vector outline limpio con gradiente y relleno suave */}
        <motion.path
          d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
          stroke={strokeColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={mainFill}
          animate={animated ? {
            scaleY: [1, 1.025, 0.985, 1],
            scaleX: [1, 0.985, 1.02, 1],
            rotate: [0, 0.8, -0.8, 0]
          } : {}}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{ transformOrigin: '12px 20px' }}
        />

        {/* Pequeño detalle interior sutil */}
        <motion.path
          d="M12 18a2 2 0 0 0 2-2c0-.8-.4-1.3-.8-1.8-.7-.9-.4-1.8.4-2.7a3.5 3.5 0 0 1 1 2.2c0 1.5-.9 2.8-2.6 3.3"
          stroke={innerStrokeColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={innerFill}
          animate={animated ? {
            opacity: [0.75, 1, 0.75],
            scale: [0.96, 1.04, 0.96]
          } : {}}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{ transformOrigin: '12px 18px' }}
        />
      </svg>
    </div>
  );
};
