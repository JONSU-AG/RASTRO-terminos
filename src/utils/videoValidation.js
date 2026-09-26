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
    cleanUrl.includes('youtube.com/shorts') ||
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
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export const extractPlaylistId = (url) => {
  if (!url || typeof url !== 'string') return null;
  try {
    const clean = url.trim();
    // ?list=PLxxxx o /playlist?list=PLxxxx o ID directo (34+ chars PL/OL/UU/RD)
    const m = clean.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    if (m && m[1]) return m[1];
    const direct = clean.trim();
    if (/^(PL|OL|UU|RD|FL)[a-zA-Z0-9_-]{10,}$/.test(direct)) return direct;
    return null;
  } catch {
    return null;
  }
};

// Parsea URL/ID nuevo sistema rastro_yt_playlists (aislado de cursos/academias).
// Retorna { type: 'video'|'playlist', videoId, playlistId } o { error }.
export const parseYouTubeInput = (input) => {
  if (!input || typeof input !== 'string' || !input.trim()) {
    return { error: 'Pega una URL o ID de YouTube.' };
  }
  const raw = input.trim();
  if (isBlockedSource(raw)) {
    return { error: 'Solo YouTube público. Sin archivos locales ni Storage.' };
  }
  if (!isPublicYouTube(raw) && !extractPlaylistId(raw)) {
    return { error: 'Solo enlaces públicos de YouTube (video o playlist).' };
  }
  const playlistId = extractPlaylistId(raw);
  const videoId = extractYouTubeId(raw);
  if (playlistId) {
    return { type: 'playlist', videoId: videoId || null, playlistId };
  }
  if (videoId) {
    return { type: 'video', videoId, playlistId: null };
  }
  return { error: 'No se reconoció video ni playlist en ese enlace.' };
};
