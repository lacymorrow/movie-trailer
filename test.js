'use strict';
var assert = require('assert');
var movieTrailer = require('./index');

it('should return an image url', function () {
	movieTrailer('crash', function (err, url) {
	    assert.strictEqual(url.indexOf('http'), 0);
	});
});
