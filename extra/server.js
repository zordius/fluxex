'use strict';                                                 

var react = require('react'),

ServerExtra = {
    initStatic: function (app) {
       app.use('/static', require('express').static(process.cwd() + '/static'));
    },
    
    middleware: function (fluxexapp, action) {
        return function (req, res, next) {
            (new fluxexapp()).renderHtml(action, req).then(function (HTML) {
                res.send('<!DOCTYPE html>' + HTML);
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

    // Using this when your fluxexapp provide .routing() action
    middlewareRouting: function (fluxexapp) {
        return ServerExtra.middleware(fluxexapp, function (req) {
            return this.dispatch('UPDATE_URL', req.url).then(function () {
                return this.executeAction(this.routing);
            });
        });
    }
}

module.exports = ServerExtra;
