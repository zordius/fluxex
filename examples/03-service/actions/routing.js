'use strict';

var page = require('./page'),
    router = require('routes')();

router.addRoute('/search', ['search', page.search]);

// The single routing action can be used at both server/client side.
module.exports = function () {
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
