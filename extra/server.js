var isocall = require('iso-call'),

ServerExtra = {
    // A helper function to serve static files at /static
    initStatic: function (app) {
       app.use('/static', require('express').static(process.cwd() + '/static'));
    },

    /* Deprecated */
    // Please stop using .middleware() , we will rename it to .createMiddlewareByAction()
    middleware: function (fluxexapp, action) {
        if ('production' !== process.env.NODE_ENV) {
            console.warn('.middleware() is deprecated! Please rename to .createMiddlewareByAction()');
        }

        return this.createMiddlewareByAction(fluxexapp, action);
    },

    // A helper function to setup RPC on an express server
    setupRPC: function (app, rpclist) {
        isocall.addConfigs(rpclist);
        isocall.setupMiddleware(app);
    },

    // A helper function to create middleware to serve fluxex application and action
    createMiddlewareByAction: function (fluxexapp, action) {
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

    /* Deprecated */
    // Please stop using .middlewareRouting() , we will rename it to .createMiddlewareWithRouting()
    middlewareRouting: function (fluxexapp, extraAction) {
        if ('production' !== process.env.NODE_ENV) {
            console.warn('.middlewareRouting() is deprecated! Please rename to .createMiddlewareWithRouting()');
        }

        return ServerExtra.createMiddlewareWithRouting(fluxexapp, extraAction);
    },

    // Using this when your fluxexapp provide .routing() action
    // Check extra/routing.js for more information about routing.
    createMiddlewareWithRouting: function (fluxexapp, extraAction) {
        if ('function' !== (typeof fluxexapp.prototype.routing)) {
            throw new Error('You provided a fluxexapp without .routing() when call .createMiddlewareWithRouting()');
        }

        return ServerExtra.createMiddlewareByAction(fluxexapp, function (req) {
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
    /* Please use .initStatic() and .createMiddlewareByAction() directly */
    initServer: function (app, fluxexapp, fetchOpt, extraAction) {
        var fetch;

        if ('production' !== process.env.NODE_ENV) {
            console.warn('.initServer() is deprecated! Please use .initStatic() and .middlewareRouting() directly. And migrate your api from extra/fetch to extra/rpc');
        }

        ServerExtra.initStatic(app);
        if (fetchOpt && fetchOpt.services) {
            if ('production' !== process.env.NODE_ENV) {
                console.warn('fetch() is deprecated! Please migrate your api service from extra/fetch to extra/rpc');
            }
            fetch = require('./fetch');
            fetch.createServices(app, fetchOpt.services, fetchOpt.options);
        }
        app.use(ServerExtra.middlewareRouting(fluxexapp, extraAction));
    }
};

module.exports = ServerExtra;
