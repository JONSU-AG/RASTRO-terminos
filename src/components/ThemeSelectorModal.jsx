import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Sparkles, X, Check, Flame, Heart, Wine, ChevronDown, Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const THEMES = [
  {
    id: 'light',
    name: 'Blanco 1',
    shortDesc: 'Claro brillante',
    icon: Sun,
    previewBg: '#F2F2F7',
    previewCard: '#FFFFFF',
    previewAccent: '#007AFF',
    badgeColor: '#007AFF'
  },
  {
    id: 'light-warm',
    name: 'Blanco 2',
    shortDesc: 'Claro cálido',
    icon: Flame,
    previewBg: '#F6F3EC',
    previewCard: '#FFFFFF',
    previewAccent: '#EA580C',
    badgeColor: '#EA580C'
  },
  {
    id: 'dark',
    name: 'Negro',
    shortDesc: 'Oscuro profundo',
    icon: Moon,
    previewBg: '#000000',
    previewCard: '#1C1C1E',
    previewAccent: '#0A84FF',
    badgeColor: '#38BDF8'
  },
  {
    id: 'guinda',
    name: 'Guinda 🍷',
    shortDesc: 'Vino nocturno',
    icon: Wine,
    previewBg: '#2d060d',
    previewCard: '#440a14',
    previewAccent: '#E11D48',
    badgeColor: '#FB7185'
  },
  {
    id: 'guinda-light',
    name: 'Rosa 🌸',
    shortDesc: 'Rosa y crema',
    icon: Heart,
    previewBg: '#FDF2F4',
    previewCard: '#FFFFFF',
    previewAccent: '#BE123C',
    badgeColor: '#BE123C'
  },
  {
    id: 'coraje',
    name: 'Beige 🐕',
    shortDesc: 'Beige suave',
    icon: Heart,
    previewBg: '#F4EBE1',
    previewCard: '#FFFAF5',
    previewAccent: '#DB2777',
    badgeColor: '#DB2777'
  },
  {
    id: 'coraje-dark',
    name: 'Morado ✨',
    shortDesc: 'Morado y magenta',
    icon: Sparkles,
    previewBg: '#120919',
    previewCard: '#22102C',
    previewAccent: '#EC4899',
    badgeColor: '#EC4899'
  },
  {
    id: 'beige-carmesi',
    name: 'Carmesí 🍷',
    shortDesc: 'Beige y carmesí',
    icon: Flame,
    previewBg: '#E8DFD8',
    previewCard: '#F8F3EE',
    previewAccent: '#9F1239',
    badgeColor: '#9F1239'
  }
];

export const ThemeSelectorModal = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  if (!isOpen) return null;

  const currentThemeObj = THEMES.find(t => t.id === theme) || THEMES[0];
  const CurrentIcon = currentThemeObj.icon;

  const handleSelectTheme = (themeId) => {
    toggleTheme(themeId);
    setIsDropdownOpen(false);
  };

  return (
    <AnimatePresence>
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000200,
          padding: '16px',
          paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
          boxSizing: 'border-box'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          style={{
            width: '100%',
            maxWidth: '420px',
            maxHeight: 'min(90vh, 560px)',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--card-bg)',
            border: '1.5px solid var(--card-border)',
            borderRadius: '24px',
            padding: '20px 18px 16px',
            boxShadow: '0 20px 48px rgba(0,0,0,0.35)',
            color: 'var(--text-main)',
            position: 'relative',
            overflow: 'hidden',
            willChange: 'transform, opacity'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexShrink: 0 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Palette size={20} style={{ color: 'var(--accent-color)' }} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                  Temas
                </h3>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--accent-color)',
                  background: 'rgba(0, 122, 255, 0.12)',
                  padding: '2px 8px',
                  borderRadius: '10px'
                }}>
                  {THEMES.length} estilos
                </span>
              </div>
              <p style={{ margin: '3px 0 0', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Selecciona la apariencia en el desplegable
              </p>
            </div>

            <button
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(120, 120, 128, 0.14)',
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

          {/* Desplegable Controls Container */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            {/* Main Dropdown Trigger */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Desplegable de Temas
              </label>
              
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '16px',
                  border: `2px solid ${currentThemeObj.badgeColor}`,
                  background: 'rgba(120, 120, 128, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  boxShadow: `0 4px 14px ${currentThemeObj.badgeColor}22`,
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '12px',
                      background: currentThemeObj.previewBg,
                      border: `2px solid ${currentThemeObj.previewAccent}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: currentThemeObj.previewAccent,
                      flexShrink: 0,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }}
                  >
                    <CurrentIcon size={18} />
                  </div>
                  <div style={{ textAlign: 'left', minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {currentThemeObj.name}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {currentThemeObj.shortDesc}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '8px', background: currentThemeObj.badgeColor, color: '#fff' }}>
                    Activo
                  </span>
                  <ChevronDown size={18} style={{ color: 'var(--text-secondary)', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                </div>
              </button>
            </div>

            {/* Expanded Dropdown Options List */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0, scale: 0.98 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  style={{
                    borderRadius: '18px',
                    border: '1.5px solid var(--card-border)',
                    background: 'rgba(120, 120, 128, 0.05)',
                    padding: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    maxHeight: '260px',
                    overflowY: 'auto'
                  }}
                >
                  {THEMES.map((t) => {
                    const isSelected = theme === t.id;
                    const Icon = t.icon;

                    return (
                      <motion.button
                        key={t.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectTheme(t.id)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '12px',
                          border: isSelected ? `1.5px solid ${t.badgeColor}` : '1px solid transparent',
                          background: isSelected ? 'rgba(120, 120, 128, 0.14)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '10px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                          <div
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '8px',
                              background: t.previewBg,
                              border: `1.5px solid ${t.previewAccent}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: t.previewAccent,
                              flexShrink: 0
                            }}
                          >
                            <Icon size={14} />
                          </div>
                          <span style={{ fontSize: '0.86rem', fontWeight: isSelected ? 800 : 600, color: 'var(--text-main)' }}>
                            {t.name}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                            {t.shortDesc}
                          </span>
                          <div
                            style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              border: isSelected ? `2px solid ${t.badgeColor}` : '1.5px solid var(--card-border)',
                              background: isSelected ? t.badgeColor : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff',
                              flexShrink: 0
                            }}
                          >
                            {isSelected && <Check size={11} strokeWidth={3} />}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Live Preview Card */}
            <div style={{
              padding: '12px 14px',
              borderRadius: '16px',
              background: 'var(--bg-main)',
              border: '1px dashed var(--card-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '0.70rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  Vista previa activa
                </span>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '1px' }}>
                  {currentThemeObj.name} — {currentThemeObj.shortDesc}
                </div>
              </div>
              <div style={{
                padding: '4px 10px',
                borderRadius: '10px',
                background: currentThemeObj.previewAccent,
                color: '#fff',
                fontSize: '0.74rem',
                fontWeight: 700
              }}>
                RASTRO
              </div>
            </div>

          </div>

          {/* Footer - "Listo" button */}
          <div style={{ marginTop: '14px', flexShrink: 0 }}>
            <button
              onClick={onClose}
              style={{
                padding: '12px 20px',
                borderRadius: '14px',
                border: 'none',
                background: 'var(--accent-color)',
                color: '#fff',
                fontSize: '0.92rem',
                fontWeight: 800,
                cursor: 'pointer',
                width: '100%',
                boxShadow: '0 4px 14px rgba(0, 122, 255, 0.25)',
                transition: 'all 0.18s ease'
              }}
            >
              Listo
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
