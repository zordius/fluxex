'use strict';

var request = require('request'),
    when = require('when'),

FetchUtil = {
    config: {
        serviceURL: '/_fetch_/',
    },

    addService: function (app) {
        // Provide fetch services
        app.use(FetchUtil.config.serviceURL + ':name', function (req, res, next) {
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

        return FetchUtil.config[name] ? FetchUtil.config[name].url : undefined;
    },

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
