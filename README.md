# movie-trailer [![npm version](https://badge.fury.io/js/movie-trailer.svg)](https://badge.fury.io/js/movie-trailer) [![Build Status](https://travis-ci.org/lacymorrow/movie-trailer.svg?branch=master)](https://travis-ci.org/lacymorrow/movie-trailer)

> Get movie trailer url(s) in node: "Oceans Eleven" ➔ http://path/to/trailer


## Install

```bash
npm install --save movie-trailer
```


## Usage

```js
const movieTrailer = require('movie-trailer');

movieTrailer('Oceans Eleven', (err, url) => {
    console.log(url); //=> http://path/to/trailer
});

movieTrailer('Oceans Eleven', '1960', (err, url) => {
    console.log(url); //=> http://path/to/trailer
});

movieTrailer('Oceans Eleven', '1960', true, (err, url) => {
    // Multi
    console.log(url);
    //=> { ... } 
});
```

## API

### movieTrailer(movie [, year ] [, multi ], callback)

#### movie

*Required*  
Type: `string`

Movie to search for.


#### year

Type: `string` 

Optional movie year.

#### callback(err, url)


#### callback(err, url)


#### multi

Type: `boolean` 

Optional return results object instead of url.

use `-m` or `--multi`


#### callback(err, url)


## CLI

You can also use it as a CLI app by installing it globally:

```bash
$ npm install --global movie-trailer
```

#### Usage

```bash
$ movie-trailer --help

Usage
  $ movie-trailer movie [year] [--multi]

Example
  $ movie-trailer 'Oceans Eleven' 1960
  http://path/to/trailer
```


## Related

* [album-art](https://github.com/lacymorrow/album-art)
* [movie-art](https://github.com/lacymorrow/movie-art)
* [movie-info](https://github.com/lacymorrow/movie-info)


## License

This package uses data from TMDB. You may consult [TMDB terms of service](https://www.themoviedb.org/documentation/api/terms-of-use) for usage rights.

[MIT](http://opensource.org/licenses/MIT) © [Lacy Morrow](http://lacymorrow.com)
