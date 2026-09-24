import { Capacitor } from '@capacitor/core';
import { 
  signInWithPopup, 
  signInWithCredential, 
  GoogleAuthProvider, 
  signOut 
} from 'firebase/auth';
import { SocialLogin } from '@capgo/capacitor-social-login';
import { auth, googleProvider, DRIVE_SCOPE, saveDriveToken } from './firebase';

/**
 * Detecta si la aplicación se está ejecutando como app nativa (Android / iOS)
 * o en un navegador web tradicional.
 */
export const isNativePlatform = () => {
  return Capacitor.isNativePlatform();
};

let isSocialLoginInitialized = false;

/**
 * Inicializa el plugin de autenticación nativa solo cuando se ejecuta en Android/iOS.
 */
async function ensureNativeInitialized() {
  if (isSocialLoginInitialized || !isNativePlatform()) return;
  try {
    const webClientId = import.meta.env.VITE_GOOGLE_WEB_CLIENT_ID || 
                        import.meta.env.VITE_FIREBASE_CLIENT_ID || 
                        '';
    await SocialLogin.initialize({
      google: {
        webClientId: webClientId || undefined,
        mode: 'online'
      }
    });
    isSocialLoginInitialized = true;
  } catch (err) {
    console.warn('[GoogleAuth] Native initialize warning:', err);
  }
}

/**
 * Realiza el inicio de sesión con Google adaptado al entorno actual:
 * 1. EN WEB: Usa signInWithPopup (ventana emergente segura de Firebase Web).
 * 2. EN ANDROID (APP): Usa el selector nativo de cuentas de Android vía Credential Manager,
 *    obtiene el ID Token y autentica en Firebase con signInWithCredential (sin pestañas blancas ni errores de almacenamiento particionado).
 *
 * @returns {Promise<{ userCredential: any, driveToken: string | null }>}
 */
export async function executeGoogleAuth() {
  const isNative = isNativePlatform();

  if (!isNative) {
    // ==========================================
    // FLUJO 1: NAVEGADOR WEB (DESKTOP & MOBILE)
    // ==========================================
    const result = await signInWithPopup(auth, googleProvider);
    let driveToken = null;
    try {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      driveToken = credential?.accessToken || result?._tokenResponse?.oauthAccessToken || null;
      const expiresIn = result?._tokenResponse?.oauthExpiresIn || 3600;
      if (driveToken) {
        saveDriveToken(driveToken, expiresIn);
      }
    } catch (e) {
      console.warn('[GoogleAuth Web] No se pudo capturar Drive token:', e?.message);
    }
    return { userCredential: result, driveToken };
  }

  // ==========================================
  // FLUJO 2: APP NATIVA DE ANDROID (CAPACITOR)
  // ==========================================
  await ensureNativeInitialized();

  try {
    // Solicitar inicio de sesión nativo al sistema operativo Android
    const nativeRes = await SocialLogin.login({
      provider: 'google',
      options: {
        scopes: ['email', 'profile', DRIVE_SCOPE],
        forcePrompt: true
      }
    });

    const onlineRes = nativeRes?.result;
    const idToken = onlineRes?.idToken;
    const accessTokenObj = onlineRes?.accessToken;
    const accessToken = typeof accessTokenObj === 'string' ? accessTokenObj : accessTokenObj?.token;

    if (!idToken) {
      throw new Error('No se recibió el token de identidad (idToken) de Google en la app nativa.');
    }

    // Crear credencial de Firebase con el token recibido nativamente
    const credential = GoogleAuthProvider.credential(idToken, accessToken || undefined);
    const userCredential = await signInWithCredential(auth, credential);

    if (accessToken) {
      try {
        saveDriveToken(accessToken, 3600);
      } catch (e) {
        console.warn('[GoogleAuth Native] No se pudo guardar Drive token nativo:', e);
      }
    }

    return { userCredential, driveToken: accessToken || null };
  } catch (err) {
    console.error('[GoogleAuth Native Error]:', err);
    // Interpretar errores típicos de configuración en Android
    const msg = String(err?.message || err || '');
    if (msg.toLowerCase().includes('cancel') || msg.toLowerCase().includes('closed')) {
      const cancelError = new Error('Inicio de sesión cancelado por el usuario.');
      cancelError.code = 'auth/popup-closed-by-user';
      throw cancelError;
    }
    if (msg.includes('10:') || msg.includes('DEVELOPER_ERROR') || msg.includes('12500')) {
      const devError = new Error(
        'Falta registrar la huella SHA-1 de la app en Firebase Console (Project Settings > Tus apps > Android). ' +
        'Mientras tanto, puedes iniciar sesión con Correo y Contraseña.'
      );
      devError.code = 'auth/android-sha-missing';
      throw devError;
    }
    throw err;
  }
}
