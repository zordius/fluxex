'use strict';

var assert = require('chai').assert,
    sinon = require('sinon'),
    fluxex = require('../'),
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
            var App = fluxex.createApp();
            new App();
        }, Error, 'You should create app with information of stores');
        done();
    });

    it('will throw when initStore() be called externally', function (done) {
        assert.throws(function () {
            var App = new app();
            App.initStore();
        }, Error, '.initStore() should not be called externally!');
        done();
    });

    it('can .get() and .set()', function (done) {
        var App = new app({a: 2});

        App.set('a', 3);
        assert.equal(3, App.get('a'));
        done();
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
            var D = require('domain').create();

            D.on('error', function (E) {
                D.exit();
                assert.equal('Can not dispatch "more_dispatch" action when previous "dispatch" action is not done!', E.message);
                D.dispose();
                done();
            });

            D.run(function () {
                var App = new app();
                App.dispatch('dispatch', App);
            });
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
});
