import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Smartphone, Mail, ShieldCheck } from 'lucide-react';

// Página pública: solicitud de eliminación de cuenta y datos (requisito Google Play).
// No requiere iniciar sesión.
export const EliminarCuenta = () => {
  const contactEmail = 'aguilar.jonsu@gmail.com';

  return (
    <div style={{ minHeight: '100vh', padding: '88px 16px 120px', maxWidth: '720px', margin: '0 auto' }}>
      <Link
        to="/"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '10px 18px', borderRadius: '14px', textDecoration: 'none',
          border: '1.5px solid var(--card-border)', background: 'var(--card-bg)',
          color: 'var(--text-main)', fontWeight: 800, fontSize: '0.85rem', marginBottom: '18px'
        }}
      >
        ← Volver a RASTRO
      </Link>

      <div className="glass-card" style={{ padding: '32px 26px', borderRadius: '28px', textAlign: 'center' }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '20px',
          background: 'rgba(239, 68, 68, 0.12)', display: 'inline-flex',
          alignItems: 'center', justifyContent: 'center', marginBottom: '16px'
        }}>
          <Trash2 size={30} color="#EF4444" />
        </div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)', margin: '0 0 10px' }}>
          Eliminar tu cuenta y tus datos
        </h1>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
          Tienes derecho a borrar tu cuenta de RASTRO y los datos asociados cuando quieras.
          Al eliminar tu cuenta se borran tu perfil, tu progreso, tus rachas y tus configuraciones.
          El material que hayas aportado a la comunidad podrá conservarse de forma anónima
          para no romper recursos compartidos.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '26px', borderRadius: '24px', marginTop: '16px' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Smartphone size={18} /> Opción 1 · Desde la app (inmediato, recomendado)
        </h2>
        <ol style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0, paddingLeft: '20px' }}>
          <li>Abre RASTRO e inicia sesión.</li>
          <li>Ve a tu <strong>Perfil → Ajustes</strong>.</li>
          <li>Elige <strong>Eliminar cuenta permanentemente</strong> y confirma.</li>
        </ol>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '10px 0 0' }}>
          Tu cuenta y tus datos personales se eliminan en ese momento.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '26px', borderRadius: '24px', marginTop: '16px' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Mail size={18} /> Opción 2 · Por correo
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 12px' }}>
          Si no puedes entrar a la app, escríbenos desde el correo de tu cuenta con el asunto{' '}
          <strong>"Eliminar mi cuenta RASTRO"</strong> a:
        </p>
        <a
          href={`mailto:${contactEmail}?subject=${encodeURIComponent('Eliminar mi cuenta RASTRO')}`}
          style={{
            display: 'inline-block', padding: '12px 22px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #007AFF, #00C6FF)', color: '#FFFFFF',
            fontWeight: 800, fontSize: '0.9rem', textDecoration: 'none'
          }}
        >
          {contactEmail}
        </a>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '12px 0 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={15} /> Atendemos tu solicitud en un plazo máximo de 30 días.
        </p>
      </div>
    </div>
  );
};

export default EliminarCuenta;
