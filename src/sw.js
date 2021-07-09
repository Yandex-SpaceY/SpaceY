const now = Date.now();
const today = new Date(now).toLocaleDateString();
const version = Date.parse(today);

const CACHE_NAME = `space-y-cache-${version}`;

const getCachedResource = async req => {
  try {
    const result = await caches.match(req);

    if (result) {
      return result;
    }

    const fetchRequest = req.clone();
    const response = await fetch(fetchRequest);

    if ((!response || response.status !== 200) || req.method !== 'GET') {
      return response;
    }

    const responseToCache = response.clone();
    const cache = await caches.open(CACHE_NAME);

    await cache.put(req, responseToCache);

    return response;
  } catch (err) {
    console.error(`Can't get cached info: ${err}`);
  }
};

const clearCache = async () => {
  try {
    const keys = await caches.keys();
    const deletions = keys
      .filter(key => key !== CACHE_NAME)
      .map(key => caches.delete(key));

    for (const success of deletions) {
      await success;
    }
  } catch (err) {
    console.error(`Can't clear cache: ${err}`);
  }
};

this.addEventListener('install', event => event.waitUntil(caches.open(CACHE_NAME)));
this.addEventListener('fetch', event => event.respondWith(getCachedResource(event.request)));
this.addEventListener('activate', event => event.waitUntil(clearCache()));
