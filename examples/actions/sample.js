'use strict';

module.exports = {
    sampleAction: function (payload) {
        return this.createPromise(function (resolve) {
            var S = this.getStore('sampleStore');
            S.set('c', payload, true);
            S.emitChange();                                                        
            resolve();
        });
    },
    updateStoreByApi: function (payload) {
        return this.createPromise(function (resolve) {
            var self = this,
                S = this.getStore('page'),
                id = S.get('query.id');

            if (id) {
                setTimeout(function () {
                    // simulate api call here...
                    self.getStore('productStore').set('data', {
                        title: 'this is sample title (' + id + ')',
                        description: 'this is sample description (id=' + id + ')',
                        price: 100 * id
                    }, {});
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }
};
