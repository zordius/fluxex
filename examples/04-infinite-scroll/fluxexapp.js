'use strict';

require('fluxex/extra/polyfill-ie8');
require('fluxex/extra/polyfill');

// change RPC endpoint
require('fluxex/extra/rpc-seturl')('/_COOL_YQL_/');

var commonStores = require('fluxex/extra/commonStores');

module.exports = require('fluxex').createApp({
    page: commonStores.page,
    search: require('./stores/search')
}, require('./components/Html.jsx'), {
    routing: require('./actions/routing'),
    routeToURL: require('fluxex/extra/routeToURL'),
    request: require('fluxex/extra/rpc').request
});
