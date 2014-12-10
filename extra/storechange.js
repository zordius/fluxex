'use strict';

module.exports = {
    getInitialState: function () {
        if (!this.getStateFromStores) {
            throw new Error('You should provide getStateFromStores method for this component when using storechange mixin!');
        }

        // For .getInitialState(): must return an object or null
        return this.getStateFromStores() || {};
    },
    onStoreChange: function () {
        this.setState(this.getStateFromStores());
    }
};
