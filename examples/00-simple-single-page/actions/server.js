'use strict';

var other_actions = require('./sample');

var server_actions = {
    samplePageWithQuery: function (req) {
        // Dark magic, set query direct to store
        // this.dispatch() is correct way to do this
        this.getStore('page')._set('query', req.query);
        return this.executeAction(server_actions.samplePage);
    },
    samplePage: function () {
        return this.executeAction(other_actions.updateStoreByApi).then(function () {
            return this.dispatch('UPDATE_TITLE', this.getStore('productStore')._get('data').title);
        }.bind(this));
    }
};

module.exports = server_actions;
