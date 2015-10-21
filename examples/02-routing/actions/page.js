var apis = require('./api');

// All page actions here.
// A page action will prepare all required store for a page
// and update the page title.
var pages = {
    product: function () {
        return this.executeAction(apis.getProductById, this.getStore('page').getRoutingParam().id).then(function () {
            return this.dispatch('UPDATE_TITLE', this.getStore('productStore').getProduct().title);
        }.bind(this));
    },
    main: function () {
        this.dispatch('UPDATE_TITLE', 'Main Page');
        return this.executeAction(apis.getTopFiveProducts);
    }
};

module.exports = pages;
