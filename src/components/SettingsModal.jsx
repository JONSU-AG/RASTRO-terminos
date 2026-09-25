import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  X, 
  Bell, 
  Palette, 
  Volume2, 
  Smartphone, 
  User, 
  Trash2, 
  AlertTriangle, 
  ShieldCheck, 
  ExternalLink, 
  Check, 
  Moon, 
  Sun, 
  Sparkles,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { db, auth } from '../lib/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import { requestSystemNotificationPermission, disableSystemNotifications } from '../lib/notifications';

const THEME_OPTIONS = [
  { id: 'light', name: 'Blanco 1 💎', desc: 'Claro brillante', isLight: true },
  { id: 'light-warm', name: 'Blanco 2 🛋️', desc: 'Claro cálido y suave', isLight: true },
  { id: 'dark', name: 'Negro 🌙', desc: 'Oscuro profundo', isLight: false },
  { id: 'guinda', name: 'Guinda 🍷', desc: 'Vino nocturno', isLight: false },
  { id: 'guinda-light', name: 'Rosa 🌸', desc: 'Rosa suave y crema', isLight: true },
  { id: 'coraje', name: 'Beige 🐕', desc: 'Beige suave', isLight: true },
  { id: 'coraje-dark', name: 'Morado ✨', desc: 'Morado y magenta', isLight: false },
  { id: 'beige-carmesi', name: 'Carmesí 🍷', desc: 'Beige y carmesí', isLight: true },
  { id: 'google-vibrant', name: 'Google Vibrant 🎨', desc: 'Azul y gris moderno', isLight: true },
];

export const SettingsModal = ({ isOpen, onClose, onOpenTerms }) => {
  const { user, userData, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const currentThemeObj = THEME_OPTIONS.find(t => t.id === theme) || THEME_OPTIONS[0];

  // Estados de preferencias
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    try {
      // El motor real usa 'rumbo_notifications_enabled'; se acepta la clave antigua por compatibilidad
      if (localStorage.getItem('rumbo_notifications_enabled') === 'true' ||
          localStorage.getItem('rastro_notifications_enabled') === 'true') return true;
    } catch {}
    return typeof Notification !== 'undefined' && Notification.permission === 'granted';
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('rastro_sound_effects') !== 'false';
  });

  const [hapticsEnabled, setHapticsEnabled] = useState(() => {
    return localStorage.getItem('rastro_haptics') !== 'false';
  });

  // Modal de confirmación para eliminar cuenta (Requisito Google Play Store)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Manejar cambio de notificaciones (usa el motor real: permiso OS en APK, permiso web en navegador)
  const handleToggleNotifications = async () => {
    if (!notificationsEnabled) {
      const res = await requestSystemNotificationPermission();
      setNotificationsEnabled(res.success);
      if (!res.success && (res.permission === 'denied' || res.permission === 'denied-always')) {
        alert("Las notificaciones están bloqueadas. Actívalas en Ajustes de tu dispositivo > Aplicaciones > RASTRO > Notificaciones.");
      }
      return;
    }
    disableSystemNotifications();
    try { localStorage.setItem('rastro_notifications_enabled', 'false'); } catch {}
    setNotificationsEnabled(false);
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem('rastro_sound_effects', String(next));
  };

  const handleToggleHaptics = () => {
    const next = !hapticsEnabled;
    setHapticsEnabled(next);
    localStorage.setItem('rastro_haptics', String(next));
  };

  // Proceso seguro de eliminación de cuenta para cumplimiento de Google Play
  const handleDeleteAccountPermanently = async () => {
    if (!user) return;
    setIsDeleting(true);
    setDeleteError('');

    try {
      // 1. Borrar documento del usuario en Firestore
      try {
        await deleteDoc(doc(db, 'usuarios', user.uid));
      } catch (e) {
        console.warn("Notice: User doc deletion in Firestore:", e);
      }

      // 2. Limpiar almacenamiento local
      localStorage.removeItem('rumbo_firebase_admin');
      localStorage.removeItem('rastro-theme');

      // 3. Borrar cuenta de Firebase Authentication
      const currentUser = auth.currentUser;
      if (currentUser) {
        await deleteUser(currentUser);
      }

      await logout();
      alert("Tu cuenta y tus datos han sido eliminados permanentemente.");
      onClose();
    } catch (err) {
      console.error("Error deleting account:", err);
      if (err.code === 'auth/requires-recent-login') {
        setDeleteError("Por seguridad de Google Play, requieres haber iniciado sesión recientemente para eliminar tu cuenta. Cierra sesión, vuelve a ingresar e inténtalo de nuevo.");
      } else {
        setDeleteError("Error al eliminar cuenta: " + err.message);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.72)',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      boxSizing: 'border-box'
    }}>
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 15 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        style={{
          background: 'var(--card-bg, #1e1b4b)',
          border: '1.5px solid var(--card-border, rgba(255, 255, 255, 0.15))',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          willChange: 'transform, opacity'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--card-border, rgba(255, 255, 255, 0.1))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #007AFF 0%, #3B82F6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)'
            }}>
              <Settings size={22} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main, #FFF)' }}>
                Configuración
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: 'var(--text-secondary, #94A3B8)' }}>
                Ajustes de la app, notificaciones y tu cuenta
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              borderRadius: '12px',
              padding: '8px',
              color: 'var(--text-main, #FFF)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Scroll */}
        <div style={{
          padding: '20px 24px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>

          {/* 1. NOTIFICACIONES PUSH & AVISOS */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Bell size={18} style={{ color: '#007AFF' }} />
              <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Notificaciones Push & Avisos
              </h4>
            </div>

            <div className="glass-card" style={{
              padding: '14px 16px',
              borderRadius: '16px',
              border: '1.5px solid var(--card-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', display: 'block' }}>
                    Alertas en el Teléfono (Pop-ups)
                  </span>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                    {notificationsEnabled ? '🔔 Notificaciones generales activadas' : '🔕 Notificaciones inactivas'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleToggleNotifications}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '99px',
                    border: 'none',
                    background: notificationsEnabled ? '#34C759' : 'rgba(148, 163, 184, 0.2)',
                    color: notificationsEnabled ? '#FFF' : 'var(--text-secondary)',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {notificationsEnabled ? 'Activadas' : 'Activar'}
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  window.dispatchEvent(new CustomEvent('rastro-open-notificaciones'));
                }}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--card-border)',
                  background: 'rgba(0, 122, 255, 0.08)',
                  color: 'var(--accent-color)',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                ⚙️ Configurar Tonos, Rachas y Recordatorios
              </button>
            </div>
          </div>

          {/* 2. APARIENCIA & TEMA VISUAL */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Palette size={18} style={{ color: '#A855F7' }} />
              <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Apariencia & Tema Visual
              </h4>
            </div>

            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '16px',
                  border: '1.5px solid var(--card-border)',
                  background: 'var(--card-bg)',
                  color: 'var(--text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    background: currentThemeObj.isLight ? 'rgba(0, 122, 255, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                    border: '1.5px solid var(--accent-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-color)',
                    flexShrink: 0
                  }}>
                    <Palette size={16} />
                  </div>
                  <div style={{ textAlign: 'left', minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {currentThemeObj.name}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {currentThemeObj.desc}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.70rem', fontWeight: 700, padding: '3px 8px', borderRadius: '8px', background: 'var(--accent-color)', color: '#fff' }}>
                    Activo
                  </span>
                  <ChevronDown size={18} style={{ color: 'var(--text-secondary)', transform: isThemeDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
                </div>
              </button>

              <AnimatePresence>
                {isThemeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 4, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      zIndex: 100,
                      background: 'var(--card-bg)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1.5px solid var(--card-border)',
                      borderRadius: '16px',
                      padding: '6px',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
                      maxHeight: '260px',
                      overflowY: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    {THEME_OPTIONS.map((t) => {
                      const isSelected = theme === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            setTheme(t.id);
                            setIsThemeDropdownOpen(false);
                          }}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: '12px',
                            border: isSelected ? '1.5px solid var(--accent-color)' : '1px solid transparent',
                            background: isSelected ? 'rgba(0, 122, 255, 0.12)' : 'transparent',
                            color: 'var(--text-main)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '10px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: isSelected ? 800 : 600, fontSize: '0.86rem', color: 'var(--text-main)' }}>
                              {t.name}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                              {t.desc}
                            </div>
                          </div>

                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: isSelected ? '2px solid var(--accent-color)' : '1.5px solid var(--card-border)',
                            background: isSelected ? 'var(--accent-color)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            flexShrink: 0
                          }}>
                            {isSelected && <Check size={12} strokeWidth={3} />}
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 3. EFECTOS & SONIDO */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Volume2 size={18} style={{ color: '#34C759' }} />
              <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Sonido & Respuesta Táctil
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="glass-card" style={{
                padding: '12px 16px',
                borderRadius: '14px',
                border: '1.5px solid var(--card-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Efectos de sonido en preguntas
                </span>
                <button
                  type="button"
                  onClick={handleToggleSound}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '99px',
                    border: 'none',
                    background: soundEnabled ? '#34C759' : 'rgba(148, 163, 184, 0.2)',
                    color: soundEnabled ? '#FFF' : 'var(--text-secondary)',
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    cursor: 'pointer'
                  }}
                >
                  {soundEnabled ? 'Activado' : 'Silenciado'}
                </button>
              </div>

              <div className="glass-card" style={{
                padding: '12px 16px',
                borderRadius: '14px',
                border: '1.5px solid var(--card-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Vibración háptica en móvil
                </span>
                <button
                  type="button"
                  onClick={handleToggleHaptics}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '99px',
                    border: 'none',
                    background: hapticsEnabled ? '#34C759' : 'rgba(148, 163, 184, 0.2)',
                    color: hapticsEnabled ? '#FFF' : 'var(--text-secondary)',
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    cursor: 'pointer'
                  }}
                >
                  {hapticsEnabled ? 'Activada' : 'Desactivada'}
                </button>
              </div>
            </div>
          </div>

          {/* 4. GESTIÓN DE CUENTA & SEGURIDAD (Cumplimiento Google Play Store) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <User size={18} style={{ color: '#FF3B30' }} />
              <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Tu Cuenta & Privacidad de Datos
              </h4>
            </div>

            {user ? (
              <div className="glass-card" style={{
                padding: '16px',
                borderRadius: '18px',
                border: '1.5px solid var(--card-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Foto" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF9500, #FF2D55)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: 800 }}>
                      {(user.displayName || 'U')[0].toUpperCase()}
                    </div>
                  )}

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {user.displayName || 'Estudiante RASTRO'}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {user.email}
                    </div>
                  </div>
                </div>

                {!showDeleteConfirm ? (
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid rgba(239, 68, 68, 0.3)',
                      background: 'rgba(239, 68, 68, 0.08)',
                      color: '#EF4444',
                      fontWeight: 800,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Trash2 size={16} />
                    <span>Eliminar mi Cuenta y Datos Personales</span>
                  </button>
                ) : (
                  <div style={{
                    padding: '14px',
                    borderRadius: '14px',
                    background: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <AlertTriangle size={18} style={{ color: '#EF4444', flexShrink: 0, marginTop: '2px' }} />
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                        <strong>¿Confirmas la eliminación permanente de tu cuenta?</strong>
                        <br />
                        De acuerdo con las normativas de Google Play Store, esta acción borrará permanentemente de nuestros servidores tu perfil, estadísticas de estudio y registro de acceso.
                      </div>
                    </div>

                    {deleteError && (
                      <div style={{ fontSize: '0.75rem', color: '#EF4444', fontWeight: 700 }}>
                        {deleteError}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                      <button
                        type="button"
                        onClick={() => { setShowDeleteConfirm(false); setDeleteError(''); }}
                        style={{
                          flex: 1,
                          padding: '8px',
                          borderRadius: '10px',
                          border: '1px solid var(--card-border)',
                          background: 'transparent',
                          color: 'var(--text-main)',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={handleDeleteAccountPermanently}
                        disabled={isDeleting}
                        style={{
                          flex: 1,
                          padding: '8px',
                          borderRadius: '10px',
                          border: 'none',
                          background: '#EF4444',
                          color: '#FFF',
                          fontWeight: 800,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          opacity: isDeleting ? 0.7 : 1
                        }}
                      >
                        {isDeleting ? 'Eliminando...' : 'Sí, Eliminar Cuenta'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="glass-card" style={{ padding: '14px 16px', borderRadius: '16px', border: '1.5px solid var(--card-border)', textAlign: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  No has iniciado sesión. Inicia sesión con Google para ver tus datos de cuenta.
                </span>
              </div>
            )}
          </div>

          {/* 5. LEGAL & VERSIÓN DE GOOGLE PLAY */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <ShieldCheck size={18} style={{ color: '#007AFF' }} />
              <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Legal & Versión de la App
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {onOpenTerms && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenTerms();
                  }}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '14px',
                    border: '1.5px solid var(--card-border)',
                    background: 'var(--card-bg)',
                    color: 'var(--text-main)',
                    fontWeight: 700,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>Política de Privacidad y Términos de Uso</span>
                  <ExternalLink size={16} style={{ color: '#007AFF' }} />
                </button>
              )}

              <div style={{
                padding: '12px 16px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--card-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Versión de Producción
                </span>
                <span style={{ fontSize: '0.78rem', color: '#007AFF', fontWeight: 800 }}>
                  v2.4.0 (Google Play Build)
                </span>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
