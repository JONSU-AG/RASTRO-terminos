const CACHE_NAME = 'rumbo-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/LOGOR.png'
];

// Install SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate SW
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch strategy: Network first with cache fallback for smooth updates
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Ignore chrome extensions or non-http requests
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // If response is valid, update cache clone
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Fallback to cache if offline
        return caches.match(event.request);
      })
  );
});

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
