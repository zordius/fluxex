'use strict';

var page = require('./page'),
    router = require('routes')();

router.addRoute('/product/:id', page.product);
router.addRoute('/main', page.main);

module.exports = function () {
    var path = this.getStore('page').get('url.pathname'),
        match = router.match(path);

    if (!match) {
        return this.rejectPromise('no matched route');
    }

    this.dispatch('UPDATE_PARAMS', match.params);

    return this.executeAction(match.fn);
};
