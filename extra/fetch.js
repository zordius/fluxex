'use strict';

var request = require('request'),
    when = require('when'),
    baseURL = '/_fetch_/',
    config = {},

getURL = function (name) {
    var location;

    /*global window*/
    try {
        location = window.location;
        if (location) {
            return location.protocol + '//' + location.host + baseURL + name;
        }
    } catch (E) {
        // do nothing...
    }

    return config[name];
},

fetch = function (name, cfg) {
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

module.exports = fetch;

module.exports.createServices = function (app, cfg, base) {
    if (!cfg) {
        throw new Error('fetch.createServices require service config as second parameter!');
    }

    config = cfg;

    if (base) {
        if (!base.match || !base.match(/^\/[^:]\/$/)) {
            throw new Error('baseURL should in \'/foobar/\' format!');
        }
        baseURL = base;
    }

    // Provide fetch services
    app.use(baseURL + ':name', function (req, res) {
        fetch(req.params.name, {qs: req.query}).then(function (O) {
            res.send(O.body);
        }).catch(function (E) {
            res.status(500)send(E.stack || E);
        });
    });
};
