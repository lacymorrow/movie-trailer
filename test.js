'use strict';
var assert = require('assert');
var movieTrailer = require('./index');

it('given title, should return an image url', function () {
	movieTrailer('crash', function (err, url) {
	    assert.strictEqual(url.indexOf('http'), 0);
	});
});

it('given title and year, should return an image url', function () {
	movieTrailer('crash', 2004, function (err, url) {
	    assert.strictEqual(url.indexOf('http'), 0);
	});
});
