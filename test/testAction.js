'use strict';

module.exports = {
    sampleAction: function (payload) {
        return this.createPromise(function (resolve) {
            this.dispatch('SAMPLE', payload);
            resolve();
        });
    }
};
