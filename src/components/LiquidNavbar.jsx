import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from './ErrorBoundary';
import {
  Home,
  BookOpen,
  Cpu,
  Library,
  User,
  Palette,
  UploadCloud,
  Shield,
  Bell,
  MoreHorizontal,
  MessageSquare,
  Sparkles,
  Download,
  LogIn,
  LogOut,
  Flame,
  Trophy,
  Settings,
  Compass,
  Atom,
  Clock,
  Eye,
  Calculator
} from 'lucide-react';

import { Logo } from './Logo';
import { ThemeSelectorModal } from './ThemeSelectorModal';
import { SettingsModal } from './SettingsModal';
import { TermsModal } from './TermsModal';
import { UploadModal } from './UploadModal';
import { prefetchRouteByPath } from '../utils/routePreloader';
import { NotificationsModal } from './NotificationsModal';
import { GoogleSignPromptModal } from './GoogleSignPromptModal';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { getThemePalette } from '../utils/themeImmersion';
import { db } from '../lib/firebase';
import {
  collection,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';
import { OrsttyAvatarIcon } from './Mascots';
import { isOrsttyVisible } from '../lib/orsttySettings';
import { subscribeToSiteSettings } from '../lib/siteSettings';
import { usePomodoro } from '../context/PomodoroContext';
import { PomodoroNavIcon } from './PomodoroNavIcon';
import { isNativeApp } from '../config/appVersionConfig';

// Ícono SVG de fuego limpio y vectorial para Aprender
export const FluidFlameNavIcon = ({ size = 20, active = false, style = {} }) => {
  return (
    <Flame
      size={size}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        color: active ? '#FFFFFF' : 'currentColor',
        ...style
      }}
    />
  );
};

// Ícono representativo de ORSTTY en la barra de navegación: El chiquito moradito oficial de RASTRO
export const GeminiStarIcon = ({ size = 22, color, active = false, style = {} }) => (
  <OrsttyAvatarIcon size={size} active={active} style={style} />
);

export const LiquidNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const themePalette = getThemePalette(theme);
  const isAprender = location.pathname === '/aprender' || location.pathname.startsWith('/aprender');
  const isFormulario = location.pathname === '/formulario' || location.pathname.startsWith('/formulario');
  const isBiblioteca = location.pathname === '/biblioteca' || location.pathname.startsWith('/biblioteca');
  const isSpecialImmersion = isAprender || isFormulario;
  const { user, isAdmin, isRealAdmin, simulateStudentView, setSimulateStudentView, logout } = useAuth();
  const pomodoro = usePomodoro();
  const isPomodoroRunning = pomodoro?.isRunning || false;
  const openPomodoroModal = pomodoro?.openModal;

  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showGooglePrompt, setShowGooglePrompt] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMobileNav, setIsMobileNav] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [isOrsttyBtnVisible, setIsOrsttyBtnVisible] = useState(() => isOrsttyVisible(isAdmin));
  const [topActionTooltip, setTopActionTooltip] = useState(null);
  const tooltipTimeoutRef = useRef(null);

  const triggerTooltip = (text) => {
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    setTopActionTooltip(text);
    tooltipTimeoutRef.current = setTimeout(() => {
      setTopActionTooltip(null);
    }, 2400);
  };

  useEffect(() => {
    const updateOrstty = () => {
      setIsOrsttyBtnVisible(isOrsttyVisible(isAdmin));
    };
    updateOrstty();
    window.addEventListener('orstty_status_changed', updateOrstty);
    window.addEventListener('storage', updateOrstty);
    const unsub = subscribeToSiteSettings(() => updateOrstty());
    return () => {
      window.removeEventListener('orstty_status_changed', updateOrstty);
      window.removeEventListener('storage', updateOrstty);
      unsub();
    };
  }, [isAdmin]);

  useEffect(() => {
    const onResize = () => setIsMobileNav(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ============================================================
  // PWA
  // ============================================================

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showPWAInstallModal, setShowPWAInstallModal] = useState(false);

  const menuRef = useRef(null);

  // ============================================================
  // PWA: DETECTAR INSTALACIÓN Y CAPTURAR PROMPT
  // ============================================================

  useEffect(() => {
    const checkStandalone = () => {
      const standalone =
        isNativeApp() ||
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true;

      setIsStandalone(Boolean(standalone));
    };

    checkStandalone();

    // ----------------------------------------------------------
    // IMPORTANTE:
    // index.html puede haber capturado el evento antes de que
    // LiquidNavbar se monte.
    // ----------------------------------------------------------

    if (window.deferredPWAEvent) {
      setDeferredPrompt(window.deferredPWAEvent);

      console.log(
        '✅ RASTRO: recuperando evento PWA capturado previamente'
      );
    }

    // ----------------------------------------------------------
    // Capturar evento si aparece después
    // ----------------------------------------------------------

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();

      window.deferredPWAEvent = event;
      setDeferredPrompt(event);

      console.log(
        '✅ RASTRO: instalación PWA disponible'
      );
    };

    // ----------------------------------------------------------
    // Detectar instalación completada
    // ----------------------------------------------------------

    const handleAppInstalled = () => {
      console.log(
        '✅ RASTRO: aplicación instalada correctamente'
      );

      window.deferredPWAEvent = null;
      setDeferredPrompt(null);
      setIsStandalone(true);
    };

    window.addEventListener(
      'beforeinstallprompt',
      handleBeforeInstallPrompt
    );

    window.addEventListener(
      'appinstalled',
      handleAppInstalled
    );

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );

      window.removeEventListener(
        'appinstalled',
        handleAppInstalled
      );
    };
  }, []);

  // Mostrar popup custom de instalación cuando sea instalable (solo en Web)
  useEffect(() => {
    if (isNativeApp()) {
      setShowPWAInstallModal(false);
      return;
    }
    // No mostrar en páginas legales: la política debe verse limpia para revisión
    const route = window.location.hash || window.location.pathname || '';
    if (/(privacidad|privacy|politicas|terminos|eliminar-cuenta|delete-account)/i.test(route)) {
      setShowPWAInstallModal(false);
      return;
    }
    if (deferredPrompt && !isStandalone) {
      const hasSeen = sessionStorage.getItem('rastro_pwa_prompt_dismissed');
      if (hasSeen) return;
      const timer = setTimeout(() => setShowPWAInstallModal(true), 2500);
      return () => clearTimeout(timer);
    } else {
      setShowPWAInstallModal(false);
    }
  }, [deferredPrompt, isStandalone]);

  // ============================================================
  // INSTALAR PWA
  // ============================================================

  const handleInstallPWA = async () => {
    setIsMenuOpen(false);

    // ----------------------------------------------------------
    // Ya está instalada
    // ----------------------------------------------------------

    if (isStandalone) {
      alert(
        '✅ Ya estás disfrutando de RASTRO como aplicación instalada.'
      );

      return;
    }

    // ----------------------------------------------------------
    // Recuperar el prompt.
    //
    // Primero usamos el estado de React.
    // Si todavía no existe, usamos el evento global capturado
    // por index.html.
    // ----------------------------------------------------------

    const activePrompt =
      deferredPrompt || window.deferredPWAEvent;

    // ----------------------------------------------------------
    // Chrome todavía no ha proporcionado el prompt
    // ----------------------------------------------------------

    if (!activePrompt) {
      alert(
        '📱 La instalación de RASTRO todavía no está disponible.\n\n' +
        'Si estás usando Chrome o Edge, abre el menú ⋮ y busca ' +
        '"Instalar aplicación" o "Añadir a pantalla de inicio".'
      );

      return;
    }

    try {
      console.log(
        '📱 RASTRO: mostrando ventana nativa de instalación...'
      );

      // --------------------------------------------------------
      // Mostrar diálogo nativo
      // --------------------------------------------------------

      await activePrompt.prompt();

      // --------------------------------------------------------
      // Esperar respuesta del usuario
      // --------------------------------------------------------

      const choice = await activePrompt.userChoice;

      console.log(
        '📱 RASTRO: resultado de instalación:',
        choice?.outcome
      );

      // --------------------------------------------------------
      // El evento beforeinstallprompt solo puede utilizarse una
      // vez, por eso lo limpiamos.
      // --------------------------------------------------------

      window.deferredPWAEvent = null;
      setDeferredPrompt(null);

      if (choice?.outcome === 'accepted') {
        setIsStandalone(true);

        console.log(
          '✅ RASTRO: instalación aceptada'
        );
      } else {
        console.log(
          'ℹ️ RASTRO: instalación cancelada por el usuario'
        );
      }

    } catch (error) {
      console.error(
        '❌ RASTRO: error al mostrar instalación PWA:',
        error
      );
    }
  };

  useEffect(() => {
    window.installRastroApp = handleInstallPWA;
    return () => {
      delete window.installRastroApp;
    };
  }, [isStandalone, deferredPrompt]);

  // ============================================================
  // NOTIFICACIONES
  // ============================================================

  useEffect(() => {
    if (!user?.uid) {
      setUnreadCount(0);
      return;
    }

    try {
      const qUser = query(
        collection(db, 'notificaciones'),
        where('recipientUid', '==', user.uid)
      );

      const qAll = query(
        collection(db, 'notificaciones'),
        where('recipientUid', '==', 'all')
      );

      let userDocs = [];
      let allDocs = [];

      const updateCount = () => {
        const userUnread = userDocs.filter(d => !d.read).length;
        const allUnread = allDocs.filter(d => !d.read).length;
        setUnreadCount(userUnread + allUnread);
      };

      const unsubUser = onSnapshot(qUser, (snap) => {
        userDocs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        updateCount();
      }, (err) => {
        console.warn("Navbar user notif listener error:", err);
      });

      const unsubAll = onSnapshot(qAll, (snap) => {
        allDocs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        updateCount();
      }, (err) => {
        console.warn("Navbar all notif listener error:", err);
      });

      return () => {
        unsubUser();
        unsubAll();
      };
    } catch (e) {
      console.warn(
        'Notifications count catch:',
        e
      );
    }
  }, [user?.uid]);

  // Listener para abrir notificaciones desde cualquier enlace o aviso del dispositivo
  useEffect(() => {
    const checkParams = () => {
      const search = window.location.search;
      if (search.includes('openAvisos=true') || search.includes('openNotif=true')) {
        setIsNotifOpen(true);
      }
    };
    checkParams();
    window.addEventListener('popstate', checkParams);

    const handleOpenEvent = () => setIsNotifOpen(true);
    window.addEventListener('rastro-open-notificaciones', handleOpenEvent);

    return () => {
      window.removeEventListener('popstate', checkParams);
      window.removeEventListener('rastro-open-notificaciones', handleOpenEvent);
    };
  }, []);

  // ============================================================
  // CLICK FUERA DEL MENÚ
  // ============================================================

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }, 20);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  // ============================================================
  // RUTAS
  // ============================================================

  const profilePath = user ? '/perfil' : '/auth';

  const navItems = [
    {
      path: '/',
      label: 'Inicio',
      icon: Home
    },
    {
      path: '/aprender',
      label: 'Aprender',
      icon: Flame
    },
    {
      path: '/cursos',
      label: 'Cursos',
      icon: BookOpen
    },
    {
      path: '/simulador',
      label: 'Ranking',
      icon: Trophy
    },
    {
      path: '/biblioteca',
      label: 'Biblioteca',
      icon: Library
    },
    ...(isOrsttyBtnVisible ? [{ 
      path: '/orstty', 
      label: 'ORSTTY', 
      isOrstty: true,
      desktopOnly: true
    }] : []),
    {
      path: '/chats',
      label: 'Chats',
      icon: MessageSquare,
      desktopOnly: true
    },
    {
      path: profilePath,
      label: 'Perfil',
      icon: User
    }
  ];

  // ============================================================
  // ITEM ACTIVO
  // ============================================================

  const isItemActive = (itemPath) => {
    if (itemPath === '/') {
      return location.pathname === '/';
    }

    if (itemPath === '/aprender') {
      return (
        location.pathname === '/aprender' ||
        location.pathname.startsWith('/aprender/')
      );
    }

    if (itemPath === '/cursos') {
      return (
        location.pathname === '/cursos' ||
        location.pathname.startsWith('/cursos/')
      );
    }

    if (itemPath === '/simulador') {
      return (
        location.pathname === '/simulador' ||
        location.pathname.startsWith('/simulador/')
      );
    }

    if (itemPath === '/biblioteca') {
      return (
        location.pathname === '/biblioteca' ||
        location.pathname.startsWith('/biblioteca/')
      );
    }

    if (itemPath === '/orstty') {
      return (
        location.pathname === '/orstty' ||
        location.pathname.startsWith('/orstty/')
      );
    }

    if (itemPath === '/chats') {
      return (
        location.pathname === '/chats' ||
        location.pathname.startsWith('/chats/')
      );
    }

    if (
      itemPath === '/auth' ||
      itemPath === '/perfil'
    ) {
      return (
        location.pathname === '/auth' ||
        location.pathname === '/perfil' ||
        location.pathname.startsWith('/usuario')
      );
    }

    return (
      location.pathname === itemPath ||
      location.pathname.startsWith(`${itemPath}/`)
    );
  };

  const isAdminActive =
    location.pathname === '/admin' ||
    location.pathname.startsWith('/admin/');

  // ============================================================
  // RENDER
  // ============================================================

  if (location.pathname === '/orstty') {
    return null;
  }

  return (
    <>
      {/* ======================================================
          MOBILE HEADER
          ====================================================== */}

      <header
        className={`mobile-header ${isAprender && theme === 'negro_cosmico' ? 'mobile-header-cosmic' : ''}`}
        style={{
          padding: '6px 12px',
          gap: '6px',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          width: '100%',
          overflow: 'hidden',
          ...(isSpecialImmersion ? {
            borderBottom: `1.5px solid ${themePalette.navbarBorder}`,
            boxShadow: `0 4px 20px ${themePalette.glow}`,
            background: themePalette.isLight ? 'rgba(255, 255, 255, 0.95)' : (themePalette.cardBg || 'rgba(10, 15, 30, 0.88)')
          } : {})
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Logo height={32} />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            flexShrink: 0
          }}
        >

          {/* Asistente ORSTTY */}
          {isOrsttyBtnVisible && (
            <NavLink
              to="/orstty"
              title="Asistente ORSTTY"
              aria-label="Asistente ORSTTY"
              onMouseEnter={() => {
                prefetchRouteByPath('/orstty');
                triggerTooltip('Tutor Virtual Orstty');
              }}
              onTouchStart={() => {
                prefetchRouteByPath('/orstty');
                triggerTooltip('Tutor Virtual Orstty');
              }}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '12px',
                border: location.pathname.startsWith('/orstty') 
                  ? '1.5px solid rgba(168, 85, 247, 0.5)' 
                  : '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                background: location.pathname.startsWith('/orstty')
                  ? 'rgba(168, 85, 247, 0.2)'
                  : 'rgba(120, 120, 128, 0.08)',
                color: location.pathname.startsWith('/orstty') ? '#A855F7' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                cursor: 'pointer',
                flexShrink: 0,
                boxShadow: location.pathname.startsWith('/orstty') ? '0 0 12px rgba(168, 85, 247, 0.3)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <GeminiStarIcon size={19} active={location.pathname.startsWith('/orstty')} />
            </NavLink>
          )}

          {/* Mis Chats */}
          <NavLink
            to="/chats"
            title="Mis Chats"
            aria-label="Mis Chats"
            onMouseEnter={() => {
              prefetchRouteByPath('/chats');
              triggerTooltip('Comunidad & Chats');
            }}
            onTouchStart={() => {
              prefetchRouteByPath('/chats');
              triggerTooltip('Comunidad & Chats');
            }}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              border: location.pathname.startsWith('/chats') 
                ? '1.5px solid rgba(0, 122, 255, 0.5)' 
                : '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
              background: location.pathname.startsWith('/chats')
                ? 'rgba(0, 122, 255, 0.2)'
                : 'rgba(120, 120, 128, 0.08)',
              color: location.pathname.startsWith('/chats') ? 'var(--accent-color, #007AFF)' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              cursor: 'pointer',
              flexShrink: 0,
              boxShadow: location.pathname.startsWith('/chats') ? '0 0 12px rgba(0, 122, 255, 0.3)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <MessageSquare size={17} />
          </NavLink>

          {/* Notificaciones y Avisos */}
          {user && (
            <button
              onClick={() => setIsNotifOpen(true)}
              onMouseEnter={() => triggerTooltip('Avisos & Notificaciones')}
              onTouchStart={() => triggerTooltip('Avisos & Notificaciones')}
              title="Notificaciones y Avisos"
              aria-label="Notificaciones"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '12px',
                border: isNotifOpen 
                  ? '1.5px solid rgba(0, 122, 255, 0.5)' 
                  : '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
                background: isNotifOpen
                  ? 'rgba(0, 122, 255, 0.2)'
                  : 'rgba(120, 120, 128, 0.08)',
                color: isNotifOpen ? 'var(--accent-color, #007AFF)' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                position: 'relative',
                transition: 'all 0.15s ease'
              }}
            >
              <Bell size={17} />

              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    background: '#EF4444',
                    color: '#FFFFFF',
                    fontSize: '0.58rem',
                    fontWeight: 900,
                    minWidth: '15px',
                    height: '15px',
                    borderRadius: '10px',
                    padding: '0 3px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(239, 68, 68, 0.5)'
                  }}
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          )}

          {/* Pomodoro Pro */}
          <button
            onClick={() => {
              if (openPomodoroModal) openPomodoroModal();
            }}
            onMouseEnter={() => triggerTooltip('Temporizador Pomodoro')}
            onTouchStart={() => triggerTooltip('Temporizador Pomodoro')}
            title={isPomodoroRunning ? 'Pomodoro Activo (toca para ver)' : 'Temporizador Pomodoro'}
            aria-label="Temporizador Pomodoro"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              border: isPomodoroRunning 
                ? '1.5px solid rgba(234, 88, 12, 0.6)' 
                : '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
              background: isPomodoroRunning 
                ? 'rgba(234, 88, 12, 0.18)' 
                : 'rgba(120, 120, 128, 0.08)',
              color: isPomodoroRunning ? '#EA580C' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              position: 'relative',
              boxShadow: isPomodoroRunning ? '0 0 12px rgba(234, 88, 12, 0.35)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Clock size={17} />
            {isPomodoroRunning && (
              <span
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#EA580C',
                  boxShadow: '0 0 6px #EA580C'
                }}
              />
            )}
          </button>

          {/* Botón Rápido Fórmulas & Truquitos Pre-U */}
          <NavLink
            to="/formulario"
            onMouseEnter={() => triggerTooltip('Fórmulas & Mnemotecnias')}
            onTouchStart={() => triggerTooltip('Fórmulas & Mnemotecnias')}
            title="Fórmulas & Mnemotecnias (Truquitos Pre-U)"
            aria-label="Fórmulas y Mnemotecnias"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              border: isFormulario 
                ? '1.5px solid rgba(168, 85, 247, 0.6)' 
                : '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
              background: isFormulario 
                ? 'rgba(168, 85, 247, 0.2)' 
                : 'rgba(120, 120, 128, 0.08)',
              color: isFormulario ? 'var(--accent-color, #A855F7)' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              cursor: 'pointer',
              flexShrink: 0,
              boxShadow: isFormulario ? '0 0 12px rgba(168, 85, 247, 0.35)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Calculator size={17} />
          </NavLink>

          {/* Selector de Temas */}
          <button
            onClick={() => setIsThemeOpen(true)}
            onMouseEnter={() => triggerTooltip('Personalizar Temas & Colores')}
            onTouchStart={() => triggerTooltip('Personalizar Temas & Colores')}
            title="Cambiar Tema de Color"
            aria-label="Cambiar Tema"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              border: isThemeOpen 
                ? '1.5px solid rgba(168, 85, 247, 0.5)' 
                : '1px solid var(--card-border, rgba(120, 120, 128, 0.2))',
              background: isThemeOpen
                ? 'rgba(168, 85, 247, 0.2)'
                : 'rgba(120, 120, 128, 0.08)',
              color: isThemeOpen ? 'var(--accent-color, #A855F7)' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.15s ease'
            }}
          >
            <Palette size={17} />
          </button>
        </div>

        {/* Tooltip flotante instantáneo para que nuevos usuarios sepan qué es cada SVG */}
        <AnimatePresence>
          {topActionTooltip && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.94 }}
              transition={{ duration: 0.16 }}
              style={{
                position: 'fixed',
                top: '50px',
                right: '12px',
                zIndex: 9999999,
                background: 'rgba(15, 23, 42, 0.92)',
                color: '#F8FAFC',
                padding: '5px 12px',
                borderRadius: '10px',
                fontSize: '0.74rem',
                fontWeight: 800,
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                pointerEvents: 'none'
              }}
            >
              {topActionTooltip}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ======================================================
          MAIN FLOATING NAVBAR
          ====================================================== */}

      <div className="liquid-navbar-wrapper">

        <nav
          className={`liquid-navbar ${isAprender && theme === 'negro_cosmico' ? 'liquid-navbar-cosmic' : ''}`}
          style={{
            background: isSpecialImmersion
              ? (themePalette.isLight
                ? 'rgba(255, 255, 255, 0.96)'
                : 'rgba(15, 23, 42, 0.95)')
              : undefined,
            border: isSpecialImmersion
              ? `1.5px solid ${themePalette.navbarBorder || themePalette.subtleBorder || 'rgba(0,0,0,0.1)'}`
              : undefined,
            boxShadow: isSpecialImmersion
              ? (themePalette.isLight
                ? `0 12px 36px rgba(0, 0, 0, 0.08), 0 0 24px ${themePalette.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.95)`
                : `0 16px 42px rgba(0, 0, 0, 0.55), 0 0 28px ${themePalette.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.15)`)
              : undefined,
            backdropFilter: 'blur(24px) saturate(190%)',
            WebkitBackdropFilter: 'blur(24px) saturate(190%)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >

          <div
            className="desktop-logo-container"
            style={{
              paddingRight: '14px',
              marginRight: '8px',
              borderRight: isSpecialImmersion
                ? `1.5px solid ${themePalette.subtleBorder || 'rgba(0,0,0,0.1)'}`
                : undefined
            }}
          >
            <NavLink
              to="/"
              title="Inicio - RASTRO"
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none'
              }}
            >
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Logo height={36} />
                {isFormulario && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      right: '-6px',
                      background: themePalette.badgeGradient,
                      color: '#FFFFFF',
                      fontSize: '0.54rem',
                      fontWeight: 900,
                      padding: '1px 6px',
                      borderRadius: '6px',
                      boxShadow: `0 0 10px ${themePalette.glow}`,
                      letterSpacing: '0.04em'
                    }}
                  >
                    FÓRMULAS
                  </span>
                )}
              </div>
            </NavLink>
          </div>

          <div className="nav-items-container">

            {/* Navegación */}

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                isItemActive(item.path);

              const handleItemClick = () => {
                // Cursos libre sin sesión: el muro de acceso solo aparece en Perfil/Chats/Subir
              };

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleItemClick}
                  onMouseEnter={() => prefetchRouteByPath(item.path)}
                  onTouchStart={() => prefetchRouteByPath(item.path)}
                  end={item.path === '/'}
                  className={`nav-item ${item.isOrstty ? 'nav-item-orstty' : ''} ${item.desktopOnly ? 'desktop-only-nav-item' : ''} ${
                    isActive ? 'active' : ''
                  }`}
                  style={{
                    position: 'relative',
                    color: isActive
                      ? '#FFFFFF'
                      : isSpecialImmersion
                        ? (themePalette.isLight ? '#334155' : '#CBD5E1')
                        : undefined
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 26 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '2px',
                      position: 'relative',
                      zIndex: 2,
                      width: '100%',
                      height: '100%',
                      padding: '5px 8px',
                      boxSizing: 'border-box'
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="nav-pill-active"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '12px',
                          background: themePalette.navActiveGradient || themePalette.accent,
                          boxShadow: `0 4px 16px ${themePalette.glow}, 0 2px 6px rgba(0, 0, 0, 0.18)`,
                          border: '1px solid rgba(255, 255, 255, 0.35)',
                          zIndex: 1
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 420,
                          damping: 30
                        }}
                      />
                    )}

                    {item.isOrstty ? (
                      <div
                        style={{
                          position: 'relative',
                          width: '20px',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 2
                        }}
                      >
                        <GeminiStarIcon size={21} active={isActive} />
                      </div>
                    ) : Icon ? (
                      <Icon
                        size={18}
                        style={{
                          zIndex: 2,
                          position: 'relative',
                          color: isActive
                            ? '#FFFFFF'
                            : isSpecialImmersion
                              ? (themePalette.isLight ? '#334155' : '#CBD5E1')
                              : undefined
                        }}
                      />
                    ) : null}

                    <span
                      style={{
                        zIndex: 2,
                        position: 'relative',
                        color: isActive
                          ? '#FFFFFF'
                          : isSpecialImmersion
                            ? (themePalette.isLight ? '#334155' : '#CBD5E1')
                            : undefined,
                        fontWeight: isActive ? 900 : 700,
                        whiteSpace: 'nowrap',
                        lineHeight: 1.15
                      }}
                      className="nav-label"
                    >
                      {item.label}
                    </span>
                  </motion.div>
                </NavLink>
              );
            })}

            {/* Admin */}

            {isAdmin && (
              <NavLink
                to="/admin"
                className={`nav-item desktop-admin-pill ${
                  isAdminActive ? 'active' : ''
                }`}
                style={{
                  color: isAdminActive
                    ? 'var(--pill-active-text)'
                    : '#A855F7'
                }}
              >
                {isAdminActive && (
                  <motion.div
                    layoutId="activePill"
                    className="nav-pill-active"
                    style={{
                      background:
                        'linear-gradient(135deg, #A855F7, #6366F1)'
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                )}

                <Shield
                  size={18}
                  style={{
                    zIndex: 2,
                    position: 'relative'
                  }}
                />

                <span
                  style={{
                    zIndex: 2,
                    position: 'relative'
                  }}
                  className="nav-label"
                >
                  Admin
                </span>
              </NavLink>
            )}

            {/* Avisos / Notificaciones (Visible en Tablet y Desktop) */}
            <motion.button
              whileHover={{ scale: 1.07, y: -2 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 450, damping: 26 }}
              onClick={() => {
                if (user) {
                  setIsNotifOpen(true);
                } else {
                  setShowGooglePrompt(true);
                }
              }}
              className="nav-item nav-notif-btn"
              title="Notificaciones y Avisos"
              style={{
                background: 'transparent',
                border: 'none',
                position: 'relative',
                color: isSpecialImmersion ? (themePalette.isLight ? '#334155' : '#CBD5E1') : undefined,
                cursor: 'pointer'
              }}
            >
              <Bell
                size={18}
                style={{
                  zIndex: 2,
                  position: 'relative'
                }}
              />

              {unreadCount > 0 && (
                <motion.span
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '6px',
                    background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                    color: '#FFFFFF',
                    fontSize: '0.6rem',
                    fontWeight: 800,
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)',
                    zIndex: 3
                  }}
                >
                  {unreadCount > 9
                    ? '9+'
                    : unreadCount}
                </motion.span>
              )}

              <span
                style={{
                  zIndex: 2,
                  position: 'relative',
                  fontWeight: 700
                }}
                className="nav-label"
              >
                Avisos
              </span>
            </motion.button>

            {/* Aportar */}

            <motion.button
              whileHover={{ scale: 1.07, y: -2 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 450, damping: 26 }}
              onClick={() => setIsUploadOpen(true)}
              className="nav-item desktop-action-btn"
              title="Aportar Material"
              style={{
                background: 'transparent',
                border: 'none',
                color: isSpecialImmersion ? themePalette.accent : 'var(--accent-color)',
                cursor: 'pointer'
              }}
            >
              <UploadCloud
                size={18}
                style={{
                  zIndex: 2,
                  position: 'relative'
                }}
              />

              <span
                style={{
                  zIndex: 2,
                  position: 'relative',
                  fontWeight: 700
                }}
                className="nav-label"
              >
                Aportar
              </span>
            </motion.button>

            {/* Pomodoro Timer SVG Button */}
            <motion.button
              whileHover={{ scale: 1.07, y: -2 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 450, damping: 26 }}
              onClick={() => {
                if (openPomodoroModal) openPomodoroModal();
              }}
              className="nav-item desktop-action-btn"
              title={isPomodoroRunning ? "Pomodoro Activo (Abrir Temporizador)" : "Temporizador Pomodoro Pro"}
              style={{
                background: isPomodoroRunning ? 'rgba(239, 68, 68, 0.15)' : 'transparent',
                border: isPomodoroRunning ? '1px solid rgba(239, 68, 68, 0.35)' : 'none',
                borderRadius: '12px',
                color: isPomodoroRunning ? '#EF4444' : (isSpecialImmersion ? themePalette.accent : 'var(--text-secondary)'),
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s ease'
              }}
            >
              <PomodoroNavIcon
                size={18}
                isRunning={isPomodoroRunning}
                active={isPomodoroRunning}
              />

              <span
                style={{
                  zIndex: 2,
                  position: 'relative',
                  fontWeight: isPomodoroRunning ? 900 : 700,
                  color: isPomodoroRunning ? '#EF4444' : undefined
                }}
                className="nav-label"
              >
                Pomodoro
              </span>
            </motion.button>

            {/* Tema */}
            <motion.button
              whileHover={{ scale: 1.07, y: -2 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 450, damping: 26 }}
              onClick={() => setIsThemeOpen(true)}
              className="nav-item desktop-action-btn"
              title="Cambiar Tema"
              style={{
                background: 'transparent',
                border: 'none',
                color: isSpecialImmersion ? themePalette.accent : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Palette
                size={18}
                style={{
                  zIndex: 2,
                  position: 'relative'
                }}
              />

              <span
                style={{
                  zIndex: 2,
                  position: 'relative',
                  fontWeight: 700
                }}
                className="nav-label"
              >
                Tema
              </span>
            </motion.button>

            {/* ==================================================
                MENÚ MÁS
                ================================================== */}

            <div
              ref={menuRef}
              style={{
                position: 'relative',
                display: 'inline-flex',
                overflow: 'visible'
              }}
            >

              <motion.button
                whileHover={{ scale: 1.07, y: -2 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 450, damping: 26 }}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsMenuOpen((prev) => !prev);
                }}
                className={`nav-item ${
                  isMenuOpen ? 'menu-open' : ''
                }`}
                title="Más Opciones & Herramientas"
                aria-label="Más Opciones"
                aria-expanded={isMenuOpen}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isMenuOpen
                    ? themePalette.accent
                    : isAdminActive
                      ? '#A855F7'
                      : isSpecialImmersion
                        ? (themePalette.isLight ? '#334155' : '#CBD5E1')
                        : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >

                {isMenuOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.9
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9
                    }}
                    className="nav-pill-active"
                    style={{
                      background: isSpecialImmersion
                        ? `rgba(${themePalette.accentRgb}, 0.16)`
                        : 'rgba(0,122,255,0.12)'
                    }}
                    transition={{
                      duration: 0.15
                    }}
                  />
                )}

                <MoreHorizontal
                  size={18}
                  style={{
                    zIndex: 2,
                    position: 'relative'
                  }}
                />

                <span
                  className="nav-label"
                  style={{
                    zIndex: 2,
                    position: 'relative'
                  }}
                >
                  Más
                </span>

                {unreadCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '4px',
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#EF4444',
                      zIndex: 3
                    }}
                  />
                )}
              </motion.button>

              {/* ==================================================
                  POPOVER
                  ================================================== */}

              <AnimatePresence>

                {isMenuOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.94,
                      y: isMobileNav ? 10 : -10
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.94,
                      y: isMobileNav ? 10 : -10
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 28
                    }}
                    style={{
                      transformOrigin: isMobileNav ? 'bottom right' : 'top right',
                      background: themePalette.isLight ? 'rgba(255, 255, 255, 0.97)' : 'rgba(15, 23, 42, 0.96)',
                      border: `1.5px solid ${themePalette.subtleBorder || 'rgba(0,0,0,0.1)'}`,
                      boxShadow: themePalette.isLight
                        ? `0 20px 48px rgba(0, 0, 0, 0.16), 0 0 24px ${themePalette.glow}`
                        : `0 20px 48px rgba(0, 0, 0, 0.55), 0 0 24px ${themePalette.glow}`,
                      backdropFilter: 'blur(28px)',
                      WebkitBackdropFilter: 'blur(28px)'
                    }}
                    className="nav-popover-menu"
                  >

                    {/* Solo en Escritorio: Avisos, Chats, Aportar */}
                    {!isMobileNav && (
                      <>
                        {user && (
                          <motion.button
                            whileHover={{ x: 3, scale: 1.01 }}
                            whileTap={{ scale: 0.97 }}
                            type="button"
                            onClick={() => {
                              setIsNotifOpen(true);
                              setIsMenuOpen(false);
                            }}
                            className="nav-popover-item"
                            style={{
                              padding: '10px 14px',
                              borderRadius: '14px',
                              border: 'none',
                              background: themePalette.isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.07)',
                              color: themePalette.isLight ? '#1E293B' : '#F8FAFC',
                              fontSize: '0.84rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              width: '100%',
                              textAlign: 'left',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                              }}
                            >
                              <Bell
                                size={16}
                                style={{
                                  color: themePalette.accent
                                }}
                              />

                              <span style={{ color: themePalette.isLight ? '#1E293B' : '#F8FAFC' }}>
                                Avisos & Notificaciones
                              </span>
                            </div>

                            {unreadCount > 0 && (
                              <span
                                style={{
                                  background: '#EF4444',
                                  color: '#FFF',
                                  fontSize: '0.7rem',
                                  fontWeight: 800,
                                  padding: '2px 7px',
                                  borderRadius: '99px'
                                }}
                              >
                                {unreadCount}
                              </span>
                            )}
                          </motion.button>
                        )}

                        {/* Chats en menú */}
                        <motion.div whileHover={{ x: 3, scale: 1.01 }} whileTap={{ scale: 0.97 }} style={{ width: '100%' }}>
                          <NavLink
                            to="/chats"
                            onClick={() => setIsMenuOpen(false)}
                            className="nav-popover-item"
                            style={{
                              padding: '10px 14px',
                              borderRadius: '14px',
                              border: 'none',
                              background: location.pathname.startsWith('/chats')
                                ? `rgba(${themePalette.accentRgb}, 0.16)`
                                : (themePalette.isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.07)'),
                              color: themePalette.isLight ? '#1E293B' : '#F8FAFC',
                              fontSize: '0.84rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              width: '100%',
                              textAlign: 'left',
                              textDecoration: 'none',
                              boxSizing: 'border-box',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <MessageSquare
                              size={16}
                              style={{
                                color: themePalette.accent
                              }}
                            />
                            <span style={{ color: themePalette.isLight ? '#1E293B' : '#F8FAFC' }}>Mis Chats Privados</span>
                          </NavLink>
                        </motion.div>

                        {/* Aportar */}
                        <motion.button
                          whileHover={{ x: 3, scale: 1.01 }}
                          whileTap={{ scale: 0.97 }}
                          type="button"
                          onClick={() => {
                            setIsUploadOpen(true);
                            setIsMenuOpen(false);
                          }}
                          className="nav-popover-item"
                          style={{
                            padding: '10px 14px',
                            borderRadius: '14px',
                            border: 'none',
                            background: themePalette.isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.07)',
                            color: themePalette.isLight ? '#1E293B' : '#F8FAFC',
                            fontSize: '0.84rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            width: '100%',
                            textAlign: 'left',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <UploadCloud
                            size={16}
                            style={{
                              color: themePalette.accent
                            }}
                          />

                          <span style={{ color: themePalette.isLight ? '#1E293B' : '#F8FAFC' }}>
                            Aportar
                          </span>
                        </motion.button>
                      </>
                    )}

                    {/* Admin Panel (Aparece primero en móvil si es admin) */}
                    {isAdmin && (
                      <motion.div whileHover={{ x: 3, scale: 1.01 }} whileTap={{ scale: 0.97 }} style={{ width: '100%' }}>
                        <NavLink
                          to="/admin"
                          onClick={() =>
                            setIsMenuOpen(false)
                          }
                          style={{
                            padding: '11px 14px',
                            borderRadius: '14px',
                            background: isAdminActive
                              ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.28), rgba(99, 102, 241, 0.28))'
                              : 'linear-gradient(135deg, rgba(168, 85, 247, 0.16), rgba(99, 102, 241, 0.16))',
                            color: '#A855F7',
                            border: isAdminActive ? '1px solid rgba(168, 85, 247, 0.45)' : '1px solid rgba(168, 85, 247, 0.2)',
                            fontSize: '0.85rem',
                            fontWeight: 800,
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '10px',
                            boxSizing: 'border-box'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Shield size={17} />
                            <span>Panel</span>
                          </div>
                          <span style={{
                            fontSize: '0.66rem',
                            fontWeight: 800,
                            padding: '2px 7px',
                            borderRadius: '6px',
                            background: 'rgba(168, 85, 247, 0.25)',
                            color: '#A855F7'
                          }}>
                            GESTIÓN
                          </span>
                        </NavLink>
                      </motion.div>
                    )}

                    {/* Línea divisoria */}
                    <div style={{ height: '1px', background: 'var(--card-border)', margin: '4px 0' }} />

                    {/* Fórmulas & Truquitos Pre-U */}
                    <motion.div whileHover={{ x: 3, scale: 1.01 }} whileTap={{ scale: 0.97 }} style={{ width: '100%' }}>
                      <NavLink
                        to="/formulario"
                        onClick={() => setIsMenuOpen(false)}
                        className="nav-popover-item"
                        style={{
                          padding: '10px 14px',
                          borderRadius: '14px',
                          border: isFormulario 
                            ? '1.5px solid rgba(168, 85, 247, 0.45)' 
                            : '1px solid rgba(168, 85, 247, 0.22)',
                          background: isFormulario 
                            ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.22), rgba(99, 102, 241, 0.22))' 
                            : 'rgba(168, 85, 247, 0.08)',
                          color: themePalette.isLight ? '#1E293B' : '#F8FAFC',
                          fontSize: '0.84rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          width: '100%',
                          textAlign: 'left',
                          textDecoration: 'none',
                          boxSizing: 'border-box',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <Calculator size={17} style={{ color: '#A855F7', flexShrink: 0 }} />
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                          <span style={{ fontWeight: 800, color: themePalette.isLight ? '#1E293B' : '#F8FAFC' }}>
                            Fórmulas & Truquitos Pre-U
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary, #94A3B8)' }}>
                            Cara A Fórmulas • Cara B Mnemotecnias
                          </span>
                        </div>
                      </NavLink>
                    </motion.div>

                    {/* Temporizador Pomodoro */}
                    <motion.button
                      whileHover={{ x: 3, scale: 1.01 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        if (openPomodoroModal) openPomodoroModal();
                      }}
                      className="nav-popover-item"
                      style={{
                        padding: '10px 14px',
                        borderRadius: '14px',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        background: 'rgba(239, 68, 68, 0.06)',
                        color: themePalette.isLight ? '#1E293B' : '#F8FAFC',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        width: '100%',
                        textAlign: 'left',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <PomodoroNavIcon size={18} isRunning={isPomodoroRunning} active={isPomodoroRunning} />
                      <span style={{ color: isPomodoroRunning ? '#EF4444' : (themePalette.isLight ? '#1E293B' : '#F8FAFC') }}>
                        Temporizador Pomodoro
                      </span>
                    </motion.button>

                    {/* Configuración / Cambiar Tema */}
                    <motion.button
                      whileHover={{ x: 3, scale: 1.01 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={() => {
                        setIsSettingsOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="nav-popover-item"
                      style={{
                        padding: '10px 14px',
                        borderRadius: '14px',
                        border: `1px solid rgba(${themePalette.accentRgb}, 0.25)`,
                        background: `rgba(${themePalette.accentRgb}, 0.08)`,
                        color: themePalette.isLight ? '#1E293B' : '#F8FAFC',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        width: '100%',
                        textAlign: 'left',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <Settings
                        size={16}
                        style={{
                          color: themePalette.accent
                        }}
                      />
                      <span style={{ color: themePalette.isLight ? '#1E293B' : '#F8FAFC' }}>
                        Configuración
                      </span>
                    </motion.button>

                    {/* Instalar App PWA - Solo en Web */}
                    {!isNativeApp() && (
                      <motion.button
                        whileHover={{ x: 3, scale: 1.01 }}
                        whileTap={{ scale: 0.97 }}
                        type="button"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setShowPWAInstallModal(true);
                        }}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '14px',
                          border: '1px solid rgba(16, 185, 129, 0.35)',
                          background: 'rgba(16, 185, 129, 0.12)',
                          color: '#10B981',
                          fontSize: '0.84rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          width: '100%',
                          textAlign: 'left',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <Download size={16} style={{ color: '#10B981' }} />

                        <span style={{ color: '#10B981' }}>
                          {isStandalone
                            ? 'Instalada'
                            : 'Instalar App'}
                        </span>
                      </motion.button>
                    )}

                    {/* Políticas y Privacidad (Requisito Play Store) */}
                    <motion.div whileHover={{ x: 3, scale: 1.01 }} whileTap={{ scale: 0.97 }} style={{ width: '100%' }}>
                      <NavLink
                        to="/politicas"
                        onClick={() => setIsMenuOpen(false)}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '14px',
                          border: '1px solid var(--card-border)',
                          background: 'rgba(120, 120, 128, 0.06)',
                          color: 'var(--text-secondary)',
                          fontSize: '0.84rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          width: '100%',
                          textDecoration: 'none',
                          boxSizing: 'border-box'
                        }}
                      >
                        <Shield size={16} style={{ color: 'var(--accent-color)' }} />
                        <span>Políticas y Privacidad</span>
                      </NavLink>
                    </motion.div>

                    {/* Iniciar sesión / Iniciar sesión (otra cuenta) */}
                    {!user ? (
                      <motion.div whileHover={{ x: 3, scale: 1.01 }} whileTap={{ scale: 0.97 }} style={{ width: '100%' }}>
                        <NavLink
                          to="/auth"
                          onClick={() => setIsMenuOpen(false)}
                          style={{
                            padding: '10px 14px',
                            borderRadius: '14px',
                            border: `1px solid rgba(${themePalette.accentRgb}, 0.35)`,
                            background: `linear-gradient(135deg, rgba(${themePalette.accentRgb}, 0.14), rgba(${themePalette.accentRgb}, 0.06))`,
                            color: themePalette.accent,
                            fontSize: '0.84rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            width: '100%',
                            textAlign: 'left',
                            textDecoration: 'none',
                            boxSizing: 'border-box',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <LogIn size={16} style={{ color: themePalette.accent }} />
                          <span style={{ color: themePalette.accent, fontWeight: 800 }}>
                            Iniciar sesión
                          </span>
                        </NavLink>
                      </motion.div>
                    ) : (
                      <>
                        {isRealAdmin && (
                          <motion.div whileHover={{ x: 3, scale: 1.01 }} whileTap={{ scale: 0.97 }} style={{ width: '100%', marginBottom: '6px' }}>
                            <button
                              type="button"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setSimulateStudentView(!simulateStudentView);
                              }}
                              className="nav-popover-item"
                              style={{
                                padding: '10px 14px',
                                borderRadius: '14px',
                                border: simulateStudentView ? '1.5px solid #F59E0B' : '1.5px solid rgba(124, 58, 237, 0.3)',
                                background: simulateStudentView ? 'rgba(245, 158, 11, 0.15)' : 'rgba(124, 58, 237, 0.08)',
                                color: simulateStudentView ? '#D97706' : '#7C3AED',
                                fontSize: '0.84rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                width: '100%',
                                textAlign: 'left',
                                boxSizing: 'border-box',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <Eye size={16} style={{ color: simulateStudentView ? '#D97706' : '#7C3AED' }} />
                              <span>{simulateStudentView ? 'Salir Vista Alumno' : 'Modo Vista Alumno'}</span>
                            </button>
                          </motion.div>
                        )}

                        <motion.div whileHover={{ x: 3, scale: 1.01 }} whileTap={{ scale: 0.97 }} style={{ width: '100%' }}>
                          <button
                            type="button"
                            onClick={async () => {
                              setIsMenuOpen(false);
                              try { await logout(); } catch {}
                              navigate('/auth');
                            }}
                            className="nav-popover-item"
                            style={{
                              padding: '10px 14px',
                              borderRadius: '14px',
                              border: 'none',
                              background: themePalette.isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.07)',
                              color: themePalette.isLight ? '#1E293B' : '#F8FAFC',
                              fontSize: '0.84rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              width: '100%',
                              textAlign: 'left',
                              boxSizing: 'border-box',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <LogIn size={16} style={{ color: themePalette.accent }} />
                            <span style={{ color: themePalette.isLight ? '#1E293B' : '#F8FAFC' }}>
                              Cambiar de cuenta
                            </span>
                          </button>
                        </motion.div>

                        {/* Cerrar sesión */}
                        <motion.button
                          whileHover={{ x: 3, scale: 1.01 }}
                          whileTap={{ scale: 0.97 }}
                          type="button"
                          onClick={async () => {
                            setIsMenuOpen(false);
                            try { await logout(); } catch {}
                          }}
                          style={{
                            padding: '10px 14px',
                            borderRadius: '14px',
                            border: '1px solid rgba(239, 68, 68, 0.25)',
                            background: 'rgba(255, 59, 48, 0.10)',
                            color: '#EF4444',
                            fontSize: '0.84rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            width: '100%',
                            textAlign: 'left',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <LogOut size={16} style={{ color: '#EF4444' }} />
                          <span style={{ color: '#EF4444' }}>Cerrar sesión</span>
                        </motion.button>
                      </>
                    )}

                  </motion.div>
                )}

              </AnimatePresence>

            </div>

          </div>

        </nav>

      </div>

      {/* ======================================================
          MODALES
          ====================================================== */}

      <ThemeSelectorModal
        isOpen={isThemeOpen}
        onClose={() => setIsThemeOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onOpenTerms={() => setIsTermsOpen(true)}
      />

      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />

      <ErrorBoundary onError={() => { setIsNotifOpen(false); document.body.style.overflow = ''; }}>
        <NotificationsModal
          isOpen={isNotifOpen}
          onClose={() => setIsNotifOpen(false)}
        />
      </ErrorBoundary>

      <GoogleSignPromptModal
        isOpen={showGooglePrompt}
        onClose={() => setShowGooglePrompt(false)}
        destination="/cursos"
      />

      <AnimatePresence>
        {showPWAInstallModal && !isStandalone && !isNativeApp() && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowPWAInstallModal(false);
              sessionStorage.setItem('rastro_pwa_prompt_dismissed', '1');
            }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10000,
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              paddingBottom: 'max(16px, env(safe-area-inset-bottom))'
            }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 16 }}
              onClick={e => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '360px',
                borderRadius: '24px',
                background: 'var(--card-bg)',
                border: '1.5px solid var(--card-border)',
                padding: '22px',
                boxShadow: '0 24px 48px rgba(0,0,0,0.25)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                textAlign: 'center'
              }}
            >
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--card-bg)', border: '1.5px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', overflow: 'hidden' }}>
                <img src="./applogo.png" alt="RASTRO" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '12px' }} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-main)' }}>Instalar RASTRO</h3>
              <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>Accede más rápido, funciona sin conexión y recibe novedades. Instala RASTRO como app en tu dispositivo.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left', background: 'rgba(120,120,128,0.06)', borderRadius: '14px', padding: '12px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                <span>✓ Acceso directo desde tu pantalla</span>
                <span>✓ Carga más rápida y modo offline</span>
                <span>✓ Experiencia a pantalla completa</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                <button
                  onClick={() => {
                    setShowPWAInstallModal(false);
                    sessionStorage.setItem('rastro_pwa_prompt_dismissed', '1');
                  }}
                  style={{ flex: 1, padding: '11px', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--text-secondary)', fontWeight: 700, cursor: 'pointer' }}
                >
                  Más tarde
                </button>
                <button
                  onClick={async () => {
                    await handleInstallPWA();
                    setShowPWAInstallModal(false);
                    sessionStorage.setItem('rastro_pwa_prompt_dismissed', '1');
                  }}
                  style={{ flex: 1, padding: '11px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #007AFF, #00C6FF)', color: '#fff', fontWeight: 800, cursor: 'pointer', boxShadow: '0 6px 16px rgba(0,122,255,0.3)' }}
                >
                  Instalar App
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
};