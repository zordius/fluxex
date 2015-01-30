'use strict';

var react = require('react'),
    FluxexObject = require('./fluxobj'),
    FluxexStore = require('./fluxstore'),

// jscs:disable checkRedundantParams
/**
 * Fluxex object is an isomorphic application
 * @class
 * @augments FluxexObject
 * @param {Object=} state - Serialized Fluxex application state
 */
// jscs:enable
Fluxex = function Fluxex() {
    FluxexObject.apply(this, arguments);

    if ((this.constructor !== Fluxex) && !this.stores) {
        throw new Error('Your app should define this.stores !!');
    }

    this._initStore();
    this._initDispatch();
};

Fluxex.prototype = new FluxexObject();

Object.assign(Fluxex.prototype,
/** @lends Fluxex# */
{
    constructor: Fluxex,

    /**
     * Return HTML react element registered to the application.
     * @return {element} the HTML react element
     */
    getHtmlJsx: function () {
        return react.createFactory(require(this.HtmlJsx.replace(/\/\//, './')))();
    },

    /**
     * Render HTML by executing an action with payload.
     * @param {Function} action - An action to prepare a page
     * @param {Object=} payload
     * @return {String} Rendered HTML
     */
    renderHtml: function (action, payload) {
        return this.executeAction(action, payload).then(function () {
            return new Promise(function (resolve) {
                react.withContext({fluxex: this}, function () {
                    resolve(react.renderToString(this.getHtmlJsx()));
                }.bind(this));
            }.bind(this));
        }.bind(this));
    },

    /**
     * Rract.render() the HTML, this rebind all client side react events.
     */
    initClient: function () {
        /*global document*/
        react.withContext({fluxex: this}, function () {
            react.render(this.getHtmlJsx(), document.body.parentNode.parentNode);
            this.inited = true;
        }.bind(this));
    },

    /**
     * Create store instances and keep context sync.
     * @protected
     */
    _initStore: function () {
        var I, states = this._get('stores');

        if (this.hasOwnProperty('_stores')) {
            throw new Error('._initStore() should not be called externally!');
        }

        if (!states) {
            states = {};
            this._set('stores', states);
        }

        this._stores = {};

        if (!this.stores) {
            return;
        }

        Object.keys(this.stores).forEach(function (I) {
            if (!states[I]) {
                states[I] = {};
            }
            this._stores[I] = this._createStore(this.stores[I], states[I]);
        }.bind(this));
    },

    /**
     * Create and update dispatch queue for all actions
     * @protected
     */
    _initDispatch: function () {
        if (this.hasOwnProperty('_actions')) {
            throw new Error('.initDispatch() should not be called externally!');
        }

        if (!this.stores) {
            return;
        }

        this._actions = {};

        Object.keys(this.stores).forEach(function (I) {
            this._scanDispatch(this.stores[I], I);
        }.bind(this));

        this._updateDispatch();
    },

    /**
     * Create and update dispatch info for all actions
     * @protected
     */
    _scanDispatch: function (store, name) {
        Object.keys(store).forEach(function (N) {
            var M = N.match(/^handle_(.+)$/);
            if (M) {
                if (!this._actions[M[1]]) {
                    this._actions[M[1]] = {
                        wait: {},
                        stores: {}
                    };
                }

                this._actions[M[1]].stores[name] = {};

                if (store.waitFor && store.waitFor[M[1]]) {
                    this._actions[M[1]].wait[name] = {_wait: store.waitFor[M[1]]};
                }
            }
        }.bind(this));
    },

    /**
     * Resolve waitFor and detect deadlocks.
     * @protected
     */
    _updateDispatch: function () {
        Object.keys(this._actions).forEach(function (A) {
            var info = this._actions[A];

            Object.keys(info.wait).forEach(function (W) {
                var L = Array.isArray(info.wait[W]._wait) ? info.wait[W]._wait : [info.wait[W]._wait];
                info.wait[W] = {};

                L.forEach(function (N) {
                    if (info.stores[N] !== undefined) {
                        info.wait[W][N] = info.wait[N];
                    }
                });
            });
        }.bind(this));
    },

    /**
     * Create a store by store prototype and initial status.
     * @protected
     * @param {Object} store - prototype for the new store instance
     * @param {Object} states - the initial status of the new store
     * @return {FluxexStore} A created store instance
     */
    _createStore: function (store, states) {
        var S = function() {
            FluxexStore.apply(this, arguments);
        };
        S.prototype = Object.assign(new FluxexStore(), store);
        return new S(states);
    },

    // jscs:disable checkRedundantParams
    /**
     * Restore the fluxex application status by provided state
     * @param {Object} states - the status to restore
     */
    // jscs:enable
    _restore: function () {
        var I, states;

        FluxexObject.prototype._restore.apply(this, arguments);
        states = this._get('stores');
        for (I in this._stores) {
            if (this._stores.hasOwnProperty(I)) {
                this._stores[I]._restore(states[I]);
            }
        }
    },

    /**
     * Get a store by store name
     * @param {String} name - store name
     * @return {FluxexStore} A fluxex store instance
     */
    getStore: function (name) {
        if (!this._stores[name]) {
            throw new Error('no store defined as "' + name + '"!');
        }
        return this._stores[name];
    },

    // jscs:disable checkRedundantParams
    /**
     * Execute an action creator with provided payload
     * @param {Function} action - the action creator function
     * @param {...*=} payload - payload or arguments for the action
     * @return {Promise} A promise instance
     */
    // jscs:enable
    executeAction: function (action) {
        var A,
            args = Array.prototype.slice.call(arguments, 1);

        if (!action || ('function' !== (typeof action.call))) {
            return Promise.reject(new Error('.executeAction() require a action creator function as first parameter!'));
        }

        A = action.apply(this, args);

        if (!A || ('function' !== (typeof A.then))) {
            return Promise.reject(new Error('Execute an action creator that do not return a promise!'));
        }

        return A;
    },

    /**
     * Dispatch an action with payload
     * @param {string} name - the action name
     * @param {Object=} payload - payload for the action
     * @return {Promise} A promise instance
     */
    dispatch: function (name, payload) {
        if (!name) {
            throw new Error('Can not dispatch without name!');
        }

        return new Promise(function (resolve) {
            var I, cb,
                stores = [],
                promises = [];

            if (this.currentAction !== undefined) {
                throw new Error('Can not dispatch "' + name + '" action when previous "' + this.currentAction + '" action is not done!');
            }

            this.currentAction = name;

            for (I in this._stores) {
                if (this._stores.hasOwnProperty(I)) {
                    cb = this._stores[I]['handle_' + name];
                    if (cb) {
                        stores.push(this._stores[I]);
                        cb = cb.call(this._stores[I], payload);
                        if (cb && cb.then) {
                            promises.push(cb);
                        }
                    }
                }
            }

            this.currentAction = undefined;

            if (stores.length === 0) {
                throw new Error('No store handled the "' + name + '" action. Maybe you forget to provide "handle_' + name + '" method in a store?');
            }

            resolve(Promise.all(promises));
        }.bind(this));
    }
});

module.exports = Fluxex;
