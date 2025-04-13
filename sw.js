// 🚀 sw.js - Service Worker for AI Prompt Manager 2030

const CACHE_NAME = 'ai-prompt-manager-2030-v1';
const ASSETS = [
  '/',
  '/AI-Prompt-Manager/index.html',
  '/AI-Prompt-Manager/style.css',
  '/AI-Prompt-Manager/script.js',
  '/AI-Prompt-Manager/manifest.json',
  '/AI-Prompt-Manager/icon.png',
  '/AI-Prompt-Manager/icon-512.png',
];

// Install Service Worker and cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate Service Worker and remove old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch resources from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
