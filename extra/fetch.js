'use strict';

var request = require('request'),
    baseURL = '/_fetch_/',
    requestConfig,
    config = {},

isClient = function () {
    /*global window*/
    try {
        return window;
    } catch (E) {
        // do nothing...
    }
    return false;
},

fetch = function (name, cfg) {
    var win = isClient();
    var loc = win ? win.location : undefined;
    var opt = loc ? {} : cfg;

    if (!name) {
        return Promise.reject(new Error('service name required!'));
    }

    if (loc) {
        opt.url = loc.protocol + '//' + loc.host + baseURL + name;
        opt.method = 'PUT';
        opt.body = JSON.stringify(cfg);
        opt.headers = {
            'content-type': 'application/json'
        };
        if (cfg && cfg.json) {
            opt.json = (cfg && cfg.json) ? true : false;
        }
    } else {
        opt.url = config[name];
    }

    if (!opt.url) {
        return Promise.reject(new Error('Can not find URL for service: ' + name));
    }

    return new Promise(function (resolve, reject) {
        request(opt, function (error, response, body) {
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
},

handleRequestCfg = function (name, headers, body) {
    var reqCfg = body || {};

    // Dupe headers from request headers
    if (reqCfg.headers) {
        Object.keys(reqCfg.headers).forEach(function (K) {
            if (reqCfg.headers[K] === undefined) {
                reqCfg.headers[K] = headers[K];
            }
        });
    }

    if ('function' === (typeof requestConfig.preRequest)) {
        reqCfg = requestConfig.preRequest(reqCfg, name, headers);
    }

    return reqCfg;
};

module.exports = fetch;

module.exports.createServices = function (app, serviceCfg, opts) {
    if (!serviceCfg) {
        throw new Error('fetch.createServices() require service config as second parameter!');
    }

    requestConfig = opts ? opts : {};
    config = serviceCfg;

    // Provide fetch services
    app.put(baseURL + ':name', require('body-parser').json({
        type: function () {
            return true;
        }
    }), function (req, res) {
        fetch(req.params.name, handleRequestCfg(req.params.name, req.headers, req.body)
        ).then(function (O) {
            res.send(O.body);
        })['catch'](function (E) {
            console.warn(E.stack);
            res.status(500).send(('production' !== process.env.NODE_ENV) ? (E.stack || E) : '[Fluxex] Internal Server Error');
        });
    });
};
