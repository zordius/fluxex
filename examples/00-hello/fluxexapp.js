'use strict';

module.exports = require('fluxex').createApp({
    product: require('./stores/product')
}, process.cwd() + '/components/Html.jsx');
