'use strict';

var samples = {
    updateProductPage: function () {
        return this.executeAction(samples.updateStoreByApi).then(function () {
            return this.dispatch('UPDATE_TITLE', this.getStore('productStore').get('data.title'));
        });
    },
    updateStoreByApi: function () {
        return this.createPromise(function (resolve) {
            var self = this,
                S = this.getStore('page'),
                id = S.get('url.query.id');

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
                resolve();
            }
        });
    }
};

module.exports = samples;
