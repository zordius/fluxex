'use strict';

var request = require('request'),
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
        return Promise.reject(new Error('service name required!'));
    }

    if (!cfg) {
        cfg = {};
    }

    cfg.url = getURL(name);

    return new Promise(function (resolve, reject) {
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

module.exports.createServices = function (app, serviceCfg, opts) {
    if (!serviceCfg) {
        throw new Error('fetch.createServices() require service config as second parameter!');
    }

    if (!opts) {
        opts = {};
    }

    if (opts.dupeHeaders && !opts.dupeHeaders.map) {
        throw new Error('opts.dupeHeaders for fetch.createServices() should be an Array!');
    }

    config = serviceCfg;

    // Provide fetch services
    app.use(baseURL + ':name', function (req, res) {
        var reqCfg = {
            qs: req.query
        };

        if (opts.dupeHeaders) {
            reqCfg.headers = {};
            opts.dupeHeaders.map(function (V) {
                var H = req.header(V);
                if (H !== undefined) {
                    reqCfg.headers[V] = H;
                }
            });
        }

        fetch(req.params.name, reqCfg).then(function (O) {
            res.send(O.body);
        }).catch(function (E) {
            res.status(500).send(E.stack || E);
        });
    });
};
