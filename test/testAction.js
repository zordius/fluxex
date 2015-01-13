'use strict';

module.exports = {
    sampleAction: function (payload) {
        return new Promise(function (resolve) {
            this.dispatch('SAMPLE', payload);
            resolve();
        }.bind(this));
    }
};
