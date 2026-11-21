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

if ( cli.flags.id ) {

	options.id = Boolean( cli.flags.id )

}

if ( cli.flags.apiKey ) {

	options.apiKey = cli.flags.apiKey

}

if ( cli.flags.language ) {

	options.language = cli.flags.language

}

if ( cli.flags.multi ) {

	options.multi = Boolean( cli.flags.multi )

}

if ( cli.flags.tmdbId ) {

	options.tmdbId = cli.flags.tmdbId

}

if ( cli.flags.year ) {

	options.year = cli.flags.year

}

if ( !cli.input[0] && !options.tmdbId ) {

	cli.showHelp()

}

movieTrailer( cli.input[0], options ).then( result => {

	if ( result ) {

		console.log( result )

	}

} )
