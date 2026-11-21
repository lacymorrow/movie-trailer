'use strict'
// Network-free check that cli.js parses its flags. Stubs ./index so no TMDB call is made.
const assert = require( 'assert' )
const path = require( 'path' )

const indexPath = require.resolve( path.join( __dirname, '..', 'index.js' ) )
let captured
require.cache[indexPath] = {
	id: indexPath,
	filename: indexPath,
	loaded: true,
	exports: ( ...args ) => {

		captured = args
		return Promise.resolve( null )

	}
}

const run = argv => {

	delete require.cache[require.resolve( '../cli.js' )]
	process.argv = [process.argv[0], 'cli.js', ...argv]
	captured = undefined
	require( '../cli.js' )
	return captured

}

const longForm = run( ['Heat', '--year', '1995', '--api_key', 'KEY', '--language', 'de_DE', '--tmdb_id', '949', '--multi', '--id'] )
const shortForm = run( ['Heat', '-y', '1995', '-k', 'KEY', '-l', 'de_DE', '-t', '949', '-m', '-i'] )
const expected = { id: true, language: 'de_DE', multi: true, year: '1995', apiKey: 'KEY', tmdbId: '949' }
assert.strictEqual( longForm[0], 'Heat' )
assert.deepStrictEqual( longForm[1], expected )
assert.deepStrictEqual( shortForm[1], expected )
console.log( 'cli flags ok' )
