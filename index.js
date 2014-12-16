'use strict';
/**
 * Fluxex core module to provide .createApp() and mixin for React components.
 * @module fluxex
 */
var objectAssign = require('object-assign'),
/** @lends Fluxex. */
    Fluxex = require('./lib/fluxex');

/**
 * Create an fluxex application by provided defintion.
 * @param {Object} stores - Store defination as {storeName: implement} pairs
 * @param {React} HtmlJsx - The Html element defined as a React component
 * @param {Object} prototype - Extra methods/properties want to be merged into application prototype
 * @returns {Object} The created fluxex application instance
 */
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
