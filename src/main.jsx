import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/ios-glass.css";
import "./asistente/orstty/orstty-training.js";
import { registerAllRastroTools } from "./asistente/orstty/rastro-tools.js";

// Inicializar catálogo de herramientas RASTRO para ORSTTY ENGINE
registerAllRastroTools();

import { Capacitor } from "@capacitor/core";
import { registerSW } from "virtual:pwa-register";

// Service Worker SOLO para Web / PWA en navegadores.
// En Android Nativo (Capacitor), los assets se sirven localmente y el Service Worker está estrictamente prohibido
// para evitar bucles de recarga infinitos (reload loops) y bloqueos del WebView de Android.
if (!Capacitor.isNativePlatform() && typeof window !== "undefined" && "serviceWorker" in navigator) {
  try {
    registerSW({
      immediate: true,
      onNeedRefresh() {
        console.log('[SW] Nueva versión detectada, actualizando silenciosamente...');
      },
      onRegisteredSW(swUrl, r) {
        if (r) {
          setInterval(() => {
            r.update();
          }, 30 * 60 * 1000);
        }
      },
    });
  } catch (e) {
    console.warn('[SW] Registration bypassed:', e);
  }
} else if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  // En app nativa: desregistrar cualquier SW residual para garantizar máxima estabilidad
  try {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const reg of registrations) {
        reg.unregister().catch(() => {});
      }
    }).catch(() => {});
  } catch {}
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);