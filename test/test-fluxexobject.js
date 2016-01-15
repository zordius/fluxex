var assert = require('chai').assert;
var fluxexobj = require('../lib/fluxobj');

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

        assert.equal(1, F._get('a'));
        assert.equal(2, F._get('b'));
        done();
    });

    it('can point context to same construct object', function (done) {
        var data = {a: 1, b: 2},
            F = new fluxexobj(data);

        assert.equal(2, F._get('b'));
        data.c = 3;
        assert.equal(3, F._get('c'));
        done();
    });

    it('constructor should be FluxexObject', function (done) {
        var F = new fluxexobj({a: 1, b: 2});

        assert.equal(fluxexobj, F.constructor);
        assert.equal('FluxexObject', F.constructor.name);
        done();
    });

    describe('._restore() ', function () {
        it('will replace whole context', function (done) {
            var data = {a: 1, b: 2},
                F = new fluxexobj(data);

            F._restore({a: 1, c: 4});
            assert.equal(undefined, F._get('b'));
            assert.equal(4, F._get('c'));
            done();
        });

        it('will break original object connection', function (done) {
            var data = {a: 1, b: 2},
                F = new fluxexobj(data);

            F._restore({a: 1, b: 2});
            data.c = 3;
            assert.equal(undefined, F._get('c'));
            done();
        });
    });

    describe('._get()', function () {
        it('can get property by key name', function (done) {
            var F = new fluxexobj({a: {b: 3}});

            assert.deepEqual({b: 3}, F._get('a'));
            done();
        });
    });

    describe('._set()', function () {
        it('can auto create undefined key', function (done) {
            var F = new fluxexobj({a: {b: 3}});

            F._set('c', 4);
            assert.equal(4, F._get('c'));
            done();
        });

        it('can set into ._context', function (done) {
            var F = new fluxexobj({a: {b: 3}});

            F._set('a', 9);
            assert.equal(9, F._context.a);
            done();
        });

        it('can set to undefined', function (done) {
            var F = new fluxexobj({a: {b: 3}});

            F._set('a', undefined);
            assert.deepEqual({a: undefined}, F._context);
            done();
        });

        it('can set to null', function (done) {
            var F = new fluxexobj({a: {b: 3}});

            F._set('a', null);
            assert.deepEqual(F._context, {a: null});
            done();
        });

        it('can create undefined', function (done) {
            var F = new fluxexobj({a: {b: 3}});

            F._set('b', undefined);
            assert.deepEqual(F._context, {a: {b: 3}, b: undefined});
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
            var data = {a: 1, b: '2', c: true, d: undefined, e: null},
                F = new fluxexobj(data);

            assert.equal('{"a":1,"b":"2","c":true,"d":undefined,"e":null}', F.toString());
            done();
        });

        it('can handle array', function (done) {
            assert.deepEqual('{"a":["ok",undefined,null]}', (new fluxexobj({a: ['ok', undefined, null]})).toString());
            done();
        });
    });
});
