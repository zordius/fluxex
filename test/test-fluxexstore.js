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

    it('constructor should be FluxexStore', function (done) {
        var F = new fluxstore({a: 1, b: 2});

        assert.equal(fluxstore, F.constructor);
        assert.equal('FluxexStore', F.constructor.name);
        done();
    });

    it('.get() can get property by path', function (done) {
        var F = new fluxstore({a: {b: 3}});

        assert.equal(3, F.get('a.b'));
        done();
    });

    it('.set() can set on undefined key', function (done) {
        var F = new fluxstore({a: {b: 3}});

        F.set('c', 4, true);
        assert.equal(4, F.get('c'));
        done();
    });

    it('.emitChange() should be a function', function (done) {
        var F = new fluxstore({a: {b: 3}});
        F.emitChange();
        done();
    });

    it('.addChangeListener() should works well', function (done) {
        var F = new fluxstore({a: {b: 3}});

        F.addChangeListener(function () {
            done();
        });
        F.emitChange();
    });

    it('[\'handle_**UPDATEALL**\']() should trigger listener', function (done) {
        var F = new fluxstore({a: {b: 3}});

        F.addChangeListener(function () {
            done();
        });
        F['handle_**UPDATEALL**']();
    });

    it('.removeChangeListener() should works well', function (done) {
        var F = new fluxstore({a: {b: 3}}),
            doNotCall = function () {
                throw 'this should not be called!';
            };

        F.addChangeListener(doNotCall);
        F.removeChangeListener(doNotCall);

        F.emitChange();
        setTimeout(function () {
            done();
        }, 50);
    });
});
