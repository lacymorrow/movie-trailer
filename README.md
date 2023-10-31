> [!IMPORTANT]  
> This library is considered **feature-complete** and will only receive updates for bug fixes. You may still create an issue if you have a feature request.

# movie-trailer [<img src="https://github.com/lacymorrow/crossover/raw/master/src/static/meta/patreon-button.webp" style="height:40px;" height="40" align="right" />](https://www.patreon.com/bePatron?u=55065733)
[![npm version](https://badge.fury.io/js/movie-trailer.svg)](https://badge.fury.io/js/movie-trailer) [![Maintainability](https://api.codeclimate.com/v1/badges/8dce3031d73c7beb9c98/maintainability)](https://codeclimate.com/github/lacymorrow/movie-trailer/maintainability) [![Try movie-trailer on RunKit](https://badge.runkitcdn.com/movie-trailer.svg)](https://npm.runkit.com/movie-trailer)

> Fetch movie trailer url(s): "Oceans Eleven" ➔ https://www.youtube.com/watch?v=...

[![movie-trailer](https://github.com/lacymorrow/movie-trailer/raw/master/demo.svg?sanitize=true)]()

#### [Try it on RunKit](https://runkit.com/lacymorrow/movie-trailer) _([Output](https://runkit.io/lacymorrow/movie-trailer/branches/master?search=Avatar))_


## Features
 * Fetch Youtube trailers for any movie or TV show
 * Return one or many trailer URLs
 * Use anywhere, browser or Node - UMD _([Browser Support](https://caniuse.com/#feat=fetch))_
 * Works in React + NextJS client/server (uses [isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch))
 * Async/await, Promise and Callback APIs


## Install

Using [NPM](https://npmjs.com):

```bash
npm install --save movie-trailer
```

In the browser:

```html
<!-- movieTrailer window global -->
<script type="text/javascript" src="https://unpkg.com/movie-trailer"></script>
```
(via Unpkg, or via [JSDelivr](https://cdn.jsdelivr.net/npm/movie-trailer/index.min.js))


## Usage

```js
const movieTrailer = require( 'movie-trailer' ) // or import movieTrailer from 'movie-trailer'

await movieTrailer( 'Up' )
//=> https://www.youtube.com/watch?v=...
```

##### TV Shows
```js
movieTrailer('Shameless', {videoType: 'tv'})
//=> https://www.youtube.com/watch?v=...
```

##### Return an array of video IDs
```js
movieTrailer( 'Oceans Eleven', {id: true, multi: true} )
  .then( response => console.log( response ) )
  
//=> [ 'XXXXXXXXX', 'XXXXXXXXX', ... ]
```

##### Both
```js
movieTrailer( 'Oceans Eleven', {year: '1960', multi: true} )
  .then( response => console.log( response ) )

//=> [ https://www.youtube.com/watch?v=XXXXXXXXX, ... ]
```

##### Legacy-style search using release date year
```js
movieTrailer( 'Oceans Eleven', 1960 )
  .then( response => console.log( response ) )

//=> http://path/to/trailer
```

## API

### movieTrailer(movie [, options ] [, callback])

* #### movie

	**Required**

	Type: `string`

	Movie to search for. If searching with a `tmdbId`, pass `null`.


* #### options 

	Type: `object`

	* ##### `apiKey`

		Type: `string` 

		_(optional)_ Use your own TMDB api key. You can get a free key here: https://developers.themoviedb.org/ .

		_Use `-a` or `--api_key` on the CLI_

	* ##### `id` _(`false`)_

		Type: `boolean` 

		_(optional)_ Return only Youtube video IDs.

		_Use `-i` or `--id` on the CLI_
		
	
	* ##### `language`

		Type: `string` (_language code_)

		_(optional)_ Movie release language.

		_Use `-l` or `--language` on the CLI_
		

	* ##### `multi` _(`false`)_

		Type: `boolean` 

		_(optional)_ Return an array of urls vs a single url.

		_Use `-m` or `--multi` on the CLI_

		```js
		movieTrailer( 'Oceans Eleven', { multi: true } )
		```

	* ##### `tmdbId`

		Type: `string` || `number` 

		_(optional)_ Search using a TMDB content ID instead of a search term

		_Use `-t` or `--tmdb_id` on the CLI_

		```js
		movieTrailer( null, { tmdbId: 161 } )  // Content ID for "Ocean's Eleven"
		```

	* ##### `year`

		Type: `string` || `number`

		_(optional)_ Movie release year.

		_Use `-y` or `--year` on the CLI_


* #### callback(error, response)

	Callback function.

	```js
	movieTrailer( 'Oceans Eleven', ( error, response ) => {
	    console.log( response ); 
	    //=> http://path/to/trailer
	} )
	```


#### From the command line

```bash
$ npx movie-trailer --help

Usage
	$ npx movie-trailer movie 	

Options
	--api_key   -k   (optional) Your own TMDB API key: http://developers.themoviedb.org
	--id        -i   Return just the Youtube video ID.
	--language, -l   Specify a language code (eg: 'de_DE').
	--multi,    -m   Returns an array of URLs instead of a single URL.
	--tmdb_id   -t   Specify an explicit TMDB ID.
	--year,     -y   Specify a release year to search.

Example
	$ npx movie-trailer 'Oceans Eleven' -y 1960 -m
	//=> http://path/to/trailer
```


## Related

* [album-art](https://github.com/lacymorrow/album-art)
* [movie-art](https://github.com/lacymorrow/movie-art)
* [movie-info](https://github.com/lacymorrow/movie-info)


## License

This package uses data from TMDB. You may consult [TMDB terms of service](https://www.themoviedb.org/documentation/api/terms-of-use) for usage rights.

[MIT](http://opensource.org/licenses/MIT) © [Lacy Morrow](http://lacymorrow.com)
