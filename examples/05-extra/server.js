'use strict';

// Init ES6 + jsx environments for .require()
require('babel/register')({
    extensions: ['.jsx']
});

var express = require('express'),
    fluxexapp = require('./fluxexapp'),
    fluxexServerExtra = require('fluxex/extra/server'),
    app = express();

// create a fluxex server
fluxexServerExtra.initServer(app, fluxexapp, {
    services: {
        yql: 'https://query.yahooapis.com/v1/public/yql'
    }
});

// Start server
app.listen(3000);
console.log('Fluxex started! Go http://localhost:3001/search?q=apple');
