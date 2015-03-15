'use strict';

require('fluxex/extra/polyfill');

var commonStores = require('fluxex/extra/commonStores');

module.exports = require('fluxex').createApp({
    page: commonStores.page,
    productStore: require('./stores/product')
}, process.cwd() + '/components/Html.jsx', {
    routing: require('./actions/routing'),
    routeToURL: require('fluxex/extra/routeToURL')
});
