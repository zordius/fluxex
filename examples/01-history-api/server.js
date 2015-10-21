// Init ES6 + jsx environments for .require()
require('babel/register')({
    extensions: ['.jsx']
});

var express = require('express');
var fluxexapp = require('./fluxexapp');
var serverAction = require('./actions/server');
var fluxexServerExtra = require('fluxex/extra/server');
var app = express();

// Provide /static/js/main.js
fluxexServerExtra.initStatic(app);

// Mount test page at /test
app.use('/product', fluxexServerExtra.createMiddlewareByAction(fluxexapp, serverAction.samplePage));

// Start server
app.listen(process.env.TESTPORT || 3000);
console.log('Fluxex started! Go http://localhost:3001/product?id=124');
