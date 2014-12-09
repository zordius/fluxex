'use strict';

module.exports = {
    search: function (id) {
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
