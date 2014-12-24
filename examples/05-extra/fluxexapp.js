'use strict';

var commonStores = require('fluxex/extra/commonStores');

module.exports = require('fluxex').createApp({
    page: commonStores.page,
    search: require('./stores/search')
}, process.cwd() + '/components/Html.jsx', {
    routing: require('fluxex/extra/routing')({
    }),
    routeToURL: require('fluxex/extra/routeToURL')
});
