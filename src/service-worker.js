const OFFLINE_VERSION = 11;

const CACHE_NAME = "offline";
const OFFLINE_URL = "assets/offline-2.html";

const VENDOR_CACHE_NAME = "vendor" + OFFLINE_VERSION;
const OSS_RES_CACHE_NAME = "oss-res" + OFFLINE_VERSION;

self.addEventListener("install", (event) => {
  event.waitUntil(
    (() => {
      caches.open(CACHE_NAME)
        .then((ch) => {
          ch.add(new Request(OFFLINE_URL, { cache: "reload" }))
        })
    })()
  );
  // Force the waiting service worker to become the active service worker.
  self.skipWaiting();
});


self.addEventListener("activate", (event) => {
  event.waitUntil(
    (() => {
      if ("navigationPreload" in self.registration) {
        self.registration.navigationPreload.enable();
      }
    })()
  );

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

const createCacheFirstFetchHandler = (cacheName, urlPatternStr) => (event) => {
  if (event.request.url.includes(urlPatternStr)) {
    event.respondWith(
      caches.open(cacheName).then((ch) => {
        return ch.match(event.request).then((res) => {
          if (res) {
            console.log('Found res in cache: ', res);
            return res;
          }

          return fetch(event.request.clone()).then((res) => {
            if (res.status < 400){
              console.log('add res to cache: ', res);
              ch.put(event.request, res.clone())
            }
            return res;
          })
        })
      })
    )
  }
}

const handleVendorFetch = createCacheFirstFetchHandler(VENDOR_CACHE_NAME, 'cdnjs');
const handleOSSResFetch = createCacheFirstFetchHandler(OSS_RES_CACHE_NAME, 'zjh-im-res.oss');

self.addEventListener("fetch", (event) => {
  handleVendorFetch(event);
  handleOSSResFetch(event);

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

          const cache = await caches.open(CACHE_NAME);
          return await cache.match(OFFLINE_URL);
        }
      })()
    );
  }
})

