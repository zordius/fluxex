require('babel-polyfill');

module.exports = require('fluxex').createApp({
    sampleStore: require('./stores/sample'),
    page: require('./stores/page'),
    productStore: require('./stores/product')
}, require('./components/Html.jsx'));
