'use strict';

var objectAssign = require('object-assign'),
    when = require('when'),
    react = require('react'),
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
        }).with(this);
    },
    resolvePromise: when.resolve,
    rejectPromise: when.reject,
    getHtmlJsx: function () {
        return react.createFactory(require(this.HtmlJsx.replace(/\/\//, './')))();
    },
    renderHtml: function (action, payload) {
        var self = this;
        return this.executeAction(action, payload).then(function () {
            return this.createPromise(function (resolve) {
                react.withContext({fluxex: this}, function () {
                    resolve(react.renderToString(self.getHtmlJsx()));
                });
            });
        });
    },
    initClient: function () {
        var self = this;

        /*global document*/
        react.withContext({fluxex: this}, function () {
            react.render(self.getHtmlJsx(), document.body.parentNode.parentNode);
            self.inited = true;
        });
    },
    initStore: function () {
        var I, states = this.get('stores');

        if (this.hasOwnProperty('_stores')) {
            throw new Error('.initStore() should not be called externally!');
        }

        if (!states) {
            states = {};
            this.set('stores', states, true);
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
    restore: function () {
        var I, states;

        FluxexObject.prototype.restore.apply(this, arguments);
        states = this.get('stores');
        for (I in this._stores) {
            if (this._stores.hasOwnProperty(I)) {
                this._stores[I].restore(states[I]);
            }
        }
    },
    getStore: function (name) {
        if (!this._stores[name]) {
            throw new Error('no store defined as "' + name + '"!');
        }
        return this._stores[name];
    },
    executeAction: function (action, payload) {
        var A;

        if (!action || ('function' !== (typeof action.call))) {
            return this.rejectPromise(new Error('.executeAction() require a action creator function as first parameter!'));
        }

        A = action.call(this, payload);

        if (!A || ('function' !== (typeof A.then))) {
            return this.rejectPromise(new Error('Execute an action creator that do not return a promise!'));
        }

        return A;
    },
    dispatch: function (name, payload) {
        if (!name) {
            throw new Error('Can not dispatch without name!');
        }

        return this.createPromise(function (resolve) {
            var I, cb, stores = [];

            if (this.currentAction !== undefined) {
                throw new Error('Can not dispatch "' + name + '" action when previous "' + this.currentAction + '" action is not done!');
            }

            this.currentAction = name;

            for (I in this._stores) {
                if (this._stores.hasOwnProperty(I)) {
                    cb = this._stores[I]['handle_' + name];
                    if (cb) {
                        stores.push(this._stores[I]);
                        cb.call(this._stores[I], payload);
                    }
                }
            }

            this.currentAction = undefined;

            if (stores.length === 0) {
                throw new Error('No store handled the "' + name + '" action. Maybe you forget to provide "handle_' + name + '" method in a store?');
            }

            resolve(stores);
        });
    }
});

module.exports = Fluxex;
