'use strict';

( function ( root, cx ) {

	if ( typeof define === 'function' && define.amd ) {

		// AMD
		define( ['fetch'], cx )

	} else if ( typeof exports === 'object' ) {

		// Node, CommonJS-like
		module.exports = cx( require( 'node-fetch' ) )

	} else {

		// Browser globals (root is window)
		root.movieTrailer = cx( root.fetch )

	}

} )( this, function ( fetch ) {

	// Public Key on purpose
	const apiKey = '9d2bff12ed955c7f1f74b83187f188ae'

	function getMovieId ( search, year ) {

		/* Fetch a Movie ID for querying the TMDB API */

		const url = 'https://api.themoviedb.org' + encodeURI( '/3/search/movie?api_key=' + apiKey + '&query=' + search + ( ( year !== null ) ? '&year=' + year : '' ) )

		const response = fetch( url, {
			method: 'GET'
		} )
			.then(
				res => res.json(),
				err => Promise.reject( err.message ) )
			.then( json => {

				if ( typeof ( json.status_message ) !== 'undefined' ) {

					// Error
					return Promise.reject( new Error( `JSON - ${json.status_message}` ) )

				} else if ( json.results.length === 0 ) {

					// Retry failed search without year
					if ( year !== null ) {

						getMovieId( search )

					} else {

						// Error
						return Promise.reject( new Error( 'API - No results found' ) )

					}

				} else {

					return json.results[0].id

				}

			} )
			.catch( error => error )

		return response

	}

	function getTrailer ( movieId, multi ) {

		/* Fetch single or multiple movie trailers via the TMDB API */
		const url = 'https://api.themoviedb.org' + encodeURI( '/3/movie/' + movieId + '/videos?api_key=' + apiKey )
		const response = fetch( url, {
			method: 'GET'
		} )
			.then(
				res => res.json(),
				err => Promise.reject( err.message )
			)
			.then( json => {

				if ( typeof ( json.status_message ) !== 'undefined' ) {

					// Error
					return Promise.reject( new Error( `JSON - ${json.status_message}` ) )

				} else if ( json.results.length === 0 ) {

					// Error
					return Promise.reject( new Error( 'API - No results found' ) )

				} else if ( multi ) {

					// Return *unique* urls
					return Array.from( new Set( json.results.map( e => encodeURI( 'https://www.youtube.com/watch?v=' + e.key ) ) ) )

				} else {

					return encodeURI( 'https://www.youtube.com/watch?v=' + json.results[0].key )

				}

			} )

		return response

	}

	function movieTrailer ( movie, options, cb ) {

		/* Fetch movie trailers */

		// Massage inputs
		let opts = {
			multi: false,
			year: null
		}
		if ( typeof movie !== 'string' ) {

			throw new Error( 'Expected first parameter to be a movie (string)' )

		} else if ( typeof options === 'function' ) {

			// Second parameter is the callback
			cb = options
			options = null

		} else if ( typeof options === 'boolean' || ( typeof options === 'string' && options === 'true' ) ) {

			// Second parameter is multi
			opts.multi = options

		} else if ( typeof options === 'string' || typeof options === 'number' ) {

			// Second parameter is year
			opts.year = options

		} else if ( typeof options === 'object' ) {

			// Set options
			opts = Object.assign( opts, options )

		}

		// Remove invalid callback
		if ( typeof cb !== 'function' ) cb = null

		const response = getMovieId( movie, opts.year )
			.then( movieId => {

				return getTrailer( movieId, opts.multi )

			} )

		// Callback
		if ( cb ) {

			return response.then( res => cb( null, res ), err => cb( err, null ) )

		}

		// Promise
		return response

	}

	// exposed public method
	return movieTrailer

} )
