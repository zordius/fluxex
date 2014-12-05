'use strict';

var actions = require('./sample');

module.exports = {
    samplePage: function () {
        var self = this;
        return this.executeAction(actions.updateStoreByApi).then(function () {
            self.dispatch('UPDATE_TITLE', self.getStore('productStore').get('data.title'));
        });
    }
};
