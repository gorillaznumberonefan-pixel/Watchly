const CACHE_NAME = "watchly-v2";

const FILES_TO_CACHE = [
    "index.html",
    "account.html",
    "signin.html",
    "style.css",
    "script.js",
    "manifest.json",
    "watchly-icon-512.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});
