'use strict';

module.exports = require('fluxex').createApp({
    sampleStore: require('./stores/sample'),
    page: {},                                // no special implement for this store
    productStore: require('./stores/product')
});

//some trick to bundle jsx , later will be removed
require('./components/Html.jsx');
