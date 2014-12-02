'use strict';

var assert = require('chai').assert,
    fluxex = require('..');

describe('fluxex', function () {
    it('can be constructed by undefined', function (done) {
        var F = new fluxex();
        done();
    });

    it('can be constructed by null', function (done) {
        var F = new fluxex(null);
        done();
    });

    it('can be constructed by number', function (done) {
        var F = new fluxex(123);
        done();
    });
});
