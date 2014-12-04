'use strict';

var actions = require('./sample');

module.exports = {
    samplePage: function () {
        var self = this;
        return this.executeAction(actions.updateStoreByApi).then(function () {
            self.getStore('page').set('title', self.getStore('productStore').get('data.title'), true);
        });
    }
};
