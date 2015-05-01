'use strict';

// Init ES6 + jsx environments for .require()
require('babel/register')({
    extensions: ['.jsx']
});

var express = require('express'),
    fluxexapp = require('./fluxexapp'),
    routing = require('./actions/routing'),
    fluxexServerExtra = require('fluxex/extra/server'),
    app = express();

// Provide /static/js/main.js
fluxexServerExtra.initStatic(app);

// Mount test pages with routing action
app.use(fluxexServerExtra.createMiddlewareByAction(fluxexapp, function (req) {
    return this.dispatch('UPDATE_URL', req.url).then(function () {
        return this.executeAction(routing);
    }.bind(this));
}));

// Start server
app.listen(process.env.TESTPORT || 3000);
console.log('Fluxex started! Go http://localhost:3001/main');
