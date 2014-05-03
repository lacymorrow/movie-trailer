#!/usr/bin/env node
'use strict';
var pkg = require('./package.json');
var movieTrailer = require('./index');
var movie = process.argv[2];

var cb = function (err, url) {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(url);
}

function help() {
	console.log(pkg.description);
	console.log('');
	console.log('Usage');
	console.log('  $ movie-trailer movie [year]');
	console.log('');
	console.log('Example');
	console.log('  $ movie-trailer \'Oceans Eleven\' 1960');
	console.log('  http://path/to/trailer');
	movieTrailer(null, null, null, cb);
}

if (process.argv.indexOf('-h') !== -1 || process.argv.indexOf('--help') !== -1) {
	help();
	return;
}

if (process.argv.indexOf('-v') !== -1 || process.argv.indexOf('--version') !== -1) {
	console.log(pkg.version);
	return;
}

var argc = process.argv.length;
if (argc < 3){
	help();
} else if (argc === 3){
	movieTrailer(movie, null, null, cb);
} else if (argc === 4 && !isNaN(parseFloat(process.argv[3])) && isFinite(process.argv[3])){
	movieTrailer(movie, process.argv[3], null, cb);
} else if (argc === 4){
	movieTrailer(movie, null, process.argv[3], cb);
} else {
	movieTrailer(movie, process.argv[3], process.argv[4], cb);
}