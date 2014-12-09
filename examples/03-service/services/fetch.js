'use strict';

var request = require('request'),
    when = require('when'),

getConfig = function (name) {
        var module = './service_config',
            config;

    try {
        // Trick to brevent browerify pack the config module into bundle.
        config = require(module);
    } catch (E) {
        config = {};
    }

    return config.name;
};

module.exports = function (name, cfg) {
    if (!name) {
        return when.reject(new Error('service name required!'));
    }

    if (!cfg) {
        cfg = {};
    }

    cfg.url = getConfig(name) || '/services/' + name;

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
