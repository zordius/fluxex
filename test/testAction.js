'use strict';

module.exports = {
    sampleAction: function () {
        return this.createPromise(function (resolve) {
            var S = this.getStore('sampleStore');
            S.set('c', 123, true);
            S.emitChange();
            resolve();
        });
    }
};
