'use strict';

var assert = require('chai').assert,
    fluxex = require('..'),
    app = require('./testApp'),
    testStore = require('./testStore.js'),
    mixin = fluxex.mixin,
    sinon = require('sinon'),

getMixedComponent = function () {
    var App = new app(),
        ctx = function () {};

    ctx.prototype = mixin;
    ctx.prototype.context = {fluxex: App};

    return new ctx();
};

describe('fluxex.mixin', function () {
    it('._getContext() will return context', function (done) {
        assert.equal(true, getMixedComponent()._getContext() instanceof app);
        done();
    });

    it('._getInitScript() will return string', function (done) {
        assert.equal('string', typeof getMixedComponent()._getInitScript());
        done();
    });

    it('.getInitScript() will return string', function (done) {
        assert.equal('string', typeof getMixedComponent().getInitScript());
        assert.equal(true, getMixedComponent().getInitScript().length > 0);
        done();
    });

    it('.getInitScript() will return empty string when app already .initClient()', function (done) {
        var component = getMixedComponent();

        assert.equal(true, component.getInitScript().length > 0);

        // Simulate component._getContext().initClient() done
        component._getContext().inited = true;

        assert.equal(0, component.getInitScript().length);
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
