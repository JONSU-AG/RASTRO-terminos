import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  BookOpen,
  Lightbulb,
  Rocket,
  Atom,
  Quote,
  Star,
  CheckCircle2,
  Bookmark,
  Zap
} from 'lucide-react';

/**
 * Componente estilo Apunte Digital GoodNotes para presentar la teoría de CEPREUNSA
 * con alta jerarquía visual, marcatextos pastel, micro-ilustraciones SVG,
 * y diagramación estética que invita a la lectura en vez de muros de texto aburridos.
 */

// Paleta de marcatextos tipo Stabilo pastel para GoodNotes
const HIGHLIGHTER_COLORS = {
  yellow: { bg: 'rgba(254, 240, 138, 0.45)', border: '#FDE047', text: '#854D0E', darkBg: 'rgba(234, 179, 8, 0.22)', darkText: '#FEF08A' },
  mint: { bg: 'rgba(187, 247, 208, 0.45)', border: '#86EFAC', text: '#166534', darkBg: 'rgba(34, 197, 94, 0.22)', darkText: '#BBF7D0' },
  lavender: { bg: 'rgba(233, 213, 255, 0.45)', border: '#D8B4FE', text: '#6B21A8', darkBg: 'rgba(168, 85, 247, 0.22)', darkText: '#E9D5FF' },
  coral: { bg: 'rgba(254, 215, 170, 0.45)', border: '#FDBA74', text: '#9A3412', darkBg: 'rgba(249, 115, 22, 0.22)', darkText: '#FED7AA' },
  sky: { bg: 'rgba(186, 230, 253, 0.45)', border: '#7DD3FC', text: '#075985', darkBg: 'rgba(14, 165, 233, 0.22)', darkText: '#BAE6FD' }
};

// Cintas adhesivas (washi tape) de colores pastel para la esquina superior
const WASHI_TAPES = [
  'linear-gradient(135deg, rgba(253, 224, 71, 0.75) 0%, rgba(250, 204, 21, 0.75) 100%)',
  'linear-gradient(135deg, rgba(167, 243, 208, 0.75) 0%, rgba(110, 231, 183, 0.75) 100%)',
  'linear-gradient(135deg, rgba(221, 214, 254, 0.75) 0%, rgba(196, 181, 253, 0.75) 100%)',
  'linear-gradient(135deg, rgba(254, 202, 202, 0.75) 0%, rgba(252, 165, 165, 0.75) 100%)'
];

export const GoodNotesTheoryView = ({
  rawText,
  title,
  subtitle,
  fontSizeLevel = 1,
  fontSizes = ['0.86rem', '0.96rem', '1.08rem'],
  lineHeights = [1.6, 1.72, 1.85],
  isLight = true
}) => {
  // Parseamos el texto en bloques lógicos: títulos, listas, citas latinas, postulados y párrafos destacados
  const parsedBlocks = useMemo(() => {
    if (!rawText) return [];

    const cleanedRawText = (rawText || '')
      .replace(/FUNDAMENTACIÓN TEÓRICA OFICIAL CEPREUNSA/gi, 'FUNDAMENTACIÓN TEÓRICA OFICIAL')
      .replace(/de la Universidad Nacional de San Agustín\s*\((?:UNSA|CEPREUNSA)\)/gi, 'de preparación universitaria integral')
      .replace(/Universidad Nacional de San Agustín/gi, 'evaluación universitaria')
      .replace(/\bCEPREUNSA\b/gi, 'OFICIAL')
      .replace(/\bUNSA\b/gi, 'GENERAL');

    const lines = cleanedRawText.split('\n');
    const blocks = [];
    let currentParagraph = [];

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ').trim();
        if (text) {
          blocks.push({ type: 'paragraph', content: text });
        }
        currentParagraph = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) {
        flushParagraph();
        continue;
      }

      // 1. Detectar títulos o subtítulos numéricos o temáticos
      // Ej: "1. TEORÍA DE LA GENERACIÓN ESPONTÁNEA", "A. EXPERIMENTO DE REDI", "POSTULADOS:", etc.
      const isTitle = /^(\d+[\.\)]|[A-Z][\.\)]|[IVXLCDM]+[\.\)])\s+/i.test(line) ||
        (/^[A-ZÁÉÍÓÚÑ\s]{4,}:?$/.test(line) && line.length < 50) ||
        (/^(TEORÍA|CONCEPTO|DEFINICIÓN|EXPERIMENTO|LEYES|POSTULADOS|CARACTERÍSTICAS|MÉTODO|CLASIFICACIÓN|EJEMPLO)/i.test(line) && line.length < 65);

      if (isTitle) {
        flushParagraph();
        blocks.push({
          type: 'subheading',
          content: line.replace(/^[\*\#\-\s]+/, '')
        });
        continue;
      }

      // 2. Detectar viñetas o listas
      const isBullet = /^[\-\*•–]\s+/.test(line) || /^\([a-z0-9]\)\s+/i.test(line);
      if (isBullet) {
        flushParagraph();
        blocks.push({
          type: 'bullet',
          content: line.replace(/^([\-\*•–]|\([a-z0-9]\))\s+/, '')
        });
        continue;
      }

      // 3. Detectar citas textuales o frases latinas entre comillas
      // Ej: «Omne vivum ex vivo», "La vida surge sólo de la vida preexistente"
      const isQuote = /^[«"“].+[»"”]$/.test(line) || /«.+»/.test(line);
      if (isQuote && line.length < 160) {
        flushParagraph();
        blocks.push({
          type: 'quote',
          content: line
        });
        continue;
      }

      // Acumular a párrafo normal
      currentParagraph.push(line);
    }

    flushParagraph();
    return blocks;
  }, [rawText]);

  // Resaltado estilizado de palabras clave (autores, fechas, postulados clave)
  const renderHighlightedContent = (text) => {
    // Expresión regular para capturar autores célebres, años y conceptos clave
    const keywordsRegex = /\b(Francesco Redi|Louis Pasteur|Lazzaro Spallanzani|John Needham|Alexander Oparin|Stanley Miller|Harold Urey|Aristóteles|Van Helmont|Svante Arrhenius|Charles Darwin|Gregor Mendel|Isaac Newton|Albert Einstein|Antoine Lavoisier|Dmitri Mendeléyev)\b|\b(1[4-9]\d{2}|20\d{2})\b|«([^»]+)»|(\b[A-ZÁÉÍÓÚÑ]{4,}\b)/g;

    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = keywordsRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      const matchedText = match[0];
      const isAuthor = Boolean(match[1]);
      const isYear = Boolean(match[2]);
      const isLatinQuote = Boolean(match[3]);

      if (isAuthor) {
        parts.push(
          <span
            key={match.index}
            style={{
              background: isLight ? HIGHLIGHTER_COLORS.mint.bg : HIGHLIGHTER_COLORS.mint.darkBg,
              color: isLight ? HIGHLIGHTER_COLORS.mint.text : HIGHLIGHTER_COLORS.mint.darkText,
              borderBottom: `2px solid ${HIGHLIGHTER_COLORS.mint.border}`,
              padding: '1px 5px',
              borderRadius: '6px',
              fontWeight: 800,
              display: 'inline-block'
            }}
          >
            👤 {matchedText}
          </span>
        );
      } else if (isYear) {
        parts.push(
          <span
            key={match.index}
            style={{
              background: isLight ? HIGHLIGHTER_COLORS.sky.bg : HIGHLIGHTER_COLORS.sky.darkBg,
              color: isLight ? HIGHLIGHTER_COLORS.sky.text : HIGHLIGHTER_COLORS.sky.darkText,
              borderBottom: `2px solid ${HIGHLIGHTER_COLORS.sky.border}`,
              padding: '1px 6px',
              borderRadius: '6px',
              fontWeight: 900,
              fontSize: '0.88em',
              display: 'inline-block'
            }}
          >
            🗓️ {matchedText}
          </span>
        );
      } else if (isLatinQuote) {
        parts.push(
          <span
            key={match.index}
            style={{
              background: isLight ? HIGHLIGHTER_COLORS.yellow.bg : HIGHLIGHTER_COLORS.yellow.darkBg,
              color: isLight ? HIGHLIGHTER_COLORS.yellow.text : HIGHLIGHTER_COLORS.yellow.darkText,
              borderBottom: `2px solid ${HIGHLIGHTER_COLORS.yellow.border}`,
              padding: '2px 8px',
              borderRadius: '6px',
              fontWeight: 800,
              fontStyle: 'italic',
              display: 'inline-block'
            }}
          >
            «{match[3]}»
          </span>
        );
      } else {
        // Palabra en mayúsculas destacada
        parts.push(
          <span
            key={match.index}
            style={{
              background: isLight ? HIGHLIGHTER_COLORS.lavender.bg : HIGHLIGHTER_COLORS.lavender.darkBg,
              color: isLight ? HIGHLIGHTER_COLORS.lavender.text : HIGHLIGHTER_COLORS.lavender.darkText,
              padding: '1px 5px',
              borderRadius: '6px',
              fontWeight: 800,
              display: 'inline-block'
            }}
          >
            {matchedText}
          </span>
        );
      }

      lastIndex = match.index + matchedText.length;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  const currentFontSize = fontSizes[fontSizeLevel] || '0.96rem';
  const currentLineHeight = lineHeights[fontSizeLevel] || 1.72;

  return (
    <div
      className="goodnotes-notebook-card"
      style={{
        position: 'relative',
        background: isLight ? '#FFFFFF' : '#1E293B',
        borderRadius: '24px',
        border: isLight ? '1.5px solid #E2E8F0' : '1.5px solid rgba(255, 255, 255, 0.12)',
        borderBottom: isLight ? '4px solid #CBD5E1' : '4px solid #0F172A',
        boxShadow: isLight
          ? '0 10px 30px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.03)'
          : '0 12px 36px rgba(0, 0, 0, 0.35)',
        padding: '28px 22px 24px',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* Cinta Adhesiva Decorativa (Washi Tape) estilo GoodNotes en esquina superior derecha */}
      <div
        style={{
          position: 'absolute',
          top: '-8px',
          right: '28px',
          width: '84px',
          height: '24px',
          background: WASHI_TAPES[0],
          transform: 'rotate(-3deg)',
          borderRadius: '2px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.12)',
          opacity: 0.9,
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      {/* Micro-ilustraciones SVG en las esquinas */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '18px',
          display: 'flex',
          gap: '6px',
          opacity: 0.65,
          pointerEvents: 'none'
        }}
      >
        <motion.div
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles size={16} color={isLight ? '#F59E0B' : '#FDE047'} />
        </motion.div>
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <Rocket size={16} color={isLight ? '#3B82F6' : '#60A5FA'} />
        </motion.div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '18px',
          display: 'flex',
          gap: '6px',
          opacity: 0.4,
          pointerEvents: 'none'
        }}
      >
        <Atom size={20} color={isLight ? '#8B5CF6' : '#A78BFA'} />
      </div>

      {/* Encabezado del Apunte */}
      <div style={{ marginBottom: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              background: isLight ? 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)' : 'rgba(99, 102, 241, 0.2)',
              border: isLight ? '1px solid #C7D2FE' : '1px solid rgba(99, 102, 241, 0.4)',
              color: isLight ? '#4338CA' : '#A5B4FC',
              fontSize: '0.72rem',
              fontWeight: 900,
              padding: '3px 10px',
              borderRadius: '10px',
              letterSpacing: '0.04em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <BookOpen size={12} />
            APUNTE MAESTRO DE ESTUDIO
          </span>

          <span
            style={{
              background: isLight ? '#FEF3C7' : 'rgba(245, 158, 11, 0.2)',
              border: isLight ? '1px solid #FDE68A' : '1px solid rgba(245, 158, 11, 0.35)',
              color: isLight ? '#B45309' : '#FDE047',
              fontSize: '0.70rem',
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Star size={11} fill="currentColor" />
            Conceptos Clave
          </span>
        </div>

        {title && (
          <h2
            style={{
              margin: 0,
              fontSize: '1.28rem',
              fontWeight: 900,
              color: isLight ? '#0F172A' : '#F8FAFC',
              lineHeight: 1.3,
              letterSpacing: '-0.01em'
            }}
          >
            {title}
          </h2>
        )}
      </div>

      {/* Contenido Modular con Formato Estilo Libreta Digital */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', zIndex: 1 }}>
        {parsedBlocks.map((block, index) => {
          if (block.type === 'subheading') {
            return (
              <div
                key={index}
                style={{
                  marginTop: index > 0 ? '8px' : '0px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <div
                  style={{
                    background: isLight
                      ? 'linear-gradient(135deg, #FEF08A 0%, #FDE047 100%)'
                      : 'linear-gradient(135deg, rgba(234, 179, 8, 0.3) 0%, rgba(202, 138, 4, 0.4) 100%)',
                    border: isLight ? '1.5px solid #FACC15' : '1.5px solid #EAB308',
                    padding: '5px 12px',
                    borderRadius: '12px',
                    color: isLight ? '#713F12' : '#FEF08A',
                    fontWeight: 900,
                    fontSize: '0.86rem',
                    letterSpacing: '0.01em',
                    boxShadow: isLight ? '0 2px 6px rgba(234, 179, 8, 0.18)' : 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Zap size={14} color={isLight ? '#854D0E' : '#FDE047'} />
                  <span>{block.content}</span>
                </div>
              </div>
            );
          }

          if (block.type === 'quote') {
            return (
              <div
                key={index}
                style={{
                  background: isLight
                    ? 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)'
                    : 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(21, 128, 61, 0.25) 100%)',
                  border: isLight ? '1.5px solid #86EFAC' : '1.5px solid #22C55E',
                  borderLeft: isLight ? '5px solid #16A34A' : '5px solid #4ADE80',
                  borderRadius: '14px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  margin: '4px 0'
                }}
              >
                <Quote size={20} color={isLight ? '#16A34A' : '#4ADE80'} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div
                  style={{
                    fontSize: currentFontSize,
                    lineHeight: currentLineHeight,
                    color: isLight ? '#14532D' : '#DCFCE7',
                    fontWeight: 700,
                    fontStyle: 'italic'
                  }}
                >
                  {block.content}
                </div>
              </div>
            );
          }

          if (block.type === 'bullet') {
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '4px 8px 4px 6px',
                  borderRadius: '10px',
                  background: isLight ? 'rgba(248, 250, 252, 0.8)' : 'rgba(30, 41, 59, 0.5)'
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: isLight ? '#10B981' : '#34D399',
                    flexShrink: 0,
                    marginTop: '9px',
                    boxShadow: '0 0 6px rgba(16, 185, 129, 0.6)'
                  }}
                />
                <div
                  style={{
                    fontSize: currentFontSize,
                    lineHeight: currentLineHeight,
                    color: isLight ? '#1E293B' : '#E2E8F0',
                    fontWeight: 500
                  }}
                >
                  {renderHighlightedContent(block.content)}
                </div>
              </div>
            );
          }

          // Párrafo estándar enriquecido con resaltado
          return (
            <p
              key={index}
              style={{
                margin: 0,
                fontSize: currentFontSize,
                lineHeight: currentLineHeight,
                color: isLight ? '#334155' : '#CBD5E1',
                fontWeight: 500,
                textAlign: 'left'
              }}
            >
              {renderHighlightedContent(block.content)}
            </p>
          );
        })}
      </div>
    </div>
  );
};
