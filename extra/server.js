var react = require('react'),

ServerExtra = {
    initStatic: function (app) {
       app.use('/static', require('express').static(process.cwd() + '/static'));
    },

    middleware: function (fluxexapp, action) {
        return function (req, res, next) {
            var app = new fluxexapp();

            /* Deprecated */
            /* we will remove _headers in future */
            app._headers = Object.assign({}, req.headers);

            /* New for contexted iso-call */
            /* check extra/rpc.js for mor doc */
            app._req = req;

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
            // dispatch URL information to store is a must have
            // it should be a synchronized operation, so we do not .then()
            this.dispatch('UPDATE_URL', {url: req.url, host: req.header('Host')}).catch(function (E) {
                console.log(E.stack || E);
            });

            // If you wanna pass more data from req to fluxex, use extreAction.
            return (extraAction ? this.executeAction(extraAction, req) : Promise.resolve()).then(function () {
                // always execute routing action when no error
                return this.executeAction(this.routing);
            }.bind(this));
        });
    },

    /* Deprecated */
    /* Please use .initStatic() and .middlewareRouting() directly */
    initServer: function (app, fluxexapp, fetchOpt, extraAction) {
        var fetch;

        if ('production' !== process.env.NODE_ENV) {
            console.warn('.initServer() is deprecated! Please use .initStatic() and .middlewareRouting() directly. And migrate your api from extra/fetch to extra/rpc');
        }

        ServerExtra.initStatic(app);
        if (fetchOpt && fetchOpt.services) {
            fetch = require('./fetch');
            fetch.createServices(app, fetchOpt.services, fetchOpt.options);
        }
        app.use(ServerExtra.middlewareRouting(fluxexapp, extraAction));
    }
}

module.exports = ServerExtra;
