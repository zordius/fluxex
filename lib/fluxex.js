
var objectAssign = require('object-assign'),
    promise = require('promise'),
    FluxexObject = require('./fluxobj'),

Fluxex = function Fluxex() {
    FluxexObject.apply(this, arguments);

    if ((this.constructor !== Fluxex) && !this.stores) {
        throw new Error('Your app should define this.stores !!');
    }

    this.set('isDispatching', false);
    this.set('currentAction', undefined);

    this.initStore();
};

Fluxex.prototype = new FluxexObject();

objectAssign(Fluxex.prototype, {
    constructor: Fluxex,
    initStore: function () {
        var I, states = this.get('stores');

        if (this._stores) {
            throw new Error('.initStore should not be called 2 times!');
        }

        if (!states) {
            states = {};
            this.set('stores', states);
        }

        this._stores = {};

        for (I in this.stores) {
            if (this.stores.hasOwnProperty(I)) {
                if (!states[I]) {
                    states[I] = {};
                }
                this._stores[I] = this.createStore(this.stores[I], states[I]);
            }
        }
    },
    createStore: function (store, states) {
        var S = function() {
            FluxexObject.apply(this, arguments);
        };
        S.prototype = objectAssign(new FluxexObject(), store);
        return new S(states);
    },
    getStore: function (name) {
        if (!this._stores[name]) {
            throw new Error('no store defined as "' + name + '"!');
        }
        return this._stores[name];
    },
    dispatch: function (name, payload) {
        var self = this;

        return new promise(function (resolve) {
            var I, cb, stores = [];

            if (self.get('isDispatching')) {
                throw new Error('Can not dispatch "' + name + '" action when previous "' + self.get('currentAction') + '" action is not done!');
            }

            self.set('isDispatching', true);

            for (I in self._stores) {
                if (self._stores.hasOwnProperty(I)) {
                    cb = self._stores[I]['handle' + name];
                    if (cb) {
                        stores.push(self._stores[I]);
                        cb(payload);
                    }
                }
            }

            if (stores.length === 0) {
                throw new Error('No store handled the "' + name + '" action. Maybe you forget to provide "handle' + name + '" method in a store?');
            }

            resolve();
        });
    }
});

module.exports = Fluxex;
