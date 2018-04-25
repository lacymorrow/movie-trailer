'use strict';
import test from 'ava'
import movieTrailer from './index'

test.cb( 'calls the callback without a year', t => {

	t.plan( 2 )

	movieTrailer( 'crash', ( err, res ) => {

		err && t.end( err )
		t.is( res.indexOf( 'http' ), 0, 'returns a url' )
		t.not( res.indexOf( 'youtube' ), -1, 'returns a youtube url' )
		t.end()

	} )

} )

test.cb( 'calls the callback with a year', t => {

	t.plan( 2 )

	movieTrailer( 'crash', 2004, ( err, res ) => {
		console.log(res)
		err && t.end( err )
		t.is( res.indexOf( 'http' ), 0, 'returns a url' )
		t.not( res.indexOf( 'youtube' ), -1, 'returns a youtube url' )
		t.end()

	} )

} )