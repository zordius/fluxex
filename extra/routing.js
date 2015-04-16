'use strict';

var Router = require('routr'),
    querystring = require('querystring'),
    router,

// The single routing action can be used at both server/client side.
routingAction = function () {
    var url = this.getStore('page')._get('url'),
        path = url ? url.pathname : undefined,
        route = url ? router.getRoute(path) : undefined;

    if (!route) {
        return Promise.reject('no matched route for path: ' + path);
    }

    this.dispatch('UPDATE_ROUTING', {
        name: route.name,
        params: route.params
    });

    return this.executeAction(route.config.action);
},

getURL = function (name, param, query) {
    var qs = querystring.encode(query),
        path = router.makePath(name, param);

    if (!path) {
        throw new Error('Can not generate URL by route name: \'' + name + '\' !');
    }

    return path + (qs ? '?' + qs : '');
},

routeToUrl = function (url) {
    this.dispatch('UPDATE_URL', url).then(function ()
        {
        // Run action to update page stores
            return this.executeAction(this.routing);
        }.bind(this)).then(function () {
            // Success, trigger page refresh
            this.getStore('page').emitChange();

            // update url to history
            /*global window*/
            window.history.pushState(JSON.stringify(this._context), undefined, url);
        }.bind(this))['catch'](function (E) {
            if (console && console.log) {
                console.log('Pjax failed! Failback to page loading....');
                console.log(E.stack || E);
            }

            // pjax failed, go to url...
            window.location.href = url;
        });
};

module.exports = function (config) {
    router = new Router(config);

    return {
        routing: routingAction,
        getURL: getURL,
        routeToURL: routeToURL
    };
};

module.exports.mixin = {
    getURL: function (name, param, query) {
        return this._getContext().getURL(name, param, query);
    }
};
