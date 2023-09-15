/* global define */
'use strict';

( function ( root, cx ) {

	if ( typeof define === 'function' && define.amd ) {

		// AMD
		define( [ 'isomorphic-fetch' ], cx )

	} else if ( typeof exports === 'object' ) {

		// Node, CommonJS-like
		module.exports = cx( require( 'isomorphic-fetch' ) )

	} else {

		// Browser globals (root is window)
		root.movieTrailer = cx( root.fetch )

	}

} )( this, fetch => {

	function handleErrors( error ) {

		const message = ( error && error.message ) ? error.message : error
		console.warn( `movie-trailer: ${message}` )
		// Throw Error( error.message )

	}

	function handleFetchErrors( response ) {

		if ( !response.ok ) {

			throw new Error( response.statusText )

		}

		return response

	}

	function toUrl( videoId ) {

		return encodeURI( 'https://www.youtube.com/watch?v=' + videoId )

	}

	function getMovieId( search, options ) {

		/* Fetch a Movie ID for querying the TMDB API */
		const path = options && options.videoType === 'tv' ? '/3/search/tv?api_key=' : '/3/search/movie?api_key='

		const endpoint = 'https://api.themoviedb.org' + encodeURI( path + options.apiKey + '&query=' + search + ( ( options.year === null ) ? '' : '&year=' + options.year ) + ( ( options.language === null ) ? '' : '&language=' + options.language ) )
		const result = fetch( endpoint, {
			method: 'GET'
		} )
			.then( handleFetchErrors )
			.then( response => response.json() )
			.then( json => {

				if ( typeof json.status_message !== 'undefined' ) {

					// Error
					throw new TypeError( json.status_message )

				} else if ( json.results.length === 0 ) {

					// Retry failed search without year
					if ( options.year !== null ) {

						const { year, ...rest } = options

						return getMovieId( search, rest )

					}

					// Error
					throw new Error( `No TMDB Movie found with that search query, try searching https://www.themoviedb.org/search?query=${encodeURIComponent( search )} to verify one exists` )

				} else {

					return json.results[0].id

				}

			} )
			.catch( error => {

				handleErrors( error )

				return null

			} )

		return result

	}

	function getTrailer( movieId, options ) {

		const path = options && options.videoType === 'tv' ? '/3/tv/' : '/3/movie/'

		/* Fetch single or multiple movie trailers via the TMDB API */
		const endpoint = 'https://api.themoviedb.org' + encodeURI( path + movieId + '/videos?api_key=' + options.apiKey + ( ( options.language === null ) ? '' : '&language=' + options.language ) )
		const result = fetch( endpoint, {
			method: 'GET'
		} )
			.then( handleFetchErrors )
			.then( response => response.json() )
			.then( json => {

				if ( typeof ( json.status_message ) !== 'undefined' ) {

					// Error
					throw new TypeError( `movie-trailer: ${json.status_message}` )

				}

				if ( json.results.length === 0 ) {

					// Error
					throw new Error( 'No trailers found for that TMDB ID' )

				}

				let { results } = json

				// Strip all but videoId
				results = results.map( result => {

					return result.key

				} )

				if ( !options.id ) {

					// Return Youtube videoId or full `Watch` URL
					results = results.map( videoId => toUrl( videoId ) )

				}

				return options.multi ? [ ...new Set( results ) ] : results[0]

			} )
			.catch( error => {

				handleErrors( error )

				return null

			} )

		return result

	}

	async function movieTrailer( movie, options, cb, legacy ) {

		/* Fetch movie trailers */

		// Massage inputs
		let config = {
			multi: false,
			id: false,
			year: null,
			language: null,
			videoType: 'movie', // Added videoType property

			// Public Key on purpose
			apiKey: '9d2bff12ed955c7f1f74b83187f188ae'
		}

		if ( !options ) {

			options = {}

		}

		if ( typeof movie !== 'string' && !options.tmdbId ) {

			throw new Error( 'Expected first parameter to be a movie or TMDB ID (string)' )

		} else if ( typeof options === 'function' ) {

			// Second parameter is the callback
			cb = options
			options = null

		} else if ( typeof options === 'boolean' || options === 'true' ) {

			// Second parameter is multi
			config.multi = options

		} else if ( typeof options === 'string' || typeof options === 'number' ) {

			// Second parameter is year
			config.year = options

			/* BACKWARDS-COMPATABILITY FOR v1 */
			if ( typeof legacy === 'function' && ( typeof cb === 'boolean' || ( typeof cb === 'string' && cb === 'true' ) ) ) {

				// Third parameter is multi
				config.multi = cb
				cb = legacy

			}
			/* END BACKWARDS-COMPATABILITY */

		} else if ( typeof options === 'object' ) {

			// Set options
			config = Object.assign( config, options )

		}

		// Remove invalid callback
		if ( typeof cb !== 'function' ) {

			cb = null

		}

		const movieId = config.tmdbId ? config.tmdbId : ( await getMovieId( movie, config )
			.catch( error => {

				handleErrors( error )

				return null

			} ) )

		// Get the TMDB content ID
		if ( !movieId ) {

			// Failed
			return null

		}

		// Get the trailers themselves
		const result = getTrailer( movieId, config )

		if ( !result ) {

			// Failed
			return null

		}

		// Call callback if supplied
		if ( cb ) {

			return result
				.then( response => cb( null, response ) )
				.catch( error => cb( error, null ) )

		}

		// Return promise
		return result

	}

	// Exposed public method
	return movieTrailer

} )
