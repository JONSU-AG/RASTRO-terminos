import React, { useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { Sigma, Copy, Check, Sparkles, AlertCircle, BookOpen } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/**
 * Componente de Alta Fidelidad para Visualización de Fórmulas y Teoremas
 * Renderizado con KaTeX (Tipografía matemática oficial Computer Modern / LaTeX)
 * 100% Adaptativo al tema (Light / Dark) y optimizado para evitar espacios vacíos excesivos.
 */
export const FormulaDisplay = ({ formulaData, rawMecanismos, compact = false }) => {
  const [copied, setCopied] = useState(false);
  const themeContext = useTheme ? useTheme() : { isLight: false };
  const isLight = themeContext?.isLight ?? false;

  // Helper para renderizar LaTeX de forma segura
  const renderMath = (latexStr, isDisplay = true) => {
    if (!latexStr) return null;
    try {
      const cleanStr = String(latexStr).trim().replace(/^\$+|\$+$/g, '');
      const html = katex.renderToString(cleanStr, {
        displayMode: isDisplay,
        throwOnError: false
      });
      return <span dangerouslySetInnerHTML={{ __html: html }} />;
    } catch {
      return <code style={{ fontFamily: 'monospace', color: isLight ? '#0284C7' : '#38BDF8' }}>{latexStr}</code>;
    }
  };

  const renderTextWithMath = (text) => {
    if (!text) return null;
    const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g);
    return parts.map((part, index) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        return <span key={index}>{renderMath(part.slice(2, -2), true)}</span>;
      } else if (part.startsWith('$') && part.endsWith('$')) {
        return <span key={index}>{renderMath(part.slice(1, -1), false)}</span>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Si no hay formulaData estructurada, renderizar texto de mecanismos adaptado al tema sin caja negra pesada
  if (!formulaData || !formulaData.formula_latex) {
    if (!rawMecanismos || !rawMecanismos.trim()) return null;
    return (
      <div
        style={{
          background: isLight ? '#F8FAFC' : 'rgba(15, 23, 42, 0.75)',
          border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(245, 158, 11, 0.35)',
          borderLeft: isLight ? '4px solid #0284C7' : '4px solid #F59E0B',
          borderRadius: '12px',
          padding: '10px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}
      >
        <div
          style={{
            fontSize: '0.72rem',
            fontWeight: 900,
            color: isLight ? '#0369A1' : '#FDE047',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Sigma size={14} /> Fundamento Operacional y Teoremas
        </div>
        <div
          style={{
            fontSize: '0.86rem',
            color: isLight ? '#1E293B' : '#E2E8F0',
            lineHeight: 1.5,
            whiteSpace: 'pre-line'
          }}
        >
          {renderTextWithMath(rawMecanismos)}
        </div>
      </div>
    );
  }

  const {
    teorema_nombre,
    formula_latex,
    formula_simple,
    descripcion,
    despejes = [],
    variables = [],
    fija_unsa
  } = formulaData;

  // MODO COMPACTO (Para modales HUD, listas de aprendizaje, sin triple anidación ni espacios muertos)
  if (compact) {
    return (
      <div
        style={{
          background: isLight ? '#FFFFFF' : 'rgba(15, 23, 42, 0.85)',
          border: isLight ? '1.5px solid #E2E8F0' : '1.5px solid rgba(56, 189, 248, 0.25)',
          borderRadius: '14px',
          padding: '10px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          boxShadow: isLight ? '0 2px 6px rgba(0, 0, 0, 0.03)' : '0 4px 14px rgba(0, 0, 0, 0.3)',
          boxSizing: 'border-box'
        }}
      >
        {/* Header compacto con nombre y botón copiar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
            <span
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '6px',
                background: isLight ? 'rgba(2, 132, 199, 0.1)' : 'rgba(56, 189, 248, 0.18)',
                color: isLight ? '#0284C7' : '#38BDF8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Sigma size={13} />
            </span>
            <span
              style={{
                fontSize: '0.84rem',
                fontWeight: 900,
                color: isLight ? '#0F172A' : '#F8FAFC',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {teorema_nombre}
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleCopy(formula_latex || formula_simple)}
            title="Copiar fórmula LaTeX"
            style={{
              background: copied ? 'rgba(16, 185, 129, 0.15)' : (isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.08)'),
              border: 'none',
              borderRadius: '8px',
              padding: '4px 8px',
              color: copied ? '#059669' : (isLight ? '#475569' : '#94A3B8'),
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.70rem',
              fontWeight: 800,
              flexShrink: 0
            }}
          >
            {copied ? <Check size={12} color="#059669" /> : <Copy size={12} />}
            <span>{copied ? 'Copiada' : 'LaTeX'}</span>
          </button>
        </div>

        {/* Pizarra Matemática Compacta y Nítida */}
        <div
          style={{
            background: isLight ? '#F1F5F9' : 'rgba(2, 6, 23, 0.85)',
            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '10px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            minHeight: '44px',
            overflowX: 'auto'
          }}
        >
          <div
            style={{
              fontSize: 'clamp(1.15rem, 3.2vw, 1.40rem)',
              color: isLight ? '#0369A1' : '#38BDF8',
              fontWeight: 700,
              filter: isLight ? 'none' : 'drop-shadow(0 0 6px rgba(56, 189, 248, 0.25))'
            }}
          >
            {renderMath(formula_latex, true)}
          </div>
        </div>

        {/* Descripción concisa si existe */}
        {descripcion && (
          <p style={{ margin: 0, fontSize: '0.78rem', color: isLight ? '#475569' : '#94A3B8', lineHeight: 1.4 }}>
            {descripcion}
          </p>
        )}

        {/* Despejes rápidos en chips horizontales (sin desbordar espacio) */}
        {despejes && despejes.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '2px' }}>
            {despejes.map((d, idx) => (
              <div
                key={idx}
                style={{
                  background: isLight ? 'rgba(168, 85, 247, 0.08)' : 'rgba(168, 85, 247, 0.18)',
                  border: isLight ? '1px solid rgba(168, 85, 247, 0.25)' : '1px solid rgba(168, 85, 247, 0.35)',
                  borderRadius: '8px',
                  padding: '3px 8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.74rem'
                }}
              >
                <span style={{ fontWeight: 800, color: isLight ? '#6B21A8' : '#D8B4FE' }}>{d.nombre}:</span>
                <span style={{ color: isLight ? '#4A044E' : '#F3E8FF' }}>{renderMath(d.latex, false)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // MODO COMPLETO (Para guías de estudio expandidas)
  return (
    <div
      style={{
        background: isLight ? '#FFFFFF' : 'linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 30, 0.98) 100%)',
        border: isLight ? '1.5px solid #E2E8F0' : '1.5px solid rgba(245, 158, 11, 0.4)',
        borderRadius: '16px',
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxShadow: isLight ? '0 4px 14px rgba(0, 0, 0, 0.05)' : '0 8px 30px rgba(0, 0, 0, 0.45)',
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
      {/* Header con Teorema y Botón de Copiar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '10px'
        }}
      >
        <div>
          <div
            style={{
              fontSize: '0.68rem',
              fontWeight: 900,
              color: isLight ? '#D97706' : '#FDE047',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sigma size={13} />
            <span>NIVEL 1 • FÓRMULA O TEOREMA FUNDAMENTAL</span>
          </div>
          <h4
            style={{
              margin: '3px 0 0 0',
              fontSize: '0.96rem',
              fontWeight: 900,
              color: isLight ? '#0F172A' : '#FFFFFF',
              letterSpacing: '-0.01em'
            }}
          >
            {teorema_nombre}
          </h4>
        </div>

        <button
          type="button"
          onClick={() => handleCopy(formula_latex || formula_simple)}
          title="Copiar fórmula en formato LaTeX"
          style={{
            background: copied ? 'rgba(16, 185, 129, 0.15)' : (isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.08)'),
            border: copied ? '1px solid #10B981' : (isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.15)'),
            borderRadius: '9px',
            padding: '5px 9px',
            color: copied ? '#059669' : (isLight ? '#475569' : '#94A3B8'),
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.72rem',
            fontWeight: 800,
            transition: 'all 0.2s ease',
            flexShrink: 0
          }}
        >
          {copied ? <Check size={12} color="#059669" /> : <Copy size={12} />}
          <span>{copied ? '¡Copiada!' : 'LaTeX'}</span>
        </button>
      </div>

      {/* Pizarra Matemática Principal: Fórmula Base Destacada */}
      <div
        style={{
          background: isLight ? '#F1F5F9' : 'rgba(2, 6, 23, 0.90)',
          border: isLight ? '1.5px solid #CBD5E1' : '1.5px solid rgba(56, 189, 248, 0.35)',
          borderRadius: '12px',
          padding: '12px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          boxShadow: isLight ? 'inset 0 1px 3px rgba(0,0,0,0.05)' : '0 4px 20px rgba(56, 189, 248, 0.12)',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            fontSize: 'clamp(1.25rem, 3.4vw, 1.55rem)',
            color: isLight ? '#0369A1' : '#38BDF8',
            margin: '2px 0',
            overflowX: 'auto',
            maxWidth: '100%',
            padding: '2px 0'
          }}
        >
          {renderMath(formula_latex, true)}
        </div>

        {descripcion && (
          <p
            style={{
              margin: '6px 0 0 0',
              fontSize: '0.78rem',
              color: isLight ? '#475569' : '#94A3B8',
              lineHeight: 1.45,
              maxWidth: '92%'
            }}
          >
            {descripcion}
          </p>
        )}
      </div>

      {/* Nivel 2: Casos Operacionales y Despejes Evaluados */}
      {despejes && despejes.length > 0 && (
        <div>
          <div
            style={{
              fontSize: '0.68rem',
              fontWeight: 800,
              color: isLight ? '#7C3AED' : '#C084FC',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={13} color={isLight ? '#7C3AED' : '#C084FC'} />
            <span>NIVEL 2 • DESPEJES OPERACIONALES CLAVE</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '6px'
            }}
          >
            {despejes.map((despeje, idx) => (
              <div
                key={idx}
                style={{
                  background: isLight ? 'rgba(168, 85, 247, 0.06)' : 'rgba(255, 255, 255, 0.04)',
                  border: isLight ? '1px solid rgba(168, 85, 247, 0.2)' : '1px solid rgba(192, 132, 252, 0.25)',
                  borderRadius: '9px',
                  padding: '8px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3px'
                }}
              >
                <div style={{ fontSize: '0.72rem', color: isLight ? '#581C87' : '#E2E8F0', fontWeight: 800 }}>
                  {despeje.nombre}
                </div>
                <div
                  style={{
                    fontSize: '0.94rem',
                    color: isLight ? '#7E22CE' : '#E9D5FF',
                    overflowX: 'auto'
                  }}
                >
                  {renderMath(despeje.latex, false)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nivel 3: Glosario de Variables y Unidades S.I. */}
      {variables && variables.length > 0 && (
        <div>
          <div
            style={{
              fontSize: '0.68rem',
              fontWeight: 800,
              color: isLight ? '#059669' : '#34D399',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <BookOpen size={13} color={isLight ? '#059669' : '#34D399'} />
            <span>NIVEL 3 • NOMENCLATURA DE VARIABLES (S.I.)</span>
          </div>

          <div
            style={{
              background: isLight ? 'rgba(16, 185, 129, 0.05)' : 'rgba(16, 185, 129, 0.06)',
              border: isLight ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(16, 185, 129, 0.22)',
              borderRadius: '10px',
              padding: '8px 12px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '6px'
            }}
          >
            {variables.map((v, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '6px',
                  fontSize: '0.76rem'
                }}
              >
                <span
                  style={{
                    fontFamily: "'KaTeX_Math', 'Cambria Math', 'Times New Roman', serif",
                    fontWeight: 900,
                    color: isLight ? '#047857' : '#6EE7B7',
                    fontSize: '0.90rem'
                  }}
                >
                  {renderMath(v.simbolo, false)}:
                </span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: isLight ? '#1E293B' : '#F1F5F9', fontWeight: 700 }}>{v.nombre}</span>
                  <span style={{ color: isLight ? '#64748B' : '#94A3B8', fontSize: '0.68rem' }}>{v.unidad}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nivel 4: Clave Fija de Admisión */}
      {fija_unsa && (
        <div
          style={{
            background: isLight ? '#FEF2F2' : 'rgba(239, 68, 68, 0.12)',
            border: isLight ? '1.5px solid #FECDD3' : '1.5px solid rgba(239, 68, 68, 0.35)',
            borderRadius: '10px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px'
          }}
        >
          <AlertCircle size={15} color="#EF4444" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div
              style={{
                fontSize: '0.66rem',
                fontWeight: 900,
                color: '#DC2626',
                textTransform: 'uppercase',
                marginBottom: '2px'
              }}
            >
              CLAVE FIJA ESENCIAL
            </div>
            <div style={{ fontSize: '0.78rem', color: isLight ? '#991B1B' : '#FEE2E2', lineHeight: 1.45, fontWeight: 600 }}>
              {fija_unsa}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormulaDisplay;
