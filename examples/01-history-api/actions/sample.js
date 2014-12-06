'use strict';

module.exports = {
    updateStoreByApi: function () {
        return this.createPromise(function (resolve) {
            var self = this,
                S = this.getStore('page'),
                id = S.get('query.id');

            if (id) {
                setTimeout(function () {
                    // simulate api call here...
                    self.dispatch('UPDATE_PRODUCT', {
                        title: 'this is sample title (' + id + ')',
                        description: 'this is sample description (id=' + id + ')',
                        price: 100 * id,
                        serial: Math.random()
                    });
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }
};
