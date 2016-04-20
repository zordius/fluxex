require('babel-polyfill');
require('fluxex/extra/polyfill-ie8');

// change RPC endpoint
require('fluxex/extra/rpc-seturl')('/_COOL_YQL_/');

var commonStores = require('fluxex/extra/commonStores');

module.exports = require('fluxex').createApp({
    page: commonStores.page,
    search: require('./stores/search')
}, require('./components/Html.jsx'), {
    redirect: require('fluxex/extra/redirect').redirect,
    routing: require('./actions/routing'),
    routeToURL: require('fluxex/extra/routeToURL'),
    request: require('fluxex/extra/rpc').request
});
