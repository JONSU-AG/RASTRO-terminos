import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  BookOpen,
  FileText,
  Bookmark,
  Share2,
  Check,
  ChevronDown,
  ChevronUp,
  User,
  Sparkles,
  Compass,
  Clock,
  HelpCircle,
  Calendar,
  Layers,
  Award,
  Type
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/**
 * Visor de Literatura y Resúmenes de Lectura
 * - Pestaña 1: Resumen Detallado (Sinopsis, contexto, capítulos/actos, personajes, temas clave)
 * - Pestaña 2: Apunte de Repaso (Síntesis condensada, datos fundamentales, símbolos y preguntas clave)
 * - Totalmente adaptable al tema de color del usuario (Dark, Light, Guinda, Coraje, etc.)
 * - Cero emojis en texto, solo iconos SVG puros.
 */
export const LiteraturaViewerModal = ({ obra, isOpen, onClose }) => {
  const { isLight } = useTheme();
  const [activeTab, setActiveTab] = useState('resumen'); // 'resumen' | 'apunte'
  const [fontSize, setFontSize] = useState('normal'); // 'compact' | 'normal' | 'large'
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isSaved, setIsSaved] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('rastro_obras_guardadas') || '[]');
      return obra ? saved.includes(obra.id) : false;
    } catch {
      return false;
    }
  });

  if (!isOpen || !obra) return null;

  const toggleSave = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('rastro_obras_guardadas') || '[]');
      let next;
      if (saved.includes(obra.id)) {
        next = saved.filter(id => id !== obra.id);
        setIsSaved(false);
      } else {
        next = [...saved, obra.id];
        setIsSaved(true);
      }
      localStorage.setItem('rastro_obras_guardadas', JSON.stringify(next));
    } catch (e) {
      console.warn('Error guardando obra en favoritos:', e);
    }
  };

  const handleCopySummary = () => {
    const textToCopy = `${obra.titulo} — ${obra.autor} (${obra.año})\n${obra.genero} • ${obra.especie} • ${obra.corriente}\n\nSÍNTESIS DE REPASO:\n${obra.apunteRepaso?.sintesisExpress || obra.resumenDetallado?.sinopsis || ''}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fontScale = {
    compact: { body: '0.86rem', lead: '0.94rem', line: 1.55 },
    normal: { body: '0.94rem', lead: '1.02rem', line: 1.65 },
    large: { body: '1.04rem', lead: '1.14rem', line: 1.75 }
  }[fontSize];

  const primaryAccent = obra.portadaColor || 'var(--accent, #007AFF)';

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100060,
          background: isLight ? 'rgba(15, 23, 42, 0.5)' : 'rgba(2, 6, 23, 0.88)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px',
          boxSizing: 'border-box'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '680px',
            maxHeight: '94vh',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '26px',
            background: 'var(--card-bg, #18181B)',
            border: '1.5px solid var(--card-border, rgba(120, 120, 128, 0.2))',
            boxShadow: `0 24px 60px rgba(0, 0, 0, ${isLight ? '0.2' : '0.8'}), 0 0 40px rgba(0, 122, 255, 0.1)`,
            color: 'var(--text-main, #FFFFFF)',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          {/* ======================================================== */}
          {/* CABECERA VISUAL CON PORTADA Y METADATOS                  */}
          {/* ======================================================== */}
          <div
            style={{
              position: 'relative',
              background: obra.portadaGradiente || 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
              padding: '20px 20px 16px',
              borderBottom: '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
              color: '#FFFFFF',
              flexShrink: 0
            }}
          >
            {/* Botones de acción superior */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    fontSize: '0.66rem',
                    fontWeight: 900,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.16)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.25)'
                  }}
                >
                  {obra.categoria || 'Obra Literaria'}
                </span>
                <span
                  style={{
                    fontSize: '0.66rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '8px',
                    background: 'rgba(0, 0, 0, 0.25)',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}
                >
                  {obra.año || 'Clásico'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Control de tamaño de letra */}
                <button
                  type="button"
                  onClick={() => {
                    if (fontSize === 'compact') setFontSize('normal');
                    else if (fontSize === 'normal') setFontSize('large');
                    else setFontSize('compact');
                  }}
                  title="Ajustar tamaño de letra"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    background: 'rgba(255, 255, 255, 0.14)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Type size={15} />
                </button>

                {/* Copiar apunte rápido */}
                <button
                  type="button"
                  onClick={handleCopySummary}
                  title="Copiar síntesis"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    background: 'rgba(255, 255, 255, 0.14)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  {copied ? <Check size={15} color="#10B981" strokeWidth={3} /> : <Share2 size={15} />}
                </button>

                {/* Marcar en guardados */}
                <button
                  type="button"
                  onClick={toggleSave}
                  title={isSaved ? 'Quitar de favoritos' : 'Guardar obra'}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    background: isSaved ? '#F59E0B' : 'rgba(255, 255, 255, 0.14)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Bookmark size={15} fill={isSaved ? '#FFFFFF' : 'none'} />
                </button>

                {/* Cerrar modal */}
                <button
                  type="button"
                  onClick={onClose}
                  title="Cerrar lectura"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    background: 'rgba(239, 68, 68, 0.25)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Título y Autor */}
            <h2
              style={{
                fontSize: '1.45rem',
                fontWeight: 900,
                margin: '0 0 4px 0',
                letterSpacing: '-0.02em',
                lineHeight: 1.2
              }}
            >
              {obra.titulo}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.92, fontSize: '0.86rem', fontWeight: 600 }}>
              <span>{obra.autor}</span>
              <span>•</span>
              <span>{obra.genero} ({obra.especie})</span>
              <span>•</span>
              <span>{obra.corriente}</span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* PESTAÑAS PRINCIPALES: RESUMEN DETALLADO vs APUNTE REPASO */}
          {/* ======================================================== */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              padding: '6px 12px',
              background: 'var(--card-bg, rgba(255, 255, 255, 0.03))',
              borderBottom: '1px solid var(--card-border, rgba(120, 120, 128, 0.15))',
              gap: '6px',
              flexShrink: 0
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('resumen')}
              style={{
                padding: '9px 12px',
                borderRadius: '14px',
                border: activeTab === 'resumen' ? '1.5px solid var(--accent, #007AFF)' : '1px solid transparent',
                background: activeTab === 'resumen' ? 'rgba(0, 122, 255, 0.14)' : 'transparent',
                color: activeTab === 'resumen' ? 'var(--accent, #007AFF)' : 'var(--text-muted, #94A3B8)',
                fontWeight: 800,
                fontSize: '0.84rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
            >
              <BookOpen size={16} strokeWidth={2.4} />
              <span>Resumen Detallado</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('apunte')}
              style={{
                padding: '9px 12px',
                borderRadius: '14px',
                border: activeTab === 'apunte' ? '1.5px solid #10B981' : '1px solid transparent',
                background: activeTab === 'apunte' ? 'rgba(16, 185, 129, 0.14)' : 'transparent',
                color: activeTab === 'apunte' ? '#10B981' : 'var(--text-muted, #94A3B8)',
                fontWeight: 800,
                fontSize: '0.84rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
            >
              <FileText size={16} strokeWidth={2.4} />
              <span>Apunte de Repaso</span>
            </button>
          </div>

          {/* ======================================================== */}
          {/* CONTENIDO INTERNO CON SCROLL CONFORTABLE                 */}
          {/* ======================================================== */}
          <div
            style={{
              padding: '18px 20px',
              overflowY: 'auto',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '18px'
            }}
          >
            {activeTab === 'resumen' ? (
              /* ==================================================== */
              /* PESTAÑA 1: RESUMEN DETALLADO                         */
              /* ==================================================== */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Sinopsis de fondo */}
                <div
                  style={{
                    background: 'var(--card-bg, rgba(255, 255, 255, 0.04))',
                    border: '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                    borderRadius: '16px',
                    padding: '14px 16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <Sparkles size={16} color="#0284C7" />
                    <h3 style={{ fontSize: '0.86rem', fontWeight: 900, margin: 0, color: 'var(--text-main, #FFFFFF)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Argumento Completo de la Obra
                    </h3>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: fontScale.body,
                      lineHeight: fontScale.line,
                      color: 'var(--text-main, #FFFFFF)',
                      opacity: 0.94
                    }}
                  >
                    {obra.resumenDetallado?.sinopsis}
                  </p>
                </div>

                {/* Contexto de Época */}
                {obra.resumenDetallado?.contextoHistorico && (
                  <div
                    style={{
                      background: 'var(--card-bg, rgba(255, 255, 255, 0.04))',
                      border: '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                      borderRadius: '16px',
                      padding: '14px 16px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                      <Clock size={16} color="#F59E0B" />
                      <h3 style={{ fontSize: '0.86rem', fontWeight: 900, margin: 0, color: 'var(--text-main, #FFFFFF)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Contexto Histórico y Social
                      </h3>
                    </div>
                    <p style={{ margin: 0, fontSize: fontScale.body, lineHeight: fontScale.line, color: 'var(--text-muted, #94A3B8)' }}>
                      {obra.resumenDetallado.contextoHistorico}
                    </p>
                  </div>
                )}

                {/* Desglose de la Trama por Capítulos / Actos */}
                {obra.resumenDetallado?.analisisTrama?.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Layers size={16} color="#A855F7" />
                      <h3 style={{ fontSize: '0.86rem', fontWeight: 900, margin: 0, color: 'var(--text-main, #FFFFFF)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Evolución y Desglose de la Trama
                      </h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {obra.resumenDetallado.analisisTrama.map((bloque, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: 'var(--card-bg, rgba(255, 255, 255, 0.04))',
                            border: '1px solid var(--card-border, rgba(120, 120, 128, 0.18))',
                            borderRadius: '14px',
                            padding: '12px 14px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                            <span
                              style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                background: 'rgba(168, 85, 247, 0.2)',
                                color: '#A855F7',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.7rem',
                                fontWeight: 900,
                                flexShrink: 0
                              }}
                            >
                              {idx + 1}
                            </span>
                            <h4 style={{ margin: 0, fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-main, #FFFFFF)' }}>
                              {bloque.titulo}
                            </h4>
                          </div>
                          <p style={{ margin: '4px 0 0 26px', fontSize: fontScale.body, lineHeight: fontScale.line, color: 'var(--text-muted, #94A3B8)' }}>
                            {bloque.detalle}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Personajes Principales */}
                {obra.resumenDetallado?.personajes?.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={16} color="#38BDF8" />
                      <h3 style={{ fontSize: '0.86rem', fontWeight: 900, margin: 0, color: 'var(--text-main, #FFFFFF)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Galería de Personajes
                      </h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '8px' }}>
                      {obra.resumenDetallado.personajes.map((p, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: 'var(--card-bg, rgba(255, 255, 255, 0.04))',
                            border: '1px solid var(--card-border, rgba(120, 120, 128, 0.18))',
                            borderRadius: '14px',
                            padding: '10px 12px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                            <span style={{ fontSize: '0.84rem', fontWeight: 900, color: 'var(--text-main, #FFFFFF)' }}>{p.nombre}</span>
                            <span style={{ fontSize: '0.66rem', fontWeight: 800, color: '#38BDF8', background: 'rgba(56, 189, 248, 0.15)', padding: '2px 6px', borderRadius: '6px' }}>
                              {p.rol}
                            </span>
                          </div>
                          <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: 'var(--text-muted, #94A3B8)', lineHeight: 1.45 }}>
                            {p.descripcion}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ==================================================== */
              /* PESTAÑA 2: APUNTE DE REPASO                          */
              /* ==================================================== */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Síntesis Express */}
                <div
                  style={{
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1.5px solid rgba(16, 185, 129, 0.35)',
                    borderRadius: '16px',
                    padding: '14px 16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <Award size={16} color="#10B981" />
                    <h3 style={{ fontSize: '0.86rem', fontWeight: 900, margin: 0, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Síntesis de Repaso Inmediato
                    </h3>
                  </div>
                  <p style={{ margin: 0, fontSize: fontScale.lead, lineHeight: fontScale.line, color: 'var(--text-main, #FFFFFF)', fontWeight: 600 }}>
                    {obra.apunteRepaso?.sintesisExpress}
                  </p>
                </div>

                {/* Tabla de Datos Fundamentales */}
                {obra.apunteRepaso?.datosFundamentales?.length > 0 && (
                  <div
                    style={{
                      background: 'var(--card-bg, rgba(255, 255, 255, 0.04))',
                      border: '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                      borderRadius: '16px',
                      padding: '12px 14px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                      <Compass size={16} color="#007AFF" />
                      <h3 style={{ fontSize: '0.86rem', fontWeight: 900, margin: 0, color: 'var(--text-main, #FFFFFF)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Ficha Técnica Fundamental
                      </h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {obra.apunteRepaso.datosFundamentales.map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '6px 8px',
                            borderRadius: '8px',
                            background: idx % 2 === 0 ? 'var(--card-bg, rgba(255, 255, 255, 0.03))' : 'transparent',
                            fontSize: '0.8rem'
                          }}
                        >
                          <span style={{ color: 'var(--text-muted, #94A3B8)', fontWeight: 700 }}>{item.clave}</span>
                          <span style={{ color: 'var(--text-main, #FFFFFF)', fontWeight: 800, textAlign: 'right' }}>{item.valor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Elementos y Claves Analíticas */}
                {obra.apunteRepaso?.elementosClave?.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h3 style={{ fontSize: '0.86rem', fontWeight: 900, margin: '4px 0 0', color: 'var(--text-main, #FFFFFF)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Puntos Analíticos Clave
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {obra.apunteRepaso.elementosClave.map((elem, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: 'var(--card-bg, rgba(255, 255, 255, 0.04))',
                            border: '1px solid var(--card-border, rgba(120, 120, 128, 0.18))',
                            borderRadius: '14px',
                            padding: '10px 14px'
                          }}
                        >
                          <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#38BDF8', marginBottom: '2px' }}>
                            {elem.titulo}
                          </div>
                          <div style={{ fontSize: fontScale.body, color: 'var(--text-main, #FFFFFF)', lineHeight: 1.45, opacity: 0.9 }}>
                            {elem.contenido}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Preguntas de Repaso con Acordeón */}
                {obra.apunteRepaso?.preguntasFrecuentes?.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <HelpCircle size={16} color="#EC4899" />
                      <h3 style={{ fontSize: '0.86rem', fontWeight: 900, margin: 0, color: 'var(--text-main, #FFFFFF)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Preguntas Frecuentes de la Obra
                      </h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {obra.apunteRepaso.preguntasFrecuentes.map((faq, idx) => {
                        const isOpen = openFaqIndex === idx;
                        return (
                          <div
                            key={idx}
                            style={{
                              background: 'var(--card-bg, rgba(255, 255, 255, 0.04))',
                              border: isOpen ? '1.5px solid rgba(236, 72, 153, 0.5)' : '1px solid var(--card-border, rgba(120, 120, 128, 0.18))',
                              borderRadius: '14px',
                              overflow: 'hidden',
                              transition: 'all 0.18s ease'
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                              style={{
                                width: '100%',
                                padding: '10px 14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-main, #FFFFFF)',
                                fontSize: '0.82rem',
                                fontWeight: 800,
                                textAlign: 'left',
                                cursor: 'pointer',
                                gap: '8px'
                              }}
                            >
                              <span>{faq.pregunta}</span>
                              {isOpen ? <ChevronUp size={16} color="#EC4899" /> : <ChevronDown size={16} />}
                            </button>

                            {isOpen && (
                              <div
                                style={{
                                  padding: '0 14px 12px',
                                  fontSize: '0.8rem',
                                  color: 'var(--text-muted, #94A3B8)',
                                  lineHeight: 1.5,
                                  borderTop: '1px solid var(--card-border, rgba(120, 120, 128, 0.1))'
                                }}
                              >
                                {faq.respuesta}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LiteraturaViewerModal;
