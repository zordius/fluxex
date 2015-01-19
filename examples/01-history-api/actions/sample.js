'use strict';

var samples = {
    updateProductPage: function () {
        return this.executeAction(samples.updateStoreByApi).then(function () {
            return this.dispatch('UPDATE_TITLE', this.getStore('productStore').get('data').title);
        }.bind(this));
    },
    updateStoreByApi: function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            var S = self.getStore('page'),
                id = S.get('url').query.id;

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
                reject(new Error('can not update product because no id'));
            }
        });
    }
};

module.exports = samples;
