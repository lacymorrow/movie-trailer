#!/usr/bin/env node
'use strict'
const meow = require( 'meow' )
const movieTrailer = require( './index' )

const cli = meow(
	`
	Usage
	  $ movie-trailer movie [year] [multi]

	Options
	  --api_key   -k   (optional) Your own TMDB API key: http://developers.themoviedb.org
	  --id        -i   Return just the Youtube video ID.
	  --language, -l   Specify a language code (eg: 'de_DE').
	  --multi,    -m   Returns an array of URLs instead of a single URL.
	  --tmdb_id   -t   Specify an explicit TMDB ID.
	  --year,     -y   Specify a release year to search.

	Example
	  $ movie-trailer 'Oceans Eleven' --year 1960
	  // => http://path/to/trailer
`,
	{
		flags: {
			// eslint-disable-next-line camelcase
			api_key: {
				type: 'string',
				alias: 'k'
			},
			id: {
				alias: 'i',
				type: 'boolean'
			},
			language: {
				type: 'string',
				alias: 'l'
			},
			multi: {
				alias: 'm',
				type: 'boolean'
			},
			// eslint-disable-next-line camelcase
			tmdb_id: {
				type: 'string',
				alias: 't'
			},
			year: {
				type: 'string',
				alias: 'y'
			}
		}
	}
)

const options = {
	id: false,
	language: null,
	multi: false,
	year: null
}

if ( cli.flags.i ) {

	options.id = Boolean( cli.flags.i )

}

if ( cli.flags.k ) {

	options.apiKey = cli.flags.k

}

if ( cli.flags.l ) {

	options.language = cli.flags.l

}

if ( cli.flags.m ) {

	options.multi = Boolean( cli.flags.m )

}

if ( cli.flags.t ) {

	options.tmdbId = cli.flags.t

}

if ( cli.flags.y ) {

	options.year = cli.flags.y

}

if ( !cli.input[0] && !options.tmdbId ) {

	cli.showHelp()

}

movieTrailer( cli.input[0], options ).then( console.log )
