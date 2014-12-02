'use strict';

var assert = require('chai').assert,
    fluxexobj = require('../lib/fluxobj');

describe('FluxexObject', function () {
    it('can be constructed by undefined', function (done) {
        var F = new fluxexobj();
        done();
    });

    it('can be constructed by null', function (done) {
        var F = new fluxexobj(null);
        done();
    });

    it('can be constructed by number', function (done) {
        var F = new fluxexobj(123);
        done();
    });

    it('can be constructed by an object', function (done) {
        var F = new fluxexobj({a: 1, b: 2});

        assert.equal(1, F.get('a'));
        assert.equal(2, F.get('b'));
        done();
    });

    describe('.get()', function () {
        it('can get property by path', function (done) {
            var F = new fluxexobj({a: {b: 3}});

            assert.equal(3, F.get('a.b'));
            done();
        });
    });

    describe('.set()', function () {
        it('do not set on undefined key by default', function (done) {
            var F = new fluxexobj({a: {b: 3}});

            F.set('c', 4);
            assert.equal(undefined, F.get('c'));
            done();
        });

        it('can auto create undefined key', function (done) {
            var F = new fluxexobj({a: {b: 3}});

            F.set('c', 4, true);
            assert.equal(4, F.get('c'));
            done();
        });

        it('can auto create undefined key deeply', function (done) {
            var F = new fluxexobj({a: {b: 3}});

            F.set('c.d.e', 9, true);
            assert.equal(9, F.get('c.d.e'));
            done();
        });
    });

    describe('.toString()', function () {
        it('will not include prototype methods', function (done) {
            var F = new fluxexobj({a: 1, b: 2});

            assert.equal(undefined, F.toString().match(/toString/));
            assert.equal(fluxexobj, F.constructor);
            assert.equal('FluxexObject', F.constructor.name);
            done();
        });
    });
});
