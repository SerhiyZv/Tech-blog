const FILES_TO_CACHE = [
    '/manifest.webmanifest',
    '/css/style.css',
    '/css/otherstyle.css',
    '/js/edit.js',
    '/js/login.js',
    '/js/logout.js',
    '/js/post.js',
    '/js/signup.js',
    '/js/validate.js',
    '/images/pc-192x192.jpg',
    '/images/pc-512x512.jpg'
];

const STATIC_CACHE = "static-cache";
const RUNTIME_CACHE = "runtime-cache";

self.addEventListener("install", event => {
    event.waitUntil(
      caches
        .open(STATIC_CACHE)
        .then(cache => cache.addAll(FILES_TO_CACHE))
        .then(() => self.skipWaiting())
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener("activate", event => {
    const currentCaches = [STATIC_CACHE, RUNTIME_CACHE];
    event.waitUntil(
      caches
        .keys()
        .then(cacheNames => {
          // return array of cache names that are old to delete
          return cacheNames.filter(
            cacheName => !currentCaches.includes(cacheName)
          );
        })
        .then(cachesToDelete => {
          return Promise.all(
            cachesToDelete.map(cacheToDelete => {
              return caches.delete(cacheToDelete);
            })
          );
        })
        .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {  
    // use cache first for all other requests for performance
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        // If not cached, send network request
        } else {
            return fetch(event.request);
        }
      })
    )
});