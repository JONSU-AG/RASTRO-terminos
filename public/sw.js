// RASTRO — Service Worker de Notificaciones
// El caché de assets es manejado automáticamente por Workbox (VitePWA).
// Este archivo solo gestiona las notificaciones push y sus clics.


// Manejo de clic en Notificaciones de Android / PWA
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const rawUrl = event.notification.data?.url || '/aprender';

  // Formatear la URL para HashRouter (compatibilidad con GitHub Pages y subdirectorios)
  let hashPath = rawUrl;
  if (hashPath.startsWith('/') && !hashPath.startsWith('/#')) {
    hashPath = '#' + hashPath;
  } else if (!hashPath.startsWith('#') && !hashPath.startsWith('http://') && !hashPath.startsWith('https://')) {
    hashPath = '#/' + hashPath.replace(/^\/*/, '');
  }

  // Resolver la URL absoluta usando el scope del Service Worker
  const baseUrl = self.registration?.scope || self.location.href;
  const targetUrl = new URL(hashPath, baseUrl).href;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Si hay alguna ventana de la app abierta, enfocarla y navegar
      for (const client of clientList) {
        if ('focus' in client) {
          client.focus();
          client.postMessage({ type: 'NOTIFICATION_NAVIGATE', url: targetUrl, rawUrl });
          if ('navigate' in client && typeof client.navigate === 'function') {
            try {
              client.navigate(targetUrl);
            } catch (e) {
              console.warn('Navigation failed, message sent to client:', e);
            }
          }
          return;
        }
      }
      // Si no había ventana abierta, abrir en la URL de destino
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
