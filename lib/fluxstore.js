'use strict';

var FluxexObject = require('./fluxobj');
var EventEmitter = require('eventemitter2').EventEmitter2 || require('eventemitter2');

// jscs:disable checkRedundantParams
/**
 * FluxexStore is an FluxexObject can be listen to the change event.
 * @class
 * @augments FluxexObject
 * @param {Object=} state - Serialized state
 */
// jscs:enable
var FluxexStore = function FluxexStore() {
    FluxexObject.apply(this, arguments);
    this.eventEmitter = new EventEmitter();
};

FluxexStore.prototype = new FluxexObject();

Object.assign(FluxexStore.prototype, {
/** @lends FluxexStore# */
    constructor: FluxexStore,

    /**
     * This method supports magic dispatch('**UPDATEALL') for all stores
     */
    'handle_**UPDATEALL**': function () {
        this.emitChange();
    },

    /**
     * Emit a change event for this store
     * @return {FluxexStore} Self
     */
    emitChange: function () {
        this.eventEmitter.emit('CHANGE');
        return this;
    },

    /**
     * Add a change listener
     * @param {Function} handler - the listener handler
     * @return {FluxexStore} Self
     */
    addChangeListener: function (handler) {
        this.eventEmitter.addListener('CHANGE', handler);
        return this;
    },

    /**
     * Remove a change listener
     * @param {Function} handler - the listener handler
     * @return {FluxexStore} Self
     */
    removeChangeListener: function (handler) {
        this.eventEmitter.removeListener('CHANGE', handler);
        return this;
    }
});

module.exports = FluxexStore;
