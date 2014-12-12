'use strict';

var request = require('request'),
    when = require('when'),
    config = {baseURL: '/_fetch/'},


getURL = function (name) {
    var location;

    /*global window*/
    try {
        location = window.location;
        if (location) {
            return location.protocol + '//' + location.host + config.baseURL + name;
        }
    } catch (E) {
        // do nothing...
    }

    return config[name];
};

module.exports = function (name, cfg) {
    if (!name) {
        return when.reject(new Error('service name required!'));
    }

    if (!cfg) {
        cfg = {};
    }

    cfg.url = getURL(name);

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
};

module.exports.createServices = function (app, cfg) {
    if (!cfg) {
        throw new Error('fetch.createServices require service config as second parameter!');
    }

    if (!cfg.baseURL) {
        throw new Error('fetch.createServices require config.baseURL in second parameter!');
    }

    config = cfg;

    // Provide fetch services
    app.use(config.baseURL + ':name', function (req, res, next) {
        fetch(req.params.name, {qs: req.query}).then(function (O) {
            res.send(O.body);
        }).catch(function (E) {
            console.log(E.stack || E);
            next();
        });
    });
};
