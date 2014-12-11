'use strict';

module.exports = {
    handle_UPDATE_PRODUCT: function (payload) {
        this.set('data', payload, true);
        this.emitChange();
    },

    getData: function () {
        return this.get('data');
    }
};
