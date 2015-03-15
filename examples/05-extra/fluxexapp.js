'use strict';

require('fluxex/extra/polyfill');

var commonStores = require('fluxex/extra/commonStores'),
    page = require('./actions/page');

module.exports = require('fluxex').createApp({
    page: commonStores.page,
    search: require('./stores/search')
}, process.cwd() + '/components/Html.jsx',
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
