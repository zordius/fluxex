'use strict';

var react = require('react');

module.exports = {
    contextTypes: {
        fluxex: react.PropTypes.object.isRequired
    },
    getStore: function (name) {
        return this.context.fluxex.getStore(name);
    },
    doStoreListeners: function (method) {
        var I;

        this.requireOnStoreChange();

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
        this.doStoreListeners('addChangeListner');
    },
    componentWillUnmount: function () {
        this.doStoreListeners('removeChangeListner');
    }
};
