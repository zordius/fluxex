'use strict';

var page = require('./page'),
    router = require('routes')();

router.addRoute('/product/:id', ['product', page.product]);
router.addRoute('/main', ['top', page.main]);

// The single routing action can be used at both server/client side.
module.exports = function () {
    var path = this.getStore('page')._get('url').pathname,
        match = router.match(path);

    if (!match) {
        return Promise.reject(new Error('no matched route'));
    }

    this.dispatch('UPDATE_ROUTING', {
        name: match.fn[0],
        params: match.params
    });

    return this.executeAction(match.fn[1]);
};
