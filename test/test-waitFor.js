'use strict';

var assert = require('chai').assert;

describe('waitFor', function () {
    it('can influence dispatch order', function (done) {
        var A = new (require('./testApp3'))();

        assert.deepEqual(A._actions.TEST1, ['storeD', 'storeC', 'storeB', 'storeA']);
        done();
    });

    it('causes error when circular dependency', function (done) {
        assert.throws(function () {
            new (require('./testApp2'))();
        }, 'Circular waitFor dependency detected on store `storeC` (storeA->storeB->storeC->storeA) !');
        done();
    });
});
