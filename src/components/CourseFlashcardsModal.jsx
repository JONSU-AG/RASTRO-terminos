import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, RotateCw, ChevronLeft, ChevronRight, ChevronDown, Sparkles, Plus, Check, 
  BookOpen, Layers, Zap, Award, CheckCircle2, Shuffle, AlertCircle, Trash2, Flag, UploadCloud
} from 'lucide-react';
import { OrsttyMascot, ArtyonMascot } from './Mascots';
import { ReportModal } from './ReportModal';
import { ConfirmModal } from './ConfirmModal';
import { DEFAULT_FLASHCARDS } from '../data/simuladorData';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { uploadFileReliable, getDirectImageUrl, compressImageToDataUrl } from '../lib/storageHelper';
import { useAuth } from '../context/AuthContext';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Caché en módulo del temario pesado (7+ MB) para aperturas instantáneas del modal
let roadmapCache = null;

// Función para remover menciones residuales de marcas de examen de admisión y hacer el contenido 100% universal
const cleanUniversalText = (text) => {
  if (!text || typeof text !== 'string') return text;
  return text
    .replace(/de la Universidad Nacional de San Agustín\s*\((?:UNSA|CEPREUNSA)\)/gi, '')
    .replace(/Universidad Nacional de San Agustín/gi, 'universidades')
    .replace(/fija_unsa/gi, 'dato_clave')
    .replace(/fijaUnsa/gi, 'datoClave')
    .replace(/Clave\s+Fija\s+(?:CEPREUNSA|UNSA)/gi, 'Dato Clave de Examen')
    .replace(/Fija\s+(?:CEPREUNSA|UNSA)/gi, 'Clave Fundamental')
    .replace(/Tip\s+(?:UNSA|CEPREUNSA)/gi, 'Consejo Práctico')
    .replace(/Clave\s+(?:UNSA|CEPREUNSA)/gi, 'Clave de Estudio')
    .replace(/VARIACIONES\s+(?:CEPREUNSA|UNSA)/gi, 'VARIACIONES DE EXAMEN')
    .replace(/\bCEPREUNSA\b/gi, 'OFICIAL')
    .replace(/\bUNSA\b/gi, 'OFICIAL')
    .replace(/criterio\s+de\s+admisi[oó]n/gi, 'criterio clave');
};

// Helper to render KaTeX if present or plain text with rich mathematical typography
function LatexText({ text, style = {}, isBlock = false }) {
  if (!text) return null;
  const rawText = String(text);
  const hasLatex = rawText.includes('$') || rawText.includes('\\');
  
  if (!hasLatex) {
    return <span style={style}>{rawText}</span>;
  }

  // Si todo el texto es un bloque LaTeX directo
  if (rawText.startsWith('$$') && rawText.endsWith('$$')) {
    const math = rawText.slice(2, -2).trim();
    try {
      const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
      return <div style={{ margin: '6px 0', overflowX: 'auto', ...style }} dangerouslySetInnerHTML={{ __html: html }} />;
    } catch {
      return <span style={style}>{rawText}</span>;
    }
  }

  // Simple parser: render $$...$$ and $...$ as math
  const parts = rawText.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g);
  return (
    <span style={style}>
      {parts.map((part, i) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const math = part.slice(2, -2).trim();
          try {
            const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
            return <div key={i} style={{ margin: '4px 0', overflowX: 'auto' }} dangerouslySetInnerHTML={{ __html: html }} />;
          } catch {
            return <span key={i}>{part}</span>;
          }
        }
        if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1).trim();
          try {
            const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
            return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />;
          } catch {
            return <span key={i}>{part}</span>;
          }
        }
        // Si el segmento tiene comandos LaTeX sin delimitadores $
        if (part.includes('\\frac') || part.includes('\\sqrt') || part.includes('\\sum') || part.includes('\\times')) {
          try {
            const html = katex.renderToString(part.trim(), { displayMode: isBlock, throwOnError: false });
            return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />;
          } catch {
            return <span key={i}>{part}</span>;
          }
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

export function CourseFlashcardsModal({ isOpen, onClose, subject }) {
  const { user, isAdmin } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedSemana, setSelectedSemana] = useState('all');
  const [selectedSubtema, setSelectedSubtema] = useState('all');
  const [isSemanaOpen, setIsSemanaOpen] = useState(false);
  const [isSubtemaOpen, setIsSubtemaOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [masteredIds, setMasteredIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`rastro_mastered_fc_${subject?.name || ''}`) || '[]');
    } catch {
      return [];
    }
  });

  // New Flashcard form
  const [newCardQ, setNewCardQ] = useState('');
  const [newCardA, setNewCardA] = useState('');
  const [newCardSubtema, setNewCardSubtema] = useState('');
  const [newCardImage, setNewCardImage] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {} });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [toastSuccess, setToastSuccess] = useState('');
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Firestore community flashcards for this subject
  const [firestoreCards, setFirestoreCards] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('rastro_local_flashcards') || '[]')
        .filter(c => (c.subject || '').toLowerCase() === (subject?.name || '').toLowerCase());
    } catch {
      return [];
    }
  });

  // Roadmap para esta materia: el temario pesado (7+ MB) se carga solo al abrir
  // el modal (no al arrancar la app). Caché en módulo para aperturas instantáneas.
  const [roadmapData, setRoadmapData] = useState(() => roadmapCache);
  useEffect(() => {
    if (!isOpen) return;
    if (roadmapCache) {
      setRoadmapData(roadmapCache);
      return;
    }
    let alive = true;
    import('../data/learningPathData')
      .then((m) => {
        roadmapCache = m.SUBJECT_ROADMAP || {};
        if (alive) setRoadmapData(roadmapCache);
      })
      .catch(() => {});
    return () => { alive = false; };
  }, [isOpen]);

  // Roadmap for this subject (semanas and subtemas)
  const subjectRoadmap = useMemo(() => {
    if (!subject?.name) return [];
    return (roadmapData || {})[subject.name] || [];
  }, [subject?.name, roadmapData]);

  // Weeks list for the dropdown/pills
  const semanasList = useMemo(() => {
    return subjectRoadmap.map(s => ({
      semana: s.semana,
      title: s.title || `Semana ${s.semana}`,
      shortName: s.shortName || `Semana ${s.semana}`,
      subtemas: s.subtemas || []
    }));
  }, [subjectRoadmap]);

  // Current available subtemas based on selected semana
  const availableSubtemas = useMemo(() => {
    if (selectedSemana === 'all') {
      const all = [];
      subjectRoadmap.forEach(s => {
        (s.subtemas || []).forEach(sub => all.push(sub));
      });
      return all;
    }
    const found = subjectRoadmap.find(s => String(s.semana) === String(selectedSemana));
    return found?.subtemas || [];
  }, [subjectRoadmap, selectedSemana]);

  // Subscribe to Firestore cards for this subject
  useEffect(() => {
    if (!isOpen || !subject?.name) return;
    try {
      const q = query(
        collection(db, 'flashcards'), 
        where('subject', '==', subject.name)
      );
      const unsub = onSnapshot(q, (snapshot) => {
        const local = JSON.parse(localStorage.getItem('rastro_local_flashcards') || '[]')
          .filter(c => (c.subject || '').toLowerCase() === (subject.name || '').toLowerCase());
        
        const map = new Map();
        snapshot.docs.forEach(d => map.set(d.id, { id: d.id, ...d.data() }));
        local.forEach(l => { if (!map.has(l.id)) map.set(l.id, l); });
        setFirestoreCards(Array.from(map.values()));
      }, (err) => {
        console.warn("Notice subscribing to course flashcards:", err);
      });
      return () => unsub();
    } catch (e) {
      console.warn("Could not setup course flashcards listener:", e);
    }
  }, [isOpen, subject?.name]);

  // Built-in theory flashcards derived directly from SUBJECT_ROADMAP for this subject!
  const theoryDerivedCards = useMemo(() => {
    if (!subjectRoadmap || subjectRoadmap.length === 0) return [];
    const generated = [];

    subjectRoadmap.forEach(week => {
      (week.subtemas || []).forEach(sub => {
        const theory = sub.theory;
        if (!theory) return;

        // 1. Key formula card if exists
        if (theory.formula_data?.formula_latex || theory.formula_data?.formula_simple) {
          generated.push({
            id: `theory_formula_${sub.id}`,
            q: `¿Cuál es la fórmula o teorema clave de ${theory.formula_data.teorema_nombre || sub.title}?`,
            a: theory.formula_data.formula_latex 
              ? `$${theory.formula_data.formula_latex}$` 
              : theory.formula_data.formula_simple,
            explanation: theory.formula_data.descripcion || '',
            semana: week.semana,
            subtemaCode: sub.subCode,
            subtemaTitle: sub.title,
            subject: subject.name,
            authorName: 'Matriz Oficial',
            type: 'formula'
          });
        }

        // 2. Admission exam trap/key tip card if exists
        const admissionSection = theory.sections?.find(s => (s.heading || '').includes('Claves de Admisión') || (s.heading || '').includes('Examen'));
        if (admissionSection && admissionSection.body) {
          const lines = admissionSection.body.split('\n').filter(l => l.trim().startsWith('•') || l.trim().length > 10);
          if (lines.length > 0) {
            generated.push({
              id: `theory_tip_${sub.id}`,
              q: `Dato Fijo de Admisión: ${sub.title}`,
              a: lines[0].replace(/^•\s*/, '').trim(),
              explanation: lines.slice(1).join('\n').replace(/•\s*/g, '• '),
              semana: week.semana,
              subtemaCode: sub.subCode,
              subtemaTitle: sub.title,
              subject: subject.name,
              authorName: 'Claves de Admisión',
              type: 'tip'
            });
          }
        }
      });
    });

    return generated;
  }, [subjectRoadmap, subject?.name]);

  // Filter default flashcards for this subject
  const defaultSubjectCards = useMemo(() => {
    const sName = (subject?.name || '').toLowerCase();
    return DEFAULT_FLASHCARDS.filter(c => {
      const cardSubj = (c.subject || '').toLowerCase();
      return cardSubj.includes(sName) || sName.includes(cardSubj);
    });
  }, [subject?.name]);

  // Combine all cards for this course
  const allSubjectCards = useMemo(() => {
    const deletedIds = JSON.parse(localStorage.getItem('rastro_deleted_flashcards') || '[]');
    const map = new Map();
    // 1. Derived theory
    theoryDerivedCards.forEach(c => { if (!deletedIds.includes(c.id)) map.set(c.id, c); });
    // 2. Default flashcards
    defaultSubjectCards.forEach(c => { if (!deletedIds.includes(c.id)) map.set(c.id, c); });
    // 3. User & Firestore cards
    firestoreCards.forEach(c => { if (!deletedIds.includes(c.id)) map.set(c.id, c); });

    return Array.from(map.values());
  }, [theoryDerivedCards, defaultSubjectCards, firestoreCards]);

  // Filter cards by selected semana & subtema
  const filteredCards = useMemo(() => {
    return allSubjectCards.filter(card => {
      if (selectedSemana !== 'all') {
        if (card.semana && String(card.semana) !== String(selectedSemana)) return false;
      }
      if (selectedSubtema !== 'all') {
        if (card.subtemaCode && String(card.subtemaCode) !== String(selectedSubtema)) return false;
        if (card.subtemaTitle && !card.subtemaTitle.toLowerCase().includes(selectedSubtema.toLowerCase())) return false;
      }
      return true;
    });
  }, [allSubjectCards, selectedSemana, selectedSubtema]);

  // Reset index if out of bounds
  useEffect(() => {
    if (currentIndex >= filteredCards.length) {
      setCurrentIndex(0);
    }
    setIsFlipped(false);
  }, [selectedSemana, selectedSubtema, filteredCards.length]);

  const currentCard = filteredCards[currentIndex] || null;

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    setCurrentIndex(randomIndex);
  };

  const toggleMastered = (cardId) => {
    setMasteredIds(prev => {
      const next = prev.includes(cardId) 
        ? prev.filter(id => id !== cardId) 
        : [...prev, cardId];
      localStorage.setItem(`rastro_mastered_fc_${subject?.name || ''}`, JSON.stringify(next));
      return next;
    });
  };

  const handleSaveCard = async (e) => {
    if (e) e.preventDefault();
    setFormError('');
    if (!newCardQ.trim() || !newCardA.trim() || isSubmitting) {
      if (!newCardQ.trim()) setFormError("Por favor escribe la pregunta o concepto.");
      else if (!newCardA.trim()) setFormError("Por favor escribe la respuesta.");
      return;
    }

    setIsSubmitting(true);
    const localId = 'fc_local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    const chosenSubtema = newCardSubtema.trim() || (selectedSubtema !== 'all' ? selectedSubtema : (subject?.name ? `${subject.name} - Conceptos Clave` : 'Conceptos'));
    
    const cardData = {
      id: localId,
      q: newCardQ.trim(),
      a: newCardA.trim(),
      imageUrl: (newCardImage || '').trim(),
      subject: subject.name,
      subtemaTitle: chosenSubtema,
      semana: selectedSemana !== 'all' ? Number(selectedSemana) : 1,
      authorName: user?.displayName || 'Estudiante Rastro',
      authorUid: user?.uid || null,
      authorEmail: user?.email || null,
      createdAt: new Date().toISOString()
    };

    // Instant local save
    try {
      const localAll = JSON.parse(localStorage.getItem('rastro_local_flashcards') || '[]');
      const updatedLocal = [cardData, ...localAll];
      localStorage.setItem('rastro_local_flashcards', JSON.stringify(updatedLocal));
      
      // Update state & ensure newly created card is immediately visible at the front
      setFirestoreCards(prev => [cardData, ...prev]);
      setSelectedSemana('all');
      setSelectedSubtema('all');
      setCurrentIndex(0);
      setIsFlipped(false);
      setIsCreateOpen(false);
      setNewCardQ('');
      setNewCardA('');
      setNewCardSubtema('');
      setNewCardImage('');
      setToastSuccess('¡Flashcard creada y guardada con éxito!');
      setTimeout(() => setToastSuccess(''), 3500);

      // Attempt background Firestore sync safely
      try {
        addDoc(collection(db, 'flashcards'), {
          ...cardData,
          createdAt: serverTimestamp()
        }).catch(err => console.warn("Firestore save deferred:", err));
      } catch (fErr) {
        console.warn("Firestore background sync skipped:", fErr);
      }
    } catch (err) {
      console.warn("Error guardando flashcard:", err);
      setFormError("Error al guardar la flashcard. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCard = (cardToDelete) => {
    if (!cardToDelete) return;
    setConfirmModal({
      isOpen: true,
      title: "¿Eliminar Flashcard?",
      message: "¿Deseas eliminar esta flashcard de repaso? Esta acción no se puede deshacer.",
      confirmText: "Sí, Eliminar",
      variant: "danger",
      onConfirm: async () => {
        try {
          const localAll = JSON.parse(localStorage.getItem('rastro_local_flashcards') || '[]');
          const updatedLocal = localAll.filter(c => c.id !== cardToDelete.id);
          localStorage.setItem('rastro_local_flashcards', JSON.stringify(updatedLocal));

          const deletedIds = JSON.parse(localStorage.getItem('rastro_deleted_flashcards') || '[]');
          if (!deletedIds.includes(cardToDelete.id)) {
            deletedIds.push(cardToDelete.id);
            localStorage.setItem('rastro_deleted_flashcards', JSON.stringify(deletedIds));
          }

          setFirestoreCards(prev => prev.filter(c => c.id !== cardToDelete.id));

          if (!String(cardToDelete.id).startsWith('theory_') && !String(cardToDelete.id).startsWith('default_')) {
            try {
              await deleteDoc(doc(db, 'flashcards', cardToDelete.id));
            } catch (fErr) {
              console.warn("Firestore delete note:", fErr);
            }
          }

          setToastSuccess('Flashcard eliminada correctamente.');
          setTimeout(() => setToastSuccess(''), 3000);
          setCurrentIndex(0);
        } catch (err) {
          console.warn("Error deleting flashcard:", err);
        }
      }
    });
  };

  if (!isOpen || !subject) return null;

  return (
    <AnimatePresence>
      <div
        key="flashcards-backdrop-wrapper"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000200,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '12px',
          paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 16 }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          onClick={e => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '520px',
            maxHeight: '88vh',
            background: 'var(--card-bg, #FFFFFF)',
            color: 'var(--text-main, #0F172A)',
            borderRadius: '24px',
            border: '1.5px solid var(--card-border, rgba(0, 0, 0, 0.1))',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          {/* Top Android Drag Handle */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
            <div style={{ width: '40px', height: '4px', borderRadius: '4px', background: 'rgba(120, 120, 128, 0.3)' }} />
          </div>

          {/* Modal Header */}
          <div
            style={{
              padding: '12px 18px',
              borderBottom: '1px solid var(--card-border, rgba(0, 0, 0, 0.08))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              position: 'relative'
            }}
          >
            {toastSuccess && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%) translateY(8px)',
                  zIndex: 100,
                  background: '#059669',
                  color: '#FFFFFF',
                  padding: '8px 16px',
                  borderRadius: '12px',
                  fontSize: '0.80rem',
                  fontWeight: 800,
                  boxShadow: '0 4px 16px rgba(5, 150, 105, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap'
                }}
              >
                <CheckCircle2 size={16} /> {toastSuccess}
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: `${subject.color || '#0284C7'}20`,
                  border: `1.5px solid ${subject.color || '#0284C7'}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: subject.color || '#0284C7',
                  flexShrink: 0
                }}
              >
                <Layers size={17} />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'nowrap', minWidth: 0 }}>
                  <h2 style={{ margin: 0, fontSize: 'clamp(0.80rem, 2.8vw, 0.95rem)', fontWeight: 900, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flexShrink: 1 }}>
                    Flashcards • {subject.name}
                  </h2>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '6px',
                      background: 'rgba(99, 102, 241, 0.15)',
                      color: '#6366F1',
                      flexShrink: 0
                    }}
                  >
                    {filteredCards.length} fichas
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.68rem', color: 'var(--text-secondary, #64748B)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  Repaso activo por temas y subtemas
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setIsCreateOpen(!isCreateOpen)}
                title="Crear nueva Flashcard"
                className="duo-btn-3d"
                style={{
                  padding: '6px 12px',
                  borderRadius: '12px',
                  border: '1.5px solid rgba(16, 185, 129, 0.3)',
                  background: isCreateOpen ? '#10B981' : 'rgba(16, 185, 129, 0.12)',
                  color: isCreateOpen ? '#FFFFFF' : '#059669',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Plus size={14} strokeWidth={3} />
                <span className="hidden sm:inline">Nueva</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(120, 120, 128, 0.15)',
                  color: 'var(--text-main, #0F172A)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Custom Styled Responsive Filters Bar */}
          <div
            style={{
              padding: '10px 16px',
              background: 'rgba(120, 120, 128, 0.05)',
              borderBottom: '1px solid var(--card-border, rgba(0, 0, 0, 0.08))',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            {/* 1. Custom Dropdown: Tema / Semana */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', minWidth: 0, position: 'relative' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', width: '50px', flexShrink: 0 }}>
                Tema:
              </span>
              <div style={{ position: 'relative', flex: 1, minWidth: 0, width: '100%' }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsSemanaOpen(!isSemanaOpen);
                    setIsSubtemaOpen(false);
                  }}
                  style={{
                    width: '100%',
                    minWidth: 0,
                    boxSizing: 'border-box',
                    padding: '8px 30px 8px 12px',
                    borderRadius: '12px',
                    border: '1.5px solid var(--card-border, rgba(0, 0, 0, 0.12))',
                    background: 'var(--card-bg, #FFFFFF)',
                    color: 'var(--text-main)',
                    fontSize: '0.80rem',
                    fontWeight: 700,
                    outline: 'none',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {selectedSemana === 'all' 
                      ? '📚 Todos los temas del curso' 
                      : cleanUniversalText(semanasList.find(s => String(s.semana) === String(selectedSemana))?.title || `Semana ${selectedSemana}`)}
                  </span>
                  <ChevronDown size={15} style={{ color: 'var(--text-secondary)', flexShrink: 0, transform: isSemanaOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                </button>

                {isSemanaOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '105%',
                      left: 0,
                      right: 0,
                      zIndex: 1000,
                      maxHeight: '220px',
                      overflowY: 'auto',
                      background: 'var(--card-bg, #FFFFFF)',
                      border: '1.5px solid var(--card-border, rgba(0,0,0,0.12))',
                      borderRadius: '14px',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)',
                      padding: '4px'
                    }}
                  >
                    <div
                      onClick={() => {
                        setSelectedSemana('all');
                        setSelectedSubtema('all');
                        setIsSemanaOpen(false);
                      }}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '10px',
                        fontSize: '0.80rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        background: selectedSemana === 'all' ? 'rgba(0, 122, 255, 0.12)' : 'transparent',
                        color: selectedSemana === 'all' ? 'var(--accent, #007AFF)' : 'var(--text-main)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>📚 Todos los temas del curso</span>
                      {selectedSemana === 'all' && <Check size={14} />}
                    </div>
                    {semanasList.map(s => {
                      const isSelected = String(s.semana) === String(selectedSemana);
                      return (
                        <div
                          key={s.semana}
                          onClick={() => {
                            setSelectedSemana(s.semana);
                            setSelectedSubtema('all');
                            setIsSemanaOpen(false);
                          }}
                          style={{
                            padding: '10px 12px',
                            borderRadius: '10px',
                            fontSize: '0.78rem',
                            fontWeight: isSelected ? 800 : 600,
                            cursor: 'pointer',
                            lineHeight: 1.35,
                            background: isSelected ? 'rgba(0, 122, 255, 0.12)' : 'transparent',
                            color: isSelected ? 'var(--accent, #007AFF)' : 'var(--text-main)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '8px',
                            borderBottom: '1px solid rgba(0,0,0,0.03)'
                          }}
                        >
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{cleanUniversalText(s.title)}</span>
                          {isSelected && <Check size={14} style={{ flexShrink: 0 }} />}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* 2. Custom Dropdown: Subtema */}
            {availableSubtemas.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', minWidth: 0, position: 'relative' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', width: '50px', flexShrink: 0 }}>
                  Subtema:
                </span>
                <div style={{ position: 'relative', flex: 1, minWidth: 0, width: '100%' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubtemaOpen(!isSubtemaOpen);
                      setIsSemanaOpen(false);
                    }}
                    style={{
                      width: '100%',
                      minWidth: 0,
                      boxSizing: 'border-box',
                      padding: '8px 30px 8px 12px',
                      borderRadius: '12px',
                      border: '1.5px solid var(--card-border, rgba(0, 0, 0, 0.12))',
                      background: 'var(--card-bg, #FFFFFF)',
                      color: 'var(--text-main)',
                      fontSize: '0.80rem',
                      fontWeight: 700,
                      outline: 'none',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                    }}
                  >
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {selectedSubtema === 'all' 
                        ? 'Todos los subtemas' 
                        : cleanUniversalText(availableSubtemas.find(sub => String(sub.subCode || sub.title) === String(selectedSubtema))?.title || selectedSubtema)}
                    </span>
                    <ChevronDown size={15} style={{ color: 'var(--text-secondary)', flexShrink: 0, transform: isSubtemaOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                  </button>

                  {isSubtemaOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '105%',
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                        maxHeight: '220px',
                        overflowY: 'auto',
                        background: 'var(--card-bg, #FFFFFF)',
                        border: '1.5px solid var(--card-border, rgba(0,0,0,0.12))',
                        borderRadius: '14px',
                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)',
                        padding: '4px'
                      }}
                    >
                      <div
                        onClick={() => {
                          setSelectedSubtema('all');
                          setIsSubtemaOpen(false);
                        }}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '10px',
                          fontSize: '0.80rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          background: selectedSubtema === 'all' ? 'rgba(0, 122, 255, 0.12)' : 'transparent',
                          color: selectedSubtema === 'all' ? 'var(--accent, #007AFF)' : 'var(--text-main)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <span>Todos los subtemas</span>
                        {selectedSubtema === 'all' && <Check size={14} />}
                      </div>
                      {availableSubtemas.map(sub => {
                        const subVal = sub.subCode || sub.title;
                        const isSelected = String(subVal) === String(selectedSubtema);
                        const labelText = `${sub.subCode ? sub.subCode + ' - ' : ''}${sub.title}`;
                        return (
                          <div
                            key={sub.id || sub.subCode || sub.title}
                            onClick={() => {
                              setSelectedSubtema(subVal);
                              setIsSubtemaOpen(false);
                            }}
                            style={{
                              padding: '10px 12px',
                              borderRadius: '10px',
                              fontSize: '0.78rem',
                              fontWeight: isSelected ? 800 : 600,
                              cursor: 'pointer',
                              lineHeight: 1.35,
                              background: isSelected ? 'rgba(0, 122, 255, 0.12)' : 'transparent',
                              color: isSelected ? 'var(--accent, #007AFF)' : 'var(--text-main)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '8px',
                              borderBottom: '1px solid rgba(0,0,0,0.03)'
                            }}
                          >
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{cleanUniversalText(labelText)}</span>
                            {isSelected && <Check size={14} style={{ flexShrink: 0 }} />}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Body Content: Either Form or Flashcard Viewer */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column' }}>
            {isCreateOpen ? (
              /* Inline Create Flashcard Form */
              <motion.form
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSaveCard}
                style={{
                  background: 'rgba(120, 120, 128, 0.05)',
                  padding: '16px',
                  borderRadius: '18px',
                  border: '1px solid var(--card-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.86rem', fontWeight: 900, color: '#059669', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Plus size={16} /> Crear Flashcard para {subject.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsCreateOpen(false)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                  >
                    <X size={16} />
                  </button>
                </div>

                {formError && (
                  <div
                    style={{
                      background: 'rgba(239, 68, 68, 0.12)',
                      color: '#DC2626',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      fontSize: '0.78rem',
                      fontWeight: 800
                    }}
                  >
                    {formError}
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, marginBottom: '4px', color: 'var(--text-secondary)' }}>
                    Pregunta, Concepto o Fórmula (Anverso):
                  </label>
                  <textarea
                    rows={2}
                    maxLength={350}
                    value={newCardQ}
                    onChange={e => setNewCardQ(e.target.value)}
                    placeholder="Ej. ¿Qué postula la Primera Ley de Mendel?"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '12px',
                      border: '1px solid var(--card-border)',
                      background: 'var(--card-bg)',
                      color: 'var(--text-main)',
                      fontSize: '0.85rem',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                  <span style={{ fontSize: '0.70rem', color: 'var(--text-secondary)' }}>
                    {newCardQ.length}/350 caracteres • Admite fórmulas LaTeX entre $...$
                  </span>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, marginBottom: '4px', color: 'var(--text-secondary)' }}>
                    Respuesta Directa / Clave (Reverso):
                  </label>
                  <textarea
                    rows={2}
                    maxLength={250}
                    value={newCardA}
                    onChange={e => setNewCardA(e.target.value)}
                    placeholder="Ej. Principio de la uniformidad: fenotipo 100% dominante."
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '12px',
                      border: '1px solid var(--card-border)',
                      background: 'var(--card-bg)',
                      color: 'var(--text-main)',
                      fontSize: '0.85rem',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>



                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, marginBottom: '4px', color: 'var(--text-secondary)' }}>
                    Subtema o Etiqueta (Opcional):
                  </label>
                  <input
                    type="text"
                    value={newCardSubtema}
                    onChange={e => setNewCardSubtema(e.target.value)}
                    placeholder="Ej. Genética mendeliana"
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '10px',
                      border: '1px solid var(--card-border)',
                      background: 'var(--card-bg)',
                      color: 'var(--text-main)',
                      fontSize: '0.82rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, marginBottom: '4px', color: 'var(--text-secondary)' }}>
                    📷 Imagen o Esquema (Opcional - Subir o enlace de Google Drive):
                  </label>
                  {newCardImage ? (
                    <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.05)', textAlign: 'center', padding: '8px' }}>
                      <img 
                        src={getDirectImageUrl(newCardImage)} 
                        alt="Previsualización" 
                        style={{ maxHeight: '120px', maxWidth: '100%', objectFit: 'contain', borderRadius: '8px' }}
                      />
                      <button
                        type="button"
                        onClick={() => setNewCardImage('')}
                        style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          background: '#EF4444',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                        }}
                        title="Quitar Imagen"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          padding: '8px 12px',
                          borderRadius: '10px',
                          border: '1.5px dashed rgba(16, 185, 129, 0.45)',
                          background: 'rgba(16, 185, 129, 0.05)',
                          color: '#10B981',
                          fontWeight: 700,
                          fontSize: '0.78rem',
                          cursor: isUploadingImage ? 'wait' : 'pointer'
                        }}
                      >
                        <UploadCloud size={15} />
                        {isUploadingImage ? `Subiendo imagen (${uploadProgress}%)...` : 'Subir imagen desde dispositivo'}
                        <input
                          type="file"
                          accept="image/*"
                          disabled={isUploadingImage}
                          style={{ display: 'none' }}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setIsUploadingImage(true);
                            setUploadProgress(25);
                            try {
                              const downloadUrl = await uploadFileReliable(
                                file,
                                (p) => setUploadProgress(p),
                                'flashcards'
                              );
                              if (downloadUrl) {
                                setNewCardImage(downloadUrl);
                              }
                            } catch (err) {
                              console.warn("Flashcard image upload notice:", err);
                              try {
                                const fallback = await compressImageToDataUrl(file);
                                if (fallback) {
                                  setNewCardImage(fallback);
                                }
                              } catch (_) {
                                setFormError("No se pudo cargar la imagen: " + (err?.message || 'Error'));
                              }
                            } finally {
                              setIsUploadingImage(false);
                              setUploadProgress(0);
                              e.target.value = '';
                            }
                          }}
                        />
                      </label>
                      <input
                        type="url"
                        value={newCardImage}
                        onChange={e => setNewCardImage(getDirectImageUrl(e.target.value))}
                        placeholder="O pega URL de imagen o Google Drive (https://...)"
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          borderRadius: '10px',
                          border: '1px solid var(--card-border)',
                          background: 'var(--card-bg)',
                          color: 'var(--text-main)',
                          fontSize: '0.80rem',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  <button
                    type="button"
                    onClick={() => setIsCreateOpen(false)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '10px',
                      border: '1px solid var(--card-border)',
                      background: 'transparent',
                      color: 'var(--text-secondary)',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="duo-btn-3d"
                    style={{
                      flex: 2,
                      padding: '10px',
                      borderRadius: '10px',
                      border: 'none',
                      background: '#10B981',
                      color: '#FFFFFF',
                      fontWeight: 900,
                      cursor: isSubmitting ? 'wait' : 'pointer'
                    }}
                  >
                    {isSubmitting ? 'Guardando...' : 'Publicar Flashcard'}
                  </button>
                </div>
              </motion.form>
            ) : filteredCards.length === 0 ? (
              /* Empty state */
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '30px 16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '14px' }}>
                  <OrsttyMascot size={58} mood="pensativo" />
                  <ArtyonMascot size={58} mood="happy" />
                </div>
                <h3 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 800 }}>
                  Aún no hay flashcards en este subtema
                </h3>
                <p style={{ margin: '0 0 16px', fontSize: '0.84rem', color: 'var(--text-secondary)', maxWidth: '280px' }}>
                  Orstty y Artyon te invitan a crear la primera ficha de repaso para dominar este tema.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(true)}
                  className="duo-btn-3d"
                  style={{
                    padding: '10px 20px',
                    borderRadius: '14px',
                    border: 'none',
                    background: 'var(--accent, #007AFF)',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  + Crear Primera Flashcard
                </button>
              </div>
            ) : (
              /* Flashcard Active Study Viewer */
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 0 }}>
                {/* Meta header of current card */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '6px',
                    flexWrap: 'wrap',
                    marginBottom: '8px',
                    fontSize: '0.76rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <span style={{ fontWeight: 800, flexShrink: 0 }}>
                    Ficha {currentIndex + 1} de {filteredCards.length}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={handleShuffle}
                      title="Barajar tarjetas"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                        fontSize: '0.72rem',
                        fontWeight: 700
                      }}
                    >
                      <Shuffle size={12} /> Aleatorio
                    </button>
                    {currentCard?.id && (
                      <button
                        type="button"
                        onClick={() => toggleMastered(currentCard.id)}
                        style={{
                          background: masteredIds.includes(currentCard.id) ? 'rgba(16, 185, 129, 0.15)' : 'rgba(120, 120, 128, 0.1)',
                          color: masteredIds.includes(currentCard.id) ? '#059669' : 'var(--text-secondary)',
                          border: 'none',
                          padding: '3px 7px',
                          borderRadius: '6px',
                          fontSize: '0.70rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        <CheckCircle2 size={12} />
                        {masteredIds.includes(currentCard.id) ? 'Dominada' : 'Aprendida'}
                      </button>
                    )}
                    {currentCard && (
                      <button
                        type="button"
                        onClick={() => setIsReportOpen(true)}
                        title="Reportar problema en esta ficha"
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          color: '#DC2626',
                          border: '1px solid rgba(239, 68, 68, 0.25)',
                          padding: '3px 7px',
                          borderRadius: '6px',
                          fontSize: '0.70rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        <Flag size={12} />
                        <span>Reportar</span>
                      </button>
                    )}
                    {currentCard && (
                      isAdmin || 
                      (user && (
                        currentCard.authorUid === user.uid || 
                        currentCard.authorEmail === user.email || 
                        currentCard.userEmail === user.email || 
                        currentCard.uploadedBy?.uid === user.uid || 
                        currentCard.uploadedBy?.email === user.email || 
                        String(currentCard.id).startsWith('fc_local_')
                      ))
                    ) && (
                      <button
                        type="button"
                        onClick={() => handleDeleteCard(currentCard)}
                        title="Eliminar esta flashcard"
                        style={{
                          background: 'rgba(239, 68, 68, 0.15)',
                          color: '#DC2626',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          padding: '3px 7px',
                          borderRadius: '6px',
                          fontSize: '0.70rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        <Trash2 size={12} />
                        <span>Eliminar</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 3D Interactive Flipping Flashcard */}
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  style={{
                    perspective: '1000px',
                    minHeight: '210px',
                    maxHeight: '340px',
                    flex: 1,
                    display: 'flex',
                    cursor: 'pointer',
                    userSelect: 'none',
                    position: 'relative'
                  }}
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Front: Question / Concept */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        background: 'linear-gradient(145deg, var(--card-bg, #FFFFFF) 0%, rgba(240, 249, 255, 0.7) 100%)',
                        border: '2px solid rgba(0, 122, 255, 0.25)',
                        borderBottom: '4px solid rgba(0, 122, 255, 0.35)',
                        borderRadius: '18px',
                        padding: '12px 14px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                        boxSizing: 'border-box',
                        overflowY: 'auto'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', width: '100%', flexShrink: 0 }}>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 900,
                            letterSpacing: '0.03em',
                            textTransform: 'uppercase',
                            color: subject.color || '#0284C7',
                            background: `${subject.color || '#0284C7'}15`,
                            padding: '2px 8px',
                            borderRadius: '8px',
                            maxWidth: '65%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {cleanUniversalText(currentCard.subtemaTitle || currentCard.subtemaCode || subject.name)}
                        </span>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', fontWeight: 700, flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                          <span>Girar</span>
                          <RotateCw size={11} />
                        </span>
                      </div>

                      {/* Orstty Study Companion Badge */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 8px', background: 'rgba(147, 51, 234, 0.08)', borderRadius: '8px', border: '1px solid rgba(147, 51, 234, 0.18)', margin: '4px 0', flexShrink: 0 }}>
                        <OrsttyMascot size={22} mood="study" animate={false} />
                        <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#7E22CE' }}>
                          Orstty: Intenta recordar la clave antes de voltear
                        </span>
                      </div>

                      <div style={{ margin: 'auto 0', textAlign: 'center', padding: '4px 0', width: '100%', overflowY: 'auto' }}>
                        {currentCard.imageUrl && (
                          <div style={{ margin: '4px auto 8px', maxHeight: '110px', maxWidth: '100%', overflow: 'hidden', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
                            <img 
                              src={getDirectImageUrl(currentCard.imageUrl)} 
                              alt="Esquema o Diagrama" 
                              style={{ maxHeight: '110px', maxWidth: '100%', objectFit: 'contain', margin: '0 auto', display: 'block' }}
                            />
                          </div>
                        )}
                        <div style={{ fontSize: 'clamp(0.95rem, 2.8vw, 1.15rem)', fontWeight: 800, lineHeight: 1.35, color: 'var(--text-main)', wordBreak: 'break-word' }}>
                          <LatexText text={cleanUniversalText(currentCard.q)} isBlock={true} />
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.68rem', color: 'var(--text-secondary)', gap: '6px', flexShrink: 0 }}>
                        <span style={{ maxWidth: '60%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          Autor: {cleanUniversalText(currentCard.authorName || 'Rumbo Oficial')}
                        </span>
                        <span style={{ color: 'var(--accent, #007AFF)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
                          <RotateCw size={11} /> Respuesta
                        </span>
                      </div>
                    </div>

                    {/* Back: Answer / Formula / Explanation */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background: 'linear-gradient(145deg, var(--card-bg, #FFFFFF) 0%, rgba(236, 253, 245, 0.8) 100%)',
                        border: '2px solid rgba(16, 185, 129, 0.35)',
                        borderBottom: '4px solid rgba(16, 185, 129, 0.5)',
                        borderRadius: '18px',
                        padding: '12px 14px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 8px 24px rgba(16, 185, 129, 0.12)',
                        boxSizing: 'border-box',
                        overflowY: 'auto'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 900,
                            letterSpacing: '0.03em',
                            textTransform: 'uppercase',
                            color: '#059669',
                            background: 'rgba(16, 185, 129, 0.15)',
                            padding: '2px 8px',
                            borderRadius: '8px'
                          }}
                        >
                          Respuesta Clave
                        </span>
                        <span style={{ fontSize: '0.68rem', color: '#059669', fontWeight: 800 }}>
                          ✓ Verificado
                        </span>
                      </div>

                      {/* Artyon Celebrating Companion Badge */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 8px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.18)', margin: '4px 0', flexShrink: 0 }}>
                        <ArtyonMascot size={22} mood="celebrating" animate={false} />
                        <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#047857' }}>
                          ¡Clave verificada y asimilada!
                        </span>
                      </div>

                      <div style={{ margin: 'auto 0', textAlign: 'center', padding: '4px 0', width: '100%', overflowY: 'auto' }}>
                        <div style={{ fontSize: 'clamp(0.98rem, 3vw, 1.2rem)', fontWeight: 900, lineHeight: 1.35, color: '#047857' }}>
                          <LatexText text={currentCard.a} isBlock={true} />
                        </div>
                        {currentCard.explanation && (
                          <div style={{ marginTop: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                            <LatexText text={currentCard.explanation} />
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.68rem', color: 'var(--text-secondary)', gap: '4px', flexShrink: 0 }}>
                        <span>Toca para ver pregunta</span>
                        <RotateCw size={11} />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Android Navigation Controls */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px',
                    marginTop: '12px',
                    flexShrink: 0
                  }}
                >
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="duo-btn-3d"
                    style={{
                      flex: 1,
                      height: '42px',
                      borderRadius: '12px',
                      border: '1.5px solid var(--card-border)',
                      background: 'var(--card-bg)',
                      color: 'var(--text-main)',
                      fontWeight: 800,
                      fontSize: '0.82rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <ChevronLeft size={16} /> Anterior
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="duo-btn-3d"
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'rgba(99, 102, 241, 0.15)',
                      color: '#6366F1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                    title="Girar tarjeta"
                  >
                    <RotateCw size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="duo-btn-3d"
                    style={{
                      flex: 1,
                      height: '42px',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'var(--accent, #007AFF)',
                      color: '#FFFFFF',
                      fontWeight: 900,
                      fontSize: '0.84rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0, 122, 255, 0.25)'
                    }}
                  >
                    Siguiente <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {isReportOpen && currentCard && (
        <ReportModal
          key="flashcards-report-modal"
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          targetType="flashcard"
          targetId={currentCard.id || `flashcard-${currentIndex}`}
          targetTitle={cleanUniversalText(currentCard.q || 'Flashcard de repaso')}
          courseName={subject?.name || 'Flashcard'}
        />
      )}

      {confirmModal.isOpen && (
        <ConfirmModal
          key="flashcards-confirm-modal"
          isOpen={confirmModal.isOpen}
          onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
          onConfirm={confirmModal.onConfirm}
          title={confirmModal.title}
          message={confirmModal.message}
          confirmText={confirmModal.confirmText || "Eliminar"}
          variant={confirmModal.variant || "danger"}
        />
      )}
    </AnimatePresence>
  );
}
