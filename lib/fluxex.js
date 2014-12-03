
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

    if ((this.constructor !== Fluxex) && !this.stores) {
        throw new Error('Your app should define this.stores !!');
    }

    this.initStore();
};

Fluxex.prototype = new FluxexObject();

objectAssign(Fluxex.prototype, {
    constructor: Fluxex,
    initStore: function () {
        var I, S, states = this.get('stores');

        if (this._stores) {
            throw new Error('.initStore should not be called 2 times!');
        }

        this._stores = {};

        for (I in this.stores) {
            if (this.stores.hasOwnProperty(I)) {
                this._stores[I] = this.createStore(this.stores[I], states ? states[I] : undefined);
            }
        }
    },
    createStore: function (store, states) {
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
