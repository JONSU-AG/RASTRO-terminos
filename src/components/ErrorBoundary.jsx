import React from 'react';
import { AlertTriangle, RotateCcw, Home, Sparkles } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('RASTRO ErrorBoundary:', error, info);
    document.body.style.overflow = '';
    if (this.props.onError) this.props.onError();
  }

  handleRetry = () => {
    sessionStorage.removeItem('rastro_chunk_reload');
    window.location.reload(true);
  };

  handleGoHome = () => {
    sessionStorage.removeItem('rastro_chunk_reload');
    const baseUrl = window.location.origin + window.location.pathname;
    window.location.href = baseUrl + '#/';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const errorMsg = String(this.state.error?.message || this.state.error || '');
      const isChunkError = 
        errorMsg.includes('dynamically imported module') || 
        errorMsg.includes('Loading chunk') || 
        errorMsg.includes('Failed to fetch') ||
        errorMsg.includes('Importing a module script failed');

      return (
        <div style={{ padding: '40px 20px', textAlign: 'center', maxWidth: '520px', margin: '40px auto' }}>
          <div style={{
            background: 'var(--card-bg, #FFFFFF)',
            border: '1.5px solid var(--card-border, rgba(0, 122, 255, 0.2))',
            borderRadius: '24px',
            padding: '32px 24px',
            boxShadow: '0 12px 36px rgba(0,0,0,0.08)'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: isChunkError ? 'rgba(0, 122, 255, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              marginBottom: '16px'
            }}>
              {isChunkError ? (
                <Sparkles size={32} style={{ color: 'var(--accent-color, #007AFF)' }} />
              ) : (
                <AlertTriangle size={32} style={{ color: '#EF4444' }} />
              )}
            </div>

            <h2 style={{ color: 'var(--text-main)', fontWeight: 800, marginBottom: '8px', fontSize: '1.25rem' }}>
              {isChunkError ? 'Nueva versión de RASTRO disponible' : 'Algo salió mal'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '22px', lineHeight: 1.5, wordBreak: 'break-word' }}>
              {isChunkError 
                ? 'Se detectó una actualización en RASTRO o un corte temporal de red. Haz clic en "Ir a Inicio" o "Reintentar" para recargar los módulos.'
                : errorMsg || 'Ocurrió un error inesperado.'
              }
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={this.handleRetry}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 20px',
                  borderRadius: '14px',
                  border: 'none',
                  background: 'var(--accent-color, #007AFF)',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0, 122, 255, 0.3)'
                }}
              >
                <RotateCcw size={16} />
                <span>Reintentar</span>
              </button>
              <button
                type="button"
                onClick={this.handleGoHome}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 20px',
                  borderRadius: '14px',
                  border: '1.5px solid var(--card-border, #CBD5E1)',
                  background: 'var(--card-bg, #FFFFFF)',
                  color: 'var(--text-main, #0F172A)',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                <Home size={16} />
                <span>Ir a Inicio</span>
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
