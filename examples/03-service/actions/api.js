'use strict';

module.exports = {
    getTopFiveProducts: function () {
        return this.dispatch('UPDATE_TOP_FIVE_PRODUCTS', [
            {id: 123, title: 'sample 123'},
            {id: 456, title: 'sample 456'},
            {id: 789, title: 'sample 789'},
            {id: 135, title: 'sample 135'},
            {id: 246, title: 'sample 246'}
        ]);
    },
    getProductById: function (id) {
        return this.createPromise(function (resolve, reject) {
            var self = this;

            if (id) {
                // simulate api call here...
                setTimeout(function () {
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
                reject(new Error('no product id!'));
            }
        });
    }
};
