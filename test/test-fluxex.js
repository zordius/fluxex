'use strict';

var assert = require('chai').assert,
    testStore = require('./testStore.js'),
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

    it('constructor should be Fluxex', function (done) {
        var F = new fluxex({a: 1, b: 2});

        assert.equal(fluxex, F.constructor);
        assert.equal('Fluxex', F.constructor.name);
        done();
    });

    describe('.get()', function () {
        it('can get property by path', function (done) {
            var F = new fluxex({a: {b: 3}});

            assert.equal(3, F.get('a.b'));
            done();
        });
    });

    describe('.set()', function () {
        it('can set property by path', function (done) {
            var F = new fluxex({a: {b: 3}});

            F.set('c', 4);
            assert.equal(4, F.get('c'));
            done();
        });
    });

    describe('.createStore()', function () {
        it('will return a store instance', function (done) {
            var F = new fluxex(),
                S = F.createStore(testStore, {a: 3});

            assert.equal('FluxexStore', S.constructor.name);
            assert.equal('function', typeof S.getList);
            done();
        });
    });

    describe('.getStore()', function () {
        it('should throw when no store defined', function (done) {
            var F = new fluxex();

            assert.throws(function () {F.getStore('test')}, Error, 'no store defined as "test"');
            done();
        });
    });
});
