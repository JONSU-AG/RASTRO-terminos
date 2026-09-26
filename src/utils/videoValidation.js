/**
 * src/utils/videoValidation.js
 * 
 * Validación y aislamiento de fuentes de video:
 * - Solo se permite la visualización de enlaces públicos directos de YouTube.
 * - Enlaces de Firebase Storage, Google APIs Storage o archivos locales quedan aislados (bloqueados visualmente)
 *   sin borrar nada de la base de datos para preservar los registros.
 */

export const isPublicYouTube = (url) => {
  if (!url || typeof url !== 'string') return false;
  const cleanUrl = url.trim().toLowerCase();
  return (
    cleanUrl.includes('youtube.com/watch') ||
    cleanUrl.includes('youtube.com/playlist') ||
    cleanUrl.includes('youtube.com/embed') ||
    cleanUrl.includes('youtu.be/')
  );
};

export const isBlockedSource = (url) => {
  if (!url || typeof url !== 'string') return false;
  const cleanUrl = url.trim().toLowerCase();
  return (
    cleanUrl.includes('firebasestorage') ||
    cleanUrl.includes('storage.googleapis') ||
    cleanUrl.startsWith('blob:') ||
    /\.(mp4|webm|mov|avi|mkv|ogg)$/i.test(cleanUrl)
  );
};

export const extractYouTubeId = (url) => {
  if (!url || typeof url !== 'string') return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};
