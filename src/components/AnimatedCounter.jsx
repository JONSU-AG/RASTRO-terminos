import React, { useState, useEffect, useRef } from 'react';

/**
 * AnimatedCounter
 * Rueda los números de 0 al valor objetivo con una curva fluida easeOutExpo.
 * @param {number} value - Número final a mostrar
 * @param {number} duration - Duración en milisegundos (default 1000ms)
 * @param {number} decimals - Cantidad de decimales a redondear
 * @param {string} prefix - Texto antes del número (ej. "+")
 * @param {string} suffix - Texto después del número (ej. " pts", " XP")
 */
export const AnimatedCounter = ({
  value = 0,
  duration = 1000,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  style = {}
}) => {
  const targetVal = typeof value === 'number' ? value : parseFloat(value) || 0;
  const [displayVal, setDisplayVal] = useState(0);
  const frameRef = useRef(null);
  const startTimeRef = useRef(null);
  const startValRef = useRef(0);

  useEffect(() => {
    let isMounted = true;
    startTimeRef.current = null;
    const startVal = startValRef.current;
    const diff = targetVal - startVal;

    // Si no hay diferencia y ya está en targetVal, mantener directamente
    if (diff === 0 && startVal === targetVal) {
      setDisplayVal(targetVal);
      return;
    }

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(1, elapsed / duration);
      const easedProgress = easeOutCubic(progress);
      const current = startVal + diff * easedProgress;

      if (isMounted) {
        setDisplayVal(current);
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        if (isMounted) {
          setDisplayVal(targetVal);
          startValRef.current = targetVal;
        }
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      isMounted = false;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [targetVal, duration]);

  const formatted = decimals > 0
    ? displayVal.toFixed(decimals)
    : Math.round(displayVal).toLocaleString('es-PE');

  return (
    <span className={className} style={{ fontVariantNumeric: 'tabular-nums', ...style }}>
      {prefix}{formatted}{suffix}
    </span>
  );
};

export default AnimatedCounter;

