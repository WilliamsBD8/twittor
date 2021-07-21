function actualiza_cache_dinamico( dynamic_cache, request, respond ){

	if( respond.ok ){
		return caches.open(dynamic_cache).then(cache => {
			cache.put( request, respond.clone() );
			return respond.clone();
		});

	}else{

		return respond;

	}
}