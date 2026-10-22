const CACHE_NAME = `app-shell-mvjtwn4d`;

const BASE = '/clean_service/';
const OFFLINE_URL = `${BASE}offline.html`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.add(OFFLINE_URL);
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Удаляем все старые бакеты, кроме текущего
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.mode === 'navigate') {
    event.respondWith(handleNavigate(request));
    return;
  }

  if (
    request.method === 'GET' &&
    new URL(request.url).origin === self.location.origin
  ) {
    event.respondWith(handleAsset(request));
  }
});

async function handleNavigate(request) {
  if (!self.navigator.onLine) {
    return serveOffline();
  }
  try {
    return await fetch(request);
  } catch {
    return serveOffline();
  }
}

async function serveOffline() {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(OFFLINE_URL);
  return (
    cached ||
    new Response('Offline', {
      status: 503,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  );
}

async function handleAsset(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const copy = response.clone();
      cache.put(request, copy);
    }
    return response;
  } catch {
    return new Response('', { status: 503 });
  }
}
