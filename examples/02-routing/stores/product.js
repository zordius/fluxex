'use strict';

module.exports = {
    handle_UPDATE_PRODUCT: function (data) {
        this.set('data', data);
        this.emitChange();
    },
    handle_UPDATE_TOP_FIVE_PRODUCTS: function (data) {
        this.set('top5', data);
        this.emitChange();
    }
};
