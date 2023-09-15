'use strict'
const test = require( 'ava' )
const movieTrailer = require( './index' )

test( 'fetch movie trailer', async t => {

	t.plan( 2 )

	const trailer = await movieTrailer( 'oceans eleven' )

	t.is( trailer.indexOf( 'http' ), 0, 'returns a url' )
	t.not( trailer.indexOf( 'youtube' ), -1, 'returns a youtube url' )

} )

test( 'fetch tv trailer', async t => {

	t.plan( 2 )

	const trailer = await movieTrailer( 'shameless', { videoType: 'tv' } )

	t.is( trailer.indexOf( 'http' ), 0, 'returns a url' )
	t.not( trailer.indexOf( 'youtube' ), -1, 'returns a youtube url' )

} )

test( 'dont fetch empty search', async t => {

	// Testing no search query, should error
	const error = await movieTrailer( null ).catch( error_ => error_ )
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
	const trailerDE = await movieTrailer( 'up', { language: 'de' } )

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

test( 'calls the callback', async t => {

	t.plan( 2 )

	await movieTrailer( 'oceans eleven', ( _error, result ) => {

		t.is( result.indexOf( 'http' ), 0, 'returns a url' )
		t.not( result.indexOf( 'youtube' ), -1, 'returns a youtube url' )

	} )

} )

test( 'calls the callback with a year', async t => {

	t.plan( 2 )

	await movieTrailer( 'oceans eleven', 1960, ( _error, result ) => {

		t.is( result.indexOf( 'http' ), 0, 'returns a url' )
		t.not( result.indexOf( 'youtube' ), -1, 'returns a youtube url' )

	} )

} )

test( 'calls the callback with multiple trailers', async t => {

	t.plan( 3 )

	await movieTrailer( 'oceans eleven', true, ( _error, result ) => {

		t.is( typeof result, 'object' )
		t.is( result[0].indexOf( 'http' ), 0, 'returns a url' )
		t.not( result[0].indexOf( 'youtube' ), -1, 'returns a youtube url' )

	} )

} )

test( 'calls the callback with a year and multiple trailers', async t => {

	t.plan( 3 )

	await movieTrailer( 'oceans eleven', { multi: true, year: 1960 }, ( _error, result ) => {

		t.is( typeof result, 'object' )
		t.is( result[0].indexOf( 'http' ), 0, 'returns a url' )
		t.not( result[0].indexOf( 'youtube' ), -1, 'returns a youtube url' )

	} )

} )
