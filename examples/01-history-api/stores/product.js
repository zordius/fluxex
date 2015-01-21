'use strict';

module.exports = {
    handle_UPDATE_PRODUCT: function (data) {
        this._set('data', data);
        this.emitChange();
    },
    getProduct: function () {
        return this._get('data');
    }
};
