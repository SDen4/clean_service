const CACHE_NAME = 'app-shell-v1';

const BASE = '/clean_service/';
const OFFLINE_URL = `${BASE}offline.html`;

// Установка сервис-воркера. Срабатывает 1 раз при первой регистрации, при обновлении содержимого и при каждом unregister + register
self.addEventListener('install', (event) => {
  // нужно, чтобы точно offline.html попал в кэшы
  event.waitUntil(
    (async () => {
      //  открывает/создает бакет с именем CACHE_NAME и возвращает кэш-объект
      const cache = await caches.open(CACHE_NAME);
      // Кэшируем ТОЛЬКО offline.html. index.html не кэшируем намеренно — чтобы он никогда не подменял офлайн-страницу.
      await cache.add(OFFLINE_URL);
      // Переход в статус activating немедленно
      await self.skipWaiting();
    })(),
  );
});

// активация воркера
self.addEventListener('activate', (event) => {
  // берёт все открытые вкладки в зоне своего scope под контроль немедленно, не дожидаясь перезагрузки
  event.waitUntil(self.clients.claim());
});

// Перехват запросов
self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.mode === 'navigate') {
    // respondWith нужно вызвать синхронно внутри обработчика — иначе браузер пойдёт в сеть как обычно
    event.respondWith(handleNavigate(request));
    return;
  }

  // Статику кэшируем (JS/CSS/картинки) — чтобы SPA в онлайне работал как обычно
  if (
    request.method === 'GET' &&
    new URL(request.url).origin === self.location.origin
  ) {
    event.respondWith(handleAsset(request));
  }
});

async function handleNavigate(request) {
  // 1. Браузер уже знает, что мы офлайн → сразу offline.html
  if (!self.navigator.onLine) return serveOffline();

  // 2. Пробуем сеть
  try {
    return await fetch(request);
  } catch {
    // 3. Сеть отвалилась посреди запроса → offline.html
    return serveOffline();
  }
}

async function serveOffline() {
  // ищем в бакете нужную страницу офлайн
  const cached = await caches.match(OFFLINE_URL);

  return (
    cached ||
    new Response('Offline', {
      status: 503,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  );
}

async function handleAsset(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    // кешируем только успешные запросы
    if (response.ok) {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((c) => c.put(request, copy));
    }
    return response;
  } catch {
    // Для чанков — отдаём 503, React.lazy выбросит ошибку,
    // а ErrorBoundary решит, что показать. Навигация уже не сюда.
    return new Response('', { status: 503 });
  }
}
