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
};

var help = function () {
	console.log(pkg.description);
	console.log('');
	console.log('Usage');
	console.log('  $ movie-trailer movie [year]');
	console.log('');
	console.log('Example');
	console.log('  $ movie-trailer \'Oceans Eleven\' 1960');
	console.log('  http://path/to/trailer');
};

if (process.argv.indexOf('-h') !== -1 || process.argv.indexOf('--help') !== -1) {
	help();
	return;
}

if (process.argv.indexOf('-v') !== -1 || process.argv.indexOf('--version') !== -1) {
	console.log(pkg.version);
	return;
}

var multi = false;
if (process.argv.indexOf('-m') !== -1 || process.argv.indexOf('--multi') !== -1) {
	multi = true;
}

var argc = process.argv.length;
if (argc === 3){
	movieTrailer(movie, null, multi, cb);
} else if (!isNaN(parseFloat(process.argv[3])) && isFinite(process.argv[3])){
	movieTrailer(movie, process.argv[3], multi, cb);
} else {
	help();
}
