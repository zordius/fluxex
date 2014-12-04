'use strict';

module.exports = {
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
