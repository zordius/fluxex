'use strict';

var fluxex = require('./'),
    testStore = require('./testStore.js'),

myApp = function () {
    this.addStore('sampleStore', testStore);

    fluxex.apply(this, arguments);
}

myApp.prototype = new fluxex();

module.exports = myApp;
