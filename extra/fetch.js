'use strict';

var request = require('request'),
    when = require('when'),
    config = undefined,

FetchUtil = {
    serviceURL: '/_fetch_/',

    setConfig = function (name) {
        // Trick to brevent browerify pack the config module into bundle.
        config = require(name);
    },

    getConfig: function (name) {
        return config ? config[name] : undefined;
    },

    addService: function (app) {
        // Provide fetch services
        app.use(FetchUtil.serviceURL + ':name', function (req, res, next) {
            fetch(req.params.name, {qs: req.query}).then(function (O) {
                res.send(O.body);
            }).catch(function (E) {
                console.log(E.stack || E);
                next();
            });
        });
    },

    getServiceURL: function (name) {
        var location;

        /*global window*/
        try {
            location = window.location;
            if (location) {
                return location.protocol + '//' + location.host + '/services/' + name;
            }
        } catch (E) {
            // do nothing...
        }

        return FetchUtil.getConfig(name).url;
    }

    fetch: function (name, cfg) {
        if (!name) {
            return when.reject(new Error('service name required!'));
        }

        if (!cfg) {
            cfg = {};
        }

        cfg.url = FetchUtil.getServiceURL(name);

        return when.promise(function (resolve, reject) {
            request(cfg, function (error, response, body) {
                var O = {
                    error: error,
                    response: response,
                    body: body
                };

                if (error) {
                    return reject(O);
                }

                resolve(O);
            });
        });
    }
};

module.exports = FetchUtil;
