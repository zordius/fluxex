'use strict';

module.exports = function () {
    return this.dispatch('UPDATE_PRODUCT', {
        title: 'sample product',
        price: 12345,
        sold: 0
    });
};
