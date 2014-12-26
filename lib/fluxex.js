'use strict';

var react = require('react'),
    withPromise = require('with-promise'),
    FluxexObject = require('./fluxobj'),
    FluxexStore = require('./fluxstore'),

/**
 * Fluxex object is an isomorphic application
 * @class
 * @augments FluxexObject
 * @param {Object=} state - Serialized Fluxex application state
 */
Fluxex = function Fluxex() {
    FluxexObject.apply(this, arguments);

    if ((this.constructor !== Fluxex) && !this.stores) {
        throw new Error('Your app should define this.stores !!');
    }

    this.initStore();
};

Fluxex.prototype = new FluxexObject();

Object.assign(Fluxex.prototype,
/** @lends Fluxex# */
{
    constructor: Fluxex,

    /**
     * Create a promise by provided resolver function
     * @param {Function} resolver - A resolver function
     * @return {Promise}
     */
    createPromise: function (resolver) {
        return withPromise.create(resolver, this);
    },

    /**
     * Create a fulfilled promise with provided value
     * @method
     * @param {Object|Number|String} value - Fulfilled value
     * @return {Promise} A fulfilled promise
     */
    resolvePromise: function (value) {
        return withPromise.resolve(value, this);
    },

    /**
     * Create a rejected promise with provided error
     * @method
     * @param {Error} error - Rejected error
     * @return {Promise} A rejected promise
     */
    rejectPromise: function (error) {
        return withPromise.reject(error, this);
    },

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
        var self = this;
        return this.executeAction(action, payload).then(function () {
            return this.createPromise(function (resolve) {
                react.withContext({fluxex: this}, function () {
                    resolve(react.renderToString(self.getHtmlJsx()));
                });
            });
        });
    },

    /**
     * Rract.render() the HTML, this rebind all client side react events.
     */
    initClient: function () {
        var self = this;

        /*global document*/
        react.withContext({fluxex: this}, function () {
            react.render(self.getHtmlJsx(), document.body.parentNode.parentNode);
            self.inited = true;
        });
    },

    /**
     * Create store instances and keep context sync.
     * @protected
     */
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

    /**
     * Create a store by store prototype and initial status.
     * @protected
     * @param {Object} store - prototype for the new store instance
     * @param {Object} states - the initial status of the new store
     * @return {FluxexStore} A created store instance
     */
    createStore: function (store, states) {
        var S = function() {
            FluxexStore.apply(this, arguments);
        };
        S.prototype = Object.assign(new FluxexStore(), store);
        return new S(states);
    },

    /**
     * Restore the fluxex application status by provided state
     * @param {Object} states - the status to restore
     */
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

    /**
     * Execute an action creator with provided payload
     * @param {Function} action - the action creator function
     * @param {Object=} payload - payload for the action
     * @return {Promise} A promise instance
     */
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

    /**
     * Dispatch an action with payload
     * @param {string} action - the action name
     * @param {Object=} payload - payload for the action
     * @return {Promise} A promise instance
     */
    dispatch: function (name, payload) {
        if (!name) {
            throw new Error('Can not dispatch without name!');
        }

        return this.createPromise(function (resolve) {
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
        });
    }
});

module.exports = Fluxex;
