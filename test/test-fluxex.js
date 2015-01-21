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

        assert.equal(1, F._get('a'));
        assert.equal(2, F._get('b'));
        done();
    });

    it('constructor should be Fluxex', function (done) {
        var F = new fluxex({a: 1, b: 2});

        assert.equal(fluxex, F.constructor);
        assert.equal('Fluxex', F.constructor.name);
        done();
    });

    describe('._get()', function () {
        it('can get property by name', function (done) {
            var F = new fluxex({a: {b: 3}});

            assert.deepEqual({b: 3}, F._get('a'));
            done();
        });
    });

    describe('._set()', function () {
        it('can set property by name', function (done) {
            var F = new fluxex({a: {b: 3}});

            F._set('c', 4);
            assert.equal(4, F._get('c'));
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
