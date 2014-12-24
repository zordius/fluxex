'use strict';

var page = require('./page'),
    Router = require('routr'),
    querystring = require('querystring'),

router = new Router({
    search: {
        path: '/search',
        method: 'get',
        action: page.search
    },
    error: {
        path: '/error',
        method: 'get',
        action: page.error
    }
});

// The single routing action can be used at both server/client side.
module.exports = function () {
    var path = this.getStore('page').get('url.pathname'),
        route = router.getRoute(path);

    if (!route) {
        return this.rejectPromise('no matched route');
    }

    this.dispatch('UPDATE_ROUTING', {
        name: route.name,
        params: route.params
    });

    return this.executeAction(route.config.action);
};

module.exports.getURL = function (name, param, query) {
    var qs = querystring.encode(query);
    return router.makePath(name, param) + (qs ? '?' + qs : '');
};
