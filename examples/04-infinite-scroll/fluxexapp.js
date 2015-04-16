'use strict';

require('fluxex/extra/polyfill-ie8');
require('fluxex/extra/polyfill');

require('fluxex/extra/fetch').baseURL = '/_HOHOHO_/';

var commonStores = require('fluxex/extra/commonStores');

module.exports = require('fluxex').createApp({
    page: commonStores.page,
    search: require('./stores/search')
}, require('./components/Html.jsx'), {
    routing: require('./actions/routing'),
    routeToURL: require('fluxex/extra/routeToURL')
});
