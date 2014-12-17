'use strict';

module.exports = {
    handle_UPDATE_PRODUCT: function (payload) {
        this.set('data', payload);
        this.emitChange();
    },

    getData: function () {
        return this.get('data');
    }
};
