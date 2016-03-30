var assert = require('chai').assert;
var fluxex = require('..');
var CS = require('../extra/commonStores');
var R = require('../extra/routing');
var serverExtra = require('../extra/server');
var express = require('express');
var bodyParser = require('body-parser');
var req = require('supertest');
var sinon = require('sinon');

var getMockApp = function (routing) {
    return fluxex.createApp(CS, fluxex.Title, R(routing));
};

var getExpress = function (routing) {
    var app = express();

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(serverExtra.createMiddlewareWithRouting(getMockApp(routing), serverExtra.postHandler));
    return app;
};

var mockRequest = function (url, routing, done, method) {
    var M = method || 'get';

    req(getExpress(routing))[M](url).end(done);
};

var assertMockRequest = function (url, routing, name, method) {
    routing[name].action = sinon.stub().returns(Promise.resolve());
    return new Promise(function (resolve, reject) {
        mockRequest(url, routing, function () {
            try {
                assert.equal(routing[name].action.callCount, 1);
                resolve();
            } catch (E) {
                reject(E);
            }
        }, method);
    });
};

describe('extra - routing', function () {
    it('should handle single route correctly', function () {
        return assertMockRequest('/foo/bar', {
            test: {
                path: '/foo/bar',
                method: 'get'
            }
        }, 'test');
    });

    it('should match ending / correctly', function () {
        return assertMockRequest('/foo/', {
            test: {
                path: '/foo',
                method: 'get'
            }
        }, 'test');
    });

    it('should match url exactly', function () {
        return assertMockRequest('/foo/bar', {
            test1: {
                path: '/foo/',
                method: 'get'
            },
            test2: {
                path: '/foo/bar',
                method: 'get'
            }
        }, 'test2');
    });

    it('should match url by param', function () {
        return assertMockRequest('/foo/bar', {
            test: {
                path: '/foo/:id',
                method: 'get'
            }
        }, 'test');
    });

    it('should match routing one by one', function () {
        return assertMockRequest('/foo/bar', {
            test1: {
                path: '/foo/bar',
                method: 'get'
            },
            test2: {
                path: '/foo/:id',
                method: 'get'
            }
        }, 'test1');
    });

    it('should not match url by param when it is empty', function () {
        return assertMockRequest('/foo/', {
            test1: {
                path: '/foo/:id',
                method: 'get'
            },
            test2: {
                path: '/foo',
                method: 'get'
            }
        }, 'test2');
    });

    it('should match by method', function () {
        return assertMockRequest('/foo/bar', {
            test1: {
                path: '/foo/bar',
                method: 'get'
            },
            test2: {
                path: '/foo/bar',
                method: 'post'
            }
        }, 'test2', 'post');
    });

    it('should handle urlencoded form post body correctly', function (done) {
        req(getExpress({
            test1: {
                path: '/foo/bar',
                method: 'get'
            },
            test2: {
                path: '/foo/bar',
                method: 'post',
                action: function () {
                    return this.dispatch('UPDATE_TITLE', 'BODY:' + JSON.stringify(this.getStore('page').getParams()));
                }
            }
        }))
        .post('/foo/bar')
        .type('form')
        .send({
            test: 'HAHAHA',
            hello: 'WORLD!'
        })
        .end(function (err, res) {
            try {
                assert.match(res.text, /BODY:{&quot;test&quot;:&quot;HAHAHA&quot;,&quot;hello&quot;:&quot;WORLD!&quot;}/);
                done();
            } catch (E) {
                done(E);
            }
        });
    });
});
