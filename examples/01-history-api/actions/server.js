'use strict';

var other_actions = require('./sample'),

server_actions = {
    samplePage: function (req) {
        return this.dispatch('UPDATE_URL', req.url).then(function () {
            return this.executeAction(other_actions.updateProductPage);
        });
    }
};

module.exports = server_actions;
