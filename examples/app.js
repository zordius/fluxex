'use strict';

module.exports = require('fluxex').createApp({
    sampleStore: require('./stores/sample.js'),
    productStore: require('./stores/product.js')
});
