import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import { ORSTTY_EMOTIONS, ARTYON_EMOTIONS } from './Mascots';
import { requestSystemNotificationPermission, triggerSystemNotification } from '../lib/notifications';

const SEEN_KEY = 'rastro_notif_welcome_seen';

// Ventanita de bienvenida al inicio: las mascotas piden permiso de notificaciones.
// 1 sola vez (flag local). No bloquea login ni inicio. "No quiero" = no vuelve a salir.
export const NotifWelcomeModal = () => {
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let t = null;
    try {
      if (localStorage.getItem(SEEN_KEY) === '1') return;
    } catch { return; }
    t = setTimeout(() => setVisible(true), 1800);
    return () => { if (t) clearTimeout(t); };
  }, []);

  const dismiss = () => {
    try { localStorage.setItem(SEEN_KEY, '1'); } catch {}
    setVisible(false);
  };

  const handleAllow = async () => {
    setBusy(true);
    try {
      const res = await requestSystemNotificationPermission();
      if (res?.success) {
        await triggerSystemNotification({
          title: 'Notificaciones activadas',
          body: 'Te avisaremos de tu racha, clases y simulacros.',
          data: { url: '/cursos' },
          force: true,
        }).catch(() => {});
      }
    } catch {}
    setBusy(false);
    dismiss();
  };

  return (
    <AnimatePresence>
      {visible && (
        <div
          onClick={dismiss}
          style={{ position: 'fixed', inset: 0, zIndex: 99990, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', maxWidth: '360px', background: 'var(--card-bg, #fff)', color: 'var(--text-main, #0F172A)', borderRadius: '24px', border: '1px solid var(--card-border)', padding: '22px 20px', textAlign: 'center', boxSizing: 'border-box', position: 'relative' }}
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Cerrar"
              style={{ position: 'absolute', top: '10px', right: '10px', width: '30px', height: '30px', borderRadius: '10px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={15} />
            </button>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '4px', marginBottom: '10px' }}>
              <img src={ORSTTY_EMOTIONS.waving} alt="ORSTTY" style={{ width: '84px', height: '84px', objectFit: 'contain' }} />
              <img src={ARTYON_EMOTIONS.happy} alt="ARTYON" style={{ width: '72px', height: '72px', objectFit: 'contain' }} />
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '99px', background: 'rgba(0,122,255,0.1)', color: '#007AFF', fontSize: '0.74rem', fontWeight: 800, marginBottom: '8px' }}>
              <Bell size={13} />
              <span>Un favorcito</span>
            </div>

            <h3 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 800 }}>
              ¿Nos permites enviarte notificaciones?
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Te avisamos para salvar tu racha, de clases nuevas y simulacros. Sin spam.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                type="button"
                onClick={handleAllow}
                disabled={busy}
                style={{ padding: '12px', borderRadius: '14px', border: 'none', background: busy ? '#9CA3AF' : '#007AFF', color: '#fff', fontWeight: 800, fontSize: '0.9rem', cursor: busy ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Bell size={16} />
                <span>{busy ? 'Activando...' : 'Sí, permitir'}</span>
              </button>
              <button
                type="button"
                onClick={dismiss}
                style={{ padding: '11px', borderRadius: '14px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--text-main)', fontWeight: 700, fontSize: '0.86rem', cursor: 'pointer' }}
              >
                No quiero
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
