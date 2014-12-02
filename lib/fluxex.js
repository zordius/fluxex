var objectAssign = require('object-assign'),
    promise = require('promise'),
    FluxexObject = require('./fluxobj'),
    jpp = require('json-path-processor'),

Fluxex = function Fluxex(cfg) {
    this._context = {
        states: {},
        isDispatching: false,
        currentAction: undefined
    };

    FluxexObject.apply(this, arguments);
};

Fluxex.prototype = new FluxexObject();

objectAssign(Fluxex.prototype, {
    constructor: Fluxex,
    addStore: function (name, store, states) {
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
