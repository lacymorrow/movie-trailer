# movie-trailer [![npm version](https://badge.fury.io/js/movie-trailer.svg)](https://badge.fury.io/js/movie-trailer) [![Build Status](https://travis-ci.org/lacymorrow/movie-trailer.svg?branch=master)](https://travis-ci.org/lacymorrow/movie-trailer) [![Try movie-trailer on RunKit](https://badge.runkitcdn.com/movie-trailer.svg)](https://npm.runkit.com/movie-trailer)

> Fetch movie trailer url(s): "Oceans Eleven" ➔ http://path/to/trailer

[![movie-trailer](https://github.com/lacymorrow/movie-trailer/raw/master/demo.svg?sanitize=true)]()

#### [Try it on RunKit](https://runkit.com/lacymorrow/movie-trailer) _([Output](https://runkit.io/lacymorrow/movie-trailer/branches/master?search=Avatar))_


## Features
 * Fetch Youtube trailers for any movie
 * Return one or many trailer URLs
 * Use anywhere, browser or Node - UMD _([Browser Support](https://caniuse.com/#feat=fetch))_
 * Promise and Callback API


## Install

Using [NPM](https://npmjs.com):

```bash
npm install --global movie-trailer
```

In the browser:

```html
<!-- movieInfo window global -->
<script type="text/javascript" src="https://unpkg.com/movie-trailer"></script>
```
(via Unpkg, or via [JSDelivr](https://cdn.jsdelivr.net/npm/movie-trailer/index.min.js"))


## Usage

```js
const movieTrailer = require('movie-trailer');

movieTrailer('Crash').then(console.log)

//=> https://www.youtube.com/watch?v=durNwe9pL0E
```

##### Search using release date year
```js
movieTrailer('Oceans Eleven', 1960)
  .then( response => console.log( response ) )

//=> http://path/to/trailer
```

##### Return an array of URLs
```js
movieTrailer('Oceans Eleven', true)
  .then( response => console.log( response ) )
  
//=> [ ... ]
```

##### Both
```js
movieTrailer( 'Oceans Eleven', {year: '1960', multi: true} )
  .then( response => console.log( response ) )

//=> [ ... ]
```

###### Callback
```
movieTrailer( 'Oceans Eleven', ( error, response ) => {
    console.log( response ); 
    //=> http://path/to/trailer
} )

```

## API

### movieTrailer(movie [, options ] [, callback])

#### movie

*Required*  

Type: `string`

Movie to search for.


#### options 

Type: `object`

##### year

Type: `string` || `number`

Optional movie year.

##### multi

Type: `boolean` 

Optionally return array of urls instead of a single url.

use `-m` or `--multi`


#### callback(error, response)

Callback function.


#### From the command line

```bash
$ movie-trailer --help

Usage
  $ movie-trailer movie [--year] [--multi]

Example
  $ movie-trailer 'Oceans Eleven' 1960
  //=> http://path/to/trailer
```


## Related

* [album-art](https://github.com/lacymorrow/album-art)
* [movie-art](https://github.com/lacymorrow/movie-art)
* [movie-info](https://github.com/lacymorrow/movie-info)


## License

This package uses data from TMDB. You may consult [TMDB terms of service](https://www.themoviedb.org/documentation/api/terms-of-use) for usage rights.

[MIT](http://opensource.org/licenses/MIT) © [Lacy Morrow](http://lacymorrow.com)
