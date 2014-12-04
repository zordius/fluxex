'use strict';

var objectAssign = require('object-assign'),
    Fluxex = require('./lib/fluxex');

Fluxex.createApp = function (stores, HtmlJsx, prototype) {
    var App = function FluxexApp() {
        this.stores = stores;
        this.HtmlJsx = HtmlJsx;
        Fluxex.apply(this, arguments);
    };

    if (!stores) {
        throw new Error('You should create app with information of stores as first parameter');
    }

    if (!HtmlJsx) {
        throw new Error('You should create app with HtmlJsx as second parameter');
    }

    App.prototype = new Fluxex();
    objectAssign(App.prototype, prototype);
    App.prototype.constructor = App;

    return App;
};

Fluxex.mixin = require('./lib/fluxmixin');

module.exports = Fluxex;
