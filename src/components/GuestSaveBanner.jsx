import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

// Banner para sesiones de invitado: guardar progreso con Google + resolución de conflicto.
export const GuestSaveBanner = () => {
  const { isGuest, saveGuestProgressWithGoogle, resolveGuestConflict } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [conflict, setConflict] = useState(null);
  const [done, setDone] = useState('');

  if (!isGuest) return null;

  const handleSave = async () => {
    setBusy(true);
    setError('');
    try {
      const res = await saveGuestProgressWithGoogle();
      if (res?.status === 'merged') {
        setDone('¡Progreso guardado en tu cuenta Google!');
      }
    } catch (err) {
      if (err?.code === 'guest-conflict') {
        setConflict(err);
      } else {
        setError(err?.message || 'No se pudo guardar. Intenta de nuevo.');
      }
    } finally {
      setBusy(false);
    }
  };

  const handleResolve = async (choice) => {
    setBusy(true);
    setError('');
    try {
      await resolveGuestConflict(choice, conflict);
      setConflict(null);
      setDone(choice === 'guest'
        ? '¡Tu avance de invitado ahora está en tu cuenta Google!'
        : 'Listo, conservamos tu avance de Google.');
    } catch (err) {
      setError(err?.message || 'No se pudo resolver. Intenta de nuevo.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div style={{
        position: 'sticky', top: 0, zIndex: 5000,
        display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap',
        padding: '10px 14px', margin: '8px 12px 0', borderRadius: '16px',
        background: 'rgba(0, 122, 255, 0.1)', border: '1px solid rgba(0, 122, 255, 0.25)'
      }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 700, flex: 1, minWidth: '180px' }}>
          Estás como invitado: tu progreso vive en este dispositivo.
        </span>
        <button
          onClick={handleSave}
          disabled={busy}
          style={{
            padding: '8px 16px', borderRadius: '12px', border: 'none',
            background: 'linear-gradient(135deg, #007AFF, #00C6FF)', color: '#FFFFFF',
            fontWeight: 800, fontSize: '0.8rem', cursor: busy ? 'wait' : 'pointer', flexShrink: 0
          }}
        >
          {busy ? 'Guardando...' : 'Guardar con Google'}
        </button>
      </div>
      {error && (
        <div style={{ margin: '8px 12px 0', padding: '8px 12px', borderRadius: '12px', background: 'rgba(239,68,68,0.12)', color: '#EF4444', fontSize: '0.8rem', fontWeight: 600 }}>
          {error}
        </div>
      )}
      {done && (
        <div style={{ margin: '8px 12px 0', padding: '8px 12px', borderRadius: '12px', background: 'rgba(52,199,89,0.12)', color: '#10B981', fontSize: '0.8rem', fontWeight: 600 }}>
          {done}
        </div>
      )}
      {conflict && (
        <div
          onClick={() => setConflict(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 6000, background: 'rgba(0,0,0,0.65)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: '400px', borderRadius: '24px', padding: '24px',
              background: 'var(--card-bg)', border: '1.5px solid var(--card-border)', textAlign: 'center'
            }}
          >
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 8px' }}>
              Ya tienes avance guardado
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 18px' }}>
              Tu cuenta Google ya tiene progreso y tu sesión de invitado también. ¿Cuál conservamos?
            </p>
            <button
              onClick={() => handleResolve('guest')}
              disabled={busy}
              style={{
                width: '100%', padding: '13px', borderRadius: '14px', border: 'none',
                background: 'linear-gradient(135deg, #007AFF, #00C6FF)', color: '#FFFFFF',
                fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer', marginBottom: '10px'
              }}
            >
              Usar mi avance de invitado
            </button>
            <button
              onClick={() => handleResolve('google')}
              disabled={busy}
              style={{
                width: '100%', padding: '13px', borderRadius: '14px',
                border: '1.5px solid var(--card-border)', background: 'transparent',
                color: 'var(--text-main)', fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer'
              }}
            >
              Mantener mi avance de Google
            </button>
          </div>
        </div>
      )}
    </>
  );
};
