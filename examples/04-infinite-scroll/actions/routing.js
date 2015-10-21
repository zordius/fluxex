var page = require('./page');
var Router = require('routr');
var querystring = require('querystring');

var router = new Router({
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
    var path = this.getStore('page')._get('url').pathname;
    var route = router.getRoute(path);

    if (!route) {
        return Promise.reject(new Error('no matched route for path:' + path));
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
