'use strict';

var fluxex = require('../');

module.exports = fluxex.createApp({
    sampleStore: require('./testStore')
}, 'noneed_htmlJsx');
