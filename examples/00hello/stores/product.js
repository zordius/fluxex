'use strict';

module.exports = {
    handle_UPDATE_PRODUCT: function (payload) {
        this._set('data', payload);
        this.emitChange();
    },

    getData: function () {
        return this._get('data');
    }
};
