// Manejo de Notificaciones y Push para PWA Rumbo
// Este archivo se importa dentro del Service Worker generado por VitePWA

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
      // 1. Si hay alguna ventana de la app abierta, enfocarla y enviar mensaje de navegación
      for (const client of clientList) {
        if ('focus' in client) {
          client.focus();
          client.postMessage({ type: 'NOTIFICATION_NAVIGATE', url: targetUrl, rawUrl });
          if ('navigate' in client && typeof client.navigate === 'function') {
            try {
              client.navigate(targetUrl);
            } catch (e) {
              console.warn('Navigation failed, client message sent:', e);
            }
          }
          return;
        }
      }
      // 2. Si no había ventana abierta, abrir una nueva con targetUrl
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

// Manejo de evento Push en segundo plano (Web Push)
self.addEventListener('push', (event) => {
  if (!event.data) return;
  try {
    const payload = event.data.json();
    const title = payload.title || 'Rumbo';
    const options = {
      body: payload.body || 'Tienes una nueva actualización',
      icon: payload.icon || '/assets/LOGOR.png',
      badge: payload.badge || '/assets/LOGOR.png',
      vibrate: [200, 100, 200],
      tag: payload.tag || `rumbo-push-${Date.now()}`,
      renotify: true,
      data: payload.data || { url: '/' }
    };
    event.waitUntil(self.registration.showNotification(title, options));
  } catch {
    const text = event.data.text();
    event.waitUntil(
      self.registration.showNotification('Rumbo', {
        body: text || 'Tienes una nueva notificación',
        icon: '/assets/LOGOR.png',
        badge: '/assets/LOGOR.png',
        data: { url: '/' }
      })
    );
  }
});
