'use strict';

module.exports = {
    sampleAction: function (payload) {
        return this.dispatch('UPDATE_SAMPLE', {c: payload});
    },
    updateStoreByApi: function () {
        var self = this;
        return new Promise(function (resolve) {
            var S = self.getStore('page'),
                id = S.get('query.id');

            if (id) {
                setTimeout(function () {
                    // simulate api call here...
                    self.dispatch('UPDATE_PRODUCT', {
                        title: 'this is sample title (' + id + ')',
                        description: 'this is sample description (id=' + id + ')',
                        price: 100 * id
                    });
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }
};
