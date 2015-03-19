'use strict';

require('fluxex/extra/polyfill-ie8');
require('fluxex/extra/polyfill');

var commonStores = require('fluxex/extra/commonStores'),
    fluxex = require('fluxex'),
    page = require('./actions/page');

fluxex.port = '3001';
fluxex.protocol = 'http';

module.exports = fluxex.createApp({
    page: commonStores.page,
    search: require('./stores/search')
}, require('./components/Html.jsx'),
require('fluxex/extra/routing')({
    search: {
        path: '/search',
        method: 'get',
        action: page.search
    },
    video: {
        path: '/video/:id',
        method: 'get',
        action: page.video
    }
}));
