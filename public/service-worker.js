// =========================================
// 维护模式 - Service Worker 已禁用
// =========================================

// 立即自我卸载
self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  // 获取所有缓存名称
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      // 删除所有缓存
      return Promise.all(
        cacheNames.map(function(cacheName) {
          console.log('正在清除缓存:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(function() {
      console.log('Service Worker 已完全清除缓存并停用');
      // 控制客户端
      return self.clients.claim();
    })
  );
});

// 拦截所有fetch请求，不使用缓存
self.addEventListener('fetch', function(event) {
  event.respondWith(fetch(event.request));
}); 