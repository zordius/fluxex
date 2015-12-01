// Init ES2015 + .jsx environments for .require()
require('babel-register');

var express = require('express'),
    fluxexapp = require('./fluxexapp'),
    pageAction = require('./actions/page'),
    fluxexServerExtra = require('fluxex/extra/server'),
    app = express();

// Provide /static/js/main.js
fluxexServerExtra.initStatic(app);

// Mount test page at /test
app.use('/test', fluxexServerExtra.createMiddlewareByAction(fluxexapp, pageAction));

// Start server
app.listen(3000);
console.log('Fluxex started! Go http://localhost:3001/test');
