'use strict';

var objectAssign = require('object-assign'),
    when = require('when'),
    FluxexObject = require('./fluxobj'),
    FluxexStore = require('./fluxstore'),

Fluxex = function Fluxex() {
    FluxexObject.apply(this, arguments);

    if ((this.constructor !== Fluxex) && !this.stores) {
        throw new Error('Your app should define this.stores !!');
    }

    this.initStore();
};

Fluxex.prototype = new FluxexObject();

objectAssign(Fluxex.prototype, {
    constructor: Fluxex,
    createPromise: function (resolver) {
        var self = this;
        return when.promise(function (resolve, reject) {
            try {
                resolver.call(self, resolve, reject);
            } catch (E) {
                reject(E);
            }
        });
    },
    resolvePromise: when.resolve,
    rejectPromise: when.reject,
    initStore: function () {
        var I, states = this.get('stores');

        if (this.hasOwnProperty('_stores')) {
            throw new Error('.initStore() should not be called externally!');
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
            FluxexStore.apply(this, arguments);
        };
        S.prototype = objectAssign(new FluxexStore(), store);
        return new S(states);
    },
    getStore: function (name) {
        if (!this._stores[name]) {
            throw new Error('no store defined as "' + name + '"!');
        }
        return this._stores[name];
    },
    executeAction: function (action, payload) {
        var A;

        if (!action || ('function' !== (typeof action.apply))) {
            return this.rejectPromise(new Error('.executeAction() require a action creator function as first parameter!'));
        }

        A = action.call(this, payload);

        if (!A || ('function' !== (typeof A.then))) {
            return this.rejectPromise(new Error('Execute an action creator that do not return a promise!'));
        }

        return A;
    },
    dispatch: function (name, payload) {
        var self = this;

        if (!name) {
            throw new Error('Can not dispatch without name!');
        }

        return this.createPromise(function (resolve) {
            var I, cb, stores = [];

            if (self.currentAction !== undefined) {
                throw new Error('Can not dispatch "' + name + '" action when previous "' + self.currentAction + '" action is not done!');
            }

            self.currentAction = name;

            for (I in self._stores) {
                if (self._stores.hasOwnProperty(I)) {
                    cb = self._stores[I]['handle_' + name];
                    if (cb) {
                        stores.push(self._stores[I]);
                        cb(payload);
                    }
                }
            }

            self.currentAction = undefined;

            if (stores.length === 0) {
                throw new Error('No store handled the "' + name + '" action. Maybe you forget to provide "handle_' + name + '" method in a store?');
            }

            resolve(stores);
        });
    }
});

module.exports = Fluxex;
