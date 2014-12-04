'use strict';

module.exports = require('fluxex').createApp({
    sampleStore: require('./stores/sample'),
    paramStore: {},                          // no special implement for this store
    productStore: require('./stores/product')
});
