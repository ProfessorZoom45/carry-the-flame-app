const CACHE_NAME = 'ctf-app-shell-v1';
const ASSETS = [
  './',
  './index.html',
  './assets/css/app.css',
  './assets/js/app.js'
];

self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e)=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.map(k=>{
      if(k !== CACHE_NAME) return caches.delete(k);
    })))
  );
});

self.addEventListener('fetch', (e)=>{
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
