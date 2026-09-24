import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { getAssetUrl } from '../lib/notifications';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const STORAGE_KEY = 'rastro_channel_popup_last_shown';
const channelUrl = "https://whatsapp.com/channel/0029VbDFAEu7YScyVZBNul0X";

export function WhatsAppChannelPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const lastShown = localStorage.getItem(STORAGE_KEY);
      const now = Date.now();

      if (lastShown && now - parseInt(lastShown, 10) < SEVEN_DAYS_MS) {
        return;
      }

      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => clearTimeout(timer);
    } catch {
      // ignore storage restriction
    }
  }, []);

  const handleDismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    } catch {}
    setIsVisible(false);
  };

  const handleJoin = () => {
    handleDismiss();
    window.open(channelUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleDismiss}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000200,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0, transition: { duration: 0.2 } }}
            onClick={e => e.stopPropagation()}
            style={{
              background: '#F2F2F7',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '340px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(0,0,0,0.08)',
              position: 'relative',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'
            }}
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 10,
                background: 'rgba(0,0,0,0.25)',
                border: 'none',
                borderRadius: '50%',
                width: '26px',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
            >
              <X size={14} strokeWidth={2.5} />
            </button>

            {/* Header - Canal */}
            <div style={{
              background: 'linear-gradient(180deg, #1C8D5F, #128C7E)',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <img
                src={getAssetUrl('assets/canal.jpg')}
                alt="Canal"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2.5px solid rgba(255,255,255,0.4)'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span style={{
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    letterSpacing: '-0.01em'
                  }}>FUTURO CACHIMBO | UNSA</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#53BDEB">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <span style={{
                  color: 'rgba(255,255,255,0.65)',
                  fontSize: '0.7rem',
                  fontWeight: 500
                }}>Canal oficial · De tu buen amigo Jonsu</span>
              </div>
            </div>

            {/* Mensaje */}
            <div style={{ padding: '12px 16px' }}>
              <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '14px 16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                position: 'relative'
              }}>
                <p style={{
                  margin: 0,
                  fontSize: '0.88rem',
                  color: '#1C1C1E',
                  lineHeight: 1.5,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif'
                }}>
                  ¡Hola! 👋 Esta web fue creada con mucho cariño y esfuerzo por <strong>tu buen amigo Jonsu.</strong>
                </p>

                <div style={{
                  background: 'linear-gradient(135deg, #FFF9E6, #FFF3CC)',
                  borderLeft: '3px solid #FF9500',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  margin: '10px 0'
                }}>
                  <p style={{
                    margin: 0,
                    fontSize: '0.84rem',
                    color: '#1C1C1E',
                    lineHeight: 1.5,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif'
                  }}>
                    Deja de perder la vida en ti mismo, recuerda que <strong>eres una persona increíble</strong> y <strong style={{ color: '#34C759' }}>completamente capaz de lograr tu ingreso</strong> 🧿✨
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '6px',
                  margin: '8px 0 0'
                }}>
                  <span style={{ fontSize: '0.85rem' }}>⚠️</span>
                  <p style={{
                    margin: 0,
                    fontSize: '0.78rem',
                    color: '#8E8E93',
                    lineHeight: 1.4,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif'
                  }}>
                    <strong style={{ color: '#3A3A3C' }}>Dato muy importante:</strong> No contamos con un servidor propio, por lo que el enlace de la web puede cambiar periódicamente. Únete al canal oficial para tener siempre el enlace activo.
                  </p>
                </div>

                <span style={{
                  display: 'block',
                  textAlign: 'right',
                  fontSize: '0.68rem',
                  color: '#AEAEB2',
                  marginTop: '6px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif'
                }}>Ahora</span>
              </div>
            </div>

            {/* Botón Unirme */}
            <div style={{ padding: '0 16px 16px' }}>
              <button
                onClick={handleJoin}
                style={{
                  width: '100%',
                  padding: '13px',
                  background: 'linear-gradient(135deg, #34C759, #30B350)',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '14px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(52,199,89,0.35)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
                  letterSpacing: '-0.01em'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Unirme al canal
              </button>
            </div>

            {/* Footer */}
            <div style={{
              background: '#F2F2F7',
              borderTop: '0.5px solid rgba(0,0,0,0.08)',
              padding: '10px 16px',
              textAlign: 'center',
              fontSize: '0.68rem',
              color: '#AEAEB2',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif'
            }}>
              © RASTRO · De tu buen amigo Jonsu
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
