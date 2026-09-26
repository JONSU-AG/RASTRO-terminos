import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Video, Play, ExternalLink, Sparkles, Check, Edit2, ListPlus } from 'lucide-react';

const EXTRACT_YT_ID = (urlOrId) => {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : trimmed;
};

const DEFAULT_SUBJECTS = [
  'Matemática',
  'Física',
  'Química',
  'Biología',
  'Historia',
  'Geografía',
  'Filosofía',
  'Psicología',
  'Cívica',
  'Economía',
  'Literatura',
  'Lenguaje',
  'Raz. Verbal',
  'Raz. Lógico',
  'Raz. Matemático',
  'Inglés',
  'General'
];

const SUBJECT_COLORS = {
  'Matemática': '#8B5CF6',
  'Física': '#0284C7',
  'Química': '#10B981',
  'Biología': '#14B8A6',
  'Historia': '#F59E0B',
  'Geografía': '#3B82F6',
  'Filosofía': '#6366F1',
  'Psicología': '#EC4899',
  'Cívica': '#E11D48',
  'Economía': '#059669',
  'Literatura': '#D97706',
  'Lenguaje': '#F97316',
  'Raz. Verbal': '#84CC16',
  'Raz. Lógico': '#06B6D4',
  'Raz. Matemático': '#9333EA',
  'Inglés': '#2563EB',
  'General': '#64748B'
};

export const CustomYouTubePlaylistModal = ({ isOpen, onClose, onSave, playlistToEdit = null }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Física');
  const [instructor, setInstructor] = useState('');
  const [description, setDescription] = useState('');
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [lessons, setLessons] = useState([]);

  // Input temporal para agregar un video a la lista
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    if (playlistToEdit) {
      setTitle(playlistToEdit.title || '');
      setSubject(playlistToEdit.subject || 'Física');
      setInstructor(playlistToEdit.instructor || '');
      setDescription(playlistToEdit.description || '');
      setPlaylistUrl(playlistToEdit.playlistUrl || '');
      setLessons(playlistToEdit.lessons || []);
    } else {
      setTitle('');
      setSubject('Física');
      setInstructor('');
      setDescription('');
      setPlaylistUrl('');
      setLessons([]);
    }
    setVideoTitle('');
    setVideoUrl('');
  }, [playlistToEdit, isOpen]);

  if (!isOpen) return null;

  const handleAddVideo = () => {
    if (!videoUrl.trim()) return;
    const ytId = EXTRACT_YT_ID(videoUrl);
    const newLesson = {
      id: `custom-lesson-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: videoTitle.trim() || `Clase #${lessons.length + 1}`,
      url: videoUrl.trim(),
      ytId: ytId
    };
    setLessons([...lessons, newLesson]);
    setVideoTitle('');
    setVideoUrl('');
  };

  const handleRemoveVideo = (idToRemove) => {
    setLessons(lessons.filter(l => l.id !== idToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Por favor ingresa un título para la playlist.');
      return;
    }

    const color = SUBJECT_COLORS[subject] || '#0284C7';
    const firstLessonYtId = lessons[0]?.ytId || EXTRACT_YT_ID(playlistUrl) || '';

    const playlistData = {
      id: playlistToEdit?.id || `custom-yt-${Date.now()}`,
      isCustom: true,
      title: title.trim(),
      subject: subject,
      color: color,
      badge: 'PERSONAL',
      instructor: instructor.trim() || 'Playlist Personal',
      description: description.trim() || 'Colección personalizada de videoclases para repasar a tu propio ritmo.',
      playlistUrl: playlistUrl.trim() || (firstLessonYtId ? `https://www.youtube.com/watch?v=${firstLessonYtId}` : 'https://youtube.com'),
      featuredVideoId: firstLessonYtId,
      videoCount: lessons.length === 1 ? '1 clase' : `${lessons.length} clases`,
      topics: [subject, 'Práctica', 'Repaso'],
      lessons: lessons,
      updatedAt: Date.now()
    };

    onSave(playlistData);
    onClose();
  };

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
          padding: '16px',
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={e => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '620px',
            maxHeight: '90vh',
            background: 'var(--card-bg, #FFFFFF)',
            border: '1.5px solid var(--card-border, rgba(120, 120, 128, 0.2))',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '18px 22px',
              borderBottom: '1px solid var(--card-border, rgba(120, 120, 128, 0.15))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, transparent 100%)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  background: '#EF4444',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.35)'
                }}
              >
                <Video size={18} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {playlistToEdit ? 'Editar Playlist de YouTube' : 'Crear Playlist de YouTube'}
                </h3>
                <p style={{ margin: '2px 0 0', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                  Organiza videoclases públicas y añade videos ahora o más adelante.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(120, 120, 128, 0.12)',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Form Body con Scroll */}
          <form onSubmit={handleSubmit} style={{ overflowY: 'auto', padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Título */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                Título de la Playlist *
              </label>
              <input
                type="text"
                placeholder="Ej. Mis Fijas de Física Preuniversitaria"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                  background: 'var(--input-bg, rgba(120, 120, 128, 0.06))',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Materia y Canal/Profesor */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                  Materia / Asignatura
                </label>
                <select
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                    background: 'var(--input-bg, rgba(120, 120, 128, 0.06))',
                    color: 'var(--text-main)',
                    fontSize: '0.88rem',
                    boxSizing: 'border-box'
                  }}
                >
                  {DEFAULT_SUBJECTS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                  Profesor / Canal de YouTube
                </label>
                <input
                  type="text"
                  placeholder="Ej. Profe Alex / Academia X"
                  value={instructor}
                  onChange={e => setInstructor(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                    background: 'var(--input-bg, rgba(120, 120, 128, 0.06))',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Descripción */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                Descripción o Temas Clave
              </label>
              <textarea
                rows={2}
                placeholder="Ej. Clases de cinemática, vectores, dinámica lineal y energía para examen."
                value={description}
                onChange={e => setDescription(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                  background: 'var(--input-bg, rgba(120, 120, 128, 0.06))',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem',
                  resize: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Enlace de Playlist Oficial opcional */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                Enlace de Playlist de YouTube (Opcional)
              </label>
              <input
                type="text"
                placeholder="https://www.youtube.com/playlist?list=..."
                value={playlistUrl}
                onChange={e => setPlaylistUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                  background: 'var(--input-bg, rgba(120, 120, 128, 0.06))',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* SECCIÓN DE VIDEOS: Agregar ahora o dejar listo para después */}
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.04)',
                border: '1.5px dashed rgba(239, 68, 68, 0.25)',
                borderRadius: '18px',
                padding: '14px 16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ListPlus size={16} color="#EF4444" />
                  <span style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    Clases de la Playlist ({lessons.length})
                  </span>
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  Puedes agregar videos ahora o después
                </span>
              </div>

              {/* Input rápido para añadir video */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                <input
                  type="text"
                  placeholder="Título del video (Ej. 01. Cinemática MRU)"
                  value={videoTitle}
                  onChange={e => setVideoTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                    background: 'var(--card-bg, #FFFFFF)',
                    color: 'var(--text-main)',
                    fontSize: '0.82rem',
                    boxSizing: 'border-box'
                  }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Enlace de YouTube o ID (Ej. https://youtu.be/rz8MCUTPAWM)"
                    value={videoUrl}
                    onChange={e => setVideoUrl(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddVideo();
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '10px',
                      border: '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                      background: 'var(--card-bg, #FFFFFF)',
                      color: 'var(--text-main)',
                      fontSize: '0.82rem',
                      boxSizing: 'border-box'
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddVideo}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '10px',
                      border: 'none',
                      background: '#EF4444',
                      color: '#FFFFFF',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      flexShrink: 0
                    }}
                  >
                    <Plus size={14} />
                    <span>Añadir</span>
                  </button>
                </div>
              </div>

              {/* Lista de videos agregados */}
              {lessons.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '14px 10px', color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                  Aún no has agregado videos a esta playlist. Puedes guardar la playlist y añadir los videos de YouTube cuando los tengas.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '160px', overflowY: 'auto' }}>
                  {lessons.map((lesson, idx) => (
                    <div
                      key={lesson.id || idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        padding: '8px 12px',
                        borderRadius: '10px',
                        background: 'var(--card-bg, #FFFFFF)',
                        border: '1px solid var(--card-border, rgba(120, 120, 128, 0.15))'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#EF4444' }}>
                          {idx + 1}.
                        </span>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {lesson.title}
                          </div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', opacity: 0.8 }}>
                            ID: {lesson.ytId || 'enlace'}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveVideo(lesson.id)}
                        title="Quitar video"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#EF4444',
                          cursor: 'pointer',
                          padding: '4px'
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '10px 18px',
                  borderRadius: '12px',
                  border: '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>

              <button
                type="submit"
                style={{
                  padding: '10px 22px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 14px rgba(239, 68, 68, 0.35)'
                }}
              >
                <Check size={16} />
                <span>{playlistToEdit ? 'Guardar Cambios' : 'Crear Playlist'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
