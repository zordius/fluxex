'use strict';

require('fluxex/extra/polyfill');
require('fluxex/extra/polyfill-ie8');
require('fluxex/extra/history');

var commonStores = require('fluxex/extra/commonStores');

module.exports = require('fluxex').createApp({
    page: commonStores.page,
    productStore: require('./stores/product')
}, require('./components/Html.jsx'), {
    routing: require('./actions/routing'),
    routeToURL: require('fluxex/extra/routeToURL')
});
