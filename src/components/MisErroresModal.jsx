// src/components/MisErroresModal.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  AlertCircle, 
  CheckCircle2, 
  RotateCcw, 
  Trash2, 
  Sparkles, 
  BookOpen, 
  Check, 
  HelpCircle,
  Filter,
  ArrowRight
} from 'lucide-react';
import { 
  getFailedQuestions, 
  markErrorSolved, 
  removeFailedQuestion, 
  clearAllFailedQuestions 
} from '../lib/errorBank';
import { LatexText } from './LatexText';

export function MisErroresModal({ isOpen, onClose }) {
  const [errors, setErrors] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [filterStatus, setFilterStatus] = useState('pending'); // 'all', 'pending', 'solved'
  const [activeRetryId, setActiveRetryId] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [retryResult, setRetryResult] = useState(null); // 'correct' | 'wrong' | null

  useEffect(() => {
    if (!isOpen) return;
    setErrors(getFailedQuestions());

    const handleUpdate = (e) => {
      if (e.detail) setErrors(e.detail);
      else setErrors(getFailedQuestions());
    };

    window.addEventListener('rastro_error_bank_updated', handleUpdate);
    return () => window.removeEventListener('rastro_error_bank_updated', handleUpdate);
  }, [isOpen]);

  const subjects = useMemo(() => {
    const list = Array.from(new Set(errors.map(e => e.subject).filter(Boolean)));
    return list;
  }, [errors]);

  const filteredErrors = useMemo(() => {
    return errors.filter(item => {
      if (selectedSubject !== 'all' && item.subject !== selectedSubject) return false;
      if (filterStatus === 'pending' && item.solved) return false;
      if (filterStatus === 'solved' && !item.solved) return false;
      return true;
    });
  }, [errors, selectedSubject, filterStatus]);

  const pendingCount = useMemo(() => errors.filter(e => !e.solved).length, [errors]);
  const solvedCount = useMemo(() => errors.filter(e => e.solved).length, [errors]);

  const handleStartRetry = (errorItem) => {
    setActiveRetryId(errorItem.id);
    setSelectedOption(null);
    setRetryResult(null);
  };

  const handleCheckAnswer = (errorItem) => {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === errorItem.answer;
    setRetryResult(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      setTimeout(() => {
        markErrorSolved(errorItem.id);
      }, 900);
    }
  };

  const handleToggleSolved = (id, currentStatus) => {
    if (!currentStatus) {
      markErrorSolved(id);
    } else {
      // Toggle back to pending
      const updated = errors.map(e => e.id === id ? { ...e, solved: false } : e);
      localStorage.setItem('rastro_mis_errores', JSON.stringify(updated));
      setErrors(updated);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000200,
          background: 'rgba(0, 0, 0, 0.72)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: 0
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%', opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '680px',
            maxHeight: '92vh',
            height: '92vh',
            background: 'var(--card-bg, #FFFFFF)',
            color: 'var(--text-main, #0F172A)',
            borderTopLeftRadius: '28px',
            borderTopRightRadius: '28px',
            boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          {/* Mobile Drag Handle */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
            <div style={{ width: '40px', height: '4px', borderRadius: '4px', background: 'rgba(120, 120, 128, 0.3)' }} />
          </div>

          {/* Modal Header */}
          <div
            style={{
              padding: '14px 20px',
              borderBottom: '1px solid var(--card-border, rgba(0, 0, 0, 0.08))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.25) 100%)',
                  border: '1.5px solid rgba(239, 68, 68, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#EF4444',
                  flexShrink: 0
                }}
              >
                <AlertCircle size={24} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 900 }}>
                    Mis Errores
                  </h2>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '8px',
                      background: pendingCount > 0 ? 'rgba(239, 68, 68, 0.14)' : 'rgba(16, 185, 129, 0.15)',
                      color: pendingCount > 0 ? '#DC2626' : '#059669'
                    }}
                  >
                    {pendingCount} por repasar
                  </span>
                  {solvedCount > 0 && (
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '8px',
                        background: 'rgba(16, 185, 129, 0.12)',
                        color: '#059669'
                      }}
                    >
                      {solvedCount} dominados ✓
                    </span>
                  )}
                </div>
                <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--text-secondary, #64748B)' }}>
                  Repositorio automático de preguntas falladas para repaso enfocado
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(120, 120, 128, 0.15)',
                color: 'var(--text-main, #0F172A)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Filters & Status Segment */}
          <div
            style={{
              padding: '10px 16px',
              background: 'rgba(120, 120, 128, 0.04)',
              borderBottom: '1px solid var(--card-border, rgba(0, 0, 0, 0.08))',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            {/* Status pills: Pendientes / Dominados / Todos */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', overflowX: 'auto', paddingBottom: '2px' }}>
              <button
                type="button"
                onClick={() => setFilterStatus('pending')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '12px',
                  border: filterStatus === 'pending' ? '1.5px solid #EF4444' : '1px solid var(--card-border)',
                  background: filterStatus === 'pending' ? 'rgba(239, 68, 68, 0.12)' : 'var(--card-bg)',
                  color: filterStatus === 'pending' ? '#DC2626' : 'var(--text-secondary)',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                Pendientes ({pendingCount})
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus('solved')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '12px',
                  border: filterStatus === 'solved' ? '1.5px solid #10B981' : '1px solid var(--card-border)',
                  background: filterStatus === 'solved' ? 'rgba(16, 185, 129, 0.12)' : 'var(--card-bg)',
                  color: filterStatus === 'solved' ? '#059669' : 'var(--text-secondary)',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                Dominados ({solvedCount})
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus('all')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '12px',
                  border: filterStatus === 'all' ? '1.5px solid var(--accent, #007AFF)' : '1px solid var(--card-border)',
                  background: filterStatus === 'all' ? 'rgba(0, 122, 255, 0.12)' : 'var(--card-bg)',
                  color: filterStatus === 'all' ? 'var(--accent, #007AFF)' : 'var(--text-secondary)',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                Todos ({errors.length})
              </button>
            </div>

            {/* Subject horizontal pills if multiple subjects */}
            {subjects.length > 0 && (
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedSubject('all')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: selectedSubject === 'all' ? 'var(--text-main)' : 'rgba(120, 120, 128, 0.1)',
                    color: selectedSubject === 'all' ? 'var(--card-bg)' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Todas las materias
                </button>
                {subjects.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSubject(s)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '8px',
                      border: 'none',
                      background: selectedSubject === s ? 'var(--text-main)' : 'rgba(120, 120, 128, 0.1)',
                      color: selectedSubject === s ? 'var(--card-bg)' : 'var(--text-secondary)',
                      fontWeight: 700,
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* List of Error Cards */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredErrors.length === 0 ? (
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '40px 16px'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '20px',
                    background: 'rgba(16, 185, 129, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                    color: '#059669'
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 800 }}>
                  {filterStatus === 'pending' 
                    ? '¡Excelente! No tienes errores pendientes' 
                    : 'No hay preguntas en esta sección'}
                </h3>
                <p style={{ margin: '0 0 16px', fontSize: '0.82rem', color: 'var(--text-secondary)', maxWidth: '320px' }}>
                  Cada vez que falles una pregunta en un examen, reto o lección, se guardará automáticamente aquí para que la repases hasta dominarla.
                </p>
              </div>
            ) : (
              filteredErrors.map((item, index) => {
                const isRetrying = activeRetryId === item.id;
                const options = Array.isArray(item.options) ? item.options : [];

                return (
                  <div
                    key={item.id}
                    style={{
                      background: item.solved 
                        ? 'linear-gradient(180deg, rgba(16, 185, 129, 0.04) 0%, rgba(16, 185, 129, 0.02) 100%)' 
                        : 'var(--card-bg, #FFFFFF)',
                      border: item.solved 
                        ? '1.5px solid rgba(16, 185, 129, 0.25)' 
                        : '1.5px solid var(--card-border, rgba(0, 0, 0, 0.1))',
                      borderRadius: '18px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
                    }}
                  >
                    {/* Header tags */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            fontSize: '0.70rem',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            padding: '3px 8px',
                            borderRadius: '8px',
                            background: 'rgba(99, 102, 241, 0.12)',
                            color: '#4F46E5'
                          }}
                        >
                          {item.subject}
                        </span>
                        {item.subtema && (
                          <span
                            style={{
                              fontSize: '0.70rem',
                              fontWeight: 700,
                              padding: '3px 8px',
                              borderRadius: '8px',
                              background: 'rgba(120, 120, 128, 0.08)',
                              color: 'var(--text-secondary)'
                            }}
                          >
                            {item.subtema}
                          </span>
                        )}
                        {item.solved && (
                          <span
                            style={{
                              fontSize: '0.70rem',
                              fontWeight: 800,
                              padding: '3px 8px',
                              borderRadius: '8px',
                              background: 'rgba(16, 185, 129, 0.15)',
                              color: '#059669',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '3px'
                            }}
                          >
                            <Check size={12} strokeWidth={3} /> Dominada
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <button
                          type="button"
                          onClick={() => handleToggleSolved(item.id, item.solved)}
                          title={item.solved ? "Marcar como pendiente" : "Marcar como dominada"}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: item.solved ? '#059669' : 'var(--text-secondary)',
                            cursor: 'pointer',
                            padding: '4px'
                          }}
                        >
                          <CheckCircle2 size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFailedQuestion(item.id)}
                          title="Eliminar del banco"
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer',
                            padding: '4px'
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Question prompt */}
                    <div style={{ fontSize: '0.90rem', fontWeight: 800, lineHeight: 1.45, color: 'var(--text-main)' }}>
                      <LatexText text={item.q} />
                    </div>

                    {/* Retry Interactive Mode or Standard Summary */}
                    {isRetrying ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent, #007AFF)' }}>
                          Selecciona la respuesta correcta:
                        </span>
                        {options.map((opt, optIndex) => {
                          const isSelected = selectedOption === optIndex;
                          const isCorrectOpt = optIndex === item.answer;

                          let bg = 'var(--card-bg)';
                          let borderColor = 'var(--card-border)';
                          let textColor = 'var(--text-main)';

                          if (retryResult) {
                            if (isCorrectOpt) {
                              bg = 'rgba(16, 185, 129, 0.15)';
                              borderColor = '#10B981';
                              textColor = '#059669';
                            } else if (isSelected && !isCorrectOpt) {
                              bg = 'rgba(239, 68, 68, 0.15)';
                              borderColor = '#EF4444';
                              textColor = '#DC2626';
                            }
                          } else if (isSelected) {
                            bg = 'rgba(0, 122, 255, 0.12)';
                            borderColor = 'var(--accent, #007AFF)';
                            textColor = 'var(--accent, #007AFF)';
                          }

                          return (
                            <button
                              key={optIndex}
                              type="button"
                              disabled={retryResult !== null}
                              onClick={() => setSelectedOption(optIndex)}
                              style={{
                                padding: '10px 12px',
                                borderRadius: '12px',
                                border: `1.5px solid ${borderColor}`,
                                background: bg,
                                color: textColor,
                                textAlign: 'left',
                                fontSize: '0.84rem',
                                fontWeight: 700,
                                cursor: retryResult !== null ? 'default' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <span
                                style={{
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '50%',
                                  background: 'rgba(120, 120, 128, 0.1)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.75rem',
                                  fontWeight: 800,
                                  flexShrink: 0
                                }}
                              >
                                {String.fromCharCode(65 + optIndex)}
                              </span>
                              <div style={{ flex: 1 }}>
                                <LatexText text={opt} />
                              </div>
                            </button>
                          );
                        })}

                        {/* Action buttons inside retry */}
                        <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                          {!retryResult ? (
                            <button
                              type="button"
                              disabled={selectedOption === null}
                              onClick={() => handleCheckAnswer(item)}
                              className="duo-btn-3d"
                              style={{
                                flex: 1,
                                padding: '10px',
                                borderRadius: '12px',
                                border: 'none',
                                background: selectedOption === null ? 'rgba(120, 120, 128, 0.2)' : 'var(--accent, #007AFF)',
                                color: '#FFFFFF',
                                fontWeight: 800,
                                fontSize: '0.82rem',
                                cursor: selectedOption === null ? 'not-allowed' : 'pointer'
                              }}
                            >
                              Comprobar Respuesta
                            </button>
                          ) : (
                            <div
                              style={{
                                flex: 1,
                                padding: '10px',
                                borderRadius: '12px',
                                background: retryResult === 'correct' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                color: retryResult === 'correct' ? '#059669' : '#DC2626',
                                fontWeight: 800,
                                fontSize: '0.84rem',
                                textAlign: 'center'
                              }}
                            >
                              {retryResult === 'correct' 
                                ? '¡Correcto! Marcada como dominada 🎉' 
                                : 'Aún incorrecto. Revisa la fundamentación abajo.'}
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={() => setActiveRetryId(null)}
                            style={{
                              padding: '10px 14px',
                              borderRadius: '12px',
                              border: '1px solid var(--card-border)',
                              background: 'transparent',
                              color: 'var(--text-secondary)',
                              fontWeight: 700,
                              fontSize: '0.82rem',
                              cursor: 'pointer'
                            }}
                          >
                            Cerrar
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Compact actions */
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '2px', flexWrap: 'wrap' }}>
                        {options.length > 0 && (
                          <button
                            type="button"
                            onClick={() => handleStartRetry(item)}
                            className="duo-btn-3d"
                            style={{
                              padding: '7px 14px',
                              borderRadius: '10px',
                              border: 'none',
                              background: 'var(--accent, #007AFF)',
                              color: '#FFFFFF',
                              fontWeight: 800,
                              fontSize: '0.78rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              cursor: 'pointer'
                            }}
                          >
                            <RotateCcw size={14} /> Reintentar Pregunta
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleToggleSolved(item.id, item.solved)}
                          style={{
                            padding: '7px 14px',
                            borderRadius: '10px',
                            border: '1px solid var(--card-border)',
                            background: 'transparent',
                            color: item.solved ? '#059669' : 'var(--text-secondary)',
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          <Check size={14} />
                          {item.solved ? 'Marcar pendiente' : 'Marcar aprendida'}
                        </button>
                      </div>
                    )}

                    {/* Official Explanation Box */}
                    {item.explanation && (
                      <div
                        style={{
                          background: 'rgba(120, 120, 128, 0.05)',
                          borderRadius: '12px',
                          padding: '10px 12px',
                          borderLeft: '3px solid #007AFF',
                          fontSize: '0.80rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.45
                        }}
                      >
                        <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '2px' }}>
                          💡 Clave y Fundamento:
                        </strong>
                        <LatexText text={item.explanation} />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
