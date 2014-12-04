'use strict';

var react = require('react');

module.exports = {
    contextTypes: {
        fluxex: react.PropTypes.object.isRequired
    },
    getContext: function () {
        return this.context.fluxex;
    },
    getInitScript: function () {
        return 'var FluxexApp = new Fluxex(' + this.getContext().toString() + ');FluxexApp.initClient()';
    },
    getStore: function (name) {
        return this.getContext().getStore(name);
    },
    doStoreListeners: function (method) {
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
    componentDidMount: function () {
        this.doStoreListeners('addChangeListener');
    },
    componentWillUnmount: function () {
        this.doStoreListeners('removeChangeListener');
    }
};
