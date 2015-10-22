'use strict';

var assert = require('chai').assert,
    react = require('react'),
    ele = require('react/lib/ReactElement'),
    fluxhtml = require('../lib/fluxhtml'),
    fluxexobj = require('../lib/fluxobj');

describe('FluxexHtml', function () {
    it('is a valid component class', function (done) {
        assert.equal(ele.isValidElement(react.createElement(fluxhtml, {
            fluxex: {},
            html: function () {}
        })), true);
        done();
    });
});
