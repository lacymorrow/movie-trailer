#!/usr/bin/env node
'use strict'
const meow = require( 'meow' )
const movieTrailer = require( './index' )

const cli = meow(
	`
	Usage
	  $ movie-trailer movie [year] [multi]

	Options
	  --year,     -y   Specify a release year to search.
	  --multi,    -m   Returns an array of URLs instead of a single URL.
	  --language, -l   Specify a language code (eg: 'de_DE').
	  --id        -i   Return just the Youtube video ID.

	Example
	  $ movie-trailer 'Oceans Eleven' --year 1960
	  // => http://path/to/trailer
`,
	{
		flags: {
			id: {
				alias: 'i',
				type: 'boolean'
			},
			multi: {
				alias: 'm',
				type: 'boolean'
			},
			year: {
				type: 'string',
				alias: 'y'
			},
			language: {
				type: 'string',
				alias: 'l'
			}
		}
	}
)

let opts = {
	id: false,
	multi: false,
	year: null,
	language: null
}

if ( cli.flags.i ) opts.id = !!cli.flags.i
if ( cli.flags.m ) opts.multi = !!cli.flags.m
if ( cli.flags.y ) opts.year = cli.flags.y
if ( cli.flags.l ) opts.language = cli.flags.l
if ( !cli.input[0] ) cli.showHelp()

movieTrailer( cli.input[0], opts ).then( console.log )
