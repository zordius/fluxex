'use strict';

module.exports = {
    sampleAction: function (payload) {
        return this.dispatch('UPDATE_SAMPLE', {c: payload});
    },
    updateStoreByApi: function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            var S = self.getStore('page'),
                query = S.get('query'),
                id = query ? query.id : undefined;

            if (id) {
                setTimeout(function () {
                    // simulate api call here...
                    var result = {
                        title: 'this is sample title (' + id + ')',
                        description: 'this is sample description (id=' + id + ')',
                        price: 100 * id
                    };
                    self.dispatch('UPDATE_PRODUCT', result);
                    resolve(result);
                });
            } else {
                reject(new Error('try to get product but no ID!'));
            }
        });
    }
};
