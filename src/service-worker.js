const OFFLINE_VERSION = 16;

const CACHE_NAME = "offline";
const OFFLINE_URL = "assets/offline-3.html";

const IMAGES_LIST_CACHE_NAME = "images" + OFFLINE_VERSION;
const ASSETS_CACHE_NAME = "assets" + OFFLINE_VERSION;
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

const handleImagesFetch = createNetworkFirstFetchHandler(IMAGES_LIST_CACHE_NAME, (req => {
  const imagesListApi = 'https://api.zjh.im/res';
  return req.url === imagesListApi;
}))

const handleVendorFetch = createCacheFirstFetchHandler(VENDOR_CACHE_NAME, 'cdnjs');
const handleOSSResFetch = createCacheFirstFetchHandler(OSS_RES_CACHE_NAME, 'zjh-im-res.oss');
const handleAssetsFetch = createCacheFirstFetchHandler(ASSETS_CACHE_NAME, '/assets');

self.addEventListener("fetch", (event) => {

  handleVendorFetch(event);
  handleOSSResFetch(event);
  handleAssetsFetch(event);
  handleImagesFetch(event);

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

