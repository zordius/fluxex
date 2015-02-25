'use strict';                                                 

var react = require('react'),

ServerExtra = {
    initStatic: function (app) {
       app.use('/static', require('express').static(process.cwd() + '/static'));
    },
    
    middleware: function (fluxexapp, action) {
        return function (req, res, next) {
            var app = new fluxexapp();
            app._headers = Object.assign({}, req.headers);

            app.renderHtml(action, req).then(function (HTML) {
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
    middlewareRouting: function (fluxexapp, extraAction) {
        return ServerExtra.middleware(fluxexapp, function (req) {
            if (extraAction) {
                this.executeAction(extraAction, req);
            }
            return this.dispatch('UPDATE_URL', req.url).then(function () {
                return this.executeAction(this.routing);
            }.bind(this));
        });
    },

    // Using this for total solution
    initServer: function (app, fluxexapp, fetchOpt, extraAction) {
        var fetch;
        ServerExtra.initStatic(app);
        if (fetchOpt && fetchOpt.services) {
            fetch = require('./fetch');
            fluxexapp.prototype.fetch = fetch.wrapFetch;
            fetch.createServices(app, fetchOpt.services, fetchOpt.options);
        }
        app.use(ServerExtra.middlewareRouting(fluxexapp, extraAction));
    }
}

module.exports = ServerExtra;
