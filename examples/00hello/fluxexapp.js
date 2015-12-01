require('babel-polyfill');

module.exports = require('fluxex').createApp({
    product: require('./stores/product')
}, require('./components/Html.jsx'));
