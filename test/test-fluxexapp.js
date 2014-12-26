'use strict';

var assert = require('chai').assert,
    sinon = require('sinon'),
    fluxex = require('../'),
    react = require('react'),
    actions = require('./testAction'),
    app = require('./testApp');

describe('a fluxex app', function () {
    it('can be constructed by undefined', function (done) {
        var A = new app();
        done();
    });

    it('can be constructed by number', function (done) {
        var F = new app(123);
        done();
    });

    it('can be constructed by object', function (done) {
        var F = new app({a: 3});
        done();
    });

    it('creates stores automatically when be constructed', function (done) {
        var F = new app({stores: {sampleStore: {a: 1}}});

        assert.equal(1, F.getStore('sampleStore').get('a'));
        done();
    });

    it('will throw when no this.stores defined', function (done) {
        assert.throws(function () {
            var App = function () {
                fluxex.apply(this, arguments);
            }
            new App();
        }, Error, 'Your app should define this.stores !!');
        done();
    });

    it('will throw when no store info defined', function (done) {
        assert.throws(function () {
            fluxex.createApp();
        }, Error, 'You should create app with information of stores as first parameter');
        done();
    });

    it('will throw when no HtmlJsx provided', function (done) {
        assert.throws(function () {
            fluxex.createApp({fakeStore: '...'});
        }, Error, 'You should create app with HtmlJsx as second parameter');
        done();
    });

    it('will throw when .initStore() be called externally', function (done) {
        assert.throws(function () {
            var App = new app();
            App.initStore();
        }, Error, '.initStore() should not be called externally!');
        done();
    });

    it('will throw when .getHtmlJsx() with wrong module name', function (done) {
        assert.throws(function () {
            var App = new app();
            App.getHtmlJsx();
        }, Error, 'Cannot find module \'noneed_htmlJsx\'');
        done();
    });

    it('.initClient() will react.render() with self', function (done) {
        var App = new app({c: 3});

        sinon.stub(react, 'withContext', function (obj, cb) {
            global.document = {body: {parentNode: {parentNode: 0}}};
            cb();
        });

        sinon.stub(App, 'getHtmlJsx').returns('123');
        sinon.stub(react, 'render');

        App.initClient();

        assert.strictEqual(App, react.withContext.getCall(0).args[0].fluxex);
        assert.equal('123', react.render.getCall(0).args[0]);
        delete global.document;

        react.withContext.restore();
        react.render.restore();

        done();
    });

    it('can .get() and .set()', function (done) {
        var App = new app({a: 2});

        App.set('a', 3);
        assert.equal(3, App.get('a'));
        done();
    });

    describe('.restore()', function () {
        it('will update stores context', function (done) {
            var F = new app({stores: {sampleStore: {a: 1}}});

            assert.equal(1, F.getStore('sampleStore').get('a'));
            F.restore({stores: {sampleStore: {b: 2}}});
            assert.equal(undefined, F.getStore('sampleStore').get('a'));
            assert.equal(2, F.getStore('sampleStore').get('b'));
            done();
        });
    });
    describe('.getStore()', function () {
        it('should return instance', function (done) {
            var App = new app({a: 2}),
                Store = App.getStore('sampleStore');

            console.log(Store.prototype);
            assert.equal('function', typeof Store.emitChange);
            done();
        });
    });

    describe('.dispatch()', function () {
        it('should throw when no name provided', function (done) {
            assert.throws(function () {
                var App = new app();
                App.dispatch();
            }, Error, 'Can not dispatch without name!');
            done();
        });

        it('should return a promise', function (done) {
            var App = new app();

            assert.equal('function', typeof App.dispatch('test').then);
            done();
        });

        it('should return rejected promise when no store handle it', function (done) {
            var App = new app();

            App.dispatch('_none_').catch(function (E) {
                assert.equal('No store handled the "_none_" action. Maybe you forget to provide "handle__none_" method in a store?', E.message);
                done();
            });
        });

        it('should throw when dispatch in dispatch', function (done) {
            var App = new app();
            App.dispatch('dispatch', App).catch(function (E) {
                assert.equal('Can not dispatch "more_dispatch" action when previous "dispatch" action is not done!', E.message);
                done();
            });
        });

        it('should dispatch 2 actions one by one well', function (done) {
            var App = new app();

            App.dispatch('SAMPLE', 3);
            assert.equal(3, App.getStore('sampleStore').get('c'));
            App.dispatch('SAMPLE', 40);
            assert.equal(40, App.getStore('sampleStore').get('c'));
            done();
        });
    });

    describe('.executeAction()', function () {
        it('should return a promise', function (done) {
            var App = new app();

            App.executeAction().catch(function () {
                done();
            });
        });

        it('should return a rejected promise when no action provided', function (done) {
            var App = new app();

            App.executeAction().catch(function (E) {
                assert.equal('.executeAction() require a action creator function as first parameter!', E.message);
                done();
            });
        });

        it('should return a rejected promise when the action do not return a promise', function (done) {
            var App = new app();

            App.executeAction(function (){}).catch(function (E) {
                assert.equal('Execute an action creator that do not return a promise!', E.message);
                done();
            });
        });

        it('should execute action well', function (done) {
            var App = new app();

            App.executeAction(actions.sampleAction, 3).then(function() {
                done();
            });
        });
    });

    describe('.renderHtml()', function () {
        it('will do react.renderToString() with self as context', function (done) {
            var App = new app(),
                element = react.createElement('div', {className: 'test'});

            sinon.stub(App, 'getHtmlJsx').returns(element);
            sinon.spy(react, 'withContext');

            App.renderHtml(actions.sampleAction, 3).then(function (html) {
                assert.equal('{"stores":{"sampleStore":{"c":3}}}', react.withContext.getCall(0).args[0].fluxex.toString());
                react.withContext.restore();
                done();
            });
        });
    });
});
