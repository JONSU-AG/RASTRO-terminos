import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider, db, saveDriveToken, getStoredDriveToken, clearDriveToken } from '../lib/firebase';
import { signOut, onAuthStateChanged, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { executeGoogleAuth, isNativePlatform } from '../lib/googleAuth';

// Correos autorizados del autor / creador del proyecto Firebase (rumbo-jonsu)
export const ADMIN_EMAILS = [
  'aguilar.jonsu@gmail.com',
  'rumbo.jonsu@gmail.com',
  'jhojan.aguilar.13.10@gmail.com',
  'rulua617@gmail.com',
  '147279812+rulua617@users.noreply.github.com'
];

/**
 * Determina si un correo pertenece al autor/creador del proyecto Firebase (Jonsu Aguilar)
 */
export const isAuthorOfFirebase = (email) => {
  if (!email) return false;
  const e = email.toLowerCase().trim();
  return ADMIN_EMAILS.some(a => e === a.toLowerCase());
};

// Memoria local de "nombre ya elegido": evita pedirlo de nuevo si Firestore
// tarda o falla justo después de actualizar la app (arranque en frío).
const USERNAME_CHOSEN_KEY = 'rastro_username_chosen';
const hasChosenUsernameLocally = (uid) => {
  try {
    if (uid && localStorage.getItem(`${USERNAME_CHOSEN_KEY}_${uid}`) === 'true') return true;
    return localStorage.getItem(USERNAME_CHOSEN_KEY) === 'true';
  } catch { return false; }
};
const markUsernameChosenLocally = (uid) => {
  try {
    localStorage.setItem(USERNAME_CHOSEN_KEY, 'true');
    if (uid) localStorage.setItem(`${USERNAME_CHOSEN_KEY}_${uid}`, 'true');
  } catch {}
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAlly, setIsAlly] = useState(false);
  const [realAdmin, setRealAdmin] = useState(false);
  const [simulateStudentView, setSimulateStudentView] = useState(() => localStorage.getItem('rastro_simulate_student') === 'true');

  const toggleSimulateStudentView = (val) => {
    const next = typeof val === 'boolean' ? val : !simulateStudentView;
    setSimulateStudentView(next);
    try { localStorage.setItem('rastro_simulate_student', String(next)); } catch {}
  };

  const isAdmin = realAdmin && !simulateStudentView;
  const [driveToken, setDriveToken] = useState(() => getStoredDriveToken());
  
  // Sistema de advertencias en pantalla (sin bloqueo duro)
  const [hasWarning, setHasWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    // Timeout de seguridad: asegura que la pantalla nunca quede congelada en carga
    const safetyTimer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const withTimeout = (promise, ms = 2500) =>
      Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), ms))
      ]);

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      clearTimeout(safetyTimer);
      setUser(currentUser);
      if (currentUser) {
        // SEGURIDAD: el correo viene verificado por Firebase Auth (no se puede falsificar desde el cliente).
        // Solo estos correos otorgan admin. Nunca se confía en localStorage ni en campos del propio documento.
        const isAuthor = isAuthorOfFirebase(currentUser.email);

        // AUTOMÁTICO: si es el autor/creador, otorgar admin y ally en memoria
        if (isAuthor) {
          setRealAdmin(true);
          setIsAlly(true);
        }

        try {
          const userRef = doc(db, 'usuarios', currentUser.uid);
          const userSnap = await withTimeout(getDoc(userRef), 2000);

          if (userSnap && userSnap.exists()) {
            const data = userSnap.data();
            setUserData(data);
            // Migración: si ya eligió nombre antes, guardarlo localmente desde ya
            if (data.hasChosenUsername) markUsernameChosenLocally(currentUser.uid);
            setIsAlly(Boolean(data.isAlly || isAuthor));
            
            // SEGURIDAD: administrador SOLO si el correo está verificado como autor.
            // Los campos role/isAdmin/isCreator del propio documento NO otorgan permisos
            // (cualquier usuario podría editar su documento si las reglas lo permiten).
            const adminStatus = Boolean(isAuthor);
            setRealAdmin(adminStatus);

            // Si es autor de Firebase, sincronizamos su rol de creador en Firestore
            if (isAuthor && (!data.isAdmin || data.role !== 'admin')) {
              setDoc(userRef, { 
                isAdmin: true, 
                role: 'admin', 
                isCreator: true, 
                isAlly: true 
              }, { merge: true }).catch(() => {});
            }

            // Aviso en pantalla (no bloqueo)
            const warningActive = Boolean((data.hasWarning || data.banned) && !data.warningDismissed);
            setHasWarning(warningActive);
            setWarningMessage(data.warningMessage || data.banReason || '');
          } else {
            // Registro inicial de usuario
            const preferredUsername = sessionStorage.getItem('rastro_preferred_username');
            if (preferredUsername) {
              try { sessionStorage.removeItem('rastro_preferred_username'); } catch {}
              markUsernameChosenLocally(currentUser.uid);
            }
            const chosenName = preferredUsername || currentUser.displayName || 'Estudiante RASTRO';

            const newRecord = {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: chosenName,
              photoURL: currentUser.photoURL,
              uploadCount: 0,
              isAlly: isAuthor,
              // SEGURIDAD: los registros nuevos jamás reciben privilegios.
              // Solo el autor (correo verificado) se sincroniza como admin más abajo.
              isAdmin: false,
              role: 'estudiante',
              hasChosenUsername: Boolean(preferredUsername),
              banned: false,
              hasWarning: false,
              warningMessage: '',
              bio: 'Estudiante enfocado en alcanzar la meta universitaria.',
              whatsappChannel: '',
              createdAt: new Date().toISOString()
            };
            setDoc(userRef, newRecord).catch(() => {});
            setUserData(newRecord);
            setIsAlly(newRecord.isAlly);
            setRealAdmin(newRecord.isAdmin);
            setHasWarning(false);
          }
        } catch (err) {
          console.warn("Firestore status in AuthContext (continuing seamlessly):", err.message);
          // Fallback seguro en memoria para el usuario actual (sin privilegios).
          // Respeta la memoria local del nombre para no pedirlo de nuevo tras actualizar.
          setUserData(prev => prev || {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || 'Estudiante RASTRO',
            photoURL: currentUser.photoURL,
            isAdmin: false,
            isAlly: isAuthor,
            role: 'estudiante',
            hasChosenUsername: hasChosenUsernameLocally(currentUser.uid)
          });
          if (isAuthor) {
            setRealAdmin(true);
            setIsAlly(true);
          }
        }
      } else {
        setUserData(null);
        setIsAlly(false);
        setRealAdmin(false);
        setHasWarning(false);
        setWarningMessage('');
      }
      setLoading(false);
    });

    return () => {
      clearTimeout(safetyTimer);
      unsubscribe();
    };
  }, []);

  // NOTA DE SEGURIDAD: no existe ni debe existir una "clave maestra" en el cliente.
  // El rol de administrador se otorga únicamente por correo verificado (isAuthorOfFirebase).
  // El acceso de emergencia se gestiona desde Firebase Console.

  // Descartar aviso en pantalla
  const dismissWarning = async () => {
    setHasWarning(false);
    if (user) {
      try {
        const userRef = doc(db, 'usuarios', user.uid);
        await setDoc(userRef, { warningDismissed: true, hasWarning: false }, { merge: true });
      } catch (e) {
        console.warn("Error dismissing warning in Firestore:", e);
      }
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signOut(auth);
    } catch {}
    const { userCredential, driveToken } = await executeGoogleAuth();
    if (driveToken) {
      setDriveToken(driveToken);
    }
    return userCredential;
  };

  // Solicita/renueva token Drive del usuario actual (re-auth popup en web o nativo en app)
  const ensureDriveToken = async () => {
    const stored = getStoredDriveToken();
    if (stored) return stored;
    const { driveToken } = await executeGoogleAuth();
    if (driveToken) {
      setDriveToken(driveToken);
      return driveToken;
    }
    throw new Error('No se pudo obtener permiso de Google Drive. Intenta iniciar sesión nuevamente.');
  };

  const updateChosenUsername = async (chosenName) => {
    const currentUser = auth.currentUser || user;
    if (!currentUser) throw new Error('No hay sesión activa');
    const clean = (chosenName || '').trim();
    if (!clean || clean.length < 2) {
      throw new Error('El nombre de usuario debe tener al menos 2 caracteres.');
    }
    if (clean.length > 30) {
      throw new Error('El nombre de usuario no puede exceder los 30 caracteres.');
    }

    try {
      await updateProfile(currentUser, { displayName: clean });
    } catch (e) {
      console.warn("Could not update auth profile:", e);
    }

    const userRef = doc(db, 'usuarios', currentUser.uid);
    await setDoc(userRef, {
      displayName: clean,
      hasChosenUsername: true
    }, { merge: true });

    // Memoria local inmediata: aunque la red falle después, no se vuelve a pedir
    markUsernameChosenLocally(currentUser.uid);

    setUserData(prev => ({
      ...(prev || {}),
      displayName: clean,
      hasChosenUsername: true
    }));

    return clean;
  };

  const logout = () => {
    localStorage.removeItem('rumbo_firebase_admin');
    clearDriveToken();
    setDriveToken(null);
    return signOut(auth);
  };

  const needsUsername = Boolean(!loading && user && userData && userData.hasChosenUsername !== true);

  return (
    <AuthContext.Provider value={{ 
      user, 
      userData, 
      isAlly, 
      isAdmin, 
      isRealAdmin: realAdmin,
      simulateStudentView,
      setSimulateStudentView,
      isBanned: false, // Nunca bloqueado duro, siempre aviso
      hasWarning,
      warningMessage,
      dismissWarning,
      loading, 
      loginWithGoogle, 
      ensureDriveToken,
      driveToken,
      needsUsername,
      updateChosenUsername,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
