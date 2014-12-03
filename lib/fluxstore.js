
var objectAssign = require('object-assign'),
    promise = require('promise'),
    FluxexObject = require('./fluxobj'),
    EventEmitter2 = require('eventemitter2').EventEmitter2,
    jpp = require('json-path-processor'),

FluxStore = function FluxStore(cfg) {
    FluxexObject.apply(this, arguments);
    this.eventEmitter = new EventEmitter2();
};

Fluxex.prototype = new FluxexObject();

objectAssign(Fluxex.prototype, {
    constructor: FluxStore,
    emitChange: function () {
        this.eventEmitter(this.eventEmitter.emit('CHANGE');
    },
    addChangeListener: function (callback) {
        this.eventEmitter.on('CHANGE', callback);
    },
    dispatch: function (name, payload) {
        var self = this;
        return new promise(function (resolve) {
            if (this.get('isDispatching')) {
                throw new Error('Can not dispatch "' + name + '" action when previous "' + this.get('currentAction') + '" action is not done!');
            }

            this.set('isDispatching', true);
        });
    }
});

module.exports = Fluxex;
