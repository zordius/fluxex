'use strict';

var other_actions = require('./sample'),

server_actions = {
    samplePageWithQuery: function (req) {
        // Dark magic, set query direct to store
        // this.dispatch() is correct way to do this
        this.getStore('page').set('query', req.query);
        return this.executeAction(server_actions.samplePage);
    },
    samplePage: function () {
        return this.executeAction(other_actions.updateStoreByApi).then(function () {
            this.dispatch('UPDATE_TITLE', this.getStore('productStore').get('data.title'));
        });
    }
};

module.exports = server_actions;
