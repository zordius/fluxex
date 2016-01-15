var assert = require('chai').assert;
var app = require('./testApp');

describe('app serialization', function () {
    it('store status will be updated in app', function (done) {
        var App = new app();

        App.getStore('sampleStore')._set('a', 9);
        assert.equal('{"stores":{"sampleStore":{"q":"OK!","a":9}}}', App.toString());
        done();
    });

    it('store can be restored in app', function (done) {
        var App = new app({"stores":{"sampleStore":{"a":99}}});

        assert.equal(99, App.getStore('sampleStore')._get('a'));
        done();
    });

    it('circular depdency can be detected', function (done) {
        var test = {a: {b: 'O\'K"'}};
        test.b = test;
        test.c = [test];

        var App = new app({stores: {sampleStore: test}});
        assert.equal('{"stores":{"sampleStore":{"a":{"b":"O\'K\\""},"b":"[CIRCULAR!]","c":["[CIRCULAR!]"],"q":"OK!"}}}', App.toString());
        done();
    });
});
