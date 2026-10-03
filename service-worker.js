const CACHE_NAME = "watchly-v1";

const FILES_TO_CACHE = [
    "index.html",
    "account.html",
    "signin.html",
    "style.css",
    "script.js",
    "manifest.json"
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
