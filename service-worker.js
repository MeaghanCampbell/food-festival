const APP_PREFIX = 'FoodFest-';     
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

// use relative paths - these are the files you want to cache
const FILES_TO_CACHE = [
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    "./dist/app.bundle.js",
    "./dist/events.bundle.js",
    "./dist/tickets.bundle.js",
    "./dist/schedule.bundle.js"
];

// install service worker
// use self becuase service workers run before window object is created
// self refers to service worker object
self.addEventListener('install', function(e) {
    // tell browser to wait until the work is complete before terminating the service worker
    e.waitUntil(
        // find specific cache by name then add every FILES TO CACHE array
        caches.open(CACHE_NAME).then(function (cache) {
          console.log('installing cache : ' + CACHE_NAME)
          return cache.addAll(FILES_TO_CACHE)
        })
    )
})

// activate service worker
self.addEventListener('activate', function(e) {
    e.waitUntil(
        // keys return an array of all cache names we're calling keyList
      caches.keys().then(function(keyList) {
          // then filter out caches that have the app prefix
        let cacheKeeplist = keyList.filter(function(key) {
          return key.indexOf(APP_PREFIX);
        });
        // add current cache to keeplist
        cacheKeeplist.push(CACHE_NAME);
  
        return Promise.all(
          keyList.map(function(key, i) {
            if (cacheKeeplist.indexOf(key) === -1) {
              console.log('deleting cache : ' + keyList[i]);
              return caches.delete(keyList[i]);
            }
          })
        );
      })
    );
});

// tell app how to retrieve info from the cache to handle offline requests
self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)
    // if request is stored in the cache, deliver resource directly from the cache
    // otherwise get resource normally
    e.respondWith(
        // use match to determine if resource exists in chaches
        caches.match(e.request).then(function (request) {
            // if it does...
            if (request) {
              console.log('responding with cache : ' + e.request.url)
              return request
              // if it doesn't... allow it to be retrieved from the online network as usual
            } else {
              console.log('file is not cached, fetching : ' + e.request.url)
              return fetch(e.request)
        }
          
        // You can omit if/else for console.log & put one line below like this too.
        // return request || fetch(e.request)
        })
    )
})