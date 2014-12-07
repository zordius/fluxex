'use strict';

module.exports = {
    getTopFiveProducts: function () {
    },
    getProductById: function (id) {
        return this.createPromise(function (resolve, reject) {
            var self = this;

            if (id) {
                setTimeout(function () {
                    // simulate api call here...
                    self.dispatch('UPDATE_PRODUCT', {
                        title: 'this is sample title (' + id + ')',
                        description: 'this is sample description (id=' + id + ')',
                        price: 100 * id,
                        time: (new Date()).getTime(),
                        serial: Math.random()
                    });
                    resolve();
                });
            } else {
                reject('no product id!');
            }
        });
    }
};
