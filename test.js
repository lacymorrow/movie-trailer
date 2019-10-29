'use strict'
import test from 'ava'
import movieTrailer from './index'

test( 'fetch movie trailer', async t => {

	t.plan( 2 )

	const trailer = await movieTrailer( 'oceans eleven' )

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

	const trailer = await movieTrailer( 'oceans eleven' )
	const trailer_de = await movieTrailer( 'oceans eleven', { language: 'de_DE' } )

	t.not( trailer, trailer_de, 'returns a language-specific video' )

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

test.cb( 'calls the callback', t => {

	t.plan( 2 )

	movieTrailer( 'oceans eleven', ( err, res ) => {

		err && t.end( err )
		t.is( res.indexOf( 'http' ), 0, 'returns a url' )
		t.not( res.indexOf( 'youtube' ), -1, 'returns a youtube url' )
		t.end()

	} )

} )

test.cb( 'calls the callback with a year', t => {

	t.plan( 2 )

	movieTrailer( 'oceans eleven', 1960, ( err, res ) => {

		err && t.end( err )
		t.is( res.indexOf( 'http' ), 0, 'returns a url' )
		t.not( res.indexOf( 'youtube' ), -1, 'returns a youtube url' )
		t.end()

	} )

} )

test.cb( 'calls the callback with multiple trailers', t => {

	t.plan( 3 )

	movieTrailer( 'oceans eleven', true, ( err, res ) => {

		err && t.end( err )
		t.is( typeof res, 'object' )
		t.is( res[0].indexOf( 'http' ), 0, 'returns a url' )
		t.not( res[0].indexOf( 'youtube' ), -1, 'returns a youtube url' )
		t.end()

	} )

} )

test.cb( 'calls the callback with a year and multiple trailers', t => {

	t.plan( 3 )

	movieTrailer( 'oceans eleven', { multi: true, year: 1960 }, ( err, res ) => {

		err && t.end( err )
		t.is( typeof res, 'object' )
		t.is( res[0].indexOf( 'http' ), 0, 'returns a url' )
		t.not( res[0].indexOf( 'youtube' ), -1, 'returns a youtube url' )
		t.end()

	} )

} )
