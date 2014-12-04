'use strict';

module.exports = {
    sampleAction: function (payload) {
        return this.createPromise(function (resolve) {
            var S = this.getStore('sampleStore');
            S.set('c', payload, true);
            S.emitChange();                                                        
            resolve();
        });
    }
};
