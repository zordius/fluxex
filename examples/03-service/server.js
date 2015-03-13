'use strict';

// Init ES6 + jsx environments for .require()
require('babel/register')({
    extensions: ['.jsx']
});

var express = require('express'),
    fluxexapp = require('./fluxexapp'),
    fluxexServerExtra = require('fluxex/extra/server'),
    fetch = require('./services/fetch'),
    app = express();

// Provide /static/js/main.js
fluxexServerExtra.initStatic(app);

// Provide fetch services
app.use('/services/:name', function (req, res, next) {
    fetch(req.params.name, {qs: req.query}).then(function (O) {
        res.send(O.body);
    }).catch(function (E) {
        console.log(E.stack || E);
        next();
    });
});

// Mount fluxexapp , it will handle routing itself
app.use(fluxexServerExtra.middlewareRouting(fluxexapp));

// Start server
app.listen(3000);
console.log('Fluxex started! Go http://localhost:3001/search?q=apple');
