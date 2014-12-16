'use strict';

module.exports = {
    handle_UPDATE_PRODUCT: function (data) {
        this.set('data', data);
        this.emitChange();
    }
};
