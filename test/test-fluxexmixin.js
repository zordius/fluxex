'use strict';

var assert = require('chai').assert;
var fluxex = require('..');
var app = require('./testApp');
var testStore = require('./testStore.js');
var mixin = fluxex.mixin;
var sinon = require('sinon');

var getMixedComponent = function () {
    var App = new app(),
        ctx = function () {};

    ctx.prototype = mixin;
    ctx.prototype.context = {fluxex: App};
    ctx.prototype.props = {};

    return new ctx();
};

describe('fluxex.mixin', function () {
    it('._getContext() will return context', function (done) {
        assert.equal(true, getMixedComponent()._getContext() instanceof app);
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

    it('.executeAction() will work well', function (done) {
        var C = getMixedComponent(),
            CX = C._getContext();

        sinon.stub(CX, 'executeAction');
        C.executeAction(123, 456);
        assert.deepEqual([123, 456], CX.executeAction.getCall(0).args);
        CX.executeAction.restore();
        done();
    });
});
