var actions = require('./sample');

module.exports = {
    samplePage: function () {
        return this.executeAction(actions.updateStoreByApi);
    }
};
