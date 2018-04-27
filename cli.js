#!/usr/bin/env node
'use strict'
const meow = require( 'meow' )
const movieTrailer = require( './index' )

const cli = meow(
	`
	Usage
	  $ movie-trailer movie [year] [multi]

	Options
	  --year,  -year  Specify a release year to search
	  --multi, -m     Returns an array of URLs instead of a single URL

	Example
	  $ movie-trailer 'Oceans Eleven' --year 1960
	  // => http://path/to/trailer
`,
	{
		flags: {
			multi: {
				alias: 'm',
				type: 'boolean'
			},
			year: {
				type: 'string',
				alias: 'y'
			}
		}
	}
)

let opts = {
	multi: false,
	year: null
}

if ( cli.flags.m ) opts.multi = !!cli.flags.m
if ( cli.flags.y ) opts.year = cli.flags.y
if ( !cli.input[0] ) cli.showHelp()

movieTrailer( cli.input[0], opts ).then( console.log )
