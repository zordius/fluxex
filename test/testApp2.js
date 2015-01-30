'use strict';

var fluxex = require('../');

module.exports = fluxex.createApp({
    sampleStore: require('./testStore'),
    storeA: {
        waitFor: ['storeB', 'storeC'],
        handle_TEST1: function () {}
    },
    storeB: {
        waitFor: ['storeC', 'storeD'],
        handle_TEST1: function () {}
    },
    storeC: {
        waitFor: ['storeD'],
        handle_TEST1: function () {}
    },
    storeD: {
        waitFor: ['storeE'],
        handle_TEST1: function () {}
    },
    storeE: {
        handle_TEST1: function () {}
    }
}, 'noneed_htmlJsx');
