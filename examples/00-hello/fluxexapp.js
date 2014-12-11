'use strict';

var commonStores = require('fluxex/extra/commonStores');

module.exports = require('fluxex').createApp({
    page: commonStores.page
}, process.cwd() + '/components/Html.jsx');
