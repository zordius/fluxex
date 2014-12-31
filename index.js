'use strict';

/** @lends Fluxex */
var Fluxex = require('./lib/fluxex');

/**
 * Create an fluxex application by provided defintion.
 * @param {Object} stores - Store defination as {storeName: implement} pairs
 * @param {React} HtmlJsx - The Html element defined as a React component
 * @param {Object} mixins - Extra methods/properties want to be merged into application prototype
 * @returns {Object} The created fluxex application instance
 * @example
var myApp = require('fluxex').createApp({
    product: require('./stores/product')      // Define a 'product' store
}, process.cwd() + '/components/Html.jsx');   // Your Html.jsx
 */
Fluxex.createApp = function (stores, HtmlJsx) {
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

    if (arguments.length > 2) {
        Object.assign.apply(null, [App.prototype].concat(Array.prototype.slice.call(arguments, 2)));
    }

    App.prototype.constructor = App;

    return App;
};

Fluxex.mixin = require('./lib/fluxmixin');

module.exports = Fluxex;
