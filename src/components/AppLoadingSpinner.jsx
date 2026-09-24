import React from 'react';
import { Sparkles } from 'lucide-react';
import { OrsttyMascot } from './Mascots';

export const PlayStoreSpinner = ({ size = 32, color = 'var(--accent-color)' }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(0,122,255,0.1)',
        borderRadius: '50%'
      }}
    >
      <Sparkles
        size={size}
        className="spinning-icon"
        style={{ color: color || 'var(--accent-color)' }}
      />
    </div>
  );
};

export const AppLoadingSpinner = ({ message = 'Cargando...', minHeight = '280px', padding = '80px 20px', size = 32 }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding,
        minHeight,
        textAlign: 'center',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <PlayStoreSpinner size={size} />
      </div>
      {message && (
        <p style={{ color: 'var(--text-secondary)', fontWeight: 600, margin: 0 }}>
          {message}
        </p>
      )}
    </div>
  );
};

export const MascotLoadingSpinner = ({ message = 'Cargando contenido...', mood = 'study', minHeight = '220px', padding = '40px 20px' }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding,
        minHeight,
        textAlign: 'center',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <PlayStoreSpinner size={32} />
      </div>
      {message && (
        <p style={{ color: 'var(--text-secondary)', fontWeight: 600, margin: 0 }}>
          {message}
        </p>
      )}
    </div>
  );
};
