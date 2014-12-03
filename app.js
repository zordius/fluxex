'use strict';

var fluxex = require('./'),
    testStore = require('./testStore.js'),

myApp = function () {
    this.stores = {
        sampleStore: require('./testStore')
    };

    fluxex.apply(this, arguments);
}

myApp.prototype = fluxex.prototype;

module.exports = myApp;
