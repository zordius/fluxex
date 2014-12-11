'use strict';

var commonStores = require('fluxex/extra/commonStores');

module.exports = require('fluxex').createApp({
    product: require('./stores/product'),
    page: commonStores.page
}, process.cwd() + '/components/Html.jsx');
