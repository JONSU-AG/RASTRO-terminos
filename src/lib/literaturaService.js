import { db } from './firebase';
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { LITERATURA_OBRAS } from '../data/literaturaData';

const COLLECTION_NAME = 'literatura_obras';
const CACHE_KEY = 'rastro_literatura_obras_v2';
const CACHE_TIME_KEY = 'rastro_literatura_cache_time_v2';
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutos de caché para ahorrar lecturas en Firebase Free Tier

/**
 * Obtener obras literarias combinadas (Base local + Modificaciones en la nube/Firestore)
 * @param {boolean} forceRefresh - Forzar recarga remota
 * @returns {Promise<Array>}
 */
export async function getObrasLiterarias(forceRefresh = false) {
  try {
    // 1. Verificar caché local rápida en localStorage
    if (!forceRefresh) {
      try {
        const cachedRaw = localStorage.getItem(CACHE_KEY);
        const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
        if (cachedRaw && cacheTime && (Date.now() - parseInt(cacheTime, 10) < CACHE_TTL_MS)) {
          const cachedData = JSON.parse(cachedRaw);
          if (Array.isArray(cachedData) && cachedData.length > 0) {
            return cachedData.filter(o => o.oculto !== true);
          }
        }
      } catch (cacheErr) {
        console.warn('Lectura de caché local de literatura falló:', cacheErr);
      }
    }

    // 2. Base local de confianza instantánea
    const baseMap = new Map();
    LITERATURA_OBRAS.forEach(obra => {
      baseMap.set(obra.id, { ...obra, isBase: true, oculto: false });
    });

    // 3. Consultar colección remota de Firestore si hay conexión
    try {
      const snap = await getDocs(collection(db, COLLECTION_NAME));
      if (!snap.empty) {
        snap.forEach(docSnap => {
          const cloudData = docSnap.data();
          const obraId = docSnap.id;
          if (baseMap.has(obraId)) {
            // Sobrescribir con cambios del admin
            baseMap.set(obraId, {
              ...baseMap.get(obraId),
              ...cloudData,
              id: obraId,
              isCustomEdit: true
            });
          } else {
            // Es una obra nueva creada por el admin
            baseMap.set(obraId, {
              id: obraId,
              isCustom: true,
              ...cloudData
            });
          }
        });
      }
    } catch (fsErr) {
      console.warn('Firestore offline o sin permisos, usando base local:', fsErr);
    }

    const allObras = Array.from(baseMap.values());

    // 4. Guardar en caché local
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(allObras));
      localStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
    } catch (e) {
      // Ignorar quota exceeded en localStorage
    }

    return allObras.filter(o => o.oculto !== true);
  } catch (error) {
    console.error('Error cargando obras literarias:', error);
    return LITERATURA_OBRAS;
  }
}

/**
 * Obtener todas las obras para el panel de administración (incluye ocultas)
 */
export async function getAllObrasAdmin(forceRefresh = false) {
  try {
    const baseMap = new Map();
    LITERATURA_OBRAS.forEach(obra => {
      baseMap.set(obra.id, { ...obra, isBase: true, oculto: false });
    });

    try {
      const snap = await getDocs(collection(db, COLLECTION_NAME));
      if (!snap.empty) {
        snap.forEach(docSnap => {
          const cloudData = docSnap.data();
          const obraId = docSnap.id;
          if (baseMap.has(obraId)) {
            baseMap.set(obraId, {
              ...baseMap.get(obraId),
              ...cloudData,
              id: obraId,
              isCustomEdit: true
            });
          } else {
            baseMap.set(obraId, {
              id: obraId,
              isCustom: true,
              ...cloudData
            });
          }
        });
      }
    } catch (e) {
      console.warn('Error fetching admin obras from firestore:', e);
    }

    return Array.from(baseMap.values());
  } catch (e) {
    return LITERATURA_OBRAS.map(o => ({ ...o, isBase: true }));
  }
}

/**
 * Guardar o actualizar una obra (Admin)
 */
export async function saveObra(obraData) {
  if (!obraData || !obraData.titulo) {
    throw new Error('El título de la obra es obligatorio');
  }

  const id = obraData.id || obraData.titulo.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
  const payload = {
    ...obraData,
    id,
    updatedAt: serverTimestamp()
  };

  // Guardar en Firestore
  await setDoc(doc(db, COLLECTION_NAME, id), payload, { merge: true });

  // Invalidar caché local
  try {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_TIME_KEY);
  } catch (e) {}

  return payload;
}

/**
 * Alternar visibilidad de una obra (ocultar / mostrar)
 */
export async function toggleOcultarObra(obraId, nuevoEstadoOculto) {
  if (!obraId) return;
  await setDoc(doc(db, COLLECTION_NAME, obraId), {
    oculto: nuevoEstadoOculto,
    updatedAt: serverTimestamp()
  }, { merge: true });

  try {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_TIME_KEY);
  } catch (e) {}
}

/**
 * Eliminar obra creada por el admin o restaurar una obra base a su versión original
 */
export async function deleteObra(obraId, isBase = false) {
  if (!obraId) return;
  await deleteDoc(doc(db, COLLECTION_NAME, obraId));

  try {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_TIME_KEY);
  } catch (e) {}
}
