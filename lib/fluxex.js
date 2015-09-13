'use strict';

var react = require('react');
var FluxexObject = require('./fluxobj');
var FluxexStore = require('./fluxstore');
var FluxexContextedHtml = require('./fluxhtml');

var countWeight = function (O, N, names) {
    var weight = 1;

    if (N == '_wait') {
        return 0;
    }

    if (!O) {
        return 1;
    }

    if (O._score) {
        return O._score;
    }

    names[N] = true;
    Object.keys(O).forEach(function (K) {
        if (names[K]) {
            throw new Error('Circular waitFor dependency detected on store `' + N + '` (' + Object.keys(names).concat([K]).join('->') + ') !');
        }
        weight += countWeight(O[K], K, names);
    });
    delete names[N];

    return weight;
};

// jscs:disable checkRedundantParams
/**
 * Fluxex object is an isomorphic application
 * @class
 * @augments FluxexObject
 * @param {Object=} state - Serialized Fluxex application state
 */
// jscs:enable
var Fluxex = function Fluxex() {
    FluxexObject.apply(this, arguments);

    // constructor == check failed in IE8, so we use .match() hack
    if (!this.stores && !this.constructor.toString().match(/__SELF__CHECK__HIT__THIS__/)) {
        throw new Error('Your app should define this.stores !!');
    }

    this._initStore();
    this._initDispatch();
};

Fluxex.prototype = new FluxexObject();

Object.assign(Fluxex.prototype, {
/** @lends Fluxex# */
    constructor: Fluxex,

    /**
     * Return HTML get context ready react element.
     * @return {element} the react element represent whole Html
     */
    getContextedHtml: function () {
        return react.createFactory(FluxexContextedHtml)({
            fluxex: this,
            html: react.createFactory(this.HtmlJsx)
        });
    },

    /**
     * Create store instances and keep context sync.
     * @protected
     */
    _initStore: function () {
        var states = this._get('stores');

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
        Object.keys(store).concat(['handle_**UPDATEALL**']).forEach(function (N) {
            var M = N.match(/^handle_(.+)$/);
            if (M) {
                if (!this._actions[M[1]]) {
                    this._actions[M[1]] = {
                        wait: {}
                    };
                }

                this._actions[M[1]].wait[name] = {_wait: (store.waitFor && store.waitFor[M[1]]) ? store.waitFor[M[1]] : undefined};
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
                L.forEach(function (N) {
                    if ((N !== undefined) && (info.wait[N] !== undefined)) {
                        info.wait[W][N] = info.wait[N];
                    }
                });
            });

            Object.keys(info.wait).forEach(function (W) {
                info.wait[W]._score = countWeight(info.wait[W], W, {});
            });
            this._actions[A] = Object.keys(info.wait).sort(function (A, B) {
                return info.wait[A]._score - info.wait[B]._score;
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

        try {
            A = action.apply(this, args);
        } catch (E) {
            return Promise.reject(E);
        }

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
        var I = 0;
        if (!name) {
            throw new Error('Can not dispatch without name!');
        }

        if (!this._actions[name]) {
            throw new Error('No store handled the "' + name + '" action. Maybe you forget to provide "handle_' + name + '" method in a store?');
        }

        if (this.currentAction !== undefined) {
            throw new Error('Can not dispatch "' + name + '" action when previous "' + this.currentAction + '" action is not done!');
        }

        this.currentAction = name;

        this._actions[name].forEach(function (N) {
            I++;
            this._stores[N]['handle_' + name](payload);
        }.bind(this));

        this.currentAction = undefined;

        return Promise.resolve(I);
    }
}, require('./fluxex-server'));

module.exports = Fluxex;
