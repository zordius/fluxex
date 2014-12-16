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

    it('can point context to same construct object', function (done) {
        var data = {a: 1, b: 2},
            F = new fluxexobj(data);

        assert.equal(2, F.get('b'));
        data.c = 3;
        assert.equal(3, F.get('c'));
        done();
    });

    it('constructor should be FluxexObject', function (done) {
        var F = new fluxexobj({a: 1, b: 2});

        assert.equal(fluxexobj, F.constructor);
        assert.equal('FluxexObject', F.constructor.name);
        done();
    });

    describe('.restore() ', function () {
        it('will replace whole context', function (done) {
            var data = {a: 1, b: 2},
                F = new fluxexobj(data);

            F.restore({a: 1, c: 4});
            assert.equal(undefined, F.get('b'));
            assert.equal(4, F.get('c'));
            done();
        });

        it('will break original object connection', function (done) {
            var data = {a: 1, b: 2},
                F = new fluxexobj(data);

            F.restore({a: 1, b: 2});
            data.c = 3;
            assert.equal(undefined, F.get('c'));
            done();
        });
    });

    describe('.get()', function () {
        it('can get property by path', function (done) {
            var F = new fluxexobj({a: {b: 3}});

            assert.equal(3, F.get('a.b'));
            done();
        });
    });

    describe('.set()', function () {
        it('can auto create undefined key when no 3rd param', function (done) {
            var F = new fluxexobj({a: {b: 3}});

            F.set('c', 4);
            assert.equal(4, F.get('c'));
            done();
        });

        it('can auto create undefined key when 3rd param is true', function (done) {
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

        it('can set into ._context', function (done) {
            var F = new fluxexobj({a: {b: 3}});

            F.set('c.d.e', 9, true);
            assert.equal(9, F._context.c.d.e);
            done();
        });
    });

    describe('.toString()', function () {
        it('will not include prototype methods', function (done) {
            var F = new fluxexobj({a: 1, b: 2});

            assert.equal(undefined, F.toString().match(/toString/));
            done();
        });

        it('will dump full context', function (done) {
            var data = {a: 1, b: 2, c: 3},
                F = new fluxexobj(data);

            assert.deepEqual(data, JSON.parse(F.toString()));
            done();
        });
    });
});
