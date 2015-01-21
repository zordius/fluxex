'use strict';

module.exports = {
    handle_UPDATE_PRODUCT: function (data) {
        this._set('data', data);
        this.emitChange();
    },
    getProduct: function () {
        return this._get('data');
    },

    handle_UPDATE_TOP_FIVE_PRODUCTS: function (data) {
        this._set('top5', data);
        this.emitChange();
    },

    getTop5: function () {
        return this._get('top5');
    }
};
