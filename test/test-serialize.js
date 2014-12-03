'use strict';

var assert = require('chai').assert,
    app = require('./testApp');

describe('a fluxex app', function () {
    it('can be constructed by undefined', function (done) {
        new app();
        done();
    });

    it('can be constructed by number', function (done) {
        var F = new app(123);
        done();
    });

    it('can be constructed by object', function (done) {
        var F = new app({stores: {sampleStore: {a: 1}}});
        F.stores
        done();
    });
});

describe('app serialization', function () {
    it('can be constructed by undefined', function (done) {
        done();
    });
});
