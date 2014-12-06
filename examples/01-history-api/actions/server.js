'use strict';

var other_actions = require('./sample'),

server_actions = {
    samplePage: function (req) {
        // Dark magic, set query direct to store
        this.getStore('page').set('query', req.query, true);

        return this.executeAction(other_actions.updateStoreByApi).then(function () {
            this.dispatch('UPDATE_TITLE', this.getStore('productStore').get('data.title'));
        });
    }
};

module.exports = server_actions;
