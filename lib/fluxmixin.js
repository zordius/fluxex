'use strict';

var react = require('react');

module.exports = {
    contextTypes: {
        fluxex: react.PropTypes.object.isRequired
    },
    _getContext: function () {
        return this.context.fluxex;
    },
    _getInitScript: function () {
        return 'var FluxexApp = new Fluxex(' + this._getContext().toString() + ');FluxexApp.initClient()';
    },
    _doStoreListeners: function (method) {
        var I;

        if (!this.listenStores || !this.listenStores.length) {
            return;
        }

        if ('function' !== (typeof this.onStoreChange)) {
            throw new Error('the component should provide .onStoreChange() to handle .listenStores[] !');
        }

        for (I in this.listenStores) {
            if (this.listenStores.hasOwnProperty(I)) {
                this.getStore(this.listenStores[I])[method](this.onStoreChange);
            }
        }
    },
    executeAction: function (action, payload) {
        return this._getContext().executeAction(action, payload);
    },
    getStore: function (name) {
        return this._getContext().getStore(name);
    },
    componentDidMount: function () {
        this._doStoreListeners('addChangeListener');
    },
    componentWillUnmount: function () {
        this._doStoreListeners('removeChangeListener');
    }
};
