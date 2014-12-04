'use strict';

var assert = require('chai').assert,
    app = require('./testApp');

describe('app serialization', function () {
    it('store status will be updated in app', function (done) {
        var App = new app();

        App.getStore('sampleStore').set('a', 9, true);
        assert.equal('{"stores":{"sampleStore":{"a":9}}}', App.toString());
        done();
    });

    it('store can be restored in app', function (done) {
        var App = new app({"stores":{"sampleStore":{"a":99}}});

        assert.equal(99, App.getStore('sampleStore').get('a'));
        done();
    });
});
