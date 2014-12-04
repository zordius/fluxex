'use strict';

var assert = require('chai').assert,
    fluxstore = require('../lib/fluxstore');

describe('FluxexStore', function () {
    it('can be constructed by undefined', function (done) {
        var F = new fluxstore();
        done();
    });

    it('can be constructed by null', function (done) {
        var F = new fluxstore(null);
        done();
    });

    it('can be constructed by number', function (done) {
        var F = new fluxstore(123);
        done();
    });

    it('can be constructed by an object', function (done) {
        var F = new fluxstore({a: 1, b: 2});

        assert.equal(1, F.get('a'));
        assert.equal(2, F.get('b'));
        done();
    });

    it('constructor should be FluxStore', function (done) {
        var F = new fluxstore({a: 1, b: 2});

        assert.equal(fluxstore, F.constructor);
        assert.equal('FluxStore', F.constructor.name);
        done();
    });

    describe('.get()', function () {
        it('can get property by path', function (done) {
            var F = new fluxstore({a: {b: 3}});

            assert.equal(3, F.get('a.b'));
            done();
        });
    });

    describe('.set()', function () {
        it('do not set on undefined key by default', function (done) {
            var F = new fluxstore({a: {b: 3}});

            F.set('c', 4);
            assert.equal(undefined, F.get('c'));
            done();
        });
    });
});
