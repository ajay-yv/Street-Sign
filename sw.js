const CACHE_NAME = 'lipi-setu-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './styles.css',
    './app.js',
    './transliterator.js',
    './manifest.json',
    'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Hind:wght@400;500;600&display=swap',
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0',
    'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js',
    'https://cdn.jsdelivr.net/npm/@indic-transliteration/sanscript@1.2.0/sanscript.min.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request).then(
                    (response) => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                // Don't cache Tesseract worker blobs or data URIs
                                if (!event.request.url.startsWith('blob:') && !event.request.url.startsWith('data:')) {
                                    cache.put(event.request, responseToCache);
                                }
                            });

                        return response;
                    }
                );
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
