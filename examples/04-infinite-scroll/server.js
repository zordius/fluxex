'use strict';

// Apply all polyfills
require('object.assign').shim();
global.Promise = require('bluebird');
Promise.longStackTraces();

// Init .jsx require()
require('node-jsx').install({extension: '.jsx'});

var express = require('express'),
    fluxexapp = require('./fluxexapp'),
    fluxexServerExtra = require('fluxex/extra/server'),
    fetch = require('fluxex/extra/fetch'),
    app = express();

// Provide /static/js/main.js
fluxexServerExtra.initStatic(app);

// Setup fetch services
fetch.createServices(app, {
    yql: 'https://query.yahooapis.com/v1/public/yql'
}, {
    dupeHeaders: ['Cookie', 'Referer']
});

// Mount fluxexapp , it will handle routing itself
app.use(fluxexServerExtra.middlewareRouting(fluxexapp));

// Start server
app.listen(3000);
console.log('Fluxex started! Go http://localhost:3001/search?q=apple');
