'use strict';

/**
 * @external ReactComponent
 * @see {@link http://facebook.github.io/react/docs/component-api.html}
 */
var react = require('react'),

/**
 * A React component mixin to provide Fluxex interface
 * @mixin
 * @borrows Fluxex#executeAction as #executeAction
 * @borrows Fluxex#getStore as #getStore
 * @mixes external:ReactComponent
 */
FluxexMixin = {
    /**
     * Define property for fluxex context delivery
     * @instance
     */
    contextTypes: {
        fluxex: react.PropTypes.object.isRequired
    },

    /**
     * Get the fluxex application. This is internal method for other mixin method, you will not use this directly.
     * @protected
     * @instance
     * @return {Fluxex} The Fluxex application instance
     */
    _getContext: function () {
        return this.context.fluxex;
    },

    /**
     * Get Javascript String to initialize a Fluxex application. This is internal method for other mixin method, you will not use this directly.
     * @protected
     * @instance
     * @return {String} JavaScript code to initialize a Fluxex application
     */
    _getInitScript: function () {
        return 'var FluxexApp = new Fluxex(' + this._getContext().toString() + ');FluxexApp.initClient();';
    },

    /**
     * Do store listener task. This is internal method for other mixin method, you will not use this directly.
     * @protected
     * @instance
     * @param {string} method 'addChangeListener' or 'removeChangeListener'
     */
    _doStoreListeners: function (method) {
        var I;

        if (!this.listenStores || !this.listenStores.length) {
            return;
        }

        if ('function' !== (typeof this.onStoreChange)) {
            throw new Error('the component should provide .onStoreChange() to handle .listenStores[] !');
        }

        if (!this.listenStores || !this.listenStores.forEach) {
            throw new Error('the component should proide .listenStores[] to list interested stores !');
        }

        this.listenStores.forEach(function (S) {
            this.getStore(S)[method](this.onStoreChange);
        }.bind(this));
    },

    // jscs:disable checkRedundantParams
    /**
     * Execute an action creator with provided payload
     * @param {Function} action - the action creator function
     * @param {...*=} payload - payload or arguments for the action
     */
    // jscs:enable
    executeAction: function () {
        var cx = this._getContext();
        cx.executeAction.apply(cx, arguments);
    },

    /**
     * Get a store by store name
     * @param {String} name - store name
     * @return {FluxexStore} A fluxex store instance
     */
    getStore: function (name) {
        return this._getContext().getStore(name);
    },

    /**
     * This add store change listeners automatically
     * @instance
     */
    componentDidMount: function () {
        this._doStoreListeners('addChangeListener');
    },

    /**
     * This remove store change listeners automatically
     * @instance
     */
    componentWillUnmount: function () {
        this._doStoreListeners('removeChangeListener');
    }
};

module.exports = FluxexMixin;
