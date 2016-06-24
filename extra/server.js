var isocall = require('iso-call');

var ServerExtra = {
    // A helper function to serve static files at /static
    initStatic: function (app) {
        app.use('/static', require('express').static(process.cwd() + '/static'));
    },

    // A helper function to setup RPC on an express server
    setupRPC: function (app, rpclist) {
        isocall.addConfigs(rpclist);
        isocall.setupMiddleware(app);
    },

    // A helper function to create middleware to serve fluxex application and action
    createMiddlewareByAction: function (Fluxexapp, action) {
        return function (req, res, next) {
            var app = new Fluxexapp();

            /* New for contexted iso-call */
            /* check extra/rpc.js for more doc */
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
                next(E);
            });
        };
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
            this.dispatch('UPDATE_URL', {url: req.url, host: req.header('Host'), method: req.method, query: req.query}).catch(function (E) {
                console.log(E.stack || E);
            });

            // If you wanna pass more data from req to fluxex, use extreAction.
            return (extraAction ? this.executeAction(extraAction, req) : Promise.resolve()).then(function () {
                // always execute routing action when no error
                return this.executeAction(this.routing);
            }.bind(this));
        });
    },

    // Using this as an extra action when your fluxexapp need to handle POST
    // You may need to use body-parser on your express app with proper setting
    postHandler: function (req) {
        return this.dispatch('UPDATE_BODY', req.body);
    }
};

module.exports = ServerExtra;
