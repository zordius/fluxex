'use strict';

var assert = require('chai').assert,
    app = require('./testApp2');

describe('waitFor', function () {
    it('can influence dispatch order', function (done) {
        var A = new app();
        console.log(A);
        done();
    });
});
