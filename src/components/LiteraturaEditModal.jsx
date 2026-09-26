import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Save,
  BookOpen,
  FileText,
  Plus,
  Trash2,
  AlertCircle,
  Sparkles,
  Layers,
  HelpCircle,
  User
} from 'lucide-react';
import { saveObra } from '../lib/literaturaService';
import { useTheme } from '../context/ThemeContext';

export const LiteraturaEditModal = ({ obra, isOpen, onClose, onSaved }) => {
  const { isLight } = useTheme();
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'resumen' | 'apunte'
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState(() => {
    if (obra) {
      return {
        id: obra.id || '',
        titulo: obra.titulo || '',
        autor: obra.autor || '',
        año: obra.año || '',
        pais: obra.pais || 'Perú',
        genero: obra.genero || 'Narrativo',
        especie: obra.especie || 'Novela',
        corriente: obra.corriente || '',
        categoria: obra.categoria || 'Literatura Peruana',
        temaPrincipal: obra.temaPrincipal || '',
        portadaGradiente: obra.portadaGradiente || 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
        resumenDetallado: {
          sinopsis: obra.resumenDetallado?.sinopsis || '',
          contextoHistorico: obra.resumenDetallado?.contextoHistorico || '',
          analisisTrama: obra.resumenDetallado?.analisisTrama || [],
          personajes: obra.resumenDetallado?.personajes || []
        },
        apunteRepaso: {
          sintesisExpress: obra.apunteRepaso?.sintesisExpress || '',
          datosFundamentales: obra.apunteRepaso?.datosFundamentales || [
            { clave: 'Género y especie', valor: '' },
            { clave: 'Corriente', valor: '' },
            { clave: 'Espacios', valor: '' },
            { clave: 'Símbolo central', valor: '' }
          ],
          elementosClave: obra.apunteRepaso?.elementosClave || [],
          preguntasFrecuentes: obra.apunteRepaso?.preguntasFrecuentes || []
        }
      };
    }
    return {
      id: '',
      titulo: '',
      autor: '',
      año: '',
      pais: 'Perú',
      genero: 'Narrativo',
      especie: 'Novela',
      corriente: '',
      categoria: 'Literatura Peruana',
      temaPrincipal: '',
      portadaGradiente: 'linear-gradient(145deg, #065f46 0%, #047857 50%, #022c22 100%)',
      resumenDetallado: {
        sinopsis: '',
        contextoHistorico: '',
        analisisTrama: [],
        personajes: []
      },
      apunteRepaso: {
        sintesisExpress: '',
        datosFundamentales: [
          { clave: 'Género y especie', valor: 'Narrativo — Novela' },
          { clave: 'Corriente', valor: '' },
          { clave: 'Espacios', valor: '' },
          { clave: 'Símbolo central', valor: '' }
        ],
        elementosClave: [],
        preguntasFrecuentes: []
      }
    };
  });

  if (!isOpen) return null;

  const handleGeneralChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleResumenField = (field, val) => {
    setFormData(prev => ({
      ...prev,
      resumenDetallado: { ...prev.resumenDetallado, [field]: val }
    }));
  };

  const handleApunteField = (field, val) => {
    setFormData(prev => ({
      ...prev,
      apunteRepaso: { ...prev.apunteRepaso, [field]: val }
    }));
  };

  // Agregar Trama / Capítulo
  const addTrama = () => {
    setFormData(prev => ({
      ...prev,
      resumenDetallado: {
        ...prev.resumenDetallado,
        analisisTrama: [
          ...prev.resumenDetallado.analisisTrama,
          { titulo: 'Nuevo Capítulo / Acto', detalle: '' }
        ]
      }
    }));
  };

  const removeTrama = (index) => {
    setFormData(prev => ({
      ...prev,
      resumenDetallado: {
        ...prev.resumenDetallado,
        analisisTrama: prev.resumenDetallado.analisisTrama.filter((_, i) => i !== index)
      }
    }));
  };

  // Agregar Personaje
  const addPersonaje = () => {
    setFormData(prev => ({
      ...prev,
      resumenDetallado: {
        ...prev.resumenDetallado,
        personajes: [
          ...prev.resumenDetallado.personajes,
          { nombre: '', rol: '', descripcion: '' }
        ]
      }
    }));
  };

  const removePersonaje = (index) => {
    setFormData(prev => ({
      ...prev,
      resumenDetallado: {
        ...prev.resumenDetallado,
        personajes: prev.resumenDetallado.personajes.filter((_, i) => i !== index)
      }
    }));
  };

  // Agregar Pregunta de Repaso
  const addPregunta = () => {
    setFormData(prev => ({
      ...prev,
      apunteRepaso: {
        ...prev.apunteRepaso,
        preguntasFrecuentes: [
          ...prev.apunteRepaso.preguntasFrecuentes,
          { pregunta: '', respuesta: '' }
        ]
      }
    }));
  };

  const removePregunta = (index) => {
    setFormData(prev => ({
      ...prev,
      apunteRepaso: {
        ...prev.apunteRepaso,
        preguntasFrecuentes: prev.apunteRepaso.preguntasFrecuentes.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.titulo.trim() || !formData.autor.trim()) {
      setErrorMsg('El título y el autor son obligatorios.');
      return;
    }

    try {
      setSaving(true);
      setErrorMsg('');
      await saveObra(formData);
      if (onSaved) onSaved(formData);
      onClose();
    } catch (err) {
      console.error('Error guardando obra:', err);
      setErrorMsg(err.message || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '10px',
    border: '1px solid var(--card-border, rgba(120, 120, 128, 0.25))',
    background: 'var(--card-bg, rgba(255, 255, 255, 0.05))',
    color: 'var(--text-main, #FFFFFF)',
    fontSize: '0.85rem',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    fontSize: '0.74rem',
    fontWeight: 800,
    color: 'var(--text-muted, #94A3B8)',
    marginBottom: '4px',
    display: 'block'
  };

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100070,
          background: isLight ? 'rgba(15, 23, 42, 0.55)' : 'rgba(2, 6, 23, 0.9)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '14px',
          boxSizing: 'border-box'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '650px',
            maxHeight: '92vh',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '24px',
            background: 'var(--card-bg, #18181B)',
            border: '1.5px solid var(--card-border, rgba(120, 120, 128, 0.25))',
            color: 'var(--text-main, #FFFFFF)',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--card-border, rgba(120, 120, 128, 0.15))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0
            }}
          >
            <div>
              <span style={{ fontSize: '0.66rem', fontWeight: 900, color: 'var(--accent, #007AFF)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Administración
              </span>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, color: 'var(--text-main, #FFFFFF)' }}>
                {obra ? 'Editar Obra y Apunte' : 'Nueva Obra Literaria'}
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                border: '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                background: 'transparent',
                color: 'var(--text-muted, #94A3B8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Selector de Pestañas de Edición */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              padding: '6px 14px',
              background: 'var(--card-bg, rgba(255, 255, 255, 0.02))',
              borderBottom: '1px solid var(--card-border, rgba(120, 120, 128, 0.15))',
              gap: '6px',
              flexShrink: 0
            }}
          >
            {[
              { id: 'general', label: '1. Datos Generales', icon: BookOpen },
              { id: 'resumen', label: '2. Resumen Detallado', icon: Sparkles },
              { id: 'apunte', label: '3. Apunte de Repaso', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '8px 6px',
                    borderRadius: '12px',
                    border: isSelected ? '1.5px solid var(--accent, #007AFF)' : '1px solid transparent',
                    background: isSelected ? 'rgba(0, 122, 255, 0.12)' : 'transparent',
                    color: isSelected ? 'var(--accent, #007AFF)' : 'var(--text-muted, #94A3B8)',
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Formulario Scrolleable */}
          <form
            onSubmit={handleSave}
            style={{
              padding: '18px 20px',
              overflowY: 'auto',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            {errorMsg && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#EF4444',
                  fontSize: '0.82rem',
                  fontWeight: 700
                }}
              >
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* TAB 1: DATOS GENERALES */}
            {activeTab === 'general' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={labelStyle}>Título de la Obra *</label>
                    <input
                      style={inputStyle}
                      value={formData.titulo}
                      onChange={(e) => handleGeneralChange('titulo', e.target.value)}
                      placeholder="Ej. Los ríos profundos"
                      required
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Autor *</label>
                    <input
                      style={inputStyle}
                      value={formData.autor}
                      onChange={(e) => handleGeneralChange('autor', e.target.value)}
                      placeholder="Ej. José María Arguedas"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={labelStyle}>Año de publicación</label>
                    <input
                      style={inputStyle}
                      value={formData.año}
                      onChange={(e) => handleGeneralChange('año', e.target.value)}
                      placeholder="Ej. 1958"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Género</label>
                    <input
                      style={inputStyle}
                      value={formData.genero}
                      onChange={(e) => handleGeneralChange('genero', e.target.value)}
                      placeholder="Ej. Narrativo"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Especie</label>
                    <input
                      style={inputStyle}
                      value={formData.especie}
                      onChange={(e) => handleGeneralChange('especie', e.target.value)}
                      placeholder="Ej. Novela"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={labelStyle}>Corriente literaria</label>
                    <input
                      style={inputStyle}
                      value={formData.corriente}
                      onChange={(e) => handleGeneralChange('corriente', e.target.value)}
                      placeholder="Ej. Neoindigenismo"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Categoría</label>
                    <select
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      value={formData.categoria}
                      onChange={(e) => handleGeneralChange('categoria', e.target.value)}
                    >
                      <option value="Literatura Peruana">Literatura Peruana</option>
                      <option value="Literatura Universal">Literatura Universal</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Tema Principal</label>
                  <textarea
                    rows={2}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    value={formData.temaPrincipal}
                    onChange={(e) => handleGeneralChange('temaPrincipal', e.target.value)}
                    placeholder="El conflicto de identidad andina frente al desarraigo..."
                  />
                </div>
              </div>
            )}

            {/* TAB 2: RESUMEN DETALLADO */}
            {activeTab === 'resumen' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={labelStyle}>Sinopsis General</label>
                  <textarea
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    value={formData.resumenDetallado.sinopsis}
                    onChange={(e) => handleResumenField('sinopsis', e.target.value)}
                    placeholder="Narración completa y atractiva del argumento de la obra..."
                  />
                </div>

                <div>
                  <label style={labelStyle}>Contexto Histórico y Social</label>
                  <textarea
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    value={formData.resumenDetallado.contextoHistorico}
                    onChange={(e) => handleResumenField('contextoHistorico', e.target.value)}
                    placeholder="Época, movimiento social, contexto del autor..."
                  />
                </div>

                {/* Capítulos / Actos */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-main, #FFFFFF)' }}>
                      Desglose de Capítulos / Actos
                    </span>
                    <button
                      type="button"
                      onClick={addTrama}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '8px',
                        border: '1px solid var(--accent, #007AFF)',
                        background: 'rgba(0, 122, 255, 0.1)',
                        color: 'var(--accent, #007AFF)',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      <Plus size={12} /> Agregar Parte
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {formData.resumenDetallado.analisisTrama.map((bloque, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '10px',
                          borderRadius: '12px',
                          border: '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                          background: 'var(--card-bg, rgba(255, 255, 255, 0.03))',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input
                            style={{ ...inputStyle, flex: 1, fontWeight: 800 }}
                            value={bloque.titulo}
                            onChange={(e) => {
                              const next = [...formData.resumenDetallado.analisisTrama];
                              next[idx].titulo = e.target.value;
                              handleResumenField('analisisTrama', next);
                            }}
                            placeholder="Título de la sección o acto"
                          />
                          <button
                            type="button"
                            onClick={() => removeTrama(idx)}
                            style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          style={{ ...inputStyle, resize: 'vertical' }}
                          value={bloque.detalle}
                          onChange={(e) => {
                            const next = [...formData.resumenDetallado.analisisTrama];
                            next[idx].detalle = e.target.value;
                            handleResumenField('analisisTrama', next);
                          }}
                          placeholder="Acontecimientos principales de este fragmento..."
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Personajes */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-main, #FFFFFF)' }}>
                      Personajes
                    </span>
                    <button
                      type="button"
                      onClick={addPersonaje}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '8px',
                        border: '1px solid #38BDF8',
                        background: 'rgba(56, 189, 248, 0.1)',
                        color: '#38BDF8',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      <Plus size={12} /> Agregar Personaje
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {formData.resumenDetallado.personajes.map((p, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '10px',
                          borderRadius: '12px',
                          border: '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                          background: 'var(--card-bg, rgba(255, 255, 255, 0.03))',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input
                            style={{ ...inputStyle, flex: 2, fontWeight: 800 }}
                            value={p.nombre}
                            onChange={(e) => {
                              const next = [...formData.resumenDetallado.personajes];
                              next[idx].nombre = e.target.value;
                              handleResumenField('personajes', next);
                            }}
                            placeholder="Nombre del personaje"
                          />
                          <input
                            style={{ ...inputStyle, flex: 1.5 }}
                            value={p.rol}
                            onChange={(e) => {
                              const next = [...formData.resumenDetallado.personajes];
                              next[idx].rol = e.target.value;
                              handleResumenField('personajes', next);
                            }}
                            placeholder="Rol / Identidad"
                          />
                          <button
                            type="button"
                            onClick={() => removePersonaje(idx)}
                            style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <input
                          style={inputStyle}
                          value={p.descripcion}
                          onChange={(e) => {
                            const next = [...formData.resumenDetallado.personajes];
                            next[idx].descripcion = e.target.value;
                            handleResumenField('personajes', next);
                          }}
                          placeholder="Descripción y rol en la obra..."
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: APUNTE DE REPASO */}
            {activeTab === 'apunte' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={labelStyle}>Síntesis de Repaso Inmediato</label>
                  <textarea
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    value={formData.apunteRepaso.sintesisExpress}
                    onChange={(e) => handleApunteField('sintesisExpress', e.target.value)}
                    placeholder="Párrafo conciso con la esencia completa de la obra para repaso rápido..."
                  />
                </div>

                {/* Preguntas de Repaso */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-main, #FFFFFF)' }}>
                      Preguntas Frecuentes y Claves
                    </span>
                    <button
                      type="button"
                      onClick={addPregunta}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '8px',
                        border: '1px solid #10B981',
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: '#10B981',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      <Plus size={12} /> Agregar Pregunta
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {formData.apunteRepaso.preguntasFrecuentes.map((faq, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '10px',
                          borderRadius: '12px',
                          border: '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                          background: 'var(--card-bg, rgba(255, 255, 255, 0.03))',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input
                            style={{ ...inputStyle, flex: 1, fontWeight: 800 }}
                            value={faq.pregunta}
                            onChange={(e) => {
                              const next = [...formData.apunteRepaso.preguntasFrecuentes];
                              next[idx].pregunta = e.target.value;
                              handleApunteField('preguntasFrecuentes', next);
                            }}
                            placeholder="Pregunta clave sobre la obra..."
                          />
                          <button
                            type="button"
                            onClick={() => removePregunta(idx)}
                            style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          style={{ ...inputStyle, resize: 'vertical' }}
                          value={faq.respuesta}
                          onChange={(e) => {
                            const next = [...formData.apunteRepaso.preguntasFrecuentes];
                            next[idx].respuesta = e.target.value;
                            handleApunteField('preguntasFrecuentes', next);
                          }}
                          placeholder="Respuesta analítica clara..."
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Footer de Acciones */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '10px',
                paddingTop: '12px',
                borderTop: '1px solid var(--card-border, rgba(120, 120, 128, 0.15))',
                marginTop: 'auto'
              }}
            >
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '9px 16px',
                  borderRadius: '12px',
                  border: '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                  background: 'transparent',
                  color: 'var(--text-muted, #94A3B8)',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={saving}
                style={{
                  padding: '9px 20px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'var(--accent, #007AFF)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.84rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: saving ? 'wait' : 'pointer',
                  opacity: saving ? 0.7 : 1
                }}
              >
                <Save size={15} />
                <span>{saving ? 'Guardando...' : 'Guardar Obra'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LiteraturaEditModal;
