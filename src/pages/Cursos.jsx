import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Book, BookOpen, Award, MessageCircle, Share2, Lock, AlertTriangle, 
  Plus, Settings, Search, Sparkles, Layers, Video, Edit3, Trash2, Terminal, 
  Flag, ArrowRight, Compass, Dna, Zap, FlaskConical, Calculator, HelpCircle, 
  Landmark, Scale, Globe, Brain, MessageSquare, Puzzle, Binary, FileText, Languages, Atom,
  Play, ExternalLink, ShieldCheck
} from 'lucide-react';
import { PeriodicTableModal } from '../components/PeriodicTableModal';
import { VocationalTestModal } from '../components/VocationalTestModal';

const SUBJECT_SVG_ICONS = {
  'Biología': Dna,
  'Física': Zap,
  'Química': FlaskConical,
  'Matemática': Calculator,
  'Filosofía': HelpCircle,
  'Historia': Landmark,
  'Cívica': Scale,
  'Geografía': Globe,
  'Psicología': Brain,
  'Literatura': BookOpen,
  'Lenguaje': MessageSquare,
  'Raz. Lógico': Puzzle,
  'Raz. Matemático': Binary,
  'Raz. Verbal': FileText,
  'Inglés': Languages
};
import { Link, useNavigate } from 'react-router-dom';
import { InspirationalDailyBanner } from '../components/InspirationalDailyBanner';
import { ExamCountdownFlipClock } from '../components/ExamCountdownFlipClock';
import { useAuth } from '../context/AuthContext';
import { subscribeToAccessSettings, checkAccessPermission, getCachedAccessSettings } from '../lib/accessControl';
import { subscribeToSiteSettings, getCachedSiteSettings } from '../lib/siteSettings';
import { AccessGate } from '../components/AccessGate';
import { db } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { CommunityAcademyModal } from '../components/CommunityAcademyModal';
import { ConsoleExtractorModal } from '../components/ConsoleExtractorModal';
import { ReportModal } from '../components/ReportModal';
import { VERSION_CONFIG } from '../config/appVersionConfig';
import { CourseFlashcardsModal } from '../components/CourseFlashcardsModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { SUBJECTS_CONFIG } from '../data/learningPathData';
import { AddPlaylistModal } from '../components/AddPlaylistModal';
import { YouTubePlayerModal } from '../components/YouTubePlayerModal';
import { GoogleSignPromptModal } from '../components/GoogleSignPromptModal';
import { subscribeMyPlaylists, subscribeSharedPlaylists, subscribeCuratedPlaylists, setPlaylistShared, deleteUserPlaylist, toPlayerCourse } from '../lib/userPlaylistsService';

export const WhatsAppIconSVG = ({ size = 18, color = "currentColor", style = {} }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    style={style}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export const Cursos = () => {
  const { user, isAdmin, isGuest } = useAuth();
  const navigate = useNavigate();
  const [accessSettings, setAccessSettings] = useState(getCachedAccessSettings);
  const [siteSettings, setSiteSettings] = useState(getCachedSiteSettings);
  const [refreshKey, setRefreshKey] = useState(0);
  const [customCursos, setCustomCursos] = useState([]);
  const [customAcademias, setCustomAcademias] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [academyToEdit, setAcademyToEdit] = useState(null);
  const [isExtractorModalOpen, setIsExtractorModalOpen] = useState(false);
  const [isPeriodicTableOpen, setIsPeriodicTableOpen] = useState(false);
  const [isVocationalTestOpen, setIsVocationalTestOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [courseToReport, setCourseToReport] = useState(null);
  const [courseForFlashcards, setCourseForFlashcards] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {} });
  
  // Pestañas principales: 'aprender' (Rutas Temáticas & Aprender) | 'youtube' (Playlists Personales)
  const [cursosTab, setCursosTab] = useState('aprender');
  const [selectedYtCourse, setSelectedYtCourse] = useState(null);
  const [selectedYtLesson, setSelectedYtLesson] = useState(null);

  // Playlists personalizadas de YouTube creadas por el usuario
  const [customPlaylists, setCustomPlaylists] = useState(() => {
    try {
      const saved = localStorage.getItem('rastro_custom_youtube_playlists');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCustomPlaylistModalOpen, setIsCustomPlaylistModalOpen] = useState(false);
  const [playlistToEdit, setPlaylistToEdit] = useState(null);

  // NUEVO sistema aislado rastro_yt_playlists: privado por defecto, arranque vacío.
  // No lee cursos/academias/youtubePlaylistsData. Briceño/Esparta/Kelsen siguen ocultos por VERSION_CONFIG.
  const [myYtPlaylists, setMyYtPlaylists] = useState([]);
  const [sharedYtPlaylists, setSharedYtPlaylists] = useState([]);
  const [curatedYtPlaylists, setCuratedYtPlaylists] = useState([]);
  const [ytSectionTab, setYtSectionTab] = useState('mias');
  const [isAddYtModalOpen, setIsAddYtModalOpen] = useState(false);
  const [needAccountModal, setNeedAccountModal] = useState(false);
  const [playerCourse, setPlayerCourse] = useState(null);
  const [playerLesson, setPlayerLesson] = useState(null);

  useEffect(() => {
    if (!user || isGuest) { setMyYtPlaylists([]); return; }
    const unsub = subscribeMyPlaylists(user.uid, setMyYtPlaylists);
    return () => unsub && unsub();
  }, [user, isGuest]);

  useEffect(() => {
    const unsubShared = subscribeSharedPlaylists(setSharedYtPlaylists);
    const unsubCurated = subscribeCuratedPlaylists(setCuratedYtPlaylists);
    return () => { unsubShared && unsubShared(); unsubCurated && unsubCurated(); };
  }, []);

  const handleDeleteAcademy = (acad) => {
    const isOwner = Boolean(
      user && (
        (acad.creatorUid && user.uid === acad.creatorUid) ||
        (acad.creatorId && user.uid === acad.creatorId) ||
        (acad.userId && user.uid === acad.userId) ||
        (acad.uploadedBy?.uid && user.uid === acad.uploadedBy.uid) ||
        (acad.ownerId && user.uid === acad.ownerId) ||
        (user.email && (user.email === acad.creatorEmail || user.email === acad.ownerEmail))
      )
    );
    if (!isAdmin && !isOwner) {
      alert("Solo el creador o el administrador pueden eliminar este curso.");
      return;
    }
    setConfirmModal({
      isOpen: true,
      title: "¿Eliminar Curso?",
      message: `¿Estás seguro de que deseas eliminar "${acad.nombre}"? Esta acción no se puede deshacer.`,
      confirmText: "Sí, Eliminar",
      variant: "danger",
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, 'academias', acad.id));
        } catch (e) {
          alert("Error al eliminar curso: " + e.message);
        }
      }
    });
  };

  useEffect(() => {
    const unsub = subscribeToAccessSettings((newSettings) => {
      setAccessSettings(newSettings);
    });
    const unsubSite = subscribeToSiteSettings((s) => {
      setSiteSettings(s);
    });
    return () => {
      unsub();
      unsubSite();
    };
  }, []);

  // Listen to Firestore dynamic courses (desconectado si disconnectFirebaseVideos está activo)
  useEffect(() => {
    if (VERSION_CONFIG.disconnectFirebaseVideos) {
      setCustomCursos([]);
      return;
    }
    try {
      const q = query(collection(db, 'cursos'), orderBy('orden', 'asc'));
      const unsub = onSnapshot(q, (snap) => {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setCustomCursos(list);
      }, (err) => console.warn('Cursos snap notice:', err));
      return () => unsub();
    } catch (e) {
      console.warn('Error loading custom cursos:', e);
    }
  }, []);

  // Listen to custom academies created with the Briceño template (desconectado si disconnectFirebaseVideos está activo)
  useEffect(() => {
    if (VERSION_CONFIG.disconnectFirebaseVideos) {
      setCustomAcademias([]);
      return;
    }
    try {
      const q = query(collection(db, 'academias'));
      const unsub = onSnapshot(q, (snap) => {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setCustomAcademias(list);
      }, (err) => console.warn('Academias snap notice:', err));
      return () => unsub();
    } catch (e) {
      console.warn('Error loading custom academias:', e);
    }
  }, []);

  const permission = checkAccessPermission('cursos', user, isAdmin, accessSettings);

  // Filter custom courses that are active
  const activeCustomCursos = customCursos.filter(c => c.activo !== false);

  // Check which static courses are overridden by custom courses
  const customIds = new Set(activeCustomCursos.map(c => c.id?.toLowerCase()));

  // Default presets (Esparta, Kelsen, Briceño) if not overridden and not disabled globally by admin
  const isBaseAcademiasDisabled = siteSettings?.disableBaseAcademias === true || VERSION_CONFIG.disconnectThirdPartyAcademies === true;

  const staticPresets = isBaseAcademiasDisabled ? [] : [
    {
      id: 'esparta',
      nombre: 'Esparta',
      badge: 'ESPARTA',
      subtitulo: '18 Materias',
      descripcion: 'Preparación exigente y disciplinada para asegurar tu vacante universitaria.',
      colorTheme: {
        primary: '#FF3B30',
        gradient: 'linear-gradient(135deg, #FF3B30, #FF5252)',
        badgeGradient: 'linear-gradient(135deg, #FF3B30, #FF6B6B)',
        bg: 'linear-gradient(180deg, rgba(255, 59, 48, 0.06) 0%, var(--card-bg) 60%)',
        border: 'rgba(255, 59, 48, 0.28)',
        shadow: 'rgba(255, 59, 48, 0.08)',
        btnShadow: 'rgba(255, 59, 48, 0.25)'
      }
    },
    {
      id: 'kelsen',
      nombre: 'Kelsen',
      badge: 'KELSEN',
      subtitulo: 'Letras y Leyes',
      descripcion: 'Especialistas en humanidades, derecho, ciencias sociales y letras preuniversitarias.',
      colorTheme: {
        primary: '#007AFF',
        gradient: 'linear-gradient(135deg, #007AFF, #0A84FF)',
        badgeGradient: 'linear-gradient(135deg, #007AFF, #00C6FF)',
        bg: 'linear-gradient(180deg, rgba(0, 122, 255, 0.06) 0%, var(--card-bg) 60%)',
        border: 'rgba(0, 122, 255, 0.28)',
        shadow: 'rgba(0, 122, 255, 0.08)',
        btnShadow: 'rgba(0, 122, 255, 0.25)'
      }
    },
    {
      id: 'briceno',
      nombre: 'Briceño',
      badge: 'BRICEÑO',
      subtitulo: '2027 EN CURSO',
      descripcion: 'Clases 2027 en curso y Proceso intensivo con todas las áreas académicas.',
      colorTheme: {
        primary: '#059669',
        gradient: 'linear-gradient(135deg, #059669, #10B981)',
        badgeGradient: 'linear-gradient(135deg, #059669, #34D399)',
        bg: 'linear-gradient(180deg, rgba(5, 150, 105, 0.06) 0%, var(--card-bg) 60%)',
        border: 'rgba(5, 150, 105, 0.28)',
        shadow: 'rgba(5, 150, 105, 0.08)',
        btnShadow: 'rgba(5, 150, 105, 0.25)'
      }
    }
  ].filter(p => !customIds.has(p.id) && !customAcademias.some(a => a.id === p.id));

  // Merge custom academies (Briceño template), custom courses, and static presets
  // Si disconnectFirebaseVideos está activo, se desconectan los cursos privados de Firebase hasta obtener autorización
  const allCourses = (VERSION_CONFIG.disconnectFirebaseVideos ? [] : [...customAcademias, ...activeCustomCursos, ...staticPresets]).filter(c => {
    if (VERSION_CONFIG.disconnectThirdPartyAcademies) {
      const lowerId = (c.id || '').toLowerCase();
      const lowerName = (c.nombre || c.name || '').toLowerCase();
      if (['esparta', 'kelsen', 'briceno', 'briceño'].includes(lowerId) || 
          lowerName.includes('esparta') || lowerName.includes('kelsen') || lowerName.includes('briceño')) {
        return false;
      }
    }
    if (isAdmin) return !c.isHidden;
    if (c.oculto === true || c.hidden === true || c.autoHidden === true) return false;
    if (typeof c.reportsCount === 'number' && c.reportsCount >= 5) return false;
    return !c.isHidden;
  });

  const filteredCourses = allCourses.filter(c => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (c.nombre || '').toLowerCase().includes(q) ||
      (c.badge || '').toLowerCase().includes(q) ||
      (c.descripcion || '').toLowerCase().includes(q) ||
      (c.subtitulo || '').toLowerCase().includes(q)
    );
  });

  const handleSaveCustomPlaylist = (newPlaylist) => {
    setCustomPlaylists((prev) => {
      const existingIdx = prev.findIndex(p => p.id === newPlaylist.id);
      let updated;
      if (existingIdx >= 0) {
        updated = [...prev];
        updated[existingIdx] = newPlaylist;
      } else {
        updated = [newPlaylist, ...prev];
      }
      try {
        localStorage.setItem('rastro_custom_youtube_playlists', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleDeleteCustomPlaylist = (playlistId, e) => {
    if (e) e.stopPropagation();
    setConfirmModal({
      isOpen: true,
      title: '¿Eliminar Playlist?',
      message: '¿Estás seguro de que deseas eliminar esta playlist personalizada?',
      confirmText: 'Sí, Eliminar',
      variant: 'danger',
      onConfirm: () => {
        setCustomPlaylists((prev) => {
          const updated = prev.filter(p => p.id !== playlistId);
          try {
            localStorage.setItem('rastro_custom_youtube_playlists', JSON.stringify(updated));
          } catch {}
          return updated;
        });
      }
    });
  };

  // LEGADO aislado: no se usa YOUTUBE_COURSES_CATALOG ni se mezcla con el sistema nuevo.
  // Se deja en [] para no romper el bloque antiguo (que sigue en {false && ...}).
  const allYtPlaylists = [...customPlaylists];
  const filteredYtCourses = allYtPlaylists.filter(c => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (c.subject || '').toLowerCase().includes(q) ||
      (c.title || '').toLowerCase().includes(q) ||
      (c.description || '').toLowerCase().includes(q) ||
      (c.topics || []).some(t => t.toLowerCase().includes(q))
    );
  });

  return (
    <AccessGate
      sectionId="cursos"
      permission={permission}
      accessSettings={accessSettings}
      onUnlocked={() => setRefreshKey(k => k + 1)}
    >
      <div key={refreshKey} className="page-container" style={{ padding: '0 24px 100px', maxWidth: '1240px', margin: '0 auto', boxSizing: 'border-box' }}>
        {/* 2-Column Hero Grid: Inspiración + Comunidad */}
      {/* 2-Column Hero Grid: Inspiración + Cuenta Regresiva Adaptativa a Temas y Android */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 310px), 1fr))',
          gap: '16px',
          margin: '0 auto 24px',
          width: '100%',
          alignItems: 'stretch',
          justifyContent: 'center'
        }}
      >
        {/* Columna 1: Frase / Versículo Inspiracional */}
        <InspirationalDailyBanner style={{ maxWidth: '100%', margin: 0, height: '100%' }} />

        {/* Columna 2: Cuenta Regresiva al Examen Estilo Marcador Centrado */}
        <ExamCountdownFlipClock />
      </div>

      {/* Header Centralizado y Optimizado para Pantallas Móviles / Android */}
      <header 
        style={{ 
          textAlign: 'center', 
          marginBottom: '28px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '14px',
          width: '100%'
        }}
      >
        {/* Título Principal Centrado */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1 
            style={{ 
              fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', 
              fontWeight: 900, 
              color: 'var(--text-main, #0F172A)', 
              margin: 0,
              textAlign: 'center',
              letterSpacing: '-0.02em'
            }}
          >
            Cursos
          </h1>
          <p 
            style={{ 
              margin: '4px 0 0', 
              fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', 
              color: 'var(--text-secondary, #64748B)', 
              fontWeight: 600,
              textAlign: 'center'
            }}
          >
            Explora las materias oficiales y herramientas interactivas para tu preparación
          </p>
        </div>

        {/* Botones de Acción Principales Centrados (Test Vocacional & Tabla Periódica) */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '10px', 
            flexWrap: 'wrap',
            width: '100%',
            maxWidth: '680px'
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsVocationalTestOpen(true);
            }}
            aria-label="Abrir Test Vocacional Universitario"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '99px',
              background: 'linear-gradient(135deg, #0D9488 0%, #059669 100%)',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '0.86rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(13, 148, 136, 0.35)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              minHeight: '44px',
              touchAction: 'manipulation',
              userSelect: 'none'
            }}
          >
            <Compass size={18} />
            <span>Test Vocacional</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsPeriodicTableOpen(true);
            }}
            aria-label="Abrir Tabla Periódica Interactiva y Valencias"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '99px',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '0.86rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              minHeight: '44px',
              touchAction: 'manipulation',
              userSelect: 'none'
            }}
          >
            <Atom size={18} />
            <span>Tabla Periódica & Valencias</span>
          </button>

          <Link
            to="/formulario"
            aria-label="Abrir Fórmulas y Mnemotecnias Pre-U"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '99px',
              background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '0.86rem',
              fontWeight: 800,
              textDecoration: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(168, 85, 247, 0.35)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              minHeight: '44px',
              touchAction: 'manipulation',
              userSelect: 'none'
            }}
          >
            <Calculator size={18} />
            <span>Fórmulas & Truquitos Pre-U</span>
          </Link>

          <Link
            to="/biblioteca?tab=obras"
            aria-label="Ver resúmenes detallados de obras literarias"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '99px',
              background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '0.86rem',
              fontWeight: 800,
              textDecoration: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              minHeight: '44px',
              touchAction: 'manipulation',
              userSelect: 'none'
            }}
          >
            <BookOpen size={18} />
            <span>Obras Literarias Pre-U</span>
          </Link>
        </div>

        {/* Herramientas de Administrador si corresponde */}
        {isAdmin && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '2px' }}>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsExtractorModalOpen(true);
              }}
              title="Herramienta para descargar enlaces masivos desde la consola del navegador (Solo Administrador)"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '99px',
                background: 'rgba(56, 189, 248, 0.12)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                color: '#0284C7',
                fontSize: '0.8rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minHeight: '36px'
              }}
            >
              <Terminal size={14} />
              <span>Extractor para Consola</span>
            </button>

            <Link
              to="/admin"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '99px',
                background: 'rgba(0, 122, 255, 0.1)',
                border: '1px solid rgba(0, 122, 255, 0.3)',
                color: '#007AFF',
                fontSize: '0.8rem',
                fontWeight: 800,
                textDecoration: 'none',
                minHeight: '36px'
              }}
            >
              <Settings size={14} />
              <span>Administrar Cursos</span>
            </Link>
          </div>
        )}

        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '650px', lineHeight: 1.45 }}>
          Explora las materias oficiales y rutas temáticas interactivas con fichas de estudio, simuladores y resúmenes para tu ingreso universitario.
        </p>

        {/* Buscador Universal de Materias y Clases */}
        <div style={{ width: '100%', maxWidth: '440px', position: 'relative', marginTop: '6px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input
            type="text"
            placeholder="Buscar por materia, tema o ciclo..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 38px',
              borderRadius: '14px',
              border: '1.5px solid var(--card-border)',
              background: 'var(--card-bg)',
              color: 'var(--text-main)',
              fontSize: '0.88rem',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </header>

      {/* ================= VIDEOCLASES DESCONECTADAS (EN ESPERA DE VIDEOS OFICIALES) ================= */}
      {false && (
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto 36px', boxSizing: 'border-box' }}>
          <section style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '18px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '12px',
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1.5px solid rgba(239, 68, 68, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#EF4444'
                    }}
                  >
                    <Video size={20} />
                  </div>
                  <h2 style={{ fontSize: 'clamp(1.15rem, 2vw, 1.35rem)', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                    Ciclos y Playlists Abiertas en YouTube
                  </h2>
                </div>
                <p style={{ margin: '4px 0 0', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                  Clases públicas y completas organizadas por materia. Reproducción oficial vía IFrame sin descargas ni piratería.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.74rem', color: '#10B981', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <ShieldCheck size={14} /> 100% Legal • Canales Oficiales
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setPlaylistToEdit(null);
                    setIsCustomPlaylistModalOpen(true);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '999px',
                    background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                    border: 'none',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    boxShadow: '0 3px 12px rgba(239, 68, 68, 0.35)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Plus size={15} />
                  <span>Crear Playlist</span>
                </button>
              </div>
            </div>

            {/* Grid de Playlists de YouTube */}
            {filteredYtCourses.length === 0 ? (
              <div className="glass-card" style={{ padding: '40px 24px', borderRadius: '24px', textAlign: 'center', maxWidth: '520px', margin: '0 auto', border: '1px solid var(--card-border)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(239, 68, 68, 0.12)', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                  <Video size={24} />
                </div>
                <h4 style={{ margin: '0 0 8px', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Videoclases en preparación
                </h4>
                <p style={{ color: 'var(--text-secondary)', margin: '0 0 20px', fontSize: '0.86rem', lineHeight: 1.5 }}>
                  Las videoclases oficiales se habilitarán una vez sean suministradas y autorizadas. Mientras tanto, puedes estudiar directamente con las Rutas Temáticas oficiales y bancos de preguntas.
                </p>
                <button
                  type="button"
                  onClick={() => setCursosTab('aprender')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    borderRadius: '999px',
                    background: 'linear-gradient(135deg, #0284C7 0%, #007AFF 100%)',
                    border: 'none',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0, 122, 255, 0.3)'
                  }}
                >
                  <Compass size={16} />
                  <span>Ir a Rutas Temáticas en Aprender</span>
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
                  gap: '16px'
                }}
              >
                {filteredYtCourses.map((ytC) => (
                  <motion.div
                    key={ytC.id}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => {
                      if (ytC.isCustom && (!ytC.lessons || ytC.lessons.length === 0)) {
                        setPlaylistToEdit(ytC);
                        setIsCustomPlaylistModalOpen(true);
                        return;
                      }
                      setSelectedYtCourse(ytC);
                      setSelectedYtLesson(ytC.lessons?.[0] || null);
                    }}
                    className="glass-card"
                    style={{
                      padding: '18px',
                      borderRadius: '20px',
                      border: `1.5px solid ${ytC.color}35`,
                      background: `linear-gradient(180deg, ${ytC.color}0D 0%, var(--card-bg, #FFFFFF) 60%)`,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '14px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                      boxSizing: 'border-box',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span
                            style={{
                              padding: '3px 10px',
                              borderRadius: '999px',
                              fontSize: '0.72rem',
                              fontWeight: 900,
                              textTransform: 'uppercase',
                              color: '#FFFFFF',
                              background: ytC.color
                            }}
                          >
                            {ytC.subject}
                          </span>
                          {ytC.isCustom && (
                            <span
                              style={{
                                padding: '2px 7px',
                                borderRadius: '6px',
                                fontSize: '0.66rem',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                color: '#EF4444',
                                background: 'rgba(239, 68, 68, 0.12)',
                                border: '1px solid rgba(239, 68, 68, 0.25)'
                              }}
                            >
                              Tu Playlist
                            </span>
                          )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
                            {ytC.videoCount}
                          </span>
                          {ytC.isCustom && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPlaylistToEdit(ytC);
                                  setIsCustomPlaylistModalOpen(true);
                                }}
                                title="Editar playlist y añadir videos"
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  color: 'var(--text-secondary)',
                                  cursor: 'pointer',
                                  padding: '2px'
                                }}
                              >
                                <Edit3 size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => handleDeleteCustomPlaylist(ytC.id, e)}
                                title="Eliminar playlist"
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  color: '#EF4444',
                                  cursor: 'pointer',
                                  padding: '2px'
                                }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <h3 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.3 }}>
                        {ytC.title}
                      </h3>

                      <p style={{ margin: '0 0 10px', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                        {ytC.description}
                      </p>

                      {/* Chips de Temas Clave */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '4px' }}>
                        {(ytC.topics || []).map((top, tIdx) => (
                          <span
                            key={tIdx}
                            style={{
                              padding: '2px 8px',
                              borderRadius: '6px',
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              background: 'rgba(0,0,0,0.04)',
                              color: 'var(--text-secondary)'
                            }}
                          >
                            {top}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Acciones: Ver Clases en la App vs Abrir en YouTube */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '10px', borderTop: '1px solid var(--card-border, rgba(0,0,0,0.08))' }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (ytC.isCustom && (!ytC.lessons || ytC.lessons.length === 0)) {
                            setPlaylistToEdit(ytC);
                            setIsCustomPlaylistModalOpen(true);
                            return;
                          }
                          setSelectedYtCourse(ytC);
                          setSelectedYtLesson(ytC.lessons?.[0] || null);
                        }}
                        style={{
                          flex: 1,
                          padding: '9px 12px',
                          borderRadius: '12px',
                          border: 'none',
                          background: ytC.color,
                          color: '#FFFFFF',
                          fontWeight: 800,
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          boxShadow: `0 3px 10px ${ytC.color}35`,
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <Play size={14} fill="#FFFFFF" />
                        <span>Ver Clases</span>
                      </button>

                      <a
                        href={ytC.playlistUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title="Abrir lista oficial en YouTube"
                        style={{
                          padding: '9px 12px',
                          borderRadius: '12px',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          background: 'rgba(239, 68, 68, 0.08)',
                          color: '#EF4444',
                          fontWeight: 800,
                          fontSize: '0.78rem',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '5px',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <Video size={14} />
                        <span>YouTube</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* Subsección: Cursos Dinámicos y Aportes Comunitarios si existen */}
          {filteredCourses.length > 0 && (
            <section style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--card-border, rgba(0,0,0,0.08))' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                    Cursos & Módulos de la Comunidad
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Módulos y carpetas compartidas por docentes y postulantes
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '16px' }}>
                {filteredCourses.map((c) => {
                  const theme = c.colorTheme || {};
                  const primaryColor = theme.primary || '#7C3AED';
                  const gradient = theme.gradient || 'linear-gradient(135deg, #7C3AED, #A855F7)';
                  const totalModules = Array.isArray(c.modules) ? c.modules.length : 0;
                  const displayBadge = (c.badge && c.badge !== 'GENERAL') ? c.badge : 'CURSO';

                  return (
                    <Link key={c.id} to={`/cursos/${c.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <motion.div
                        whileHover={{ y: -3 }}
                        className="glass-card"
                        style={{
                          padding: '16px',
                          borderRadius: '18px',
                          border: `1.5px solid ${primaryColor}35`,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: '12px',
                          height: '100%',
                          boxSizing: 'border-box'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800, color: '#FFFFFF', background: primaryColor }}>
                              {displayBadge}
                            </span>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
                              {totalModules} Módulos
                            </span>
                          </div>

                          <h4 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                            {c.nombre}
                          </h4>

                          <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                            {c.descripcion || 'Material complementario para tu preparación universitaria.'}
                          </p>
                        </div>

                        <div style={{ padding: '8px 12px', background: gradient, color: '#FFFFFF', borderRadius: '10px', fontWeight: 800, fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <span>Ingresar al Curso</span>
                          <ArrowRight size={13} />
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      )}

      {/* ================= VIDEOS YOUTUBE (nuevo, aislado, arranque vacío) ================= */}
      <section style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'rgba(239,68,68,0.12)', border: '1.5px solid rgba(239,68,68,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }}>
                <Video size={20} />
              </div>
              <h2 style={{ fontSize: 'clamp(1.15rem, 2vw, 1.35rem)', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                Videos YouTube
              </h2>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              Guarda por URL o ID. Nace privado; solo se publica si tocas Compartir con todos.
            </p>
          </div>
          <button
            type="button"
            onClick={() => { if (!user || isGuest) { setNeedAccountModal(true); return; } setIsAddYtModalOpen(true); }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '999px', background: '#EF4444', border: 'none', color: '#fff', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}
          >
            <Plus size={15} />
            <span>Agregar</span>
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
          {[['mias', 'Mías'], ['comunidad', 'Compartidas'], ['oficial', 'Oficial']].map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setYtSectionTab(key)}
              style={{ padding: '7px 14px', borderRadius: '999px', border: ytSectionTab === key ? 'none' : '1px solid var(--card-border)', background: ytSectionTab === key ? 'var(--text-main, #0F172A)' : 'transparent', color: ytSectionTab === key ? 'var(--card-bg, #fff)' : 'var(--text-main)', fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer' }}
            >
              {label}
              {key === 'mias' && myYtPlaylists.length > 0 ? ` (${myYtPlaylists.length})` : ''}
            </button>
          ))}
        </div>

        {ytSectionTab === 'mias' && (
          (!user || isGuest) ? (
            <div className="glass-card" style={{ padding: '28px 20px', borderRadius: '20px', textAlign: 'center', border: '1px solid var(--card-border)' }}>
              <p style={{ margin: '0 0 14px', color: 'var(--text-secondary)', fontSize: '0.86rem' }}>Inicia sesión con cuenta para guardar tus playlists. Los invitados no guardan.</p>
              <button type="button" onClick={() => setNeedAccountModal(true)} style={{ padding: '10px 18px', borderRadius: '12px', border: 'none', background: '#007AFF', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>Acceder con cuenta</button>
            </div>
          ) : myYtPlaylists.length === 0 ? (
            <div className="glass-card" style={{ padding: '32px 20px', borderRadius: '20px', textAlign: 'center', border: '1px solid var(--card-border)' }}>
              <p style={{ margin: '0 0 6px', fontWeight: 800, color: 'var(--text-main)' }}>Aún no hay videos</p>
              <p style={{ margin: '0 0 16px', color: 'var(--text-secondary)', fontSize: '0.84rem' }}>Agrega tu primera playlist o video público de YouTube por URL o ID.</p>
              <button type="button" onClick={() => setIsAddYtModalOpen(true)} style={{ padding: '10px 18px', borderRadius: '12px', border: 'none', background: '#EF4444', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>Agregar ahora</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '12px' }}>
              {myYtPlaylists.map((p) => (
                <div key={p.id} className="glass-card" style={{ padding: '14px', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
                  <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.9rem', marginBottom: '2px' }}>{p.title}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>{p.subject || 'General'} · {p.type === 'playlist' ? 'Playlist' : 'Video'} · {p.isShared ? 'Compartida' : 'Privada'}</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button type="button" onClick={() => { setPlayerCourse(toPlayerCourse(p)); setPlayerLesson(null); }} style={{ flex: 1, padding: '8px', borderRadius: '10px', border: 'none', background: '#EF4444', color: '#fff', fontWeight: 800, fontSize: '0.76rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                      <Play size={13} fill="#fff" /><span>Ver</span>
                    </button>
                    <button type="button" onClick={async () => { try { await setPlaylistShared(p.id, !p.isShared); } catch {} }} title={p.isShared ? 'Dejar de compartir' : 'Compartir con todos'} style={{ padding: '8px 10px', borderRadius: '10px', border: '1px solid var(--card-border)', background: p.isShared ? 'rgba(16,185,129,0.12)' : 'transparent', color: p.isShared ? '#059669' : 'var(--text-main)', fontWeight: 800, fontSize: '0.76rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Share2 size={13} /><span>{p.isShared ? 'Compartida' : 'Compartir'}</span>
                    </button>
                    <button type="button" onClick={() => setConfirmModal({ isOpen: true, title: '¿Eliminar?', message: `Eliminar "${p.title}" de tus guardados.`, confirmText: 'Sí, Eliminar', variant: 'danger', onConfirm: async () => { try { await deleteUserPlaylist(p.id); } catch {} } })} style={{ padding: '8px 10px', borderRadius: '10px', border: 'none', background: 'rgba(239,68,68,0.12)', color: '#EF4444', cursor: 'pointer' }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {ytSectionTab === 'comunidad' && (
          sharedYtPlaylists.length === 0 ? (
            <div className="glass-card" style={{ padding: '28px 20px', borderRadius: '20px', textAlign: 'center', border: '1px solid var(--card-border)' }}>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.86rem' }}>Nadie ha compartido aún. Cuando un usuario toque Compartir con todos, aparece aquí.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '12px' }}>
              {sharedYtPlaylists.map((p) => (
                <div key={p.id} className="glass-card" style={{ padding: '14px', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
                  <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.9rem' }}>{p.title}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', margin: '2px 0 10px' }}>{p.subject || 'General'} · {p.type === 'playlist' ? 'Playlist' : 'Video'}</div>
                  <button type="button" onClick={() => { setPlayerCourse(toPlayerCourse(p)); setPlayerLesson(null); }} style={{ width: '100%', padding: '8px', borderRadius: '10px', border: 'none', background: '#0F172A', color: '#fff', fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer' }}>Ver</button>
                </div>
              ))}
            </div>
          )
        )}

        {ytSectionTab === 'oficial' && (
          curatedYtPlaylists.length === 0 ? (
            <div className="glass-card" style={{ padding: '28px 20px', borderRadius: '20px', textAlign: 'center', border: '1px solid var(--card-border)' }}>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.86rem' }}>Curaduría oficial vacía. El admin la llenará desde la app cuando suba playlists.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '12px' }}>
              {curatedYtPlaylists.map((p) => (
                <div key={p.id} className="glass-card" style={{ padding: '14px', borderRadius: '16px', border: '1.5px solid rgba(16,185,129,0.35)' }}>
                  <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.9rem' }}>{p.title}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', margin: '2px 0 10px' }}>{p.subject || 'General'}</div>
                  <button type="button" onClick={() => { setPlayerCourse(toPlayerCourse(p)); setPlayerLesson(null); }} style={{ width: '100%', padding: '8px', borderRadius: '10px', border: 'none', background: '#059669', color: '#fff', fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer' }}>Ver oficial</button>
                </div>
              ))}
            </div>
          )
        )}
      </section>

      {/* ================= RUTAS TEMÁTICAS Y SECCIÓN APRENDER ================= */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  background: 'rgba(2, 132, 199, 0.12)',
                  border: '1.5px solid rgba(2, 132, 199, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0284C7'
                }}
              >
                <Compass size={20} />
              </div>
              <h2 style={{ fontSize: 'clamp(1.15rem, 2vw, 1.35rem)', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                Mundos de Aprendizaje por Niveles
              </h2>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              Selecciona un curso para entrar directamente a su ruta de niveles, avanzar tema por tema y conquistar vacantes.
            </p>
          </div>

          <Link
            to="/aprender"
            style={{
              fontSize: '0.82rem',
              fontWeight: 800,
              color: '#0284C7',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>Ver ruta actual</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid de los 15 Mundos Oficiales */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '14px'
          }}
        >
          {SUBJECTS_CONFIG.filter((s) => {
            if (!searchQuery.trim()) return true;
            const q = searchQuery.toLowerCase();
            return s.name.toLowerCase().includes(q) || (s.description || '').toLowerCase().includes(q);
          }).map((subj) => {
            const SubjectIcon = SUBJECT_SVG_ICONS[subj.name] || BookOpen;

            return (
              <motion.div
                key={subj.id}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/aprender/${encodeURIComponent(subj.id.toLowerCase())}`)}
                className="glass-card duo-btn-3d"
                style={{
                  padding: '16px',
                  borderRadius: '20px',
                  border: `1.5px solid ${subj.color}40`,
                  background: `linear-gradient(180deg, ${subj.color}15 0%, var(--card-bg, #FFFFFF) 70%)`,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px',
                  boxShadow: `0 4px 16px ${subj.color}15`,
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '14px',
                      background: `${subj.color}20`,
                      border: `1.5px solid ${subj.color}45`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: subj.color,
                      flexShrink: 0
                    }}
                  >
                    <SubjectIcon size={22} color={subj.color} />
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {subj.name}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '3px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: subj.color }} />
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
                        10 Semanas • Niveles
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid var(--card-border, rgba(0,0,0,0.06))', fontSize: '0.76rem', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{ color: subj.color, fontWeight: 800 }}>Entrar al Mundo</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    {['Física', 'Química', 'Matemática', 'Álgebra', 'Raz. Matemático'].includes(subj.name) ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/formulario?search=${encodeURIComponent(subj.name)}`);
                        }}
                        title={`Ver fórmulas y teoremas de ${subj.name}`}
                        className="duo-btn-3d"
                        style={{
                          background: `${subj.color}15`,
                          border: `1px solid ${subj.color}35`,
                          borderRadius: '10px',
                          padding: '4px 8px',
                          color: subj.color,
                          fontWeight: 800,
                          fontSize: '0.70rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        <Calculator size={12} color={subj.color} />
                        <span>Fórmulas</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/formulario?tab=mnemotecnias');
                        }}
                        title={`Ver trucos mnemotécnicos y claves de ${subj.name}`}
                        className="duo-btn-3d"
                        style={{
                          background: `${subj.color}15`,
                          border: `1px solid ${subj.color}35`,
                          borderRadius: '10px',
                          padding: '4px 8px',
                          color: subj.color,
                          fontWeight: 800,
                          fontSize: '0.70rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        <Sparkles size={12} color={subj.color} />
                        <span>Trucos</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCourseForFlashcards(subj);
                      }}
                      title={`Ver Flashcards de ${subj.name}`}
                      className="duo-btn-3d"
                      style={{
                        background: `${subj.color}18`,
                        border: `1px solid ${subj.color}40`,
                        borderRadius: '10px',
                        padding: '4px 8px',
                        color: subj.color,
                        fontWeight: 800,
                        fontSize: '0.70rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                    >
                      <Layers size={12} color={subj.color} />
                      <span>Fichas</span>
                    </button>
                    <ArrowRight size={13} color={subj.color} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Grid de Cursos Dinámicos */}
      {filteredCourses.length === 0 ? (
        <div className="glass-card" style={{ padding: '40px 20px', borderRadius: '24px', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.92rem' }}>
            No se encontraron cursos con el término "{searchQuery}".
          </p>
        </div>
      ) : (
        <section className="academy-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '20px', width: '100%', maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box' }}>
          {/* Card Especial: Formulario Preuniversitario */}
          {(!searchQuery.trim() || 'formulario fisica quimica algebra aritmetica trigonometria geometria'.includes(searchQuery.toLowerCase())) && (
            <Link to="/formulario" style={{ textDecoration: 'none', color: 'inherit' }}>
              <motion.div 
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="glass-card" 
                style={{ 
                  padding: 'clamp(16px, 2.2vw, 20px)', 
                  borderRadius: '20px', 
                  border: '1.5px solid rgba(139, 92, 246, 0.35)', 
                  background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.08) 0%, var(--card-bg) 60%)', 
                  boxShadow: '0 8px 20px rgba(139, 92, 246, 0.12)', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%', 
                  boxSizing: 'border-box', 
                  transition: 'all 0.2s ease' 
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ 
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)', 
                    color: '#FFFFFF', 
                    padding: '4px 10px', 
                    borderRadius: '999px', 
                    fontWeight: 800, 
                    fontSize: '0.78rem', 
                    boxShadow: '0 2px 6px rgba(139, 92, 246, 0.3)' 
                  }}>
                    FORMULARIO
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
                    Leyes y Fórmulas
                  </span>
                </div>

                <h3 style={{ fontSize: 'clamp(1.18rem, 1.6vw, 1.35rem)', fontWeight: 800, marginBottom: '6px', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                  Formulario Preuniversitario
                </h3>

                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.86rem', lineHeight: 1.45, flex: 1 }}>
                  Compendio oficial con tipografía matemática KaTeX, despejes operacionales, desglose de unidades S.I., simulador de cálculo y ficha de bolsillo.
                </p>

                <div style={{ 
                  width: '100%', 
                  textAlign: 'center', 
                  padding: '10px 14px', 
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)', 
                  color: '#FFFFFF', 
                  borderRadius: '12px', 
                  fontWeight: 800, 
                  fontSize: '0.88rem', 
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '6px', 
                  boxSizing: 'border-box' 
                }}>
                  <span>Abrir Formulario</span>
                  <ArrowRight size={15} />
                </div>
              </motion.div>
            </Link>
          )}

          {/* Card Especial 2: Mnemotecnias & Hacks Preuniversitarios */}
          {(!searchQuery.trim() || 'mnemotecnias trucos hacks biologia quimica fisica lenguaje historia literatura civica geografia filosofia'.includes(searchQuery.toLowerCase())) && (
            <Link to="/formulario?tab=mnemotecnias" style={{ textDecoration: 'none', color: 'inherit' }}>
              <motion.div 
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="glass-card" 
                style={{ 
                  padding: 'clamp(16px, 2.2vw, 20px)', 
                  borderRadius: '20px', 
                  border: '1.5px solid rgba(16, 185, 129, 0.35)', 
                  background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, var(--card-bg) 60%)', 
                  boxShadow: '0 8px 20px rgba(16, 185, 129, 0.12)', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%', 
                  boxSizing: 'border-box', 
                  transition: 'all 0.2s ease' 
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ 
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', 
                    color: '#FFFFFF', 
                    padding: '4px 10px', 
                    borderRadius: '999px', 
                    fontWeight: 800, 
                    fontSize: '0.78rem', 
                    boxShadow: '0 2px 6px rgba(16, 185, 129, 0.3)' 
                  }}>
                    MNEMOTECNIAS
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
                    Hacks & Trucos
                  </span>
                </div>

                <h3 style={{ fontSize: 'clamp(1.18rem, 1.6vw, 1.35rem)', fontWeight: 800, marginBottom: '6px', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                  Mnemotecnias & Hacks Pre-U
                </h3>

                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.86rem', lineHeight: 1.45, flex: 1 }}>
                  Reglas nemotécnicas icónicas («Diosito Ve Todo», «Viva la Reina Isabel», «Pavo = Ratón»), acrónimos y claves fijas para memorizar conceptos y fórmulas al instante.
                </p>

                <div style={{ 
                  width: '100%', 
                  textAlign: 'center', 
                  padding: '10px 14px', 
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', 
                  color: '#FFFFFF', 
                  borderRadius: '12px', 
                  fontWeight: 800, 
                  fontSize: '0.88rem', 
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '6px', 
                  boxSizing: 'border-box' 
                }}>
                  <span>Abrir Mnemotecnias</span>
                  <ArrowRight size={15} />
                </div>
              </motion.div>
            </Link>
          )}

          {filteredCourses.map((c) => {
            const theme = c.colorTheme || {};
            const primaryColor = theme.primary || '#7C3AED';
            const gradient = theme.gradient || 'linear-gradient(135deg, #7C3AED, #A855F7)';
            const badgeGrad = theme.badgeGradient || theme.gradient || 'linear-gradient(135deg, #7C3AED, #A855F7)';
            const bgGrad = theme.bg || `linear-gradient(180deg, ${theme.primary ? theme.primary + '10' : 'rgba(124, 58, 237, 0.06)'} 0%, var(--card-bg) 60%)`;
            const borderCol = theme.border || (theme.primary ? `${theme.primary}44` : 'rgba(124, 58, 237, 0.28)');
            const shadowCol = theme.shadow || (theme.primary ? `${theme.primary}18` : 'rgba(124, 58, 237, 0.08)');
            const btnShadow = theme.btnShadow || (theme.primary ? `${theme.primary}40` : 'rgba(124, 58, 237, 0.25)');

            const totalModules = Array.isArray(c.modules) ? c.modules.length : 0;
            const totalVideos = Array.isArray(c.modules) 
              ? c.modules.reduce((acc, m) => acc + (m.items?.length || 0), 0)
              : 0;

            const displayBadge = (c.badge && c.badge !== 'GENERAL') 
              ? c.badge 
              : (c.nombre ? c.nombre.toUpperCase().slice(0, 14) : 'CURSO');

            const displaySubtitulo = (c.subtitulo && !c.subtitulo.toLowerCase().includes('general •')) 
              ? c.subtitulo 
              : (totalModules > 0 ? `${totalModules} Módulos` : 'Módulos y Materiales');

            const displayDescripcion = (c.descripcion && !c.descripcion.toLowerCase().includes('curso de general')) 
              ? c.descripcion 
              : 'Temarios, fichas y material complementario para tu preparación universitaria.';

            return (
              <Link key={c.id} to={`/cursos/${c.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <motion.div 
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass-card" 
                  style={{ 
                    padding: 'clamp(16px, 2.2vw, 20px)', 
                    borderRadius: '20px', 
                    border: `1.5px solid ${borderCol}`, 
                    background: bgGrad, 
                    boxShadow: `0 8px 20px ${shadowCol}`, 
                    cursor: 'pointer', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: '100%', 
                    boxSizing: 'border-box', 
                    transition: 'all 0.2s ease' 
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ 
                      background: badgeGrad, 
                      color: '#FFFFFF', 
                      padding: '4px 10px', 
                      borderRadius: '999px', 
                      fontWeight: 800, 
                      fontSize: '0.78rem', 
                      boxShadow: `0 2px 6px ${btnShadow}` 
                    }}>
                      {displayBadge}
                    </span>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={e => { e.preventDefault(); e.stopPropagation(); }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 700, marginRight: '4px' }}>
                        {displaySubtitulo}
                      </span>

                      {/* Botón Editar para usuarios autenticados si es custom */}
                      {user && (c.template === 'briceno' || c.creatorUid || customAcademias.some(a => a.id === c.id)) && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setAcademyToEdit(c);
                            setIsCommunityModalOpen(true);
                          }}
                          title="Editar información del curso"
                          style={{
                            background: 'rgba(120, 120, 128, 0.15)',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '4px 7px',
                            cursor: 'pointer',
                            color: 'var(--text-main)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Edit3 size={13} />
                        </button>
                      )}

                      {/* Botón Reportar Curso u Observación */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setCourseToReport(c);
                          setIsReportModalOpen(true);
                        }}
                        title="Reportar una observación o error en este curso"
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '4px 8px',
                          cursor: 'pointer',
                          color: '#EF4444',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.72rem',
                          fontWeight: 700
                        }}
                      >
                        <Flag size={12} />
                        <span>Reportar</span>
                      </button>

                      {/* Botón Eliminar: SOLO Creador o Admin */}
                      {(isAdmin || (user && c.creatorUid && user.uid === c.creatorUid)) && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDeleteAcademy(c);
                          }}
                          title="Eliminar curso (Solo creador o admin)"
                          style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '4px 7px',
                            cursor: 'pointer',
                            color: '#EF4444',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>

                  <h3 style={{ fontSize: 'clamp(1.18rem, 1.6vw, 1.35rem)', fontWeight: 800, marginBottom: '6px', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                    {c.nombre}
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.86rem', lineHeight: 1.45, flex: 1 }}>
                    {displayDescripcion}
                  </p>

                  <div style={{ 
                    width: '100%', 
                    textAlign: 'center', 
                    padding: '10px 14px', 
                    background: gradient, 
                    color: '#FFFFFF', 
                    borderRadius: '12px', 
                    fontWeight: 800, 
                    fontSize: '0.88rem', 
                    boxShadow: `0 4px 12px ${btnShadow}`, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '6px', 
                    boxSizing: 'border-box' 
                  }}>
                    <span>Ingresar a {c.nombre.replace(/^(Academia|Curso|Ciclo)\s+/i, '')}</span>
                    <ArrowRight size={15} />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </section>
      )}
        </div>

      {/* Modal de Creación / Edición Comunitaria en Modo Simple */}
      <CommunityAcademyModal
        isOpen={isCommunityModalOpen}
        onClose={() => {
          setIsCommunityModalOpen(false);
          setAcademyToEdit(null);
        }}
        academyToEdit={academyToEdit}
      />

      {/* Modal del Extractor de Enlaces para la Consola */}
      <ConsoleExtractorModal
        isOpen={isExtractorModalOpen}
        onClose={() => setIsExtractorModalOpen(false)}
      />

      {/* Modal de Reporte / Observaciones de Curso */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => {
          setIsReportModalOpen(false);
          setCourseToReport(null);
        }}
        targetId={courseToReport?.id}
        targetTitle={courseToReport?.nombre || 'Curso'}
        targetType="curso"
        reportedUser={courseToReport?.creatorName || null}
      />

      {/* Modal de Flashcards por Curso, Tema y Subtema */}
      <CourseFlashcardsModal
        isOpen={!!courseForFlashcards}
        onClose={() => setCourseForFlashcards(null)}
        subject={courseForFlashcards}
      />

      {/* Modal de Tabla Periódica Interactiva y Valencias */}
      <PeriodicTableModal 
        isOpen={isPeriodicTableOpen} 
        onClose={() => setIsPeriodicTableOpen(false)} 
      />

      {/* Modal de Test Vocacional */}
      <VocationalTestModal
        isOpen={isVocationalTestOpen}
        onClose={() => setIsVocationalTestOpen(false)}
      />



      {/* Modal de Confirmación */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText || "Eliminar"}
        cancelText="Cancelar"
        variant={confirmModal.variant || "danger"}
      />

      {/* NUEVO: agregar playlist privada + reproductor + muro de cuenta */}
      <AddPlaylistModal
        isOpen={isAddYtModalOpen}
        onClose={() => setIsAddYtModalOpen(false)}
        onSaved={() => setYtSectionTab('mias')}
      />
      <YouTubePlayerModal
        isOpen={!!playerCourse}
        onClose={() => { setPlayerCourse(null); setPlayerLesson(null); }}
        course={playerCourse}
        initialLesson={playerLesson}
      />
      {needAccountModal && (
        <GoogleSignPromptModal
          isOpen={true}
          hideGuest={true}
          destination="/cursos"
          onClose={() => setNeedAccountModal(false)}
        />
      )}
    </div>
    </AccessGate>
  );
};
