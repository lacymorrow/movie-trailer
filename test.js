'use strict'
import test from 'ava'
import movieTrailer from './index.js'

test( 'fetch movie trailer', async t => {

	t.plan( 2 )

	const trailer = await movieTrailer( 'oceans eleven' )

	t.is( trailer.indexOf( 'http' ), 0, 'returns a url' )
	t.not( trailer.indexOf( 'youtube' ), -1, 'returns a youtube url' )

} )

test( 'dont fetch empty search', async t => {

	// Testing no search quety, should error
	const error = await t.throws( movieTrailer( null )
		.catch( error_ => Promise.reject( error_ ) )
	)

	t.is( error.message, 'Expected first parameter to be a movie or TMDB ID (string)' )

} )

test( 'fetch movie trailer by TMDB ID', async t => {

	t.plan( 2 )

	const trailer = await movieTrailer( null, { tmdbId: '161' } )

	t.is( trailer.indexOf( 'http' ), 0, 'returns a url' )
	t.not( trailer.indexOf( 'youtube' ), -1, 'returns a youtube url' )

} )

test( 'fetch movie trailer with year', async t => {

	t.plan( 2 )

	const trailer = await movieTrailer( 'oceans eleven', 1960 )

	t.is( trailer.indexOf( 'http' ), 0, 'returns a url' )
	t.not( trailer.indexOf( 'youtube' ), -1, 'returns a youtube url' )

} )

test( 'fetch movie trailer as video ID', async t => {

	t.plan( 2 )

	const trailer = await movieTrailer( 'oceans eleven', { id: true } )

	t.is( trailer.indexOf( 'http' ), -1, 'does not return a url' )
	t.is( trailer.indexOf( 'youtube' ), -1, 'is not a youtube url' )

} )

test( 'fetch movie trailer with language', async t => {

	t.plan( 1 )

	const trailer = await movieTrailer( 'up' )
	const trailerDE = await movieTrailer( 'up', { language: 'de_DE' } )

	t.not( trailer, trailerDE, 'returns a language-specific video' )

} )

test( 'fetch movie trailer with year in object form', async t => {

	t.plan( 2 )

	const trailer = await movieTrailer( 'oceans eleven', { year: 1960 } )

	t.is( trailer.indexOf( 'http' ), 0, 'returns a url' )
	t.not( trailer.indexOf( 'youtube' ), -1, 'returns a youtube url' )

} )

test( 'fetch multiple trailers', async t => {

	t.plan( 3 )

	const trailer = await movieTrailer( 'oceans eleven', true )

	t.is( typeof trailer, 'object' )
	t.is( trailer[0].indexOf( 'http' ), 0, 'returns a url' )
	t.not( trailer[0].indexOf( 'youtube' ), -1, 'returns a youtube url' )

} )

test( 'fetch multiple trailers in object form', async t => {

	t.plan( 3 )

	const trailer = await movieTrailer( 'oceans eleven', { multi: true } )

	t.is( typeof trailer, 'object' )
	t.is( trailer[0].indexOf( 'http' ), 0, 'returns a url' )
	t.not( trailer[0].indexOf( 'youtube' ), -1, 'returns a youtube url' )

} )

test( 'fetch multiple trailers with year', async t => {

	t.plan( 3 )

	const trailer = await movieTrailer( 'oceans eleven', { multi: true, year: 1960 } )

	t.is( typeof trailer, 'object' )
	t.is( trailer[0].indexOf( 'http' ), 0, 'returns a url' )
	t.not( trailer[0].indexOf( 'youtube' ), -1, 'returns a youtube url' )

} )

test( 'fetch using a custom api_key', async t => {

	t.plan( 2 )

	const trailer = await movieTrailer( 'oceans eleven', { apiKey: '9d2bff12ed955c7f1f74b83187f188ae' } )

	t.is( trailer.indexOf( 'http' ), 0, 'returns a url' )
	t.not( trailer.indexOf( 'youtube' ), -1, 'returns a youtube url' )

} )

test.cb( 'calls the callback', t => {

	t.plan( 2 )

	movieTrailer( 'oceans eleven', ( error, result ) => {

		if ( error ) {

			return t.end( error )

		}

		t.is( result.indexOf( 'http' ), 0, 'returns a url' )
		t.not( result.indexOf( 'youtube' ), -1, 'returns a youtube url' )
		t.end()

	} )

} )

test.cb( 'calls the callback with a year', t => {

	t.plan( 2 )

	movieTrailer( 'oceans eleven', 1960, ( error, result ) => {

		if ( error ) {

			return t.end( error )

		}

		t.is( result.indexOf( 'http' ), 0, 'returns a url' )
		t.not( result.indexOf( 'youtube' ), -1, 'returns a youtube url' )
		t.end()

	} )

} )

test.cb( 'calls the callback with multiple trailers', t => {

	t.plan( 3 )

	movieTrailer( 'oceans eleven', true, ( error, result ) => {

		if ( error ) {

			return t.end( error )

		}

		t.is( typeof result, 'object' )
		t.is( result[0].indexOf( 'http' ), 0, 'returns a url' )
		t.not( result[0].indexOf( 'youtube' ), -1, 'returns a youtube url' )
		t.end()

	} )

} )

test.cb( 'calls the callback with a year and multiple trailers', t => {

	t.plan( 3 )

	movieTrailer( 'oceans eleven', { multi: true, year: 1960 }, ( error, result ) => {

		if ( error ) {

			return t.end( error )

		}

		t.is( typeof result, 'object' )
		t.is( result[0].indexOf( 'http' ), 0, 'returns a url' )
		t.not( result[0].indexOf( 'youtube' ), -1, 'returns a youtube url' )
		t.end()

	} )

} )
