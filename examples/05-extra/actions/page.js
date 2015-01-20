'use strict';

var apis = require('./api'),

// All page actions here.
// A page action will prepare all required store for a page
// and update the page title.
pages = {
    search: function () {
        this.dispatch('UPDATE_TITLE', 'Search:' + this.getStore('page').getQuery().q);
        return this.executeAction(apis.search, this.getStore('page').getQuery());
    },
    video: function () {
        return this.dispatch('UPDATE_TITLE', 'Watch Video ID:' + this.getStore('page').getRoutingParam().id);
    }
};

module.exports = pages;
