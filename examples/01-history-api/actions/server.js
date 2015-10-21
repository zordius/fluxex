var other_actions = require('./sample');

var server_actions = {
    samplePage: function (req) {
        return this.dispatch('UPDATE_URL', req.url).then(function () {
            return this.executeAction(other_actions.updateProductPage);
        }.bind(this));
    }
};

module.exports = server_actions;
