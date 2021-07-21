
 // Import files

 importScripts('js/sw_aux.js');

const CACHE_STATIC_NAME 	= 'static-v1';
const CACHE_DYNAMIC_NAME 	= 'dynamic-v1';
const CACHE_INMUTABLE_NAME 	= 'inmutable-v1';

const APP_SHELL = [
	'/',
	'index.html',
	'css/style.css',
	'img/favicon.ico',
	'img/avatars/hulk.jpg',
	'img/avatars/ironman.jpg',
	'img/avatars/spiderman.jpg',
	'img/avatars/thor.jpg',
	'img/avatars/wolverine.jpg',
	'js/app.js',
];

const APP_SHELL_INMUTABLE = [
	'https://fonts.googleapis.com/css?family=Quicksand:300,400',
	'https://fonts.googleapis.com/css?family=Lato:400,300',
	'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
	'css/animate.css',
	'js/libs/jquery.js',
];

self.addEventListener('install', e => {

	const cache_static = caches.open(CACHE_STATIC_NAME).then( cache => cache.addAll(APP_SHELL));

	const cache_inmuta = caches.open(CACHE_INMUTABLE_NAME).then( cache => cache.addAll(APP_SHELL_INMUTABLE));

	e.waitUntil( Promise.all([cache_static, cache_inmuta]) );
});
self.addEventListener('activate', e => {

	const respuesta = caches.keys().then(keys => {

        keys.forEach(key => {
            if(key != CACHE_STATIC_NAME && key.includes('static'))
                return caches.delete(key)
        })

    })

    e.waitUntil( respuesta );

});

self.addEventListener('fetch', e => {

	const respuesta = caches.match( e.request ).then( resp => {
		if(resp) return resp;
		else{
			return fetch( e.request ).then(newResp => {
				return actualiza_cache_dinamico( CACHE_DYNAMIC_NAME, e.request, newResp );
			});
		}
	} )

	e.respondWith( respuesta )

})