/* Deprecated */
/* Please use rpc for better interface and logic */
/*

Why we drop fetch?
==================

fetch minic isomorpic request() with an express middleware and preRequest hack, most developers can not understand:

* WHEN and WHERE fetch() be executed
* HOW fetch() deal with cookie or other headers
* HOW to deal with server_side_only logic

What should we do?
==================

Move to `extra/rpc` . The extra is powered by https://github.com/zordius/iso-call , so we can:

* Keep `this.execute('name', param)` and `this.request('name', param)` isomorphic
* Ensure the RPC function itself be executed on server side only
* Add more logic before call an API
* Add more logic after receive the API result
* Hide specific business logic from user

check extra/rpc.js for more information

*/

var request = require('request'),
    Fetch = require('./fetch-server'),
    requestConfig,
    mainConfig = {},

fetch = function (name, cfg) {
    if ('production' !== process.env.NODE_ENV) {
        console.warn('fetch is deprecated! please adopt rpc. check fetch.js for more document');
    }

    if (!name) {
        return Promise.reject(new Error('service name required!'));
    }

    var opt = Fetch.getRequestConfig(name, cfg, mainConfig, module.exports.baseURL);

    if (!opt.url) {
        return Promise.reject(new Error('Can not find URL for service: ' + name));
    }
    return new Promise(function (resolve, reject) {
        request(opt, function (error, response, body) {

            var O = {
                error: error,
                response: response,
                body: body,
                requestOptions: opt,
            };

            if (error) {
                return reject(O);
            }

            resolve(O);
        });
    });
},

handleRequestCfg = function (name, headers, body) {
    return new Promise(function (resolve, reject) {
        var reqCfg = body || {};
        reqCfg.headers = reqCfg.headers || {};

        // Dupe headers from request headers
        if (reqCfg.headers) {
            Object.keys(reqCfg.headers).forEach(function (K) {
                if (reqCfg.headers[K] === undefined) {
                    reqCfg.headers[K] = headers[K];
                }
            });
        }

        //hostlevel preRequest
        if ('function' === (typeof requestConfig.preRequest)) {
            var res = requestConfig.preRequest(reqCfg, name, headers);

            // To trigger validation error from preRequest:
            //     1. return false
            //     2. return {res: false}
            // For appending error message, return {res: false, msg: "validation error from server side" }
            // default message is "validation error"
            if (res === false
                || (res.res === false)) {
                reject(new Error(res.msg || 'validation error'));
            }

            reqCfg = res || reqCfg;
        }

        resolve(reqCfg);
    });
};

module.exports = fetch;
module.exports.baseURL = '/_fetch_/';

module.exports.createServices = function (app, serviceCfg, opts) {
    if ('production' !== process.env.NODE_ENV) {
        console.warn('fetch is deprecated! please adopt rpc. check fetch.js for more document');
    }

    if (!serviceCfg) {
        throw new Error('fetch.createServices() require service config as second parameter!');
    }

    requestConfig = opts ? opts : {};
    mainConfig = serviceCfg;

    // Provide fetch services
    app.put(module.exports.baseURL + ':name', require('body-parser').json(), function (req, res) {
        handleRequestCfg(req.params.name, req.headers, req.body)
        .then(
            function (reqCfg) {
                return fetch(req.params.name, reqCfg);
            }
        ).then(function (O) {
            res.send(O.body);
        })['catch'](function (E) {
            console.warn(E.stack);
            res.status(500).send(('production' !== process.env.NODE_ENV) ? (E.stack || E) : '[Fluxex] Internal Server Error');
        });
    });
};
