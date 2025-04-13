// 🚀 sw.js - AI Prompt Manager 2030+ Progressive Web App

const CACHE_NAME = 'ai-prompt-manager-2030-v2';
const ASSETS = [
  '/',
  '/AI-Prompt-Manager/',
  '/AI-Prompt-Manager/index.html',
  '/AI-Prompt-Manager/style.css',
  '/AI-Prompt-Manager/script.js',
  '/AI-Prompt-Manager/export.js',
  '/AI-Prompt-Manager/firebase-config.js',
  '/AI-Prompt-Manager/editor.html',
  '/AI-Prompt-Manager/manifest.json',
  '/AI-Prompt-Manager/icon.png',
  '/AI-Prompt-Manager/icon-512.png',
  '/AI-Prompt-Manager/animations.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
];

// 🔧 On install - precache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(ASSETS);
    })
  );
});

// 🧹 On activate - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// 🌐 On fetch - serve from cache, fallback to network, then cache new
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request)
        .then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => caches.match('/AI-Prompt-Manager/index.html'));
    })
  );
});

// 🔔 Listen for skipWaiting message (optional advanced control)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
