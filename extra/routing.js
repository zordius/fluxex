'use strict';

// You need to npm install routes to use this extra.
var router = require('routes')(),

// The single routing action can be used at both server/client side.
RoutingAction = function () {
    var path = this.getStore('page').get('url.pathname'),
        match = router.match(path);

    if (!match) {
        return this.rejectPromise('no matched route');
    }

    this.dispatch('UPDATE_ROUTING', {
        name: match.fn[0],
        params: match.params
    });

    return this.executeAction(match.fn[1]);
};

module.exports = RoutingAciton;
module.exports.router = router;
