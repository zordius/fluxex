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

    it('can be constructed by an object', function (done) {
        var F = new fluxex({a: 1, b: 2});

        assert.equal(1, F.get('a'));
        assert.equal(2, F.get('b'));
        done();
    });

    describe('.get()', function () {
        it('can get property by path', function (done) {
            var F = new fluxex({a: {b: 3}});

            assert.equal(3, F.get('a.b'));
            done();
        });
    });

    describe('.toString()', function () {
        it('will not include prototype methods', function (done) {
            var F = new fluxex({a: 1, b: 2});

            assert.equal(undefined, F.toString().match(/toString/));
            done();
        });
    });
});
