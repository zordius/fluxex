'use strict';

require('node-jsx').install({extension: '.jsx'});

var express = require('express'),
    fluxex = require('fluxex'),
    fluxexapp = require('./app'),
    Html = require('./components/Html.jsx'),
    app = express();

app.use('/static', express.static(__dirname + '/static'));
app.use(function (req, res, next) {
    var Fluxex = new fluxexapp();

    Fluxex.getStore('paramStore').set('query', req.query, true);
    res.send('<html><title>Example</title><body></body></html>');
});

app.listen(3000);
console.log('Fluxex started on port 3000');
