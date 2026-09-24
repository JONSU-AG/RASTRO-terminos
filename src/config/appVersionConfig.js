import { Capacitor } from '@capacitor/core';

/**
 * CONFIGURACIÓN DE VERSIÓN Y CUMPLIMIENTO GOOGLE PLAY STORE
 * 
 * Permite desconectar contenidos sensibles para la tienda de aplicaciones
 * (como marcas de academias de terceros o colecciones de libros)
 * ÚNICAMENTE en esta versión de la app, sin borrar nada de la base de datos
 * compartida de Firestore para que las demás versiones sigan funcionando intactas.
 */
export const VERSION_CONFIG = {
  // Versión del paquete
  version: '1.0.0-playstore',
  
  // Desconectar academias base de terceros (Esparta, Kelsen, Briceño)
  disconnectThirdPartyAcademies: true,

  // Desconectar colecciones de libros y tomos editoriales
  disconnectLibros: true,

  // Ocultar cualquier aviso o botón de instalación PWA dentro de la app nativa
  hidePWAInNative: true,
};

/**
 * Helper que determina si el usuario está usando la aplicación nativa (Android/iOS)
 */
export const isNativeApp = () => {
  try {
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
};
