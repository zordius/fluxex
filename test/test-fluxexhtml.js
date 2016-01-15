var assert = require('chai').assert;
var react = require('react');
var ele = require('react/lib/ReactElement');
var fluxhtml = require('../lib/fluxhtml');

describe('FluxexHtml', function () {
    it('is a valid component class', function (done) {
        assert.equal(ele.isValidElement(react.createElement(fluxhtml, {
            fluxex: {},
            html: function () {}
        })), true);
        done();
    });
});
