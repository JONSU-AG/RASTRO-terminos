import React, { useState } from 'react';
import { X, Link2, Youtube } from 'lucide-react';
import { createUserPlaylist } from '../lib/userPlaylistsService';
import { useAuth } from '../context/AuthContext';

export const AddPlaylistModal = ({ isOpen, onClose, onSaved }) => {
  const { user } = useAuth();
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('General');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSave = async (e) => {
    e?.preventDefault?.();
    setError('');
    setSaving(true);
    try {
      const id = await createUserPlaylist(user, { url, title, subject, description });
      setUrl(''); setTitle(''); setSubject('General'); setDescription('');
      if (onSaved) onSaved(id);
      if (onClose) onClose();
    } catch (err) {
      setError(err?.message || 'No se pudo guardar.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 99990, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: '100%', maxWidth: '440px', background: 'var(--card-bg, #fff)', color: 'var(--text-main, #0F172A)', borderRadius: '20px', border: '1px solid var(--card-border)', padding: '20px', boxSizing: 'border-box' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800 }}>
            <Youtube size={18} color="#EF4444" />
            <span>Agregar video o playlist</span>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar" style={{ width: '32px', height: '32px', borderRadius: '10px', border: '1px solid var(--card-border)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={16} />
          </button>
        </div>
        <p style={{ margin: '0 0 12px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          Solo YouTube público por URL o ID. Nace privado; se publica solo si tocas Compartir.
        </p>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444', borderRadius: '12px', padding: '8px 12px', fontSize: '0.82rem', fontWeight: 600 }}>
              {error}
            </div>
          )}
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>URL o ID de YouTube</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1.5px solid var(--card-border)', borderRadius: '12px', padding: '0 12px' }}>
            <Link2 size={15} style={{ flexShrink: 0, color: 'var(--text-secondary)' }} />
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=... o playlist?list=..." style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', color: 'var(--text-main)', padding: '11px 0', fontSize: '0.86rem' }} />
          </div>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Título</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej: Álgebra desde cero" maxLength={80} style={{ border: '1.5px solid var(--card-border)', borderRadius: '12px', padding: '10px 12px', background: 'transparent', color: 'var(--text-main)', fontSize: '0.86rem', outline: 'none' }} />
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Materia</label>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="General" maxLength={40} style={{ border: '1.5px solid var(--card-border)', borderRadius: '12px', padding: '10px 12px', background: 'transparent', color: 'var(--text-main)', fontSize: '0.86rem', outline: 'none' }} />
          <button type="submit" disabled={saving || !url.trim()} style={{ marginTop: '4px', padding: '12px', borderRadius: '14px', border: 'none', background: saving ? '#9CA3AF' : '#EF4444', color: '#fff', fontWeight: 800, cursor: saving ? 'wait' : 'pointer' }}>
            {saving ? 'Guardando...' : 'Guardar privado'}
          </button>
        </form>
      </div>
    </div>
  );
};
