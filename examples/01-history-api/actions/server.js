'use strict';

var other_actions = require('./sample'),

server_actions = {
    samplePage: function (req) {
        return this.dispatch('UPDATE_URL', req.url).then(function () {
console.log(this.toString());
            return this.executeAction(other_actions.updateStoreByApi);
        }).then(function () {
            return this.dispatch('UPDATE_TITLE', this.getStore('productStore').get('data.title'));
        });
    }
};

module.exports = server_actions;
