'use strict';

var assert = require('chai').assert;

describe('waitFor', function () {
    it('can influence dispatch order', function (done) {
        var A = new (require('./testApp3'))();

        assert.deepEqual(A._actions.TEST1, ['storeD', 'storeC', 'storeB', 'storeA']);
        done();
    });
});
