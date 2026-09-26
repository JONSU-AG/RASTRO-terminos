import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Star,
  Copy,
  Check,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  Calculator,
  ChevronDown,
  ChevronUp,
  Zap,
  Layers,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const MnemotecniasVaultView = ({
  mnemonics = [],
  viewMode = 'detallado',
  favorites = [],
  toggleFavorite,
  copiedId,
  handleCopy,
  renderMath,
  SUBJECT_THEMES,
  themePalette = {},
  onGoToFormulas
}) => {
  const isLight = Boolean(themePalette?.isLight);

  // Estados de batching progresivo para máxima fluidez a 60 FPS
  const INITIAL_BATCH = 12;
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);
  const sentinelRef = useRef(null);

  useEffect(() => {
    setVisibleCount(INITIAL_BATCH);
  }, [mnemonics]);

  useEffect(() => {
    if (visibleCount >= mnemonics.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev => Math.min(prev + 12, mnemonics.length));
        }
      },
      { rootMargin: '300px' }
    );
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => observer.disconnect();
  }, [visibleCount, mnemonics.length]);

  const visibleMnemonics = useMemo(() => {
    return mnemonics.slice(0, visibleCount);
  }, [mnemonics, visibleCount]);

  // Estados para widgets interactivos
  const [diositoTapped, setDiositoTapped] = useState('d');
  const [diositoCalc, setDiositoCalc] = useState({ d: '', v: '20', t: '5' });
  const [muyMuchoWord, setMuyMuchoWord] = useState('frío');
  const [customWordInput, setCustomWordInput] = useState('');
  const [cocaStep, setCocaStep] = useState('ambos'); // 'ida' | 'vuelta' | 'ambos'

  // Diccionario de prueba rápida para ¿MUY o MUCHO?
  const NOUN_WORDS = ['frío', 'peligro', 'dinero', 'tiempo', 'árbol', 'esperanza', 'cuaderno', 'miedo', 'verdad', 'paciencia', 'calor', 'casa', 'perro', 'hambre'];
  const ADJ_WORDS = ['inteligente', 'valiente', 'cansada', 'cansado', 'rápido', 'feliz', 'fuerte', 'bello', 'triste', 'ágil', 'lejos', 'tarde'];

  const testWord = (customWordInput || muyMuchoWord).trim().toLowerCase();
  const isLikelyNoun = NOUN_WORDS.includes(testWord) || testWord.endsWith('dad') || testWord.endsWith('ción') || testWord.endsWith('sión') || testWord.endsWith('eza');
  const isLikelyAdj = ADJ_WORDS.includes(testWord) || testWord.endsWith('ble') || testWord.endsWith('oso') || testWord.endsWith('osa') || testWord.endsWith('al') || testWord.endsWith('ivo') || testWord.endsWith('iva');

  // Cálculos de Diosito
  const calcDiositoResult = () => {
    const dVal = parseFloat(diositoCalc.d);
    const vVal = parseFloat(diositoCalc.v);
    const tVal = parseFloat(diositoCalc.t);

    if (diositoTapped === 'd' && !isNaN(vVal) && !isNaN(tVal)) {
      return { val: (vVal * tVal).toFixed(2), unit: 'm', label: 'Distancia (d = v · t)' };
    }
    if (diositoTapped === 'v' && !isNaN(dVal) && !isNaN(tVal) && tVal !== 0) {
      return { val: (dVal / tVal).toFixed(2), unit: 'm/s', label: 'Velocidad (v = d / t)' };
    }
    if (diositoTapped === 't' && !isNaN(dVal) && !isNaN(vVal) && vVal !== 0) {
      return { val: (dVal / vVal).toFixed(2), unit: 's', label: 'Tiempo (t = d / v)' };
    }
    return null;
  };

  const diositoRes = calcDiositoResult();

  if (mnemonics.length === 0) {
    return (
      <div
        style={{
          padding: '60px 20px',
          textAlign: 'center',
          background: isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.8)',
          borderRadius: '24px',
          border: isLight ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(245, 158, 11, 0.2)',
          maxWidth: '520px',
          margin: '30px auto'
        }}
      >
        <AlertTriangle size={36} color="#F59E0B" style={{ margin: '0 auto 12px' }} />
        <h3 style={{ margin: '0 0 6px', fontSize: '1.1rem', color: isLight ? (themePalette?.textPrimary || '#0F172A') : '#F8FAFC' }}>
          {viewMode === 'favoritas' ? 'No tienes mnemotecnias guardadas aún' : 'No se encontraron mnemotecnias'}
        </h3>
        <p style={{ color: isLight ? (themePalette?.textSecondary || '#475569') : '#94A3B8', fontSize: '0.86rem', margin: '0 0 16px', lineHeight: 1.5 }}>
          {viewMode === 'favoritas'
            ? 'Presiona el botón de guardar en cualquier mnemotecnia o fórmula para agregarla a tu colección de repaso rápido.'
            : 'Prueba cambiando los filtros de materia o borrando el texto de búsqueda.'}
        </p>
        {onGoToFormulas && (
          <button
            type="button"
            onClick={onGoToFormulas}
            style={{
              background: 'linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)',
              border: 'none',
              padding: '8px 18px',
              borderRadius: '12px',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            Ver Fórmulas en Cara A ➜
          </button>
        )}
      </div>
    );
  }

  // ==========================================
  // VISTA 1: DETALLADA (TARJETAS MAESTRAS MNEMOTÉCNICAS)
  // ==========================================
  if (viewMode === 'detallado') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {visibleMnemonics.map(mne => {
          const theme = SUBJECT_THEMES[mne.subject] || SUBJECT_THEMES['Todos'];
          const isFav = favorites.includes(mne.id);

          return (
            <motion.div
              key={mne.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="formula-card-print"
              style={{
                background: isLight
                  ? 'rgba(255, 255, 255, 0.95)'
                  : 'linear-gradient(145deg, rgba(15, 23, 42, 0.96) 0%, rgba(10, 15, 30, 0.98) 100%)',
                border: isLight ? '1.5px solid rgba(0, 0, 0, 0.1)' : `1.5px solid ${theme.border}`,
                borderRadius: '24px',
                padding: '22px 24px',
                boxShadow: isLight
                  ? '0 10px 30px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 1)'
                  : '0 12px 36px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Trama decorativa */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `radial-gradient(${theme.primary}10 1px, transparent 1px)`,
                  backgroundSize: '18px 18px',
                  pointerEvents: 'none'
                }}
              />

              {/* HEADER DE LA MNEMOTECNIA */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '10px',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginBottom: '6px' }}>
                    <span
                      style={{
                        padding: '3px 9px',
                        borderRadius: '8px',
                        background: theme.bgBadge,
                        color: theme.primary,
                        fontSize: '0.72rem',
                        fontWeight: 900,
                        textTransform: 'uppercase'
                      }}
                    >
                      {mne.subject}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: isLight ? (themePalette?.textSecondary || '#475569') : '#94A3B8', fontWeight: 700 }}>
                      • {mne.topic}
                    </span>
                    <span
                      style={{
                        fontSize: '0.70rem',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        background: isLight ? 'rgba(217, 119, 6, 0.12)' : 'rgba(245, 158, 11, 0.18)',
                        color: isLight ? '#B45309' : '#FBBF24',
                        fontWeight: 800,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Star size={11} fill="currentColor" />
                      <span>{mne.importance}</span>
                    </span>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        background: isLight ? 'rgba(2, 132, 199, 0.10)' : 'rgba(56, 189, 248, 0.15)',
                        color: isLight ? '#0284C7' : '#38BDF8',
                        fontWeight: 800
                      }}
                    >
                      {mne.category}
                    </span>
                  </div>

                  {/* FRASE MNEMOTÉCNICA EN ORO / ALTO CONTRASTE */}
                  <h2
                    style={{
                      margin: '4px 0 3px',
                      fontSize: 'clamp(1.2rem, 3vw, 1.55rem)',
                      fontWeight: 900,
                      color: isLight ? '#92400E' : '#FDE047',
                      letterSpacing: '-0.01em',
                      textShadow: isLight ? 'none' : '0 0 24px rgba(253, 224, 71, 0.35)'
                    }}
                  >
                    "{mne.phrase}"
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: isLight ? (themePalette?.textSecondary || '#334155') : '#CBD5E1', lineHeight: 1.4 }}>
                    {mne.summary}
                  </p>
                </div>

                {/* BOTONES DE ACCIÓN */}
                <div className="no-print" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(mne.id)}
                    title={isFav ? 'Quitar de guardadas' : 'Guardar mnemotecnia'}
                    style={{
                      background: isFav
                        ? (isLight ? 'rgba(217, 119, 6, 0.15)' : 'rgba(245, 158, 11, 0.2)')
                        : (isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.06)'),
                      border: isFav
                        ? '1px solid #D97706'
                        : (isLight ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid rgba(255, 255, 255, 0.15)'),
                      borderRadius: '10px',
                      padding: '7px 10px',
                      color: isFav
                        ? (isLight ? '#B45309' : '#FBBF24')
                        : (isLight ? '#475569' : '#94A3B8'),
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '0.74rem',
                      fontWeight: 700
                    }}
                  >
                    <Star size={14} fill={isFav ? (isLight ? '#B45309' : '#FBBF24') : 'none'} />
                    <span className="hide-mobile">{isFav ? 'Guardada' : 'Guardar'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(mne.id, `${mne.phrase}: ${mne.shortFormula}`)}
                    title="Copiar fórmula y mnemotecnia"
                    style={{
                      background: copiedId === mne.id
                        ? (isLight ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.2)')
                        : (isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.06)'),
                      border: copiedId === mne.id
                        ? '1px solid #10B981'
                        : (isLight ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid rgba(255, 255, 255, 0.15)'),
                      borderRadius: '10px',
                      padding: '7px 10px',
                      color: copiedId === mne.id
                        ? (isLight ? '#059669' : '#34D399')
                        : (isLight ? '#475569' : '#94A3B8'),
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '0.74rem',
                      fontWeight: 700
                    }}
                  >
                    {copiedId === mne.id ? <Check size={14} color={isLight ? '#059669' : '#34D399'} /> : <Copy size={14} />}
                    <span>{copiedId === mne.id ? '¡Copiada!' : 'Copiar'}</span>
                  </button>
                </div>
              </div>

              {/* VISOR KATEX DE LA FÓRMULA / REGLA */}
              <div
                style={{
                  background: 'rgba(2, 6, 23, 0.92)',
                  border: `1.5px solid ${theme.border}`,
                  borderRadius: '16px',
                  padding: '14px 18px',
                  textAlign: 'center',
                  fontSize: '1.25rem',
                  color: theme.primary,
                  overflowX: 'auto',
                  boxShadow: `0 4px 20px ${theme.glow}, inset 0 0 20px rgba(0, 0, 0, 0.7)`,
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {renderMath(mne.shortFormula, true)}
              </div>

              {/* DESGLOSE LETRA POR LETRA */}
              {mne.breakdown && mne.breakdown.length > 0 && (
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 900,
                      color: isLight ? '#0369A1' : '#38BDF8',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <Sparkles size={13} color={isLight ? '#0369A1' : '#38BDF8'} />
                    <span>DESGLOSE FONÉTICO Y CORRESPONDENCIA DE VARIABLES</span>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '8px'
                    }}
                  >
                    {mne.breakdown.map((bItem, bIdx) => (
                      <div
                        key={bIdx}
                        style={{
                          background: isLight ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.03)',
                          border: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.09)',
                          borderRadius: '12px',
                          padding: '9px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.92rem',
                            fontWeight: 900,
                            color: isLight ? '#92400E' : '#FDE047',
                            background: isLight ? 'rgba(217, 119, 6, 0.15)' : 'rgba(245, 158, 11, 0.2)',
                            border: isLight ? '1px solid rgba(217, 119, 6, 0.35)' : '1px solid rgba(245, 158, 11, 0.4)',
                            padding: '4px 10px',
                            borderRadius: '8px',
                            minWidth: '24px',
                            textAlign: 'center'
                          }}
                        >
                          {bItem.letter}
                        </span>
                        <div>
                          <div style={{ fontSize: '0.78rem', color: isLight ? (themePalette?.textPrimary || '#0F172A') : '#FFFFFF', fontWeight: 800 }}>
                            {bItem.word}
                          </div>
                          <div style={{ fontSize: '0.70rem', color: isLight ? (themePalette?.textSecondary || '#475569') : '#94A3B8' }}>
                            {bItem.concept} • <span style={{ color: isLight ? '#0284C7' : '#38BDF8', fontWeight: 700 }}>{bItem.unit}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* WIDGET INTERACTIVO 1: TRIÁNGULO DE DIOSITO (MRU)        */}
              {/* ======================================================== */}
              {mne.id === 'mne_fis_mru_diosito' && (
                  <div
                    className="no-print"
                    style={{
                      background: isLight ? 'rgba(241, 245, 249, 0.95)' : 'rgba(2, 6, 23, 0.9)',
                      border: isLight ? '1.5px dashed #0284C7' : '1.5px dashed #38BDF8',
                      borderRadius: '16px',
                      padding: '16px',
                      position: 'relative',
                      zIndex: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ fontSize: '0.76rem', fontWeight: 900, color: isLight ? '#0369A1' : '#38BDF8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Lightbulb size={15} color={isLight ? '#0369A1' : '#38BDF8'} />
                        <span>TRIÁNGULO INTERACTIVO DE DIOSITO (Tapa con tu dedo la incógnita):</span>
                      </div>
                      <span style={{ fontSize: '0.68rem', color: isLight ? '#64748B' : '#94A3B8' }}>Tapa lo que quieres despejar</span>
                    </div>

                    {/* BOTONES PARA TAPAR CON EL DEDO */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => setDiositoTapped('d')}
                        style={{
                          padding: '7px 16px',
                          borderRadius: '10px',
                          border: diositoTapped === 'd'
                            ? (isLight ? '2px solid #D97706' : '2px solid #FDE047')
                            : (isLight ? '1px solid #0284C7' : '1px solid #38BDF8'),
                          background: diositoTapped === 'd'
                            ? (isLight ? 'linear-gradient(135deg, #F59E0B, #D97706)' : 'linear-gradient(135deg, #F59E0B, #FDE047)')
                            : (isLight ? 'rgba(2, 132, 199, 0.08)' : 'rgba(56, 189, 248, 0.12)'),
                          color: diositoTapped === 'd' ? (isLight ? '#FFFFFF' : '#0F172A') : (isLight ? '#0284C7' : '#38BDF8'),
                          fontWeight: 900,
                          fontSize: '0.80rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>Tapar D (Distancia)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDiositoTapped('v')}
                        style={{
                          padding: '7px 16px',
                          borderRadius: '10px',
                          border: diositoTapped === 'v'
                            ? (isLight ? '2px solid #D97706' : '2px solid #FDE047')
                            : (isLight ? '1px solid #0284C7' : '1px solid #38BDF8'),
                          background: diositoTapped === 'v'
                            ? (isLight ? 'linear-gradient(135deg, #F59E0B, #D97706)' : 'linear-gradient(135deg, #F59E0B, #FDE047)')
                            : (isLight ? 'rgba(2, 132, 199, 0.08)' : 'rgba(56, 189, 248, 0.12)'),
                          color: diositoTapped === 'v' ? (isLight ? '#FFFFFF' : '#0F172A') : (isLight ? '#0284C7' : '#38BDF8'),
                          fontWeight: 900,
                          fontSize: '0.80rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>Tapar V (Velocidad)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDiositoTapped('t')}
                        style={{
                          padding: '7px 16px',
                          borderRadius: '10px',
                          border: diositoTapped === 't'
                            ? (isLight ? '2px solid #D97706' : '2px solid #FDE047')
                            : (isLight ? '1px solid #0284C7' : '1px solid #38BDF8'),
                          background: diositoTapped === 't'
                            ? (isLight ? 'linear-gradient(135deg, #F59E0B, #D97706)' : 'linear-gradient(135deg, #F59E0B, #FDE047)')
                            : (isLight ? 'rgba(2, 132, 199, 0.08)' : 'rgba(56, 189, 248, 0.12)'),
                          color: diositoTapped === 't' ? (isLight ? '#FFFFFF' : '#0F172A') : (isLight ? '#0284C7' : '#38BDF8'),
                          fontWeight: 900,
                          fontSize: '0.80rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>Tapar T (Tiempo)</span>
                      </button>
                    </div>

                    {/* RESULTADO DEL DESPEJE VISUAL */}
                    <div
                      style={{
                        background: isLight ? 'rgba(2, 132, 199, 0.08)' : 'rgba(56, 189, 248, 0.10)',
                        border: isLight ? '1px solid rgba(2, 132, 199, 0.25)' : '1px solid rgba(56, 189, 248, 0.3)',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        fontSize: '0.86rem',
                        color: isLight ? '#0F172A' : '#E0F2FE',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <Compass size={22} color={isLight ? '#0284C7' : '#38BDF8'} />
                      <div>
                        {diositoTapped === 'd' && (
                          <span>
                            Al tapar <strong style={{ color: isLight ? '#92400E' : '#FDE047' }}>D (arriba)</strong>, abajo te queda V y T juntos:
                            {' '}
                            <strong style={{ color: isLight ? '#0284C7' : '#38BDF8', fontSize: '1.05rem' }}>d = v · t</strong>
                            {' '}(Distancia = Velocidad × Tiempo)
                          </span>
                        )}
                        {diositoTapped === 'v' && (
                          <span>
                            Al tapar <strong style={{ color: isLight ? '#92400E' : '#FDE047' }}>V (abajo izquierda)</strong>, arriba queda D y abajo T:
                            {' '}
                            <strong style={{ color: isLight ? '#0284C7' : '#38BDF8', fontSize: '1.05rem' }}>v = d / t</strong>
                            {' '}(Velocidad = Distancia ÷ Tiempo)
                          </span>
                        )}
                        {diositoTapped === 't' && (
                          <span>
                            Al tapar <strong style={{ color: isLight ? '#92400E' : '#FDE047' }}>T (abajo derecha)</strong>, arriba queda D y abajo V:
                            {' '}
                            <strong style={{ color: isLight ? '#0284C7' : '#38BDF8', fontSize: '1.05rem' }}>t = d / v</strong>
                            {' '}(Tiempo = Distancia ÷ Velocidad)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CALCULADORA RÁPIDA DE DIOSITO */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginTop: '4px' }}>
                      <span style={{ fontSize: '0.72rem', color: isLight ? '#64748B' : '#94A3B8', fontWeight: 800 }}>Valores de prueba:</span>
                      {diositoTapped !== 'd' && (
                        <input
                          type="number"
                          placeholder="Distancia (m)"
                          value={diositoCalc.d}
                          onChange={e => setDiositoCalc({ ...diositoCalc, d: e.target.value })}
                          style={{
                            width: '110px',
                            padding: '6px 10px',
                            borderRadius: '8px',
                            background: isLight ? '#FFFFFF' : 'rgba(15, 23, 42, 0.9)',
                            border: isLight ? '1px solid #CBD5E1' : '1px solid #38BDF8',
                            color: isLight ? '#0F172A' : '#FFF',
                            fontSize: '0.78rem'
                          }}
                        />
                      )}
                      {diositoTapped !== 'v' && (
                        <input
                          type="number"
                          placeholder="Velocidad (m/s)"
                          value={diositoCalc.v}
                          onChange={e => setDiositoCalc({ ...diositoCalc, v: e.target.value })}
                          style={{
                            width: '110px',
                            padding: '6px 10px',
                            borderRadius: '8px',
                            background: isLight ? '#FFFFFF' : 'rgba(15, 23, 42, 0.9)',
                            border: isLight ? '1px solid #CBD5E1' : '1px solid #38BDF8',
                            color: isLight ? '#0F172A' : '#FFF',
                            fontSize: '0.78rem'
                          }}
                        />
                      )}
                      {diositoTapped !== 't' && (
                        <input
                          type="number"
                          placeholder="Tiempo (s)"
                          value={diositoCalc.t}
                          onChange={e => setDiositoCalc({ ...diositoCalc, t: e.target.value })}
                          style={{
                            width: '110px',
                            padding: '6px 10px',
                            borderRadius: '8px',
                            background: isLight ? '#FFFFFF' : 'rgba(15, 23, 42, 0.9)',
                            border: isLight ? '1px solid #CBD5E1' : '1px solid #38BDF8',
                            color: isLight ? '#0F172A' : '#FFF',
                            fontSize: '0.78rem'
                          }}
                        />
                      )}

                      {diositoRes && (
                        <div
                          style={{
                            background: isLight ? 'rgba(217, 119, 6, 0.12)' : 'rgba(253, 224, 71, 0.15)',
                            border: isLight ? '1px solid #D97706' : '1px solid #FBBF24',
                            padding: '4px 12px',
                            borderRadius: '8px',
                            color: isLight ? '#92400E' : '#FDE047',
                            fontWeight: 900,
                            fontSize: '0.80rem'
                          }}
                        >
                          {diositoRes.label} = {diositoRes.val} {diositoRes.unit}
                        </div>
                      )}
                    </div>
                  </div>
                )}

              {/* ======================================================== */}
              {/* WIDGET INTERACTIVO 2: PROBADOR RAE ¿MUY O MUCHO? (LENGUAJE) */}
              {/* ======================================================== */}
              {mne.id === 'mne_len_sustantivo_muy_mucho' && (
                <div
                  className="no-print"
                  style={{
                    background: isLight ? 'rgba(241, 245, 249, 0.95)' : 'rgba(2, 6, 23, 0.9)',
                    border: isLight ? '1.5px dashed #BE185D' : '1.5px dashed #EC4899',
                    borderRadius: '16px',
                    padding: '16px',
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ fontSize: '0.76rem', fontWeight: 900, color: isLight ? '#BE185D' : '#EC4899', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <BookOpen size={15} color={isLight ? '#BE185D' : '#EC4899'} />
                      <span>PROBADOR RAE EN VIVO: ¿MUY O MUCHO? (Prueba Sustantivo vs Adjetivo):</span>
                    </div>
                    <span style={{ fontSize: '0.68rem', color: isLight ? '#9D174D' : '#F472B6' }}>Prueba palabras de admisión</span>
                  </div>

                  {/* CHIPS RÁPIDOS */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {['frío', 'inteligente', 'peligro', 'valiente', 'dinero', 'cansada', 'tiempo', 'árbol'].map(w => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => {
                          setMuyMuchoWord(w);
                          setCustomWordInput('');
                        }}
                        style={{
                          padding: '5px 12px',
                          borderRadius: '8px',
                          border: (!customWordInput && muyMuchoWord === w)
                            ? (isLight ? '1.5px solid #9D174D' : '1.5px solid #EC4899')
                            : (isLight ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)'),
                          background: (!customWordInput && muyMuchoWord === w)
                            ? (isLight ? '#BE185D' : '#EC4899')
                            : (isLight ? 'rgba(190, 24, 93, 0.08)' : 'rgba(236, 72, 153, 0.12)'),
                          color: (!customWordInput && muyMuchoWord === w)
                            ? '#FFFFFF'
                            : (isLight ? '#BE185D' : '#F472B6'),
                          fontWeight: 800,
                          fontSize: '0.76rem',
                          cursor: 'pointer'
                        }}
                      >
                        {w}
                      </button>
                    ))}
                  </div>

                  {/* INPUT LIBRE */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="text"
                      placeholder="O escribe cualquier palabra (ej: paciencia, rápido, calor)..."
                      value={customWordInput}
                      onChange={e => setCustomWordInput(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        borderRadius: '10px',
                        border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(236, 72, 153, 0.4)',
                        background: isLight ? '#FFFFFF' : 'rgba(15, 23, 42, 0.9)',
                        color: isLight ? '#0F172A' : '#FFFFFF',
                        fontSize: '0.80rem'
                      }}
                    />
                  </div>

                  {/* RESULTADO Y EXPLICACIÓN DE LA PRUEBA RAE */}
                  <div
                    style={{
                      background: isLight ? 'rgba(190, 24, 93, 0.06)' : 'rgba(236, 72, 153, 0.1)',
                      border: isLight ? '1px solid rgba(190, 24, 93, 0.2)' : '1px solid rgba(236, 72, 153, 0.3)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      fontSize: '0.84rem',
                      color: isLight ? '#0F172A' : '#FDF2F8'
                    }}
                  >
                    {isLikelyNoun ? (
                      <div>
                        <div style={{ color: isLight ? '#9D174D' : '#F472B6', fontWeight: 900, marginBottom: '4px' }}>
                          Análisis lingüístico para: "{testWord}"
                        </div>
                        <div style={{ color: isLight ? '#B91C1C' : '#F87171' }}>
                          Inválido: ¿"Muy {testWord}"? Los sustantivos nunca admiten "muy".
                        </div>
                        <div style={{ color: isLight ? '#047857' : '#34D399', fontWeight: 800, marginTop: '2px' }}>
                          Correcto: ¿"Mucho/a {testWord}"? Coherente y natural. Admite cuantificador variable.
                        </div>
                        <div style={{ marginTop: '6px', fontWeight: 900, color: isLight ? '#92400E' : '#FDE047', fontSize: '0.90rem' }}>
                          Veredicto RAE: "{testWord}" funciona como SUSTANTIVO.
                        </div>
                      </div>
                    ) : isLikelyAdj ? (
                      <div>
                        <div style={{ color: isLight ? '#9D174D' : '#F472B6', fontWeight: 900, marginBottom: '4px' }}>
                          Análisis lingüístico para: "{testWord}"
                        </div>
                        <div style={{ color: isLight ? '#047857' : '#34D399', fontWeight: 800 }}>
                          Correcto: ¿"Muy {testWord}"? Perfecto y natural. Modifica al adjetivo.
                        </div>
                        <div style={{ color: isLight ? '#B91C1C' : '#F87171', marginTop: '2px' }}>
                          Inválido: ¿"Mucho {testWord}"? No se usa con adjetivos individuales.
                        </div>
                        <div style={{ marginTop: '6px', fontWeight: 900, color: isLight ? '#0369A1' : '#38BDF8', fontSize: '0.90rem' }}>
                          Veredicto RAE: "{testWord}" funciona como ADJETIVO.
                        </div>
                      </div>
                    ) : (
                      <div>
                        <span style={{ color: isLight ? '#9D174D' : '#F472B6', fontWeight: 800 }}>Aplica la regla RAE:</span>
                        <div style={{ marginTop: '3px', color: isLight ? '#334155' : 'inherit' }}>
                          ¿Dices "muy {testWord}" o dices "mucho {testWord}"? Si admite "MUY" es adjetivo/adverbio. Si admite "MUCHO/A/S" es sustantivo.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ACLARACIÓN SOBRE LOS LÍMITES DE "GRANDE(S)" */}
                  <div
                    style={{
                      background: isLight ? 'rgba(217, 119, 6, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                      border: isLight ? '1px solid rgba(217, 119, 6, 0.25)' : '1px solid rgba(245, 158, 11, 0.25)',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      fontSize: '0.78rem',
                      color: isLight ? '#78350F' : '#FEF3C7',
                      lineHeight: 1.45
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <AlertTriangle size={14} color={isLight ? '#B45309' : '#FBBF24'} />
                      <strong style={{ color: isLight ? '#B45309' : '#FBBF24' }}>¿Por qué el truco escolar de "grande(s)" tiene fallas en examen de admisión?</strong>
                    </div>
                    En primaria y secundaria se enseña: <em>"Ponle 'grande' después: si tiene sentido es sustantivo ('casa grande')"</em>. Sin embargo, en exámenes preuniversitarios este truco falla con sustantivos abstractos no dimensionales (<em>"la nada grande"</em>, <em>"el acaso grande"</em>) y con adjetivos sustantivados. La regla oficial de la RAE es tajante: los sustantivos <strong>nunca admiten 'MUY'</strong>.
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* WIDGET INTERACTIVO 3: COCA-COCA HIELITO (TRIGONOMETRÍA) */}
              {/* ======================================================== */}
              {mne.id === 'mne_tri_coca_coca_hielito' && (
                <div
                  className="no-print"
                  style={{
                    background: isLight ? 'rgba(241, 245, 249, 0.95)' : 'rgba(2, 6, 23, 0.9)',
                    border: isLight ? '1.5px dashed #0891B2' : '1.5px dashed #06B6D4',
                    borderRadius: '16px',
                    padding: '16px',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  <div style={{ fontSize: '0.76rem', fontWeight: 900, color: isLight ? '#0891B2' : '#06B6D4', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Zap size={15} color={isLight ? '#0891B2' : '#06B6D4'} />
                    <span>CANCIÓN DE IDA Y VUELTA: LAS 6 RAZONES TRIGONOMÉTRICAS</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '6px' }}>
                    {[
                      { name: 'Seno', num: 'CO', den: 'H', frac: '\\frac{CO}{H}' },
                      { name: 'Coseno', num: 'CA', den: 'H', frac: '\\frac{CA}{H}' },
                      { name: 'Tangente', num: 'CO', den: 'CA', frac: '\\frac{CO}{CA}' },
                      { name: 'Cotangente', num: 'CA', den: 'CO', frac: '\\frac{CA}{CO}' },
                      { name: 'Secante', num: 'H', den: 'CA', frac: '\\frac{H}{CA}' },
                      { name: 'Cosecante', num: 'H', den: 'CO', frac: '\\frac{H}{CO}' }
                    ].map((rz, rIdx) => (
                      <div
                        key={rIdx}
                        style={{
                          background: isLight ? 'rgba(8, 145, 178, 0.08)' : 'rgba(6, 182, 212, 0.1)',
                          border: isLight ? '1px solid rgba(8, 145, 178, 0.25)' : '1px solid rgba(6, 182, 212, 0.3)',
                          borderRadius: '10px',
                          padding: '8px',
                          textAlign: 'center'
                        }}
                      >
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: isLight ? '#0E7490' : '#67E8F9' }}>{rz.name}</div>
                        <div style={{ fontSize: '1rem', color: isLight ? '#0F172A' : '#FFFFFF', margin: '4px 0' }}>{renderMath(rz.frac, false)}</div>
                        <div style={{ fontSize: '0.66rem', color: isLight ? '#92400E' : '#FDE047', fontWeight: 700 }}>{rz.num} / {rz.den}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* EXPLICACIÓN Y FIJA DE ADMISIÓN */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '10px',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                <div
                  style={{
                    background: isLight ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.03)',
                    border: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '14px',
                    padding: '11px 14px'
                  }}
                >
                  <div style={{ fontSize: '0.70rem', fontWeight: 900, color: isLight ? (themePalette?.textSecondary || '#475569') : '#94A3B8', textTransform: 'uppercase', marginBottom: '4px' }}>
                    CÓMO FUNCIONA EL TRUCO
                  </div>
                  <div style={{ fontSize: '0.82rem', color: isLight ? (themePalette?.textPrimary || '#1E293B') : '#CBD5E1', lineHeight: 1.5 }}>
                    {mne.explicacion}
                  </div>
                </div>

                <div
                  style={{
                    background: isLight ? 'rgba(217, 119, 6, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                    border: isLight ? '1px solid rgba(217, 119, 6, 0.25)' : '1px solid rgba(245, 158, 11, 0.3)',
                    borderRadius: '14px',
                    padding: '11px 14px'
                  }}
                >
                  <div style={{ fontSize: '0.70rem', fontWeight: 900, color: isLight ? '#B45309' : '#FBBF24', textTransform: 'uppercase', marginBottom: '4px' }}>
                    LA FIJA DE ADMISIÓN / TRAMPA TÍPICA
                  </div>
                  <div style={{ fontSize: '0.82rem', color: isLight ? '#78350F' : '#FEF3C7', lineHeight: 1.5 }}>
                    {mne.fijaExamen}
                  </div>
                </div>
              </div>

              {/* EJEMPLO RESUELTO EN 10 SEGUNDOS */}
              {mne.ejemplo && (
                <div
                  style={{
                    background: isLight ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.08)',
                    border: isLight ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(16, 185, 129, 0.25)',
                    borderRadius: '14px',
                    padding: '10px 14px',
                    fontSize: '0.82rem',
                    color: isLight ? '#065F46' : '#A7F3D0',
                    lineHeight: 1.45,
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  <strong style={{ color: isLight ? '#047857' : '#34D399' }}>Ejemplo resuelto en 10 segundos: </strong>
                  {mne.ejemplo}
                </div>
              )}
            </motion.div>
          );
        })}

        {visibleCount < mnemonics.length && (
          <div style={{ textAlign: 'center', margin: '20px 0 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div ref={sentinelRef} style={{ height: '10px', width: '100%' }} />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setVisibleCount(prev => Math.min(prev + 12, mnemonics.length))}
                style={{
                  background: isLight ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.08)',
                  border: isLight ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid rgba(255, 255, 255, 0.16)',
                  borderRadius: '12px',
                  padding: '10px 20px',
                  color: isLight ? (themePalette?.textPrimary || '#0F172A') : '#F8FAFC',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Cargar más mnemotecnias ({visibleCount} de {mnemonics.length})
              </button>
              <button
                type="button"
                onClick={() => setVisibleCount(mnemonics.length)}
                style={{
                  background: isLight ? 'rgba(56, 189, 248, 0.12)' : 'rgba(56, 189, 248, 0.18)',
                  border: '1px solid #0284C7',
                  borderRadius: '12px',
                  padding: '10px 20px',
                  color: isLight ? '#0369A1' : '#38BDF8',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Mostrar todas ({mnemonics.length})
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // VISTA 2: FICHA DE BOLSILLO MNEMOTÉCNICA
  // ==========================================
  if (viewMode === 'bolsillo') {
    return (
      <div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(310px, 100%), 1fr))',
            gap: '12px'
          }}
        >
          {visibleMnemonics.map(mne => {
            const theme = SUBJECT_THEMES[mne.subject] || SUBJECT_THEMES['Todos'];
            const isFav = favorites.includes(mne.id);

            return (
              <div
                key={mne.id}
                className="formula-card-print"
                style={{
                  background: isLight ? 'rgba(255, 255, 255, 0.94)' : 'rgba(15, 23, 42, 0.92)',
                  border: isLight ? '1.5px solid rgba(0, 0, 0, 0.1)' : `1.5px solid ${theme.border}`,
                  borderRadius: '16px',
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  boxShadow: isLight ? '0 4px 16px rgba(0, 0, 0, 0.04)' : '0 4px 16px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        fontSize: '0.66rem',
                        fontWeight: 900,
                        padding: '2px 7px',
                        borderRadius: '6px',
                        background: theme.bgBadge,
                        color: theme.primary
                      }}
                    >
                      {mne.subject}
                    </span>
                    <span style={{ fontSize: '0.70rem', color: isLight ? '#B45309' : '#FBBF24', fontWeight: 800 }}>
                      {mne.importance}
                    </span>
                  </div>

                  <div className="no-print" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(mne.id)}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px' }}
                    >
                      <Star size={13} fill={isFav ? '#F59E0B' : 'none'} color={isFav ? '#F59E0B' : '#64748B'} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopy(mne.id, `${mne.phrase}: ${mne.shortFormula}`)}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px', color: copiedId === mne.id ? '#10B981' : '#64748B' }}
                    >
                      {copiedId === mne.id ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>

                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 900, color: isLight ? '#92400E' : '#FDE047' }}>
                  "{mne.phrase}"
                </h4>

                <div
                  style={{
                    background: isLight ? (themePalette?.visorBg || 'rgba(241, 245, 249, 0.96)') : 'rgba(2, 6, 23, 0.85)',
                    border: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : `1px solid ${theme.border}`,
                    borderRadius: '10px',
                    padding: '8px 10px',
                    textAlign: 'center',
                    fontSize: '1.10rem',
                    color: theme.primary,
                    overflowX: 'auto'
                  }}
                >
                  {renderMath(mne.shortFormula, true)}
                </div>

                <div style={{ fontSize: '0.72rem', color: isLight ? (themePalette?.textSecondary || '#475569') : '#E2E8F0', lineHeight: 1.35 }}>
                  <strong style={{ color: isLight ? '#0284C7' : '#38BDF8' }}>Truco: </strong>
                  {mne.summary}
                </div>

                <div style={{ fontSize: '0.70rem', color: isLight ? '#854D0E' : '#FEF3C7', background: isLight ? 'rgba(245, 158, 11, 0.08)' : 'rgba(245, 158, 11, 0.1)', padding: '6px 8px', borderRadius: '8px', border: isLight ? '1px solid rgba(245, 158, 11, 0.2)' : 'none' }}>
                  <strong style={{ color: isLight ? '#B45309' : '#FBBF24' }}>Fija: </strong> {mne.fijaExamen.slice(0, 95)}...
                </div>
              </div>
            );
          })}
        </div>

        {visibleCount < mnemonics.length && (
          <div style={{ textAlign: 'center', margin: '20px 0 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div ref={sentinelRef} style={{ height: '10px', width: '100%' }} />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setVisibleCount(prev => Math.min(prev + 12, mnemonics.length))}
                style={{
                  background: isLight ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.08)',
                  border: isLight ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid rgba(255, 255, 255, 0.16)',
                  borderRadius: '12px',
                  padding: '10px 20px',
                  color: isLight ? (themePalette?.textPrimary || '#0F172A') : '#F8FAFC',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Cargar más fichas ({visibleCount} de {mnemonics.length})
              </button>
              <button
                type="button"
                onClick={() => setVisibleCount(mnemonics.length)}
                style={{
                  background: isLight ? 'rgba(56, 189, 248, 0.12)' : 'rgba(56, 189, 248, 0.18)',
                  border: '1px solid #0284C7',
                  borderRadius: '12px',
                  padding: '10px 20px',
                  color: isLight ? '#0369A1' : '#38BDF8',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Mostrar todas ({mnemonics.length})
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // VISTA 3: FAVORITAS (COLECCIÓN PERSONAL)
  // ==========================================
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div
        style={{
          padding: '12px 18px',
          borderRadius: '14px',
          background: isLight ? 'rgba(245, 158, 11, 0.08)' : 'rgba(245, 158, 11, 0.1)',
          border: isLight ? '1px solid rgba(245, 158, 11, 0.25)' : '1px solid rgba(245, 158, 11, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: isLight ? '#B45309' : '#FDE047',
          fontSize: '0.84rem',
          fontWeight: 700
        }}
      >
        <span>Colección personal de mnemotecnias guardadas ({mnemonics.length})</span>
      </div>

      {mnemonics.map(mne => {
        const theme = SUBJECT_THEMES[mne.subject] || SUBJECT_THEMES['Todos'];
        return (
          <div
            key={mne.id}
            style={{
              background: isLight
                ? 'rgba(255, 255, 255, 0.95)'
                : 'linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(10, 15, 30, 0.98))',
              border: isLight ? '1.5px solid rgba(0, 0, 0, 0.1)' : `1.5px solid ${theme.border}`,
              borderRadius: '20px',
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: isLight ? '0 8px 24px rgba(0, 0, 0, 0.05)' : 'none'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: theme.primary, fontWeight: 900 }}>
                  {mne.subject} • {mne.topic}
                </span>
                <h4 style={{ margin: '2px 0 0', fontSize: '1.25rem', color: isLight ? '#92400E' : '#FDE047', fontWeight: 900 }}>
                  "{mne.phrase}"
                </h4>
              </div>

              <button
                type="button"
                onClick={() => toggleFavorite(mne.id)}
                style={{
                  background: isLight ? 'rgba(245, 158, 11, 0.12)' : 'rgba(245, 158, 11, 0.2)',
                  border: '1px solid #F59E0B',
                  borderRadius: '10px',
                  padding: '6px 12px',
                  color: isLight ? '#B45309' : '#FBBF24',
                  cursor: 'pointer',
                  fontWeight: 800,
                  fontSize: '0.74rem'
                }}
              >
                Quitar
              </button>
            </div>

            <div
              style={{
                background: isLight ? (themePalette?.visorBg || 'rgba(241, 245, 249, 0.96)') : 'rgba(2, 6, 23, 0.9)',
                border: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : `1px solid ${theme.border}`,
                borderRadius: '14px',
                padding: '12px',
                textAlign: 'center',
                fontSize: '1.30rem',
                color: theme.primary,
                overflowX: 'auto'
              }}
            >
              {renderMath(mne.shortFormula, true)}
            </div>

            <div style={{ fontSize: '0.80rem', color: isLight ? '#854D0E' : '#FEF3C7', background: isLight ? 'rgba(245, 158, 11, 0.08)' : 'rgba(245, 158, 11, 0.12)', border: isLight ? '1px solid rgba(245, 158, 11, 0.2)' : '1px solid rgba(245, 158, 11, 0.25)', padding: '8px 12px', borderRadius: '10px' }}>
              <strong style={{ color: isLight ? '#B45309' : '#FBBF24' }}>Mnemotecnia y Fija: </strong> {mne.explicacion}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MnemotecniasVaultView;
