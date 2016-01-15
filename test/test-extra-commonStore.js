var assert = require('chai').assert;
var fluxex = require('..');
var CS = require('../extra/commonStores');
var getMockStore = function (name) {
    var list = {};
    var app;
    var App;
    var store;

    list[name] = CS[name];
    app = fluxex.createApp(list, 'no_html_jsx');
    App = new app();
    store = App.getStore(name);
    store.initialize();

    return store;
}

describe('extra - commonStores', function () {
    var getMockedStore = function () {
        return getMockStore('page');
    }
    describe('page', function () {
        it('.initialize() sets correct defaults', function () {
            assert.deepEqual([
                getMockedStore()._get('url'),
                getMockedStore()._get('body'),
                getMockedStore()._get('routing')
            ], [
                {},
                {},
                {}
            ]);
        });
    });
});
