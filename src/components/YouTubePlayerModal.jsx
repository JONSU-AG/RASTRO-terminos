import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ExternalLink, BookOpen, Layers, CheckCircle2, ChevronRight, ShieldCheck, Video, Flag } from 'lucide-react';

export const YouTubePlayerModal = ({ isOpen, onClose, course, initialLesson, onReport }) => {
  const [activeLesson, setActiveLesson] = useState(initialLesson || null);

  useEffect(() => {
    if (initialLesson) {
      setActiveLesson(initialLesson);
    } else if (course?.lessons?.length) {
      setActiveLesson(course.lessons[0]);
    }
  }, [initialLesson, course]);

  // Listener para cerrar con tecla ESC y bloquear scroll de fondo
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !course) return null;

  const currentYtId = activeLesson?.ytId || course.featuredVideoId || '';
  const currentUrl = activeLesson?.url || (currentYtId ? `https://www.youtube.com/watch?v=${currentYtId}` : course.playlistUrl);

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px',
          background: 'rgba(0, 0, 0, 0.78)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '920px',
            maxHeight: '92vh',
            background: 'var(--card-bg, #0F172A)',
            color: 'var(--text-main, #FFFFFF)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Cabecera del Reproductor */}
          <div
            style={{
              padding: '14px 20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              background: 'rgba(255, 255, 255, 0.03)'
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontSize: '0.68rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                    background: course.color || '#0284C7'
                  }}
                >
                  {course.subject}
                </span>
                <span style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600 }}>
                  Clase Abierta de YouTube
                </span>
              </div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {activeLesson?.title || course.title}
              </h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <a
                href={currentUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Abrir directamente en la app de YouTube"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 12px',
                  borderRadius: '10px',
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  color: '#FF5252',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Video size={14} />
                <span>Abrir en YouTube</span>
                <ExternalLink size={12} />
              </a>

              {onReport && (
                <button
                  type="button"
                  onClick={() => onReport({
                    id: activeLesson?.id || currentYtId || course.id,
                    title: `${course.title} — ${activeLesson?.title || 'Video'}`,
                    url: currentUrl
                  })}
                  title="Reportar video caído o error"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 12px',
                    borderRadius: '10px',
                    background: 'rgba(234, 179, 8, 0.15)',
                    border: '1px solid rgba(234, 179, 8, 0.3)',
                    color: '#FACC15',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Flag size={13} />
                  <span>Reportar caído</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar reproductor"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease'
                }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Área del Video (Aspect Ratio 16:9 Oficial) */}
          <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000000' }}>
            {currentYtId ? (
              <iframe
                title={activeLesson?.title || course.title}
                src={`https://www.youtube.com/embed/${currentYtId}?autoplay=1&rel=0&modestbranding=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
              />
            ) : (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  padding: '20px',
                  textAlign: 'center'
                }}
              >
                <Video size={36} color="rgba(255,255,255,0.4)" />
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                  Selecciona una clase de la lista para reproducir el video.
                </p>
                <a
                  href={course.playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    background: '#EF4444',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    textDecoration: 'none'
                  }}
                >
                  Ver Lista Completa en YouTube
                </a>
              </div>
            )}
          </div>

          {/* Selector de Clases / Lecciones Disponibles */}
          <div style={{ padding: '16px', flex: 1, overflowY: 'auto', background: 'rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={14} color={course.color || '#0284C7'} />
                <span>Clases del Ciclo ({course.lessons?.length || 0})</span>
              </span>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)' }}>
                Toca cualquier clase para reproducirla
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '8px' }}>
              {(course.lessons || []).map((les, idx) => {
                const isCurrent = activeLesson?.id === les.id || activeLesson?.ytId === les.ytId;
                return (
                  <button
                    key={les.id || idx}
                    type="button"
                    onClick={() => setActiveLesson(les)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: isCurrent ? `1.5px solid ${course.color || '#0284C7'}` : '1px solid rgba(255,255,255,0.08)',
                      background: isCurrent ? `${course.color || '#0284C7'}26` : 'rgba(255,255,255,0.04)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                      <div
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '8px',
                          background: isCurrent ? (course.color || '#0284C7') : 'rgba(255,255,255,0.1)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 900,
                          flexShrink: 0
                        }}
                      >
                        {isCurrent ? <Play size={12} fill="#FFFFFF" /> : (idx + 1)}
                      </div>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: isCurrent ? 800 : 600,
                          color: isCurrent ? '#FFFFFF' : 'rgba(255,255,255,0.85)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {les.title}
                      </span>
                    </div>
                    {isCurrent && <span style={{ fontSize: '0.7rem', color: course.color || '#0284C7', fontWeight: 800 }}>En curso</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Micro-Footer con Nota de Legalidad y Autoría */}
          <div
            style={{
              padding: '10px 20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.72rem',
              color: 'rgba(255, 255, 255, 0.5)',
              background: 'rgba(0, 0, 0, 0.35)',
              flexWrap: 'wrap',
              gap: '6px'
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <ShieldCheck size={13} color="#10B981" />
              <span>Reproductor Oficial IFrame de YouTube • Crédito a sus respectivos docentes y canales</span>
            </span>
            <span>Acceso libre y gratuito</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
