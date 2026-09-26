import React, { useState, useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { GamificationProvider } from './context/GamificationContext';
import { PomodoroProvider } from './context/PomodoroContext';
import { LiquidNavbar } from './components/LiquidNavbar';
import { CookieBanner } from './components/CookieBanner';
import { IOSModal } from './components/IOSModal';
import { TermsModal } from './components/TermsModal';
import { GuestSaveBanner } from './components/GuestSaveBanner';
import { WarningBanner } from './components/WarningBanner';
import { ChooseUsernameModal } from './components/ChooseUsernameModal';
import { DeviceNotificationsListener } from './components/DeviceNotificationsListener';
import { NotifWelcomeModal } from './components/NotifWelcomeModal';
import { PomodoroFloatingPill } from './components/PomodoroFloatingPill';
import { PomodoroModal } from './components/PomodoroModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AppLoadingSpinner } from './components/AppLoadingSpinner';
import { preloadAllMainRoutes } from './utils/routePreloader';
import { App as CapApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { useAuth } from './context/AuthContext';
import { GoogleSignPromptModal } from './components/GoogleSignPromptModal';

// Helper de retry con backoff para dynamic imports de React.lazy
const retryDynamicImport = async (importFn, retries = 3, delay = 300) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await importFn();
    } catch (err) {
      console.warn(`Dynamic import attempt ${i + 1} failed:`, err);
      if (i === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, delay * (i + 1)));
    }
  }
};

// Lazy load de páginas para optimización de bundle inicial con auto-recovery
const lazyLoad = (importFn, namedKey) =>
  lazy(async () => {
    try {
      const module = await retryDynamicImport(importFn);
      const comp = module.default || (namedKey ? module[namedKey] : null) || Object.values(module).find(v => typeof v === 'function' || typeof v === 'object');
      if (!comp) {
        throw new Error(`Module loaded but component '${namedKey || 'default'}' was not found.`);
      }
      return { default: comp };
    } catch (error) {
      console.warn('Dynamic chunk import failed after retries:', error);
      throw error;
    }
  });

const Home = lazyLoad(() => import('./pages/Home'), 'Home');
const Aprender = lazyLoad(() => import('./pages/Aprender'), 'Aprender');
const Cursos = lazyLoad(() => import('./pages/Cursos'), 'Cursos');
const AcademyDetail = lazyLoad(() => import('./pages/AcademyDetail'), 'AcademyDetail');
const Biblioteca = lazyLoad(() => import('./pages/Biblioteca'), 'Biblioteca');
const Simulador = lazyLoad(() => import('./pages/Simulador'), 'Simulador');
const Auth = lazyLoad(() => import('./pages/Auth'), 'Auth');
const Admin = lazyLoad(() => import('./pages/Admin'), 'Admin');
const UserProfile = lazyLoad(() => import('./pages/UserProfile'), 'UserProfile');
const Chats = lazyLoad(() => import('./pages/Chats'), 'Chats');
const OrsttyPage = lazyLoad(() => import('./pages/OrsttyPage'));
const FormularioPage = lazyLoad(() => import('./pages/FormularioPage'), 'FormularioPage');
const PoliticasPage = lazyLoad(() => import('./pages/PoliticasPage'), 'PoliticasPage');
const EliminarCuenta = lazyLoad(() => import('./pages/EliminarCuenta'), 'EliminarCuenta');

const PageLoader = () => (
  <AppLoadingSpinner message="Cargando..." minHeight="65vh" size={32} />
);

// Maintains individual scroll position for each route independently
const scrollPositions = new Map();

function ScrollPositionRestorer() {
  const location = useLocation();

  React.useEffect(() => {
    // 1. Save scroll position of current page before leaving
    const handleScroll = () => {
      scrollPositions.set(location.pathname, window.scrollY);
    };

    // Save scroll on scroll event and before unload
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2. Restore saved scroll position for target page (or top if first visit)
    const savedY = scrollPositions.get(location.pathname);
    if (savedY !== undefined) {
      window.scrollTo({ top: savedY, behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    // 3. Limpieza de visores PDF/lightbox al navegar para evitar pantalla blanca en Android
    window.dispatchEvent(new CustomEvent('rastro_clear_overlays'));
    setTimeout(() => {
      document.querySelectorAll('iframe').forEach(f => {
        if (f.src && f.src.startsWith('blob:')) {
          try { URL.revokeObjectURL(f.src); } catch {}
        }
      });
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }, 80);

    return () => {
      // Save current scroll position on cleanup (route departure)
      scrollPositions.set(location.pathname, window.scrollY);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  return null;
}

// El Perfil propio exige cuenta (Google o correo): los invitados ven el muro de acceso
function RequireAccount({ children }) {
  const { user, isGuest, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!user || isGuest) {
    return (
      <GoogleSignPromptModal
        isOpen={true}
        hideGuest={true}
        destination="/perfil"
        onClose={() => {
          if (window.history.length > 1) window.history.back();
          else window.location.hash = '#/';
        }}
      />
    );
  }
  return children;
}

export function App() {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  React.useEffect(() => {
    preloadAllMainRoutes();
    const handleOpenTerms = () => setIsTermsOpen(true);
    window.addEventListener('rumbo_open_terms', handleOpenTerms);
    window.addEventListener('rastro_open_terms', handleOpenTerms);
    // Botón atrás de Android: navega dentro de la app; solo minimiza si ya está en el inicio
    let backBtnListener = null;
    let urlOpenListener = null;
    (async () => {
      try {
        if (!Capacitor.isNativePlatform()) return;
        backBtnListener = await CapApp.addListener('backButton', ({ canGoBack }) => {
          if (canGoBack) {
            window.history.back();
          } else {
            CapApp.minimizeApp();
          }
        });

        // Manejo de deep links y apertura desde widgets/accesos directos
        urlOpenListener = await CapApp.addListener('appUrlOpen', (data) => {
          if (!data?.url) return;
          const urlStr = data.url;
          if (urlStr.includes('pomodoro')) {
            window.dispatchEvent(new CustomEvent('rastro_open_pomodoro'));
          } else if (urlStr.includes('#/')) {
            const hash = urlStr.substring(urlStr.indexOf('#'));
            window.location.hash = hash;
          } else {
            try {
              const parsed = new URL(urlStr);
              if (parsed.pathname && parsed.pathname !== '/') {
                window.location.hash = '#' + parsed.pathname;
              }
            } catch {}
          }
        });
      } catch {}
    })();
    return () => {
      window.removeEventListener('rumbo_open_terms', handleOpenTerms);
      window.removeEventListener('rastro_open_terms', handleOpenTerms);
      try { backBtnListener?.remove(); } catch {}
      try { urlOpenListener?.remove(); } catch {}
    };
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <GamificationProvider>
          <PomodoroProvider>
            <Router>
              <ScrollPositionRestorer />
              <div style={{ minHeight: '100vh', position: 'relative' }}>
                <ErrorBoundary>
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/aprender" element={<Aprender />} />
                      <Route path="/aprender/:subject" element={<Aprender />} />
                      <Route path="/cursos" element={<Cursos />} />
                      <Route path="/cursos/:id" element={<AcademyDetail />} />
                      <Route path="/biblioteca" element={<Biblioteca />} />
                      <Route path="/formulario" element={<FormularioPage />} />
                      <Route path="/simulador" element={<Simulador />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/chats" element={<RequireAccount><Chats /></RequireAccount>} />
                      <Route path="/orstty" element={<OrsttyPage />} />
                      <Route path="/usuario/:uid" element={<UserProfile />} />
                      <Route path="/perfil" element={<RequireAccount><UserProfile /></RequireAccount>} />
                      <Route path="/politicas" element={<PoliticasPage />} />
                      <Route path="/privacidad" element={<PoliticasPage />} />
                      <Route path="/privacy" element={<PoliticasPage />} />
                      <Route path="/terminos" element={<PoliticasPage />} />
                      <Route path="/eliminar-cuenta" element={<EliminarCuenta />} />
                      <Route path="/delete-account" element={<EliminarCuenta />} />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>

                {/* Liquid Floating Navbar */}
                <LiquidNavbar />

                {/* Dynamic Island Pomodoro Floating Pill & Modal */}
                <ErrorBoundary>
                  <PomodoroFloatingPill />
                  <PomodoroModal />
                </ErrorBoundary>

                {/* Native Device & Push Notification Listener */}
                <DeviceNotificationsListener />

                {/* Ventanita inicial de mascotas: permiso de notificaciones (1 sola vez) */}
                <NotifWelcomeModal />

                {/* Mandatory Choose Username Flow for Users */}
                <ChooseUsernameModal />

                {/* Guest session: save progress banner */}
                <GuestSaveBanner />

                {/* In-App On-Screen Notice Banner (Llamado de atención de moderación) */}
                <WarningBanner />

                {/* Cookie & Terms Banner */}
                <CookieBanner onOpenTerms={() => setIsTermsOpen(true)} />

                {/* Super Terms & Privacy Modal (Centrado, amplio y protector) */}
                <TermsModal
                  isOpen={isTermsOpen}
                  onClose={() => setIsTermsOpen(false)}
                />
              </div>
            </Router>
          </PomodoroProvider>
        </GamificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
