var Router = require('routr');
var querystring = require('querystring');
var router;

// The single routing action can be used at both server/client side.
var routingAction = function () {
    var url = this.getStore('page')._get('url');
    var path = url ? url.pathname : undefined;
    var route = url ? router.getRoute(path) : undefined;

    if (!route) {
        return Promise.reject('no matched route for path: ' + path);
    }

    if (!route.config.action || !route.config.action.call) {
        return Promise.reject('Bad config: no proper action for route "' + route.name + '"!');
    }

    this.dispatch('UPDATE_ROUTING', {
        name: route.name,
        params: route.params
    });

    return this.executeAction(route.config.action);
};

var getURL = function (name, param, query) {
    var qs = querystring.encode(query),
        path = router.makePath(name, param);

    if (!path) {
        throw new Error('Can not generate URL by route name: \'' + name + '\' !');
    }

    return path + (qs ? '?' + qs : '');
};

// For Fluxex Applications
// add require('fluxex/extra/routing')(YourRoutingConfig) into fluxex.createApp() , then you have 3 API for your application: .routing() , .getURL() , .routeToURL()
// check example here: https://github.com/zordius/fluxex/blob/master/examples/05-extra/fluxexapp.js
module.exports = function (config) {
    router = new Router(config);

    return {
        routing: routingAction,
        getURL: getURL,
        routeToURL: require('fluxex/extra/routeToURL')
    };
};

// For React components
// add require('fluxex/extra/routing').mixin into mixin
// then you can this.getURL(name, param, query)
module.exports.mixin = {
    getURL: function (name, param, query) {
        return this._getContext().getURL(name, param, query);
    }
};
