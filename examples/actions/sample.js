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
            var S = this.getStore('paramStore'),
                id = S.get('id');

            if (id) {
                setTimeout(function () {
                    // simulate api call here...
                    this.getStore('productStore').set('.', {
                        title: 'this is sample title',
                        description: 'this is sample description',
                        price: 100
                    }, true);
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }
};
