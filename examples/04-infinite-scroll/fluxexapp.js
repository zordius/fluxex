'use strict';

require('fluxex/extra/polyfill');
require('fluxex/extra/polyfill-ie8');
require('fluxex/extra/history');

require('fluxex/extra/fetch').baseURL = '/_HOHOHO_/';

var commonStores = require('fluxex/extra/commonStores');

module.exports = require('fluxex').createApp({
    page: commonStores.page,
    productStore: require('./stores/product')
}, require('./components/Html.jsx'), {
    routing: require('./actions/routing'),
    routeToURL: require('./lib/routeToURL')
});
