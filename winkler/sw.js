const CACHE="cockpit-winkler-v1";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(["./"])))});
self.addEventListener("activate",e=>{e.waitUntil(clients.claim())});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(
    fetch(e.request).then(r=>{
      const cp=r.clone();
      caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{});
      return r;
    }).catch(()=>caches.match(e.request).then(m=>m||caches.match("./")))
  );
});