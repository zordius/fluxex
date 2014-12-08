'use strict';

var apis = require('./api'),

// All page actions here.
// A page action will prepare all required store for a page
// and update the page title.
pages = {
    product: function () {
        return this.executeAction(apis.getProductById, this.getStore('page').get('routing.params.id')).then(function () {
            return this.dispatch('UPDATE_TITLE', this.getStore('productStore').get('data.title'));
        });
    },
    main: function () {
        this.dispatch('UPDATE_TITLE', 'Main Page');
        return this.executeAction(apis.getTopFiveProducts);
    }
};

module.exports = pages;
