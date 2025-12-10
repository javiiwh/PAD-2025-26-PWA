const CACHE_NAME = "book-search-v1"
const OFFLINE_CACHE = "offline-v1"

const urlsToCache = ["/", "/index.html", "/manifest.json", "/offline.html"]

// Install event
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache).catch((err) => {
                console.log("Cache addAll error:", err)
            })
        }),
    )
    self.skipWaiting()
})

// Activate event
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== OFFLINE_CACHE) {
                        return caches.delete(cacheName)
                    }
                }),
            )
        }),
    )
    self.clients.claim()
})

// Fetch event with network-first strategy for API calls
self.addEventListener("fetch", (event) => {
    const { request } = event
    const url = new URL(request.url)

    // Network-first for API calls
    if (url.pathname.startsWith("/api/") || url.hostname.includes("googleapis")) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    if (response.ok) {
                        const cache = caches.open(CACHE_NAME)
                        cache.then((c) => c.put(request, response.clone()))
                    }
                    return response
                })
                .catch(() => {
                    return caches.match(request).then((response) => {
                        return response || new Response("Offline - no cached data", { status: 503 })
                    })
                }),
        )
    } else {
        // Cache-first for static assets
        event.respondWith(
            caches.match(request).then((response) => {
                return (
                    response ||
                    fetch(request).then((res) => {
                        if (!res || res.status !== 200 || res.type === "error") {
                            return res
                        }
                        const responseToCache = res.clone()
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, responseToCache)
                        })
                        return res
                    })
                )
            }),
        )
    }
})
