'use strict';

var assert = require('chai').assert,
    testStore = require('./testStore.js'),
    fluxex = require('..'),
    app = require('./testApp'),
    mixin = fluxex.mixin,

getMixedComponent = function () {
    var App = new app(),
        ctx = function () {};

    ctx.prototype = mixin;
    ctx.prototype.context = {fluxex: App};

    return new ctx();
};

describe('fluxex.mixin', function () {
    it('.getContext() will return context', function (done) {
        assert.equal(true, getMixedComponent().getContext() instanceof app);
        done();
    });

    it('.getInitScript() will return string', function (done) {
        assert.equal('string', typeof getMixedComponent().getInitScript());
        done();
    });

    it('.componentDidMount() will do nothing when no listenStores defined', function (done) {
        getMixedComponent().componentDidMount();
        done();
    });

    it('.componentDidMount() throws when no onStoreChange defined', function (done) {
        var C = getMixedComponent();
        C.listenStores = ['test'];

        assert.throws(function () {
            C.componentDidMount();
        }, Error, 'the component should provide .onStoreChange() to handle .listenStores[] !');
        done();
    });

    it('.componentDidMount() will addChangeListener on specific store', function (done) {
        var C = getMixedComponent();
        C.listenStores = ['sampleStore'];
        C.onStoreChange = function () {};

        C.getStore('sampleStore').addChangeListener = function () {
            done();
        };
        C.componentDidMount();
    });

    it('componentWillUnmount will removeChangeListener on specific store', function (done) {
        var C = getMixedComponent();
        C.listenStores = ['sampleStore'];
        C.onStoreChange = function () {};

        C.getStore('sampleStore').removeChangeListener = function () {
            done();
        };
        C.componentWillUnmount();
    });
});
