const VERSION = 25;

const OFFLINE_URL = "assets/offline-4.html";

const OFFLINE_PAGE_CACHE_NAME = "offline" + VERSION;
const IMAGES_LIST_CACHE_NAME = "images" + VERSION;
const ARTICLE_LIST_CACHE_NAME = "articles" + VERSION;
const ENTRY_JS_CACHE_NAME = "entry-js-file" + VERSION;
const ASSETS_CACHE_NAME = "assets" + VERSION;
const VENDOR_CACHE_NAME = "vendor" + VERSION;
const OSS_RES_CACHE_NAME = "oss-res" + VERSION;

self.addEventListener("install", (event) => {
  event.waitUntil(
    (() => {
      caches.open(OFFLINE_PAGE_CACHE_NAME)
        .then((ch) => {
          ch.add(new Request(OFFLINE_URL, { cache: "reload" }))
        })
    })()
  );
  // Force the waiting service worker to become the active service worker.
  self.skipWaiting();
  console.log('SW Installing.')
});


self.addEventListener("activate", (event) => {
  event.waitUntil(
    (() => {
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            return !cacheName.includes(VERSION + '');
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
      if ("navigationPreload" in self.registration) {
        self.registration.navigationPreload.enable();
      }
    })()
  );

  console.log('SW Actived.')
  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

const createStaleWhileRevalidateFetchHandler = (cacheName, reqFilterFn = () => false) => (event) => {
  if (!reqFilterFn(event.request)) {
    return;
  }

  event.respondWith(
    caches.open(cacheName).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        let fetchPromise = fetch(event.request).then(function (networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      });
    })
  );
}

const createNetworkFirstFetchHandler = (cacheName, reqFilterFn = () => false) => (event) => {
  if (!reqFilterFn(event.request)) {
    return;
  }

  event.respondWith(
    caches.open(cacheName).then((ch) => {
      return fetch(event.request.clone())
        .then((res) => {
          ch.put(event.request, res.clone());
          return res;
        })
        .catch(() => {
          return ch.match(event.request);
        })
    })
  )
}

const createCacheFirstFetchHandler = (cacheName, pattern) => (event) => {
  const reqMatched = typeof pattern === 'string'
    ? event.request.url.includes(pattern)
    : pattern(event.request);

  if (reqMatched) {
    event.respondWith(
      caches.open(cacheName).then((ch) => {
        return ch.match(event.request).then((res) => {
          if (res) {
            console.log('Found res in cache: ', res.url);
            return res;
          }

          return fetch(event.request.clone()).then((res) => {
            if (res.status < 400){
              console.log('add res to cache: ', res.url);
              ch.put(event.request, res.clone())
            }
            return res;
          })
        })
      })
    )
  }
}

const handleImagesFetch = createStaleWhileRevalidateFetchHandler(IMAGES_LIST_CACHE_NAME, (req => {
  const imagesListApi = 'https://api.zjh.im/res';
  return req.url === imagesListApi;
}))

const handleArticlesFetch = createStaleWhileRevalidateFetchHandler(ARTICLE_LIST_CACHE_NAME, (req => {
  const articlesApi = 'https://api.zjh.im/articles';
  return req.url === articlesApi;
}))

const handleEntryJSFetch = createNetworkFirstFetchHandler(ENTRY_JS_CACHE_NAME, (req => {
  return req.url.includes('assets/index.js');
}))
const handleVendorFetch = createCacheFirstFetchHandler(VENDOR_CACHE_NAME, 'cdn.jsdelivr');
const handleOSSResFetch = createCacheFirstFetchHandler(OSS_RES_CACHE_NAME, 'zjh-im-res.oss');
const handleAssetsFetch = createCacheFirstFetchHandler(ASSETS_CACHE_NAME, (req) => {
  return req.url.includes('/assets') && !req.url.includes('index.js');
});

self.addEventListener("fetch", (event) => {

  handleVendorFetch(event);
  handleOSSResFetch(event);
  handleAssetsFetch(event);
  handleImagesFetch(event);
  handleArticlesFetch(event);
  handleEntryJSFetch(event);

  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          // First, try to use the navigation preload response if it's supported.
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          // Always try the network first.
          return await fetch(event.request);
        } catch (error) {
          console.log("Fetch failed; returning offline page instead.", error);

          const cache = await caches.open(OFFLINE_PAGE_CACHE_NAME);
          return await cache.match(OFFLINE_URL);
        }
      })()
    );
  }
})

