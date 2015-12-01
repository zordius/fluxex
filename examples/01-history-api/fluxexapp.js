require('babel-polyfill');
require('fluxex/extra/polyfill-ie8');
require('fluxex/extra/history');

var commonStores = require('fluxex/extra/commonStores');

module.exports = require('fluxex').createApp({
    page: commonStores.page,
    productStore: require('./stores/product')
}, require('./components/Html.jsx'));
