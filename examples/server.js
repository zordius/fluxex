'use strict';

require('node-jsx').install({extension: '.jsx'});

var express = require('express'),
    fluxex = require('fluxex'),
    fluxexapp = require('./app'),
    serverAction = require('./actions/server'),
    react = require('react'),
    app = express();

app.use('/static', express.static(__dirname + '/static'));
app.use('/test', function (req, res, next) {
    var Fluxex = new fluxexapp();

    // prepare query for client
    Fluxex.getStore('page').set('query', req.query, true);

    Fluxex.executeAction(serverAction.samplePage).then(function () {
console.log(Fluxex.toString());
        react.withContext({fluxex: Fluxex}, function () {
            res.send(react.renderToString(Fluxex.getHtmlJsx()));
        });
    }).catch(function (E) {
console.log('not ok!');
console.log(E.stack);
        next();
    });
});

app.listen(3000);
console.log('Fluxex started on port 3000');
