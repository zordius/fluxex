'use strict';                                                 

require('node-jsx').install({extension: '.jsx'});

var react = require('react'),

ServerExtra = {
    initStatic: function (app) {
       app.use('/static', require('express').static(process.cwd() + '/static'));
    },
    
    middleware: function (fluxexapp, action) {
        return function (req, res, next) {
            (new fluxexapp()).renderHtml(action, req).then(function (HTML) {
                res.send(HTML);
            }).catch(function (E) {
                if (E) {
                    if (E.redirect) {
                        res.redirect(E.redirect);
                        return;
                    }
                    console.log(E.stack || E);
                }
                next();
            });
        };
    },

    middlewareRouting: function (fluxexapp, routing) {
        fluxexapp.routing = routing;

        return ServerExtra.middleware(fluxexapp, function (req) {
            return this.dispatch('UPDATE_URL', req.url).then(function () {
                return this.executeAction(routing);
            });
        });
    }
}

module.exports = ServerExtra;
