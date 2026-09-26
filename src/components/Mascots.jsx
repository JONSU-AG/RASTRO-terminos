import React from 'react';
import { motion } from 'framer-motion';

/**
 * CATÁLOGO DE EMOCIONES REALES DE LAS MASCOTAS OFICIALES DE RASTRO
 * Extraídas con alta fidelidad de las hojas de stickers oficiales:
 * - ORSTTY: El moradito oficial con mariposita y expresiones Duolingo-style.
 * - ARTYON: El verdecito cósmico carismático y tierno.
 */
/**
 * Resuelve rutas de assets garantizando compatibilidad con GitHub Pages y rutas relativas
 */
export const resolveMascotAsset = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  const base = import.meta.env.BASE_URL || './';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
};

/**
 * CATÁLOGO DE EMOCIONES REALES DE LAS MASCOTAS OFICIALES DE RASTRO
 * Extraídas con alta fidelidad de las hojas de stickers oficiales:
 * - ORSTTY: El moradito oficial con mariposita y expresiones Duolingo-style.
 * - ARTYON: El verdecito cósmico carismático y tierno.
 */
export const ORSTTY_EMOTIONS = {
  happy: resolveMascotAsset('assets/mascots/orstty-feliz.png'),
  feliz: resolveMascotAsset('assets/mascots/orstty-feliz.png'),
  cheering: resolveMascotAsset('assets/mascots/orstty-feliz.png'),
  emocionado: resolveMascotAsset('assets/mascots/orstty-feliz.png'),
  content: resolveMascotAsset('assets/mascots/orstty-contento.png'),
  contento: resolveMascotAsset('assets/mascots/orstty-contento.png'),
  waving: resolveMascotAsset('assets/mascots/orstty-guinando.png'),
  guinando: resolveMascotAsset('assets/mascots/orstty-guinando.png'),
  study: resolveMascotAsset('assets/mascots/orstty-pensativo.png'),
  pensativo: resolveMascotAsset('assets/mascots/orstty-pensativo.png'),
  surprised: resolveMascotAsset('assets/mascots/orstty-sorprendido.png'),
  sorprendido: resolveMascotAsset('assets/mascots/orstty-sorprendido.png'),
  shy: resolveMascotAsset('assets/mascots/orstty-timido.png'),
  timido: resolveMascotAsset('assets/mascots/orstty-timido.png'),
  scared: resolveMascotAsset('assets/mascots/orstty-asustado.png'),
  asustado: resolveMascotAsset('assets/mascots/orstty-asustado.png'),
  asustado2: resolveMascotAsset('assets/mascots/orstty-asustado2.png'),
  sad: resolveMascotAsset('assets/mascots/orstty-triste.png'),
  triste: resolveMascotAsset('assets/mascots/orstty-triste.png'),
  angry: resolveMascotAsset('assets/mascots/orstty-enojado.png'),
  enojado: resolveMascotAsset('assets/mascots/orstty-enojado.png'),
  astronaut: resolveMascotAsset('assets/mascots/orstty-feliz.png'),
  default: resolveMascotAsset('assets/mascots/orstty-feliz.png')
};

export const ARTYON_EMOTIONS = {
  celebrating: resolveMascotAsset('assets/ARTYON.png'),
  happy: resolveMascotAsset('assets/mascots/artyon-feliz.png'),
  feliz: resolveMascotAsset('assets/mascots/artyon-feliz.png'),
  cheering: resolveMascotAsset('assets/mascots/artyon-emocionado.png'),
  emocionado: resolveMascotAsset('assets/mascots/artyon-emocionado.png'),
  content: resolveMascotAsset('assets/mascots/artyon-contento.png'),
  contento: resolveMascotAsset('assets/mascots/artyon-contento.png'),
  waving: resolveMascotAsset('assets/mascots/artyon-guinando.png'),
  guinando: resolveMascotAsset('assets/mascots/artyon-guinando.png'),
  study: resolveMascotAsset('assets/mascots/artyon-pensativo.png'),
  pensativo: resolveMascotAsset('assets/mascots/artyon-pensativo.png'),
  surprised: resolveMascotAsset('assets/mascots/artyon-sorprendido.png'),
  sorprendido: resolveMascotAsset('assets/mascots/artyon-sorprendido.png'),
  shy: resolveMascotAsset('assets/mascots/artyon-timido.png'),
  timido: resolveMascotAsset('assets/mascots/artyon-timido.png'),
  scared: resolveMascotAsset('assets/mascots/artyon-asustado.png'),
  asustado: resolveMascotAsset('assets/mascots/artyon-asustado.png'),
  asustado2: resolveMascotAsset('assets/mascots/artyon-asustado2.png'),
  confused: resolveMascotAsset('assets/mascots/artyon-confundido.png'),
  confundido: resolveMascotAsset('assets/mascots/artyon-confundido.png'),
  sad: resolveMascotAsset('assets/mascots/artyon-triste.png'),
  triste: resolveMascotAsset('assets/mascots/artyon-triste.png'),
  angry: resolveMascotAsset('assets/mascots/artyon-enojado.png'),
  enojado: resolveMascotAsset('assets/mascots/artyon-enojado.png'),
  default: resolveMascotAsset('assets/mascots/artyon-feliz.png')
};

/**
 * ORSTTY - Mascota Oficial RUMBO (El Chiquito Moradito)
 */
export const OrsttyMascot = ({
  size = 80,
  mood = 'happy',
  animate = true,
  slow = false,
  className = '',
  style = {}
}) => {
  const imgSrc = ORSTTY_EMOTIONS[mood] || ORSTTY_EMOTIONS.default;

  const animConfig = slow
    ? {
        y: [0, -2.5, 0],
        rotate: [0, -0.8, 0.8, 0],
        scale: 1
      }
    : (mood === 'cheering' || mood === 'emocionado'
        ? {
            y: [0, -4, 0, -2, 0],
            rotate: [0, -1.5, 1.5, -0.8, 0],
            scale: [1, 1.02, 1]
          }
        : {
            y: [0, -3, 0],
            rotate: [0, -1, 1, 0],
            scale: 1
          });

  const animDuration = slow ? 5.5 : (mood === 'cheering' || mood === 'emocionado' ? 3.6 : 4.5);

  return (
    <motion.div
      className={className}
      animate={animate ? animConfig : {}}
      transition={{
        duration: animDuration,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 8px 22px rgba(147, 51, 234, 0.45))',
        userSelect: 'none',
        flexShrink: 0,
        ...style
      }}
    >
      <img
        src={imgSrc}
        alt={`ORSTTY (${mood})`}
        onError={(e) => {
          e.currentTarget.src = resolveMascotAsset('assets/mascots/orstty-feliz.png');
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          pointerEvents: 'none'
        }}
      />
    </motion.div>
  );
};

/**
 * ARTYON - Mascota Oficial RUMBO (El Compañero Cósmico Alegre)
 */
export const ArtyonMascot = ({
  size = 80,
  mood = 'happy',
  animate = true,
  className = '',
  style = {}
}) => {
  const imgSrc = ARTYON_EMOTIONS[mood] || ARTYON_EMOTIONS.default;

  return (
    <motion.div
      className={className}
      animate={animate ? {
        y: [0, -5, 0, -2, 0],
        rotate: [0, 2, -2, 0],
        scale: [1, 1.03, 1]
      } : {}}
      transition={{
        duration: 3.8,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 8px 22px rgba(16, 185, 129, 0.45))',
        userSelect: 'none',
        flexShrink: 0,
        ...style
      }}
    >
      <img
        src={imgSrc}
        alt={`ARTYON (${mood})`}
        onError={(e) => {
          e.currentTarget.src = resolveMascotAsset('assets/mascots/artyon-feliz.png');
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          pointerEvents: 'none'
        }}
      />
    </motion.div>
  );
};

/**
 * DUAL MASCOT DUO - Orstty y Artyon juntos celebrando el progreso del estudiante
 * Diseñado con física de resortes y micro-interacción Duolingo-grade.
 */
export const DualMascotDuo = ({
  size = 64,
  orsttyMood = 'feliz',
  artyonMood = 'emocionado',
  animate = true,
  className = '',
  style = {}
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: `${Math.round(size * 0.12)}px`,
        userSelect: 'none',
        ...style
      }}
    >
      <OrsttyMascot size={size} mood={orsttyMood} animate={animate} />
      <ArtyonMascot size={Math.round(size * 0.95)} mood={artyonMood} animate={animate} />
    </div>
  );
};

/**
 * DYNAMIC MASCOT COMPANION - Alterna fluidamente entre Artyon y Orstty
 * Garantiza constante diversidad en cards, modales y avisos.
 */
export const DynamicMascot = ({
  prefer = 'auto', // 'auto' | 'orstty' | 'artyon' | 'duo'
  size = 72,
  mood = 'feliz',
  animate = true,
  className = '',
  style = {}
}) => {
  if (prefer === 'duo') {
    return <DualMascotDuo size={size} orsttyMood={mood} artyonMood={mood} animate={animate} className={className} style={style} />;
  }

  const isOrstty = prefer === 'orstty' ? true : (prefer === 'artyon' ? false : (Math.sin(Date.now() / 3600000) > 0));

  if (isOrstty) {
    return <OrsttyMascot size={size} mood={mood} animate={animate} className={className} style={style} />;
  }
  return <ArtyonMascot size={size} mood={mood} animate={animate} className={className} style={style} />;
};

/**
 * ÍCONO AVATAR DE ORSTTY PARA LA BARRA DE NAVEGACIÓN Y WIDGETS
 */
export const OrsttyAvatarIcon = ({ size = 24, active = false, className = '', style = {} }) => {
  return (
    <div
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        filter: active
          ? 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.95)) drop-shadow(0 0 16px rgba(251, 191, 36, 0.7))'
          : 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35))',
        transition: 'all 0.2s ease',
        flexShrink: 0,
        ...style
      }}
    >
      <img
        src={resolveMascotAsset('assets/mascots/orstty-feliz.png')}
        alt="ORSTTY"
        onError={(e) => {
          e.currentTarget.src = resolveMascotAsset('assets/mascots/orstty-feliz.png');
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

/**
 * COMPONENTE DE DIÁLOGO / BURBUJA DE MASCOTA (DUOLINGO STYLE - CERO EMOJIS)
 */
export const MascotDialogue = ({
  mascotType = 'orstty', // 'orstty' | 'artyon'
  mascotMood = 'feliz',
  title = 'RUMBO',
  message = '¿Listo para dominar las preguntas fijas de este curso?',
  actionText,
  onAction,
  onDismiss,
  style = {}
}) => {
  const isOrstty = mascotType === 'orstty';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.96 }}
      className="ios-glass-card"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '14px 18px',
        borderRadius: '24px',
        background: isOrstty
          ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(30, 27, 75, 0.6) 100%)'
          : 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 78, 59, 0.6) 100%)',
        border: isOrstty ? '1.5px solid rgba(168, 85, 247, 0.45)' : '1.5px solid rgba(16, 185, 129, 0.45)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.35)',
        position: 'relative',
        ...style
      }}
    >
      {isOrstty ? (
        <OrsttyMascot size={72} mood={mascotMood} />
      ) : (
        <ArtyonMascot size={72} mood={mascotMood} />
      )}

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 900, color: isOrstty ? '#FDE047' : '#6EE7B7', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {title}
          </span>
        </div>
        <p style={{ margin: 0, fontSize: '0.86rem', color: '#FFFFFF', fontWeight: 600, lineHeight: 1.4 }}>
          {message}
        </p>

        {actionText && (
          <button
            type="button"
            onClick={onAction}
            style={{
              marginTop: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              border: 'none',
              background: isOrstty
                ? 'linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)'
                : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: '#FFFFFF',
              fontSize: '0.78rem',
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.3)'
            }}
          >
            {actionText}
          </button>
        )}
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.5)',
            cursor: 'pointer',
            fontSize: '0.9rem',
            padding: '4px'
          }}
          title="Cerrar"
        >
          ✕
        </button>
      )}
    </motion.div>
  );
};

// Aliases para retrocompatibilidad
export const RastroRMascot = ArtyonMascot;
export const PurpyMascot = OrsttyMascot;
