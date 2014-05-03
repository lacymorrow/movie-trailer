'use strict';
module.exports = function (movie, year, cb) {
	var search = {
		key: '9d2bff12ed955c7f1f74b83187f188ae',
		protocol: require('https'),
		cb: cb,
		id: null,
		year: null,
		movie: movie,
		options: {
			host: 'api.themoviedb.org',
			port: 443,
			path: null
		}
	}
	
	if (typeof year === 'function') {
		search.cb = year;
		year = null;
	}
	if (movie === null){
		getConfig(search);
	} else if (typeof movie === 'function') {
		search.cb = movie;
		search.movie = null;
		getConfig(search);
	} else if (typeof movie !== 'string') {
		throw new Error('Expected a string');
	} else {
		search.year = year;
		getConfig(search);
	}
};

function getConfig (search) {
	var data = '';
	search.options.path = encodeURI('/3/configuration?api_key=' + search.key);
	search.protocol.get(search.options, function(resp){
	  resp.on('data', function(chunk){
		data += chunk;
	  });
	  resp.on('end', function(){
		var json = JSON.parse(data);
		if (typeof(json.status_message) !== 'undefined'){
			search.cb('Got error: ' + json.status_message);
		} else {
			search.baseURL = json.images.base_url;
			getMovie(search);
		}
	  });
	}).on("error", function(e){
		search.cb('Got error: ' + e.message);
	});
}

function getMovie(search) {
	var data = '';
	search.options.path = encodeURI('/3/search/movie?api_key=' + search.key + '&query=' + search.movie + ((search.year !== null) ? '&year='+search.year : ''));
	search.protocol.get(search.options, function(resp){
	  resp.on('data', function(chunk){
		data += chunk;
	  });
	  resp.on('end', function(){
		var json = JSON.parse(data);
		if (typeof(json.status_message) !== 'undefined'){
			search.cb('Got error: ' + json.status_message);
		} else if (json.results.length === 0){
			search.cb('Got error: ' + 'No results found')
		} else {
			search.cb(null, encodeURI(search.baseURL + json.results[0].poster_path));
		}
	  });
	}).on("error", function(e){
		search.cb('Got error: ' + e.message);
	});
}