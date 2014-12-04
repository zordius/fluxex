'use strict';

var assert = require('chai').assert,
    testStore = require('./testStore.js'),
    fluxex = require('..'),
    app = require('./testApp'),
    mixin = fluxex.mixin,

getMixinContext = function () {
    var App = new app(),
        ctx = function () {};

    ctx.prototype = mixin;
    ctx.prototype.context = {fluxex: App};

    return new ctx();
};

describe('fluxex.mixin', function () {
    it('.getContext will return context', function (done) {
        var C = getMixinContext();
        C.getContext();
        done();
    });
});
