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
};

describe('extra - commonStores', function () {
    var getMockedStore = function () {
        return getMockStore('page');
    };
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

        it('.handle_UPDATE_TITLE() will set title', function () {
            var S = getMockedStore();
            S.handle_UPDATE_TITLE({foo: 'bar'});
            assert.deepEqual(S._get('title'), {
                foo: 'bar'
            });
        });

        it('.getTitle() will get title', function () {
            var S = getMockedStore();
            S.handle_UPDATE_TITLE({foo: 'bar'});
            assert.deepEqual(S.getTitle(), {
                foo: 'bar'
            });
        });

        it('.handle_UPDATE_BODY() will set body', function () {
            var S = getMockedStore();
            S.handle_UPDATE_BODY({foo: 'bar'});
            assert.deepEqual(S._get('body'), {
                foo: 'bar'
            });
        });

        it('.getBody() will get body', function () {
            var S = getMockedStore();
            S.handle_UPDATE_BODY({foo: 'bar'});
            assert.deepEqual(S.getBody(), {
                foo: 'bar'
            });
        });

        it('.handle_UPDATE_ROUTING() will set routing', function () {
            var S = getMockedStore();
            S.handle_UPDATE_ROUTING({foo: 'bar'});
            assert.deepEqual(S._get('routing'), {
                foo: 'bar'
            });
        });

        it('.getRouteName() will get route name', function () {
            var S = getMockedStore();
            S.handle_UPDATE_ROUTING({name: 'bar'});
            assert.deepEqual(S.getRouteName(), 'bar');
        });

        it('.getRouteParams() will get route params', function () {
            var S = getMockedStore();
            S.handle_UPDATE_ROUTING({params: [1, 2, 3]});
            assert.deepEqual(S.getRouteParams(), [1, 2, 3]);
        });
    });
});
