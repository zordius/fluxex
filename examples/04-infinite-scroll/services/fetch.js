'use strict';

var request = require('request'),
    when = require('when'),

getConfig = function (name) {
    var module = './service_config',
        location;

    /*global window*/
    try {
        location = window.location;
        if (location) {
            return location.protocol + '//' + location.host + '/services/' + name;
        }
    } catch (E) {
        // do nothing...
    }

    // Trick to brevent browerify pack the config module into bundle.
    return require(module)[name];
};

module.exports = function (name, cfg) {
    if (!name) {
        return when.reject(new Error('service name required!'));
    }

    if (!cfg) {
        cfg = {};
    }

    cfg.url = getConfig(name);

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
