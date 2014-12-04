'use strict';

var objectAssign = require('object-assign'),
    Fluxex = require('./lib/fluxex');

Fluxex.createApp = function (stores, prototype) {
    var App = function FluxexApp() {
        this.stores = stores;
        Fluxex.apply(this, arguments);
    };

    if (!stores) {
        throw new Error('You should create app with information of stores');
    }

    App.prototype = new Fluxex();
    objectAssign(App.prototype, prototype);
    App.prototype.constructor = App;

    return App;
};

module.exports = Fluxex;
