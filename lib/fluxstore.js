'use strict';

var objectAssign = require('object-assign'),
    FluxexObject = require('./fluxobj'),
    EventEmitter = require('eventemitter2').EventEmitter2,

FluxStore = function FluxStore() {
    FluxexObject.apply(this, arguments);
    this.eventEmitter = new EventEmitter();
};

FluxStore.prototype = new FluxexObject();

objectAssign(FluxStore.prototype, {
    constructor: FluxStore,
    emitChange: function () {
        this.eventEmitter.emit('CHANGE');
    },
    addChangeListener: function (callback) {
        this.eventEmitter.addListener('CHANGE', callback);
    },
    removeChangeListener: function (callback) {
        this.eventEmitter.removeListener('CHANGE', callback);
    }
});

module.exports = FluxStore;
