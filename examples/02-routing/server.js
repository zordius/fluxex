// Init ES2015 + .jsx environments for .require()
require('babel-register');

var express = require('express');
var fluxexapp = require('./fluxexapp');
var routing = require('./actions/routing');
var fluxexServerExtra = require('fluxex/extra/server');
var app = express();
var PORT = process.env.TESTPORT || 3000;

// Setup real port when using browserSync
require('fluxex').port = process.env.BSPORT;

// Provide /static/js/main.js
fluxexServerExtra.initStatic(app);

// Mount test pages with routing action
app.use(fluxexServerExtra.createMiddlewareByAction(fluxexapp, function (req) {
    return this.dispatch('UPDATE_URL', {url: req.url, host: req.header('Host')}).then(function () {
        return this.executeAction(routing);
    }.bind(this));
}));

// Start server
app.listen(PORT);
console.log('Fluxex started! Go http://localhost:' + (process.env.BSPORT || PORT) + '/main');
