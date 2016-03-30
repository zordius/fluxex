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
                getMockedStore()._get('routing'),
                getMockedStore()._get('method')
            ], [
                {},
                {},
                {},
                'GET'
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

        it('.getMethod() will get method', function () {
            var S = getMockedStore();
            S.handle_UPDATE_URL({url:'http://moo.qoo', method: 'POST'});
            assert.deepEqual(S.getMethod(), 'POST');
        });

        describe('.handle_UPDATE_URL() URL parsing', function () {
            var assert_handle_UPDATE_URL = function (input, expect) {
                var S = getMockedStore();
                S.handle_UPDATE_URL(input);
                assert.deepEqual(S._get('url'), expect);
            };

            it('throws when try to set different host', function () {
                assert.throws(function () {
                    var S = getMockedStore();
                    S.handle_UPDATE_URL('http://moo.qoo');
                    S.handle_UPDATE_URL('https://foo.bar');
                }, 'Try to set URL to different host: foo.bar , original host is: moo.qoo');
            });

            describe('payload as object', function () {
                it('should handle /foo/bar', function () {
                    assert_handle_UPDATE_URL({url: '/foo/bar'}, {
                        href: '/foo/bar',
                        protocol: '',
                        host: '',
                        hostname: '',
                        port: '',
                        pathname: '/foo/bar',
                        search: '',
                        hash: '',
                        query: {}
                    });
                });
            });

            describe('payload as string', function () {
                it('should handle /foo/bar', function () {
                    assert_handle_UPDATE_URL('/foo/bar', {
                        href: '/foo/bar',
                        protocol: '',
                        host: '',
                        hostname: '',
                        port: '',
                        pathname: '/foo/bar',
                        search: '',
                        hash: '',
                        query: {}
                    });
                });

                it('should handle /foo/bar?123#456', function () {
                    assert_handle_UPDATE_URL('/foo/bar?123#456', {
                        href: '/foo/bar?123#456',
                        protocol: '',
                        host: '',
                        hostname: '',
                        port: '',
                        pathname: '/foo/bar',
                        search: '?123',
                        hash: '#456',
                        query: {123: ''}
                    });
                });

                it('should handle moo.com/foo/bar?123=4+6#', function () {
                    assert_handle_UPDATE_URL('moo.com/foo/bar?123=4+6#', {
                        href: 'moo.com/foo/bar?123=4+6#',
                        protocol: '',
                        host: '',
                        hostname: '',
                        port: '',
                        pathname: 'moo.com/foo/bar',
                        search: '?123=4+6',
                        hash: '#',
                        query: {123: '4 6'}
                    });
                });

                it('should handle http://moo.com/foo/bar/', function () {
                    assert_handle_UPDATE_URL('http://moo.com/foo/bar/', {
                        href: 'http://moo.com/foo/bar/',
                        protocol: 'http:',
                        host: 'moo.com',
                        hostname: 'moo.com',
                        port: '',
                        pathname: '/foo/bar/',
                        search: '',
                        hash: '',
                        query: {}
                    });
                });

                it('should handle https://moo.com:9876/foo/bar/', function () {
                    assert_handle_UPDATE_URL('https://moo.com:9876/foo/bar/', {
                        href: 'https://moo.com:9876/foo/bar/',
                        protocol: 'https:',
                        host: 'moo.com:9876',
                        hostname: 'moo.com',
                        port: '9876',
                        pathname: '/foo/bar/',
                        search: '',
                        hash: '',
                        query: {}
                    });
                });

                it('should handle https://moo.com:9876', function () {
                    assert_handle_UPDATE_URL('https://moo.com:9876', {
                        href: 'https://moo.com:9876',
                        protocol: 'https:',
                        host: 'moo.com:9876',
                        hostname: 'moo.com',
                        port: '9876',
                        pathname: '',
                        search: '',
                        hash: '',
                        query: {}
                    });
                });

                it('should handle https://moo.com:9876/?q=a', function () {
                    assert_handle_UPDATE_URL('https://moo.com:9876/?q=a', {
                        href: 'https://moo.com:9876/?q=a',
                        protocol: 'https:',
                        host: 'moo.com:9876',
                        hostname: 'moo.com',
                        port: '9876',
                        pathname: '/',
                        search: '?q=a',
                        hash: '',
                        query: {q: 'a'}
                    });
                });
            });
        });
    });
});
