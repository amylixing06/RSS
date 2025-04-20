const CACHE_NAME = 'rssence-cache-v1';
const FALLBACK_HTML = '/fallback.html';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/icon-maskable-192x192.png',
  '/icons/icon-maskable-512x512.png',
  FALLBACK_HTML
];

// 安装服务工作者
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('[Service Worker] Install failed:', error);
      })
  );
  
  // 立即激活新的服务工作者
  self.skipWaiting();
});

// 处理fetch请求
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // 尝试从缓存获取
    caches.match(event.request)
      .then((response) => {
        // 缓存命中 - 返回缓存的资源
        if (response) {
          return response;
        }
        
        // 如果请求是导航请求，需要特殊处理
        if (event.request.mode === 'navigate') {
          return fetch(event.request)
            .catch(() => {
              // 导航请求失败时返回回退页面
              return caches.match(FALLBACK_HTML);
            });
        }
        
        // 从网络获取资源
        return fetch(event.request)
          .then((response) => {
            // 检查是否收到有效响应
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 克隆响应
            const responseToCache = response.clone();

            // 将响应缓存
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              })
              .catch(error => {
                console.error('[Service Worker] Cache put failed:', error);
              });

            return response;
          })
          .catch(error => {
            console.error('[Service Worker] Fetch failed:', error);
            
            // 如果请求图片资源失败，尝试返回占位图片
            if (event.request.destination === 'image') {
              return caches.match('/icons/icon-192x192.png');
            }
            
            // 其他资源请求失败则尝试从缓存获取之前的版本
            return caches.match(event.request);
          });
      })
  );
});

// 清理旧缓存
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('[Service Worker] Activated');
      // 确保新的服务工作者控制所有客户端
      return self.clients.claim();
    })
  );
}); 