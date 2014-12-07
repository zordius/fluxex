'use strict';

var apis = require('./api'),

pages = {
    product: function () {
        return this.executeAction(apis.getProductById, this.getStore('page').get('params.id')).then(function () {
            return this.dispatch('UPDATE_TITLE', this.getStore('productStore').get('data.title'));
        });
    },
    main: function () {
        this.dispatch('UPDATE_TITLE', 'Main Page');
        return this.executeAction(apis.getTopFiveProducts);
    }
};

module.exports = pages;
