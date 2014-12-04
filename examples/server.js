'use strict';

var express = require('express'),
    fluxex = require('fluxex'),
    fluxexapp = require('./app'),
    app = express();

require('node-jsx').install({extension: '.jsx'});

app.use('/static', express.static(__dirname + '/static'));
app.use(function (req, res, next) {
    res.send('OK!');
});

app.listen(3000);
console.log('Fluxex started on port 3000');
