/**
 * src/lib/userPlaylistsService.js
 * NUEVO sistema aislado rastro_yt_playlists (v1.0.2+).
 * NO lee: cursos, academias, youtubePlaylistsData.js, ni localStorage rastro_custom_youtube_playlists.
 * Solo YouTube público vía IFrame. Sin claves, costo $0.
 * Privado por defecto (isShared:false). Público solo si el dueño toca Compartir.
 */
import { db } from './firebase';
import {
  collection, query, where, orderBy, limit, onSnapshot,
  addDoc, doc, updateDoc, deleteDoc, serverTimestamp,
} from 'firebase/firestore';
import { isBlockedSource, parseYouTubeInput } from '../utils/videoValidation';

export const YT_PLAYLISTS_COLLECTION = 'rastro_yt_playlists';

const cleanStr = (v, max = 120) => String(v || '').trim().slice(0, max);

export const subscribeMyPlaylists = (uid, cb) => {
  if (!uid) { cb([]); return () => {}; }
  try {
    const q = query(
      collection(db, YT_PLAYLISTS_COLLECTION),
      where('ownerUid', '==', uid),
      orderBy('updatedAt', 'desc'),
      limit(100)
    );
    return onSnapshot(q, (snap) => {
      cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }, () => cb([]));
  } catch { cb([]); return () => {}; }
};

export const subscribeSharedPlaylists = (cb) => {
  try {
    const q = query(
      collection(db, YT_PLAYLISTS_COLLECTION),
      where('isShared', '==', true),
      orderBy('updatedAt', 'desc'),
      limit(50)
    );
    return onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        .filter((p) => p.isHidden !== true);
      cb(list);
    }, () => cb([]));
  } catch { cb([]); return () => {}; }
};

export const subscribeCuratedPlaylists = (cb) => {
  try {
    const q = query(
      collection(db, YT_PLAYLISTS_COLLECTION),
      where('isCurated', '==', true),
      orderBy('curatedOrder', 'asc'),
      limit(50)
    );
    return onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        .filter((p) => p.isHidden !== true && p.isShared === true);
      cb(list);
    }, () => cb([]));
  } catch { cb([]); return () => {}; }
};

export const createUserPlaylist = async (user, { url, title, subject, description }) => {
  if (!user || user.isAnonymous) throw new Error('Necesitas una cuenta (Google o correo) para guardar.');
  const rawUrl = String(url || '').trim();
  if (isBlockedSource(rawUrl)) throw new Error('Solo YouTube público.');
  const parsed = parseYouTubeInput(rawUrl);
  if (parsed.error) throw new Error(parsed.error);
  const safeTitle = cleanStr(title, 80) || (parsed.type === 'playlist' ? 'Mi playlist' : 'Mi video');
  const docData = {
    ownerUid: user.uid,
    ownerEmail: user.email || '',
    title: safeTitle,
    subject: cleanStr(subject, 40) || 'General',
    description: cleanStr(description, 300),
    type: parsed.type,
    videoId: parsed.videoId || null,
    playlistId: parsed.playlistId || null,
    playlistUrl: rawUrl.slice(0, 500),
    // Arranque privado: solo el dueño lo ve hasta compartir
    isShared: false,
    sharedAt: null,
    // Curaduría del autor: solo admin la activa, hoy queda vacía
    isCurated: false,
    curatedOrder: 0,
    isHidden: false,
    reportsCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const ref = await addDoc(collection(db, YT_PLAYLISTS_COLLECTION), docData);
  return ref.id;
};

export const updateUserPlaylist = async (id, { title, subject, description }) => {
  const patch = { updatedAt: serverTimestamp() };
  if (title !== undefined) patch.title = cleanStr(title, 80);
  if (subject !== undefined) patch.subject = cleanStr(subject, 40);
  if (description !== undefined) patch.description = cleanStr(description, 300);
  await updateDoc(doc(db, YT_PLAYLISTS_COLLECTION, id), patch);
};

export const setPlaylistShared = async (id, shared) => {
  await updateDoc(doc(db, YT_PLAYLISTS_COLLECTION, id), {
    isShared: shared === true,
    sharedAt: shared === true ? serverTimestamp() : null,
    updatedAt: serverTimestamp(),
  });
};

export const deleteUserPlaylist = async (id) => {
  await deleteDoc(doc(db, YT_PLAYLISTS_COLLECTION, id));
};

// Admin (solo-ocultar, nunca borrar ajeno)
export const adminSetHidden = async (id, hidden) => {
  await updateDoc(doc(db, YT_PLAYLISTS_COLLECTION, id), {
    isHidden: hidden === true,
    updatedAt: serverTimestamp(),
  });
};

export const adminSetCurated = async (id, curated, order = 0) => {
  await updateDoc(doc(db, YT_PLAYLISTS_COLLECTION, id), {
    isCurated: curated === true,
    curatedOrder: Number(order) || 0,
    // Lo curado siempre es compartido para que salga en Oficial
    ...(curated === true ? { isShared: true, sharedAt: serverTimestamp() } : {}),
    updatedAt: serverTimestamp(),
  });
};

// Adapta un doc rastro_yt_playlists al formato que ya entiende YouTubePlayerModal
export const toPlayerCourse = (p) => {
  const color = '#EF4444';
  const lesson = p?.type === 'playlist'
    ? null
    : { id: p?.videoId || p?.id, title: p?.title || 'Video', ytId: p?.videoId || null, url: p?.playlistUrl || '' };
  return {
    id: p?.id,
    subject: p?.subject || 'YouTube',
    title: p?.title || 'Video',
    color,
    playlistUrl: p?.playlistUrl || '',
    featuredVideoId: p?.videoId || null,
    lessons: lesson ? [lesson] : [],
  };
};
